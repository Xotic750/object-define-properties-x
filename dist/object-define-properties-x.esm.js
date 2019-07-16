function _newArrowCheck(innerThis, boundThis) { if (innerThis !== boundThis) { throw new TypeError("Cannot instantiate an arrow function"); } }

import forEach from 'array-for-each-x';
import defineProperty from 'object-define-property-x';
import toObject from 'to-object-x';
import assertIsObject from 'assert-is-object-x';
import getKeys from 'get-own-enumerable-keys-x';
/**
 * This method defines new or modifies existing properties directly on an
 * object, returning the object.
 *
 * @param {object} object - The object on which to define or modify properties.
 * @param {object} properties - An object whose own enumerable properties
 *  constitute descriptors for the
 * properties to be defined or modified.
 * @returns {object} The object that was passed to the function.
 */

export default function defineProperties(object, properties) {
  var _this = this;

  assertIsObject(object);
  var props = toObject(properties);
  forEach(getKeys(props), function (property) {
    _newArrowCheck(this, _this);

    if (property !== '__proto__') {
      defineProperty(object, property, props[property]);
    }
  }.bind(this));
  return object;
}

//# sourceMappingURL=object-define-properties-x.esm.js.map