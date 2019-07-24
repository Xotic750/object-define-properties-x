<a href="https://travis-ci.org/Xotic750/object-define-properties-x"
  title="Travis status">
<img
  src="https://travis-ci.org/Xotic750/object-define-properties-x.svg?branch=master"
  alt="Travis status" height="18">
</a>
<a href="https://david-dm.org/Xotic750/object-define-properties-x"
  title="Dependency status">
<img src="https://david-dm.org/Xotic750/object-define-properties-x/status.svg"
  alt="Dependency status" height="18"/>
</a>
<a
  href="https://david-dm.org/Xotic750/object-define-properties-x?type=dev"
  title="devDependency status">
<img src="https://david-dm.org/Xotic750/object-define-properties-x/dev-status.svg"
  alt="devDependency status" height="18"/>
</a>
<a href="https://badge.fury.io/js/object-define-properties-x"
  title="npm version">
<img src="https://badge.fury.io/js/object-define-properties-x.svg"
  alt="npm version" height="18">
</a>
<a href="https://www.jsdelivr.com/package/npm/object-define-properties-x"
  title="jsDelivr hits">
<img src="https://data.jsdelivr.com/v1/package/npm/object-define-properties-x/badge?style=rounded"
  alt="jsDelivr hits" height="18">
</a>

<a name="module_object-define-properties-x"></a>

## object-define-properties-x

Sham for Object.defineProperties

<a name="exp_module_object-define-properties-x--module.exports"></a>

### `module.exports(object, properties)` ⇒ <code>Object</code> ⏏

This method defines new or modifies existing properties directly on an
object, returning the object.

**Kind**: Exported function  
**Returns**: <code>Object</code> - The object that was passed to the function.

| Param      | Type                | Description                                                                                                    |
| ---------- | ------------------- | -------------------------------------------------------------------------------------------------------------- |
| object     | <code>Object</code> | The object on which to define or modify properties.                                                            |
| properties | <code>Object</code> | An object whose own enumerable properties constitute descriptors for the properties to be defined or modified. |

**Example**

```js
import defineProperties from 'object-define-properties-x';

const obj = {};
defineProperties(obj, {
  property1: {
    value: true,
    writable: true,
  },
  property2: {
    value: 'Hello',
    writable: true,
  },
  // etc. etc.
});
```
