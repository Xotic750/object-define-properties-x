<a name="module_object-define-properties-xx"></a>

## object-define-properties-xx
<a href="https://travis-ci.org/Xotic750/object-define-properties-xx"
title="Travis status">
<img
src="https://travis-ci.org/Xotic750/object-define-properties-xx.svg?branch=master"
alt="Travis status" height="18">
</a>
<a href="https://david-dm.org/Xotic750/object-define-properties-xx"
title="Dependency status">
<img src="https://david-dm.org/Xotic750/object-define-properties-xx.svg"
alt="Dependency status" height="18"/>
</a>
<a
href="https://david-dm.org/Xotic750/object-define-properties-xx#info=devDependencies"
title="devDependency status">
<img src="https://david-dm.org/Xotic750/object-define-properties-xx/dev-status.svg"
alt="devDependency status" height="18"/>
</a>
<a href="https://badge.fury.io/js/object-define-properties-xx" title="npm version">
<img src="https://badge.fury.io/js/object-define-properties-xx.svg"
alt="npm version" height="18">
</a>

Sham for Object.defineProperties

Requires ES3 or above.

**Version**: 1.0.0  
**Author**: Xotic750 <Xotic750@gmail.com>  
**License**: [MIT](&lt;https://opensource.org/licenses/MIT&gt;)  
**Copyright**: Xotic750  
<a name="exp_module_object-define-properties-xx--module.exports"></a>

### `module.exports` ⇒ <code>Object</code> ⏏
This method defines new or modifies existing properties directly on an object, returning the object.

**Kind**: Exported member  
**Returns**: <code>Object</code> - The object that was passed to the function.  

| Param | Type | Description |
| --- | --- | --- |
| object | <code>Object</code> | The object on which to define or modify properties. |
| properties | <code>Object</code> | An object whose own enumerable properties constitute descriptors for the properties to be defined or modified. |

**Example**  
```js
var defineProperties = require('object-define-properties-x');

var obj = {};
defineProperties(obj, {
  'property1': {
    value: true,
    writable: true
  },
  'property2': {
    value: 'Hello',
    writable: true
  }
  // etc. etc.
});
```
