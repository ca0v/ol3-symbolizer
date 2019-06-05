define("node_modules/@ca0v/ceylon/ceylon/interfaces/expectation", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("node_modules/@ca0v/ceylon/ceylon/interfaces/boolean-expectation", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("node_modules/@ca0v/ceylon/ceylon/interfaces/number-expectation", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("node_modules/@ca0v/ceylon/ceylon/interfaces/string-expectation", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("node_modules/@ca0v/ceylon/ceylon/interfaces/array-expectation", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("node_modules/@ca0v/ceylon/ceylon/interfaces/function-expectation", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("node_modules/@ca0v/ceylon/ceylon/interfaces/object-expectation", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("node_modules/@ca0v/ceylon/ceylon/interfaces/expect", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("node_modules/@ca0v/ceylon/ceylon/fast-deep-equal", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function equal(a, b) {
        if (a === b)
            return true;
        if ([Object, Array, Date, RegExp].some(function (t) { return a instanceof t !== b instanceof t; }))
            return false;
        if (typeof a == "object" && typeof b == "object") {
            if (Array.isArray(a) && Array.isArray(b)) {
                if (a.length !== b.length)
                    return false;
                return a.every(function (v, i) { return equal(v, b[i]); });
            }
            if (a instanceof Date && b instanceof Date)
                return a.getTime() === b.getTime();
            if (a instanceof RegExp && b instanceof RegExp)
                return a.toString() === b.toString();
            var keys = Object.keys(a);
            if (keys.length !== Object.keys(b).length)
                return false;
            return keys.every(function (key) { return b.hasOwnProperty(key) && equal(a[key], b[key]); });
        }
        return a !== a && b !== b;
    }
    exports.equal = equal;
});
define("node_modules/@ca0v/ceylon/ceylon/assertion-error", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function default_1(_a) {
        var message = _a.message, expected = _a.expected, actual = _a.actual, showDiff = _a.showDiff;
        var error = new Error(message);
        error["expected"] = expected;
        error["actual"] = actual;
        error["showDiff"] = showDiff;
        error.name = "AssertionError";
        return error;
    }
    exports.default = default_1;
});
define("node_modules/@ca0v/ceylon/ceylon/assert", ["require", "exports", "node_modules/@ca0v/ceylon/ceylon/assertion-error"], function (require, exports, assertion_error_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var assert = function (_a) {
        var assertion = _a.assertion, message = _a.message, actual = _a.actual, expected = _a.expected;
        if (!assertion) {
            var error = assertion_error_1.default({
                actual: actual,
                expected: expected,
                message: message,
                showDiff: typeof actual !== "undefined" && typeof expected !== "undefined"
            });
            throw error;
        }
    };
    exports.default = assert;
});
define("node_modules/@ca0v/ceylon/ceylon/expectation", ["require", "exports", "node_modules/@ca0v/ceylon/ceylon/fast-deep-equal", "node_modules/@ca0v/ceylon/ceylon/assert"], function (require, exports, fast_deep_equal_1, assert_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Expectation = (function () {
        function Expectation(actual) {
            this.actual = actual;
        }
        Expectation.prototype.toExist = function (message) {
            assert_1.default({
                assertion: typeof message === "undefined" || typeof message === "string",
                message: "[message] argument should be a string"
            });
            if (Array.isArray(this.actual)) {
                assert_1.default({
                    assertion: this.actual.length !== 0,
                    message: message || "Expected array to exist"
                });
            }
            else if (typeof this.actual === "object" && this.actual !== null) {
                assert_1.default({
                    assertion: Object.getOwnPropertyNames(this.actual).length !== 0,
                    message: message || "Expected object to exist"
                });
            }
            else {
                assert_1.default({
                    assertion: typeof this.actual !== "undefined" && this.actual !== null && this.actual !== "",
                    message: message || "Expected item to exist"
                });
            }
            return this;
        };
        Expectation.prototype.toNotExist = function (message) {
            assert_1.default({
                assertion: typeof message === "undefined" || typeof message === "string",
                message: "[message] argument should be a string"
            });
            if (Array.isArray(this.actual)) {
                assert_1.default({
                    assertion: this.actual.length === 0,
                    message: message || "Expected array to not exist"
                });
            }
            else if (typeof this.actual === "object" && this.actual !== null) {
                assert_1.default({
                    assertion: Object.getOwnPropertyNames(this.actual).length === 0,
                    message: message || "Expected object to not exist"
                });
            }
            else {
                assert_1.default({
                    assertion: typeof this.actual === "undefined" || this.actual === null || this.actual === "",
                    message: message || "Expected item to not exist"
                });
            }
            return this;
        };
        Expectation.prototype.toBe = function (value, message) {
            assert_1.default({
                assertion: typeof message === "undefined" || typeof message === "string",
                message: "[message] argument should be a string"
            });
            assert_1.default({
                actual: this.actual,
                assertion: this.actual === value,
                expected: value,
                message: message || "Expected " + JSON.stringify(this.actual) + " to be " + JSON.stringify(value)
            });
            return this;
        };
        Expectation.prototype.toNotBe = function (value, message) {
            assert_1.default({
                assertion: typeof message === "undefined" || typeof message === "string",
                message: "[message] argument should be a string"
            });
            assert_1.default({
                actual: this.actual,
                assertion: this.actual !== value,
                expected: value,
                message: message || "Expected " + JSON.stringify(this.actual) + " to not be " + JSON.stringify(value)
            });
            return this;
        };
        Expectation.prototype.toEqual = function (value, message) {
            assert_1.default({
                assertion: typeof message === "undefined" || typeof message === "string",
                message: "[message] argument should be a string"
            });
            assert_1.default({
                actual: this.actual,
                assertion: fast_deep_equal_1.equal(this.actual, value),
                expected: value,
                message: message || "Expected " + JSON.stringify(this.actual) + " to equal " + JSON.stringify(value)
            });
            return this;
        };
        Expectation.prototype.toNotEqual = function (value, message) {
            assert_1.default({
                assertion: typeof message === "undefined" || typeof message === "string",
                message: "[message] argument should be a string"
            });
            assert_1.default({
                actual: this.actual,
                assertion: !fast_deep_equal_1.equal(this.actual, value),
                expected: value,
                message: message || "Expected " + JSON.stringify(this.actual) + " to not equal " + JSON.stringify(value)
            });
            return this;
        };
        Expectation.prototype.toBeTrue = function (message) {
            return this.toBe(true, message);
        };
        Expectation.prototype.toBeFalse = function (message) {
            return this.toBe(false, message);
        };
        Expectation.prototype.toBeLessThan = function (value, message) {
            assert_1.default({
                assertion: typeof value === "number",
                message: "[value] argument should be a number"
            });
            assert_1.default({
                assertion: typeof message === "undefined" || typeof message === "string",
                message: "[message] argument should be a string"
            });
            if (typeof this.actual !== "number") {
                assert_1.default({
                    assertion: false,
                    message: "Item being tested should be a number"
                });
            }
            else {
                assert_1.default({
                    assertion: this.actual < value,
                    message: message || "Expected " + this.actual + " to be less than " + value
                });
            }
            return this;
        };
        Expectation.prototype.toBeFewerThan = function (value, message) {
            return this.toBeLessThan(value, message);
        };
        Expectation.prototype.toBeLessThanOrEqualTo = function (value, message) {
            assert_1.default({
                assertion: typeof value === "number",
                message: "[value] argument should be a number"
            });
            assert_1.default({
                assertion: typeof message === "undefined" || typeof message === "string",
                message: "[message] argument should be a string"
            });
            if (typeof this.actual !== "number") {
                throw assert_1.default({
                    assertion: false,
                    message: "Item being tested should be a number"
                });
            }
            assert_1.default({
                assertion: this.actual <= value,
                message: message || "Expected " + this.actual + " to be less than or equal to " + value
            });
            return this;
        };
        Expectation.prototype.toBeFewerThanOrEqualTo = function (value, message) {
            return this.toBeLessThanOrEqualTo(value, message);
        };
        Expectation.prototype.toBeGreaterThan = function (value, message) {
            assert_1.default({
                assertion: typeof value === "number",
                message: "[value] argument should be a number"
            });
            assert_1.default({
                assertion: typeof message === "undefined" || typeof message === "string",
                message: "[message] argument should be a string"
            });
            if (typeof this.actual !== "number") {
                throw assert_1.default({
                    assertion: false,
                    message: "Item being tested should be a number"
                });
            }
            assert_1.default({
                assertion: this.actual > value,
                message: message || "Expected " + this.actual + " to be greater than " + value
            });
            return this;
        };
        Expectation.prototype.toBeMoreThan = function (value, message) {
            return this.toBeGreaterThan(value, message);
        };
        Expectation.prototype.toBeGreaterThanOrEqualTo = function (value, message) {
            assert_1.default({
                assertion: typeof value === "number",
                message: "[value] argument should be a number"
            });
            assert_1.default({
                assertion: typeof message === "undefined" || typeof message === "string",
                message: "[message] argument should be a string"
            });
            if (typeof this.actual !== "number") {
                throw assert_1.default({
                    assertion: false,
                    message: "Item being tested should be a number"
                });
            }
            assert_1.default({
                assertion: this.actual >= value,
                message: message || "Expected " + this.actual + " to be greater than or equal to " + value
            });
            return this;
        };
        Expectation.prototype.toBeMoreThanOrEqualTo = function (value, message) {
            return this.toBeGreaterThanOrEqualTo(value, message);
        };
        Expectation.prototype.toMatch = function (pattern, message) {
            assert_1.default({
                assertion: pattern instanceof RegExp,
                message: "[pattern] argument should be a regular expression"
            });
            assert_1.default({
                assertion: typeof message === "undefined" || typeof message === "string",
                message: "[message] argument should be a string"
            });
            if (typeof this.actual !== "string") {
                throw assert_1.default({
                    assertion: false,
                    message: "Item being tested should be a string"
                });
            }
            assert_1.default({
                assertion: pattern.test(this.actual),
                message: message || "Expected " + this.actual + " to match " + pattern
            });
            return this;
        };
        Expectation.prototype.toNotMatch = function (pattern, message) {
            assert_1.default({
                assertion: pattern instanceof RegExp,
                message: "[pattern] argument should be a regular expression"
            });
            assert_1.default({
                assertion: typeof message === "undefined" || typeof message === "string",
                message: "[message] argument should be a string"
            });
            if (typeof this.actual !== "string") {
                throw assert_1.default({
                    assertion: false,
                    message: "Item being tested should be a string"
                });
            }
            assert_1.default({
                assertion: !pattern.test(this.actual),
                message: message || "Expected " + this.actual + " to match " + pattern
            });
            return this;
        };
        Expectation.prototype.toInclude = function (value, message) {
            assert_1.default({
                assertion: typeof message === "undefined" || typeof message === "string",
                message: "[message] argument should be a string"
            });
            assert_1.default({
                assertion: typeof this.actual === "string" || Array.isArray(this.actual) || typeof this.actual === "object",
                message: "Item being tested should be a string, array, or object"
            });
            if (typeof this.actual === "string") {
                assert_1.default({
                    assertion: this.actual.indexOf(value) >= 0,
                    message: message || "Expected " + this.actual + " to contain " + value
                });
            }
            else if (Array.isArray(this.actual)) {
                var included = false;
                for (var i = 0; i < this.actual.length; i++) {
                    if (fast_deep_equal_1.equal(this.actual[i], value)) {
                        included = true;
                        break;
                    }
                }
                assert_1.default({
                    assertion: included,
                    message: message || "Expected " + JSON.stringify(this.actual) + " to contain " + JSON.stringify(value)
                });
            }
            else if (typeof this.actual === "object") {
                var included = true;
                var valueProperties = Object.getOwnPropertyNames(value);
                for (var i = 0; i < valueProperties.length; i++) {
                    if (!this.actual.hasOwnProperty(valueProperties[i])) {
                        included = false;
                        break;
                    }
                    if (!fast_deep_equal_1.equal(this.actual[valueProperties[i]], value[valueProperties[i]])) {
                        included = false;
                    }
                }
                assert_1.default({
                    assertion: included,
                    message: message || "Expected " + JSON.stringify(this.actual) + " to contain " + JSON.stringify(value)
                });
            }
            return this;
        };
        Expectation.prototype.toContain = function (value, message) {
            return this.toInclude(value, message);
        };
        Expectation.prototype.toExclude = function (value, message) {
            assert_1.default({
                assertion: typeof message === "undefined" || typeof message === "string",
                message: "[message] argument should be a string"
            });
            assert_1.default({
                assertion: typeof this.actual === "string" || Array.isArray(this.actual) || typeof this.actual === "object",
                message: "Item being tested should be a string, array, or object"
            });
            if (typeof this.actual === "string") {
                assert_1.default({
                    assertion: this.actual.indexOf(value) === -1,
                    message: message || "Expected " + this.actual + " to not contain " + value
                });
            }
            else if (Array.isArray(this.actual)) {
                var included = false;
                for (var i = 0; i < this.actual.length; i++) {
                    if (fast_deep_equal_1.equal(this.actual[i], value)) {
                        included = true;
                        break;
                    }
                }
                assert_1.default({
                    assertion: !included,
                    message: message || "Expected " + JSON.stringify(this.actual) + " to not contain " + JSON.stringify(value)
                });
            }
            else if (typeof this.actual === "object") {
                var included = false;
                var valueProperties = Object.getOwnPropertyNames(value);
                for (var i = 0; i < valueProperties.length; i++) {
                    if (this.actual.hasOwnProperty(valueProperties[i])) {
                        if (fast_deep_equal_1.equal(this.actual[valueProperties[i]], value[valueProperties[i]])) {
                            included = true;
                            break;
                        }
                    }
                }
                assert_1.default({
                    assertion: !included,
                    message: message || "Expected " + JSON.stringify(this.actual) + " to not contain " + JSON.stringify(value)
                });
            }
            return this;
        };
        Expectation.prototype.toNotInclude = function (value, message) {
            return this.toExclude(value, message);
        };
        Expectation.prototype.toNotContain = function (value, message) {
            return this.toExclude(value, message);
        };
        Expectation.prototype.toThrow = function (error, message) {
            assert_1.default({
                assertion: typeof error === "undefined" ||
                    typeof error === "string" ||
                    error instanceof RegExp ||
                    typeof error === "function",
                message: "[error] argument should be a string, regular expression, or function"
            });
            assert_1.default({
                assertion: typeof message === "undefined" || typeof message === "string",
                message: "[message] argument should be a string"
            });
            if (typeof this.actual !== "function") {
                throw assert_1.default({
                    assertion: false,
                    message: "Item being tested should be a function"
                });
            }
            if (typeof error === "undefined") {
                var threw = false;
                try {
                    this.actual();
                }
                catch (e) {
                    threw = true;
                }
                assert_1.default({
                    assertion: threw,
                    message: message || "Expected function to throw"
                });
            }
            else if (typeof error === "string") {
                try {
                    this.actual();
                }
                catch (e) {
                    assert_1.default({
                        assertion: e.message === error,
                        message: message || "Expected error message to be \"" + error + "\"\""
                    });
                }
            }
            else if (error instanceof RegExp) {
                try {
                    this.actual();
                }
                catch (e) {
                    assert_1.default({
                        assertion: error.test(e.message),
                        message: message || "Expected error message to match " + error
                    });
                }
            }
            else if (typeof error === "function") {
                try {
                    this.actual();
                }
                catch (e) {
                    assert_1.default({
                        assertion: e instanceof error,
                        message: message || "Expected error to be " + error
                    });
                }
            }
            return this;
        };
        Expectation.prototype.toNotThrow = function (message) {
            assert_1.default({
                assertion: typeof message === "undefined" || typeof message === "string",
                message: "[message] argument should be a string"
            });
            if (typeof this.actual !== "function") {
                throw assert_1.default({
                    assertion: false,
                    message: "Item being tested should be a function"
                });
            }
            var threw = false;
            try {
                this.actual();
            }
            catch (e) {
                threw = true;
            }
            assert_1.default({
                assertion: !threw,
                message: message || "Expected function to not throw"
            });
            return this;
        };
        Expectation.prototype.toBeA = function (constructor, message) {
            assert_1.default({
                assertion: typeof constructor === "function" || typeof constructor === "string",
                message: "[constructor] argument should be a function or string"
            });
            assert_1.default({
                assertion: typeof message === "undefined" || typeof message === "string",
                message: "[message] argument should be a string"
            });
            if (typeof constructor === "string") {
                assert_1.default({
                    actual: typeof this.actual,
                    assertion: typeof this.actual === constructor,
                    expected: constructor,
                    message: message || "Expected item to be a " + constructor
                });
            }
            else if (typeof constructor === "function") {
                assert_1.default({
                    actual: typeof this.actual,
                    assertion: this.actual instanceof constructor,
                    expected: constructor,
                    message: message || "Expected item to be a " + constructor
                });
            }
            return this;
        };
        Expectation.prototype.toBeAn = function (constructor, message) {
            return this.toBeA(constructor, message);
        };
        Expectation.prototype.toNotBeA = function (constructor, message) {
            assert_1.default({
                assertion: typeof constructor === "function" || typeof constructor === "string",
                message: "[constructor] argument should be a function or string"
            });
            assert_1.default({
                assertion: typeof message === "undefined" || typeof message === "string",
                message: "[message] argument should be a string"
            });
            if (typeof constructor === "string") {
                assert_1.default({
                    assertion: !(typeof this.actual === constructor),
                    message: message || "Expected item to not be a " + constructor
                });
            }
            else if (typeof constructor === "function") {
                assert_1.default({
                    assertion: !(this.actual instanceof constructor),
                    message: message || "Expected item to not be a " + constructor
                });
            }
            return this;
        };
        Expectation.prototype.toNotBeAn = function (constructor, message) {
            return this.toNotBeA(constructor, message);
        };
        Expectation.prototype.toIncludeKey = function (key, message) {
            assert_1.default({
                assertion: typeof key === "number" || typeof key === "string",
                message: "[key] argument should be a number or string"
            });
            assert_1.default({
                assertion: typeof message === "undefined" || typeof message === "string",
                message: "[message] argument should be a string"
            });
            assert_1.default({
                assertion: typeof this.actual === "function" || Array.isArray(this.actual) || typeof this.actual === "object",
                message: "Tested item should be a function, array, or object"
            });
            if (typeof this.actual === "function") {
                assert_1.default({
                    assertion: this.actual.hasOwnProperty(key),
                    message: message || "Expected function to have key " + key
                });
            }
            else if (Array.isArray(this.actual)) {
                assert_1.default({
                    assertion: this.actual.hasOwnProperty(key),
                    message: message || "Expected array to have key " + key
                });
            }
            else if (typeof this.actual === "object") {
                assert_1.default({
                    assertion: this.actual.hasOwnProperty(key),
                    message: message || "Expected object to have key " + key
                });
            }
            return this;
        };
        Expectation.prototype.toContainKey = function (key, message) {
            return this.toIncludeKey(key, message);
        };
        Expectation.prototype.toIncludeKeys = function (keys, message) {
            assert_1.default({
                assertion: Array.isArray(keys) && keys.length > 0 && (typeof keys[0] === "number" || typeof keys[0] === "string"),
                message: "[keys] argument should be an array of numbers or strings"
            });
            assert_1.default({
                assertion: typeof message === "undefined" || typeof message === "string",
                message: "[message] argument should be a string"
            });
            assert_1.default({
                assertion: typeof this.actual === "function" || Array.isArray(this.actual) || typeof this.actual === "object",
                message: "Tested item should be a function, array, or object"
            });
            for (var i = 0; i < keys.length; i++) {
                this.toIncludeKey(keys[i], message);
            }
            return this;
        };
        Expectation.prototype.toContainKeys = function (keys, message) {
            return this.toIncludeKeys(keys, message);
        };
        Expectation.prototype.toExcludeKey = function (key, message) {
            assert_1.default({
                assertion: typeof key === "number" || typeof key === "string",
                message: "[key] argument should be a number or string"
            });
            assert_1.default({
                assertion: typeof message === "undefined" || typeof message === "string",
                message: "[message] argument should be a string"
            });
            assert_1.default({
                assertion: typeof this.actual === "function" || Array.isArray(this.actual) || typeof this.actual === "object",
                message: "Tested item should be a function, array, or object"
            });
            if (typeof this.actual === "function") {
                assert_1.default({
                    assertion: !this.actual.hasOwnProperty(key),
                    message: message || "Expected function to not have key " + key
                });
            }
            else if (Array.isArray(this.actual)) {
                assert_1.default({
                    assertion: !this.actual.hasOwnProperty(key),
                    message: message || "Expected array to not have key " + key
                });
            }
            else if (typeof this.actual === "object") {
                assert_1.default({
                    assertion: !this.actual.hasOwnProperty(key),
                    message: message || "Expected object to not have key " + key
                });
            }
            return this;
        };
        Expectation.prototype.toNotIncludeKey = function (key, message) {
            return this.toExcludeKey(key, message);
        };
        Expectation.prototype.toNotContainKey = function (key, message) {
            return this.toExcludeKey(key, message);
        };
        Expectation.prototype.toExcludeKeys = function (keys, message) {
            assert_1.default({
                assertion: Array.isArray(keys) && keys.length > 0 && (typeof keys[0] === "number" || typeof keys[0] === "string"),
                message: "[key] argument should be an array of numbers or strings"
            });
            assert_1.default({
                assertion: typeof message === "undefined" || typeof message === "string",
                message: "[message] argument should be a string"
            });
            assert_1.default({
                assertion: typeof this.actual === "function" || Array.isArray(this.actual) || typeof this.actual === "object",
                message: "Tested item should be a function, array, or object"
            });
            for (var i = 0; i < keys.length; i++) {
                this.toExcludeKey(keys[i], message);
            }
            return this;
        };
        Expectation.prototype.toNotIncludeKeys = function (keys, message) {
            return this.toExcludeKeys(keys, message);
        };
        Expectation.prototype.toNotContainKeys = function (keys, message) {
            return this.toExcludeKeys(keys, message);
        };
        Expectation.prototype.toHaveLength = function (value, message) {
            assert_1.default({
                assertion: typeof value === "number",
                message: "[value] argument should be a number"
            });
            assert_1.default({
                assertion: typeof message === "undefined" || typeof message === "string",
                message: "[message] argument should be a string"
            });
            assert_1.default({
                assertion: typeof this.actual === "string" || Array.isArray(this.actual),
                message: "Item being tested should be a string or an array"
            });
            if (typeof this.actual === "string") {
                assert_1.default({
                    assertion: this.actual.length === value,
                    message: message || "Expected string to have length " + value
                });
            }
            if (Array.isArray(this.actual)) {
                assert_1.default({
                    assertion: this.actual.length === value,
                    message: message || "Expected array to have length " + value
                });
            }
            return this;
        };
        return Expectation;
    }());
    exports.default = Expectation;
});
define("node_modules/@ca0v/ceylon/ceylon/index", ["require", "exports", "node_modules/@ca0v/ceylon/ceylon/expectation", "node_modules/@ca0v/ceylon/ceylon/assert"], function (require, exports, expectation_1, assert_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.assert = assert_2.default;
    var expect = function (actual) {
        return new expectation_1.default(actual);
    };
    exports.default = expect;
});
define("node_modules/@ca0v/ceylon/index", ["require", "exports", "node_modules/@ca0v/ceylon/ceylon/index", "node_modules/@ca0v/ceylon/ceylon/assert", "node_modules/@ca0v/ceylon/ceylon/fast-deep-equal", "node_modules/@ca0v/ceylon/ceylon/assertion-error", "node_modules/@ca0v/ceylon/ceylon/expectation"], function (require, exports, index_1, assert_3, fast_deep_equal_2, assertion_error_2, expectation_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.expect = index_1.default;
    exports.assert = assert_3.default;
    exports.deepEqual = fast_deep_equal_2.equal;
    exports.AssertionError = assertion_error_2.default;
    exports.Expectation = expectation_2.default;
    exports.default = index_1.default;
});
define("node_modules/@ca0v/ceylon/tests/index.spec", ["require", "exports", "node_modules/@ca0v/ceylon/index"], function (require, exports, index_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    describe("expect", function () {
        it("creates a new Expectation object", function () {
            var sut = index_2.expect(true);
            index_2.expect(sut).toExist();
            index_2.expect(sut).toBeAn(index_2.Expectation);
        });
    });
});
define("node_modules/@ca0v/ceylon/tests/assert.spec", ["require", "exports", "node_modules/@ca0v/ceylon/index"], function (require, exports, index_3) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    describe("Assert", function () {
        it("does not throw when assertion passes", function () {
            index_3.assert({
                assertion: true,
                message: "This should not throw"
            });
        });
        it("throws when the assertion fails", function () {
            index_3.expect(function () {
                return index_3.assert({
                    assertion: false,
                    message: "This should throw"
                });
            }).toThrow();
        });
        it("throws error with correct message property", function () {
            index_3.expect(function () {
                return index_3.assert({
                    assertion: false,
                    message: "This should throw"
                });
            }).toThrow("This should throw");
        });
        it("throws error with showDiff set to false", function () {
            try {
                index_3.assert({
                    assertion: false,
                    message: "This should throw"
                });
            }
            catch (e) {
                index_3.expect(e["showDiff"]).toBeFalse();
            }
        });
        it("throws error with correct actual/expected/showDiff properties", function () {
            try {
                index_3.assert({
                    actual: 1,
                    assertion: false,
                    expected: 2,
                    message: "This should throw"
                });
            }
            catch (e) {
                index_3.expect(e["actual"]).toBe(1);
                index_3.expect(e["expected"]).toBe(2);
                index_3.expect(e["showDiff"]).toBeTrue();
            }
        });
    });
});
define("node_modules/@ca0v/ceylon/tests/deep-equal.spec", ["require", "exports", "node_modules/@ca0v/ceylon/index"], function (require, exports, index_4) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function func1() { }
    function func2() { }
    var tests = [
        {
            description: "scalars",
            tests: [
                {
                    description: "equal numbers",
                    value1: 1,
                    value2: 1,
                    equal: true
                },
                {
                    description: "not equal numbers",
                    value1: 1,
                    value2: 2,
                    equal: false
                },
                {
                    description: "number and array are not equal",
                    value1: 1,
                    value2: [],
                    equal: false
                },
                {
                    description: "0 and null are not equal",
                    value1: 0,
                    value2: null,
                    equal: false
                },
                {
                    description: "equal strings",
                    value1: "a",
                    value2: "a",
                    equal: true
                },
                {
                    description: "not equal strings",
                    value1: "a",
                    value2: "b",
                    equal: false
                },
                {
                    description: "empty string and null are not equal",
                    value1: "",
                    value2: null,
                    equal: false
                },
                {
                    description: "null is equal to null",
                    value1: null,
                    value2: null,
                    equal: true
                },
                {
                    description: "equal booleans (true)",
                    value1: true,
                    value2: true,
                    equal: true
                },
                {
                    description: "equal booleans (false)",
                    value1: false,
                    value2: false,
                    equal: true
                },
                {
                    description: "not equal booleans",
                    value1: true,
                    value2: false,
                    equal: false
                },
                {
                    description: "1 and true are not equal",
                    value1: 1,
                    value2: true,
                    equal: false
                },
                {
                    description: "0 and false are not equal",
                    value1: 0,
                    value2: false,
                    equal: false
                },
                {
                    description: "NaN and NaN are equal",
                    value1: NaN,
                    value2: NaN,
                    equal: true
                },
                {
                    description: "0 and -0 are equal",
                    value1: 0,
                    value2: -0,
                    equal: true
                },
                {
                    description: "Infinity and Infinity are equal",
                    value1: Infinity,
                    value2: Infinity,
                    equal: true
                },
                {
                    description: "Infinity and -Infinity are not equal",
                    value1: Infinity,
                    value2: -Infinity,
                    equal: false
                }
            ]
        },
        {
            description: "objects",
            tests: [
                {
                    description: "empty objects are equal",
                    value1: {},
                    value2: {},
                    equal: true
                },
                {
                    description: 'equal objects (same properties "order")',
                    value1: { a: 1, b: "2" },
                    value2: { a: 1, b: "2" },
                    equal: true
                },
                {
                    description: 'equal objects (different properties "order")',
                    value1: { a: 1, b: "2" },
                    value2: { b: "2", a: 1 },
                    equal: true
                },
                {
                    description: "not equal objects (extra property)",
                    value1: { a: 1, b: "2" },
                    value2: { a: 1, b: "2", c: [] },
                    equal: false
                },
                {
                    description: "not equal objects (different properties)",
                    value1: { a: 1, b: "2", c: 3 },
                    value2: { a: 1, b: "2", d: 3 },
                    equal: false
                },
                {
                    description: "not equal objects (different properties)",
                    value1: { a: 1, b: "2", c: 3 },
                    value2: { a: 1, b: "2", d: 3 },
                    equal: false
                },
                {
                    description: "equal objects (same sub-properties)",
                    value1: { a: [{ b: "c" }] },
                    value2: { a: [{ b: "c" }] },
                    equal: true
                },
                {
                    description: "not equal objects (different sub-property value)",
                    value1: { a: [{ b: "c" }] },
                    value2: { a: [{ b: "d" }] },
                    equal: false
                },
                {
                    description: "not equal objects (different sub-property)",
                    value1: { a: [{ b: "c" }] },
                    value2: { a: [{ c: "c" }] },
                    equal: false
                },
                {
                    description: "empty array and empty object are not equal",
                    value1: {},
                    value2: [],
                    equal: false
                },
                {
                    description: "object with extra undefined properties are not equal #1",
                    value1: {},
                    value2: { foo: undefined },
                    equal: false
                },
                {
                    description: "object with extra undefined properties are not equal #2",
                    value1: { foo: undefined },
                    value2: {},
                    equal: false
                },
                {
                    description: "object with extra undefined properties are not equal #3",
                    value1: { foo: undefined },
                    value2: { bar: undefined },
                    equal: false
                },
                {
                    description: "nulls are equal",
                    value1: null,
                    value2: null,
                    equal: true
                },
                {
                    description: "null and undefined are not equal",
                    value1: null,
                    value2: undefined,
                    equal: false
                },
                {
                    description: "null and empty object are not equal",
                    value1: null,
                    value2: {},
                    equal: false
                },
                {
                    description: "undefined and empty object are not equal",
                    value1: undefined,
                    value2: {},
                    equal: false
                }
            ]
        },
        {
            description: "arrays",
            tests: [
                {
                    description: "two empty arrays are equal",
                    value1: [],
                    value2: [],
                    equal: true
                },
                {
                    description: "equal arrays",
                    value1: [1, 2, 3],
                    value2: [1, 2, 3],
                    equal: true
                },
                {
                    description: "not equal arrays (different item)",
                    value1: [1, 2, 3],
                    value2: [1, 2, 4],
                    equal: false
                },
                {
                    description: "not equal arrays (different length)",
                    value1: [1, 2, 3],
                    value2: [1, 2],
                    equal: false
                },
                {
                    description: "equal arrays of objects",
                    value1: [{ a: "a" }, { b: "b" }],
                    value2: [{ a: "a" }, { b: "b" }],
                    equal: true
                },
                {
                    description: "not equal arrays of objects",
                    value1: [{ a: "a" }, { b: "b" }],
                    value2: [{ a: "a" }, { b: "c" }],
                    equal: false
                },
                {
                    description: "pseudo array and equivalent array are not equal",
                    value1: { "0": 0, "1": 1, length: 2 },
                    value2: [0, 1],
                    equal: false
                }
            ]
        },
        {
            description: "Date objects",
            tests: [
                {
                    description: "equal date objects",
                    value1: new Date("2017-06-16T21:36:48.362Z"),
                    value2: new Date("2017-06-16T21:36:48.362Z"),
                    equal: true
                },
                {
                    description: "not equal date objects",
                    value1: new Date("2017-06-16T21:36:48.362Z"),
                    value2: new Date("2017-01-01T00:00:00.000Z"),
                    equal: false
                },
                {
                    description: "date and string are not equal",
                    value1: new Date("2017-06-16T21:36:48.362Z"),
                    value2: "2017-06-16T21:36:48.362Z",
                    equal: false
                },
                {
                    description: "date and object are not equal",
                    value1: new Date("2017-06-16T21:36:48.362Z"),
                    value2: {},
                    equal: false
                }
            ]
        },
        {
            description: "RegExp objects",
            tests: [
                {
                    description: "equal RegExp objects",
                    value1: /foo/,
                    value2: /foo/,
                    equal: true
                },
                {
                    description: "not equal RegExp objects (different pattern)",
                    value1: /foo/,
                    value2: /bar/,
                    equal: false
                },
                {
                    description: "not equal RegExp objects (different flags)",
                    value1: /foo/,
                    value2: /foo/i,
                    equal: false
                },
                {
                    description: "RegExp and string are not equal",
                    value1: /foo/,
                    value2: "foo",
                    equal: false
                },
                {
                    description: "RegExp and object are not equal",
                    value1: /foo/,
                    value2: {},
                    equal: false
                }
            ]
        },
        {
            description: "functions",
            tests: [
                {
                    description: "same function is equal",
                    value1: func1,
                    value2: func1,
                    equal: true
                },
                {
                    description: "different functions are not equal",
                    value1: func1,
                    value2: func2,
                    equal: false
                }
            ]
        },
        {
            description: "sample objects",
            tests: [
                {
                    description: "big object",
                    value1: {
                        prop1: "value1",
                        prop2: "value2",
                        prop3: "value3",
                        prop4: {
                            subProp1: "sub value1",
                            subProp2: {
                                subSubProp1: "sub sub value1",
                                subSubProp2: [1, 2, { prop2: 1, prop: 2 }, 4, 5]
                            }
                        },
                        prop5: 1000,
                        prop6: new Date(2016, 2, 10)
                    },
                    value2: {
                        prop5: 1000,
                        prop3: "value3",
                        prop1: "value1",
                        prop2: "value2",
                        prop6: new Date("2016/03/10"),
                        prop4: {
                            subProp2: {
                                subSubProp1: "sub sub value1",
                                subSubProp2: [1, 2, { prop2: 1, prop: 2 }, 4, 5]
                            },
                            subProp1: "sub value1"
                        }
                    },
                    equal: true
                }
            ]
        }
    ];
    describe("equal", function () {
        tests.forEach(function (suite) {
            describe(suite.description, function () {
                suite.tests.forEach(function (test) {
                    it(test.description, function () {
                        index_4.expect(test.equal).toEqual(index_4.deepEqual(test.value1, test.value2));
                    });
                });
            });
        });
    });
});
define("node_modules/@ca0v/ceylon/tests/assertion-error.spec", ["require", "exports", "node_modules/@ca0v/ceylon/index"], function (require, exports, index_5) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    describe("AssertionError", function () {
        it("returns an Error object", function () {
            var error = index_5.AssertionError({
                message: "Error message"
            });
            index_5.expect(error).toBeAn(Error);
        });
        it("sets the error.message property", function () {
            var error = index_5.AssertionError({
                message: "Error message"
            });
            index_5.expect(error.message).toBe("Error message");
        });
        it("sets does not set the actual, expected, or showDiff properties when unspecified", function () {
            var error = index_5.AssertionError({
                message: "Error message"
            });
            index_5.expect(error["actual"]).toNotExist();
            index_5.expect(error["expected"]).toNotExist();
            index_5.expect(error["showDiff"]).toNotExist();
        });
        it("sets the actual, expected, and showDiff properties when specified", function () {
            var error = index_5.AssertionError({
                actual: "I ate an apple",
                expected: "I ate an orange",
                message: "Error message",
                showDiff: true
            });
            index_5.expect(error["actual"]).toBe("I ate an apple");
            index_5.expect(error["expected"]).toBe("I ate an orange");
            index_5.expect(error["showDiff"]).toBeTrue();
        });
    });
});
define("node_modules/ol3-fun/tests/spec/packages", ["require", "exports", "node_modules/@ca0v/ceylon/tests/index.spec", "node_modules/@ca0v/ceylon/tests/assert.spec", "node_modules/@ca0v/ceylon/tests/deep-equal.spec", "node_modules/@ca0v/ceylon/tests/assertion-error.spec"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("node_modules/ol3-fun/ol3-fun/slowloop", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function slowloop(functions, interval, cycles) {
        if (interval === void 0) { interval = 1000; }
        if (cycles === void 0) { cycles = 1; }
        var d = $.Deferred();
        var index = 0;
        var cycle = 0;
        if (!functions || 0 >= cycles) {
            d.resolve();
            return d;
        }
        var h = setInterval(function () {
            if (index === functions.length) {
                index = 0;
                if (++cycle === cycles) {
                    d.resolve();
                    clearInterval(h);
                    return;
                }
            }
            try {
                d.notify({ index: index, cycle: cycle });
                functions[index++]();
            }
            catch (ex) {
                clearInterval(h);
                d.reject(ex);
            }
        }, interval);
        return d;
    }
    exports.slowloop = slowloop;
});
define("node_modules/ol3-fun/tests/base", ["require", "exports", "node_modules/ol3-fun/ol3-fun/slowloop", "node_modules/@ca0v/ceylon/index"], function (require, exports, slowloop_1, index_6) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.slowloop = slowloop_1.slowloop;
    exports.expect = index_6.expect;
    exports.assert = index_6.assert;
    exports.deepEqual = index_6.deepEqual;
    function describe(title, fn) {
        console.log(title || "undocumented test group");
        return window.describe(title, fn);
    }
    exports.describe = describe;
    function it(title, fn) {
        console.log(title || "undocumented test");
        return window.it(title, fn);
    }
    exports.it = it;
    function should(result, message) {
        console.log(message || "undocumented assertion");
        if (!result)
            throw message;
    }
    exports.should = should;
    function shouldEqual(a, b, message) {
        if (a != b) {
            var msg = "\"" + a + "\" <> \"" + b + "\"";
            message = (message ? message + ": " : "") + msg;
            console.warn(msg);
        }
        should(a == b, message);
    }
    exports.shouldEqual = shouldEqual;
    function shouldThrow(fn, message) {
        try {
            fn();
        }
        catch (ex) {
            should(!!ex, ex);
            return ex;
        }
        should(false, "expected an exception" + (message ? ": " + message : ""));
    }
    exports.shouldThrow = shouldThrow;
    function stringify(o) {
        return JSON.stringify(o, null, "\t");
    }
    exports.stringify = stringify;
});
define("node_modules/ol3-fun/ol3-fun/common", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function uuid() {
        return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
            var r = (Math.random() * 16) | 0, v = c == "x" ? r : (r & 0x3) | 0x8;
            return v.toString(16);
        });
    }
    exports.uuid = uuid;
    function asArray(list) {
        var result = new Array(list.length);
        for (var i = 0; i < list.length; i++) {
            result[i] = list[i];
        }
        return result;
    }
    exports.asArray = asArray;
    function toggle(e, className, force) {
        var exists = e.classList.contains(className);
        if (exists && force !== true) {
            e.classList.remove(className);
            return false;
        }
        if (!exists && force !== false) {
            e.classList.add(className);
            return true;
        }
        return exists;
    }
    exports.toggle = toggle;
    function parse(v, type) {
        if (typeof type === "string")
            return v;
        if (typeof type === "number")
            return parseFloat(v);
        if (typeof type === "boolean")
            return (v === "1" || v === "true");
        if (Array.isArray(type)) {
            return v.split(",").map(function (v) { return parse(v, type[0]); });
        }
        throw "unknown type: " + type;
    }
    exports.parse = parse;
    function getQueryParameters(options, url) {
        if (url === void 0) { url = window.location.href; }
        var opts = options;
        Object.keys(opts).forEach(function (k) {
            doif(getParameterByName(k, url), function (v) {
                var value = parse(v, opts[k]);
                if (value !== undefined)
                    opts[k] = value;
            });
        });
    }
    exports.getQueryParameters = getQueryParameters;
    function getParameterByName(name, url) {
        if (url === void 0) { url = window.location.href; }
        name = name.replace(/[\[\]]/g, "\\$&");
        var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"), results = regex.exec(url);
        if (!results)
            return null;
        if (!results[2])
            return "";
        return decodeURIComponent(results[2].replace(/\+/g, " "));
    }
    exports.getParameterByName = getParameterByName;
    function doif(v, cb) {
        if (v !== undefined && v !== null)
            cb(v);
    }
    exports.doif = doif;
    function mixin(a) {
        var b = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            b[_i - 1] = arguments[_i];
        }
        b.forEach(function (b) {
            Object.keys(b).forEach(function (k) { return (a[k] = b[k]); });
        });
        return a;
    }
    exports.mixin = mixin;
    function defaults(a) {
        var b = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            b[_i - 1] = arguments[_i];
        }
        b.forEach(function (b) {
            Object.keys(b)
                .filter(function (k) { return a[k] === undefined; })
                .forEach(function (k) { return (a[k] = b[k]); });
        });
        return a;
    }
    exports.defaults = defaults;
    function debounce(func, wait, immediate) {
        if (wait === void 0) { wait = 50; }
        if (immediate === void 0) { immediate = false; }
        var timeout;
        return (function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var later = function () {
                timeout = NaN;
                if (!immediate)
                    func.apply({}, args);
            };
            var callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = window.setTimeout(later, wait);
            if (callNow)
                func.apply({}, args);
        });
    }
    exports.debounce = debounce;
    function html(html) {
        var a = document.createElement("div");
        a.innerHTML = html;
        return (a.firstElementChild || a.firstChild);
    }
    exports.html = html;
    function pair(a1, a2) {
        var result = new Array(a1.length * a2.length);
        var i = 0;
        a1.forEach(function (v1) { return a2.forEach(function (v2) { return (result[i++] = [v1, v2]); }); });
        return result;
    }
    exports.pair = pair;
    function range(n) {
        var result = new Array(n);
        for (var i = 0; i < n; i++)
            result[i] = i;
        return result;
    }
    exports.range = range;
    function shuffle(array) {
        var currentIndex = array.length;
        var temporaryValue;
        var randomIndex;
        while (0 !== currentIndex) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }
        return array;
    }
    exports.shuffle = shuffle;
});
define("node_modules/ol3-fun/ol3-fun/css", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function cssin(name, css) {
        var id = "style-" + name;
        var styleTag = document.getElementById(id);
        if (!styleTag) {
            styleTag = document.createElement("style");
            styleTag.id = id;
            styleTag.type = "text/css";
            document.head.appendChild(styleTag);
            styleTag.appendChild(document.createTextNode(css));
        }
        var dataset = styleTag.dataset;
        dataset["count"] = parseInt(dataset["count"] || "0") + 1 + "";
        return function () {
            dataset["count"] = parseInt(dataset["count"] || "0") - 1 + "";
            if (dataset["count"] === "0") {
                styleTag.remove();
            }
        };
    }
    exports.cssin = cssin;
    function loadCss(options) {
        if (!options.name)
            throw "must provide a name to prevent css duplication";
        if (options.url && options.css)
            throw "cannot provide both a url and a css";
        if (options.css)
            return cssin(options.name, options.css);
        if (!options.url)
            throw "must provide either a url or css option";
        var id = "style-" + options.name;
        var head = document.getElementsByTagName("head")[0];
        var link = document.getElementById(id);
        if (!link) {
            link = document.createElement("link");
            link.id = id;
            link.type = "text/css";
            link.rel = "stylesheet";
            link.href = options.url;
            head.appendChild(link);
        }
        var dataset = link.dataset;
        dataset["count"] = parseInt(dataset["count"] || "0") + 1 + "";
        return function () {
            dataset["count"] = parseInt(dataset["count"] || "0") - 1 + "";
            if (dataset["count"] === "0") {
                link.remove();
            }
        };
    }
    exports.loadCss = loadCss;
});
define("node_modules/ol3-fun/ol3-fun/navigation", ["require", "exports", "openlayers", "jquery", "node_modules/ol3-fun/ol3-fun/common"], function (require, exports, ol, $, common_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function zoomToFeature(map, feature, ops) {
        var promise = $.Deferred();
        var options = common_1.defaults(ops || {}, {
            duration: 1000,
            padding: 256,
            minResolution: 2 * map.getView().getMinResolution()
        });
        var view = map.getView();
        var currentExtent = view.calculateExtent(map.getSize());
        var targetExtent = feature.getGeometry().getExtent();
        var doit = function (duration) {
            view.fit(targetExtent, {
                size: map.getSize(),
                padding: [options.padding, options.padding, options.padding, options.padding],
                minResolution: options.minResolution,
                duration: duration,
                callback: function () { return promise.resolve(); }
            });
        };
        if (ol.extent.containsExtent(currentExtent, targetExtent)) {
            doit(options.duration);
        }
        else if (ol.extent.containsExtent(currentExtent, targetExtent)) {
            doit(options.duration);
        }
        else {
            var fullExtent = ol.extent.createEmpty();
            ol.extent.extend(fullExtent, currentExtent);
            ol.extent.extend(fullExtent, targetExtent);
            var dscale = ol.extent.getWidth(fullExtent) / ol.extent.getWidth(currentExtent);
            var duration = 0.5 * options.duration;
            view.fit(fullExtent, {
                size: map.getSize(),
                padding: [options.padding, options.padding, options.padding, options.padding],
                minResolution: options.minResolution,
                duration: duration
            });
            setTimeout(function () { return doit(0.5 * options.duration); }, duration);
        }
        return promise;
    }
    exports.zoomToFeature = zoomToFeature;
});
define("node_modules/ol3-fun/ol3-fun/parse-dms", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function decDegFromMatch(m) {
        var signIndex = {
            "-": -1,
            N: 1,
            S: -1,
            E: 1,
            W: -1
        };
        var latLonIndex = {
            "-": "",
            N: "lat",
            S: "lat",
            E: "lon",
            W: "lon"
        };
        var degrees, minutes, seconds, sign, latLon;
        sign = signIndex[m[2]] || signIndex[m[1]] || signIndex[m[6]] || 1;
        degrees = Number(m[3]);
        minutes = m[4] ? Number(m[4]) : 0;
        seconds = m[5] ? Number(m[5]) : 0;
        latLon = latLonIndex[m[1]] || latLonIndex[m[6]];
        if (!inRange(degrees, 0, 180))
            throw "Degrees out of range";
        if (!inRange(minutes, 0, 60))
            throw "Minutes out of range";
        if (!inRange(seconds, 0, 60))
            throw "Seconds out of range";
        return {
            decDeg: sign * (degrees + minutes / 60 + seconds / 3600),
            latLon: latLon
        };
    }
    function inRange(value, a, b) {
        return value >= a && value <= b;
    }
    function toDegreesMinutesAndSeconds(coordinate) {
        var absolute = Math.abs(coordinate);
        var degrees = Math.floor(absolute);
        var minutesNotTruncated = (absolute - degrees) * 60;
        var minutes = Math.floor(minutesNotTruncated);
        var seconds = Math.floor((minutesNotTruncated - minutes) * 60);
        return degrees + " " + minutes + " " + seconds;
    }
    function fromLonLatToDms(lon, lat) {
        var latitude = toDegreesMinutesAndSeconds(lat);
        var latitudeCardinal = lat >= 0 ? "N" : "S";
        var longitude = toDegreesMinutesAndSeconds(lon);
        var longitudeCardinal = lon >= 0 ? "E" : "W";
        return latitude + " " + latitudeCardinal + " " + longitude + " " + longitudeCardinal;
    }
    function fromDmsToLonLat(dmsString) {
        var _a;
        dmsString = dmsString.trim();
        var dmsRe = /([NSEW])?(-)?(\d+(?:\.\d+)?)[°º:d\s]?\s?(?:(\d+(?:\.\d+)?)['’‘′:]\s?(?:(\d{1,2}(?:\.\d+)?)(?:"|″|’’|'')?)?)?\s?([NSEW])?/i;
        var dmsString2;
        var m1 = dmsString.match(dmsRe);
        if (!m1)
            throw "Could not parse string";
        if (m1[1]) {
            m1[6] = undefined;
            dmsString2 = dmsString.substr(m1[0].length - 1).trim();
        }
        else {
            dmsString2 = dmsString.substr(m1[0].length).trim();
        }
        var decDeg1 = decDegFromMatch(m1);
        var m2 = dmsString2.match(dmsRe);
        var decDeg2 = m2 && decDegFromMatch(m2);
        if (typeof decDeg1.latLon === "undefined") {
            if (!isNaN(decDeg1.decDeg) && decDeg2 && isNaN(decDeg2.decDeg)) {
                return decDeg1.decDeg;
            }
            else if (!isNaN(decDeg1.decDeg) && decDeg2 && !isNaN(decDeg2.decDeg)) {
                decDeg1.latLon = "lat";
                decDeg2.latLon = "lon";
            }
            else {
                throw "Could not parse string";
            }
        }
        if (typeof decDeg2.latLon === "undefined") {
            decDeg2.latLon = decDeg1.latLon === "lat" ? "lon" : "lat";
        }
        return _a = {},
            _a[decDeg1.latLon] = decDeg1.decDeg,
            _a[decDeg2.latLon] = decDeg2.decDeg,
            _a;
    }
    function parse(value) {
        if (typeof value === "string")
            return fromDmsToLonLat(value);
        return fromLonLatToDms(value.lon, value.lat);
    }
    exports.parse = parse;
});
define("node_modules/ol3-fun/ol3-fun/is-primitive", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function isPrimitive(a) {
        switch (typeof a) {
            case "boolean":
                return true;
            case "number":
                return true;
            case "object":
                return null === a;
            case "string":
                return true;
            case "symbol":
                return true;
            case "undefined":
                return true;
            default:
                throw "unknown type: " + typeof a;
        }
    }
    exports.isPrimitive = isPrimitive;
});
define("node_modules/ol3-fun/ol3-fun/is-cyclic", ["require", "exports", "node_modules/ol3-fun/ol3-fun/is-primitive"], function (require, exports, is_primitive_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function isCyclic(a) {
        if (is_primitive_1.isPrimitive(a))
            return false;
        var test = function (o, history) {
            if (is_primitive_1.isPrimitive(o))
                return false;
            if (0 <= history.indexOf(o)) {
                return true;
            }
            return Object.keys(o).some(function (k) { return test(o[k], [o].concat(history)); });
        };
        return Object.keys(a).some(function (k) { return test(a[k], [a]); });
    }
    exports.isCyclic = isCyclic;
});
define("node_modules/ol3-fun/ol3-fun/deep-extend", ["require", "exports", "node_modules/ol3-fun/ol3-fun/is-cyclic", "node_modules/ol3-fun/ol3-fun/is-primitive"], function (require, exports, is_cyclic_1, is_primitive_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function isArrayLike(o) {
        var keys = Object.keys(o);
        return keys.every(function (k) { return k === parseInt(k, 10).toString(); });
    }
    function extend(a, b, trace, history) {
        if (history === void 0) { history = []; }
        if (!b) {
            b = a;
            a = {};
        }
        var merger = new Merger(trace, history);
        return merger.deepExtend(a, b, []);
    }
    exports.extend = extend;
    function isUndefined(a) {
        return typeof a === "undefined";
    }
    function isArray(val) {
        return Array.isArray(val);
    }
    function isHash(val) {
        return !is_primitive_2.isPrimitive(val) && !canClone(val) && !isArray(val);
    }
    function canClone(val) {
        if (val instanceof Date)
            return true;
        if (val instanceof RegExp)
            return true;
        return false;
    }
    function clone(val) {
        if (val instanceof Date)
            return new Date(val.getTime());
        if (val instanceof RegExp)
            return new RegExp(val.source);
        throw "unclonable type encounted: " + typeof val;
    }
    var Merger = (function () {
        function Merger(traceItems, history) {
            this.traceItems = traceItems;
            this.history = history;
        }
        Merger.prototype.trace = function (item) {
            if (this.traceItems) {
                this.traceItems.push(item);
            }
        };
        Merger.prototype.deepExtend = function (target, source, path) {
            var _this = this;
            if (target === source)
                return target;
            if (!target || (!isHash(target) && !isArray(target))) {
                throw "first argument must be an object";
            }
            if (!source || (!isHash(source) && !isArray(source))) {
                throw "second argument must be an object";
            }
            if (typeof source === "function") {
                return target;
            }
            this.push(source);
            if (isArray(source)) {
                if (!isArray(target)) {
                    throw "attempting to merge an array into a non-array";
                }
                this.mergeArray("id", target, source, path);
                return target;
            }
            else if (isArray(target)) {
                if (!isArrayLike(source)) {
                    throw "attempting to merge a non-array into an array";
                }
            }
            Object.keys(source).forEach(function (k) { return _this.mergeChild(k, target, source[k], path.slice()); });
            return target;
        };
        Merger.prototype.cloneArray = function (val, path) {
            var _this = this;
            this.push(val);
            return val.map(function (v) {
                if (is_primitive_2.isPrimitive(v))
                    return v;
                if (isHash(v))
                    return _this.deepExtend({}, v, path);
                if (isArray(v))
                    return _this.cloneArray(v, path);
                if (canClone(v))
                    return clone(v);
                throw "unknown type encountered: " + typeof v;
            });
        };
        Merger.prototype.push = function (a) {
            if (is_primitive_2.isPrimitive(a))
                return;
            if (-1 < this.history.indexOf(a)) {
                if (is_cyclic_1.isCyclic(a)) {
                    throw "circular reference detected";
                }
            }
            else
                this.history.push(a);
        };
        Merger.prototype.mergeChild = function (key, target, sourceValue, path) {
            var targetValue = target[key];
            if (sourceValue === targetValue)
                return;
            if (is_primitive_2.isPrimitive(sourceValue)) {
                path.push(key);
                this.trace({
                    path: path,
                    key: key,
                    target: target,
                    was: targetValue,
                    value: sourceValue
                });
                target[key] = sourceValue;
                return;
            }
            if (canClone(sourceValue)) {
                sourceValue = clone(sourceValue);
                path.push(key);
                this.trace({
                    path: path,
                    key: key,
                    target: target,
                    was: targetValue,
                    value: sourceValue
                });
                target[key] = sourceValue;
                return;
            }
            if (isArray(sourceValue)) {
                if (isArray(targetValue)) {
                    this.deepExtendWithKey(targetValue, sourceValue, path, key);
                    return;
                }
                sourceValue = this.cloneArray(sourceValue, path);
                path.push(key);
                this.trace({
                    path: path,
                    key: key,
                    target: target,
                    was: targetValue,
                    value: sourceValue
                });
                target[key] = sourceValue;
                return;
            }
            if (!isHash(sourceValue)) {
                throw "unexpected source type: " + typeof sourceValue;
            }
            if (!isHash(targetValue)) {
                var merger = new Merger(null, this.history);
                sourceValue = merger.deepExtend({}, sourceValue, path);
                path.push(key);
                this.trace({
                    path: path,
                    key: key,
                    target: target,
                    was: targetValue,
                    value: sourceValue
                });
                target[key] = sourceValue;
                return;
            }
            this.deepExtendWithKey(targetValue, sourceValue, path, key);
            return;
        };
        Merger.prototype.deepExtendWithKey = function (targetValue, sourceValue, path, key) {
            var index = path.push(key);
            this.deepExtend(targetValue, sourceValue, path);
            if (index === path.length)
                path.pop();
        };
        Merger.prototype.mergeArray = function (key, target, source, path) {
            var _this = this;
            if (!isArray(target))
                throw "target must be an array";
            if (!isArray(source))
                throw "input must be an array";
            if (!source.length)
                return target;
            var hash = {};
            target.forEach(function (item, i) {
                if (!item[key])
                    return;
                hash[item[key]] = i;
            });
            source.forEach(function (sourceItem, i) {
                var sourceKey = sourceItem[key];
                var targetIndex = hash[sourceKey];
                if (isUndefined(sourceKey)) {
                    if (isHash(target[i]) && !!target[i][key]) {
                        throw "cannot replace an identified array item with a non-identified array item";
                    }
                    _this.mergeChild(i, target, sourceItem, path.slice());
                    return;
                }
                if (isUndefined(targetIndex)) {
                    _this.mergeChild(target.length, target, sourceItem, path.slice());
                    return;
                }
                _this.mergeChild(targetIndex, target, sourceItem, path.slice());
                return;
            });
            return target;
        };
        return Merger;
    }());
});
define("node_modules/ol3-fun/ol3-fun/extensions", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Extensions = (function () {
        function Extensions() {
            this.hash = new WeakMap(null);
        }
        Extensions.prototype.isExtended = function (o) {
            return this.hash.has(o);
        };
        Extensions.prototype.extend = function (o, ext) {
            var hashData = this.hash.get(o);
            if (!hashData) {
                hashData = {};
                this.hash.set(o, hashData);
            }
            ext && Object.keys(ext).forEach(function (k) { return (hashData[k] = ext[k]); });
            return hashData;
        };
        Extensions.prototype.bind = function (o1, o2) {
            if (this.isExtended(o1)) {
                if (this.isExtended(o2)) {
                    if (this.hash.get(o1) === this.hash.get(o2))
                        return;
                    throw "both objects already bound";
                }
                else {
                    this.hash.set(o2, this.extend(o1));
                }
            }
            else {
                this.hash.set(o1, this.extend(o2));
            }
        };
        return Extensions;
    }());
    exports.Extensions = Extensions;
});
define("node_modules/ol3-fun/index", ["require", "exports", "node_modules/ol3-fun/ol3-fun/common", "node_modules/ol3-fun/ol3-fun/css", "node_modules/ol3-fun/ol3-fun/navigation", "node_modules/ol3-fun/ol3-fun/parse-dms", "node_modules/ol3-fun/ol3-fun/slowloop", "node_modules/ol3-fun/ol3-fun/deep-extend", "node_modules/ol3-fun/ol3-fun/extensions"], function (require, exports, common_2, css_1, navigation_1, parse_dms_1, slowloop_2, deep_extend_1, extensions_1) {
    "use strict";
    var index = {
        asArray: common_2.asArray,
        cssin: css_1.cssin,
        loadCss: css_1.loadCss,
        debounce: common_2.debounce,
        defaults: common_2.defaults,
        doif: common_2.doif,
        deepExtend: deep_extend_1.extend,
        getParameterByName: common_2.getParameterByName,
        getQueryParameters: common_2.getQueryParameters,
        html: common_2.html,
        mixin: common_2.mixin,
        pair: common_2.pair,
        parse: common_2.parse,
        range: common_2.range,
        shuffle: common_2.shuffle,
        toggle: common_2.toggle,
        uuid: common_2.uuid,
        slowloop: slowloop_2.slowloop,
        dms: {
            parse: parse_dms_1.parse,
            fromDms: function (dms) { return parse_dms_1.parse(dms); },
            fromLonLat: function (o) { return parse_dms_1.parse(o); }
        },
        navigation: {
            zoomToFeature: navigation_1.zoomToFeature
        },
        Extensions: extensions_1.Extensions
    };
    return index;
});
define("node_modules/ol3-fun/tests/spec/api", ["require", "exports", "node_modules/ol3-fun/tests/base", "node_modules/ol3-fun/index"], function (require, exports, base_1, API) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    base_1.describe("Test Harness API", function () {
        base_1.it("full api exists", function () {
            base_1.shouldEqual([base_1.describe, base_1.it, base_1.should, base_1.shouldEqual, base_1.shouldThrow, base_1.assert, base_1.expect, base_1.slowloop, base_1.stringify].every(function (f) { return typeof f === "function"; }), true, "API functions exist");
        });
    });
    base_1.describe("API", function () {
        base_1.it("full api exists", function () {
            base_1.shouldEqual([
                API.asArray,
                API.cssin,
                API.debounce,
                API.defaults,
                API.dms.parse,
                API.doif,
                API.getParameterByName,
                API.getQueryParameters,
                API.html,
                API.mixin,
                API.navigation.zoomToFeature,
                API.pair,
                API.parse,
                API.range,
                API.shuffle,
                API.slowloop,
                API.toggle,
                API.uuid
            ].every(function (f) { return typeof f === "function"; }), true, "API functions exist");
        });
    });
});
define("node_modules/ol3-fun/tests/spec/common", ["require", "exports", "node_modules/ol3-fun/tests/base", "node_modules/ol3-fun/ol3-fun/common"], function (require, exports, base_2, common_3) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function sum(list) {
        return list.reduce(function (a, b) { return a + b; }, 0);
    }
    describe("asArray tests", function () {
        it("asArray", function (done) {
            if (!document)
                return;
            document.body.appendChild(document.createElement("div"));
            var list = document.getElementsByTagName("div");
            var result = common_3.asArray(list);
            base_2.should(result.length === list.length, "array size matches list size");
            done();
        });
    });
    describe("uuid tests", function () {
        it("uuid", function () {
            base_2.should(common_3.uuid().length === 36, "uuid has 36 characters");
        });
    });
    describe("pair tests", function () {
        it("empty test", function () {
            base_2.should(0 === common_3.pair([], []).length, "empty result");
            base_2.should(0 === common_3.pair([1], []).length, "empty result");
            base_2.should(0 === common_3.pair([], [1]).length, "empty result");
        });
        it("ensures all combinations", function () {
            var A = [1, 3, 5], B = [7, 11, 13], result = common_3.pair(A, B);
            base_2.should(A.length * sum(B) + B.length * sum(A) === sum(result.map(function (v) { return v[0] + v[1]; })), "create product from two vectors");
        });
    });
    describe("range tests", function () {
        it("empty test", function () {
            base_2.should(0 === common_3.range(0).length, "empty result");
        });
        it("size tests", function () {
            base_2.should(1 === common_3.range(1).length, "single item");
            base_2.should(10 === common_3.range(10).length, "ten items");
        });
        it("content tests", function () {
            base_2.should(45 === sum(common_3.range(10)), "range '10' contains 0..9");
        });
    });
    describe("shuffle tests", function () {
        it("empty test", function () {
            base_2.should(0 === common_3.shuffle([]).length, "empty result");
        });
        it("size tests", function () {
            base_2.should(1 === common_3.shuffle(common_3.range(1)).length, "single item");
            base_2.should(10 === common_3.shuffle(common_3.range(10)).length, "ten items");
        });
        it("content tests", function () {
            base_2.should(45 === sum(common_3.shuffle(common_3.range(10))), "range '10' contains 0..9");
        });
    });
    describe("toggle tests", function () {
        it("toggle", function () {
            var div = document.createElement("div");
            base_2.should(div.className === "", "div contains no className");
            common_3.toggle(div, "foo");
            base_2.should(div.className === "foo", "toggle adds");
            common_3.toggle(div, "foo");
            base_2.should(div.className === "", "second toggles removes");
            common_3.toggle(div, "foo", true);
            base_2.should(div.className === "foo", "forces foo to exist when it does not exist");
            common_3.toggle(div, "foo", true);
            base_2.should(div.className === "foo", "forces foo to exist when it already exists");
            common_3.toggle(div, "foo", false);
            base_2.should(div.className === "", "forces foo to not exist");
            common_3.toggle(div, "foo", false);
            base_2.should(div.className === "", "forces foo to not exist");
        });
    });
    describe("parse tests", function () {
        it("parse", function () {
            var num = 0;
            var bool = false;
            base_2.should(common_3.parse("", "").toString() === "", "empty string");
            base_2.should(common_3.parse("1", "").toString() === "1", "numeric string");
            base_2.should(common_3.parse("1", num) === 1, "numeric string as number returns number");
            base_2.should(common_3.parse("0", bool) === false, "0 as boolean is false");
            base_2.should(common_3.parse("1", bool) === true, "1 as boolean is true");
            base_2.should(common_3.parse("false", bool) === false, "'false' as boolean is false");
            base_2.should(common_3.parse("true", bool) === true, "'true' as boolean is true");
            base_2.should(common_3.parse("1", num) === 1, "numeric string as number returns number");
            base_2.should(common_3.parse("1", num) === 1, "numeric string as number returns number");
            base_2.should(common_3.parse("1,2,3", [num])[1] === 2, "parse into numeric array");
        });
    });
    describe("getQueryParameters tests", function () {
        it("getQueryParameters", function () {
            var options = { a: "" };
            common_3.getQueryParameters(options, "foo?a=1&b=2");
            base_2.shouldEqual(options.a, "1", "a=1 extracted");
            base_2.shouldEqual(options.b, undefined, "b not assigned");
            options = { b: "" };
            common_3.getQueryParameters(options, "foo?a=1&b=2");
            base_2.shouldEqual(options.b, "2", "b=2 extracted");
            base_2.shouldEqual(options.a, undefined, "a not assigned");
            options.a = options.b = options.c = "<null>";
            common_3.getQueryParameters(options, "foo?a=1&b=2");
            base_2.shouldEqual(options.a, "1", "a=1 extracted");
            base_2.shouldEqual(options.b, "2", "b=2 extracted");
            base_2.shouldEqual(options.c, "<null>", "c not assigned, original value untouched");
        });
    });
    describe("getParameterByName tests", function () {
        it("getParameterByName", function () {
            base_2.shouldEqual(common_3.getParameterByName("a", "foo?a=1"), "1", "a=1");
            base_2.shouldEqual(common_3.getParameterByName("b", "foo?a=1"), null, "b does not exist");
        });
    });
    describe("doif tests", function () {
        var die = function (n) {
            throw "doif callback not expected to execute: " + n;
        };
        var spawn = function () {
            var v = true;
            return function () { return (v = !v); };
        };
        it("doif false tests", function () {
            common_3.doif(undefined, die);
            common_3.doif(null, die);
        });
        it("doif empty tests", function () {
            var c = spawn();
            common_3.doif(0, c);
            base_2.shouldEqual(c(), true, "0 invokes doif");
            common_3.doif(false, c);
            base_2.shouldEqual(c(), true, "false invokes doif");
            common_3.doif({}, c);
            base_2.shouldEqual(c(), true, "{} invokes doif");
        });
        it("doif value tests", function () {
            common_3.doif(0, function (v) { return base_2.shouldEqual(v, 0, "0"); });
            common_3.doif({ a: 100 }, function (v) { return base_2.shouldEqual(v.a, 100, "a = 100"); });
        });
    });
    describe("mixin tests", function () {
        it("simple mixins", function () {
            base_2.shouldEqual(common_3.mixin({ a: 1 }, { b: 2 }).a, 1, "a=1");
            base_2.shouldEqual(common_3.mixin({ a: 1 }, { b: 2 }).b, 2, "b=2");
            base_2.shouldEqual(common_3.mixin({ a: 1 }, { b: 2 }).c, undefined, "c undefined");
            base_2.shouldEqual(common_3.mixin({ a: 1 }, {}).a, 1, "a=1");
            base_2.shouldEqual(common_3.mixin({}, { b: 2 }).b, 2, "b=2");
        });
        it("nested mixins", function () {
            var _a;
            base_2.shouldEqual(common_3.mixin({ vermont: { burlington: true } }, (_a = {}, _a["south carolina"] = { greenville: true }, _a))["south carolina"]
                .greenville, true, "greenville is in south carolina");
            base_2.shouldEqual(common_3.mixin({ vermont: { burlington: true } }, { vermont: { greenville: false } }).vermont.greenville, false, "greenville is not in vermont");
            base_2.shouldEqual(common_3.mixin({ vermont: { burlington: true } }, { vermont: { greenville: false } }).vermont.burlington, undefined, "second vermont completely wipes out 1st");
        });
    });
    describe("defaults tests", function () {
        it("defaults", function () {
            base_2.shouldEqual(common_3.defaults({ a: 1 }, { a: 2, b: 3 }).a, 1, "a = 1");
            base_2.shouldEqual(common_3.defaults({ a: 1 }, { a: 2, b: 3 }).b, 3, "b = 3");
            base_2.shouldEqual(common_3.defaults({}, { a: 2, b: 3 }).a, 2, "a = 2");
        });
    });
    describe("html tests", function () {
        it("tableless tr test", function () {
            var markup = "<tr>A<td>B</td></tr>";
            var tr = common_3.html(markup);
            base_2.should(tr.nodeValue === "AB", "setting innerHTML on a 'div' will not assign tr elements");
        });
        it("table tr test", function () {
            var markup = "<table><tbody><tr><td>Test</td></tr></tbody></table>";
            var table = common_3.html(markup);
            base_2.should(table.outerHTML === markup, "preserves tr when within a table");
        });
        it("canvas test", function () {
            var markup = "<canvas width=\"100\" height=\"100\"></canvas>";
            var canvas = common_3.html(markup);
            base_2.should(canvas.outerHTML === markup, "canvas markup preserved");
            base_2.should(!!canvas.getContext("2d"), "cnvas has 2d context");
        });
    });
});
define("node_modules/ol3-fun/tests/spec/slowloop", ["require", "exports", "node_modules/ol3-fun/tests/base", "node_modules/ol3-fun/ol3-fun/common"], function (require, exports, base_3, common_4) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    base_3.describe("slowloop", function () {
        base_3.it("slowloop empty", function (done) {
            try {
                base_3.slowloop(null);
                base_3.should(false, "slowloop requires an array");
            }
            catch (_a) {
                done();
            }
        });
        base_3.it("slowloop with progress", function () {
            var progressCount = 0;
            return base_3.slowloop(common_4.range(7).map(function (n) { return function () { }; }), 0, 5)
                .progress(function (args) {
                console.log(args);
                progressCount++;
            })
                .then(function () {
                base_3.shouldEqual(progressCount, 7 * 5, "progress callbacks");
            });
        });
        base_3.it("slowloop with exceptions", function () {
            return base_3.slowloop([
                function () {
                    throw "exception occured in slowloop";
                }
            ])
                .then(function () { return base_3.should(false, "failure expected"); })
                .catch(function (ex) { return base_3.should(!!ex, ex); });
        });
        base_3.it("slowloop with abort", function () {
            return base_3.slowloop([
                function () {
                    base_3.should(false, "aborted from inside");
                }
            ], 10)
                .reject("aborted from outside")
                .catch(function (ex) { return base_3.shouldEqual(ex, "aborted from outside", "aborted from outside"); });
        });
        base_3.it("slowloop fast", function (done) {
            var count = 0;
            var inc = function () { return count++; };
            base_3.slowloop([inc, inc, inc], 0, 100).then(function () {
                base_3.shouldEqual(count, 300, "0 ms * 100 iterations * 3 functions => 300 invocations");
                done();
            });
        }).timeout(2000);
        base_3.it("slowloop iterations", function (done) {
            var count = 0;
            var inc = function () { return count++; };
            base_3.slowloop([inc]).then(function () {
                base_3.shouldEqual(count, 1, "defaults to a single iteration");
                base_3.slowloop([inc], 0, 2).then(function () {
                    base_3.shouldEqual(count, 3, "performs two iterations");
                    base_3.slowloop([inc], 0, 0).then(function () {
                        base_3.shouldEqual(count, 3, "performs 0 iterations");
                        done();
                    });
                });
            });
        });
    });
});
define("node_modules/ol3-fun/tests/spec/deep-extend", ["require", "exports", "node_modules/ol3-fun/tests/base", "node_modules/ol3-fun/ol3-fun/deep-extend", "node_modules/ol3-fun/ol3-fun/common"], function (require, exports, base_4, deep_extend_2, common_5) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    describe("utils/deep-extend", function () {
        it("trivial merges", function () {
            base_4.shouldEqual(base_4.stringify(deep_extend_2.extend({}, {})), base_4.stringify({}), "empty objects");
            base_4.shouldEqual(base_4.stringify(deep_extend_2.extend([], [])), base_4.stringify([]), "empty arrays");
            base_4.shouldEqual(base_4.stringify(deep_extend_2.extend([], {})), base_4.stringify([]), "empty arrays with empty object");
            base_4.shouldEqual(base_4.stringify(deep_extend_2.extend([,], [, ,])), base_4.stringify([,]), "arrays with empty items");
            var o = { a: 1 };
            base_4.shouldEqual(o, deep_extend_2.extend(o, o), "merges same object");
            base_4.should(o !== deep_extend_2.extend(o), "clones when second argument not provided");
        });
        it("invalid merges", function () {
            base_4.shouldThrow(function () { return deep_extend_2.extend({}, []); }, "array->object considered an error");
            base_4.shouldThrow(function () { return deep_extend_2.extend({ a: 1 }, []); }, "{a:1} and []");
            base_4.shouldThrow(function () { return deep_extend_2.extend([], { a: 1 }); }, "[] and {a:1}");
            base_4.shouldThrow(function () { return deep_extend_2.extend(1, 2); }, "primitives");
            base_4.shouldThrow(function () { return deep_extend_2.extend(new Date(2000, 1, 1), new Date(2000, 1, 2)); }, "clonable primitives");
            var a = { a: 1 };
            var b = { b: a };
            a.b = b;
            base_4.shouldEqual(base_4.shouldThrow(function () { return deep_extend_2.extend(b); }, "b->a->b"), "circular reference detected");
        });
        it("merges with duplicate objects that might be detected as recursive", function () {
            var o = { a: { date: new Date(Date.now() - 1000), address: { street: "main" } } };
            var p = { o1: o, o2: o };
            base_4.shouldEqual(base_4.stringify(deep_extend_2.extend(p)), base_4.stringify(p), "two children pointing to the same object");
            var q = { p1: p, p2: [p], p3: [{ id: "P", value: p }] };
            var actual = base_4.stringify(deep_extend_2.extend(q, deep_extend_2.extend(p, o)));
            base_4.should(!!actual, "complex linked");
        });
        it("simple data merges", function () {
            var o = deep_extend_2.extend({ v1: 1 });
            base_4.shouldEqual(o.v1, 1, "adds v1");
            deep_extend_2.extend(o, { v1: 2 });
            base_4.shouldEqual(o.v1, 2, "updates v1");
        });
        it("simple array merges", function () {
            base_4.shouldEqual(base_4.stringify(deep_extend_2.extend([1], [])), base_4.stringify([1]), "[1] + []");
            base_4.shouldEqual(base_4.stringify(deep_extend_2.extend([1], [2])), base_4.stringify([2]), "[1<-2]");
            base_4.shouldEqual(base_4.stringify(deep_extend_2.extend([1, 2, 3], [2])), base_4.stringify([2, 2, 3]), "[1<-2,2,3]]");
            base_4.shouldEqual(base_4.stringify(deep_extend_2.extend([2], [1, 2, 3])), base_4.stringify([1, 2, 3]), "[2<-1, 2, 3]");
            base_4.shouldEqual(base_4.stringify(deep_extend_2.extend([, , , 4], [1, 2, 3])), base_4.stringify([1, 2, 3, 4]), "array can have empty items");
            base_4.should(base_4.deepEqual(deep_extend_2.extend([1, 2, 3], { 1: 100 }), [1, 100, 3]), "array<-object");
            base_4.should(base_4.deepEqual(deep_extend_2.extend([{ id: 1 }], [{ id: 2 }]), [{ id: 1 }, { id: 2 }]), "[1] + [2] with ids");
        });
        it("preserves array ordering", function () {
            base_4.shouldEqual(deep_extend_2.extend([{ id: 1 }], [{ id: 1 }, { id: 2 }])[0].id, 1, "first item id");
            base_4.shouldEqual(deep_extend_2.extend([{ id: 2 }], [{ id: 1 }, { id: 2 }])[0].id, 2, "first item id");
            base_4.shouldEqual(deep_extend_2.extend([{ id: 1 }, { id: 3 }], [{ id: 2 }, { id: 1, v: 1 }])[0].v, 1, "first item id");
        });
        it("clones objects with primitives", function () {
            var source = { v1: { v2: { v3: 1 } } };
            var o = deep_extend_2.extend(source);
            base_4.shouldEqual(o.v1.v2.v3, 1, "properly extends {}");
            base_4.should(source.v1 !== o.v1, "properly clones objects");
        });
        it("clones dates", function () {
            var source = { date: new Date() };
            var o = deep_extend_2.extend(source);
            base_4.should(source.date !== o.date, "dates are clones");
            base_4.shouldEqual(source.date.getUTCDate(), o.date.getUTCDate(), "date values are preserved");
        });
        it("clones nested objects", function () {
            var source = { v1: { v2: { v3: 1 } } };
            var o = deep_extend_2.extend(source);
            base_4.should(source !== o, "clones source");
            base_4.shouldEqual(source.v1.v2.v3, o.v1.v2.v3, "properly extends v3");
            base_4.should(source.v1 !== o.v1, "properly clones v1");
            base_4.should(source.v1.v2 !== o.v1.v2, "properly clones v1.v2");
        });
        it("clones arrays", function () {
            var source = { v1: common_5.range(1).map(function (i) { return ({ id: i + 1, value: i }); }) };
            var o = deep_extend_2.extend(source);
            base_4.should(source !== o, "clones source");
            base_4.should(source.v1 !== o.v1, "clones v1");
            base_4.should(source.v1[0].value === o.v1[0].value, "extends v1[1].value");
            base_4.should(source.v1[0] !== o.v1[0], "clones v1[1]");
        });
        it("confirms references are preserved", function () {
            var x = { foo: { bar: "foo" }, array: [{ id: "a", value: "ax" }] };
            var y = { foo: { bar: "bar" }, array: [{ id: "a", value: "ay" }] };
            var xfoo = x.foo;
            var xarray = x.array[0];
            var z = deep_extend_2.extend(x, y);
            base_4.shouldEqual(x, z, "returns x");
            base_4.shouldEqual(xfoo, z.foo, "reference foo preserved");
            base_4.shouldEqual(xarray.value, "ay", "existing array references are preserved");
        });
        it("confirms array merge is 'id' aware", function () {
            var o1 = {
                values: [
                    {
                        id: "v1",
                        value: { v1: 1 }
                    },
                    {
                        id: "v2",
                        value: { v2: 1 }
                    },
                    {
                        id: "v9",
                        value: { v9: 1 }
                    }
                ]
            };
            var o2 = {
                values: [
                    {
                        id: "v1",
                        value: { v1: 2 }
                    },
                    {
                        id: "v9",
                        value: { v9: 2 }
                    }
                ]
            };
            var o = deep_extend_2.extend(o1);
            base_4.shouldEqual(o.values[0].value.v1, 1, "object is clone of o1, v1");
            base_4.shouldEqual(o.values[1].value.v2, 1, "object is clone of o1, v2");
            base_4.shouldEqual(o.values[2].value.v9, 1, "object is clone of o1, v9");
            deep_extend_2.extend(o, o2);
            base_4.shouldEqual(o.values[0].value.v1, 2, "merge replaces v1");
            base_4.shouldEqual(o.values[1].value.v2, 1, "merge preserves v2");
            base_4.shouldEqual(o.values[2].value.v9, 2, "merge replaces v9");
        });
        it("confirms array references are preserved", function () {
            var x = { foo: { bar: "foo" } };
            var y = { foo: { bar: "bar" } };
            var xfoo = x.foo;
            var z = deep_extend_2.extend(x, y);
            base_4.shouldEqual(x, z, "returns x");
            base_4.shouldEqual(xfoo, z.foo, "reference foo preserved");
        });
        it("confirms trace on simple array merging", function () {
            var trace = [];
            var result = deep_extend_2.extend([1, 2, 5], [, 3], trace);
            base_4.shouldEqual(base_4.stringify(result), base_4.stringify([1, 3, 5]), "confirm array extended");
            base_4.shouldEqual(trace.length, 1, "length: 2<-3");
            base_4.shouldEqual(base_4.stringify(trace[0].path), base_4.stringify([1]), "path: target[1]");
            base_4.shouldEqual(trace[0].key, 1, "key: target[*1*] was 2 and is now 3");
            base_4.shouldEqual(trace[0].was, 2, "was: target[1] was *2* and is now 3");
            base_4.shouldEqual(trace[0].value, 3, "value: target[1] was 2 and is now *3*");
        });
        it("confirms trace diff on simple array", function () {
            var trace = [];
            deep_extend_2.extend([1, 2, 5], [, 3], trace);
            base_4.shouldEqual(base_4.stringify(diff(trace)), base_4.stringify({ 1: 3 }), "simple array trace diff");
        });
        it("confirms trace diff on simple array against array-like object", function () {
            var trace = [];
            deep_extend_2.extend([1, 2, 5], { 1: 3 }, trace);
            base_4.shouldEqual(base_4.stringify(diff(trace)), base_4.stringify({ 1: 3 }), "simple array trace diff");
        });
        it("confirms trace is empty when merging duplicate objects", function () {
            var trace = [];
            deep_extend_2.extend({}, {}, trace);
            base_4.shouldEqual(trace.length, 0, "no activity 0");
            deep_extend_2.extend({ a: 1 }, { a: 1 }, trace);
            base_4.shouldEqual(trace.length, 0, "no activity 1");
            deep_extend_2.extend({ a: 1, b: [1] }, { a: 1, b: [1] }, trace);
            base_4.shouldEqual(trace.length, 0, "no activity 2");
            deep_extend_2.extend({ a: 1, b: [1], c: {} }, { a: 1, b: [1], c: {} }, trace);
            base_4.shouldEqual(trace.length, 0, "no activity 3");
            deep_extend_2.extend({ a: 1, b: [1], c: { d: 1 } }, { a: 1, b: [1], c: { d: 1 } }, trace);
            base_4.shouldEqual(trace.length, 0, "no activity 4");
            deep_extend_2.extend({ a: [1, 2, 3] }, { a: [1, 2, 3] }, (trace = []));
            base_4.shouldEqual(trace.length, 0, "no activity 5");
            deep_extend_2.extend({ a: [1, 2, [3]] }, { a: [1, 2, [3]] }, (trace = []));
            base_4.shouldEqual(trace.length, 0, "no activity 6");
        });
        it("confirms trace count is 1 when exactly one change is merged", function () {
            var trace = [];
            deep_extend_2.extend({ a: 1, b: [1], c: { d: 1 } }, { a: 2, b: [1], c: { d: 1 } }, (trace = []));
            base_4.shouldEqual(trace.length, 1, "a:1->2");
            deep_extend_2.extend({ a: 1, b: [1], c: { d: 1 } }, { a: 1, b: [2], c: { d: 1 } }, (trace = []));
            base_4.shouldEqual(trace.length, 1, "b:1->2");
            deep_extend_2.extend({ a: 1, b: [1], c: { d: 1 } }, { a: 1, b: [1], c: { d: 2 } }, (trace = []));
            base_4.shouldEqual(trace.length, 1, "d:1->2");
            deep_extend_2.extend({ a: [1, 2, 3] }, { a: [1, 2, 30] }, (trace = []));
            base_4.shouldEqual(trace.length, 1, "3->30");
            deep_extend_2.extend({ a: [1, 2, [3]] }, { a: [1, 2, [3, 4]] }, (trace = []));
            base_4.shouldEqual(trace.length, 1, "[3]->[3,4]");
        });
        it("confirms trace count is 2 when exactly two changes is merged", function () {
            var trace = [];
            deep_extend_2.extend({ a: 1, b: [1], c: { d: 1 } }, { a: 2, b: [1, 2], c: { d: 1 } }, (trace = []));
            base_4.shouldEqual(trace.length, 2, "a:1->2, b:adds 2");
            deep_extend_2.extend({ a: 1, b: [1], c: { d: 1 } }, { a: 1, b: [2, 1], c: { d: 1 } }, (trace = []));
            base_4.shouldEqual(trace.length, 2, "b:1->2,adds 1");
            deep_extend_2.extend({ a: 1, b: [1], c: { d: 1 } }, { a: 1, b: [1], c: { d: 2, e: 3 } }, (trace = []));
            base_4.shouldEqual(trace.length, 2, "c.d:1->2, c.e:added");
            deep_extend_2.extend({ a: [1, 2, 3] }, { a: [10, 2, 30] }, (trace = []));
            base_4.shouldEqual(trace.length, 2, "1->10, 3->30");
            deep_extend_2.extend({ a: [1, 2, [3]] }, { a: [1, 2, [3, 4], 5] }, (trace = []));
            base_4.shouldEqual(trace.length, 2, "[3]->[3,4], 4 added");
        });
        it("confirms trace diff when exactly one change is made", function () {
            var trace = [];
            deep_extend_2.extend({ a: 1, b: [1], c: { d: 1 } }, { a: 2, b: [1], c: { d: 1 } }, (trace = []));
            base_4.shouldEqual(base_4.stringify(diff(trace)), base_4.stringify({ a: 2 }), "a:1->2");
            deep_extend_2.extend({ a: 1, b: [1], c: { d: 1 } }, { a: 1, b: [2], c: { d: 1 } }, (trace = []));
            base_4.shouldEqual(base_4.stringify(diff(trace)), base_4.stringify({ b: { 0: 2 } }), "b:1->2");
            deep_extend_2.extend({ a: 1, b: [1], c: { d: 1 } }, { a: 1, b: [1], c: { d: 2 } }, (trace = []));
            base_4.shouldEqual(base_4.stringify(diff(trace)), base_4.stringify({ c: { d: 2 } }), "d:1->2");
            deep_extend_2.extend({ a: [1, 2, 3] }, { a: [1, 2, 30] }, (trace = []));
            base_4.shouldEqual(base_4.stringify(diff(trace)), base_4.stringify({ a: { 2: 30 } }), "a[2]:3->30");
            deep_extend_2.extend({ a: [1, 2, [3]] }, { a: [1, 2, [3, 4]] }, (trace = []));
            base_4.shouldEqual(base_4.stringify(diff(trace)), base_4.stringify({ a: { 2: { 1: 4 } } }), "[3]->[3,4]");
        });
        it("confirms trace diff when exactly two changes are made", function () {
            var trace = [];
            deep_extend_2.extend({ a: [1, 2, ["3"]] }, { a: [1, 2, ["A", "B"]] }, (trace = []));
            base_4.shouldEqual(base_4.stringify(diff(trace)), base_4.stringify({ a: { 2: { 0: "A", 1: "B" } } }), "a[2]:[3]<-[A,B]");
        });
        it("confirms trace content", function () {
            var trace = [];
            var target = deep_extend_2.extend({
                foo: 1,
                bar: 2
            }, {
                foo: 1,
                property: "should fire 'add' event with this object and string path to it",
                object: {
                    p1: "p1",
                    p2: 2,
                    a1: [1, 2, 3],
                    a2: [{ id: "v1", value: 1 }]
                }
            }, trace);
            base_4.shouldEqual(trace.length, 2, "property added, object added");
            base_4.shouldEqual(trace.length, trace.filter(function (t) { return t.value !== t.was; }).length, "no trivial trace elements");
            base_4.shouldEqual(trace.map(function (t) { return t.key; }).join(" "), "property object", "changes are depth first");
            var t = trace.shift();
            base_4.shouldEqual(t.key, "property", "property");
            base_4.shouldEqual(t.value, target.property, "target.property");
            t = trace.shift();
            base_4.shouldEqual(t.key, "object", "object");
            base_4.shouldEqual(t.value, target.object, "target.object");
        });
        it("generates empty diff from the trace", function () {
            var trace = [];
            var a = {
                personalInfo: {
                    email: "aliceames@email.org",
                    lastName: "Ames",
                    firstName: "Alice"
                },
                name: "name"
            };
            var b = {
                name: "name",
                personalInfo: {
                    firstName: "Alice",
                    lastName: "Ames",
                    email: "aliceames@email.org"
                }
            };
            var expected = {};
            deep_extend_2.extend(a, b, (trace = []));
            console.log("trace", base_4.stringify(trace));
            base_4.shouldEqual(base_4.stringify(diff(trace)), base_4.stringify(expected));
        });
        it("generates a diff from the trace", function () {
            var trace = [];
            var a = {
                name: "name",
                personalInfo: {
                    firstName: "Alice",
                    lastName: "Ames"
                }
            };
            var b = {
                name: "name",
                personalInfo: {
                    firstName: "Alice",
                    lastName: "Ames",
                    email: "aliceames@email.org"
                }
            };
            var expected = {
                personalInfo: {
                    email: "aliceames@email.org"
                }
            };
            deep_extend_2.extend(a, b, (trace = []));
            console.log("trace", base_4.stringify(trace));
            base_4.shouldEqual(base_4.stringify(diff(trace)), base_4.stringify(expected));
        });
    });
    function forcePath(o, path) {
        var node = o;
        path.forEach(function (n) { return (node = node[n] = node[n] || {}); });
        return node;
    }
    function diff(trace) {
        var result = {};
        trace.forEach(function (t) {
            var path = t.path.slice();
            var key = t.key;
            console.assert(key === path.pop());
            forcePath(result, path)[key] = t.value;
        });
        return result;
    }
});
define("node_modules/ol3-fun/tests/spec/extensions", ["require", "exports", "node_modules/ol3-fun/tests/base", "node_modules/ol3-fun/index", "node_modules/ol3-fun/ol3-fun/common"], function (require, exports, base_5, index_7, common_6) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    base_5.describe("data/extensions", function () {
        base_5.it("ensures the api", function () {
            var x = new index_7.Extensions();
            base_5.shouldEqual(typeof x.extend, "function", "extend method");
            base_5.shouldEqual(typeof x.bind, "function", "bind method");
            base_5.shouldEqual(typeof x.isExtended, "function", "isExtended method");
        });
        base_5.it("ensures no side-effects on the object", function () {
            var x = new index_7.Extensions();
            var o = {};
            var expected = JSON.stringify(o);
            x.extend(o, { custom: "data" });
            var actual = JSON.stringify(o);
            base_5.shouldEqual(expected, actual, "no side-effects");
        });
        base_5.it("ensures two objects can be bound to same extension data", function () {
            var x = new index_7.Extensions();
            var math = x.extend(Math, { sqrt2: Math.sqrt(2) });
            base_5.should(!!x.extend(Math).sqrt2, "Math.sqrt2");
            x.bind(Number, Math);
            base_5.shouldEqual(Math.round(math.sqrt2 * x.extend(Number).sqrt2), 2, "sqrt2*sqrt2 = 2");
        });
        base_5.it("ensures two extensions can bind data to the same object", function () {
            var ext1 = new index_7.Extensions();
            var ext2 = new index_7.Extensions();
            var o = {};
            ext1.extend(o, { ext: 1 });
            ext2.extend(o, { ext: 2 });
            base_5.shouldEqual(ext1.extend(o).ext, 1, "ext1");
            base_5.shouldEqual(ext2.extend(o).ext, 2, "ext2");
        });
        base_5.it("ensures two extended objects cannot be bound", function () {
            var x = new index_7.Extensions();
            var o = {};
            var p = {};
            x.extend(o);
            x.extend(p);
            base_5.shouldThrow(function () { return x.bind(o, p); }, "cannot bind extended objects");
        });
        base_5.it("ensures isExtended returns true iff it is extended", function () {
            var x1 = new index_7.Extensions();
            var x2 = new index_7.Extensions();
            var o = {};
            base_5.should(!x1.isExtended(o), "not extended in x1");
            x1.extend(o);
            base_5.should(x1.isExtended(o), "extended in x1");
            base_5.should(!x2.isExtended(o), "not extended in x2");
            x2.extend(o);
            base_5.should(x2.isExtended(o), "extended in x2");
        });
        base_5.it("extension references are preserved", function () {
            var x = new index_7.Extensions();
            var o = {};
            var p = x.extend(o);
            x.extend(o, { name: "P" });
            base_5.shouldEqual(p.name, "P", "extension references are preserved");
        });
        base_5.it("binds two objects to the same extension", function () {
            var x = new index_7.Extensions();
            var o1 = { id: 1 };
            var o2 = Object.create({ id: 2 });
            x.bind(o1, o2);
            x.extend(o1, { foo: "foo1" });
            base_5.shouldEqual(x.extend(o1).foo, "foo1");
            x.extend(o2, { foo: "foo2" });
            base_5.shouldEqual(x.extend(o1).foo, "foo2");
        });
        base_5.it("extension integrity testing (100 objects X 10 extensions)", function () {
            var x = common_6.range(10).map(function (n) { return new index_7.Extensions(); });
            var data = common_6.range(1000).map(function (n) { return Object.create({ id: n }); });
            data.map(function (d, i) { return x[i % 10].extend(d, { data: common_6.shuffle(common_6.range(1000)) }); });
            data.forEach(function (d, i) {
                var data = x[i % 10].extend(d).data;
                data = data.filter(function (v) { return v <= d.id; });
                x[i % 10].extend(d, { data: data });
            });
            var sums = data.map(function (d, i) {
                var ext = x[i % 10].extend(d);
                base_5.shouldEqual(ext.data.length, i + 1, "extension data has " + (i + 1) + " items");
                return ext.data.reduce(function (a, b) { return a + b; }, 0);
            });
            console.log(sums);
            base_5.shouldEqual(sums.reduce(function (a, b) { return a + b; }, 0), 166666500);
        });
        base_5.it("extensions performance testing (1 million accesses)", function () {
            var x = new index_7.Extensions();
            var data = common_6.range(500000).map(function (n) { return ({ id: n }); });
            var counter = { count: 0 };
            data.forEach(function (d) { return x.extend(d, { counter: counter }); });
            data.forEach(function (d) { return x.extend(d).counter.count++; });
            base_5.shouldEqual(counter.count, data.length, "accessed " + data.length + " items");
        }).timeout(1000);
    });
});
define("node_modules/ol3-fun/tests/spec/is-primitive", ["require", "exports", "node_modules/ol3-fun/tests/base", "node_modules/ol3-fun/ol3-fun/is-primitive"], function (require, exports, base_6, is_primitive_3) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    base_6.describe("is-primitive", function () {
        base_6.it("true tests", function () {
            ["A", 1, true, null, undefined, Symbol(0)].forEach(function (v) {
                return base_6.should(is_primitive_3.isPrimitive(v), (v && v.toString ? v.toString() : v) + " is primitive");
            });
        });
        base_6.it("false tests", function () {
            [new Date(), new RegExp(""), {}, []].forEach(function (v) {
                return base_6.should(!is_primitive_3.isPrimitive(v), (v && v.toString ? v.toString() : v) + " is primitive");
            });
        });
    });
});
define("node_modules/ol3-fun/tests/spec/is-cycle", ["require", "exports", "node_modules/ol3-fun/tests/base", "node_modules/ol3-fun/ol3-fun/is-cyclic"], function (require, exports, base_7, is_cyclic_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    base_7.describe("is-cycle", function () {
        base_7.it("false tests", function () {
            var a = {};
            var b = { a: a };
            base_7.should(!is_cyclic_2.isCyclic({
                a: a,
                b: b
            }), "nothing in this graph refers back to an ancestor of itself");
        });
        base_7.it("true tests", function () {
            var a = { b: "" };
            var b = { a: a };
            a.b = b;
            base_7.should(is_cyclic_2.isCyclic(b), "b->a->b");
            base_7.should(is_cyclic_2.isCyclic({ b: b }), "{}->b->a->b");
            base_7.shouldThrow(function () { return base_7.stringify(b); }, "cycles cannot be serialized");
        });
    });
});
define("node_modules/ol3-fun/tests/spec/openlayers-test", ["require", "exports", "node_modules/ol3-fun/tests/base", "openlayers"], function (require, exports, base_8, ol) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    describe("ol/Map", function () {
        it("ol/Map", function () {
            base_8.should(!!ol.Map, "Map");
        });
    });
});
define("node_modules/ol3-fun/tests/spec/parse-dms", ["require", "exports", "node_modules/ol3-fun/tests/base", "node_modules/ol3-fun/ol3-fun/parse-dms"], function (require, exports, base_9, parse_dms_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    base_9.describe("parse-dms", function () {
        base_9.it("parse", function () {
            var dms = parse_dms_2.parse("10 5'2\" 10");
            if (typeof dms === "number")
                throw "lat-lon expected";
            base_9.should(dms.lat === 10.08388888888889, "10 degrees 5 minutes 2 seconds");
            base_9.should(dms.lon === 10, "10 degrees 0 minutes 0 seconds");
        });
    });
});
define("node_modules/ol3-fun/ol3-fun/google-polyline", ["require", "exports"], function (require, exports) {
    "use strict";
    var PolylineEncoder = (function () {
        function PolylineEncoder() {
        }
        PolylineEncoder.prototype.encodeCoordinate = function (coordinate, factor) {
            coordinate = Math.round(coordinate * factor);
            coordinate <<= 1;
            if (coordinate < 0) {
                coordinate = ~coordinate;
            }
            var output = '';
            while (coordinate >= 0x20) {
                output += String.fromCharCode((0x20 | (coordinate & 0x1f)) + 0x3f);
                coordinate >>= 5;
            }
            output += String.fromCharCode(coordinate + 0x3f);
            return output;
        };
        PolylineEncoder.prototype.decode = function (str, precision) {
            if (precision === void 0) { precision = 5; }
            var index = 0, lat = 0, lng = 0, coordinates = [], latitude_change, longitude_change, factor = Math.pow(10, precision);
            while (index < str.length) {
                var byte = 0;
                var shift = 0;
                var result = 0;
                do {
                    byte = str.charCodeAt(index++) - 0x3f;
                    result |= (byte & 0x1f) << shift;
                    shift += 5;
                } while (byte >= 0x20);
                var latitude_change_1 = ((result & 1) ? ~(result >> 1) : (result >> 1));
                shift = result = 0;
                do {
                    byte = str.charCodeAt(index++) - 0x3f;
                    result |= (byte & 0x1f) << shift;
                    shift += 5;
                } while (byte >= 0x20);
                longitude_change = ((result & 1) ? ~(result >> 1) : (result >> 1));
                lat += latitude_change_1;
                lng += longitude_change;
                coordinates.push([lat / factor, lng / factor]);
            }
            return coordinates;
        };
        PolylineEncoder.prototype.encode = function (coordinates, precision) {
            if (precision === void 0) { precision = 5; }
            if (!coordinates.length)
                return '';
            var factor = Math.pow(10, precision), output = this.encodeCoordinate(coordinates[0][0], factor) + this.encodeCoordinate(coordinates[0][1], factor);
            for (var i = 1; i < coordinates.length; i++) {
                var a = coordinates[i], b = coordinates[i - 1];
                output += this.encodeCoordinate(a[0] - b[0], factor);
                output += this.encodeCoordinate(a[1] - b[1], factor);
            }
            return output;
        };
        return PolylineEncoder;
    }());
    return PolylineEncoder;
});
define("node_modules/ol3-fun/ol3-fun/ol3-polyline", ["require", "exports", "openlayers"], function (require, exports, ol) {
    "use strict";
    var Polyline = ol.format.Polyline;
    var PolylineEncoder = (function () {
        function PolylineEncoder(precision, stride) {
            if (precision === void 0) { precision = 5; }
            if (stride === void 0) { stride = 2; }
            this.precision = precision;
            this.stride = stride;
        }
        PolylineEncoder.prototype.flatten = function (points) {
            var nums = new Array(points.length * this.stride);
            var i = 0;
            points.forEach(function (p) { return p.map(function (p) { return nums[i++] = p; }); });
            return nums;
        };
        PolylineEncoder.prototype.unflatten = function (nums) {
            var points = new Array(nums.length / this.stride);
            for (var i = 0; i < nums.length / this.stride; i++) {
                points[i] = nums.slice(i * this.stride, (i + 1) * this.stride);
            }
            return points;
        };
        PolylineEncoder.prototype.round = function (nums) {
            var factor = Math.pow(10, this.precision);
            return nums.map(function (n) { return Math.round(n * factor) / factor; });
        };
        PolylineEncoder.prototype.decode = function (str) {
            var nums = Polyline.decodeDeltas(str, this.stride, Math.pow(10, this.precision));
            return this.unflatten(this.round(nums));
        };
        PolylineEncoder.prototype.encode = function (points) {
            return Polyline.encodeDeltas(this.flatten(points), this.stride, Math.pow(10, this.precision));
        };
        return PolylineEncoder;
    }());
    return PolylineEncoder;
});
define("node_modules/ol3-fun/tests/spec/polyline", ["require", "exports", "node_modules/ol3-fun/tests/base", "node_modules/ol3-fun/ol3-fun/google-polyline", "node_modules/ol3-fun/ol3-fun/ol3-polyline", "node_modules/ol3-fun/ol3-fun/common"], function (require, exports, base_10, GooglePolylineEncoder, PolylineEncoder, common_7) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    describe("GooglePolylineEncoder", function () {
        it("GooglePolylineEncoder", function () {
            base_10.should(!!GooglePolylineEncoder, "GooglePolylineEncoder");
        });
        var points = common_7.pair(common_7.range(10), common_7.range(10));
        var poly = new GooglePolylineEncoder();
        var encoded = poly.encode(points);
        var decoded = poly.decode(encoded);
        base_10.shouldEqual(encoded.length, 533, "encoding is 533 characters");
        base_10.shouldEqual(base_10.stringify(decoded), base_10.stringify(points), "encode->decode");
    });
    describe("PolylineEncoder", function () {
        it("PolylineEncoder", function () {
            base_10.should(!!PolylineEncoder, "PolylineEncoder");
        });
        var points = common_7.pair(common_7.range(10), common_7.range(10));
        var poly = new PolylineEncoder();
        var encoded = poly.encode(points);
        var decoded = poly.decode(encoded);
        base_10.shouldEqual(encoded.length, 533, "encoding is 533 characters");
        base_10.shouldEqual(base_10.stringify(decoded), base_10.stringify(points), "encode->decode");
        poly = new PolylineEncoder(6);
        encoded = poly.encode(points);
        decoded = poly.decode(encoded);
        base_10.shouldEqual(encoded.length, 632, "encoding is 632 characters");
        base_10.shouldEqual(base_10.stringify(decoded), base_10.stringify(points), "encode->decode");
    });
});
define("node_modules/ol3-fun/ol3-fun/snapshot", ["require", "exports", "openlayers"], function (require, exports, ol) {
    "use strict";
    function getStyle(feature) {
        var style = feature.getStyle();
        if (!style) {
            var styleFn = feature.getStyleFunction();
            if (styleFn) {
                style = styleFn(0);
            }
        }
        if (!style) {
            style = new ol.style.Style({
                text: new ol.style.Text({
                    text: "?"
                })
            });
        }
        if (!Array.isArray(style))
            style = [style];
        return style;
    }
    var Snapshot = (function () {
        function Snapshot() {
        }
        Snapshot.render = function (canvas, feature) {
            feature = feature.clone();
            var geom = feature.getGeometry();
            var extent = geom.getExtent();
            var _a = ol.extent.getCenter(extent), cx = _a[0], cy = _a[1];
            var _b = [ol.extent.getWidth(extent), ol.extent.getHeight(extent)], w = _b[0], h = _b[1];
            var isPoint = w === 0 || h === 0;
            var ff = 1 / (window.devicePixelRatio || 1);
            var scale = isPoint ? 1 : Math.min((ff * canvas.width) / w, (ff * canvas.height) / h);
            geom.translate(-cx, -cy);
            geom.scale(scale, -scale);
            geom.translate(Math.ceil((ff * canvas.width) / 2), Math.ceil((ff * canvas.height) / 2));
            var ctx = canvas.getContext("2d");
            if (!ctx)
                throw "unable to get canvas context";
            var vtx = ol.render.toContext(ctx);
            var styles = getStyle(feature);
            if (!Array.isArray(styles))
                styles = [styles];
            styles.forEach(function (style) { return vtx.drawFeature(feature, style); });
        };
        Snapshot.snapshot = function (feature, size) {
            if (size === void 0) { size = 128; }
            var canvas = document.createElement("canvas");
            canvas.width = canvas.height = size;
            this.render(canvas, feature);
            return canvas.toDataURL();
        };
        return Snapshot;
    }());
    return Snapshot;
});
define("node_modules/ol3-fun/tests/spec/snapshot", ["require", "exports", "node_modules/ol3-fun/tests/base", "node_modules/ol3-fun/ol3-fun/snapshot", "openlayers", "node_modules/ol3-fun/ol3-fun/common"], function (require, exports, base_11, Snapshot, ol, common_8) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var pointData = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAFdUlEQVR4Xu1aXUybVRh+3hiWxiX+ZNSMECvjJxiqyaROyq5M2MWUZGyDLEZg0WzhJ2QELharjmbWGgqOOTRxTMDIGHpBpIwE40Un3ujA0EmUYkhcRpoJRObfJkJG9Ji3+1gWoP2+rudrSvq9l/2e857nPOc5/yUkeVCStx+GAIYDklwBYwgkuQGMSdAYAsYQSHIFjCGQ5AYwVgFjCBhDIMkViPsQEEKkANgFIB2AGcCjAP4AsADgOoBxIlqJV7/ETQAhRCWAlwA8D+DBCA38G8DXAD4jok/1FkJ3AYQQVgDdAAruozHfAqgloh/uo6ymIroKIIQ4DOBjAA9oYrMx6F8AVUTEeaSHLgIIITjvOwBel8jYTURNEvOFUuklQDMAh2yyAJqJ6A2ZeaULIIR4GUCfTJJrch0ion5Z+aUKIIRIA/CzyiwfK/d/AGQQES+bMYdsAc4D4OVO7/iEiF6VUYk0AYQQvMyNyiClMUc+EX2vERsWJlOAqHp/enoaY2NjmJubQ1paGgoKCpCbmxtNe3qI6JVoCmyElSKAsuz9CiBVC6GzZ8+ioaEBt2/fvgvfsmUL2tvbUVNToyUFYxaI6DGt4HA4WQLw3v47LWQ6OjpQW1sbFnru3DlUVVVpScWYZ4hoQitYTwfwjq9HjQjbPTMzE8vLy2GhJpMJS0tLaqlWvzuIqEUrWE8BGgC8p0ZkYGAApaWlajAIIVQxCuArIirSCtZTgDcBuNWInDp1CsePH1eDRSPA70S0TTVhBICsOYAH9YdqRLxeLw4ePKgGi0aAL4noBdWEcRCAW/W5GpHZ2VlkZWXJnAP4qNyhVm+k77IckKVsgVW58Cwfaanr7OzE0aNHVfMogGwiuqoVrNscwImFEDMAntBCpr+/H/X19Zifn78LT09Px5kzZ1BWVqYlBWOuE9HjWsHhcFIcoAjQCUBz162srGB0dBRXrlxBfn4+7HY7UlL4ulBzfERE1ZrRYYAyBXgOwFishKIov4uIxqPAbwiVJoDigosA9sVKSkP5QSI6oAGnCpEtwJMAflKtNTbAfwDyiGg6tjR3SksVQHEBX4XxlZhe8RoRtcpKLl0AJjY+Pt5jMpn4fICtW7ciIyMjIt+ZmZkQzmzmd5KI0U5EvO2WFnoIwHvddT3Ep8Dq6vWT9tDQEEpKSkINunbt2jqxFhYW4Ha7MTg4OB8MBrMBLEprvR5DAMD7gUDgWF5e3l2efO5vaWnB7t27UVRUhMnJSRARrFYr+vr6sH37drALcnJyYLFYQuUWFxdDYjQ3Nwuz2Uw3b96E0+l8GsBkwgvg9/uPDQ8PM+He1NTUhzweT0lhYSFaW1tx48YN8DcOm82GiooKNDY2btgmi8XyZzAYfMTv94fKOJ1OP4BnN5MAfE2Grq6uwyyA3W7/y+v1Pswu4JiamkJxcTF/DzmAY//+/di27c4B79KlS6Hfjxw5glu3bqGurg69vb1Sh63UZErPrBsCq+TZ4nwbdPr06W+6u7t/GxkZ2Xf58uWQ1VcF2Lt3L5qamrw7duw4UF5ezlvmoMvlsigO4MliaDM5YJXrFwBGXC7Xu9zjNputgj/4fL4Lq4BVAViMPXv2VFRWVl5wOBxwOBxXT548maUIsOnmgHsJP+VyuX5kB3g8nom2trZfAoFA8VoHqAjwNgDnZnLA2h477/P5Ku+dA6xW64TP59sZzgEnTpyYcLvdO7Ozs0MridPp5JtgKa9CLKQecwCfBfhMwLY/tGbd5p0Ov/AeU3rxA+Uxhd8SAwB4m8ui2QHUKa9Mbyn/KHkxTM6YDKGHADERindhQ4B4K55o9RkOSLQeiTcfwwHxVjzR6jMckGg9Em8+hgPirXii1Zf0DvgfGiXvUAsr6xQAAAAASUVORK5CYII=";
    var circleData = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAHzUlEQVR4XuWbaWxVRRTHf+OGS1BRUQuCuICRRoMWFTRugEgCVo2IQqEgUAmpiCIgJuoHiAmgKEowBlsXwCLuEv2g0kaNti7RaBTFjaBScYtRq1FRueZ/79z75r32tfe9PmrpPclL+96dOzPnP+fMnG0MBSVvP2AUcIn9HFig7n8GNgBPAS+C+aNA/WIK05F3EFAJ3AAckr3Pb4Hv7ec74C9gJyDcDgeOsH+PbG1aPwLLgXvANLV3/u0EwDsMuA6YBbSw2l8EC8ZLwEYg7nyF5zBgJHABcFxLfP4CrACWgZGE5EV5AuB1A24HptvlcwbXyq4NFoiv8ppU85f6AtcCE62UpLX4HXgAmAdGIpUT5QGA1x94EjgpfaQvgaVAtRXtnOYRs7FwnwbcBByV+c4HwGVgPovZmd8sRwC8CcAq4ID0QaYCa4B/chm7HW33ttKghW8mDVPAPBG385gAeHsCd9uNzvYtZm8GlsQdaxe00/TnA7cBmmJEK4HZYP5ta9AYAHh7AOuBsanOGoFxQH1b/XfQ8zPtCalTJKJHgHIwOmayUhsA+MyvBspSPWg3vwL4qYOYiztMT6AGGJETCK0A0BLzDwHSdy/urDq4ndjRvjAlNghZAMjG/FUdzFC+wz0YG4RsAGhncXY3nXrS+VbVKd/Z7oL3pLmPBadiiuaDke2SRi0A4Mns+gjYJ2hZB1zYgUdcofDYy1qh54cd7gCKwXzujpABgC/6bwCnBY22AqcAeVuaheImz34OBt4FjgnffwsYAibaxDIBuBFYHLSWuA8B3s5z8M7y2ul2TSNW54JZFs7OAcA7EXgvJfoya4VHV6A7rKPq85KmCi4A8rcvCtiVFzfQtu0KAGg72wQcHzKzAczF+mIB8I4FtDnY7+cBr3QFzh0e5F7Xht+1B/QFsy0E4C7r19tGadZUFwJCJ1p0KiiOMNeAtz+wPRXQkGRIG7oiKVL3dMjYr0CRALjGRlaAbYFkdFpTt72LolNecYsoljBTAHwYGAiiOYC0oSvTPBu48Xl8XwA4no1icZKMrkwKXSqc6JPnAPAacHZX5tzh7XVAMQT/2AslQAagYm1JIBl5UoU0AGQDPZcE7gGddM9kAiDdiBu3391xOhRQfiWSAAU4FWlNEgV7v90DXrApvSQBIJ5HhgAo4uMEfROBg/Ksl4YAPJwZQ0sABErkTAwBUB5BFnGS6D5gRgiA4p8LksR9kFRmTgiAxKE8YQAocTQhBGCd/yVZ9Kif4bLH4Js2AJokCBTsHRwC8IMtTUkSAMpt9nCdIdXp/JkQBFIuseMNyhWWS5wEUlxQ8cE0b/B6W3yVBAAU+QpyI44EvAqcmwTuraSfFQGgMpI9gkCoqt46W+FDoddENYjfhCmQnZIAJ1g+w9ZAFXrQztTfTODecEJ1AkBcyzAGkuAWq8RneAhAhQDoAcgQsGVWJwCftmvJNm3axMCByi1CU1MTlZWVNDY2smLFChYvXsyaNTK9s1NVVRX9+vVjxIhCZ6gGAJ+EA0v1e4apscAw9kl+clplRU5giPnt27dHkxczo0aNory8nLq64Ohpi3YdAIoD+jlR0Vowk9zkqJbdSkGJLSxoa6rpzydNmsSCBQuYNWtWM2aHDRsWScDkyZMZNGgQ3bt3Z/369ehZ79692bFjB0uWLKFXr16RBGzcuJHhwwORra2tbYdUKAyucLhPWv0BYLa46fEqW4cKNERx81wgWLhwIaNHj6akRACmUyYAeioRF4NFRUUUFxejlR86dCgNDQ0+APX19ZSVlVFRUeEDKunSs+nTVaKcK70DnBq+tAqM9j63VNZTwmxLKjqqUjNFiuJTNgkQYzU1NWkSsHXrVp8RARD+H44UqoB+nzZNtcEpyk8K1IfW16e/gT5gVNWdWSvsqfzcCQ31tmdmfBBa2gPGjRvHypUrKS0t9TdBqYALQCgNkiCt+ObNm+nWrVszCYg/C7elkr1KiEa0HIzMXp8ya4RkJWgv6B48VoGRdCe3KvS2TgEXAKnG6tWrY+0BmlF1dXUOKqDqcrm9UWG7Ep/9wejWRksA6DdvdHqKaHcOlqh0dry7+mPAPO/+kK1QcpEtBbdtpRUKnO5ONDvTuVsE5tZMDrIBoN9118WxRK4G7t9NEKjINOll/o106wNbUYHwkX8RSmeHc2HnTmBuJ64gUQWIqmHl7kakkrcSMFFRQAwViEDQ0ajbF2ekXlIG+fJOGD3aF3gcGOPyp2DnWFWDZRPdOBcmVGSn3JnTs0qJh3aiahIJqy5vBP6HJdn048GoMDIrxQDAPxnUTlUFkn9LXwPSNXmQ/yepkFt7Ux93EkvBxCpzjQlApBLiWK6zlM3Ss/baoADpSDraXs0rdQeVjT8VjG65xKIcAfClQVdjdXPMgVzRZJ25qsn9ONbA+TdSSbNKebQPSe8zRdLkJJJ5AOCDoOLKW6xKqDDfIVmP8iF0ebJQ4TXdB5JBM9l1aMIxpeOKcC4Ek3NcP08AIpVQ9ETScE7zFZXPITBkQOlOozbOVvcjpwuZsFppmbC6mXsykIFz0FqRXIm8jrq8qJ0AREAo0K57rVcCko4WSGU4cjMEhi5/pzkoQD8r0mJauKbdA3T701VZXeNbA+blvLh2XioQABEQcqIkq9osB7d3chnvy6vRdr8OzG+F6vs/cM4xojBcMyUAAAAASUVORK5CYII=";
    function show(data) {
        document.body.appendChild(common_8.html("<img src=\"" + data + "\" />"));
    }
    function circle(radius, points) {
        if (radius === void 0) { radius = 1; }
        if (points === void 0) { points = 36; }
        if (points < 3)
            throw "a circle must contain at least three points";
        if (radius <= 0)
            throw "a circle must have a positive radius";
        var a = 0;
        var dr = (2 * Math.PI) / (points - 1);
        var result = new Array(points);
        for (var i = 0; i < points - 1; i++) {
            result[i] = [radius * Math.sin(a), radius * Math.cos(a)];
            a += dr;
        }
        result[result.length - 1] = result[0];
        return result;
    }
    base_11.describe("Snapshot", function () {
        base_11.it("Snapshot", function () {
            base_11.should(!!Snapshot, "Snapshot");
            base_11.should(!!Snapshot.render, "Snapshot.render");
            base_11.should(!!Snapshot.snapshot, "Snapshot.snapshot");
        });
        base_11.it("Converts a point to image data", function () {
            var feature = new ol.Feature(new ol.geom.Point([0, 0]));
            feature.setStyle(new ol.style.Style({
                image: new ol.style.Circle({
                    radius: 10,
                    fill: new ol.style.Fill({ color: "black" }),
                    stroke: new ol.style.Stroke({
                        color: "white",
                        width: 10
                    })
                }),
                text: new ol.style.Text({
                    text: "Point",
                    fill: new ol.style.Fill({
                        color: "white"
                    }),
                    stroke: new ol.style.Stroke({
                        color: "black",
                        width: 2
                    }),
                    offsetY: 16
                })
            }));
            var data = Snapshot.snapshot(feature, 64);
            show(data);
            if (1 === window.devicePixelRatio) {
                if (data !== pointData)
                    show(pointData);
                base_11.shouldEqual(data, pointData, "point data as expected");
            }
        });
        base_11.it("Converts a triangle to image data", function () {
            var points = circle(50, 4);
            var feature = new ol.Feature(new ol.geom.Polygon([points]));
            feature.setStyle(createStyle("Triangle"));
            var data = Snapshot.snapshot(feature, 64);
            show(data);
        });
        base_11.it("Converts a diamond to image data", function () {
            var points = circle(50, 5);
            var feature = new ol.Feature(new ol.geom.Polygon([points]));
            feature.setStyle(createStyle("Diamond"));
            var data = Snapshot.snapshot(feature, 64);
            show(data);
        });
        base_11.it("Converts a polygon to image data", function () {
            var geom = new ol.geom.Polygon([circle(3 + 100 * Math.random())]);
            var feature = new ol.Feature(geom);
            base_11.shouldEqual(feature.getGeometry(), geom, "geom still assigned");
            feature.setStyle(createStyle("Circle"));
            var originalCoordinates = base_11.stringify(geom.getCoordinates());
            var data = Snapshot.snapshot(feature, 64);
            console.log(data);
            base_11.should(!!data, "snapshot returns data");
            show(data);
            var finalCoordinates = base_11.stringify(geom.getCoordinates());
            base_11.shouldEqual(originalCoordinates, finalCoordinates, "coordinates unchanged");
            base_11.shouldEqual(feature.getGeometry(), geom, "geom still assigned");
            if (1 === window.devicePixelRatio) {
                if (data !== pointData)
                    show(circleData);
                base_11.shouldEqual(data, circleData, "circle data as expected");
            }
        });
    });
    function createStyle(text) {
        if (text === void 0) { text = ""; }
        return new ol.style.Style({
            fill: new ol.style.Fill({
                color: "black"
            }),
            stroke: new ol.style.Stroke({
                color: "blue",
                width: 3
            }),
            text: new ol.style.Text({
                text: text,
                fill: new ol.style.Fill({
                    color: "white"
                }),
                stroke: new ol.style.Stroke({
                    color: "black",
                    width: 2
                }),
                offsetY: 16
            })
        });
    }
});
define("node_modules/ol3-fun/tests/spec/zoom-to-feature", ["require", "exports", "openlayers", "node_modules/ol3-fun/tests/base", "node_modules/ol3-fun/ol3-fun/navigation"], function (require, exports, ol, base_12, navigation_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    describe("zoomToFeature", function () {
        it("zoomToFeature", function (done) {
            base_12.should(!!navigation_2.zoomToFeature, "zoomToFeature");
            var map = new ol.Map({
                view: new ol.View({
                    zoom: 0,
                    center: [0, 0]
                })
            });
            var feature = new ol.Feature();
            var geom = new ol.geom.Point([100, 100]);
            feature.setGeometry(geom);
            map.once("postrender", function () {
                var res = map.getView().getResolution();
                var zoom = map.getView().getZoom();
                navigation_2.zoomToFeature(map, feature, {
                    duration: 200,
                    minResolution: res / 4,
                }).then(function () {
                    var _a = map.getView().getCenter(), cx = _a[0], cy = _a[1];
                    base_12.should(map.getView().getZoom() === zoom + 2, "zoom in two because minRes is 1/4 of initial res");
                    base_12.should(cx === 100, "center-x");
                    base_12.should(cy === 100, "center-y");
                    done();
                });
            });
        });
    });
});
define("node_modules/ol3-fun/tests/index", ["require", "exports", "node_modules/ol3-fun/tests/spec/packages", "node_modules/ol3-fun/tests/spec/api", "node_modules/ol3-fun/tests/spec/common", "node_modules/ol3-fun/tests/spec/slowloop", "node_modules/ol3-fun/tests/spec/deep-extend", "node_modules/ol3-fun/tests/spec/extensions", "node_modules/ol3-fun/tests/spec/is-primitive", "node_modules/ol3-fun/tests/spec/is-cycle", "node_modules/ol3-fun/tests/spec/openlayers-test", "node_modules/ol3-fun/tests/spec/parse-dms", "node_modules/ol3-fun/tests/spec/polyline", "node_modules/ol3-fun/tests/spec/snapshot", "node_modules/ol3-fun/tests/spec/zoom-to-feature"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("tests/spec/packages", ["require", "exports", "node_modules/ol3-fun/tests/index"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("ol3-symbolizer/common/assign", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function assign(obj, prop, value) {
        if (value === null)
            return;
        if (value === undefined)
            return;
        if (typeof value === "object") {
            if (Object.keys(value).length === 0)
                return;
        }
        if (prop === "image") {
            if (value.hasOwnProperty("radius")) {
                prop = "circle";
            }
            if (value.hasOwnProperty("points")) {
                var points = value["points"];
                if (points < Infinity) {
                    prop = "star";
                }
            }
        }
        obj[prop] = value;
    }
    exports.assign = assign;
});
define("tests/spec/common", ["require", "exports", "ol3-symbolizer/common/assign", "node_modules/ol3-fun/index", "node_modules/ol3-fun/tests/base"], function (require, exports, assign_1, index_8, base_13) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    base_13.describe("assign tests", function () {
        base_13.it("assign empty", function () {
        });
        base_13.it("assign number", function () {
            var target = {};
            assign_1.assign(target, "a", 100);
            base_13.should(target.a === 100, "");
        });
        base_13.it("assign object", function () {
            var target = {};
            assign_1.assign(target, "a", { a: 100 });
            base_13.should(target.a.a === 100, "");
        });
    });
    base_13.describe("defaults tests", function () {
        base_13.it("defaults number", function () {
            base_13.should(index_8.defaults({}, { a: 100 }).a === 100, "");
            base_13.should(index_8.defaults(index_8.defaults({}, { a: 100 }), { a: 200 }).a === 100, "");
            var a = index_8.defaults({}, { a: 1 });
            base_13.should(a === index_8.defaults(a, { a: 2 }), "");
        });
    });
    base_13.describe("mixin tests", function () {
        base_13.it("mixin number", function () {
            base_13.should(index_8.mixin({}, { a: 100 }).a === 100, "");
            base_13.should(index_8.mixin(index_8.mixin({}, { a: 100 }), { a: 200 }).a === 200, "");
            var a = index_8.mixin({}, { a: 1 });
            base_13.should(a === index_8.mixin(a, { a: 2 }), "");
        });
    });
    base_13.describe("test accessing openlayers using amd", function () {
        base_13.it("log ol.style.Style", function () {
            require(["openlayers"], function (ol) {
                var style = ol.style.Style;
                base_13.should(!!style, "");
                console.log(style.toString());
            });
        });
    });
});
define("ol3-symbolizer/styles/stroke/linedash", ["require", "exports"], function (require, exports) {
    "use strict";
    var dasharray = {
        solid: "none",
        shortdash: [4, 1],
        shortdot: [1, 1],
        shortdashdot: [4, 1, 1, 1],
        shortdashdotdot: [4, 1, 1, 1, 1, 1],
        dot: [1, 3],
        dash: [4, 3],
        longdash: [8, 3],
        dashdot: [4, 3, 1, 3],
        longdashdot: [8, 3, 1, 3],
        longdashdotdot: [8, 3, 1, 3, 1, 3]
    };
    return dasharray;
});
define("ol3-symbolizer/format/plugins/as-cross", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Shapeshifter = (function () {
        function Shapeshifter() {
        }
        Shapeshifter.is = function (style) {
            if (!style)
                return false;
            if (!!style.cross)
                return true;
            if (!style.star)
                return false;
            if (!style.star.radius)
                return false;
            if (4 !== style.star.points)
                return false;
            if (0 != style.star.radius2)
                return false;
            if (0 != style.star.angle)
                return false;
            return true;
        };
        Shapeshifter.as = function (style) {
            var star = style.star;
            if (!star)
                throw "star expected";
            var result = {
                cross: {
                    size: (star.radius || 24) * 2,
                    opacity: star.opacity,
                    rotateWithView: star.rotateWithView,
                    rotation: star.rotation,
                    scale: star.scale,
                    snapToPixel: star.snapToPixel,
                    stroke: star.stroke
                }
            };
            return result;
        };
        Shapeshifter.inverse = function (style) {
            var cross = style.cross;
            if (!cross)
                return style;
            return {
                star: {
                    radius: cross.size / 2,
                    radius2: 0,
                    points: 4,
                    angle: 0,
                    opacity: cross.opacity,
                    rotateWithView: cross.rotateWithView,
                    rotation: cross.rotation,
                    scale: cross.scale,
                    snapToPixel: cross.snapToPixel,
                    stroke: cross.stroke
                }
            };
        };
        return Shapeshifter;
    }());
    exports.Shapeshifter = Shapeshifter;
});
define("ol3-symbolizer/format/plugins/as-square", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Shapeshifter = (function () {
        function Shapeshifter() {
        }
        Shapeshifter.is = function (style) {
            if (!style)
                return false;
            if (!!style.square)
                return true;
            if (!style.star)
                return false;
            if (!style.star.radius)
                return false;
            if (4 !== style.star.points)
                return false;
            if (undefined !== style.star.radius2)
                return false;
            if (0.7853981633974483 != style.star.angle)
                return false;
            return true;
        };
        Shapeshifter.as = function (style) {
            var star = style.star;
            if (!star)
                throw "star expected";
            var result = {
                square: {
                    size: (star.radius || 24) * 2,
                    fill: star.fill,
                    opacity: star.opacity,
                    rotateWithView: star.rotateWithView,
                    rotation: star.rotation,
                    scale: star.scale,
                    snapToPixel: star.snapToPixel,
                    stroke: star.stroke
                }
            };
            return result;
        };
        Shapeshifter.inverse = function (style) {
            var square = style.square;
            if (!square)
                return style;
            return {
                star: {
                    radius: square.size / 2,
                    radius2: undefined,
                    points: 4,
                    angle: 0.7853981633974483,
                    fill: square.fill,
                    opacity: square.opacity,
                    rotateWithView: square.rotateWithView,
                    rotation: square.rotation,
                    scale: square.scale,
                    snapToPixel: square.snapToPixel,
                    stroke: square.stroke
                }
            };
        };
        return Shapeshifter;
    }());
    exports.Shapeshifter = Shapeshifter;
});
define("ol3-symbolizer/format/plugins/as-diamond", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Shapeshifter = (function () {
        function Shapeshifter() {
        }
        Shapeshifter.is = function (style) {
            if (!style)
                return false;
            if (!!style.diamond)
                return true;
            if (!style.star)
                return false;
            if (!style.star.radius)
                return false;
            if (4 !== style.star.points)
                return false;
            if (undefined !== style.star.radius2)
                return false;
            if (0 != style.star.angle)
                return false;
            return true;
        };
        Shapeshifter.as = function (style) {
            var star = style.star;
            if (!star)
                throw "star expected";
            var result = {
                diamond: {
                    size: (star.radius || 24) * 2,
                    fill: star.fill,
                    opacity: star.opacity,
                    rotateWithView: star.rotateWithView,
                    rotation: star.rotation,
                    scale: star.scale,
                    snapToPixel: star.snapToPixel,
                    stroke: star.stroke
                }
            };
            return result;
        };
        Shapeshifter.inverse = function (style) {
            var diamond = style.diamond;
            if (!diamond)
                return style;
            return {
                star: {
                    radius: diamond.size / 2,
                    radius2: undefined,
                    points: 4,
                    angle: 0,
                    fill: diamond.fill,
                    opacity: diamond.opacity,
                    rotateWithView: diamond.rotateWithView,
                    rotation: diamond.rotation,
                    scale: diamond.scale,
                    snapToPixel: diamond.snapToPixel,
                    stroke: diamond.stroke
                }
            };
        };
        return Shapeshifter;
    }());
    exports.Shapeshifter = Shapeshifter;
});
define("ol3-symbolizer/format/plugins/as-triangle", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Shapeshifter = (function () {
        function Shapeshifter() {
        }
        Shapeshifter.is = function (style) {
            if (!style)
                return false;
            if (!!style.triangle)
                return true;
            if (!style.star)
                return false;
            if (!style.star.radius)
                return false;
            if (3 !== style.star.points)
                return false;
            if (undefined != style.star.radius2)
                return false;
            if (0 != style.star.angle)
                return false;
            return true;
        };
        Shapeshifter.as = function (style) {
            var star = style.star;
            if (!star)
                throw "star expected";
            var result = {
                triangle: {
                    size: (star.radius || 10) * 2,
                    fill: star.fill,
                    opacity: star.opacity,
                    rotateWithView: star.rotateWithView,
                    rotation: star.rotation,
                    scale: star.scale,
                    snapToPixel: star.snapToPixel,
                    stroke: star.stroke
                }
            };
            return result;
        };
        Shapeshifter.inverse = function (style) {
            var triangle = style.triangle;
            if (!triangle)
                return style;
            return {
                star: {
                    radius: triangle.size / 2,
                    radius2: undefined,
                    points: 3,
                    angle: 0,
                    fill: triangle.fill,
                    opacity: triangle.opacity,
                    rotateWithView: triangle.rotateWithView,
                    rotation: triangle.rotation,
                    scale: triangle.scale,
                    snapToPixel: triangle.snapToPixel,
                    stroke: triangle.stroke
                }
            };
        };
        return Shapeshifter;
    }());
    exports.Shapeshifter = Shapeshifter;
});
define("ol3-symbolizer/format/plugins/as-x", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Shapeshifter = (function () {
        function Shapeshifter() {
        }
        Shapeshifter.is = function (style) {
            if (!style)
                return false;
            if (!!style.x)
                return true;
            if (!style.star)
                return false;
            if (!style.star.radius)
                return false;
            if (4 !== style.star.points)
                return false;
            if (0 != style.star.radius2)
                return false;
            if (0.7853981633974483 != style.star.angle)
                return false;
            return true;
        };
        Shapeshifter.as = function (style) {
            var star = style.star;
            if (!star)
                throw "star expected";
            var result = {
                x: {
                    size: (star.radius || 24) * 2,
                    opacity: star.opacity,
                    rotateWithView: star.rotateWithView,
                    rotation: star.rotation,
                    scale: star.scale,
                    snapToPixel: star.snapToPixel,
                    stroke: star.stroke
                }
            };
            return result;
        };
        Shapeshifter.inverse = function (style) {
            var x = style.x;
            if (!x)
                return style;
            return {
                star: {
                    radius: x.size / 2,
                    radius2: 0,
                    points: 4,
                    angle: 0.7853981633974483,
                    opacity: x.opacity,
                    rotateWithView: x.rotateWithView,
                    rotation: x.rotation,
                    scale: x.scale,
                    snapToPixel: x.snapToPixel,
                    stroke: x.stroke
                }
            };
        };
        return Shapeshifter;
    }());
    exports.Shapeshifter = Shapeshifter;
});
define("ol3-symbolizer/format/ol3-symbolizer", ["require", "exports", "openlayers", "ol3-symbolizer/common/assign", "node_modules/ol3-fun/index", "ol3-symbolizer/format/plugins/as-cross", "ol3-symbolizer/format/plugins/as-square", "ol3-symbolizer/format/plugins/as-diamond", "ol3-symbolizer/format/plugins/as-triangle", "ol3-symbolizer/format/plugins/as-x"], function (require, exports, ol, assign_2, index_9, as_cross_1, as_square_1, as_diamond_1, as_triangle_1, as_x_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function getContext(canvas) {
        var ctx = canvas.getContext("2d");
        if (!ctx)
            throw "unable to get 2d context";
        return ctx;
    }
    var StyleConverter = (function () {
        function StyleConverter() {
            this.converters = [];
            this.converters.push(as_cross_1.Shapeshifter);
            this.converters.push(as_square_1.Shapeshifter);
            this.converters.push(as_diamond_1.Shapeshifter);
            this.converters.push(as_triangle_1.Shapeshifter);
            this.converters.push(as_x_1.Shapeshifter);
        }
        StyleConverter.prototype.fromJson = function (json) {
            this.converters.some(function (c) { return c.is(json) && c.inverse && !!(json = c.inverse(json)); });
            return this.deserializeStyle(json);
        };
        StyleConverter.prototype.toJson = function (style) {
            var result = this.serializeStyle(style);
            this.converters.some(function (c) { return c.is(result) && c.as && !!(result = c.as(result)); });
            return result;
        };
        StyleConverter.prototype.getGeometry = function (feature) {
            var geom = feature.getGeometry();
            if (geom instanceof ol.geom.Polygon) {
                geom = geom.getInteriorPoint();
            }
            return geom;
        };
        StyleConverter.prototype.serializeStyle = function (style) {
            if (!style)
                throw "style require";
            var s = {};
            if (typeof style === "string")
                throw style;
            if (typeof style === "number")
                throw style;
            if (style.getColor)
                index_9.mixin(s, this.serializeColor(style.getColor()));
            if (style.getImage)
                assign_2.assign(s, "image", this.serializeImage(style.getImage()));
            if (style.getFill)
                assign_2.assign(s, "fill", this.serializeFill(style.getFill()));
            if (style.getOpacity)
                assign_2.assign(s, "opacity", style.getOpacity());
            if (style.getStroke)
                assign_2.assign(s, "stroke", this.serializeStroke(style.getStroke()));
            if (style.getText)
                assign_2.assign(s, "text", this.serializeText(style.getText()));
            if (style.getWidth)
                assign_2.assign(s, "width", style.getWidth());
            if (style.getOffsetX)
                assign_2.assign(s, "offset-x", style.getOffsetX());
            if (style.getOffsetY)
                assign_2.assign(s, "offset-y", style.getOffsetY());
            if (style.getWidth)
                assign_2.assign(s, "width", style.getWidth());
            if (style.getFont)
                assign_2.assign(s, "font", style.getFont());
            if (style.getRadius)
                assign_2.assign(s, "radius", style.getRadius());
            if (style.getRadius2)
                assign_2.assign(s, "radius2", style.getRadius2());
            if (style.getPoints)
                assign_2.assign(s, "points", style.getPoints());
            if (style.getAngle)
                assign_2.assign(s, "angle", style.getAngle());
            if (style.getRotation)
                assign_2.assign(s, "rotation", style.getRotation());
            if (style.getOrigin)
                assign_2.assign(s, "origin", style.getOrigin());
            if (style.getScale)
                assign_2.assign(s, "scale", style.getScale());
            if (style.getSize)
                assign_2.assign(s, "size", style.getSize());
            if (style.getAnchor) {
                assign_2.assign(s, "anchor", style.getAnchor());
                "anchorXUnits,anchorYUnits,anchorOrigin".split(",").forEach(function (k) {
                    assign_2.assign(s, k, style[k + "_"]);
                });
            }
            if (style.path) {
                if (style.path)
                    assign_2.assign(s, "path", style.path);
                if (style.getImageSize)
                    assign_2.assign(s, "imgSize", style.getImageSize());
                if (style.stroke)
                    assign_2.assign(s, "stroke", style.stroke);
                if (style.fill)
                    assign_2.assign(s, "fill", style.fill);
                if (style.scale)
                    assign_2.assign(s, "scale", style.scale);
                if (style.imgSize)
                    assign_2.assign(s, "imgSize", style.imgSize);
            }
            if (style.getSrc)
                assign_2.assign(s, "src", style.getSrc());
            return s;
        };
        StyleConverter.prototype.serializeImage = function (style) {
            if (!style)
                return null;
            if (typeof style === "string")
                throw style;
            if (typeof style === "number")
                throw style;
            return this.serializeStyle(style);
        };
        StyleConverter.prototype.serializeStroke = function (style) {
            if (!style)
                return null;
            if (typeof style === "string")
                throw style;
            if (typeof style === "number")
                throw style;
            return this.serializeStyle(style);
        };
        StyleConverter.prototype.serializeText = function (style) {
            return style;
        };
        StyleConverter.prototype.serializeColor = function (color) {
            if (color instanceof Array) {
                return {
                    color: ol.color.asString(color)
                };
            }
            else if (color instanceof CanvasGradient) {
                return {
                    gradient: color
                };
            }
            else if (color instanceof CanvasPattern) {
                return {
                    pattern: color
                };
            }
            else if (typeof color === "string") {
                return {
                    color: color
                };
            }
            throw "unknown color type";
        };
        StyleConverter.prototype.serializeFill = function (fill) {
            if (!fill)
                return null;
            return this.serializeStyle(fill);
        };
        StyleConverter.prototype.deserializeStyle = function (json) {
            var _this = this;
            var image;
            var text;
            var fill;
            var stroke;
            if (json.circle)
                image = this.deserializeCircle(json.circle);
            else if (json.star)
                image = this.deserializeStar(json.star);
            else if (json.icon)
                image = this.deserializeIcon(json.icon);
            else if (json.svg)
                image = this.deserializeSvg(json.svg);
            else if (json.image && (json.image.img || json.image.path))
                image = this.deserializeSvg(json.image);
            else if (json.image && json.image.src)
                image = this.deserializeIcon(json.image);
            else if (json.image)
                throw "unknown image type";
            if (json.text)
                text = this.deserializeText(json.text);
            if (json.fill)
                fill = this.deserializeFill(json.fill);
            if (json.stroke)
                stroke = this.deserializeStroke(json.stroke);
            var s = new ol.style.Style({
                image: image,
                text: text,
                fill: fill,
                stroke: stroke
            });
            image && s.setGeometry(function (feature) { return _this.getGeometry(feature); });
            return s;
        };
        StyleConverter.prototype.deserializeText = function (json) {
            var _a;
            json.rotation = json.rotation || 0;
            json.scale = json.scale || 1;
            var _b = [json["offset-x"] || 0, json["offset-y"] || 0], x = _b[0], y = _b[1];
            {
                var p = new ol.geom.Point([x, y]);
                p.rotate(json.rotation, [0, 0]);
                p.scale(json.scale, json.scale);
                _a = p.getCoordinates(), x = _a[0], y = _a[1];
            }
            return new ol.style.Text({
                fill: json.fill && this.deserializeFill(json.fill),
                stroke: json.stroke && this.deserializeStroke(json.stroke),
                text: json.text,
                font: json.font,
                offsetX: x,
                offsetY: y,
                rotation: json.rotation,
                scale: json.scale
            });
        };
        StyleConverter.prototype.deserializeCircle = function (json) {
            var image = new ol.style.Circle({
                radius: json.radius,
                fill: json.fill && this.deserializeFill(json.fill),
                stroke: json.stroke && this.deserializeStroke(json.stroke)
            });
            image.setOpacity(json.opacity || 1);
            return image;
        };
        StyleConverter.prototype.deserializeStar = function (json) {
            var image = new ol.style.RegularShape({
                radius: json.radius || 10,
                radius2: json.radius2,
                points: json.points || 5,
                angle: json.angle,
                fill: json.fill && this.deserializeFill(json.fill),
                stroke: json.stroke && this.deserializeStroke(json.stroke)
            });
            index_9.doif(json.rotation, function (v) { return image.setRotation(v); });
            index_9.doif(json.opacity, function (v) { return image.setOpacity(v); });
            return image;
        };
        StyleConverter.prototype.deserializeIcon = function (json) {
            if (!json.anchor) {
                json.anchor = [json["anchor-x"] || 0.5, json["anchor-y"] || 0.5];
            }
            var image = new ol.style.Icon({
                anchor: json.anchor || [0.5, 0.5],
                anchorOrigin: json.anchorOrigin || "top-left",
                anchorXUnits: json.anchorXUnits || "fraction",
                anchorYUnits: json.anchorYUnits || "fraction",
                img: undefined,
                imgSize: undefined,
                offset: json.offset,
                offsetOrigin: json.offsetOrigin,
                opacity: json.opacity,
                scale: json.scale,
                snapToPixel: json.snapToPixel,
                rotateWithView: json.rotateWithView,
                rotation: json.rotation,
                size: json.size,
                src: json.src,
                color: json.color
            });
            image.load();
            return image;
        };
        StyleConverter.prototype.deserializeSvg = function (json) {
            var _a;
            json.rotation = json.rotation || 0;
            json.scale = json.scale || 1;
            if (json.img) {
                var symbol = document.getElementById(json.img);
                if (!symbol) {
                    throw "unable to find svg element: " + json.img;
                }
                if (symbol) {
                    var path = symbol.getElementsByTagName("path")[0];
                    if (path) {
                        if (symbol.viewBox) {
                            if (!json.imgSize) {
                                json.imgSize = [symbol.viewBox.baseVal.width, symbol.viewBox.baseVal.height];
                            }
                        }
                        json.path = (json.path || "") + path.getAttribute("d");
                    }
                }
            }
            var canvas = document.createElement("canvas");
            if (json.path) {
                {
                    if (!json.imgSize)
                        throw "imgSize require";
                    _a = json.imgSize.map(function (v) { return v * (json.scale || 1); }), canvas.width = _a[0], canvas.height = _a[1];
                    if (json.stroke && json.stroke.width) {
                        var dx = 2 * json.stroke.width * json.scale;
                        canvas.width += dx;
                        canvas.height += dx;
                    }
                }
                var ctx = getContext(canvas);
                var path2d = new Path2D(json.path);
                ctx.translate(canvas.width / 2, canvas.height / 2);
                ctx.scale(json.scale, json.scale);
                ctx.translate(-json.imgSize[0] / 2, -json.imgSize[1] / 2);
                if (json.fill && json.fill.color) {
                    ctx.fillStyle = json.fill.color;
                    ctx.fill(path2d);
                }
                if (json.stroke && json.stroke.color && json.stroke.width) {
                    ctx.strokeStyle = json.stroke.color;
                    ctx.lineWidth = json.stroke.width;
                    ctx.stroke(path2d);
                }
            }
            var icon = new ol.style.Icon({
                img: canvas,
                imgSize: [canvas.width, canvas.height],
                rotation: json.rotation,
                scale: 1,
                anchor: json.anchor || [canvas.width / 2, canvas.height],
                anchorOrigin: json.anchorOrigin,
                anchorXUnits: json.anchorXUnits || "pixels",
                anchorYUnits: json.anchorYUnits || "pixels",
                offset: json.offset,
                offsetOrigin: json.offsetOrigin,
                opacity: json.opacity,
                snapToPixel: json.snapToPixel,
                rotateWithView: json.rotateWithView,
                size: [canvas.width, canvas.height],
                src: undefined
            });
            return index_9.mixin(icon, {
                path: json.path,
                stroke: json.stroke,
                fill: json.fill,
                scale: json.scale,
                imgSize: json.imgSize
            });
        };
        StyleConverter.prototype.deserializeFill = function (json) {
            var fill = new ol.style.Fill({
                color: json && this.deserializeColor(json)
            });
            return fill;
        };
        StyleConverter.prototype.deserializeStroke = function (json) {
            var stroke = new ol.style.Stroke();
            index_9.doif(json.color, function (v) { return stroke.setColor(v); });
            index_9.doif(json.lineCap, function (v) { return stroke.setLineCap(v); });
            index_9.doif(json.lineDash, function (v) { return stroke.setLineDash(v); });
            index_9.doif(json.lineJoin, function (v) { return stroke.setLineJoin(v); });
            index_9.doif(json.miterLimit, function (v) { return stroke.setMiterLimit(v); });
            index_9.doif(json.width, function (v) { return stroke.setWidth(v); });
            return stroke;
        };
        StyleConverter.prototype.deserializeColor = function (fill) {
            var _a;
            if (fill.color) {
                return fill.color;
            }
            if (fill.gradient) {
                var type = fill.gradient.type;
                var gradient_1;
                if (0 === type.indexOf("linear(")) {
                    gradient_1 = this.deserializeLinearGradient(fill.gradient);
                }
                else if (0 === type.indexOf("radial(")) {
                    gradient_1 = this.deserializeRadialGradient(fill.gradient);
                }
                else
                    throw "unknown gradient type: " + type;
                if (fill.gradient.stops) {
                    index_9.mixin(gradient_1, {
                        stops: fill.gradient.stops
                    });
                    var stops = fill.gradient.stops.split(";");
                    stops = stops.map(function (v) { return v.trim(); });
                    stops.forEach(function (colorstop) {
                        var stop = colorstop.match(/ \d+%/m);
                        if (stop && stop.length) {
                            var color = colorstop.substr(0, colorstop.length - stop[0].length);
                            gradient_1.addColorStop(parseInt(stop[0]) / 100, color);
                        }
                    });
                }
                return gradient_1;
            }
            if (fill.pattern) {
                var repitition = fill.pattern.repitition;
                var canvas = document.createElement("canvas");
                var spacing = (canvas.width = canvas.height = fill.pattern.spacing || 6);
                var context_1 = getContext(canvas);
                context_1.fillStyle = fill.pattern.color;
                switch (fill.pattern.orientation) {
                    case "horizontal":
                        for (var i = 0; i < spacing; i++) {
                            context_1.fillRect(i, 0, 1, 1);
                        }
                        break;
                    case "vertical":
                        for (var i = 0; i < spacing; i++) {
                            context_1.fillRect(0, i, 1, 1);
                        }
                        break;
                    case "cross":
                        for (var i = 0; i < spacing; i++) {
                            context_1.fillRect(i, 0, 1, 1);
                            context_1.fillRect(0, i, 1, 1);
                        }
                        break;
                    case "forward":
                        for (var i = 0; i < spacing; i++) {
                            context_1.fillRect(i, i, 1, 1);
                        }
                        break;
                    case "backward":
                        for (var i = 0; i < spacing; i++) {
                            context_1.fillRect(spacing - 1 - i, i, 1, 1);
                        }
                        break;
                    case "diagonal":
                        for (var i = 0; i < spacing; i++) {
                            context_1.fillRect(i, i, 1, 1);
                            context_1.fillRect(spacing - 1 - i, i, 1, 1);
                        }
                        break;
                }
                return index_9.mixin(context_1.createPattern(canvas, repitition || ""), fill.pattern);
            }
            if (fill.image) {
                var canvas = document.createElement("canvas");
                if (!fill.image.imgSize)
                    throw "imgSize required";
                if (!fill.image.imageData)
                    throw "imageData required";
                var _b = (_a = fill.image.imgSize, canvas.width = _a[0], canvas.height = _a[1], _a), w_1 = _b[0], h_1 = _b[1];
                var context_2 = getContext(canvas);
                var image_1 = document.createElement("img");
                image_1.src = fill.image.imageData;
                image_1.onload = function () { return context_2.drawImage(image_1, 0, 0, w_1, h_1); };
                return "rgba(255,255,255,0.1)";
            }
            throw "invalid color configuration";
        };
        StyleConverter.prototype.deserializeLinearGradient = function (json) {
            var rx = /\w+\((.*)\)/m;
            var _a = JSON.parse(json.type.replace(rx, "[$1]")), x0 = _a[0], y0 = _a[1], x1 = _a[2], y1 = _a[3];
            var canvas = document.createElement("canvas");
            canvas.width = Math.max(x0, x1);
            canvas.height = Math.max(y0, y1);
            var context = getContext(canvas);
            var gradient = context.createLinearGradient(x0, y0, x1, y1);
            index_9.mixin(gradient, {
                type: "linear(" + [x0, y0, x1, y1].join(",") + ")"
            });
            return gradient;
        };
        StyleConverter.prototype.deserializeRadialGradient = function (json) {
            var rx = /radial\((.*)\)/m;
            var _a = JSON.parse(json.type.replace(rx, "[$1]")), x0 = _a[0], y0 = _a[1], r0 = _a[2], x1 = _a[3], y1 = _a[4], r1 = _a[5];
            var canvas = document.createElement("canvas");
            canvas.width = 2 * Math.max(x0, x1);
            canvas.height = 2 * Math.max(y0, y1);
            var context = getContext(canvas);
            var gradient = context.createRadialGradient(x0, y0, r0, x1, y1, r1);
            index_9.mixin(gradient, {
                type: "radial(" + [x0, y0, r0, x1, y1, r1].join(",") + ")"
            });
            return gradient;
        };
        return StyleConverter;
    }());
    exports.StyleConverter = StyleConverter;
});
define("tests/spec/ol3-symbolizer", ["require", "exports", "ol3-symbolizer/styles/stroke/linedash", "node_modules/ol3-fun/tests/base", "ol3-symbolizer/format/ol3-symbolizer"], function (require, exports, Dashes, base_14, ol3_symbolizer_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    base_14.describe("ol3-symbolizer", function () {
        var converter = new ol3_symbolizer_1.StyleConverter();
        base_14.describe("OL Format Tests", function () {
            base_14.it("Ensures interface does not break", function () {
                var circle = {};
                circle.fill;
                circle.opacity;
                circle.radius;
                circle.snapToPixel;
                circle.stroke;
                var color = {};
                color === [1] || color == "";
                var fill = {};
                fill.color;
                fill.gradient;
                fill.image;
                fill.pattern;
                var icon = {};
                icon["anchor-x"];
                icon["anchor-y"];
                icon.anchor;
                icon.anchorOrigin;
                icon.anchorXUnits;
                icon.anchorYUnits;
                icon.color;
                icon.crossOrigin;
                icon.offset;
                icon.offsetOrigin;
                icon.opacity;
                icon.rotateWithView;
                icon.rotation;
                icon.scale;
                icon.size;
                icon.snapToPixel;
                icon.src;
                var image = {};
                image.opacity;
                image.rotateWithView;
                image.rotation;
                image.scale;
                image.snapToPixel;
            });
        });
        base_14.describe("OL StyleConverter API Tests", function () {
            base_14.it("StyleConverter API", function () {
                var converter = new ol3_symbolizer_1.StyleConverter();
                base_14.should(typeof converter.fromJson === "function", "fromJson exists");
                base_14.should(typeof converter.toJson === "function", "toJson exists");
            });
        });
        base_14.describe("OL StyleConverter Json Tests", function () {
            base_14.it("Circle Tests", function () {
                var baseline = {
                    circle: {
                        fill: {
                            color: "rgba(197,37,84,0.90)"
                        },
                        opacity: 1,
                        stroke: {
                            color: "rgba(227,83,105,1)",
                            width: 4.4
                        },
                        radius: 7.3
                    },
                    text: {
                        fill: {
                            color: "rgba(205,86,109,0.9)"
                        },
                        stroke: {
                            color: "rgba(252,175,131,0.5)",
                            width: 2
                        },
                        text: "Test",
                        "offset-x": 0,
                        "offset-y": 20,
                        font: "18px fantasy"
                    }
                };
                var style = converter.fromJson(baseline);
                var circleStyle = style.getImage();
                base_14.should(circleStyle !== null, "getImage returns a style");
                base_14.shouldEqual(circleStyle.getRadius(), baseline.circle.radius, "getImage is a circle and radius");
                var circleJson = converter.toJson(style);
                base_14.should(circleJson.circle !== null, "json contains a circle");
                base_14.shouldEqual(circleJson.circle.radius, baseline.circle.radius, "circle radius");
            });
            base_14.it("Star Tests", function () {
                var baseline = {
                    star: {
                        fill: {
                            color: "rgba(54,47,234,1)"
                        },
                        stroke: {
                            color: "rgba(75,92,105,0.85)",
                            width: 4
                        },
                        radius: 9,
                        radius2: 0,
                        points: 6
                    }
                };
                var style = converter.fromJson(baseline);
                var starStyle = style.getImage();
                base_14.should(starStyle !== null, "getImage returns a style");
                base_14.shouldEqual(starStyle.getRadius(), baseline.star.radius, "starStyle radius");
                base_14.shouldEqual(starStyle.getRadius2(), baseline.star.radius2, "starStyle radius2");
                base_14.shouldEqual(starStyle.getPoints(), baseline.star.points, "starStyle points");
                var starJson = converter.toJson(style);
                base_14.should(starJson.star !== null, "json contains a star");
                base_14.shouldEqual(starJson.star.radius, baseline.star.radius, "starJson radius");
                base_14.shouldEqual(starJson.star.radius2, baseline.star.radius2, "starJson radius2");
                base_14.shouldEqual(starJson.star.points, baseline.star.points, "starJson point count");
            });
            base_14.it("Fill Test", function () {
                var baseline = {
                    fill: {
                        gradient: {
                            type: "linear(200,0,201,0)",
                            stops: "rgba(255,0,0,.1) 0%;rgba(255,0,0,0.8) 100%"
                        }
                    }
                };
                var style = converter.fromJson(baseline);
                var fillStyle = style.getFill();
                base_14.should(fillStyle !== null, "fillStyle exists");
                var gradient = fillStyle.getColor();
                base_14.shouldEqual(gradient.stops, baseline.fill.gradient.stops, "fillStyle color");
                base_14.shouldEqual(gradient.type, baseline.fill.gradient.type, "fillStyle color");
            });
            base_14.it("Stroke Test", function () {
                var baseline = {
                    stroke: {
                        color: "orange",
                        width: 2,
                        lineDash: Dashes.longdashdotdot
                    }
                };
                var style = converter.fromJson(baseline);
                var strokeStyle = style.getStroke();
                base_14.should(strokeStyle !== null, "strokeStyle exists");
                base_14.shouldEqual(strokeStyle.getColor(), baseline.stroke.color, "strokeStyle color");
                base_14.shouldEqual(strokeStyle.getWidth(), baseline.stroke.width, "strokeStyle width");
                base_14.shouldEqual(strokeStyle.getLineDash().join(), baseline.stroke.lineDash.join(), "strokeStyle lineDash");
            });
            base_14.it("Text Test", function () {
                var baseline = {
                    text: {
                        fill: {
                            color: "rgba(75,92,85,0.85)"
                        },
                        stroke: {
                            color: "rgba(255,255,255,1)",
                            width: 5
                        },
                        "offset-x": 5,
                        "offset-y": 10,
                        offsetX: 15,
                        offsetY: 20,
                        text: "fantasy light",
                        font: "18px serif"
                    }
                };
                var style = converter.fromJson(baseline);
                var textStyle = style.getText();
                base_14.should(textStyle !== null, "textStyle exists");
                base_14.shouldEqual(textStyle.getFill().getColor(), baseline.text.fill.color, "textStyle text color");
                base_14.shouldEqual(textStyle.getText(), baseline.text.text, "textStyle text");
                base_14.shouldEqual(textStyle.getOffsetX(), baseline.text["offset-x"], "textStyle color");
                base_14.shouldEqual(textStyle.getOffsetY(), baseline.text["offset-y"], "textStyle color");
                base_14.shouldEqual(textStyle.getFont(), baseline.text.font, "textStyle font");
            });
        });
        base_14.describe("OL Basic shapes", function () {
            base_14.it("cross, square, diamond, star, triangle, x", function () {
                var cross = {
                    star: {
                        opacity: 0.5,
                        fill: {
                            color: "red"
                        },
                        stroke: {
                            color: "black",
                            width: 2
                        },
                        points: 4,
                        radius: 10,
                        radius2: 0,
                        angle: 0
                    }
                };
                var square = {
                    star: {
                        fill: {
                            color: "red"
                        },
                        stroke: {
                            color: "black",
                            width: 2
                        },
                        points: 4,
                        radius: 10,
                        angle: 0.7853981633974483
                    }
                };
                var diamond = {
                    star: {
                        fill: {
                            color: "red"
                        },
                        stroke: {
                            color: "black",
                            width: 2
                        },
                        points: 4,
                        radius: 10,
                        angle: 0
                    }
                };
                var star = {
                    star: {
                        fill: {
                            color: "red"
                        },
                        stroke: {
                            color: "black",
                            width: 2
                        },
                        points: 5,
                        radius: 10,
                        radius2: 4,
                        angle: 0
                    }
                };
                var triangle = {
                    star: {
                        fill: {
                            color: "red"
                        },
                        stroke: {
                            color: "black",
                            width: 2
                        },
                        points: 3,
                        radius: 10,
                        angle: 0
                    }
                };
                var x = {
                    star: {
                        fill: {
                            color: "red"
                        },
                        stroke: {
                            color: "black",
                            width: 2
                        },
                        points: 4,
                        radius: 10,
                        radius2: 0,
                        angle: 0.7853981633974483
                    }
                };
                var crossJson = converter.toJson(converter.fromJson(cross));
                var squareJson = converter.toJson(converter.fromJson(square));
                var diamondJson = converter.toJson(converter.fromJson(diamond));
                var starJson = converter.toJson(converter.fromJson(star));
                var triangleJson = converter.toJson(converter.fromJson(triangle));
                var xJson = converter.toJson(converter.fromJson(x));
                base_14.should(!!crossJson.cross, "cross exists");
                base_14.shouldEqual(crossJson.cross.size, cross.star.radius * 2, "cross size");
                base_14.should(!!squareJson.square, "square exists");
                base_14.shouldEqual(squareJson.square.size, square.star.radius * 2, "square size");
                base_14.should(!!diamondJson.diamond, "diamond exists");
                base_14.shouldEqual(diamondJson.diamond.size, diamond.star.radius * 2, "diamond size");
                base_14.should(!!triangleJson.triangle, "triangle exists");
                base_14.shouldEqual(triangleJson.triangle.size, triangle.star.radius * 2, "triangle size");
                base_14.should(!!xJson.x, "x exists");
                base_14.shouldEqual(xJson.x.size, x.star.radius * 2, "x size");
                var items = { crossJson: crossJson, squareJson: squareJson, diamondJson: diamondJson, triangleJson: triangleJson, xJson: xJson };
                Object.keys(items).forEach(function (k) {
                    base_14.shouldEqual(base_14.stringify(converter.toJson(converter.fromJson(items[k]))), base_14.stringify(items[k]), k + " json->style->json");
                });
            });
        });
        base_14.describe("OL NEXT", function () {
            base_14.it("NEXT", function () { });
        });
    });
});
define("ol3-symbolizer/format/ags-symbolizer", ["require", "exports", "ol3-symbolizer/format/ol3-symbolizer"], function (require, exports, Symbolizer) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var symbolizer = new Symbolizer.StyleConverter();
    var styleMap = {
        esriSMSCircle: "circle",
        esriSMSDiamond: "diamond",
        esriSMSX: "x",
        esriSMSCross: "cross",
        esriSLSSolid: "solid",
        esriSFSSolid: "solid",
        esriSLSDot: "dot",
        esriSLSDash: "dash",
        esriSLSDashDot: "dashdot",
        esriSLSDashDotDot: "dashdotdot",
        esriSFSBackwardDiagonal: "backward-diagonal",
        esriSFSForwardDiagonal: "forward-diagonal"
    };
    var typeMap = {
        esriSMS: "sms",
        esriSLS: "sls",
        esriSFS: "sfs",
        esriPMS: "pms",
        esriPFS: "pfs",
        esriTS: "txt"
    };
    function range(a, b) {
        var result = new Array(b - a + 1);
        while (a <= b)
            result.push(a++);
        return result;
    }
    function clone(o) {
        return JSON.parse(JSON.stringify(o));
    }
    var StyleConverter = (function () {
        function StyleConverter() {
        }
        StyleConverter.prototype.asWidth = function (v) {
            return (v * 4) / 3;
        };
        StyleConverter.prototype.asColor = function (color) {
            if (Array.isArray(color)) {
                if (color.length === 4)
                    return "rgba(" + color[0] + "," + color[1] + "," + color[2] + "," + color[3] / 255 + ")";
                if (color.length === 3)
                    return "rgb(" + color[0] + "," + color[1] + "," + color[2] + "})";
                return "#" + color.map(function (v) { return ("0" + v.toString(16)).substr(0, 2); }).join("");
            }
            return "rgba(0, 0, 0)";
        };
        StyleConverter.prototype.fromSFSSolid = function (symbol, style) {
            style.fill = {
                color: this.asColor(symbol.color)
            };
            this.fromSLS(symbol.outline, style);
        };
        StyleConverter.prototype.fromSFSForwardDiagonal = function (symbol, style) {
            style.fill = {
                pattern: {
                    color: this.asColor(symbol.color),
                    orientation: "forward",
                    spacing: 3,
                    repitition: "repeat"
                }
            };
            this.fromSLS(symbol.outline, style);
        };
        StyleConverter.prototype.fromSFSBackwardDiagonal = function (symbol, style) {
            style.fill = {
                pattern: {
                    color: this.asColor(symbol.color),
                    orientation: "backward",
                    spacing: 3,
                    repitition: "repeat"
                }
            };
            this.fromSLS(symbol.outline, style);
        };
        StyleConverter.prototype.fromSFS = function (symbol, style) {
            switch (symbol.style) {
                case "esriSFSSolid":
                    this.fromSFSSolid(symbol, style);
                    break;
                case "esriSFSForwardDiagonal":
                    this.fromSFSForwardDiagonal(symbol, style);
                    break;
                case "esriSFSBackwardDiagonal":
                    this.fromSFSBackwardDiagonal(symbol, style);
                    break;
                default:
                    throw "invalid-style: " + symbol.style;
            }
        };
        StyleConverter.prototype.fromSMSCircle = function (symbol, style) {
            if (!symbol.size)
                throw "symbol size require";
            if (!symbol.outline)
                throw "outline require";
            style.circle = {
                opacity: 1,
                radius: this.asWidth(symbol.size / 2),
                stroke: {
                    color: this.asColor(symbol.outline.color)
                },
                snapToPixel: true
            };
            this.fromSFSSolid(symbol, style.circle);
            this.fromSLS(symbol.outline, style.circle);
        };
        StyleConverter.prototype.fromSMSCross = function (symbol, style) {
            if (!symbol.size)
                throw "symbol size require";
            if (!symbol.outline)
                throw "outline require";
            style.star = {
                points: 4,
                angle: 0,
                radius: this.asWidth(symbol.size / Math.sqrt(2)),
                radius2: 0
            };
            this.fromSFSSolid(symbol, style.star);
            this.fromSLS(symbol.outline, style.star);
        };
        StyleConverter.prototype.fromSMSDiamond = function (symbol, style) {
            if (!symbol.size)
                throw "symbol size require";
            if (!symbol.outline)
                throw "outline require";
            style.star = {
                points: 4,
                angle: 0,
                radius: this.asWidth(symbol.size / Math.sqrt(2)),
                radius2: this.asWidth(symbol.size / Math.sqrt(2))
            };
            this.fromSFSSolid(symbol, style.star);
            this.fromSLS(symbol.outline, style.star);
        };
        StyleConverter.prototype.fromSMSPath = function (symbol, style) {
            if (!symbol.size)
                throw "symbol size require";
            if (!symbol.outline)
                throw "outline require";
            var size = 2 * this.asWidth(symbol.size);
            style.svg = {
                imgSize: [size, size],
                path: symbol.path,
                rotation: symbol.angle
            };
            this.fromSLSSolid(symbol, style.svg);
            this.fromSLS(symbol.outline, style.svg);
        };
        StyleConverter.prototype.fromSMSSquare = function (symbol, style) {
            if (!symbol.size)
                throw "symbol size require";
            if (!symbol.outline)
                throw "outline require";
            style.star = {
                points: 4,
                angle: Math.PI / 4,
                radius: this.asWidth(symbol.size / Math.sqrt(2)),
                radius2: this.asWidth(symbol.size / Math.sqrt(2))
            };
            this.fromSFSSolid(symbol, style.star);
            this.fromSLS(symbol.outline, style.star);
        };
        StyleConverter.prototype.fromSMSX = function (symbol, style) {
            if (!symbol.size)
                throw "symbol size require";
            if (!symbol.outline)
                throw "outline require";
            style.star = {
                points: 4,
                angle: Math.PI / 4,
                radius: this.asWidth(symbol.size / Math.sqrt(2)),
                radius2: 0
            };
            this.fromSFSSolid(symbol, style.star);
            this.fromSLS(symbol.outline, style.star);
        };
        StyleConverter.prototype.fromSMS = function (symbol, style) {
            switch (symbol.style) {
                case "esriSMSCircle":
                    this.fromSMSCircle(symbol, style);
                    break;
                case "esriSMSCross":
                    this.fromSMSCross(symbol, style);
                    break;
                case "esriSMSDiamond":
                    this.fromSMSDiamond(symbol, style);
                    break;
                case "esriSMSPath":
                    this.fromSMSPath(symbol, style);
                    break;
                case "esriSMSSquare":
                    this.fromSMSSquare(symbol, style);
                    break;
                case "esriSMSX":
                    this.fromSMSX(symbol, style);
                    break;
                default:
                    throw "invalid-style: " + symbol.style;
            }
        };
        StyleConverter.prototype.fromPMS = function (symbol, style) {
            if (!symbol.width)
                throw "symbol width required";
            if (!symbol.height)
                throw "symbol height required";
            style.image = {};
            style.image.src = symbol.url;
            if (symbol.imageData) {
                style.image.src = "data:image/png;base64," + symbol.imageData;
            }
            style.image["anchor-x"] = this.asWidth(symbol.xoffset || 0);
            style.image["anchor-y"] = this.asWidth(symbol.yoffset || 0);
            style.image.imgSize = [this.asWidth(symbol.width), this.asWidth(symbol.height)];
        };
        StyleConverter.prototype.fromSLSSolid = function (symbol, style) {
            if (!symbol.width)
                throw "symbol width required";
            style.stroke = {
                color: this.asColor(symbol.color),
                width: this.asWidth(symbol.width),
                lineDash: [],
                lineJoin: "",
                miterLimit: 4
            };
        };
        StyleConverter.prototype.fromSLS = function (symbol, style) {
            if (!symbol)
                throw "symbol required";
            switch (symbol.style) {
                case "esriSLSSolid":
                    this.fromSLSSolid(symbol, style);
                    break;
                case "esriSLSDot":
                    this.fromSLSSolid(symbol, style);
                    break;
                case "esriSLSDash":
                    this.fromSLSSolid(symbol, style);
                    break;
                case "esriSLSDashDot":
                    this.fromSLSSolid(symbol, style);
                    break;
                case "esriSLSDashDotDot":
                    this.fromSLSSolid(symbol, style);
                    break;
                default:
                    this.fromSLSSolid(symbol, style);
                    console.warn("invalid-style: " + symbol.style);
                    break;
            }
        };
        StyleConverter.prototype.fromPFS = function (symbol, style) {
            if (!symbol.width)
                throw "symbol width required";
            if (!symbol.height)
                throw "symbol height required";
            style.fill = {
                image: {
                    src: symbol.url,
                    imageData: symbol.imageData && "data:image/png;base64," + symbol.imageData,
                    "anchor-x": this.asWidth(symbol.xoffset || 0),
                    "anchor-y": this.asWidth(symbol.yoffset || 0),
                    imgSize: [this.asWidth(symbol.width), this.asWidth(symbol.height)]
                }
            };
            this.fromSLS(symbol.outline, style);
        };
        StyleConverter.prototype.fromTS = function (symbol, style) {
            throw "not-implemented";
        };
        StyleConverter.prototype.fromJson = function (symbol) {
            var style = {};
            this.fromSymbol(symbol, style);
            return symbolizer.fromJson(style);
        };
        StyleConverter.prototype.fromSymbol = function (symbol, style) {
            switch (symbol.type) {
                case "esriSFS":
                    this.fromSFS(symbol, style);
                    break;
                case "esriSLS":
                    this.fromSLS(symbol, style);
                    break;
                case "esriPMS":
                    this.fromPMS(symbol, style);
                    break;
                case "esriPFS":
                    this.fromPFS(symbol, style);
                    break;
                case "esriSMS":
                    this.fromSMS(symbol, style);
                    break;
                case "esriTS":
                    this.fromTS(symbol, style);
                    break;
                default:
                    throw "invalid-symbol-type: " + symbol.type;
            }
        };
        StyleConverter.prototype.fromRenderer = function (renderer, args) {
            var _this = this;
            switch (renderer.type) {
                case "simple": {
                    if (!renderer.symbol)
                        throw "simple renderer requires a symbol";
                    return this.fromJson(renderer.symbol);
                }
                case "uniqueValue": {
                    var styles_1 = {};
                    var defaultStyle_1 = renderer.defaultSymbol && this.fromJson(renderer.defaultSymbol);
                    if (renderer.uniqueValueInfos) {
                        renderer.uniqueValueInfos.forEach(function (info) {
                            if (info.value) {
                                styles_1[info.value] = _this.fromJson(info.symbol);
                            }
                        });
                    }
                    return function (feature) {
                        return (renderer.field1 && styles_1[feature.get(renderer.field1)]) || defaultStyle_1;
                    };
                }
                case "classBreaks": {
                    var styles_2 = {};
                    var classBreakRenderer_1 = renderer;
                    if (classBreakRenderer_1.classBreakInfos) {
                        console.log("processing classBreakInfos");
                        if (classBreakRenderer_1.visualVariables) {
                            classBreakRenderer_1.visualVariables.forEach(function (vars) {
                                switch (vars.type) {
                                    case "sizeInfo": {
                                        var steps_1 = range(classBreakRenderer_1.authoringInfo.visualVariables[0].minSliderValue, classBreakRenderer_1.authoringInfo.visualVariables[0].maxSliderValue);
                                        var dx_1 = (vars.maxSize - vars.minSize) / steps_1.length;
                                        var dataValue_1 = (vars.maxDataValue - vars.minDataValue) / steps_1.length;
                                        if (classBreakRenderer_1.classBreakInfos) {
                                            classBreakRenderer_1.classBreakInfos.forEach(function (classBreakInfo) {
                                                var icons = steps_1.map(function (step) {
                                                    var json = (JSON.parse(JSON.stringify(classBreakInfo.symbol)));
                                                    json.size = vars.minSize + dx_1 * (dataValue_1 - vars.minDataValue);
                                                    var style = _this.fromJson(json);
                                                    styles_2[dataValue_1] = style;
                                                });
                                            });
                                        }
                                        debugger;
                                        break;
                                    }
                                    default:
                                        debugger;
                                        break;
                                }
                            });
                        }
                    }
                    return function () {
                        for (var key in styles_2) {
                            if (styles_2[key])
                                return styles_2[key];
                        }
                        return null;
                    };
                }
                default:
                    throw "unsupported renderer type: " + renderer.type;
            }
        };
        return StyleConverter;
    }());
    exports.StyleConverter = StyleConverter;
});
define("tests/spec/ags-symbolizer", ["require", "exports", "node_modules/ol3-fun/tests/base", "ol3-symbolizer/format/ags-symbolizer", "ol3-symbolizer/format/ol3-symbolizer"], function (require, exports, base_15, ags_symbolizer_1, ol3_symbolizer_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var fromJson = (function () {
        var fromJsonConverter = new ags_symbolizer_1.StyleConverter();
        return function (style) { return fromJsonConverter.fromJson(style); };
    })();
    var toJson = (function () {
        var toJsonConverter = new ol3_symbolizer_2.StyleConverter();
        return function (style) { return toJsonConverter.toJson(style); };
    })();
    function rgba(_a) {
        var r = _a[0], g = _a[1], b = _a[2], a = _a[3];
        return "rgba(" + r + "," + g + "," + b + "," + a / 255 + ")";
    }
    base_15.describe("esriSMS Tests", function () {
        base_15.it("esriSMSCircle", function () {
            var baseline = {
                color: [255, 255, 255, 64],
                size: 12,
                angle: 0,
                xoffset: 0,
                yoffset: 0,
                type: "esriSMS",
                style: "esriSMSCircle",
                outline: {
                    color: [0, 0, 0, 255],
                    width: 1,
                    type: "esriSLS",
                    style: "esriSLSSolid"
                }
            };
            var style = fromJson(baseline);
            var circleJson = toJson(style);
            var expectedRadius = (baseline.size * 4) / 3 / 2;
            base_15.shouldEqual(circleJson.circle.radius, expectedRadius, "circleJson radius is 33% larger than specified in the ags style (see StyleConverter.asWidth)");
            base_15.shouldEqual(circleJson.circle.fill.color, rgba(baseline.color), "circleJson fill color");
            base_15.shouldEqual(circleJson.circle.fill.pattern, null, "circleJson fill pattern is solid");
            base_15.shouldEqual(circleJson.circle.stroke.color, rgba(baseline.outline.color), "circleJson stroke color");
            base_15.shouldEqual(circleJson.circle.stroke.width, (baseline.outline.width * 4) / 3, "circleJson stroke width");
            base_15.shouldEqual(circleJson.circle.stroke.lineCap, undefined, "circleJson stroke lineCap");
            base_15.shouldEqual(circleJson.circle.stroke.lineDash, undefined, "circleJson stroke lineDash");
            base_15.shouldEqual(circleJson.circle.stroke.lineJoin, undefined, "circleJson stroke lineJoin");
        });
        base_15.it("esriSMSCross", function () {
            var baseline = {
                color: [255, 255, 255, 64],
                size: 12,
                angle: 0,
                xoffset: 0,
                yoffset: 0,
                type: "esriSMS",
                style: "esriSMSCross",
                outline: {
                    color: [0, 0, 0, 255],
                    width: 1,
                    type: "esriSLS",
                    style: "esriSLSSolid"
                }
            };
            var json = toJson(fromJson(baseline));
            base_15.should(!!json.cross, "cross");
            base_15.shouldEqual(json.cross.opacity, 1, "opacity");
            base_15.shouldEqual(json.cross.size, 22.62741699796952, "size");
        });
    });
    base_15.describe("esriSLS Tests", function () {
        base_15.it("esriSLSShortDash esriLCSSquare esriLJSRound", function () {
            var baseline = {
                type: "esriSLS",
                style: "esriSLSShortDash",
                color: [152, 230, 0, 255],
                width: 1,
                cap: "esriLCSSquare",
                join: "esriLJSRound",
                miterLimit: 9.75
            };
            var style = fromJson(baseline);
            var json = toJson(style);
            base_15.shouldEqual(json.stroke.color, rgba(baseline.color), "stroke color");
        });
        base_15.it("esriSLSDash esriLCSButt esriLJSBevel", function () {
            var baseline = {
                type: "esriSLS",
                style: "esriSLSDash",
                color: [152, 230, 0, 255],
                width: 1,
                cap: "esriLCSButt",
                join: "esriLJSBevel",
                miterLimit: 9.75
            };
            var style = fromJson(baseline);
            var json = toJson(style);
            base_15.shouldEqual(json.stroke.color, rgba(baseline.color), "stroke color");
        });
        base_15.it("esriSLSSolid esriLCSRound esriLJSMiter", function () {
            var baseline = {
                type: "esriSLS",
                style: "esriSLSSolid",
                color: [152, 230, 0, 255],
                width: 1,
                cap: "esriLCSRound",
                join: "esriLJSMiter",
                miterLimit: 9.75
            };
            var style = fromJson(baseline);
            var json = toJson(style);
            base_15.shouldEqual(json.stroke.color, rgba(baseline.color), "stroke color");
        });
    });
});
define("ol3-symbolizer/common/ajax", ["require", "exports", "jquery"], function (require, exports, $) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Ajax = (function () {
        function Ajax(url) {
            this.url = url;
            this.options = {
                use_json: true,
                use_cors: true
            };
        }
        Ajax.prototype.jsonp = function (args, url) {
            if (url === void 0) { url = this.url; }
            var d = $.Deferred();
            args["callback"] = "define";
            var uri = url +
                "?" +
                Object.keys(args)
                    .map(function (k) { return k + "=" + args[k]; })
                    .join("&");
            require([uri], function (data) { return d.resolve(data); });
            return d;
        };
        Ajax.prototype.ajax = function (method, args, url) {
            if (url === void 0) { url = this.url; }
            var isData = method === "POST" || method === "PUT";
            var isJson = this.options.use_json;
            var isCors = this.options.use_cors;
            var d = $.Deferred();
            var client = new XMLHttpRequest();
            if (isCors)
                client.withCredentials = true;
            var uri = url;
            var data = null;
            if (args) {
                if (isData) {
                    data = JSON.stringify(args);
                }
                else {
                    uri += "?";
                    var argcount = 0;
                    for (var key in args) {
                        if (args.hasOwnProperty(key)) {
                            if (argcount++) {
                                uri += "&";
                            }
                            uri += encodeURIComponent(key) + "=" + encodeURIComponent(args[key]);
                        }
                    }
                }
            }
            client.open(method, uri, true);
            if (isData && isJson)
                client.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
            client.send(data);
            client.onload = function () {
                var contentType = client.getResponseHeader("Content-Type");
                if (client.status >= 200 && client.status < 300) {
                    isJson = isJson || (!!contentType && 0 === contentType.indexOf("application/json"));
                    d.resolve(isJson ? JSON.parse(client.response) : client.response);
                }
                else {
                    d.reject(client.statusText);
                }
            };
            client.onerror = function () { return d.reject(client.statusText); };
            return d;
        };
        Ajax.prototype.get = function (args) {
            return this.ajax("GET", args);
        };
        Ajax.prototype.post = function (args) {
            return this.ajax("POST", args);
        };
        Ajax.prototype.put = function (args) {
            return this.ajax("PUT", args);
        };
        Ajax.prototype.delete = function (args) {
            return this.ajax("DELETE", args);
        };
        return Ajax;
    }());
    exports.Ajax = Ajax;
});
define("ol3-symbolizer/ags/ags-catalog", ["require", "exports", "ol3-symbolizer/common/ajax", "node_modules/ol3-fun/index"], function (require, exports, ajax_1, index_10) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Catalog = (function () {
        function Catalog(url) {
            this.ajax = new ajax_1.Ajax(url);
        }
        Catalog.prototype.about = function (data) {
            var req = index_10.defaults({
                f: "pjson"
            }, data);
            return this.ajax.jsonp(req);
        };
        Catalog.prototype.aboutFolder = function (folder) {
            var ajax = new ajax_1.Ajax(this.ajax.url + "/" + folder);
            var req = {
                f: "pjson"
            };
            return ajax.jsonp(req);
        };
        Catalog.prototype.aboutFeatureServer = function (name) {
            var ajax = new ajax_1.Ajax(this.ajax.url + "/" + name + "/FeatureServer");
            var req = {
                f: "pjson"
            };
            return index_10.defaults(ajax.jsonp(req), { url: ajax.url });
        };
        Catalog.prototype.aboutMapServer = function (name) {
            var ajax = new ajax_1.Ajax(this.ajax.url + "/" + name + "/MapServer");
            var req = {
                f: "pjson"
            };
            return index_10.defaults(ajax.jsonp(req), { url: ajax.url });
        };
        Catalog.prototype.aboutLayer = function (layer) {
            var ajax = new ajax_1.Ajax(this.ajax.url + "/" + layer);
            var req = {
                f: "pjson"
            };
            return ajax.jsonp(req);
        };
        return Catalog;
    }());
    exports.Catalog = Catalog;
});
define("ol3-symbolizer/ags/ags-source", ["require", "exports", "jquery", "openlayers", "ol3-symbolizer/ags/ags-catalog", "ol3-symbolizer/format/ags-symbolizer", "node_modules/ol3-fun/index"], function (require, exports, $, ol, AgsCatalog, Symbolizer, index_11) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var esrijsonFormat = new ol.format.EsriJSON();
    function asParam(options) {
        return Object.keys(options)
            .map(function (k) { return k + "=" + options[k]; })
            .join("&");
    }
    var DEFAULT_OPTIONS = {
        tileSize: 512,
        where: "1=1"
    };
    var ArcGisVectorSourceFactory = (function () {
        function ArcGisVectorSourceFactory() {
        }
        ArcGisVectorSourceFactory.create = function (options) {
            var d = $.Deferred();
            options = index_11.defaults(options, DEFAULT_OPTIONS);
            var srs = options.map
                .getView()
                .getProjection()
                .getCode()
                .split(":")
                .pop();
            var all = options.layers.map(function (layerId) {
                var d = $.Deferred();
                var tileGrid = ol.tilegrid.createXYZ({
                    tileSize: options.tileSize
                });
                var strategy = ol.loadingstrategy.tile(tileGrid);
                var loader = function (extent, resolution, projection) {
                    var box = {
                        xmin: extent[0],
                        ymin: extent[1],
                        xmax: extent[2],
                        ymax: extent[3]
                    };
                    var params = {
                        f: "json",
                        returnGeometry: true,
                        spatialRel: "esriSpatialRelIntersects",
                        geometry: encodeURIComponent(JSON.stringify(box)),
                        geometryType: "esriGeometryEnvelope",
                        resultType: "tile",
                        where: options.where ? encodeURIComponent(options.where) : "",
                        inSR: srs,
                        outSR: srs,
                        outFields: "*"
                    };
                    var query = options.services + "/" + options.serviceName + "/" + options.serviceType + "/" + layerId + "/query?" + asParam(params);
                    $.ajax({
                        url: query,
                        dataType: "jsonp",
                        error: function () {
                            debugger;
                        },
                        success: function (response) {
                            if (response.error) {
                                console.warn(response.error.message + "\n" + response.error.details.join("\n"));
                            }
                            else {
                                var features = esrijsonFormat.readFeatures(response, {
                                    featureProjection: projection,
                                    dataProjection: projection
                                });
                                if (!options.uidFieldName && response.fields) {
                                    var oidField = response.fields.filter(function (f) { return f.type === "esriFieldTypeOID"; })[0];
                                    if (oidField) {
                                        options.uidFieldName = oidField.name;
                                    }
                                }
                                if (features.length) {
                                    if (options.uidFieldName) {
                                        var uidFieldName_1 = options.uidFieldName;
                                        var featureIds_1 = source
                                            .getFeatures()
                                            .map(function (f) { return f.get(uidFieldName_1); })
                                            .filter(function (v) { return !!v; })
                                            .sort();
                                        var uniqueFeatures = features.filter(function (f) { return -1 === featureIds_1.indexOf(f.get(uidFieldName_1)); });
                                        source.addFeatures(uniqueFeatures);
                                    }
                                    else {
                                        source.addFeatures(features);
                                    }
                                }
                            }
                        }
                    });
                };
                var source = new ol.source.Vector({
                    strategy: strategy,
                    loader: loader,
                    wrapX: false
                });
                var catalog = new AgsCatalog.Catalog(options.services + "/" + options.serviceName + "/" + options.serviceType);
                var converter = new Symbolizer.StyleConverter();
                catalog.aboutLayer(layerId).then(function (layerInfo) {
                    var layer = new ol.layer.Vector({
                        title: layerInfo.name,
                        source: source
                    });
                    var styleMap = converter.fromRenderer(layerInfo.drawingInfo.renderer, { url: "for icons?" });
                    layer.setStyle(function (feature, resolution) {
                        if (styleMap instanceof ol.style.Style) {
                            return styleMap;
                        }
                        else {
                            return styleMap(feature);
                        }
                    });
                    d.resolve(layer);
                });
                return d;
            });
            $.when.apply($, all).then(function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                return d.resolve(args);
            });
            return d;
        };
        return ArcGisVectorSourceFactory;
    }());
    exports.ArcGisVectorSourceFactory = ArcGisVectorSourceFactory;
});
define("tests/spec/ags-source", ["require", "exports", "openlayers", "node_modules/ol3-fun/tests/base", "ol3-symbolizer/ags/ags-source", "node_modules/ol3-fun/ol3-fun/common"], function (require, exports, ol, base_16, ags_source_1, common_9) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    base_16.describe("ags-source tests", function () {
        base_16.it("ArcGisVectorSourceFactory", function (done) {
            var source = new ol.source.TileDebug({
                projection: "EPSG:3857",
                tileGrid: ol.tilegrid.createXYZ({
                    tileSize: 256
                })
            });
            var map = new ol.Map({
                target: "map",
                layers: [
                    new ol.layer.Tile({
                        source: source
                    })
                ],
                view: new ol.View({
                    center: [-12826838, 4326274],
                    zoom: 5,
                    projection: "EPSG:3857"
                })
            });
            ags_source_1.ArcGisVectorSourceFactory.create({
                services: "http://localhost:3001/mock/ags/rest/services",
                serviceName: "ANNOTATIONS/IPS_ANNOTATIONS_US",
                serviceType: "FeatureServer",
                map: map,
                layers: [3],
                where: "H8REGION IN ('GREEN')"
            }).done(function (layers) {
                layers.forEach(function (l) {
                    var source = l.getSource();
                    var h = source.on("change", common_9.debounce(function () {
                        var features = source.getFeatures();
                        base_16.shouldEqual(3, features.length);
                        var ids = new Set(features.map(function (f) { return f.get("OBJECTID"); }));
                        base_16.shouldEqual(3, ids.size);
                        ol.Observable.unByKey(h);
                        done();
                    }));
                });
                layers.forEach(function (l) { return map.addLayer(l); });
            });
        });
    });
});
define("tests/index", ["require", "exports", "tests/spec/packages", "tests/spec/common", "tests/spec/ol3-symbolizer", "tests/spec/ags-symbolizer", "tests/spec/ags-source"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
//# sourceMappingURL=tests.max.js.map