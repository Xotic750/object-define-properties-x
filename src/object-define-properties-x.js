/**
 * @file Sham for Object.defineProperties.
 * @version 4.2.0
 * @author Xotic750 <Xotic750@gmail.com>
 * @copyright  Xotic750
 * @license {@link <https://opensource.org/licenses/MIT> MIT}
 * @module object-define-properties-x
 */

const forEach = require('array-for-each-x');
const defineProperty = require('object-define-property-x');
const toObject = require('to-object-x');
const assertIsObject = require('assert-is-object-x');
const getKeys = require('get-own-enumerable-keys-x');

/**
 * This method defines new or modifies existing properties directly on an
 * object, returning the object.
 *
 * @param {object} object - The object on which to define or modify properties.
 * @param {object} properties - An object whose own enumerable properties
 *  constitute descriptors for the
 * properties to be defined or modified.
 * @returns {object} The object that was passed to the function.
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
  const props = toObject(properties);
  forEach(getKeys(props), function(property) {
    if (property !== '__proto__') {
      defineProperty(object, property, props[property]);
    }
  });

  return object;
};