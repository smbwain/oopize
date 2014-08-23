
oopize
=======

Tiny javaScript library to build your classes inheritance in a convenient way.

How it looks like
===================

Create your base class

```js
var MagicAnimal = oopize({
    say: function() {
        return 'hey, dude!';
    }
});

var a = new MagicAnimal();
console.log( a.say() ); // hey, dude!
```

Extend your class

```js
var MagicDog = MagicAnimal.extend(function(parentProto) { return {
    say: function() {
        return parentProto.say.call(this)+' Ruf, ruf!';
    }
}});

var d = new MagicDog();
console.log( d.say() ); // hey, dude! Ruf, ruf!
```

Extend some 3rd side (not oopized) class

```js
var MagicArray = oopize.inherit(Array, {
    add: function(el) {
        return this.push(el);
    },
    size: function() {
        return this.length;
    }
});

var a = new MagicArray();
a.add(5);
console.log(a.size());
```

API
====

Methods
--------

oopize( _[instanceDescription]_, _[classDescription]_)
-----------------------------------------------------------
Create base class constructor (inherited from Object).

* param _{object|function}_ __[instanceDescription]__
* param _{object|function}_ __[classDescription]__
* returns _{constructor}_

YourClass.extend( _[instanceDescription]_, _[classDescription]_)
---------------------------------------------------------------------

Extend your class. Every constructor, created by one of oopize methods, has method _extend()_.

* param _{object|function}_ __[instanceDescription]__
* param _{object|function}_ __[classDescription]__
* returns _{constructor}_

oopize.inherit( _superConstructor_, _[instanceDescription]_, _[classDescription]_)
---------------------------------------------------------------------------------------

Extend 3rd side class.

* param _{constructor}_ __[superConstructor]__
* param _{object|function}_ __[instanceDescription]__
* param _{object|function}_ __[classDescription]__
* returns _{constructor}_

Features you should know about
-------------------------------

Method init()
------------
Use __method init()__ instead of constructor. This method will be called internally from returned constructor.

```js
var Person = oopize({
    init: function(name) {
        this.name = name;
    },
    getName: function() {
        return this.name;
    }
});

var me = new Person('Roman');
console.log( me.getName() ); // Roman
```

Constructor inheritance
------------------------
__There is constructor inheritance by default__. Default method _init()_ calls parent constructor. But if you define your own _init()_ method, __you could call it or not__.

```js
var Human = oopize({
    // init method in base class
    init: function(height) {
        this.height = height || 175;
    },
    getHeight: function() {
        return this.height;
    }
});

// extend base class without init definition
var Programmer = Human.extend({});
var programmer = new Programmer();
console.log( programmer.getHeight() ); // 175

var Hobbit = Human.extend(function(parentProto) { return {
    // child class init definition
    init: function(height) {
        // call init method of parent class
        parentProto.init.call(this, height || 107);
    }
}});
var hobbit = new Hobbit();
console.log( hobbit.getHeight() ); // 107
```

Instance and class descriptions
--------------------------------

If _instanceDescription_ param __is an object__, all its properties will be copied to your constructor prototype.

If _instanceDescription_ param __is a function__, it will be called once immediately with arguments (parentProto, constructor). This function should return object with properties for your constructor prototype. In this way __you have simple access to parent prototype__ and current constructor. Constructor of parent class is accessible as constructor.parent

_classDescription_ param is similar. If it's an object, all its properties will be copied directly to constructor. If it's a function, it will be called with params (parentConstructor, constructor).

__classDescription properties aren't inheritable__

License
========

__MIT__