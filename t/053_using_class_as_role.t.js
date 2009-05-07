StartTest(function(t) {
	t.plan(7)
	
    //==================================================================================================================================================================================
    t.diag("Using Class as Role");
    
    
    Class('PseudoRole', {
    	have : {
            res : 'pseudoRole'
        },
        
        methods : {
            process : function () {
                return 'processFromPseudoRole'
            }
        },
        
        
        after : {
            process : function () {
                this.res = 'resFromAfter'
            }
        }
    });
    t.ok(PseudoRole, 'PseudoRole class was created');
    
    t.ok(PseudoRole.meta.hasAttribute('res') && PseudoRole.meta.getAttribute('res').value == 'pseudoRole', "pseudoRole has correct attribute 'res'");
    t.ok(PseudoRole.meta.hasMethod('process') && new PseudoRole().process() == 'processFromPseudoRole', "PseudoRole has method 'process'");

    
    Class('Resource', {
    	does : [ PseudoRole ],
        
        methods : {
            process : function () {
                return 'processFromResource'
            }
        }
    });
    t.ok(Resource, 'Resource class was created');
    
    t.ok(Resource.meta.hasAttribute('res') && Resource.meta.getAttribute('res').value == 'pseudoRole', "Resource has correct attribute 'res'");
    
    var resource = new Resource();
    
    t.ok(Resource.meta.hasMethod('process') && resource.process() == 'processFromResource', "Resource has correct method 'process'");
    t.ok(resource.res == 'resFromAfter', 'method modifier was recevied from PseudoRole')

});