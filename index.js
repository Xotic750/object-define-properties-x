/**
 * @file Sham for Object.defineProperties
 * @version 3.1.0
 * @author Xotic750 <Xotic750@gmail.com>
 * @copyright  Xotic750
 * @license {@link <https://opensource.org/licenses/MIT> MIT}
 * @module object-define-properties-x
 */

'use strict';

var forEach = require('array-for-each-x');
var objectKeys = require('object-keys-x');
var defineProperty = require('object-define-property-x');
var getOPS = require('get-own-property-symbols-x');
var filter = require('array-filter-x');
var toObject = require('to-object-x');
var propertyIsEnumerable = require('property-is-enumerable-x');
var assertIsObject = require('assert-is-object-x');
var concat = Array.prototype.concat;

var getKeys = function _getKeys(obj) {
  return concat.call(objectKeys(obj), filter(getOPS(obj), function (sym) {
    return propertyIsEnumerable(obj, sym);
  }));
};

/**
 * This method defines new or modifies existing properties directly on an
 * object, returning the object.
 *
 * @param {Object} object - The object on which to define or modify properties.
 * @param {Object} properties - An object whose own enumerable properties
 *  constitute descriptors for the
 * properties to be defined or modified.
 * @returns {Object} The object that was passed to the function.
 * @example
 * var defineProperties = require('object-define-properties-x');
 *
 * var obj = {};
 * defineProperties(obj, {
 *   'property1': {
 *     value: true,
 *     writable: true
 *   },
 *   'property2': {
 *     value: 'Hello',
 *     writable: true
 *   }
 *   // etc. etc.
 * });
 */
module.exports = function defineProperties(object, properties) {
  assertIsObject(object);
  var props = toObject(properties);
  forEach(getKeys(props), function (property) {
    if (property !== '__proto__') {
      defineProperty(object, property, props[property]);
    }
  });

  return object;
};
