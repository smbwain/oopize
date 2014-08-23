
var oopize = require('../lib/oopize');


var MagicAnimal = oopize({
    say: function() {
        return 'hey, dude!';
    }
});

var a = new MagicAnimal();
console.log( a.say() ); // hey, dude!

//

var MagicDog = MagicAnimal.extend(function(parentProto) { return {
    say: function() {
        return parentProto.say.call(this)+' Ruf, ruf!';
    }
}});

var d = new MagicDog();
console.log( d.say() ); // hey, dude! Ruf, ruf!

//

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

//

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

//

var Human = oopize({
    init: function(height) {
        this.height = height || 175;
    },
    getHeight: function() {
        return this.height;
    }
});

var Programmer = Human.extend({});
var programmer = new Programmer();
console.log( programmer.getHeight() ); // 175

var Hobbit = Human.extend(function(parentProto) { return {
    init: function(height) {
        parentProto.init.call(this, height || 107);
    }
}});
var hobbit = new Hobbit();
console.log( hobbit.getHeight() ); // 107