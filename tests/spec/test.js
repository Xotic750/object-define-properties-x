'use strict';

var defineProperties;
if (typeof module === 'object' && module.exports) {
  require('es5-shim');
  require('es5-shim/es5-sham');
  if (typeof JSON === 'undefined') {
    JSON = {};
  }
  require('json3').runInContext(null, JSON);
  require('es6-shim');
  var es7 = require('es7-shim');
  Object.keys(es7).forEach(function (key) {
    var obj = es7[key];
    if (typeof obj.shim === 'function') {
      obj.shim();
    }
  });
  defineProperties = require('../../index.js');
} else {
  defineProperties = returnExports;
}

var has = Object.prototype.hasOwnProperty;
var supportsAccessors = has.call(Object.prototype, '__defineGetter__');
var itHasAccessors = supportsAccessors ? it : xit;
var itHasNoAccessors = supportsAccessors ? xit : it;
var hasSymbols = typeof Symbol === 'function' && typeof Symbol('') === 'symbol';
var hasComputedPropNames;
try {
  // eslint-disable-next-line no-new-func
  hasComputedPropNames = Function('return {["ab"]: 1}')();
} catch (ignore) {}

var itHasCompPropNames = hasSymbols && hasComputedPropNames ? it : xit;
var doc = typeof document !== 'undefined' && document;
var itHasDoc = doc ? it : xit;

describe('defineProperties', function () {
  var obj;

  beforeEach(function () {
    obj = {};

    defineProperties(obj, {
      name: {
        configurable: true,
        enumerable: true,
        value: 'Testing',
        writable: true
      },
      number: {
        configurable: true,
        enumerable: true,
        value: 1234,
        writable: true
      }
    });
  });

  it('is a function', function () {
    expect(typeof defineProperties).toBe('function');
  });

  it('should be setable', function () {
    obj.name = 'Other';
    expect(obj.name).toBe('Other');
    expect(obj.number).toBe(1234);
  });

  it('should define the constructor property', function () {
    var target = {};
    var newProperties = { constructor: { value: 'new constructor' } };
    defineProperties(target, newProperties);
    expect(target.constructor).toBe('new constructor');
  });

  it('should return the parent initial value', function () {
    var child = Object.create(obj, {});

    expect(child.name).toBe('Testing');
    expect(child.number).toBe(1234);
    expect(has.call(child, 'name')).toBeFalsy();
    expect(has.call(child, 'number')).toBeFalsy();
  });

  it('should not override the parent value', function () {
    var child = Object.create(obj, {});

    defineProperties(child, {
      name: {
        value: 'Other'
      }
    });

    expect(obj.name).toBe('Testing');
    expect(child.name).toBe('Other');
  });

  it('should return the target object', function () {
    var child = Object.create(obj, {});

    var ret = defineProperties(child, {
      name: {
        value: 'Other'
      }
    });

    expect(ret).toBe(child);
  });

  it('should throw error for non object', function () {
    expect(function () {
      defineProperties(42, {
        name: {
          value: 'Other'
        }
      });
    }).toThrow();
  });

  it('should not throw error for empty descriptor', function () {
    expect(function () {
      defineProperties({}, {
        name: {}
      });
    }).not.toThrow();
  });

  it('should throw error if getter is not a function', function () {
    expect(function () {
      defineProperties({}, {
        name: {
          get: null
        }
      });
    }).toThrow();
  });

  it('should throw error if getter and value defined', function () {
    expect(function () {
      defineProperties({}, {
        name: {
          get: function () {},
          value: null
        }
      });
    }).toThrow();
  });

  it('should throw error if getter and writeable is truthy', function () {
    expect(function () {
      defineProperties({}, {
        name: {
          get: function () {},
          writable: true
        }
      });
    }).toThrow();
  });

  it('should throw error if setter is not a function', function () {
    expect(function () {
      defineProperties({}, {
        name: {
          set: null
        }
      });
    }).toThrow();
  });

  it('should throw error if setter and value defined', function () {
    expect(function () {
      defineProperties({}, {
        name: {
          set: function () {},
          value: null
        }
      });
    }).toThrow();
  });

  it('should throw error if setter and writeable is truthy', function () {
    expect(function () {
      defineProperties({}, {
        name: {
          set: function () {},
          writable: true
        }
      });
    }).toThrow();
  });

  itHasAccessors('should not throw error if has accessers', function () {
    defineProperties({}, {
      name: {
        get: function () {},
        set: function () {}
      }
    });
  });

  itHasNoAccessors('should throw error if no accessers available', function () {
    expect(function () {
      defineProperties({}, {
        name: {
          get: function () {},
          set: function () {}
        }
      });
    }).toThrow();
  });

  itHasCompPropNames('works with Symbols', function () {
    var symbol = Symbol('');
    obj = {};
    // eslint-disable-next-line no-new-func
    var props = Function('symbol', 'return { [symbol]: { value: 1  } }')(symbol);
    defineProperties(obj, props);
    expect(obj[symbol]).toBe(1);
  });

  itHasDoc('works with DOM elements', function () {
    var div = document.createElement('div');
    defineProperties(div, {
      blah: {
        value: 1
      }
    });

    expect(div.blah).toBe(1);
  });
});
