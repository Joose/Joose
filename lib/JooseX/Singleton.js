Module("JooseX", function (m) {
   
   var registry = {};
   var locked   = true;
   
   /**
    * JooseX.Singleton
    * Role for singleton classes.
    * Gives a getInstance class method to classes using this role.
    * The getInstance method will create a method on first invocation and return the same instance
    * upon every consecutive invocation.
    */
   Role("Singleton", {
       
       before: {
           initialize: function () {
               if(locked) {
                   var name = this.meta.className()
                   throw new Error("The class "+name+" is a singleton. Please use the class method getInstance().")
               }
           }
       },
       
       methods: {
            singletonInitialize: function () {
                
            }
       },
       
       classMethods: {
           getInstance: function () {
               var name     = this.meta.className();
               var instance = registry[name];
               if(instance) {
                   return instance;
               }
               locked = false;
               instance            = this.meta.instantiate()
               locked = true;
               instance.singletonInitialize()
               registry[name] = instance
               return instance;
           }
       }
   })
})