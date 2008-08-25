plan(20)

//if(!window.google || !window.google.gears || !window.openDatabase) {
    //    document.write("You need to install Google Gears or use a browser with HTML5 database support like WebKit to run the database example. <br><a href='http://gears.google.com/'>Download it here.</a>")
//}


ORM.openDatabase('databaseormtest6', "1.0", "Test-DB", 200000);
ORM.transaction(function (tx) {
    tx.executeSql('create table if not exists car' +
    ' (model TEXT, brand TEXT, owner INTEGER);');
    tx.executeSql('create table if not exists person' +
    ' (name TEXT, car INTEGER, mother INTEGER, city TEXT);');
    tx.executeSql('create table if not exists ormhack' +
    ' (owner INTEGER);');
    tx.executeSql('INSERT INTO ormhack VALUES(1);',
    null,
    function (tx, result) {
        ORM.tx = tx
        
        Module("MyEntities", function (m) {
            
            Class("Car", {
                isa:  ORM.Entity,
                
                has: {
                    owner: {
                        metaclass: ORM.HasOne,
                        isa:       function () { return m.Person }
                    }
                },
                
                classMethods: {
                    tableName: function () {
                        return "car"
                    }
                }
            })
            
            Class("Person", {
                isa:  ORM.Entity,
                
                classMethods: {
                    tableName: function () {
                        return "person"
                    }
                },
                
                has: {
                    mother: {
                        metaclass: ORM.HasOne,
                        isa:       function () { return m.Person }
                    },
                    
                    cars: {
                        metaclass:  ORM.HasMany,
                        isa:        function () { return m.Car },
                        foreignKey: "owner"
                    }
                }
            });
        })
        
        
        ORM.transaction(function (tx) {
            
            var mother = new MyEntities.Person();
            
            mother.setName("elke");
            mother.setCity("Elmshorn");
            ok(mother.isNewEntity, "... mother is a new entity object")
            
            function testPerson (person) {
                canOk(person, "getRowid")
                canOk(person, "getName", "... there is a name method")
                isEq(person.getName(), "malte", "... name is correct")
                isEq(person.getCity(), "Hamburg", "... city is correct")
                person.getMother(function (mother) {
                    ok(mother, "... can fetch mother")
                    isEq(mother.getName(), "elke", "... mother name is correct")
                    isEq(mother.getCity(), "Elmshorn", "... mother city is correct")
                })
                
                
                ok(person.getCars, "... there is a cars method")
                person.getCars(function (cars) {
                    for(var i = 0; i < 10; i++) {
                        canOk(cars[i], "getBrand")
                        isEq(cars[i].getBrand(), "bmw", "... brand is correct");
                        isEq(cars[i].getModel(), "3."+i, "... model is correct");
                        canOk(cars[i], "getOwner")
                        cars[i].getOwner(function (owner) {isEq(owner.getName(), "malte", "... owner name is correct")})
                    }
                    var count = cars.length
                    ok(count == 10, "... there are only 10 cars: "+count)
                });
            }
            
            mother.save(function () {
                ok(!mother.isNewEntity, "... mother is now saved")
                
                var person = new MyEntities.Person();
                
                person.setName("malte");
                person.setCity("Hamburg");
                person.setMother(mother)
                person.save(function () {
                    
                    var i = 0;
                    function makeCar() {
                        var car = new MyEntities.Car();
                        car.setModel("3."+i);
                        car.setBrand("bmw");
                        car.setOwner(person);
                        car.save(function () {
                            if(++i < 10) {
                                makeCar()
                                } else {
                                testPerson(person)
                                MyEntities.Person.newFromId(person.getRowid(), function (aPerson) {
                                    testPerson(aPerson)
                                    endTests()
                                })
                                
                            }
                        })
                    }
                    
                    makeCar()
        })})})
        
})})