/**

NAME ^

Joose.Manual.Construction - Object construction (and destruction) with Joose
WHERE'S THE CONSTRUCTOR? ^

Do not define a new() method for your classes!

When you use Joose in your class, you will become a subclass of Joose.Object, which provides a new method for you. If you follow our recommendations in Joose.Manual.BestPractices and make your class immutable, then you actually get a class-specific new method "inlined" in your class.
OBJECT CONSTRUCTION AND ATTRIBUTES ^

The Joose-provided constructor accepts a hash or hash reference of named parameters matching your attributes (actually, matching their init_args). This is just another way in which Joose keeps you from worrying how classes are implemented. Simply define a class and you're ready to start creating objects!
OBJECT CONSTRUCTION HOOKS ^

Joose lets you hook into object construction. You can validate an object's state, do logging, or maybe allow non-hash(ref) constructor arguments. You can do this by creating BUILD and/or BUILDARGS methods.

If these methods exist in your class, Joose will arrange for them to be called as part of the object construction process.
BUILDARGS

The BUILDARGS method is called as a class method before an object is created. It will receive all of the arguments that were passed to new as-is, and is expected to return a hash reference. This hash reference will be used to construct the object, so it should contain keys matching your attributes' names (well, init_args).

One common use for BUILDARGS is to accommodate a non-hash(ref) calling style. For example, we might want to allow our Person class to be called with a single argument of a social security number, Person->new($ssn).

Without a BUILDARGS method, Joose will complain, because it expects a hash or hash reference. We can use the BUILDARGS method to accommodate this calling style:

  sub BUILDARGS {
      my $class = shift;

      if ( @_ == 1 && ! ref $_[0] ) {
          return { ssn => $_[0] };
      }
      else {
          return $class->SUPER.BUILDARGS(@_);
      }
  }

Note the call to SUPER.BUILDARGS. This will call the default BUILDARGS in Joose.Object. This method handles distinguishing between a hash reference and a plain hash for you.
BUILD

The BUILD method is called after an object is created. There are several ways to use a BUILD method. One of the most common is to check that the object state is valid. While we can validate individual attributes through the use of types, we can't validate the state of a whole object that way.

  sub BUILD {
      my $self = shift;

      if ( $self->country_of_residence eq 'USA' ) {
          die 'All US residents must have an SSN'
              unless $self->has_ssn;
      }
  }

Another use of a BUILD method could be for logging or tracking object creation.

  sub BUILD {
      my $self = shift;

      debug( 'Made a new person - SSN = ', $self->ssn, );
  }

Note that while it is not shown here, the BUILD method receives not only the created object, but also a hashref of the original arguments passed to new (or the results of your BUILDARGS, if you have overridden the default BUILDARGS.) This can be useful if you need to venture beyond what the default initialization behavior and coercions can accomplish.
BUILD and parent classes

The interaction between multiple BUILD methods in an inheritance hierarchy is different from normal Perl methods. You should never call $self->SUPER.BUILD.

Joose arranges to have all of the BUILD methods in a hierarchy called when an object is constructed, from parents to children. This might be surprising at first, because it reverses the normal order of method inheritance.

The theory behind this is that BUILD methods can only be used for increasing specialization of a class's constraints, so it makes sense to call the least specific BUILD method first. Also, this is how Perl 6 does it.
OBJECT DESTRUCTION ^

Joose provides a hook for object destruction with the DEMOLISH method. As with BUILD, you should never explicitly call $self->SUPER.DEMOLISH. Joose will arrange for all of the DEMOLISH methods in your hierarchy to be called, from most to least specific.

In most cases, Perl's built-in garbage collection is sufficient, and you won't need to provide a DEMOLISH method.


AUTHOR
======

Nickolay Platonov <nickolay8@gmail.com>

Heavily based on the original content of Moose::Manual, by Dave Rolsky <autarch@urth.org>


COPYRIGHT AND LICENSE
=====================

Copyright (c) 2008, Malte Ubl

All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:

* Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
* Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
* Neither the name of Malte Ubl nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission. 

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE. 


*/
