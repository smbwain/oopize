/**
 * @author Roman Ditchuk
 *  email: me@ototak.net
 * @license MIT
 */
'use strict';

(function(definition) {
    if(typeof module != 'undefined') {
        module.exports = definition();
    } else if(typeof define == 'function' && typeof define.amd == 'object') {
        define(definition);
    } else {
        window.oopize = definition();
    }
})(function() {

    var copy = function (to, from) {
        for (var i in from) {
            if (from.hasOwnProperty(i)) {
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
    var oopize = function (instanceConstructor, classConstructor) {
        return oopize.inherit(Object, instanceConstructor, classConstructor);
    };

    /**
     *
     * @param {function|Array} superConstructor
     * @param {object|function} [instanceDescription]
     * @param {object|function} [classDescription]
     * @returns {constructor}
     */
    oopize.inherit = function (superConstructor, instanceDescription, classDescription) {
        var constructor = function () {
            constructor.prototype.init.apply(this, arguments);
        };

        var F = function() {};
        F.prototype = superConstructor.prototype;
        constructor.prototype = new F();
        constructor.prototype.init = function () {
            superConstructor.apply(this, arguments);
        };

        constructor.parent = superConstructor;
        /**
         *
         * @param {object|function} [instanceConstructor]
         * @param {object|function} [classConstructor]
         * @returns {constructor}
         */
        constructor.extend = function (instanceConstructor, classConstructor) {
            return oopize.inherit(this, instanceConstructor, classConstructor);
        };
        constructor.extServer = function(instanceConstructor, classConstructor) {
            if(typeof window === 'undefined') {
                return oopize.inherit(this, instanceConstructor, classConstructor);
            }
            return this;
        };
        constructor.extBrowser = function(instanceConstructor, classConstructor) {
            if(typeof window !== 'undefined') {
                return oopize.inherit(this, instanceConstructor, classConstructor);
            }
            return this;
        };

        if (typeof instanceDescription == 'function') {
            instanceDescription = instanceDescription(superConstructor.prototype, constructor);
        }
        instanceDescription && copy(constructor.prototype, instanceDescription);

        if (typeof classDescription == 'function') {
            classDescription = classDescription(superConstructor, constructor);
        }
        classDescription && copy(constructor, classDescription);

        return constructor;
    };

    return oopize;
});