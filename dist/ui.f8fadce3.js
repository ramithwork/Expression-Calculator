// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"../node_modules/@firebase/util/dist/postinstall.mjs":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getDefaultsFromPostinstall = void 0;
var getDefaultsFromPostinstall = exports.getDefaultsFromPostinstall = function getDefaultsFromPostinstall() {
  return undefined;
};
},{}],"../node_modules/process/browser.js":[function(require,module,exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;
function defaultSetTimout() {
  throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout() {
  throw new Error('clearTimeout has not been defined');
}
(function () {
  try {
    if (typeof setTimeout === 'function') {
      cachedSetTimeout = setTimeout;
    } else {
      cachedSetTimeout = defaultSetTimout;
    }
  } catch (e) {
    cachedSetTimeout = defaultSetTimout;
  }
  try {
    if (typeof clearTimeout === 'function') {
      cachedClearTimeout = clearTimeout;
    } else {
      cachedClearTimeout = defaultClearTimeout;
    }
  } catch (e) {
    cachedClearTimeout = defaultClearTimeout;
  }
})();
function runTimeout(fun) {
  if (cachedSetTimeout === setTimeout) {
    //normal enviroments in sane situations
    return setTimeout(fun, 0);
  }
  // if setTimeout wasn't available but was latter defined
  if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
    cachedSetTimeout = setTimeout;
    return setTimeout(fun, 0);
  }
  try {
    // when when somebody has screwed with setTimeout but no I.E. maddness
    return cachedSetTimeout(fun, 0);
  } catch (e) {
    try {
      // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
      return cachedSetTimeout.call(null, fun, 0);
    } catch (e) {
      // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
      return cachedSetTimeout.call(this, fun, 0);
    }
  }
}
function runClearTimeout(marker) {
  if (cachedClearTimeout === clearTimeout) {
    //normal enviroments in sane situations
    return clearTimeout(marker);
  }
  // if clearTimeout wasn't available but was latter defined
  if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
    cachedClearTimeout = clearTimeout;
    return clearTimeout(marker);
  }
  try {
    // when when somebody has screwed with setTimeout but no I.E. maddness
    return cachedClearTimeout(marker);
  } catch (e) {
    try {
      // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
      return cachedClearTimeout.call(null, marker);
    } catch (e) {
      // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
      // Some versions of I.E. have different rules for clearTimeout vs setTimeout
      return cachedClearTimeout.call(this, marker);
    }
  }
}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;
function cleanUpNextTick() {
  if (!draining || !currentQueue) {
    return;
  }
  draining = false;
  if (currentQueue.length) {
    queue = currentQueue.concat(queue);
  } else {
    queueIndex = -1;
  }
  if (queue.length) {
    drainQueue();
  }
}
function drainQueue() {
  if (draining) {
    return;
  }
  var timeout = runTimeout(cleanUpNextTick);
  draining = true;
  var len = queue.length;
  while (len) {
    currentQueue = queue;
    queue = [];
    while (++queueIndex < len) {
      if (currentQueue) {
        currentQueue[queueIndex].run();
      }
    }
    queueIndex = -1;
    len = queue.length;
  }
  currentQueue = null;
  draining = false;
  runClearTimeout(timeout);
}
process.nextTick = function (fun) {
  var args = new Array(arguments.length - 1);
  if (arguments.length > 1) {
    for (var i = 1; i < arguments.length; i++) {
      args[i - 1] = arguments[i];
    }
  }
  queue.push(new Item(fun, args));
  if (queue.length === 1 && !draining) {
    runTimeout(drainQueue);
  }
};

// v8 likes predictible objects
function Item(fun, array) {
  this.fun = fun;
  this.array = array;
}
Item.prototype.run = function () {
  this.fun.apply(null, this.array);
};
process.title = 'browser';
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};
function noop() {}
process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;
process.listeners = function (name) {
  return [];
};
process.binding = function (name) {
  throw new Error('process.binding is not supported');
};
process.cwd = function () {
  return '/';
};
process.chdir = function (dir) {
  throw new Error('process.chdir is not supported');
};
process.umask = function () {
  return 0;
};
},{}],"../node_modules/@firebase/util/dist/index.esm2017.js":[function(require,module,exports) {
var global = arguments[3];
var process = require("process");
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Sha1 = exports.RANDOM_FACTOR = exports.MAX_VALUE_MILLIS = exports.FirebaseError = exports.ErrorFactory = exports.Deferred = exports.DecodeBase64StringError = exports.CONSTANTS = void 0;
exports.areCookiesEnabled = areCookiesEnabled;
exports.assertionError = exports.assert = void 0;
exports.async = async;
exports.base64urlEncodeWithoutPadding = exports.base64Encode = exports.base64Decode = exports.base64 = void 0;
exports.calculateBackoffMillis = calculateBackoffMillis;
exports.contains = contains;
exports.createMockUserToken = createMockUserToken;
exports.createSubscribe = createSubscribe;
exports.decode = void 0;
exports.deepCopy = deepCopy;
exports.deepEqual = deepEqual;
exports.deepExtend = deepExtend;
exports.errorPrefix = errorPrefix;
exports.extractQuerystring = extractQuerystring;
exports.getExperimentalSetting = exports.getDefaults = exports.getDefaultEmulatorHostnameAndPort = exports.getDefaultEmulatorHost = exports.getDefaultAppConfig = void 0;
exports.getGlobal = getGlobal;
exports.getModularInstance = getModularInstance;
exports.getUA = getUA;
exports.isAdmin = void 0;
exports.isBrowser = isBrowser;
exports.isBrowserExtension = isBrowserExtension;
exports.isCloudWorkstation = isCloudWorkstation;
exports.isCloudflareWorker = isCloudflareWorker;
exports.isElectron = isElectron;
exports.isEmpty = isEmpty;
exports.isIE = isIE;
exports.isIndexedDBAvailable = isIndexedDBAvailable;
exports.isMobileCordova = isMobileCordova;
exports.isNode = isNode;
exports.isNodeSdk = isNodeSdk;
exports.isReactNative = isReactNative;
exports.isSafari = isSafari;
exports.isSafariOrWebkit = isSafariOrWebkit;
exports.isUWP = isUWP;
exports.isValidTimestamp = exports.isValidFormat = void 0;
exports.isWebWorker = isWebWorker;
exports.issuedAtTime = void 0;
exports.jsonEval = jsonEval;
exports.map = map;
exports.ordinal = ordinal;
exports.pingServer = pingServer;
exports.promiseWithTimeout = promiseWithTimeout;
exports.querystring = querystring;
exports.querystringDecode = querystringDecode;
exports.safeGet = safeGet;
exports.stringToByteArray = exports.stringLength = void 0;
exports.stringify = stringify;
exports.updateEmulatorBanner = updateEmulatorBanner;
exports.validateArgCount = void 0;
exports.validateCallback = validateCallback;
exports.validateContextObject = validateContextObject;
exports.validateIndexedDBOpenable = validateIndexedDBOpenable;
exports.validateNamespace = validateNamespace;
var _postinstall = require("./postinstall.mjs");
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return r; }; var t, r = {}, e = Object.prototype, n = e.hasOwnProperty, o = "function" == typeof Symbol ? Symbol : {}, i = o.iterator || "@@iterator", a = o.asyncIterator || "@@asyncIterator", u = o.toStringTag || "@@toStringTag"; function c(t, r, e, n) { return Object.defineProperty(t, r, { value: e, enumerable: !n, configurable: !n, writable: !n }); } try { c({}, ""); } catch (t) { c = function c(t, r, e) { return t[r] = e; }; } function h(r, e, n, o) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype); return c(a, "_invoke", function (r, e, n) { var o = 1; return function (i, a) { if (3 === o) throw Error("Generator is already running"); if (4 === o) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var u = n.delegate; if (u) { var c = d(u, n); if (c) { if (c === f) continue; return c; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (1 === o) throw o = 4, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = 3; var h = s(r, e, n); if ("normal" === h.type) { if (o = n.done ? 4 : 2, h.arg === f) continue; return { value: h.arg, done: n.done }; } "throw" === h.type && (o = 4, n.method = "throw", n.arg = h.arg); } }; }(r, n, new Context(o || [])), !0), a; } function s(t, r, e) { try { return { type: "normal", arg: t.call(r, e) }; } catch (t) { return { type: "throw", arg: t }; } } r.wrap = h; var f = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var l = {}; c(l, i, function () { return this; }); var p = Object.getPrototypeOf, y = p && p(p(x([]))); y && y !== e && n.call(y, i) && (l = y); var v = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(l); function g(t) { ["next", "throw", "return"].forEach(function (r) { c(t, r, function (t) { return this._invoke(r, t); }); }); } function AsyncIterator(t, r) { function e(o, i, a, u) { var c = s(t[o], t, i); if ("throw" !== c.type) { var h = c.arg, f = h.value; return f && "object" == _typeof(f) && n.call(f, "__await") ? r.resolve(f.__await).then(function (t) { e("next", t, a, u); }, function (t) { e("throw", t, a, u); }) : r.resolve(f).then(function (t) { h.value = t, a(h); }, function (t) { return e("throw", t, a, u); }); } u(c.arg); } var o; c(this, "_invoke", function (t, n) { function i() { return new r(function (r, o) { e(t, n, r, o); }); } return o = o ? o.then(i, i) : i(); }, !0); } function d(r, e) { var n = e.method, o = r.i[n]; if (o === t) return e.delegate = null, "throw" === n && r.i.return && (e.method = "return", e.arg = t, d(r, e), "throw" === e.method) || "return" !== n && (e.method = "throw", e.arg = new TypeError("The iterator does not provide a '" + n + "' method")), f; var i = s(o, r.i, e.arg); if ("throw" === i.type) return e.method = "throw", e.arg = i.arg, e.delegate = null, f; var a = i.arg; return a ? a.done ? (e[r.r] = a.value, e.next = r.n, "return" !== e.method && (e.method = "next", e.arg = t), e.delegate = null, f) : a : (e.method = "throw", e.arg = new TypeError("iterator result is not an object"), e.delegate = null, f); } function w(t) { this.tryEntries.push(t); } function m(r) { var e = r[4] || {}; e.type = "normal", e.arg = t, r[4] = e; } function Context(t) { this.tryEntries = [[-1]], t.forEach(w, this), this.reset(!0); } function x(r) { if (null != r) { var e = r[i]; if (e) return e.call(r); if ("function" == typeof r.next) return r; if (!isNaN(r.length)) { var o = -1, a = function e() { for (; ++o < r.length;) if (n.call(r, o)) return e.value = r[o], e.done = !1, e; return e.value = t, e.done = !0, e; }; return a.next = a; } } throw new TypeError(_typeof(r) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, c(v, "constructor", GeneratorFunctionPrototype), c(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = c(GeneratorFunctionPrototype, u, "GeneratorFunction"), r.isGeneratorFunction = function (t) { var r = "function" == typeof t && t.constructor; return !!r && (r === GeneratorFunction || "GeneratorFunction" === (r.displayName || r.name)); }, r.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, c(t, u, "GeneratorFunction")), t.prototype = Object.create(v), t; }, r.awrap = function (t) { return { __await: t }; }, g(AsyncIterator.prototype), c(AsyncIterator.prototype, a, function () { return this; }), r.AsyncIterator = AsyncIterator, r.async = function (t, e, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(h(t, e, n, o), i); return r.isGeneratorFunction(e) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, g(v), c(v, u, "Generator"), c(v, i, function () { return this; }), c(v, "toString", function () { return "[object Generator]"; }), r.keys = function (t) { var r = Object(t), e = []; for (var n in r) e.unshift(n); return function t() { for (; e.length;) if ((n = e.pop()) in r) return t.value = n, t.done = !1, t; return t.done = !0, t; }; }, r.values = x, Context.prototype = { constructor: Context, reset: function reset(r) { if (this.prev = this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(m), !r) for (var e in this) "t" === e.charAt(0) && n.call(this, e) && !isNaN(+e.slice(1)) && (this[e] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0][4]; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(r) { if (this.done) throw r; var e = this; function n(t) { a.type = "throw", a.arg = r, e.next = t; } for (var o = e.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i[4], u = this.prev, c = i[1], h = i[2]; if (-1 === i[0]) return n("end"), !1; if (!c && !h) throw Error("try statement without catch or finally"); if (null != i[0] && i[0] <= u) { if (u < c) return this.method = "next", this.arg = t, n(c), !0; if (u < h) return n(h), !1; } } }, abrupt: function abrupt(t, r) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var n = this.tryEntries[e]; if (n[0] > -1 && n[0] <= this.prev && this.prev < n[2]) { var o = n; break; } } o && ("break" === t || "continue" === t) && o[0] <= r && r <= o[2] && (o = null); var i = o ? o[4] : {}; return i.type = t, i.arg = r, o ? (this.method = "next", this.next = o[2], f) : this.complete(i); }, complete: function complete(t, r) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && r && (this.next = r), f; }, finish: function finish(t) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var e = this.tryEntries[r]; if (e[2] === t) return this.complete(e[4], e[3]), m(e), f; } }, catch: function _catch(t) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var e = this.tryEntries[r]; if (e[0] === t) { var n = e[4]; if ("throw" === n.type) { var o = n.arg; m(e); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(r, e, n) { return this.delegate = { i: x(r), r: e, n: n }, "next" === this.method && (this.arg = t), f; } }, r; }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t.return || t.return(); } finally { if (u) throw o; } } }; }
function _readOnlyError(r) { throw new TypeError('"' + r + '" is read-only'); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _wrapNativeSuper(t) { var r = "function" == typeof Map ? new Map() : void 0; return _wrapNativeSuper = function _wrapNativeSuper(t) { if (null === t || !_isNativeFunction(t)) return t; if ("function" != typeof t) throw new TypeError("Super expression must either be null or a function"); if (void 0 !== r) { if (r.has(t)) return r.get(t); r.set(t, Wrapper); } function Wrapper() { return _construct(t, arguments, _getPrototypeOf(this).constructor); } return Wrapper.prototype = Object.create(t.prototype, { constructor: { value: Wrapper, enumerable: !1, writable: !0, configurable: !0 } }), _setPrototypeOf(Wrapper, t); }, _wrapNativeSuper(t); }
function _construct(t, e, r) { if (_isNativeReflectConstruct()) return Reflect.construct.apply(null, arguments); var o = [null]; o.push.apply(o, e); var p = new (t.bind.apply(t, o))(); return r && _setPrototypeOf(p, r.prototype), p; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _isNativeFunction(t) { try { return -1 !== Function.toString.call(t).indexOf("[native code]"); } catch (n) { return "function" == typeof t; } }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @fileoverview Firebase constants.  Some of these (@defines) can be overridden at compile-time.
 */
var CONSTANTS = exports.CONSTANTS = {
  /**
   * @define {boolean} Whether this is the client Node.js SDK.
   */
  NODE_CLIENT: false,
  /**
   * @define {boolean} Whether this is the Admin Node.js SDK.
   */
  NODE_ADMIN: false,
  /**
   * Firebase SDK Version
   */
  SDK_VERSION: '${JSCORE_VERSION}'
};

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Throws an error if the provided assertion is falsy
 */
var assert = exports.assert = function assert(assertion, message) {
  if (!assertion) {
    throw assertionError(message);
  }
};
/**
 * Returns an Error object suitable for throwing.
 */
var assertionError = exports.assertionError = function assertionError(message) {
  return new Error('Firebase Database (' + CONSTANTS.SDK_VERSION + ') INTERNAL ASSERT FAILED: ' + message);
};

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var stringToByteArray$1 = function stringToByteArray$1(str) {
  // TODO(user): Use native implementations if/when available
  var out = [];
  var p = 0;
  for (var i = 0; i < str.length; i++) {
    var c = str.charCodeAt(i);
    if (c < 128) {
      out[p++] = c;
    } else if (c < 2048) {
      out[p++] = c >> 6 | 192;
      out[p++] = c & 63 | 128;
    } else if ((c & 0xfc00) === 0xd800 && i + 1 < str.length && (str.charCodeAt(i + 1) & 0xfc00) === 0xdc00) {
      // Surrogate Pair
      c = 0x10000 + ((c & 0x03ff) << 10) + (str.charCodeAt(++i) & 0x03ff);
      out[p++] = c >> 18 | 240;
      out[p++] = c >> 12 & 63 | 128;
      out[p++] = c >> 6 & 63 | 128;
      out[p++] = c & 63 | 128;
    } else {
      out[p++] = c >> 12 | 224;
      out[p++] = c >> 6 & 63 | 128;
      out[p++] = c & 63 | 128;
    }
  }
  return out;
};
/**
 * Turns an array of numbers into the string given by the concatenation of the
 * characters to which the numbers correspond.
 * @param bytes Array of numbers representing characters.
 * @return Stringification of the array.
 */
var byteArrayToString = function byteArrayToString(bytes) {
  // TODO(user): Use native implementations if/when available
  var out = [];
  var pos = 0,
    c = 0;
  while (pos < bytes.length) {
    var c1 = bytes[pos++];
    if (c1 < 128) {
      out[c++] = String.fromCharCode(c1);
    } else if (c1 > 191 && c1 < 224) {
      var c2 = bytes[pos++];
      out[c++] = String.fromCharCode((c1 & 31) << 6 | c2 & 63);
    } else if (c1 > 239 && c1 < 365) {
      // Surrogate Pair
      var _c = bytes[pos++];
      var c3 = bytes[pos++];
      var c4 = bytes[pos++];
      var u = ((c1 & 7) << 18 | (_c & 63) << 12 | (c3 & 63) << 6 | c4 & 63) - 0x10000;
      out[c++] = String.fromCharCode(0xd800 + (u >> 10));
      out[c++] = String.fromCharCode(0xdc00 + (u & 1023));
    } else {
      var _c2 = bytes[pos++];
      var _c3 = bytes[pos++];
      out[c++] = String.fromCharCode((c1 & 15) << 12 | (_c2 & 63) << 6 | _c3 & 63);
    }
  }
  return out.join('');
};
// We define it as an object literal instead of a class because a class compiled down to es5 can't
// be treeshaked. https://github.com/rollup/rollup/issues/1691
// Static lookup maps, lazily populated by init_()
// TODO(dlarocque): Define this as a class, since we no longer target ES5.
var base64 = exports.base64 = {
  /**
   * Maps bytes to characters.
   */
  byteToCharMap_: null,
  /**
   * Maps characters to bytes.
   */
  charToByteMap_: null,
  /**
   * Maps bytes to websafe characters.
   * @private
   */
  byteToCharMapWebSafe_: null,
  /**
   * Maps websafe characters to bytes.
   * @private
   */
  charToByteMapWebSafe_: null,
  /**
   * Our default alphabet, shared between
   * ENCODED_VALS and ENCODED_VALS_WEBSAFE
   */
  ENCODED_VALS_BASE: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' + 'abcdefghijklmnopqrstuvwxyz' + '0123456789',
  /**
   * Our default alphabet. Value 64 (=) is special; it means "nothing."
   */
  get ENCODED_VALS() {
    return this.ENCODED_VALS_BASE + '+/=';
  },
  /**
   * Our websafe alphabet.
   */
  get ENCODED_VALS_WEBSAFE() {
    return this.ENCODED_VALS_BASE + '-_.';
  },
  /**
   * Whether this browser supports the atob and btoa functions. This extension
   * started at Mozilla but is now implemented by many browsers. We use the
   * ASSUME_* variables to avoid pulling in the full useragent detection library
   * but still allowing the standard per-browser compilations.
   *
   */
  HAS_NATIVE_SUPPORT: typeof atob === 'function',
  /**
   * Base64-encode an array of bytes.
   *
   * @param input An array of bytes (numbers with
   *     value in [0, 255]) to encode.
   * @param webSafe Boolean indicating we should use the
   *     alternative alphabet.
   * @return The base64 encoded string.
   */
  encodeByteArray: function encodeByteArray(input, webSafe) {
    if (!Array.isArray(input)) {
      throw Error('encodeByteArray takes an array as a parameter');
    }
    this.init_();
    var byteToCharMap = webSafe ? this.byteToCharMapWebSafe_ : this.byteToCharMap_;
    var output = [];
    for (var i = 0; i < input.length; i += 3) {
      var byte1 = input[i];
      var haveByte2 = i + 1 < input.length;
      var byte2 = haveByte2 ? input[i + 1] : 0;
      var haveByte3 = i + 2 < input.length;
      var byte3 = haveByte3 ? input[i + 2] : 0;
      var outByte1 = byte1 >> 2;
      var outByte2 = (byte1 & 0x03) << 4 | byte2 >> 4;
      var outByte3 = (byte2 & 0x0f) << 2 | byte3 >> 6;
      var outByte4 = byte3 & 0x3f;
      if (!haveByte3) {
        outByte4 = 64;
        if (!haveByte2) {
          outByte3 = 64;
        }
      }
      output.push(byteToCharMap[outByte1], byteToCharMap[outByte2], byteToCharMap[outByte3], byteToCharMap[outByte4]);
    }
    return output.join('');
  },
  /**
   * Base64-encode a string.
   *
   * @param input A string to encode.
   * @param webSafe If true, we should use the
   *     alternative alphabet.
   * @return The base64 encoded string.
   */
  encodeString: function encodeString(input, webSafe) {
    // Shortcut for Mozilla browsers that implement
    // a native base64 encoder in the form of "btoa/atob"
    if (this.HAS_NATIVE_SUPPORT && !webSafe) {
      return btoa(input);
    }
    return this.encodeByteArray(stringToByteArray$1(input), webSafe);
  },
  /**
   * Base64-decode a string.
   *
   * @param input to decode.
   * @param webSafe True if we should use the
   *     alternative alphabet.
   * @return string representing the decoded value.
   */
  decodeString: function decodeString(input, webSafe) {
    // Shortcut for Mozilla browsers that implement
    // a native base64 encoder in the form of "btoa/atob"
    if (this.HAS_NATIVE_SUPPORT && !webSafe) {
      return atob(input);
    }
    return byteArrayToString(this.decodeStringToByteArray(input, webSafe));
  },
  /**
   * Base64-decode a string.
   *
   * In base-64 decoding, groups of four characters are converted into three
   * bytes.  If the encoder did not apply padding, the input length may not
   * be a multiple of 4.
   *
   * In this case, the last group will have fewer than 4 characters, and
   * padding will be inferred.  If the group has one or two characters, it decodes
   * to one byte.  If the group has three characters, it decodes to two bytes.
   *
   * @param input Input to decode.
   * @param webSafe True if we should use the web-safe alphabet.
   * @return bytes representing the decoded value.
   */
  decodeStringToByteArray: function decodeStringToByteArray(input, webSafe) {
    this.init_();
    var charToByteMap = webSafe ? this.charToByteMapWebSafe_ : this.charToByteMap_;
    var output = [];
    for (var i = 0; i < input.length;) {
      var byte1 = charToByteMap[input.charAt(i++)];
      var haveByte2 = i < input.length;
      var byte2 = haveByte2 ? charToByteMap[input.charAt(i)] : 0;
      ++i;
      var haveByte3 = i < input.length;
      var byte3 = haveByte3 ? charToByteMap[input.charAt(i)] : 64;
      ++i;
      var haveByte4 = i < input.length;
      var byte4 = haveByte4 ? charToByteMap[input.charAt(i)] : 64;
      ++i;
      if (byte1 == null || byte2 == null || byte3 == null || byte4 == null) {
        throw new DecodeBase64StringError();
      }
      var outByte1 = byte1 << 2 | byte2 >> 4;
      output.push(outByte1);
      if (byte3 !== 64) {
        var outByte2 = byte2 << 4 & 0xf0 | byte3 >> 2;
        output.push(outByte2);
        if (byte4 !== 64) {
          var outByte3 = byte3 << 6 & 0xc0 | byte4;
          output.push(outByte3);
        }
      }
    }
    return output;
  },
  /**
   * Lazy static initialization function. Called before
   * accessing any of the static map variables.
   * @private
   */
  init_: function init_() {
    if (!this.byteToCharMap_) {
      this.byteToCharMap_ = {};
      this.charToByteMap_ = {};
      this.byteToCharMapWebSafe_ = {};
      this.charToByteMapWebSafe_ = {};
      // We want quick mappings back and forth, so we precompute two maps.
      for (var i = 0; i < this.ENCODED_VALS.length; i++) {
        this.byteToCharMap_[i] = this.ENCODED_VALS.charAt(i);
        this.charToByteMap_[this.byteToCharMap_[i]] = i;
        this.byteToCharMapWebSafe_[i] = this.ENCODED_VALS_WEBSAFE.charAt(i);
        this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[i]] = i;
        // Be forgiving when decoding and correctly decode both encodings.
        if (i >= this.ENCODED_VALS_BASE.length) {
          this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(i)] = i;
          this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(i)] = i;
        }
      }
    }
  }
};
/**
 * An error encountered while decoding base64 string.
 */
var DecodeBase64StringError = exports.DecodeBase64StringError = /*#__PURE__*/function (_Error) {
  function DecodeBase64StringError() {
    var _this;
    _classCallCheck(this, DecodeBase64StringError);
    _this = _callSuper(this, DecodeBase64StringError, arguments);
    _this.name = 'DecodeBase64StringError';
    return _this;
  }
  _inherits(DecodeBase64StringError, _Error);
  return _createClass(DecodeBase64StringError);
}(/*#__PURE__*/_wrapNativeSuper(Error));
/**
 * URL-safe base64 encoding
 */
var base64Encode = exports.base64Encode = function base64Encode(str) {
  var utf8Bytes = stringToByteArray$1(str);
  return base64.encodeByteArray(utf8Bytes, true);
};
/**
 * URL-safe base64 encoding (without "." padding in the end).
 * e.g. Used in JSON Web Token (JWT) parts.
 */
var base64urlEncodeWithoutPadding = exports.base64urlEncodeWithoutPadding = function base64urlEncodeWithoutPadding(str) {
  // Use base64url encoding and remove padding in the end (dot characters).
  return base64Encode(str).replace(/\./g, '');
};
/**
 * URL-safe base64 decoding
 *
 * NOTE: DO NOT use the global atob() function - it does NOT support the
 * base64Url variant encoding.
 *
 * @param str To be decoded
 * @return Decoded result, if possible
 */
var base64Decode = exports.base64Decode = function base64Decode(str) {
  try {
    return base64.decodeString(str, true);
  } catch (e) {
    console.error('base64Decode failed: ', e);
  }
  return null;
};

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Do a deep-copy of basic JavaScript Objects or Arrays.
 */
function deepCopy(value) {
  return deepExtend(undefined, value);
}
/**
 * Copy properties from source to target (recursively allows extension
 * of Objects and Arrays).  Scalar values in the target are over-written.
 * If target is undefined, an object of the appropriate type will be created
 * (and returned).
 *
 * We recursively copy all child properties of plain Objects in the source- so
 * that namespace- like dictionaries are merged.
 *
 * Note that the target can be a function, in which case the properties in
 * the source Object are copied onto it as static properties of the Function.
 *
 * Note: we don't merge __proto__ to prevent prototype pollution
 */
function deepExtend(target, source) {
  if (!(source instanceof Object)) {
    return source;
  }
  switch (source.constructor) {
    case Date:
      // Treat Dates like scalars; if the target date object had any child
      // properties - they will be lost!
      var dateValue = source;
      return new Date(dateValue.getTime());
    case Object:
      if (target === undefined) {
        target = {};
      }
      break;
    case Array:
      // Always copy the array source and overwrite the target.
      target = [];
      break;
    default:
      // Not a plain Object - treat it as a scalar.
      return source;
  }
  for (var prop in source) {
    // use isValidKey to guard against prototype pollution. See https://snyk.io/vuln/SNYK-JS-LODASH-450202
    if (!source.hasOwnProperty(prop) || !isValidKey(prop)) {
      continue;
    }
    target[prop] = deepExtend(target[prop], source[prop]);
  }
  return target;
}
function isValidKey(key) {
  return key !== '__proto__';
}

/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Polyfill for `globalThis` object.
 * @returns the `globalThis` object for the given environment.
 * @public
 */
function getGlobal() {
  if (typeof self !== 'undefined') {
    return self;
  }
  if (typeof window !== 'undefined') {
    return window;
  }
  if (typeof global !== 'undefined') {
    return global;
  }
  throw new Error('Unable to locate global object.');
}

/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var getDefaultsFromGlobal = function getDefaultsFromGlobal() {
  return getGlobal().__FIREBASE_DEFAULTS__;
};
/**
 * Attempt to read defaults from a JSON string provided to
 * process(.)env(.)__FIREBASE_DEFAULTS__ or a JSON file whose path is in
 * process(.)env(.)__FIREBASE_DEFAULTS_PATH__
 * The dots are in parens because certain compilers (Vite?) cannot
 * handle seeing that variable in comments.
 * See https://github.com/firebase/firebase-js-sdk/issues/6838
 */
var getDefaultsFromEnvVariable = function getDefaultsFromEnvVariable() {
  if (typeof process === 'undefined' || typeof process.env === 'undefined') {
    return;
  }
  var defaultsJsonString = undefined;
  if (defaultsJsonString) {
    return JSON.parse(defaultsJsonString);
  }
};
var getDefaultsFromCookie = function getDefaultsFromCookie() {
  if (typeof document === 'undefined') {
    return;
  }
  var match;
  try {
    match = document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/);
  } catch (e) {
    // Some environments such as Angular Universal SSR have a
    // `document` object but error on accessing `document.cookie`.
    return;
  }
  var decoded = match && base64Decode(match[1]);
  return decoded && JSON.parse(decoded);
};
/**
 * Get the __FIREBASE_DEFAULTS__ object. It checks in order:
 * (1) if such an object exists as a property of `globalThis`
 * (2) if such an object was provided on a shell environment variable
 * (3) if such an object exists in a cookie
 * @public
 */
var getDefaults = exports.getDefaults = function getDefaults() {
  try {
    return (0, _postinstall.getDefaultsFromPostinstall)() || getDefaultsFromGlobal() || getDefaultsFromEnvVariable() || getDefaultsFromCookie();
  } catch (e) {
    /**
     * Catch-all for being unable to get __FIREBASE_DEFAULTS__ due
     * to any environment case we have not accounted for. Log to
     * info instead of swallowing so we can find these unknown cases
     * and add paths for them if needed.
     */
    console.info("Unable to get __FIREBASE_DEFAULTS__ due to: ".concat(e));
    return;
  }
};
/**
 * Returns emulator host stored in the __FIREBASE_DEFAULTS__ object
 * for the given product.
 * @returns a URL host formatted like `127.0.0.1:9999` or `[::1]:4000` if available
 * @public
 */
var getDefaultEmulatorHost = exports.getDefaultEmulatorHost = function getDefaultEmulatorHost(productName) {
  var _a, _b;
  return (_b = (_a = getDefaults()) === null || _a === void 0 ? void 0 : _a.emulatorHosts) === null || _b === void 0 ? void 0 : _b[productName];
};
/**
 * Returns emulator hostname and port stored in the __FIREBASE_DEFAULTS__ object
 * for the given product.
 * @returns a pair of hostname and port like `["::1", 4000]` if available
 * @public
 */
var getDefaultEmulatorHostnameAndPort = exports.getDefaultEmulatorHostnameAndPort = function getDefaultEmulatorHostnameAndPort(productName) {
  var host = getDefaultEmulatorHost(productName);
  if (!host) {
    return undefined;
  }
  var separatorIndex = host.lastIndexOf(':'); // Finding the last since IPv6 addr also has colons.
  if (separatorIndex <= 0 || separatorIndex + 1 === host.length) {
    throw new Error("Invalid host ".concat(host, " with no separate hostname and port!"));
  }
  // eslint-disable-next-line no-restricted-globals
  var port = parseInt(host.substring(separatorIndex + 1), 10);
  if (host[0] === '[') {
    // Bracket-quoted `[ipv6addr]:port` => return "ipv6addr" (without brackets).
    return [host.substring(1, separatorIndex - 1), port];
  } else {
    return [host.substring(0, separatorIndex), port];
  }
};
/**
 * Returns Firebase app config stored in the __FIREBASE_DEFAULTS__ object.
 * @public
 */
var getDefaultAppConfig = exports.getDefaultAppConfig = function getDefaultAppConfig() {
  var _a;
  return (_a = getDefaults()) === null || _a === void 0 ? void 0 : _a.config;
};
/**
 * Returns an experimental setting on the __FIREBASE_DEFAULTS__ object (properties
 * prefixed by "_")
 * @public
 */
var getExperimentalSetting = exports.getExperimentalSetting = function getExperimentalSetting(name) {
  var _a;
  return (_a = getDefaults()) === null || _a === void 0 ? void 0 : _a["_".concat(name)];
};

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var Deferred = exports.Deferred = /*#__PURE__*/function () {
  function Deferred() {
    var _this2 = this;
    _classCallCheck(this, Deferred);
    this.reject = function () {};
    this.resolve = function () {};
    this.promise = new Promise(function (resolve, reject) {
      _this2.resolve = resolve;
      _this2.reject = reject;
    });
  }
  /**
   * Our API internals are not promisified and cannot because our callback APIs have subtle expectations around
   * invoking promises inline, which Promises are forbidden to do. This method accepts an optional node-style callback
   * and returns a node-style callback which will resolve or reject the Deferred's promise.
   */
  return _createClass(Deferred, [{
    key: "wrapCallback",
    value: function wrapCallback(callback) {
      var _this3 = this;
      return function (error, value) {
        if (error) {
          _this3.reject(error);
        } else {
          _this3.resolve(value);
        }
        if (typeof callback === 'function') {
          // Attaching noop handler just in case developer wasn't expecting
          // promises
          _this3.promise.catch(function () {});
          // Some of our callbacks don't expect a value and our own tests
          // assert that the parameter length is 1
          if (callback.length === 1) {
            callback(error);
          } else {
            callback(error, value);
          }
        }
      };
    }
  }]);
}();
/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Checks whether host is a cloud workstation or not.
 * @public
 */
function isCloudWorkstation(host) {
  return host.endsWith('.cloudworkstations.dev');
}
/**
 * Makes a fetch request to the given server.
 * Mostly used for forwarding cookies in Firebase Studio.
 * @public
 */
function pingServer(_x) {
  return _pingServer.apply(this, arguments);
}
/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function _pingServer() {
  _pingServer = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee(endpoint) {
    var result;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return fetch(endpoint, {
            credentials: 'include'
          });
        case 2:
          result = _context.sent;
          return _context.abrupt("return", result.ok);
        case 4:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return _pingServer.apply(this, arguments);
}
function createMockUserToken(token, projectId) {
  if (token.uid) {
    throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');
  }
  // Unsecured JWTs use "none" as the algorithm.
  var header = {
    alg: 'none',
    type: 'JWT'
  };
  var project = projectId || 'demo-project';
  var iat = token.iat || 0;
  var sub = token.sub || token.user_id;
  if (!sub) {
    throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");
  }
  var payload = Object.assign({
    // Set all required fields to decent defaults
    iss: "https://securetoken.google.com/".concat(project),
    aud: project,
    iat: iat,
    exp: iat + 3600,
    auth_time: iat,
    sub: sub,
    user_id: sub,
    firebase: {
      sign_in_provider: 'custom',
      identities: {}
    }
  }, token);
  // Unsecured JWTs use the empty string as a signature.
  var signature = '';
  return [base64urlEncodeWithoutPadding(JSON.stringify(header)), base64urlEncodeWithoutPadding(JSON.stringify(payload)), signature].join('.');
}
var emulatorStatus = {};
// Checks whether any products are running on an emulator
function getEmulatorSummary() {
  var summary = {
    prod: [],
    emulator: []
  };
  for (var _i = 0, _Object$keys = Object.keys(emulatorStatus); _i < _Object$keys.length; _i++) {
    var key = _Object$keys[_i];
    if (emulatorStatus[key]) {
      summary.emulator.push(key);
    } else {
      summary.prod.push(key);
    }
  }
  return summary;
}
function getOrCreateEl(id) {
  var parentDiv = document.getElementById(id);
  var created = false;
  if (!parentDiv) {
    parentDiv = document.createElement('div');
    parentDiv.setAttribute('id', id);
    created = true;
  }
  return {
    created: created,
    element: parentDiv
  };
}
var previouslyDismissed = false;
/**
 * Updates Emulator Banner. Primarily used for Firebase Studio
 * @param name
 * @param isRunningEmulator
 * @public
 */
function updateEmulatorBanner(name, isRunningEmulator) {
  if (typeof window === 'undefined' || typeof document === 'undefined' || !isCloudWorkstation(window.location.host) || emulatorStatus[name] === isRunningEmulator || emulatorStatus[name] ||
  // If already set to use emulator, can't go back to prod.
  previouslyDismissed) {
    return;
  }
  emulatorStatus[name] = isRunningEmulator;
  function prefixedId(id) {
    return "__firebase__banner__".concat(id);
  }
  var bannerId = '__firebase__banner';
  var summary = getEmulatorSummary();
  var showError = summary.prod.length > 0;
  function tearDown() {
    var element = document.getElementById(bannerId);
    if (element) {
      element.remove();
    }
  }
  function setupBannerStyles(bannerEl) {
    bannerEl.style.display = 'flex';
    bannerEl.style.background = '#7faaf0';
    bannerEl.style.position = 'fixed';
    bannerEl.style.bottom = '5px';
    bannerEl.style.left = '5px';
    bannerEl.style.padding = '.5em';
    bannerEl.style.borderRadius = '5px';
    bannerEl.style.alignItems = 'center';
  }
  function setupIconStyles(prependIcon, iconId) {
    prependIcon.setAttribute('width', '24');
    prependIcon.setAttribute('id', iconId);
    prependIcon.setAttribute('height', '24');
    prependIcon.setAttribute('viewBox', '0 0 24 24');
    prependIcon.setAttribute('fill', 'none');
    prependIcon.style.marginLeft = '-6px';
  }
  function setupCloseBtn() {
    var closeBtn = document.createElement('span');
    closeBtn.style.cursor = 'pointer';
    closeBtn.style.marginLeft = '16px';
    closeBtn.style.fontSize = '24px';
    closeBtn.innerHTML = ' &times;';
    closeBtn.onclick = function () {
      previouslyDismissed = true;
      tearDown();
    };
    return closeBtn;
  }
  function setupLinkStyles(learnMoreLink, learnMoreId) {
    learnMoreLink.setAttribute('id', learnMoreId);
    learnMoreLink.innerText = 'Learn more';
    learnMoreLink.href = 'https://firebase.google.com/docs/studio/preview-apps#preview-backend';
    learnMoreLink.setAttribute('target', '__blank');
    learnMoreLink.style.paddingLeft = '5px';
    learnMoreLink.style.textDecoration = 'underline';
  }
  function setupDom() {
    var banner = getOrCreateEl(bannerId);
    var firebaseTextId = prefixedId('text');
    var firebaseText = document.getElementById(firebaseTextId) || document.createElement('span');
    var learnMoreId = prefixedId('learnmore');
    var learnMoreLink = document.getElementById(learnMoreId) || document.createElement('a');
    var prependIconId = prefixedId('preprendIcon');
    var prependIcon = document.getElementById(prependIconId) || document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    if (banner.created) {
      // update styles
      var bannerEl = banner.element;
      setupBannerStyles(bannerEl);
      setupLinkStyles(learnMoreLink, learnMoreId);
      var closeBtn = setupCloseBtn();
      setupIconStyles(prependIcon, prependIconId);
      bannerEl.append(prependIcon, firebaseText, learnMoreLink, closeBtn);
      document.body.appendChild(bannerEl);
    }
    if (showError) {
      firebaseText.innerText = "Preview backend disconnected.";
      prependIcon.innerHTML = "<g clip-path=\"url(#clip0_6013_33858)\">\n<path d=\"M4.8 17.6L12 5.6L19.2 17.6H4.8ZM6.91667 16.4H17.0833L12 7.93333L6.91667 16.4ZM12 15.6C12.1667 15.6 12.3056 15.5444 12.4167 15.4333C12.5389 15.3111 12.6 15.1667 12.6 15C12.6 14.8333 12.5389 14.6944 12.4167 14.5833C12.3056 14.4611 12.1667 14.4 12 14.4C11.8333 14.4 11.6889 14.4611 11.5667 14.5833C11.4556 14.6944 11.4 14.8333 11.4 15C11.4 15.1667 11.4556 15.3111 11.5667 15.4333C11.6889 15.5444 11.8333 15.6 12 15.6ZM11.4 13.6H12.6V10.4H11.4V13.6Z\" fill=\"#212121\"/>\n</g>\n<defs>\n<clipPath id=\"clip0_6013_33858\">\n<rect width=\"24\" height=\"24\" fill=\"white\"/>\n</clipPath>\n</defs>";
    } else {
      prependIcon.innerHTML = "<g clip-path=\"url(#clip0_6083_34804)\">\n<path d=\"M11.4 15.2H12.6V11.2H11.4V15.2ZM12 10C12.1667 10 12.3056 9.94444 12.4167 9.83333C12.5389 9.71111 12.6 9.56667 12.6 9.4C12.6 9.23333 12.5389 9.09444 12.4167 8.98333C12.3056 8.86111 12.1667 8.8 12 8.8C11.8333 8.8 11.6889 8.86111 11.5667 8.98333C11.4556 9.09444 11.4 9.23333 11.4 9.4C11.4 9.56667 11.4556 9.71111 11.5667 9.83333C11.6889 9.94444 11.8333 10 12 10ZM12 18.4C11.1222 18.4 10.2944 18.2333 9.51667 17.9C8.73889 17.5667 8.05556 17.1111 7.46667 16.5333C6.88889 15.9444 6.43333 15.2611 6.1 14.4833C5.76667 13.7056 5.6 12.8778 5.6 12C5.6 11.1111 5.76667 10.2833 6.1 9.51667C6.43333 8.73889 6.88889 8.06111 7.46667 7.48333C8.05556 6.89444 8.73889 6.43333 9.51667 6.1C10.2944 5.76667 11.1222 5.6 12 5.6C12.8889 5.6 13.7167 5.76667 14.4833 6.1C15.2611 6.43333 15.9389 6.89444 16.5167 7.48333C17.1056 8.06111 17.5667 8.73889 17.9 9.51667C18.2333 10.2833 18.4 11.1111 18.4 12C18.4 12.8778 18.2333 13.7056 17.9 14.4833C17.5667 15.2611 17.1056 15.9444 16.5167 16.5333C15.9389 17.1111 15.2611 17.5667 14.4833 17.9C13.7167 18.2333 12.8889 18.4 12 18.4ZM12 17.2C13.4444 17.2 14.6722 16.6944 15.6833 15.6833C16.6944 14.6722 17.2 13.4444 17.2 12C17.2 10.5556 16.6944 9.32778 15.6833 8.31667C14.6722 7.30555 13.4444 6.8 12 6.8C10.5556 6.8 9.32778 7.30555 8.31667 8.31667C7.30556 9.32778 6.8 10.5556 6.8 12C6.8 13.4444 7.30556 14.6722 8.31667 15.6833C9.32778 16.6944 10.5556 17.2 12 17.2Z\" fill=\"#212121\"/>\n</g>\n<defs>\n<clipPath id=\"clip0_6083_34804\">\n<rect width=\"24\" height=\"24\" fill=\"white\"/>\n</clipPath>\n</defs>";
      firebaseText.innerText = 'Preview backend running in this workspace.';
    }
    firebaseText.setAttribute('id', firebaseTextId);
  }
  if (document.readyState === 'loading') {
    window.addEventListener('DOMContentLoaded', setupDom);
  } else {
    setupDom();
  }
}

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Returns navigator.userAgent string or '' if it's not defined.
 * @return user agent string
 */
function getUA() {
  if (typeof navigator !== 'undefined' && typeof navigator['userAgent'] === 'string') {
    return navigator['userAgent'];
  } else {
    return '';
  }
}
/**
 * Detect Cordova / PhoneGap / Ionic frameworks on a mobile device.
 *
 * Deliberately does not rely on checking `file://` URLs (as this fails PhoneGap
 * in the Ripple emulator) nor Cordova `onDeviceReady`, which would normally
 * wait for a callback.
 */
function isMobileCordova() {
  return typeof window !== 'undefined' &&
  // @ts-ignore Setting up an broadly applicable index signature for Window
  // just to deal with this case would probably be a bad idea.
  !!(window['cordova'] || window['phonegap'] || window['PhoneGap']) && /ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(getUA());
}
/**
 * Detect Node.js.
 *
 * @return true if Node.js environment is detected or specified.
 */
// Node detection logic from: https://github.com/iliakan/detect-node/
function isNode() {
  var _a;
  var forceEnvironment = (_a = getDefaults()) === null || _a === void 0 ? void 0 : _a.forceEnvironment;
  if (forceEnvironment === 'node') {
    return true;
  } else if (forceEnvironment === 'browser') {
    return false;
  }
  try {
    return Object.prototype.toString.call(global.process) === '[object process]';
  } catch (e) {
    return false;
  }
}
/**
 * Detect Browser Environment.
 * Note: This will return true for certain test frameworks that are incompletely
 * mimicking a browser, and should not lead to assuming all browser APIs are
 * available.
 */
function isBrowser() {
  return typeof window !== 'undefined' || isWebWorker();
}
/**
 * Detect Web Worker context.
 */
function isWebWorker() {
  return typeof WorkerGlobalScope !== 'undefined' && typeof self !== 'undefined' && self instanceof WorkerGlobalScope;
}
/**
 * Detect Cloudflare Worker context.
 */
function isCloudflareWorker() {
  return typeof navigator !== 'undefined' && navigator.userAgent === 'Cloudflare-Workers';
}
function isBrowserExtension() {
  var runtime = (typeof chrome === "undefined" ? "undefined" : _typeof(chrome)) === 'object' ? chrome.runtime : (typeof browser === "undefined" ? "undefined" : _typeof(browser)) === 'object' ? browser.runtime : undefined;
  return _typeof(runtime) === 'object' && runtime.id !== undefined;
}
/**
 * Detect React Native.
 *
 * @return true if ReactNative environment is detected.
 */
function isReactNative() {
  return (typeof navigator === "undefined" ? "undefined" : _typeof(navigator)) === 'object' && navigator['product'] === 'ReactNative';
}
/** Detects Electron apps. */
function isElectron() {
  return getUA().indexOf('Electron/') >= 0;
}
/** Detects Internet Explorer. */
function isIE() {
  var ua = getUA();
  return ua.indexOf('MSIE ') >= 0 || ua.indexOf('Trident/') >= 0;
}
/** Detects Universal Windows Platform apps. */
function isUWP() {
  return getUA().indexOf('MSAppHost/') >= 0;
}
/**
 * Detect whether the current SDK build is the Node version.
 *
 * @return true if it's the Node SDK build.
 */
function isNodeSdk() {
  return CONSTANTS.NODE_CLIENT === true || CONSTANTS.NODE_ADMIN === true;
}
/** Returns true if we are running in Safari. */
function isSafari() {
  return !isNode() && !!navigator.userAgent && navigator.userAgent.includes('Safari') && !navigator.userAgent.includes('Chrome');
}
/** Returns true if we are running in Safari or WebKit */
function isSafariOrWebkit() {
  return !isNode() && !!navigator.userAgent && (navigator.userAgent.includes('Safari') || navigator.userAgent.includes('WebKit')) && !navigator.userAgent.includes('Chrome');
}
/**
 * This method checks if indexedDB is supported by current browser/service worker context
 * @return true if indexedDB is supported by current browser/service worker context
 */
function isIndexedDBAvailable() {
  try {
    return (typeof indexedDB === "undefined" ? "undefined" : _typeof(indexedDB)) === 'object';
  } catch (e) {
    return false;
  }
}
/**
 * This method validates browser/sw context for indexedDB by opening a dummy indexedDB database and reject
 * if errors occur during the database open operation.
 *
 * @throws exception if current browser/sw context can't run idb.open (ex: Safari iframe, Firefox
 * private browsing)
 */
function validateIndexedDBOpenable() {
  return new Promise(function (resolve, reject) {
    try {
      var preExist = true;
      var DB_CHECK_NAME = 'validate-browser-context-for-indexeddb-analytics-module';
      var request = self.indexedDB.open(DB_CHECK_NAME);
      request.onsuccess = function () {
        request.result.close();
        // delete database only when it doesn't pre-exist
        if (!preExist) {
          self.indexedDB.deleteDatabase(DB_CHECK_NAME);
        }
        resolve(true);
      };
      request.onupgradeneeded = function () {
        preExist = false;
      };
      request.onerror = function () {
        var _a;
        reject(((_a = request.error) === null || _a === void 0 ? void 0 : _a.message) || '');
      };
    } catch (error) {
      reject(error);
    }
  });
}
/**
 *
 * This method checks whether cookie is enabled within current browser
 * @return true if cookie is enabled within current browser
 */
function areCookiesEnabled() {
  if (typeof navigator === 'undefined' || !navigator.cookieEnabled) {
    return false;
  }
  return true;
}

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @fileoverview Standardized Firebase Error.
 *
 * Usage:
 *
 *   // TypeScript string literals for type-safe codes
 *   type Err =
 *     'unknown' |
 *     'object-not-found'
 *     ;
 *
 *   // Closure enum for type-safe error codes
 *   // at-enum {string}
 *   var Err = {
 *     UNKNOWN: 'unknown',
 *     OBJECT_NOT_FOUND: 'object-not-found',
 *   }
 *
 *   let errors: Map<Err, string> = {
 *     'generic-error': "Unknown error",
 *     'file-not-found': "Could not find file: {$file}",
 *   };
 *
 *   // Type-safe function - must pass a valid error code as param.
 *   let error = new ErrorFactory<Err>('service', 'Service', errors);
 *
 *   ...
 *   throw error.create(Err.GENERIC);
 *   ...
 *   throw error.create(Err.FILE_NOT_FOUND, {'file': fileName});
 *   ...
 *   // Service: Could not file file: foo.txt (service/file-not-found).
 *
 *   catch (e) {
 *     assert(e.message === "Could not find file: foo.txt.");
 *     if ((e as FirebaseError)?.code === 'service/file-not-found') {
 *       console.log("Could not read file: " + e['file']);
 *     }
 *   }
 */
var ERROR_NAME = 'FirebaseError';
// Based on code from:
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error#Custom_Error_Types
var FirebaseError = exports.FirebaseError = /*#__PURE__*/function (_Error2) {
  function FirebaseError(/** The error code for this error. */
  code, message, /** Custom data for this error. */
  customData) {
    var _this4;
    _classCallCheck(this, FirebaseError);
    _this4 = _callSuper(this, FirebaseError, [message]);
    _this4.code = code;
    _this4.customData = customData;
    /** The custom name for all FirebaseErrors. */
    _this4.name = ERROR_NAME;
    // Fix For ES5
    // https://github.com/Microsoft/TypeScript-wiki/blob/master/Breaking-Changes.md#extending-built-ins-like-error-array-and-map-may-no-longer-work
    // TODO(dlarocque): Replace this with `new.target`: https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-2.html#support-for-newtarget
    //                   which we can now use since we no longer target ES5.
    Object.setPrototypeOf(_this4, FirebaseError.prototype);
    // Maintains proper stack trace for where our error was thrown.
    // Only available on V8.
    if (Error.captureStackTrace) {
      Error.captureStackTrace(_this4, ErrorFactory.prototype.create);
    }
    return _this4;
  }
  _inherits(FirebaseError, _Error2);
  return _createClass(FirebaseError);
}(/*#__PURE__*/_wrapNativeSuper(Error));
var ErrorFactory = exports.ErrorFactory = /*#__PURE__*/function () {
  function ErrorFactory(service, serviceName, errors) {
    _classCallCheck(this, ErrorFactory);
    this.service = service;
    this.serviceName = serviceName;
    this.errors = errors;
  }
  return _createClass(ErrorFactory, [{
    key: "create",
    value: function create(code) {
      var customData = (arguments.length <= 1 ? undefined : arguments[1]) || {};
      var fullCode = "".concat(this.service, "/").concat(code);
      var template = this.errors[code];
      var message = template ? replaceTemplate(template, customData) : 'Error';
      // Service Name: Error message (service/code).
      var fullMessage = "".concat(this.serviceName, ": ").concat(message, " (").concat(fullCode, ").");
      var error = new FirebaseError(fullCode, fullMessage, customData);
      return error;
    }
  }]);
}();
function replaceTemplate(template, data) {
  return template.replace(PATTERN, function (_, key) {
    var value = data[key];
    return value != null ? String(value) : "<".concat(key, "?>");
  });
}
var PATTERN = /\{\$([^}]+)}/g;

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Evaluates a JSON string into a javascript object.
 *
 * @param {string} str A string containing JSON.
 * @return {*} The javascript object representing the specified JSON.
 */
function jsonEval(str) {
  return JSON.parse(str);
}
/**
 * Returns JSON representing a javascript object.
 * @param {*} data JavaScript object to be stringified.
 * @return {string} The JSON contents of the object.
 */
function stringify(data) {
  return JSON.stringify(data);
}

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Decodes a Firebase auth. token into constituent parts.
 *
 * Notes:
 * - May return with invalid / incomplete claims if there's no native base64 decoding support.
 * - Doesn't check if the token is actually valid.
 */
var decode = exports.decode = function decode(token) {
  var header = {},
    claims = {},
    data = {},
    signature = '';
  try {
    var parts = token.split('.');
    header = jsonEval(base64Decode(parts[0]) || '');
    claims = jsonEval(base64Decode(parts[1]) || '');
    signature = parts[2];
    data = claims['d'] || {};
    delete claims['d'];
  } catch (e) {}
  return {
    header: header,
    claims: claims,
    data: data,
    signature: signature
  };
};
/**
 * Decodes a Firebase auth. token and checks the validity of its time-based claims. Will return true if the
 * token is within the time window authorized by the 'nbf' (not-before) and 'iat' (issued-at) claims.
 *
 * Notes:
 * - May return a false negative if there's no native base64 decoding support.
 * - Doesn't check if the token is actually valid.
 */
var isValidTimestamp = exports.isValidTimestamp = function isValidTimestamp(token) {
  var claims = decode(token).claims;
  var now = Math.floor(new Date().getTime() / 1000);
  var validSince = 0,
    validUntil = 0;
  if (_typeof(claims) === 'object') {
    if (claims.hasOwnProperty('nbf')) {
      validSince = claims['nbf'];
    } else if (claims.hasOwnProperty('iat')) {
      validSince = claims['iat'];
    }
    if (claims.hasOwnProperty('exp')) {
      validUntil = claims['exp'];
    } else {
      // token will expire after 24h by default
      validUntil = validSince + 86400;
    }
  }
  return !!now && !!validSince && !!validUntil && now >= validSince && now <= validUntil;
};
/**
 * Decodes a Firebase auth. token and returns its issued at time if valid, null otherwise.
 *
 * Notes:
 * - May return null if there's no native base64 decoding support.
 * - Doesn't check if the token is actually valid.
 */
var issuedAtTime = exports.issuedAtTime = function issuedAtTime(token) {
  var claims = decode(token).claims;
  if (_typeof(claims) === 'object' && claims.hasOwnProperty('iat')) {
    return claims['iat'];
  }
  return null;
};
/**
 * Decodes a Firebase auth. token and checks the validity of its format. Expects a valid issued-at time.
 *
 * Notes:
 * - May return a false negative if there's no native base64 decoding support.
 * - Doesn't check if the token is actually valid.
 */
var isValidFormat = exports.isValidFormat = function isValidFormat(token) {
  var decoded = decode(token),
    claims = decoded.claims;
  return !!claims && _typeof(claims) === 'object' && claims.hasOwnProperty('iat');
};
/**
 * Attempts to peer into an auth token and determine if it's an admin auth token by looking at the claims portion.
 *
 * Notes:
 * - May return a false negative if there's no native base64 decoding support.
 * - Doesn't check if the token is actually valid.
 */
var isAdmin = exports.isAdmin = function isAdmin(token) {
  var claims = decode(token).claims;
  return _typeof(claims) === 'object' && claims['admin'] === true;
};

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function contains(obj, key) {
  return Object.prototype.hasOwnProperty.call(obj, key);
}
function safeGet(obj, key) {
  if (Object.prototype.hasOwnProperty.call(obj, key)) {
    return obj[key];
  } else {
    return undefined;
  }
}
function isEmpty(obj) {
  for (var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      return false;
    }
  }
  return true;
}
function map(obj, fn, contextObj) {
  var res = {};
  for (var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      res[key] = fn.call(contextObj, obj[key], key, obj);
    }
  }
  return res;
}
/**
 * Deep equal two objects. Support Arrays and Objects.
 */
function deepEqual(a, b) {
  if (a === b) {
    return true;
  }
  var aKeys = Object.keys(a);
  var bKeys = Object.keys(b);
  for (var _i2 = 0, _aKeys = aKeys; _i2 < _aKeys.length; _i2++) {
    var k = _aKeys[_i2];
    if (!bKeys.includes(k)) {
      return false;
    }
    var aProp = a[k];
    var bProp = b[k];
    if (isObject(aProp) && isObject(bProp)) {
      if (!deepEqual(aProp, bProp)) {
        return false;
      }
    } else if (aProp !== bProp) {
      return false;
    }
  }
  for (var _i3 = 0, _bKeys = bKeys; _i3 < _bKeys.length; _i3++) {
    var _k = _bKeys[_i3];
    if (!aKeys.includes(_k)) {
      return false;
    }
  }
  return true;
}
function isObject(thing) {
  return thing !== null && _typeof(thing) === 'object';
}

/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Rejects if the given promise doesn't resolve in timeInMS milliseconds.
 * @internal
 */
function promiseWithTimeout(promise) {
  var timeInMS = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2000;
  var deferredPromise = new Deferred();
  setTimeout(function () {
    return deferredPromise.reject('timeout!');
  }, timeInMS);
  promise.then(deferredPromise.resolve, deferredPromise.reject);
  return deferredPromise.promise;
}

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Returns a querystring-formatted string (e.g. &arg=val&arg2=val2) from a
 * params object (e.g. {arg: 'val', arg2: 'val2'})
 * Note: You must prepend it with ? when adding it to a URL.
 */
function querystring(querystringParams) {
  var params = [];
  var _loop = function _loop() {
    var _Object$entries$_i = _slicedToArray(_Object$entries[_i4], 2),
      key = _Object$entries$_i[0],
      value = _Object$entries$_i[1];
    if (Array.isArray(value)) {
      value.forEach(function (arrayVal) {
        params.push(encodeURIComponent(key) + '=' + encodeURIComponent(arrayVal));
      });
    } else {
      params.push(encodeURIComponent(key) + '=' + encodeURIComponent(value));
    }
  };
  for (var _i4 = 0, _Object$entries = Object.entries(querystringParams); _i4 < _Object$entries.length; _i4++) {
    _loop();
  }
  return params.length ? '&' + params.join('&') : '';
}
/**
 * Decodes a querystring (e.g. ?arg=val&arg2=val2) into a params object
 * (e.g. {arg: 'val', arg2: 'val2'})
 */
function querystringDecode(querystring) {
  var obj = {};
  var tokens = querystring.replace(/^\?/, '').split('&');
  tokens.forEach(function (token) {
    if (token) {
      var _token$split = token.split('='),
        _token$split2 = _slicedToArray(_token$split, 2),
        key = _token$split2[0],
        value = _token$split2[1];
      obj[decodeURIComponent(key)] = decodeURIComponent(value);
    }
  });
  return obj;
}
/**
 * Extract the query string part of a URL, including the leading question mark (if present).
 */
function extractQuerystring(url) {
  var queryStart = url.indexOf('?');
  if (!queryStart) {
    return '';
  }
  var fragmentStart = url.indexOf('#', queryStart);
  return url.substring(queryStart, fragmentStart > 0 ? fragmentStart : undefined);
}

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @fileoverview SHA-1 cryptographic hash.
 * Variable names follow the notation in FIPS PUB 180-3:
 * http://csrc.nist.gov/publications/fips/fips180-3/fips180-3_final.pdf.
 *
 * Usage:
 *   var sha1 = new sha1();
 *   sha1.update(bytes);
 *   var hash = sha1.digest();
 *
 * Performance:
 *   Chrome 23:   ~400 Mbit/s
 *   Firefox 16:  ~250 Mbit/s
 *
 */
/**
 * SHA-1 cryptographic hash constructor.
 *
 * The properties declared here are discussed in the above algorithm document.
 * @constructor
 * @final
 * @struct
 */
var Sha1 = exports.Sha1 = /*#__PURE__*/function () {
  function Sha1() {
    _classCallCheck(this, Sha1);
    /**
     * Holds the previous values of accumulated variables a-e in the compress_
     * function.
     * @private
     */
    this.chain_ = [];
    /**
     * A buffer holding the partially computed hash result.
     * @private
     */
    this.buf_ = [];
    /**
     * An array of 80 bytes, each a part of the message to be hashed.  Referred to
     * as the message schedule in the docs.
     * @private
     */
    this.W_ = [];
    /**
     * Contains data needed to pad messages less than 64 bytes.
     * @private
     */
    this.pad_ = [];
    /**
     * @private {number}
     */
    this.inbuf_ = 0;
    /**
     * @private {number}
     */
    this.total_ = 0;
    this.blockSize = 512 / 8;
    this.pad_[0] = 128;
    for (var i = 1; i < this.blockSize; ++i) {
      this.pad_[i] = 0;
    }
    this.reset();
  }
  return _createClass(Sha1, [{
    key: "reset",
    value: function reset() {
      this.chain_[0] = 0x67452301;
      this.chain_[1] = 0xefcdab89;
      this.chain_[2] = 0x98badcfe;
      this.chain_[3] = 0x10325476;
      this.chain_[4] = 0xc3d2e1f0;
      this.inbuf_ = 0;
      this.total_ = 0;
    }
    /**
     * Internal compress helper function.
     * @param buf Block to compress.
     * @param offset Offset of the block in the buffer.
     * @private
     */
  }, {
    key: "compress_",
    value: function compress_(buf, offset) {
      if (!offset) {
        offset = 0;
      }
      var W = this.W_;
      // get 16 big endian words
      if (typeof buf === 'string') {
        for (var i = 0; i < 16; i++) {
          // TODO(user): [bug 8140122] Recent versions of Safari for Mac OS and iOS
          // have a bug that turns the post-increment ++ operator into pre-increment
          // during JIT compilation.  We have code that depends heavily on SHA-1 for
          // correctness and which is affected by this bug, so I've removed all uses
          // of post-increment ++ in which the result value is used.  We can revert
          // this change once the Safari bug
          // (https://bugs.webkit.org/show_bug.cgi?id=109036) has been fixed and
          // most clients have been updated.
          W[i] = buf.charCodeAt(offset) << 24 | buf.charCodeAt(offset + 1) << 16 | buf.charCodeAt(offset + 2) << 8 | buf.charCodeAt(offset + 3);
          offset += 4;
        }
      } else {
        for (var _i5 = 0; _i5 < 16; _i5++) {
          W[_i5] = buf[offset] << 24 | buf[offset + 1] << 16 | buf[offset + 2] << 8 | buf[offset + 3];
          offset += 4;
        }
      }
      // expand to 80 words
      for (var _i6 = 16; _i6 < 80; _i6++) {
        var t = W[_i6 - 3] ^ W[_i6 - 8] ^ W[_i6 - 14] ^ W[_i6 - 16];
        W[_i6] = (t << 1 | t >>> 31) & 0xffffffff;
      }
      var a = this.chain_[0];
      var b = this.chain_[1];
      var c = this.chain_[2];
      var d = this.chain_[3];
      var e = this.chain_[4];
      var f, k;
      // TODO(user): Try to unroll this loop to speed up the computation.
      for (var _i7 = 0; _i7 < 80; _i7++) {
        if (_i7 < 40) {
          if (_i7 < 20) {
            f = d ^ b & (c ^ d);
            k = 0x5a827999;
          } else {
            f = b ^ c ^ d;
            k = 0x6ed9eba1;
          }
        } else {
          if (_i7 < 60) {
            f = b & c | d & (b | c);
            k = 0x8f1bbcdc;
          } else {
            f = b ^ c ^ d;
            k = 0xca62c1d6;
          }
        }
        var _t = (a << 5 | a >>> 27) + f + e + k + W[_i7] & 0xffffffff;
        e = d;
        d = c;
        c = (b << 30 | b >>> 2) & 0xffffffff;
        b = a;
        a = _t;
      }
      this.chain_[0] = this.chain_[0] + a & 0xffffffff;
      this.chain_[1] = this.chain_[1] + b & 0xffffffff;
      this.chain_[2] = this.chain_[2] + c & 0xffffffff;
      this.chain_[3] = this.chain_[3] + d & 0xffffffff;
      this.chain_[4] = this.chain_[4] + e & 0xffffffff;
    }
  }, {
    key: "update",
    value: function update(bytes, length) {
      // TODO(johnlenz): tighten the function signature and remove this check
      if (bytes == null) {
        return;
      }
      if (length === undefined) {
        length = bytes.length;
      }
      var lengthMinusBlock = length - this.blockSize;
      var n = 0;
      // Using local instead of member variables gives ~5% speedup on Firefox 16.
      var buf = this.buf_;
      var inbuf = this.inbuf_;
      // The outer while loop should execute at most twice.
      while (n < length) {
        // When we have no data in the block to top up, we can directly process the
        // input buffer (assuming it contains sufficient data). This gives ~25%
        // speedup on Chrome 23 and ~15% speedup on Firefox 16, but requires that
        // the data is provided in large chunks (or in multiples of 64 bytes).
        if (inbuf === 0) {
          while (n <= lengthMinusBlock) {
            this.compress_(bytes, n);
            n += this.blockSize;
          }
        }
        if (typeof bytes === 'string') {
          while (n < length) {
            buf[inbuf] = bytes.charCodeAt(n);
            ++inbuf;
            ++n;
            if (inbuf === this.blockSize) {
              this.compress_(buf);
              inbuf = 0;
              // Jump to the outer loop so we use the full-block optimization.
              break;
            }
          }
        } else {
          while (n < length) {
            buf[inbuf] = bytes[n];
            ++inbuf;
            ++n;
            if (inbuf === this.blockSize) {
              this.compress_(buf);
              inbuf = 0;
              // Jump to the outer loop so we use the full-block optimization.
              break;
            }
          }
        }
      }
      this.inbuf_ = inbuf;
      this.total_ += length;
    }
    /** @override */
  }, {
    key: "digest",
    value: function digest() {
      var digest = [];
      var totalBits = this.total_ * 8;
      // Add pad 0x80 0x00*.
      if (this.inbuf_ < 56) {
        this.update(this.pad_, 56 - this.inbuf_);
      } else {
        this.update(this.pad_, this.blockSize - (this.inbuf_ - 56));
      }
      // Add # bits.
      for (var i = this.blockSize - 1; i >= 56; i--) {
        this.buf_[i] = totalBits & 255;
        totalBits /= 256; // Don't use bit-shifting here!
      }
      this.compress_(this.buf_);
      var n = 0;
      for (var _i8 = 0; _i8 < 5; _i8++) {
        for (var j = 24; j >= 0; j -= 8) {
          digest[n] = this.chain_[_i8] >> j & 255;
          ++n;
        }
      }
      return digest;
    }
  }]);
}();
/**
 * Helper to make a Subscribe function (just like Promise helps make a
 * Thenable).
 *
 * @param executor Function which can make calls to a single Observer
 *     as a proxy.
 * @param onNoObservers Callback when count of Observers goes to zero.
 */
function createSubscribe(executor, onNoObservers) {
  var proxy = new ObserverProxy(executor, onNoObservers);
  return proxy.subscribe.bind(proxy);
}
/**
 * Implement fan-out for any number of Observers attached via a subscribe
 * function.
 */
var ObserverProxy = /*#__PURE__*/function () {
  /**
   * @param executor Function which can make calls to a single Observer
   *     as a proxy.
   * @param onNoObservers Callback when count of Observers goes to zero.
   */
  function ObserverProxy(executor, onNoObservers) {
    var _this5 = this;
    _classCallCheck(this, ObserverProxy);
    this.observers = [];
    this.unsubscribes = [];
    this.observerCount = 0;
    // Micro-task scheduling by calling task.then().
    this.task = Promise.resolve();
    this.finalized = false;
    this.onNoObservers = onNoObservers;
    // Call the executor asynchronously so subscribers that are called
    // synchronously after the creation of the subscribe function
    // can still receive the very first value generated in the executor.
    this.task.then(function () {
      executor(_this5);
    }).catch(function (e) {
      _this5.error(e);
    });
  }
  return _createClass(ObserverProxy, [{
    key: "next",
    value: function next(value) {
      this.forEachObserver(function (observer) {
        observer.next(value);
      });
    }
  }, {
    key: "error",
    value: function error(_error) {
      this.forEachObserver(function (observer) {
        observer.error(_error);
      });
      this.close(_error);
    }
  }, {
    key: "complete",
    value: function complete() {
      this.forEachObserver(function (observer) {
        observer.complete();
      });
      this.close();
    }
    /**
     * Subscribe function that can be used to add an Observer to the fan-out list.
     *
     * - We require that no event is sent to a subscriber synchronously to their
     *   call to subscribe().
     */
  }, {
    key: "subscribe",
    value: function subscribe(nextOrObserver, error, complete) {
      var _this6 = this;
      var observer;
      if (nextOrObserver === undefined && error === undefined && complete === undefined) {
        throw new Error('Missing Observer.');
      }
      // Assemble an Observer object when passed as callback functions.
      if (implementsAnyMethods(nextOrObserver, ['next', 'error', 'complete'])) {
        observer = nextOrObserver;
      } else {
        observer = {
          next: nextOrObserver,
          error: error,
          complete: complete
        };
      }
      if (observer.next === undefined) {
        observer.next = noop;
      }
      if (observer.error === undefined) {
        observer.error = noop;
      }
      if (observer.complete === undefined) {
        observer.complete = noop;
      }
      var unsub = this.unsubscribeOne.bind(this, this.observers.length);
      // Attempt to subscribe to a terminated Observable - we
      // just respond to the Observer with the final error or complete
      // event.
      if (this.finalized) {
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        this.task.then(function () {
          try {
            if (_this6.finalError) {
              observer.error(_this6.finalError);
            } else {
              observer.complete();
            }
          } catch (e) {
            // nothing
          }
          return;
        });
      }
      this.observers.push(observer);
      return unsub;
    }
    // Unsubscribe is synchronous - we guarantee that no events are sent to
    // any unsubscribed Observer.
  }, {
    key: "unsubscribeOne",
    value: function unsubscribeOne(i) {
      if (this.observers === undefined || this.observers[i] === undefined) {
        return;
      }
      delete this.observers[i];
      this.observerCount -= 1;
      if (this.observerCount === 0 && this.onNoObservers !== undefined) {
        this.onNoObservers(this);
      }
    }
  }, {
    key: "forEachObserver",
    value: function forEachObserver(fn) {
      if (this.finalized) {
        // Already closed by previous event....just eat the additional values.
        return;
      }
      // Since sendOne calls asynchronously - there is no chance that
      // this.observers will become undefined.
      for (var i = 0; i < this.observers.length; i++) {
        this.sendOne(i, fn);
      }
    }
    // Call the Observer via one of it's callback function. We are careful to
    // confirm that the observe has not been unsubscribed since this asynchronous
    // function had been queued.
  }, {
    key: "sendOne",
    value: function sendOne(i, fn) {
      var _this7 = this;
      // Execute the callback asynchronously
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      this.task.then(function () {
        if (_this7.observers !== undefined && _this7.observers[i] !== undefined) {
          try {
            fn(_this7.observers[i]);
          } catch (e) {
            // Ignore exceptions raised in Observers or missing methods of an
            // Observer.
            // Log error to console. b/31404806
            if (typeof console !== 'undefined' && console.error) {
              console.error(e);
            }
          }
        }
      });
    }
  }, {
    key: "close",
    value: function close(err) {
      var _this8 = this;
      if (this.finalized) {
        return;
      }
      this.finalized = true;
      if (err !== undefined) {
        this.finalError = err;
      }
      // Proxy is no longer needed - garbage collect references
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      this.task.then(function () {
        _this8.observers = undefined;
        _this8.onNoObservers = undefined;
      });
    }
  }]);
}();
/** Turn synchronous function into one called asynchronously. */
// eslint-disable-next-line @typescript-eslint/ban-types
function async(fn, onError) {
  return function () {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    Promise.resolve(true).then(function () {
      fn.apply(void 0, args);
    }).catch(function (error) {
      if (onError) {
        onError(error);
      }
    });
  };
}
/**
 * Return true if the object passed in implements any of the named methods.
 */
function implementsAnyMethods(obj, methods) {
  if (_typeof(obj) !== 'object' || obj === null) {
    return false;
  }
  var _iterator = _createForOfIteratorHelper(methods),
    _step;
  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var method = _step.value;
      if (method in obj && typeof obj[method] === 'function') {
        return true;
      }
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
  return false;
}
function noop() {
  // do nothing
}

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Check to make sure the appropriate number of arguments are provided for a public function.
 * Throws an error if it fails.
 *
 * @param fnName The function name
 * @param minCount The minimum number of arguments to allow for the function call
 * @param maxCount The maximum number of argument to allow for the function call
 * @param argCount The actual number of arguments provided.
 */
var validateArgCount = exports.validateArgCount = function validateArgCount(fnName, minCount, maxCount, argCount) {
  var argError;
  if (argCount < minCount) {
    argError = 'at least ' + minCount;
  } else if (argCount > maxCount) {
    argError = maxCount === 0 ? 'none' : 'no more than ' + maxCount;
  }
  if (argError) {
    var error = fnName + ' failed: Was called with ' + argCount + (argCount === 1 ? ' argument.' : ' arguments.') + ' Expects ' + argError + '.';
    throw new Error(error);
  }
};
/**
 * Generates a string to prefix an error message about failed argument validation
 *
 * @param fnName The function name
 * @param argName The name of the argument
 * @return The prefix to add to the error thrown for validation.
 */
function errorPrefix(fnName, argName) {
  return "".concat(fnName, " failed: ").concat(argName, " argument ");
}
/**
 * @param fnName
 * @param argumentNumber
 * @param namespace
 * @param optional
 */
function validateNamespace(fnName, namespace, optional) {
  if (optional && !namespace) {
    return;
  }
  if (typeof namespace !== 'string') {
    //TODO: I should do more validation here. We only allow certain chars in namespaces.
    throw new Error(errorPrefix(fnName, 'namespace') + 'must be a valid firebase namespace.');
  }
}
function validateCallback(fnName, argumentName,
// eslint-disable-next-line @typescript-eslint/ban-types
callback, optional) {
  if (optional && !callback) {
    return;
  }
  if (typeof callback !== 'function') {
    throw new Error(errorPrefix(fnName, argumentName) + 'must be a valid function.');
  }
}
function validateContextObject(fnName, argumentName, context, optional) {
  if (optional && !context) {
    return;
  }
  if (_typeof(context) !== 'object' || context === null) {
    throw new Error(errorPrefix(fnName, argumentName) + 'must be a valid context object.');
  }
}

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
// Code originally came from goog.crypt.stringToUtf8ByteArray, but for some reason they
// automatically replaced '\r\n' with '\n', and they didn't handle surrogate pairs,
// so it's been modified.
// Note that not all Unicode characters appear as single characters in JavaScript strings.
// fromCharCode returns the UTF-16 encoding of a character - so some Unicode characters
// use 2 characters in JavaScript.  All 4-byte UTF-8 characters begin with a first
// character in the range 0xD800 - 0xDBFF (the first character of a so-called surrogate
// pair).
// See http://www.ecma-international.org/ecma-262/5.1/#sec-15.1.3
/**
 * @param {string} str
 * @return {Array}
 */
var stringToByteArray = exports.stringToByteArray = function stringToByteArray(str) {
  var out = [];
  var p = 0;
  for (var i = 0; i < str.length; i++) {
    var c = str.charCodeAt(i);
    // Is this the lead surrogate in a surrogate pair?
    if (c >= 0xd800 && c <= 0xdbff) {
      var high = c - 0xd800; // the high 10 bits.
      i++;
      assert(i < str.length, 'Surrogate pair missing trail surrogate.');
      var low = str.charCodeAt(i) - 0xdc00; // the low 10 bits.
      c = 0x10000 + (high << 10) + low;
    }
    if (c < 128) {
      out[p++] = c;
    } else if (c < 2048) {
      out[p++] = c >> 6 | 192;
      out[p++] = c & 63 | 128;
    } else if (c < 65536) {
      out[p++] = c >> 12 | 224;
      out[p++] = c >> 6 & 63 | 128;
      out[p++] = c & 63 | 128;
    } else {
      out[p++] = c >> 18 | 240;
      out[p++] = c >> 12 & 63 | 128;
      out[p++] = c >> 6 & 63 | 128;
      out[p++] = c & 63 | 128;
    }
  }
  return out;
};
/**
 * Calculate length without actually converting; useful for doing cheaper validation.
 * @param {string} str
 * @return {number}
 */
var stringLength = exports.stringLength = function stringLength(str) {
  var p = 0;
  for (var i = 0; i < str.length; i++) {
    var c = str.charCodeAt(i);
    if (c < 128) {
      p++;
    } else if (c < 2048) {
      p += 2;
    } else if (c >= 0xd800 && c <= 0xdbff) {
      // Lead surrogate of a surrogate pair.  The pair together will take 4 bytes to represent.
      p += 4;
      i++; // skip trail surrogate.
    } else {
      p += 3;
    }
  }
  return p;
};

/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * The amount of milliseconds to exponentially increase.
 */
var DEFAULT_INTERVAL_MILLIS = 1000;
/**
 * The factor to backoff by.
 * Should be a number greater than 1.
 */
var DEFAULT_BACKOFF_FACTOR = 2;
/**
 * The maximum milliseconds to increase to.
 *
 * <p>Visible for testing
 */
var MAX_VALUE_MILLIS = exports.MAX_VALUE_MILLIS = 4 * 60 * 60 * 1000; // Four hours, like iOS and Android.
/**
 * The percentage of backoff time to randomize by.
 * See
 * http://go/safe-client-behavior#step-1-determine-the-appropriate-retry-interval-to-handle-spike-traffic
 * for context.
 *
 * <p>Visible for testing
 */
var RANDOM_FACTOR = exports.RANDOM_FACTOR = 0.5;
/**
 * Based on the backoff method from
 * https://github.com/google/closure-library/blob/master/closure/goog/math/exponentialbackoff.js.
 * Extracted here so we don't need to pass metadata and a stateful ExponentialBackoff object around.
 */
function calculateBackoffMillis(backoffCount) {
  var intervalMillis = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : DEFAULT_INTERVAL_MILLIS;
  var backoffFactor = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : DEFAULT_BACKOFF_FACTOR;
  // Calculates an exponentially increasing value.
  // Deviation: calculates value from count and a constant interval, so we only need to save value
  // and count to restore state.
  var currBaseValue = intervalMillis * Math.pow(backoffFactor, backoffCount);
  // A random "fuzz" to avoid waves of retries.
  // Deviation: randomFactor is required.
  var randomWait = Math.round(
  // A fraction of the backoff value to add/subtract.
  // Deviation: changes multiplication order to improve readability.
  RANDOM_FACTOR * currBaseValue * (
  // A random float (rounded to int by Math.round above) in the range [-1, 1]. Determines
  // if we add or subtract.
  Math.random() - 0.5) * 2);
  // Limits backoff to max to avoid effectively permanent backoff.
  return Math.min(MAX_VALUE_MILLIS, currBaseValue + randomWait);
}

/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Provide English ordinal letters after a number
 */
function ordinal(i) {
  if (!Number.isFinite(i)) {
    return "".concat(i);
  }
  return i + indicator(i);
}
function indicator(i) {
  i = Math.abs(i);
  var cent = i % 100;
  if (cent >= 10 && cent <= 20) {
    return 'th';
  }
  var dec = i % 10;
  if (dec === 1) {
    return 'st';
  }
  if (dec === 2) {
    return 'nd';
  }
  if (dec === 3) {
    return 'rd';
  }
  return 'th';
}

/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function getModularInstance(service) {
  if (service && service._delegate) {
    return service._delegate;
  } else {
    return service;
  }
}
},{"./postinstall.mjs":"../node_modules/@firebase/util/dist/postinstall.mjs","process":"../node_modules/process/browser.js"}],"../node_modules/@firebase/component/dist/esm/index.esm2017.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Provider = exports.ComponentContainer = exports.Component = void 0;
var _util = require("@firebase/util");
/**
 * Component for service name T, e.g. `auth`, `auth-internal`
 */
class Component {
  /**
   *
   * @param name The public service name, e.g. app, auth, firestore, database
   * @param instanceFactory Service factory responsible for creating the public interface
   * @param type whether the service provided by the component is public or private
   */
  constructor(name, instanceFactory, type) {
    this.name = name;
    this.instanceFactory = instanceFactory;
    this.type = type;
    this.multipleInstances = false;
    /**
     * Properties to be added to the service namespace
     */
    this.serviceProps = {};
    this.instantiationMode = "LAZY" /* InstantiationMode.LAZY */;
    this.onInstanceCreated = null;
  }
  setInstantiationMode(mode) {
    this.instantiationMode = mode;
    return this;
  }
  setMultipleInstances(multipleInstances) {
    this.multipleInstances = multipleInstances;
    return this;
  }
  setServiceProps(props) {
    this.serviceProps = props;
    return this;
  }
  setInstanceCreatedCallback(callback) {
    this.onInstanceCreated = callback;
    return this;
  }
}

/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
exports.Component = Component;
const DEFAULT_ENTRY_NAME = '[DEFAULT]';

/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Provider for instance for service name T, e.g. 'auth', 'auth-internal'
 * NameServiceMapping[T] is an alias for the type of the instance
 */
class Provider {
  constructor(name, container) {
    this.name = name;
    this.container = container;
    this.component = null;
    this.instances = new Map();
    this.instancesDeferred = new Map();
    this.instancesOptions = new Map();
    this.onInitCallbacks = new Map();
  }
  /**
   * @param identifier A provider can provide multiple instances of a service
   * if this.component.multipleInstances is true.
   */
  get(identifier) {
    // if multipleInstances is not supported, use the default name
    const normalizedIdentifier = this.normalizeInstanceIdentifier(identifier);
    if (!this.instancesDeferred.has(normalizedIdentifier)) {
      const deferred = new _util.Deferred();
      this.instancesDeferred.set(normalizedIdentifier, deferred);
      if (this.isInitialized(normalizedIdentifier) || this.shouldAutoInitialize()) {
        // initialize the service if it can be auto-initialized
        try {
          const instance = this.getOrInitializeService({
            instanceIdentifier: normalizedIdentifier
          });
          if (instance) {
            deferred.resolve(instance);
          }
        } catch (e) {
          // when the instance factory throws an exception during get(), it should not cause
          // a fatal error. We just return the unresolved promise in this case.
        }
      }
    }
    return this.instancesDeferred.get(normalizedIdentifier).promise;
  }
  getImmediate(options) {
    var _a;
    // if multipleInstances is not supported, use the default name
    const normalizedIdentifier = this.normalizeInstanceIdentifier(options === null || options === void 0 ? void 0 : options.identifier);
    const optional = (_a = options === null || options === void 0 ? void 0 : options.optional) !== null && _a !== void 0 ? _a : false;
    if (this.isInitialized(normalizedIdentifier) || this.shouldAutoInitialize()) {
      try {
        return this.getOrInitializeService({
          instanceIdentifier: normalizedIdentifier
        });
      } catch (e) {
        if (optional) {
          return null;
        } else {
          throw e;
        }
      }
    } else {
      // In case a component is not initialized and should/cannot be auto-initialized at the moment, return null if the optional flag is set, or throw
      if (optional) {
        return null;
      } else {
        throw Error(`Service ${this.name} is not available`);
      }
    }
  }
  getComponent() {
    return this.component;
  }
  setComponent(component) {
    if (component.name !== this.name) {
      throw Error(`Mismatching Component ${component.name} for Provider ${this.name}.`);
    }
    if (this.component) {
      throw Error(`Component for ${this.name} has already been provided`);
    }
    this.component = component;
    // return early without attempting to initialize the component if the component requires explicit initialization (calling `Provider.initialize()`)
    if (!this.shouldAutoInitialize()) {
      return;
    }
    // if the service is eager, initialize the default instance
    if (isComponentEager(component)) {
      try {
        this.getOrInitializeService({
          instanceIdentifier: DEFAULT_ENTRY_NAME
        });
      } catch (e) {
        // when the instance factory for an eager Component throws an exception during the eager
        // initialization, it should not cause a fatal error.
        // TODO: Investigate if we need to make it configurable, because some component may want to cause
        // a fatal error in this case?
      }
    }
    // Create service instances for the pending promises and resolve them
    // NOTE: if this.multipleInstances is false, only the default instance will be created
    // and all promises with resolve with it regardless of the identifier.
    for (const [instanceIdentifier, instanceDeferred] of this.instancesDeferred.entries()) {
      const normalizedIdentifier = this.normalizeInstanceIdentifier(instanceIdentifier);
      try {
        // `getOrInitializeService()` should always return a valid instance since a component is guaranteed. use ! to make typescript happy.
        const instance = this.getOrInitializeService({
          instanceIdentifier: normalizedIdentifier
        });
        instanceDeferred.resolve(instance);
      } catch (e) {
        // when the instance factory throws an exception, it should not cause
        // a fatal error. We just leave the promise unresolved.
      }
    }
  }
  clearInstance(identifier = DEFAULT_ENTRY_NAME) {
    this.instancesDeferred.delete(identifier);
    this.instancesOptions.delete(identifier);
    this.instances.delete(identifier);
  }
  // app.delete() will call this method on every provider to delete the services
  // TODO: should we mark the provider as deleted?
  async delete() {
    const services = Array.from(this.instances.values());
    await Promise.all([...services.filter(service => 'INTERNAL' in service) // legacy services
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .map(service => service.INTERNAL.delete()), ...services.filter(service => '_delete' in service) // modularized services
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .map(service => service._delete())]);
  }
  isComponentSet() {
    return this.component != null;
  }
  isInitialized(identifier = DEFAULT_ENTRY_NAME) {
    return this.instances.has(identifier);
  }
  getOptions(identifier = DEFAULT_ENTRY_NAME) {
    return this.instancesOptions.get(identifier) || {};
  }
  initialize(opts = {}) {
    const {
      options = {}
    } = opts;
    const normalizedIdentifier = this.normalizeInstanceIdentifier(opts.instanceIdentifier);
    if (this.isInitialized(normalizedIdentifier)) {
      throw Error(`${this.name}(${normalizedIdentifier}) has already been initialized`);
    }
    if (!this.isComponentSet()) {
      throw Error(`Component ${this.name} has not been registered yet`);
    }
    const instance = this.getOrInitializeService({
      instanceIdentifier: normalizedIdentifier,
      options
    });
    // resolve any pending promise waiting for the service instance
    for (const [instanceIdentifier, instanceDeferred] of this.instancesDeferred.entries()) {
      const normalizedDeferredIdentifier = this.normalizeInstanceIdentifier(instanceIdentifier);
      if (normalizedIdentifier === normalizedDeferredIdentifier) {
        instanceDeferred.resolve(instance);
      }
    }
    return instance;
  }
  /**
   *
   * @param callback - a function that will be invoked  after the provider has been initialized by calling provider.initialize().
   * The function is invoked SYNCHRONOUSLY, so it should not execute any longrunning tasks in order to not block the program.
   *
   * @param identifier An optional instance identifier
   * @returns a function to unregister the callback
   */
  onInit(callback, identifier) {
    var _a;
    const normalizedIdentifier = this.normalizeInstanceIdentifier(identifier);
    const existingCallbacks = (_a = this.onInitCallbacks.get(normalizedIdentifier)) !== null && _a !== void 0 ? _a : new Set();
    existingCallbacks.add(callback);
    this.onInitCallbacks.set(normalizedIdentifier, existingCallbacks);
    const existingInstance = this.instances.get(normalizedIdentifier);
    if (existingInstance) {
      callback(existingInstance, normalizedIdentifier);
    }
    return () => {
      existingCallbacks.delete(callback);
    };
  }
  /**
   * Invoke onInit callbacks synchronously
   * @param instance the service instance`
   */
  invokeOnInitCallbacks(instance, identifier) {
    const callbacks = this.onInitCallbacks.get(identifier);
    if (!callbacks) {
      return;
    }
    for (const callback of callbacks) {
      try {
        callback(instance, identifier);
      } catch (_a) {
        // ignore errors in the onInit callback
      }
    }
  }
  getOrInitializeService({
    instanceIdentifier,
    options = {}
  }) {
    let instance = this.instances.get(instanceIdentifier);
    if (!instance && this.component) {
      instance = this.component.instanceFactory(this.container, {
        instanceIdentifier: normalizeIdentifierForFactory(instanceIdentifier),
        options
      });
      this.instances.set(instanceIdentifier, instance);
      this.instancesOptions.set(instanceIdentifier, options);
      /**
       * Invoke onInit listeners.
       * Note this.component.onInstanceCreated is different, which is used by the component creator,
       * while onInit listeners are registered by consumers of the provider.
       */
      this.invokeOnInitCallbacks(instance, instanceIdentifier);
      /**
       * Order is important
       * onInstanceCreated() should be called after this.instances.set(instanceIdentifier, instance); which
       * makes `isInitialized()` return true.
       */
      if (this.component.onInstanceCreated) {
        try {
          this.component.onInstanceCreated(this.container, instanceIdentifier, instance);
        } catch (_a) {
          // ignore errors in the onInstanceCreatedCallback
        }
      }
    }
    return instance || null;
  }
  normalizeInstanceIdentifier(identifier = DEFAULT_ENTRY_NAME) {
    if (this.component) {
      return this.component.multipleInstances ? identifier : DEFAULT_ENTRY_NAME;
    } else {
      return identifier; // assume multiple instances are supported before the component is provided.
    }
  }
  shouldAutoInitialize() {
    return !!this.component && this.component.instantiationMode !== "EXPLICIT" /* InstantiationMode.EXPLICIT */;
  }
}
// undefined should be passed to the service factory for the default instance
exports.Provider = Provider;
function normalizeIdentifierForFactory(identifier) {
  return identifier === DEFAULT_ENTRY_NAME ? undefined : identifier;
}
function isComponentEager(component) {
  return component.instantiationMode === "EAGER" /* InstantiationMode.EAGER */;
}

/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * ComponentContainer that provides Providers for service name T, e.g. `auth`, `auth-internal`
 */
class ComponentContainer {
  constructor(name) {
    this.name = name;
    this.providers = new Map();
  }
  /**
   *
   * @param component Component being added
   * @param overwrite When a component with the same name has already been registered,
   * if overwrite is true: overwrite the existing component with the new component and create a new
   * provider with the new component. It can be useful in tests where you want to use different mocks
   * for different tests.
   * if overwrite is false: throw an exception
   */
  addComponent(component) {
    const provider = this.getProvider(component.name);
    if (provider.isComponentSet()) {
      throw new Error(`Component ${component.name} has already been registered with ${this.name}`);
    }
    provider.setComponent(component);
  }
  addOrOverwriteComponent(component) {
    const provider = this.getProvider(component.name);
    if (provider.isComponentSet()) {
      // delete the existing provider from the container, so we can register the new component
      this.providers.delete(component.name);
    }
    this.addComponent(component);
  }
  /**
   * getProvider provides a type safe interface where it can only be called with a field name
   * present in NameServiceMapping interface.
   *
   * Firebase SDKs providing services should extend NameServiceMapping interface to register
   * themselves.
   */
  getProvider(name) {
    if (this.providers.has(name)) {
      return this.providers.get(name);
    }
    // create a Provider for a service that hasn't registered with Firebase
    const provider = new Provider(name, this);
    this.providers.set(name, provider);
    return provider;
  }
  getProviders() {
    return Array.from(this.providers.values());
  }
}
exports.ComponentContainer = ComponentContainer;
},{"@firebase/util":"../node_modules/@firebase/util/dist/index.esm2017.js"}],"../node_modules/@firebase/logger/dist/esm/index.esm2017.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Logger = exports.LogLevel = void 0;
exports.setLogLevel = setLogLevel;
exports.setUserLogHandler = setUserLogHandler;
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * A container for all of the Logger instances
 */
const instances = [];
/**
 * The JS SDK supports 5 log levels and also allows a user the ability to
 * silence the logs altogether.
 *
 * The order is a follows:
 * DEBUG < VERBOSE < INFO < WARN < ERROR
 *
 * All of the log types above the current log level will be captured (i.e. if
 * you set the log level to `INFO`, errors will still be logged, but `DEBUG` and
 * `VERBOSE` logs will not)
 */
var LogLevel;
(function (LogLevel) {
  LogLevel[LogLevel["DEBUG"] = 0] = "DEBUG";
  LogLevel[LogLevel["VERBOSE"] = 1] = "VERBOSE";
  LogLevel[LogLevel["INFO"] = 2] = "INFO";
  LogLevel[LogLevel["WARN"] = 3] = "WARN";
  LogLevel[LogLevel["ERROR"] = 4] = "ERROR";
  LogLevel[LogLevel["SILENT"] = 5] = "SILENT";
})(LogLevel || (exports.LogLevel = LogLevel = {}));
const levelStringToEnum = {
  'debug': LogLevel.DEBUG,
  'verbose': LogLevel.VERBOSE,
  'info': LogLevel.INFO,
  'warn': LogLevel.WARN,
  'error': LogLevel.ERROR,
  'silent': LogLevel.SILENT
};
/**
 * The default log level
 */
const defaultLogLevel = LogLevel.INFO;
/**
 * By default, `console.debug` is not displayed in the developer console (in
 * chrome). To avoid forcing users to have to opt-in to these logs twice
 * (i.e. once for firebase, and once in the console), we are sending `DEBUG`
 * logs to the `console.log` function.
 */
const ConsoleMethod = {
  [LogLevel.DEBUG]: 'log',
  [LogLevel.VERBOSE]: 'log',
  [LogLevel.INFO]: 'info',
  [LogLevel.WARN]: 'warn',
  [LogLevel.ERROR]: 'error'
};
/**
 * The default log handler will forward DEBUG, VERBOSE, INFO, WARN, and ERROR
 * messages on to their corresponding console counterparts (if the log method
 * is supported by the current log level)
 */
const defaultLogHandler = (instance, logType, ...args) => {
  if (logType < instance.logLevel) {
    return;
  }
  const now = new Date().toISOString();
  const method = ConsoleMethod[logType];
  if (method) {
    console[method](`[${now}]  ${instance.name}:`, ...args);
  } else {
    throw new Error(`Attempted to log a message with an invalid logType (value: ${logType})`);
  }
};
class Logger {
  /**
   * Gives you an instance of a Logger to capture messages according to
   * Firebase's logging scheme.
   *
   * @param name The name that the logs will be associated with
   */
  constructor(name) {
    this.name = name;
    /**
     * The log level of the given Logger instance.
     */
    this._logLevel = defaultLogLevel;
    /**
     * The main (internal) log handler for the Logger instance.
     * Can be set to a new function in internal package code but not by user.
     */
    this._logHandler = defaultLogHandler;
    /**
     * The optional, additional, user-defined log handler for the Logger instance.
     */
    this._userLogHandler = null;
    /**
     * Capture the current instance for later use
     */
    instances.push(this);
  }
  get logLevel() {
    return this._logLevel;
  }
  set logLevel(val) {
    if (!(val in LogLevel)) {
      throw new TypeError(`Invalid value "${val}" assigned to \`logLevel\``);
    }
    this._logLevel = val;
  }
  // Workaround for setter/getter having to be the same type.
  setLogLevel(val) {
    this._logLevel = typeof val === 'string' ? levelStringToEnum[val] : val;
  }
  get logHandler() {
    return this._logHandler;
  }
  set logHandler(val) {
    if (typeof val !== 'function') {
      throw new TypeError('Value assigned to `logHandler` must be a function');
    }
    this._logHandler = val;
  }
  get userLogHandler() {
    return this._userLogHandler;
  }
  set userLogHandler(val) {
    this._userLogHandler = val;
  }
  /**
   * The functions below are all based on the `console` interface
   */
  debug(...args) {
    this._userLogHandler && this._userLogHandler(this, LogLevel.DEBUG, ...args);
    this._logHandler(this, LogLevel.DEBUG, ...args);
  }
  log(...args) {
    this._userLogHandler && this._userLogHandler(this, LogLevel.VERBOSE, ...args);
    this._logHandler(this, LogLevel.VERBOSE, ...args);
  }
  info(...args) {
    this._userLogHandler && this._userLogHandler(this, LogLevel.INFO, ...args);
    this._logHandler(this, LogLevel.INFO, ...args);
  }
  warn(...args) {
    this._userLogHandler && this._userLogHandler(this, LogLevel.WARN, ...args);
    this._logHandler(this, LogLevel.WARN, ...args);
  }
  error(...args) {
    this._userLogHandler && this._userLogHandler(this, LogLevel.ERROR, ...args);
    this._logHandler(this, LogLevel.ERROR, ...args);
  }
}
exports.Logger = Logger;
function setLogLevel(level) {
  instances.forEach(inst => {
    inst.setLogLevel(level);
  });
}
function setUserLogHandler(logCallback, options) {
  for (const instance of instances) {
    let customLogLevel = null;
    if (options && options.level) {
      customLogLevel = levelStringToEnum[options.level];
    }
    if (logCallback === null) {
      instance.userLogHandler = null;
    } else {
      instance.userLogHandler = (instance, level, ...args) => {
        const message = args.map(arg => {
          if (arg == null) {
            return null;
          } else if (typeof arg === 'string') {
            return arg;
          } else if (typeof arg === 'number' || typeof arg === 'boolean') {
            return arg.toString();
          } else if (arg instanceof Error) {
            return arg.message;
          } else {
            try {
              return JSON.stringify(arg);
            } catch (ignored) {
              return null;
            }
          }
        }).filter(arg => arg).join(' ');
        if (level >= (customLogLevel !== null && customLogLevel !== void 0 ? customLogLevel : instance.logLevel)) {
          logCallback({
            level: LogLevel[level].toLowerCase(),
            message,
            args,
            type: instance.name
          });
        }
      };
    }
  }
}
},{}],"../node_modules/idb/build/wrap-idb-value.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.i = exports.a = void 0;
exports.r = replaceTraps;
exports.u = void 0;
exports.w = wrap;
const instanceOfAny = (object, constructors) => constructors.some(c => object instanceof c);
exports.i = instanceOfAny;
let idbProxyableTypes;
let cursorAdvanceMethods;
// This is a function to prevent it throwing up in node environments.
function getIdbProxyableTypes() {
  return idbProxyableTypes || (idbProxyableTypes = [IDBDatabase, IDBObjectStore, IDBIndex, IDBCursor, IDBTransaction]);
}
// This is a function to prevent it throwing up in node environments.
function getCursorAdvanceMethods() {
  return cursorAdvanceMethods || (cursorAdvanceMethods = [IDBCursor.prototype.advance, IDBCursor.prototype.continue, IDBCursor.prototype.continuePrimaryKey]);
}
const cursorRequestMap = new WeakMap();
const transactionDoneMap = new WeakMap();
const transactionStoreNamesMap = new WeakMap();
const transformCache = new WeakMap();
const reverseTransformCache = exports.a = new WeakMap();
function promisifyRequest(request) {
  const promise = new Promise((resolve, reject) => {
    const unlisten = () => {
      request.removeEventListener('success', success);
      request.removeEventListener('error', error);
    };
    const success = () => {
      resolve(wrap(request.result));
      unlisten();
    };
    const error = () => {
      reject(request.error);
      unlisten();
    };
    request.addEventListener('success', success);
    request.addEventListener('error', error);
  });
  promise.then(value => {
    // Since cursoring reuses the IDBRequest (*sigh*), we cache it for later retrieval
    // (see wrapFunction).
    if (value instanceof IDBCursor) {
      cursorRequestMap.set(value, request);
    }
    // Catching to avoid "Uncaught Promise exceptions"
  }).catch(() => {});
  // This mapping exists in reverseTransformCache but doesn't doesn't exist in transformCache. This
  // is because we create many promises from a single IDBRequest.
  reverseTransformCache.set(promise, request);
  return promise;
}
function cacheDonePromiseForTransaction(tx) {
  // Early bail if we've already created a done promise for this transaction.
  if (transactionDoneMap.has(tx)) return;
  const done = new Promise((resolve, reject) => {
    const unlisten = () => {
      tx.removeEventListener('complete', complete);
      tx.removeEventListener('error', error);
      tx.removeEventListener('abort', error);
    };
    const complete = () => {
      resolve();
      unlisten();
    };
    const error = () => {
      reject(tx.error || new DOMException('AbortError', 'AbortError'));
      unlisten();
    };
    tx.addEventListener('complete', complete);
    tx.addEventListener('error', error);
    tx.addEventListener('abort', error);
  });
  // Cache it for later retrieval.
  transactionDoneMap.set(tx, done);
}
let idbProxyTraps = {
  get(target, prop, receiver) {
    if (target instanceof IDBTransaction) {
      // Special handling for transaction.done.
      if (prop === 'done') return transactionDoneMap.get(target);
      // Polyfill for objectStoreNames because of Edge.
      if (prop === 'objectStoreNames') {
        return target.objectStoreNames || transactionStoreNamesMap.get(target);
      }
      // Make tx.store return the only store in the transaction, or undefined if there are many.
      if (prop === 'store') {
        return receiver.objectStoreNames[1] ? undefined : receiver.objectStore(receiver.objectStoreNames[0]);
      }
    }
    // Else transform whatever we get back.
    return wrap(target[prop]);
  },
  set(target, prop, value) {
    target[prop] = value;
    return true;
  },
  has(target, prop) {
    if (target instanceof IDBTransaction && (prop === 'done' || prop === 'store')) {
      return true;
    }
    return prop in target;
  }
};
function replaceTraps(callback) {
  idbProxyTraps = callback(idbProxyTraps);
}
function wrapFunction(func) {
  // Due to expected object equality (which is enforced by the caching in `wrap`), we
  // only create one new func per func.
  // Edge doesn't support objectStoreNames (booo), so we polyfill it here.
  if (func === IDBDatabase.prototype.transaction && !('objectStoreNames' in IDBTransaction.prototype)) {
    return function (storeNames, ...args) {
      const tx = func.call(unwrap(this), storeNames, ...args);
      transactionStoreNamesMap.set(tx, storeNames.sort ? storeNames.sort() : [storeNames]);
      return wrap(tx);
    };
  }
  // Cursor methods are special, as the behaviour is a little more different to standard IDB. In
  // IDB, you advance the cursor and wait for a new 'success' on the IDBRequest that gave you the
  // cursor. It's kinda like a promise that can resolve with many values. That doesn't make sense
  // with real promises, so each advance methods returns a new promise for the cursor object, or
  // undefined if the end of the cursor has been reached.
  if (getCursorAdvanceMethods().includes(func)) {
    return function (...args) {
      // Calling the original function with the proxy as 'this' causes ILLEGAL INVOCATION, so we use
      // the original object.
      func.apply(unwrap(this), args);
      return wrap(cursorRequestMap.get(this));
    };
  }
  return function (...args) {
    // Calling the original function with the proxy as 'this' causes ILLEGAL INVOCATION, so we use
    // the original object.
    return wrap(func.apply(unwrap(this), args));
  };
}
function transformCachableValue(value) {
  if (typeof value === 'function') return wrapFunction(value);
  // This doesn't return, it just creates a 'done' promise for the transaction,
  // which is later returned for transaction.done (see idbObjectHandler).
  if (value instanceof IDBTransaction) cacheDonePromiseForTransaction(value);
  if (instanceOfAny(value, getIdbProxyableTypes())) return new Proxy(value, idbProxyTraps);
  // Return the same value back if we're not going to transform it.
  return value;
}
function wrap(value) {
  // We sometimes generate multiple promises from a single IDBRequest (eg when cursoring), because
  // IDB is weird and a single IDBRequest can yield many responses, so these can't be cached.
  if (value instanceof IDBRequest) return promisifyRequest(value);
  // If we've already transformed this value before, reuse the transformed value.
  // This is faster, but it also provides object equality.
  if (transformCache.has(value)) return transformCache.get(value);
  const newValue = transformCachableValue(value);
  // Not all types are transformed.
  // These may be primitive types, so they can't be WeakMap keys.
  if (newValue !== value) {
    transformCache.set(value, newValue);
    reverseTransformCache.set(newValue, value);
  }
  return newValue;
}
const unwrap = value => reverseTransformCache.get(value);
exports.u = unwrap;
},{}],"../node_modules/idb/build/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deleteDB = deleteDB;
exports.openDB = openDB;
Object.defineProperty(exports, "unwrap", {
  enumerable: true,
  get: function () {
    return _wrapIdbValue.u;
  }
});
Object.defineProperty(exports, "wrap", {
  enumerable: true,
  get: function () {
    return _wrapIdbValue.w;
  }
});
var _wrapIdbValue = require("./wrap-idb-value.js");
/**
 * Open a database.
 *
 * @param name Name of the database.
 * @param version Schema version.
 * @param callbacks Additional callbacks.
 */
function openDB(name, version, {
  blocked,
  upgrade,
  blocking,
  terminated
} = {}) {
  const request = indexedDB.open(name, version);
  const openPromise = (0, _wrapIdbValue.w)(request);
  if (upgrade) {
    request.addEventListener('upgradeneeded', event => {
      upgrade((0, _wrapIdbValue.w)(request.result), event.oldVersion, event.newVersion, (0, _wrapIdbValue.w)(request.transaction), event);
    });
  }
  if (blocked) {
    request.addEventListener('blocked', event => blocked(
    // Casting due to https://github.com/microsoft/TypeScript-DOM-lib-generator/pull/1405
    event.oldVersion, event.newVersion, event));
  }
  openPromise.then(db => {
    if (terminated) db.addEventListener('close', () => terminated());
    if (blocking) {
      db.addEventListener('versionchange', event => blocking(event.oldVersion, event.newVersion, event));
    }
  }).catch(() => {});
  return openPromise;
}
/**
 * Delete a database.
 *
 * @param name Name of the database.
 */
function deleteDB(name, {
  blocked
} = {}) {
  const request = indexedDB.deleteDatabase(name);
  if (blocked) {
    request.addEventListener('blocked', event => blocked(
    // Casting due to https://github.com/microsoft/TypeScript-DOM-lib-generator/pull/1405
    event.oldVersion, event));
  }
  return (0, _wrapIdbValue.w)(request).then(() => undefined);
}
const readMethods = ['get', 'getKey', 'getAll', 'getAllKeys', 'count'];
const writeMethods = ['put', 'add', 'delete', 'clear'];
const cachedMethods = new Map();
function getMethod(target, prop) {
  if (!(target instanceof IDBDatabase && !(prop in target) && typeof prop === 'string')) {
    return;
  }
  if (cachedMethods.get(prop)) return cachedMethods.get(prop);
  const targetFuncName = prop.replace(/FromIndex$/, '');
  const useIndex = prop !== targetFuncName;
  const isWrite = writeMethods.includes(targetFuncName);
  if (
  // Bail if the target doesn't exist on the target. Eg, getAll isn't in Edge.
  !(targetFuncName in (useIndex ? IDBIndex : IDBObjectStore).prototype) || !(isWrite || readMethods.includes(targetFuncName))) {
    return;
  }
  const method = async function (storeName, ...args) {
    // isWrite ? 'readwrite' : undefined gzipps better, but fails in Edge :(
    const tx = this.transaction(storeName, isWrite ? 'readwrite' : 'readonly');
    let target = tx.store;
    if (useIndex) target = target.index(args.shift());
    // Must reject if op rejects.
    // If it's a write operation, must reject if tx.done rejects.
    // Must reject with op rejection first.
    // Must resolve with op value.
    // Must handle both promises (no unhandled rejections)
    return (await Promise.all([target[targetFuncName](...args), isWrite && tx.done]))[0];
  };
  cachedMethods.set(prop, method);
  return method;
}
(0, _wrapIdbValue.r)(oldTraps => ({
  ...oldTraps,
  get: (target, prop, receiver) => getMethod(target, prop) || oldTraps.get(target, prop, receiver),
  has: (target, prop) => !!getMethod(target, prop) || oldTraps.has(target, prop)
}));
},{"./wrap-idb-value.js":"../node_modules/idb/build/wrap-idb-value.js"}],"../node_modules/@firebase/app/dist/esm/index.esm2017.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "FirebaseError", {
  enumerable: true,
  get: function () {
    return _util.FirebaseError;
  }
});
exports._DEFAULT_ENTRY_NAME = exports.SDK_VERSION = void 0;
exports._addComponent = _addComponent;
exports._addOrOverwriteComponent = _addOrOverwriteComponent;
exports._apps = void 0;
exports._clearComponents = _clearComponents;
exports._components = void 0;
exports._getProvider = _getProvider;
exports._isFirebaseApp = _isFirebaseApp;
exports._isFirebaseServerApp = _isFirebaseServerApp;
exports._registerComponent = _registerComponent;
exports._removeServiceInstance = _removeServiceInstance;
exports._serverApps = void 0;
exports.deleteApp = deleteApp;
exports.getApp = getApp;
exports.getApps = getApps;
exports.initializeApp = initializeApp;
exports.initializeServerApp = initializeServerApp;
exports.onLog = onLog;
exports.registerVersion = registerVersion;
exports.setLogLevel = setLogLevel;
var _component = require("@firebase/component");
var _logger = require("@firebase/logger");
var _util = require("@firebase/util");
var _idb = require("idb");
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class PlatformLoggerServiceImpl {
  constructor(container) {
    this.container = container;
  }
  // In initial implementation, this will be called by installations on
  // auth token refresh, and installations will send this string.
  getPlatformInfoString() {
    const providers = this.container.getProviders();
    // Loop through providers and get library/version pairs from any that are
    // version components.
    return providers.map(provider => {
      if (isVersionServiceProvider(provider)) {
        const service = provider.getImmediate();
        return `${service.library}/${service.version}`;
      } else {
        return null;
      }
    }).filter(logString => logString).join(' ');
  }
}
/**
 *
 * @param provider check if this provider provides a VersionService
 *
 * NOTE: Using Provider<'app-version'> is a hack to indicate that the provider
 * provides VersionService. The provider is not necessarily a 'app-version'
 * provider.
 */
function isVersionServiceProvider(provider) {
  const component = provider.getComponent();
  return (component === null || component === void 0 ? void 0 : component.type) === "VERSION" /* ComponentType.VERSION */;
}
const name$q = "@firebase/app";
const version$1 = "0.13.0";

/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const logger = new _logger.Logger('@firebase/app');
const name$p = "@firebase/app-compat";
const name$o = "@firebase/analytics-compat";
const name$n = "@firebase/analytics";
const name$m = "@firebase/app-check-compat";
const name$l = "@firebase/app-check";
const name$k = "@firebase/auth";
const name$j = "@firebase/auth-compat";
const name$i = "@firebase/database";
const name$h = "@firebase/data-connect";
const name$g = "@firebase/database-compat";
const name$f = "@firebase/functions";
const name$e = "@firebase/functions-compat";
const name$d = "@firebase/installations";
const name$c = "@firebase/installations-compat";
const name$b = "@firebase/messaging";
const name$a = "@firebase/messaging-compat";
const name$9 = "@firebase/performance";
const name$8 = "@firebase/performance-compat";
const name$7 = "@firebase/remote-config";
const name$6 = "@firebase/remote-config-compat";
const name$5 = "@firebase/storage";
const name$4 = "@firebase/storage-compat";
const name$3 = "@firebase/firestore";
const name$2 = "@firebase/ai";
const name$1 = "@firebase/firestore-compat";
const name = "firebase";
const version = "11.8.0";

/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * The default app name
 *
 * @internal
 */
const DEFAULT_ENTRY_NAME = exports._DEFAULT_ENTRY_NAME = '[DEFAULT]';
const PLATFORM_LOG_STRING = {
  [name$q]: 'fire-core',
  [name$p]: 'fire-core-compat',
  [name$n]: 'fire-analytics',
  [name$o]: 'fire-analytics-compat',
  [name$l]: 'fire-app-check',
  [name$m]: 'fire-app-check-compat',
  [name$k]: 'fire-auth',
  [name$j]: 'fire-auth-compat',
  [name$i]: 'fire-rtdb',
  [name$h]: 'fire-data-connect',
  [name$g]: 'fire-rtdb-compat',
  [name$f]: 'fire-fn',
  [name$e]: 'fire-fn-compat',
  [name$d]: 'fire-iid',
  [name$c]: 'fire-iid-compat',
  [name$b]: 'fire-fcm',
  [name$a]: 'fire-fcm-compat',
  [name$9]: 'fire-perf',
  [name$8]: 'fire-perf-compat',
  [name$7]: 'fire-rc',
  [name$6]: 'fire-rc-compat',
  [name$5]: 'fire-gcs',
  [name$4]: 'fire-gcs-compat',
  [name$3]: 'fire-fst',
  [name$1]: 'fire-fst-compat',
  [name$2]: 'fire-vertex',
  'fire-js': 'fire-js',
  // Platform identifier for JS SDK.
  [name]: 'fire-js-all'
};

/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @internal
 */
const _apps = exports._apps = new Map();
/**
 * @internal
 */
const _serverApps = exports._serverApps = new Map();
/**
 * Registered components.
 *
 * @internal
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const _components = exports._components = new Map();
/**
 * @param component - the component being added to this app's container
 *
 * @internal
 */
function _addComponent(app, component) {
  try {
    app.container.addComponent(component);
  } catch (e) {
    logger.debug(`Component ${component.name} failed to register with FirebaseApp ${app.name}`, e);
  }
}
/**
 *
 * @internal
 */
function _addOrOverwriteComponent(app, component) {
  app.container.addOrOverwriteComponent(component);
}
/**
 *
 * @param component - the component to register
 * @returns whether or not the component is registered successfully
 *
 * @internal
 */
function _registerComponent(component) {
  const componentName = component.name;
  if (_components.has(componentName)) {
    logger.debug(`There were multiple attempts to register component ${componentName}.`);
    return false;
  }
  _components.set(componentName, component);
  // add the component to existing app instances
  for (const app of _apps.values()) {
    _addComponent(app, component);
  }
  for (const serverApp of _serverApps.values()) {
    _addComponent(serverApp, component);
  }
  return true;
}
/**
 *
 * @param app - FirebaseApp instance
 * @param name - service name
 *
 * @returns the provider for the service with the matching name
 *
 * @internal
 */
function _getProvider(app, name) {
  const heartbeatController = app.container.getProvider('heartbeat').getImmediate({
    optional: true
  });
  if (heartbeatController) {
    void heartbeatController.triggerHeartbeat();
  }
  return app.container.getProvider(name);
}
/**
 *
 * @param app - FirebaseApp instance
 * @param name - service name
 * @param instanceIdentifier - service instance identifier in case the service supports multiple instances
 *
 * @internal
 */
function _removeServiceInstance(app, name, instanceIdentifier = DEFAULT_ENTRY_NAME) {
  _getProvider(app, name).clearInstance(instanceIdentifier);
}
/**
 *
 * @param obj - an object of type FirebaseApp or FirebaseOptions.
 *
 * @returns true if the provide object is of type FirebaseApp.
 *
 * @internal
 */
function _isFirebaseApp(obj) {
  return obj.options !== undefined;
}
/**
 *
 * @param obj - an object of type FirebaseApp.
 *
 * @returns true if the provided object is of type FirebaseServerAppImpl.
 *
 * @internal
 */
function _isFirebaseServerApp(obj) {
  if (obj === null || obj === undefined) {
    return false;
  }
  return obj.settings !== undefined;
}
/**
 * Test only
 *
 * @internal
 */
function _clearComponents() {
  _components.clear();
}

/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const ERRORS = {
  ["no-app" /* AppError.NO_APP */]: "No Firebase App '{$appName}' has been created - " + 'call initializeApp() first',
  ["bad-app-name" /* AppError.BAD_APP_NAME */]: "Illegal App name: '{$appName}'",
  ["duplicate-app" /* AppError.DUPLICATE_APP */]: "Firebase App named '{$appName}' already exists with different options or config",
  ["app-deleted" /* AppError.APP_DELETED */]: "Firebase App named '{$appName}' already deleted",
  ["server-app-deleted" /* AppError.SERVER_APP_DELETED */]: 'Firebase Server App has been deleted',
  ["no-options" /* AppError.NO_OPTIONS */]: 'Need to provide options, when not being deployed to hosting via source.',
  ["invalid-app-argument" /* AppError.INVALID_APP_ARGUMENT */]: 'firebase.{$appName}() takes either no argument or a ' + 'Firebase App instance.',
  ["invalid-log-argument" /* AppError.INVALID_LOG_ARGUMENT */]: 'First argument to `onLog` must be null or a function.',
  ["idb-open" /* AppError.IDB_OPEN */]: 'Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.',
  ["idb-get" /* AppError.IDB_GET */]: 'Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.',
  ["idb-set" /* AppError.IDB_WRITE */]: 'Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.',
  ["idb-delete" /* AppError.IDB_DELETE */]: 'Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.',
  ["finalization-registry-not-supported" /* AppError.FINALIZATION_REGISTRY_NOT_SUPPORTED */]: 'FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.',
  ["invalid-server-app-environment" /* AppError.INVALID_SERVER_APP_ENVIRONMENT */]: 'FirebaseServerApp is not for use in browser environments.'
};
const ERROR_FACTORY = new _util.ErrorFactory('app', 'Firebase', ERRORS);

/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class FirebaseAppImpl {
  constructor(options, config, container) {
    this._isDeleted = false;
    this._options = Object.assign({}, options);
    this._config = Object.assign({}, config);
    this._name = config.name;
    this._automaticDataCollectionEnabled = config.automaticDataCollectionEnabled;
    this._container = container;
    this.container.addComponent(new _component.Component('app', () => this, "PUBLIC" /* ComponentType.PUBLIC */));
  }
  get automaticDataCollectionEnabled() {
    this.checkDestroyed();
    return this._automaticDataCollectionEnabled;
  }
  set automaticDataCollectionEnabled(val) {
    this.checkDestroyed();
    this._automaticDataCollectionEnabled = val;
  }
  get name() {
    this.checkDestroyed();
    return this._name;
  }
  get options() {
    this.checkDestroyed();
    return this._options;
  }
  get config() {
    this.checkDestroyed();
    return this._config;
  }
  get container() {
    return this._container;
  }
  get isDeleted() {
    return this._isDeleted;
  }
  set isDeleted(val) {
    this._isDeleted = val;
  }
  /**
   * This function will throw an Error if the App has already been deleted -
   * use before performing API actions on the App.
   */
  checkDestroyed() {
    if (this.isDeleted) {
      throw ERROR_FACTORY.create("app-deleted" /* AppError.APP_DELETED */, {
        appName: this._name
      });
    }
  }
}

/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
// Parse the token and check to see if the `exp` claim is in the future.
// Reports an error to the console if the token or claim could not be parsed, or if `exp` is in
// the past.
function validateTokenTTL(base64Token, tokenName) {
  const secondPart = (0, _util.base64Decode)(base64Token.split('.')[1]);
  if (secondPart === null) {
    console.error(`FirebaseServerApp ${tokenName} is invalid: second part could not be parsed.`);
    return;
  }
  const expClaim = JSON.parse(secondPart).exp;
  if (expClaim === undefined) {
    console.error(`FirebaseServerApp ${tokenName} is invalid: expiration claim could not be parsed`);
    return;
  }
  const exp = JSON.parse(secondPart).exp * 1000;
  const now = new Date().getTime();
  const diff = exp - now;
  if (diff <= 0) {
    console.error(`FirebaseServerApp ${tokenName} is invalid: the token has expired.`);
  }
}
class FirebaseServerAppImpl extends FirebaseAppImpl {
  constructor(options, serverConfig, name, container) {
    // Build configuration parameters for the FirebaseAppImpl base class.
    const automaticDataCollectionEnabled = serverConfig.automaticDataCollectionEnabled !== undefined ? serverConfig.automaticDataCollectionEnabled : true;
    // Create the FirebaseAppSettings object for the FirebaseAppImp constructor.
    const config = {
      name,
      automaticDataCollectionEnabled
    };
    if (options.apiKey !== undefined) {
      // Construct the parent FirebaseAppImp object.
      super(options, config, container);
    } else {
      const appImpl = options;
      super(appImpl.options, config, container);
    }
    // Now construct the data for the FirebaseServerAppImpl.
    this._serverConfig = Object.assign({
      automaticDataCollectionEnabled
    }, serverConfig);
    // Ensure that the current time is within the `authIdtoken` window of validity.
    if (this._serverConfig.authIdToken) {
      validateTokenTTL(this._serverConfig.authIdToken, 'authIdToken');
    }
    // Ensure that the current time is within the `appCheckToken` window of validity.
    if (this._serverConfig.appCheckToken) {
      validateTokenTTL(this._serverConfig.appCheckToken, 'appCheckToken');
    }
    this._finalizationRegistry = null;
    if (typeof FinalizationRegistry !== 'undefined') {
      this._finalizationRegistry = new FinalizationRegistry(() => {
        this.automaticCleanup();
      });
    }
    this._refCount = 0;
    this.incRefCount(this._serverConfig.releaseOnDeref);
    // Do not retain a hard reference to the dref object, otherwise the FinalizationRegistry
    // will never trigger.
    this._serverConfig.releaseOnDeref = undefined;
    serverConfig.releaseOnDeref = undefined;
    registerVersion(name$q, version$1, 'serverapp');
  }
  toJSON() {
    return undefined;
  }
  get refCount() {
    return this._refCount;
  }
  // Increment the reference count of this server app. If an object is provided, register it
  // with the finalization registry.
  incRefCount(obj) {
    if (this.isDeleted) {
      return;
    }
    this._refCount++;
    if (obj !== undefined && this._finalizationRegistry !== null) {
      this._finalizationRegistry.register(obj, this);
    }
  }
  // Decrement the reference count.
  decRefCount() {
    if (this.isDeleted) {
      return 0;
    }
    return --this._refCount;
  }
  // Invoked by the FinalizationRegistry callback to note that this app should go through its
  // reference counts and delete itself if no reference count remain. The coordinating logic that
  // handles this is in deleteApp(...).
  automaticCleanup() {
    void deleteApp(this);
  }
  get settings() {
    this.checkDestroyed();
    return this._serverConfig;
  }
  /**
   * This function will throw an Error if the App has already been deleted -
   * use before performing API actions on the App.
   */
  checkDestroyed() {
    if (this.isDeleted) {
      throw ERROR_FACTORY.create("server-app-deleted" /* AppError.SERVER_APP_DELETED */);
    }
  }
}

/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * The current SDK version.
 *
 * @public
 */
const SDK_VERSION = exports.SDK_VERSION = version;
function initializeApp(_options, rawConfig = {}) {
  let options = _options;
  if (typeof rawConfig !== 'object') {
    const name = rawConfig;
    rawConfig = {
      name
    };
  }
  const config = Object.assign({
    name: DEFAULT_ENTRY_NAME,
    automaticDataCollectionEnabled: true
  }, rawConfig);
  const name = config.name;
  if (typeof name !== 'string' || !name) {
    throw ERROR_FACTORY.create("bad-app-name" /* AppError.BAD_APP_NAME */, {
      appName: String(name)
    });
  }
  options || (options = (0, _util.getDefaultAppConfig)());
  if (!options) {
    throw ERROR_FACTORY.create("no-options" /* AppError.NO_OPTIONS */);
  }
  const existingApp = _apps.get(name);
  if (existingApp) {
    // return the existing app if options and config deep equal the ones in the existing app.
    if ((0, _util.deepEqual)(options, existingApp.options) && (0, _util.deepEqual)(config, existingApp.config)) {
      return existingApp;
    } else {
      throw ERROR_FACTORY.create("duplicate-app" /* AppError.DUPLICATE_APP */, {
        appName: name
      });
    }
  }
  const container = new _component.ComponentContainer(name);
  for (const component of _components.values()) {
    container.addComponent(component);
  }
  const newApp = new FirebaseAppImpl(options, config, container);
  _apps.set(name, newApp);
  return newApp;
}
function initializeServerApp(_options, _serverAppConfig) {
  if ((0, _util.isBrowser)() && !(0, _util.isWebWorker)()) {
    // FirebaseServerApp isn't designed to be run in browsers.
    throw ERROR_FACTORY.create("invalid-server-app-environment" /* AppError.INVALID_SERVER_APP_ENVIRONMENT */);
  }
  if (_serverAppConfig.automaticDataCollectionEnabled === undefined) {
    _serverAppConfig.automaticDataCollectionEnabled = true;
  }
  let appOptions;
  if (_isFirebaseApp(_options)) {
    appOptions = _options.options;
  } else {
    appOptions = _options;
  }
  // Build an app name based on a hash of the configuration options.
  const nameObj = Object.assign(Object.assign({}, _serverAppConfig), appOptions);
  // However, Do not mangle the name based on releaseOnDeref, since it will vary between the
  // construction of FirebaseServerApp instances. For example, if the object is the request headers.
  if (nameObj.releaseOnDeref !== undefined) {
    delete nameObj.releaseOnDeref;
  }
  const hashCode = s => {
    return [...s].reduce((hash, c) => Math.imul(31, hash) + c.charCodeAt(0) | 0, 0);
  };
  if (_serverAppConfig.releaseOnDeref !== undefined) {
    if (typeof FinalizationRegistry === 'undefined') {
      throw ERROR_FACTORY.create("finalization-registry-not-supported" /* AppError.FINALIZATION_REGISTRY_NOT_SUPPORTED */, {});
    }
  }
  const nameString = '' + hashCode(JSON.stringify(nameObj));
  const existingApp = _serverApps.get(nameString);
  if (existingApp) {
    existingApp.incRefCount(_serverAppConfig.releaseOnDeref);
    return existingApp;
  }
  const container = new _component.ComponentContainer(nameString);
  for (const component of _components.values()) {
    container.addComponent(component);
  }
  const newApp = new FirebaseServerAppImpl(appOptions, _serverAppConfig, nameString, container);
  _serverApps.set(nameString, newApp);
  return newApp;
}
/**
 * Retrieves a {@link @firebase/app#FirebaseApp} instance.
 *
 * When called with no arguments, the default app is returned. When an app name
 * is provided, the app corresponding to that name is returned.
 *
 * An exception is thrown if the app being retrieved has not yet been
 * initialized.
 *
 * @example
 * ```javascript
 * // Return the default app
 * const app = getApp();
 * ```
 *
 * @example
 * ```javascript
 * // Return a named app
 * const otherApp = getApp("otherApp");
 * ```
 *
 * @param name - Optional name of the app to return. If no name is
 *   provided, the default is `"[DEFAULT]"`.
 *
 * @returns The app corresponding to the provided app name.
 *   If no app name is provided, the default app is returned.
 *
 * @public
 */
function getApp(name = DEFAULT_ENTRY_NAME) {
  const app = _apps.get(name);
  if (!app && name === DEFAULT_ENTRY_NAME && (0, _util.getDefaultAppConfig)()) {
    return initializeApp();
  }
  if (!app) {
    throw ERROR_FACTORY.create("no-app" /* AppError.NO_APP */, {
      appName: name
    });
  }
  return app;
}
/**
 * A (read-only) array of all initialized apps.
 * @public
 */
function getApps() {
  return Array.from(_apps.values());
}
/**
 * Renders this app unusable and frees the resources of all associated
 * services.
 *
 * @example
 * ```javascript
 * deleteApp(app)
 *   .then(function() {
 *     console.log("App deleted successfully");
 *   })
 *   .catch(function(error) {
 *     console.log("Error deleting app:", error);
 *   });
 * ```
 *
 * @public
 */
async function deleteApp(app) {
  let cleanupProviders = false;
  const name = app.name;
  if (_apps.has(name)) {
    cleanupProviders = true;
    _apps.delete(name);
  } else if (_serverApps.has(name)) {
    const firebaseServerApp = app;
    if (firebaseServerApp.decRefCount() <= 0) {
      _serverApps.delete(name);
      cleanupProviders = true;
    }
  }
  if (cleanupProviders) {
    await Promise.all(app.container.getProviders().map(provider => provider.delete()));
    app.isDeleted = true;
  }
}
/**
 * Registers a library's name and version for platform logging purposes.
 * @param library - Name of 1p or 3p library (e.g. firestore, angularfire)
 * @param version - Current version of that library.
 * @param variant - Bundle variant, e.g., node, rn, etc.
 *
 * @public
 */
function registerVersion(libraryKeyOrName, version, variant) {
  var _a;
  // TODO: We can use this check to whitelist strings when/if we set up
  // a good whitelist system.
  let library = (_a = PLATFORM_LOG_STRING[libraryKeyOrName]) !== null && _a !== void 0 ? _a : libraryKeyOrName;
  if (variant) {
    library += `-${variant}`;
  }
  const libraryMismatch = library.match(/\s|\//);
  const versionMismatch = version.match(/\s|\//);
  if (libraryMismatch || versionMismatch) {
    const warning = [`Unable to register library "${library}" with version "${version}":`];
    if (libraryMismatch) {
      warning.push(`library name "${library}" contains illegal characters (whitespace or "/")`);
    }
    if (libraryMismatch && versionMismatch) {
      warning.push('and');
    }
    if (versionMismatch) {
      warning.push(`version name "${version}" contains illegal characters (whitespace or "/")`);
    }
    logger.warn(warning.join(' '));
    return;
  }
  _registerComponent(new _component.Component(`${library}-version`, () => ({
    library,
    version
  }), "VERSION" /* ComponentType.VERSION */));
}
/**
 * Sets log handler for all Firebase SDKs.
 * @param logCallback - An optional custom log handler that executes user code whenever
 * the Firebase SDK makes a logging call.
 *
 * @public
 */
function onLog(logCallback, options) {
  if (logCallback !== null && typeof logCallback !== 'function') {
    throw ERROR_FACTORY.create("invalid-log-argument" /* AppError.INVALID_LOG_ARGUMENT */);
  }
  (0, _logger.setUserLogHandler)(logCallback, options);
}
/**
 * Sets log level for all Firebase SDKs.
 *
 * All of the log types above the current log level are captured (i.e. if
 * you set the log level to `info`, errors are logged, but `debug` and
 * `verbose` logs are not).
 *
 * @public
 */
function setLogLevel(logLevel) {
  (0, _logger.setLogLevel)(logLevel);
}

/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const DB_NAME = 'firebase-heartbeat-database';
const DB_VERSION = 1;
const STORE_NAME = 'firebase-heartbeat-store';
let dbPromise = null;
function getDbPromise() {
  if (!dbPromise) {
    dbPromise = (0, _idb.openDB)(DB_NAME, DB_VERSION, {
      upgrade: (db, oldVersion) => {
        // We don't use 'break' in this switch statement, the fall-through
        // behavior is what we want, because if there are multiple versions between
        // the old version and the current version, we want ALL the migrations
        // that correspond to those versions to run, not only the last one.
        // eslint-disable-next-line default-case
        switch (oldVersion) {
          case 0:
            try {
              db.createObjectStore(STORE_NAME);
            } catch (e) {
              // Safari/iOS browsers throw occasional exceptions on
              // db.createObjectStore() that may be a bug. Avoid blocking
              // the rest of the app functionality.
              console.warn(e);
            }
        }
      }
    }).catch(e => {
      throw ERROR_FACTORY.create("idb-open" /* AppError.IDB_OPEN */, {
        originalErrorMessage: e.message
      });
    });
  }
  return dbPromise;
}
async function readHeartbeatsFromIndexedDB(app) {
  try {
    const db = await getDbPromise();
    const tx = db.transaction(STORE_NAME);
    const result = await tx.objectStore(STORE_NAME).get(computeKey(app));
    // We already have the value but tx.done can throw,
    // so we need to await it here to catch errors
    await tx.done;
    return result;
  } catch (e) {
    if (e instanceof _util.FirebaseError) {
      logger.warn(e.message);
    } else {
      const idbGetError = ERROR_FACTORY.create("idb-get" /* AppError.IDB_GET */, {
        originalErrorMessage: e === null || e === void 0 ? void 0 : e.message
      });
      logger.warn(idbGetError.message);
    }
  }
}
async function writeHeartbeatsToIndexedDB(app, heartbeatObject) {
  try {
    const db = await getDbPromise();
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const objectStore = tx.objectStore(STORE_NAME);
    await objectStore.put(heartbeatObject, computeKey(app));
    await tx.done;
  } catch (e) {
    if (e instanceof _util.FirebaseError) {
      logger.warn(e.message);
    } else {
      const idbGetError = ERROR_FACTORY.create("idb-set" /* AppError.IDB_WRITE */, {
        originalErrorMessage: e === null || e === void 0 ? void 0 : e.message
      });
      logger.warn(idbGetError.message);
    }
  }
}
function computeKey(app) {
  return `${app.name}!${app.options.appId}`;
}

/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const MAX_HEADER_BYTES = 1024;
const MAX_NUM_STORED_HEARTBEATS = 30;
class HeartbeatServiceImpl {
  constructor(container) {
    this.container = container;
    /**
     * In-memory cache for heartbeats, used by getHeartbeatsHeader() to generate
     * the header string.
     * Stores one record per date. This will be consolidated into the standard
     * format of one record per user agent string before being sent as a header.
     * Populated from indexedDB when the controller is instantiated and should
     * be kept in sync with indexedDB.
     * Leave public for easier testing.
     */
    this._heartbeatsCache = null;
    const app = this.container.getProvider('app').getImmediate();
    this._storage = new HeartbeatStorageImpl(app);
    this._heartbeatsCachePromise = this._storage.read().then(result => {
      this._heartbeatsCache = result;
      return result;
    });
  }
  /**
   * Called to report a heartbeat. The function will generate
   * a HeartbeatsByUserAgent object, update heartbeatsCache, and persist it
   * to IndexedDB.
   * Note that we only store one heartbeat per day. So if a heartbeat for today is
   * already logged, subsequent calls to this function in the same day will be ignored.
   */
  async triggerHeartbeat() {
    var _a, _b;
    try {
      const platformLogger = this.container.getProvider('platform-logger').getImmediate();
      // This is the "Firebase user agent" string from the platform logger
      // service, not the browser user agent.
      const agent = platformLogger.getPlatformInfoString();
      const date = getUTCDateString();
      if (((_a = this._heartbeatsCache) === null || _a === void 0 ? void 0 : _a.heartbeats) == null) {
        this._heartbeatsCache = await this._heartbeatsCachePromise;
        // If we failed to construct a heartbeats cache, then return immediately.
        if (((_b = this._heartbeatsCache) === null || _b === void 0 ? void 0 : _b.heartbeats) == null) {
          return;
        }
      }
      // Do not store a heartbeat if one is already stored for this day
      // or if a header has already been sent today.
      if (this._heartbeatsCache.lastSentHeartbeatDate === date || this._heartbeatsCache.heartbeats.some(singleDateHeartbeat => singleDateHeartbeat.date === date)) {
        return;
      } else {
        // There is no entry for this date. Create one.
        this._heartbeatsCache.heartbeats.push({
          date,
          agent
        });
        // If the number of stored heartbeats exceeds the maximum number of stored heartbeats, remove the heartbeat with the earliest date.
        // Since this is executed each time a heartbeat is pushed, the limit can only be exceeded by one, so only one needs to be removed.
        if (this._heartbeatsCache.heartbeats.length > MAX_NUM_STORED_HEARTBEATS) {
          const earliestHeartbeatIdx = getEarliestHeartbeatIdx(this._heartbeatsCache.heartbeats);
          this._heartbeatsCache.heartbeats.splice(earliestHeartbeatIdx, 1);
        }
      }
      return this._storage.overwrite(this._heartbeatsCache);
    } catch (e) {
      logger.warn(e);
    }
  }
  /**
   * Returns a base64 encoded string which can be attached to the heartbeat-specific header directly.
   * It also clears all heartbeats from memory as well as in IndexedDB.
   *
   * NOTE: Consuming product SDKs should not send the header if this method
   * returns an empty string.
   */
  async getHeartbeatsHeader() {
    var _a;
    try {
      if (this._heartbeatsCache === null) {
        await this._heartbeatsCachePromise;
      }
      // If it's still null or the array is empty, there is no data to send.
      if (((_a = this._heartbeatsCache) === null || _a === void 0 ? void 0 : _a.heartbeats) == null || this._heartbeatsCache.heartbeats.length === 0) {
        return '';
      }
      const date = getUTCDateString();
      // Extract as many heartbeats from the cache as will fit under the size limit.
      const {
        heartbeatsToSend,
        unsentEntries
      } = extractHeartbeatsForHeader(this._heartbeatsCache.heartbeats);
      const headerString = (0, _util.base64urlEncodeWithoutPadding)(JSON.stringify({
        version: 2,
        heartbeats: heartbeatsToSend
      }));
      // Store last sent date to prevent another being logged/sent for the same day.
      this._heartbeatsCache.lastSentHeartbeatDate = date;
      if (unsentEntries.length > 0) {
        // Store any unsent entries if they exist.
        this._heartbeatsCache.heartbeats = unsentEntries;
        // This seems more likely than emptying the array (below) to lead to some odd state
        // since the cache isn't empty and this will be called again on the next request,
        // and is probably safest if we await it.
        await this._storage.overwrite(this._heartbeatsCache);
      } else {
        this._heartbeatsCache.heartbeats = [];
        // Do not wait for this, to reduce latency.
        void this._storage.overwrite(this._heartbeatsCache);
      }
      return headerString;
    } catch (e) {
      logger.warn(e);
      return '';
    }
  }
}
function getUTCDateString() {
  const today = new Date();
  // Returns date format 'YYYY-MM-DD'
  return today.toISOString().substring(0, 10);
}
function extractHeartbeatsForHeader(heartbeatsCache, maxSize = MAX_HEADER_BYTES) {
  // Heartbeats grouped by user agent in the standard format to be sent in
  // the header.
  const heartbeatsToSend = [];
  // Single date format heartbeats that are not sent.
  let unsentEntries = heartbeatsCache.slice();
  for (const singleDateHeartbeat of heartbeatsCache) {
    // Look for an existing entry with the same user agent.
    const heartbeatEntry = heartbeatsToSend.find(hb => hb.agent === singleDateHeartbeat.agent);
    if (!heartbeatEntry) {
      // If no entry for this user agent exists, create one.
      heartbeatsToSend.push({
        agent: singleDateHeartbeat.agent,
        dates: [singleDateHeartbeat.date]
      });
      if (countBytes(heartbeatsToSend) > maxSize) {
        // If the header would exceed max size, remove the added heartbeat
        // entry and stop adding to the header.
        heartbeatsToSend.pop();
        break;
      }
    } else {
      heartbeatEntry.dates.push(singleDateHeartbeat.date);
      // If the header would exceed max size, remove the added date
      // and stop adding to the header.
      if (countBytes(heartbeatsToSend) > maxSize) {
        heartbeatEntry.dates.pop();
        break;
      }
    }
    // Pop unsent entry from queue. (Skipped if adding the entry exceeded
    // quota and the loop breaks early.)
    unsentEntries = unsentEntries.slice(1);
  }
  return {
    heartbeatsToSend,
    unsentEntries
  };
}
class HeartbeatStorageImpl {
  constructor(app) {
    this.app = app;
    this._canUseIndexedDBPromise = this.runIndexedDBEnvironmentCheck();
  }
  async runIndexedDBEnvironmentCheck() {
    if (!(0, _util.isIndexedDBAvailable)()) {
      return false;
    } else {
      return (0, _util.validateIndexedDBOpenable)().then(() => true).catch(() => false);
    }
  }
  /**
   * Read all heartbeats.
   */
  async read() {
    const canUseIndexedDB = await this._canUseIndexedDBPromise;
    if (!canUseIndexedDB) {
      return {
        heartbeats: []
      };
    } else {
      const idbHeartbeatObject = await readHeartbeatsFromIndexedDB(this.app);
      if (idbHeartbeatObject === null || idbHeartbeatObject === void 0 ? void 0 : idbHeartbeatObject.heartbeats) {
        return idbHeartbeatObject;
      } else {
        return {
          heartbeats: []
        };
      }
    }
  }
  // overwrite the storage with the provided heartbeats
  async overwrite(heartbeatsObject) {
    var _a;
    const canUseIndexedDB = await this._canUseIndexedDBPromise;
    if (!canUseIndexedDB) {
      return;
    } else {
      const existingHeartbeatsObject = await this.read();
      return writeHeartbeatsToIndexedDB(this.app, {
        lastSentHeartbeatDate: (_a = heartbeatsObject.lastSentHeartbeatDate) !== null && _a !== void 0 ? _a : existingHeartbeatsObject.lastSentHeartbeatDate,
        heartbeats: heartbeatsObject.heartbeats
      });
    }
  }
  // add heartbeats
  async add(heartbeatsObject) {
    var _a;
    const canUseIndexedDB = await this._canUseIndexedDBPromise;
    if (!canUseIndexedDB) {
      return;
    } else {
      const existingHeartbeatsObject = await this.read();
      return writeHeartbeatsToIndexedDB(this.app, {
        lastSentHeartbeatDate: (_a = heartbeatsObject.lastSentHeartbeatDate) !== null && _a !== void 0 ? _a : existingHeartbeatsObject.lastSentHeartbeatDate,
        heartbeats: [...existingHeartbeatsObject.heartbeats, ...heartbeatsObject.heartbeats]
      });
    }
  }
}
/**
 * Calculate bytes of a HeartbeatsByUserAgent array after being wrapped
 * in a platform logging header JSON object, stringified, and converted
 * to base 64.
 */
function countBytes(heartbeatsCache) {
  // base64 has a restricted set of characters, all of which should be 1 byte.
  return (0, _util.base64urlEncodeWithoutPadding)(
  // heartbeatsCache wrapper properties
  JSON.stringify({
    version: 2,
    heartbeats: heartbeatsCache
  })).length;
}
/**
 * Returns the index of the heartbeat with the earliest date.
 * If the heartbeats array is empty, -1 is returned.
 */
function getEarliestHeartbeatIdx(heartbeats) {
  if (heartbeats.length === 0) {
    return -1;
  }
  let earliestHeartbeatIdx = 0;
  let earliestHeartbeatDate = heartbeats[0].date;
  for (let i = 1; i < heartbeats.length; i++) {
    if (heartbeats[i].date < earliestHeartbeatDate) {
      earliestHeartbeatDate = heartbeats[i].date;
      earliestHeartbeatIdx = i;
    }
  }
  return earliestHeartbeatIdx;
}

/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function registerCoreComponents(variant) {
  _registerComponent(new _component.Component('platform-logger', container => new PlatformLoggerServiceImpl(container), "PRIVATE" /* ComponentType.PRIVATE */));
  _registerComponent(new _component.Component('heartbeat', container => new HeartbeatServiceImpl(container), "PRIVATE" /* ComponentType.PRIVATE */));
  // Register `app` package.
  registerVersion(name$q, version$1, variant);
  // BUILD_TARGET will be replaced by values like esm2017, cjs2017, etc during the compilation
  registerVersion(name$q, version$1, 'esm2017');
  // Register platform SDK identifier (no version).
  registerVersion('fire-js', '');
}

/**
 * Firebase App
 *
 * @remarks This package coordinates the communication between the different Firebase components
 * @packageDocumentation
 */
registerCoreComponents('');
},{"@firebase/component":"../node_modules/@firebase/component/dist/esm/index.esm2017.js","@firebase/logger":"../node_modules/@firebase/logger/dist/esm/index.esm2017.js","@firebase/util":"../node_modules/@firebase/util/dist/index.esm2017.js","idb":"../node_modules/idb/build/index.js"}],"../node_modules/firebase/app/dist/esm/index.esm.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _app = require("@firebase/app");
Object.keys(_app).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _app[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _app[key];
    }
  });
});
var name = "firebase";
var version = "11.8.0";

/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
(0, _app.registerVersion)(name, version, 'app');
},{"@firebase/app":"../node_modules/@firebase/app/dist/esm/index.esm2017.js"}],"scripts/firebase-config.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.app = void 0;
var _app = require("firebase/app");
// Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyCXf12eBsccKUn2Iiwbvx1azSSkJkGReOI",
  authDomain: "expressioncal.firebaseapp.com",
  projectId: "expressioncal",
  storageBucket: "expressioncal.firebasestorage.app",
  messagingSenderId: "232300139247",
  appId: "1:232300139247:web:7b99655e91742abea5811a"
};

// Initialize Firebase
var app = exports.app = (0, _app.initializeApp)(firebaseConfig);
},{"firebase/app":"../node_modules/firebase/app/dist/esm/index.esm.js"}],"../node_modules/tslib/tslib.es6.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.__addDisposableResource = __addDisposableResource;
exports.__assign = void 0;
exports.__asyncDelegator = __asyncDelegator;
exports.__asyncGenerator = __asyncGenerator;
exports.__asyncValues = __asyncValues;
exports.__await = __await;
exports.__awaiter = __awaiter;
exports.__classPrivateFieldGet = __classPrivateFieldGet;
exports.__classPrivateFieldIn = __classPrivateFieldIn;
exports.__classPrivateFieldSet = __classPrivateFieldSet;
exports.__createBinding = void 0;
exports.__decorate = __decorate;
exports.__disposeResources = __disposeResources;
exports.__esDecorate = __esDecorate;
exports.__exportStar = __exportStar;
exports.__extends = __extends;
exports.__generator = __generator;
exports.__importDefault = __importDefault;
exports.__importStar = __importStar;
exports.__makeTemplateObject = __makeTemplateObject;
exports.__metadata = __metadata;
exports.__param = __param;
exports.__propKey = __propKey;
exports.__read = __read;
exports.__rest = __rest;
exports.__rewriteRelativeImportExtension = __rewriteRelativeImportExtension;
exports.__runInitializers = __runInitializers;
exports.__setFunctionName = __setFunctionName;
exports.__spread = __spread;
exports.__spreadArray = __spreadArray;
exports.__spreadArrays = __spreadArrays;
exports.__values = __values;
exports.default = void 0;
/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise, SuppressedError, Symbol, Iterator */

var extendStatics = function (d, b) {
  extendStatics = Object.setPrototypeOf || {
    __proto__: []
  } instanceof Array && function (d, b) {
    d.__proto__ = b;
  } || function (d, b) {
    for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
  };
  return extendStatics(d, b);
};
function __extends(d, b) {
  if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
  extendStatics(d, b);
  function __() {
    this.constructor = d;
  }
  d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}
var __assign = function () {
  exports.__assign = __assign = Object.assign || function __assign(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
    }
    return t;
  };
  return __assign.apply(this, arguments);
};
exports.__assign = __assign;
function __rest(s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
}
function __decorate(decorators, target, key, desc) {
  var c = arguments.length,
    r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
    d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function __param(paramIndex, decorator) {
  return function (target, key) {
    decorator(target, key, paramIndex);
  };
}
function __esDecorate(ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
  function accept(f) {
    if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected");
    return f;
  }
  var kind = contextIn.kind,
    key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
  var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
  var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
  var _,
    done = false;
  for (var i = decorators.length - 1; i >= 0; i--) {
    var context = {};
    for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
    for (var p in contextIn.access) context.access[p] = contextIn.access[p];
    context.addInitializer = function (f) {
      if (done) throw new TypeError("Cannot add initializers after decoration has completed");
      extraInitializers.push(accept(f || null));
    };
    var result = (0, decorators[i])(kind === "accessor" ? {
      get: descriptor.get,
      set: descriptor.set
    } : descriptor[key], context);
    if (kind === "accessor") {
      if (result === void 0) continue;
      if (result === null || typeof result !== "object") throw new TypeError("Object expected");
      if (_ = accept(result.get)) descriptor.get = _;
      if (_ = accept(result.set)) descriptor.set = _;
      if (_ = accept(result.init)) initializers.unshift(_);
    } else if (_ = accept(result)) {
      if (kind === "field") initializers.unshift(_);else descriptor[key] = _;
    }
  }
  if (target) Object.defineProperty(target, contextIn.name, descriptor);
  done = true;
}
;
function __runInitializers(thisArg, initializers, value) {
  var useValue = arguments.length > 2;
  for (var i = 0; i < initializers.length; i++) {
    value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
  }
  return useValue ? value : void 0;
}
;
function __propKey(x) {
  return typeof x === "symbol" ? x : "".concat(x);
}
;
function __setFunctionName(f, name, prefix) {
  if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
  return Object.defineProperty(f, "name", {
    configurable: true,
    value: prefix ? "".concat(prefix, " ", name) : name
  });
}
;
function __metadata(metadataKey, metadataValue) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
}
function __awaiter(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
}
function __generator(thisArg, body) {
  var _ = {
      label: 0,
      sent: function () {
        if (t[0] & 1) throw t[1];
        return t[1];
      },
      trys: [],
      ops: []
    },
    f,
    y,
    t,
    g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
  return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function () {
    return this;
  }), g;
  function verb(n) {
    return function (v) {
      return step([n, v]);
    };
  }
  function step(op) {
    if (f) throw new TypeError("Generator is already executing.");
    while (g && (g = 0, op[0] && (_ = 0)), _) try {
      if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
      if (y = 0, t) op = [op[0] & 2, t.value];
      switch (op[0]) {
        case 0:
        case 1:
          t = op;
          break;
        case 4:
          _.label++;
          return {
            value: op[1],
            done: false
          };
        case 5:
          _.label++;
          y = op[1];
          op = [0];
          continue;
        case 7:
          op = _.ops.pop();
          _.trys.pop();
          continue;
        default:
          if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
            _ = 0;
            continue;
          }
          if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
            _.label = op[1];
            break;
          }
          if (op[0] === 6 && _.label < t[1]) {
            _.label = t[1];
            t = op;
            break;
          }
          if (t && _.label < t[2]) {
            _.label = t[2];
            _.ops.push(op);
            break;
          }
          if (t[2]) _.ops.pop();
          _.trys.pop();
          continue;
      }
      op = body.call(thisArg, _);
    } catch (e) {
      op = [6, e];
      y = 0;
    } finally {
      f = t = 0;
    }
    if (op[0] & 5) throw op[1];
    return {
      value: op[0] ? op[1] : void 0,
      done: true
    };
  }
}
var __createBinding = exports.__createBinding = Object.create ? function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  var desc = Object.getOwnPropertyDescriptor(m, k);
  if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
    desc = {
      enumerable: true,
      get: function () {
        return m[k];
      }
    };
  }
  Object.defineProperty(o, k2, desc);
} : function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  o[k2] = m[k];
};
function __exportStar(m, o) {
  for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(o, p)) __createBinding(o, m, p);
}
function __values(o) {
  var s = typeof Symbol === "function" && Symbol.iterator,
    m = s && o[s],
    i = 0;
  if (m) return m.call(o);
  if (o && typeof o.length === "number") return {
    next: function () {
      if (o && i >= o.length) o = void 0;
      return {
        value: o && o[i++],
        done: !o
      };
    }
  };
  throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
}
function __read(o, n) {
  var m = typeof Symbol === "function" && o[Symbol.iterator];
  if (!m) return o;
  var i = m.call(o),
    r,
    ar = [],
    e;
  try {
    while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
  } catch (error) {
    e = {
      error: error
    };
  } finally {
    try {
      if (r && !r.done && (m = i["return"])) m.call(i);
    } finally {
      if (e) throw e.error;
    }
  }
  return ar;
}

/** @deprecated */
function __spread() {
  for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
  return ar;
}

/** @deprecated */
function __spreadArrays() {
  for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
  for (var r = Array(s), k = 0, i = 0; i < il; i++) for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++) r[k] = a[j];
  return r;
}
function __spreadArray(to, from, pack) {
  if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
    if (ar || !(i in from)) {
      if (!ar) ar = Array.prototype.slice.call(from, 0, i);
      ar[i] = from[i];
    }
  }
  return to.concat(ar || Array.prototype.slice.call(from));
}
function __await(v) {
  return this instanceof __await ? (this.v = v, this) : new __await(v);
}
function __asyncGenerator(thisArg, _arguments, generator) {
  if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
  var g = generator.apply(thisArg, _arguments || []),
    i,
    q = [];
  return i = Object.create((typeof AsyncIterator === "function" ? AsyncIterator : Object).prototype), verb("next"), verb("throw"), verb("return", awaitReturn), i[Symbol.asyncIterator] = function () {
    return this;
  }, i;
  function awaitReturn(f) {
    return function (v) {
      return Promise.resolve(v).then(f, reject);
    };
  }
  function verb(n, f) {
    if (g[n]) {
      i[n] = function (v) {
        return new Promise(function (a, b) {
          q.push([n, v, a, b]) > 1 || resume(n, v);
        });
      };
      if (f) i[n] = f(i[n]);
    }
  }
  function resume(n, v) {
    try {
      step(g[n](v));
    } catch (e) {
      settle(q[0][3], e);
    }
  }
  function step(r) {
    r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r);
  }
  function fulfill(value) {
    resume("next", value);
  }
  function reject(value) {
    resume("throw", value);
  }
  function settle(f, v) {
    if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]);
  }
}
function __asyncDelegator(o) {
  var i, p;
  return i = {}, verb("next"), verb("throw", function (e) {
    throw e;
  }), verb("return"), i[Symbol.iterator] = function () {
    return this;
  }, i;
  function verb(n, f) {
    i[n] = o[n] ? function (v) {
      return (p = !p) ? {
        value: __await(o[n](v)),
        done: false
      } : f ? f(v) : v;
    } : f;
  }
}
function __asyncValues(o) {
  if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
  var m = o[Symbol.asyncIterator],
    i;
  return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () {
    return this;
  }, i);
  function verb(n) {
    i[n] = o[n] && function (v) {
      return new Promise(function (resolve, reject) {
        v = o[n](v), settle(resolve, reject, v.done, v.value);
      });
    };
  }
  function settle(resolve, reject, d, v) {
    Promise.resolve(v).then(function (v) {
      resolve({
        value: v,
        done: d
      });
    }, reject);
  }
}
function __makeTemplateObject(cooked, raw) {
  if (Object.defineProperty) {
    Object.defineProperty(cooked, "raw", {
      value: raw
    });
  } else {
    cooked.raw = raw;
  }
  return cooked;
}
;
var __setModuleDefault = Object.create ? function (o, v) {
  Object.defineProperty(o, "default", {
    enumerable: true,
    value: v
  });
} : function (o, v) {
  o["default"] = v;
};
var ownKeys = function (o) {
  ownKeys = Object.getOwnPropertyNames || function (o) {
    var ar = [];
    for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
    return ar;
  };
  return ownKeys(o);
};
function __importStar(mod) {
  if (mod && mod.__esModule) return mod;
  var result = {};
  if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
  __setModuleDefault(result, mod);
  return result;
}
function __importDefault(mod) {
  return mod && mod.__esModule ? mod : {
    default: mod
  };
}
function __classPrivateFieldGet(receiver, state, kind, f) {
  if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
}
function __classPrivateFieldSet(receiver, state, value, kind, f) {
  if (kind === "m") throw new TypeError("Private method is not writable");
  if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
}
function __classPrivateFieldIn(state, receiver) {
  if (receiver === null || typeof receiver !== "object" && typeof receiver !== "function") throw new TypeError("Cannot use 'in' operator on non-object");
  return typeof state === "function" ? receiver === state : state.has(receiver);
}
function __addDisposableResource(env, value, async) {
  if (value !== null && value !== void 0) {
    if (typeof value !== "object" && typeof value !== "function") throw new TypeError("Object expected.");
    var dispose, inner;
    if (async) {
      if (!Symbol.asyncDispose) throw new TypeError("Symbol.asyncDispose is not defined.");
      dispose = value[Symbol.asyncDispose];
    }
    if (dispose === void 0) {
      if (!Symbol.dispose) throw new TypeError("Symbol.dispose is not defined.");
      dispose = value[Symbol.dispose];
      if (async) inner = dispose;
    }
    if (typeof dispose !== "function") throw new TypeError("Object not disposable.");
    if (inner) dispose = function () {
      try {
        inner.call(this);
      } catch (e) {
        return Promise.reject(e);
      }
    };
    env.stack.push({
      value: value,
      dispose: dispose,
      async: async
    });
  } else if (async) {
    env.stack.push({
      async: true
    });
  }
  return value;
}
var _SuppressedError = typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
  var e = new Error(message);
  return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};
function __disposeResources(env) {
  function fail(e) {
    env.error = env.hasError ? new _SuppressedError(e, env.error, "An error was suppressed during disposal.") : e;
    env.hasError = true;
  }
  var r,
    s = 0;
  function next() {
    while (r = env.stack.pop()) {
      try {
        if (!r.async && s === 1) return s = 0, env.stack.push(r), Promise.resolve().then(next);
        if (r.dispose) {
          var result = r.dispose.call(r.value);
          if (r.async) return s |= 2, Promise.resolve(result).then(next, function (e) {
            fail(e);
            return next();
          });
        } else s |= 1;
      } catch (e) {
        fail(e);
      }
    }
    if (s === 1) return env.hasError ? Promise.reject(env.error) : Promise.resolve();
    if (env.hasError) throw env.error;
  }
  return next();
}
function __rewriteRelativeImportExtension(path, preserveJsx) {
  if (typeof path === "string" && /^\.\.?\//.test(path)) {
    return path.replace(/\.(tsx)$|((?:\.d)?)((?:\.[^./]+?)?)\.([cm]?)ts$/i, function (m, tsx, d, ext, cm) {
      return tsx ? preserveJsx ? ".jsx" : ".js" : d && (!ext || !cm) ? m : d + ext + "." + cm.toLowerCase() + "js";
    });
  }
  return path;
}
var _default = exports.default = {
  __extends: __extends,
  __assign: __assign,
  __rest: __rest,
  __decorate: __decorate,
  __param: __param,
  __esDecorate: __esDecorate,
  __runInitializers: __runInitializers,
  __propKey: __propKey,
  __setFunctionName: __setFunctionName,
  __metadata: __metadata,
  __awaiter: __awaiter,
  __generator: __generator,
  __createBinding: __createBinding,
  __exportStar: __exportStar,
  __values: __values,
  __read: __read,
  __spread: __spread,
  __spreadArrays: __spreadArrays,
  __spreadArray: __spreadArray,
  __await: __await,
  __asyncGenerator: __asyncGenerator,
  __asyncDelegator: __asyncDelegator,
  __asyncValues: __asyncValues,
  __makeTemplateObject: __makeTemplateObject,
  __importStar: __importStar,
  __importDefault: __importDefault,
  __classPrivateFieldGet: __classPrivateFieldGet,
  __classPrivateFieldSet: __classPrivateFieldSet,
  __classPrivateFieldIn: __classPrivateFieldIn,
  __addDisposableResource: __addDisposableResource,
  __disposeResources: __disposeResources,
  __rewriteRelativeImportExtension: __rewriteRelativeImportExtension
};
},{}],"../node_modules/@firebase/auth/dist/esm2017/index-ac41aa6f.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.A = exports.$ = void 0;
exports.B = useDeviceLanguage;
exports.C = updateCurrentUser;
exports.D = signOut;
exports.E = revokeAccessToken;
exports.F = void 0;
exports.G = deleteUser;
exports.J = exports.I = exports.H = void 0;
exports.K = initializeAuth;
exports.L = connectAuthEmulator;
exports.a0 = exports.a = exports._ = exports.Z = exports.Y = exports.X = exports.W = exports.V = exports.U = exports.T = exports.S = exports.R = exports.Q = exports.P = exports.O = exports.N = exports.M = void 0;
exports.a1 = signInAnonymously;
exports.a2 = signInWithCredential;
exports.a3 = linkWithCredential;
exports.a4 = reauthenticateWithCredential;
exports.a5 = signInWithCustomToken;
exports.a6 = sendPasswordResetEmail;
exports.a7 = confirmPasswordReset;
exports.a8 = applyActionCode;
exports.a9 = checkActionCode;
exports.aA = _getProjectConfig;
exports.aB = _isIOS7Or8;
exports.aC = _createError;
exports.aD = _assert;
exports.aE = void 0;
exports.aF = _getInstance;
exports.aG = _persistenceKeyName;
exports.aH = _getRedirectResult;
exports.aI = _overrideRedirectResult;
exports.aJ = _clearRedirectOutcomes;
exports.aK = _castAuth;
exports.aM = exports.aL = void 0;
exports.aN = _getClientVersion;
exports.aO = _generateEventId;
exports.aR = exports.aQ = exports.aP = void 0;
exports.aa = verifyPasswordResetCode;
exports.ab = createUserWithEmailAndPassword;
exports.ac = signInWithEmailAndPassword;
exports.ad = sendSignInLinkToEmail;
exports.ae = isSignInWithEmailLink;
exports.af = signInWithEmailLink;
exports.ag = fetchSignInMethodsForEmail;
exports.ah = sendEmailVerification;
exports.ai = verifyBeforeUpdateEmail;
exports.aj = void 0;
exports.ak = parseActionCodeURL;
exports.al = updateProfile;
exports.am = updateEmail;
exports.an = updatePassword;
exports.ao = getIdToken;
exports.ap = _getIdTokenResult2;
exports.aq = unlink;
exports.ar = getAdditionalUserInfo;
exports.as = _reload2;
exports.at = getMultiFactorResolver;
exports.au = multiFactor;
exports.av = debugAssert;
exports.aw = _isIOS;
exports.ax = _isAndroid;
exports.ay = _fail;
exports.az = _getRedirectUrl;
exports.c = exports.b = void 0;
exports.d = signInWithPopup;
exports.e = linkWithPopup;
exports.f = reauthenticateWithPopup;
exports.g = signInWithRedirect;
exports.h = linkWithRedirect;
exports.i = void 0;
exports.j = reauthenticateWithRedirect;
exports.k = getRedirectResult;
exports.l = linkWithPhoneNumber;
exports.o = exports.n = exports.m = void 0;
exports.p = getAuth;
exports.q = void 0;
exports.r = reauthenticateWithPhoneNumber;
exports.s = signInWithPhoneNumber;
exports.t = setPersistence;
exports.u = updatePhoneNumber;
exports.v = initializeRecaptchaConfig;
exports.w = validatePassword;
exports.x = onIdTokenChanged;
exports.y = beforeAuthStateChanged;
exports.z = onAuthStateChanged;
var _app = require("@firebase/app");
var _util = require("@firebase/util");
var _logger = require("@firebase/logger");
var _tslib = require("tslib");
var _component = require("@firebase/component");
var _SERVER_ERROR_MAP;
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _superPropGet(t, o, e, r) { var p = _get3(_getPrototypeOf(1 & r ? t.prototype : t), o, e); return 2 & r && "function" == typeof p ? function (t) { return p.apply(e, t); } : p; }
function _get3() { return _get3 = "undefined" != typeof Reflect && Reflect.get ? Reflect.get.bind() : function (e, t, r) { var p = _superPropBase(e, t); if (p) { var n = Object.getOwnPropertyDescriptor(p, t); return n.get ? n.get.call(arguments.length < 3 ? e : r) : n.value; } }, _get3.apply(null, arguments); }
function _superPropBase(t, o) { for (; !{}.hasOwnProperty.call(t, o) && null !== (t = _getPrototypeOf(t));); return t; }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return r; }; var t, r = {}, e = Object.prototype, n = e.hasOwnProperty, o = "function" == typeof Symbol ? Symbol : {}, i = o.iterator || "@@iterator", a = o.asyncIterator || "@@asyncIterator", u = o.toStringTag || "@@toStringTag"; function c(t, r, e, n) { return Object.defineProperty(t, r, { value: e, enumerable: !n, configurable: !n, writable: !n }); } try { c({}, ""); } catch (t) { c = function c(t, r, e) { return t[r] = e; }; } function h(r, e, n, o) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype); return c(a, "_invoke", function (r, e, n) { var o = 1; return function (i, a) { if (3 === o) throw Error("Generator is already running"); if (4 === o) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var u = n.delegate; if (u) { var c = d(u, n); if (c) { if (c === f) continue; return c; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (1 === o) throw o = 4, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = 3; var h = s(r, e, n); if ("normal" === h.type) { if (o = n.done ? 4 : 2, h.arg === f) continue; return { value: h.arg, done: n.done }; } "throw" === h.type && (o = 4, n.method = "throw", n.arg = h.arg); } }; }(r, n, new Context(o || [])), !0), a; } function s(t, r, e) { try { return { type: "normal", arg: t.call(r, e) }; } catch (t) { return { type: "throw", arg: t }; } } r.wrap = h; var f = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var l = {}; c(l, i, function () { return this; }); var p = Object.getPrototypeOf, y = p && p(p(x([]))); y && y !== e && n.call(y, i) && (l = y); var v = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(l); function g(t) { ["next", "throw", "return"].forEach(function (r) { c(t, r, function (t) { return this._invoke(r, t); }); }); } function AsyncIterator(t, r) { function e(o, i, a, u) { var c = s(t[o], t, i); if ("throw" !== c.type) { var h = c.arg, f = h.value; return f && "object" == _typeof(f) && n.call(f, "__await") ? r.resolve(f.__await).then(function (t) { e("next", t, a, u); }, function (t) { e("throw", t, a, u); }) : r.resolve(f).then(function (t) { h.value = t, a(h); }, function (t) { return e("throw", t, a, u); }); } u(c.arg); } var o; c(this, "_invoke", function (t, n) { function i() { return new r(function (r, o) { e(t, n, r, o); }); } return o = o ? o.then(i, i) : i(); }, !0); } function d(r, e) { var n = e.method, o = r.i[n]; if (o === t) return e.delegate = null, "throw" === n && r.i.return && (e.method = "return", e.arg = t, d(r, e), "throw" === e.method) || "return" !== n && (e.method = "throw", e.arg = new TypeError("The iterator does not provide a '" + n + "' method")), f; var i = s(o, r.i, e.arg); if ("throw" === i.type) return e.method = "throw", e.arg = i.arg, e.delegate = null, f; var a = i.arg; return a ? a.done ? (e[r.r] = a.value, e.next = r.n, "return" !== e.method && (e.method = "next", e.arg = t), e.delegate = null, f) : a : (e.method = "throw", e.arg = new TypeError("iterator result is not an object"), e.delegate = null, f); } function w(t) { this.tryEntries.push(t); } function m(r) { var e = r[4] || {}; e.type = "normal", e.arg = t, r[4] = e; } function Context(t) { this.tryEntries = [[-1]], t.forEach(w, this), this.reset(!0); } function x(r) { if (null != r) { var e = r[i]; if (e) return e.call(r); if ("function" == typeof r.next) return r; if (!isNaN(r.length)) { var o = -1, a = function e() { for (; ++o < r.length;) if (n.call(r, o)) return e.value = r[o], e.done = !1, e; return e.value = t, e.done = !0, e; }; return a.next = a; } } throw new TypeError(_typeof(r) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, c(v, "constructor", GeneratorFunctionPrototype), c(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = c(GeneratorFunctionPrototype, u, "GeneratorFunction"), r.isGeneratorFunction = function (t) { var r = "function" == typeof t && t.constructor; return !!r && (r === GeneratorFunction || "GeneratorFunction" === (r.displayName || r.name)); }, r.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, c(t, u, "GeneratorFunction")), t.prototype = Object.create(v), t; }, r.awrap = function (t) { return { __await: t }; }, g(AsyncIterator.prototype), c(AsyncIterator.prototype, a, function () { return this; }), r.AsyncIterator = AsyncIterator, r.async = function (t, e, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(h(t, e, n, o), i); return r.isGeneratorFunction(e) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, g(v), c(v, u, "Generator"), c(v, i, function () { return this; }), c(v, "toString", function () { return "[object Generator]"; }), r.keys = function (t) { var r = Object(t), e = []; for (var n in r) e.unshift(n); return function t() { for (; e.length;) if ((n = e.pop()) in r) return t.value = n, t.done = !1, t; return t.done = !0, t; }; }, r.values = x, Context.prototype = { constructor: Context, reset: function reset(r) { if (this.prev = this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(m), !r) for (var e in this) "t" === e.charAt(0) && n.call(this, e) && !isNaN(+e.slice(1)) && (this[e] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0][4]; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(r) { if (this.done) throw r; var e = this; function n(t) { a.type = "throw", a.arg = r, e.next = t; } for (var o = e.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i[4], u = this.prev, c = i[1], h = i[2]; if (-1 === i[0]) return n("end"), !1; if (!c && !h) throw Error("try statement without catch or finally"); if (null != i[0] && i[0] <= u) { if (u < c) return this.method = "next", this.arg = t, n(c), !0; if (u < h) return n(h), !1; } } }, abrupt: function abrupt(t, r) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var n = this.tryEntries[e]; if (n[0] > -1 && n[0] <= this.prev && this.prev < n[2]) { var o = n; break; } } o && ("break" === t || "continue" === t) && o[0] <= r && r <= o[2] && (o = null); var i = o ? o[4] : {}; return i.type = t, i.arg = r, o ? (this.method = "next", this.next = o[2], f) : this.complete(i); }, complete: function complete(t, r) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && r && (this.next = r), f; }, finish: function finish(t) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var e = this.tryEntries[r]; if (e[2] === t) return this.complete(e[4], e[3]), m(e), f; } }, catch: function _catch(t) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var e = this.tryEntries[r]; if (e[0] === t) { var n = e[4]; if ("throw" === n.type) { var o = n.arg; m(e); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(r, e, n) { return this.delegate = { i: x(r), r: e, n: n }, "next" === this.method && (this.arg = t), f; } }, r; }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t.return || t.return(); } finally { if (u) throw o; } } }; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * An enum of factors that may be used for multifactor authentication.
 *
 * @public
 */
var FactorId = exports.F = {
  /** Phone as second factor */
  PHONE: 'phone',
  TOTP: 'totp'
};
/**
 * Enumeration of supported providers.
 *
 * @public
 */
var ProviderId = exports.q = {
  /** Facebook provider ID */
  FACEBOOK: 'facebook.com',
  /** GitHub provider ID */
  GITHUB: 'github.com',
  /** Google provider ID */
  GOOGLE: 'google.com',
  /** Password provider */
  PASSWORD: 'password',
  /** Phone provider */
  PHONE: 'phone',
  /** Twitter provider ID */
  TWITTER: 'twitter.com'
};
/**
 * Enumeration of supported sign-in methods.
 *
 * @public
 */
var SignInMethod = exports.S = {
  /** Email link sign in method */
  EMAIL_LINK: 'emailLink',
  /** Email/password sign in method */
  EMAIL_PASSWORD: 'password',
  /** Facebook sign in method */
  FACEBOOK: 'facebook.com',
  /** GitHub sign in method */
  GITHUB: 'github.com',
  /** Google sign in method */
  GOOGLE: 'google.com',
  /** Phone sign in method */
  PHONE: 'phone',
  /** Twitter sign in method */
  TWITTER: 'twitter.com'
};
/**
 * Enumeration of supported operation types.
 *
 * @public
 */
var OperationType = exports.O = {
  /** Operation involving linking an additional provider to an already signed-in user. */
  LINK: 'link',
  /** Operation involving using a provider to reauthenticate an already signed-in user. */
  REAUTHENTICATE: 'reauthenticate',
  /** Operation involving signing in a user. */
  SIGN_IN: 'signIn'
};
/**
 * An enumeration of the possible email action types.
 *
 * @public
 */
var ActionCodeOperation = exports.A = {
  /** The email link sign-in action. */
  EMAIL_SIGNIN: 'EMAIL_SIGNIN',
  /** The password reset action. */
  PASSWORD_RESET: 'PASSWORD_RESET',
  /** The email revocation action. */
  RECOVER_EMAIL: 'RECOVER_EMAIL',
  /** The revert second factor addition email action. */
  REVERT_SECOND_FACTOR_ADDITION: 'REVERT_SECOND_FACTOR_ADDITION',
  /** The revert second factor addition email action. */
  VERIFY_AND_CHANGE_EMAIL: 'VERIFY_AND_CHANGE_EMAIL',
  /** The email verification action. */
  VERIFY_EMAIL: 'VERIFY_EMAIL'
};

/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function _debugErrorMap() {
  var _ref;
  return _ref = {}, _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_ref, "admin-restricted-operation" /* AuthErrorCode.ADMIN_ONLY_OPERATION */, 'This operation is restricted to administrators only.'), "argument-error" /* AuthErrorCode.ARGUMENT_ERROR */, ''), "app-not-authorized" /* AuthErrorCode.APP_NOT_AUTHORIZED */, "This app, identified by the domain where it's hosted, is not " + 'authorized to use Firebase Authentication with the provided API key. ' + 'Review your key configuration in the Google API console.'), "app-not-installed" /* AuthErrorCode.APP_NOT_INSTALLED */, 'The requested mobile application corresponding to the identifier (' + 'Android package name or iOS bundle ID) provided is not installed on ' + 'this device.'), "captcha-check-failed" /* AuthErrorCode.CAPTCHA_CHECK_FAILED */, 'The reCAPTCHA response token provided is either invalid, expired, ' + 'already used or the domain associated with it does not match the list ' + 'of whitelisted domains.'), "code-expired" /* AuthErrorCode.CODE_EXPIRED */, 'The SMS code has expired. Please re-send the verification code to try ' + 'again.'), "cordova-not-ready" /* AuthErrorCode.CORDOVA_NOT_READY */, 'Cordova framework is not ready.'), "cors-unsupported" /* AuthErrorCode.CORS_UNSUPPORTED */, 'This browser is not supported.'), "credential-already-in-use" /* AuthErrorCode.CREDENTIAL_ALREADY_IN_USE */, 'This credential is already associated with a different user account.'), "custom-token-mismatch" /* AuthErrorCode.CREDENTIAL_MISMATCH */, 'The custom token corresponds to a different audience.'), _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_ref, "requires-recent-login" /* AuthErrorCode.CREDENTIAL_TOO_OLD_LOGIN_AGAIN */, 'This operation is sensitive and requires recent authentication. Log in ' + 'again before retrying this request.'), "dependent-sdk-initialized-before-auth" /* AuthErrorCode.DEPENDENT_SDK_INIT_BEFORE_AUTH */, 'Another Firebase SDK was initialized and is trying to use Auth before Auth is ' + 'initialized. Please be sure to call `initializeAuth` or `getAuth` before ' + 'starting any other Firebase SDK.'), "dynamic-link-not-activated" /* AuthErrorCode.DYNAMIC_LINK_NOT_ACTIVATED */, 'Please activate Dynamic Links in the Firebase Console and agree to the terms and ' + 'conditions.'), "email-change-needs-verification" /* AuthErrorCode.EMAIL_CHANGE_NEEDS_VERIFICATION */, 'Multi-factor users must always have a verified email.'), "email-already-in-use" /* AuthErrorCode.EMAIL_EXISTS */, 'The email address is already in use by another account.'), "emulator-config-failed" /* AuthErrorCode.EMULATOR_CONFIG_FAILED */, 'Auth instance has already been used to make a network call. Auth can ' + 'no longer be configured to use the emulator. Try calling ' + '"connectAuthEmulator()" sooner.'), "expired-action-code" /* AuthErrorCode.EXPIRED_OOB_CODE */, 'The action code has expired.'), "cancelled-popup-request" /* AuthErrorCode.EXPIRED_POPUP_REQUEST */, 'This operation has been cancelled due to another conflicting popup being opened.'), "internal-error" /* AuthErrorCode.INTERNAL_ERROR */, 'An internal AuthError has occurred.'), "invalid-app-credential" /* AuthErrorCode.INVALID_APP_CREDENTIAL */, 'The phone verification request contains an invalid application verifier.' + ' The reCAPTCHA token response is either invalid or expired.'), _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_ref, "invalid-app-id" /* AuthErrorCode.INVALID_APP_ID */, 'The mobile app identifier is not registered for the current project.'), "invalid-user-token" /* AuthErrorCode.INVALID_AUTH */, "This user's credential isn't valid for this project. This can happen " + "if the user's token has been tampered with, or if the user isn't for " + 'the project associated with this API key.'), "invalid-auth-event" /* AuthErrorCode.INVALID_AUTH_EVENT */, 'An internal AuthError has occurred.'), "invalid-verification-code" /* AuthErrorCode.INVALID_CODE */, 'The SMS verification code used to create the phone auth credential is ' + 'invalid. Please resend the verification code sms and be sure to use the ' + 'verification code provided by the user.'), "invalid-continue-uri" /* AuthErrorCode.INVALID_CONTINUE_URI */, 'The continue URL provided in the request is invalid.'), "invalid-cordova-configuration" /* AuthErrorCode.INVALID_CORDOVA_CONFIGURATION */, 'The following Cordova plugins must be installed to enable OAuth sign-in: ' + 'cordova-plugin-buildinfo, cordova-universal-links-plugin, ' + 'cordova-plugin-browsertab, cordova-plugin-inappbrowser and ' + 'cordova-plugin-customurlscheme.'), "invalid-custom-token" /* AuthErrorCode.INVALID_CUSTOM_TOKEN */, 'The custom token format is incorrect. Please check the documentation.'), "invalid-dynamic-link-domain" /* AuthErrorCode.INVALID_DYNAMIC_LINK_DOMAIN */, 'The provided dynamic link domain is not configured or authorized for the current project.'), "invalid-email" /* AuthErrorCode.INVALID_EMAIL */, 'The email address is badly formatted.'), "invalid-emulator-scheme" /* AuthErrorCode.INVALID_EMULATOR_SCHEME */, 'Emulator URL must start with a valid scheme (http:// or https://).'), _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_ref, "invalid-api-key" /* AuthErrorCode.INVALID_API_KEY */, 'Your API key is invalid, please check you have copied it correctly.'), "invalid-cert-hash" /* AuthErrorCode.INVALID_CERT_HASH */, 'The SHA-1 certificate hash provided is invalid.'), "invalid-credential" /* AuthErrorCode.INVALID_CREDENTIAL */, 'The supplied auth credential is incorrect, malformed or has expired.'), "invalid-message-payload" /* AuthErrorCode.INVALID_MESSAGE_PAYLOAD */, 'The email template corresponding to this action contains invalid characters in its message. ' + 'Please fix by going to the Auth email templates section in the Firebase Console.'), "invalid-multi-factor-session" /* AuthErrorCode.INVALID_MFA_SESSION */, 'The request does not contain a valid proof of first factor successful sign-in.'), "invalid-oauth-provider" /* AuthErrorCode.INVALID_OAUTH_PROVIDER */, 'EmailAuthProvider is not supported for this operation. This operation ' + 'only supports OAuth providers.'), "invalid-oauth-client-id" /* AuthErrorCode.INVALID_OAUTH_CLIENT_ID */, 'The OAuth client ID provided is either invalid or does not match the ' + 'specified API key.'), "unauthorized-domain" /* AuthErrorCode.INVALID_ORIGIN */, 'This domain is not authorized for OAuth operations for your Firebase ' + 'project. Edit the list of authorized domains from the Firebase console.'), "invalid-action-code" /* AuthErrorCode.INVALID_OOB_CODE */, 'The action code is invalid. This can happen if the code is malformed, ' + 'expired, or has already been used.'), "wrong-password" /* AuthErrorCode.INVALID_PASSWORD */, 'The password is invalid or the user does not have a password.'), _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_ref, "invalid-persistence-type" /* AuthErrorCode.INVALID_PERSISTENCE */, 'The specified persistence type is invalid. It can only be local, session or none.'), "invalid-phone-number" /* AuthErrorCode.INVALID_PHONE_NUMBER */, 'The format of the phone number provided is incorrect. Please enter the ' + 'phone number in a format that can be parsed into E.164 format. E.164 ' + 'phone numbers are written in the format [+][country code][subscriber ' + 'number including area code].'), "invalid-provider-id" /* AuthErrorCode.INVALID_PROVIDER_ID */, 'The specified provider ID is invalid.'), "invalid-recipient-email" /* AuthErrorCode.INVALID_RECIPIENT_EMAIL */, 'The email corresponding to this action failed to send as the provided ' + 'recipient email address is invalid.'), "invalid-sender" /* AuthErrorCode.INVALID_SENDER */, 'The email template corresponding to this action contains an invalid sender email or name. ' + 'Please fix by going to the Auth email templates section in the Firebase Console.'), "invalid-verification-id" /* AuthErrorCode.INVALID_SESSION_INFO */, 'The verification ID used to create the phone auth credential is invalid.'), "invalid-tenant-id" /* AuthErrorCode.INVALID_TENANT_ID */, "The Auth instance's tenant ID is invalid."), "login-blocked" /* AuthErrorCode.LOGIN_BLOCKED */, 'Login blocked by user-provided method: {$originalMessage}'), "missing-android-pkg-name" /* AuthErrorCode.MISSING_ANDROID_PACKAGE_NAME */, 'An Android Package Name must be provided if the Android App is required to be installed.'), "auth-domain-config-required" /* AuthErrorCode.MISSING_AUTH_DOMAIN */, 'Be sure to include authDomain when calling firebase.initializeApp(), ' + 'by following the instructions in the Firebase console.'), _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_ref, "missing-app-credential" /* AuthErrorCode.MISSING_APP_CREDENTIAL */, 'The phone verification request is missing an application verifier ' + 'assertion. A reCAPTCHA response token needs to be provided.'), "missing-verification-code" /* AuthErrorCode.MISSING_CODE */, 'The phone auth credential was created with an empty SMS verification code.'), "missing-continue-uri" /* AuthErrorCode.MISSING_CONTINUE_URI */, 'A continue URL must be provided in the request.'), "missing-iframe-start" /* AuthErrorCode.MISSING_IFRAME_START */, 'An internal AuthError has occurred.'), "missing-ios-bundle-id" /* AuthErrorCode.MISSING_IOS_BUNDLE_ID */, 'An iOS Bundle ID must be provided if an App Store ID is provided.'), "missing-or-invalid-nonce" /* AuthErrorCode.MISSING_OR_INVALID_NONCE */, 'The request does not contain a valid nonce. This can occur if the ' + 'SHA-256 hash of the provided raw nonce does not match the hashed nonce ' + 'in the ID token payload.'), "missing-password" /* AuthErrorCode.MISSING_PASSWORD */, 'A non-empty password must be provided'), "missing-multi-factor-info" /* AuthErrorCode.MISSING_MFA_INFO */, 'No second factor identifier is provided.'), "missing-multi-factor-session" /* AuthErrorCode.MISSING_MFA_SESSION */, 'The request is missing proof of first factor successful sign-in.'), "missing-phone-number" /* AuthErrorCode.MISSING_PHONE_NUMBER */, 'To send verification codes, provide a phone number for the recipient.'), _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_ref, "missing-verification-id" /* AuthErrorCode.MISSING_SESSION_INFO */, 'The phone auth credential was created with an empty verification ID.'), "app-deleted" /* AuthErrorCode.MODULE_DESTROYED */, 'This instance of FirebaseApp has been deleted.'), "multi-factor-info-not-found" /* AuthErrorCode.MFA_INFO_NOT_FOUND */, 'The user does not have a second factor matching the identifier provided.'), "multi-factor-auth-required" /* AuthErrorCode.MFA_REQUIRED */, 'Proof of ownership of a second factor is required to complete sign-in.'), "account-exists-with-different-credential" /* AuthErrorCode.NEED_CONFIRMATION */, 'An account already exists with the same email address but different ' + 'sign-in credentials. Sign in using a provider associated with this ' + 'email address.'), "network-request-failed" /* AuthErrorCode.NETWORK_REQUEST_FAILED */, 'A network AuthError (such as timeout, interrupted connection or unreachable host) has occurred.'), "no-auth-event" /* AuthErrorCode.NO_AUTH_EVENT */, 'An internal AuthError has occurred.'), "no-such-provider" /* AuthErrorCode.NO_SUCH_PROVIDER */, 'User was not linked to an account with the given provider.'), "null-user" /* AuthErrorCode.NULL_USER */, 'A null user object was provided as the argument for an operation which ' + 'requires a non-null user object.'), "operation-not-allowed" /* AuthErrorCode.OPERATION_NOT_ALLOWED */, 'The given sign-in provider is disabled for this Firebase project. ' + 'Enable it in the Firebase console, under the sign-in method tab of the ' + 'Auth section.'), _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_ref, "operation-not-supported-in-this-environment" /* AuthErrorCode.OPERATION_NOT_SUPPORTED */, 'This operation is not supported in the environment this application is ' + 'running on. "location.protocol" must be http, https or chrome-extension' + ' and web storage must be enabled.'), "popup-blocked" /* AuthErrorCode.POPUP_BLOCKED */, 'Unable to establish a connection with the popup. It may have been blocked by the browser.'), "popup-closed-by-user" /* AuthErrorCode.POPUP_CLOSED_BY_USER */, 'The popup has been closed by the user before finalizing the operation.'), "provider-already-linked" /* AuthErrorCode.PROVIDER_ALREADY_LINKED */, 'User can only be linked to one identity for the given provider.'), "quota-exceeded" /* AuthErrorCode.QUOTA_EXCEEDED */, "The project's quota for this operation has been exceeded."), "redirect-cancelled-by-user" /* AuthErrorCode.REDIRECT_CANCELLED_BY_USER */, 'The redirect operation has been cancelled by the user before finalizing.'), "redirect-operation-pending" /* AuthErrorCode.REDIRECT_OPERATION_PENDING */, 'A redirect sign-in operation is already pending.'), "rejected-credential" /* AuthErrorCode.REJECTED_CREDENTIAL */, 'The request contains malformed or mismatching credentials.'), "second-factor-already-in-use" /* AuthErrorCode.SECOND_FACTOR_ALREADY_ENROLLED */, 'The second factor is already enrolled on this account.'), "maximum-second-factor-count-exceeded" /* AuthErrorCode.SECOND_FACTOR_LIMIT_EXCEEDED */, 'The maximum allowed number of second factors on a user has been exceeded.'), _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_ref, "tenant-id-mismatch" /* AuthErrorCode.TENANT_ID_MISMATCH */, "The provided tenant ID does not match the Auth instance's tenant ID"), "timeout" /* AuthErrorCode.TIMEOUT */, 'The operation has timed out.'), "user-token-expired" /* AuthErrorCode.TOKEN_EXPIRED */, "The user's credential is no longer valid. The user must sign in again."), "too-many-requests" /* AuthErrorCode.TOO_MANY_ATTEMPTS_TRY_LATER */, 'We have blocked all requests from this device due to unusual activity. ' + 'Try again later.'), "unauthorized-continue-uri" /* AuthErrorCode.UNAUTHORIZED_DOMAIN */, 'The domain of the continue URL is not whitelisted.  Please whitelist ' + 'the domain in the Firebase console.'), "unsupported-first-factor" /* AuthErrorCode.UNSUPPORTED_FIRST_FACTOR */, 'Enrolling a second factor or signing in with a multi-factor account requires sign-in with a supported first factor.'), "unsupported-persistence-type" /* AuthErrorCode.UNSUPPORTED_PERSISTENCE */, 'The current environment does not support the specified persistence type.'), "unsupported-tenant-operation" /* AuthErrorCode.UNSUPPORTED_TENANT_OPERATION */, 'This operation is not supported in a multi-tenant context.'), "unverified-email" /* AuthErrorCode.UNVERIFIED_EMAIL */, 'The operation requires a verified email.'), "user-cancelled" /* AuthErrorCode.USER_CANCELLED */, 'The user did not grant your application the permissions it requested.'), _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_ref, "user-not-found" /* AuthErrorCode.USER_DELETED */, 'There is no user record corresponding to this identifier. The user may ' + 'have been deleted.'), "user-disabled" /* AuthErrorCode.USER_DISABLED */, 'The user account has been disabled by an administrator.'), "user-mismatch" /* AuthErrorCode.USER_MISMATCH */, 'The supplied credentials do not correspond to the previously signed in user.'), "user-signed-out" /* AuthErrorCode.USER_SIGNED_OUT */, ''), "weak-password" /* AuthErrorCode.WEAK_PASSWORD */, 'The password must be 6 characters long or more.'), "web-storage-unsupported" /* AuthErrorCode.WEB_STORAGE_UNSUPPORTED */, 'This browser is not supported or 3rd party cookies and data may be disabled.'), "already-initialized" /* AuthErrorCode.ALREADY_INITIALIZED */, 'initializeAuth() has already been called with ' + 'different options. To avoid this error, call initializeAuth() with the ' + 'same options as when it was originally called, or call getAuth() to return the' + ' already initialized instance.'), "missing-recaptcha-token" /* AuthErrorCode.MISSING_RECAPTCHA_TOKEN */, 'The reCAPTCHA token is missing when sending request to the backend.'), "invalid-recaptcha-token" /* AuthErrorCode.INVALID_RECAPTCHA_TOKEN */, 'The reCAPTCHA token is invalid when sending request to the backend.'), "invalid-recaptcha-action" /* AuthErrorCode.INVALID_RECAPTCHA_ACTION */, 'The reCAPTCHA action is invalid when sending request to the backend.'), _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_ref, "recaptcha-not-enabled" /* AuthErrorCode.RECAPTCHA_NOT_ENABLED */, 'reCAPTCHA Enterprise integration is not enabled for this project.'), "missing-client-type" /* AuthErrorCode.MISSING_CLIENT_TYPE */, 'The reCAPTCHA client type is missing when sending request to the backend.'), "missing-recaptcha-version" /* AuthErrorCode.MISSING_RECAPTCHA_VERSION */, 'The reCAPTCHA version is missing when sending request to the backend.'), "invalid-req-type" /* AuthErrorCode.INVALID_REQ_TYPE */, 'Invalid request parameters.'), "invalid-recaptcha-version" /* AuthErrorCode.INVALID_RECAPTCHA_VERSION */, 'The reCAPTCHA version is invalid when sending request to the backend.'), "unsupported-password-policy-schema-version" /* AuthErrorCode.UNSUPPORTED_PASSWORD_POLICY_SCHEMA_VERSION */, 'The password policy received from the backend uses a schema version that is not supported by this version of the Firebase SDK.'), "password-does-not-meet-requirements" /* AuthErrorCode.PASSWORD_DOES_NOT_MEET_REQUIREMENTS */, 'The password does not meet the requirements.'), "invalid-hosting-link-domain" /* AuthErrorCode.INVALID_HOSTING_LINK_DOMAIN */, 'The provided Hosting link domain is not configured in Firebase Hosting or is not owned by ' + 'the current project. This cannot be a default Hosting domain (`web.app` or `firebaseapp.com`).');
}
function _prodErrorMap() {
  // We will include this one message in the prod error map since by the very
  // nature of this error, developers will never be able to see the message
  // using the debugErrorMap (which is installed during auth initialization).
  return _defineProperty({}, "dependent-sdk-initialized-before-auth" /* AuthErrorCode.DEPENDENT_SDK_INIT_BEFORE_AUTH */, 'Another Firebase SDK was initialized and is trying to use Auth before Auth is ' + 'initialized. Please be sure to call `initializeAuth` or `getAuth` before ' + 'starting any other Firebase SDK.');
}
/**
 * A verbose error map with detailed descriptions for most error codes.
 *
 * See discussion at {@link AuthErrorMap}
 *
 * @public
 */
var debugErrorMap = exports.H = _debugErrorMap;
/**
 * A minimal error map with all verbose error messages stripped.
 *
 * See discussion at {@link AuthErrorMap}
 *
 * @public
 */
var prodErrorMap = exports.I = _prodErrorMap;
var _DEFAULT_AUTH_ERROR_FACTORY = new _util.ErrorFactory('auth', 'Firebase', _prodErrorMap());
/**
 * A map of potential `Auth` error codes, for easier comparison with errors
 * thrown by the SDK.
 *
 * @remarks
 * Note that you can't tree-shake individual keys
 * in the map, so by using the map you might substantially increase your
 * bundle size.
 *
 * @public
 */
var AUTH_ERROR_CODES_MAP_DO_NOT_USE_INTERNALLY = exports.J = {
  ADMIN_ONLY_OPERATION: 'auth/admin-restricted-operation',
  ARGUMENT_ERROR: 'auth/argument-error',
  APP_NOT_AUTHORIZED: 'auth/app-not-authorized',
  APP_NOT_INSTALLED: 'auth/app-not-installed',
  CAPTCHA_CHECK_FAILED: 'auth/captcha-check-failed',
  CODE_EXPIRED: 'auth/code-expired',
  CORDOVA_NOT_READY: 'auth/cordova-not-ready',
  CORS_UNSUPPORTED: 'auth/cors-unsupported',
  CREDENTIAL_ALREADY_IN_USE: 'auth/credential-already-in-use',
  CREDENTIAL_MISMATCH: 'auth/custom-token-mismatch',
  CREDENTIAL_TOO_OLD_LOGIN_AGAIN: 'auth/requires-recent-login',
  DEPENDENT_SDK_INIT_BEFORE_AUTH: 'auth/dependent-sdk-initialized-before-auth',
  DYNAMIC_LINK_NOT_ACTIVATED: 'auth/dynamic-link-not-activated',
  EMAIL_CHANGE_NEEDS_VERIFICATION: 'auth/email-change-needs-verification',
  EMAIL_EXISTS: 'auth/email-already-in-use',
  EMULATOR_CONFIG_FAILED: 'auth/emulator-config-failed',
  EXPIRED_OOB_CODE: 'auth/expired-action-code',
  EXPIRED_POPUP_REQUEST: 'auth/cancelled-popup-request',
  INTERNAL_ERROR: 'auth/internal-error',
  INVALID_API_KEY: 'auth/invalid-api-key',
  INVALID_APP_CREDENTIAL: 'auth/invalid-app-credential',
  INVALID_APP_ID: 'auth/invalid-app-id',
  INVALID_AUTH: 'auth/invalid-user-token',
  INVALID_AUTH_EVENT: 'auth/invalid-auth-event',
  INVALID_CERT_HASH: 'auth/invalid-cert-hash',
  INVALID_CODE: 'auth/invalid-verification-code',
  INVALID_CONTINUE_URI: 'auth/invalid-continue-uri',
  INVALID_CORDOVA_CONFIGURATION: 'auth/invalid-cordova-configuration',
  INVALID_CUSTOM_TOKEN: 'auth/invalid-custom-token',
  INVALID_DYNAMIC_LINK_DOMAIN: 'auth/invalid-dynamic-link-domain',
  INVALID_EMAIL: 'auth/invalid-email',
  INVALID_EMULATOR_SCHEME: 'auth/invalid-emulator-scheme',
  INVALID_IDP_RESPONSE: 'auth/invalid-credential',
  INVALID_LOGIN_CREDENTIALS: 'auth/invalid-credential',
  INVALID_MESSAGE_PAYLOAD: 'auth/invalid-message-payload',
  INVALID_MFA_SESSION: 'auth/invalid-multi-factor-session',
  INVALID_OAUTH_CLIENT_ID: 'auth/invalid-oauth-client-id',
  INVALID_OAUTH_PROVIDER: 'auth/invalid-oauth-provider',
  INVALID_OOB_CODE: 'auth/invalid-action-code',
  INVALID_ORIGIN: 'auth/unauthorized-domain',
  INVALID_PASSWORD: 'auth/wrong-password',
  INVALID_PERSISTENCE: 'auth/invalid-persistence-type',
  INVALID_PHONE_NUMBER: 'auth/invalid-phone-number',
  INVALID_PROVIDER_ID: 'auth/invalid-provider-id',
  INVALID_RECIPIENT_EMAIL: 'auth/invalid-recipient-email',
  INVALID_SENDER: 'auth/invalid-sender',
  INVALID_SESSION_INFO: 'auth/invalid-verification-id',
  INVALID_TENANT_ID: 'auth/invalid-tenant-id',
  MFA_INFO_NOT_FOUND: 'auth/multi-factor-info-not-found',
  MFA_REQUIRED: 'auth/multi-factor-auth-required',
  MISSING_ANDROID_PACKAGE_NAME: 'auth/missing-android-pkg-name',
  MISSING_APP_CREDENTIAL: 'auth/missing-app-credential',
  MISSING_AUTH_DOMAIN: 'auth/auth-domain-config-required',
  MISSING_CODE: 'auth/missing-verification-code',
  MISSING_CONTINUE_URI: 'auth/missing-continue-uri',
  MISSING_IFRAME_START: 'auth/missing-iframe-start',
  MISSING_IOS_BUNDLE_ID: 'auth/missing-ios-bundle-id',
  MISSING_OR_INVALID_NONCE: 'auth/missing-or-invalid-nonce',
  MISSING_MFA_INFO: 'auth/missing-multi-factor-info',
  MISSING_MFA_SESSION: 'auth/missing-multi-factor-session',
  MISSING_PHONE_NUMBER: 'auth/missing-phone-number',
  MISSING_SESSION_INFO: 'auth/missing-verification-id',
  MODULE_DESTROYED: 'auth/app-deleted',
  NEED_CONFIRMATION: 'auth/account-exists-with-different-credential',
  NETWORK_REQUEST_FAILED: 'auth/network-request-failed',
  NULL_USER: 'auth/null-user',
  NO_AUTH_EVENT: 'auth/no-auth-event',
  NO_SUCH_PROVIDER: 'auth/no-such-provider',
  OPERATION_NOT_ALLOWED: 'auth/operation-not-allowed',
  OPERATION_NOT_SUPPORTED: 'auth/operation-not-supported-in-this-environment',
  POPUP_BLOCKED: 'auth/popup-blocked',
  POPUP_CLOSED_BY_USER: 'auth/popup-closed-by-user',
  PROVIDER_ALREADY_LINKED: 'auth/provider-already-linked',
  QUOTA_EXCEEDED: 'auth/quota-exceeded',
  REDIRECT_CANCELLED_BY_USER: 'auth/redirect-cancelled-by-user',
  REDIRECT_OPERATION_PENDING: 'auth/redirect-operation-pending',
  REJECTED_CREDENTIAL: 'auth/rejected-credential',
  SECOND_FACTOR_ALREADY_ENROLLED: 'auth/second-factor-already-in-use',
  SECOND_FACTOR_LIMIT_EXCEEDED: 'auth/maximum-second-factor-count-exceeded',
  TENANT_ID_MISMATCH: 'auth/tenant-id-mismatch',
  TIMEOUT: 'auth/timeout',
  TOKEN_EXPIRED: 'auth/user-token-expired',
  TOO_MANY_ATTEMPTS_TRY_LATER: 'auth/too-many-requests',
  UNAUTHORIZED_DOMAIN: 'auth/unauthorized-continue-uri',
  UNSUPPORTED_FIRST_FACTOR: 'auth/unsupported-first-factor',
  UNSUPPORTED_PERSISTENCE: 'auth/unsupported-persistence-type',
  UNSUPPORTED_TENANT_OPERATION: 'auth/unsupported-tenant-operation',
  UNVERIFIED_EMAIL: 'auth/unverified-email',
  USER_CANCELLED: 'auth/user-cancelled',
  USER_DELETED: 'auth/user-not-found',
  USER_DISABLED: 'auth/user-disabled',
  USER_MISMATCH: 'auth/user-mismatch',
  USER_SIGNED_OUT: 'auth/user-signed-out',
  WEAK_PASSWORD: 'auth/weak-password',
  WEB_STORAGE_UNSUPPORTED: 'auth/web-storage-unsupported',
  ALREADY_INITIALIZED: 'auth/already-initialized',
  RECAPTCHA_NOT_ENABLED: 'auth/recaptcha-not-enabled',
  MISSING_RECAPTCHA_TOKEN: 'auth/missing-recaptcha-token',
  INVALID_RECAPTCHA_TOKEN: 'auth/invalid-recaptcha-token',
  INVALID_RECAPTCHA_ACTION: 'auth/invalid-recaptcha-action',
  MISSING_CLIENT_TYPE: 'auth/missing-client-type',
  MISSING_RECAPTCHA_VERSION: 'auth/missing-recaptcha-version',
  INVALID_RECAPTCHA_VERSION: 'auth/invalid-recaptcha-version',
  INVALID_REQ_TYPE: 'auth/invalid-req-type',
  INVALID_HOSTING_LINK_DOMAIN: 'auth/invalid-hosting-link-domain'
};

/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var logClient = new _logger.Logger('@firebase/auth');
function _logWarn(msg) {
  if (logClient.logLevel <= _logger.LogLevel.WARN) {
    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key2 = 1; _key2 < _len; _key2++) {
      args[_key2 - 1] = arguments[_key2];
    }
    logClient.warn.apply(logClient, ["Auth (".concat(_app.SDK_VERSION, "): ").concat(msg)].concat(args));
  }
}
function _logError(msg) {
  if (logClient.logLevel <= _logger.LogLevel.ERROR) {
    for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key3 = 1; _key3 < _len2; _key3++) {
      args[_key3 - 1] = arguments[_key3];
    }
    logClient.error.apply(logClient, ["Auth (".concat(_app.SDK_VERSION, "): ").concat(msg)].concat(args));
  }
}

/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function _fail(authOrCode) {
  for (var _len3 = arguments.length, rest = new Array(_len3 > 1 ? _len3 - 1 : 0), _key4 = 1; _key4 < _len3; _key4++) {
    rest[_key4 - 1] = arguments[_key4];
  }
  throw createErrorInternal.apply(void 0, [authOrCode].concat(rest));
}
function _createError(authOrCode) {
  for (var _len4 = arguments.length, rest = new Array(_len4 > 1 ? _len4 - 1 : 0), _key5 = 1; _key5 < _len4; _key5++) {
    rest[_key5 - 1] = arguments[_key5];
  }
  return createErrorInternal.apply(void 0, [authOrCode].concat(rest));
}
function _errorWithCustomMessage(auth, code, message) {
  var errorMap = Object.assign(Object.assign({}, prodErrorMap()), _defineProperty({}, code, message));
  var factory = new _util.ErrorFactory('auth', 'Firebase', errorMap);
  return factory.create(code, {
    appName: auth.name
  });
}
function _serverAppCurrentUserOperationNotSupportedError(auth) {
  return _errorWithCustomMessage(auth, "operation-not-supported-in-this-environment" /* AuthErrorCode.OPERATION_NOT_SUPPORTED */, 'Operations that alter the current user are not supported in conjunction with FirebaseServerApp');
}
function _assertInstanceOf(auth, object, instance) {
  var constructorInstance = instance;
  if (!(object instanceof constructorInstance)) {
    if (constructorInstance.name !== object.constructor.name) {
      _fail(auth, "argument-error" /* AuthErrorCode.ARGUMENT_ERROR */);
    }
    throw _errorWithCustomMessage(auth, "argument-error" /* AuthErrorCode.ARGUMENT_ERROR */, "Type of ".concat(object.constructor.name, " does not match expected instance.") + "Did you pass a reference from a different Auth SDK?");
  }
}
function createErrorInternal(authOrCode) {
  for (var _len5 = arguments.length, rest = new Array(_len5 > 1 ? _len5 - 1 : 0), _key6 = 1; _key6 < _len5; _key6++) {
    rest[_key6 - 1] = arguments[_key6];
  }
  if (typeof authOrCode !== 'string') {
    var _authOrCode$_errorFac;
    var code = rest[0];
    var fullParams = _toConsumableArray(rest.slice(1));
    if (fullParams[0]) {
      fullParams[0].appName = authOrCode.name;
    }
    return (_authOrCode$_errorFac = authOrCode._errorFactory).create.apply(_authOrCode$_errorFac, [code].concat(_toConsumableArray(fullParams)));
  }
  return _DEFAULT_AUTH_ERROR_FACTORY.create.apply(_DEFAULT_AUTH_ERROR_FACTORY, [authOrCode].concat(rest));
}
function _assert(assertion, authOrCode) {
  if (!assertion) {
    for (var _len6 = arguments.length, rest = new Array(_len6 > 2 ? _len6 - 2 : 0), _key7 = 2; _key7 < _len6; _key7++) {
      rest[_key7 - 2] = arguments[_key7];
    }
    throw createErrorInternal.apply(void 0, [authOrCode].concat(rest));
  }
}
/**
 * Unconditionally fails, throwing an internal error with the given message.
 *
 * @param failure type of failure encountered
 * @throws Error
 */
function debugFail(failure) {
  // Log the failure in addition to throw an exception, just in case the
  // exception is swallowed.
  var message = "INTERNAL ASSERTION FAILED: " + failure;
  _logError(message);
  // NOTE: We don't use FirebaseError here because these are internal failures
  // that cannot be handled by the user. (Also it would create a circular
  // dependency between the error and assert modules which doesn't work.)
  throw new Error(message);
}
/**
 * Fails if the given assertion condition is false, throwing an Error with the
 * given message if it did.
 *
 * @param assertion
 * @param message
 */
function debugAssert(assertion, message) {
  if (!assertion) {
    debugFail(message);
  }
}

/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function _getCurrentUrl() {
  var _a;
  return typeof self !== 'undefined' && ((_a = self.location) === null || _a === void 0 ? void 0 : _a.href) || '';
}
function _isHttpOrHttps() {
  return _getCurrentScheme() === 'http:' || _getCurrentScheme() === 'https:';
}
function _getCurrentScheme() {
  var _a;
  return typeof self !== 'undefined' && ((_a = self.location) === null || _a === void 0 ? void 0 : _a.protocol) || null;
}

/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Determine whether the browser is working online
 */
function _isOnline() {
  if (typeof navigator !== 'undefined' && navigator && 'onLine' in navigator && typeof navigator.onLine === 'boolean' && (
  // Apply only for traditional web apps and Chrome extensions.
  // This is especially true for Cordova apps which have unreliable
  // navigator.onLine behavior unless cordova-plugin-network-information is
  // installed which overwrites the native navigator.onLine value and
  // defines navigator.connection.
  _isHttpOrHttps() || (0, _util.isBrowserExtension)() || 'connection' in navigator)) {
    return navigator.onLine;
  }
  // If we can't determine the state, assume it is online.
  return true;
}
function _getUserLanguage() {
  if (typeof navigator === 'undefined') {
    return null;
  }
  var navigatorLanguage = navigator;
  return (
    // Most reliable, but only supported in Chrome/Firefox.
    navigatorLanguage.languages && navigatorLanguage.languages[0] ||
    // Supported in most browsers, but returns the language of the browser
    // UI, not the language set in browser settings.
    navigatorLanguage.language ||
    // Couldn't determine language.
    null
  );
}

/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * A structure to help pick between a range of long and short delay durations
 * depending on the current environment. In general, the long delay is used for
 * mobile environments whereas short delays are used for desktop environments.
 */
var Delay = /*#__PURE__*/function () {
  function Delay(shortDelay, longDelay) {
    _classCallCheck(this, Delay);
    this.shortDelay = shortDelay;
    this.longDelay = longDelay;
    // Internal error when improperly initialized.
    debugAssert(longDelay > shortDelay, 'Short delay should be less than long delay!');
    this.isMobile = (0, _util.isMobileCordova)() || (0, _util.isReactNative)();
  }
  return _createClass(Delay, [{
    key: "get",
    value: function get() {
      if (!_isOnline()) {
        // Pick the shorter timeout.
        return Math.min(5000 /* DelayMin.OFFLINE */, this.shortDelay);
      }
      // If running in a mobile environment, return the long delay, otherwise
      // return the short delay.
      // This could be improved in the future to dynamically change based on other
      // variables instead of just reading the current environment.
      return this.isMobile ? this.longDelay : this.shortDelay;
    }
  }]);
}();
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function _emulatorUrl(config, path) {
  debugAssert(config.emulator, 'Emulator should always be set here');
  var url = config.emulator.url;
  if (!path) {
    return url;
  }
  return "".concat(url).concat(path.startsWith('/') ? path.slice(1) : path);
}

/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var FetchProvider = exports.aQ = /*#__PURE__*/function () {
  function FetchProvider() {
    _classCallCheck(this, FetchProvider);
  }
  return _createClass(FetchProvider, null, [{
    key: "initialize",
    value: function initialize(fetchImpl, headersImpl, responseImpl) {
      this.fetchImpl = fetchImpl;
      if (headersImpl) {
        this.headersImpl = headersImpl;
      }
      if (responseImpl) {
        this.responseImpl = responseImpl;
      }
    }
  }, {
    key: "fetch",
    value: function (_fetch) {
      function fetch() {
        return _fetch.apply(this, arguments);
      }
      fetch.toString = function () {
        return _fetch.toString();
      };
      return fetch;
    }(function () {
      if (this.fetchImpl) {
        return this.fetchImpl;
      }
      if (typeof self !== 'undefined' && 'fetch' in self) {
        return self.fetch;
      }
      if (typeof globalThis !== 'undefined' && globalThis.fetch) {
        return globalThis.fetch;
      }
      if (typeof fetch !== 'undefined') {
        return fetch;
      }
      debugFail('Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill');
    })
  }, {
    key: "headers",
    value: function headers() {
      if (this.headersImpl) {
        return this.headersImpl;
      }
      if (typeof self !== 'undefined' && 'Headers' in self) {
        return self.Headers;
      }
      if (typeof globalThis !== 'undefined' && globalThis.Headers) {
        return globalThis.Headers;
      }
      if (typeof Headers !== 'undefined') {
        return Headers;
      }
      debugFail('Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill');
    }
  }, {
    key: "response",
    value: function response() {
      if (this.responseImpl) {
        return this.responseImpl;
      }
      if (typeof self !== 'undefined' && 'Response' in self) {
        return self.Response;
      }
      if (typeof globalThis !== 'undefined' && globalThis.Response) {
        return globalThis.Response;
      }
      if (typeof Response !== 'undefined') {
        return Response;
      }
      debugFail('Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill');
    }
  }]);
}();
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Map from errors returned by the server to errors to developer visible errors
 */
var SERVER_ERROR_MAP = (_SERVER_ERROR_MAP = {}, _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_SERVER_ERROR_MAP, "CREDENTIAL_MISMATCH" /* ServerError.CREDENTIAL_MISMATCH */, "custom-token-mismatch"), "MISSING_CUSTOM_TOKEN" /* ServerError.MISSING_CUSTOM_TOKEN */, "internal-error"), "INVALID_IDENTIFIER" /* ServerError.INVALID_IDENTIFIER */, "invalid-email"), "MISSING_CONTINUE_URI" /* ServerError.MISSING_CONTINUE_URI */, "internal-error"), "INVALID_PASSWORD" /* ServerError.INVALID_PASSWORD */, "wrong-password"), "MISSING_PASSWORD" /* ServerError.MISSING_PASSWORD */, "missing-password"), "INVALID_LOGIN_CREDENTIALS" /* ServerError.INVALID_LOGIN_CREDENTIALS */, "invalid-credential"), "EMAIL_EXISTS" /* ServerError.EMAIL_EXISTS */, "email-already-in-use"), "PASSWORD_LOGIN_DISABLED" /* ServerError.PASSWORD_LOGIN_DISABLED */, "operation-not-allowed"), "INVALID_IDP_RESPONSE" /* ServerError.INVALID_IDP_RESPONSE */, "invalid-credential"), _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_SERVER_ERROR_MAP, "INVALID_PENDING_TOKEN" /* ServerError.INVALID_PENDING_TOKEN */, "invalid-credential"), "FEDERATED_USER_ID_ALREADY_LINKED" /* ServerError.FEDERATED_USER_ID_ALREADY_LINKED */, "credential-already-in-use"), "MISSING_REQ_TYPE" /* ServerError.MISSING_REQ_TYPE */, "internal-error"), "EMAIL_NOT_FOUND" /* ServerError.EMAIL_NOT_FOUND */, "user-not-found"), "RESET_PASSWORD_EXCEED_LIMIT" /* ServerError.RESET_PASSWORD_EXCEED_LIMIT */, "too-many-requests"), "EXPIRED_OOB_CODE" /* ServerError.EXPIRED_OOB_CODE */, "expired-action-code"), "INVALID_OOB_CODE" /* ServerError.INVALID_OOB_CODE */, "invalid-action-code"), "MISSING_OOB_CODE" /* ServerError.MISSING_OOB_CODE */, "internal-error"), "CREDENTIAL_TOO_OLD_LOGIN_AGAIN" /* ServerError.CREDENTIAL_TOO_OLD_LOGIN_AGAIN */, "requires-recent-login"), "INVALID_ID_TOKEN" /* ServerError.INVALID_ID_TOKEN */, "invalid-user-token"), _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_SERVER_ERROR_MAP, "TOKEN_EXPIRED" /* ServerError.TOKEN_EXPIRED */, "user-token-expired"), "USER_NOT_FOUND" /* ServerError.USER_NOT_FOUND */, "user-token-expired"), "TOO_MANY_ATTEMPTS_TRY_LATER" /* ServerError.TOO_MANY_ATTEMPTS_TRY_LATER */, "too-many-requests"), "PASSWORD_DOES_NOT_MEET_REQUIREMENTS" /* ServerError.PASSWORD_DOES_NOT_MEET_REQUIREMENTS */, "password-does-not-meet-requirements"), "INVALID_CODE" /* ServerError.INVALID_CODE */, "invalid-verification-code"), "INVALID_SESSION_INFO" /* ServerError.INVALID_SESSION_INFO */, "invalid-verification-id"), "INVALID_TEMPORARY_PROOF" /* ServerError.INVALID_TEMPORARY_PROOF */, "invalid-credential"), "MISSING_SESSION_INFO" /* ServerError.MISSING_SESSION_INFO */, "missing-verification-id"), "SESSION_EXPIRED" /* ServerError.SESSION_EXPIRED */, "code-expired"), "MISSING_ANDROID_PACKAGE_NAME" /* ServerError.MISSING_ANDROID_PACKAGE_NAME */, "missing-android-pkg-name"), _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_SERVER_ERROR_MAP, "UNAUTHORIZED_DOMAIN" /* ServerError.UNAUTHORIZED_DOMAIN */, "unauthorized-continue-uri"), "INVALID_OAUTH_CLIENT_ID" /* ServerError.INVALID_OAUTH_CLIENT_ID */, "invalid-oauth-client-id"), "ADMIN_ONLY_OPERATION" /* ServerError.ADMIN_ONLY_OPERATION */, "admin-restricted-operation"), "INVALID_MFA_PENDING_CREDENTIAL" /* ServerError.INVALID_MFA_PENDING_CREDENTIAL */, "invalid-multi-factor-session"), "MFA_ENROLLMENT_NOT_FOUND" /* ServerError.MFA_ENROLLMENT_NOT_FOUND */, "multi-factor-info-not-found"), "MISSING_MFA_ENROLLMENT_ID" /* ServerError.MISSING_MFA_ENROLLMENT_ID */, "missing-multi-factor-info"), "MISSING_MFA_PENDING_CREDENTIAL" /* ServerError.MISSING_MFA_PENDING_CREDENTIAL */, "missing-multi-factor-session"), "SECOND_FACTOR_EXISTS" /* ServerError.SECOND_FACTOR_EXISTS */, "second-factor-already-in-use"), "SECOND_FACTOR_LIMIT_EXCEEDED" /* ServerError.SECOND_FACTOR_LIMIT_EXCEEDED */, "maximum-second-factor-count-exceeded"), "BLOCKING_FUNCTION_ERROR_RESPONSE" /* ServerError.BLOCKING_FUNCTION_ERROR_RESPONSE */, "internal-error"), _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_SERVER_ERROR_MAP, "RECAPTCHA_NOT_ENABLED" /* ServerError.RECAPTCHA_NOT_ENABLED */, "recaptcha-not-enabled"), "MISSING_RECAPTCHA_TOKEN" /* ServerError.MISSING_RECAPTCHA_TOKEN */, "missing-recaptcha-token"), "INVALID_RECAPTCHA_TOKEN" /* ServerError.INVALID_RECAPTCHA_TOKEN */, "invalid-recaptcha-token"), "INVALID_RECAPTCHA_ACTION" /* ServerError.INVALID_RECAPTCHA_ACTION */, "invalid-recaptcha-action"), "MISSING_CLIENT_TYPE" /* ServerError.MISSING_CLIENT_TYPE */, "missing-client-type"), "MISSING_RECAPTCHA_VERSION" /* ServerError.MISSING_RECAPTCHA_VERSION */, "missing-recaptcha-version"), "INVALID_RECAPTCHA_VERSION" /* ServerError.INVALID_RECAPTCHA_VERSION */, "invalid-recaptcha-version"), "INVALID_REQ_TYPE" /* ServerError.INVALID_REQ_TYPE */, "invalid-req-type"));

/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var CookieAuthProxiedEndpoints = ["/v1/accounts:signInWithCustomToken" /* Endpoint.SIGN_IN_WITH_CUSTOM_TOKEN */, "/v1/accounts:signInWithEmailLink" /* Endpoint.SIGN_IN_WITH_EMAIL_LINK */, "/v1/accounts:signInWithIdp" /* Endpoint.SIGN_IN_WITH_IDP */, "/v1/accounts:signInWithPassword" /* Endpoint.SIGN_IN_WITH_PASSWORD */, "/v1/accounts:signInWithPhoneNumber" /* Endpoint.SIGN_IN_WITH_PHONE_NUMBER */, "/v1/token" /* Endpoint.TOKEN */];
var DEFAULT_API_TIMEOUT_MS = new Delay(30000, 60000);
function _addTidIfNecessary(auth, request) {
  if (auth.tenantId && !request.tenantId) {
    return Object.assign(Object.assign({}, request), {
      tenantId: auth.tenantId
    });
  }
  return request;
}
function _performApiRequest(_x, _x2, _x3, _x4) {
  return _performApiRequest2.apply(this, arguments);
}
function _performApiRequest2() {
  _performApiRequest2 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee106(auth, method, path, request) {
    var customErrorMap,
      _args106 = arguments;
    return _regeneratorRuntime().wrap(function _callee106$(_context106) {
      while (1) switch (_context106.prev = _context106.next) {
        case 0:
          customErrorMap = _args106.length > 4 && _args106[4] !== undefined ? _args106[4] : {};
          return _context106.abrupt("return", _performFetchWithErrorHandling(auth, customErrorMap, /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee105() {
            var body, params, query, headers, fetchArgs;
            return _regeneratorRuntime().wrap(function _callee105$(_context105) {
              while (1) switch (_context105.prev = _context105.next) {
                case 0:
                  body = {};
                  params = {};
                  if (request) {
                    if (method === "GET" /* HttpMethod.GET */) {
                      params = request;
                    } else {
                      body = {
                        body: JSON.stringify(request)
                      };
                    }
                  }
                  query = (0, _util.querystring)(Object.assign({
                    key: auth.config.apiKey
                  }, params)).slice(1);
                  _context105.next = 6;
                  return auth._getAdditionalHeaders();
                case 6:
                  headers = _context105.sent;
                  headers["Content-Type" /* HttpHeader.CONTENT_TYPE */] = 'application/json';
                  if (auth.languageCode) {
                    headers["X-Firebase-Locale" /* HttpHeader.X_FIREBASE_LOCALE */] = auth.languageCode;
                  }
                  fetchArgs = Object.assign({
                    method: method,
                    headers: headers
                  }, body);
                  /* Security-conscious server-side frameworks tend to have built in mitigations for referrer
                     problems". See the Cloudflare GitHub issue #487: Error: The 'referrerPolicy' field on
                     'RequestInitializerDict' is not implemented."
                     https://github.com/cloudflare/next-on-pages/issues/487 */
                  if (!(0, _util.isCloudflareWorker)()) {
                    fetchArgs.referrerPolicy = 'no-referrer';
                  }
                  if (auth.emulatorConfig && (0, _util.isCloudWorkstation)(auth.emulatorConfig.host)) {
                    fetchArgs.credentials = 'include';
                  }
                  _context105.t0 = FetchProvider.fetch();
                  _context105.next = 15;
                  return _getFinalTarget(auth, auth.config.apiHost, path, query);
                case 15:
                  _context105.t1 = _context105.sent;
                  _context105.t2 = fetchArgs;
                  return _context105.abrupt("return", (0, _context105.t0)(_context105.t1, _context105.t2));
                case 18:
                case "end":
                  return _context105.stop();
              }
            }, _callee105);
          }))));
        case 2:
        case "end":
          return _context106.stop();
      }
    }, _callee106);
  }));
  return _performApiRequest2.apply(this, arguments);
}
function _performFetchWithErrorHandling(_x5, _x6, _x7) {
  return _performFetchWithErrorHandling2.apply(this, arguments);
}
function _performFetchWithErrorHandling2() {
  _performFetchWithErrorHandling2 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee107(auth, customErrorMap, fetchFn) {
    var errorMap, networkTimeout, response, json, errorMessage, _errorMessage$split, _errorMessage$split2, serverErrorCode, serverErrorMessage, authError;
    return _regeneratorRuntime().wrap(function _callee107$(_context107) {
      while (1) switch (_context107.prev = _context107.next) {
        case 0:
          auth._canInitEmulator = false;
          errorMap = Object.assign(Object.assign({}, SERVER_ERROR_MAP), customErrorMap);
          _context107.prev = 2;
          networkTimeout = new NetworkTimeout(auth);
          _context107.next = 6;
          return Promise.race([fetchFn(), networkTimeout.promise]);
        case 6:
          response = _context107.sent;
          // If we've reached this point, the fetch succeeded and the networkTimeout
          // didn't throw; clear the network timeout delay so that Node won't hang
          networkTimeout.clearNetworkTimeout();
          _context107.next = 10;
          return response.json();
        case 10:
          json = _context107.sent;
          if (!('needConfirmation' in json)) {
            _context107.next = 13;
            break;
          }
          throw _makeTaggedError(auth, "account-exists-with-different-credential" /* AuthErrorCode.NEED_CONFIRMATION */, json);
        case 13:
          if (!(response.ok && !('errorMessage' in json))) {
            _context107.next = 17;
            break;
          }
          return _context107.abrupt("return", json);
        case 17:
          errorMessage = response.ok ? json.errorMessage : json.error.message;
          _errorMessage$split = errorMessage.split(' : '), _errorMessage$split2 = _slicedToArray(_errorMessage$split, 2), serverErrorCode = _errorMessage$split2[0], serverErrorMessage = _errorMessage$split2[1];
          if (!(serverErrorCode === "FEDERATED_USER_ID_ALREADY_LINKED" /* ServerError.FEDERATED_USER_ID_ALREADY_LINKED */)) {
            _context107.next = 23;
            break;
          }
          throw _makeTaggedError(auth, "credential-already-in-use" /* AuthErrorCode.CREDENTIAL_ALREADY_IN_USE */, json);
        case 23:
          if (!(serverErrorCode === "EMAIL_EXISTS" /* ServerError.EMAIL_EXISTS */)) {
            _context107.next = 27;
            break;
          }
          throw _makeTaggedError(auth, "email-already-in-use" /* AuthErrorCode.EMAIL_EXISTS */, json);
        case 27:
          if (!(serverErrorCode === "USER_DISABLED" /* ServerError.USER_DISABLED */)) {
            _context107.next = 29;
            break;
          }
          throw _makeTaggedError(auth, "user-disabled" /* AuthErrorCode.USER_DISABLED */, json);
        case 29:
          authError = errorMap[serverErrorCode] || serverErrorCode.toLowerCase().replace(/[_\s]+/g, '-');
          if (!serverErrorMessage) {
            _context107.next = 34;
            break;
          }
          throw _errorWithCustomMessage(auth, authError, serverErrorMessage);
        case 34:
          _fail(auth, authError);
        case 35:
          _context107.next = 42;
          break;
        case 37:
          _context107.prev = 37;
          _context107.t0 = _context107["catch"](2);
          if (!(_context107.t0 instanceof _util.FirebaseError)) {
            _context107.next = 41;
            break;
          }
          throw _context107.t0;
        case 41:
          // Changing this to a different error code will log user out when there is a network error
          // because we treat any error other than NETWORK_REQUEST_FAILED as token is invalid.
          // https://github.com/firebase/firebase-js-sdk/blob/4fbc73610d70be4e0852e7de63a39cb7897e8546/packages/auth/src/core/auth/auth_impl.ts#L309-L316
          _fail(auth, "network-request-failed" /* AuthErrorCode.NETWORK_REQUEST_FAILED */, {
            'message': String(_context107.t0)
          });
        case 42:
        case "end":
          return _context107.stop();
      }
    }, _callee107, null, [[2, 37]]);
  }));
  return _performFetchWithErrorHandling2.apply(this, arguments);
}
function _performSignInRequest(_x8, _x9, _x0, _x1) {
  return _performSignInRequest2.apply(this, arguments);
}
function _performSignInRequest2() {
  _performSignInRequest2 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee108(auth, method, path, request) {
    var customErrorMap,
      serverResponse,
      _args108 = arguments;
    return _regeneratorRuntime().wrap(function _callee108$(_context108) {
      while (1) switch (_context108.prev = _context108.next) {
        case 0:
          customErrorMap = _args108.length > 4 && _args108[4] !== undefined ? _args108[4] : {};
          _context108.next = 3;
          return _performApiRequest(auth, method, path, request, customErrorMap);
        case 3:
          serverResponse = _context108.sent;
          if ('mfaPendingCredential' in serverResponse) {
            _fail(auth, "multi-factor-auth-required" /* AuthErrorCode.MFA_REQUIRED */, {
              _serverResponse: serverResponse
            });
          }
          return _context108.abrupt("return", serverResponse);
        case 6:
        case "end":
          return _context108.stop();
      }
    }, _callee108);
  }));
  return _performSignInRequest2.apply(this, arguments);
}
function _getFinalTarget(_x10, _x11, _x12, _x13) {
  return _getFinalTarget2.apply(this, arguments);
}
function _getFinalTarget2() {
  _getFinalTarget2 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee109(auth, host, path, query) {
    var base, authInternal, finalTarget, cookiePersistence;
    return _regeneratorRuntime().wrap(function _callee109$(_context109) {
      while (1) switch (_context109.prev = _context109.next) {
        case 0:
          base = "".concat(host).concat(path, "?").concat(query);
          authInternal = auth;
          finalTarget = authInternal.config.emulator ? _emulatorUrl(auth.config, base) : "".concat(auth.config.apiScheme, "://").concat(base); // Cookie auth works by MiTMing the signIn and token endpoints from the developer's backend,
          // saving the idToken and refreshToken into cookies, and then redacting the refreshToken
          // from the response
          if (!CookieAuthProxiedEndpoints.includes(path)) {
            _context109.next = 9;
            break;
          }
          _context109.next = 6;
          return authInternal._persistenceManagerAvailable;
        case 6:
          if (!(authInternal._getPersistenceType() === "COOKIE" /* PersistenceType.COOKIE */)) {
            _context109.next = 9;
            break;
          }
          cookiePersistence = authInternal._getPersistence();
          return _context109.abrupt("return", cookiePersistence._getFinalTarget(finalTarget).toString());
        case 9:
          return _context109.abrupt("return", finalTarget);
        case 10:
        case "end":
          return _context109.stop();
      }
    }, _callee109);
  }));
  return _getFinalTarget2.apply(this, arguments);
}
function _parseEnforcementState(enforcementStateStr) {
  switch (enforcementStateStr) {
    case 'ENFORCE':
      return "ENFORCE" /* EnforcementState.ENFORCE */;
    case 'AUDIT':
      return "AUDIT" /* EnforcementState.AUDIT */;
    case 'OFF':
      return "OFF" /* EnforcementState.OFF */;
    default:
      return "ENFORCEMENT_STATE_UNSPECIFIED" /* EnforcementState.ENFORCEMENT_STATE_UNSPECIFIED */;
  }
}
var NetworkTimeout = /*#__PURE__*/function () {
  function NetworkTimeout(auth) {
    var _this = this;
    _classCallCheck(this, NetworkTimeout);
    this.auth = auth;
    // Node timers and browser timers are fundamentally incompatible, but we
    // don't care about the value here
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    this.timer = null;
    this.promise = new Promise(function (_, reject) {
      _this.timer = setTimeout(function () {
        return reject(_createError(_this.auth, "network-request-failed" /* AuthErrorCode.NETWORK_REQUEST_FAILED */));
      }, DEFAULT_API_TIMEOUT_MS.get());
    });
  }
  return _createClass(NetworkTimeout, [{
    key: "clearNetworkTimeout",
    value: function clearNetworkTimeout() {
      clearTimeout(this.timer);
    }
  }]);
}();
function _makeTaggedError(auth, code, response) {
  var errorParams = {
    appName: auth.name
  };
  if (response.email) {
    errorParams.email = response.email;
  }
  if (response.phoneNumber) {
    errorParams.phoneNumber = response.phoneNumber;
  }
  var error = _createError(auth, code, errorParams);
  // We know customData is defined on error because errorParams is defined
  error.customData._tokenResponse = response;
  return error;
}

/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function isV2(grecaptcha) {
  return grecaptcha !== undefined && grecaptcha.getResponse !== undefined;
}
function isEnterprise(grecaptcha) {
  return grecaptcha !== undefined && grecaptcha.enterprise !== undefined;
}
var RecaptchaConfig = /*#__PURE__*/function () {
  function RecaptchaConfig(response) {
    _classCallCheck(this, RecaptchaConfig);
    /**
     * The reCAPTCHA site key.
     */
    this.siteKey = '';
    /**
     * The list of providers and their enablement status for reCAPTCHA Enterprise.
     */
    this.recaptchaEnforcementState = [];
    if (response.recaptchaKey === undefined) {
      throw new Error('recaptchaKey undefined');
    }
    // Example response.recaptchaKey: "projects/proj123/keys/sitekey123"
    this.siteKey = response.recaptchaKey.split('/')[3];
    this.recaptchaEnforcementState = response.recaptchaEnforcementState;
  }
  /**
   * Returns the reCAPTCHA Enterprise enforcement state for the given provider.
   *
   * @param providerStr - The provider whose enforcement state is to be returned.
   * @returns The reCAPTCHA Enterprise enforcement state for the given provider.
   */
  return _createClass(RecaptchaConfig, [{
    key: "getProviderEnforcementState",
    value: function getProviderEnforcementState(providerStr) {
      if (!this.recaptchaEnforcementState || this.recaptchaEnforcementState.length === 0) {
        return null;
      }
      var _iterator = _createForOfIteratorHelper(this.recaptchaEnforcementState),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var recaptchaEnforcementState = _step.value;
          if (recaptchaEnforcementState.provider && recaptchaEnforcementState.provider === providerStr) {
            return _parseEnforcementState(recaptchaEnforcementState.enforcementState);
          }
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
      return null;
    }
    /**
     * Returns true if the reCAPTCHA Enterprise enforcement state for the provider is set to ENFORCE or AUDIT.
     *
     * @param providerStr - The provider whose enablement state is to be returned.
     * @returns Whether or not reCAPTCHA Enterprise protection is enabled for the given provider.
     */
  }, {
    key: "isProviderEnabled",
    value: function isProviderEnabled(providerStr) {
      return this.getProviderEnforcementState(providerStr) === "ENFORCE" /* EnforcementState.ENFORCE */ || this.getProviderEnforcementState(providerStr) === "AUDIT" /* EnforcementState.AUDIT */;
    }
    /**
     * Returns true if reCAPTCHA Enterprise protection is enabled in at least one provider, otherwise
     * returns false.
     *
     * @returns Whether or not reCAPTCHA Enterprise protection is enabled for at least one provider.
     */
  }, {
    key: "isAnyProviderEnabled",
    value: function isAnyProviderEnabled() {
      return this.isProviderEnabled("EMAIL_PASSWORD_PROVIDER" /* RecaptchaAuthProvider.EMAIL_PASSWORD_PROVIDER */) || this.isProviderEnabled("PHONE_PROVIDER" /* RecaptchaAuthProvider.PHONE_PROVIDER */);
    }
  }]);
}();
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function getRecaptchaParams(_x14) {
  return _getRecaptchaParams.apply(this, arguments);
}
function _getRecaptchaParams() {
  _getRecaptchaParams = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee110(auth) {
    return _regeneratorRuntime().wrap(function _callee110$(_context110) {
      while (1) switch (_context110.prev = _context110.next) {
        case 0:
          _context110.next = 2;
          return _performApiRequest(auth, "GET" /* HttpMethod.GET */, "/v1/recaptchaParams" /* Endpoint.GET_RECAPTCHA_PARAM */);
        case 2:
          _context110.t0 = _context110.sent.recaptchaSiteKey;
          if (_context110.t0) {
            _context110.next = 5;
            break;
          }
          _context110.t0 = '';
        case 5:
          return _context110.abrupt("return", _context110.t0);
        case 6:
        case "end":
          return _context110.stop();
      }
    }, _callee110);
  }));
  return _getRecaptchaParams.apply(this, arguments);
}
function getRecaptchaConfig(_x15, _x16) {
  return _getRecaptchaConfig.apply(this, arguments);
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function _getRecaptchaConfig() {
  _getRecaptchaConfig = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee111(auth, request) {
    return _regeneratorRuntime().wrap(function _callee111$(_context111) {
      while (1) switch (_context111.prev = _context111.next) {
        case 0:
          return _context111.abrupt("return", _performApiRequest(auth, "GET" /* HttpMethod.GET */, "/v2/recaptchaConfig" /* Endpoint.GET_RECAPTCHA_CONFIG */, _addTidIfNecessary(auth, request)));
        case 1:
        case "end":
          return _context111.stop();
      }
    }, _callee111);
  }));
  return _getRecaptchaConfig.apply(this, arguments);
}
function deleteAccount(_x17, _x18) {
  return _deleteAccount.apply(this, arguments);
}
function _deleteAccount() {
  _deleteAccount = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee112(auth, request) {
    return _regeneratorRuntime().wrap(function _callee112$(_context112) {
      while (1) switch (_context112.prev = _context112.next) {
        case 0:
          return _context112.abrupt("return", _performApiRequest(auth, "POST" /* HttpMethod.POST */, "/v1/accounts:delete" /* Endpoint.DELETE_ACCOUNT */, request));
        case 1:
        case "end":
          return _context112.stop();
      }
    }, _callee112);
  }));
  return _deleteAccount.apply(this, arguments);
}
function deleteLinkedAccounts(_x19, _x20) {
  return _deleteLinkedAccounts.apply(this, arguments);
}
function _deleteLinkedAccounts() {
  _deleteLinkedAccounts = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee113(auth, request) {
    return _regeneratorRuntime().wrap(function _callee113$(_context113) {
      while (1) switch (_context113.prev = _context113.next) {
        case 0:
          return _context113.abrupt("return", _performApiRequest(auth, "POST" /* HttpMethod.POST */, "/v1/accounts:update" /* Endpoint.SET_ACCOUNT_INFO */, request));
        case 1:
        case "end":
          return _context113.stop();
      }
    }, _callee113);
  }));
  return _deleteLinkedAccounts.apply(this, arguments);
}
function getAccountInfo(_x21, _x22) {
  return _getAccountInfo.apply(this, arguments);
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function _getAccountInfo() {
  _getAccountInfo = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee114(auth, request) {
    return _regeneratorRuntime().wrap(function _callee114$(_context114) {
      while (1) switch (_context114.prev = _context114.next) {
        case 0:
          return _context114.abrupt("return", _performApiRequest(auth, "POST" /* HttpMethod.POST */, "/v1/accounts:lookup" /* Endpoint.GET_ACCOUNT_INFO */, request));
        case 1:
        case "end":
          return _context114.stop();
      }
    }, _callee114);
  }));
  return _getAccountInfo.apply(this, arguments);
}
function utcTimestampToDateString(utcTimestamp) {
  if (!utcTimestamp) {
    return undefined;
  }
  try {
    // Convert to date object.
    var date = new Date(Number(utcTimestamp));
    // Test date is valid.
    if (!isNaN(date.getTime())) {
      // Convert to UTC date string.
      return date.toUTCString();
    }
  } catch (e) {
    // Do nothing. undefined will be returned.
  }
  return undefined;
}

/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Returns a JSON Web Token (JWT) used to identify the user to a Firebase service.
 *
 * @remarks
 * Returns the current token if it has not expired or if it will not expire in the next five
 * minutes. Otherwise, this will refresh the token and return a new one.
 *
 * @param user - The user.
 * @param forceRefresh - Force refresh regardless of token expiration.
 *
 * @public
 */
function getIdToken(user) {
  var forceRefresh = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  return (0, _util.getModularInstance)(user).getIdToken(forceRefresh);
}
/**
 * Returns a deserialized JSON Web Token (JWT) used to identify the user to a Firebase service.
 *
 * @remarks
 * Returns the current token if it has not expired or if it will not expire in the next five
 * minutes. Otherwise, this will refresh the token and return a new one.
 *
 * @param user - The user.
 * @param forceRefresh - Force refresh regardless of token expiration.
 *
 * @public
 */
function _getIdTokenResult2(_x23) {
  return _getIdTokenResult.apply(this, arguments);
}
function _getIdTokenResult() {
  _getIdTokenResult = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee115(user) {
    var forceRefresh,
      userInternal,
      token,
      claims,
      firebase,
      signInProvider,
      _args115 = arguments;
    return _regeneratorRuntime().wrap(function _callee115$(_context115) {
      while (1) switch (_context115.prev = _context115.next) {
        case 0:
          forceRefresh = _args115.length > 1 && _args115[1] !== undefined ? _args115[1] : false;
          userInternal = (0, _util.getModularInstance)(user);
          _context115.next = 4;
          return userInternal.getIdToken(forceRefresh);
        case 4:
          token = _context115.sent;
          claims = _parseToken(token);
          _assert(claims && claims.exp && claims.auth_time && claims.iat, userInternal.auth, "internal-error" /* AuthErrorCode.INTERNAL_ERROR */);
          firebase = _typeof(claims.firebase) === 'object' ? claims.firebase : undefined;
          signInProvider = firebase === null || firebase === void 0 ? void 0 : firebase['sign_in_provider'];
          return _context115.abrupt("return", {
            claims: claims,
            token: token,
            authTime: utcTimestampToDateString(secondsStringToMilliseconds(claims.auth_time)),
            issuedAtTime: utcTimestampToDateString(secondsStringToMilliseconds(claims.iat)),
            expirationTime: utcTimestampToDateString(secondsStringToMilliseconds(claims.exp)),
            signInProvider: signInProvider || null,
            signInSecondFactor: (firebase === null || firebase === void 0 ? void 0 : firebase['sign_in_second_factor']) || null
          });
        case 10:
        case "end":
          return _context115.stop();
      }
    }, _callee115);
  }));
  return _getIdTokenResult.apply(this, arguments);
}
function secondsStringToMilliseconds(seconds) {
  return Number(seconds) * 1000;
}
function _parseToken(token) {
  var _token$split = token.split('.'),
    _token$split2 = _slicedToArray(_token$split, 3),
    algorithm = _token$split2[0],
    payload = _token$split2[1],
    signature = _token$split2[2];
  if (algorithm === undefined || payload === undefined || signature === undefined) {
    _logError('JWT malformed, contained fewer than 3 sections');
    return null;
  }
  try {
    var decoded = (0, _util.base64Decode)(payload);
    if (!decoded) {
      _logError('Failed to decode base64 JWT payload');
      return null;
    }
    return JSON.parse(decoded);
  } catch (e) {
    _logError('Caught error parsing JWT payload as JSON', e === null || e === void 0 ? void 0 : e.toString());
    return null;
  }
}
/**
 * Extract expiresIn TTL from a token by subtracting the expiration from the issuance.
 */
function _tokenExpiresIn(token) {
  var parsedToken = _parseToken(token);
  _assert(parsedToken, "internal-error" /* AuthErrorCode.INTERNAL_ERROR */);
  _assert(typeof parsedToken.exp !== 'undefined', "internal-error" /* AuthErrorCode.INTERNAL_ERROR */);
  _assert(typeof parsedToken.iat !== 'undefined', "internal-error" /* AuthErrorCode.INTERNAL_ERROR */);
  return Number(parsedToken.exp) - Number(parsedToken.iat);
}

/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function _logoutIfInvalidated(_x24, _x25) {
  return _logoutIfInvalidated2.apply(this, arguments);
}
function _logoutIfInvalidated2() {
  _logoutIfInvalidated2 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee116(user, promise) {
    var bypassAuthState,
      _args116 = arguments;
    return _regeneratorRuntime().wrap(function _callee116$(_context116) {
      while (1) switch (_context116.prev = _context116.next) {
        case 0:
          bypassAuthState = _args116.length > 2 && _args116[2] !== undefined ? _args116[2] : false;
          if (!bypassAuthState) {
            _context116.next = 3;
            break;
          }
          return _context116.abrupt("return", promise);
        case 3:
          _context116.prev = 3;
          _context116.next = 6;
          return promise;
        case 6:
          return _context116.abrupt("return", _context116.sent);
        case 9:
          _context116.prev = 9;
          _context116.t0 = _context116["catch"](3);
          if (!(_context116.t0 instanceof _util.FirebaseError && isUserInvalidated(_context116.t0))) {
            _context116.next = 15;
            break;
          }
          if (!(user.auth.currentUser === user)) {
            _context116.next = 15;
            break;
          }
          _context116.next = 15;
          return user.auth.signOut();
        case 15:
          throw _context116.t0;
        case 16:
        case "end":
          return _context116.stop();
      }
    }, _callee116, null, [[3, 9]]);
  }));
  return _logoutIfInvalidated2.apply(this, arguments);
}
function isUserInvalidated(_ref3) {
  var code = _ref3.code;
  return code === "auth/".concat("user-disabled" /* AuthErrorCode.USER_DISABLED */) || code === "auth/".concat("user-token-expired" /* AuthErrorCode.TOKEN_EXPIRED */);
}

/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var ProactiveRefresh = /*#__PURE__*/function () {
  function ProactiveRefresh(user) {
    _classCallCheck(this, ProactiveRefresh);
    this.user = user;
    this.isRunning = false;
    // Node timers and browser timers return fundamentally different types.
    // We don't actually care what the value is but TS won't accept unknown and
    // we can't cast properly in both environments.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    this.timerId = null;
    this.errorBackoff = 30000 /* Duration.RETRY_BACKOFF_MIN */;
  }
  return _createClass(ProactiveRefresh, [{
    key: "_start",
    value: function _start() {
      if (this.isRunning) {
        return;
      }
      this.isRunning = true;
      this.schedule();
    }
  }, {
    key: "_stop",
    value: function _stop() {
      if (!this.isRunning) {
        return;
      }
      this.isRunning = false;
      if (this.timerId !== null) {
        clearTimeout(this.timerId);
      }
    }
  }, {
    key: "getInterval",
    value: function getInterval(wasError) {
      var _a;
      if (wasError) {
        var interval = this.errorBackoff;
        this.errorBackoff = Math.min(this.errorBackoff * 2, 960000 /* Duration.RETRY_BACKOFF_MAX */);
        return interval;
      } else {
        // Reset the error backoff
        this.errorBackoff = 30000 /* Duration.RETRY_BACKOFF_MIN */;
        var expTime = (_a = this.user.stsTokenManager.expirationTime) !== null && _a !== void 0 ? _a : 0;
        var _interval = expTime - Date.now() - 300000 /* Duration.OFFSET */;
        return Math.max(0, _interval);
      }
    }
  }, {
    key: "schedule",
    value: function schedule() {
      var _this2 = this;
      var wasError = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      if (!this.isRunning) {
        // Just in case...
        return;
      }
      var interval = this.getInterval(wasError);
      this.timerId = setTimeout(/*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return _this2.iteration();
            case 2:
            case "end":
              return _context.stop();
          }
        }, _callee);
      })), interval);
    }
  }, {
    key: "iteration",
    value: function () {
      var _iteration = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
        return _regeneratorRuntime().wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              _context2.next = 3;
              return this.user.getIdToken(true);
            case 3:
              _context2.next = 9;
              break;
            case 5:
              _context2.prev = 5;
              _context2.t0 = _context2["catch"](0);
              // Only retry on network errors
              if ((_context2.t0 === null || _context2.t0 === void 0 ? void 0 : _context2.t0.code) === "auth/".concat("network-request-failed" /* AuthErrorCode.NETWORK_REQUEST_FAILED */)) {
                this.schedule(/* wasError */true);
              }
              return _context2.abrupt("return");
            case 9:
              this.schedule();
            case 10:
            case "end":
              return _context2.stop();
          }
        }, _callee2, this, [[0, 5]]);
      }));
      function iteration() {
        return _iteration.apply(this, arguments);
      }
      return iteration;
    }()
  }]);
}();
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var UserMetadata = /*#__PURE__*/function () {
  function UserMetadata(createdAt, lastLoginAt) {
    _classCallCheck(this, UserMetadata);
    this.createdAt = createdAt;
    this.lastLoginAt = lastLoginAt;
    this._initializeTime();
  }
  return _createClass(UserMetadata, [{
    key: "_initializeTime",
    value: function _initializeTime() {
      this.lastSignInTime = utcTimestampToDateString(this.lastLoginAt);
      this.creationTime = utcTimestampToDateString(this.createdAt);
    }
  }, {
    key: "_copy",
    value: function _copy(metadata) {
      this.createdAt = metadata.createdAt;
      this.lastLoginAt = metadata.lastLoginAt;
      this._initializeTime();
    }
  }, {
    key: "toJSON",
    value: function toJSON() {
      return {
        createdAt: this.createdAt,
        lastLoginAt: this.lastLoginAt
      };
    }
  }]);
}();
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function _reloadWithoutSaving(_x26) {
  return _reloadWithoutSaving2.apply(this, arguments);
}
/**
 * Reloads user account data, if signed in.
 *
 * @param user - The user.
 *
 * @public
 */
function _reloadWithoutSaving2() {
  _reloadWithoutSaving2 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee117(user) {
    var _a, auth, idToken, response, coreAccount, newProviderData, providerData, oldIsAnonymous, newIsAnonymous, isAnonymous, updates;
    return _regeneratorRuntime().wrap(function _callee117$(_context117) {
      while (1) switch (_context117.prev = _context117.next) {
        case 0:
          auth = user.auth;
          _context117.next = 3;
          return user.getIdToken();
        case 3:
          idToken = _context117.sent;
          _context117.next = 6;
          return _logoutIfInvalidated(user, getAccountInfo(auth, {
            idToken: idToken
          }));
        case 6:
          response = _context117.sent;
          _assert(response === null || response === void 0 ? void 0 : response.users.length, auth, "internal-error" /* AuthErrorCode.INTERNAL_ERROR */);
          coreAccount = response.users[0];
          user._notifyReloadListener(coreAccount);
          newProviderData = ((_a = coreAccount.providerUserInfo) === null || _a === void 0 ? void 0 : _a.length) ? extractProviderData(coreAccount.providerUserInfo) : [];
          providerData = mergeProviderData(user.providerData, newProviderData); // Preserves the non-nonymous status of the stored user, even if no more
          // credentials (federated or email/password) are linked to the user. If
          // the user was previously anonymous, then use provider data to update.
          // On the other hand, if it was not anonymous before, it should never be
          // considered anonymous now.
          oldIsAnonymous = user.isAnonymous;
          newIsAnonymous = !(user.email && coreAccount.passwordHash) && !(providerData === null || providerData === void 0 ? void 0 : providerData.length);
          isAnonymous = !oldIsAnonymous ? false : newIsAnonymous;
          updates = {
            uid: coreAccount.localId,
            displayName: coreAccount.displayName || null,
            photoURL: coreAccount.photoUrl || null,
            email: coreAccount.email || null,
            emailVerified: coreAccount.emailVerified || false,
            phoneNumber: coreAccount.phoneNumber || null,
            tenantId: coreAccount.tenantId || null,
            providerData: providerData,
            metadata: new UserMetadata(coreAccount.createdAt, coreAccount.lastLoginAt),
            isAnonymous: isAnonymous
          };
          Object.assign(user, updates);
        case 17:
        case "end":
          return _context117.stop();
      }
    }, _callee117);
  }));
  return _reloadWithoutSaving2.apply(this, arguments);
}
function _reload2(_x27) {
  return _reload.apply(this, arguments);
}
function _reload() {
  _reload = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee118(user) {
    var userInternal;
    return _regeneratorRuntime().wrap(function _callee118$(_context118) {
      while (1) switch (_context118.prev = _context118.next) {
        case 0:
          userInternal = (0, _util.getModularInstance)(user);
          _context118.next = 3;
          return _reloadWithoutSaving(userInternal);
        case 3:
          _context118.next = 5;
          return userInternal.auth._persistUserIfCurrent(userInternal);
        case 5:
          userInternal.auth._notifyListenersIfCurrent(userInternal);
        case 6:
        case "end":
          return _context118.stop();
      }
    }, _callee118);
  }));
  return _reload.apply(this, arguments);
}
function mergeProviderData(original, newData) {
  var deduped = original.filter(function (o) {
    return !newData.some(function (n) {
      return n.providerId === o.providerId;
    });
  });
  return [].concat(_toConsumableArray(deduped), _toConsumableArray(newData));
}
function extractProviderData(providers) {
  return providers.map(function (_a) {
    var providerId = _a.providerId,
      provider = (0, _tslib.__rest)(_a, ["providerId"]);
    return {
      providerId: providerId,
      uid: provider.rawId || '',
      displayName: provider.displayName || null,
      email: provider.email || null,
      phoneNumber: provider.phoneNumber || null,
      photoURL: provider.photoUrl || null
    };
  });
}

/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function requestStsToken(_x28, _x29) {
  return _requestStsToken.apply(this, arguments);
}
function _requestStsToken() {
  _requestStsToken = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee120(auth, refreshToken) {
    var response;
    return _regeneratorRuntime().wrap(function _callee120$(_context120) {
      while (1) switch (_context120.prev = _context120.next) {
        case 0:
          _context120.next = 2;
          return _performFetchWithErrorHandling(auth, {}, /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee119() {
            var body, _auth$config, tokenApiHost, apiKey, url, headers;
            return _regeneratorRuntime().wrap(function _callee119$(_context119) {
              while (1) switch (_context119.prev = _context119.next) {
                case 0:
                  body = (0, _util.querystring)({
                    'grant_type': 'refresh_token',
                    'refresh_token': refreshToken
                  }).slice(1);
                  _auth$config = auth.config, tokenApiHost = _auth$config.tokenApiHost, apiKey = _auth$config.apiKey;
                  _context119.next = 4;
                  return _getFinalTarget(auth, tokenApiHost, "/v1/token" /* Endpoint.TOKEN */, "key=".concat(apiKey));
                case 4:
                  url = _context119.sent;
                  _context119.next = 7;
                  return auth._getAdditionalHeaders();
                case 7:
                  headers = _context119.sent;
                  headers["Content-Type" /* HttpHeader.CONTENT_TYPE */] = 'application/x-www-form-urlencoded';
                  return _context119.abrupt("return", FetchProvider.fetch()(url, {
                    method: "POST" /* HttpMethod.POST */,
                    headers: headers,
                    body: body
                  }));
                case 10:
                case "end":
                  return _context119.stop();
              }
            }, _callee119);
          })));
        case 2:
          response = _context120.sent;
          return _context120.abrupt("return", {
            accessToken: response.access_token,
            expiresIn: response.expires_in,
            refreshToken: response.refresh_token
          });
        case 4:
        case "end":
          return _context120.stop();
      }
    }, _callee120);
  }));
  return _requestStsToken.apply(this, arguments);
}
function revokeToken(_x30, _x31) {
  return _revokeToken.apply(this, arguments);
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * We need to mark this class as internal explicitly to exclude it in the public typings, because
 * it references AuthInternal which has a circular dependency with UserInternal.
 *
 * @internal
 */
function _revokeToken() {
  _revokeToken = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee121(auth, request) {
    return _regeneratorRuntime().wrap(function _callee121$(_context121) {
      while (1) switch (_context121.prev = _context121.next) {
        case 0:
          return _context121.abrupt("return", _performApiRequest(auth, "POST" /* HttpMethod.POST */, "/v2/accounts:revokeToken" /* Endpoint.REVOKE_TOKEN */, _addTidIfNecessary(auth, request)));
        case 1:
        case "end":
          return _context121.stop();
      }
    }, _callee121);
  }));
  return _revokeToken.apply(this, arguments);
}
var StsTokenManager = /*#__PURE__*/function () {
  function StsTokenManager() {
    _classCallCheck(this, StsTokenManager);
    this.refreshToken = null;
    this.accessToken = null;
    this.expirationTime = null;
  }
  return _createClass(StsTokenManager, [{
    key: "isExpired",
    get: function get() {
      return !this.expirationTime || Date.now() > this.expirationTime - 30000 /* Buffer.TOKEN_REFRESH */;
    }
  }, {
    key: "updateFromServerResponse",
    value: function updateFromServerResponse(response) {
      _assert(response.idToken, "internal-error" /* AuthErrorCode.INTERNAL_ERROR */);
      _assert(typeof response.idToken !== 'undefined', "internal-error" /* AuthErrorCode.INTERNAL_ERROR */);
      _assert(typeof response.refreshToken !== 'undefined', "internal-error" /* AuthErrorCode.INTERNAL_ERROR */);
      var expiresIn = 'expiresIn' in response && typeof response.expiresIn !== 'undefined' ? Number(response.expiresIn) : _tokenExpiresIn(response.idToken);
      this.updateTokensAndExpiration(response.idToken, response.refreshToken, expiresIn);
    }
  }, {
    key: "updateFromIdToken",
    value: function updateFromIdToken(idToken) {
      _assert(idToken.length !== 0, "internal-error" /* AuthErrorCode.INTERNAL_ERROR */);
      var expiresIn = _tokenExpiresIn(idToken);
      this.updateTokensAndExpiration(idToken, null, expiresIn);
    }
  }, {
    key: "getToken",
    value: function () {
      var _getToken = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee3(auth) {
        var forceRefresh,
          _args3 = arguments;
        return _regeneratorRuntime().wrap(function _callee3$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              forceRefresh = _args3.length > 1 && _args3[1] !== undefined ? _args3[1] : false;
              if (!(!forceRefresh && this.accessToken && !this.isExpired)) {
                _context3.next = 3;
                break;
              }
              return _context3.abrupt("return", this.accessToken);
            case 3:
              _assert(this.refreshToken, auth, "user-token-expired" /* AuthErrorCode.TOKEN_EXPIRED */);
              if (!this.refreshToken) {
                _context3.next = 8;
                break;
              }
              _context3.next = 7;
              return this.refresh(auth, this.refreshToken);
            case 7:
              return _context3.abrupt("return", this.accessToken);
            case 8:
              return _context3.abrupt("return", null);
            case 9:
            case "end":
              return _context3.stop();
          }
        }, _callee3, this);
      }));
      function getToken(_x32) {
        return _getToken.apply(this, arguments);
      }
      return getToken;
    }()
  }, {
    key: "clearRefreshToken",
    value: function clearRefreshToken() {
      this.refreshToken = null;
    }
  }, {
    key: "refresh",
    value: function () {
      var _refresh = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee4(auth, oldToken) {
        var _yield$requestStsToke, accessToken, refreshToken, expiresIn;
        return _regeneratorRuntime().wrap(function _callee4$(_context4) {
          while (1) switch (_context4.prev = _context4.next) {
            case 0:
              _context4.next = 2;
              return requestStsToken(auth, oldToken);
            case 2:
              _yield$requestStsToke = _context4.sent;
              accessToken = _yield$requestStsToke.accessToken;
              refreshToken = _yield$requestStsToke.refreshToken;
              expiresIn = _yield$requestStsToke.expiresIn;
              this.updateTokensAndExpiration(accessToken, refreshToken, Number(expiresIn));
            case 7:
            case "end":
              return _context4.stop();
          }
        }, _callee4, this);
      }));
      function refresh(_x33, _x34) {
        return _refresh.apply(this, arguments);
      }
      return refresh;
    }()
  }, {
    key: "updateTokensAndExpiration",
    value: function updateTokensAndExpiration(accessToken, refreshToken, expiresInSec) {
      this.refreshToken = refreshToken || null;
      this.accessToken = accessToken || null;
      this.expirationTime = Date.now() + expiresInSec * 1000;
    }
  }, {
    key: "toJSON",
    value: function toJSON() {
      return {
        refreshToken: this.refreshToken,
        accessToken: this.accessToken,
        expirationTime: this.expirationTime
      };
    }
  }, {
    key: "_assign",
    value: function _assign(stsTokenManager) {
      this.accessToken = stsTokenManager.accessToken;
      this.refreshToken = stsTokenManager.refreshToken;
      this.expirationTime = stsTokenManager.expirationTime;
    }
  }, {
    key: "_clone",
    value: function _clone() {
      return Object.assign(new StsTokenManager(), this.toJSON());
    }
  }, {
    key: "_performRefresh",
    value: function _performRefresh() {
      return debugFail('not implemented');
    }
  }], [{
    key: "fromJSON",
    value: function fromJSON(appName, object) {
      var refreshToken = object.refreshToken,
        accessToken = object.accessToken,
        expirationTime = object.expirationTime;
      var manager = new StsTokenManager();
      if (refreshToken) {
        _assert(typeof refreshToken === 'string', "internal-error" /* AuthErrorCode.INTERNAL_ERROR */, {
          appName: appName
        });
        manager.refreshToken = refreshToken;
      }
      if (accessToken) {
        _assert(typeof accessToken === 'string', "internal-error" /* AuthErrorCode.INTERNAL_ERROR */, {
          appName: appName
        });
        manager.accessToken = accessToken;
      }
      if (expirationTime) {
        _assert(typeof expirationTime === 'number', "internal-error" /* AuthErrorCode.INTERNAL_ERROR */, {
          appName: appName
        });
        manager.expirationTime = expirationTime;
      }
      return manager;
    }
  }]);
}();
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function assertStringOrUndefined(assertion, appName) {
  _assert(typeof assertion === 'string' || typeof assertion === 'undefined', "internal-error" /* AuthErrorCode.INTERNAL_ERROR */, {
    appName: appName
  });
}
var UserImpl = exports.aL = /*#__PURE__*/function () {
  function UserImpl(_a) {
    _classCallCheck(this, UserImpl);
    var uid = _a.uid,
      auth = _a.auth,
      stsTokenManager = _a.stsTokenManager,
      opt = (0, _tslib.__rest)(_a, ["uid", "auth", "stsTokenManager"]);
    // For the user object, provider is always Firebase.
    this.providerId = "firebase" /* ProviderId.FIREBASE */;
    this.proactiveRefresh = new ProactiveRefresh(this);
    this.reloadUserInfo = null;
    this.reloadListener = null;
    this.uid = uid;
    this.auth = auth;
    this.stsTokenManager = stsTokenManager;
    this.accessToken = stsTokenManager.accessToken;
    this.displayName = opt.displayName || null;
    this.email = opt.email || null;
    this.emailVerified = opt.emailVerified || false;
    this.phoneNumber = opt.phoneNumber || null;
    this.photoURL = opt.photoURL || null;
    this.isAnonymous = opt.isAnonymous || false;
    this.tenantId = opt.tenantId || null;
    this.providerData = opt.providerData ? _toConsumableArray(opt.providerData) : [];
    this.metadata = new UserMetadata(opt.createdAt || undefined, opt.lastLoginAt || undefined);
  }
  return _createClass(UserImpl, [{
    key: "getIdToken",
    value: function () {
      var _getIdToken = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee5(forceRefresh) {
        var accessToken;
        return _regeneratorRuntime().wrap(function _callee5$(_context5) {
          while (1) switch (_context5.prev = _context5.next) {
            case 0:
              _context5.next = 2;
              return _logoutIfInvalidated(this, this.stsTokenManager.getToken(this.auth, forceRefresh));
            case 2:
              accessToken = _context5.sent;
              _assert(accessToken, this.auth, "internal-error" /* AuthErrorCode.INTERNAL_ERROR */);
              if (!(this.accessToken !== accessToken)) {
                _context5.next = 9;
                break;
              }
              this.accessToken = accessToken;
              _context5.next = 8;
              return this.auth._persistUserIfCurrent(this);
            case 8:
              this.auth._notifyListenersIfCurrent(this);
            case 9:
              return _context5.abrupt("return", accessToken);
            case 10:
            case "end":
              return _context5.stop();
          }
        }, _callee5, this);
      }));
      function getIdToken(_x35) {
        return _getIdToken.apply(this, arguments);
      }
      return getIdToken;
    }()
  }, {
    key: "getIdTokenResult",
    value: function getIdTokenResult(forceRefresh) {
      return _getIdTokenResult2(this, forceRefresh);
    }
  }, {
    key: "reload",
    value: function reload() {
      return _reload2(this);
    }
  }, {
    key: "_assign",
    value: function _assign(user) {
      if (this === user) {
        return;
      }
      _assert(this.uid === user.uid, this.auth, "internal-error" /* AuthErrorCode.INTERNAL_ERROR */);
      this.displayName = user.displayName;
      this.photoURL = user.photoURL;
      this.email = user.email;
      this.emailVerified = user.emailVerified;
      this.phoneNumber = user.phoneNumber;
      this.isAnonymous = user.isAnonymous;
      this.tenantId = user.tenantId;
      this.providerData = user.providerData.map(function (userInfo) {
        return Object.assign({}, userInfo);
      });
      this.metadata._copy(user.metadata);
      this.stsTokenManager._assign(user.stsTokenManager);
    }
  }, {
    key: "_clone",
    value: function _clone(auth) {
      var newUser = new UserImpl(Object.assign(Object.assign({}, this), {
        auth: auth,
        stsTokenManager: this.stsTokenManager._clone()
      }));
      newUser.metadata._copy(this.metadata);
      return newUser;
    }
  }, {
    key: "_onReload",
    value: function _onReload(callback) {
      // There should only ever be one listener, and that is a single instance of MultiFactorUser
      _assert(!this.reloadListener, this.auth, "internal-error" /* AuthErrorCode.INTERNAL_ERROR */);
      this.reloadListener = callback;
      if (this.reloadUserInfo) {
        this._notifyReloadListener(this.reloadUserInfo);
        this.reloadUserInfo = null;
      }
    }
  }, {
    key: "_notifyReloadListener",
    value: function _notifyReloadListener(userInfo) {
      if (this.reloadListener) {
        this.reloadListener(userInfo);
      } else {
        // If no listener is subscribed yet, save the result so it's available when they do subscribe
        this.reloadUserInfo = userInfo;
      }
    }
  }, {
    key: "_startProactiveRefresh",
    value: function _startProactiveRefresh() {
      this.proactiveRefresh._start();
    }
  }, {
    key: "_stopProactiveRefresh",
    value: function _stopProactiveRefresh() {
      this.proactiveRefresh._stop();
    }
  }, {
    key: "_updateTokensIfNecessary",
    value: function () {
      var _updateTokensIfNecessary2 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee6(response) {
        var reload,
          tokensRefreshed,
          _args6 = arguments;
        return _regeneratorRuntime().wrap(function _callee6$(_context6) {
          while (1) switch (_context6.prev = _context6.next) {
            case 0:
              reload = _args6.length > 1 && _args6[1] !== undefined ? _args6[1] : false;
              tokensRefreshed = false;
              if (response.idToken && response.idToken !== this.stsTokenManager.accessToken) {
                this.stsTokenManager.updateFromServerResponse(response);
                tokensRefreshed = true;
              }
              if (!reload) {
                _context6.next = 6;
                break;
              }
              _context6.next = 6;
              return _reloadWithoutSaving(this);
            case 6:
              _context6.next = 8;
              return this.auth._persistUserIfCurrent(this);
            case 8:
              if (tokensRefreshed) {
                this.auth._notifyListenersIfCurrent(this);
              }
            case 9:
            case "end":
              return _context6.stop();
          }
        }, _callee6, this);
      }));
      function _updateTokensIfNecessary(_x36) {
        return _updateTokensIfNecessary2.apply(this, arguments);
      }
      return _updateTokensIfNecessary;
    }()
  }, {
    key: "delete",
    value: function () {
      var _delete2 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee7() {
        var idToken;
        return _regeneratorRuntime().wrap(function _callee7$(_context7) {
          while (1) switch (_context7.prev = _context7.next) {
            case 0:
              if (!(0, _app._isFirebaseServerApp)(this.auth.app)) {
                _context7.next = 2;
                break;
              }
              return _context7.abrupt("return", Promise.reject(_serverAppCurrentUserOperationNotSupportedError(this.auth)));
            case 2:
              _context7.next = 4;
              return this.getIdToken();
            case 4:
              idToken = _context7.sent;
              _context7.next = 7;
              return _logoutIfInvalidated(this, deleteAccount(this.auth, {
                idToken: idToken
              }));
            case 7:
              this.stsTokenManager.clearRefreshToken();
              // TODO: Determine if cancellable-promises are necessary to use in this class so that delete()
              //       cancels pending actions...
              return _context7.abrupt("return", this.auth.signOut());
            case 9:
            case "end":
              return _context7.stop();
          }
        }, _callee7, this);
      }));
      function _delete() {
        return _delete2.apply(this, arguments);
      }
      return _delete;
    }()
  }, {
    key: "toJSON",
    value: function toJSON() {
      return Object.assign(Object.assign({
        uid: this.uid,
        email: this.email || undefined,
        emailVerified: this.emailVerified,
        displayName: this.displayName || undefined,
        isAnonymous: this.isAnonymous,
        photoURL: this.photoURL || undefined,
        phoneNumber: this.phoneNumber || undefined,
        tenantId: this.tenantId || undefined,
        providerData: this.providerData.map(function (userInfo) {
          return Object.assign({}, userInfo);
        }),
        stsTokenManager: this.stsTokenManager.toJSON(),
        // Redirect event ID must be maintained in case there is a pending
        // redirect event.
        _redirectEventId: this._redirectEventId
      }, this.metadata.toJSON()), {
        // Required for compatibility with the legacy SDK (go/firebase-auth-sdk-persistence-parsing):
        apiKey: this.auth.config.apiKey,
        appName: this.auth.name
      });
    }
  }, {
    key: "refreshToken",
    get: function get() {
      return this.stsTokenManager.refreshToken || '';
    }
  }], [{
    key: "_fromJSON",
    value: function _fromJSON(auth, object) {
      var _a, _b, _c, _d, _e, _f, _g, _h;
      var displayName = (_a = object.displayName) !== null && _a !== void 0 ? _a : undefined;
      var email = (_b = object.email) !== null && _b !== void 0 ? _b : undefined;
      var phoneNumber = (_c = object.phoneNumber) !== null && _c !== void 0 ? _c : undefined;
      var photoURL = (_d = object.photoURL) !== null && _d !== void 0 ? _d : undefined;
      var tenantId = (_e = object.tenantId) !== null && _e !== void 0 ? _e : undefined;
      var _redirectEventId = (_f = object._redirectEventId) !== null && _f !== void 0 ? _f : undefined;
      var createdAt = (_g = object.createdAt) !== null && _g !== void 0 ? _g : undefined;
      var lastLoginAt = (_h = object.lastLoginAt) !== null && _h !== void 0 ? _h : undefined;
      var uid = object.uid,
        emailVerified = object.emailVerified,
        isAnonymous = object.isAnonymous,
        providerData = object.providerData,
        plainObjectTokenManager = object.stsTokenManager;
      _assert(uid && plainObjectTokenManager, auth, "internal-error" /* AuthErrorCode.INTERNAL_ERROR */);
      var stsTokenManager = StsTokenManager.fromJSON(this.name, plainObjectTokenManager);
      _assert(typeof uid === 'string', auth, "internal-error" /* AuthErrorCode.INTERNAL_ERROR */);
      assertStringOrUndefined(displayName, auth.name);
      assertStringOrUndefined(email, auth.name);
      _assert(typeof emailVerified === 'boolean', auth, "internal-error" /* AuthErrorCode.INTERNAL_ERROR */);
      _assert(typeof isAnonymous === 'boolean', auth, "internal-error" /* AuthErrorCode.INTERNAL_ERROR */);
      assertStringOrUndefined(phoneNumber, auth.name);
      assertStringOrUndefined(photoURL, auth.name);
      assertStringOrUndefined(tenantId, auth.name);
      assertStringOrUndefined(_redirectEventId, auth.name);
      assertStringOrUndefined(createdAt, auth.name);
      assertStringOrUndefined(lastLoginAt, auth.name);
      var user = new UserImpl({
        uid: uid,
        auth: auth,
        email: email,
        emailVerified: emailVerified,
        displayName: displayName,
        isAnonymous: isAnonymous,
        photoURL: photoURL,
        phoneNumber: phoneNumber,
        tenantId: tenantId,
        stsTokenManager: stsTokenManager,
        createdAt: createdAt,
        lastLoginAt: lastLoginAt
      });
      if (providerData && Array.isArray(providerData)) {
        user.providerData = providerData.map(function (userInfo) {
          return Object.assign({}, userInfo);
        });
      }
      if (_redirectEventId) {
        user._redirectEventId = _redirectEventId;
      }
      return user;
    }
    /**
     * Initialize a User from an idToken server response
     * @param auth
     * @param idTokenResponse
     */
  }, {
    key: "_fromIdTokenResponse",
    value: (function () {
      var _fromIdTokenResponse2 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee8(auth, idTokenResponse) {
        var isAnonymous,
          stsTokenManager,
          user,
          _args8 = arguments;
        return _regeneratorRuntime().wrap(function _callee8$(_context8) {
          while (1) switch (_context8.prev = _context8.next) {
            case 0:
              isAnonymous = _args8.length > 2 && _args8[2] !== undefined ? _args8[2] : false;
              stsTokenManager = new StsTokenManager();
              stsTokenManager.updateFromServerResponse(idTokenResponse);
              // Initialize the Firebase Auth user.
              user = new UserImpl({
                uid: idTokenResponse.localId,
                auth: auth,
                stsTokenManager: stsTokenManager,
                isAnonymous: isAnonymous
              }); // Updates the user info and data and resolves with a user instance.
              _context8.next = 6;
              return _reloadWithoutSaving(user);
            case 6:
              return _context8.abrupt("return", user);
            case 7:
            case "end":
              return _context8.stop();
          }
        }, _callee8);
      }));
      function _fromIdTokenResponse(_x37, _x38) {
        return _fromIdTokenResponse2.apply(this, arguments);
      }
      return _fromIdTokenResponse;
    }()
    /**
     * Initialize a User from an idToken server response
     * @param auth
     * @param idTokenResponse
     */
    )
  }, {
    key: "_fromGetAccountInfoResponse",
    value: (function () {
      var _fromGetAccountInfoResponse2 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee9(auth, response, idToken) {
        var coreAccount, providerData, isAnonymous, stsTokenManager, user, updates;
        return _regeneratorRuntime().wrap(function _callee9$(_context9) {
          while (1) switch (_context9.prev = _context9.next) {
            case 0:
              coreAccount = response.users[0];
              _assert(coreAccount.localId !== undefined, "internal-error" /* AuthErrorCode.INTERNAL_ERROR */);
              providerData = coreAccount.providerUserInfo !== undefined ? extractProviderData(coreAccount.providerUserInfo) : [];
              isAnonymous = !(coreAccount.email && coreAccount.passwordHash) && !(providerData === null || providerData === void 0 ? void 0 : providerData.length);
              stsTokenManager = new StsTokenManager();
              stsTokenManager.updateFromIdToken(idToken);
              // Initialize the Firebase Auth user.
              user = new UserImpl({
                uid: coreAccount.localId,
                auth: auth,
                stsTokenManager: stsTokenManager,
                isAnonymous: isAnonymous
              }); // update the user with data from the GetAccountInfo response.
              updates = {
                uid: coreAccount.localId,
                displayName: coreAccount.displayName || null,
                photoURL: coreAccount.photoUrl || null,
                email: coreAccount.email || null,
                emailVerified: coreAccount.emailVerified || false,
                phoneNumber: coreAccount.phoneNumber || null,
                tenantId: coreAccount.tenantId || null,
                providerData: providerData,
                metadata: new UserMetadata(coreAccount.createdAt, coreAccount.lastLoginAt),
                isAnonymous: !(coreAccount.email && coreAccount.passwordHash) && !(providerData === null || providerData === void 0 ? void 0 : providerData.length)
              };
              Object.assign(user, updates);
              return _context9.abrupt("return", user);
            case 10:
            case "end":
              return _context9.stop();
          }
        }, _callee9);
      }));
      function _fromGetAccountInfoResponse(_x39, _x40, _x41) {
        return _fromGetAccountInfoResponse2.apply(this, arguments);
      }
      return _fromGetAccountInfoResponse;
    }())
  }]);
}();
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var instanceCache = new Map();
function _getInstance(cls) {
  debugAssert(cls instanceof Function, 'Expected a class definition');
  var instance = instanceCache.get(cls);
  if (instance) {
    debugAssert(instance instanceof cls, 'Instance stored in cache mismatched with class');
    return instance;
  }
  instance = new cls();
  instanceCache.set(cls, instance);
  return instance;
}

/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var InMemoryPersistence = /*#__PURE__*/function () {
  function InMemoryPersistence() {
    _classCallCheck(this, InMemoryPersistence);
    this.type = "NONE" /* PersistenceType.NONE */;
    this.storage = {};
  }
  return _createClass(InMemoryPersistence, [{
    key: "_isAvailable",
    value: function () {
      var _isAvailable2 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee0() {
        return _regeneratorRuntime().wrap(function _callee0$(_context0) {
          while (1) switch (_context0.prev = _context0.next) {
            case 0:
              return _context0.abrupt("return", true);
            case 1:
            case "end":
              return _context0.stop();
          }
        }, _callee0);
      }));
      function _isAvailable() {
        return _isAvailable2.apply(this, arguments);
      }
      return _isAvailable;
    }()
  }, {
    key: "_set",
    value: function () {
      var _set2 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee1(key, value) {
        return _regeneratorRuntime().wrap(function _callee1$(_context1) {
          while (1) switch (_context1.prev = _context1.next) {
            case 0:
              this.storage[key] = value;
            case 1:
            case "end":
              return _context1.stop();
          }
        }, _callee1, this);
      }));
      function _set(_x42, _x43) {
        return _set2.apply(this, arguments);
      }
      return _set;
    }()
  }, {
    key: "_get",
    value: function () {
      var _get2 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee10(key) {
        var value;
        return _regeneratorRuntime().wrap(function _callee10$(_context10) {
          while (1) switch (_context10.prev = _context10.next) {
            case 0:
              value = this.storage[key];
              return _context10.abrupt("return", value === undefined ? null : value);
            case 2:
            case "end":
              return _context10.stop();
          }
        }, _callee10, this);
      }));
      function _get(_x44) {
        return _get2.apply(this, arguments);
      }
      return _get;
    }()
  }, {
    key: "_remove",
    value: function () {
      var _remove2 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee11(key) {
        return _regeneratorRuntime().wrap(function _callee11$(_context11) {
          while (1) switch (_context11.prev = _context11.next) {
            case 0:
              delete this.storage[key];
            case 1:
            case "end":
              return _context11.stop();
          }
        }, _callee11, this);
      }));
      function _remove(_x45) {
        return _remove2.apply(this, arguments);
      }
      return _remove;
    }()
  }, {
    key: "_addListener",
    value: function _addListener(_key, _listener) {
      // Listeners are not supported for in-memory storage since it cannot be shared across windows/workers
      return;
    }
  }, {
    key: "_removeListener",
    value: function _removeListener(_key, _listener) {
      // Listeners are not supported for in-memory storage since it cannot be shared across windows/workers
      return;
    }
  }]);
}();
InMemoryPersistence.type = 'NONE';
/**
 * An implementation of {@link Persistence} of type 'NONE'.
 *
 * @public
 */
var inMemoryPersistence = exports.V = InMemoryPersistence;

/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function _persistenceKeyName(key, apiKey, appName) {
  return "firebase" /* Namespace.PERSISTENCE */.concat(":", key, ":").concat(apiKey, ":").concat(appName);
}
var PersistenceUserManager = /*#__PURE__*/function () {
  function PersistenceUserManager(persistence, auth, userKey) {
    _classCallCheck(this, PersistenceUserManager);
    this.persistence = persistence;
    this.auth = auth;
    this.userKey = userKey;
    var _this$auth = this.auth,
      config = _this$auth.config,
      name = _this$auth.name;
    this.fullUserKey = _persistenceKeyName(this.userKey, config.apiKey, name);
    this.fullPersistenceKey = _persistenceKeyName("persistence" /* KeyName.PERSISTENCE_USER */, config.apiKey, name);
    this.boundEventHandler = auth._onStorageEvent.bind(auth);
    this.persistence._addListener(this.fullUserKey, this.boundEventHandler);
  }
  return _createClass(PersistenceUserManager, [{
    key: "setCurrentUser",
    value: function setCurrentUser(user) {
      return this.persistence._set(this.fullUserKey, user.toJSON());
    }
  }, {
    key: "getCurrentUser",
    value: function () {
      var _getCurrentUser = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee12() {
        var blob, response;
        return _regeneratorRuntime().wrap(function _callee12$(_context12) {
          while (1) switch (_context12.prev = _context12.next) {
            case 0:
              _context12.next = 2;
              return this.persistence._get(this.fullUserKey);
            case 2:
              blob = _context12.sent;
              if (blob) {
                _context12.next = 5;
                break;
              }
              return _context12.abrupt("return", null);
            case 5:
              if (!(typeof blob === 'string')) {
                _context12.next = 12;
                break;
              }
              _context12.next = 8;
              return getAccountInfo(this.auth, {
                idToken: blob
              }).catch(function () {
                return undefined;
              });
            case 8:
              response = _context12.sent;
              if (response) {
                _context12.next = 11;
                break;
              }
              return _context12.abrupt("return", null);
            case 11:
              return _context12.abrupt("return", UserImpl._fromGetAccountInfoResponse(this.auth, response, blob));
            case 12:
              return _context12.abrupt("return", UserImpl._fromJSON(this.auth, blob));
            case 13:
            case "end":
              return _context12.stop();
          }
        }, _callee12, this);
      }));
      function getCurrentUser() {
        return _getCurrentUser.apply(this, arguments);
      }
      return getCurrentUser;
    }()
  }, {
    key: "removeCurrentUser",
    value: function removeCurrentUser() {
      return this.persistence._remove(this.fullUserKey);
    }
  }, {
    key: "savePersistenceForRedirect",
    value: function savePersistenceForRedirect() {
      return this.persistence._set(this.fullPersistenceKey, this.persistence.type);
    }
  }, {
    key: "setPersistence",
    value: function () {
      var _setPersistence = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee13(newPersistence) {
        var currentUser;
        return _regeneratorRuntime().wrap(function _callee13$(_context13) {
          while (1) switch (_context13.prev = _context13.next) {
            case 0:
              if (!(this.persistence === newPersistence)) {
                _context13.next = 2;
                break;
              }
              return _context13.abrupt("return");
            case 2:
              _context13.next = 4;
              return this.getCurrentUser();
            case 4:
              currentUser = _context13.sent;
              _context13.next = 7;
              return this.removeCurrentUser();
            case 7:
              this.persistence = newPersistence;
              if (!currentUser) {
                _context13.next = 10;
                break;
              }
              return _context13.abrupt("return", this.setCurrentUser(currentUser));
            case 10:
            case "end":
              return _context13.stop();
          }
        }, _callee13, this);
      }));
      function setPersistence(_x46) {
        return _setPersistence.apply(this, arguments);
      }
      return setPersistence;
    }()
  }, {
    key: "delete",
    value: function _delete() {
      this.persistence._removeListener(this.fullUserKey, this.boundEventHandler);
    }
  }], [{
    key: "create",
    value: function () {
      var _create = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee16(auth, persistenceHierarchy) {
        var userKey,
          availablePersistences,
          selectedPersistence,
          key,
          userToMigrate,
          _iterator2,
          _step2,
          persistence,
          blob,
          user,
          response,
          migrationHierarchy,
          _args16 = arguments;
        return _regeneratorRuntime().wrap(function _callee16$(_context16) {
          while (1) switch (_context16.prev = _context16.next) {
            case 0:
              userKey = _args16.length > 2 && _args16[2] !== undefined ? _args16[2] : "authUser";
              if (persistenceHierarchy.length) {
                _context16.next = 3;
                break;
              }
              return _context16.abrupt("return", new PersistenceUserManager(_getInstance(inMemoryPersistence), auth, userKey));
            case 3:
              _context16.next = 5;
              return Promise.all(persistenceHierarchy.map(/*#__PURE__*/function () {
                var _ref5 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee14(persistence) {
                  return _regeneratorRuntime().wrap(function _callee14$(_context14) {
                    while (1) switch (_context14.prev = _context14.next) {
                      case 0:
                        _context14.next = 2;
                        return persistence._isAvailable();
                      case 2:
                        if (!_context14.sent) {
                          _context14.next = 4;
                          break;
                        }
                        return _context14.abrupt("return", persistence);
                      case 4:
                        return _context14.abrupt("return", undefined);
                      case 5:
                      case "end":
                        return _context14.stop();
                    }
                  }, _callee14);
                }));
                return function (_x49) {
                  return _ref5.apply(this, arguments);
                };
              }()));
            case 5:
              availablePersistences = _context16.sent.filter(function (persistence) {
                return persistence;
              });
              // Fall back to the first persistence listed, or in memory if none available
              selectedPersistence = availablePersistences[0] || _getInstance(inMemoryPersistence);
              key = _persistenceKeyName(userKey, auth.config.apiKey, auth.name); // Pull out the existing user, setting the chosen persistence to that
              // persistence if the user exists.
              userToMigrate = null; // Note, here we check for a user in _all_ persistences, not just the
              // ones deemed available. If we can migrate a user out of a broken
              // persistence, we will (but only if that persistence supports migration).
              _iterator2 = _createForOfIteratorHelper(persistenceHierarchy);
              _context16.prev = 10;
              _iterator2.s();
            case 12:
              if ((_step2 = _iterator2.n()).done) {
                _context16.next = 41;
                break;
              }
              persistence = _step2.value;
              _context16.prev = 14;
              _context16.next = 17;
              return persistence._get(key);
            case 17:
              blob = _context16.sent;
              if (!blob) {
                _context16.next = 35;
                break;
              }
              user = void 0;
              if (!(typeof blob === 'string')) {
                _context16.next = 31;
                break;
              }
              _context16.next = 23;
              return getAccountInfo(auth, {
                idToken: blob
              }).catch(function () {
                return undefined;
              });
            case 23:
              response = _context16.sent;
              if (response) {
                _context16.next = 26;
                break;
              }
              return _context16.abrupt("break", 41);
            case 26:
              _context16.next = 28;
              return UserImpl._fromGetAccountInfoResponse(auth, response, blob);
            case 28:
              user = _context16.sent;
              _context16.next = 32;
              break;
            case 31:
              user = UserImpl._fromJSON(auth, blob); // throws for unparsable blob (wrong format)
            case 32:
              if (persistence !== selectedPersistence) {
                userToMigrate = user;
              }
              selectedPersistence = persistence;
              return _context16.abrupt("break", 41);
            case 35:
              _context16.next = 39;
              break;
            case 37:
              _context16.prev = 37;
              _context16.t0 = _context16["catch"](14);
            case 39:
              _context16.next = 12;
              break;
            case 41:
              _context16.next = 46;
              break;
            case 43:
              _context16.prev = 43;
              _context16.t1 = _context16["catch"](10);
              _iterator2.e(_context16.t1);
            case 46:
              _context16.prev = 46;
              _iterator2.f();
              return _context16.finish(46);
            case 49:
              // If we find the user in a persistence that does support migration, use
              // that migration path (of only persistences that support migration)
              migrationHierarchy = availablePersistences.filter(function (p) {
                return p._shouldAllowMigration;
              }); // If the persistence does _not_ allow migration, just finish off here
              if (!(!selectedPersistence._shouldAllowMigration || !migrationHierarchy.length)) {
                _context16.next = 52;
                break;
              }
              return _context16.abrupt("return", new PersistenceUserManager(selectedPersistence, auth, userKey));
            case 52:
              selectedPersistence = migrationHierarchy[0];
              if (!userToMigrate) {
                _context16.next = 56;
                break;
              }
              _context16.next = 56;
              return selectedPersistence._set(key, userToMigrate.toJSON());
            case 56:
              _context16.next = 58;
              return Promise.all(persistenceHierarchy.map(/*#__PURE__*/function () {
                var _ref6 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee15(persistence) {
                  return _regeneratorRuntime().wrap(function _callee15$(_context15) {
                    while (1) switch (_context15.prev = _context15.next) {
                      case 0:
                        if (!(persistence !== selectedPersistence)) {
                          _context15.next = 8;
                          break;
                        }
                        _context15.prev = 1;
                        _context15.next = 4;
                        return persistence._remove(key);
                      case 4:
                        _context15.next = 8;
                        break;
                      case 6:
                        _context15.prev = 6;
                        _context15.t0 = _context15["catch"](1);
                      case 8:
                      case "end":
                        return _context15.stop();
                    }
                  }, _callee15, null, [[1, 6]]);
                }));
                return function (_x50) {
                  return _ref6.apply(this, arguments);
                };
              }()));
            case 58:
              return _context16.abrupt("return", new PersistenceUserManager(selectedPersistence, auth, userKey));
            case 59:
            case "end":
              return _context16.stop();
          }
        }, _callee16, null, [[10, 43, 46, 49], [14, 37]]);
      }));
      function create(_x47, _x48) {
        return _create.apply(this, arguments);
      }
      return create;
    }()
  }]);
}();
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Determine the browser for the purposes of reporting usage to the API
 */
function _getBrowserName(userAgent) {
  var ua = userAgent.toLowerCase();
  if (ua.includes('opera/') || ua.includes('opr/') || ua.includes('opios/')) {
    return "Opera" /* BrowserName.OPERA */;
  } else if (_isIEMobile(ua)) {
    // Windows phone IEMobile browser.
    return "IEMobile" /* BrowserName.IEMOBILE */;
  } else if (ua.includes('msie') || ua.includes('trident/')) {
    return "IE" /* BrowserName.IE */;
  } else if (ua.includes('edge/')) {
    return "Edge" /* BrowserName.EDGE */;
  } else if (_isFirefox(ua)) {
    return "Firefox" /* BrowserName.FIREFOX */;
  } else if (ua.includes('silk/')) {
    return "Silk" /* BrowserName.SILK */;
  } else if (_isBlackBerry(ua)) {
    // Blackberry browser.
    return "Blackberry" /* BrowserName.BLACKBERRY */;
  } else if (_isWebOS(ua)) {
    // WebOS default browser.
    return "Webos" /* BrowserName.WEBOS */;
  } else if (_isSafari(ua)) {
    return "Safari" /* BrowserName.SAFARI */;
  } else if ((ua.includes('chrome/') || _isChromeIOS(ua)) && !ua.includes('edge/')) {
    return "Chrome" /* BrowserName.CHROME */;
  } else if (_isAndroid(ua)) {
    // Android stock browser.
    return "Android" /* BrowserName.ANDROID */;
  } else {
    // Most modern browsers have name/version at end of user agent string.
    var re = /([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/;
    var matches = userAgent.match(re);
    if ((matches === null || matches === void 0 ? void 0 : matches.length) === 2) {
      return matches[1];
    }
  }
  return "Other" /* BrowserName.OTHER */;
}
function _isFirefox() {
  var ua = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : (0, _util.getUA)();
  return /firefox\//i.test(ua);
}
function _isSafari() {
  var userAgent = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : (0, _util.getUA)();
  var ua = userAgent.toLowerCase();
  return ua.includes('safari/') && !ua.includes('chrome/') && !ua.includes('crios/') && !ua.includes('android');
}
function _isChromeIOS() {
  var ua = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : (0, _util.getUA)();
  return /crios\//i.test(ua);
}
function _isIEMobile() {
  var ua = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : (0, _util.getUA)();
  return /iemobile/i.test(ua);
}
function _isAndroid() {
  var ua = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : (0, _util.getUA)();
  return /android/i.test(ua);
}
function _isBlackBerry() {
  var ua = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : (0, _util.getUA)();
  return /blackberry/i.test(ua);
}
function _isWebOS() {
  var ua = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : (0, _util.getUA)();
  return /webos/i.test(ua);
}
function _isIOS() {
  var ua = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : (0, _util.getUA)();
  return /iphone|ipad|ipod/i.test(ua) || /macintosh/i.test(ua) && /mobile/i.test(ua);
}
function _isIOS7Or8() {
  var ua = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : (0, _util.getUA)();
  return /(iPad|iPhone|iPod).*OS 7_\d/i.test(ua) || /(iPad|iPhone|iPod).*OS 8_\d/i.test(ua);
}
function _isIOSStandalone() {
  var ua = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : (0, _util.getUA)();
  var _a;
  return _isIOS(ua) && !!((_a = window.navigator) === null || _a === void 0 ? void 0 : _a.standalone);
}
function _isIE10() {
  return (0, _util.isIE)() && document.documentMode === 10;
}
function _isMobileBrowser() {
  var ua = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : (0, _util.getUA)();
  // TODO: implement getBrowserName equivalent for OS.
  return _isIOS(ua) || _isAndroid(ua) || _isWebOS(ua) || _isBlackBerry(ua) || /windows phone/i.test(ua) || _isIEMobile(ua);
}

/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/*
 * Determine the SDK version string
 */
function _getClientVersion(clientPlatform) {
  var frameworks = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  var reportedPlatform;
  switch (clientPlatform) {
    case "Browser" /* ClientPlatform.BROWSER */:
      // In a browser environment, report the browser name.
      reportedPlatform = _getBrowserName((0, _util.getUA)());
      break;
    case "Worker" /* ClientPlatform.WORKER */:
      // Technically a worker runs from a browser but we need to differentiate a
      // worker from a browser.
      // For example: Chrome-Worker/JsCore/4.9.1/FirebaseCore-web.
      reportedPlatform = "".concat(_getBrowserName((0, _util.getUA)()), "-").concat(clientPlatform);
      break;
    default:
      reportedPlatform = clientPlatform;
  }
  var reportedFrameworks = frameworks.length ? frameworks.join(',') : 'FirebaseCore-web'; /* default value if no other framework is used */
  return "".concat(reportedPlatform, "/", "JsCore" /* ClientImplementation.CORE */, "/").concat(_app.SDK_VERSION, "/").concat(reportedFrameworks);
}

/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var AuthMiddlewareQueue = /*#__PURE__*/function () {
  function AuthMiddlewareQueue(auth) {
    _classCallCheck(this, AuthMiddlewareQueue);
    this.auth = auth;
    this.queue = [];
  }
  return _createClass(AuthMiddlewareQueue, [{
    key: "pushCallback",
    value: function pushCallback(callback, onAbort) {
      var _this3 = this;
      // The callback could be sync or async. Wrap it into a
      // function that is always async.
      var wrappedCallback = function wrappedCallback(user) {
        return new Promise(function (resolve, reject) {
          try {
            var result = callback(user);
            // Either resolve with existing promise or wrap a non-promise
            // return value into a promise.
            resolve(result);
          } catch (e) {
            // Sync callback throws.
            reject(e);
          }
        });
      };
      // Attach the onAbort if present
      wrappedCallback.onAbort = onAbort;
      this.queue.push(wrappedCallback);
      var index = this.queue.length - 1;
      return function () {
        // Unsubscribe. Replace with no-op. Do not remove from array, or it will disturb
        // indexing of other elements.
        _this3.queue[index] = function () {
          return Promise.resolve();
        };
      };
    }
  }, {
    key: "runMiddleware",
    value: function () {
      var _runMiddleware = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee17(nextUser) {
        var onAbortStack, _iterator3, _step3, beforeStateCallback, _iterator4, _step4, onAbort;
        return _regeneratorRuntime().wrap(function _callee17$(_context17) {
          while (1) switch (_context17.prev = _context17.next) {
            case 0:
              if (!(this.auth.currentUser === nextUser)) {
                _context17.next = 2;
                break;
              }
              return _context17.abrupt("return");
            case 2:
              // While running the middleware, build a temporary stack of onAbort
              // callbacks to call if one middleware callback rejects.
              onAbortStack = [];
              _context17.prev = 3;
              _iterator3 = _createForOfIteratorHelper(this.queue);
              _context17.prev = 5;
              _iterator3.s();
            case 7:
              if ((_step3 = _iterator3.n()).done) {
                _context17.next = 14;
                break;
              }
              beforeStateCallback = _step3.value;
              _context17.next = 11;
              return beforeStateCallback(nextUser);
            case 11:
              // Only push the onAbort if the callback succeeds
              if (beforeStateCallback.onAbort) {
                onAbortStack.push(beforeStateCallback.onAbort);
              }
            case 12:
              _context17.next = 7;
              break;
            case 14:
              _context17.next = 19;
              break;
            case 16:
              _context17.prev = 16;
              _context17.t0 = _context17["catch"](5);
              _iterator3.e(_context17.t0);
            case 19:
              _context17.prev = 19;
              _iterator3.f();
              return _context17.finish(19);
            case 22:
              _context17.next = 30;
              break;
            case 24:
              _context17.prev = 24;
              _context17.t1 = _context17["catch"](3);
              // Run all onAbort, with separate try/catch to ignore any errors and
              // continue
              onAbortStack.reverse();
              _iterator4 = _createForOfIteratorHelper(onAbortStack);
              try {
                for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
                  onAbort = _step4.value;
                  try {
                    onAbort();
                  } catch (_) {
                    /* swallow error */
                  }
                }
              } catch (err) {
                _iterator4.e(err);
              } finally {
                _iterator4.f();
              }
              throw this.auth._errorFactory.create("login-blocked" /* AuthErrorCode.LOGIN_BLOCKED */, {
                originalMessage: _context17.t1 === null || _context17.t1 === void 0 ? void 0 : _context17.t1.message
              });
            case 30:
            case "end":
              return _context17.stop();
          }
        }, _callee17, this, [[3, 24], [5, 16, 19, 22]]);
      }));
      function runMiddleware(_x51) {
        return _runMiddleware.apply(this, arguments);
      }
      return runMiddleware;
    }()
  }]);
}();
/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Fetches the password policy for the currently set tenant or the project if no tenant is set.
 *
 * @param auth Auth object.
 * @param request Password policy request.
 * @returns Password policy response.
 */
function _getPasswordPolicy(_x52) {
  return _getPasswordPolicy2.apply(this, arguments);
}
/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
// Minimum min password length enforced by the backend, even if no minimum length is set.
function _getPasswordPolicy2() {
  _getPasswordPolicy2 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee122(auth) {
    var request,
      _args122 = arguments;
    return _regeneratorRuntime().wrap(function _callee122$(_context122) {
      while (1) switch (_context122.prev = _context122.next) {
        case 0:
          request = _args122.length > 1 && _args122[1] !== undefined ? _args122[1] : {};
          return _context122.abrupt("return", _performApiRequest(auth, "GET" /* HttpMethod.GET */, "/v2/passwordPolicy" /* Endpoint.GET_PASSWORD_POLICY */, _addTidIfNecessary(auth, request)));
        case 2:
        case "end":
          return _context122.stop();
      }
    }, _callee122);
  }));
  return _getPasswordPolicy2.apply(this, arguments);
}
var MINIMUM_MIN_PASSWORD_LENGTH = 6;
/**
 * Stores password policy requirements and provides password validation against the policy.
 *
 * @internal
 */
var PasswordPolicyImpl = /*#__PURE__*/function () {
  function PasswordPolicyImpl(response) {
    _classCallCheck(this, PasswordPolicyImpl);
    var _a, _b, _c, _d;
    // Only include custom strength options defined in the response.
    var responseOptions = response.customStrengthOptions;
    this.customStrengthOptions = {};
    // TODO: Remove once the backend is updated to include the minimum min password length instead of undefined when there is no minimum length set.
    this.customStrengthOptions.minPasswordLength = (_a = responseOptions.minPasswordLength) !== null && _a !== void 0 ? _a : MINIMUM_MIN_PASSWORD_LENGTH;
    if (responseOptions.maxPasswordLength) {
      this.customStrengthOptions.maxPasswordLength = responseOptions.maxPasswordLength;
    }
    if (responseOptions.containsLowercaseCharacter !== undefined) {
      this.customStrengthOptions.containsLowercaseLetter = responseOptions.containsLowercaseCharacter;
    }
    if (responseOptions.containsUppercaseCharacter !== undefined) {
      this.customStrengthOptions.containsUppercaseLetter = responseOptions.containsUppercaseCharacter;
    }
    if (responseOptions.containsNumericCharacter !== undefined) {
      this.customStrengthOptions.containsNumericCharacter = responseOptions.containsNumericCharacter;
    }
    if (responseOptions.containsNonAlphanumericCharacter !== undefined) {
      this.customStrengthOptions.containsNonAlphanumericCharacter = responseOptions.containsNonAlphanumericCharacter;
    }
    this.enforcementState = response.enforcementState;
    if (this.enforcementState === 'ENFORCEMENT_STATE_UNSPECIFIED') {
      this.enforcementState = 'OFF';
    }
    // Use an empty string if no non-alphanumeric characters are specified in the response.
    this.allowedNonAlphanumericCharacters = (_c = (_b = response.allowedNonAlphanumericCharacters) === null || _b === void 0 ? void 0 : _b.join('')) !== null && _c !== void 0 ? _c : '';
    this.forceUpgradeOnSignin = (_d = response.forceUpgradeOnSignin) !== null && _d !== void 0 ? _d : false;
    this.schemaVersion = response.schemaVersion;
  }
  return _createClass(PasswordPolicyImpl, [{
    key: "validatePassword",
    value: function validatePassword(password) {
      var _a, _b, _c, _d, _e, _f;
      var status = {
        isValid: true,
        passwordPolicy: this
      };
      // Check the password length and character options.
      this.validatePasswordLengthOptions(password, status);
      this.validatePasswordCharacterOptions(password, status);
      // Combine the status into single isValid property.
      status.isValid && (status.isValid = (_a = status.meetsMinPasswordLength) !== null && _a !== void 0 ? _a : true);
      status.isValid && (status.isValid = (_b = status.meetsMaxPasswordLength) !== null && _b !== void 0 ? _b : true);
      status.isValid && (status.isValid = (_c = status.containsLowercaseLetter) !== null && _c !== void 0 ? _c : true);
      status.isValid && (status.isValid = (_d = status.containsUppercaseLetter) !== null && _d !== void 0 ? _d : true);
      status.isValid && (status.isValid = (_e = status.containsNumericCharacter) !== null && _e !== void 0 ? _e : true);
      status.isValid && (status.isValid = (_f = status.containsNonAlphanumericCharacter) !== null && _f !== void 0 ? _f : true);
      return status;
    }
    /**
     * Validates that the password meets the length options for the policy.
     *
     * @param password Password to validate.
     * @param status Validation status.
     */
  }, {
    key: "validatePasswordLengthOptions",
    value: function validatePasswordLengthOptions(password, status) {
      var minPasswordLength = this.customStrengthOptions.minPasswordLength;
      var maxPasswordLength = this.customStrengthOptions.maxPasswordLength;
      if (minPasswordLength) {
        status.meetsMinPasswordLength = password.length >= minPasswordLength;
      }
      if (maxPasswordLength) {
        status.meetsMaxPasswordLength = password.length <= maxPasswordLength;
      }
    }
    /**
     * Validates that the password meets the character options for the policy.
     *
     * @param password Password to validate.
     * @param status Validation status.
     */
  }, {
    key: "validatePasswordCharacterOptions",
    value: function validatePasswordCharacterOptions(password, status) {
      // Assign statuses for requirements even if the password is an empty string.
      this.updatePasswordCharacterOptionsStatuses(status, /* containsLowercaseCharacter= */false, /* containsUppercaseCharacter= */false, /* containsNumericCharacter= */false, /* containsNonAlphanumericCharacter= */false);
      var passwordChar;
      for (var i = 0; i < password.length; i++) {
        passwordChar = password.charAt(i);
        this.updatePasswordCharacterOptionsStatuses(status, /* containsLowercaseCharacter= */passwordChar >= 'a' && passwordChar <= 'z', /* containsUppercaseCharacter= */passwordChar >= 'A' && passwordChar <= 'Z', /* containsNumericCharacter= */passwordChar >= '0' && passwordChar <= '9', /* containsNonAlphanumericCharacter= */this.allowedNonAlphanumericCharacters.includes(passwordChar));
      }
    }
    /**
     * Updates the running validation status with the statuses for the character options.
     * Expected to be called each time a character is processed to update each option status
     * based on the current character.
     *
     * @param status Validation status.
     * @param containsLowercaseCharacter Whether the character is a lowercase letter.
     * @param containsUppercaseCharacter Whether the character is an uppercase letter.
     * @param containsNumericCharacter Whether the character is a numeric character.
     * @param containsNonAlphanumericCharacter Whether the character is a non-alphanumeric character.
     */
  }, {
    key: "updatePasswordCharacterOptionsStatuses",
    value: function updatePasswordCharacterOptionsStatuses(status, containsLowercaseCharacter, containsUppercaseCharacter, containsNumericCharacter, containsNonAlphanumericCharacter) {
      if (this.customStrengthOptions.containsLowercaseLetter) {
        status.containsLowercaseLetter || (status.containsLowercaseLetter = containsLowercaseCharacter);
      }
      if (this.customStrengthOptions.containsUppercaseLetter) {
        status.containsUppercaseLetter || (status.containsUppercaseLetter = containsUppercaseCharacter);
      }
      if (this.customStrengthOptions.containsNumericCharacter) {
        status.containsNumericCharacter || (status.containsNumericCharacter = containsNumericCharacter);
      }
      if (this.customStrengthOptions.containsNonAlphanumericCharacter) {
        status.containsNonAlphanumericCharacter || (status.containsNonAlphanumericCharacter = containsNonAlphanumericCharacter);
      }
    }
  }]);
}();
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var AuthImpl = exports.aM = /*#__PURE__*/function () {
  function AuthImpl(app, heartbeatServiceProvider, appCheckServiceProvider, config) {
    var _this4 = this;
    _classCallCheck(this, AuthImpl);
    this.app = app;
    this.heartbeatServiceProvider = heartbeatServiceProvider;
    this.appCheckServiceProvider = appCheckServiceProvider;
    this.config = config;
    this.currentUser = null;
    this.emulatorConfig = null;
    this.operations = Promise.resolve();
    this.authStateSubscription = new Subscription(this);
    this.idTokenSubscription = new Subscription(this);
    this.beforeStateQueue = new AuthMiddlewareQueue(this);
    this.redirectUser = null;
    this.isProactiveRefreshEnabled = false;
    this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION = 1;
    // Any network calls will set this to true and prevent subsequent emulator
    // initialization
    this._canInitEmulator = true;
    this._isInitialized = false;
    this._deleted = false;
    this._initializationPromise = null;
    this._popupRedirectResolver = null;
    this._errorFactory = _DEFAULT_AUTH_ERROR_FACTORY;
    this._agentRecaptchaConfig = null;
    this._tenantRecaptchaConfigs = {};
    this._projectPasswordPolicy = null;
    this._tenantPasswordPolicies = {};
    this._resolvePersistenceManagerAvailable = undefined;
    // Tracks the last notified UID for state change listeners to prevent
    // repeated calls to the callbacks. Undefined means it's never been
    // called, whereas null means it's been called with a signed out user
    this.lastNotifiedUid = undefined;
    this.languageCode = null;
    this.tenantId = null;
    this.settings = {
      appVerificationDisabledForTesting: false
    };
    this.frameworks = [];
    this.name = app.name;
    this.clientVersion = config.sdkClientVersion;
    // TODO(jamesdaniels) explore less hacky way to do this, cookie authentication needs
    // persistenceMananger to be available. see _getFinalTarget for more context
    this._persistenceManagerAvailable = new Promise(function (resolve) {
      return _this4._resolvePersistenceManagerAvailable = resolve;
    });
  }
  return _createClass(AuthImpl, [{
    key: "_initializeWithPersistence",
    value: function _initializeWithPersistence(persistenceHierarchy, popupRedirectResolver) {
      var _this5 = this;
      if (popupRedirectResolver) {
        this._popupRedirectResolver = _getInstance(popupRedirectResolver);
      }
      // Have to check for app deletion throughout initialization (after each
      // promise resolution)
      this._initializationPromise = this.queue(/*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee18() {
        var _a, _b, _c;
        return _regeneratorRuntime().wrap(function _callee18$(_context18) {
          while (1) switch (_context18.prev = _context18.next) {
            case 0:
              if (!_this5._deleted) {
                _context18.next = 2;
                break;
              }
              return _context18.abrupt("return");
            case 2:
              _context18.next = 4;
              return PersistenceUserManager.create(_this5, persistenceHierarchy);
            case 4:
              _this5.persistenceManager = _context18.sent;
              (_a = _this5._resolvePersistenceManagerAvailable) === null || _a === void 0 ? void 0 : _a.call(_this5);
              if (!_this5._deleted) {
                _context18.next = 8;
                break;
              }
              return _context18.abrupt("return");
            case 8:
              if (!((_b = _this5._popupRedirectResolver) === null || _b === void 0 ? void 0 : _b._shouldInitProactively)) {
                _context18.next = 16;
                break;
              }
              _context18.prev = 9;
              _context18.next = 12;
              return _this5._popupRedirectResolver._initialize(_this5);
            case 12:
              _context18.next = 16;
              break;
            case 14:
              _context18.prev = 14;
              _context18.t0 = _context18["catch"](9);
            case 16:
              _context18.next = 18;
              return _this5.initializeCurrentUser(popupRedirectResolver);
            case 18:
              _this5.lastNotifiedUid = ((_c = _this5.currentUser) === null || _c === void 0 ? void 0 : _c.uid) || null;
              if (!_this5._deleted) {
                _context18.next = 21;
                break;
              }
              return _context18.abrupt("return");
            case 21:
              _this5._isInitialized = true;
            case 22:
            case "end":
              return _context18.stop();
          }
        }, _callee18, null, [[9, 14]]);
      })));
      return this._initializationPromise;
    }
    /**
     * If the persistence is changed in another window, the user manager will let us know
     */
  }, {
    key: "_onStorageEvent",
    value: (function () {
      var _onStorageEvent2 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee19() {
        var user;
        return _regeneratorRuntime().wrap(function _callee19$(_context19) {
          while (1) switch (_context19.prev = _context19.next) {
            case 0:
              if (!this._deleted) {
                _context19.next = 2;
                break;
              }
              return _context19.abrupt("return");
            case 2:
              _context19.next = 4;
              return this.assertedPersistence.getCurrentUser();
            case 4:
              user = _context19.sent;
              if (!(!this.currentUser && !user)) {
                _context19.next = 7;
                break;
              }
              return _context19.abrupt("return");
            case 7:
              if (!(this.currentUser && user && this.currentUser.uid === user.uid)) {
                _context19.next = 12;
                break;
              }
              // Data update, simply copy data changes.
              this._currentUser._assign(user);
              // If tokens changed from previous user tokens, this will trigger
              // notifyAuthListeners_.
              _context19.next = 11;
              return this.currentUser.getIdToken();
            case 11:
              return _context19.abrupt("return");
            case 12:
              _context19.next = 14;
              return this._updateCurrentUser(user, /* skipBeforeStateCallbacks */true);
            case 14:
            case "end":
              return _context19.stop();
          }
        }, _callee19, this);
      }));
      function _onStorageEvent() {
        return _onStorageEvent2.apply(this, arguments);
      }
      return _onStorageEvent;
    }())
  }, {
    key: "initializeCurrentUserFromIdToken",
    value: function () {
      var _initializeCurrentUserFromIdToken = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee20(idToken) {
        var response, user;
        return _regeneratorRuntime().wrap(function _callee20$(_context20) {
          while (1) switch (_context20.prev = _context20.next) {
            case 0:
              _context20.prev = 0;
              _context20.next = 3;
              return getAccountInfo(this, {
                idToken: idToken
              });
            case 3:
              response = _context20.sent;
              _context20.next = 6;
              return UserImpl._fromGetAccountInfoResponse(this, response, idToken);
            case 6:
              user = _context20.sent;
              _context20.next = 9;
              return this.directlySetCurrentUser(user);
            case 9:
              _context20.next = 16;
              break;
            case 11:
              _context20.prev = 11;
              _context20.t0 = _context20["catch"](0);
              console.warn('FirebaseServerApp could not login user with provided authIdToken: ', _context20.t0);
              _context20.next = 16;
              return this.directlySetCurrentUser(null);
            case 16:
            case "end":
              return _context20.stop();
          }
        }, _callee20, this, [[0, 11]]);
      }));
      function initializeCurrentUserFromIdToken(_x53) {
        return _initializeCurrentUserFromIdToken.apply(this, arguments);
      }
      return initializeCurrentUserFromIdToken;
    }()
  }, {
    key: "initializeCurrentUser",
    value: function () {
      var _initializeCurrentUser = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee21(popupRedirectResolver) {
        var _this6 = this;
        var _a, idToken, previouslyStoredUser, futureCurrentUser, needsTocheckMiddleware, redirectUserEventId, storedUserEventId, result;
        return _regeneratorRuntime().wrap(function _callee21$(_context21) {
          while (1) switch (_context21.prev = _context21.next) {
            case 0:
              if (!(0, _app._isFirebaseServerApp)(this.app)) {
                _context21.next = 7;
                break;
              }
              idToken = this.app.settings.authIdToken;
              if (!idToken) {
                _context21.next = 6;
                break;
              }
              return _context21.abrupt("return", new Promise(function (resolve) {
                setTimeout(function () {
                  return _this6.initializeCurrentUserFromIdToken(idToken).then(resolve, resolve);
                });
              }));
            case 6:
              return _context21.abrupt("return", this.directlySetCurrentUser(null));
            case 7:
              _context21.next = 9;
              return this.assertedPersistence.getCurrentUser();
            case 9:
              previouslyStoredUser = _context21.sent;
              futureCurrentUser = previouslyStoredUser;
              needsTocheckMiddleware = false;
              if (!(popupRedirectResolver && this.config.authDomain)) {
                _context21.next = 21;
                break;
              }
              _context21.next = 15;
              return this.getOrInitRedirectPersistenceManager();
            case 15:
              redirectUserEventId = (_a = this.redirectUser) === null || _a === void 0 ? void 0 : _a._redirectEventId;
              storedUserEventId = futureCurrentUser === null || futureCurrentUser === void 0 ? void 0 : futureCurrentUser._redirectEventId;
              _context21.next = 19;
              return this.tryRedirectSignIn(popupRedirectResolver);
            case 19:
              result = _context21.sent;
              // If the stored user (i.e. the old "currentUser") has a redirectId that
              // matches the redirect user, then we want to initially sign in with the
              // new user object from result.
              // TODO(samgho): More thoroughly test all of this
              if ((!redirectUserEventId || redirectUserEventId === storedUserEventId) && (result === null || result === void 0 ? void 0 : result.user)) {
                futureCurrentUser = result.user;
                needsTocheckMiddleware = true;
              }
            case 21:
              if (futureCurrentUser) {
                _context21.next = 23;
                break;
              }
              return _context21.abrupt("return", this.directlySetCurrentUser(null));
            case 23:
              if (futureCurrentUser._redirectEventId) {
                _context21.next = 39;
                break;
              }
              if (!needsTocheckMiddleware) {
                _context21.next = 34;
                break;
              }
              _context21.prev = 25;
              _context21.next = 28;
              return this.beforeStateQueue.runMiddleware(futureCurrentUser);
            case 28:
              _context21.next = 34;
              break;
            case 30:
              _context21.prev = 30;
              _context21.t0 = _context21["catch"](25);
              futureCurrentUser = previouslyStoredUser;
              // We know this is available since the bit is only set when the
              // resolver is available
              this._popupRedirectResolver._overrideRedirectResult(this, function () {
                return Promise.reject(_context21.t0);
              });
            case 34:
              if (!futureCurrentUser) {
                _context21.next = 38;
                break;
              }
              return _context21.abrupt("return", this.reloadAndSetCurrentUserOrClear(futureCurrentUser));
            case 38:
              return _context21.abrupt("return", this.directlySetCurrentUser(null));
            case 39:
              _assert(this._popupRedirectResolver, this, "argument-error" /* AuthErrorCode.ARGUMENT_ERROR */);
              _context21.next = 42;
              return this.getOrInitRedirectPersistenceManager();
            case 42:
              if (!(this.redirectUser && this.redirectUser._redirectEventId === futureCurrentUser._redirectEventId)) {
                _context21.next = 44;
                break;
              }
              return _context21.abrupt("return", this.directlySetCurrentUser(futureCurrentUser));
            case 44:
              return _context21.abrupt("return", this.reloadAndSetCurrentUserOrClear(futureCurrentUser));
            case 45:
            case "end":
              return _context21.stop();
          }
        }, _callee21, this, [[25, 30]]);
      }));
      function initializeCurrentUser(_x54) {
        return _initializeCurrentUser.apply(this, arguments);
      }
      return initializeCurrentUser;
    }()
  }, {
    key: "tryRedirectSignIn",
    value: function () {
      var _tryRedirectSignIn = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee22(redirectResolver) {
        var result;
        return _regeneratorRuntime().wrap(function _callee22$(_context22) {
          while (1) switch (_context22.prev = _context22.next) {
            case 0:
              // The redirect user needs to be checked (and signed in if available)
              // during auth initialization. All of the normal sign in and link/reauth
              // flows call back into auth and push things onto the promise queue. We
              // need to await the result of the redirect sign in *inside the promise
              // queue*. This presents a problem: we run into deadlock. See:
              //    ┌> [Initialization] ─────┐
              //    ┌> [<other queue tasks>] │
              //    └─ [getRedirectResult] <─┘
              //    where [] are tasks on the queue and arrows denote awaits
              // Initialization will never complete because it's waiting on something
              // that's waiting for initialization to complete!
              //
              // Instead, this method calls getRedirectResult() (stored in
              // _completeRedirectFn) with an optional parameter that instructs all of
              // the underlying auth operations to skip anything that mutates auth state.
              result = null;
              _context22.prev = 1;
              _context22.next = 4;
              return this._popupRedirectResolver._completeRedirectFn(this, redirectResolver, true);
            case 4:
              result = _context22.sent;
              _context22.next = 11;
              break;
            case 7:
              _context22.prev = 7;
              _context22.t0 = _context22["catch"](1);
              _context22.next = 11;
              return this._setRedirectUser(null);
            case 11:
              return _context22.abrupt("return", result);
            case 12:
            case "end":
              return _context22.stop();
          }
        }, _callee22, this, [[1, 7]]);
      }));
      function tryRedirectSignIn(_x55) {
        return _tryRedirectSignIn.apply(this, arguments);
      }
      return tryRedirectSignIn;
    }()
  }, {
    key: "reloadAndSetCurrentUserOrClear",
    value: function () {
      var _reloadAndSetCurrentUserOrClear = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee23(user) {
        return _regeneratorRuntime().wrap(function _callee23$(_context23) {
          while (1) switch (_context23.prev = _context23.next) {
            case 0:
              _context23.prev = 0;
              _context23.next = 3;
              return _reloadWithoutSaving(user);
            case 3:
              _context23.next = 9;
              break;
            case 5:
              _context23.prev = 5;
              _context23.t0 = _context23["catch"](0);
              if (!((_context23.t0 === null || _context23.t0 === void 0 ? void 0 : _context23.t0.code) !== "auth/".concat("network-request-failed" /* AuthErrorCode.NETWORK_REQUEST_FAILED */))) {
                _context23.next = 9;
                break;
              }
              return _context23.abrupt("return", this.directlySetCurrentUser(null));
            case 9:
              return _context23.abrupt("return", this.directlySetCurrentUser(user));
            case 10:
            case "end":
              return _context23.stop();
          }
        }, _callee23, this, [[0, 5]]);
      }));
      function reloadAndSetCurrentUserOrClear(_x56) {
        return _reloadAndSetCurrentUserOrClear.apply(this, arguments);
      }
      return reloadAndSetCurrentUserOrClear;
    }()
  }, {
    key: "useDeviceLanguage",
    value: function useDeviceLanguage() {
      this.languageCode = _getUserLanguage();
    }
  }, {
    key: "_delete",
    value: function () {
      var _delete3 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee24() {
        return _regeneratorRuntime().wrap(function _callee24$(_context24) {
          while (1) switch (_context24.prev = _context24.next) {
            case 0:
              this._deleted = true;
            case 1:
            case "end":
              return _context24.stop();
          }
        }, _callee24, this);
      }));
      function _delete() {
        return _delete3.apply(this, arguments);
      }
      return _delete;
    }()
  }, {
    key: "updateCurrentUser",
    value: function () {
      var _updateCurrentUser2 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee25(userExtern) {
        var user;
        return _regeneratorRuntime().wrap(function _callee25$(_context25) {
          while (1) switch (_context25.prev = _context25.next) {
            case 0:
              if (!(0, _app._isFirebaseServerApp)(this.app)) {
                _context25.next = 2;
                break;
              }
              return _context25.abrupt("return", Promise.reject(_serverAppCurrentUserOperationNotSupportedError(this)));
            case 2:
              // The public updateCurrentUser method needs to make a copy of the user,
              // and also check that the project matches
              user = userExtern ? (0, _util.getModularInstance)(userExtern) : null;
              if (user) {
                _assert(user.auth.config.apiKey === this.config.apiKey, this, "invalid-user-token" /* AuthErrorCode.INVALID_AUTH */);
              }
              return _context25.abrupt("return", this._updateCurrentUser(user && user._clone(this)));
            case 5:
            case "end":
              return _context25.stop();
          }
        }, _callee25, this);
      }));
      function updateCurrentUser(_x57) {
        return _updateCurrentUser2.apply(this, arguments);
      }
      return updateCurrentUser;
    }()
  }, {
    key: "_updateCurrentUser",
    value: function () {
      var _updateCurrentUser3 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee27(user) {
        var _this7 = this;
        var skipBeforeStateCallbacks,
          _args27 = arguments;
        return _regeneratorRuntime().wrap(function _callee27$(_context27) {
          while (1) switch (_context27.prev = _context27.next) {
            case 0:
              skipBeforeStateCallbacks = _args27.length > 1 && _args27[1] !== undefined ? _args27[1] : false;
              if (!this._deleted) {
                _context27.next = 3;
                break;
              }
              return _context27.abrupt("return");
            case 3:
              if (user) {
                _assert(this.tenantId === user.tenantId, this, "tenant-id-mismatch" /* AuthErrorCode.TENANT_ID_MISMATCH */);
              }
              if (skipBeforeStateCallbacks) {
                _context27.next = 7;
                break;
              }
              _context27.next = 7;
              return this.beforeStateQueue.runMiddleware(user);
            case 7:
              return _context27.abrupt("return", this.queue(/*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee26() {
                return _regeneratorRuntime().wrap(function _callee26$(_context26) {
                  while (1) switch (_context26.prev = _context26.next) {
                    case 0:
                      _context26.next = 2;
                      return _this7.directlySetCurrentUser(user);
                    case 2:
                      _this7.notifyAuthListeners();
                    case 3:
                    case "end":
                      return _context26.stop();
                  }
                }, _callee26);
              }))));
            case 8:
            case "end":
              return _context27.stop();
          }
        }, _callee27, this);
      }));
      function _updateCurrentUser(_x58) {
        return _updateCurrentUser3.apply(this, arguments);
      }
      return _updateCurrentUser;
    }()
  }, {
    key: "signOut",
    value: function () {
      var _signOut = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee28() {
        return _regeneratorRuntime().wrap(function _callee28$(_context28) {
          while (1) switch (_context28.prev = _context28.next) {
            case 0:
              if (!(0, _app._isFirebaseServerApp)(this.app)) {
                _context28.next = 2;
                break;
              }
              return _context28.abrupt("return", Promise.reject(_serverAppCurrentUserOperationNotSupportedError(this)));
            case 2:
              _context28.next = 4;
              return this.beforeStateQueue.runMiddleware(null);
            case 4:
              if (!(this.redirectPersistenceManager || this._popupRedirectResolver)) {
                _context28.next = 7;
                break;
              }
              _context28.next = 7;
              return this._setRedirectUser(null);
            case 7:
              return _context28.abrupt("return", this._updateCurrentUser(null, /* skipBeforeStateCallbacks */true));
            case 8:
            case "end":
              return _context28.stop();
          }
        }, _callee28, this);
      }));
      function signOut() {
        return _signOut.apply(this, arguments);
      }
      return signOut;
    }()
  }, {
    key: "setPersistence",
    value: function setPersistence(persistence) {
      var _this8 = this;
      if ((0, _app._isFirebaseServerApp)(this.app)) {
        return Promise.reject(_serverAppCurrentUserOperationNotSupportedError(this));
      }
      return this.queue(/*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee29() {
        return _regeneratorRuntime().wrap(function _callee29$(_context29) {
          while (1) switch (_context29.prev = _context29.next) {
            case 0:
              _context29.next = 2;
              return _this8.assertedPersistence.setPersistence(_getInstance(persistence));
            case 2:
            case "end":
              return _context29.stop();
          }
        }, _callee29);
      })));
    }
  }, {
    key: "_getRecaptchaConfig",
    value: function _getRecaptchaConfig() {
      if (this.tenantId == null) {
        return this._agentRecaptchaConfig;
      } else {
        return this._tenantRecaptchaConfigs[this.tenantId];
      }
    }
  }, {
    key: "validatePassword",
    value: function () {
      var _validatePassword = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee30(password) {
        var passwordPolicy;
        return _regeneratorRuntime().wrap(function _callee30$(_context30) {
          while (1) switch (_context30.prev = _context30.next) {
            case 0:
              if (this._getPasswordPolicyInternal()) {
                _context30.next = 3;
                break;
              }
              _context30.next = 3;
              return this._updatePasswordPolicy();
            case 3:
              // Password policy will be defined after fetching.
              passwordPolicy = this._getPasswordPolicyInternal(); // Check that the policy schema version is supported by the SDK.
              // TODO: Update this logic to use a max supported policy schema version once we have multiple schema versions.
              if (!(passwordPolicy.schemaVersion !== this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION)) {
                _context30.next = 6;
                break;
              }
              return _context30.abrupt("return", Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version" /* AuthErrorCode.UNSUPPORTED_PASSWORD_POLICY_SCHEMA_VERSION */, {})));
            case 6:
              return _context30.abrupt("return", passwordPolicy.validatePassword(password));
            case 7:
            case "end":
              return _context30.stop();
          }
        }, _callee30, this);
      }));
      function validatePassword(_x59) {
        return _validatePassword.apply(this, arguments);
      }
      return validatePassword;
    }()
  }, {
    key: "_getPasswordPolicyInternal",
    value: function _getPasswordPolicyInternal() {
      if (this.tenantId === null) {
        return this._projectPasswordPolicy;
      } else {
        return this._tenantPasswordPolicies[this.tenantId];
      }
    }
  }, {
    key: "_updatePasswordPolicy",
    value: function () {
      var _updatePasswordPolicy2 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee31() {
        var response, passwordPolicy;
        return _regeneratorRuntime().wrap(function _callee31$(_context31) {
          while (1) switch (_context31.prev = _context31.next) {
            case 0:
              _context31.next = 2;
              return _getPasswordPolicy(this);
            case 2:
              response = _context31.sent;
              passwordPolicy = new PasswordPolicyImpl(response);
              if (this.tenantId === null) {
                this._projectPasswordPolicy = passwordPolicy;
              } else {
                this._tenantPasswordPolicies[this.tenantId] = passwordPolicy;
              }
            case 5:
            case "end":
              return _context31.stop();
          }
        }, _callee31, this);
      }));
      function _updatePasswordPolicy() {
        return _updatePasswordPolicy2.apply(this, arguments);
      }
      return _updatePasswordPolicy;
    }()
  }, {
    key: "_getPersistenceType",
    value: function _getPersistenceType() {
      return this.assertedPersistence.persistence.type;
    }
  }, {
    key: "_getPersistence",
    value: function _getPersistence() {
      return this.assertedPersistence.persistence;
    }
  }, {
    key: "_updateErrorMap",
    value: function _updateErrorMap(errorMap) {
      this._errorFactory = new _util.ErrorFactory('auth', 'Firebase', errorMap());
    }
  }, {
    key: "onAuthStateChanged",
    value: function onAuthStateChanged(nextOrObserver, error, completed) {
      return this.registerStateListener(this.authStateSubscription, nextOrObserver, error, completed);
    }
  }, {
    key: "beforeAuthStateChanged",
    value: function beforeAuthStateChanged(callback, onAbort) {
      return this.beforeStateQueue.pushCallback(callback, onAbort);
    }
  }, {
    key: "onIdTokenChanged",
    value: function onIdTokenChanged(nextOrObserver, error, completed) {
      return this.registerStateListener(this.idTokenSubscription, nextOrObserver, error, completed);
    }
  }, {
    key: "authStateReady",
    value: function authStateReady() {
      var _this9 = this;
      return new Promise(function (resolve, reject) {
        if (_this9.currentUser) {
          resolve();
        } else {
          var unsubscribe = _this9.onAuthStateChanged(function () {
            unsubscribe();
            resolve();
          }, reject);
        }
      });
    }
    /**
     * Revokes the given access token. Currently only supports Apple OAuth access tokens.
     */
  }, {
    key: "revokeAccessToken",
    value: (function () {
      var _revokeAccessToken = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee32(token) {
        var idToken, request;
        return _regeneratorRuntime().wrap(function _callee32$(_context32) {
          while (1) switch (_context32.prev = _context32.next) {
            case 0:
              if (!this.currentUser) {
                _context32.next = 8;
                break;
              }
              _context32.next = 3;
              return this.currentUser.getIdToken();
            case 3:
              idToken = _context32.sent;
              // Generalize this to accept other providers once supported.
              request = {
                providerId: 'apple.com',
                tokenType: "ACCESS_TOKEN" /* TokenType.ACCESS_TOKEN */,
                token: token,
                idToken: idToken
              };
              if (this.tenantId != null) {
                request.tenantId = this.tenantId;
              }
              _context32.next = 8;
              return revokeToken(this, request);
            case 8:
            case "end":
              return _context32.stop();
          }
        }, _callee32, this);
      }));
      function revokeAccessToken(_x60) {
        return _revokeAccessToken.apply(this, arguments);
      }
      return revokeAccessToken;
    }())
  }, {
    key: "toJSON",
    value: function toJSON() {
      var _a;
      return {
        apiKey: this.config.apiKey,
        authDomain: this.config.authDomain,
        appName: this.name,
        currentUser: (_a = this._currentUser) === null || _a === void 0 ? void 0 : _a.toJSON()
      };
    }
  }, {
    key: "_setRedirectUser",
    value: function () {
      var _setRedirectUser2 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee33(user, popupRedirectResolver) {
        var redirectManager;
        return _regeneratorRuntime().wrap(function _callee33$(_context33) {
          while (1) switch (_context33.prev = _context33.next) {
            case 0:
              _context33.next = 2;
              return this.getOrInitRedirectPersistenceManager(popupRedirectResolver);
            case 2:
              redirectManager = _context33.sent;
              return _context33.abrupt("return", user === null ? redirectManager.removeCurrentUser() : redirectManager.setCurrentUser(user));
            case 4:
            case "end":
              return _context33.stop();
          }
        }, _callee33, this);
      }));
      function _setRedirectUser(_x61, _x62) {
        return _setRedirectUser2.apply(this, arguments);
      }
      return _setRedirectUser;
    }()
  }, {
    key: "getOrInitRedirectPersistenceManager",
    value: function () {
      var _getOrInitRedirectPersistenceManager = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee34(popupRedirectResolver) {
        var resolver;
        return _regeneratorRuntime().wrap(function _callee34$(_context34) {
          while (1) switch (_context34.prev = _context34.next) {
            case 0:
              if (this.redirectPersistenceManager) {
                _context34.next = 9;
                break;
              }
              resolver = popupRedirectResolver && _getInstance(popupRedirectResolver) || this._popupRedirectResolver;
              _assert(resolver, this, "argument-error" /* AuthErrorCode.ARGUMENT_ERROR */);
              _context34.next = 5;
              return PersistenceUserManager.create(this, [_getInstance(resolver._redirectPersistence)], "redirectUser" /* KeyName.REDIRECT_USER */);
            case 5:
              this.redirectPersistenceManager = _context34.sent;
              _context34.next = 8;
              return this.redirectPersistenceManager.getCurrentUser();
            case 8:
              this.redirectUser = _context34.sent;
            case 9:
              return _context34.abrupt("return", this.redirectPersistenceManager);
            case 10:
            case "end":
              return _context34.stop();
          }
        }, _callee34, this);
      }));
      function getOrInitRedirectPersistenceManager(_x63) {
        return _getOrInitRedirectPersistenceManager.apply(this, arguments);
      }
      return getOrInitRedirectPersistenceManager;
    }()
  }, {
    key: "_redirectUserForId",
    value: function () {
      var _redirectUserForId2 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee36(id) {
        var _a, _b;
        return _regeneratorRuntime().wrap(function _callee36$(_context36) {
          while (1) switch (_context36.prev = _context36.next) {
            case 0:
              if (!this._isInitialized) {
                _context36.next = 3;
                break;
              }
              _context36.next = 3;
              return this.queue(/*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee35() {
                return _regeneratorRuntime().wrap(function _callee35$(_context35) {
                  while (1) switch (_context35.prev = _context35.next) {
                    case 0:
                    case "end":
                      return _context35.stop();
                  }
                }, _callee35);
              })));
            case 3:
              if (!(((_a = this._currentUser) === null || _a === void 0 ? void 0 : _a._redirectEventId) === id)) {
                _context36.next = 5;
                break;
              }
              return _context36.abrupt("return", this._currentUser);
            case 5:
              if (!(((_b = this.redirectUser) === null || _b === void 0 ? void 0 : _b._redirectEventId) === id)) {
                _context36.next = 7;
                break;
              }
              return _context36.abrupt("return", this.redirectUser);
            case 7:
              return _context36.abrupt("return", null);
            case 8:
            case "end":
              return _context36.stop();
          }
        }, _callee36, this);
      }));
      function _redirectUserForId(_x64) {
        return _redirectUserForId2.apply(this, arguments);
      }
      return _redirectUserForId;
    }()
  }, {
    key: "_persistUserIfCurrent",
    value: function () {
      var _persistUserIfCurrent2 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee38(user) {
        var _this0 = this;
        return _regeneratorRuntime().wrap(function _callee38$(_context38) {
          while (1) switch (_context38.prev = _context38.next) {
            case 0:
              if (!(user === this.currentUser)) {
                _context38.next = 2;
                break;
              }
              return _context38.abrupt("return", this.queue(/*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee37() {
                return _regeneratorRuntime().wrap(function _callee37$(_context37) {
                  while (1) switch (_context37.prev = _context37.next) {
                    case 0:
                      return _context37.abrupt("return", _this0.directlySetCurrentUser(user));
                    case 1:
                    case "end":
                      return _context37.stop();
                  }
                }, _callee37);
              }))));
            case 2:
            case "end":
              return _context38.stop();
          }
        }, _callee38, this);
      }));
      function _persistUserIfCurrent(_x65) {
        return _persistUserIfCurrent2.apply(this, arguments);
      }
      return _persistUserIfCurrent;
    }() /** Notifies listeners only if the user is current */
  }, {
    key: "_notifyListenersIfCurrent",
    value: function _notifyListenersIfCurrent(user) {
      if (user === this.currentUser) {
        this.notifyAuthListeners();
      }
    }
  }, {
    key: "_key",
    value: function _key() {
      return "".concat(this.config.authDomain, ":").concat(this.config.apiKey, ":").concat(this.name);
    }
  }, {
    key: "_startProactiveRefresh",
    value: function _startProactiveRefresh() {
      this.isProactiveRefreshEnabled = true;
      if (this.currentUser) {
        this._currentUser._startProactiveRefresh();
      }
    }
  }, {
    key: "_stopProactiveRefresh",
    value: function _stopProactiveRefresh() {
      this.isProactiveRefreshEnabled = false;
      if (this.currentUser) {
        this._currentUser._stopProactiveRefresh();
      }
    }
    /** Returns the current user cast as the internal type */
  }, {
    key: "_currentUser",
    get: function get() {
      return this.currentUser;
    }
  }, {
    key: "notifyAuthListeners",
    value: function notifyAuthListeners() {
      var _a, _b;
      if (!this._isInitialized) {
        return;
      }
      this.idTokenSubscription.next(this.currentUser);
      var currentUid = (_b = (_a = this.currentUser) === null || _a === void 0 ? void 0 : _a.uid) !== null && _b !== void 0 ? _b : null;
      if (this.lastNotifiedUid !== currentUid) {
        this.lastNotifiedUid = currentUid;
        this.authStateSubscription.next(this.currentUser);
      }
    }
  }, {
    key: "registerStateListener",
    value: function registerStateListener(subscription, nextOrObserver, error, completed) {
      var _this1 = this;
      if (this._deleted) {
        return function () {};
      }
      var cb = typeof nextOrObserver === 'function' ? nextOrObserver : nextOrObserver.next.bind(nextOrObserver);
      var isUnsubscribed = false;
      var promise = this._isInitialized ? Promise.resolve() : this._initializationPromise;
      _assert(promise, this, "internal-error" /* AuthErrorCode.INTERNAL_ERROR */);
      // The callback needs to be called asynchronously per the spec.
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      promise.then(function () {
        if (isUnsubscribed) {
          return;
        }
        cb(_this1.currentUser);
      });
      if (typeof nextOrObserver === 'function') {
        var unsubscribe = subscription.addObserver(nextOrObserver, error, completed);
        return function () {
          isUnsubscribed = true;
          unsubscribe();
        };
      } else {
        var _unsubscribe = subscription.addObserver(nextOrObserver);
        return function () {
          isUnsubscribed = true;
          _unsubscribe();
        };
      }
    }
    /**
     * Unprotected (from race conditions) method to set the current user. This
     * should only be called from within a queued callback. This is necessary
     * because the queue shouldn't rely on another queued callback.
     */
  }, {
    key: "directlySetCurrentUser",
    value: (function () {
      var _directlySetCurrentUser = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee39(user) {
        return _regeneratorRuntime().wrap(function _callee39$(_context39) {
          while (1) switch (_context39.prev = _context39.next) {
            case 0:
              if (this.currentUser && this.currentUser !== user) {
                this._currentUser._stopProactiveRefresh();
              }
              if (user && this.isProactiveRefreshEnabled) {
                user._startProactiveRefresh();
              }
              this.currentUser = user;
              if (!user) {
                _context39.next = 8;
                break;
              }
              _context39.next = 6;
              return this.assertedPersistence.setCurrentUser(user);
            case 6:
              _context39.next = 10;
              break;
            case 8:
              _context39.next = 10;
              return this.assertedPersistence.removeCurrentUser();
            case 10:
            case "end":
              return _context39.stop();
          }
        }, _callee39, this);
      }));
      function directlySetCurrentUser(_x66) {
        return _directlySetCurrentUser.apply(this, arguments);
      }
      return directlySetCurrentUser;
    }())
  }, {
    key: "queue",
    value: function queue(action) {
      // In case something errors, the callback still should be called in order
      // to keep the promise chain alive
      this.operations = this.operations.then(action, action);
      return this.operations;
    }
  }, {
    key: "assertedPersistence",
    get: function get() {
      _assert(this.persistenceManager, this, "internal-error" /* AuthErrorCode.INTERNAL_ERROR */);
      return this.persistenceManager;
    }
  }, {
    key: "_logFramework",
    value: function _logFramework(framework) {
      if (!framework || this.frameworks.includes(framework)) {
        return;
      }
      this.frameworks.push(framework);
      // Sort alphabetically so that "FirebaseCore-web,FirebaseUI-web" and
      // "FirebaseUI-web,FirebaseCore-web" aren't viewed as different.
      this.frameworks.sort();
      this.clientVersion = _getClientVersion(this.config.clientPlatform, this._getFrameworks());
    }
  }, {
    key: "_getFrameworks",
    value: function _getFrameworks() {
      return this.frameworks;
    }
  }, {
    key: "_getAdditionalHeaders",
    value: function () {
      var _getAdditionalHeaders2 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee40() {
        var _a, headers, heartbeatsHeader, appCheckToken;
        return _regeneratorRuntime().wrap(function _callee40$(_context40) {
          while (1) switch (_context40.prev = _context40.next) {
            case 0:
              // Additional headers on every request
              headers = _defineProperty({}, "X-Client-Version" /* HttpHeader.X_CLIENT_VERSION */, this.clientVersion);
              if (this.app.options.appId) {
                headers["X-Firebase-gmpid" /* HttpHeader.X_FIREBASE_GMPID */] = this.app.options.appId;
              }
              // If the heartbeat service exists, add the heartbeat string
              _context40.next = 4;
              return (_a = this.heartbeatServiceProvider.getImmediate({
                optional: true
              })) === null || _a === void 0 ? void 0 : _a.getHeartbeatsHeader();
            case 4:
              heartbeatsHeader = _context40.sent;
              if (heartbeatsHeader) {
                headers["X-Firebase-Client" /* HttpHeader.X_FIREBASE_CLIENT */] = heartbeatsHeader;
              }
              // If the App Check service exists, add the App Check token in the headers
              _context40.next = 8;
              return this._getAppCheckToken();
            case 8:
              appCheckToken = _context40.sent;
              if (appCheckToken) {
                headers["X-Firebase-AppCheck" /* HttpHeader.X_FIREBASE_APP_CHECK */] = appCheckToken;
              }
              return _context40.abrupt("return", headers);
            case 11:
            case "end":
              return _context40.stop();
          }
        }, _callee40, this);
      }));
      function _getAdditionalHeaders() {
        return _getAdditionalHeaders2.apply(this, arguments);
      }
      return _getAdditionalHeaders;
    }()
  }, {
    key: "_getAppCheckToken",
    value: function () {
      var _getAppCheckToken2 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee41() {
        var _a, appCheckTokenResult;
        return _regeneratorRuntime().wrap(function _callee41$(_context41) {
          while (1) switch (_context41.prev = _context41.next) {
            case 0:
              if (!((0, _app._isFirebaseServerApp)(this.app) && this.app.settings.appCheckToken)) {
                _context41.next = 2;
                break;
              }
              return _context41.abrupt("return", this.app.settings.appCheckToken);
            case 2:
              _context41.next = 4;
              return (_a = this.appCheckServiceProvider.getImmediate({
                optional: true
              })) === null || _a === void 0 ? void 0 : _a.getToken();
            case 4:
              appCheckTokenResult = _context41.sent;
              if (appCheckTokenResult === null || appCheckTokenResult === void 0 ? void 0 : appCheckTokenResult.error) {
                // Context: appCheck.getToken() will never throw even if an error happened.
                // In the error case, a dummy token will be returned along with an error field describing
                // the error. In general, we shouldn't care about the error condition and just use
                // the token (actual or dummy) to send requests.
                _logWarn("Error while retrieving App Check token: ".concat(appCheckTokenResult.error));
              }
              return _context41.abrupt("return", appCheckTokenResult === null || appCheckTokenResult === void 0 ? void 0 : appCheckTokenResult.token);
            case 7:
            case "end":
              return _context41.stop();
          }
        }, _callee41, this);
      }));
      function _getAppCheckToken() {
        return _getAppCheckToken2.apply(this, arguments);
      }
      return _getAppCheckToken;
    }()
  }]);
}();
/**
 * Method to be used to cast down to our private implementation of Auth.
 * It will also handle unwrapping from the compat type if necessary
 *
 * @param auth Auth object passed in from developer
 */
function _castAuth(auth) {
  return (0, _util.getModularInstance)(auth);
}
/** Helper class to wrap subscriber logic */
var Subscription = /*#__PURE__*/function () {
  function Subscription(auth) {
    var _this10 = this;
    _classCallCheck(this, Subscription);
    this.auth = auth;
    this.observer = null;
    this.addObserver = (0, _util.createSubscribe)(function (observer) {
      return _this10.observer = observer;
    });
  }
  return _createClass(Subscription, [{
    key: "next",
    get: function get() {
      _assert(this.observer, this.auth, "internal-error" /* AuthErrorCode.INTERNAL_ERROR */);
      return this.observer.next.bind(this.observer);
    }
  }]);
}();
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var externalJSProvider = {
  loadJS: function loadJS() {
    return _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee42() {
      return _regeneratorRuntime().wrap(function _callee42$(_context42) {
        while (1) switch (_context42.prev = _context42.next) {
          case 0:
            throw new Error('Unable to load external scripts');
          case 1:
          case "end":
            return _context42.stop();
        }
      }, _callee42);
    }))();
  },
  recaptchaV2Script: '',
  recaptchaEnterpriseScript: '',
  gapiScript: ''
};
function _setExternalJSProvider(p) {
  externalJSProvider = p;
}
function _loadJS(url) {
  return externalJSProvider.loadJS(url);
}
function _recaptchaV2ScriptUrl() {
  return externalJSProvider.recaptchaV2Script;
}
function _recaptchaEnterpriseScriptUrl() {
  return externalJSProvider.recaptchaEnterpriseScript;
}
function _gapiScriptUrl() {
  return externalJSProvider.gapiScript;
}
function _generateCallbackName(prefix) {
  return "__".concat(prefix).concat(Math.floor(Math.random() * 1000000));
}

/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var _SOLVE_TIME_MS = 500;
var _EXPIRATION_TIME_MS = 60000;
var _WIDGET_ID_START = 1000000000000;
var MockReCaptcha = /*#__PURE__*/function () {
  function MockReCaptcha(auth) {
    _classCallCheck(this, MockReCaptcha);
    this.auth = auth;
    this.counter = _WIDGET_ID_START;
    this._widgets = new Map();
  }
  return _createClass(MockReCaptcha, [{
    key: "render",
    value: function render(container, parameters) {
      var id = this.counter;
      this._widgets.set(id, new MockWidget(container, this.auth.name, parameters || {}));
      this.counter++;
      return id;
    }
  }, {
    key: "reset",
    value: function reset(optWidgetId) {
      var _a;
      var id = optWidgetId || _WIDGET_ID_START;
      void ((_a = this._widgets.get(id)) === null || _a === void 0 ? void 0 : _a.delete());
      this._widgets.delete(id);
    }
  }, {
    key: "getResponse",
    value: function getResponse(optWidgetId) {
      var _a;
      var id = optWidgetId || _WIDGET_ID_START;
      return ((_a = this._widgets.get(id)) === null || _a === void 0 ? void 0 : _a.getResponse()) || '';
    }
  }, {
    key: "execute",
    value: function () {
      var _execute = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee43(optWidgetId) {
        var _a, id;
        return _regeneratorRuntime().wrap(function _callee43$(_context43) {
          while (1) switch (_context43.prev = _context43.next) {
            case 0:
              id = optWidgetId || _WIDGET_ID_START;
              void ((_a = this._widgets.get(id)) === null || _a === void 0 ? void 0 : _a.execute());
              return _context43.abrupt("return", '');
            case 3:
            case "end":
              return _context43.stop();
          }
        }, _callee43, this);
      }));
      function execute(_x67) {
        return _execute.apply(this, arguments);
      }
      return execute;
    }()
  }]);
}();
var MockGreCAPTCHATopLevel = /*#__PURE__*/function () {
  function MockGreCAPTCHATopLevel() {
    _classCallCheck(this, MockGreCAPTCHATopLevel);
    this.enterprise = new MockGreCAPTCHA();
  }
  return _createClass(MockGreCAPTCHATopLevel, [{
    key: "ready",
    value: function ready(callback) {
      callback();
    }
  }, {
    key: "execute",
    value: function execute(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _siteKey, _options) {
      return Promise.resolve('token');
    }
  }, {
    key: "render",
    value: function render(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _container, _parameters) {
      return '';
    }
  }]);
}();
var MockGreCAPTCHA = /*#__PURE__*/function () {
  function MockGreCAPTCHA() {
    _classCallCheck(this, MockGreCAPTCHA);
  }
  return _createClass(MockGreCAPTCHA, [{
    key: "ready",
    value: function ready(callback) {
      callback();
    }
  }, {
    key: "execute",
    value: function execute(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _siteKey, _options) {
      return Promise.resolve('token');
    }
  }, {
    key: "render",
    value: function render(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _container, _parameters) {
      return '';
    }
  }]);
}();
var MockWidget = /*#__PURE__*/function () {
  function MockWidget(containerOrId, appName, params) {
    var _this11 = this;
    _classCallCheck(this, MockWidget);
    this.params = params;
    this.timerId = null;
    this.deleted = false;
    this.responseToken = null;
    this.clickHandler = function () {
      _this11.execute();
    };
    var container = typeof containerOrId === 'string' ? document.getElementById(containerOrId) : containerOrId;
    _assert(container, "argument-error" /* AuthErrorCode.ARGUMENT_ERROR */, {
      appName: appName
    });
    this.container = container;
    this.isVisible = this.params.size !== 'invisible';
    if (this.isVisible) {
      this.execute();
    } else {
      this.container.addEventListener('click', this.clickHandler);
    }
  }
  return _createClass(MockWidget, [{
    key: "getResponse",
    value: function getResponse() {
      this.checkIfDeleted();
      return this.responseToken;
    }
  }, {
    key: "delete",
    value: function _delete() {
      this.checkIfDeleted();
      this.deleted = true;
      if (this.timerId) {
        clearTimeout(this.timerId);
        this.timerId = null;
      }
      this.container.removeEventListener('click', this.clickHandler);
    }
  }, {
    key: "execute",
    value: function execute() {
      var _this12 = this;
      this.checkIfDeleted();
      if (this.timerId) {
        return;
      }
      this.timerId = window.setTimeout(function () {
        _this12.responseToken = generateRandomAlphaNumericString(50);
        var _this12$params = _this12.params,
          callback = _this12$params.callback,
          expiredCallback = _this12$params['expired-callback'];
        if (callback) {
          try {
            callback(_this12.responseToken);
          } catch (e) {}
        }
        _this12.timerId = window.setTimeout(function () {
          _this12.timerId = null;
          _this12.responseToken = null;
          if (expiredCallback) {
            try {
              expiredCallback();
            } catch (e) {}
          }
          if (_this12.isVisible) {
            _this12.execute();
          }
        }, _EXPIRATION_TIME_MS);
      }, _SOLVE_TIME_MS);
    }
  }, {
    key: "checkIfDeleted",
    value: function checkIfDeleted() {
      if (this.deleted) {
        throw new Error('reCAPTCHA mock was already deleted!');
      }
    }
  }]);
}();
function generateRandomAlphaNumericString(len) {
  var chars = [];
  var allowedChars = '1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  for (var i = 0; i < len; i++) {
    chars.push(allowedChars.charAt(Math.floor(Math.random() * allowedChars.length)));
  }
  return chars.join('');
}

/* eslint-disable @typescript-eslint/no-require-imports */
var RECAPTCHA_ENTERPRISE_VERIFIER_TYPE = 'recaptcha-enterprise';
var FAKE_TOKEN = 'NO_RECAPTCHA';
var RecaptchaEnterpriseVerifier = /*#__PURE__*/function () {
  /**
   *
   * @param authExtern - The corresponding Firebase {@link Auth} instance.
   *
   */
  function RecaptchaEnterpriseVerifier(authExtern) {
    _classCallCheck(this, RecaptchaEnterpriseVerifier);
    /**
     * Identifies the type of application verifier (e.g. "recaptcha-enterprise").
     */
    this.type = RECAPTCHA_ENTERPRISE_VERIFIER_TYPE;
    this.auth = _castAuth(authExtern);
  }
  /**
   * Executes the verification process.
   *
   * @returns A Promise for a token that can be used to assert the validity of a request.
   */
  return _createClass(RecaptchaEnterpriseVerifier, [{
    key: "verify",
    value: (function () {
      var _verify = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee46() {
        var _this13 = this;
        var action,
          forceRefresh,
          retrieveSiteKey,
          _retrieveSiteKey,
          retrieveRecaptchaToken,
          mockRecaptcha,
          _args46 = arguments;
        return _regeneratorRuntime().wrap(function _callee46$(_context46) {
          while (1) switch (_context46.prev = _context46.next) {
            case 0:
              retrieveRecaptchaToken = function _retrieveRecaptchaTok(siteKey, resolve, reject) {
                var grecaptcha = window.grecaptcha;
                if (isEnterprise(grecaptcha)) {
                  grecaptcha.enterprise.ready(function () {
                    grecaptcha.enterprise.execute(siteKey, {
                      action: action
                    }).then(function (token) {
                      resolve(token);
                    }).catch(function () {
                      resolve(FAKE_TOKEN);
                    });
                  });
                } else {
                  reject(Error('No reCAPTCHA enterprise script loaded.'));
                }
              };
              _retrieveSiteKey = function _retrieveSiteKey3() {
                _retrieveSiteKey = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee45(auth) {
                  return _regeneratorRuntime().wrap(function _callee45$(_context45) {
                    while (1) switch (_context45.prev = _context45.next) {
                      case 0:
                        if (forceRefresh) {
                          _context45.next = 5;
                          break;
                        }
                        if (!(auth.tenantId == null && auth._agentRecaptchaConfig != null)) {
                          _context45.next = 3;
                          break;
                        }
                        return _context45.abrupt("return", auth._agentRecaptchaConfig.siteKey);
                      case 3:
                        if (!(auth.tenantId != null && auth._tenantRecaptchaConfigs[auth.tenantId] !== undefined)) {
                          _context45.next = 5;
                          break;
                        }
                        return _context45.abrupt("return", auth._tenantRecaptchaConfigs[auth.tenantId].siteKey);
                      case 5:
                        return _context45.abrupt("return", new Promise(/*#__PURE__*/function () {
                          var _ref10 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee44(resolve, reject) {
                            return _regeneratorRuntime().wrap(function _callee44$(_context44) {
                              while (1) switch (_context44.prev = _context44.next) {
                                case 0:
                                  getRecaptchaConfig(auth, {
                                    clientType: "CLIENT_TYPE_WEB" /* RecaptchaClientType.WEB */,
                                    version: "RECAPTCHA_ENTERPRISE" /* RecaptchaVersion.ENTERPRISE */
                                  }).then(function (response) {
                                    if (response.recaptchaKey === undefined) {
                                      reject(new Error('recaptcha Enterprise site key undefined'));
                                    } else {
                                      var config = new RecaptchaConfig(response);
                                      if (auth.tenantId == null) {
                                        auth._agentRecaptchaConfig = config;
                                      } else {
                                        auth._tenantRecaptchaConfigs[auth.tenantId] = config;
                                      }
                                      return resolve(config.siteKey);
                                    }
                                  }).catch(function (error) {
                                    reject(error);
                                  });
                                case 1:
                                case "end":
                                  return _context44.stop();
                              }
                            }, _callee44);
                          }));
                          return function (_x69, _x70) {
                            return _ref10.apply(this, arguments);
                          };
                        }()));
                      case 6:
                      case "end":
                        return _context45.stop();
                    }
                  }, _callee45);
                }));
                return _retrieveSiteKey.apply(this, arguments);
              };
              retrieveSiteKey = function _retrieveSiteKey2(_x68) {
                return _retrieveSiteKey.apply(this, arguments);
              };
              action = _args46.length > 0 && _args46[0] !== undefined ? _args46[0] : 'verify';
              forceRefresh = _args46.length > 1 && _args46[1] !== undefined ? _args46[1] : false;
              if (!this.auth.settings.appVerificationDisabledForTesting) {
                _context46.next = 8;
                break;
              }
              mockRecaptcha = new MockGreCAPTCHATopLevel();
              return _context46.abrupt("return", mockRecaptcha.execute('siteKey', {
                action: 'verify'
              }));
            case 8:
              return _context46.abrupt("return", new Promise(function (resolve, reject) {
                retrieveSiteKey(_this13.auth).then(function (siteKey) {
                  if (!forceRefresh && isEnterprise(window.grecaptcha)) {
                    retrieveRecaptchaToken(siteKey, resolve, reject);
                  } else {
                    if (typeof window === 'undefined') {
                      reject(new Error('RecaptchaVerifier is only supported in browser'));
                      return;
                    }
                    var url = _recaptchaEnterpriseScriptUrl();
                    if (url.length !== 0) {
                      url += siteKey;
                    }
                    _loadJS(url).then(function () {
                      retrieveRecaptchaToken(siteKey, resolve, reject);
                    }).catch(function (error) {
                      reject(error);
                    });
                  }
                }).catch(function (error) {
                  reject(error);
                });
              }));
            case 9:
            case "end":
              return _context46.stop();
          }
        }, _callee46, this);
      }));
      function verify() {
        return _verify.apply(this, arguments);
      }
      return verify;
    }())
  }]);
}();
function injectRecaptchaFields(_x71, _x72, _x73) {
  return _injectRecaptchaFields.apply(this, arguments);
}
function _injectRecaptchaFields() {
  _injectRecaptchaFields = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee123(auth, request, action) {
    var isCaptchaResp,
      isFakeToken,
      verifier,
      captchaResponse,
      newRequest,
      phoneNumber,
      recaptchaToken,
      _recaptchaToken,
      _args123 = arguments;
    return _regeneratorRuntime().wrap(function _callee123$(_context123) {
      while (1) switch (_context123.prev = _context123.next) {
        case 0:
          isCaptchaResp = _args123.length > 3 && _args123[3] !== undefined ? _args123[3] : false;
          isFakeToken = _args123.length > 4 && _args123[4] !== undefined ? _args123[4] : false;
          verifier = new RecaptchaEnterpriseVerifier(auth);
          if (!isFakeToken) {
            _context123.next = 7;
            break;
          }
          captchaResponse = FAKE_TOKEN;
          _context123.next = 18;
          break;
        case 7:
          _context123.prev = 7;
          _context123.next = 10;
          return verifier.verify(action);
        case 10:
          captchaResponse = _context123.sent;
          _context123.next = 18;
          break;
        case 13:
          _context123.prev = 13;
          _context123.t0 = _context123["catch"](7);
          _context123.next = 17;
          return verifier.verify(action, true);
        case 17:
          captchaResponse = _context123.sent;
        case 18:
          newRequest = Object.assign({}, request);
          if (!(action === "mfaSmsEnrollment" /* RecaptchaActionName.MFA_SMS_ENROLLMENT */ || action === "mfaSmsSignIn" /* RecaptchaActionName.MFA_SMS_SIGNIN */)) {
            _context123.next = 22;
            break;
          }
          if ('phoneEnrollmentInfo' in newRequest) {
            phoneNumber = newRequest.phoneEnrollmentInfo.phoneNumber;
            recaptchaToken = newRequest.phoneEnrollmentInfo.recaptchaToken;
            Object.assign(newRequest, {
              'phoneEnrollmentInfo': {
                phoneNumber: phoneNumber,
                recaptchaToken: recaptchaToken,
                captchaResponse: captchaResponse,
                'clientType': "CLIENT_TYPE_WEB" /* RecaptchaClientType.WEB */,
                'recaptchaVersion': "RECAPTCHA_ENTERPRISE" /* RecaptchaVersion.ENTERPRISE */
              }
            });
          } else if ('phoneSignInInfo' in newRequest) {
            _recaptchaToken = newRequest.phoneSignInInfo.recaptchaToken;
            Object.assign(newRequest, {
              'phoneSignInInfo': {
                recaptchaToken: _recaptchaToken,
                captchaResponse: captchaResponse,
                'clientType': "CLIENT_TYPE_WEB" /* RecaptchaClientType.WEB */,
                'recaptchaVersion': "RECAPTCHA_ENTERPRISE" /* RecaptchaVersion.ENTERPRISE */
              }
            });
          }
          return _context123.abrupt("return", newRequest);
        case 22:
          if (!isCaptchaResp) {
            Object.assign(newRequest, {
              captchaResponse: captchaResponse
            });
          } else {
            Object.assign(newRequest, {
              'captchaResp': captchaResponse
            });
          }
          Object.assign(newRequest, {
            'clientType': "CLIENT_TYPE_WEB" /* RecaptchaClientType.WEB */
          });
          Object.assign(newRequest, {
            'recaptchaVersion': "RECAPTCHA_ENTERPRISE" /* RecaptchaVersion.ENTERPRISE */
          });
          return _context123.abrupt("return", newRequest);
        case 26:
        case "end":
          return _context123.stop();
      }
    }, _callee123, null, [[7, 13]]);
  }));
  return _injectRecaptchaFields.apply(this, arguments);
}
function handleRecaptchaFlow(_x74, _x75, _x76, _x77, _x78) {
  return _handleRecaptchaFlow.apply(this, arguments);
}
function _handleRecaptchaFlow() {
  _handleRecaptchaFlow = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee126(authInstance, request, actionName, actionMethod, recaptchaAuthProvider) {
    var _a, _b, requestWithRecaptcha, _requestWithRecaptcha2, requestWithRecaptchaFields;
    return _regeneratorRuntime().wrap(function _callee126$(_context126) {
      while (1) switch (_context126.prev = _context126.next) {
        case 0:
          if (!(recaptchaAuthProvider === "EMAIL_PASSWORD_PROVIDER" /* RecaptchaAuthProvider.EMAIL_PASSWORD_PROVIDER */)) {
            _context126.next = 11;
            break;
          }
          if (!((_a = authInstance._getRecaptchaConfig()) === null || _a === void 0 ? void 0 : _a.isProviderEnabled("EMAIL_PASSWORD_PROVIDER" /* RecaptchaAuthProvider.EMAIL_PASSWORD_PROVIDER */))) {
            _context126.next = 8;
            break;
          }
          _context126.next = 4;
          return injectRecaptchaFields(authInstance, request, actionName, actionName === "getOobCode" /* RecaptchaActionName.GET_OOB_CODE */);
        case 4:
          requestWithRecaptcha = _context126.sent;
          return _context126.abrupt("return", actionMethod(authInstance, requestWithRecaptcha));
        case 8:
          return _context126.abrupt("return", actionMethod(authInstance, request).catch(/*#__PURE__*/function () {
            var _ref40 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee124(error) {
              var _requestWithRecaptcha;
              return _regeneratorRuntime().wrap(function _callee124$(_context124) {
                while (1) switch (_context124.prev = _context124.next) {
                  case 0:
                    if (!(error.code === "auth/".concat("missing-recaptcha-token" /* AuthErrorCode.MISSING_RECAPTCHA_TOKEN */))) {
                      _context124.next = 8;
                      break;
                    }
                    console.log("".concat(actionName, " is protected by reCAPTCHA Enterprise for this project. Automatically triggering the reCAPTCHA flow and restarting the flow."));
                    _context124.next = 4;
                    return injectRecaptchaFields(authInstance, request, actionName, actionName === "getOobCode" /* RecaptchaActionName.GET_OOB_CODE */);
                  case 4:
                    _requestWithRecaptcha = _context124.sent;
                    return _context124.abrupt("return", actionMethod(authInstance, _requestWithRecaptcha));
                  case 8:
                    return _context124.abrupt("return", Promise.reject(error));
                  case 9:
                  case "end":
                    return _context124.stop();
                }
              }, _callee124);
            }));
            return function (_x299) {
              return _ref40.apply(this, arguments);
            };
          }()));
        case 9:
          _context126.next = 26;
          break;
        case 11:
          if (!(recaptchaAuthProvider === "PHONE_PROVIDER" /* RecaptchaAuthProvider.PHONE_PROVIDER */)) {
            _context126.next = 25;
            break;
          }
          if (!((_b = authInstance._getRecaptchaConfig()) === null || _b === void 0 ? void 0 : _b.isProviderEnabled("PHONE_PROVIDER" /* RecaptchaAuthProvider.PHONE_PROVIDER */))) {
            _context126.next = 19;
            break;
          }
          _context126.next = 15;
          return injectRecaptchaFields(authInstance, request, actionName);
        case 15:
          _requestWithRecaptcha2 = _context126.sent;
          return _context126.abrupt("return", actionMethod(authInstance, _requestWithRecaptcha2).catch(/*#__PURE__*/function () {
            var _ref41 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee125(error) {
              var _a, requestWithRecaptchaFields;
              return _regeneratorRuntime().wrap(function _callee125$(_context125) {
                while (1) switch (_context125.prev = _context125.next) {
                  case 0:
                    if (!(((_a = authInstance._getRecaptchaConfig()) === null || _a === void 0 ? void 0 : _a.getProviderEnforcementState("PHONE_PROVIDER" /* RecaptchaAuthProvider.PHONE_PROVIDER */)) === "AUDIT" /* EnforcementState.AUDIT */)) {
                      _context125.next = 7;
                      break;
                    }
                    if (!(error.code === "auth/".concat("missing-recaptcha-token" /* AuthErrorCode.MISSING_RECAPTCHA_TOKEN */) || error.code === "auth/".concat("invalid-app-credential" /* AuthErrorCode.INVALID_APP_CREDENTIAL */))) {
                      _context125.next = 7;
                      break;
                    }
                    console.log("Failed to verify with reCAPTCHA Enterprise. Automatically triggering the reCAPTCHA v2 flow to complete the ".concat(actionName, " flow."));
                    // reCAPTCHA Enterprise token is missing or reCAPTCHA Enterprise token
                    // check fails.
                    // Fallback to reCAPTCHA v2 flow.
                    _context125.next = 5;
                    return injectRecaptchaFields(authInstance, request, actionName, false,
                    // isCaptchaResp
                    true // isFakeToken
                    );
                  case 5:
                    requestWithRecaptchaFields = _context125.sent;
                    return _context125.abrupt("return", actionMethod(authInstance, requestWithRecaptchaFields));
                  case 7:
                    return _context125.abrupt("return", Promise.reject(error));
                  case 8:
                  case "end":
                    return _context125.stop();
                }
              }, _callee125);
            }));
            return function (_x300) {
              return _ref41.apply(this, arguments);
            };
          }()));
        case 19:
          _context126.next = 21;
          return injectRecaptchaFields(authInstance, request, actionName, false,
          // isCaptchaResp
          true // isFakeToken
          );
        case 21:
          requestWithRecaptchaFields = _context126.sent;
          return _context126.abrupt("return", actionMethod(authInstance, requestWithRecaptchaFields));
        case 23:
          _context126.next = 26;
          break;
        case 25:
          return _context126.abrupt("return", Promise.reject(recaptchaAuthProvider + ' provider is not supported.'));
        case 26:
        case "end":
          return _context126.stop();
      }
    }, _callee126);
  }));
  return _handleRecaptchaFlow.apply(this, arguments);
}
function _initializeRecaptchaConfig(_x79) {
  return _initializeRecaptchaConfig2.apply(this, arguments);
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Initializes an {@link Auth} instance with fine-grained control over
 * {@link Dependencies}.
 *
 * @remarks
 *
 * This function allows more control over the {@link Auth} instance than
 * {@link getAuth}. `getAuth` uses platform-specific defaults to supply
 * the {@link Dependencies}. In general, `getAuth` is the easiest way to
 * initialize Auth and works for most use cases. Use `initializeAuth` if you
 * need control over which persistence layer is used, or to minimize bundle
 * size if you're not using either `signInWithPopup` or `signInWithRedirect`.
 *
 * For example, if your app only uses anonymous accounts and you only want
 * accounts saved for the current session, initialize `Auth` with:
 *
 * ```js
 * const auth = initializeAuth(app, {
 *   persistence: browserSessionPersistence,
 *   popupRedirectResolver: undefined,
 * });
 * ```
 *
 * @public
 */
function _initializeRecaptchaConfig2() {
  _initializeRecaptchaConfig2 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee127(auth) {
    var authInternal, response, config, verifier;
    return _regeneratorRuntime().wrap(function _callee127$(_context127) {
      while (1) switch (_context127.prev = _context127.next) {
        case 0:
          authInternal = _castAuth(auth);
          _context127.next = 3;
          return getRecaptchaConfig(authInternal, {
            clientType: "CLIENT_TYPE_WEB" /* RecaptchaClientType.WEB */,
            version: "RECAPTCHA_ENTERPRISE" /* RecaptchaVersion.ENTERPRISE */
          });
        case 3:
          response = _context127.sent;
          config = new RecaptchaConfig(response);
          if (authInternal.tenantId == null) {
            authInternal._agentRecaptchaConfig = config;
          } else {
            authInternal._tenantRecaptchaConfigs[authInternal.tenantId] = config;
          }
          if (config.isAnyProviderEnabled()) {
            verifier = new RecaptchaEnterpriseVerifier(authInternal);
            void verifier.verify();
          }
        case 7:
        case "end":
          return _context127.stop();
      }
    }, _callee127);
  }));
  return _initializeRecaptchaConfig2.apply(this, arguments);
}
function initializeAuth(app, deps) {
  var provider = (0, _app._getProvider)(app, 'auth');
  if (provider.isInitialized()) {
    var _auth2 = provider.getImmediate();
    var initialOptions = provider.getOptions();
    if ((0, _util.deepEqual)(initialOptions, deps !== null && deps !== void 0 ? deps : {})) {
      return _auth2;
    } else {
      _fail(_auth2, "already-initialized" /* AuthErrorCode.ALREADY_INITIALIZED */);
    }
  }
  var auth = provider.initialize({
    options: deps
  });
  return auth;
}
function _initializeAuthInstance(auth, deps) {
  var persistence = (deps === null || deps === void 0 ? void 0 : deps.persistence) || [];
  var hierarchy = (Array.isArray(persistence) ? persistence : [persistence]).map(_getInstance);
  if (deps === null || deps === void 0 ? void 0 : deps.errorMap) {
    auth._updateErrorMap(deps.errorMap);
  }
  // This promise is intended to float; auth initialization happens in the
  // background, meanwhile the auth object may be used by the app.
  // eslint-disable-next-line @typescript-eslint/no-floating-promises
  auth._initializeWithPersistence(hierarchy, deps === null || deps === void 0 ? void 0 : deps.popupRedirectResolver);
}

/**
 * Changes the {@link Auth} instance to communicate with the Firebase Auth Emulator, instead of production
 * Firebase Auth services.
 *
 * @remarks
 * This must be called synchronously immediately following the first call to
 * {@link initializeAuth}.  Do not use with production credentials as emulator
 * traffic is not encrypted.
 *
 *
 * @example
 * ```javascript
 * connectAuthEmulator(auth, 'http://127.0.0.1:9099', { disableWarnings: true });
 * ```
 *
 * @param auth - The {@link Auth} instance.
 * @param url - The URL at which the emulator is running (eg, 'http://localhost:9099').
 * @param options - Optional. `options.disableWarnings` defaults to `false`. Set it to
 * `true` to disable the warning banner attached to the DOM.
 *
 * @public
 */
function connectAuthEmulator(auth, url, options) {
  var authInternal = _castAuth(auth);
  _assert(/^https?:\/\//.test(url), authInternal, "invalid-emulator-scheme" /* AuthErrorCode.INVALID_EMULATOR_SCHEME */);
  var disableWarnings = !!(options === null || options === void 0 ? void 0 : options.disableWarnings);
  var protocol = extractProtocol(url);
  var _extractHostAndPort = extractHostAndPort(url),
    host = _extractHostAndPort.host,
    port = _extractHostAndPort.port;
  var portStr = port === null ? '' : ":".concat(port);
  // Always replace path with "/" (even if input url had no path at all, or had a different one).
  var emulator = {
    url: "".concat(protocol, "//").concat(host).concat(portStr, "/")
  };
  var emulatorConfig = Object.freeze({
    host: host,
    port: port,
    protocol: protocol.replace(':', ''),
    options: Object.freeze({
      disableWarnings: disableWarnings
    })
  });
  // There are a few scenarios to guard against if the Auth instance has already started:
  if (!authInternal._canInitEmulator) {
    // Applications may not initialize the emulator for the first time if Auth has already started
    // to make network requests.
    _assert(authInternal.config.emulator && authInternal.emulatorConfig, authInternal, "emulator-config-failed" /* AuthErrorCode.EMULATOR_CONFIG_FAILED */);
    // Applications may not alter the configuration of the emulator (aka pass a different config)
    // once Auth has started to make network requests.
    _assert((0, _util.deepEqual)(emulator, authInternal.config.emulator) && (0, _util.deepEqual)(emulatorConfig, authInternal.emulatorConfig), authInternal, "emulator-config-failed" /* AuthErrorCode.EMULATOR_CONFIG_FAILED */);
    // It's valid, however, to invoke connectAuthEmulator() after Auth has started making
    // connections, so long as the config matches the existing config. This results in a no-op.
    return;
  }
  authInternal.config.emulator = emulator;
  authInternal.emulatorConfig = emulatorConfig;
  authInternal.settings.appVerificationDisabledForTesting = true;
  if ((0, _util.isCloudWorkstation)(host)) {
    (0, _util.updateEmulatorBanner)('Auth', true);
    // Workaround to get cookies in Firebase Studio
    void (0, _util.pingServer)("".concat(protocol, "//").concat(host).concat(portStr));
  } else if (!disableWarnings) {
    emitEmulatorWarning();
  }
}
function extractProtocol(url) {
  var protocolEnd = url.indexOf(':');
  return protocolEnd < 0 ? '' : url.substr(0, protocolEnd + 1);
}
function extractHostAndPort(url) {
  var protocol = extractProtocol(url);
  var authority = /(\/\/)?([^?#/]+)/.exec(url.substr(protocol.length)); // Between // and /, ? or #.
  if (!authority) {
    return {
      host: '',
      port: null
    };
  }
  var hostAndPort = authority[2].split('@').pop() || ''; // Strip out "username:password@".
  var bracketedIPv6 = /^(\[[^\]]+\])(:|$)/.exec(hostAndPort);
  if (bracketedIPv6) {
    var host = bracketedIPv6[1];
    return {
      host: host,
      port: parsePort(hostAndPort.substr(host.length + 1))
    };
  } else {
    var _hostAndPort$split = hostAndPort.split(':'),
      _hostAndPort$split2 = _slicedToArray(_hostAndPort$split, 2),
      _host = _hostAndPort$split2[0],
      port = _hostAndPort$split2[1];
    return {
      host: _host,
      port: parsePort(port)
    };
  }
}
function parsePort(portStr) {
  if (!portStr) {
    return null;
  }
  var port = Number(portStr);
  if (isNaN(port)) {
    return null;
  }
  return port;
}
function emitEmulatorWarning() {
  function attachBanner() {
    var el = document.createElement('p');
    var sty = el.style;
    el.innerText = 'Running in emulator mode. Do not use with production credentials.';
    sty.position = 'fixed';
    sty.width = '100%';
    sty.backgroundColor = '#ffffff';
    sty.border = '.1em solid #000000';
    sty.color = '#b50000';
    sty.bottom = '0px';
    sty.left = '0px';
    sty.margin = '0px';
    sty.zIndex = '10000';
    sty.textAlign = 'center';
    el.classList.add('firebase-emulator-warning');
    document.body.appendChild(el);
  }
  if (typeof console !== 'undefined' && typeof console.info === 'function') {
    console.info('WARNING: You are using the Auth Emulator,' + ' which is intended for local testing only.  Do not use with' + ' production credentials.');
  }
  if (typeof window !== 'undefined' && typeof document !== 'undefined') {
    if (document.readyState === 'loading') {
      window.addEventListener('DOMContentLoaded', attachBanner);
    } else {
      attachBanner();
    }
  }
}

/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Interface that represents the credentials returned by an {@link AuthProvider}.
 *
 * @remarks
 * Implementations specify the details about each auth provider's credential requirements.
 *
 * @public
 */
var AuthCredential = exports.M = /*#__PURE__*/function () {
  /** @internal */
  function AuthCredential(
  /**
   * The authentication provider ID for the credential.
   *
   * @remarks
   * For example, 'facebook.com', or 'google.com'.
   */
  providerId,
  /**
   * The authentication sign in method for the credential.
   *
   * @remarks
   * For example, {@link SignInMethod}.EMAIL_PASSWORD, or
   * {@link SignInMethod}.EMAIL_LINK. This corresponds to the sign-in method
   * identifier as returned in {@link fetchSignInMethodsForEmail}.
   */
  signInMethod) {
    _classCallCheck(this, AuthCredential);
    this.providerId = providerId;
    this.signInMethod = signInMethod;
  }
  /**
   * Returns a JSON-serializable representation of this object.
   *
   * @returns a JSON-serializable representation of this object.
   */
  return _createClass(AuthCredential, [{
    key: "toJSON",
    value: function toJSON() {
      return debugFail('not implemented');
    }
    /** @internal */
  }, {
    key: "_getIdTokenResponse",
    value: function _getIdTokenResponse(_auth) {
      return debugFail('not implemented');
    }
    /** @internal */
  }, {
    key: "_linkToIdToken",
    value: function _linkToIdToken(_auth, _idToken) {
      return debugFail('not implemented');
    }
    /** @internal */
  }, {
    key: "_getReauthenticationResolver",
    value: function _getReauthenticationResolver(_auth) {
      return debugFail('not implemented');
    }
  }]);
}();
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function resetPassword(_x80, _x81) {
  return _resetPassword.apply(this, arguments);
}
function _resetPassword() {
  _resetPassword = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee128(auth, request) {
    return _regeneratorRuntime().wrap(function _callee128$(_context128) {
      while (1) switch (_context128.prev = _context128.next) {
        case 0:
          return _context128.abrupt("return", _performApiRequest(auth, "POST" /* HttpMethod.POST */, "/v1/accounts:resetPassword" /* Endpoint.RESET_PASSWORD */, _addTidIfNecessary(auth, request)));
        case 1:
        case "end":
          return _context128.stop();
      }
    }, _callee128);
  }));
  return _resetPassword.apply(this, arguments);
}
function updateEmailPassword(_x82, _x83) {
  return _updateEmailPassword.apply(this, arguments);
} // Used for linking an email/password account to an existing idToken. Uses the same request/response
// format as updateEmailPassword.
function _updateEmailPassword() {
  _updateEmailPassword = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee129(auth, request) {
    return _regeneratorRuntime().wrap(function _callee129$(_context129) {
      while (1) switch (_context129.prev = _context129.next) {
        case 0:
          return _context129.abrupt("return", _performApiRequest(auth, "POST" /* HttpMethod.POST */, "/v1/accounts:update" /* Endpoint.SET_ACCOUNT_INFO */, request));
        case 1:
        case "end":
          return _context129.stop();
      }
    }, _callee129);
  }));
  return _updateEmailPassword.apply(this, arguments);
}
function linkEmailPassword(_x84, _x85) {
  return _linkEmailPassword.apply(this, arguments);
}
function _linkEmailPassword() {
  _linkEmailPassword = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee130(auth, request) {
    return _regeneratorRuntime().wrap(function _callee130$(_context130) {
      while (1) switch (_context130.prev = _context130.next) {
        case 0:
          return _context130.abrupt("return", _performApiRequest(auth, "POST" /* HttpMethod.POST */, "/v1/accounts:signUp" /* Endpoint.SIGN_UP */, request));
        case 1:
        case "end":
          return _context130.stop();
      }
    }, _callee130);
  }));
  return _linkEmailPassword.apply(this, arguments);
}
function applyActionCode$1(_x86, _x87) {
  return _applyActionCode$.apply(this, arguments);
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function _applyActionCode$() {
  _applyActionCode$ = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee131(auth, request) {
    return _regeneratorRuntime().wrap(function _callee131$(_context131) {
      while (1) switch (_context131.prev = _context131.next) {
        case 0:
          return _context131.abrupt("return", _performApiRequest(auth, "POST" /* HttpMethod.POST */, "/v1/accounts:update" /* Endpoint.SET_ACCOUNT_INFO */, _addTidIfNecessary(auth, request)));
        case 1:
        case "end":
          return _context131.stop();
      }
    }, _callee131);
  }));
  return _applyActionCode$.apply(this, arguments);
}
function signInWithPassword(_x88, _x89) {
  return _signInWithPassword.apply(this, arguments);
}
function _signInWithPassword() {
  _signInWithPassword = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee132(auth, request) {
    return _regeneratorRuntime().wrap(function _callee132$(_context132) {
      while (1) switch (_context132.prev = _context132.next) {
        case 0:
          return _context132.abrupt("return", _performSignInRequest(auth, "POST" /* HttpMethod.POST */, "/v1/accounts:signInWithPassword" /* Endpoint.SIGN_IN_WITH_PASSWORD */, _addTidIfNecessary(auth, request)));
        case 1:
        case "end":
          return _context132.stop();
      }
    }, _callee132);
  }));
  return _signInWithPassword.apply(this, arguments);
}
function sendOobCode(_x90, _x91) {
  return _sendOobCode.apply(this, arguments);
}
function _sendOobCode() {
  _sendOobCode = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee133(auth, request) {
    return _regeneratorRuntime().wrap(function _callee133$(_context133) {
      while (1) switch (_context133.prev = _context133.next) {
        case 0:
          return _context133.abrupt("return", _performApiRequest(auth, "POST" /* HttpMethod.POST */, "/v1/accounts:sendOobCode" /* Endpoint.SEND_OOB_CODE */, _addTidIfNecessary(auth, request)));
        case 1:
        case "end":
          return _context133.stop();
      }
    }, _callee133);
  }));
  return _sendOobCode.apply(this, arguments);
}
function sendEmailVerification$1(_x92, _x93) {
  return _sendEmailVerification$.apply(this, arguments);
}
function _sendEmailVerification$() {
  _sendEmailVerification$ = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee134(auth, request) {
    return _regeneratorRuntime().wrap(function _callee134$(_context134) {
      while (1) switch (_context134.prev = _context134.next) {
        case 0:
          return _context134.abrupt("return", sendOobCode(auth, request));
        case 1:
        case "end":
          return _context134.stop();
      }
    }, _callee134);
  }));
  return _sendEmailVerification$.apply(this, arguments);
}
function sendPasswordResetEmail$1(_x94, _x95) {
  return _sendPasswordResetEmail$.apply(this, arguments);
}
function _sendPasswordResetEmail$() {
  _sendPasswordResetEmail$ = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee135(auth, request) {
    return _regeneratorRuntime().wrap(function _callee135$(_context135) {
      while (1) switch (_context135.prev = _context135.next) {
        case 0:
          return _context135.abrupt("return", sendOobCode(auth, request));
        case 1:
        case "end":
          return _context135.stop();
      }
    }, _callee135);
  }));
  return _sendPasswordResetEmail$.apply(this, arguments);
}
function sendSignInLinkToEmail$1(_x96, _x97) {
  return _sendSignInLinkToEmail$.apply(this, arguments);
}
function _sendSignInLinkToEmail$() {
  _sendSignInLinkToEmail$ = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee136(auth, request) {
    return _regeneratorRuntime().wrap(function _callee136$(_context136) {
      while (1) switch (_context136.prev = _context136.next) {
        case 0:
          return _context136.abrupt("return", sendOobCode(auth, request));
        case 1:
        case "end":
          return _context136.stop();
      }
    }, _callee136);
  }));
  return _sendSignInLinkToEmail$.apply(this, arguments);
}
function verifyAndChangeEmail(_x98, _x99) {
  return _verifyAndChangeEmail.apply(this, arguments);
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function _verifyAndChangeEmail() {
  _verifyAndChangeEmail = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee137(auth, request) {
    return _regeneratorRuntime().wrap(function _callee137$(_context137) {
      while (1) switch (_context137.prev = _context137.next) {
        case 0:
          return _context137.abrupt("return", sendOobCode(auth, request));
        case 1:
        case "end":
          return _context137.stop();
      }
    }, _callee137);
  }));
  return _verifyAndChangeEmail.apply(this, arguments);
}
function signInWithEmailLink$1(_x100, _x101) {
  return _signInWithEmailLink$.apply(this, arguments);
}
function _signInWithEmailLink$() {
  _signInWithEmailLink$ = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee138(auth, request) {
    return _regeneratorRuntime().wrap(function _callee138$(_context138) {
      while (1) switch (_context138.prev = _context138.next) {
        case 0:
          return _context138.abrupt("return", _performSignInRequest(auth, "POST" /* HttpMethod.POST */, "/v1/accounts:signInWithEmailLink" /* Endpoint.SIGN_IN_WITH_EMAIL_LINK */, _addTidIfNecessary(auth, request)));
        case 1:
        case "end":
          return _context138.stop();
      }
    }, _callee138);
  }));
  return _signInWithEmailLink$.apply(this, arguments);
}
function signInWithEmailLinkForLinking(_x102, _x103) {
  return _signInWithEmailLinkForLinking.apply(this, arguments);
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Interface that represents the credentials returned by {@link EmailAuthProvider} for
 * {@link ProviderId}.PASSWORD
 *
 * @remarks
 * Covers both {@link SignInMethod}.EMAIL_PASSWORD and
 * {@link SignInMethod}.EMAIL_LINK.
 *
 * @public
 */
function _signInWithEmailLinkForLinking() {
  _signInWithEmailLinkForLinking = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee139(auth, request) {
    return _regeneratorRuntime().wrap(function _callee139$(_context139) {
      while (1) switch (_context139.prev = _context139.next) {
        case 0:
          return _context139.abrupt("return", _performSignInRequest(auth, "POST" /* HttpMethod.POST */, "/v1/accounts:signInWithEmailLink" /* Endpoint.SIGN_IN_WITH_EMAIL_LINK */, _addTidIfNecessary(auth, request)));
        case 1:
        case "end":
          return _context139.stop();
      }
    }, _callee139);
  }));
  return _signInWithEmailLinkForLinking.apply(this, arguments);
}
var EmailAuthCredential = exports.N = /*#__PURE__*/function (_AuthCredential) {
  /** @internal */
  function EmailAuthCredential(/** @internal */
  _email, /** @internal */
  _password, signInMethod) {
    var _this14;
    var _tenantId = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
    _classCallCheck(this, EmailAuthCredential);
    _this14 = _callSuper(this, EmailAuthCredential, ["password" /* ProviderId.PASSWORD */, signInMethod]);
    _this14._email = _email;
    _this14._password = _password;
    _this14._tenantId = _tenantId;
    return _this14;
  }
  /** @internal */
  _inherits(EmailAuthCredential, _AuthCredential);
  return _createClass(EmailAuthCredential, [{
    key: "toJSON",
    value: /** {@inheritdoc AuthCredential.toJSON} */
    function toJSON() {
      return {
        email: this._email,
        password: this._password,
        signInMethod: this.signInMethod,
        tenantId: this._tenantId
      };
    }
    /**
     * Static method to deserialize a JSON representation of an object into an {@link  AuthCredential}.
     *
     * @param json - Either `object` or the stringified representation of the object. When string is
     * provided, `JSON.parse` would be called first.
     *
     * @returns If the JSON input does not represent an {@link AuthCredential}, null is returned.
     */
  }, {
    key: "_getIdTokenResponse",
    value: (/** @internal */function () {
      var _getIdTokenResponse2 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee47(auth) {
        var request;
        return _regeneratorRuntime().wrap(function _callee47$(_context47) {
          while (1) switch (_context47.prev = _context47.next) {
            case 0:
              _context47.t0 = this.signInMethod;
              _context47.next = _context47.t0 === "password" /* SignInMethod.EMAIL_PASSWORD */ ? 3 : _context47.t0 === "emailLink" /* SignInMethod.EMAIL_LINK */ ? 5 : 6;
              break;
            case 3:
              request = {
                returnSecureToken: true,
                email: this._email,
                password: this._password,
                clientType: "CLIENT_TYPE_WEB" /* RecaptchaClientType.WEB */
              };
              return _context47.abrupt("return", handleRecaptchaFlow(auth, request, "signInWithPassword" /* RecaptchaActionName.SIGN_IN_WITH_PASSWORD */, signInWithPassword, "EMAIL_PASSWORD_PROVIDER" /* RecaptchaAuthProvider.EMAIL_PASSWORD_PROVIDER */));
            case 5:
              return _context47.abrupt("return", signInWithEmailLink$1(auth, {
                email: this._email,
                oobCode: this._password
              }));
            case 6:
              _fail(auth, "internal-error" /* AuthErrorCode.INTERNAL_ERROR */);
            case 7:
            case "end":
              return _context47.stop();
          }
        }, _callee47, this);
      }));
      function _getIdTokenResponse(_x104) {
        return _getIdTokenResponse2.apply(this, arguments);
      }
      return _getIdTokenResponse;
    }() /** @internal */)
  }, {
    key: "_linkToIdToken",
    value: (function () {
      var _linkToIdToken2 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee48(auth, idToken) {
        var request;
        return _regeneratorRuntime().wrap(function _callee48$(_context48) {
          while (1) switch (_context48.prev = _context48.next) {
            case 0:
              _context48.t0 = this.signInMethod;
              _context48.next = _context48.t0 === "password" /* SignInMethod.EMAIL_PASSWORD */ ? 3 : _context48.t0 === "emailLink" /* SignInMethod.EMAIL_LINK */ ? 5 : 6;
              break;
            case 3:
              request = {
                idToken: idToken,
                returnSecureToken: true,
                email: this._email,
                password: this._password,
                clientType: "CLIENT_TYPE_WEB" /* RecaptchaClientType.WEB */
              };
              return _context48.abrupt("return", handleRecaptchaFlow(auth, request, "signUpPassword" /* RecaptchaActionName.SIGN_UP_PASSWORD */, linkEmailPassword, "EMAIL_PASSWORD_PROVIDER" /* RecaptchaAuthProvider.EMAIL_PASSWORD_PROVIDER */));
            case 5:
              return _context48.abrupt("return", signInWithEmailLinkForLinking(auth, {
                idToken: idToken,
                email: this._email,
                oobCode: this._password
              }));
            case 6:
              _fail(auth, "internal-error" /* AuthErrorCode.INTERNAL_ERROR */);
            case 7:
            case "end":
              return _context48.stop();
          }
        }, _callee48, this);
      }));
      function _linkToIdToken(_x105, _x106) {
        return _linkToIdToken2.apply(this, arguments);
      }
      return _linkToIdToken;
    }() /** @internal */)
  }, {
    key: "_getReauthenticationResolver",
    value: function _getReauthenticationResolver(auth) {
      return this._getIdTokenResponse(auth);
    }
  }], [{
    key: "_fromEmailAndPassword",
    value: function _fromEmailAndPassword(email, password) {
      return new EmailAuthCredential(email, password, "password" /* SignInMethod.EMAIL_PASSWORD */);
    }
    /** @internal */
  }, {
    key: "_fromEmailAndCode",
    value: function _fromEmailAndCode(email, oobCode) {
      var tenantId = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      return new EmailAuthCredential(email, oobCode, "emailLink" /* SignInMethod.EMAIL_LINK */, tenantId);
    }
  }, {
    key: "fromJSON",
    value: function fromJSON(json) {
      var obj = typeof json === 'string' ? JSON.parse(json) : json;
      if ((obj === null || obj === void 0 ? void 0 : obj.email) && (obj === null || obj === void 0 ? void 0 : obj.password)) {
        if (obj.signInMethod === "password" /* SignInMethod.EMAIL_PASSWORD */) {
          return this._fromEmailAndPassword(obj.email, obj.password);
        } else if (obj.signInMethod === "emailLink" /* SignInMethod.EMAIL_LINK */) {
          return this._fromEmailAndCode(obj.email, obj.password, obj.tenantId);
        }
      }
      return null;
    }
  }]);
}(AuthCredential);
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function signInWithIdp(_x107, _x108) {
  return _signInWithIdp.apply(this, arguments);
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function _signInWithIdp() {
  _signInWithIdp = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee140(auth, request) {
    return _regeneratorRuntime().wrap(function _callee140$(_context140) {
      while (1) switch (_context140.prev = _context140.next) {
        case 0:
          return _context140.abrupt("return", _performSignInRequest(auth, "POST" /* HttpMethod.POST */, "/v1/accounts:signInWithIdp" /* Endpoint.SIGN_IN_WITH_IDP */, _addTidIfNecessary(auth, request)));
        case 1:
        case "end":
          return _context140.stop();
      }
    }, _callee140);
  }));
  return _signInWithIdp.apply(this, arguments);
}
var IDP_REQUEST_URI$1 = 'http://localhost';
/**
 * Represents the OAuth credentials returned by an {@link OAuthProvider}.
 *
 * @remarks
 * Implementations specify the details about each auth provider's credential requirements.
 *
 * @public
 */
var OAuthCredential = exports.Q = /*#__PURE__*/function (_AuthCredential2) {
  function OAuthCredential() {
    var _this15;
    _classCallCheck(this, OAuthCredential);
    _this15 = _callSuper(this, OAuthCredential, arguments);
    _this15.pendingToken = null;
    return _this15;
  }
  /** @internal */
  _inherits(OAuthCredential, _AuthCredential2);
  return _createClass(OAuthCredential, [{
    key: "toJSON",
    value: /** {@inheritdoc AuthCredential.toJSON}  */
    function toJSON() {
      return {
        idToken: this.idToken,
        accessToken: this.accessToken,
        secret: this.secret,
        nonce: this.nonce,
        pendingToken: this.pendingToken,
        providerId: this.providerId,
        signInMethod: this.signInMethod
      };
    }
    /**
     * Static method to deserialize a JSON representation of an object into an
     * {@link  AuthCredential}.
     *
     * @param json - Input can be either Object or the stringified representation of the object.
     * When string is provided, JSON.parse would be called first.
     *
     * @returns If the JSON input does not represent an {@link  AuthCredential}, null is returned.
     */
  }, {
    key: "_getIdTokenResponse",
    value: /** @internal */
    function _getIdTokenResponse(auth) {
      var request = this.buildRequest();
      return signInWithIdp(auth, request);
    }
    /** @internal */
  }, {
    key: "_linkToIdToken",
    value: function _linkToIdToken(auth, idToken) {
      var request = this.buildRequest();
      request.idToken = idToken;
      return signInWithIdp(auth, request);
    }
    /** @internal */
  }, {
    key: "_getReauthenticationResolver",
    value: function _getReauthenticationResolver(auth) {
      var request = this.buildRequest();
      request.autoCreate = false;
      return signInWithIdp(auth, request);
    }
  }, {
    key: "buildRequest",
    value: function buildRequest() {
      var request = {
        requestUri: IDP_REQUEST_URI$1,
        returnSecureToken: true
      };
      if (this.pendingToken) {
        request.pendingToken = this.pendingToken;
      } else {
        var postBody = {};
        if (this.idToken) {
          postBody['id_token'] = this.idToken;
        }
        if (this.accessToken) {
          postBody['access_token'] = this.accessToken;
        }
        if (this.secret) {
          postBody['oauth_token_secret'] = this.secret;
        }
        postBody['providerId'] = this.providerId;
        if (this.nonce && !this.pendingToken) {
          postBody['nonce'] = this.nonce;
        }
        request.postBody = (0, _util.querystring)(postBody);
      }
      return request;
    }
  }], [{
    key: "_fromParams",
    value: function _fromParams(params) {
      var cred = new OAuthCredential(params.providerId, params.signInMethod);
      if (params.idToken || params.accessToken) {
        // OAuth 2 and either ID token or access token.
        if (params.idToken) {
          cred.idToken = params.idToken;
        }
        if (params.accessToken) {
          cred.accessToken = params.accessToken;
        }
        // Add nonce if available and no pendingToken is present.
        if (params.nonce && !params.pendingToken) {
          cred.nonce = params.nonce;
        }
        if (params.pendingToken) {
          cred.pendingToken = params.pendingToken;
        }
      } else if (params.oauthToken && params.oauthTokenSecret) {
        // OAuth 1 and OAuth token with token secret
        cred.accessToken = params.oauthToken;
        cred.secret = params.oauthTokenSecret;
      } else {
        _fail("argument-error" /* AuthErrorCode.ARGUMENT_ERROR */);
      }
      return cred;
    }
  }, {
    key: "fromJSON",
    value: function fromJSON(json) {
      var obj = typeof json === 'string' ? JSON.parse(json) : json;
      var providerId = obj.providerId,
        signInMethod = obj.signInMethod,
        rest = (0, _tslib.__rest)(obj, ["providerId", "signInMethod"]);
      if (!providerId || !signInMethod) {
        return null;
      }
      var cred = new OAuthCredential(providerId, signInMethod);
      cred.idToken = rest.idToken || undefined;
      cred.accessToken = rest.accessToken || undefined;
      cred.secret = rest.secret;
      cred.nonce = rest.nonce;
      cred.pendingToken = rest.pendingToken || null;
      return cred;
    }
  }]);
}(AuthCredential);
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function sendPhoneVerificationCode(_x109, _x110) {
  return _sendPhoneVerificationCode.apply(this, arguments);
}
function _sendPhoneVerificationCode() {
  _sendPhoneVerificationCode = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee141(auth, request) {
    return _regeneratorRuntime().wrap(function _callee141$(_context141) {
      while (1) switch (_context141.prev = _context141.next) {
        case 0:
          return _context141.abrupt("return", _performApiRequest(auth, "POST" /* HttpMethod.POST */, "/v1/accounts:sendVerificationCode" /* Endpoint.SEND_VERIFICATION_CODE */, _addTidIfNecessary(auth, request)));
        case 1:
        case "end":
          return _context141.stop();
      }
    }, _callee141);
  }));
  return _sendPhoneVerificationCode.apply(this, arguments);
}
function signInWithPhoneNumber$1(_x111, _x112) {
  return _signInWithPhoneNumber$.apply(this, arguments);
}
function _signInWithPhoneNumber$() {
  _signInWithPhoneNumber$ = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee142(auth, request) {
    return _regeneratorRuntime().wrap(function _callee142$(_context142) {
      while (1) switch (_context142.prev = _context142.next) {
        case 0:
          return _context142.abrupt("return", _performSignInRequest(auth, "POST" /* HttpMethod.POST */, "/v1/accounts:signInWithPhoneNumber" /* Endpoint.SIGN_IN_WITH_PHONE_NUMBER */, _addTidIfNecessary(auth, request)));
        case 1:
        case "end":
          return _context142.stop();
      }
    }, _callee142);
  }));
  return _signInWithPhoneNumber$.apply(this, arguments);
}
function linkWithPhoneNumber$1(_x113, _x114) {
  return _linkWithPhoneNumber$.apply(this, arguments);
}
function _linkWithPhoneNumber$() {
  _linkWithPhoneNumber$ = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee143(auth, request) {
    var response;
    return _regeneratorRuntime().wrap(function _callee143$(_context143) {
      while (1) switch (_context143.prev = _context143.next) {
        case 0:
          _context143.next = 2;
          return _performSignInRequest(auth, "POST" /* HttpMethod.POST */, "/v1/accounts:signInWithPhoneNumber" /* Endpoint.SIGN_IN_WITH_PHONE_NUMBER */, _addTidIfNecessary(auth, request));
        case 2:
          response = _context143.sent;
          if (!response.temporaryProof) {
            _context143.next = 5;
            break;
          }
          throw _makeTaggedError(auth, "account-exists-with-different-credential" /* AuthErrorCode.NEED_CONFIRMATION */, response);
        case 5:
          return _context143.abrupt("return", response);
        case 6:
        case "end":
          return _context143.stop();
      }
    }, _callee143);
  }));
  return _linkWithPhoneNumber$.apply(this, arguments);
}
var VERIFY_PHONE_NUMBER_FOR_EXISTING_ERROR_MAP_ = _defineProperty({}, "USER_NOT_FOUND" /* ServerError.USER_NOT_FOUND */, "user-not-found");
function verifyPhoneNumberForExisting(_x115, _x116) {
  return _verifyPhoneNumberForExisting.apply(this, arguments);
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Represents the credentials returned by {@link PhoneAuthProvider}.
 *
 * @public
 */
function _verifyPhoneNumberForExisting() {
  _verifyPhoneNumberForExisting = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee144(auth, request) {
    var apiRequest;
    return _regeneratorRuntime().wrap(function _callee144$(_context144) {
      while (1) switch (_context144.prev = _context144.next) {
        case 0:
          apiRequest = Object.assign(Object.assign({}, request), {
            operation: 'REAUTH'
          });
          return _context144.abrupt("return", _performSignInRequest(auth, "POST" /* HttpMethod.POST */, "/v1/accounts:signInWithPhoneNumber" /* Endpoint.SIGN_IN_WITH_PHONE_NUMBER */, _addTidIfNecessary(auth, apiRequest), VERIFY_PHONE_NUMBER_FOR_EXISTING_ERROR_MAP_));
        case 2:
        case "end":
          return _context144.stop();
      }
    }, _callee144);
  }));
  return _verifyPhoneNumberForExisting.apply(this, arguments);
}
var PhoneAuthCredential = exports.U = /*#__PURE__*/function (_AuthCredential3) {
  function PhoneAuthCredential(params) {
    var _this16;
    _classCallCheck(this, PhoneAuthCredential);
    _this16 = _callSuper(this, PhoneAuthCredential, ["phone" /* ProviderId.PHONE */, "phone" /* SignInMethod.PHONE */]);
    _this16.params = params;
    return _this16;
  }
  /** @internal */
  _inherits(PhoneAuthCredential, _AuthCredential3);
  return _createClass(PhoneAuthCredential, [{
    key: "_getIdTokenResponse",
    value: /** @internal */
    function _getIdTokenResponse(auth) {
      return signInWithPhoneNumber$1(auth, this._makeVerificationRequest());
    }
    /** @internal */
  }, {
    key: "_linkToIdToken",
    value: function _linkToIdToken(auth, idToken) {
      return linkWithPhoneNumber$1(auth, Object.assign({
        idToken: idToken
      }, this._makeVerificationRequest()));
    }
    /** @internal */
  }, {
    key: "_getReauthenticationResolver",
    value: function _getReauthenticationResolver(auth) {
      return verifyPhoneNumberForExisting(auth, this._makeVerificationRequest());
    }
    /** @internal */
  }, {
    key: "_makeVerificationRequest",
    value: function _makeVerificationRequest() {
      var _this$params = this.params,
        temporaryProof = _this$params.temporaryProof,
        phoneNumber = _this$params.phoneNumber,
        verificationId = _this$params.verificationId,
        verificationCode = _this$params.verificationCode;
      if (temporaryProof && phoneNumber) {
        return {
          temporaryProof: temporaryProof,
          phoneNumber: phoneNumber
        };
      }
      return {
        sessionInfo: verificationId,
        code: verificationCode
      };
    }
    /** {@inheritdoc AuthCredential.toJSON} */
  }, {
    key: "toJSON",
    value: function toJSON() {
      var obj = {
        providerId: this.providerId
      };
      if (this.params.phoneNumber) {
        obj.phoneNumber = this.params.phoneNumber;
      }
      if (this.params.temporaryProof) {
        obj.temporaryProof = this.params.temporaryProof;
      }
      if (this.params.verificationCode) {
        obj.verificationCode = this.params.verificationCode;
      }
      if (this.params.verificationId) {
        obj.verificationId = this.params.verificationId;
      }
      return obj;
    }
    /** Generates a phone credential based on a plain object or a JSON string. */
  }], [{
    key: "_fromVerification",
    value: function _fromVerification(verificationId, verificationCode) {
      return new PhoneAuthCredential({
        verificationId: verificationId,
        verificationCode: verificationCode
      });
    }
    /** @internal */
  }, {
    key: "_fromTokenResponse",
    value: function _fromTokenResponse(phoneNumber, temporaryProof) {
      return new PhoneAuthCredential({
        phoneNumber: phoneNumber,
        temporaryProof: temporaryProof
      });
    }
  }, {
    key: "fromJSON",
    value: function fromJSON(json) {
      if (typeof json === 'string') {
        json = JSON.parse(json);
      }
      var _json = json,
        verificationId = _json.verificationId,
        verificationCode = _json.verificationCode,
        phoneNumber = _json.phoneNumber,
        temporaryProof = _json.temporaryProof;
      if (!verificationCode && !verificationId && !phoneNumber && !temporaryProof) {
        return null;
      }
      return new PhoneAuthCredential({
        verificationId: verificationId,
        verificationCode: verificationCode,
        phoneNumber: phoneNumber,
        temporaryProof: temporaryProof
      });
    }
  }]);
}(AuthCredential);
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Maps the mode string in action code URL to Action Code Info operation.
 *
 * @param mode
 */
function parseMode(mode) {
  switch (mode) {
    case 'recoverEmail':
      return "RECOVER_EMAIL" /* ActionCodeOperation.RECOVER_EMAIL */;
    case 'resetPassword':
      return "PASSWORD_RESET" /* ActionCodeOperation.PASSWORD_RESET */;
    case 'signIn':
      return "EMAIL_SIGNIN" /* ActionCodeOperation.EMAIL_SIGNIN */;
    case 'verifyEmail':
      return "VERIFY_EMAIL" /* ActionCodeOperation.VERIFY_EMAIL */;
    case 'verifyAndChangeEmail':
      return "VERIFY_AND_CHANGE_EMAIL" /* ActionCodeOperation.VERIFY_AND_CHANGE_EMAIL */;
    case 'revertSecondFactorAddition':
      return "REVERT_SECOND_FACTOR_ADDITION" /* ActionCodeOperation.REVERT_SECOND_FACTOR_ADDITION */;
    default:
      return null;
  }
}
/**
 * Helper to parse FDL links
 *
 * @param url
 */
function parseDeepLink(url) {
  var link = (0, _util.querystringDecode)((0, _util.extractQuerystring)(url))['link'];
  // Double link case (automatic redirect).
  var doubleDeepLink = link ? (0, _util.querystringDecode)((0, _util.extractQuerystring)(link))['deep_link_id'] : null;
  // iOS custom scheme links.
  var iOSDeepLink = (0, _util.querystringDecode)((0, _util.extractQuerystring)(url))['deep_link_id'];
  var iOSDoubleDeepLink = iOSDeepLink ? (0, _util.querystringDecode)((0, _util.extractQuerystring)(iOSDeepLink))['link'] : null;
  return iOSDoubleDeepLink || iOSDeepLink || doubleDeepLink || link || url;
}
/**
 * A utility class to parse email action URLs such as password reset, email verification,
 * email link sign in, etc.
 *
 * @public
 */
var ActionCodeURL = exports.aj = /*#__PURE__*/function () {
  /**
   * @param actionLink - The link from which to extract the URL.
   * @returns The {@link ActionCodeURL} object, or null if the link is invalid.
   *
   * @internal
   */
  function ActionCodeURL(actionLink) {
    _classCallCheck(this, ActionCodeURL);
    var _a, _b, _c, _d, _e, _f;
    var searchParams = (0, _util.querystringDecode)((0, _util.extractQuerystring)(actionLink));
    var apiKey = (_a = searchParams["apiKey" /* QueryField.API_KEY */]) !== null && _a !== void 0 ? _a : null;
    var code = (_b = searchParams["oobCode" /* QueryField.CODE */]) !== null && _b !== void 0 ? _b : null;
    var operation = parseMode((_c = searchParams["mode" /* QueryField.MODE */]) !== null && _c !== void 0 ? _c : null);
    // Validate API key, code and mode.
    _assert(apiKey && code && operation, "argument-error" /* AuthErrorCode.ARGUMENT_ERROR */);
    this.apiKey = apiKey;
    this.operation = operation;
    this.code = code;
    this.continueUrl = (_d = searchParams["continueUrl" /* QueryField.CONTINUE_URL */]) !== null && _d !== void 0 ? _d : null;
    this.languageCode = (_e = searchParams["lang" /* QueryField.LANGUAGE_CODE */]) !== null && _e !== void 0 ? _e : null;
    this.tenantId = (_f = searchParams["tenantId" /* QueryField.TENANT_ID */]) !== null && _f !== void 0 ? _f : null;
  }
  /**
   * Parses the email action link string and returns an {@link ActionCodeURL} if the link is valid,
   * otherwise returns null.
   *
   * @param link  - The email action link string.
   * @returns The {@link ActionCodeURL} object, or null if the link is invalid.
   *
   * @public
   */
  return _createClass(ActionCodeURL, null, [{
    key: "parseLink",
    value: function parseLink(link) {
      var actionLink = parseDeepLink(link);
      try {
        return new ActionCodeURL(actionLink);
      } catch (_a) {
        return null;
      }
    }
  }]);
}();
/**
 * Parses the email action link string and returns an {@link ActionCodeURL} if
 * the link is valid, otherwise returns null.
 *
 * @public
 */
function parseActionCodeURL(link) {
  return ActionCodeURL.parseLink(link);
}

/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Provider for generating {@link EmailAuthCredential}.
 *
 * @public
 */
var EmailAuthProvider = exports.W = /*#__PURE__*/function () {
  function EmailAuthProvider() {
    _classCallCheck(this, EmailAuthProvider);
    /**
     * Always set to {@link ProviderId}.PASSWORD, even for email link.
     */
    this.providerId = EmailAuthProvider.PROVIDER_ID;
  }
  /**
   * Initialize an {@link AuthCredential} using an email and password.
   *
   * @example
   * ```javascript
   * const authCredential = EmailAuthProvider.credential(email, password);
   * const userCredential = await signInWithCredential(auth, authCredential);
   * ```
   *
   * @example
   * ```javascript
   * const userCredential = await signInWithEmailAndPassword(auth, email, password);
   * ```
   *
   * @param email - Email address.
   * @param password - User account password.
   * @returns The auth provider credential.
   */
  return _createClass(EmailAuthProvider, null, [{
    key: "credential",
    value: function credential(email, password) {
      return EmailAuthCredential._fromEmailAndPassword(email, password);
    }
    /**
     * Initialize an {@link AuthCredential} using an email and an email link after a sign in with
     * email link operation.
     *
     * @example
     * ```javascript
     * const authCredential = EmailAuthProvider.credentialWithLink(auth, email, emailLink);
     * const userCredential = await signInWithCredential(auth, authCredential);
     * ```
     *
     * @example
     * ```javascript
     * await sendSignInLinkToEmail(auth, email);
     * // Obtain emailLink from user.
     * const userCredential = await signInWithEmailLink(auth, email, emailLink);
     * ```
     *
     * @param auth - The {@link Auth} instance used to verify the link.
     * @param email - Email address.
     * @param emailLink - Sign-in email link.
     * @returns - The auth provider credential.
     */
  }, {
    key: "credentialWithLink",
    value: function credentialWithLink(email, emailLink) {
      var actionCodeUrl = ActionCodeURL.parseLink(emailLink);
      _assert(actionCodeUrl, "argument-error" /* AuthErrorCode.ARGUMENT_ERROR */);
      return EmailAuthCredential._fromEmailAndCode(email, actionCodeUrl.code, actionCodeUrl.tenantId);
    }
  }]);
}();
/**
 * Always set to {@link ProviderId}.PASSWORD, even for email link.
 */
EmailAuthProvider.PROVIDER_ID = "password" /* ProviderId.PASSWORD */;
/**
 * Always set to {@link SignInMethod}.EMAIL_PASSWORD.
 */
EmailAuthProvider.EMAIL_PASSWORD_SIGN_IN_METHOD = "password" /* SignInMethod.EMAIL_PASSWORD */;
/**
 * Always set to {@link SignInMethod}.EMAIL_LINK.
 */
EmailAuthProvider.EMAIL_LINK_SIGN_IN_METHOD = "emailLink" /* SignInMethod.EMAIL_LINK */;

/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * The base class for all Federated providers (OAuth (including OIDC), SAML).
 *
 * This class is not meant to be instantiated directly.
 *
 * @public
 */
var FederatedAuthProvider = /*#__PURE__*/function () {
  /**
   * Constructor for generic OAuth providers.
   *
   * @param providerId - Provider for which credentials should be generated.
   */
  function FederatedAuthProvider(providerId) {
    _classCallCheck(this, FederatedAuthProvider);
    this.providerId = providerId;
    /** @internal */
    this.defaultLanguageCode = null;
    /** @internal */
    this.customParameters = {};
  }
  /**
   * Set the language gode.
   *
   * @param languageCode - language code
   */
  return _createClass(FederatedAuthProvider, [{
    key: "setDefaultLanguage",
    value: function setDefaultLanguage(languageCode) {
      this.defaultLanguageCode = languageCode;
    }
    /**
     * Sets the OAuth custom parameters to pass in an OAuth request for popup and redirect sign-in
     * operations.
     *
     * @remarks
     * For a detailed list, check the reserved required OAuth 2.0 parameters such as `client_id`,
     * `redirect_uri`, `scope`, `response_type`, and `state` are not allowed and will be ignored.
     *
     * @param customOAuthParameters - The custom OAuth parameters to pass in the OAuth request.
     */
  }, {
    key: "setCustomParameters",
    value: function setCustomParameters(customOAuthParameters) {
      this.customParameters = customOAuthParameters;
      return this;
    }
    /**
     * Retrieve the current list of {@link CustomParameters}.
     */
  }, {
    key: "getCustomParameters",
    value: function getCustomParameters() {
      return this.customParameters;
    }
  }]);
}();
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Common code to all OAuth providers. This is separate from the
 * {@link OAuthProvider} so that child providers (like
 * {@link GoogleAuthProvider}) don't inherit the `credential` instance method.
 * Instead, they rely on a static `credential` method.
 */
var BaseOAuthProvider = /*#__PURE__*/function (_FederatedAuthProvide) {
  function BaseOAuthProvider() {
    var _this17;
    _classCallCheck(this, BaseOAuthProvider);
    _this17 = _callSuper(this, BaseOAuthProvider, arguments);
    /** @internal */
    _this17.scopes = [];
    return _this17;
  }
  /**
   * Add an OAuth scope to the credential.
   *
   * @param scope - Provider OAuth scope to add.
   */
  _inherits(BaseOAuthProvider, _FederatedAuthProvide);
  return _createClass(BaseOAuthProvider, [{
    key: "addScope",
    value: function addScope(scope) {
      // If not already added, add scope to list.
      if (!this.scopes.includes(scope)) {
        this.scopes.push(scope);
      }
      return this;
    }
    /**
     * Retrieve the current list of OAuth scopes.
     */
  }, {
    key: "getScopes",
    value: function getScopes() {
      return _toConsumableArray(this.scopes);
    }
  }]);
}(FederatedAuthProvider);
/**
 * Provider for generating generic {@link OAuthCredential}.
 *
 * @example
 * ```javascript
 * // Sign in using a redirect.
 * const provider = new OAuthProvider('google.com');
 * // Start a sign in process for an unauthenticated user.
 * provider.addScope('profile');
 * provider.addScope('email');
 * await signInWithRedirect(auth, provider);
 * // This will trigger a full page redirect away from your app
 *
 * // After returning from the redirect when your app initializes you can obtain the result
 * const result = await getRedirectResult(auth);
 * if (result) {
 *   // This is the signed-in user
 *   const user = result.user;
 *   // This gives you a OAuth Access Token for the provider.
 *   const credential = provider.credentialFromResult(auth, result);
 *   const token = credential.accessToken;
 * }
 * ```
 *
 * @example
 * ```javascript
 * // Sign in using a popup.
 * const provider = new OAuthProvider('google.com');
 * provider.addScope('profile');
 * provider.addScope('email');
 * const result = await signInWithPopup(auth, provider);
 *
 * // The signed-in user info.
 * const user = result.user;
 * // This gives you a OAuth Access Token for the provider.
 * const credential = provider.credentialFromResult(auth, result);
 * const token = credential.accessToken;
 * ```
 * @public
 */
var OAuthProvider = exports._ = /*#__PURE__*/function (_BaseOAuthProvider) {
  function OAuthProvider() {
    _classCallCheck(this, OAuthProvider);
    return _callSuper(this, OAuthProvider, arguments);
  }
  _inherits(OAuthProvider, _BaseOAuthProvider);
  return _createClass(OAuthProvider, [{
    key: "credential",
    value:
    /**
     * Creates a {@link OAuthCredential} from a generic OAuth provider's access token or ID token.
     *
     * @remarks
     * The raw nonce is required when an ID token with a nonce field is provided. The SHA-256 hash of
     * the raw nonce must match the nonce field in the ID token.
     *
     * @example
     * ```javascript
     * // `googleUser` from the onsuccess Google Sign In callback.
     * // Initialize a generate OAuth provider with a `google.com` providerId.
     * const provider = new OAuthProvider('google.com');
     * const credential = provider.credential({
     *   idToken: googleUser.getAuthResponse().id_token,
     * });
     * const result = await signInWithCredential(credential);
     * ```
     *
     * @param params - Either the options object containing the ID token, access token and raw nonce
     * or the ID token string.
     */
    function credential(params) {
      return this._credential(Object.assign(Object.assign({}, params), {
        nonce: params.rawNonce
      }));
    }
    /** An internal credential method that accepts more permissive options */
  }, {
    key: "_credential",
    value: function _credential(params) {
      _assert(params.idToken || params.accessToken, "argument-error" /* AuthErrorCode.ARGUMENT_ERROR */);
      // For OAuthCredential, sign in method is same as providerId.
      return OAuthCredential._fromParams(Object.assign(Object.assign({}, params), {
        providerId: this.providerId,
        signInMethod: this.providerId
      }));
    }
    /**
     * Used to extract the underlying {@link OAuthCredential} from a {@link UserCredential}.
     *
     * @param userCredential - The user credential.
     */
  }], [{
    key: "credentialFromJSON",
    value:
    /**
     * Creates an {@link OAuthCredential} from a JSON string or a plain object.
     * @param json - A plain object or a JSON string
     */
    function credentialFromJSON(json) {
      var obj = typeof json === 'string' ? JSON.parse(json) : json;
      _assert('providerId' in obj && 'signInMethod' in obj, "argument-error" /* AuthErrorCode.ARGUMENT_ERROR */);
      return OAuthCredential._fromParams(obj);
    }
  }, {
    key: "credentialFromResult",
    value: function credentialFromResult(userCredential) {
      return OAuthProvider.oauthCredentialFromTaggedObject(userCredential);
    }
    /**
     * Used to extract the underlying {@link OAuthCredential} from a {@link AuthError} which was
     * thrown during a sign-in, link, or reauthenticate operation.
     *
     * @param userCredential - The user credential.
     */
  }, {
    key: "credentialFromError",
    value: function credentialFromError(error) {
      return OAuthProvider.oauthCredentialFromTaggedObject(error.customData || {});
    }
  }, {
    key: "oauthCredentialFromTaggedObject",
    value: function oauthCredentialFromTaggedObject(_ref11) {
      var tokenResponse = _ref11._tokenResponse;
      if (!tokenResponse) {
        return null;
      }
      var oauthIdToken = tokenResponse.oauthIdToken,
        oauthAccessToken = tokenResponse.oauthAccessToken,
        oauthTokenSecret = tokenResponse.oauthTokenSecret,
        pendingToken = tokenResponse.pendingToken,
        nonce = tokenResponse.nonce,
        providerId = tokenResponse.providerId;
      if (!oauthAccessToken && !oauthTokenSecret && !oauthIdToken && !pendingToken) {
        return null;
      }
      if (!providerId) {
        return null;
      }
      try {
        return new OAuthProvider(providerId)._credential({
          idToken: oauthIdToken,
          accessToken: oauthAccessToken,
          nonce: nonce,
          pendingToken: pendingToken
        });
      } catch (e) {
        return null;
      }
    }
  }]);
}(BaseOAuthProvider);
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Provider for generating an {@link OAuthCredential} for {@link ProviderId}.FACEBOOK.
 *
 * @example
 * ```javascript
 * // Sign in using a redirect.
 * const provider = new FacebookAuthProvider();
 * // Start a sign in process for an unauthenticated user.
 * provider.addScope('user_birthday');
 * await signInWithRedirect(auth, provider);
 * // This will trigger a full page redirect away from your app
 *
 * // After returning from the redirect when your app initializes you can obtain the result
 * const result = await getRedirectResult(auth);
 * if (result) {
 *   // This is the signed-in user
 *   const user = result.user;
 *   // This gives you a Facebook Access Token.
 *   const credential = FacebookAuthProvider.credentialFromResult(result);
 *   const token = credential.accessToken;
 * }
 * ```
 *
 * @example
 * ```javascript
 * // Sign in using a popup.
 * const provider = new FacebookAuthProvider();
 * provider.addScope('user_birthday');
 * const result = await signInWithPopup(auth, provider);
 *
 * // The signed-in user info.
 * const user = result.user;
 * // This gives you a Facebook Access Token.
 * const credential = FacebookAuthProvider.credentialFromResult(result);
 * const token = credential.accessToken;
 * ```
 *
 * @public
 */
var FacebookAuthProvider = exports.X = /*#__PURE__*/function (_BaseOAuthProvider2) {
  function FacebookAuthProvider() {
    _classCallCheck(this, FacebookAuthProvider);
    return _callSuper(this, FacebookAuthProvider, ["facebook.com" /* ProviderId.FACEBOOK */]);
  }
  /**
   * Creates a credential for Facebook.
   *
   * @example
   * ```javascript
   * // `event` from the Facebook auth.authResponseChange callback.
   * const credential = FacebookAuthProvider.credential(event.authResponse.accessToken);
   * const result = await signInWithCredential(credential);
   * ```
   *
   * @param accessToken - Facebook access token.
   */
  _inherits(FacebookAuthProvider, _BaseOAuthProvider2);
  return _createClass(FacebookAuthProvider, null, [{
    key: "credential",
    value: function credential(accessToken) {
      return OAuthCredential._fromParams({
        providerId: FacebookAuthProvider.PROVIDER_ID,
        signInMethod: FacebookAuthProvider.FACEBOOK_SIGN_IN_METHOD,
        accessToken: accessToken
      });
    }
    /**
     * Used to extract the underlying {@link OAuthCredential} from a {@link UserCredential}.
     *
     * @param userCredential - The user credential.
     */
  }, {
    key: "credentialFromResult",
    value: function credentialFromResult(userCredential) {
      return FacebookAuthProvider.credentialFromTaggedObject(userCredential);
    }
    /**
     * Used to extract the underlying {@link OAuthCredential} from a {@link AuthError} which was
     * thrown during a sign-in, link, or reauthenticate operation.
     *
     * @param userCredential - The user credential.
     */
  }, {
    key: "credentialFromError",
    value: function credentialFromError(error) {
      return FacebookAuthProvider.credentialFromTaggedObject(error.customData || {});
    }
  }, {
    key: "credentialFromTaggedObject",
    value: function credentialFromTaggedObject(_ref12) {
      var tokenResponse = _ref12._tokenResponse;
      if (!tokenResponse || !('oauthAccessToken' in tokenResponse)) {
        return null;
      }
      if (!tokenResponse.oauthAccessToken) {
        return null;
      }
      try {
        return FacebookAuthProvider.credential(tokenResponse.oauthAccessToken);
      } catch (_a) {
        return null;
      }
    }
  }]);
}(BaseOAuthProvider);
/** Always set to {@link SignInMethod}.FACEBOOK. */
FacebookAuthProvider.FACEBOOK_SIGN_IN_METHOD = "facebook.com" /* SignInMethod.FACEBOOK */;
/** Always set to {@link ProviderId}.FACEBOOK. */
FacebookAuthProvider.PROVIDER_ID = "facebook.com" /* ProviderId.FACEBOOK */;

/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Provider for generating an {@link OAuthCredential} for {@link ProviderId}.GOOGLE.
 *
 * @example
 * ```javascript
 * // Sign in using a redirect.
 * const provider = new GoogleAuthProvider();
 * // Start a sign in process for an unauthenticated user.
 * provider.addScope('profile');
 * provider.addScope('email');
 * await signInWithRedirect(auth, provider);
 * // This will trigger a full page redirect away from your app
 *
 * // After returning from the redirect when your app initializes you can obtain the result
 * const result = await getRedirectResult(auth);
 * if (result) {
 *   // This is the signed-in user
 *   const user = result.user;
 *   // This gives you a Google Access Token.
 *   const credential = GoogleAuthProvider.credentialFromResult(result);
 *   const token = credential.accessToken;
 * }
 * ```
 *
 * @example
 * ```javascript
 * // Sign in using a popup.
 * const provider = new GoogleAuthProvider();
 * provider.addScope('profile');
 * provider.addScope('email');
 * const result = await signInWithPopup(auth, provider);
 *
 * // The signed-in user info.
 * const user = result.user;
 * // This gives you a Google Access Token.
 * const credential = GoogleAuthProvider.credentialFromResult(result);
 * const token = credential.accessToken;
 * ```
 *
 * @public
 */
var GoogleAuthProvider = exports.Y = /*#__PURE__*/function (_BaseOAuthProvider3) {
  function GoogleAuthProvider() {
    var _this18;
    _classCallCheck(this, GoogleAuthProvider);
    _this18 = _callSuper(this, GoogleAuthProvider, ["google.com" /* ProviderId.GOOGLE */]);
    _this18.addScope('profile');
    return _this18;
  }
  /**
   * Creates a credential for Google. At least one of ID token and access token is required.
   *
   * @example
   * ```javascript
   * // \`googleUser\` from the onsuccess Google Sign In callback.
   * const credential = GoogleAuthProvider.credential(googleUser.getAuthResponse().id_token);
   * const result = await signInWithCredential(credential);
   * ```
   *
   * @param idToken - Google ID token.
   * @param accessToken - Google access token.
   */
  _inherits(GoogleAuthProvider, _BaseOAuthProvider3);
  return _createClass(GoogleAuthProvider, null, [{
    key: "credential",
    value: function credential(idToken, accessToken) {
      return OAuthCredential._fromParams({
        providerId: GoogleAuthProvider.PROVIDER_ID,
        signInMethod: GoogleAuthProvider.GOOGLE_SIGN_IN_METHOD,
        idToken: idToken,
        accessToken: accessToken
      });
    }
    /**
     * Used to extract the underlying {@link OAuthCredential} from a {@link UserCredential}.
     *
     * @param userCredential - The user credential.
     */
  }, {
    key: "credentialFromResult",
    value: function credentialFromResult(userCredential) {
      return GoogleAuthProvider.credentialFromTaggedObject(userCredential);
    }
    /**
     * Used to extract the underlying {@link OAuthCredential} from a {@link AuthError} which was
     * thrown during a sign-in, link, or reauthenticate operation.
     *
     * @param userCredential - The user credential.
     */
  }, {
    key: "credentialFromError",
    value: function credentialFromError(error) {
      return GoogleAuthProvider.credentialFromTaggedObject(error.customData || {});
    }
  }, {
    key: "credentialFromTaggedObject",
    value: function credentialFromTaggedObject(_ref13) {
      var tokenResponse = _ref13._tokenResponse;
      if (!tokenResponse) {
        return null;
      }
      var oauthIdToken = tokenResponse.oauthIdToken,
        oauthAccessToken = tokenResponse.oauthAccessToken;
      if (!oauthIdToken && !oauthAccessToken) {
        // This could be an oauth 1 credential or a phone credential
        return null;
      }
      try {
        return GoogleAuthProvider.credential(oauthIdToken, oauthAccessToken);
      } catch (_a) {
        return null;
      }
    }
  }]);
}(BaseOAuthProvider);
/** Always set to {@link SignInMethod}.GOOGLE. */
GoogleAuthProvider.GOOGLE_SIGN_IN_METHOD = "google.com" /* SignInMethod.GOOGLE */;
/** Always set to {@link ProviderId}.GOOGLE. */
GoogleAuthProvider.PROVIDER_ID = "google.com" /* ProviderId.GOOGLE */;

/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Provider for generating an {@link OAuthCredential} for {@link ProviderId}.GITHUB.
 *
 * @remarks
 * GitHub requires an OAuth 2.0 redirect, so you can either handle the redirect directly, or use
 * the {@link signInWithPopup} handler:
 *
 * @example
 * ```javascript
 * // Sign in using a redirect.
 * const provider = new GithubAuthProvider();
 * // Start a sign in process for an unauthenticated user.
 * provider.addScope('repo');
 * await signInWithRedirect(auth, provider);
 * // This will trigger a full page redirect away from your app
 *
 * // After returning from the redirect when your app initializes you can obtain the result
 * const result = await getRedirectResult(auth);
 * if (result) {
 *   // This is the signed-in user
 *   const user = result.user;
 *   // This gives you a GitHub Access Token.
 *   const credential = GithubAuthProvider.credentialFromResult(result);
 *   const token = credential.accessToken;
 * }
 * ```
 *
 * @example
 * ```javascript
 * // Sign in using a popup.
 * const provider = new GithubAuthProvider();
 * provider.addScope('repo');
 * const result = await signInWithPopup(auth, provider);
 *
 * // The signed-in user info.
 * const user = result.user;
 * // This gives you a GitHub Access Token.
 * const credential = GithubAuthProvider.credentialFromResult(result);
 * const token = credential.accessToken;
 * ```
 * @public
 */
var GithubAuthProvider = exports.Z = /*#__PURE__*/function (_BaseOAuthProvider4) {
  function GithubAuthProvider() {
    _classCallCheck(this, GithubAuthProvider);
    return _callSuper(this, GithubAuthProvider, ["github.com" /* ProviderId.GITHUB */]);
  }
  /**
   * Creates a credential for GitHub.
   *
   * @param accessToken - GitHub access token.
   */
  _inherits(GithubAuthProvider, _BaseOAuthProvider4);
  return _createClass(GithubAuthProvider, null, [{
    key: "credential",
    value: function credential(accessToken) {
      return OAuthCredential._fromParams({
        providerId: GithubAuthProvider.PROVIDER_ID,
        signInMethod: GithubAuthProvider.GITHUB_SIGN_IN_METHOD,
        accessToken: accessToken
      });
    }
    /**
     * Used to extract the underlying {@link OAuthCredential} from a {@link UserCredential}.
     *
     * @param userCredential - The user credential.
     */
  }, {
    key: "credentialFromResult",
    value: function credentialFromResult(userCredential) {
      return GithubAuthProvider.credentialFromTaggedObject(userCredential);
    }
    /**
     * Used to extract the underlying {@link OAuthCredential} from a {@link AuthError} which was
     * thrown during a sign-in, link, or reauthenticate operation.
     *
     * @param userCredential - The user credential.
     */
  }, {
    key: "credentialFromError",
    value: function credentialFromError(error) {
      return GithubAuthProvider.credentialFromTaggedObject(error.customData || {});
    }
  }, {
    key: "credentialFromTaggedObject",
    value: function credentialFromTaggedObject(_ref14) {
      var tokenResponse = _ref14._tokenResponse;
      if (!tokenResponse || !('oauthAccessToken' in tokenResponse)) {
        return null;
      }
      if (!tokenResponse.oauthAccessToken) {
        return null;
      }
      try {
        return GithubAuthProvider.credential(tokenResponse.oauthAccessToken);
      } catch (_a) {
        return null;
      }
    }
  }]);
}(BaseOAuthProvider);
/** Always set to {@link SignInMethod}.GITHUB. */
GithubAuthProvider.GITHUB_SIGN_IN_METHOD = "github.com" /* SignInMethod.GITHUB */;
/** Always set to {@link ProviderId}.GITHUB. */
GithubAuthProvider.PROVIDER_ID = "github.com" /* ProviderId.GITHUB */;

/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var IDP_REQUEST_URI = 'http://localhost';
/**
 * @public
 */
var SAMLAuthCredential = exports.aR = /*#__PURE__*/function (_AuthCredential4) {
  /** @internal */
  function SAMLAuthCredential(providerId, pendingToken) {
    var _this19;
    _classCallCheck(this, SAMLAuthCredential);
    _this19 = _callSuper(this, SAMLAuthCredential, [providerId, providerId]);
    _this19.pendingToken = pendingToken;
    return _this19;
  }
  /** @internal */
  _inherits(SAMLAuthCredential, _AuthCredential4);
  return _createClass(SAMLAuthCredential, [{
    key: "_getIdTokenResponse",
    value: function _getIdTokenResponse(auth) {
      var request = this.buildRequest();
      return signInWithIdp(auth, request);
    }
    /** @internal */
  }, {
    key: "_linkToIdToken",
    value: function _linkToIdToken(auth, idToken) {
      var request = this.buildRequest();
      request.idToken = idToken;
      return signInWithIdp(auth, request);
    }
    /** @internal */
  }, {
    key: "_getReauthenticationResolver",
    value: function _getReauthenticationResolver(auth) {
      var request = this.buildRequest();
      request.autoCreate = false;
      return signInWithIdp(auth, request);
    }
    /** {@inheritdoc AuthCredential.toJSON}  */
  }, {
    key: "toJSON",
    value: function toJSON() {
      return {
        signInMethod: this.signInMethod,
        providerId: this.providerId,
        pendingToken: this.pendingToken
      };
    }
    /**
     * Static method to deserialize a JSON representation of an object into an
     * {@link  AuthCredential}.
     *
     * @param json - Input can be either Object or the stringified representation of the object.
     * When string is provided, JSON.parse would be called first.
     *
     * @returns If the JSON input does not represent an {@link  AuthCredential}, null is returned.
     */
  }, {
    key: "buildRequest",
    value: function buildRequest() {
      return {
        requestUri: IDP_REQUEST_URI,
        returnSecureToken: true,
        pendingToken: this.pendingToken
      };
    }
  }], [{
    key: "fromJSON",
    value: function fromJSON(json) {
      var obj = typeof json === 'string' ? JSON.parse(json) : json;
      var providerId = obj.providerId,
        signInMethod = obj.signInMethod,
        pendingToken = obj.pendingToken;
      if (!providerId || !signInMethod || !pendingToken || providerId !== signInMethod) {
        return null;
      }
      return new SAMLAuthCredential(providerId, pendingToken);
    }
    /**
     * Helper static method to avoid exposing the constructor to end users.
     *
     * @internal
     */
  }, {
    key: "_create",
    value: function _create(providerId, pendingToken) {
      return new SAMLAuthCredential(providerId, pendingToken);
    }
  }]);
}(AuthCredential);
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var SAML_PROVIDER_PREFIX = 'saml.';
/**
 * An {@link AuthProvider} for SAML.
 *
 * @public
 */
var SAMLAuthProvider = exports.$ = /*#__PURE__*/function (_FederatedAuthProvide2) {
  /**
   * Constructor. The providerId must start with "saml."
   * @param providerId - SAML provider ID.
   */
  function SAMLAuthProvider(providerId) {
    _classCallCheck(this, SAMLAuthProvider);
    _assert(providerId.startsWith(SAML_PROVIDER_PREFIX), "argument-error" /* AuthErrorCode.ARGUMENT_ERROR */);
    return _callSuper(this, SAMLAuthProvider, [providerId]);
  }
  /**
   * Generates an {@link AuthCredential} from a {@link UserCredential} after a
   * successful SAML flow completes.
   *
   * @remarks
   *
   * For example, to get an {@link AuthCredential}, you could write the
   * following code:
   *
   * ```js
   * const userCredential = await signInWithPopup(auth, samlProvider);
   * const credential = SAMLAuthProvider.credentialFromResult(userCredential);
   * ```
   *
   * @param userCredential - The user credential.
   */
  _inherits(SAMLAuthProvider, _FederatedAuthProvide2);
  return _createClass(SAMLAuthProvider, null, [{
    key: "credentialFromResult",
    value: function credentialFromResult(userCredential) {
      return SAMLAuthProvider.samlCredentialFromTaggedObject(userCredential);
    }
    /**
     * Used to extract the underlying {@link OAuthCredential} from a {@link AuthError} which was
     * thrown during a sign-in, link, or reauthenticate operation.
     *
     * @param userCredential - The user credential.
     */
  }, {
    key: "credentialFromError",
    value: function credentialFromError(error) {
      return SAMLAuthProvider.samlCredentialFromTaggedObject(error.customData || {});
    }
    /**
     * Creates an {@link AuthCredential} from a JSON string or a plain object.
     * @param json - A plain object or a JSON string
     */
  }, {
    key: "credentialFromJSON",
    value: function credentialFromJSON(json) {
      var credential = SAMLAuthCredential.fromJSON(json);
      _assert(credential, "argument-error" /* AuthErrorCode.ARGUMENT_ERROR */);
      return credential;
    }
  }, {
    key: "samlCredentialFromTaggedObject",
    value: function samlCredentialFromTaggedObject(_ref15) {
      var tokenResponse = _ref15._tokenResponse;
      if (!tokenResponse) {
        return null;
      }
      var pendingToken = tokenResponse.pendingToken,
        providerId = tokenResponse.providerId;
      if (!pendingToken || !providerId) {
        return null;
      }
      try {
        return SAMLAuthCredential._create(providerId, pendingToken);
      } catch (e) {
        return null;
      }
    }
  }]);
}(FederatedAuthProvider);
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Provider for generating an {@link OAuthCredential} for {@link ProviderId}.TWITTER.
 *
 * @example
 * ```javascript
 * // Sign in using a redirect.
 * const provider = new TwitterAuthProvider();
 * // Start a sign in process for an unauthenticated user.
 * await signInWithRedirect(auth, provider);
 * // This will trigger a full page redirect away from your app
 *
 * // After returning from the redirect when your app initializes you can obtain the result
 * const result = await getRedirectResult(auth);
 * if (result) {
 *   // This is the signed-in user
 *   const user = result.user;
 *   // This gives you a Twitter Access Token and Secret.
 *   const credential = TwitterAuthProvider.credentialFromResult(result);
 *   const token = credential.accessToken;
 *   const secret = credential.secret;
 * }
 * ```
 *
 * @example
 * ```javascript
 * // Sign in using a popup.
 * const provider = new TwitterAuthProvider();
 * const result = await signInWithPopup(auth, provider);
 *
 * // The signed-in user info.
 * const user = result.user;
 * // This gives you a Twitter Access Token and Secret.
 * const credential = TwitterAuthProvider.credentialFromResult(result);
 * const token = credential.accessToken;
 * const secret = credential.secret;
 * ```
 *
 * @public
 */
var TwitterAuthProvider = exports.a0 = /*#__PURE__*/function (_BaseOAuthProvider5) {
  function TwitterAuthProvider() {
    _classCallCheck(this, TwitterAuthProvider);
    return _callSuper(this, TwitterAuthProvider, ["twitter.com" /* ProviderId.TWITTER */]);
  }
  /**
   * Creates a credential for Twitter.
   *
   * @param token - Twitter access token.
   * @param secret - Twitter secret.
   */
  _inherits(TwitterAuthProvider, _BaseOAuthProvider5);
  return _createClass(TwitterAuthProvider, null, [{
    key: "credential",
    value: function credential(token, secret) {
      return OAuthCredential._fromParams({
        providerId: TwitterAuthProvider.PROVIDER_ID,
        signInMethod: TwitterAuthProvider.TWITTER_SIGN_IN_METHOD,
        oauthToken: token,
        oauthTokenSecret: secret
      });
    }
    /**
     * Used to extract the underlying {@link OAuthCredential} from a {@link UserCredential}.
     *
     * @param userCredential - The user credential.
     */
  }, {
    key: "credentialFromResult",
    value: function credentialFromResult(userCredential) {
      return TwitterAuthProvider.credentialFromTaggedObject(userCredential);
    }
    /**
     * Used to extract the underlying {@link OAuthCredential} from a {@link AuthError} which was
     * thrown during a sign-in, link, or reauthenticate operation.
     *
     * @param userCredential - The user credential.
     */
  }, {
    key: "credentialFromError",
    value: function credentialFromError(error) {
      return TwitterAuthProvider.credentialFromTaggedObject(error.customData || {});
    }
  }, {
    key: "credentialFromTaggedObject",
    value: function credentialFromTaggedObject(_ref16) {
      var tokenResponse = _ref16._tokenResponse;
      if (!tokenResponse) {
        return null;
      }
      var oauthAccessToken = tokenResponse.oauthAccessToken,
        oauthTokenSecret = tokenResponse.oauthTokenSecret;
      if (!oauthAccessToken || !oauthTokenSecret) {
        return null;
      }
      try {
        return TwitterAuthProvider.credential(oauthAccessToken, oauthTokenSecret);
      } catch (_a) {
        return null;
      }
    }
  }]);
}(BaseOAuthProvider);
/** Always set to {@link SignInMethod}.TWITTER. */
TwitterAuthProvider.TWITTER_SIGN_IN_METHOD = "twitter.com" /* SignInMethod.TWITTER */;
/** Always set to {@link ProviderId}.TWITTER. */
TwitterAuthProvider.PROVIDER_ID = "twitter.com" /* ProviderId.TWITTER */;

/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function signUp(_x117, _x118) {
  return _signUp.apply(this, arguments);
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function _signUp() {
  _signUp = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee145(auth, request) {
    return _regeneratorRuntime().wrap(function _callee145$(_context145) {
      while (1) switch (_context145.prev = _context145.next) {
        case 0:
          return _context145.abrupt("return", _performSignInRequest(auth, "POST" /* HttpMethod.POST */, "/v1/accounts:signUp" /* Endpoint.SIGN_UP */, _addTidIfNecessary(auth, request)));
        case 1:
        case "end":
          return _context145.stop();
      }
    }, _callee145);
  }));
  return _signUp.apply(this, arguments);
}
var UserCredentialImpl = /*#__PURE__*/function () {
  function UserCredentialImpl(params) {
    _classCallCheck(this, UserCredentialImpl);
    this.user = params.user;
    this.providerId = params.providerId;
    this._tokenResponse = params._tokenResponse;
    this.operationType = params.operationType;
  }
  return _createClass(UserCredentialImpl, null, [{
    key: "_fromIdTokenResponse",
    value: function () {
      var _fromIdTokenResponse3 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee49(auth, operationType, idTokenResponse) {
        var isAnonymous,
          user,
          providerId,
          userCred,
          _args49 = arguments;
        return _regeneratorRuntime().wrap(function _callee49$(_context49) {
          while (1) switch (_context49.prev = _context49.next) {
            case 0:
              isAnonymous = _args49.length > 3 && _args49[3] !== undefined ? _args49[3] : false;
              _context49.next = 3;
              return UserImpl._fromIdTokenResponse(auth, idTokenResponse, isAnonymous);
            case 3:
              user = _context49.sent;
              providerId = providerIdForResponse(idTokenResponse);
              userCred = new UserCredentialImpl({
                user: user,
                providerId: providerId,
                _tokenResponse: idTokenResponse,
                operationType: operationType
              });
              return _context49.abrupt("return", userCred);
            case 7:
            case "end":
              return _context49.stop();
          }
        }, _callee49);
      }));
      function _fromIdTokenResponse(_x119, _x120, _x121) {
        return _fromIdTokenResponse3.apply(this, arguments);
      }
      return _fromIdTokenResponse;
    }()
  }, {
    key: "_forOperation",
    value: function () {
      var _forOperation2 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee50(user, operationType, response) {
        var providerId;
        return _regeneratorRuntime().wrap(function _callee50$(_context50) {
          while (1) switch (_context50.prev = _context50.next) {
            case 0:
              _context50.next = 2;
              return user._updateTokensIfNecessary(response, /* reload */true);
            case 2:
              providerId = providerIdForResponse(response);
              return _context50.abrupt("return", new UserCredentialImpl({
                user: user,
                providerId: providerId,
                _tokenResponse: response,
                operationType: operationType
              }));
            case 4:
            case "end":
              return _context50.stop();
          }
        }, _callee50);
      }));
      function _forOperation(_x122, _x123, _x124) {
        return _forOperation2.apply(this, arguments);
      }
      return _forOperation;
    }()
  }]);
}();
function providerIdForResponse(response) {
  if (response.providerId) {
    return response.providerId;
  }
  if ('phoneNumber' in response) {
    return "phone" /* ProviderId.PHONE */;
  }
  return null;
}

/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Asynchronously signs in as an anonymous user.
 *
 * @remarks
 * If there is already an anonymous user signed in, that user will be returned; otherwise, a
 * new anonymous user identity will be created and returned.
 *
 * This method is not supported by {@link Auth} instances created with a
 * {@link @firebase/app#FirebaseServerApp}.
 *
 * @param auth - The {@link Auth} instance.
 *
 * @public
 */
function signInAnonymously(_x125) {
  return _signInAnonymously.apply(this, arguments);
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function _signInAnonymously() {
  _signInAnonymously = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee146(auth) {
    var _a, authInternal, response, userCredential;
    return _regeneratorRuntime().wrap(function _callee146$(_context146) {
      while (1) switch (_context146.prev = _context146.next) {
        case 0:
          if (!(0, _app._isFirebaseServerApp)(auth.app)) {
            _context146.next = 2;
            break;
          }
          return _context146.abrupt("return", Promise.reject(_serverAppCurrentUserOperationNotSupportedError(auth)));
        case 2:
          authInternal = _castAuth(auth);
          _context146.next = 5;
          return authInternal._initializationPromise;
        case 5:
          if (!((_a = authInternal.currentUser) === null || _a === void 0 ? void 0 : _a.isAnonymous)) {
            _context146.next = 7;
            break;
          }
          return _context146.abrupt("return", new UserCredentialImpl({
            user: authInternal.currentUser,
            providerId: null,
            operationType: "signIn" /* OperationType.SIGN_IN */
          }));
        case 7:
          _context146.next = 9;
          return signUp(authInternal, {
            returnSecureToken: true
          });
        case 9:
          response = _context146.sent;
          _context146.next = 12;
          return UserCredentialImpl._fromIdTokenResponse(authInternal, "signIn" /* OperationType.SIGN_IN */, response, true);
        case 12:
          userCredential = _context146.sent;
          _context146.next = 15;
          return authInternal._updateCurrentUser(userCredential.user);
        case 15:
          return _context146.abrupt("return", userCredential);
        case 16:
        case "end":
          return _context146.stop();
      }
    }, _callee146);
  }));
  return _signInAnonymously.apply(this, arguments);
}
var MultiFactorError = /*#__PURE__*/function (_FirebaseError) {
  function MultiFactorError(auth, error, operationType, user) {
    var _this20;
    _classCallCheck(this, MultiFactorError);
    var _a;
    _this20 = _callSuper(this, MultiFactorError, [error.code, error.message]);
    _this20.operationType = operationType;
    _this20.user = user;
    // https://github.com/Microsoft/TypeScript-wiki/blob/master/Breaking-Changes.md#extending-built-ins-like-error-array-and-map-may-no-longer-work
    Object.setPrototypeOf(_this20, MultiFactorError.prototype);
    _this20.customData = {
      appName: auth.name,
      tenantId: (_a = auth.tenantId) !== null && _a !== void 0 ? _a : undefined,
      _serverResponse: error.customData._serverResponse,
      operationType: operationType
    };
    return _this20;
  }
  _inherits(MultiFactorError, _FirebaseError);
  return _createClass(MultiFactorError, null, [{
    key: "_fromErrorAndOperation",
    value: function _fromErrorAndOperation(auth, error, operationType, user) {
      return new MultiFactorError(auth, error, operationType, user);
    }
  }]);
}(_util.FirebaseError);
function _processCredentialSavingMfaContextIfNecessary(auth, operationType, credential, user) {
  var idTokenProvider = operationType === "reauthenticate" /* OperationType.REAUTHENTICATE */ ? credential._getReauthenticationResolver(auth) : credential._getIdTokenResponse(auth);
  return idTokenProvider.catch(function (error) {
    if (error.code === "auth/".concat("multi-factor-auth-required" /* AuthErrorCode.MFA_REQUIRED */)) {
      throw MultiFactorError._fromErrorAndOperation(auth, error, operationType, user);
    }
    throw error;
  });
}

/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Takes a set of UserInfo provider data and converts it to a set of names
 */
function providerDataAsNames(providerData) {
  return new Set(providerData.map(function (_ref17) {
    var providerId = _ref17.providerId;
    return providerId;
  }).filter(function (pid) {
    return !!pid;
  }));
}

/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Unlinks a provider from a user account.
 *
 * @param user - The user.
 * @param providerId - The provider to unlink.
 *
 * @public
 */
function unlink(_x126, _x127) {
  return _unlink.apply(this, arguments);
}
function _unlink() {
  _unlink = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee147(user, providerId) {
    var userInternal, _yield$deleteLinkedAc, providerUserInfo, providersLeft;
    return _regeneratorRuntime().wrap(function _callee147$(_context147) {
      while (1) switch (_context147.prev = _context147.next) {
        case 0:
          userInternal = (0, _util.getModularInstance)(user);
          _context147.next = 3;
          return _assertLinkedStatus(true, userInternal, providerId);
        case 3:
          _context147.t0 = deleteLinkedAccounts;
          _context147.t1 = userInternal.auth;
          _context147.next = 7;
          return userInternal.getIdToken();
        case 7:
          _context147.t2 = _context147.sent;
          _context147.t3 = [providerId];
          _context147.t4 = {
            idToken: _context147.t2,
            deleteProvider: _context147.t3
          };
          _context147.next = 12;
          return (0, _context147.t0)(_context147.t1, _context147.t4);
        case 12:
          _yield$deleteLinkedAc = _context147.sent;
          providerUserInfo = _yield$deleteLinkedAc.providerUserInfo;
          providersLeft = providerDataAsNames(providerUserInfo || []);
          userInternal.providerData = userInternal.providerData.filter(function (pd) {
            return providersLeft.has(pd.providerId);
          });
          if (!providersLeft.has("phone" /* ProviderId.PHONE */)) {
            userInternal.phoneNumber = null;
          }
          _context147.next = 19;
          return userInternal.auth._persistUserIfCurrent(userInternal);
        case 19:
          return _context147.abrupt("return", userInternal);
        case 20:
        case "end":
          return _context147.stop();
      }
    }, _callee147);
  }));
  return _unlink.apply(this, arguments);
}
function _link$1(_x128, _x129) {
  return _link$.apply(this, arguments);
}
function _link$() {
  _link$ = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee148(user, credential) {
    var bypassAuthState,
      response,
      _args148 = arguments;
    return _regeneratorRuntime().wrap(function _callee148$(_context148) {
      while (1) switch (_context148.prev = _context148.next) {
        case 0:
          bypassAuthState = _args148.length > 2 && _args148[2] !== undefined ? _args148[2] : false;
          _context148.t0 = _logoutIfInvalidated;
          _context148.t1 = user;
          _context148.t2 = credential;
          _context148.t3 = user.auth;
          _context148.next = 7;
          return user.getIdToken();
        case 7:
          _context148.t4 = _context148.sent;
          _context148.t5 = _context148.t2._linkToIdToken.call(_context148.t2, _context148.t3, _context148.t4);
          _context148.t6 = bypassAuthState;
          _context148.next = 12;
          return (0, _context148.t0)(_context148.t1, _context148.t5, _context148.t6);
        case 12:
          response = _context148.sent;
          return _context148.abrupt("return", UserCredentialImpl._forOperation(user, "link" /* OperationType.LINK */, response));
        case 14:
        case "end":
          return _context148.stop();
      }
    }, _callee148);
  }));
  return _link$.apply(this, arguments);
}
function _assertLinkedStatus(_x130, _x131, _x132) {
  return _assertLinkedStatus2.apply(this, arguments);
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function _assertLinkedStatus2() {
  _assertLinkedStatus2 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee149(expected, user, provider) {
    var providerIds, code;
    return _regeneratorRuntime().wrap(function _callee149$(_context149) {
      while (1) switch (_context149.prev = _context149.next) {
        case 0:
          _context149.next = 2;
          return _reloadWithoutSaving(user);
        case 2:
          providerIds = providerDataAsNames(user.providerData);
          code = expected === false ? "provider-already-linked" /* AuthErrorCode.PROVIDER_ALREADY_LINKED */ : "no-such-provider";
          _assert(providerIds.has(provider) === expected, user.auth, code);
        case 5:
        case "end":
          return _context149.stop();
      }
    }, _callee149);
  }));
  return _assertLinkedStatus2.apply(this, arguments);
}
function _reauthenticate(_x133, _x134) {
  return _reauthenticate2.apply(this, arguments);
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function _reauthenticate2() {
  _reauthenticate2 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee150(user, credential) {
    var bypassAuthState,
      auth,
      operationType,
      response,
      parsed,
      localId,
      _args150 = arguments;
    return _regeneratorRuntime().wrap(function _callee150$(_context150) {
      while (1) switch (_context150.prev = _context150.next) {
        case 0:
          bypassAuthState = _args150.length > 2 && _args150[2] !== undefined ? _args150[2] : false;
          auth = user.auth;
          if (!(0, _app._isFirebaseServerApp)(auth.app)) {
            _context150.next = 4;
            break;
          }
          return _context150.abrupt("return", Promise.reject(_serverAppCurrentUserOperationNotSupportedError(auth)));
        case 4:
          operationType = "reauthenticate";
          _context150.prev = 5;
          _context150.next = 8;
          return _logoutIfInvalidated(user, _processCredentialSavingMfaContextIfNecessary(auth, operationType, credential, user), bypassAuthState);
        case 8:
          response = _context150.sent;
          _assert(response.idToken, auth, "internal-error" /* AuthErrorCode.INTERNAL_ERROR */);
          parsed = _parseToken(response.idToken);
          _assert(parsed, auth, "internal-error" /* AuthErrorCode.INTERNAL_ERROR */);
          localId = parsed.sub;
          _assert(user.uid === localId, auth, "user-mismatch" /* AuthErrorCode.USER_MISMATCH */);
          return _context150.abrupt("return", UserCredentialImpl._forOperation(user, operationType, response));
        case 17:
          _context150.prev = 17;
          _context150.t0 = _context150["catch"](5);
          // Convert user deleted error into user mismatch
          if ((_context150.t0 === null || _context150.t0 === void 0 ? void 0 : _context150.t0.code) === "auth/".concat("user-not-found" /* AuthErrorCode.USER_DELETED */)) {
            _fail(auth, "user-mismatch" /* AuthErrorCode.USER_MISMATCH */);
          }
          throw _context150.t0;
        case 21:
        case "end":
          return _context150.stop();
      }
    }, _callee150, null, [[5, 17]]);
  }));
  return _reauthenticate2.apply(this, arguments);
}
function _signInWithCredential(_x135, _x136) {
  return _signInWithCredential2.apply(this, arguments);
}
/**
 * Asynchronously signs in with the given credentials.
 *
 * @remarks
 * An {@link AuthProvider} can be used to generate the credential.
 *
 * This method is not supported by {@link Auth} instances created with a
 * {@link @firebase/app#FirebaseServerApp}.
 *
 * @param auth - The {@link Auth} instance.
 * @param credential - The auth credential.
 *
 * @public
 */
function _signInWithCredential2() {
  _signInWithCredential2 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee151(auth, credential) {
    var bypassAuthState,
      operationType,
      response,
      userCredential,
      _args151 = arguments;
    return _regeneratorRuntime().wrap(function _callee151$(_context151) {
      while (1) switch (_context151.prev = _context151.next) {
        case 0:
          bypassAuthState = _args151.length > 2 && _args151[2] !== undefined ? _args151[2] : false;
          if (!(0, _app._isFirebaseServerApp)(auth.app)) {
            _context151.next = 3;
            break;
          }
          return _context151.abrupt("return", Promise.reject(_serverAppCurrentUserOperationNotSupportedError(auth)));
        case 3:
          operationType = "signIn";
          _context151.next = 6;
          return _processCredentialSavingMfaContextIfNecessary(auth, operationType, credential);
        case 6:
          response = _context151.sent;
          _context151.next = 9;
          return UserCredentialImpl._fromIdTokenResponse(auth, operationType, response);
        case 9:
          userCredential = _context151.sent;
          if (bypassAuthState) {
            _context151.next = 13;
            break;
          }
          _context151.next = 13;
          return auth._updateCurrentUser(userCredential.user);
        case 13:
          return _context151.abrupt("return", userCredential);
        case 14:
        case "end":
          return _context151.stop();
      }
    }, _callee151);
  }));
  return _signInWithCredential2.apply(this, arguments);
}
function signInWithCredential(_x137, _x138) {
  return _signInWithCredential3.apply(this, arguments);
}
/**
 * Links the user account with the given credentials.
 *
 * @remarks
 * An {@link AuthProvider} can be used to generate the credential.
 *
 * @param user - The user.
 * @param credential - The auth credential.
 *
 * @public
 */
function _signInWithCredential3() {
  _signInWithCredential3 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee152(auth, credential) {
    return _regeneratorRuntime().wrap(function _callee152$(_context152) {
      while (1) switch (_context152.prev = _context152.next) {
        case 0:
          return _context152.abrupt("return", _signInWithCredential(_castAuth(auth), credential));
        case 1:
        case "end":
          return _context152.stop();
      }
    }, _callee152);
  }));
  return _signInWithCredential3.apply(this, arguments);
}
function linkWithCredential(_x139, _x140) {
  return _linkWithCredential.apply(this, arguments);
}
/**
 * Re-authenticates a user using a fresh credential.
 *
 * @remarks
 * Use before operations such as {@link updatePassword} that require tokens from recent sign-in
 * attempts. This method can be used to recover from a `CREDENTIAL_TOO_OLD_LOGIN_AGAIN` error
 * or a `TOKEN_EXPIRED` error.
 *
 * This method is not supported on any {@link User} signed in by {@link Auth} instances
 * created with a {@link @firebase/app#FirebaseServerApp}.
 *
 * @param user - The user.
 * @param credential - The auth credential.
 *
 * @public
 */
function _linkWithCredential() {
  _linkWithCredential = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee153(user, credential) {
    var userInternal;
    return _regeneratorRuntime().wrap(function _callee153$(_context153) {
      while (1) switch (_context153.prev = _context153.next) {
        case 0:
          userInternal = (0, _util.getModularInstance)(user);
          _context153.next = 3;
          return _assertLinkedStatus(false, userInternal, credential.providerId);
        case 3:
          return _context153.abrupt("return", _link$1(userInternal, credential));
        case 4:
        case "end":
          return _context153.stop();
      }
    }, _callee153);
  }));
  return _linkWithCredential.apply(this, arguments);
}
function reauthenticateWithCredential(_x141, _x142) {
  return _reauthenticateWithCredential.apply(this, arguments);
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function _reauthenticateWithCredential() {
  _reauthenticateWithCredential = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee154(user, credential) {
    return _regeneratorRuntime().wrap(function _callee154$(_context154) {
      while (1) switch (_context154.prev = _context154.next) {
        case 0:
          return _context154.abrupt("return", _reauthenticate((0, _util.getModularInstance)(user), credential));
        case 1:
        case "end":
          return _context154.stop();
      }
    }, _callee154);
  }));
  return _reauthenticateWithCredential.apply(this, arguments);
}
function signInWithCustomToken$1(_x143, _x144) {
  return _signInWithCustomToken$.apply(this, arguments);
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Asynchronously signs in using a custom token.
 *
 * @remarks
 * Custom tokens are used to integrate Firebase Auth with existing auth systems, and must
 * be generated by an auth backend using the
 * {@link https://firebase.google.com/docs/reference/admin/node/admin.auth.Auth#createcustomtoken | createCustomToken}
 * method in the {@link https://firebase.google.com/docs/auth/admin | Admin SDK} .
 *
 * Fails with an error if the token is invalid, expired, or not accepted by the Firebase Auth service.
 *
 * This method is not supported by {@link Auth} instances created with a
 * {@link @firebase/app#FirebaseServerApp}.
 *
 * @param auth - The {@link Auth} instance.
 * @param customToken - The custom token to sign in with.
 *
 * @public
 */
function _signInWithCustomToken$() {
  _signInWithCustomToken$ = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee155(auth, request) {
    return _regeneratorRuntime().wrap(function _callee155$(_context155) {
      while (1) switch (_context155.prev = _context155.next) {
        case 0:
          return _context155.abrupt("return", _performSignInRequest(auth, "POST" /* HttpMethod.POST */, "/v1/accounts:signInWithCustomToken" /* Endpoint.SIGN_IN_WITH_CUSTOM_TOKEN */, _addTidIfNecessary(auth, request)));
        case 1:
        case "end":
          return _context155.stop();
      }
    }, _callee155);
  }));
  return _signInWithCustomToken$.apply(this, arguments);
}
function signInWithCustomToken(_x145, _x146) {
  return _signInWithCustomToken.apply(this, arguments);
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function _signInWithCustomToken() {
  _signInWithCustomToken = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee156(auth, customToken) {
    var authInternal, response, cred;
    return _regeneratorRuntime().wrap(function _callee156$(_context156) {
      while (1) switch (_context156.prev = _context156.next) {
        case 0:
          if (!(0, _app._isFirebaseServerApp)(auth.app)) {
            _context156.next = 2;
            break;
          }
          return _context156.abrupt("return", Promise.reject(_serverAppCurrentUserOperationNotSupportedError(auth)));
        case 2:
          authInternal = _castAuth(auth);
          _context156.next = 5;
          return signInWithCustomToken$1(authInternal, {
            token: customToken,
            returnSecureToken: true
          });
        case 5:
          response = _context156.sent;
          _context156.next = 8;
          return UserCredentialImpl._fromIdTokenResponse(authInternal, "signIn" /* OperationType.SIGN_IN */, response);
        case 8:
          cred = _context156.sent;
          _context156.next = 11;
          return authInternal._updateCurrentUser(cred.user);
        case 11:
          return _context156.abrupt("return", cred);
        case 12:
        case "end":
          return _context156.stop();
      }
    }, _callee156);
  }));
  return _signInWithCustomToken.apply(this, arguments);
}
var MultiFactorInfoImpl = /*#__PURE__*/function () {
  function MultiFactorInfoImpl(factorId, response) {
    _classCallCheck(this, MultiFactorInfoImpl);
    this.factorId = factorId;
    this.uid = response.mfaEnrollmentId;
    this.enrollmentTime = new Date(response.enrolledAt).toUTCString();
    this.displayName = response.displayName;
  }
  return _createClass(MultiFactorInfoImpl, null, [{
    key: "_fromServerResponse",
    value: function _fromServerResponse(auth, enrollment) {
      if ('phoneInfo' in enrollment) {
        return PhoneMultiFactorInfoImpl._fromServerResponse(auth, enrollment);
      } else if ('totpInfo' in enrollment) {
        return TotpMultiFactorInfoImpl._fromServerResponse(auth, enrollment);
      }
      return _fail(auth, "internal-error" /* AuthErrorCode.INTERNAL_ERROR */);
    }
  }]);
}();
var PhoneMultiFactorInfoImpl = /*#__PURE__*/function (_MultiFactorInfoImpl) {
  function PhoneMultiFactorInfoImpl(response) {
    var _this21;
    _classCallCheck(this, PhoneMultiFactorInfoImpl);
    _this21 = _callSuper(this, PhoneMultiFactorInfoImpl, ["phone" /* FactorId.PHONE */, response]);
    _this21.phoneNumber = response.phoneInfo;
    return _this21;
  }
  _inherits(PhoneMultiFactorInfoImpl, _MultiFactorInfoImpl);
  return _createClass(PhoneMultiFactorInfoImpl, null, [{
    key: "_fromServerResponse",
    value: function _fromServerResponse(_auth, enrollment) {
      return new PhoneMultiFactorInfoImpl(enrollment);
    }
  }]);
}(MultiFactorInfoImpl);
var TotpMultiFactorInfoImpl = /*#__PURE__*/function (_MultiFactorInfoImpl2) {
  function TotpMultiFactorInfoImpl(response) {
    _classCallCheck(this, TotpMultiFactorInfoImpl);
    return _callSuper(this, TotpMultiFactorInfoImpl, ["totp" /* FactorId.TOTP */, response]);
  }
  _inherits(TotpMultiFactorInfoImpl, _MultiFactorInfoImpl2);
  return _createClass(TotpMultiFactorInfoImpl, null, [{
    key: "_fromServerResponse",
    value: function _fromServerResponse(_auth, enrollment) {
      return new TotpMultiFactorInfoImpl(enrollment);
    }
  }]);
}(MultiFactorInfoImpl);
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function _setActionCodeSettingsOnRequest(auth, request, actionCodeSettings) {
  var _a;
  _assert(((_a = actionCodeSettings.url) === null || _a === void 0 ? void 0 : _a.length) > 0, auth, "invalid-continue-uri" /* AuthErrorCode.INVALID_CONTINUE_URI */);
  _assert(typeof actionCodeSettings.dynamicLinkDomain === 'undefined' || actionCodeSettings.dynamicLinkDomain.length > 0, auth, "invalid-dynamic-link-domain" /* AuthErrorCode.INVALID_DYNAMIC_LINK_DOMAIN */);
  _assert(typeof actionCodeSettings.linkDomain === 'undefined' || actionCodeSettings.linkDomain.length > 0, auth, "invalid-hosting-link-domain" /* AuthErrorCode.INVALID_HOSTING_LINK_DOMAIN */);
  request.continueUrl = actionCodeSettings.url;
  request.dynamicLinkDomain = actionCodeSettings.dynamicLinkDomain;
  request.linkDomain = actionCodeSettings.linkDomain;
  request.canHandleCodeInApp = actionCodeSettings.handleCodeInApp;
  if (actionCodeSettings.iOS) {
    _assert(actionCodeSettings.iOS.bundleId.length > 0, auth, "missing-ios-bundle-id" /* AuthErrorCode.MISSING_IOS_BUNDLE_ID */);
    request.iOSBundleId = actionCodeSettings.iOS.bundleId;
  }
  if (actionCodeSettings.android) {
    _assert(actionCodeSettings.android.packageName.length > 0, auth, "missing-android-pkg-name" /* AuthErrorCode.MISSING_ANDROID_PACKAGE_NAME */);
    request.androidInstallApp = actionCodeSettings.android.installApp;
    request.androidMinimumVersionCode = actionCodeSettings.android.minimumVersion;
    request.androidPackageName = actionCodeSettings.android.packageName;
  }
}

/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Updates the password policy cached in the {@link Auth} instance if a policy is already
 * cached for the project or tenant.
 *
 * @remarks
 * We only fetch the password policy if the password did not meet policy requirements and
 * there is an existing policy cached. A developer must call validatePassword at least
 * once for the cache to be automatically updated.
 *
 * @param auth - The {@link Auth} instance.
 *
 * @private
 */
function recachePasswordPolicy(_x147) {
  return _recachePasswordPolicy.apply(this, arguments);
}
/**
 * Sends a password reset email to the given email address. This method does not throw an error when
 * there's no user account with the given email address and
 * {@link https://cloud.google.com/identity-platform/docs/admin/email-enumeration-protection | Email Enumeration Protection}
 * is enabled.
 *
 * @remarks
 * To complete the password reset, call {@link confirmPasswordReset} with the code supplied in
 * the email sent to the user, along with the new password specified by the user.
 *
 * @example
 * ```javascript
 * const actionCodeSettings = {
 *   url: 'https://www.example.com/?email=user@example.com',
 *   iOS: {
 *      bundleId: 'com.example.ios'
 *   },
 *   android: {
 *     packageName: 'com.example.android',
 *     installApp: true,
 *     minimumVersion: '12'
 *   },
 *   handleCodeInApp: true
 * };
 * await sendPasswordResetEmail(auth, 'user@example.com', actionCodeSettings);
 * // Obtain code from user.
 * await confirmPasswordReset('user@example.com', code);
 * ```
 *
 * @param auth - The {@link Auth} instance.
 * @param email - The user's email address.
 * @param actionCodeSettings - The {@link ActionCodeSettings}.
 *
 * @public
 */
function _recachePasswordPolicy() {
  _recachePasswordPolicy = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee157(auth) {
    var authInternal;
    return _regeneratorRuntime().wrap(function _callee157$(_context157) {
      while (1) switch (_context157.prev = _context157.next) {
        case 0:
          authInternal = _castAuth(auth);
          if (!authInternal._getPasswordPolicyInternal()) {
            _context157.next = 4;
            break;
          }
          _context157.next = 4;
          return authInternal._updatePasswordPolicy();
        case 4:
        case "end":
          return _context157.stop();
      }
    }, _callee157);
  }));
  return _recachePasswordPolicy.apply(this, arguments);
}
function sendPasswordResetEmail(_x148, _x149, _x150) {
  return _sendPasswordResetEmail.apply(this, arguments);
}
/**
 * Completes the password reset process, given a confirmation code and new password.
 *
 * @param auth - The {@link Auth} instance.
 * @param oobCode - A confirmation code sent to the user.
 * @param newPassword - The new password.
 *
 * @public
 */
function _sendPasswordResetEmail() {
  _sendPasswordResetEmail = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee158(auth, email, actionCodeSettings) {
    var authInternal, request;
    return _regeneratorRuntime().wrap(function _callee158$(_context158) {
      while (1) switch (_context158.prev = _context158.next) {
        case 0:
          authInternal = _castAuth(auth);
          request = {
            requestType: "PASSWORD_RESET" /* ActionCodeOperation.PASSWORD_RESET */,
            email: email,
            clientType: "CLIENT_TYPE_WEB" /* RecaptchaClientType.WEB */
          };
          if (actionCodeSettings) {
            _setActionCodeSettingsOnRequest(authInternal, request, actionCodeSettings);
          }
          _context158.next = 5;
          return handleRecaptchaFlow(authInternal, request, "getOobCode" /* RecaptchaActionName.GET_OOB_CODE */, sendPasswordResetEmail$1, "EMAIL_PASSWORD_PROVIDER" /* RecaptchaAuthProvider.EMAIL_PASSWORD_PROVIDER */);
        case 5:
        case "end":
          return _context158.stop();
      }
    }, _callee158);
  }));
  return _sendPasswordResetEmail.apply(this, arguments);
}
function confirmPasswordReset(_x151, _x152, _x153) {
  return _confirmPasswordReset.apply(this, arguments);
}
/**
 * Applies a verification code sent to the user by email or other out-of-band mechanism.
 *
 * @param auth - The {@link Auth} instance.
 * @param oobCode - A verification code sent to the user.
 *
 * @public
 */
function _confirmPasswordReset() {
  _confirmPasswordReset = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee160(auth, oobCode, newPassword) {
    return _regeneratorRuntime().wrap(function _callee160$(_context160) {
      while (1) switch (_context160.prev = _context160.next) {
        case 0:
          _context160.next = 2;
          return resetPassword((0, _util.getModularInstance)(auth), {
            oobCode: oobCode,
            newPassword: newPassword
          }).catch(/*#__PURE__*/function () {
            var _ref42 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee159(error) {
              return _regeneratorRuntime().wrap(function _callee159$(_context159) {
                while (1) switch (_context159.prev = _context159.next) {
                  case 0:
                    if (error.code === "auth/".concat("password-does-not-meet-requirements" /* AuthErrorCode.PASSWORD_DOES_NOT_MEET_REQUIREMENTS */)) {
                      void recachePasswordPolicy(auth);
                    }
                    throw error;
                  case 2:
                  case "end":
                    return _context159.stop();
                }
              }, _callee159);
            }));
            return function (_x301) {
              return _ref42.apply(this, arguments);
            };
          }());
        case 2:
        case "end":
          return _context160.stop();
      }
    }, _callee160);
  }));
  return _confirmPasswordReset.apply(this, arguments);
}
function applyActionCode(_x154, _x155) {
  return _applyActionCode.apply(this, arguments);
}
/**
 * Checks a verification code sent to the user by email or other out-of-band mechanism.
 *
 * @returns metadata about the code.
 *
 * @param auth - The {@link Auth} instance.
 * @param oobCode - A verification code sent to the user.
 *
 * @public
 */
function _applyActionCode() {
  _applyActionCode = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee161(auth, oobCode) {
    return _regeneratorRuntime().wrap(function _callee161$(_context161) {
      while (1) switch (_context161.prev = _context161.next) {
        case 0:
          _context161.next = 2;
          return applyActionCode$1((0, _util.getModularInstance)(auth), {
            oobCode: oobCode
          });
        case 2:
        case "end":
          return _context161.stop();
      }
    }, _callee161);
  }));
  return _applyActionCode.apply(this, arguments);
}
function checkActionCode(_x156, _x157) {
  return _checkActionCode.apply(this, arguments);
}
/**
 * Checks a password reset code sent to the user by email or other out-of-band mechanism.
 *
 * @returns the user's email address if valid.
 *
 * @param auth - The {@link Auth} instance.
 * @param code - A verification code sent to the user.
 *
 * @public
 */
function _checkActionCode() {
  _checkActionCode = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee162(auth, oobCode) {
    var authModular, response, operation, multiFactorInfo;
    return _regeneratorRuntime().wrap(function _callee162$(_context162) {
      while (1) switch (_context162.prev = _context162.next) {
        case 0:
          authModular = (0, _util.getModularInstance)(auth);
          _context162.next = 3;
          return resetPassword(authModular, {
            oobCode: oobCode
          });
        case 3:
          response = _context162.sent;
          // Email could be empty only if the request type is EMAIL_SIGNIN or
          // VERIFY_AND_CHANGE_EMAIL.
          // New email should not be empty if the request type is
          // VERIFY_AND_CHANGE_EMAIL.
          // Multi-factor info could not be empty if the request type is
          // REVERT_SECOND_FACTOR_ADDITION.
          operation = response.requestType;
          _assert(operation, authModular, "internal-error" /* AuthErrorCode.INTERNAL_ERROR */);
          _context162.t0 = operation;
          _context162.next = _context162.t0 === "EMAIL_SIGNIN" /* ActionCodeOperation.EMAIL_SIGNIN */ ? 9 : _context162.t0 === "VERIFY_AND_CHANGE_EMAIL" /* ActionCodeOperation.VERIFY_AND_CHANGE_EMAIL */ ? 10 : _context162.t0 === "REVERT_SECOND_FACTOR_ADDITION" /* ActionCodeOperation.REVERT_SECOND_FACTOR_ADDITION */ ? 12 : 13;
          break;
        case 9:
          return _context162.abrupt("break", 14);
        case 10:
          _assert(response.newEmail, authModular, "internal-error" /* AuthErrorCode.INTERNAL_ERROR */);
          return _context162.abrupt("break", 14);
        case 12:
          _assert(response.mfaInfo, authModular, "internal-error" /* AuthErrorCode.INTERNAL_ERROR */);
        case 13:
          _assert(response.email, authModular, "internal-error" /* AuthErrorCode.INTERNAL_ERROR */);
        case 14:
          // The multi-factor info for revert second factor addition
          multiFactorInfo = null;
          if (response.mfaInfo) {
            multiFactorInfo = MultiFactorInfoImpl._fromServerResponse(_castAuth(authModular), response.mfaInfo);
          }
          return _context162.abrupt("return", {
            data: {
              email: (response.requestType === "VERIFY_AND_CHANGE_EMAIL" /* ActionCodeOperation.VERIFY_AND_CHANGE_EMAIL */ ? response.newEmail : response.email) || null,
              previousEmail: (response.requestType === "VERIFY_AND_CHANGE_EMAIL" /* ActionCodeOperation.VERIFY_AND_CHANGE_EMAIL */ ? response.email : response.newEmail) || null,
              multiFactorInfo: multiFactorInfo
            },
            operation: operation
          });
        case 17:
        case "end":
          return _context162.stop();
      }
    }, _callee162);
  }));
  return _checkActionCode.apply(this, arguments);
}
function verifyPasswordResetCode(_x158, _x159) {
  return _verifyPasswordResetCode.apply(this, arguments);
}
/**
 * Creates a new user account associated with the specified email address and password.
 *
 * @remarks
 * On successful creation of the user account, this user will also be signed in to your application.
 *
 * User account creation can fail if the account already exists or the password is invalid.
 *
 * This method is not supported on {@link Auth} instances created with a
 * {@link @firebase/app#FirebaseServerApp}.
 *
 * Note: The email address acts as a unique identifier for the user and enables an email-based
 * password reset. This function will create a new user account and set the initial user password.
 *
 * @param auth - The {@link Auth} instance.
 * @param email - The user's email address.
 * @param password - The user's chosen password.
 *
 * @public
 */
function _verifyPasswordResetCode() {
  _verifyPasswordResetCode = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee163(auth, code) {
    var _yield$checkActionCod, data;
    return _regeneratorRuntime().wrap(function _callee163$(_context163) {
      while (1) switch (_context163.prev = _context163.next) {
        case 0:
          _context163.next = 2;
          return checkActionCode((0, _util.getModularInstance)(auth), code);
        case 2:
          _yield$checkActionCod = _context163.sent;
          data = _yield$checkActionCod.data;
          return _context163.abrupt("return", data.email);
        case 5:
        case "end":
          return _context163.stop();
      }
    }, _callee163);
  }));
  return _verifyPasswordResetCode.apply(this, arguments);
}
function createUserWithEmailAndPassword(_x160, _x161, _x162) {
  return _createUserWithEmailAndPassword.apply(this, arguments);
}
/**
 * Asynchronously signs in using an email and password.
 *
 * @remarks
 * Fails with an error if the email address and password do not match. When
 * {@link https://cloud.google.com/identity-platform/docs/admin/email-enumeration-protection | Email Enumeration Protection}
 * is enabled, this method fails with "auth/invalid-credential" in case of an invalid
 * email/password.
 *
 * This method is not supported on {@link Auth} instances created with a
 * {@link @firebase/app#FirebaseServerApp}.
 *
 * Note: The user's password is NOT the password used to access the user's email account. The
 * email address serves as a unique identifier for the user, and the password is used to access
 * the user's account in your Firebase project. See also: {@link createUserWithEmailAndPassword}.
 *
 *
 * @param auth - The {@link Auth} instance.
 * @param email - The users email address.
 * @param password - The users password.
 *
 * @public
 */
function _createUserWithEmailAndPassword() {
  _createUserWithEmailAndPassword = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee164(auth, email, password) {
    var authInternal, request, signUpResponse, response, userCredential;
    return _regeneratorRuntime().wrap(function _callee164$(_context164) {
      while (1) switch (_context164.prev = _context164.next) {
        case 0:
          if (!(0, _app._isFirebaseServerApp)(auth.app)) {
            _context164.next = 2;
            break;
          }
          return _context164.abrupt("return", Promise.reject(_serverAppCurrentUserOperationNotSupportedError(auth)));
        case 2:
          authInternal = _castAuth(auth);
          request = {
            returnSecureToken: true,
            email: email,
            password: password,
            clientType: "CLIENT_TYPE_WEB" /* RecaptchaClientType.WEB */
          };
          signUpResponse = handleRecaptchaFlow(authInternal, request, "signUpPassword" /* RecaptchaActionName.SIGN_UP_PASSWORD */, signUp, "EMAIL_PASSWORD_PROVIDER" /* RecaptchaAuthProvider.EMAIL_PASSWORD_PROVIDER */);
          _context164.next = 7;
          return signUpResponse.catch(function (error) {
            if (error.code === "auth/".concat("password-does-not-meet-requirements" /* AuthErrorCode.PASSWORD_DOES_NOT_MEET_REQUIREMENTS */)) {
              void recachePasswordPolicy(auth);
            }
            throw error;
          });
        case 7:
          response = _context164.sent;
          _context164.next = 10;
          return UserCredentialImpl._fromIdTokenResponse(authInternal, "signIn" /* OperationType.SIGN_IN */, response);
        case 10:
          userCredential = _context164.sent;
          _context164.next = 13;
          return authInternal._updateCurrentUser(userCredential.user);
        case 13:
          return _context164.abrupt("return", userCredential);
        case 14:
        case "end":
          return _context164.stop();
      }
    }, _callee164);
  }));
  return _createUserWithEmailAndPassword.apply(this, arguments);
}
function signInWithEmailAndPassword(auth, email, password) {
  if ((0, _app._isFirebaseServerApp)(auth.app)) {
    return Promise.reject(_serverAppCurrentUserOperationNotSupportedError(auth));
  }
  return signInWithCredential((0, _util.getModularInstance)(auth), EmailAuthProvider.credential(email, password)).catch(/*#__PURE__*/function () {
    var _ref18 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee51(error) {
      return _regeneratorRuntime().wrap(function _callee51$(_context51) {
        while (1) switch (_context51.prev = _context51.next) {
          case 0:
            if (error.code === "auth/".concat("password-does-not-meet-requirements" /* AuthErrorCode.PASSWORD_DOES_NOT_MEET_REQUIREMENTS */)) {
              void recachePasswordPolicy(auth);
            }
            throw error;
          case 2:
          case "end":
            return _context51.stop();
        }
      }, _callee51);
    }));
    return function (_x163) {
      return _ref18.apply(this, arguments);
    };
  }());
}

/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Sends a sign-in email link to the user with the specified email.
 *
 * @remarks
 * The sign-in operation has to always be completed in the app unlike other out of band email
 * actions (password reset and email verifications). This is because, at the end of the flow,
 * the user is expected to be signed in and their Auth state persisted within the app.
 *
 * To complete sign in with the email link, call {@link signInWithEmailLink} with the email
 * address and the email link supplied in the email sent to the user.
 *
 * @example
 * ```javascript
 * const actionCodeSettings = {
 *   url: 'https://www.example.com/?email=user@example.com',
 *   iOS: {
 *      bundleId: 'com.example.ios'
 *   },
 *   android: {
 *     packageName: 'com.example.android',
 *     installApp: true,
 *     minimumVersion: '12'
 *   },
 *   handleCodeInApp: true
 * };
 * await sendSignInLinkToEmail(auth, 'user@example.com', actionCodeSettings);
 * // Obtain emailLink from the user.
 * if(isSignInWithEmailLink(auth, emailLink)) {
 *   await signInWithEmailLink(auth, 'user@example.com', emailLink);
 * }
 * ```
 *
 * @param authInternal - The {@link Auth} instance.
 * @param email - The user's email address.
 * @param actionCodeSettings - The {@link ActionCodeSettings}.
 *
 * @public
 */
function sendSignInLinkToEmail(_x164, _x165, _x166) {
  return _sendSignInLinkToEmail.apply(this, arguments);
}
/**
 * Checks if an incoming link is a sign-in with email link suitable for {@link signInWithEmailLink}.
 *
 * @param auth - The {@link Auth} instance.
 * @param emailLink - The link sent to the user's email address.
 *
 * @public
 */
function _sendSignInLinkToEmail() {
  _sendSignInLinkToEmail = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee165(auth, email, actionCodeSettings) {
    var authInternal, request, setActionCodeSettings;
    return _regeneratorRuntime().wrap(function _callee165$(_context165) {
      while (1) switch (_context165.prev = _context165.next) {
        case 0:
          setActionCodeSettings = function _setActionCodeSetting(request, actionCodeSettings) {
            _assert(actionCodeSettings.handleCodeInApp, authInternal, "argument-error" /* AuthErrorCode.ARGUMENT_ERROR */);
            if (actionCodeSettings) {
              _setActionCodeSettingsOnRequest(authInternal, request, actionCodeSettings);
            }
          };
          authInternal = _castAuth(auth);
          request = {
            requestType: "EMAIL_SIGNIN" /* ActionCodeOperation.EMAIL_SIGNIN */,
            email: email,
            clientType: "CLIENT_TYPE_WEB" /* RecaptchaClientType.WEB */
          };
          setActionCodeSettings(request, actionCodeSettings);
          _context165.next = 6;
          return handleRecaptchaFlow(authInternal, request, "getOobCode" /* RecaptchaActionName.GET_OOB_CODE */, sendSignInLinkToEmail$1, "EMAIL_PASSWORD_PROVIDER" /* RecaptchaAuthProvider.EMAIL_PASSWORD_PROVIDER */);
        case 6:
        case "end":
          return _context165.stop();
      }
    }, _callee165);
  }));
  return _sendSignInLinkToEmail.apply(this, arguments);
}
function isSignInWithEmailLink(auth, emailLink) {
  var actionCodeUrl = ActionCodeURL.parseLink(emailLink);
  return (actionCodeUrl === null || actionCodeUrl === void 0 ? void 0 : actionCodeUrl.operation) === "EMAIL_SIGNIN" /* ActionCodeOperation.EMAIL_SIGNIN */;
}
/**
 * Asynchronously signs in using an email and sign-in email link.
 *
 * @remarks
 * If no link is passed, the link is inferred from the current URL.
 *
 * Fails with an error if the email address is invalid or OTP in email link expires.
 *
 * This method is not supported by {@link Auth} instances created with a
 * {@link @firebase/app#FirebaseServerApp}.
 *
 * Note: Confirm the link is a sign-in email link before calling this method firebase.auth.Auth.isSignInWithEmailLink.
 *
 * @example
 * ```javascript
 * const actionCodeSettings = {
 *   url: 'https://www.example.com/?email=user@example.com',
 *   iOS: {
 *      bundleId: 'com.example.ios'
 *   },
 *   android: {
 *     packageName: 'com.example.android',
 *     installApp: true,
 *     minimumVersion: '12'
 *   },
 *   handleCodeInApp: true
 * };
 * await sendSignInLinkToEmail(auth, 'user@example.com', actionCodeSettings);
 * // Obtain emailLink from the user.
 * if(isSignInWithEmailLink(auth, emailLink)) {
 *   await signInWithEmailLink(auth, 'user@example.com', emailLink);
 * }
 * ```
 *
 *
 * @param auth - The {@link Auth} instance.
 * @param email - The user's email address.
 * @param emailLink - The link sent to the user's email address.
 *
 * @public
 */
function signInWithEmailLink(_x167, _x168, _x169) {
  return _signInWithEmailLink.apply(this, arguments);
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function _signInWithEmailLink() {
  _signInWithEmailLink = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee166(auth, email, emailLink) {
    var authModular, credential;
    return _regeneratorRuntime().wrap(function _callee166$(_context166) {
      while (1) switch (_context166.prev = _context166.next) {
        case 0:
          if (!(0, _app._isFirebaseServerApp)(auth.app)) {
            _context166.next = 2;
            break;
          }
          return _context166.abrupt("return", Promise.reject(_serverAppCurrentUserOperationNotSupportedError(auth)));
        case 2:
          authModular = (0, _util.getModularInstance)(auth);
          credential = EmailAuthProvider.credentialWithLink(email, emailLink || _getCurrentUrl()); // Check if the tenant ID in the email link matches the tenant ID on Auth
          // instance.
          _assert(credential._tenantId === (authModular.tenantId || null), authModular, "tenant-id-mismatch" /* AuthErrorCode.TENANT_ID_MISMATCH */);
          return _context166.abrupt("return", signInWithCredential(authModular, credential));
        case 6:
        case "end":
          return _context166.stop();
      }
    }, _callee166);
  }));
  return _signInWithEmailLink.apply(this, arguments);
}
function createAuthUri(_x170, _x171) {
  return _createAuthUri.apply(this, arguments);
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Gets the list of possible sign in methods for the given email address. This method returns an
 * empty list when
 * {@link https://cloud.google.com/identity-platform/docs/admin/email-enumeration-protection | Email Enumeration Protection}
 * is enabled, irrespective of the number of authentication methods available for the given email.
 *
 * @remarks
 * This is useful to differentiate methods of sign-in for the same provider, eg.
 * {@link EmailAuthProvider} which has 2 methods of sign-in,
 * {@link SignInMethod}.EMAIL_PASSWORD and
 * {@link SignInMethod}.EMAIL_LINK.
 *
 * @param auth - The {@link Auth} instance.
 * @param email - The user's email address.
 *
 * Deprecated. Migrating off of this method is recommended as a security best-practice.
 * Learn more in the Identity Platform documentation for
 * {@link https://cloud.google.com/identity-platform/docs/admin/email-enumeration-protection | Email Enumeration Protection}.
 * @public
 */
function _createAuthUri() {
  _createAuthUri = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee167(auth, request) {
    return _regeneratorRuntime().wrap(function _callee167$(_context167) {
      while (1) switch (_context167.prev = _context167.next) {
        case 0:
          return _context167.abrupt("return", _performApiRequest(auth, "POST" /* HttpMethod.POST */, "/v1/accounts:createAuthUri" /* Endpoint.CREATE_AUTH_URI */, _addTidIfNecessary(auth, request)));
        case 1:
        case "end":
          return _context167.stop();
      }
    }, _callee167);
  }));
  return _createAuthUri.apply(this, arguments);
}
function fetchSignInMethodsForEmail(_x172, _x173) {
  return _fetchSignInMethodsForEmail.apply(this, arguments);
}
/**
 * Sends a verification email to a user.
 *
 * @remarks
 * The verification process is completed by calling {@link applyActionCode}.
 *
 * @example
 * ```javascript
 * const actionCodeSettings = {
 *   url: 'https://www.example.com/?email=user@example.com',
 *   iOS: {
 *      bundleId: 'com.example.ios'
 *   },
 *   android: {
 *     packageName: 'com.example.android',
 *     installApp: true,
 *     minimumVersion: '12'
 *   },
 *   handleCodeInApp: true
 * };
 * await sendEmailVerification(user, actionCodeSettings);
 * // Obtain code from the user.
 * await applyActionCode(auth, code);
 * ```
 *
 * @param user - The user.
 * @param actionCodeSettings - The {@link ActionCodeSettings}.
 *
 * @public
 */
function _fetchSignInMethodsForEmail() {
  _fetchSignInMethodsForEmail = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee168(auth, email) {
    var continueUri, request, _yield$createAuthUri, signinMethods;
    return _regeneratorRuntime().wrap(function _callee168$(_context168) {
      while (1) switch (_context168.prev = _context168.next) {
        case 0:
          // createAuthUri returns an error if continue URI is not http or https.
          // For environments like Cordova, Chrome extensions, native frameworks, file
          // systems, etc, use http://localhost as continue URL.
          continueUri = _isHttpOrHttps() ? _getCurrentUrl() : 'http://localhost';
          request = {
            identifier: email,
            continueUri: continueUri
          };
          _context168.next = 4;
          return createAuthUri((0, _util.getModularInstance)(auth), request);
        case 4:
          _yield$createAuthUri = _context168.sent;
          signinMethods = _yield$createAuthUri.signinMethods;
          return _context168.abrupt("return", signinMethods || []);
        case 7:
        case "end":
          return _context168.stop();
      }
    }, _callee168);
  }));
  return _fetchSignInMethodsForEmail.apply(this, arguments);
}
function sendEmailVerification(_x174, _x175) {
  return _sendEmailVerification.apply(this, arguments);
}
/**
 * Sends a verification email to a new email address.
 *
 * @remarks
 * The user's email will be updated to the new one after being verified.
 *
 * If you have a custom email action handler, you can complete the verification process by calling
 * {@link applyActionCode}.
 *
 * @example
 * ```javascript
 * const actionCodeSettings = {
 *   url: 'https://www.example.com/?email=user@example.com',
 *   iOS: {
 *      bundleId: 'com.example.ios'
 *   },
 *   android: {
 *     packageName: 'com.example.android',
 *     installApp: true,
 *     minimumVersion: '12'
 *   },
 *   handleCodeInApp: true
 * };
 * await verifyBeforeUpdateEmail(user, 'newemail@example.com', actionCodeSettings);
 * // Obtain code from the user.
 * await applyActionCode(auth, code);
 * ```
 *
 * @param user - The user.
 * @param newEmail - The new email address to be verified before update.
 * @param actionCodeSettings - The {@link ActionCodeSettings}.
 *
 * @public
 */
function _sendEmailVerification() {
  _sendEmailVerification = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee169(user, actionCodeSettings) {
    var userInternal, idToken, request, _yield$sendEmailVerif, email;
    return _regeneratorRuntime().wrap(function _callee169$(_context169) {
      while (1) switch (_context169.prev = _context169.next) {
        case 0:
          userInternal = (0, _util.getModularInstance)(user);
          _context169.next = 3;
          return user.getIdToken();
        case 3:
          idToken = _context169.sent;
          request = {
            requestType: "VERIFY_EMAIL" /* ActionCodeOperation.VERIFY_EMAIL */,
            idToken: idToken
          };
          if (actionCodeSettings) {
            _setActionCodeSettingsOnRequest(userInternal.auth, request, actionCodeSettings);
          }
          _context169.next = 8;
          return sendEmailVerification$1(userInternal.auth, request);
        case 8:
          _yield$sendEmailVerif = _context169.sent;
          email = _yield$sendEmailVerif.email;
          if (!(email !== user.email)) {
            _context169.next = 13;
            break;
          }
          _context169.next = 13;
          return user.reload();
        case 13:
        case "end":
          return _context169.stop();
      }
    }, _callee169);
  }));
  return _sendEmailVerification.apply(this, arguments);
}
function verifyBeforeUpdateEmail(_x176, _x177, _x178) {
  return _verifyBeforeUpdateEmail.apply(this, arguments);
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function _verifyBeforeUpdateEmail() {
  _verifyBeforeUpdateEmail = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee170(user, newEmail, actionCodeSettings) {
    var userInternal, idToken, request, _yield$verifyAndChang, email;
    return _regeneratorRuntime().wrap(function _callee170$(_context170) {
      while (1) switch (_context170.prev = _context170.next) {
        case 0:
          userInternal = (0, _util.getModularInstance)(user);
          _context170.next = 3;
          return user.getIdToken();
        case 3:
          idToken = _context170.sent;
          request = {
            requestType: "VERIFY_AND_CHANGE_EMAIL" /* ActionCodeOperation.VERIFY_AND_CHANGE_EMAIL */,
            idToken: idToken,
            newEmail: newEmail
          };
          if (actionCodeSettings) {
            _setActionCodeSettingsOnRequest(userInternal.auth, request, actionCodeSettings);
          }
          _context170.next = 8;
          return verifyAndChangeEmail(userInternal.auth, request);
        case 8:
          _yield$verifyAndChang = _context170.sent;
          email = _yield$verifyAndChang.email;
          if (!(email !== user.email)) {
            _context170.next = 13;
            break;
          }
          _context170.next = 13;
          return user.reload();
        case 13:
        case "end":
          return _context170.stop();
      }
    }, _callee170);
  }));
  return _verifyBeforeUpdateEmail.apply(this, arguments);
}
function updateProfile$1(_x179, _x180) {
  return _updateProfile$.apply(this, arguments);
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Updates a user's profile data.
 *
 * @param user - The user.
 * @param profile - The profile's `displayName` and `photoURL` to update.
 *
 * @public
 */
function _updateProfile$() {
  _updateProfile$ = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee171(auth, request) {
    return _regeneratorRuntime().wrap(function _callee171$(_context171) {
      while (1) switch (_context171.prev = _context171.next) {
        case 0:
          return _context171.abrupt("return", _performApiRequest(auth, "POST" /* HttpMethod.POST */, "/v1/accounts:update" /* Endpoint.SET_ACCOUNT_INFO */, request));
        case 1:
        case "end":
          return _context171.stop();
      }
    }, _callee171);
  }));
  return _updateProfile$.apply(this, arguments);
}
function updateProfile(_x181, _x182) {
  return _updateProfile.apply(this, arguments);
}
/**
 * Updates the user's email address.
 *
 * @remarks
 * An email will be sent to the original email address (if it was set) that allows to revoke the
 * email address change, in order to protect them from account hijacking.
 *
 * This method is not supported on any {@link User} signed in by {@link Auth} instances
 * created with a {@link @firebase/app#FirebaseServerApp}.
 *
 * Important: this is a security sensitive operation that requires the user to have recently signed
 * in. If this requirement isn't met, ask the user to authenticate again and then call
 * {@link reauthenticateWithCredential}.
 *
 * @param user - The user.
 * @param newEmail - The new email address.
 *
 * Throws "auth/operation-not-allowed" error when
 * {@link https://cloud.google.com/identity-platform/docs/admin/email-enumeration-protection | Email Enumeration Protection}
 * is enabled.
 * Deprecated - Use {@link verifyBeforeUpdateEmail} instead.
 *
 * @public
 */
function _updateProfile() {
  _updateProfile = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee172(user, _ref19) {
    var displayName, photoUrl, userInternal, idToken, profileRequest, response, passwordProvider;
    return _regeneratorRuntime().wrap(function _callee172$(_context172) {
      while (1) switch (_context172.prev = _context172.next) {
        case 0:
          displayName = _ref19.displayName, photoUrl = _ref19.photoURL;
          if (!(displayName === undefined && photoUrl === undefined)) {
            _context172.next = 3;
            break;
          }
          return _context172.abrupt("return");
        case 3:
          userInternal = (0, _util.getModularInstance)(user);
          _context172.next = 6;
          return userInternal.getIdToken();
        case 6:
          idToken = _context172.sent;
          profileRequest = {
            idToken: idToken,
            displayName: displayName,
            photoUrl: photoUrl,
            returnSecureToken: true
          };
          _context172.next = 10;
          return _logoutIfInvalidated(userInternal, updateProfile$1(userInternal.auth, profileRequest));
        case 10:
          response = _context172.sent;
          userInternal.displayName = response.displayName || null;
          userInternal.photoURL = response.photoUrl || null;
          // Update the password provider as well
          passwordProvider = userInternal.providerData.find(function (_ref43) {
            var providerId = _ref43.providerId;
            return providerId === "password";
          } /* ProviderId.PASSWORD */);
          if (passwordProvider) {
            passwordProvider.displayName = userInternal.displayName;
            passwordProvider.photoURL = userInternal.photoURL;
          }
          _context172.next = 17;
          return userInternal._updateTokensIfNecessary(response);
        case 17:
        case "end":
          return _context172.stop();
      }
    }, _callee172);
  }));
  return _updateProfile.apply(this, arguments);
}
function updateEmail(user, newEmail) {
  var userInternal = (0, _util.getModularInstance)(user);
  if ((0, _app._isFirebaseServerApp)(userInternal.auth.app)) {
    return Promise.reject(_serverAppCurrentUserOperationNotSupportedError(userInternal.auth));
  }
  return updateEmailOrPassword(userInternal, newEmail, null);
}
/**
 * Updates the user's password.
 *
 * @remarks
 * Important: this is a security sensitive operation that requires the user to have recently signed
 * in. If this requirement isn't met, ask the user to authenticate again and then call
 * {@link reauthenticateWithCredential}.
 *
 * @param user - The user.
 * @param newPassword - The new password.
 *
 * @public
 */
function updatePassword(user, newPassword) {
  return updateEmailOrPassword((0, _util.getModularInstance)(user), null, newPassword);
}
function updateEmailOrPassword(_x183, _x184, _x185) {
  return _updateEmailOrPassword.apply(this, arguments);
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Parse the `AdditionalUserInfo` from the ID token response.
 *
 */
function _updateEmailOrPassword() {
  _updateEmailOrPassword = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee173(user, email, password) {
    var auth, idToken, request, response;
    return _regeneratorRuntime().wrap(function _callee173$(_context173) {
      while (1) switch (_context173.prev = _context173.next) {
        case 0:
          auth = user.auth;
          _context173.next = 3;
          return user.getIdToken();
        case 3:
          idToken = _context173.sent;
          request = {
            idToken: idToken,
            returnSecureToken: true
          };
          if (email) {
            request.email = email;
          }
          if (password) {
            request.password = password;
          }
          _context173.next = 9;
          return _logoutIfInvalidated(user, updateEmailPassword(auth, request));
        case 9:
          response = _context173.sent;
          _context173.next = 12;
          return user._updateTokensIfNecessary(response, /* reload */true);
        case 12:
        case "end":
          return _context173.stop();
      }
    }, _callee173);
  }));
  return _updateEmailOrPassword.apply(this, arguments);
}
function _fromIdTokenResponse(idTokenResponse) {
  var _a, _b;
  if (!idTokenResponse) {
    return null;
  }
  var providerId = idTokenResponse.providerId;
  var profile = idTokenResponse.rawUserInfo ? JSON.parse(idTokenResponse.rawUserInfo) : {};
  var isNewUser = idTokenResponse.isNewUser || idTokenResponse.kind === "identitytoolkit#SignupNewUserResponse" /* IdTokenResponseKind.SignupNewUser */;
  if (!providerId && (idTokenResponse === null || idTokenResponse === void 0 ? void 0 : idTokenResponse.idToken)) {
    var signInProvider = (_b = (_a = _parseToken(idTokenResponse.idToken)) === null || _a === void 0 ? void 0 : _a.firebase) === null || _b === void 0 ? void 0 : _b['sign_in_provider'];
    if (signInProvider) {
      var filteredProviderId = signInProvider !== "anonymous" /* ProviderId.ANONYMOUS */ && signInProvider !== "custom" /* ProviderId.CUSTOM */ ? signInProvider : null;
      // Uses generic class in accordance with the legacy SDK.
      return new GenericAdditionalUserInfo(isNewUser, filteredProviderId);
    }
  }
  if (!providerId) {
    return null;
  }
  switch (providerId) {
    case "facebook.com" /* ProviderId.FACEBOOK */:
      return new FacebookAdditionalUserInfo(isNewUser, profile);
    case "github.com" /* ProviderId.GITHUB */:
      return new GithubAdditionalUserInfo(isNewUser, profile);
    case "google.com" /* ProviderId.GOOGLE */:
      return new GoogleAdditionalUserInfo(isNewUser, profile);
    case "twitter.com" /* ProviderId.TWITTER */:
      return new TwitterAdditionalUserInfo(isNewUser, profile, idTokenResponse.screenName || null);
    case "custom" /* ProviderId.CUSTOM */:
    case "anonymous" /* ProviderId.ANONYMOUS */:
      return new GenericAdditionalUserInfo(isNewUser, null);
    default:
      return new GenericAdditionalUserInfo(isNewUser, providerId, profile);
  }
}
var GenericAdditionalUserInfo = /*#__PURE__*/_createClass(function GenericAdditionalUserInfo(isNewUser, providerId) {
  var profile = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  _classCallCheck(this, GenericAdditionalUserInfo);
  this.isNewUser = isNewUser;
  this.providerId = providerId;
  this.profile = profile;
});
var FederatedAdditionalUserInfoWithUsername = /*#__PURE__*/function (_GenericAdditionalUse) {
  function FederatedAdditionalUserInfoWithUsername(isNewUser, providerId, profile, username) {
    var _this22;
    _classCallCheck(this, FederatedAdditionalUserInfoWithUsername);
    _this22 = _callSuper(this, FederatedAdditionalUserInfoWithUsername, [isNewUser, providerId, profile]);
    _this22.username = username;
    return _this22;
  }
  _inherits(FederatedAdditionalUserInfoWithUsername, _GenericAdditionalUse);
  return _createClass(FederatedAdditionalUserInfoWithUsername);
}(GenericAdditionalUserInfo);
var FacebookAdditionalUserInfo = /*#__PURE__*/function (_GenericAdditionalUse2) {
  function FacebookAdditionalUserInfo(isNewUser, profile) {
    _classCallCheck(this, FacebookAdditionalUserInfo);
    return _callSuper(this, FacebookAdditionalUserInfo, [isNewUser, "facebook.com" /* ProviderId.FACEBOOK */, profile]);
  }
  _inherits(FacebookAdditionalUserInfo, _GenericAdditionalUse2);
  return _createClass(FacebookAdditionalUserInfo);
}(GenericAdditionalUserInfo);
var GithubAdditionalUserInfo = /*#__PURE__*/function (_FederatedAdditionalU) {
  function GithubAdditionalUserInfo(isNewUser, profile) {
    _classCallCheck(this, GithubAdditionalUserInfo);
    return _callSuper(this, GithubAdditionalUserInfo, [isNewUser, "github.com" /* ProviderId.GITHUB */, profile, typeof (profile === null || profile === void 0 ? void 0 : profile.login) === 'string' ? profile === null || profile === void 0 ? void 0 : profile.login : null]);
  }
  _inherits(GithubAdditionalUserInfo, _FederatedAdditionalU);
  return _createClass(GithubAdditionalUserInfo);
}(FederatedAdditionalUserInfoWithUsername);
var GoogleAdditionalUserInfo = /*#__PURE__*/function (_GenericAdditionalUse3) {
  function GoogleAdditionalUserInfo(isNewUser, profile) {
    _classCallCheck(this, GoogleAdditionalUserInfo);
    return _callSuper(this, GoogleAdditionalUserInfo, [isNewUser, "google.com" /* ProviderId.GOOGLE */, profile]);
  }
  _inherits(GoogleAdditionalUserInfo, _GenericAdditionalUse3);
  return _createClass(GoogleAdditionalUserInfo);
}(GenericAdditionalUserInfo);
var TwitterAdditionalUserInfo = /*#__PURE__*/function (_FederatedAdditionalU2) {
  function TwitterAdditionalUserInfo(isNewUser, profile, screenName) {
    _classCallCheck(this, TwitterAdditionalUserInfo);
    return _callSuper(this, TwitterAdditionalUserInfo, [isNewUser, "twitter.com" /* ProviderId.TWITTER */, profile, screenName]);
  }
  _inherits(TwitterAdditionalUserInfo, _FederatedAdditionalU2);
  return _createClass(TwitterAdditionalUserInfo);
}(FederatedAdditionalUserInfoWithUsername);
/**
 * Extracts provider specific {@link AdditionalUserInfo} for the given credential.
 *
 * @param userCredential - The user credential.
 *
 * @public
 */
function getAdditionalUserInfo(userCredential) {
  var user = userCredential.user,
    _tokenResponse = userCredential._tokenResponse;
  if (user.isAnonymous && !_tokenResponse) {
    // Handle the special case where signInAnonymously() gets called twice.
    // No network call is made so there's nothing to actually fill this in
    return {
      providerId: null,
      isNewUser: false,
      profile: null
    };
  }
  return _fromIdTokenResponse(_tokenResponse);
}

/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
// Non-optional auth methods.
/**
 * Changes the type of persistence on the {@link Auth} instance for the currently saved
 * `Auth` session and applies this type of persistence for future sign-in requests, including
 * sign-in with redirect requests.
 *
 * @remarks
 * This makes it easy for a user signing in to specify whether their session should be
 * remembered or not. It also makes it easier to never persist the `Auth` state for applications
 * that are shared by other users or have sensitive data.
 *
 * This method does not work in a Node.js environment or with {@link Auth} instances created with a
 * {@link @firebase/app#FirebaseServerApp}.
 *
 * @example
 * ```javascript
 * setPersistence(auth, browserSessionPersistence);
 * ```
 *
 * @param auth - The {@link Auth} instance.
 * @param persistence - The {@link Persistence} to use.
 * @returns A `Promise` that resolves once the persistence change has completed
 *
 * @public
 */
function setPersistence(auth, persistence) {
  return (0, _util.getModularInstance)(auth).setPersistence(persistence);
}
/**
 * Loads the reCAPTCHA configuration into the `Auth` instance.
 *
 * @remarks
 * This will load the reCAPTCHA config, which indicates whether the reCAPTCHA
 * verification flow should be triggered for each auth provider, into the
 * current Auth session.
 *
 * If initializeRecaptchaConfig() is not invoked, the auth flow will always start
 * without reCAPTCHA verification. If the provider is configured to require reCAPTCHA
 * verification, the SDK will transparently load the reCAPTCHA config and restart the
 * auth flows.
 *
 * Thus, by calling this optional method, you will reduce the latency of future auth flows.
 * Loading the reCAPTCHA config early will also enhance the signal collected by reCAPTCHA.
 *
 * This method does not work in a Node.js environment.
 *
 * @example
 * ```javascript
 * initializeRecaptchaConfig(auth);
 * ```
 *
 * @param auth - The {@link Auth} instance.
 *
 * @public
 */
function initializeRecaptchaConfig(auth) {
  return _initializeRecaptchaConfig(auth);
}
/**
 * Validates the password against the password policy configured for the project or tenant.
 *
 * @remarks
 * If no tenant ID is set on the `Auth` instance, then this method will use the password
 * policy configured for the project. Otherwise, this method will use the policy configured
 * for the tenant. If a password policy has not been configured, then the default policy
 * configured for all projects will be used.
 *
 * If an auth flow fails because a submitted password does not meet the password policy
 * requirements and this method has previously been called, then this method will use the
 * most recent policy available when called again.
 *
 * @example
 * ```javascript
 * validatePassword(auth, 'some-password');
 * ```
 *
 * @param auth The {@link Auth} instance.
 * @param password The password to validate.
 *
 * @public
 */
function validatePassword(_x186, _x187) {
  return _validatePassword2.apply(this, arguments);
}
/**
 * Adds an observer for changes to the signed-in user's ID token.
 *
 * @remarks
 * This includes sign-in, sign-out, and token refresh events.
 * This will not be triggered automatically upon ID token expiration. Use {@link User.getIdToken} to refresh the ID token.
 *
 * @param auth - The {@link Auth} instance.
 * @param nextOrObserver - callback triggered on change.
 * @param error - Deprecated. This callback is never triggered. Errors
 * on signing in/out can be caught in promises returned from
 * sign-in/sign-out functions.
 * @param completed - Deprecated. This callback is never triggered.
 *
 * @public
 */
function _validatePassword2() {
  _validatePassword2 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee174(auth, password) {
    var authInternal;
    return _regeneratorRuntime().wrap(function _callee174$(_context174) {
      while (1) switch (_context174.prev = _context174.next) {
        case 0:
          authInternal = _castAuth(auth);
          return _context174.abrupt("return", authInternal.validatePassword(password));
        case 2:
        case "end":
          return _context174.stop();
      }
    }, _callee174);
  }));
  return _validatePassword2.apply(this, arguments);
}
function onIdTokenChanged(auth, nextOrObserver, error, completed) {
  return (0, _util.getModularInstance)(auth).onIdTokenChanged(nextOrObserver, error, completed);
}
/**
 * Adds a blocking callback that runs before an auth state change
 * sets a new user.
 *
 * @param auth - The {@link Auth} instance.
 * @param callback - callback triggered before new user value is set.
 *   If this throws, it blocks the user from being set.
 * @param onAbort - callback triggered if a later `beforeAuthStateChanged()`
 *   callback throws, allowing you to undo any side effects.
 */
function beforeAuthStateChanged(auth, callback, onAbort) {
  return (0, _util.getModularInstance)(auth).beforeAuthStateChanged(callback, onAbort);
}
/**
 * Adds an observer for changes to the user's sign-in state.
 *
 * @remarks
 * To keep the old behavior, see {@link onIdTokenChanged}.
 *
 * @param auth - The {@link Auth} instance.
 * @param nextOrObserver - callback triggered on change.
 * @param error - Deprecated. This callback is never triggered. Errors
 * on signing in/out can be caught in promises returned from
 * sign-in/sign-out functions.
 * @param completed - Deprecated. This callback is never triggered.
 *
 * @public
 */
function onAuthStateChanged(auth, nextOrObserver, error, completed) {
  return (0, _util.getModularInstance)(auth).onAuthStateChanged(nextOrObserver, error, completed);
}
/**
 * Sets the current language to the default device/browser preference.
 *
 * @param auth - The {@link Auth} instance.
 *
 * @public
 */
function useDeviceLanguage(auth) {
  (0, _util.getModularInstance)(auth).useDeviceLanguage();
}
/**
 * Asynchronously sets the provided user as {@link Auth.currentUser} on the
 * {@link Auth} instance.
 *
 * @remarks
 * A new instance copy of the user provided will be made and set as currentUser.
 *
 * This will trigger {@link onAuthStateChanged} and {@link onIdTokenChanged} listeners
 * like other sign in methods.
 *
 * The operation fails with an error if the user to be updated belongs to a different Firebase
 * project.
 *
 * This method is not supported by {@link Auth} instances created with a
 * {@link @firebase/app#FirebaseServerApp}.
 *
 * @param auth - The {@link Auth} instance.
 * @param user - The new {@link User}.
 *
 * @public
 */
function updateCurrentUser(auth, user) {
  return (0, _util.getModularInstance)(auth).updateCurrentUser(user);
}
/**
 * Signs out the current user.
 *
 * @remarks
 * This method is not supported by {@link Auth} instances created with a
 * {@link @firebase/app#FirebaseServerApp}.
 *
 * @param auth - The {@link Auth} instance.
 *
 * @public
 */
function signOut(auth) {
  return (0, _util.getModularInstance)(auth).signOut();
}
/**
 * Revokes the given access token. Currently only supports Apple OAuth access tokens.
 *
 * @param auth - The {@link Auth} instance.
 * @param token - The Apple OAuth access token.
 *
 * @public
 */
function revokeAccessToken(auth, token) {
  var authInternal = _castAuth(auth);
  return authInternal.revokeAccessToken(token);
}
/**
 * Deletes and signs out the user.
 *
 * @remarks
 * Important: this is a security-sensitive operation that requires the user to have recently
 * signed in. If this requirement isn't met, ask the user to authenticate again and then call
 * {@link reauthenticateWithCredential}.
 *
 * @param user - The user.
 *
 * @public
 */
function deleteUser(_x188) {
  return _deleteUser.apply(this, arguments);
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function _deleteUser() {
  _deleteUser = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee175(user) {
    return _regeneratorRuntime().wrap(function _callee175$(_context175) {
      while (1) switch (_context175.prev = _context175.next) {
        case 0:
          return _context175.abrupt("return", (0, _util.getModularInstance)(user).delete());
        case 1:
        case "end":
          return _context175.stop();
      }
    }, _callee175);
  }));
  return _deleteUser.apply(this, arguments);
}
var MultiFactorSessionImpl = /*#__PURE__*/function () {
  function MultiFactorSessionImpl(type, credential, user) {
    _classCallCheck(this, MultiFactorSessionImpl);
    this.type = type;
    this.credential = credential;
    this.user = user;
  }
  return _createClass(MultiFactorSessionImpl, [{
    key: "toJSON",
    value: function toJSON() {
      var key = this.type === "enroll" /* MultiFactorSessionType.ENROLL */ ? 'idToken' : 'pendingCredential';
      return {
        multiFactorSession: _defineProperty({}, key, this.credential)
      };
    }
  }], [{
    key: "_fromIdtoken",
    value: function _fromIdtoken(idToken, user) {
      return new MultiFactorSessionImpl("enroll" /* MultiFactorSessionType.ENROLL */, idToken, user);
    }
  }, {
    key: "_fromMfaPendingCredential",
    value: function _fromMfaPendingCredential(mfaPendingCredential) {
      return new MultiFactorSessionImpl("signin" /* MultiFactorSessionType.SIGN_IN */, mfaPendingCredential);
    }
  }, {
    key: "fromJSON",
    value: function fromJSON(obj) {
      var _a, _b;
      if (obj === null || obj === void 0 ? void 0 : obj.multiFactorSession) {
        if ((_a = obj.multiFactorSession) === null || _a === void 0 ? void 0 : _a.pendingCredential) {
          return MultiFactorSessionImpl._fromMfaPendingCredential(obj.multiFactorSession.pendingCredential);
        } else if ((_b = obj.multiFactorSession) === null || _b === void 0 ? void 0 : _b.idToken) {
          return MultiFactorSessionImpl._fromIdtoken(obj.multiFactorSession.idToken);
        }
      }
      return null;
    }
  }]);
}();
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var MultiFactorResolverImpl = /*#__PURE__*/function () {
  function MultiFactorResolverImpl(session, hints, signInResolver) {
    _classCallCheck(this, MultiFactorResolverImpl);
    this.session = session;
    this.hints = hints;
    this.signInResolver = signInResolver;
  }
  /** @internal */
  return _createClass(MultiFactorResolverImpl, [{
    key: "resolveSignIn",
    value: function () {
      var _resolveSignIn = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee52(assertionExtern) {
        var assertion;
        return _regeneratorRuntime().wrap(function _callee52$(_context52) {
          while (1) switch (_context52.prev = _context52.next) {
            case 0:
              assertion = assertionExtern;
              return _context52.abrupt("return", this.signInResolver(assertion));
            case 2:
            case "end":
              return _context52.stop();
          }
        }, _callee52, this);
      }));
      function resolveSignIn(_x189) {
        return _resolveSignIn.apply(this, arguments);
      }
      return resolveSignIn;
    }()
  }], [{
    key: "_fromError",
    value: function _fromError(authExtern, error) {
      var auth = _castAuth(authExtern);
      var serverResponse = error.customData._serverResponse;
      var hints = (serverResponse.mfaInfo || []).map(function (enrollment) {
        return MultiFactorInfoImpl._fromServerResponse(auth, enrollment);
      });
      _assert(serverResponse.mfaPendingCredential, auth, "internal-error" /* AuthErrorCode.INTERNAL_ERROR */);
      var session = MultiFactorSessionImpl._fromMfaPendingCredential(serverResponse.mfaPendingCredential);
      return new MultiFactorResolverImpl(session, hints, /*#__PURE__*/function () {
        var _ref20 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee53(assertion) {
          var mfaResponse, idTokenResponse, userCredential;
          return _regeneratorRuntime().wrap(function _callee53$(_context53) {
            while (1) switch (_context53.prev = _context53.next) {
              case 0:
                _context53.next = 2;
                return assertion._process(auth, session);
              case 2:
                mfaResponse = _context53.sent;
                // Clear out the unneeded fields from the old login response
                delete serverResponse.mfaInfo;
                delete serverResponse.mfaPendingCredential;
                // Use in the new token & refresh token in the old response
                idTokenResponse = Object.assign(Object.assign({}, serverResponse), {
                  idToken: mfaResponse.idToken,
                  refreshToken: mfaResponse.refreshToken
                }); // TODO: we should collapse this switch statement into UserCredentialImpl._forOperation and have it support the SIGN_IN case
                _context53.t0 = error.operationType;
                _context53.next = _context53.t0 === "signIn" /* OperationType.SIGN_IN */ ? 9 : _context53.t0 === "reauthenticate" /* OperationType.REAUTHENTICATE */ ? 15 : 17;
                break;
              case 9:
                _context53.next = 11;
                return UserCredentialImpl._fromIdTokenResponse(auth, error.operationType, idTokenResponse);
              case 11:
                userCredential = _context53.sent;
                _context53.next = 14;
                return auth._updateCurrentUser(userCredential.user);
              case 14:
                return _context53.abrupt("return", userCredential);
              case 15:
                _assert(error.user, auth, "internal-error" /* AuthErrorCode.INTERNAL_ERROR */);
                return _context53.abrupt("return", UserCredentialImpl._forOperation(error.user, error.operationType, idTokenResponse));
              case 17:
                _fail(auth, "internal-error" /* AuthErrorCode.INTERNAL_ERROR */);
              case 18:
              case "end":
                return _context53.stop();
            }
          }, _callee53);
        }));
        return function (_x190) {
          return _ref20.apply(this, arguments);
        };
      }());
    }
  }]);
}();
/**
 * Provides a {@link MultiFactorResolver} suitable for completion of a
 * multi-factor flow.
 *
 * @param auth - The {@link Auth} instance.
 * @param error - The {@link MultiFactorError} raised during a sign-in, or
 * reauthentication operation.
 *
 * @public
 */
function getMultiFactorResolver(auth, error) {
  var _a;
  var authModular = (0, _util.getModularInstance)(auth);
  var errorInternal = error;
  _assert(error.customData.operationType, authModular, "argument-error" /* AuthErrorCode.ARGUMENT_ERROR */);
  _assert((_a = errorInternal.customData._serverResponse) === null || _a === void 0 ? void 0 : _a.mfaPendingCredential, authModular, "argument-error" /* AuthErrorCode.ARGUMENT_ERROR */);
  return MultiFactorResolverImpl._fromError(authModular, errorInternal);
}

/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function startEnrollPhoneMfa(auth, request) {
  return _performApiRequest(auth, "POST" /* HttpMethod.POST */, "/v2/accounts/mfaEnrollment:start" /* Endpoint.START_MFA_ENROLLMENT */, _addTidIfNecessary(auth, request));
}
function finalizeEnrollPhoneMfa(auth, request) {
  return _performApiRequest(auth, "POST" /* HttpMethod.POST */, "/v2/accounts/mfaEnrollment:finalize" /* Endpoint.FINALIZE_MFA_ENROLLMENT */, _addTidIfNecessary(auth, request));
}
function startEnrollTotpMfa(auth, request) {
  return _performApiRequest(auth, "POST" /* HttpMethod.POST */, "/v2/accounts/mfaEnrollment:start" /* Endpoint.START_MFA_ENROLLMENT */, _addTidIfNecessary(auth, request));
}
function finalizeEnrollTotpMfa(auth, request) {
  return _performApiRequest(auth, "POST" /* HttpMethod.POST */, "/v2/accounts/mfaEnrollment:finalize" /* Endpoint.FINALIZE_MFA_ENROLLMENT */, _addTidIfNecessary(auth, request));
}
function withdrawMfa(auth, request) {
  return _performApiRequest(auth, "POST" /* HttpMethod.POST */, "/v2/accounts/mfaEnrollment:withdraw" /* Endpoint.WITHDRAW_MFA */, _addTidIfNecessary(auth, request));
}
var MultiFactorUserImpl = /*#__PURE__*/function () {
  function MultiFactorUserImpl(user) {
    var _this23 = this;
    _classCallCheck(this, MultiFactorUserImpl);
    this.user = user;
    this.enrolledFactors = [];
    user._onReload(function (userInfo) {
      if (userInfo.mfaInfo) {
        _this23.enrolledFactors = userInfo.mfaInfo.map(function (enrollment) {
          return MultiFactorInfoImpl._fromServerResponse(user.auth, enrollment);
        });
      }
    });
  }
  return _createClass(MultiFactorUserImpl, [{
    key: "getSession",
    value: function () {
      var _getSession = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee54() {
        return _regeneratorRuntime().wrap(function _callee54$(_context54) {
          while (1) switch (_context54.prev = _context54.next) {
            case 0:
              _context54.t0 = MultiFactorSessionImpl;
              _context54.next = 3;
              return this.user.getIdToken();
            case 3:
              _context54.t1 = _context54.sent;
              _context54.t2 = this.user;
              return _context54.abrupt("return", _context54.t0._fromIdtoken.call(_context54.t0, _context54.t1, _context54.t2));
            case 6:
            case "end":
              return _context54.stop();
          }
        }, _callee54, this);
      }));
      function getSession() {
        return _getSession.apply(this, arguments);
      }
      return getSession;
    }()
  }, {
    key: "enroll",
    value: function () {
      var _enroll = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee55(assertionExtern, displayName) {
        var assertion, session, finalizeMfaResponse;
        return _regeneratorRuntime().wrap(function _callee55$(_context55) {
          while (1) switch (_context55.prev = _context55.next) {
            case 0:
              assertion = assertionExtern;
              _context55.next = 3;
              return this.getSession();
            case 3:
              session = _context55.sent;
              _context55.next = 6;
              return _logoutIfInvalidated(this.user, assertion._process(this.user.auth, session, displayName));
            case 6:
              finalizeMfaResponse = _context55.sent;
              _context55.next = 9;
              return this.user._updateTokensIfNecessary(finalizeMfaResponse);
            case 9:
              return _context55.abrupt("return", this.user.reload());
            case 10:
            case "end":
              return _context55.stop();
          }
        }, _callee55, this);
      }));
      function enroll(_x191, _x192) {
        return _enroll.apply(this, arguments);
      }
      return enroll;
    }()
  }, {
    key: "unenroll",
    value: function () {
      var _unenroll = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee56(infoOrUid) {
        var mfaEnrollmentId, idToken, idTokenResponse;
        return _regeneratorRuntime().wrap(function _callee56$(_context56) {
          while (1) switch (_context56.prev = _context56.next) {
            case 0:
              mfaEnrollmentId = typeof infoOrUid === 'string' ? infoOrUid : infoOrUid.uid;
              _context56.next = 3;
              return this.user.getIdToken();
            case 3:
              idToken = _context56.sent;
              _context56.prev = 4;
              _context56.next = 7;
              return _logoutIfInvalidated(this.user, withdrawMfa(this.user.auth, {
                idToken: idToken,
                mfaEnrollmentId: mfaEnrollmentId
              }));
            case 7:
              idTokenResponse = _context56.sent;
              // Remove the second factor from the user's list.
              this.enrolledFactors = this.enrolledFactors.filter(function (_ref21) {
                var uid = _ref21.uid;
                return uid !== mfaEnrollmentId;
              });
              // Depending on whether the backend decided to revoke the user's session,
              // the tokenResponse may be empty. If the tokens were not updated (and they
              // are now invalid), reloading the user will discover this and invalidate
              // the user's state accordingly.
              _context56.next = 11;
              return this.user._updateTokensIfNecessary(idTokenResponse);
            case 11:
              _context56.next = 13;
              return this.user.reload();
            case 13:
              _context56.next = 18;
              break;
            case 15:
              _context56.prev = 15;
              _context56.t0 = _context56["catch"](4);
              throw _context56.t0;
            case 18:
            case "end":
              return _context56.stop();
          }
        }, _callee56, this, [[4, 15]]);
      }));
      function unenroll(_x193) {
        return _unenroll.apply(this, arguments);
      }
      return unenroll;
    }()
  }], [{
    key: "_fromUser",
    value: function _fromUser(user) {
      return new MultiFactorUserImpl(user);
    }
  }]);
}();
var multiFactorUserCache = new WeakMap();
/**
 * The {@link MultiFactorUser} corresponding to the user.
 *
 * @remarks
 * This is used to access all multi-factor properties and operations related to the user.
 *
 * @param user - The user.
 *
 * @public
 */
function multiFactor(user) {
  var userModular = (0, _util.getModularInstance)(user);
  if (!multiFactorUserCache.has(userModular)) {
    multiFactorUserCache.set(userModular, MultiFactorUserImpl._fromUser(userModular));
  }
  return multiFactorUserCache.get(userModular);
}
var STORAGE_AVAILABLE_KEY = '__sak';

/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
// There are two different browser persistence types: local and session.
// Both have the same implementation but use a different underlying storage
// object.
var BrowserPersistenceClass = /*#__PURE__*/function () {
  function BrowserPersistenceClass(storageRetriever, type) {
    _classCallCheck(this, BrowserPersistenceClass);
    this.storageRetriever = storageRetriever;
    this.type = type;
  }
  return _createClass(BrowserPersistenceClass, [{
    key: "_isAvailable",
    value: function _isAvailable() {
      try {
        if (!this.storage) {
          return Promise.resolve(false);
        }
        this.storage.setItem(STORAGE_AVAILABLE_KEY, '1');
        this.storage.removeItem(STORAGE_AVAILABLE_KEY);
        return Promise.resolve(true);
      } catch (_a) {
        return Promise.resolve(false);
      }
    }
  }, {
    key: "_set",
    value: function _set(key, value) {
      this.storage.setItem(key, JSON.stringify(value));
      return Promise.resolve();
    }
  }, {
    key: "_get",
    value: function _get(key) {
      var json = this.storage.getItem(key);
      return Promise.resolve(json ? JSON.parse(json) : null);
    }
  }, {
    key: "_remove",
    value: function _remove(key) {
      this.storage.removeItem(key);
      return Promise.resolve();
    }
  }, {
    key: "storage",
    get: function get() {
      return this.storageRetriever();
    }
  }]);
}();
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
// The polling period in case events are not supported
var _POLLING_INTERVAL_MS$1 = 1000;
// The IE 10 localStorage cross tab synchronization delay in milliseconds
var IE10_LOCAL_STORAGE_SYNC_DELAY = 10;
var BrowserLocalPersistence = /*#__PURE__*/function (_BrowserPersistenceCl) {
  function BrowserLocalPersistence() {
    var _this24;
    _classCallCheck(this, BrowserLocalPersistence);
    _this24 = _callSuper(this, BrowserLocalPersistence, [function () {
      return window.localStorage;
    }, "LOCAL" /* PersistenceType.LOCAL */]);
    _this24.boundEventHandler = function (event, poll) {
      return _this24.onStorageEvent(event, poll);
    };
    _this24.listeners = {};
    _this24.localCache = {};
    // setTimeout return value is platform specific
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    _this24.pollTimer = null;
    // Whether to use polling instead of depending on window events
    _this24.fallbackToPolling = _isMobileBrowser();
    _this24._shouldAllowMigration = true;
    return _this24;
  }
  _inherits(BrowserLocalPersistence, _BrowserPersistenceCl);
  return _createClass(BrowserLocalPersistence, [{
    key: "forAllChangedKeys",
    value: function forAllChangedKeys(cb) {
      // Check all keys with listeners on them.
      for (var _i = 0, _Object$keys = Object.keys(this.listeners); _i < _Object$keys.length; _i++) {
        var key = _Object$keys[_i];
        // Get value from localStorage.
        var newValue = this.storage.getItem(key);
        var oldValue = this.localCache[key];
        // If local map value does not match, trigger listener with storage event.
        // Differentiate this simulated event from the real storage event.
        if (newValue !== oldValue) {
          cb(key, oldValue, newValue);
        }
      }
    }
  }, {
    key: "onStorageEvent",
    value: function onStorageEvent(event) {
      var _this25 = this;
      var poll = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      // Key would be null in some situations, like when localStorage is cleared
      if (!event.key) {
        this.forAllChangedKeys(function (key, _oldValue, newValue) {
          _this25.notifyListeners(key, newValue);
        });
        return;
      }
      var key = event.key;
      // Check the mechanism how this event was detected.
      // The first event will dictate the mechanism to be used.
      if (poll) {
        // Environment detects storage changes via polling.
        // Remove storage event listener to prevent possible event duplication.
        this.detachListener();
      } else {
        // Environment detects storage changes via storage event listener.
        // Remove polling listener to prevent possible event duplication.
        this.stopPolling();
      }
      var triggerListeners = function triggerListeners() {
        // Keep local map up to date in case storage event is triggered before
        // poll.
        var storedValue = _this25.storage.getItem(key);
        if (!poll && _this25.localCache[key] === storedValue) {
          // Real storage event which has already been detected, do nothing.
          // This seems to trigger in some IE browsers for some reason.
          return;
        }
        _this25.notifyListeners(key, storedValue);
      };
      var storedValue = this.storage.getItem(key);
      if (_isIE10() && storedValue !== event.newValue && event.newValue !== event.oldValue) {
        // IE 10 has this weird bug where a storage event would trigger with the
        // correct key, oldValue and newValue but localStorage.getItem(key) does
        // not yield the updated value until a few milliseconds. This ensures
        // this recovers from that situation.
        setTimeout(triggerListeners, IE10_LOCAL_STORAGE_SYNC_DELAY);
      } else {
        triggerListeners();
      }
    }
  }, {
    key: "notifyListeners",
    value: function notifyListeners(key, value) {
      this.localCache[key] = value;
      var listeners = this.listeners[key];
      if (listeners) {
        for (var _i2 = 0, _Array$from = Array.from(listeners); _i2 < _Array$from.length; _i2++) {
          var listener = _Array$from[_i2];
          listener(value ? JSON.parse(value) : value);
        }
      }
    }
  }, {
    key: "startPolling",
    value: function startPolling() {
      var _this26 = this;
      this.stopPolling();
      this.pollTimer = setInterval(function () {
        _this26.forAllChangedKeys(function (key, oldValue, newValue) {
          _this26.onStorageEvent(new StorageEvent('storage', {
            key: key,
            oldValue: oldValue,
            newValue: newValue
          }), /* poll */true);
        });
      }, _POLLING_INTERVAL_MS$1);
    }
  }, {
    key: "stopPolling",
    value: function stopPolling() {
      if (this.pollTimer) {
        clearInterval(this.pollTimer);
        this.pollTimer = null;
      }
    }
  }, {
    key: "attachListener",
    value: function attachListener() {
      window.addEventListener('storage', this.boundEventHandler);
    }
  }, {
    key: "detachListener",
    value: function detachListener() {
      window.removeEventListener('storage', this.boundEventHandler);
    }
  }, {
    key: "_addListener",
    value: function _addListener(key, listener) {
      if (Object.keys(this.listeners).length === 0) {
        // Whether browser can detect storage event when it had already been pushed to the background.
        // This may happen in some mobile browsers. A localStorage change in the foreground window
        // will not be detected in the background window via the storage event.
        // This was detected in iOS 7.x mobile browsers
        if (this.fallbackToPolling) {
          this.startPolling();
        } else {
          this.attachListener();
        }
      }
      if (!this.listeners[key]) {
        this.listeners[key] = new Set();
        // Populate the cache to avoid spuriously triggering on first poll.
        this.localCache[key] = this.storage.getItem(key);
      }
      this.listeners[key].add(listener);
    }
  }, {
    key: "_removeListener",
    value: function _removeListener(key, listener) {
      if (this.listeners[key]) {
        this.listeners[key].delete(listener);
        if (this.listeners[key].size === 0) {
          delete this.listeners[key];
        }
      }
      if (Object.keys(this.listeners).length === 0) {
        this.detachListener();
        this.stopPolling();
      }
    }
    // Update local cache on base operations:
  }, {
    key: "_set",
    value: function () {
      var _set3 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee57(key, value) {
        return _regeneratorRuntime().wrap(function _callee57$(_context57) {
          while (1) switch (_context57.prev = _context57.next) {
            case 0:
              _context57.next = 2;
              return _superPropGet(BrowserLocalPersistence, "_set", this, 3)([key, value]);
            case 2:
              this.localCache[key] = JSON.stringify(value);
            case 3:
            case "end":
              return _context57.stop();
          }
        }, _callee57, this);
      }));
      function _set(_x194, _x195) {
        return _set3.apply(this, arguments);
      }
      return _set;
    }()
  }, {
    key: "_get",
    value: function () {
      var _get4 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee58(key) {
        var value;
        return _regeneratorRuntime().wrap(function _callee58$(_context58) {
          while (1) switch (_context58.prev = _context58.next) {
            case 0:
              _context58.next = 2;
              return _superPropGet(BrowserLocalPersistence, "_get", this, 3)([key]);
            case 2:
              value = _context58.sent;
              this.localCache[key] = JSON.stringify(value);
              return _context58.abrupt("return", value);
            case 5:
            case "end":
              return _context58.stop();
          }
        }, _callee58, this);
      }));
      function _get(_x196) {
        return _get4.apply(this, arguments);
      }
      return _get;
    }()
  }, {
    key: "_remove",
    value: function () {
      var _remove3 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee59(key) {
        return _regeneratorRuntime().wrap(function _callee59$(_context59) {
          while (1) switch (_context59.prev = _context59.next) {
            case 0:
              _context59.next = 2;
              return _superPropGet(BrowserLocalPersistence, "_remove", this, 3)([key]);
            case 2:
              delete this.localCache[key];
            case 3:
            case "end":
              return _context59.stop();
          }
        }, _callee59, this);
      }));
      function _remove(_x197) {
        return _remove3.apply(this, arguments);
      }
      return _remove;
    }()
  }]);
}(BrowserPersistenceClass);
BrowserLocalPersistence.type = 'LOCAL';
/**
 * An implementation of {@link Persistence} of type `LOCAL` using `localStorage`
 * for the underlying storage.
 *
 * @public
 */
var browserLocalPersistence = exports.b = BrowserLocalPersistence;

/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var POLLING_INTERVAL_MS = 1000;
// Pull a cookie value from document.cookie
function getDocumentCookie(name) {
  var _a, _b;
  var escapedName = name.replace(/[\\^$.*+?()[\]{}|]/g, '\\$&');
  var matcher = RegExp("".concat(escapedName, "=([^;]+)"));
  return (_b = (_a = document.cookie.match(matcher)) === null || _a === void 0 ? void 0 : _a[1]) !== null && _b !== void 0 ? _b : null;
}
// Produce a sanitized cookie name from the persistence key
function getCookieName(key) {
  // __HOST- doesn't work in localhost https://issues.chromium.org/issues/40196122 but it has
  // desirable security properties, so lets use a different cookie name while in dev-mode.
  // Already checked isSecureContext in _isAvailable, so if it's http we're hitting local.
  var isDevMode = window.location.protocol === 'http:';
  return "".concat(isDevMode ? '__dev_' : '__HOST-', "FIREBASE_").concat(key.split(':')[3]);
}
var CookiePersistence = /*#__PURE__*/function () {
  function CookiePersistence() {
    _classCallCheck(this, CookiePersistence);
    this.type = "COOKIE" /* PersistenceType.COOKIE */;
    this.listenerUnsubscribes = new Map();
  }
  // used to get the URL to the backend to proxy to
  return _createClass(CookiePersistence, [{
    key: "_getFinalTarget",
    value: function _getFinalTarget(originalUrl) {
      if ((typeof window === "undefined" ? "undefined" : _typeof(window)) === undefined) {
        return originalUrl;
      }
      var url = new URL("".concat(window.location.origin, "/__cookies__"));
      url.searchParams.set('finalTarget', originalUrl);
      return url;
    }
    // To be a usable persistence method in a chain browserCookiePersistence ensures that
    // prerequisites have been met, namely that we're in a secureContext, navigator and document are
    // available and cookies are enabled. Not all UAs support these method, so fallback accordingly.
  }, {
    key: "_isAvailable",
    value: function () {
      var _isAvailable3 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee60() {
        var _a;
        return _regeneratorRuntime().wrap(function _callee60$(_context60) {
          while (1) switch (_context60.prev = _context60.next) {
            case 0:
              if (!(typeof isSecureContext === 'boolean' && !isSecureContext)) {
                _context60.next = 2;
                break;
              }
              return _context60.abrupt("return", false);
            case 2:
              if (!(typeof navigator === 'undefined' || typeof document === 'undefined')) {
                _context60.next = 4;
                break;
              }
              return _context60.abrupt("return", false);
            case 4:
              return _context60.abrupt("return", (_a = navigator.cookieEnabled) !== null && _a !== void 0 ? _a : true);
            case 5:
            case "end":
              return _context60.stop();
          }
        }, _callee60);
      }));
      function _isAvailable() {
        return _isAvailable3.apply(this, arguments);
      }
      return _isAvailable;
    }() // Set should be a noop as we expect middleware to handle this
  }, {
    key: "_set",
    value: function () {
      var _set4 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee61(_key, _value) {
        return _regeneratorRuntime().wrap(function _callee61$(_context61) {
          while (1) switch (_context61.prev = _context61.next) {
            case 0:
              return _context61.abrupt("return");
            case 1:
            case "end":
              return _context61.stop();
          }
        }, _callee61);
      }));
      function _set(_x198, _x199) {
        return _set4.apply(this, arguments);
      }
      return _set;
    }() // Attempt to get the cookie from cookieStore, fallback to document.cookie
  }, {
    key: "_get",
    value: function () {
      var _get5 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee62(key) {
        var name, cookie;
        return _regeneratorRuntime().wrap(function _callee62$(_context62) {
          while (1) switch (_context62.prev = _context62.next) {
            case 0:
              if (this._isAvailable()) {
                _context62.next = 2;
                break;
              }
              return _context62.abrupt("return", null);
            case 2:
              name = getCookieName(key);
              if (!window.cookieStore) {
                _context62.next = 8;
                break;
              }
              _context62.next = 6;
              return window.cookieStore.get(name);
            case 6:
              cookie = _context62.sent;
              return _context62.abrupt("return", cookie === null || cookie === void 0 ? void 0 : cookie.value);
            case 8:
              return _context62.abrupt("return", getDocumentCookie(name));
            case 9:
            case "end":
              return _context62.stop();
          }
        }, _callee62, this);
      }));
      function _get(_x200) {
        return _get5.apply(this, arguments);
      }
      return _get;
    }() // Log out by overriding the idToken with a sentinel value of ""
  }, {
    key: "_remove",
    value: function () {
      var _remove4 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee63(key) {
        var existingValue, name;
        return _regeneratorRuntime().wrap(function _callee63$(_context63) {
          while (1) switch (_context63.prev = _context63.next) {
            case 0:
              if (this._isAvailable()) {
                _context63.next = 2;
                break;
              }
              return _context63.abrupt("return");
            case 2:
              _context63.next = 4;
              return this._get(key);
            case 4:
              existingValue = _context63.sent;
              if (existingValue) {
                _context63.next = 7;
                break;
              }
              return _context63.abrupt("return");
            case 7:
              name = getCookieName(key);
              document.cookie = "".concat(name, "=;Max-Age=34560000;Partitioned;Secure;SameSite=Strict;Path=/;Priority=High");
              _context63.next = 11;
              return fetch("/__cookies__", {
                method: 'DELETE'
              }).catch(function () {
                return undefined;
              });
            case 11:
            case "end":
              return _context63.stop();
          }
        }, _callee63, this);
      }));
      function _remove(_x201) {
        return _remove4.apply(this, arguments);
      }
      return _remove;
    }() // Listen for cookie changes, both cookieStore and fallback to polling document.cookie
  }, {
    key: "_addListener",
    value: function _addListener(key, listener) {
      if (!this._isAvailable()) {
        return;
      }
      var name = getCookieName(key);
      if (window.cookieStore) {
        var cb = function cb(event) {
          var changedCookie = event.changed.find(function (change) {
            return change.name === name;
          });
          if (changedCookie) {
            listener(changedCookie.value);
          }
          var deletedCookie = event.deleted.find(function (change) {
            return change.name === name;
          });
          if (deletedCookie) {
            listener(null);
          }
        };
        var _unsubscribe2 = function _unsubscribe2() {
          return window.cookieStore.removeEventListener('change', cb);
        };
        this.listenerUnsubscribes.set(listener, _unsubscribe2);
        return window.cookieStore.addEventListener('change', cb);
      }
      var lastValue = getDocumentCookie(name);
      var interval = setInterval(function () {
        var currentValue = getDocumentCookie(name);
        if (currentValue !== lastValue) {
          listener(currentValue);
          lastValue = currentValue;
        }
      }, POLLING_INTERVAL_MS);
      var unsubscribe = function unsubscribe() {
        return clearInterval(interval);
      };
      this.listenerUnsubscribes.set(listener, unsubscribe);
    }
  }, {
    key: "_removeListener",
    value: function _removeListener(_key, listener) {
      var unsubscribe = this.listenerUnsubscribes.get(listener);
      if (!unsubscribe) {
        return;
      }
      unsubscribe();
      this.listenerUnsubscribes.delete(listener);
    }
  }]);
}();
CookiePersistence.type = 'COOKIE';
/**
 * An implementation of {@link Persistence} of type `COOKIE`, for use on the client side in
 * applications leveraging hybrid rendering and middleware.
 *
 * @remarks This persistence method requires companion middleware to function, such as that provided
 * by {@link https://firebaseopensource.com/projects/firebaseextended/reactfire/ | ReactFire} for
 * NextJS.
 * @beta
 */
var browserCookiePersistence = exports.a = CookiePersistence;

/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var BrowserSessionPersistence = /*#__PURE__*/function (_BrowserPersistenceCl2) {
  function BrowserSessionPersistence() {
    _classCallCheck(this, BrowserSessionPersistence);
    return _callSuper(this, BrowserSessionPersistence, [function () {
      return window.sessionStorage;
    }, "SESSION" /* PersistenceType.SESSION */]);
  }
  _inherits(BrowserSessionPersistence, _BrowserPersistenceCl2);
  return _createClass(BrowserSessionPersistence, [{
    key: "_addListener",
    value: function _addListener(_key, _listener) {
      // Listeners are not supported for session storage since it cannot be shared across windows
      return;
    }
  }, {
    key: "_removeListener",
    value: function _removeListener(_key, _listener) {
      // Listeners are not supported for session storage since it cannot be shared across windows
      return;
    }
  }]);
}(BrowserPersistenceClass);
BrowserSessionPersistence.type = 'SESSION';
/**
 * An implementation of {@link Persistence} of `SESSION` using `sessionStorage`
 * for the underlying storage.
 *
 * @public
 */
var browserSessionPersistence = exports.c = BrowserSessionPersistence;

/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Shim for Promise.allSettled, note the slightly different format of `fulfilled` vs `status`.
 *
 * @param promises - Array of promises to wait on.
 */
function _allSettled(promises) {
  return Promise.all(promises.map(/*#__PURE__*/function () {
    var _ref22 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee64(promise) {
      var value;
      return _regeneratorRuntime().wrap(function _callee64$(_context64) {
        while (1) switch (_context64.prev = _context64.next) {
          case 0:
            _context64.prev = 0;
            _context64.next = 3;
            return promise;
          case 3:
            value = _context64.sent;
            return _context64.abrupt("return", {
              fulfilled: true,
              value: value
            });
          case 7:
            _context64.prev = 7;
            _context64.t0 = _context64["catch"](0);
            return _context64.abrupt("return", {
              fulfilled: false,
              reason: _context64.t0
            });
          case 10:
          case "end":
            return _context64.stop();
        }
      }, _callee64, null, [[0, 7]]);
    }));
    return function (_x202) {
      return _ref22.apply(this, arguments);
    };
  }()));
}

/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Interface class for receiving messages.
 *
 */
var Receiver = /*#__PURE__*/function () {
  function Receiver(eventTarget) {
    _classCallCheck(this, Receiver);
    this.eventTarget = eventTarget;
    this.handlersMap = {};
    this.boundEventHandler = this.handleEvent.bind(this);
  }
  /**
   * Obtain an instance of a Receiver for a given event target, if none exists it will be created.
   *
   * @param eventTarget - An event target (such as window or self) through which the underlying
   * messages will be received.
   */
  return _createClass(Receiver, [{
    key: "isListeningto",
    value: function isListeningto(eventTarget) {
      return this.eventTarget === eventTarget;
    }
    /**
     * Fans out a MessageEvent to the appropriate listeners.
     *
     * @remarks
     * Sends an {@link Status.ACK} upon receipt and a {@link Status.DONE} once all handlers have
     * finished processing.
     *
     * @param event - The MessageEvent.
     *
     */
  }, {
    key: "handleEvent",
    value: (function () {
      var _handleEvent = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee66(event) {
        var messageEvent, _messageEvent$data, eventId, eventType, data, handlers, promises, response;
        return _regeneratorRuntime().wrap(function _callee66$(_context66) {
          while (1) switch (_context66.prev = _context66.next) {
            case 0:
              messageEvent = event;
              _messageEvent$data = messageEvent.data, eventId = _messageEvent$data.eventId, eventType = _messageEvent$data.eventType, data = _messageEvent$data.data;
              handlers = this.handlersMap[eventType];
              if (handlers === null || handlers === void 0 ? void 0 : handlers.size) {
                _context66.next = 5;
                break;
              }
              return _context66.abrupt("return");
            case 5:
              messageEvent.ports[0].postMessage({
                status: "ack" /* _Status.ACK */,
                eventId: eventId,
                eventType: eventType
              });
              promises = Array.from(handlers).map(/*#__PURE__*/function () {
                var _ref23 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee65(handler) {
                  return _regeneratorRuntime().wrap(function _callee65$(_context65) {
                    while (1) switch (_context65.prev = _context65.next) {
                      case 0:
                        return _context65.abrupt("return", handler(messageEvent.origin, data));
                      case 1:
                      case "end":
                        return _context65.stop();
                    }
                  }, _callee65);
                }));
                return function (_x204) {
                  return _ref23.apply(this, arguments);
                };
              }());
              _context66.next = 9;
              return _allSettled(promises);
            case 9:
              response = _context66.sent;
              messageEvent.ports[0].postMessage({
                status: "done" /* _Status.DONE */,
                eventId: eventId,
                eventType: eventType,
                response: response
              });
            case 11:
            case "end":
              return _context66.stop();
          }
        }, _callee66, this);
      }));
      function handleEvent(_x203) {
        return _handleEvent.apply(this, arguments);
      }
      return handleEvent;
    }()
    /**
     * Subscribe an event handler for a particular event.
     *
     * @param eventType - Event name to subscribe to.
     * @param eventHandler - The event handler which should receive the events.
     *
     */
    )
  }, {
    key: "_subscribe",
    value: function _subscribe(eventType, eventHandler) {
      if (Object.keys(this.handlersMap).length === 0) {
        this.eventTarget.addEventListener('message', this.boundEventHandler);
      }
      if (!this.handlersMap[eventType]) {
        this.handlersMap[eventType] = new Set();
      }
      this.handlersMap[eventType].add(eventHandler);
    }
    /**
     * Unsubscribe an event handler from a particular event.
     *
     * @param eventType - Event name to unsubscribe from.
     * @param eventHandler - Optional event handler, if none provided, unsubscribe all handlers on this event.
     *
     */
  }, {
    key: "_unsubscribe",
    value: function _unsubscribe(eventType, eventHandler) {
      if (this.handlersMap[eventType] && eventHandler) {
        this.handlersMap[eventType].delete(eventHandler);
      }
      if (!eventHandler || this.handlersMap[eventType].size === 0) {
        delete this.handlersMap[eventType];
      }
      if (Object.keys(this.handlersMap).length === 0) {
        this.eventTarget.removeEventListener('message', this.boundEventHandler);
      }
    }
  }], [{
    key: "_getInstance",
    value: function _getInstance(eventTarget) {
      // The results are stored in an array since objects can't be keys for other
      // objects. In addition, setting a unique property on an event target as a
      // hash map key may not be allowed due to CORS restrictions.
      var existingInstance = this.receivers.find(function (receiver) {
        return receiver.isListeningto(eventTarget);
      });
      if (existingInstance) {
        return existingInstance;
      }
      var newInstance = new Receiver(eventTarget);
      this.receivers.push(newInstance);
      return newInstance;
    }
  }]);
}();
Receiver.receivers = [];

/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function _generateEventId() {
  var prefix = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var digits = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 10;
  var random = '';
  for (var i = 0; i < digits; i++) {
    random += Math.floor(Math.random() * 10);
  }
  return prefix + random;
}

/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Interface for sending messages and waiting for a completion response.
 *
 */
var Sender = /*#__PURE__*/function () {
  function Sender(target) {
    _classCallCheck(this, Sender);
    this.target = target;
    this.handlers = new Set();
  }
  /**
   * Unsubscribe the handler and remove it from our tracking Set.
   *
   * @param handler - The handler to unsubscribe.
   */
  return _createClass(Sender, [{
    key: "removeMessageHandler",
    value: function removeMessageHandler(handler) {
      if (handler.messageChannel) {
        handler.messageChannel.port1.removeEventListener('message', handler.onMessage);
        handler.messageChannel.port1.close();
      }
      this.handlers.delete(handler);
    }
    /**
     * Send a message to the Receiver located at {@link target}.
     *
     * @remarks
     * We'll first wait a bit for an ACK , if we get one we will wait significantly longer until the
     * receiver has had a chance to fully process the event.
     *
     * @param eventType - Type of event to send.
     * @param data - The payload of the event.
     * @param timeout - Timeout for waiting on an ACK from the receiver.
     *
     * @returns An array of settled promises from all the handlers that were listening on the receiver.
     */
  }, {
    key: "_send",
    value: (function () {
      var _send2 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee67(eventType, data) {
        var _this27 = this;
        var timeout,
          messageChannel,
          completionTimer,
          handler,
          _args67 = arguments;
        return _regeneratorRuntime().wrap(function _callee67$(_context67) {
          while (1) switch (_context67.prev = _context67.next) {
            case 0:
              timeout = _args67.length > 2 && _args67[2] !== undefined ? _args67[2] : 50;
              messageChannel = typeof MessageChannel !== 'undefined' ? new MessageChannel() : null;
              if (messageChannel) {
                _context67.next = 4;
                break;
              }
              throw new Error("connection_unavailable" /* _MessageError.CONNECTION_UNAVAILABLE */);
            case 4:
              return _context67.abrupt("return", new Promise(function (resolve, reject) {
                var eventId = _generateEventId('', 20);
                messageChannel.port1.start();
                var ackTimer = setTimeout(function () {
                  reject(new Error("unsupported_event" /* _MessageError.UNSUPPORTED_EVENT */));
                }, timeout);
                handler = {
                  messageChannel: messageChannel,
                  onMessage: function onMessage(event) {
                    var messageEvent = event;
                    if (messageEvent.data.eventId !== eventId) {
                      return;
                    }
                    switch (messageEvent.data.status) {
                      case "ack" /* _Status.ACK */:
                        // The receiver should ACK first.
                        clearTimeout(ackTimer);
                        completionTimer = setTimeout(function () {
                          reject(new Error("timeout" /* _MessageError.TIMEOUT */));
                        }, 3000 /* _TimeoutDuration.COMPLETION */);
                        break;
                      case "done" /* _Status.DONE */:
                        // Once the receiver's handlers are finished we will get the results.
                        clearTimeout(completionTimer);
                        resolve(messageEvent.data.response);
                        break;
                      default:
                        clearTimeout(ackTimer);
                        clearTimeout(completionTimer);
                        reject(new Error("invalid_response" /* _MessageError.INVALID_RESPONSE */));
                        break;
                    }
                  }
                };
                _this27.handlers.add(handler);
                messageChannel.port1.addEventListener('message', handler.onMessage);
                _this27.target.postMessage({
                  eventType: eventType,
                  eventId: eventId,
                  data: data
                }, [messageChannel.port2]);
              }).finally(function () {
                if (handler) {
                  _this27.removeMessageHandler(handler);
                }
              }));
            case 5:
            case "end":
              return _context67.stop();
          }
        }, _callee67);
      }));
      function _send(_x205, _x206) {
        return _send2.apply(this, arguments);
      }
      return _send;
    }())
  }]);
}();
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Lazy accessor for window, since the compat layer won't tree shake this out,
 * we need to make sure not to mess with window unless we have to
 */
function _window() {
  return window;
}
function _setWindowLocation(url) {
  _window().location.href = url;
}

/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function _isWorker() {
  return typeof _window()['WorkerGlobalScope'] !== 'undefined' && typeof _window()['importScripts'] === 'function';
}
function _getActiveServiceWorker() {
  return _getActiveServiceWorker2.apply(this, arguments);
}
function _getActiveServiceWorker2() {
  _getActiveServiceWorker2 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee176() {
    var registration;
    return _regeneratorRuntime().wrap(function _callee176$(_context176) {
      while (1) switch (_context176.prev = _context176.next) {
        case 0:
          if (navigator === null || navigator === void 0 ? void 0 : navigator.serviceWorker) {
            _context176.next = 2;
            break;
          }
          return _context176.abrupt("return", null);
        case 2:
          _context176.prev = 2;
          _context176.next = 5;
          return navigator.serviceWorker.ready;
        case 5:
          registration = _context176.sent;
          return _context176.abrupt("return", registration.active);
        case 9:
          _context176.prev = 9;
          _context176.t0 = _context176["catch"](2);
          return _context176.abrupt("return", null);
        case 12:
        case "end":
          return _context176.stop();
      }
    }, _callee176, null, [[2, 9]]);
  }));
  return _getActiveServiceWorker2.apply(this, arguments);
}
function _getServiceWorkerController() {
  var _a;
  return ((_a = navigator === null || navigator === void 0 ? void 0 : navigator.serviceWorker) === null || _a === void 0 ? void 0 : _a.controller) || null;
}
function _getWorkerGlobalScope() {
  return _isWorker() ? self : null;
}

/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var DB_NAME = 'firebaseLocalStorageDb';
var DB_VERSION = 1;
var DB_OBJECTSTORE_NAME = 'firebaseLocalStorage';
var DB_DATA_KEYPATH = 'fbase_key';
/**
 * Promise wrapper for IDBRequest
 *
 * Unfortunately we can't cleanly extend Promise<T> since promises are not callable in ES6
 *
 */
var DBPromise = /*#__PURE__*/function () {
  function DBPromise(request) {
    _classCallCheck(this, DBPromise);
    this.request = request;
  }
  return _createClass(DBPromise, [{
    key: "toPromise",
    value: function toPromise() {
      var _this28 = this;
      return new Promise(function (resolve, reject) {
        _this28.request.addEventListener('success', function () {
          resolve(_this28.request.result);
        });
        _this28.request.addEventListener('error', function () {
          reject(_this28.request.error);
        });
      });
    }
  }]);
}();
function getObjectStore(db, isReadWrite) {
  return db.transaction([DB_OBJECTSTORE_NAME], isReadWrite ? 'readwrite' : 'readonly').objectStore(DB_OBJECTSTORE_NAME);
}
function _deleteDatabase() {
  var request = indexedDB.deleteDatabase(DB_NAME);
  return new DBPromise(request).toPromise();
}
function _openDatabase() {
  var request = indexedDB.open(DB_NAME, DB_VERSION);
  return new Promise(function (resolve, reject) {
    request.addEventListener('error', function () {
      reject(request.error);
    });
    request.addEventListener('upgradeneeded', function () {
      var db = request.result;
      try {
        db.createObjectStore(DB_OBJECTSTORE_NAME, {
          keyPath: DB_DATA_KEYPATH
        });
      } catch (e) {
        reject(e);
      }
    });
    request.addEventListener('success', /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee68() {
      var db;
      return _regeneratorRuntime().wrap(function _callee68$(_context68) {
        while (1) switch (_context68.prev = _context68.next) {
          case 0:
            db = request.result; // Strange bug that occurs in Firefox when multiple tabs are opened at the
            // same time. The only way to recover seems to be deleting the database
            // and re-initializing it.
            // https://github.com/firebase/firebase-js-sdk/issues/634
            if (db.objectStoreNames.contains(DB_OBJECTSTORE_NAME)) {
              _context68.next = 12;
              break;
            }
            // Need to close the database or else you get a `blocked` event
            db.close();
            _context68.next = 5;
            return _deleteDatabase();
          case 5:
            _context68.t0 = resolve;
            _context68.next = 8;
            return _openDatabase();
          case 8:
            _context68.t1 = _context68.sent;
            (0, _context68.t0)(_context68.t1);
            _context68.next = 13;
            break;
          case 12:
            resolve(db);
          case 13:
          case "end":
            return _context68.stop();
        }
      }, _callee68);
    })));
  });
}
function _putObject(_x207, _x208, _x209) {
  return _putObject2.apply(this, arguments);
}
function _putObject2() {
  _putObject2 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee177(db, key, value) {
    var request;
    return _regeneratorRuntime().wrap(function _callee177$(_context177) {
      while (1) switch (_context177.prev = _context177.next) {
        case 0:
          request = getObjectStore(db, true).put(_defineProperty(_defineProperty({}, DB_DATA_KEYPATH, key), "value", value));
          return _context177.abrupt("return", new DBPromise(request).toPromise());
        case 2:
        case "end":
          return _context177.stop();
      }
    }, _callee177);
  }));
  return _putObject2.apply(this, arguments);
}
function getObject(_x210, _x211) {
  return _getObject.apply(this, arguments);
}
function _getObject() {
  _getObject = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee178(db, key) {
    var request, data;
    return _regeneratorRuntime().wrap(function _callee178$(_context178) {
      while (1) switch (_context178.prev = _context178.next) {
        case 0:
          request = getObjectStore(db, false).get(key);
          _context178.next = 3;
          return new DBPromise(request).toPromise();
        case 3:
          data = _context178.sent;
          return _context178.abrupt("return", data === undefined ? null : data.value);
        case 5:
        case "end":
          return _context178.stop();
      }
    }, _callee178);
  }));
  return _getObject.apply(this, arguments);
}
function _deleteObject(db, key) {
  var request = getObjectStore(db, true).delete(key);
  return new DBPromise(request).toPromise();
}
var _POLLING_INTERVAL_MS = 800;
var _TRANSACTION_RETRY_COUNT = 3;
var IndexedDBLocalPersistence = /*#__PURE__*/function () {
  function IndexedDBLocalPersistence() {
    _classCallCheck(this, IndexedDBLocalPersistence);
    this.type = "LOCAL" /* PersistenceType.LOCAL */;
    this._shouldAllowMigration = true;
    this.listeners = {};
    this.localCache = {};
    // setTimeout return value is platform specific
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    this.pollTimer = null;
    this.pendingWrites = 0;
    this.receiver = null;
    this.sender = null;
    this.serviceWorkerReceiverAvailable = false;
    this.activeServiceWorker = null;
    // Fire & forget the service worker registration as it may never resolve
    this._workerInitializationPromise = this.initializeServiceWorkerMessaging().then(function () {}, function () {});
  }
  return _createClass(IndexedDBLocalPersistence, [{
    key: "_openDb",
    value: function () {
      var _openDb2 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee69() {
        return _regeneratorRuntime().wrap(function _callee69$(_context69) {
          while (1) switch (_context69.prev = _context69.next) {
            case 0:
              if (!this.db) {
                _context69.next = 2;
                break;
              }
              return _context69.abrupt("return", this.db);
            case 2:
              _context69.next = 4;
              return _openDatabase();
            case 4:
              this.db = _context69.sent;
              return _context69.abrupt("return", this.db);
            case 6:
            case "end":
              return _context69.stop();
          }
        }, _callee69, this);
      }));
      function _openDb() {
        return _openDb2.apply(this, arguments);
      }
      return _openDb;
    }()
  }, {
    key: "_withRetries",
    value: function () {
      var _withRetries2 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee70(op) {
        var numAttempts, db;
        return _regeneratorRuntime().wrap(function _callee70$(_context70) {
          while (1) switch (_context70.prev = _context70.next) {
            case 0:
              numAttempts = 0;
            case 1:
              if (!true) {
                _context70.next = 18;
                break;
              }
              _context70.prev = 2;
              _context70.next = 5;
              return this._openDb();
            case 5:
              db = _context70.sent;
              _context70.next = 8;
              return op(db);
            case 8:
              return _context70.abrupt("return", _context70.sent);
            case 11:
              _context70.prev = 11;
              _context70.t0 = _context70["catch"](2);
              if (!(numAttempts++ > _TRANSACTION_RETRY_COUNT)) {
                _context70.next = 15;
                break;
              }
              throw _context70.t0;
            case 15:
              if (this.db) {
                this.db.close();
                this.db = undefined;
              }
              // TODO: consider adding exponential backoff
            case 16:
              _context70.next = 1;
              break;
            case 18:
            case "end":
              return _context70.stop();
          }
        }, _callee70, this, [[2, 11]]);
      }));
      function _withRetries(_x212) {
        return _withRetries2.apply(this, arguments);
      }
      return _withRetries;
    }()
    /**
     * IndexedDB events do not propagate from the main window to the worker context.  We rely on a
     * postMessage interface to send these events to the worker ourselves.
     */
  }, {
    key: "initializeServiceWorkerMessaging",
    value: (function () {
      var _initializeServiceWorkerMessaging = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee71() {
        return _regeneratorRuntime().wrap(function _callee71$(_context71) {
          while (1) switch (_context71.prev = _context71.next) {
            case 0:
              return _context71.abrupt("return", _isWorker() ? this.initializeReceiver() : this.initializeSender());
            case 1:
            case "end":
              return _context71.stop();
          }
        }, _callee71, this);
      }));
      function initializeServiceWorkerMessaging() {
        return _initializeServiceWorkerMessaging.apply(this, arguments);
      }
      return initializeServiceWorkerMessaging;
    }()
    /**
     * As the worker we should listen to events from the main window.
     */
    )
  }, {
    key: "initializeReceiver",
    value: (function () {
      var _initializeReceiver = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee74() {
        var _this29 = this;
        return _regeneratorRuntime().wrap(function _callee74$(_context74) {
          while (1) switch (_context74.prev = _context74.next) {
            case 0:
              this.receiver = Receiver._getInstance(_getWorkerGlobalScope());
              // Refresh from persistence if we receive a KeyChanged message.
              this.receiver._subscribe("keyChanged" /* _EventType.KEY_CHANGED */, /*#__PURE__*/function () {
                var _ref25 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee72(_origin, data) {
                  var keys;
                  return _regeneratorRuntime().wrap(function _callee72$(_context72) {
                    while (1) switch (_context72.prev = _context72.next) {
                      case 0:
                        _context72.next = 2;
                        return _this29._poll();
                      case 2:
                        keys = _context72.sent;
                        return _context72.abrupt("return", {
                          keyProcessed: keys.includes(data.key)
                        });
                      case 4:
                      case "end":
                        return _context72.stop();
                    }
                  }, _callee72);
                }));
                return function (_x213, _x214) {
                  return _ref25.apply(this, arguments);
                };
              }());
              // Let the sender know that we are listening so they give us more timeout.
              this.receiver._subscribe("ping" /* _EventType.PING */, /*#__PURE__*/function () {
                var _ref26 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee73(_origin, _data) {
                  return _regeneratorRuntime().wrap(function _callee73$(_context73) {
                    while (1) switch (_context73.prev = _context73.next) {
                      case 0:
                        return _context73.abrupt("return", ["keyChanged" /* _EventType.KEY_CHANGED */]);
                      case 1:
                      case "end":
                        return _context73.stop();
                    }
                  }, _callee73);
                }));
                return function (_x215, _x216) {
                  return _ref26.apply(this, arguments);
                };
              }());
            case 3:
            case "end":
              return _context74.stop();
          }
        }, _callee74, this);
      }));
      function initializeReceiver() {
        return _initializeReceiver.apply(this, arguments);
      }
      return initializeReceiver;
    }()
    /**
     * As the main window, we should let the worker know when keys change (set and remove).
     *
     * @remarks
     * {@link https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerContainer/ready | ServiceWorkerContainer.ready}
     * may not resolve.
     */
    )
  }, {
    key: "initializeSender",
    value: (function () {
      var _initializeSender = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee75() {
        var _a, _b, results;
        return _regeneratorRuntime().wrap(function _callee75$(_context75) {
          while (1) switch (_context75.prev = _context75.next) {
            case 0:
              _context75.next = 2;
              return _getActiveServiceWorker();
            case 2:
              this.activeServiceWorker = _context75.sent;
              if (this.activeServiceWorker) {
                _context75.next = 5;
                break;
              }
              return _context75.abrupt("return");
            case 5:
              this.sender = new Sender(this.activeServiceWorker);
              // Ping the service worker to check what events they can handle.
              _context75.next = 8;
              return this.sender._send("ping" /* _EventType.PING */, {}, 800 /* _TimeoutDuration.LONG_ACK */);
            case 8:
              results = _context75.sent;
              if (results) {
                _context75.next = 11;
                break;
              }
              return _context75.abrupt("return");
            case 11:
              if (((_a = results[0]) === null || _a === void 0 ? void 0 : _a.fulfilled) && ((_b = results[0]) === null || _b === void 0 ? void 0 : _b.value.includes("keyChanged" /* _EventType.KEY_CHANGED */))) {
                this.serviceWorkerReceiverAvailable = true;
              }
            case 12:
            case "end":
              return _context75.stop();
          }
        }, _callee75, this);
      }));
      function initializeSender() {
        return _initializeSender.apply(this, arguments);
      }
      return initializeSender;
    }()
    /**
     * Let the worker know about a changed key, the exact key doesn't technically matter since the
     * worker will just trigger a full sync anyway.
     *
     * @remarks
     * For now, we only support one service worker per page.
     *
     * @param key - Storage key which changed.
     */
    )
  }, {
    key: "notifyServiceWorker",
    value: (function () {
      var _notifyServiceWorker = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee76(key) {
        return _regeneratorRuntime().wrap(function _callee76$(_context76) {
          while (1) switch (_context76.prev = _context76.next) {
            case 0:
              if (!(!this.sender || !this.activeServiceWorker || _getServiceWorkerController() !== this.activeServiceWorker)) {
                _context76.next = 2;
                break;
              }
              return _context76.abrupt("return");
            case 2:
              _context76.prev = 2;
              _context76.next = 5;
              return this.sender._send("keyChanged" /* _EventType.KEY_CHANGED */, {
                key: key
              },
              // Use long timeout if receiver has previously responded to a ping from us.
              this.serviceWorkerReceiverAvailable ? 800 /* _TimeoutDuration.LONG_ACK */ : 50 /* _TimeoutDuration.ACK */);
            case 5:
              _context76.next = 9;
              break;
            case 7:
              _context76.prev = 7;
              _context76.t0 = _context76["catch"](2);
            case 9:
            case "end":
              return _context76.stop();
          }
        }, _callee76, this, [[2, 7]]);
      }));
      function notifyServiceWorker(_x217) {
        return _notifyServiceWorker.apply(this, arguments);
      }
      return notifyServiceWorker;
    }())
  }, {
    key: "_isAvailable",
    value: function () {
      var _isAvailable4 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee77() {
        var db;
        return _regeneratorRuntime().wrap(function _callee77$(_context77) {
          while (1) switch (_context77.prev = _context77.next) {
            case 0:
              _context77.prev = 0;
              if (indexedDB) {
                _context77.next = 3;
                break;
              }
              return _context77.abrupt("return", false);
            case 3:
              _context77.next = 5;
              return _openDatabase();
            case 5:
              db = _context77.sent;
              _context77.next = 8;
              return _putObject(db, STORAGE_AVAILABLE_KEY, '1');
            case 8:
              _context77.next = 10;
              return _deleteObject(db, STORAGE_AVAILABLE_KEY);
            case 10:
              return _context77.abrupt("return", true);
            case 13:
              _context77.prev = 13;
              _context77.t0 = _context77["catch"](0);
            case 15:
              return _context77.abrupt("return", false);
            case 16:
            case "end":
              return _context77.stop();
          }
        }, _callee77, null, [[0, 13]]);
      }));
      function _isAvailable() {
        return _isAvailable4.apply(this, arguments);
      }
      return _isAvailable;
    }()
  }, {
    key: "_withPendingWrite",
    value: function () {
      var _withPendingWrite2 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee78(write) {
        return _regeneratorRuntime().wrap(function _callee78$(_context78) {
          while (1) switch (_context78.prev = _context78.next) {
            case 0:
              this.pendingWrites++;
              _context78.prev = 1;
              _context78.next = 4;
              return write();
            case 4:
              _context78.prev = 4;
              this.pendingWrites--;
              return _context78.finish(4);
            case 7:
            case "end":
              return _context78.stop();
          }
        }, _callee78, this, [[1,, 4, 7]]);
      }));
      function _withPendingWrite(_x218) {
        return _withPendingWrite2.apply(this, arguments);
      }
      return _withPendingWrite;
    }()
  }, {
    key: "_set",
    value: function () {
      var _set5 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee80(key, value) {
        var _this30 = this;
        return _regeneratorRuntime().wrap(function _callee80$(_context80) {
          while (1) switch (_context80.prev = _context80.next) {
            case 0:
              return _context80.abrupt("return", this._withPendingWrite(/*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee79() {
                return _regeneratorRuntime().wrap(function _callee79$(_context79) {
                  while (1) switch (_context79.prev = _context79.next) {
                    case 0:
                      _context79.next = 2;
                      return _this30._withRetries(function (db) {
                        return _putObject(db, key, value);
                      });
                    case 2:
                      _this30.localCache[key] = value;
                      return _context79.abrupt("return", _this30.notifyServiceWorker(key));
                    case 4:
                    case "end":
                      return _context79.stop();
                  }
                }, _callee79);
              }))));
            case 1:
            case "end":
              return _context80.stop();
          }
        }, _callee80, this);
      }));
      function _set(_x219, _x220) {
        return _set5.apply(this, arguments);
      }
      return _set;
    }()
  }, {
    key: "_get",
    value: function () {
      var _get6 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee81(key) {
        var obj;
        return _regeneratorRuntime().wrap(function _callee81$(_context81) {
          while (1) switch (_context81.prev = _context81.next) {
            case 0:
              _context81.next = 2;
              return this._withRetries(function (db) {
                return getObject(db, key);
              });
            case 2:
              obj = _context81.sent;
              this.localCache[key] = obj;
              return _context81.abrupt("return", obj);
            case 5:
            case "end":
              return _context81.stop();
          }
        }, _callee81, this);
      }));
      function _get(_x221) {
        return _get6.apply(this, arguments);
      }
      return _get;
    }()
  }, {
    key: "_remove",
    value: function () {
      var _remove5 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee83(key) {
        var _this31 = this;
        return _regeneratorRuntime().wrap(function _callee83$(_context83) {
          while (1) switch (_context83.prev = _context83.next) {
            case 0:
              return _context83.abrupt("return", this._withPendingWrite(/*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee82() {
                return _regeneratorRuntime().wrap(function _callee82$(_context82) {
                  while (1) switch (_context82.prev = _context82.next) {
                    case 0:
                      _context82.next = 2;
                      return _this31._withRetries(function (db) {
                        return _deleteObject(db, key);
                      });
                    case 2:
                      delete _this31.localCache[key];
                      return _context82.abrupt("return", _this31.notifyServiceWorker(key));
                    case 4:
                    case "end":
                      return _context82.stop();
                  }
                }, _callee82);
              }))));
            case 1:
            case "end":
              return _context83.stop();
          }
        }, _callee83, this);
      }));
      function _remove(_x222) {
        return _remove5.apply(this, arguments);
      }
      return _remove;
    }()
  }, {
    key: "_poll",
    value: function () {
      var _poll2 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee84() {
        var result, keys, keysInResult, _iterator5, _step5, _step5$value, key, value, _i3, _Object$keys2, localKey;
        return _regeneratorRuntime().wrap(function _callee84$(_context84) {
          while (1) switch (_context84.prev = _context84.next) {
            case 0:
              _context84.next = 2;
              return this._withRetries(function (db) {
                var getAllRequest = getObjectStore(db, false).getAll();
                return new DBPromise(getAllRequest).toPromise();
              });
            case 2:
              result = _context84.sent;
              if (result) {
                _context84.next = 5;
                break;
              }
              return _context84.abrupt("return", []);
            case 5:
              if (!(this.pendingWrites !== 0)) {
                _context84.next = 7;
                break;
              }
              return _context84.abrupt("return", []);
            case 7:
              keys = [];
              keysInResult = new Set();
              if (result.length !== 0) {
                _iterator5 = _createForOfIteratorHelper(result);
                try {
                  for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
                    _step5$value = _step5.value, key = _step5$value.fbase_key, value = _step5$value.value;
                    keysInResult.add(key);
                    if (JSON.stringify(this.localCache[key]) !== JSON.stringify(value)) {
                      this.notifyListeners(key, value);
                      keys.push(key);
                    }
                  }
                } catch (err) {
                  _iterator5.e(err);
                } finally {
                  _iterator5.f();
                }
              }
              for (_i3 = 0, _Object$keys2 = Object.keys(this.localCache); _i3 < _Object$keys2.length; _i3++) {
                localKey = _Object$keys2[_i3];
                if (this.localCache[localKey] && !keysInResult.has(localKey)) {
                  // Deleted
                  this.notifyListeners(localKey, null);
                  keys.push(localKey);
                }
              }
              return _context84.abrupt("return", keys);
            case 12:
            case "end":
              return _context84.stop();
          }
        }, _callee84, this);
      }));
      function _poll() {
        return _poll2.apply(this, arguments);
      }
      return _poll;
    }()
  }, {
    key: "notifyListeners",
    value: function notifyListeners(key, newValue) {
      this.localCache[key] = newValue;
      var listeners = this.listeners[key];
      if (listeners) {
        for (var _i4 = 0, _Array$from2 = Array.from(listeners); _i4 < _Array$from2.length; _i4++) {
          var listener = _Array$from2[_i4];
          listener(newValue);
        }
      }
    }
  }, {
    key: "startPolling",
    value: function startPolling() {
      var _this32 = this;
      this.stopPolling();
      this.pollTimer = setInterval(/*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee85() {
        return _regeneratorRuntime().wrap(function _callee85$(_context85) {
          while (1) switch (_context85.prev = _context85.next) {
            case 0:
              return _context85.abrupt("return", _this32._poll());
            case 1:
            case "end":
              return _context85.stop();
          }
        }, _callee85);
      })), _POLLING_INTERVAL_MS);
    }
  }, {
    key: "stopPolling",
    value: function stopPolling() {
      if (this.pollTimer) {
        clearInterval(this.pollTimer);
        this.pollTimer = null;
      }
    }
  }, {
    key: "_addListener",
    value: function _addListener(key, listener) {
      if (Object.keys(this.listeners).length === 0) {
        this.startPolling();
      }
      if (!this.listeners[key]) {
        this.listeners[key] = new Set();
        // Populate the cache to avoid spuriously triggering on first poll.
        void this._get(key); // This can happen in the background async and we can return immediately.
      }
      this.listeners[key].add(listener);
    }
  }, {
    key: "_removeListener",
    value: function _removeListener(key, listener) {
      if (this.listeners[key]) {
        this.listeners[key].delete(listener);
        if (this.listeners[key].size === 0) {
          delete this.listeners[key];
        }
      }
      if (Object.keys(this.listeners).length === 0) {
        this.stopPolling();
      }
    }
  }]);
}();
IndexedDBLocalPersistence.type = 'LOCAL';
/**
 * An implementation of {@link Persistence} of type `LOCAL` using `indexedDB`
 * for the underlying storage.
 *
 * @public
 */
var indexedDBLocalPersistence = exports.i = IndexedDBLocalPersistence;

/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function startSignInPhoneMfa(auth, request) {
  return _performApiRequest(auth, "POST" /* HttpMethod.POST */, "/v2/accounts/mfaSignIn:start" /* Endpoint.START_MFA_SIGN_IN */, _addTidIfNecessary(auth, request));
}
function finalizeSignInPhoneMfa(auth, request) {
  return _performApiRequest(auth, "POST" /* HttpMethod.POST */, "/v2/accounts/mfaSignIn:finalize" /* Endpoint.FINALIZE_MFA_SIGN_IN */, _addTidIfNecessary(auth, request));
}
function finalizeSignInTotpMfa(auth, request) {
  return _performApiRequest(auth, "POST" /* HttpMethod.POST */, "/v2/accounts/mfaSignIn:finalize" /* Endpoint.FINALIZE_MFA_SIGN_IN */, _addTidIfNecessary(auth, request));
}

/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
// ReCaptcha will load using the same callback, so the callback function needs
// to be kept around
var _JSLOAD_CALLBACK = _generateCallbackName('rcb');
var NETWORK_TIMEOUT_DELAY = new Delay(30000, 60000);
/**
 * Loader for the GReCaptcha library. There should only ever be one of this.
 */
var ReCaptchaLoaderImpl = /*#__PURE__*/function () {
  function ReCaptchaLoaderImpl() {
    _classCallCheck(this, ReCaptchaLoaderImpl);
    var _a;
    this.hostLanguage = '';
    this.counter = 0;
    /**
     * Check for `render()` method. `window.grecaptcha` will exist if the Enterprise
     * version of the ReCAPTCHA script was loaded by someone else (e.g. App Check) but
     * `window.grecaptcha.render()` will not. Another load will add it.
     */
    this.librarySeparatelyLoaded = !!((_a = _window().grecaptcha) === null || _a === void 0 ? void 0 : _a.render);
  }
  return _createClass(ReCaptchaLoaderImpl, [{
    key: "load",
    value: function load(auth) {
      var _this33 = this;
      var hl = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
      _assert(isHostLanguageValid(hl), auth, "argument-error" /* AuthErrorCode.ARGUMENT_ERROR */);
      if (this.shouldResolveImmediately(hl) && isV2(_window().grecaptcha)) {
        return Promise.resolve(_window().grecaptcha);
      }
      return new Promise(function (resolve, reject) {
        var networkTimeout = _window().setTimeout(function () {
          reject(_createError(auth, "network-request-failed" /* AuthErrorCode.NETWORK_REQUEST_FAILED */));
        }, NETWORK_TIMEOUT_DELAY.get());
        _window()[_JSLOAD_CALLBACK] = function () {
          _window().clearTimeout(networkTimeout);
          delete _window()[_JSLOAD_CALLBACK];
          var recaptcha = _window().grecaptcha;
          if (!recaptcha || !isV2(recaptcha)) {
            reject(_createError(auth, "internal-error" /* AuthErrorCode.INTERNAL_ERROR */));
            return;
          }
          // Wrap the recaptcha render function so that we know if the developer has
          // called it separately
          var render = recaptcha.render;
          recaptcha.render = function (container, params) {
            var widgetId = render(container, params);
            _this33.counter++;
            return widgetId;
          };
          _this33.hostLanguage = hl;
          resolve(recaptcha);
        };
        var url = "".concat(_recaptchaV2ScriptUrl(), "?").concat((0, _util.querystring)({
          onload: _JSLOAD_CALLBACK,
          render: 'explicit',
          hl: hl
        }));
        _loadJS(url).catch(function () {
          clearTimeout(networkTimeout);
          reject(_createError(auth, "internal-error" /* AuthErrorCode.INTERNAL_ERROR */));
        });
      });
    }
  }, {
    key: "clearedOneInstance",
    value: function clearedOneInstance() {
      this.counter--;
    }
  }, {
    key: "shouldResolveImmediately",
    value: function shouldResolveImmediately(hl) {
      var _a;
      // We can resolve immediately if:
      //   • grecaptcha is already defined AND (
      //     1. the requested language codes are the same OR
      //     2. there exists already a ReCaptcha on the page
      //     3. the library was already loaded by the app
      // In cases (2) and (3), we _can't_ reload as it would break the recaptchas
      // that are already in the page
      return !!((_a = _window().grecaptcha) === null || _a === void 0 ? void 0 : _a.render) && (hl === this.hostLanguage || this.counter > 0 || this.librarySeparatelyLoaded);
    }
  }]);
}();
function isHostLanguageValid(hl) {
  return hl.length <= 6 && /^\s*[a-zA-Z0-9\-]*\s*$/.test(hl);
}
var MockReCaptchaLoaderImpl = /*#__PURE__*/function () {
  function MockReCaptchaLoaderImpl() {
    _classCallCheck(this, MockReCaptchaLoaderImpl);
  }
  return _createClass(MockReCaptchaLoaderImpl, [{
    key: "load",
    value: function () {
      var _load = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee86(auth) {
        return _regeneratorRuntime().wrap(function _callee86$(_context86) {
          while (1) switch (_context86.prev = _context86.next) {
            case 0:
              return _context86.abrupt("return", new MockReCaptcha(auth));
            case 1:
            case "end":
              return _context86.stop();
          }
        }, _callee86);
      }));
      function load(_x223) {
        return _load.apply(this, arguments);
      }
      return load;
    }()
  }, {
    key: "clearedOneInstance",
    value: function clearedOneInstance() {}
  }]);
}();
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var RECAPTCHA_VERIFIER_TYPE = 'recaptcha';
var DEFAULT_PARAMS = {
  theme: 'light',
  type: 'image'
};
/**
 * An {@link https://www.google.com/recaptcha/ | reCAPTCHA}-based application verifier.
 *
 * @remarks
 * `RecaptchaVerifier` does not work in a Node.js environment.
 *
 * @public
 */
var RecaptchaVerifier = exports.R = /*#__PURE__*/function () {
  /**
   * @param authExtern - The corresponding Firebase {@link Auth} instance.
   *
   * @param containerOrId - The reCAPTCHA container parameter.
   *
   * @remarks
   * This has different meaning depending on whether the reCAPTCHA is hidden or visible. For a
   * visible reCAPTCHA the container must be empty. If a string is used, it has to correspond to
   * an element ID. The corresponding element must also must be in the DOM at the time of
   * initialization.
   *
   * @param parameters - The optional reCAPTCHA parameters.
   *
   * @remarks
   * Check the reCAPTCHA docs for a comprehensive list. All parameters are accepted except for
   * the sitekey. Firebase Auth backend provisions a reCAPTCHA for each project and will
   * configure this upon rendering. For an invisible reCAPTCHA, a size key must have the value
   * 'invisible'.
   */
  function RecaptchaVerifier(authExtern, containerOrId) {
    var parameters = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : Object.assign({}, DEFAULT_PARAMS);
    _classCallCheck(this, RecaptchaVerifier);
    this.parameters = parameters;
    /**
     * The application verifier type.
     *
     * @remarks
     * For a reCAPTCHA verifier, this is 'recaptcha'.
     */
    this.type = RECAPTCHA_VERIFIER_TYPE;
    this.destroyed = false;
    this.widgetId = null;
    this.tokenChangeListeners = new Set();
    this.renderPromise = null;
    this.recaptcha = null;
    this.auth = _castAuth(authExtern);
    this.isInvisible = this.parameters.size === 'invisible';
    _assert(typeof document !== 'undefined', this.auth, "operation-not-supported-in-this-environment" /* AuthErrorCode.OPERATION_NOT_SUPPORTED */);
    var container = typeof containerOrId === 'string' ? document.getElementById(containerOrId) : containerOrId;
    _assert(container, this.auth, "argument-error" /* AuthErrorCode.ARGUMENT_ERROR */);
    this.container = container;
    this.parameters.callback = this.makeTokenCallback(this.parameters.callback);
    this._recaptchaLoader = this.auth.settings.appVerificationDisabledForTesting ? new MockReCaptchaLoaderImpl() : new ReCaptchaLoaderImpl();
    this.validateStartingState();
    // TODO: Figure out if sdk version is needed
  }
  /**
   * Waits for the user to solve the reCAPTCHA and resolves with the reCAPTCHA token.
   *
   * @returns A Promise for the reCAPTCHA token.
   */
  return _createClass(RecaptchaVerifier, [{
    key: "verify",
    value: (function () {
      var _verify2 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee87() {
        var _this34 = this;
        var id, recaptcha, response;
        return _regeneratorRuntime().wrap(function _callee87$(_context87) {
          while (1) switch (_context87.prev = _context87.next) {
            case 0:
              this.assertNotDestroyed();
              _context87.next = 3;
              return this.render();
            case 3:
              id = _context87.sent;
              recaptcha = this.getAssertedRecaptcha();
              response = recaptcha.getResponse(id);
              if (!response) {
                _context87.next = 8;
                break;
              }
              return _context87.abrupt("return", response);
            case 8:
              return _context87.abrupt("return", new Promise(function (resolve) {
                var _tokenChange = function tokenChange(token) {
                  if (!token) {
                    return; // Ignore token expirations.
                  }
                  _this34.tokenChangeListeners.delete(_tokenChange);
                  resolve(token);
                };
                _this34.tokenChangeListeners.add(_tokenChange);
                if (_this34.isInvisible) {
                  recaptcha.execute(id);
                }
              }));
            case 9:
            case "end":
              return _context87.stop();
          }
        }, _callee87, this);
      }));
      function verify() {
        return _verify2.apply(this, arguments);
      }
      return verify;
    }()
    /**
     * Renders the reCAPTCHA widget on the page.
     *
     * @returns A Promise that resolves with the reCAPTCHA widget ID.
     */
    )
  }, {
    key: "render",
    value: function render() {
      var _this35 = this;
      try {
        this.assertNotDestroyed();
      } catch (e) {
        // This method returns a promise. Since it's not async (we want to return the
        // _same_ promise if rendering is still occurring), the API surface should
        // reject with the error rather than just throw
        return Promise.reject(e);
      }
      if (this.renderPromise) {
        return this.renderPromise;
      }
      this.renderPromise = this.makeRenderPromise().catch(function (e) {
        _this35.renderPromise = null;
        throw e;
      });
      return this.renderPromise;
    }
    /** @internal */
  }, {
    key: "_reset",
    value: function _reset() {
      this.assertNotDestroyed();
      if (this.widgetId !== null) {
        this.getAssertedRecaptcha().reset(this.widgetId);
      }
    }
    /**
     * Clears the reCAPTCHA widget from the page and destroys the instance.
     */
  }, {
    key: "clear",
    value: function clear() {
      var _this36 = this;
      this.assertNotDestroyed();
      this.destroyed = true;
      this._recaptchaLoader.clearedOneInstance();
      if (!this.isInvisible) {
        this.container.childNodes.forEach(function (node) {
          _this36.container.removeChild(node);
        });
      }
    }
  }, {
    key: "validateStartingState",
    value: function validateStartingState() {
      _assert(!this.parameters.sitekey, this.auth, "argument-error" /* AuthErrorCode.ARGUMENT_ERROR */);
      _assert(this.isInvisible || !this.container.hasChildNodes(), this.auth, "argument-error" /* AuthErrorCode.ARGUMENT_ERROR */);
      _assert(typeof document !== 'undefined', this.auth, "operation-not-supported-in-this-environment" /* AuthErrorCode.OPERATION_NOT_SUPPORTED */);
    }
  }, {
    key: "makeTokenCallback",
    value: function makeTokenCallback(existing) {
      var _this37 = this;
      return function (token) {
        _this37.tokenChangeListeners.forEach(function (listener) {
          return listener(token);
        });
        if (typeof existing === 'function') {
          existing(token);
        } else if (typeof existing === 'string') {
          var globalFunc = _window()[existing];
          if (typeof globalFunc === 'function') {
            globalFunc(token);
          }
        }
      };
    }
  }, {
    key: "assertNotDestroyed",
    value: function assertNotDestroyed() {
      _assert(!this.destroyed, this.auth, "internal-error" /* AuthErrorCode.INTERNAL_ERROR */);
    }
  }, {
    key: "makeRenderPromise",
    value: function () {
      var _makeRenderPromise = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee88() {
        var container, guaranteedEmpty;
        return _regeneratorRuntime().wrap(function _callee88$(_context88) {
          while (1) switch (_context88.prev = _context88.next) {
            case 0:
              _context88.next = 2;
              return this.init();
            case 2:
              if (!this.widgetId) {
                container = this.container;
                if (!this.isInvisible) {
                  guaranteedEmpty = document.createElement('div');
                  container.appendChild(guaranteedEmpty);
                  container = guaranteedEmpty;
                }
                this.widgetId = this.getAssertedRecaptcha().render(container, this.parameters);
              }
              return _context88.abrupt("return", this.widgetId);
            case 4:
            case "end":
              return _context88.stop();
          }
        }, _callee88, this);
      }));
      function makeRenderPromise() {
        return _makeRenderPromise.apply(this, arguments);
      }
      return makeRenderPromise;
    }()
  }, {
    key: "init",
    value: function () {
      var _init = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee89() {
        var siteKey;
        return _regeneratorRuntime().wrap(function _callee89$(_context89) {
          while (1) switch (_context89.prev = _context89.next) {
            case 0:
              _assert(_isHttpOrHttps() && !_isWorker(), this.auth, "internal-error" /* AuthErrorCode.INTERNAL_ERROR */);
              _context89.next = 3;
              return domReady();
            case 3:
              _context89.next = 5;
              return this._recaptchaLoader.load(this.auth, this.auth.languageCode || undefined);
            case 5:
              this.recaptcha = _context89.sent;
              _context89.next = 8;
              return getRecaptchaParams(this.auth);
            case 8:
              siteKey = _context89.sent;
              _assert(siteKey, this.auth, "internal-error" /* AuthErrorCode.INTERNAL_ERROR */);
              this.parameters.sitekey = siteKey;
            case 11:
            case "end":
              return _context89.stop();
          }
        }, _callee89, this);
      }));
      function init() {
        return _init.apply(this, arguments);
      }
      return init;
    }()
  }, {
    key: "getAssertedRecaptcha",
    value: function getAssertedRecaptcha() {
      _assert(this.recaptcha, this.auth, "internal-error" /* AuthErrorCode.INTERNAL_ERROR */);
      return this.recaptcha;
    }
  }]);
}();
function domReady() {
  var resolver = null;
  return new Promise(function (resolve) {
    if (document.readyState === 'complete') {
      resolve();
      return;
    }
    // Document not ready, wait for load before resolving.
    // Save resolver, so we can remove listener in case it was externally
    // cancelled.
    resolver = function resolver() {
      return resolve();
    };
    window.addEventListener('load', resolver);
  }).catch(function (e) {
    if (resolver) {
      window.removeEventListener('load', resolver);
    }
    throw e;
  });
}

/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var ConfirmationResultImpl = /*#__PURE__*/function () {
  function ConfirmationResultImpl(verificationId, onConfirmation) {
    _classCallCheck(this, ConfirmationResultImpl);
    this.verificationId = verificationId;
    this.onConfirmation = onConfirmation;
  }
  return _createClass(ConfirmationResultImpl, [{
    key: "confirm",
    value: function confirm(verificationCode) {
      var authCredential = PhoneAuthCredential._fromVerification(this.verificationId, verificationCode);
      return this.onConfirmation(authCredential);
    }
  }]);
}();
/**
 * Asynchronously signs in using a phone number.
 *
 * @remarks
 * This method sends a code via SMS to the given
 * phone number, and returns a {@link ConfirmationResult}. After the user
 * provides the code sent to their phone, call {@link ConfirmationResult.confirm}
 * with the code to sign the user in.
 *
 * For abuse prevention, this method requires a {@link ApplicationVerifier}.
 * This SDK includes an implementation based on reCAPTCHA v2, {@link RecaptchaVerifier}.
 * This function can work on other platforms that do not support the
 * {@link RecaptchaVerifier} (like React Native), but you need to use a
 * third-party {@link ApplicationVerifier} implementation.
 *
 * If you've enabled project-level reCAPTCHA Enterprise bot protection in
 * Enforce mode, you can omit the {@link ApplicationVerifier}.
 *
 * This method does not work in a Node.js environment or with {@link Auth} instances created with a
 * {@link @firebase/app#FirebaseServerApp}.
 *
 * @example
 * ```javascript
 * // 'recaptcha-container' is the ID of an element in the DOM.
 * const applicationVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container');
 * const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, applicationVerifier);
 * // Obtain a verificationCode from the user.
 * const credential = await confirmationResult.confirm(verificationCode);
 * ```
 *
 * @param auth - The {@link Auth} instance.
 * @param phoneNumber - The user's phone number in E.164 format (e.g. +16505550101).
 * @param appVerifier - The {@link ApplicationVerifier}.
 *
 * @public
 */
function signInWithPhoneNumber(_x224, _x225, _x226) {
  return _signInWithPhoneNumber.apply(this, arguments);
}
/**
 * Links the user account with the given phone number.
 *
 * @remarks
 * This method does not work in a Node.js environment.
 *
 * @param user - The user.
 * @param phoneNumber - The user's phone number in E.164 format (e.g. +16505550101).
 * @param appVerifier - The {@link ApplicationVerifier}.
 *
 * @public
 */
function _signInWithPhoneNumber() {
  _signInWithPhoneNumber = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee179(auth, phoneNumber, appVerifier) {
    var authInternal, verificationId;
    return _regeneratorRuntime().wrap(function _callee179$(_context179) {
      while (1) switch (_context179.prev = _context179.next) {
        case 0:
          if (!(0, _app._isFirebaseServerApp)(auth.app)) {
            _context179.next = 2;
            break;
          }
          return _context179.abrupt("return", Promise.reject(_serverAppCurrentUserOperationNotSupportedError(auth)));
        case 2:
          authInternal = _castAuth(auth);
          _context179.next = 5;
          return _verifyPhoneNumber(authInternal, phoneNumber, (0, _util.getModularInstance)(appVerifier));
        case 5:
          verificationId = _context179.sent;
          return _context179.abrupt("return", new ConfirmationResultImpl(verificationId, function (cred) {
            return signInWithCredential(authInternal, cred);
          }));
        case 7:
        case "end":
          return _context179.stop();
      }
    }, _callee179);
  }));
  return _signInWithPhoneNumber.apply(this, arguments);
}
function linkWithPhoneNumber(_x227, _x228, _x229) {
  return _linkWithPhoneNumber.apply(this, arguments);
}
/**
 * Re-authenticates a user using a fresh phone credential.
 *
 * @remarks
 * Use before operations such as {@link updatePassword} that require tokens from recent sign-in attempts.
 *
 * This method does not work in a Node.js environment or on any {@link User} signed in by
 * {@link Auth} instances created with a {@link @firebase/app#FirebaseServerApp}.
 *
 * @param user - The user.
 * @param phoneNumber - The user's phone number in E.164 format (e.g. +16505550101).
 * @param appVerifier - The {@link ApplicationVerifier}.
 *
 * @public
 */
function _linkWithPhoneNumber() {
  _linkWithPhoneNumber = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee180(user, phoneNumber, appVerifier) {
    var userInternal, verificationId;
    return _regeneratorRuntime().wrap(function _callee180$(_context180) {
      while (1) switch (_context180.prev = _context180.next) {
        case 0:
          userInternal = (0, _util.getModularInstance)(user);
          _context180.next = 3;
          return _assertLinkedStatus(false, userInternal, "phone" /* ProviderId.PHONE */);
        case 3:
          _context180.next = 5;
          return _verifyPhoneNumber(userInternal.auth, phoneNumber, (0, _util.getModularInstance)(appVerifier));
        case 5:
          verificationId = _context180.sent;
          return _context180.abrupt("return", new ConfirmationResultImpl(verificationId, function (cred) {
            return linkWithCredential(userInternal, cred);
          }));
        case 7:
        case "end":
          return _context180.stop();
      }
    }, _callee180);
  }));
  return _linkWithPhoneNumber.apply(this, arguments);
}
function reauthenticateWithPhoneNumber(_x230, _x231, _x232) {
  return _reauthenticateWithPhoneNumber.apply(this, arguments);
}
/**
 * Returns a verification ID to be used in conjunction with the SMS code that is sent.
 *
 */
function _reauthenticateWithPhoneNumber() {
  _reauthenticateWithPhoneNumber = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee181(user, phoneNumber, appVerifier) {
    var userInternal, verificationId;
    return _regeneratorRuntime().wrap(function _callee181$(_context181) {
      while (1) switch (_context181.prev = _context181.next) {
        case 0:
          userInternal = (0, _util.getModularInstance)(user);
          if (!(0, _app._isFirebaseServerApp)(userInternal.auth.app)) {
            _context181.next = 3;
            break;
          }
          return _context181.abrupt("return", Promise.reject(_serverAppCurrentUserOperationNotSupportedError(userInternal.auth)));
        case 3:
          _context181.next = 5;
          return _verifyPhoneNumber(userInternal.auth, phoneNumber, (0, _util.getModularInstance)(appVerifier));
        case 5:
          verificationId = _context181.sent;
          return _context181.abrupt("return", new ConfirmationResultImpl(verificationId, function (cred) {
            return reauthenticateWithCredential(userInternal, cred);
          }));
        case 7:
        case "end":
          return _context181.stop();
      }
    }, _callee181);
  }));
  return _reauthenticateWithPhoneNumber.apply(this, arguments);
}
function _verifyPhoneNumber(_x233, _x234, _x235) {
  return _verifyPhoneNumber2.apply(this, arguments);
}
/**
 * Updates the user's phone number.
 *
 * @remarks
 * This method does not work in a Node.js environment or on any {@link User} signed in by
 * {@link Auth} instances created with a {@link @firebase/app#FirebaseServerApp}.
 *
 * @example
 * ```
 * // 'recaptcha-container' is the ID of an element in the DOM.
 * const applicationVerifier = new RecaptchaVerifier('recaptcha-container');
 * const provider = new PhoneAuthProvider(auth);
 * const verificationId = await provider.verifyPhoneNumber('+16505550101', applicationVerifier);
 * // Obtain the verificationCode from the user.
 * const phoneCredential = PhoneAuthProvider.credential(verificationId, verificationCode);
 * await updatePhoneNumber(user, phoneCredential);
 * ```
 *
 * @param user - The user.
 * @param credential - A credential authenticating the new phone number.
 *
 * @public
 */
function _verifyPhoneNumber2() {
  _verifyPhoneNumber2 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee185(auth, options, verifier) {
    var _a, phoneInfoOptions, session, startPhoneMfaEnrollmentRequest, startEnrollPhoneMfaActionCallback, startPhoneMfaEnrollmentResponse, response, mfaEnrollmentId, startPhoneMfaSignInRequest, startSignInPhoneMfaActionCallback, startPhoneMfaSignInResponse, _response, sendPhoneVerificationCodeRequest, sendPhoneVerificationCodeActionCallback, sendPhoneVerificationCodeResponse, _response2;
    return _regeneratorRuntime().wrap(function _callee185$(_context185) {
      while (1) switch (_context185.prev = _context185.next) {
        case 0:
          if (auth._getRecaptchaConfig()) {
            _context185.next = 9;
            break;
          }
          _context185.prev = 1;
          _context185.next = 4;
          return _initializeRecaptchaConfig(auth);
        case 4:
          _context185.next = 9;
          break;
        case 6:
          _context185.prev = 6;
          _context185.t0 = _context185["catch"](1);
          // If an error occurs while fetching the config, there is no way to know the enablement state
          // of Phone provider, so we proceed with recaptcha V2 verification.
          // The error is likely "recaptchaKey undefined", as reCAPTCHA Enterprise is not
          // enabled for any provider.
          console.log('Failed to initialize reCAPTCHA Enterprise config. Triggering the reCAPTCHA v2 verification.');
        case 9:
          _context185.prev = 9;
          if (typeof options === 'string') {
            phoneInfoOptions = {
              phoneNumber: options
            };
          } else {
            phoneInfoOptions = options;
          }
          if (!('session' in phoneInfoOptions)) {
            _context185.next = 36;
            break;
          }
          session = phoneInfoOptions.session;
          if (!('phoneNumber' in phoneInfoOptions)) {
            _context185.next = 24;
            break;
          }
          _assert(session.type === "enroll" /* MultiFactorSessionType.ENROLL */, auth, "internal-error" /* AuthErrorCode.INTERNAL_ERROR */);
          startPhoneMfaEnrollmentRequest = {
            idToken: session.credential,
            phoneEnrollmentInfo: {
              phoneNumber: phoneInfoOptions.phoneNumber,
              clientType: "CLIENT_TYPE_WEB" /* RecaptchaClientType.WEB */
            }
          };
          startEnrollPhoneMfaActionCallback = /*#__PURE__*/function () {
            var _ref44 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee182(authInstance, request) {
              var requestWithRecaptchaV2;
              return _regeneratorRuntime().wrap(function _callee182$(_context182) {
                while (1) switch (_context182.prev = _context182.next) {
                  case 0:
                    if (!(request.phoneEnrollmentInfo.captchaResponse === FAKE_TOKEN)) {
                      _context182.next = 6;
                      break;
                    }
                    _assert((verifier === null || verifier === void 0 ? void 0 : verifier.type) === RECAPTCHA_VERIFIER_TYPE, authInstance, "argument-error" /* AuthErrorCode.ARGUMENT_ERROR */);
                    _context182.next = 4;
                    return injectRecaptchaV2Token(authInstance, request, verifier);
                  case 4:
                    requestWithRecaptchaV2 = _context182.sent;
                    return _context182.abrupt("return", startEnrollPhoneMfa(authInstance, requestWithRecaptchaV2));
                  case 6:
                    return _context182.abrupt("return", startEnrollPhoneMfa(authInstance, request));
                  case 7:
                  case "end":
                    return _context182.stop();
                }
              }, _callee182);
            }));
            return function startEnrollPhoneMfaActionCallback(_x302, _x303) {
              return _ref44.apply(this, arguments);
            };
          }();
          startPhoneMfaEnrollmentResponse = handleRecaptchaFlow(auth, startPhoneMfaEnrollmentRequest, "mfaSmsEnrollment" /* RecaptchaActionName.MFA_SMS_ENROLLMENT */, startEnrollPhoneMfaActionCallback, "PHONE_PROVIDER" /* RecaptchaAuthProvider.PHONE_PROVIDER */);
          _context185.next = 20;
          return startPhoneMfaEnrollmentResponse.catch(function (error) {
            return Promise.reject(error);
          });
        case 20:
          response = _context185.sent;
          return _context185.abrupt("return", response.phoneSessionInfo.sessionInfo);
        case 24:
          _assert(session.type === "signin" /* MultiFactorSessionType.SIGN_IN */, auth, "internal-error" /* AuthErrorCode.INTERNAL_ERROR */);
          mfaEnrollmentId = ((_a = phoneInfoOptions.multiFactorHint) === null || _a === void 0 ? void 0 : _a.uid) || phoneInfoOptions.multiFactorUid;
          _assert(mfaEnrollmentId, auth, "missing-multi-factor-info" /* AuthErrorCode.MISSING_MFA_INFO */);
          startPhoneMfaSignInRequest = {
            mfaPendingCredential: session.credential,
            mfaEnrollmentId: mfaEnrollmentId,
            phoneSignInInfo: {
              clientType: "CLIENT_TYPE_WEB" /* RecaptchaClientType.WEB */
            }
          };
          startSignInPhoneMfaActionCallback = /*#__PURE__*/function () {
            var _ref45 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee183(authInstance, request) {
              var requestWithRecaptchaV2;
              return _regeneratorRuntime().wrap(function _callee183$(_context183) {
                while (1) switch (_context183.prev = _context183.next) {
                  case 0:
                    if (!(request.phoneSignInInfo.captchaResponse === FAKE_TOKEN)) {
                      _context183.next = 6;
                      break;
                    }
                    _assert((verifier === null || verifier === void 0 ? void 0 : verifier.type) === RECAPTCHA_VERIFIER_TYPE, authInstance, "argument-error" /* AuthErrorCode.ARGUMENT_ERROR */);
                    _context183.next = 4;
                    return injectRecaptchaV2Token(authInstance, request, verifier);
                  case 4:
                    requestWithRecaptchaV2 = _context183.sent;
                    return _context183.abrupt("return", startSignInPhoneMfa(authInstance, requestWithRecaptchaV2));
                  case 6:
                    return _context183.abrupt("return", startSignInPhoneMfa(authInstance, request));
                  case 7:
                  case "end":
                    return _context183.stop();
                }
              }, _callee183);
            }));
            return function startSignInPhoneMfaActionCallback(_x304, _x305) {
              return _ref45.apply(this, arguments);
            };
          }();
          startPhoneMfaSignInResponse = handleRecaptchaFlow(auth, startPhoneMfaSignInRequest, "mfaSmsSignIn" /* RecaptchaActionName.MFA_SMS_SIGNIN */, startSignInPhoneMfaActionCallback, "PHONE_PROVIDER" /* RecaptchaAuthProvider.PHONE_PROVIDER */);
          _context185.next = 32;
          return startPhoneMfaSignInResponse.catch(function (error) {
            return Promise.reject(error);
          });
        case 32:
          _response = _context185.sent;
          return _context185.abrupt("return", _response.phoneResponseInfo.sessionInfo);
        case 34:
          _context185.next = 43;
          break;
        case 36:
          sendPhoneVerificationCodeRequest = {
            phoneNumber: phoneInfoOptions.phoneNumber,
            clientType: "CLIENT_TYPE_WEB" /* RecaptchaClientType.WEB */
          };
          sendPhoneVerificationCodeActionCallback = /*#__PURE__*/function () {
            var _ref46 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee184(authInstance, request) {
              var requestWithRecaptchaV2;
              return _regeneratorRuntime().wrap(function _callee184$(_context184) {
                while (1) switch (_context184.prev = _context184.next) {
                  case 0:
                    if (!(request.captchaResponse === FAKE_TOKEN)) {
                      _context184.next = 6;
                      break;
                    }
                    _assert((verifier === null || verifier === void 0 ? void 0 : verifier.type) === RECAPTCHA_VERIFIER_TYPE, authInstance, "argument-error" /* AuthErrorCode.ARGUMENT_ERROR */);
                    _context184.next = 4;
                    return injectRecaptchaV2Token(authInstance, request, verifier);
                  case 4:
                    requestWithRecaptchaV2 = _context184.sent;
                    return _context184.abrupt("return", sendPhoneVerificationCode(authInstance, requestWithRecaptchaV2));
                  case 6:
                    return _context184.abrupt("return", sendPhoneVerificationCode(authInstance, request));
                  case 7:
                  case "end":
                    return _context184.stop();
                }
              }, _callee184);
            }));
            return function sendPhoneVerificationCodeActionCallback(_x306, _x307) {
              return _ref46.apply(this, arguments);
            };
          }();
          sendPhoneVerificationCodeResponse = handleRecaptchaFlow(auth, sendPhoneVerificationCodeRequest, "sendVerificationCode" /* RecaptchaActionName.SEND_VERIFICATION_CODE */, sendPhoneVerificationCodeActionCallback, "PHONE_PROVIDER" /* RecaptchaAuthProvider.PHONE_PROVIDER */);
          _context185.next = 41;
          return sendPhoneVerificationCodeResponse.catch(function (error) {
            return Promise.reject(error);
          });
        case 41:
          _response2 = _context185.sent;
          return _context185.abrupt("return", _response2.sessionInfo);
        case 43:
          _context185.prev = 43;
          verifier === null || verifier === void 0 ? void 0 : verifier._reset();
          return _context185.finish(43);
        case 46:
        case "end":
          return _context185.stop();
      }
    }, _callee185, null, [[1, 6], [9,, 43, 46]]);
  }));
  return _verifyPhoneNumber2.apply(this, arguments);
}
function updatePhoneNumber(_x236, _x237) {
  return _updatePhoneNumber.apply(this, arguments);
} // Helper function that fetches and injects a reCAPTCHA v2 token into the request.
function _updatePhoneNumber() {
  _updatePhoneNumber = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee186(user, credential) {
    var userInternal;
    return _regeneratorRuntime().wrap(function _callee186$(_context186) {
      while (1) switch (_context186.prev = _context186.next) {
        case 0:
          userInternal = (0, _util.getModularInstance)(user);
          if (!(0, _app._isFirebaseServerApp)(userInternal.auth.app)) {
            _context186.next = 3;
            break;
          }
          return _context186.abrupt("return", Promise.reject(_serverAppCurrentUserOperationNotSupportedError(userInternal.auth)));
        case 3:
          _context186.next = 5;
          return _link$1(userInternal, credential);
        case 5:
        case "end":
          return _context186.stop();
      }
    }, _callee186);
  }));
  return _updatePhoneNumber.apply(this, arguments);
}
function injectRecaptchaV2Token(_x238, _x239, _x240) {
  return _injectRecaptchaV2Token.apply(this, arguments);
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Provider for generating an {@link PhoneAuthCredential}.
 *
 * @remarks
 * `PhoneAuthProvider` does not work in a Node.js environment.
 *
 * @example
 * ```javascript
 * // 'recaptcha-container' is the ID of an element in the DOM.
 * const applicationVerifier = new RecaptchaVerifier('recaptcha-container');
 * const provider = new PhoneAuthProvider(auth);
 * const verificationId = await provider.verifyPhoneNumber('+16505550101', applicationVerifier);
 * // Obtain the verificationCode from the user.
 * const phoneCredential = PhoneAuthProvider.credential(verificationId, verificationCode);
 * const userCredential = await signInWithCredential(auth, phoneCredential);
 * ```
 *
 * @public
 */
function _injectRecaptchaV2Token() {
  _injectRecaptchaV2Token = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee187(auth, request, recaptchaV2Verifier) {
    var recaptchaV2Token, newRequest, phoneNumber, captchaResponse, clientType, recaptchaVersion, _captchaResponse, _clientType, _recaptchaVersion;
    return _regeneratorRuntime().wrap(function _callee187$(_context187) {
      while (1) switch (_context187.prev = _context187.next) {
        case 0:
          _assert(recaptchaV2Verifier.type === RECAPTCHA_VERIFIER_TYPE, auth, "argument-error" /* AuthErrorCode.ARGUMENT_ERROR */);
          _context187.next = 3;
          return recaptchaV2Verifier.verify();
        case 3:
          recaptchaV2Token = _context187.sent;
          _assert(typeof recaptchaV2Token === 'string', auth, "argument-error" /* AuthErrorCode.ARGUMENT_ERROR */);
          newRequest = Object.assign({}, request);
          if (!('phoneEnrollmentInfo' in newRequest)) {
            _context187.next = 15;
            break;
          }
          phoneNumber = newRequest.phoneEnrollmentInfo.phoneNumber;
          captchaResponse = newRequest.phoneEnrollmentInfo.captchaResponse;
          clientType = newRequest.phoneEnrollmentInfo.clientType;
          recaptchaVersion = newRequest.phoneEnrollmentInfo.recaptchaVersion;
          Object.assign(newRequest, {
            'phoneEnrollmentInfo': {
              phoneNumber: phoneNumber,
              recaptchaToken: recaptchaV2Token,
              captchaResponse: captchaResponse,
              clientType: clientType,
              recaptchaVersion: recaptchaVersion
            }
          });
          return _context187.abrupt("return", newRequest);
        case 15:
          if (!('phoneSignInInfo' in newRequest)) {
            _context187.next = 23;
            break;
          }
          _captchaResponse = newRequest.phoneSignInInfo.captchaResponse;
          _clientType = newRequest.phoneSignInInfo.clientType;
          _recaptchaVersion = newRequest.phoneSignInInfo.recaptchaVersion;
          Object.assign(newRequest, {
            'phoneSignInInfo': {
              recaptchaToken: recaptchaV2Token,
              captchaResponse: _captchaResponse,
              clientType: _clientType,
              recaptchaVersion: _recaptchaVersion
            }
          });
          return _context187.abrupt("return", newRequest);
        case 23:
          Object.assign(newRequest, {
            'recaptchaToken': recaptchaV2Token
          });
          return _context187.abrupt("return", newRequest);
        case 25:
        case "end":
          return _context187.stop();
      }
    }, _callee187);
  }));
  return _injectRecaptchaV2Token.apply(this, arguments);
}
var PhoneAuthProvider = exports.P = /*#__PURE__*/function () {
  /**
   * @param auth - The Firebase {@link Auth} instance in which sign-ins should occur.
   *
   */
  function PhoneAuthProvider(auth) {
    _classCallCheck(this, PhoneAuthProvider);
    /** Always set to {@link ProviderId}.PHONE. */
    this.providerId = PhoneAuthProvider.PROVIDER_ID;
    this.auth = _castAuth(auth);
  }
  /**
   *
   * Starts a phone number authentication flow by sending a verification code to the given phone
   * number.
   *
   * @example
   * ```javascript
   * const provider = new PhoneAuthProvider(auth);
   * const verificationId = await provider.verifyPhoneNumber(phoneNumber, applicationVerifier);
   * // Obtain verificationCode from the user.
   * const authCredential = PhoneAuthProvider.credential(verificationId, verificationCode);
   * const userCredential = await signInWithCredential(auth, authCredential);
   * ```
   *
   * @example
   * An alternative flow is provided using the `signInWithPhoneNumber` method.
   * ```javascript
   * const confirmationResult = signInWithPhoneNumber(auth, phoneNumber, applicationVerifier);
   * // Obtain verificationCode from the user.
   * const userCredential = confirmationResult.confirm(verificationCode);
   * ```
   *
   * @param phoneInfoOptions - The user's {@link PhoneInfoOptions}. The phone number should be in
   * E.164 format (e.g. +16505550101).
   * @param applicationVerifier - An {@link ApplicationVerifier}, which prevents
   * requests from unauthorized clients. This SDK includes an implementation
   * based on reCAPTCHA v2, {@link RecaptchaVerifier}. If you've enabled
   * reCAPTCHA Enterprise bot protection in Enforce mode, this parameter is
   * optional; in all other configurations, the parameter is required.
   *
   * @returns A Promise for a verification ID that can be passed to
   * {@link PhoneAuthProvider.credential} to identify this flow.
   */
  return _createClass(PhoneAuthProvider, [{
    key: "verifyPhoneNumber",
    value: function verifyPhoneNumber(phoneOptions, applicationVerifier) {
      return _verifyPhoneNumber(this.auth, phoneOptions, (0, _util.getModularInstance)(applicationVerifier));
    }
    /**
     * Creates a phone auth credential, given the verification ID from
     * {@link PhoneAuthProvider.verifyPhoneNumber} and the code that was sent to the user's
     * mobile device.
     *
     * @example
     * ```javascript
     * const provider = new PhoneAuthProvider(auth);
     * const verificationId = provider.verifyPhoneNumber(phoneNumber, applicationVerifier);
     * // Obtain verificationCode from the user.
     * const authCredential = PhoneAuthProvider.credential(verificationId, verificationCode);
     * const userCredential = signInWithCredential(auth, authCredential);
     * ```
     *
     * @example
     * An alternative flow is provided using the `signInWithPhoneNumber` method.
     * ```javascript
     * const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, applicationVerifier);
     * // Obtain verificationCode from the user.
     * const userCredential = await confirmationResult.confirm(verificationCode);
     * ```
     *
     * @param verificationId - The verification ID returned from {@link PhoneAuthProvider.verifyPhoneNumber}.
     * @param verificationCode - The verification code sent to the user's mobile device.
     *
     * @returns The auth provider credential.
     */
  }], [{
    key: "credential",
    value: function credential(verificationId, verificationCode) {
      return PhoneAuthCredential._fromVerification(verificationId, verificationCode);
    }
    /**
     * Generates an {@link AuthCredential} from a {@link UserCredential}.
     * @param userCredential - The user credential.
     */
  }, {
    key: "credentialFromResult",
    value: function credentialFromResult(userCredential) {
      var credential = userCredential;
      return PhoneAuthProvider.credentialFromTaggedObject(credential);
    }
    /**
     * Returns an {@link AuthCredential} when passed an error.
     *
     * @remarks
     *
     * This method works for errors like
     * `auth/account-exists-with-different-credentials`. This is useful for
     * recovering when attempting to set a user's phone number but the number
     * in question is already tied to another account. For example, the following
     * code tries to update the current user's phone number, and if that
     * fails, links the user with the account associated with that number:
     *
     * ```js
     * const provider = new PhoneAuthProvider(auth);
     * const verificationId = await provider.verifyPhoneNumber(number, verifier);
     * try {
     *   const code = ''; // Prompt the user for the verification code
     *   await updatePhoneNumber(
     *       auth.currentUser,
     *       PhoneAuthProvider.credential(verificationId, code));
     * } catch (e) {
     *   if ((e as FirebaseError)?.code === 'auth/account-exists-with-different-credential') {
     *     const cred = PhoneAuthProvider.credentialFromError(e);
     *     await linkWithCredential(auth.currentUser, cred);
     *   }
     * }
     *
     * // At this point, auth.currentUser.phoneNumber === number.
     * ```
     *
     * @param error - The error to generate a credential from.
     */
  }, {
    key: "credentialFromError",
    value: function credentialFromError(error) {
      return PhoneAuthProvider.credentialFromTaggedObject(error.customData || {});
    }
  }, {
    key: "credentialFromTaggedObject",
    value: function credentialFromTaggedObject(_ref30) {
      var tokenResponse = _ref30._tokenResponse;
      if (!tokenResponse) {
        return null;
      }
      var phoneNumber = tokenResponse.phoneNumber,
        temporaryProof = tokenResponse.temporaryProof;
      if (phoneNumber && temporaryProof) {
        return PhoneAuthCredential._fromTokenResponse(phoneNumber, temporaryProof);
      }
      return null;
    }
  }]);
}();
/** Always set to {@link ProviderId}.PHONE. */
PhoneAuthProvider.PROVIDER_ID = "phone" /* ProviderId.PHONE */;
/** Always set to {@link SignInMethod}.PHONE. */
PhoneAuthProvider.PHONE_SIGN_IN_METHOD = "phone" /* SignInMethod.PHONE */;

/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Chooses a popup/redirect resolver to use. This prefers the override (which
 * is directly passed in), and falls back to the property set on the auth
 * object. If neither are available, this function errors w/ an argument error.
 */
function _withDefaultResolver(auth, resolverOverride) {
  if (resolverOverride) {
    return _getInstance(resolverOverride);
  }
  _assert(auth._popupRedirectResolver, auth, "argument-error" /* AuthErrorCode.ARGUMENT_ERROR */);
  return auth._popupRedirectResolver;
}

/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var IdpCredential = /*#__PURE__*/function (_AuthCredential5) {
  function IdpCredential(params) {
    var _this38;
    _classCallCheck(this, IdpCredential);
    _this38 = _callSuper(this, IdpCredential, ["custom" /* ProviderId.CUSTOM */, "custom" /* ProviderId.CUSTOM */]);
    _this38.params = params;
    return _this38;
  }
  _inherits(IdpCredential, _AuthCredential5);
  return _createClass(IdpCredential, [{
    key: "_getIdTokenResponse",
    value: function _getIdTokenResponse(auth) {
      return signInWithIdp(auth, this._buildIdpRequest());
    }
  }, {
    key: "_linkToIdToken",
    value: function _linkToIdToken(auth, idToken) {
      return signInWithIdp(auth, this._buildIdpRequest(idToken));
    }
  }, {
    key: "_getReauthenticationResolver",
    value: function _getReauthenticationResolver(auth) {
      return signInWithIdp(auth, this._buildIdpRequest());
    }
  }, {
    key: "_buildIdpRequest",
    value: function _buildIdpRequest(idToken) {
      var request = {
        requestUri: this.params.requestUri,
        sessionId: this.params.sessionId,
        postBody: this.params.postBody,
        tenantId: this.params.tenantId,
        pendingToken: this.params.pendingToken,
        returnSecureToken: true,
        returnIdpCredential: true
      };
      if (idToken) {
        request.idToken = idToken;
      }
      return request;
    }
  }]);
}(AuthCredential);
function _signIn(params) {
  return _signInWithCredential(params.auth, new IdpCredential(params), params.bypassAuthState);
}
function _reauth(params) {
  var auth = params.auth,
    user = params.user;
  _assert(user, auth, "internal-error" /* AuthErrorCode.INTERNAL_ERROR */);
  return _reauthenticate(user, new IdpCredential(params), params.bypassAuthState);
}
function _link(_x241) {
  return _link2.apply(this, arguments);
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Popup event manager. Handles the popup's entire lifecycle; listens to auth
 * events
 */
function _link2() {
  _link2 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee188(params) {
    var auth, user;
    return _regeneratorRuntime().wrap(function _callee188$(_context188) {
      while (1) switch (_context188.prev = _context188.next) {
        case 0:
          auth = params.auth, user = params.user;
          _assert(user, auth, "internal-error" /* AuthErrorCode.INTERNAL_ERROR */);
          return _context188.abrupt("return", _link$1(user, new IdpCredential(params), params.bypassAuthState));
        case 3:
        case "end":
          return _context188.stop();
      }
    }, _callee188);
  }));
  return _link2.apply(this, arguments);
}
var AbstractPopupRedirectOperation = /*#__PURE__*/function () {
  function AbstractPopupRedirectOperation(auth, filter, resolver, user) {
    var bypassAuthState = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
    _classCallCheck(this, AbstractPopupRedirectOperation);
    this.auth = auth;
    this.resolver = resolver;
    this.user = user;
    this.bypassAuthState = bypassAuthState;
    this.pendingPromise = null;
    this.eventManager = null;
    this.filter = Array.isArray(filter) ? filter : [filter];
  }
  return _createClass(AbstractPopupRedirectOperation, [{
    key: "execute",
    value: function execute() {
      var _this39 = this;
      return new Promise(/*#__PURE__*/function () {
        var _ref31 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee90(resolve, reject) {
          return _regeneratorRuntime().wrap(function _callee90$(_context90) {
            while (1) switch (_context90.prev = _context90.next) {
              case 0:
                _this39.pendingPromise = {
                  resolve: resolve,
                  reject: reject
                };
                _context90.prev = 1;
                _context90.next = 4;
                return _this39.resolver._initialize(_this39.auth);
              case 4:
                _this39.eventManager = _context90.sent;
                _context90.next = 7;
                return _this39.onExecution();
              case 7:
                _this39.eventManager.registerConsumer(_this39);
                _context90.next = 13;
                break;
              case 10:
                _context90.prev = 10;
                _context90.t0 = _context90["catch"](1);
                _this39.reject(_context90.t0);
              case 13:
              case "end":
                return _context90.stop();
            }
          }, _callee90, null, [[1, 10]]);
        }));
        return function (_x242, _x243) {
          return _ref31.apply(this, arguments);
        };
      }());
    }
  }, {
    key: "onAuthEvent",
    value: function () {
      var _onAuthEvent = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee91(event) {
        var urlResponse, sessionId, postBody, tenantId, error, type, params;
        return _regeneratorRuntime().wrap(function _callee91$(_context91) {
          while (1) switch (_context91.prev = _context91.next) {
            case 0:
              urlResponse = event.urlResponse, sessionId = event.sessionId, postBody = event.postBody, tenantId = event.tenantId, error = event.error, type = event.type;
              if (!error) {
                _context91.next = 4;
                break;
              }
              this.reject(error);
              return _context91.abrupt("return");
            case 4:
              params = {
                auth: this.auth,
                requestUri: urlResponse,
                sessionId: sessionId,
                tenantId: tenantId || undefined,
                postBody: postBody || undefined,
                user: this.user,
                bypassAuthState: this.bypassAuthState
              };
              _context91.prev = 5;
              _context91.t0 = this;
              _context91.next = 9;
              return this.getIdpTask(type)(params);
            case 9:
              _context91.t1 = _context91.sent;
              _context91.t0.resolve.call(_context91.t0, _context91.t1);
              _context91.next = 16;
              break;
            case 13:
              _context91.prev = 13;
              _context91.t2 = _context91["catch"](5);
              this.reject(_context91.t2);
            case 16:
            case "end":
              return _context91.stop();
          }
        }, _callee91, this, [[5, 13]]);
      }));
      function onAuthEvent(_x244) {
        return _onAuthEvent.apply(this, arguments);
      }
      return onAuthEvent;
    }()
  }, {
    key: "onError",
    value: function onError(error) {
      this.reject(error);
    }
  }, {
    key: "getIdpTask",
    value: function getIdpTask(type) {
      switch (type) {
        case "signInViaPopup" /* AuthEventType.SIGN_IN_VIA_POPUP */:
        case "signInViaRedirect" /* AuthEventType.SIGN_IN_VIA_REDIRECT */:
          return _signIn;
        case "linkViaPopup" /* AuthEventType.LINK_VIA_POPUP */:
        case "linkViaRedirect" /* AuthEventType.LINK_VIA_REDIRECT */:
          return _link;
        case "reauthViaPopup" /* AuthEventType.REAUTH_VIA_POPUP */:
        case "reauthViaRedirect" /* AuthEventType.REAUTH_VIA_REDIRECT */:
          return _reauth;
        default:
          _fail(this.auth, "internal-error" /* AuthErrorCode.INTERNAL_ERROR */);
      }
    }
  }, {
    key: "resolve",
    value: function resolve(cred) {
      debugAssert(this.pendingPromise, 'Pending promise was never set');
      this.pendingPromise.resolve(cred);
      this.unregisterAndCleanUp();
    }
  }, {
    key: "reject",
    value: function reject(error) {
      debugAssert(this.pendingPromise, 'Pending promise was never set');
      this.pendingPromise.reject(error);
      this.unregisterAndCleanUp();
    }
  }, {
    key: "unregisterAndCleanUp",
    value: function unregisterAndCleanUp() {
      if (this.eventManager) {
        this.eventManager.unregisterConsumer(this);
      }
      this.pendingPromise = null;
      this.cleanUp();
    }
  }]);
}();
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var _POLL_WINDOW_CLOSE_TIMEOUT = new Delay(2000, 10000);
/**
 * Authenticates a Firebase client using a popup-based OAuth authentication flow.
 *
 * @remarks
 * If succeeds, returns the signed in user along with the provider's credential. If sign in was
 * unsuccessful, returns an error object containing additional information about the error.
 *
 * This method does not work in a Node.js environment or with {@link Auth} instances created with a
 * {@link @firebase/app#FirebaseServerApp}.
 *
 * @example
 * ```javascript
 * // Sign in using a popup.
 * const provider = new FacebookAuthProvider();
 * const result = await signInWithPopup(auth, provider);
 *
 * // The signed-in user info.
 * const user = result.user;
 * // This gives you a Facebook Access Token.
 * const credential = provider.credentialFromResult(auth, result);
 * const token = credential.accessToken;
 * ```
 *
 * @param auth - The {@link Auth} instance.
 * @param provider - The provider to authenticate. The provider has to be an {@link OAuthProvider}.
 * Non-OAuth providers like {@link EmailAuthProvider} will throw an error.
 * @param resolver - An instance of {@link PopupRedirectResolver}, optional
 * if already supplied to {@link initializeAuth} or provided by {@link getAuth}.
 *
 * @public
 */
function signInWithPopup(_x245, _x246, _x247) {
  return _signInWithPopup.apply(this, arguments);
}
/**
 * Reauthenticates the current user with the specified {@link OAuthProvider} using a pop-up based
 * OAuth flow.
 *
 * @remarks
 * If the reauthentication is successful, the returned result will contain the user and the
 * provider's credential.
 *
 * This method does not work in a Node.js environment or on any {@link User} signed in by
 * {@link Auth} instances created with a {@link @firebase/app#FirebaseServerApp}.
 *
 * @example
 * ```javascript
 * // Sign in using a popup.
 * const provider = new FacebookAuthProvider();
 * const result = await signInWithPopup(auth, provider);
 * // Reauthenticate using a popup.
 * await reauthenticateWithPopup(result.user, provider);
 * ```
 *
 * @param user - The user.
 * @param provider - The provider to authenticate. The provider has to be an {@link OAuthProvider}.
 * Non-OAuth providers like {@link EmailAuthProvider} will throw an error.
 * @param resolver - An instance of {@link PopupRedirectResolver}, optional
 * if already supplied to {@link initializeAuth} or provided by {@link getAuth}.
 *
 * @public
 */
function _signInWithPopup() {
  _signInWithPopup = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee189(auth, provider, resolver) {
    var authInternal, resolverInternal, action;
    return _regeneratorRuntime().wrap(function _callee189$(_context189) {
      while (1) switch (_context189.prev = _context189.next) {
        case 0:
          if (!(0, _app._isFirebaseServerApp)(auth.app)) {
            _context189.next = 2;
            break;
          }
          return _context189.abrupt("return", Promise.reject(_createError(auth, "operation-not-supported-in-this-environment" /* AuthErrorCode.OPERATION_NOT_SUPPORTED */)));
        case 2:
          authInternal = _castAuth(auth);
          _assertInstanceOf(auth, provider, FederatedAuthProvider);
          resolverInternal = _withDefaultResolver(authInternal, resolver);
          action = new PopupOperation(authInternal, "signInViaPopup" /* AuthEventType.SIGN_IN_VIA_POPUP */, provider, resolverInternal);
          return _context189.abrupt("return", action.executeNotNull());
        case 7:
        case "end":
          return _context189.stop();
      }
    }, _callee189);
  }));
  return _signInWithPopup.apply(this, arguments);
}
function reauthenticateWithPopup(_x248, _x249, _x250) {
  return _reauthenticateWithPopup.apply(this, arguments);
}
/**
 * Links the authenticated provider to the user account using a pop-up based OAuth flow.
 *
 * @remarks
 * If the linking is successful, the returned result will contain the user and the provider's credential.
 *
 * This method does not work in a Node.js environment.
 *
 * @example
 * ```javascript
 * // Sign in using some other provider.
 * const result = await signInWithEmailAndPassword(auth, email, password);
 * // Link using a popup.
 * const provider = new FacebookAuthProvider();
 * await linkWithPopup(result.user, provider);
 * ```
 *
 * @param user - The user.
 * @param provider - The provider to authenticate. The provider has to be an {@link OAuthProvider}.
 * Non-OAuth providers like {@link EmailAuthProvider} will throw an error.
 * @param resolver - An instance of {@link PopupRedirectResolver}, optional
 * if already supplied to {@link initializeAuth} or provided by {@link getAuth}.
 *
 * @public
 */
function _reauthenticateWithPopup() {
  _reauthenticateWithPopup = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee190(user, provider, resolver) {
    var userInternal, resolverInternal, action;
    return _regeneratorRuntime().wrap(function _callee190$(_context190) {
      while (1) switch (_context190.prev = _context190.next) {
        case 0:
          userInternal = (0, _util.getModularInstance)(user);
          if (!(0, _app._isFirebaseServerApp)(userInternal.auth.app)) {
            _context190.next = 3;
            break;
          }
          return _context190.abrupt("return", Promise.reject(_createError(userInternal.auth, "operation-not-supported-in-this-environment" /* AuthErrorCode.OPERATION_NOT_SUPPORTED */)));
        case 3:
          _assertInstanceOf(userInternal.auth, provider, FederatedAuthProvider);
          resolverInternal = _withDefaultResolver(userInternal.auth, resolver);
          action = new PopupOperation(userInternal.auth, "reauthViaPopup" /* AuthEventType.REAUTH_VIA_POPUP */, provider, resolverInternal, userInternal);
          return _context190.abrupt("return", action.executeNotNull());
        case 7:
        case "end":
          return _context190.stop();
      }
    }, _callee190);
  }));
  return _reauthenticateWithPopup.apply(this, arguments);
}
function linkWithPopup(_x251, _x252, _x253) {
  return _linkWithPopup.apply(this, arguments);
}
/**
 * Popup event manager. Handles the popup's entire lifecycle; listens to auth
 * events
 *
 */
function _linkWithPopup() {
  _linkWithPopup = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee191(user, provider, resolver) {
    var userInternal, resolverInternal, action;
    return _regeneratorRuntime().wrap(function _callee191$(_context191) {
      while (1) switch (_context191.prev = _context191.next) {
        case 0:
          userInternal = (0, _util.getModularInstance)(user);
          _assertInstanceOf(userInternal.auth, provider, FederatedAuthProvider);
          resolverInternal = _withDefaultResolver(userInternal.auth, resolver);
          action = new PopupOperation(userInternal.auth, "linkViaPopup" /* AuthEventType.LINK_VIA_POPUP */, provider, resolverInternal, userInternal);
          return _context191.abrupt("return", action.executeNotNull());
        case 5:
        case "end":
          return _context191.stop();
      }
    }, _callee191);
  }));
  return _linkWithPopup.apply(this, arguments);
}
var PopupOperation = /*#__PURE__*/function (_AbstractPopupRedirec) {
  function PopupOperation(auth, filter, provider, resolver, user) {
    var _this40;
    _classCallCheck(this, PopupOperation);
    _this40 = _callSuper(this, PopupOperation, [auth, filter, resolver, user]);
    _this40.provider = provider;
    _this40.authWindow = null;
    _this40.pollId = null;
    if (PopupOperation.currentPopupAction) {
      PopupOperation.currentPopupAction.cancel();
    }
    PopupOperation.currentPopupAction = _this40;
    return _this40;
  }
  _inherits(PopupOperation, _AbstractPopupRedirec);
  return _createClass(PopupOperation, [{
    key: "executeNotNull",
    value: function () {
      var _executeNotNull = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee92() {
        var result;
        return _regeneratorRuntime().wrap(function _callee92$(_context92) {
          while (1) switch (_context92.prev = _context92.next) {
            case 0:
              _context92.next = 2;
              return this.execute();
            case 2:
              result = _context92.sent;
              _assert(result, this.auth, "internal-error" /* AuthErrorCode.INTERNAL_ERROR */);
              return _context92.abrupt("return", result);
            case 5:
            case "end":
              return _context92.stop();
          }
        }, _callee92, this);
      }));
      function executeNotNull() {
        return _executeNotNull.apply(this, arguments);
      }
      return executeNotNull;
    }()
  }, {
    key: "onExecution",
    value: function () {
      var _onExecution = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee93() {
        var _this41 = this;
        var eventId;
        return _regeneratorRuntime().wrap(function _callee93$(_context93) {
          while (1) switch (_context93.prev = _context93.next) {
            case 0:
              debugAssert(this.filter.length === 1, 'Popup operations only handle one event');
              eventId = _generateEventId();
              _context93.next = 4;
              return this.resolver._openPopup(this.auth, this.provider, this.filter[0],
              // There's always one, see constructor
              eventId);
            case 4:
              this.authWindow = _context93.sent;
              this.authWindow.associatedEvent = eventId;
              // Check for web storage support and origin validation _after_ the popup is
              // loaded. These operations are slow (~1 second or so) Rather than
              // waiting on them before opening the window, optimistically open the popup
              // and check for storage support at the same time. If storage support is
              // not available, this will cause the whole thing to reject properly. It
              // will also close the popup, but since the promise has already rejected,
              // the popup closed by user poll will reject into the void.
              this.resolver._originValidation(this.auth).catch(function (e) {
                _this41.reject(e);
              });
              this.resolver._isIframeWebStorageSupported(this.auth, function (isSupported) {
                if (!isSupported) {
                  _this41.reject(_createError(_this41.auth, "web-storage-unsupported" /* AuthErrorCode.WEB_STORAGE_UNSUPPORTED */));
                }
              });
              // Handle user closure. Notice this does *not* use await
              this.pollUserCancellation();
            case 9:
            case "end":
              return _context93.stop();
          }
        }, _callee93, this);
      }));
      function onExecution() {
        return _onExecution.apply(this, arguments);
      }
      return onExecution;
    }()
  }, {
    key: "eventId",
    get: function get() {
      var _a;
      return ((_a = this.authWindow) === null || _a === void 0 ? void 0 : _a.associatedEvent) || null;
    }
  }, {
    key: "cancel",
    value: function cancel() {
      this.reject(_createError(this.auth, "cancelled-popup-request" /* AuthErrorCode.EXPIRED_POPUP_REQUEST */));
    }
  }, {
    key: "cleanUp",
    value: function cleanUp() {
      if (this.authWindow) {
        this.authWindow.close();
      }
      if (this.pollId) {
        window.clearTimeout(this.pollId);
      }
      this.authWindow = null;
      this.pollId = null;
      PopupOperation.currentPopupAction = null;
    }
  }, {
    key: "pollUserCancellation",
    value: function pollUserCancellation() {
      var _this42 = this;
      var _poll3 = function poll() {
        var _a, _b;
        if ((_b = (_a = _this42.authWindow) === null || _a === void 0 ? void 0 : _a.window) === null || _b === void 0 ? void 0 : _b.closed) {
          // Make sure that there is sufficient time for whatever action to
          // complete. The window could have closed but the sign in network
          // call could still be in flight. This is specifically true for
          // Firefox or if the opener is in an iframe, in which case the oauth
          // helper closes the popup.
          _this42.pollId = window.setTimeout(function () {
            _this42.pollId = null;
            _this42.reject(_createError(_this42.auth, "popup-closed-by-user" /* AuthErrorCode.POPUP_CLOSED_BY_USER */));
          }, 8000 /* _Timeout.AUTH_EVENT */);
          return;
        }
        _this42.pollId = window.setTimeout(_poll3, _POLL_WINDOW_CLOSE_TIMEOUT.get());
      };
      _poll3();
    }
  }]);
}(AbstractPopupRedirectOperation); // Only one popup is ever shown at once. The lifecycle of the current popup
// can be managed / cancelled by the constructor.
PopupOperation.currentPopupAction = null;

/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var PENDING_REDIRECT_KEY = 'pendingRedirect';
// We only get one redirect outcome for any one auth, so just store it
// in here.
var redirectOutcomeMap = new Map();
var RedirectAction = /*#__PURE__*/function (_AbstractPopupRedirec2) {
  function RedirectAction(auth, resolver) {
    var _this43;
    var bypassAuthState = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
    _classCallCheck(this, RedirectAction);
    _this43 = _callSuper(this, RedirectAction, [auth, ["signInViaRedirect" /* AuthEventType.SIGN_IN_VIA_REDIRECT */, "linkViaRedirect" /* AuthEventType.LINK_VIA_REDIRECT */, "reauthViaRedirect" /* AuthEventType.REAUTH_VIA_REDIRECT */, "unknown" /* AuthEventType.UNKNOWN */], resolver, undefined, bypassAuthState]);
    _this43.eventId = null;
    return _this43;
  }
  /**
   * Override the execute function; if we already have a redirect result, then
   * just return it.
   */
  _inherits(RedirectAction, _AbstractPopupRedirec2);
  return _createClass(RedirectAction, [{
    key: "execute",
    value: (function () {
      var _execute2 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee94() {
        var readyOutcome, hasPendingRedirect, result;
        return _regeneratorRuntime().wrap(function _callee94$(_context94) {
          while (1) switch (_context94.prev = _context94.next) {
            case 0:
              readyOutcome = redirectOutcomeMap.get(this.auth._key());
              if (readyOutcome) {
                _context94.next = 21;
                break;
              }
              _context94.prev = 2;
              _context94.next = 5;
              return _getAndClearPendingRedirectStatus(this.resolver, this.auth);
            case 5:
              hasPendingRedirect = _context94.sent;
              if (!hasPendingRedirect) {
                _context94.next = 12;
                break;
              }
              _context94.next = 9;
              return _superPropGet(RedirectAction, "execute", this, 3)([]);
            case 9:
              _context94.t0 = _context94.sent;
              _context94.next = 13;
              break;
            case 12:
              _context94.t0 = null;
            case 13:
              result = _context94.t0;
              readyOutcome = function readyOutcome() {
                return Promise.resolve(result);
              };
              _context94.next = 20;
              break;
            case 17:
              _context94.prev = 17;
              _context94.t1 = _context94["catch"](2);
              readyOutcome = function readyOutcome() {
                return Promise.reject(_context94.t1);
              };
            case 20:
              redirectOutcomeMap.set(this.auth._key(), readyOutcome);
            case 21:
              // If we're not bypassing auth state, the ready outcome should be set to
              // null.
              if (!this.bypassAuthState) {
                redirectOutcomeMap.set(this.auth._key(), function () {
                  return Promise.resolve(null);
                });
              }
              return _context94.abrupt("return", readyOutcome());
            case 23:
            case "end":
              return _context94.stop();
          }
        }, _callee94, this, [[2, 17]]);
      }));
      function execute() {
        return _execute2.apply(this, arguments);
      }
      return execute;
    }())
  }, {
    key: "onAuthEvent",
    value: function () {
      var _onAuthEvent2 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee95(event) {
        var user;
        return _regeneratorRuntime().wrap(function _callee95$(_context95) {
          while (1) switch (_context95.prev = _context95.next) {
            case 0:
              if (!(event.type === "signInViaRedirect" /* AuthEventType.SIGN_IN_VIA_REDIRECT */)) {
                _context95.next = 4;
                break;
              }
              return _context95.abrupt("return", _superPropGet(RedirectAction, "onAuthEvent", this, 3)([event]));
            case 4:
              if (!(event.type === "unknown" /* AuthEventType.UNKNOWN */)) {
                _context95.next = 7;
                break;
              }
              // This is a sentinel value indicating there's no pending redirect
              this.resolve(null);
              return _context95.abrupt("return");
            case 7:
              if (!event.eventId) {
                _context95.next = 17;
                break;
              }
              _context95.next = 10;
              return this.auth._redirectUserForId(event.eventId);
            case 10:
              user = _context95.sent;
              if (!user) {
                _context95.next = 16;
                break;
              }
              this.user = user;
              return _context95.abrupt("return", _superPropGet(RedirectAction, "onAuthEvent", this, 3)([event]));
            case 16:
              this.resolve(null);
            case 17:
            case "end":
              return _context95.stop();
          }
        }, _callee95, this);
      }));
      function onAuthEvent(_x254) {
        return _onAuthEvent2.apply(this, arguments);
      }
      return onAuthEvent;
    }()
  }, {
    key: "onExecution",
    value: function () {
      var _onExecution2 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee96() {
        return _regeneratorRuntime().wrap(function _callee96$(_context96) {
          while (1) switch (_context96.prev = _context96.next) {
            case 0:
            case "end":
              return _context96.stop();
          }
        }, _callee96);
      }));
      function onExecution() {
        return _onExecution2.apply(this, arguments);
      }
      return onExecution;
    }()
  }, {
    key: "cleanUp",
    value: function cleanUp() {}
  }]);
}(AbstractPopupRedirectOperation);
function _getAndClearPendingRedirectStatus(_x255, _x256) {
  return _getAndClearPendingRedirectStatus2.apply(this, arguments);
}
function _getAndClearPendingRedirectStatus2() {
  _getAndClearPendingRedirectStatus2 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee192(resolver, auth) {
    var key, persistence, hasPendingRedirect;
    return _regeneratorRuntime().wrap(function _callee192$(_context192) {
      while (1) switch (_context192.prev = _context192.next) {
        case 0:
          key = pendingRedirectKey(auth);
          persistence = resolverPersistence(resolver);
          _context192.next = 4;
          return persistence._isAvailable();
        case 4:
          if (_context192.sent) {
            _context192.next = 6;
            break;
          }
          return _context192.abrupt("return", false);
        case 6:
          _context192.next = 8;
          return persistence._get(key);
        case 8:
          _context192.t0 = _context192.sent;
          hasPendingRedirect = _context192.t0 === 'true';
          _context192.next = 12;
          return persistence._remove(key);
        case 12:
          return _context192.abrupt("return", hasPendingRedirect);
        case 13:
        case "end":
          return _context192.stop();
      }
    }, _callee192);
  }));
  return _getAndClearPendingRedirectStatus2.apply(this, arguments);
}
function _setPendingRedirectStatus(_x257, _x258) {
  return _setPendingRedirectStatus2.apply(this, arguments);
}
function _setPendingRedirectStatus2() {
  _setPendingRedirectStatus2 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee193(resolver, auth) {
    return _regeneratorRuntime().wrap(function _callee193$(_context193) {
      while (1) switch (_context193.prev = _context193.next) {
        case 0:
          return _context193.abrupt("return", resolverPersistence(resolver)._set(pendingRedirectKey(auth), 'true'));
        case 1:
        case "end":
          return _context193.stop();
      }
    }, _callee193);
  }));
  return _setPendingRedirectStatus2.apply(this, arguments);
}
function _clearRedirectOutcomes() {
  redirectOutcomeMap.clear();
}
function _overrideRedirectResult(auth, result) {
  redirectOutcomeMap.set(auth._key(), result);
}
function resolverPersistence(resolver) {
  return _getInstance(resolver._redirectPersistence);
}
function pendingRedirectKey(auth) {
  return _persistenceKeyName(PENDING_REDIRECT_KEY, auth.config.apiKey, auth.name);
}

/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Authenticates a Firebase client using a full-page redirect flow.
 *
 * @remarks
 * To handle the results and errors for this operation, refer to {@link getRedirectResult}.
 * Follow the {@link https://firebase.google.com/docs/auth/web/redirect-best-practices
 * | best practices} when using {@link signInWithRedirect}.
 *
 * This method does not work in a Node.js environment or with {@link Auth} instances created with a
 * {@link @firebase/app#FirebaseServerApp}.
 *
 * @example
 * ```javascript
 * // Sign in using a redirect.
 * const provider = new FacebookAuthProvider();
 * // You can add additional scopes to the provider:
 * provider.addScope('user_birthday');
 * // Start a sign in process for an unauthenticated user.
 * await signInWithRedirect(auth, provider);
 * // This will trigger a full page redirect away from your app
 *
 * // After returning from the redirect when your app initializes you can obtain the result
 * const result = await getRedirectResult(auth);
 * if (result) {
 *   // This is the signed-in user
 *   const user = result.user;
 *   // This gives you a Facebook Access Token.
 *   const credential = provider.credentialFromResult(auth, result);
 *   const token = credential.accessToken;
 * }
 * // As this API can be used for sign-in, linking and reauthentication,
 * // check the operationType to determine what triggered this redirect
 * // operation.
 * const operationType = result.operationType;
 * ```
 *
 * @param auth - The {@link Auth} instance.
 * @param provider - The provider to authenticate. The provider has to be an {@link OAuthProvider}.
 * Non-OAuth providers like {@link EmailAuthProvider} will throw an error.
 * @param resolver - An instance of {@link PopupRedirectResolver}, optional
 * if already supplied to {@link initializeAuth} or provided by {@link getAuth}.
 *
 * @public
 */
function signInWithRedirect(auth, provider, resolver) {
  return _signInWithRedirect(auth, provider, resolver);
}
function _signInWithRedirect(_x259, _x260, _x261) {
  return _signInWithRedirect2.apply(this, arguments);
}
/**
 * Reauthenticates the current user with the specified {@link OAuthProvider} using a full-page redirect flow.
 * @remarks
 * To handle the results and errors for this operation, refer to {@link getRedirectResult}.
 * Follow the {@link https://firebase.google.com/docs/auth/web/redirect-best-practices
 * | best practices} when using {@link reauthenticateWithRedirect}.
 *
 * This method does not work in a Node.js environment or with {@link Auth} instances
 * created with a {@link @firebase/app#FirebaseServerApp}.
 *
 * @example
 * ```javascript
 * // Sign in using a redirect.
 * const provider = new FacebookAuthProvider();
 * const result = await signInWithRedirect(auth, provider);
 * // This will trigger a full page redirect away from your app
 *
 * // After returning from the redirect when your app initializes you can obtain the result
 * const result = await getRedirectResult(auth);
 * // Reauthenticate using a redirect.
 * await reauthenticateWithRedirect(result.user, provider);
 * // This will again trigger a full page redirect away from your app
 *
 * // After returning from the redirect when your app initializes you can obtain the result
 * const result = await getRedirectResult(auth);
 * ```
 *
 * @param user - The user.
 * @param provider - The provider to authenticate. The provider has to be an {@link OAuthProvider}.
 * Non-OAuth providers like {@link EmailAuthProvider} will throw an error.
 * @param resolver - An instance of {@link PopupRedirectResolver}, optional
 * if already supplied to {@link initializeAuth} or provided by {@link getAuth}.
 *
 * @public
 */
function _signInWithRedirect2() {
  _signInWithRedirect2 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee194(auth, provider, resolver) {
    var authInternal, resolverInternal;
    return _regeneratorRuntime().wrap(function _callee194$(_context194) {
      while (1) switch (_context194.prev = _context194.next) {
        case 0:
          if (!(0, _app._isFirebaseServerApp)(auth.app)) {
            _context194.next = 2;
            break;
          }
          return _context194.abrupt("return", Promise.reject(_serverAppCurrentUserOperationNotSupportedError(auth)));
        case 2:
          authInternal = _castAuth(auth);
          _assertInstanceOf(auth, provider, FederatedAuthProvider);
          // Wait for auth initialization to complete, this will process pending redirects and clear the
          // PENDING_REDIRECT_KEY in persistence. This should be completed before starting a new
          // redirect and creating a PENDING_REDIRECT_KEY entry.
          _context194.next = 6;
          return authInternal._initializationPromise;
        case 6:
          resolverInternal = _withDefaultResolver(authInternal, resolver);
          _context194.next = 9;
          return _setPendingRedirectStatus(resolverInternal, authInternal);
        case 9:
          return _context194.abrupt("return", resolverInternal._openRedirect(authInternal, provider, "signInViaRedirect" /* AuthEventType.SIGN_IN_VIA_REDIRECT */));
        case 10:
        case "end":
          return _context194.stop();
      }
    }, _callee194);
  }));
  return _signInWithRedirect2.apply(this, arguments);
}
function reauthenticateWithRedirect(user, provider, resolver) {
  return _reauthenticateWithRedirect(user, provider, resolver);
}
function _reauthenticateWithRedirect(_x262, _x263, _x264) {
  return _reauthenticateWithRedirect2.apply(this, arguments);
}
/**
 * Links the {@link OAuthProvider} to the user account using a full-page redirect flow.
 * @remarks
 * To handle the results and errors for this operation, refer to {@link getRedirectResult}.
 * Follow the {@link https://firebase.google.com/docs/auth/web/redirect-best-practices
 * | best practices} when using {@link linkWithRedirect}.
 *
 * This method does not work in a Node.js environment or with {@link Auth} instances
 * created with a {@link @firebase/app#FirebaseServerApp}.
 *
 * @example
 * ```javascript
 * // Sign in using some other provider.
 * const result = await signInWithEmailAndPassword(auth, email, password);
 * // Link using a redirect.
 * const provider = new FacebookAuthProvider();
 * await linkWithRedirect(result.user, provider);
 * // This will trigger a full page redirect away from your app
 *
 * // After returning from the redirect when your app initializes you can obtain the result
 * const result = await getRedirectResult(auth);
 * ```
 *
 * @param user - The user.
 * @param provider - The provider to authenticate. The provider has to be an {@link OAuthProvider}.
 * Non-OAuth providers like {@link EmailAuthProvider} will throw an error.
 * @param resolver - An instance of {@link PopupRedirectResolver}, optional
 * if already supplied to {@link initializeAuth} or provided by {@link getAuth}.
 *
 * @public
 */
function _reauthenticateWithRedirect2() {
  _reauthenticateWithRedirect2 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee195(user, provider, resolver) {
    var userInternal, resolverInternal, eventId;
    return _regeneratorRuntime().wrap(function _callee195$(_context195) {
      while (1) switch (_context195.prev = _context195.next) {
        case 0:
          userInternal = (0, _util.getModularInstance)(user);
          _assertInstanceOf(userInternal.auth, provider, FederatedAuthProvider);
          if (!(0, _app._isFirebaseServerApp)(userInternal.auth.app)) {
            _context195.next = 4;
            break;
          }
          return _context195.abrupt("return", Promise.reject(_serverAppCurrentUserOperationNotSupportedError(userInternal.auth)));
        case 4:
          _context195.next = 6;
          return userInternal.auth._initializationPromise;
        case 6:
          // Allow the resolver to error before persisting the redirect user
          resolverInternal = _withDefaultResolver(userInternal.auth, resolver);
          _context195.next = 9;
          return _setPendingRedirectStatus(resolverInternal, userInternal.auth);
        case 9:
          _context195.next = 11;
          return prepareUserForRedirect(userInternal);
        case 11:
          eventId = _context195.sent;
          return _context195.abrupt("return", resolverInternal._openRedirect(userInternal.auth, provider, "reauthViaRedirect" /* AuthEventType.REAUTH_VIA_REDIRECT */, eventId));
        case 13:
        case "end":
          return _context195.stop();
      }
    }, _callee195);
  }));
  return _reauthenticateWithRedirect2.apply(this, arguments);
}
function linkWithRedirect(user, provider, resolver) {
  return _linkWithRedirect(user, provider, resolver);
}
function _linkWithRedirect(_x265, _x266, _x267) {
  return _linkWithRedirect2.apply(this, arguments);
}
/**
 * Returns a {@link UserCredential} from the redirect-based sign-in flow.
 *
 * @remarks
 * If sign-in succeeded, returns the signed in user. If sign-in was unsuccessful, fails with an
 * error. If no redirect operation was called, returns `null`.
 *
 * This method does not work in a Node.js environment or with {@link Auth} instances created with a
 * {@link @firebase/app#FirebaseServerApp}.
 *
 * @example
 * ```javascript
 * // Sign in using a redirect.
 * const provider = new FacebookAuthProvider();
 * // You can add additional scopes to the provider:
 * provider.addScope('user_birthday');
 * // Start a sign in process for an unauthenticated user.
 * await signInWithRedirect(auth, provider);
 * // This will trigger a full page redirect away from your app
 *
 * // After returning from the redirect when your app initializes you can obtain the result
 * const result = await getRedirectResult(auth);
 * if (result) {
 *   // This is the signed-in user
 *   const user = result.user;
 *   // This gives you a Facebook Access Token.
 *   const credential = provider.credentialFromResult(auth, result);
 *   const token = credential.accessToken;
 * }
 * // As this API can be used for sign-in, linking and reauthentication,
 * // check the operationType to determine what triggered this redirect
 * // operation.
 * const operationType = result.operationType;
 * ```
 *
 * @param auth - The {@link Auth} instance.
 * @param resolver - An instance of {@link PopupRedirectResolver}, optional
 * if already supplied to {@link initializeAuth} or provided by {@link getAuth}.
 *
 * @public
 */
function _linkWithRedirect2() {
  _linkWithRedirect2 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee196(user, provider, resolver) {
    var userInternal, resolverInternal, eventId;
    return _regeneratorRuntime().wrap(function _callee196$(_context196) {
      while (1) switch (_context196.prev = _context196.next) {
        case 0:
          userInternal = (0, _util.getModularInstance)(user);
          _assertInstanceOf(userInternal.auth, provider, FederatedAuthProvider);
          // Wait for auth initialization to complete, this will process pending redirects and clear the
          // PENDING_REDIRECT_KEY in persistence. This should be completed before starting a new
          // redirect and creating a PENDING_REDIRECT_KEY entry.
          _context196.next = 4;
          return userInternal.auth._initializationPromise;
        case 4:
          // Allow the resolver to error before persisting the redirect user
          resolverInternal = _withDefaultResolver(userInternal.auth, resolver);
          _context196.next = 7;
          return _assertLinkedStatus(false, userInternal, provider.providerId);
        case 7:
          _context196.next = 9;
          return _setPendingRedirectStatus(resolverInternal, userInternal.auth);
        case 9:
          _context196.next = 11;
          return prepareUserForRedirect(userInternal);
        case 11:
          eventId = _context196.sent;
          return _context196.abrupt("return", resolverInternal._openRedirect(userInternal.auth, provider, "linkViaRedirect" /* AuthEventType.LINK_VIA_REDIRECT */, eventId));
        case 13:
        case "end":
          return _context196.stop();
      }
    }, _callee196);
  }));
  return _linkWithRedirect2.apply(this, arguments);
}
function getRedirectResult(_x268, _x269) {
  return _getRedirectResult2.apply(this, arguments);
}
function _getRedirectResult2() {
  _getRedirectResult2 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee197(auth, resolver) {
    return _regeneratorRuntime().wrap(function _callee197$(_context197) {
      while (1) switch (_context197.prev = _context197.next) {
        case 0:
          _context197.next = 2;
          return _castAuth(auth)._initializationPromise;
        case 2:
          return _context197.abrupt("return", _getRedirectResult(auth, resolver, false));
        case 3:
        case "end":
          return _context197.stop();
      }
    }, _callee197);
  }));
  return _getRedirectResult2.apply(this, arguments);
}
function _getRedirectResult(_x270, _x271) {
  return _getRedirectResult3.apply(this, arguments);
}
function _getRedirectResult3() {
  _getRedirectResult3 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee198(auth, resolverExtern) {
    var bypassAuthState,
      authInternal,
      resolver,
      action,
      result,
      _args198 = arguments;
    return _regeneratorRuntime().wrap(function _callee198$(_context198) {
      while (1) switch (_context198.prev = _context198.next) {
        case 0:
          bypassAuthState = _args198.length > 2 && _args198[2] !== undefined ? _args198[2] : false;
          if (!(0, _app._isFirebaseServerApp)(auth.app)) {
            _context198.next = 3;
            break;
          }
          return _context198.abrupt("return", Promise.reject(_serverAppCurrentUserOperationNotSupportedError(auth)));
        case 3:
          authInternal = _castAuth(auth);
          resolver = _withDefaultResolver(authInternal, resolverExtern);
          action = new RedirectAction(authInternal, resolver, bypassAuthState);
          _context198.next = 8;
          return action.execute();
        case 8:
          result = _context198.sent;
          if (!(result && !bypassAuthState)) {
            _context198.next = 15;
            break;
          }
          delete result.user._redirectEventId;
          _context198.next = 13;
          return authInternal._persistUserIfCurrent(result.user);
        case 13:
          _context198.next = 15;
          return authInternal._setRedirectUser(null, resolverExtern);
        case 15:
          return _context198.abrupt("return", result);
        case 16:
        case "end":
          return _context198.stop();
      }
    }, _callee198);
  }));
  return _getRedirectResult3.apply(this, arguments);
}
function prepareUserForRedirect(_x272) {
  return _prepareUserForRedirect.apply(this, arguments);
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
// The amount of time to store the UIDs of seen events; this is
// set to 10 min by default
function _prepareUserForRedirect() {
  _prepareUserForRedirect = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee199(user) {
    var eventId;
    return _regeneratorRuntime().wrap(function _callee199$(_context199) {
      while (1) switch (_context199.prev = _context199.next) {
        case 0:
          eventId = _generateEventId("".concat(user.uid, ":::"));
          user._redirectEventId = eventId;
          _context199.next = 4;
          return user.auth._setRedirectUser(user);
        case 4:
          _context199.next = 6;
          return user.auth._persistUserIfCurrent(user);
        case 6:
          return _context199.abrupt("return", eventId);
        case 7:
        case "end":
          return _context199.stop();
      }
    }, _callee199);
  }));
  return _prepareUserForRedirect.apply(this, arguments);
}
var EVENT_DUPLICATION_CACHE_DURATION_MS = 10 * 60 * 1000;
var AuthEventManager = exports.aE = /*#__PURE__*/function () {
  function AuthEventManager(auth) {
    _classCallCheck(this, AuthEventManager);
    this.auth = auth;
    this.cachedEventUids = new Set();
    this.consumers = new Set();
    this.queuedRedirectEvent = null;
    this.hasHandledPotentialRedirect = false;
    this.lastProcessedEventTime = Date.now();
  }
  return _createClass(AuthEventManager, [{
    key: "registerConsumer",
    value: function registerConsumer(authEventConsumer) {
      this.consumers.add(authEventConsumer);
      if (this.queuedRedirectEvent && this.isEventForConsumer(this.queuedRedirectEvent, authEventConsumer)) {
        this.sendToConsumer(this.queuedRedirectEvent, authEventConsumer);
        this.saveEventToCache(this.queuedRedirectEvent);
        this.queuedRedirectEvent = null;
      }
    }
  }, {
    key: "unregisterConsumer",
    value: function unregisterConsumer(authEventConsumer) {
      this.consumers.delete(authEventConsumer);
    }
  }, {
    key: "onEvent",
    value: function onEvent(event) {
      var _this44 = this;
      // Check if the event has already been handled
      if (this.hasEventBeenHandled(event)) {
        return false;
      }
      var handled = false;
      this.consumers.forEach(function (consumer) {
        if (_this44.isEventForConsumer(event, consumer)) {
          handled = true;
          _this44.sendToConsumer(event, consumer);
          _this44.saveEventToCache(event);
        }
      });
      if (this.hasHandledPotentialRedirect || !isRedirectEvent(event)) {
        // If we've already seen a redirect before, or this is a popup event,
        // bail now
        return handled;
      }
      this.hasHandledPotentialRedirect = true;
      // If the redirect wasn't handled, hang on to it
      if (!handled) {
        this.queuedRedirectEvent = event;
        handled = true;
      }
      return handled;
    }
  }, {
    key: "sendToConsumer",
    value: function sendToConsumer(event, consumer) {
      var _a;
      if (event.error && !isNullRedirectEvent(event)) {
        var code = ((_a = event.error.code) === null || _a === void 0 ? void 0 : _a.split('auth/')[1]) || "internal-error" /* AuthErrorCode.INTERNAL_ERROR */;
        consumer.onError(_createError(this.auth, code));
      } else {
        consumer.onAuthEvent(event);
      }
    }
  }, {
    key: "isEventForConsumer",
    value: function isEventForConsumer(event, consumer) {
      var eventIdMatches = consumer.eventId === null || !!event.eventId && event.eventId === consumer.eventId;
      return consumer.filter.includes(event.type) && eventIdMatches;
    }
  }, {
    key: "hasEventBeenHandled",
    value: function hasEventBeenHandled(event) {
      if (Date.now() - this.lastProcessedEventTime >= EVENT_DUPLICATION_CACHE_DURATION_MS) {
        this.cachedEventUids.clear();
      }
      return this.cachedEventUids.has(eventUid(event));
    }
  }, {
    key: "saveEventToCache",
    value: function saveEventToCache(event) {
      this.cachedEventUids.add(eventUid(event));
      this.lastProcessedEventTime = Date.now();
    }
  }]);
}();
function eventUid(e) {
  return [e.type, e.eventId, e.sessionId, e.tenantId].filter(function (v) {
    return v;
  }).join('-');
}
function isNullRedirectEvent(_ref32) {
  var type = _ref32.type,
    error = _ref32.error;
  return type === "unknown" /* AuthEventType.UNKNOWN */ && (error === null || error === void 0 ? void 0 : error.code) === "auth/".concat("no-auth-event" /* AuthErrorCode.NO_AUTH_EVENT */);
}
function isRedirectEvent(event) {
  switch (event.type) {
    case "signInViaRedirect" /* AuthEventType.SIGN_IN_VIA_REDIRECT */:
    case "linkViaRedirect" /* AuthEventType.LINK_VIA_REDIRECT */:
    case "reauthViaRedirect" /* AuthEventType.REAUTH_VIA_REDIRECT */:
      return true;
    case "unknown" /* AuthEventType.UNKNOWN */:
      return isNullRedirectEvent(event);
    default:
      return false;
  }
}

/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function _getProjectConfig(_x273) {
  return _getProjectConfig2.apply(this, arguments);
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function _getProjectConfig2() {
  _getProjectConfig2 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee200(auth) {
    var request,
      _args200 = arguments;
    return _regeneratorRuntime().wrap(function _callee200$(_context200) {
      while (1) switch (_context200.prev = _context200.next) {
        case 0:
          request = _args200.length > 1 && _args200[1] !== undefined ? _args200[1] : {};
          return _context200.abrupt("return", _performApiRequest(auth, "GET" /* HttpMethod.GET */, "/v1/projects" /* Endpoint.GET_PROJECT_CONFIG */, request));
        case 2:
        case "end":
          return _context200.stop();
      }
    }, _callee200);
  }));
  return _getProjectConfig2.apply(this, arguments);
}
var IP_ADDRESS_REGEX = /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/;
var HTTP_REGEX = /^https?/;
function _validateOrigin(_x274) {
  return _validateOrigin2.apply(this, arguments);
}
function _validateOrigin2() {
  _validateOrigin2 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee201(auth) {
    var _yield$_getProjectCon, authorizedDomains, _iterator6, _step6, domain;
    return _regeneratorRuntime().wrap(function _callee201$(_context201) {
      while (1) switch (_context201.prev = _context201.next) {
        case 0:
          if (!auth.config.emulator) {
            _context201.next = 2;
            break;
          }
          return _context201.abrupt("return");
        case 2:
          _context201.next = 4;
          return _getProjectConfig(auth);
        case 4:
          _yield$_getProjectCon = _context201.sent;
          authorizedDomains = _yield$_getProjectCon.authorizedDomains;
          _iterator6 = _createForOfIteratorHelper(authorizedDomains);
          _context201.prev = 7;
          _iterator6.s();
        case 9:
          if ((_step6 = _iterator6.n()).done) {
            _context201.next = 20;
            break;
          }
          domain = _step6.value;
          _context201.prev = 11;
          if (!matchDomain(domain)) {
            _context201.next = 14;
            break;
          }
          return _context201.abrupt("return");
        case 14:
          _context201.next = 18;
          break;
        case 16:
          _context201.prev = 16;
          _context201.t0 = _context201["catch"](11);
        case 18:
          _context201.next = 9;
          break;
        case 20:
          _context201.next = 25;
          break;
        case 22:
          _context201.prev = 22;
          _context201.t1 = _context201["catch"](7);
          _iterator6.e(_context201.t1);
        case 25:
          _context201.prev = 25;
          _iterator6.f();
          return _context201.finish(25);
        case 28:
          // In the old SDK, this error also provides helpful messages.
          _fail(auth, "unauthorized-domain" /* AuthErrorCode.INVALID_ORIGIN */);
        case 29:
        case "end":
          return _context201.stop();
      }
    }, _callee201, null, [[7, 22, 25, 28], [11, 16]]);
  }));
  return _validateOrigin2.apply(this, arguments);
}
function matchDomain(expected) {
  var currentUrl = _getCurrentUrl();
  var _URL = new URL(currentUrl),
    protocol = _URL.protocol,
    hostname = _URL.hostname;
  if (expected.startsWith('chrome-extension://')) {
    var ceUrl = new URL(expected);
    if (ceUrl.hostname === '' && hostname === '') {
      // For some reason we're not parsing chrome URLs properly
      return protocol === 'chrome-extension:' && expected.replace('chrome-extension://', '') === currentUrl.replace('chrome-extension://', '');
    }
    return protocol === 'chrome-extension:' && ceUrl.hostname === hostname;
  }
  if (!HTTP_REGEX.test(protocol)) {
    return false;
  }
  if (IP_ADDRESS_REGEX.test(expected)) {
    // The domain has to be exactly equal to the pattern, as an IP domain will
    // only contain the IP, no extra character.
    return hostname === expected;
  }
  // Dots in pattern should be escaped.
  var escapedDomainPattern = expected.replace(/\./g, '\\.');
  // Non ip address domains.
  // domain.com = *.domain.com OR domain.com
  var re = new RegExp('^(.+\\.' + escapedDomainPattern + '|' + escapedDomainPattern + ')$', 'i');
  return re.test(hostname);
}

/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var NETWORK_TIMEOUT = new Delay(30000, 60000);
/**
 * Reset unloaded GApi modules. If gapi.load fails due to a network error,
 * it will stop working after a retrial. This is a hack to fix this issue.
 */
function resetUnloadedGapiModules() {
  // Clear last failed gapi.load state to force next gapi.load to first
  // load the failed gapi.iframes module.
  // Get gapix.beacon context.
  var beacon = _window().___jsl;
  // Get current hint.
  if (beacon === null || beacon === void 0 ? void 0 : beacon.H) {
    // Get gapi hint.
    for (var _i5 = 0, _Object$keys3 = Object.keys(beacon.H); _i5 < _Object$keys3.length; _i5++) {
      var hint = _Object$keys3[_i5];
      // Requested modules.
      beacon.H[hint].r = beacon.H[hint].r || [];
      // Loaded modules.
      beacon.H[hint].L = beacon.H[hint].L || [];
      // Set requested modules to a copy of the loaded modules.
      beacon.H[hint].r = _toConsumableArray(beacon.H[hint].L);
      // Clear pending callbacks.
      if (beacon.CP) {
        for (var i = 0; i < beacon.CP.length; i++) {
          // Remove all failed pending callbacks.
          beacon.CP[i] = null;
        }
      }
    }
  }
}
function loadGapi(auth) {
  return new Promise(function (resolve, reject) {
    var _a, _b, _c;
    // Function to run when gapi.load is ready.
    function loadGapiIframe() {
      // The developer may have tried to previously run gapi.load and failed.
      // Run this to fix that.
      resetUnloadedGapiModules();
      gapi.load('gapi.iframes', {
        callback: function callback() {
          resolve(gapi.iframes.getContext());
        },
        ontimeout: function ontimeout() {
          // The above reset may be sufficient, but having this reset after
          // failure ensures that if the developer calls gapi.load after the
          // connection is re-established and before another attempt to embed
          // the iframe, it would work and would not be broken because of our
          // failed attempt.
          // Timeout when gapi.iframes.Iframe not loaded.
          resetUnloadedGapiModules();
          reject(_createError(auth, "network-request-failed" /* AuthErrorCode.NETWORK_REQUEST_FAILED */));
        },
        timeout: NETWORK_TIMEOUT.get()
      });
    }
    if ((_b = (_a = _window().gapi) === null || _a === void 0 ? void 0 : _a.iframes) === null || _b === void 0 ? void 0 : _b.Iframe) {
      // If gapi.iframes.Iframe available, resolve.
      resolve(gapi.iframes.getContext());
    } else if (!!((_c = _window().gapi) === null || _c === void 0 ? void 0 : _c.load)) {
      // Gapi loader ready, load gapi.iframes.
      loadGapiIframe();
    } else {
      // Create a new iframe callback when this is called so as not to overwrite
      // any previous defined callback. This happens if this method is called
      // multiple times in parallel and could result in the later callback
      // overwriting the previous one. This would end up with a iframe
      // timeout.
      var cbName = _generateCallbackName('iframefcb');
      // GApi loader not available, dynamically load platform.js.
      _window()[cbName] = function () {
        // GApi loader should be ready.
        if (!!gapi.load) {
          loadGapiIframe();
        } else {
          // Gapi loader failed, throw error.
          reject(_createError(auth, "network-request-failed" /* AuthErrorCode.NETWORK_REQUEST_FAILED */));
        }
      };
      // Load GApi loader.
      return _loadJS("".concat(_gapiScriptUrl(), "?onload=").concat(cbName)).catch(function (e) {
        return reject(e);
      });
    }
  }).catch(function (error) {
    // Reset cached promise to allow for retrial.
    cachedGApiLoader = null;
    throw error;
  });
}
var cachedGApiLoader = null;
function _loadGapi(auth) {
  cachedGApiLoader = cachedGApiLoader || loadGapi(auth);
  return cachedGApiLoader;
}

/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var PING_TIMEOUT = new Delay(5000, 15000);
var IFRAME_PATH = '__/auth/iframe';
var EMULATED_IFRAME_PATH = 'emulator/auth/iframe';
var IFRAME_ATTRIBUTES = {
  style: {
    position: 'absolute',
    top: '-100px',
    width: '1px',
    height: '1px'
  },
  'aria-hidden': 'true',
  tabindex: '-1'
};
// Map from apiHost to endpoint ID for passing into iframe. In current SDK, apiHost can be set to
// anything (not from a list of endpoints with IDs as in legacy), so this is the closest we can get.
var EID_FROM_APIHOST = new Map([["identitytoolkit.googleapis.com" /* DefaultConfig.API_HOST */, 'p'],
// production
['staging-identitytoolkit.sandbox.googleapis.com', 's'],
// staging
['test-identitytoolkit.sandbox.googleapis.com', 't'] // test
]);
function getIframeUrl(auth) {
  var config = auth.config;
  _assert(config.authDomain, auth, "auth-domain-config-required" /* AuthErrorCode.MISSING_AUTH_DOMAIN */);
  var url = config.emulator ? _emulatorUrl(config, EMULATED_IFRAME_PATH) : "https://".concat(auth.config.authDomain, "/").concat(IFRAME_PATH);
  var params = {
    apiKey: config.apiKey,
    appName: auth.name,
    v: _app.SDK_VERSION
  };
  var eid = EID_FROM_APIHOST.get(auth.config.apiHost);
  if (eid) {
    params.eid = eid;
  }
  var frameworks = auth._getFrameworks();
  if (frameworks.length) {
    params.fw = frameworks.join(',');
  }
  return "".concat(url, "?").concat((0, _util.querystring)(params).slice(1));
}
function _openIframe(_x275) {
  return _openIframe2.apply(this, arguments);
}
/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function _openIframe2() {
  _openIframe2 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee203(auth) {
    var context, gapi;
    return _regeneratorRuntime().wrap(function _callee203$(_context203) {
      while (1) switch (_context203.prev = _context203.next) {
        case 0:
          _context203.next = 2;
          return _loadGapi(auth);
        case 2:
          context = _context203.sent;
          gapi = _window().gapi;
          _assert(gapi, auth, "internal-error" /* AuthErrorCode.INTERNAL_ERROR */);
          return _context203.abrupt("return", context.open({
            where: document.body,
            url: getIframeUrl(auth),
            messageHandlersFilter: gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER,
            attributes: IFRAME_ATTRIBUTES,
            dontclear: true
          }, function (iframe) {
            return new Promise(/*#__PURE__*/function () {
              var _ref47 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee202(resolve, reject) {
                var networkError, networkErrorTimer, clearTimerAndResolve;
                return _regeneratorRuntime().wrap(function _callee202$(_context202) {
                  while (1) switch (_context202.prev = _context202.next) {
                    case 0:
                      clearTimerAndResolve = function _clearTimerAndResolve() {
                        _window().clearTimeout(networkErrorTimer);
                        resolve(iframe);
                      };
                      _context202.next = 3;
                      return iframe.restyle({
                        // Prevent iframe from closing on mouse out.
                        setHideOnLeave: false
                      });
                    case 3:
                      networkError = _createError(auth, "network-request-failed" /* AuthErrorCode.NETWORK_REQUEST_FAILED */); // Confirm iframe is correctly loaded.
                      // To fallback on failure, set a timeout.
                      networkErrorTimer = _window().setTimeout(function () {
                        reject(networkError);
                      }, PING_TIMEOUT.get()); // Clear timer and resolve pending iframe ready promise.
                      // This returns an IThenable. However the reject part does not call
                      // when the iframe is not loaded.
                      iframe.ping(clearTimerAndResolve).then(clearTimerAndResolve, function () {
                        reject(networkError);
                      });
                    case 6:
                    case "end":
                      return _context202.stop();
                  }
                }, _callee202);
              }));
              return function (_x308, _x309) {
                return _ref47.apply(this, arguments);
              };
            }());
          }));
        case 6:
        case "end":
          return _context203.stop();
      }
    }, _callee203);
  }));
  return _openIframe2.apply(this, arguments);
}
var BASE_POPUP_OPTIONS = {
  location: 'yes',
  resizable: 'yes',
  statusbar: 'yes',
  toolbar: 'no'
};
var DEFAULT_WIDTH = 500;
var DEFAULT_HEIGHT = 600;
var TARGET_BLANK = '_blank';
var FIREFOX_EMPTY_URL = 'http://localhost';
var AuthPopup = exports.aP = /*#__PURE__*/function () {
  function AuthPopup(window) {
    _classCallCheck(this, AuthPopup);
    this.window = window;
    this.associatedEvent = null;
  }
  return _createClass(AuthPopup, [{
    key: "close",
    value: function close() {
      if (this.window) {
        try {
          this.window.close();
        } catch (e) {}
      }
    }
  }]);
}();
function _open(auth, url, name) {
  var width = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : DEFAULT_WIDTH;
  var height = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : DEFAULT_HEIGHT;
  var top = Math.max((window.screen.availHeight - height) / 2, 0).toString();
  var left = Math.max((window.screen.availWidth - width) / 2, 0).toString();
  var target = '';
  var options = Object.assign(Object.assign({}, BASE_POPUP_OPTIONS), {
    width: width.toString(),
    height: height.toString(),
    top: top,
    left: left
  });
  // Chrome iOS 7 and 8 is returning an undefined popup win when target is
  // specified, even though the popup is not necessarily blocked.
  var ua = (0, _util.getUA)().toLowerCase();
  if (name) {
    target = _isChromeIOS(ua) ? TARGET_BLANK : name;
  }
  if (_isFirefox(ua)) {
    // Firefox complains when invalid URLs are popped out. Hacky way to bypass.
    url = url || FIREFOX_EMPTY_URL;
    // Firefox disables by default scrolling on popup windows, which can create
    // issues when the user has many Google accounts, for instance.
    options.scrollbars = 'yes';
  }
  var optionsString = Object.entries(options).reduce(function (accum, _ref33) {
    var _ref34 = _slicedToArray(_ref33, 2),
      key = _ref34[0],
      value = _ref34[1];
    return "".concat(accum).concat(key, "=").concat(value, ",");
  }, '');
  if (_isIOSStandalone(ua) && target !== '_self') {
    openAsNewWindowIOS(url || '', target);
    return new AuthPopup(null);
  }
  // about:blank getting sanitized causing browsers like IE/Edge to display
  // brief error message before redirecting to handler.
  var newWin = window.open(url || '', target, optionsString);
  _assert(newWin, auth, "popup-blocked" /* AuthErrorCode.POPUP_BLOCKED */);
  // Flaky on IE edge, encapsulate with a try and catch.
  try {
    newWin.focus();
  } catch (e) {}
  return new AuthPopup(newWin);
}
function openAsNewWindowIOS(url, target) {
  var el = document.createElement('a');
  el.href = url;
  el.target = target;
  var click = document.createEvent('MouseEvent');
  click.initMouseEvent('click', true, true, window, 1, 0, 0, 0, 0, false, false, false, false, 1, null);
  el.dispatchEvent(click);
}

/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * URL for Authentication widget which will initiate the OAuth handshake
 *
 * @internal
 */
var WIDGET_PATH = '__/auth/handler';
/**
 * URL for emulated environment
 *
 * @internal
 */
var EMULATOR_WIDGET_PATH = 'emulator/auth/handler';
/**
 * Fragment name for the App Check token that gets passed to the widget
 *
 * @internal
 */
var FIREBASE_APP_CHECK_FRAGMENT_ID = encodeURIComponent('fac');
function _getRedirectUrl(_x276, _x277, _x278, _x279, _x280, _x281) {
  return _getRedirectUrl2.apply(this, arguments);
}
function _getRedirectUrl2() {
  _getRedirectUrl2 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee204(auth, provider, authType, redirectUrl, eventId, additionalParams) {
    var params, _i6, _Object$entries, _Object$entries$_i, key, value, scopes, paramsDict, _i7, _Object$keys4, _key8, appCheckToken, appCheckTokenFragment;
    return _regeneratorRuntime().wrap(function _callee204$(_context204) {
      while (1) switch (_context204.prev = _context204.next) {
        case 0:
          _assert(auth.config.authDomain, auth, "auth-domain-config-required" /* AuthErrorCode.MISSING_AUTH_DOMAIN */);
          _assert(auth.config.apiKey, auth, "invalid-api-key" /* AuthErrorCode.INVALID_API_KEY */);
          params = {
            apiKey: auth.config.apiKey,
            appName: auth.name,
            authType: authType,
            redirectUrl: redirectUrl,
            v: _app.SDK_VERSION,
            eventId: eventId
          };
          if (provider instanceof FederatedAuthProvider) {
            provider.setDefaultLanguage(auth.languageCode);
            params.providerId = provider.providerId || '';
            if (!(0, _util.isEmpty)(provider.getCustomParameters())) {
              params.customParameters = JSON.stringify(provider.getCustomParameters());
            }
            // TODO set additionalParams from the provider as well?
            for (_i6 = 0, _Object$entries = Object.entries(additionalParams || {}); _i6 < _Object$entries.length; _i6++) {
              _Object$entries$_i = _slicedToArray(_Object$entries[_i6], 2), key = _Object$entries$_i[0], value = _Object$entries$_i[1];
              params[key] = value;
            }
          }
          if (provider instanceof BaseOAuthProvider) {
            scopes = provider.getScopes().filter(function (scope) {
              return scope !== '';
            });
            if (scopes.length > 0) {
              params.scopes = scopes.join(',');
            }
          }
          if (auth.tenantId) {
            params.tid = auth.tenantId;
          }
          // TODO: maybe set eid as endpointId
          // TODO: maybe set fw as Frameworks.join(",")
          paramsDict = params;
          for (_i7 = 0, _Object$keys4 = Object.keys(paramsDict); _i7 < _Object$keys4.length; _i7++) {
            _key8 = _Object$keys4[_i7];
            if (paramsDict[_key8] === undefined) {
              delete paramsDict[_key8];
            }
          }
          // Sets the App Check token to pass to the widget
          _context204.next = 10;
          return auth._getAppCheckToken();
        case 10:
          appCheckToken = _context204.sent;
          appCheckTokenFragment = appCheckToken ? "#".concat(FIREBASE_APP_CHECK_FRAGMENT_ID, "=").concat(encodeURIComponent(appCheckToken)) : ''; // Start at index 1 to skip the leading '&' in the query string
          return _context204.abrupt("return", "".concat(getHandlerBase(auth), "?").concat((0, _util.querystring)(paramsDict).slice(1)).concat(appCheckTokenFragment));
        case 13:
        case "end":
          return _context204.stop();
      }
    }, _callee204);
  }));
  return _getRedirectUrl2.apply(this, arguments);
}
function getHandlerBase(_ref35) {
  var config = _ref35.config;
  if (!config.emulator) {
    return "https://".concat(config.authDomain, "/").concat(WIDGET_PATH);
  }
  return _emulatorUrl(config, EMULATOR_WIDGET_PATH);
}

/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * The special web storage event
 *
 */
var WEB_STORAGE_SUPPORT_KEY = 'webStorageSupport';
var BrowserPopupRedirectResolver = /*#__PURE__*/function () {
  function BrowserPopupRedirectResolver() {
    _classCallCheck(this, BrowserPopupRedirectResolver);
    this.eventManagers = {};
    this.iframes = {};
    this.originValidationPromises = {};
    this._redirectPersistence = browserSessionPersistence;
    this._completeRedirectFn = _getRedirectResult;
    this._overrideRedirectResult = _overrideRedirectResult;
  }
  // Wrapping in async even though we don't await anywhere in order
  // to make sure errors are raised as promise rejections
  return _createClass(BrowserPopupRedirectResolver, [{
    key: "_openPopup",
    value: function () {
      var _openPopup2 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee97(auth, provider, authType, eventId) {
        var _a, url;
        return _regeneratorRuntime().wrap(function _callee97$(_context97) {
          while (1) switch (_context97.prev = _context97.next) {
            case 0:
              debugAssert((_a = this.eventManagers[auth._key()]) === null || _a === void 0 ? void 0 : _a.manager, '_initialize() not called before _openPopup()');
              _context97.next = 3;
              return _getRedirectUrl(auth, provider, authType, _getCurrentUrl(), eventId);
            case 3:
              url = _context97.sent;
              return _context97.abrupt("return", _open(auth, url, _generateEventId()));
            case 5:
            case "end":
              return _context97.stop();
          }
        }, _callee97, this);
      }));
      function _openPopup(_x282, _x283, _x284, _x285) {
        return _openPopup2.apply(this, arguments);
      }
      return _openPopup;
    }()
  }, {
    key: "_openRedirect",
    value: function () {
      var _openRedirect2 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee98(auth, provider, authType, eventId) {
        var url;
        return _regeneratorRuntime().wrap(function _callee98$(_context98) {
          while (1) switch (_context98.prev = _context98.next) {
            case 0:
              _context98.next = 2;
              return this._originValidation(auth);
            case 2:
              _context98.next = 4;
              return _getRedirectUrl(auth, provider, authType, _getCurrentUrl(), eventId);
            case 4:
              url = _context98.sent;
              _setWindowLocation(url);
              return _context98.abrupt("return", new Promise(function () {}));
            case 7:
            case "end":
              return _context98.stop();
          }
        }, _callee98, this);
      }));
      function _openRedirect(_x286, _x287, _x288, _x289) {
        return _openRedirect2.apply(this, arguments);
      }
      return _openRedirect;
    }()
  }, {
    key: "_initialize",
    value: function _initialize(auth) {
      var _this45 = this;
      var key = auth._key();
      if (this.eventManagers[key]) {
        var _this$eventManagers$k = this.eventManagers[key],
          manager = _this$eventManagers$k.manager,
          _promise = _this$eventManagers$k.promise;
        if (manager) {
          return Promise.resolve(manager);
        } else {
          debugAssert(_promise, 'If manager is not set, promise should be');
          return _promise;
        }
      }
      var promise = this.initAndGetManager(auth);
      this.eventManagers[key] = {
        promise: promise
      };
      // If the promise is rejected, the key should be removed so that the
      // operation can be retried later.
      promise.catch(function () {
        delete _this45.eventManagers[key];
      });
      return promise;
    }
  }, {
    key: "initAndGetManager",
    value: function () {
      var _initAndGetManager = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee99(auth) {
        var iframe, manager;
        return _regeneratorRuntime().wrap(function _callee99$(_context99) {
          while (1) switch (_context99.prev = _context99.next) {
            case 0:
              _context99.next = 2;
              return _openIframe(auth);
            case 2:
              iframe = _context99.sent;
              manager = new AuthEventManager(auth);
              iframe.register('authEvent', function (iframeEvent) {
                _assert(iframeEvent === null || iframeEvent === void 0 ? void 0 : iframeEvent.authEvent, auth, "invalid-auth-event" /* AuthErrorCode.INVALID_AUTH_EVENT */);
                // TODO: Consider splitting redirect and popup events earlier on
                var handled = manager.onEvent(iframeEvent.authEvent);
                return {
                  status: handled ? "ACK" /* GapiOutcome.ACK */ : "ERROR" /* GapiOutcome.ERROR */
                };
              }, gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER);
              this.eventManagers[auth._key()] = {
                manager: manager
              };
              this.iframes[auth._key()] = iframe;
              return _context99.abrupt("return", manager);
            case 8:
            case "end":
              return _context99.stop();
          }
        }, _callee99, this);
      }));
      function initAndGetManager(_x290) {
        return _initAndGetManager.apply(this, arguments);
      }
      return initAndGetManager;
    }()
  }, {
    key: "_isIframeWebStorageSupported",
    value: function _isIframeWebStorageSupported(auth, cb) {
      var iframe = this.iframes[auth._key()];
      iframe.send(WEB_STORAGE_SUPPORT_KEY, {
        type: WEB_STORAGE_SUPPORT_KEY
      }, function (result) {
        var _a;
        var isSupported = (_a = result === null || result === void 0 ? void 0 : result[0]) === null || _a === void 0 ? void 0 : _a[WEB_STORAGE_SUPPORT_KEY];
        if (isSupported !== undefined) {
          cb(!!isSupported);
        }
        _fail(auth, "internal-error" /* AuthErrorCode.INTERNAL_ERROR */);
      }, gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER);
    }
  }, {
    key: "_originValidation",
    value: function _originValidation(auth) {
      var key = auth._key();
      if (!this.originValidationPromises[key]) {
        this.originValidationPromises[key] = _validateOrigin(auth);
      }
      return this.originValidationPromises[key];
    }
  }, {
    key: "_shouldInitProactively",
    get: function get() {
      // Mobile browsers and Safari need to optimistically initialize
      return _isMobileBrowser() || _isSafari() || _isIOS();
    }
  }]);
}();
/**
 * An implementation of {@link PopupRedirectResolver} suitable for browser
 * based applications.
 *
 * @remarks
 * This method does not work in a Node.js environment.
 *
 * @public
 */
var browserPopupRedirectResolver = exports.m = BrowserPopupRedirectResolver;
var MultiFactorAssertionImpl = /*#__PURE__*/function () {
  function MultiFactorAssertionImpl(factorId) {
    _classCallCheck(this, MultiFactorAssertionImpl);
    this.factorId = factorId;
  }
  return _createClass(MultiFactorAssertionImpl, [{
    key: "_process",
    value: function _process(auth, session, displayName) {
      switch (session.type) {
        case "enroll" /* MultiFactorSessionType.ENROLL */:
          return this._finalizeEnroll(auth, session.credential, displayName);
        case "signin" /* MultiFactorSessionType.SIGN_IN */:
          return this._finalizeSignIn(auth, session.credential);
        default:
          return debugFail('unexpected MultiFactorSessionType');
      }
    }
  }]);
}();
/**
 * {@inheritdoc PhoneMultiFactorAssertion}
 *
 * @public
 */
var PhoneMultiFactorAssertionImpl = /*#__PURE__*/function (_MultiFactorAssertion) {
  function PhoneMultiFactorAssertionImpl(credential) {
    var _this46;
    _classCallCheck(this, PhoneMultiFactorAssertionImpl);
    _this46 = _callSuper(this, PhoneMultiFactorAssertionImpl, ["phone" /* FactorId.PHONE */]);
    _this46.credential = credential;
    return _this46;
  }
  /** @internal */
  _inherits(PhoneMultiFactorAssertionImpl, _MultiFactorAssertion);
  return _createClass(PhoneMultiFactorAssertionImpl, [{
    key: "_finalizeEnroll",
    value: /** @internal */
    function _finalizeEnroll(auth, idToken, displayName) {
      return finalizeEnrollPhoneMfa(auth, {
        idToken: idToken,
        displayName: displayName,
        phoneVerificationInfo: this.credential._makeVerificationRequest()
      });
    }
    /** @internal */
  }, {
    key: "_finalizeSignIn",
    value: function _finalizeSignIn(auth, mfaPendingCredential) {
      return finalizeSignInPhoneMfa(auth, {
        mfaPendingCredential: mfaPendingCredential,
        phoneVerificationInfo: this.credential._makeVerificationRequest()
      });
    }
  }], [{
    key: "_fromCredential",
    value: function _fromCredential(credential) {
      return new PhoneMultiFactorAssertionImpl(credential);
    }
  }]);
}(MultiFactorAssertionImpl);
/**
 * Provider for generating a {@link PhoneMultiFactorAssertion}.
 *
 * @public
 */
var PhoneMultiFactorGenerator = exports.n = /*#__PURE__*/function () {
  function PhoneMultiFactorGenerator() {
    _classCallCheck(this, PhoneMultiFactorGenerator);
  }
  /**
   * Provides a {@link PhoneMultiFactorAssertion} to confirm ownership of the phone second factor.
   *
   * @remarks
   * This method does not work in a Node.js environment.
   *
   * @param phoneAuthCredential - A credential provided by {@link PhoneAuthProvider.credential}.
   * @returns A {@link PhoneMultiFactorAssertion} which can be used with
   * {@link MultiFactorResolver.resolveSignIn}
   */
  return _createClass(PhoneMultiFactorGenerator, null, [{
    key: "assertion",
    value: function assertion(credential) {
      return PhoneMultiFactorAssertionImpl._fromCredential(credential);
    }
  }]);
}();
/**
 * The identifier of the phone second factor: `phone`.
 */
PhoneMultiFactorGenerator.FACTOR_ID = 'phone';

/**
 * Provider for generating a {@link TotpMultiFactorAssertion}.
 *
 * @public
 */
var TotpMultiFactorGenerator = exports.T = /*#__PURE__*/function () {
  function TotpMultiFactorGenerator() {
    _classCallCheck(this, TotpMultiFactorGenerator);
  }
  return _createClass(TotpMultiFactorGenerator, null, [{
    key: "assertionForEnrollment",
    value:
    /**
     * Provides a {@link TotpMultiFactorAssertion} to confirm ownership of
     * the TOTP (time-based one-time password) second factor.
     * This assertion is used to complete enrollment in TOTP second factor.
     *
     * @param secret A {@link TotpSecret} containing the shared secret key and other TOTP parameters.
     * @param oneTimePassword One-time password from TOTP App.
     * @returns A {@link TotpMultiFactorAssertion} which can be used with
     * {@link MultiFactorUser.enroll}.
     */
    function assertionForEnrollment(secret, oneTimePassword) {
      return TotpMultiFactorAssertionImpl._fromSecret(secret, oneTimePassword);
    }
    /**
     * Provides a {@link TotpMultiFactorAssertion} to confirm ownership of the TOTP second factor.
     * This assertion is used to complete signIn with TOTP as the second factor.
     *
     * @param enrollmentId identifies the enrolled TOTP second factor.
     * @param oneTimePassword One-time password from TOTP App.
     * @returns A {@link TotpMultiFactorAssertion} which can be used with
     * {@link MultiFactorResolver.resolveSignIn}.
     */
  }, {
    key: "assertionForSignIn",
    value: function assertionForSignIn(enrollmentId, oneTimePassword) {
      return TotpMultiFactorAssertionImpl._fromEnrollmentId(enrollmentId, oneTimePassword);
    }
    /**
     * Returns a promise to {@link TotpSecret} which contains the TOTP shared secret key and other parameters.
     * Creates a TOTP secret as part of enrolling a TOTP second factor.
     * Used for generating a QR code URL or inputting into a TOTP app.
     * This method uses the auth instance corresponding to the user in the multiFactorSession.
     *
     * @param session The {@link MultiFactorSession} that the user is part of.
     * @returns A promise to {@link TotpSecret}.
     */
  }, {
    key: "generateSecret",
    value: (function () {
      var _generateSecret = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee100(session) {
        var _a, mfaSession, response;
        return _regeneratorRuntime().wrap(function _callee100$(_context100) {
          while (1) switch (_context100.prev = _context100.next) {
            case 0:
              mfaSession = session;
              _assert(typeof ((_a = mfaSession.user) === null || _a === void 0 ? void 0 : _a.auth) !== 'undefined', "internal-error" /* AuthErrorCode.INTERNAL_ERROR */);
              _context100.next = 4;
              return startEnrollTotpMfa(mfaSession.user.auth, {
                idToken: mfaSession.credential,
                totpEnrollmentInfo: {}
              });
            case 4:
              response = _context100.sent;
              return _context100.abrupt("return", TotpSecret._fromStartTotpMfaEnrollmentResponse(response, mfaSession.user.auth));
            case 6:
            case "end":
              return _context100.stop();
          }
        }, _callee100);
      }));
      function generateSecret(_x291) {
        return _generateSecret.apply(this, arguments);
      }
      return generateSecret;
    }())
  }]);
}();
/**
 * The identifier of the TOTP second factor: `totp`.
 */
TotpMultiFactorGenerator.FACTOR_ID = "totp" /* FactorId.TOTP */;
var TotpMultiFactorAssertionImpl = /*#__PURE__*/function (_MultiFactorAssertion2) {
  function TotpMultiFactorAssertionImpl(otp, enrollmentId, secret) {
    var _this47;
    _classCallCheck(this, TotpMultiFactorAssertionImpl);
    _this47 = _callSuper(this, TotpMultiFactorAssertionImpl, ["totp" /* FactorId.TOTP */]);
    _this47.otp = otp;
    _this47.enrollmentId = enrollmentId;
    _this47.secret = secret;
    return _this47;
  }
  /** @internal */
  _inherits(TotpMultiFactorAssertionImpl, _MultiFactorAssertion2);
  return _createClass(TotpMultiFactorAssertionImpl, [{
    key: "_finalizeEnroll",
    value: (/** @internal */function () {
      var _finalizeEnroll2 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee101(auth, idToken, displayName) {
        return _regeneratorRuntime().wrap(function _callee101$(_context101) {
          while (1) switch (_context101.prev = _context101.next) {
            case 0:
              _assert(typeof this.secret !== 'undefined', auth, "argument-error" /* AuthErrorCode.ARGUMENT_ERROR */);
              return _context101.abrupt("return", finalizeEnrollTotpMfa(auth, {
                idToken: idToken,
                displayName: displayName,
                totpVerificationInfo: this.secret._makeTotpVerificationInfo(this.otp)
              }));
            case 2:
            case "end":
              return _context101.stop();
          }
        }, _callee101, this);
      }));
      function _finalizeEnroll(_x292, _x293, _x294) {
        return _finalizeEnroll2.apply(this, arguments);
      }
      return _finalizeEnroll;
    }() /** @internal */)
  }, {
    key: "_finalizeSignIn",
    value: (function () {
      var _finalizeSignIn2 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee102(auth, mfaPendingCredential) {
        var totpVerificationInfo;
        return _regeneratorRuntime().wrap(function _callee102$(_context102) {
          while (1) switch (_context102.prev = _context102.next) {
            case 0:
              _assert(this.enrollmentId !== undefined && this.otp !== undefined, auth, "argument-error" /* AuthErrorCode.ARGUMENT_ERROR */);
              totpVerificationInfo = {
                verificationCode: this.otp
              };
              return _context102.abrupt("return", finalizeSignInTotpMfa(auth, {
                mfaPendingCredential: mfaPendingCredential,
                mfaEnrollmentId: this.enrollmentId,
                totpVerificationInfo: totpVerificationInfo
              }));
            case 3:
            case "end":
              return _context102.stop();
          }
        }, _callee102, this);
      }));
      function _finalizeSignIn(_x295, _x296) {
        return _finalizeSignIn2.apply(this, arguments);
      }
      return _finalizeSignIn;
    }())
  }], [{
    key: "_fromSecret",
    value: function _fromSecret(secret, otp) {
      return new TotpMultiFactorAssertionImpl(otp, undefined, secret);
    }
    /** @internal */
  }, {
    key: "_fromEnrollmentId",
    value: function _fromEnrollmentId(enrollmentId, otp) {
      return new TotpMultiFactorAssertionImpl(otp, enrollmentId);
    }
  }]);
}(MultiFactorAssertionImpl);
/**
 * Provider for generating a {@link TotpMultiFactorAssertion}.
 *
 * Stores the shared secret key and other parameters to generate time-based OTPs.
 * Implements methods to retrieve the shared secret key and generate a QR code URL.
 * @public
 */
var TotpSecret = exports.o = /*#__PURE__*/function () {
  // The public members are declared outside the constructor so the docs can be generated.
  function TotpSecret(secretKey, hashingAlgorithm, codeLength, codeIntervalSeconds, enrollmentCompletionDeadline, sessionInfo, auth) {
    _classCallCheck(this, TotpSecret);
    this.sessionInfo = sessionInfo;
    this.auth = auth;
    this.secretKey = secretKey;
    this.hashingAlgorithm = hashingAlgorithm;
    this.codeLength = codeLength;
    this.codeIntervalSeconds = codeIntervalSeconds;
    this.enrollmentCompletionDeadline = enrollmentCompletionDeadline;
  }
  /** @internal */
  return _createClass(TotpSecret, [{
    key: "_makeTotpVerificationInfo",
    value: /** @internal */
    function _makeTotpVerificationInfo(otp) {
      return {
        sessionInfo: this.sessionInfo,
        verificationCode: otp
      };
    }
    /**
     * Returns a QR code URL as described in
     * https://github.com/google/google-authenticator/wiki/Key-Uri-Format
     * This can be displayed to the user as a QR code to be scanned into a TOTP app like Google Authenticator.
     * If the optional parameters are unspecified, an accountName of <userEmail> and issuer of <firebaseAppName> are used.
     *
     * @param accountName the name of the account/app along with a user identifier.
     * @param issuer issuer of the TOTP (likely the app name).
     * @returns A QR code URL string.
     */
  }, {
    key: "generateQrCodeUrl",
    value: function generateQrCodeUrl(accountName, issuer) {
      var _a;
      var useDefaults = false;
      if (_isEmptyString(accountName) || _isEmptyString(issuer)) {
        useDefaults = true;
      }
      if (useDefaults) {
        if (_isEmptyString(accountName)) {
          accountName = ((_a = this.auth.currentUser) === null || _a === void 0 ? void 0 : _a.email) || 'unknownuser';
        }
        if (_isEmptyString(issuer)) {
          issuer = this.auth.name;
        }
      }
      return "otpauth://totp/".concat(issuer, ":").concat(accountName, "?secret=").concat(this.secretKey, "&issuer=").concat(issuer, "&algorithm=").concat(this.hashingAlgorithm, "&digits=").concat(this.codeLength);
    }
  }], [{
    key: "_fromStartTotpMfaEnrollmentResponse",
    value: function _fromStartTotpMfaEnrollmentResponse(response, auth) {
      return new TotpSecret(response.totpSessionInfo.sharedSecretKey, response.totpSessionInfo.hashingAlgorithm, response.totpSessionInfo.verificationCodeLength, response.totpSessionInfo.periodSec, new Date(response.totpSessionInfo.finalizeEnrollmentTime).toUTCString(), response.totpSessionInfo.sessionInfo, auth);
    }
  }]);
}();
/** @internal */
function _isEmptyString(input) {
  return typeof input === 'undefined' || (input === null || input === void 0 ? void 0 : input.length) === 0;
}
var name = "@firebase/auth";
var version = "1.10.5";

/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var AuthInterop = /*#__PURE__*/function () {
  function AuthInterop(auth) {
    _classCallCheck(this, AuthInterop);
    this.auth = auth;
    this.internalListeners = new Map();
  }
  return _createClass(AuthInterop, [{
    key: "getUid",
    value: function getUid() {
      var _a;
      this.assertAuthConfigured();
      return ((_a = this.auth.currentUser) === null || _a === void 0 ? void 0 : _a.uid) || null;
    }
  }, {
    key: "getToken",
    value: function () {
      var _getToken2 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee103(forceRefresh) {
        var accessToken;
        return _regeneratorRuntime().wrap(function _callee103$(_context103) {
          while (1) switch (_context103.prev = _context103.next) {
            case 0:
              this.assertAuthConfigured();
              _context103.next = 3;
              return this.auth._initializationPromise;
            case 3:
              if (this.auth.currentUser) {
                _context103.next = 5;
                break;
              }
              return _context103.abrupt("return", null);
            case 5:
              _context103.next = 7;
              return this.auth.currentUser.getIdToken(forceRefresh);
            case 7:
              accessToken = _context103.sent;
              return _context103.abrupt("return", {
                accessToken: accessToken
              });
            case 9:
            case "end":
              return _context103.stop();
          }
        }, _callee103, this);
      }));
      function getToken(_x297) {
        return _getToken2.apply(this, arguments);
      }
      return getToken;
    }()
  }, {
    key: "addAuthTokenListener",
    value: function addAuthTokenListener(listener) {
      this.assertAuthConfigured();
      if (this.internalListeners.has(listener)) {
        return;
      }
      var unsubscribe = this.auth.onIdTokenChanged(function (user) {
        listener((user === null || user === void 0 ? void 0 : user.stsTokenManager.accessToken) || null);
      });
      this.internalListeners.set(listener, unsubscribe);
      this.updateProactiveRefresh();
    }
  }, {
    key: "removeAuthTokenListener",
    value: function removeAuthTokenListener(listener) {
      this.assertAuthConfigured();
      var unsubscribe = this.internalListeners.get(listener);
      if (!unsubscribe) {
        return;
      }
      this.internalListeners.delete(listener);
      unsubscribe();
      this.updateProactiveRefresh();
    }
  }, {
    key: "assertAuthConfigured",
    value: function assertAuthConfigured() {
      _assert(this.auth._initializationPromise, "dependent-sdk-initialized-before-auth" /* AuthErrorCode.DEPENDENT_SDK_INIT_BEFORE_AUTH */);
    }
  }, {
    key: "updateProactiveRefresh",
    value: function updateProactiveRefresh() {
      if (this.internalListeners.size > 0) {
        this.auth._startProactiveRefresh();
      } else {
        this.auth._stopProactiveRefresh();
      }
    }
  }]);
}();
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function getVersionForPlatform(clientPlatform) {
  switch (clientPlatform) {
    case "Node" /* ClientPlatform.NODE */:
      return 'node';
    case "ReactNative" /* ClientPlatform.REACT_NATIVE */:
      return 'rn';
    case "Worker" /* ClientPlatform.WORKER */:
      return 'webworker';
    case "Cordova" /* ClientPlatform.CORDOVA */:
      return 'cordova';
    case "WebExtension" /* ClientPlatform.WEB_EXTENSION */:
      return 'web-extension';
    default:
      return undefined;
  }
}
/** @internal */
function registerAuth(clientPlatform) {
  (0, _app._registerComponent)(new _component.Component("auth" /* _ComponentName.AUTH */, function (container, _ref36) {
    var deps = _ref36.options;
    var app = container.getProvider('app').getImmediate();
    var heartbeatServiceProvider = container.getProvider('heartbeat');
    var appCheckServiceProvider = container.getProvider('app-check-internal');
    var _app$options = app.options,
      apiKey = _app$options.apiKey,
      authDomain = _app$options.authDomain;
    _assert(apiKey && !apiKey.includes(':'), "invalid-api-key" /* AuthErrorCode.INVALID_API_KEY */, {
      appName: app.name
    });
    var config = {
      apiKey: apiKey,
      authDomain: authDomain,
      clientPlatform: clientPlatform,
      apiHost: "identitytoolkit.googleapis.com" /* DefaultConfig.API_HOST */,
      tokenApiHost: "securetoken.googleapis.com" /* DefaultConfig.TOKEN_API_HOST */,
      apiScheme: "https" /* DefaultConfig.API_SCHEME */,
      sdkClientVersion: _getClientVersion(clientPlatform)
    };
    var authInstance = new AuthImpl(app, heartbeatServiceProvider, appCheckServiceProvider, config);
    _initializeAuthInstance(authInstance, deps);
    return authInstance;
  }, "PUBLIC" /* ComponentType.PUBLIC */)
  /**
   * Auth can only be initialized by explicitly calling getAuth() or initializeAuth()
   * For why we do this, See go/firebase-next-auth-init
   */.setInstantiationMode("EXPLICIT" /* InstantiationMode.EXPLICIT */)
  /**
   * Because all firebase products that depend on auth depend on auth-internal directly,
   * we need to initialize auth-internal after auth is initialized to make it available to other firebase products.
   */.setInstanceCreatedCallback(function (container, _instanceIdentifier, _instance) {
    var authInternalProvider = container.getProvider("auth-internal" /* _ComponentName.AUTH_INTERNAL */);
    authInternalProvider.initialize();
  }));
  (0, _app._registerComponent)(new _component.Component("auth-internal" /* _ComponentName.AUTH_INTERNAL */, function (container) {
    var auth = _castAuth(container.getProvider("auth" /* _ComponentName.AUTH */).getImmediate());
    return function (auth) {
      return new AuthInterop(auth);
    }(auth);
  }, "PRIVATE" /* ComponentType.PRIVATE */).setInstantiationMode("EXPLICIT" /* InstantiationMode.EXPLICIT */));
  (0, _app.registerVersion)(name, version, getVersionForPlatform(clientPlatform));
  // BUILD_TARGET will be replaced by values like esm2017, cjs2017, etc during the compilation
  (0, _app.registerVersion)(name, version, 'esm2017');
}

/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var DEFAULT_ID_TOKEN_MAX_AGE = 5 * 60;
var authIdTokenMaxAge = (0, _util.getExperimentalSetting)('authIdTokenMaxAge') || DEFAULT_ID_TOKEN_MAX_AGE;
var lastPostedIdToken = null;
var mintCookieFactory = function mintCookieFactory(url) {
  return /*#__PURE__*/function () {
    var _ref37 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee104(user) {
      var idTokenResult, idTokenAge, idToken;
      return _regeneratorRuntime().wrap(function _callee104$(_context104) {
        while (1) switch (_context104.prev = _context104.next) {
          case 0:
            _context104.t0 = user;
            if (!_context104.t0) {
              _context104.next = 5;
              break;
            }
            _context104.next = 4;
            return user.getIdTokenResult();
          case 4:
            _context104.t0 = _context104.sent;
          case 5:
            idTokenResult = _context104.t0;
            idTokenAge = idTokenResult && (new Date().getTime() - Date.parse(idTokenResult.issuedAtTime)) / 1000;
            if (!(idTokenAge && idTokenAge > authIdTokenMaxAge)) {
              _context104.next = 9;
              break;
            }
            return _context104.abrupt("return");
          case 9:
            // Specifically trip null => undefined when logged out, to delete any existing cookie
            idToken = idTokenResult === null || idTokenResult === void 0 ? void 0 : idTokenResult.token;
            if (!(lastPostedIdToken === idToken)) {
              _context104.next = 12;
              break;
            }
            return _context104.abrupt("return");
          case 12:
            lastPostedIdToken = idToken;
            _context104.next = 15;
            return fetch(url, {
              method: idToken ? 'POST' : 'DELETE',
              headers: idToken ? {
                'Authorization': "Bearer ".concat(idToken)
              } : {}
            });
          case 15:
          case "end":
            return _context104.stop();
        }
      }, _callee104);
    }));
    return function (_x298) {
      return _ref37.apply(this, arguments);
    };
  }();
};
/**
 * Returns the Auth instance associated with the provided {@link @firebase/app#FirebaseApp}.
 * If no instance exists, initializes an Auth instance with platform-specific default dependencies.
 *
 * @param app - The Firebase App.
 *
 * @public
 */
function getAuth() {
  var app = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : (0, _app.getApp)();
  var provider = (0, _app._getProvider)(app, 'auth');
  if (provider.isInitialized()) {
    return provider.getImmediate();
  }
  var auth = initializeAuth(app, {
    popupRedirectResolver: browserPopupRedirectResolver,
    persistence: [indexedDBLocalPersistence, browserLocalPersistence, browserSessionPersistence]
  });
  var authTokenSyncPath = (0, _util.getExperimentalSetting)('authTokenSyncURL');
  // Only do the Cookie exchange in a secure context
  if (authTokenSyncPath && typeof isSecureContext === 'boolean' && isSecureContext) {
    // Don't allow urls (XSS possibility), only paths on the same domain
    var authTokenSyncUrl = new URL(authTokenSyncPath, location.origin);
    if (location.origin === authTokenSyncUrl.origin) {
      var mintCookie = mintCookieFactory(authTokenSyncUrl.toString());
      beforeAuthStateChanged(auth, mintCookie, function () {
        return mintCookie(auth.currentUser);
      });
      onIdTokenChanged(auth, function (user) {
        return mintCookie(user);
      });
    }
  }
  var authEmulatorHost = (0, _util.getDefaultEmulatorHost)('auth');
  if (authEmulatorHost) {
    connectAuthEmulator(auth, "http://".concat(authEmulatorHost));
  } else {
    (0, _util.updateEmulatorBanner)('Auth', false);
  }
  return auth;
}
function getScriptParentElement() {
  var _a, _b;
  return (_b = (_a = document.getElementsByTagName('head')) === null || _a === void 0 ? void 0 : _a[0]) !== null && _b !== void 0 ? _b : document;
}
_setExternalJSProvider({
  loadJS: function loadJS(url) {
    // TODO: consider adding timeout support & cancellation
    return new Promise(function (resolve, reject) {
      var el = document.createElement('script');
      el.setAttribute('src', url);
      el.onload = resolve;
      el.onerror = function (e) {
        var error = _createError("internal-error" /* AuthErrorCode.INTERNAL_ERROR */);
        error.customData = e;
        reject(error);
      };
      el.type = 'text/javascript';
      el.charset = 'UTF-8';
      getScriptParentElement().appendChild(el);
    });
  },
  gapiScript: 'https://apis.google.com/js/api.js',
  recaptchaV2Script: 'https://www.google.com/recaptcha/api.js',
  recaptchaEnterpriseScript: 'https://www.google.com/recaptcha/enterprise.js?render='
});
registerAuth("Browser" /* ClientPlatform.BROWSER */);
},{"@firebase/app":"../node_modules/@firebase/app/dist/esm/index.esm2017.js","@firebase/util":"../node_modules/@firebase/util/dist/index.esm2017.js","@firebase/logger":"../node_modules/@firebase/logger/dist/esm/index.esm2017.js","tslib":"../node_modules/tslib/tslib.es6.js","@firebase/component":"../node_modules/@firebase/component/dist/esm/index.esm2017.js"}],"../node_modules/@firebase/auth/dist/esm2017/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "ActionCodeOperation", {
  enumerable: true,
  get: function () {
    return _indexAc41aa6f.A;
  }
});
Object.defineProperty(exports, "ActionCodeURL", {
  enumerable: true,
  get: function () {
    return _indexAc41aa6f.aj;
  }
});
Object.defineProperty(exports, "AuthCredential", {
  enumerable: true,
  get: function () {
    return _indexAc41aa6f.M;
  }
});
Object.defineProperty(exports, "AuthErrorCodes", {
  enumerable: true,
  get: function () {
    return _indexAc41aa6f.J;
  }
});
Object.defineProperty(exports, "EmailAuthCredential", {
  enumerable: true,
  get: function () {
    return _indexAc41aa6f.N;
  }
});
Object.defineProperty(exports, "EmailAuthProvider", {
  enumerable: true,
  get: function () {
    return _indexAc41aa6f.W;
  }
});
Object.defineProperty(exports, "FacebookAuthProvider", {
  enumerable: true,
  get: function () {
    return _indexAc41aa6f.X;
  }
});
Object.defineProperty(exports, "FactorId", {
  enumerable: true,
  get: function () {
    return _indexAc41aa6f.F;
  }
});
Object.defineProperty(exports, "GithubAuthProvider", {
  enumerable: true,
  get: function () {
    return _indexAc41aa6f.Z;
  }
});
Object.defineProperty(exports, "GoogleAuthProvider", {
  enumerable: true,
  get: function () {
    return _indexAc41aa6f.Y;
  }
});
Object.defineProperty(exports, "OAuthCredential", {
  enumerable: true,
  get: function () {
    return _indexAc41aa6f.Q;
  }
});
Object.defineProperty(exports, "OAuthProvider", {
  enumerable: true,
  get: function () {
    return _indexAc41aa6f._;
  }
});
Object.defineProperty(exports, "OperationType", {
  enumerable: true,
  get: function () {
    return _indexAc41aa6f.O;
  }
});
Object.defineProperty(exports, "PhoneAuthCredential", {
  enumerable: true,
  get: function () {
    return _indexAc41aa6f.U;
  }
});
Object.defineProperty(exports, "PhoneAuthProvider", {
  enumerable: true,
  get: function () {
    return _indexAc41aa6f.P;
  }
});
Object.defineProperty(exports, "PhoneMultiFactorGenerator", {
  enumerable: true,
  get: function () {
    return _indexAc41aa6f.n;
  }
});
Object.defineProperty(exports, "ProviderId", {
  enumerable: true,
  get: function () {
    return _indexAc41aa6f.q;
  }
});
Object.defineProperty(exports, "RecaptchaVerifier", {
  enumerable: true,
  get: function () {
    return _indexAc41aa6f.R;
  }
});
Object.defineProperty(exports, "SAMLAuthProvider", {
  enumerable: true,
  get: function () {
    return _indexAc41aa6f.$;
  }
});
Object.defineProperty(exports, "SignInMethod", {
  enumerable: true,
  get: function () {
    return _indexAc41aa6f.S;
  }
});
Object.defineProperty(exports, "TotpMultiFactorGenerator", {
  enumerable: true,
  get: function () {
    return _indexAc41aa6f.T;
  }
});
Object.defineProperty(exports, "TotpSecret", {
  enumerable: true,
  get: function () {
    return _indexAc41aa6f.o;
  }
});
Object.defineProperty(exports, "TwitterAuthProvider", {
  enumerable: true,
  get: function () {
    return _indexAc41aa6f.a0;
  }
});
Object.defineProperty(exports, "applyActionCode", {
  enumerable: true,
  get: function () {
    return _indexAc41aa6f.a8;
  }
});
Object.defineProperty(exports, "beforeAuthStateChanged", {
  enumerable: true,
  get: function () {
    return _indexAc41aa6f.y;
  }
});
Object.defineProperty(exports, "browserCookiePersistence", {
  enumerable: true,
  get: function () {
    return _indexAc41aa6f.a;
  }
});
Object.defineProperty(exports, "browserLocalPersistence", {
  enumerable: true,
  get: function () {
    return _indexAc41aa6f.b;
  }
});
Object.defineProperty(exports, "browserPopupRedirectResolver", {
  enumerable: true,
  get: function () {
    return _indexAc41aa6f.m;
  }
});
Object.defineProperty(exports, "browserSessionPersistence", {
  enumerable: true,
  get: function () {
    return _indexAc41aa6f.c;
  }
});
Object.defineProperty(exports, "checkActionCode", {
  enumerable: true,
  get: function () {
    return _indexAc41aa6f.a9;
  }
});
Object.defineProperty(exports, "confirmPasswordReset", {
  enumerable: true,
  get: function () {
    return _indexAc41aa6f.a7;
  }
});
Object.defineProperty(exports, "connectAuthEmulator", {
  enumerable: true,
  get: function () {
    return _indexAc41aa6f.L;
  }
});
Object.defineProperty(exports, "createUserWithEmailAndPassword", {
  enumerable: true,
  get: function () {
    return _indexAc41aa6f.ab;
  }
});
Object.defineProperty(exports, "debugErrorMap", {
  enumerable: true,
  get: function () {
    return _indexAc41aa6f.H;
  }
});
Object.defineProperty(exports, "deleteUser", {
  enumerable: true,
  get: function () {
    return _indexAc41aa6f.G;
  }
});
Object.defineProperty(exports, "fetchSignInMethodsForEmail", {
  enumerable: true,
  get: function () {
    return _indexAc41aa6f.ag;
  }
});
Object.defineProperty(exports, "getAdditionalUserInfo", {
  enumerable: true,
  get: function () {
    return _indexAc41aa6f.ar;
  }
});
Object.defineProperty(exports, "getAuth", {
  enumerable: true,
  get: function () {
    return _indexAc41aa6f.p;
  }
});
Object.defineProperty(exports, "getIdToken", {
  enumerable: true,
  get: function () {
    return _indexAc41aa6f.ao;
  }
});
Object.defineProperty(exports, "getIdTokenResult", {
  enumerable: true,
  get: function () {
    return _indexAc41aa6f.ap;
  }
});
Object.defineProperty(exports, "getMultiFactorResolver", {
  enumerable: true,
  get: function () {
    return _indexAc41aa6f.at;
  }
});
Object.defineProperty(exports, "getRedirectResult", {
  enumerable: true,
  get: function () {
    return _indexAc41aa6f.k;
  }
});
Object.defineProperty(exports, "inMemoryPersistence", {
  enumerable: true,
  get: function () {
    return _indexAc41aa6f.V;
  }
});
Object.defineProperty(exports, "indexedDBLocalPersistence", {
  enumerable: true,
  get: function () {
    return _indexAc41aa6f.i;
  }
});
Object.defineProperty(exports, "initializeAuth", {
  enumerable: true,
  get: function () {
    return _indexAc41aa6f.K;
  }
});
Object.defineProperty(exports, "initializeRecaptchaConfig", {
  enumerable: true,
  get: function () {
    return _indexAc41aa6f.v;
  }
});
Object.defineProperty(exports, "isSignInWithEmailLink", {
  enumerable: true,
  get: function () {
    return _indexAc41aa6f.ae;
  }
});
Object.defineProperty(exports, "linkWithCredential", {
  enumerable: true,
  get: function () {
    return _indexAc41aa6f.a3;
  }
});
Object.defineProperty(exports, "linkWithPhoneNumber", {
  enumerable: true,
  get: function () {
    return _indexAc41aa6f.l;
  }
});
Object.defineProperty(exports, "linkWithPopup", {
  enumerable: true,
  get: function () {
    return _indexAc41aa6f.e;
  }
});
Object.defineProperty(exports, "linkWithRedirect", {
  enumerable: true,
  get: function () {
    return _indexAc41aa6f.h;
  }
});
Object.defineProperty(exports, "multiFactor", {
  enumerable: true,
  get: function () {
    return _indexAc41aa6f.au;
  }
});
Object.defineProperty(exports, "onAuthStateChanged", {
  enumerable: true,
  get: function () {
    return _indexAc41aa6f.z;
  }
});
Object.defineProperty(exports, "onIdTokenChanged", {
  enumerable: true,
  get: function () {
    return _indexAc41aa6f.x;
  }
});
Object.defineProperty(exports, "parseActionCodeURL", {
  enumerable: true,
  get: function () {
    return _indexAc41aa6f.ak;
  }
});
Object.defineProperty(exports, "prodErrorMap", {
  enumerable: true,
  get: function () {
    return _indexAc41aa6f.I;
  }
});
Object.defineProperty(exports, "reauthenticateWithCredential", {
  enumerable: true,
  get: function () {
    return _indexAc41aa6f.a4;
  }
});
Object.defineProperty(exports, "reauthenticateWithPhoneNumber", {
  enumerable: true,
  get: function () {
    return _indexAc41aa6f.r;
  }
});
Object.defineProperty(exports, "reauthenticateWithPopup", {
  enumerable: true,
  get: function () {
    return _indexAc41aa6f.f;
  }
});
Object.defineProperty(exports, "reauthenticateWithRedirect", {
  enumerable: true,
  get: function () {
    return _indexAc41aa6f.j;
  }
});
Object.defineProperty(exports, "reload", {
  enumerable: true,
  get: function () {
    return _indexAc41aa6f.as;
  }
});
Object.defineProperty(exports, "revokeAccessToken", {
  enumerable: true,
  get: function () {
    return _indexAc41aa6f.E;
  }
});
Object.defineProperty(exports, "sendEmailVerification", {
  enumerable: true,
  get: function () {
    return _indexAc41aa6f.ah;
  }
});
Object.defineProperty(exports, "sendPasswordResetEmail", {
  enumerable: true,
  get: function () {
    return _indexAc41aa6f.a6;
  }
});
Object.defineProperty(exports, "sendSignInLinkToEmail", {
  enumerable: true,
  get: function () {
    return _indexAc41aa6f.ad;
  }
});
Object.defineProperty(exports, "setPersistence", {
  enumerable: true,
  get: function () {
    return _indexAc41aa6f.t;
  }
});
Object.defineProperty(exports, "signInAnonymously", {
  enumerable: true,
  get: function () {
    return _indexAc41aa6f.a1;
  }
});
Object.defineProperty(exports, "signInWithCredential", {
  enumerable: true,
  get: function () {
    return _indexAc41aa6f.a2;
  }
});
Object.defineProperty(exports, "signInWithCustomToken", {
  enumerable: true,
  get: function () {
    return _indexAc41aa6f.a5;
  }
});
Object.defineProperty(exports, "signInWithEmailAndPassword", {
  enumerable: true,
  get: function () {
    return _indexAc41aa6f.ac;
  }
});
Object.defineProperty(exports, "signInWithEmailLink", {
  enumerable: true,
  get: function () {
    return _indexAc41aa6f.af;
  }
});
Object.defineProperty(exports, "signInWithPhoneNumber", {
  enumerable: true,
  get: function () {
    return _indexAc41aa6f.s;
  }
});
Object.defineProperty(exports, "signInWithPopup", {
  enumerable: true,
  get: function () {
    return _indexAc41aa6f.d;
  }
});
Object.defineProperty(exports, "signInWithRedirect", {
  enumerable: true,
  get: function () {
    return _indexAc41aa6f.g;
  }
});
Object.defineProperty(exports, "signOut", {
  enumerable: true,
  get: function () {
    return _indexAc41aa6f.D;
  }
});
Object.defineProperty(exports, "unlink", {
  enumerable: true,
  get: function () {
    return _indexAc41aa6f.aq;
  }
});
Object.defineProperty(exports, "updateCurrentUser", {
  enumerable: true,
  get: function () {
    return _indexAc41aa6f.C;
  }
});
Object.defineProperty(exports, "updateEmail", {
  enumerable: true,
  get: function () {
    return _indexAc41aa6f.am;
  }
});
Object.defineProperty(exports, "updatePassword", {
  enumerable: true,
  get: function () {
    return _indexAc41aa6f.an;
  }
});
Object.defineProperty(exports, "updatePhoneNumber", {
  enumerable: true,
  get: function () {
    return _indexAc41aa6f.u;
  }
});
Object.defineProperty(exports, "updateProfile", {
  enumerable: true,
  get: function () {
    return _indexAc41aa6f.al;
  }
});
Object.defineProperty(exports, "useDeviceLanguage", {
  enumerable: true,
  get: function () {
    return _indexAc41aa6f.B;
  }
});
Object.defineProperty(exports, "validatePassword", {
  enumerable: true,
  get: function () {
    return _indexAc41aa6f.w;
  }
});
Object.defineProperty(exports, "verifyBeforeUpdateEmail", {
  enumerable: true,
  get: function () {
    return _indexAc41aa6f.ai;
  }
});
Object.defineProperty(exports, "verifyPasswordResetCode", {
  enumerable: true,
  get: function () {
    return _indexAc41aa6f.aa;
  }
});
var _indexAc41aa6f = require("./index-ac41aa6f.js");
require("@firebase/app");
require("@firebase/util");
require("@firebase/logger");
require("tslib");
require("@firebase/component");
},{"./index-ac41aa6f.js":"../node_modules/@firebase/auth/dist/esm2017/index-ac41aa6f.js","@firebase/app":"../node_modules/@firebase/app/dist/esm/index.esm2017.js","@firebase/util":"../node_modules/@firebase/util/dist/index.esm2017.js","@firebase/logger":"../node_modules/@firebase/logger/dist/esm/index.esm2017.js","tslib":"../node_modules/tslib/tslib.es6.js","@firebase/component":"../node_modules/@firebase/component/dist/esm/index.esm2017.js"}],"../node_modules/firebase/auth/dist/esm/index.esm.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _auth = require("@firebase/auth");
Object.keys(_auth).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _auth[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _auth[key];
    }
  });
});
},{"@firebase/auth":"../node_modules/@firebase/auth/dist/esm2017/index.js"}],"scripts/firebase-auth.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createUserPasswordProvider = createUserPasswordProvider;
exports.sendVerificationEmail = sendVerificationEmail;
var _firebaseConfig = require("./firebase-config.js");
var _auth = require("firebase/auth");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return r; }; var t, r = {}, e = Object.prototype, n = e.hasOwnProperty, o = "function" == typeof Symbol ? Symbol : {}, i = o.iterator || "@@iterator", a = o.asyncIterator || "@@asyncIterator", u = o.toStringTag || "@@toStringTag"; function c(t, r, e, n) { return Object.defineProperty(t, r, { value: e, enumerable: !n, configurable: !n, writable: !n }); } try { c({}, ""); } catch (t) { c = function c(t, r, e) { return t[r] = e; }; } function h(r, e, n, o) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype); return c(a, "_invoke", function (r, e, n) { var o = 1; return function (i, a) { if (3 === o) throw Error("Generator is already running"); if (4 === o) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var u = n.delegate; if (u) { var c = d(u, n); if (c) { if (c === f) continue; return c; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (1 === o) throw o = 4, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = 3; var h = s(r, e, n); if ("normal" === h.type) { if (o = n.done ? 4 : 2, h.arg === f) continue; return { value: h.arg, done: n.done }; } "throw" === h.type && (o = 4, n.method = "throw", n.arg = h.arg); } }; }(r, n, new Context(o || [])), !0), a; } function s(t, r, e) { try { return { type: "normal", arg: t.call(r, e) }; } catch (t) { return { type: "throw", arg: t }; } } r.wrap = h; var f = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var l = {}; c(l, i, function () { return this; }); var p = Object.getPrototypeOf, y = p && p(p(x([]))); y && y !== e && n.call(y, i) && (l = y); var v = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(l); function g(t) { ["next", "throw", "return"].forEach(function (r) { c(t, r, function (t) { return this._invoke(r, t); }); }); } function AsyncIterator(t, r) { function e(o, i, a, u) { var c = s(t[o], t, i); if ("throw" !== c.type) { var h = c.arg, f = h.value; return f && "object" == _typeof(f) && n.call(f, "__await") ? r.resolve(f.__await).then(function (t) { e("next", t, a, u); }, function (t) { e("throw", t, a, u); }) : r.resolve(f).then(function (t) { h.value = t, a(h); }, function (t) { return e("throw", t, a, u); }); } u(c.arg); } var o; c(this, "_invoke", function (t, n) { function i() { return new r(function (r, o) { e(t, n, r, o); }); } return o = o ? o.then(i, i) : i(); }, !0); } function d(r, e) { var n = e.method, o = r.i[n]; if (o === t) return e.delegate = null, "throw" === n && r.i.return && (e.method = "return", e.arg = t, d(r, e), "throw" === e.method) || "return" !== n && (e.method = "throw", e.arg = new TypeError("The iterator does not provide a '" + n + "' method")), f; var i = s(o, r.i, e.arg); if ("throw" === i.type) return e.method = "throw", e.arg = i.arg, e.delegate = null, f; var a = i.arg; return a ? a.done ? (e[r.r] = a.value, e.next = r.n, "return" !== e.method && (e.method = "next", e.arg = t), e.delegate = null, f) : a : (e.method = "throw", e.arg = new TypeError("iterator result is not an object"), e.delegate = null, f); } function w(t) { this.tryEntries.push(t); } function m(r) { var e = r[4] || {}; e.type = "normal", e.arg = t, r[4] = e; } function Context(t) { this.tryEntries = [[-1]], t.forEach(w, this), this.reset(!0); } function x(r) { if (null != r) { var e = r[i]; if (e) return e.call(r); if ("function" == typeof r.next) return r; if (!isNaN(r.length)) { var o = -1, a = function e() { for (; ++o < r.length;) if (n.call(r, o)) return e.value = r[o], e.done = !1, e; return e.value = t, e.done = !0, e; }; return a.next = a; } } throw new TypeError(_typeof(r) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, c(v, "constructor", GeneratorFunctionPrototype), c(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = c(GeneratorFunctionPrototype, u, "GeneratorFunction"), r.isGeneratorFunction = function (t) { var r = "function" == typeof t && t.constructor; return !!r && (r === GeneratorFunction || "GeneratorFunction" === (r.displayName || r.name)); }, r.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, c(t, u, "GeneratorFunction")), t.prototype = Object.create(v), t; }, r.awrap = function (t) { return { __await: t }; }, g(AsyncIterator.prototype), c(AsyncIterator.prototype, a, function () { return this; }), r.AsyncIterator = AsyncIterator, r.async = function (t, e, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(h(t, e, n, o), i); return r.isGeneratorFunction(e) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, g(v), c(v, u, "Generator"), c(v, i, function () { return this; }), c(v, "toString", function () { return "[object Generator]"; }), r.keys = function (t) { var r = Object(t), e = []; for (var n in r) e.unshift(n); return function t() { for (; e.length;) if ((n = e.pop()) in r) return t.value = n, t.done = !1, t; return t.done = !0, t; }; }, r.values = x, Context.prototype = { constructor: Context, reset: function reset(r) { if (this.prev = this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(m), !r) for (var e in this) "t" === e.charAt(0) && n.call(this, e) && !isNaN(+e.slice(1)) && (this[e] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0][4]; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(r) { if (this.done) throw r; var e = this; function n(t) { a.type = "throw", a.arg = r, e.next = t; } for (var o = e.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i[4], u = this.prev, c = i[1], h = i[2]; if (-1 === i[0]) return n("end"), !1; if (!c && !h) throw Error("try statement without catch or finally"); if (null != i[0] && i[0] <= u) { if (u < c) return this.method = "next", this.arg = t, n(c), !0; if (u < h) return n(h), !1; } } }, abrupt: function abrupt(t, r) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var n = this.tryEntries[e]; if (n[0] > -1 && n[0] <= this.prev && this.prev < n[2]) { var o = n; break; } } o && ("break" === t || "continue" === t) && o[0] <= r && r <= o[2] && (o = null); var i = o ? o[4] : {}; return i.type = t, i.arg = r, o ? (this.method = "next", this.next = o[2], f) : this.complete(i); }, complete: function complete(t, r) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && r && (this.next = r), f; }, finish: function finish(t) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var e = this.tryEntries[r]; if (e[2] === t) return this.complete(e[4], e[3]), m(e), f; } }, catch: function _catch(t) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var e = this.tryEntries[r]; if (e[0] === t) { var n = e[4]; if ("throw" === n.type) { var o = n.arg; m(e); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(r, e, n) { return this.delegate = { i: x(r), r: e, n: n }, "next" === this.method && (this.arg = t), f; } }, r; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
// Initialize Firebase Authentication and get a reference to the service
var auth = (0, _auth.getAuth)(_firebaseConfig.app);

// Checking if user has signed in or not on Auth State Change.
(0, _auth.onAuthStateChanged)(auth, function (user) {
  try {
    if (user) {
      console.log("user", user);
    } else {
      console.log("User not signed in.");
    }
  } catch (error) {
    console.log(error);
  }
});
function createUserPasswordProvider(_x, _x2) {
  return _createUserPasswordProvider.apply(this, arguments);
}
function _createUserPasswordProvider() {
  _createUserPasswordProvider = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee(email, password) {
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          (0, _auth.createUserWithEmailAndPassword)(auth, email, password).then(function (userCredential) {
            // User has signed up successfully.
            console.log("User created CRED", userCredential.user);
            console.log("User created CURR", auth.currentUser);
            var user = auth.currentUser;
            sendVerificationEmail(user);
            return true;
          });
          _context.next = 8;
          break;
        case 4:
          _context.prev = 4;
          _context.t0 = _context["catch"](0);
          console.log(_context.t0);
          return _context.abrupt("return", false);
        case 8:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 4]]);
  }));
  return _createUserPasswordProvider.apply(this, arguments);
}
function sendVerificationEmail(_x3) {
  return _sendVerificationEmail.apply(this, arguments);
}
function _sendVerificationEmail() {
  _sendVerificationEmail = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2(user) {
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          (0, _auth.sendEmailVerification)(user).then(function () {
            // Email verification sent!
            console.log("Email verification sent!");
          }).catch(function (error) {
            console.log(error);
          });
        case 1:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  }));
  return _sendVerificationEmail.apply(this, arguments);
}
},{"./firebase-config.js":"scripts/firebase-config.js","firebase/auth":"../node_modules/firebase/auth/dist/esm/index.esm.js"}],"scripts/ui.js":[function(require,module,exports) {
"use strict";

var _firebaseAuth = require("./firebase-auth");
var signinBtn = document.getElementById("signin");
var signupBtn = document.getElementById("signup");
signupBtn.addEventListener("click", function (e) {
  e.preventDefault();
  var emailInput = document.getElementById("email");
  var passwordInput = document.getElementById("password");
  var email = emailInput.value;
  var password = passwordInput.value;
  if ((0, _firebaseAuth.createUserPasswordProvider)(email, password)) {
    console.log("User created and returned true.");
  } else {
    console.log("User NOT created and returned false.");
  }
});
signinBtn.addEventListener("click", function (e) {
  e.preventDefault();
});
},{"./firebase-auth":"scripts/firebase-auth.js"}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;
function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}
module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "61358" + '/');
  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);
    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);
          if (didAccept) {
            handled = true;
          }
        }
      });

      // Enable HMR for CSS by default.
      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });
      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }
    if (data.type === 'reload') {
      ws.close();
      ws.onclose = function () {
        location.reload();
      };
    }
    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }
    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}
function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);
  if (overlay) {
    overlay.remove();
  }
}
function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;

  // html encode message and stack trace
  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}
function getParents(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }
  var parents = [];
  var k, d, dep;
  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }
  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }
  return parents;
}
function hmrApply(bundle, asset) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}
function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }
  if (checkedAssets[id]) {
    return;
  }
  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }
  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}
function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};
  if (cached) {
    cached.hot.data = bundle.hotData;
  }
  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }
  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });
    return true;
  }
}
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","scripts/ui.js"], null)
//# sourceMappingURL=/ui.f8fadce3.js.map