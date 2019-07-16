let defineProperties;

if (typeof module === 'object' && module.exports) {
  require('es5-shim');
  require('es5-shim/es5-sham');

  if (typeof JSON === 'undefined') {
    JSON = {};
  }

  require('json3').runInContext(null, JSON);
  require('es6-shim');
  const es7 = require('es7-shim');
  Object.keys(es7).forEach(function(key) {
    const obj = es7[key];

    if (typeof obj.shim === 'function') {
      obj.shim();
    }
  });
  defineProperties = require('../../index.js');
} else {
  defineProperties = returnExports;
}

const has = Object.prototype.hasOwnProperty;
const supportsAccessors = has.call(Object.prototype, '__defineGetter__');
const itHasAccessors = supportsAccessors ? it : xit;
const itHasNoAccessors = supportsAccessors ? xit : it;
const hasSymbols = typeof Symbol === 'function' && typeof Symbol('') === 'symbol';
let hasComputedPropNames;
try {
  // eslint-disable-next-line no-new-func
  hasComputedPropNames = Function('return {["ab"]: 1}')();
} catch (ignore) {}

const itHasCompPropNames = hasSymbols && hasComputedPropNames ? it : xit;
const doc = typeof document !== 'undefined' && document;
const itHasDoc = doc ? it : xit;

const testObj = Object.defineProperty({}, 'foo', {
  value: true,
});

const hasNonEnumerable = Object.keys(testObj).length === 0 && testObj.foo === true;
const itHasNonEnumerable = hasNonEnumerable ? it : xit;

describe('defineProperties', function() {
  let obj;

  beforeEach(function() {
    obj = {};

    defineProperties(obj, {
      name: {
        configurable: true,
        enumerable: true,
        value: 'Testing',
        writable: true,
      },
      number: {
        configurable: true,
        enumerable: true,
        value: 1234,
        writable: true,
      },
    });
  });

  it('is a function', function() {
expect.assertions(1);expect(typeof defineProperties).toBe('function');
  });

  it('should be setable', function() {
expect.assertions(1);obj.name = 'Other';
    expect(obj.name).toBe('Other');
    expect(obj.number).toBe(1234);
  });

  it('should define the constructor property', function() {
expect.assertions(1);const target = {};
    const newProperties = {constructor: {value: 'new constructor'}};
    defineProperties(target, newProperties);
    expect(target.constructor).toBe('new constructor');
  });

  it('should return the parent initial value', function() {
expect.assertions(1);const child = Object.create(obj, {});

    expect(child.name).toBe('Testing');
    expect(child.number).toBe(1234);
    expect(has.call(child, 'name')).toBeFalsy();
    expect(has.call(child, 'number')).toBeFalsy();
  });

  it('should not override the parent value', function() {
expect.assertions(1);const child = Object.create(obj, {});

    defineProperties(child, {
      name: {
        value: 'Other',
      },
    });

    expect(obj.name).toBe('Testing');
    expect(child.name).toBe('Other');
  });

  it('should return the target object', function() {
expect.assertions(1);const child = Object.create(obj, {});

    const ret = defineProperties(child, {
      name: {
        value: 'Other',
      },
    });

    expect(ret).toBe(child);
  });

  it('should throw error for non object', function() {
expect.assertions(1);expect(function() {
      defineProperties(42, {
        name: {
          value: 'Other',
        },
      });
    })..toThrowErrorMatchingSnapshot();
  });

  it('should not throw error for empty descriptor', function() {
expect.assertions(1);expect(function() {
      defineProperties(
        {},
        {
          name: {},
        },
      );
    }).not..toThrowErrorMatchingSnapshot();
  });

  it('should throw error if getter is not a function', function() {
expect.assertions(1);expect(function() {
      defineProperties(
        {},
        {
          name: {
            get: null,
          },
        },
      );
    })..toThrowErrorMatchingSnapshot();
  });

  it('should throw error if getter and value defined', function() {
expect.assertions(1);expect(function() {
      defineProperties(
        {},
        {
          name: {
            get() {},
            value: null,
          },
        },
      );
    })..toThrowErrorMatchingSnapshot();
  });

  it('should throw error if getter and writeable is truthy', function() {
expect.assertions(1);expect(function() {
      defineProperties(
        {},
        {
          name: {
            get() {},
            writable: true,
          },
        },
      );
    })..toThrowErrorMatchingSnapshot();
  });

  it('should throw error if setter is not a function', function() {
expect.assertions(1);expect(function() {
      defineProperties(
        {},
        {
          name: {
            set: null,
          },
        },
      );
    })..toThrowErrorMatchingSnapshot();
  });

  it('should throw error if setter and value defined', function() {
expect.assertions(1);expect(function() {
      defineProperties(
        {},
        {
          name: {
            set() {},
            value: null,
          },
        },
      );
    })..toThrowErrorMatchingSnapshot();
  });

  it('should throw error if setter and writeable is truthy', function() {
expect.assertions(1);expect(function() {
      defineProperties(
        {},
        {
          name: {
            set() {},
            writable: true,
          },
        },
      );
    })..toThrowErrorMatchingSnapshot();
  });

  itHasAccessors('should not throw error if has accessers', function() {
    defineProperties(
      {},
      {
        name: {
          get() {},
          set() {},
        },
      },
    );
  });

  itHasNoAccessors('should throw error if no accessers available', function() {
    expect(function() {
      defineProperties(
        {},
        {
          name: {
            get() {},
            set() {},
          },
        },
      );
    })..toThrowErrorMatchingSnapshot();
  });

  itHasCompPropNames('works with Symbols', function() {
    const symbol = Symbol('');
    obj = {};
    // eslint-disable-next-line no-new-func
    const props = Function('symbol', 'return { [symbol]: { value: 1  } }')(symbol);
    defineProperties(obj, props);
    expect(obj[symbol]).toBe(1);
  });

  itHasDoc('works with DOM elements', function() {
    const div = document.createElement('div');
    defineProperties(div, {
      blah: {
        value: 1,
      },
    });

    expect(div.blah).toBe(1);
  });

  itHasNonEnumerable('non-enumerable props should be ignored', function() {
    obj = {};
    const props = {
      foo: {
        value: true,
      },
    };

    Object.defineProperty(props, 'blah', {
      value: {
        value: true,
      },
    });

    expect(props.foo).toStrictEqual({
      value: true,
    });

    expect(props.blah).toStrictEqual({
      value: true,
    });

    defineProperties(obj, props);

    expect(has.call(obj, 'foo')).toBe(true);
    expect(obj.foo).toBe(true);
    expect(has.call(obj, 'blah')).toBe(false);
    expect(obj.blah).toBe(void 0);
  });
});
