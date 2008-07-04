plan(20)

JooseGearsInitializeGears()     

if(!window.google || !window.google.gears) {
    document.write("You need to install Google Gears to run the database example. <br><a href='http://gears.google.com/'>Download it here.</a>")
}

window.db = new ORM.DBHandle();
var handle = google.gears.factory.create('beta.database');
handle.open('database-ormtest3');

window.db.setHandle(handle);

window.db.execute('create table if not exists person' +
    ' (name TEXT, car INTEGER, mother INTEGER, city TEXT)');


window.db.execute('create table if not exists car' +
    ' (model TEXT, brand TEXT, owner INTEGER)');
    

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

var mother = new MyEntities.Person();

mother.name("elke");
mother.city("Elmshorn");
ok(mother.isNewEntity, "... mother is a new entity object")
mother.save()
ok(!mother.isNewEntity, "... mother is now saved")

var person = new MyEntities.Person();

person.name("malte");
person.city("Hamburg");
person.mother(mother)
person.save()


for(var i = 0; i < 10; i++) {
    var car = new MyEntities.Car();
    car.model("3."+i);
    car.brand("bmw");
    car.owner(person);
    car.save()
}

function testPerson (person) {
    canOk(person, "rowid")
    canOk(person, "name", "... there is a name method")
    isEq(person.name(), "malte", "... name is correct")
    isEq(person.city(), "Hamburg", "... city is correct")
    ok(person.mother(), "... cat fetch mother")
    isEq(person.mother().name(), "elke", "... mother name is correct")
    isEq(person.mother().city(), "Elmshorn", "... mother city is correct")
    
    ok(person.cars, "... there is a cars method")
    var cars = person.cars();

    for(var i = 0; i < 10; i++) {
        canOk(cars[i], "brand")
        isEq(cars[i].brand(), "bmw", "... brand is correct");
        isEq(cars[i].model(), "3."+i, "... model is correct");
        canOk(cars[i], "owner")
        isEq(cars[i].owner().name(), "malte", "... owner name is correct")
    }
    
    ok(!cars[10], "... there are only 10 cars")
}

testPerson(person)
testPerson(MyEntities.Person.newFromId(person.rowid()))

endTests()
