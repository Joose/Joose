Module("ORM", function (module) {
    
    var GEARS_COMPAT = false
    
    // Add Compatibility with the Gears DB
    if(!window.openDatabase) {
        GEARS_COMPAT = true;
        window.openDatabase = function (name) {
            JooseGearsInitializeGears();
            
            if(!window.google || !window.google.gears) {
                throw "Google Gears required."
            }

            var handle = google.gears.factory.create('beta.database');
            handle.open(name);
            var db = new module.HTML5DatabaseEmulator({
                gearsDb: handle
            })
            return db
        }
    }
    
    // Wrap the gears db db with something that looks like an html5 db
    Class("HTML5DatabaseEmulator", {
        has: {
            gearsDb: {
                is: "ro",
                required: true
            }
        },
        methods: {
            transaction: function (func) {
                var tx = new module.HTML5TransactionEmulator({
                    database: this
                })
                func(tx)
            }
        }
    });
    
    // Simulate the html5 transaction interface (currently without transactions :))
    Class("HTML5TransactionEmulator", {
        has: {
            database: {
                is: "ro",
                required: true
            }
        },
        methods: {
            executeSql: function (sql,args,onSuccess,onFailure) {
                var me = this;
                var resultSet;
                try {
                    if(window.console) {
                        console.log("SQL: "+sql+" Args: "+args)
                    }
                    /// XXX run this inside a worker to really become async
                    var rs = this.getDatabase().getGearsDb().execute(sql, args);
                    resultSet = new module.HTML5ResultSetEmulator({
                        database: this.getDatabase(),
                        resultSet: rs
                    })
                    
                } catch(e) {
                    if(window.console) {
                        console.log(e + "\nSQL: "+sql + "\nArgs: "+args)
                    }
                    if(onFailure) {
                        onFailure(me, e)
                    } else {
                        throw e
                    }
                };
                if(resultSet) {
                    if(onSuccess) {
                        onSuccess(me, resultSet)
                    }
                }
            }
        }
    });
    
    // Emulate html5 result sets
    Class("HTML5ResultSetEmulator", {
        has: {
            database: {
                is: "ro"
            },
            resultSet: {
                is: "ro",
                required: true
            },
            insertId: {},
            rowsAffected: {},
            rows: {}
        },
        after: {
            initialize: function () {
                var rs = this.getResultSet();
                this.insertId = this.getDatabase().getGearsDb().lastInsertRowId;
                var rows = [];
                rows.item = function (i) {
                    return this[i]
                };
                var names = [];
                var fieldCount = rs.fieldCount();
                for(var i = 0; i < fieldCount; i++) {
                    names.push(rs.fieldName(i))
                }
                while (rs.isValidRow()) {
                    var row = {};
                    row.length = fieldCount;
                    for(var i = 0; i < names.length; i++) {
                        var name = names[i];
                        row[name] = rs.fieldByName(name)
                    }
                    for(var i = 0; i < fieldCount; i++) {
                        row[i] = rs.field(i)
                    }
                    rows.push(row)
                    rs.next();
                }
                rs.close();
                this.rows = rows
            }
        }
    })
    
    // Global vars, hidden from the outside :)
    var DB, TX;
    var ACTIVE_TRANSACTIONS = 0;
    var TRANSACTION_QUEUE   = [];
    
    // ORM.openDatabase - use this to open the database
    module.openDatabase = function (name, version, desc, size) {
        DB = window.openDatabase(name, version, desc, size)
    };
    
    var nextTransaction = function () {
        if(TRANSACTION_QUEUE.length > 0) {
            var txCallback = TRANSACTION_QUEUE.shift();
            module.transaction(txCallback)
        }
    };
    
    // ORM.transaction - use this to do a transaction
    // Sets current transaction use ORM.executeSql to execute SQL
    // With HTML5 it is guaranteed that transactions are serialized per window and database
    // For gears we build a transaction queue and execute it serialized
    module.transaction  = function (transactionCallback) {
        var me = this;
        if(window.console)
            console.log("Starting transaction ")
        DB.transaction(function (tx) {
            if(GEARS_COMPAT) {
                   
                if(ACTIVE_TRANSACTIONS > 0) { // only one transaction at a time
                    TRANSACTION_QUEUE.push(transactionCallback)
                    return
                }
                ACTIVE_TRANSACTIONS++
                TX = tx
                module.executeSql("BEGIN")
                try {
                    transactionCallback()
                } catch(e) {
                    module.executeSql("ROLLBACK");
                    ACTIVE_TRANSACTIONS--;
                    throw e
                };
                module.executeSql("COMMIT")
                ACTIVE_TRANSACTIONS--
                nextTransaction()
            } else {
                TX = tx
                transactionCallback()
            }
        })
    };
    
    // Execute Sql using the current transaction
    module.executeSql = function (sql, args, onSuccess, onError) {
        if(!GEARS_COMPAT && window.console) { // the gears layer does this anyway
            console.log("Executing SQL: "+sql+" Args: "+args)
        }
        TX.executeSql(
            sql, 
            args,
            function onExecuteSqlSuccess (tx, result) {
                if(onSuccess) {
                    onSuccess(result)
                }
            },
            function onExecuteSqlError (tx, error) {
                if(onError) {
                    onError(error)
                } else {
                    throw new Error(error)
                }
            })
    };
    
    var ENTITY_BUILD_COUNT = 0;
   
    Class("EntityMetaClass", {
        isa: Joose.Class,
        
        has: {
            _props: {}
        },
        
        methods: {
            
            initializeFromProps: function (props) {
                
                if(props.isAbstract) {
                    this._initializeFromProps(props)
                    return
                }
                
                   var superclass = props.isa;
                this.addSuperClass(superclass)
                delete props.isa;
                
                if(typeof props.tableName == "undefined") {
                    throw new Error("Please provide a tableName is the class definition.")
                }
                var tableName = props.tableName
                this.addClassMethod("tableName", function () { return tableName })
                delete props.tableName
                
                this._props = props
                this.initializeFromDb()
                // Do nothing else here because the regular time is to early
                // Call the actual method _initializeFromProps after fetching the fields
            },
            
            initializeFromDb: function () {
                var me     = this;
                
                ENTITY_BUILD_COUNT++
                
                // add getters and setters for each field
                this.fetchFields(function (fields) {
                    
                    me.addClassMethod("fields", function () {
                           return fields;
                    })
                
                    Joose.A.each(fields, function (field) {
                        
                        me.addAttribute(field, {
                            is: "rw"
                        })
                    })
                    
                    me._initializeFromProps(me._props)
                    
                    ENTITY_BUILD_COUNT--
                    if(ENTITY_BUILD_COUNT == 0) {
                        if(window.onORMLoaded) {
                            window.onORMLoaded()    
                        }
                    }
                });
            },
            
            // get all fields of table of the class I represent
            fetchFields: function (processFields) {
                var me = this;
                var c  = this.getClassObject();

                var tableName = c.tableName();
                
                // fetch create table statement
                // if there is a nicer way to get to the col data, please tell me
                module.executeSql("SELECT sql FROM sqlite_master WHERE name = ?", [tableName], function (result) {
                    var fields = [];
                    
                    var sql = result.rows.item(0).sql

                    // parse sql create table statement
                    var match = sql.match(/\((.+)/i)
                    var colsPart = match[1]
                    
                    var definitions = colsPart.split(",")
                    
                    for(var i = 0; i < definitions.length; i++) {
                        var match = definitions[i].match(/\s*(\w+)/)
                        var col = match[1];
                        // XXX ignore keywords like PRIMARY, KEY and UNIQUE
                        fields.push(col)
                    }
                    
                    // rowid is not in the table defition but every table has it!
                    fields.push("rowid")
                    
                    // this needs to be async (in Gears) so that alle class defs are loaded and
                    // the counting in ENTITY_BUILD_COUNT works 
                    window.setTimeout(function () {
                        processFields(fields)
                    },0)
                    
                });
            },
            
            // XXX broken
            renderHTML: function () {
                var c = this.getClassObject();
                
                var fields = c.fields()
                
                var html   = "<div style='height: 200px; overflow: auto'><table width='100%'>\n"
                html += "<tr>\n"
                Joose.A.each(fields, function (name) {
                    html += "<th>"+name+"</th>\n"
                })
                html += "</tr>\n"
                var all = c.select("FROM "+c.tableName())
                Joose.A.each(all, function (row) {
                    html += "<tr>\n"
                    Joose.A.each(fields, function (name) {
                        html += "<td>"+row.field(name)+"</td>\n"
                    })
                    html += "</tr>\n"
                })
                
                html += "</table></div>"
                
                return html
            },
            
            handleProphasOne: function (definitions) {
                var me = this;
                Joose.O.each(definitions, function (props, name) {
                    props.metaclass = module.HasOne;
                    me.addAttribute(name, props)
                })
            },
            
            handleProphasMany: function (definitions) {
                var me = this;
                Joose.O.each(definitions, function (props, name) {
                    props.metaclass = module.HasMany;
                    me.addAttribute(name, props)
                })
            }
        },
        
        override: {
            wrapMethod: function () {
                var me   = this;
                var args = [];
                var orig = this.SUPER;
                for(var i = 0; i < arguments.length; i++) {
                    args[i] = arguments[i]
                }
                module.transaction(function () {
                    orig.apply(me, args)
                })
            }
        }
    });
    
    // Attribute meta class for hasOne relations. Adds getters and setters for objects
    Class("HasOne", {
        isa: Joose.Attribute,
        
        methods: {
            
            handleProps: function (classObject) {
                this.addGetter(classObject)
                this.addSetter(classObject)
            },
            
            addGetter: function (classObject) {
                var name       = this.getName()
                var methodName = this.getterName();
                
                var attr = this;
                
                classObject.meta.addMethod(methodName, function (onRetrieve) {
                    var classOfRel = attr.getIsa()
                    if(!onRetrieve) {
                        return this[name]
                    }
                    classOfRel.newFromId(this.field.call(this, name), onRetrieve)
                })
            },
            
            addSetter: function (classObject) {
                var name       = this.getName()
                var methodName = this.setterName();
                
                var attr = this;
                
                classObject.meta.addMethod(methodName, function (object) {
                    if(object && object.meta) {
                        var classOfRel = attr.getIsa()
                        this.field(name, object.field(classOfRel.primaryKey()))
                    } else {
                        this.field(name, object)
                    }
                })
            }
        }
    })
    
    // Attribute meta class for HasMany relations. Add a getter to retrive a collection of related objects
    Class("HasMany", {
        isa: module.HasOne,
        
        methods: {
            addGetter: function (classObject) {
                var name       = this.getName();
                var props      = this.getProps();
                var getterName = this.getterName();
                var classOfRel = this.getIsa();
                
                var foreignKey = props.foreignKey
                
                if(!foreignKey) {
                    foreignKey = classObject.foreignKey();
                }

                var attr  = this;
                
                var methodName = "get"+Joose.S.uppercaseFirst(name)
                
                classObject.meta.addMethod(methodName, function (onSelect) {
                    
                    if(typeof onSelect != "function") {
                        throw new Error("Please supply an onSelect handler to method "+methodName)
                    }
                    
                    var classOfRel = attr.getIsa();
                    var sql        = "FROM "+classOfRel.tableName()+" WHERE "+foreignKey+" = ?";
                    
                    return classOfRel.select(sql, [this.field(this.constructor.primaryKey())], onSelect)
                })
            }
        }
    })
    
    // Superclass for all entity
    Class("Entity", {
        meta: module.EntityMetaClass,
        isAbstract: true,
        
        has: {
            isNewEntity: {
                init: true
            }
        },
        
        methods: {
            
            field: function (fieldName, newValue) {
                if(arguments.length > 1) {
                    this[fieldName] = newValue
                }
                return this[fieldName]
            },
            
            objectToVal: function (object) {
                if(object && object.meta) {
                    if(object.meta.isa(ORM.Entity)) {
                        return object.field(object.constructor.primaryKey())
                    }
                    throw new Error("unsupported oject found in entity: "+object)
                }
                return object
            },
            
            save: function (onSave) {
                var me   = this;
                var c    = this.constructor;
                var meta = me.meta;
                
                if(this.isNewEntity) {
                    
                    var args    = [];
                    var queries = [];
                    var fields  = c.fields()
                    
                    Joose.A.each(fields, function (field) {
                        if(field != "rowid") {
                            var getterName = meta.getAttribute(field).getterName()
                            var value = me.objectToVal(me[getterName]());
                            args.push(value);
                            queries.push("?")
                        }
                    })
                    
                    var values = queries.join(",")
                
                    var sql = "INSERT INTO "+c.tableName()+" VALUES ("+values+")";
                    
                    module.executeSql(sql, args, function onInsertSuccessful (result) {
                        if(window.console)
                            console.log("INSERTED into "+c.tableName()+" row with id "+result.insertId)
                        me.field(c.primaryKey(), result.insertId)
                        me.isNewEntity = false
                        if(onSave) onSave(me)
                    })

                } else {                
                    var set  = [];
                    var args = [];
                    Joose.A.each(c.fields(), function (field) {
                        if(field != "rowid") {
                            var getterName = meta.getAttribute(field).getterName()
                            var value      = me.objectToVal(me[getterName]())
                            args.push(value);
                            set.push(field + " = ?")
                        }
                    })
                    
                    var setString = set.join(", ");
                
                    args.push(this[c.primaryKey()])
                
                    var sql = "UPDATE "+c.tableName()+" SET "+setString+" WHERE "+c.primaryKey() + " = ? ";
                
                    module.executeSql(sql, args, function onUpdateSuccessful() {
                        if(window.console)
                            console.log("UPDATED in table "+c.tableName())
                        if(onSave) onSave(me)
                    })
                }
            },
            
            destroy: function (onDestroy) {
                var me = this;
                var c  = this.constructor;
                
                var sql = "DELETE FROM "+c.tableName()+" WHERE "+c.primaryKey() + " = ? ";
                module.executeSql(sql, [me.getRowid()], function onDestroySuccessful () {
                    if(window.console)
                        console.log("DELETED FROM table "+c.tableName())
                    if(onDestroy) onDestroy(me)
                })
            }
        },
        
        classMethods: {
            
            newFromId: function (id, onFind, onNotFind) {
                if(typeof onFind != "function") {
                    throw new Error("Please supply an onFind function")
                }
                var me  = this;
                var sql = "FROM "+this.tableName()+" WHERE "+this.primaryKey()+" = ? ";
                
                this.select(sql, [id], function onNewFromIdSuccessful (selected) {
                    if(!selected[0]) {
                        if(onNotFind) {
                            onNotFind(id)
                        } else {
                            throw "Cant find row "+id+" in "+me.tableName()
                        }
                    } else {
                        onFind(selected[0])
                    }
                })
            },
            
            selectAll: function (onSelect) {
                this.select("FROM "+this.tableName(), [], onSelect)
            },
            
            select: function (sqlPart, args, onSelect) {
                if(typeof onSelect != "function") {
                    throw new Error("Please supply an onSelect function while selecting from "+this)
                }
                var me        = this;
                var tableName = this.tableName();
                
                var sql = "SELECT "+tableName+".rowid, "+tableName+".* " + sqlPart;
                
                var rs = module.executeSql(sql, args, function onSelectSuccessful (result) {
                    var a  = [];
                    
                    for(var i = 0; i < result.rows.length; i++) {
                        var row = result.rows.item(i)
                        if(window.console)
                            console.log("Retrieved row "+(i+1))
                        var o = me.meta.instantiate();

                        Joose.A.each(me.fields(), function (field) {
                            var setterName = "set"+Joose.S.uppercaseFirst(field);
                            o[setterName](row[field])
                        })
                        o.isNewEntity = false
                        a.push(o)
                        if(window.console)
                            console.log("Created "+o)
                    }
                    onSelect(a)
                });
                
                
            },
            
            tableName: function () {
                throw "subclass resposibility"
            },
            
            primaryKey: function () {
                return "rowid"
            },
            
            foreignKey: function () {
                return this.tableName()
            }
        }
    });
    
})
