/**
 * @file
 * <a href="https://travis-ci.org/Xotic750/object-define-properties-x"
 * title="Travis status">
 * <img
 * src="https://travis-ci.org/Xotic750/object-define-properties-x.svg?branch=master"
 * alt="Travis status" height="18">
 * </a>
 * <a href="https://david-dm.org/Xotic750/object-define-properties-x"
 * title="Dependency status">
 * <img src="https://david-dm.org/Xotic750/object-define-properties-x.svg"
 * alt="Dependency status" height="18"/>
 * </a>
 * <a
 * href="https://david-dm.org/Xotic750/object-define-properties-x#info=devDependencies"
 * title="devDependency status">
 * <img src="https://david-dm.org/Xotic750/object-define-properties-x/dev-status.svg"
 * alt="devDependency status" height="18"/>
 * </a>
 * <a href="https://badge.fury.io/js/object-define-properties-x" title="npm version">
 * <img src="https://badge.fury.io/js/object-define-properties-x.svg"
 * alt="npm version" height="18">
 * </a>
 *
 * Sham for Object.defineProperties
 *
 * Requires ES3 or above.
 *
 * @version 1.0.0
 * @author Xotic750 <Xotic750@gmail.com>
 * @copyright  Xotic750
 * @license {@link <https://opensource.org/licenses/MIT> MIT}
 * @module object-define-properties-x
 */

/* eslint strict: 1, max-statements: 1, complexity: 1, id-length: 1 */

/* global module, document */

;(function () { // eslint-disable-line no-extra-semi

  'use strict';

  var forEach = require('foreach');
  var $keys = require('object-keys');
  var $defineProperty = require('object-define-property-x');
  var $defineProperties = Object.defineProperties;

  // ES5 15.2.3.6
  // http://es5.github.com/#x15.2.3.6

  // Patch for WebKit and IE8 standard mode
  // Designed by hax <hax.github.com>
  // related issue: https://github.com/es-shims/es5-shim/issues#issue/5
  // IE8 Reference:
  //     http://msdn.microsoft.com/en-us/library/dd282900.aspx
  //     http://msdn.microsoft.com/en-us/library/dd229916.aspx
  // WebKit Bugs:
  //     https://bugs.webkit.org/show_bug.cgi?id=36423

  var doesDefinePropertyWork = function _doesDefinePropertyWork(object) {
    try {
      $defineProperty(object, 'sentinel', {});
      return 'sentinel' in object;
    } catch (exception) {
      return false;
    }
  };

  // check whether defineProperty works if it's given. Otherwise,
  // shim partially.
  if ($defineProperty) {
    var definePropertyWorksOnObject = doesDefinePropertyWork({});
    var definePropertyWorksOnDom = typeof document === 'undefined' || doesDefinePropertyWork(document.createElement('div'));
    if (!definePropertyWorksOnObject || !definePropertyWorksOnDom) {
      var definePropertiesFallback = Object.defineProperties;
    }
  }

  // ES5 15.2.3.7
  // http://es5.github.com/#x15.2.3.7
  if (!$defineProperties || definePropertiesFallback) {
    $defineProperties = function defineProperties(object, properties) {
      // make a valiant attempt to use the real defineProperties
      if (definePropertiesFallback) {
        try {
          return definePropertiesFallback.call(Object, object, properties);
        } catch (exception) {
          // try the shim if the real one doesn't work
        }
      }

      forEach($keys(properties), function (property) {
        if (property !== '__proto__') {
          $defineProperty(object, property, properties[property]);
        }
      });
      return object;
    };
  }

  /**
   * This method defines new or modifies existing properties directly on an object, returning the object.
   *
   * @param {Object} object The object on which to define or modify properties.
   * @param {Object} properties An object whose own enumerable properties constitute descriptors for the
   * properties to be defined or modified.
   * @return {Object} The object that was passed to the function.
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
  module.exports = $defineProperties;
}());
