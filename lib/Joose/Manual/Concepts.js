/**

NAME
====

Joose.Manual.Concepts - Joose OO concepts. 

Joose CONCEPTS (VS "RAW" JavaScript)
-----------------------

In the past, you may not have thought too much about the difference between packages and classes, attributes and methods, constructors and methods, etc. With Joose, these are all conceptually separate things, even though under the hood they're implemented with plain old JavaScript.

Our meta-object protocol (aka MOP) provides well-defined introspection features for each of those concepts, and Joose in turn provides distinct sugar for each of them. Joose also introduces additional concepts such as roles, method modifiers, and declarative delegation.

Knowing what these concepts mean in Joose-speak, and how they used to be done in "raw" JavaScript OO is a good way to start learning to use Joose.

Class
-----

At its simplest, a class will consist simply of attributes and/or methods. It can also include roles, method modifiers, and more.

A class has zero or more attributes.

A class has zero or more methods.

A class has zero or one superclasses (aka parent classes). A class inherits from its superclass.

A class has zero or more method modifiers. These modifiers can apply to its own methods or methods that are inherited from its ancestors.

A class does (*consumes*) zero or more roles.

A class has a constructor. Its provided for you "for free" by Joose.

The constructor accepts named parameters corresponding to the class's attributes and uses them to initialize an object instance.

A class has a metaclass, which in turn has meta-attributes, meta-methods, and meta-roles. This metaclass describes the class.

A class is usually analogous to a category of nouns, like "People" or "Users".

    Class('Person', {})
    # now it's a Joose class!


Attribute
---------

An attribute is a property of the class that defines it. It always has a name, and it may have a number of other properties.

These properties can include a read/write flag, accessor method names, a default value, and more.

Attributes are not methods, but defining them causes various accessor methods to be created. Usually, an attribute will always have at least a reader accessor method. Many attributes also have other methods, such as a writer method.

An attribute is something that the class's members have. For example, People have first and last names. Users have passwords and last login datetimes.

      has : {
          firstName : { is : 'rw' }
      }


Method
======

A method is very straightforward. Any subroutine you define in your class is a method.

Methods correspond to verbs, and are what your objects can do. For example, a User can login.

      methods : {
          login : function () {
          }
      }

Roles
=====

A role is something that a class does. We also say that classes *consume* roles (or that a role is *composed* to the class). For example, a Rhinoceros class might do the Horny role, and so could a Unicorn class. A role is used to define some concept that cuts across multiple unrelated classes, like "horny", or "has a color".

A role has zero or more attributes.

A role has zero or more methods.

A role has zero or more method modifiers.

A role has zero or more required methods.

A required method is not implemented by the role. Required methods say "to use this Role you must implement this method".

<A role has zero or more excluded roles
An excluded role is a role that the role doing the excluding says it cannot be combined with.
>

Roles are composed into classes (or other roles). When a role is composed into a class, its attributes and methods are *flattened* into the class. Roles do not show up in the inheritance hierarchy. When a role is composed, its attributes and methods appear as *if they were defined in the consuming class*.

Role are somewhat like mixins or interfaces in other OO languages.

        Role('Horny', {
            has : {
                hornLength : { is : 'rw' }
            },
            
            methods : {
                butt : function () {
                    ...
                }
            }
        })

Method modifiers
----------------

A method modifier is a hook that is called when a named method is called. For example, you could say "before calling login(), call this modifier first". Modifiers come in different flavors like "before", "after", "around", and "augment", and you can apply more than one modifier to a single method.

Method modifiers are often used as an alternative to overriding a method in a parent class. They are also used in roles as a way of modifying methods in the consuming class.

Under the hood, a method modifier is just a plain JavaScript function that gets called before or after (or around, etc.) some named method.

        before : {
            login : function (pwd) {
                alert("Called login() with password : " + pwd)
            }
        }

<Type
Joose also comes with a (miniature) type system. This allows you to define types for attributes. Joose has a set of built-in types based on what Perl provides, such as Str, Num, Bool, HashRef, etc.
In addition, every class name in your application can also be used as a type name.
Finally, you can define your own types, either as subtypes or entirely new types, with their own constraints. For example, you could define a type PosInt, a subtype of Int which only allows positive numbers.
Delegation
Joose attributes provide declarative syntax for defining delegations. A delegation is a method which calls some method on an attribute to do its real work
>


Constructor
-----------

A constructor creates an object instance for the class. In raw JavaScript, this was usually done by defining a method called new() which in turn called bless on a reference.

With Joose, this new() method is created for you, and it simply does the right thing. You should never need to define your own constructor!

Sometimes you want to do something whenever an object is created. In those cases, you can provide a BUILD() method in your class. Joose will call this for you after creating a new object.
Destructor

This is a special method called when an object instance goes out of scope. You can specialize what your class does in this method if you need to, but you usually don't.

With old school Perl 5, this is the DESTROY() method, but with Joose it is the DEMOLISH() method.
Object instance

An object instance is a specific noun in the class's "category". For example, one specific Person or User. An instance is created by the class's constructor.

An instance has values for its attributes. For example, a specific person has a first and last name.

In old school Perl 5, this is often a blessed hash reference. With Joose, you should never need to know what your object instance actually is. (Okay, it's usually a blessed hashref with Joose, too.)
Joose vs old school summary

    * Class

      A package with no introspection other than mucking about in the symbol table.

      With Joose, you get well-defined declaration and introspection.
    * Attributes

      Hand-written accessor methods, symbol table hackery, or a helper module like Class.Accessor.

      With Joose, these are declaratively defined, and distinct from methods.
    * Method

      These are pretty much the same in Joose as in old school Perl.
    * Roles

      Class.Trait or Class.Role, or maybe mixin.pm.

      With Joose, they're part of the core feature set, and are introspectable like everything else.
    * Method Modifiers

      Could only be done through serious symbol table wizardry, and you probably never saw this before (at least in Perl 5).
    * Type

      Hand-written parameter checking in your new() method and accessors.

      With Joose, you define types declaratively, and then use them by name in your attributes.
    * Delegation

      Class.Delegation or Class.Delegator, but probably even more hand-written code.

      With Joose, this is also declarative.
    * Constructor

      A new() method which calls bless on a reference.

      Comes for free when you define a class with Joose.
    * Destructor

      A DESTROY() method.

      With Joose, this is called DEMOLISH().
    * Object Instance

      A blessed reference, usually a hash reference.

      With Joose, this is an opaque thing which has a bunch of attributes and methods, as defined by its class.
    * Immutabilization

      Joose comes with a feature called "immutabilization". When you make your class immutable, it means you're done adding methods, attributes, roles, etc. This lets Joose optimize your class with a bunch of extremely dirty in-place code generation tricks that speed up things like object construction and so on.

META WHAT? ^

A metaclass is a class that describes classes. With Joose, every class you define gets a meta() method. It returns a Joose.Meta.Class object, which has an introspection API that can tell you about the class it represents.

  my $meta = User->meta();

  for my $attribute ( $meta->get_all_attributes ) {
      print $attribute->name(), "\n";

      if ( $attribute->has_type_constraint ) {
          print "  type: ", $attribute->type_constraint->name, "\n";
      }
  }

  for my $method ( $meta->get_all_methods ) {
      print $method->name, "\n";
  }

Almost every concept we defined earlier has a meta class, so we have Joose.Meta.Class, Joose.Meta.Attribute, Joose.Meta.Method, Joose.Meta.Role, Joose.Meta.TypeConstraint, Joose.Meta.Instance, and so on.
BUT I NEED TO DO IT MY WAY! ^

One of the great things about Joose is that if you dig down and find that it does something the "wrong way", you can change it by extending a metaclass. For example, you can have arrayref based objects, you can make your constructors strict (no unknown parameters allowed!), you can define a naming scheme for attribute accessors, you can make a class a Singleton, and much, much more.

Many of these extensions require surprisingly small amounts of code, and once you've done it once, you'll never have to hand-code "your way of doing things" again. Instead you'll just load your favorite extensions.

  package MyWay.User;

  use Joose;
  use JooseX.StrictConstructor
  use JooseX.MyWay;

  has ...;

WHAT NEXT? ^

So you're sold on Joose. Time to learn how to really use it.

If you want to see how Joose would translate directly into old school Perl 5 OO code, check out Joose.Manual.Unsweetened. This might be helpful for quickly wrapping your brain around some aspects of "the Joose way".

Or you can skip that and jump straight to Joose.Manual.Classes and the rest of the Joose.Manual.

After that we recommend that you start with the Joose.Cookbook. If you work your way through all the recipes under the basics section, you should have a pretty good sense of how Joose works, and all of its basic OO features.

After that, check out the Role recipes. If you're really curious, go on and read the Meta and Extending recipes, but those are mostly there for people who want to be Joose wizards and change how Joose works.
AUTHOR ^

Dave Rolsky <autarch@urth.org>
COPYRIGHT AND LICENSE ^

Copyright 2008-2009 by Infinity Interactive, Inc.

http://www.iinteractive.com

This library is free software; you can redistribute it and/or modify it under the same terms as Perl itself.

*/
