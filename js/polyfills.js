import Promise from "promise-polyfill";

export default function applyPolyfills() {
    window.Promise = Promise;
    applyObjectAssignPolyfill();
    applyEntriesAndValuesPolyfill();
    applyIncludesPolyfill();
}

function applyObjectAssignPolyfill() {
    if (!Object.assign) {
        Object.defineProperty(Object, 'assign', {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function(target, firstSource) {
                'use strict';
                if (target === undefined || target === null) {
                    throw new TypeError('Cannot convert first argument to object');
                }

                var to = Object(target);
                for (var i = 1; i < arguments.length; i++) {
                    var nextSource = arguments[i];
                    if (nextSource === undefined || nextSource === null) {
                        continue;
                    }

                    var keysArray = Object.keys(Object(nextSource));
                    for (var nextIndex = 0, len = keysArray.length; nextIndex < len; nextIndex++) {
                        var nextKey = keysArray[nextIndex];
                        var desc = Object.getOwnPropertyDescriptor(nextSource, nextKey);
                        if (desc !== undefined && desc.enumerable) {
                            to[nextKey] = nextSource[nextKey];
                        }
                    }
                }
                return to;
            }
        });
    }
}

function applyEntriesAndValuesPolyfill() {
    const reduce = Function.bind.call(Function.call, Array.prototype.reduce);
    const isEnumerable = Function.bind.call(Function.call, Object.prototype.propertyIsEnumerable);
    const concat = Function.bind.call(Function.call, Array.prototype.concat);

    if (!Object.values) {
        Object.values = function values(O) {
            return reduce(keys(O), (v, k) => concat(v, typeof k === 'string' && isEnumerable(O, k) ? [O[k]] : []), []);
        };
    }

    if (!Object.entries) {
        Object.entries = function entries(O) {
            return reduce(keys(O), (e, k) => concat(e, typeof k === 'string' && isEnumerable(O, k) ? [[k, O[k]]] : []), []);
        };
    }
}

function applyIncludesPolyfill() {
    if (![].includes) {
        Array.prototype.includes = function(searchElement/*, fromIndex*/) {
            'use strict';
            var O = Object(this);
            var len = parseInt(O.length) || 0;
            if (len === 0) {
                return false;
            }
            var n = parseInt(arguments[1]) || 0;
            var k;
            if (n >= 0) {
                k = n;
            } else {
                k = len + n;
                if (k < 0) {
                    k = 0;
                }
            }
            while (k < len) {
                var currentElement = O[k];
                if (searchElement === currentElement ||
                    (searchElement !== searchElement && currentElement !== currentElement)
                ) {
                    return true;
                }
                k++;
            }
            return false;
        };
    }

    if (!String.prototype.includes) {
        String.prototype.includes = function() {
            'use strict';
            return String.prototype.indexOf.apply(this, arguments) !== -1;
        };
    }
}

function keys(o) {
    if (typeof Reflect === 'object' && typeof Reflect.ownKeys === 'function') {
        return Reflect.ownKeys(o);
    } else if (typeof Object.getOwnPropertySymbols === 'function') {
        return Object.getOwnPropertyNames(o).concat(Object.getOwnPropertySymbols(o));
    } else {
        return Object.getOwnPropertyNames(o);
    }
}
