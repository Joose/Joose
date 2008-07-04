Module("ORM", function (m) {
    
    Class("DBHandle", {
        has: {
            handle: {
                is: "rw"
            }
        },
        
        methods: {
            
            lastInsertRowId: function () {
                return this.getHandle().lastInsertRowId
            },
            
            execute: function(sql, args) {
                if(window.console) {
                    console.log(sql + " -> " + args)
                }
                return this.getHandle().execute(sql, args)
            }
        }
    })
    
    Class("EntityMetaClass", {
        isa: Joose.Class,
        
        methods: {
            // get all fields of table of the class I represent
            fetchFields: function () {
                
                var c = this.getClassObject();
                
                var tableName = c.tableName();
                
                var rs = window.db.execute("SELECT * FROM "+tableName + " WHERE 0 = 1");
                
                var fields = ["rowid"];
                
                for(var i = 0; i < rs.fieldCount(); i++) {
                    fields.push(rs.fieldName(i))
                }
                
                return fields;
            },
            
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
            }
        },
        
        after: {
            buildComplete: function () {
                
                if(this.isAbstract) {
                    return
                }
                
                var fields = this.fetchFields();
                
                var me     = this;
                
                this.addClassMethod("fields", function () {
                    return fields;
                })
                
                Joose.A.each(fields, function (field) {
                    if(!me.can(field)) {
                        me.addMethod(field, function () {
                            return this.field.apply(this, Joose.A.concat([field], arguments))
                        })
                    }
                })
            }
        }
    });
    
    Class("HasOne", {
        isa: Joose.Attribute,
        
        methods: {
            
            handleProps: function (classObject) {
                this.addGetter(classObject)
            },
            
            addGetter: function (classObject) {
                var name = this.getName()
                
                var attr = this;
                
                classObject.meta.addMethod(name, function () {
                    var classOfRel = attr.getIsa()
                    if(arguments.length > 0) {
                        var object = arguments[0]
                        this.field(name, object.field(object.constructor.primaryKey()))
                    }
                    return classOfRel.newFromId(this.field.call(this, name))
                })
            }
        }
    })
    
    Class("HasMany", {
        isa: m.HasOne,
        
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
                
                classObject.meta.addMethod(name, function () {
                    
                    var classOfRel = attr.getIsa();
                    var sql        = "FROM "+classOfRel.tableName()+" WHERE "+foreignKey+" = ?";
                    
                    return classOfRel.select(sql, [this.field(this.constructor.primaryKey())])
                })
            }
        }
    })
    
    Class("Entity", {
        meta: m.EntityMetaClass,
        isAbstract: true,
        
        has: {
            _data: {
                init: function () { return {} }
            },
            isNewEntity: {
                init: true
            }
        },
        
        methods: {
            
            field: function (fieldName, newValue) {
                if(arguments.length > 1) {
                    this._data[fieldName] = newValue
                }
                return this._data[fieldName]
            },
            
            save: function () {
                
                var c = this.constructor;
                
                if(this.isNewEntity) {
                    
                    var args    = [];
                    var queries = [];
                    var me      = this;
                    Joose.A.each(c.fields(), function (field) {
                        if(field != "rowid") {
                            var value = me.field(field)
                            args.push(value);
                            queries.push("?")
                        }
                    })
                    
                    var values = queries.join(",")
                
                    var sql = "INSERT INTO "+c.tableName()+" VALUES ("+values+")";
                
                    window.db.execute(sql, args)
                    
                    this.field(c.primaryKey(), window.db.lastInsertRowId())
                    
                    this.isNewEntity = false
                    
                } else {                
                    var set  = "";
                    var args = [];
                    Joose.O.each(this._data, function (value, field) {
                        args.push(value);
                        set += field + " = ?"
                    })
                
                    args.push(this._data[c.primaryKey()])
                
                    var sql = "UPDATE "+c.tableName()+" SET "+set+" WHERE "+c.primaryKey() + " = ? ";
                
                    window.db.execute(sql, args)
                }
            }
        },
        
        classMethods: {
            
            newFromId: function (id) {
                var sql = "FROM "+this.tableName()+" WHERE "+this.primaryKey()+" = ? ";
                
                var a = this.select(sql, [id])
                if(!a[0]) {
                    throw "Cant find row "+id+" in "+this.tableName()
                }
                return a[0]
            },
            
            select: function (sqlPart, args) {
                
                var tableName = this.tableName();
                
                var sql = "SELECT "+tableName+".rowid, "+tableName+".* " + sqlPart;
                
                var rs = window.db.execute(sql, args);
                
                var a  = [];
                
                while(rs.isValidRow()) {
                    if(window.console)
                           console.log("Retrieved row")
                    var o = this.meta.instantiate();
                    var data = {};
                    Joose.A.each(this.fields(), function (field) {
                        data[field] = rs.fieldByName(field)
                    })
                    o._data = data
                    o.isNewEntity = false
                    rs.next();
                    a.push(o)
                }
                return a
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
    })
    
})
