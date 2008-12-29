Module("Addressable", function () {
    
    Class("GearsDBHash", {
        
        has: {
        
            _name: {
            	isa: TYPE.Str,
            	required: true
            },
        
            db: {},
            
            expires: { // in seconds
                is: "rw",
                init: 0
            }
        },
        
        after: {
        	initialize: function () {
                var db = google.gears.factory.create('beta.database');
                db.open('key-value-store');
                db.execute('create table if not exists '+this.tableName() +
                    ' (id text PRIMARY KEY, value text, expirationTime int)');
                this.db = db;
            }
        },
    
        methods: {
            tableName: function () {
                return "pair"+this._name
            },
            
            _now: function () {
                return Math.round(new Date().getTime() / 1000)
            },
            
            get: function (key) {
                var select = "SELECT value, expirationTime FROM "+this.tableName()+" WHERE id = ?";
                var rs     = this.db.execute(select, [key])
                var value, time;
                var count  = 0;
                while (rs.isValidRow()) {
                    value = rs.field(0);
                    time  = rs.field(1);
                    rs.next();
                    count++;
                }
                
                if(count == 0) {
                    return null
                }
                
                if(time && this._now() > time) {
                    return null
                }
                
                return value
            },
            
            set: function (key, value, expires) { // expire in seconds;
                var insert = "REPLACE INTO "+this.tableName()+" VALUES(?, ?, ?)";
                
                if(expires == null) {
                    expires = this.expires;
                }
                if(expires) {
                    expires = this._now() + expires
                }
                if(!expires) {
                    expires = 0;
                }
                
                var rs     = this.db.execute(insert, [key, value, expires]);
            },
            
            keys: function () {
                return this._rsToArray(this.db.execute("SELECT id FROM "+this.tableName() + " WHERE expirationTime = 0 OR expirationTime > ?", [this._now()]))
            },
            
            values: function () {
                return this._rsToArray(this.db.execute("SELECT value FROM "+this.tableName() + " WHERE expirationTime = 0 OR expirationTime > ?", [this._now()]))
            },
            
            clear: function () {
                this.db.execute("DELETE FROM "+this.tableName()+" WHERE expirationTime > 0 AND expirationTime > ?", [this._now()])
            },
            
            _rsToArray: function (rs) {
                var a = [];
                while (rs.isValidRow()) {
                    var val  = rs.field(0);
                    a.push(val)
                    rs.next();
                }
                return a
            }
        }
        
    })
})