import forEach from 'array-for-each-x';
import $defineProperty from 'object-define-property-x';
import toObject from 'to-object-x';
import assertIsObject from 'assert-is-object-x';
import getKeys from 'get-own-enumerable-keys-x';

export const defineProperty = $defineProperty;

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
const defineProperties = function defineProperties(object, properties) {
  assertIsObject(object);
  const props = toObject(properties);
  forEach(getKeys(props), function defineProp(property) {
    if (property !== '__proto__') {
      $defineProperty(object, property, props[property]);
    }
  });

  return object;
};

export default defineProperties;
