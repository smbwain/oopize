/**
 * @author Roman Ditchuk
 *  email: me@ototak.net
 * @license MIT
 */

'use strict';

var copy = function(to, from) {
    for(var i in from) {
        if(from.hasOwnProperty(i)) {
            to[i] = from[i];
        }
    }
};

/**
 *
 * @param {object|function} [instanceConstructor]
 * @param {object|function} [classConstructor]
 * @returns {constructor}
 */
var oopize = function(instanceConstructor, classConstructor) {
    return oopize.inherit(Object, instanceConstructor, classConstructor);
};

/**
 *
 * @param {function} superConstructor
 * @param {object|function} [instanceDescription]
 * @param {object|function} [classDescription]
 * @returns {constructor}
 */
oopize.inherit = function(superConstructor, instanceDescription, classDescription) {
    var constructor = function() {
        constructor.prototype.init.apply(this, arguments);
    };

    var F = function() {};
    F.prototype = superConstructor.prototype;
    constructor.prototype = new F();
    constructor.prototype.init = function() {
        superConstructor.apply(this, arguments);
    };

    constructor.parent = superConstructor;
    /**
     *
     * @param {object|function} [instanceConstructor]
     * @param {object|function} [classConstructor]
     * @returns {constructor}
     */
    constructor.extend = function(instanceConstructor, classConstructor) {
        return oopize.inherit(this, instanceConstructor, classConstructor);
    };

    if(typeof instanceDescription == 'function') {
        instanceDescription = instanceDescription(superConstructor.prototype, constructor);
    }
    instanceDescription && copy(constructor.prototype, instanceDescription);

    if(typeof classDescription == 'function') {
        classDescription = classDescription(superConstructor, constructor);
    }
    classDescription && copy(constructor, classDescription);

    return constructor;
};

module.exports = oopize;