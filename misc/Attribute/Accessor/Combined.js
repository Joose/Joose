Role('Joose.Attribute.Accessor.Combined', {
    
    
    have : {
        isCombined        : false
    }, 
    
    
    after : {
        initialize : function() {
            this.isCombined = this.isCombined || /..c/i.test(this.is)
            
            if (this.isCombined) {
                this.slot = '$$' + this.name
                
                this.hasGetter = true
                this.hasSetter = false
                
                this.setterName = this.getterName = this.publicName
            }
        }
    },
    
    
    override : {
        
        getGetter : function() {
            var getter    = this.SUPER()
            
            if (!this.isCombined) return getter
            
            var setter    = this.getSetter()
            
            var me = this
            
            return function () {
                
                if (!arguments.length) {
                    if (me.readable) return getter.call(this)
                    throw new Error("Call to getter of unreadable attribute: [" + me.name + "]")
                }
                
                if (me.writeable) return setter.apply(this, arguments)
                
                throw new Error("Call to setter of read-only attribute: [" + me.name + "]")    
            }
        }
    }
    
})


/**

Name
====


Joose.Attribute.Accessor.Combined - a role, combining setter and getter methods into one, ala perl


SYNOPSIS
========

            Class('Some.Class', { 
                has : {
                    attr : {
                        is : 'rwc',
                        
                        init : 'some init value'
                    }
                }
            })
            
            var instance = new Some.Class()
            
            instance.attr() == 'some init value'  // call to combined accessor as getter
            
            instance.attr('some other value')     // call to combined accessor as setter
            
            instance.attr() == 'some other value' // attribute was changed


DESCRIPTION
===========

This role combines the getter and setter methods into one, having the same name as attribute itself.

Call this method without arguments will be directed to the actual getter call.

Call with some arguments provided will be directed to setter call.

Its safe to combine this role with Lazy and Trigger, but it should be applied after them.


USAGE
=====

To enable this role provide the trailing `c` character in attribute's `is` option: 

            has : {
                attr : {
                    is : 'rwc',
                    
                    init : 'some init value'
                }
            }
            
Alternatively, explicitly specify `isCombined` option with some `true` value:

            has : {
                attr : {
                    is : 'rw',
                    
                    isCombined : true,
                    
                    init : 'some init value'
                }
            }
            

SEE ALSO
========

[Main documentation page](../../Attribute.html)



AUTHORS
=======

Nickolay Platonov <nplatonov@cpan.org>



COPYRIGHT AND LICENSE
=====================

Copyright (c) 2009, Nickolay Platonov

All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:

* Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
* Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
* Neither the name of Nickolay Platonov nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission. 

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE. 


*/
