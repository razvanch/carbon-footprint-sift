/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(console) {'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _siftSdkWeb = __webpack_require__(8);
	
	var _d3RsPies = __webpack_require__(9);
	
	var _d3Selection = __webpack_require__(10);
	
	var _d3Transition = __webpack_require__(13);
	
	var _d3RsTheme = __webpack_require__(19);
	
	__webpack_require__(20);
	
	var _distances = __webpack_require__(21);
	
	var _distances2 = _interopRequireDefault(_distances);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var BA_COLOR = '#1e5aaf';
	var LUFTHANSA_COLOR = '#efae00';
	var OPODO_COLOR = '#990000';
	
	var EQUIVALENT_RATIOS = {
	  kms_personal_car: 6,
	  kms_public_transport: 12,
	  computer: 32,
	  plastic_bags: 5,
	  plastic_bottles: 2,
	  cheeseburgers: 0.33
	};
	
	var CarbonFootprintView = function (_SiftView) {
	  _inherits(CarbonFootprintView, _SiftView);
	
	  function CarbonFootprintView() {
	    _classCallCheck(this, CarbonFootprintView);
	
	    var _this = _possibleConstructorReturn(this, (CarbonFootprintView.__proto__ || Object.getPrototypeOf(CarbonFootprintView)).call(this));
	
	    _this._totalFootprint = 0;
	
	    _this._pie = null;
	    _this._sizeClass = null;
	    _this._pieData = null;
	
	    _this.fill = {
	      britishairways: {
	        color: _d3RsTheme.presentation10.standard[_d3RsTheme.presentation10.names.blue],
	        pattern: _this.getPattern(_d3RsTheme.presentation10.names.blue)
	      },
	      lufthansa: {
	        color: _d3RsTheme.presentation10.standard[_d3RsTheme.presentation10.names.orange],
	        pattern: _this.getPattern(_d3RsTheme.presentation10.names.orange)
	      },
	      opodo: {
	        color: _d3RsTheme.presentation10.standard[_d3RsTheme.presentation10.names.red],
	        pattern: _this.getPattern(_d3RsTheme.presentation10.names.red)
	      }
	    };
	
	    (0, _d3Transition.transition)();
	
	    _this.controller.subscribe('footprint', _this.onFootprint.bind(_this));
	    _this.controller.subscribe('history', _this.onHistory.bind(_this));
	    return _this;
	  }
	
	  _createClass(CarbonFootprintView, [{
	    key: 'presentView',
	    value: function presentView(value) {
	      this._sizeClass = value.sizeClass.current;
	
	      console.log('email-demo: presentView: ', value);
	
	      if (value.data) {
	        this.onFootprint(value.data[0]);
	        this.onHistory(value.data[1]);
	        this.updateSections(this._sizeClass);
	      }
	    }
	  }, {
	    key: 'willPresentView',
	    value: function willPresentView(value) {
	      console.log('email-demo: willPresentView: ', value);
	    }
	  }, {
	    key: 'onFootprint',
	    value: function onFootprint(data) {
	      console.log('email-demo: onFootprint: ', data);
	
	      this._totalFootprint = data.footprint;
	
	      document.getElementById('footprint').textContent = this._totalFootprint;
	    }
	  }, {
	    key: 'onHistory',
	    value: function onHistory(data) {
	      var history = JSON.parse(data.history);
	
	      console.log('email-demo: onHistory: ', history);
	
	      var averageFootprint = 0;
	      var totalDistance = 0;
	      var totalFlights = history.length;
	
	      var companyFootprints = {
	        britishairways: 0,
	        lufthansa: 0,
	        opodo: 0
	      };
	
	      history.forEach(function (flight) {
	        var source = flight.source.code;
	        var destination = flight.destination.code;
	
	        if (_distances2.default[source]) {
	          totalDistance += _distances2.default[source][destination] || 0;
	        }
	
	        averageFootprint += flight.footprint / totalFlights;
	        companyFootprints[flight.provider] += flight.footprint;
	      });
	
	      this._pieData = [companyFootprints.britishairways, companyFootprints.lufthansa, companyFootprints.opodo];
	
	      this.updateStats(totalFlights, Math.round(averageFootprint), totalDistance);
	      this.updateEquivalentStats(this._totalFootprint);
	      this.callPie(this._pieData, this._sizeClass);
	    }
	  }, {
	    key: 'updateSections',
	    value: function updateSections(sizeClass) {
	      var show = 'none';
	
	      if (!sizeClass.height || sizeClass.height === 520) {
	        show = '';
	      }
	
	      document.getElementById('companies-period').style.display = show;
	      document.getElementById('facts').style.display = show;
	    }
	  }, {
	    key: 'updateStats',
	    value: function updateStats(totalFlights, averageFootprint, totalDistance) {
	      if (totalFlights) {
	        document.getElementById('flightscount-period').textContent = '' + totalFlights;
	      }
	
	      if (averageFootprint) {
	        document.getElementById('averagefootprint-period').textContent = '' + averageFootprint;
	      }
	
	      if (totalDistance) {
	        document.getElementById('totaldistance-period').textContent = totalDistance;
	      }
	    }
	  }, {
	    key: 'updateEquivalentStats',
	    value: function updateEquivalentStats(totalFootprint) {
	      var _this2 = this;
	
	      Object.keys(EQUIVALENT_RATIOS).forEach(function (id) {
	        document.getElementById(id).textContent = Math.round(_this2._totalFootprint * EQUIVALENT_RATIOS[id]);
	      });
	    }
	  }, {
	    key: 'callPie',
	    value: function callPie(data, sizeClass) {
	      var margin = 26;
	      var height = 300;
	      var legend = ['British Airways', 'Lufthansa', 'Opodo'];
	
	      if (sizeClass.width === 230) {
	        margin = 13;
	        height = 200;
	      }
	
	      if (sizeClass.height === 230) {
	        height = 200;
	      }
	
	      var width = document.getElementById('stats-period').clientWidth - 2 * margin;
	      var chartContainer = (0, _d3Selection.select)('#pie').datum(data);
	
	      if (this._pie) {
	        chartContainer.transition().call(this.getPieChart(width, height, margin, legend));
	      } else {
	        chartContainer.call(this.getPieChart(width, height, margin, legend)).select('svg').call(this.fill.britishairways.pattern).call(this.fill.lufthansa.pattern).call(this.fill.opodo.pattern);
	      }
	    }
	  }, {
	    key: 'getPieChart',
	    value: function getPieChart(width, height, margin, legend) {
	      var _this3 = this;
	
	      if (!this._pie) {
	        // Create a base one if one doesn't already exist
	        this._pie = (0, _d3RsPies.html)().fill([this.fill.britishairways.color, this.fill.lufthansa.color, this.fill.opodo.color]).displayValue(function (v) {
	          if (!_this3._totalFootprint || !_this3._pieData) {
	            return 'Connect your email!';
	          }
	
	          return (100 * v / _this3._totalFootprint).toFixed(0) + '%';
	        });
	      }
	
	      return this._pie.width(width).height(height).outerRadius(height / 3).legend(legend).margin(margin);
	    }
	  }, {
	    key: 'getPattern',
	    value: function getPattern(color) {
	      var p = (0, _d3RsTheme.diagonals)('highlight-fill-' + color, _d3RsTheme.patterns.diagonal1);
	      p.foreground(_d3RsTheme.presentation10.lighter[color]);
	      p.background(_d3RsTheme.presentation10.darker[color]);
	      return p;
	    }
	  }]);
	
	  return CarbonFootprintView;
	}(_siftSdkWeb.SiftView);
	
	exports.default = CarbonFootprintView;
	
	
	(0, _siftSdkWeb.registerSiftView)(new CarbonFootprintView(window));
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {/*global window, global*/
	var util = __webpack_require__(2)
	var assert = __webpack_require__(6)
	var now = __webpack_require__(7)
	
	var slice = Array.prototype.slice
	var console
	var times = {}
	
	if (typeof global !== "undefined" && global.console) {
	    console = global.console
	} else if (typeof window !== "undefined" && window.console) {
	    console = window.console
	} else {
	    console = {}
	}
	
	var functions = [
	    [log, "log"],
	    [info, "info"],
	    [warn, "warn"],
	    [error, "error"],
	    [time, "time"],
	    [timeEnd, "timeEnd"],
	    [trace, "trace"],
	    [dir, "dir"],
	    [consoleAssert, "assert"]
	]
	
	for (var i = 0; i < functions.length; i++) {
	    var tuple = functions[i]
	    var f = tuple[0]
	    var name = tuple[1]
	
	    if (!console[name]) {
	        console[name] = f
	    }
	}
	
	module.exports = console
	
	function log() {}
	
	function info() {
	    console.log.apply(console, arguments)
	}
	
	function warn() {
	    console.log.apply(console, arguments)
	}
	
	function error() {
	    console.warn.apply(console, arguments)
	}
	
	function time(label) {
	    times[label] = now()
	}
	
	function timeEnd(label) {
	    var time = times[label]
	    if (!time) {
	        throw new Error("No such label: " + label)
	    }
	
	    var duration = now() - time
	    console.log(label + ": " + duration + "ms")
	}
	
	function trace() {
	    var err = new Error()
	    err.name = "Trace"
	    err.message = util.format.apply(null, arguments)
	    console.error(err.stack)
	}
	
	function dir(object) {
	    console.log(util.inspect(object) + "\n")
	}
	
	function consoleAssert(expression) {
	    if (!expression) {
	        var arr = slice.call(arguments, 1)
	        assert.ok(false, util.format.apply(null, arr))
	    }
	}
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global, process, console) {// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.
	
	var formatRegExp = /%[sdj%]/g;
	exports.format = function(f) {
	  if (!isString(f)) {
	    var objects = [];
	    for (var i = 0; i < arguments.length; i++) {
	      objects.push(inspect(arguments[i]));
	    }
	    return objects.join(' ');
	  }
	
	  var i = 1;
	  var args = arguments;
	  var len = args.length;
	  var str = String(f).replace(formatRegExp, function(x) {
	    if (x === '%%') return '%';
	    if (i >= len) return x;
	    switch (x) {
	      case '%s': return String(args[i++]);
	      case '%d': return Number(args[i++]);
	      case '%j':
	        try {
	          return JSON.stringify(args[i++]);
	        } catch (_) {
	          return '[Circular]';
	        }
	      default:
	        return x;
	    }
	  });
	  for (var x = args[i]; i < len; x = args[++i]) {
	    if (isNull(x) || !isObject(x)) {
	      str += ' ' + x;
	    } else {
	      str += ' ' + inspect(x);
	    }
	  }
	  return str;
	};
	
	
	// Mark that a method should not be used.
	// Returns a modified function which warns once by default.
	// If --no-deprecation is set, then it is a no-op.
	exports.deprecate = function(fn, msg) {
	  // Allow for deprecating things in the process of starting up.
	  if (isUndefined(global.process)) {
	    return function() {
	      return exports.deprecate(fn, msg).apply(this, arguments);
	    };
	  }
	
	  if (process.noDeprecation === true) {
	    return fn;
	  }
	
	  var warned = false;
	  function deprecated() {
	    if (!warned) {
	      if (process.throwDeprecation) {
	        throw new Error(msg);
	      } else if (process.traceDeprecation) {
	        console.trace(msg);
	      } else {
	        console.error(msg);
	      }
	      warned = true;
	    }
	    return fn.apply(this, arguments);
	  }
	
	  return deprecated;
	};
	
	
	var debugs = {};
	var debugEnviron;
	exports.debuglog = function(set) {
	  if (isUndefined(debugEnviron))
	    debugEnviron = process.env.NODE_DEBUG || '';
	  set = set.toUpperCase();
	  if (!debugs[set]) {
	    if (new RegExp('\\b' + set + '\\b', 'i').test(debugEnviron)) {
	      var pid = process.pid;
	      debugs[set] = function() {
	        var msg = exports.format.apply(exports, arguments);
	        console.error('%s %d: %s', set, pid, msg);
	      };
	    } else {
	      debugs[set] = function() {};
	    }
	  }
	  return debugs[set];
	};
	
	
	/**
	 * Echos the value of a value. Trys to print the value out
	 * in the best way possible given the different types.
	 *
	 * @param {Object} obj The object to print out.
	 * @param {Object} opts Optional options object that alters the output.
	 */
	/* legacy: obj, showHidden, depth, colors*/
	function inspect(obj, opts) {
	  // default options
	  var ctx = {
	    seen: [],
	    stylize: stylizeNoColor
	  };
	  // legacy...
	  if (arguments.length >= 3) ctx.depth = arguments[2];
	  if (arguments.length >= 4) ctx.colors = arguments[3];
	  if (isBoolean(opts)) {
	    // legacy...
	    ctx.showHidden = opts;
	  } else if (opts) {
	    // got an "options" object
	    exports._extend(ctx, opts);
	  }
	  // set default options
	  if (isUndefined(ctx.showHidden)) ctx.showHidden = false;
	  if (isUndefined(ctx.depth)) ctx.depth = 2;
	  if (isUndefined(ctx.colors)) ctx.colors = false;
	  if (isUndefined(ctx.customInspect)) ctx.customInspect = true;
	  if (ctx.colors) ctx.stylize = stylizeWithColor;
	  return formatValue(ctx, obj, ctx.depth);
	}
	exports.inspect = inspect;
	
	
	// http://en.wikipedia.org/wiki/ANSI_escape_code#graphics
	inspect.colors = {
	  'bold' : [1, 22],
	  'italic' : [3, 23],
	  'underline' : [4, 24],
	  'inverse' : [7, 27],
	  'white' : [37, 39],
	  'grey' : [90, 39],
	  'black' : [30, 39],
	  'blue' : [34, 39],
	  'cyan' : [36, 39],
	  'green' : [32, 39],
	  'magenta' : [35, 39],
	  'red' : [31, 39],
	  'yellow' : [33, 39]
	};
	
	// Don't use 'blue' not visible on cmd.exe
	inspect.styles = {
	  'special': 'cyan',
	  'number': 'yellow',
	  'boolean': 'yellow',
	  'undefined': 'grey',
	  'null': 'bold',
	  'string': 'green',
	  'date': 'magenta',
	  // "name": intentionally not styling
	  'regexp': 'red'
	};
	
	
	function stylizeWithColor(str, styleType) {
	  var style = inspect.styles[styleType];
	
	  if (style) {
	    return '\u001b[' + inspect.colors[style][0] + 'm' + str +
	           '\u001b[' + inspect.colors[style][1] + 'm';
	  } else {
	    return str;
	  }
	}
	
	
	function stylizeNoColor(str, styleType) {
	  return str;
	}
	
	
	function arrayToHash(array) {
	  var hash = {};
	
	  array.forEach(function(val, idx) {
	    hash[val] = true;
	  });
	
	  return hash;
	}
	
	
	function formatValue(ctx, value, recurseTimes) {
	  // Provide a hook for user-specified inspect functions.
	  // Check that value is an object with an inspect function on it
	  if (ctx.customInspect &&
	      value &&
	      isFunction(value.inspect) &&
	      // Filter out the util module, it's inspect function is special
	      value.inspect !== exports.inspect &&
	      // Also filter out any prototype objects using the circular check.
	      !(value.constructor && value.constructor.prototype === value)) {
	    var ret = value.inspect(recurseTimes, ctx);
	    if (!isString(ret)) {
	      ret = formatValue(ctx, ret, recurseTimes);
	    }
	    return ret;
	  }
	
	  // Primitive types cannot have properties
	  var primitive = formatPrimitive(ctx, value);
	  if (primitive) {
	    return primitive;
	  }
	
	  // Look up the keys of the object.
	  var keys = Object.keys(value);
	  var visibleKeys = arrayToHash(keys);
	
	  if (ctx.showHidden) {
	    keys = Object.getOwnPropertyNames(value);
	  }
	
	  // IE doesn't make error fields non-enumerable
	  // http://msdn.microsoft.com/en-us/library/ie/dww52sbt(v=vs.94).aspx
	  if (isError(value)
	      && (keys.indexOf('message') >= 0 || keys.indexOf('description') >= 0)) {
	    return formatError(value);
	  }
	
	  // Some type of object without properties can be shortcutted.
	  if (keys.length === 0) {
	    if (isFunction(value)) {
	      var name = value.name ? ': ' + value.name : '';
	      return ctx.stylize('[Function' + name + ']', 'special');
	    }
	    if (isRegExp(value)) {
	      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
	    }
	    if (isDate(value)) {
	      return ctx.stylize(Date.prototype.toString.call(value), 'date');
	    }
	    if (isError(value)) {
	      return formatError(value);
	    }
	  }
	
	  var base = '', array = false, braces = ['{', '}'];
	
	  // Make Array say that they are Array
	  if (isArray(value)) {
	    array = true;
	    braces = ['[', ']'];
	  }
	
	  // Make functions say that they are functions
	  if (isFunction(value)) {
	    var n = value.name ? ': ' + value.name : '';
	    base = ' [Function' + n + ']';
	  }
	
	  // Make RegExps say that they are RegExps
	  if (isRegExp(value)) {
	    base = ' ' + RegExp.prototype.toString.call(value);
	  }
	
	  // Make dates with properties first say the date
	  if (isDate(value)) {
	    base = ' ' + Date.prototype.toUTCString.call(value);
	  }
	
	  // Make error with message first say the error
	  if (isError(value)) {
	    base = ' ' + formatError(value);
	  }
	
	  if (keys.length === 0 && (!array || value.length == 0)) {
	    return braces[0] + base + braces[1];
	  }
	
	  if (recurseTimes < 0) {
	    if (isRegExp(value)) {
	      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
	    } else {
	      return ctx.stylize('[Object]', 'special');
	    }
	  }
	
	  ctx.seen.push(value);
	
	  var output;
	  if (array) {
	    output = formatArray(ctx, value, recurseTimes, visibleKeys, keys);
	  } else {
	    output = keys.map(function(key) {
	      return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array);
	    });
	  }
	
	  ctx.seen.pop();
	
	  return reduceToSingleString(output, base, braces);
	}
	
	
	function formatPrimitive(ctx, value) {
	  if (isUndefined(value))
	    return ctx.stylize('undefined', 'undefined');
	  if (isString(value)) {
	    var simple = '\'' + JSON.stringify(value).replace(/^"|"$/g, '')
	                                             .replace(/'/g, "\\'")
	                                             .replace(/\\"/g, '"') + '\'';
	    return ctx.stylize(simple, 'string');
	  }
	  if (isNumber(value))
	    return ctx.stylize('' + value, 'number');
	  if (isBoolean(value))
	    return ctx.stylize('' + value, 'boolean');
	  // For some reason typeof null is "object", so special case here.
	  if (isNull(value))
	    return ctx.stylize('null', 'null');
	}
	
	
	function formatError(value) {
	  return '[' + Error.prototype.toString.call(value) + ']';
	}
	
	
	function formatArray(ctx, value, recurseTimes, visibleKeys, keys) {
	  var output = [];
	  for (var i = 0, l = value.length; i < l; ++i) {
	    if (hasOwnProperty(value, String(i))) {
	      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
	          String(i), true));
	    } else {
	      output.push('');
	    }
	  }
	  keys.forEach(function(key) {
	    if (!key.match(/^\d+$/)) {
	      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
	          key, true));
	    }
	  });
	  return output;
	}
	
	
	function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {
	  var name, str, desc;
	  desc = Object.getOwnPropertyDescriptor(value, key) || { value: value[key] };
	  if (desc.get) {
	    if (desc.set) {
	      str = ctx.stylize('[Getter/Setter]', 'special');
	    } else {
	      str = ctx.stylize('[Getter]', 'special');
	    }
	  } else {
	    if (desc.set) {
	      str = ctx.stylize('[Setter]', 'special');
	    }
	  }
	  if (!hasOwnProperty(visibleKeys, key)) {
	    name = '[' + key + ']';
	  }
	  if (!str) {
	    if (ctx.seen.indexOf(desc.value) < 0) {
	      if (isNull(recurseTimes)) {
	        str = formatValue(ctx, desc.value, null);
	      } else {
	        str = formatValue(ctx, desc.value, recurseTimes - 1);
	      }
	      if (str.indexOf('\n') > -1) {
	        if (array) {
	          str = str.split('\n').map(function(line) {
	            return '  ' + line;
	          }).join('\n').substr(2);
	        } else {
	          str = '\n' + str.split('\n').map(function(line) {
	            return '   ' + line;
	          }).join('\n');
	        }
	      }
	    } else {
	      str = ctx.stylize('[Circular]', 'special');
	    }
	  }
	  if (isUndefined(name)) {
	    if (array && key.match(/^\d+$/)) {
	      return str;
	    }
	    name = JSON.stringify('' + key);
	    if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
	      name = name.substr(1, name.length - 2);
	      name = ctx.stylize(name, 'name');
	    } else {
	      name = name.replace(/'/g, "\\'")
	                 .replace(/\\"/g, '"')
	                 .replace(/(^"|"$)/g, "'");
	      name = ctx.stylize(name, 'string');
	    }
	  }
	
	  return name + ': ' + str;
	}
	
	
	function reduceToSingleString(output, base, braces) {
	  var numLinesEst = 0;
	  var length = output.reduce(function(prev, cur) {
	    numLinesEst++;
	    if (cur.indexOf('\n') >= 0) numLinesEst++;
	    return prev + cur.replace(/\u001b\[\d\d?m/g, '').length + 1;
	  }, 0);
	
	  if (length > 60) {
	    return braces[0] +
	           (base === '' ? '' : base + '\n ') +
	           ' ' +
	           output.join(',\n  ') +
	           ' ' +
	           braces[1];
	  }
	
	  return braces[0] + base + ' ' + output.join(', ') + ' ' + braces[1];
	}
	
	
	// NOTE: These type checking functions intentionally don't use `instanceof`
	// because it is fragile and can be easily faked with `Object.create()`.
	function isArray(ar) {
	  return Array.isArray(ar);
	}
	exports.isArray = isArray;
	
	function isBoolean(arg) {
	  return typeof arg === 'boolean';
	}
	exports.isBoolean = isBoolean;
	
	function isNull(arg) {
	  return arg === null;
	}
	exports.isNull = isNull;
	
	function isNullOrUndefined(arg) {
	  return arg == null;
	}
	exports.isNullOrUndefined = isNullOrUndefined;
	
	function isNumber(arg) {
	  return typeof arg === 'number';
	}
	exports.isNumber = isNumber;
	
	function isString(arg) {
	  return typeof arg === 'string';
	}
	exports.isString = isString;
	
	function isSymbol(arg) {
	  return typeof arg === 'symbol';
	}
	exports.isSymbol = isSymbol;
	
	function isUndefined(arg) {
	  return arg === void 0;
	}
	exports.isUndefined = isUndefined;
	
	function isRegExp(re) {
	  return isObject(re) && objectToString(re) === '[object RegExp]';
	}
	exports.isRegExp = isRegExp;
	
	function isObject(arg) {
	  return typeof arg === 'object' && arg !== null;
	}
	exports.isObject = isObject;
	
	function isDate(d) {
	  return isObject(d) && objectToString(d) === '[object Date]';
	}
	exports.isDate = isDate;
	
	function isError(e) {
	  return isObject(e) &&
	      (objectToString(e) === '[object Error]' || e instanceof Error);
	}
	exports.isError = isError;
	
	function isFunction(arg) {
	  return typeof arg === 'function';
	}
	exports.isFunction = isFunction;
	
	function isPrimitive(arg) {
	  return arg === null ||
	         typeof arg === 'boolean' ||
	         typeof arg === 'number' ||
	         typeof arg === 'string' ||
	         typeof arg === 'symbol' ||  // ES6 symbol
	         typeof arg === 'undefined';
	}
	exports.isPrimitive = isPrimitive;
	
	exports.isBuffer = __webpack_require__(4);
	
	function objectToString(o) {
	  return Object.prototype.toString.call(o);
	}
	
	
	function pad(n) {
	  return n < 10 ? '0' + n.toString(10) : n.toString(10);
	}
	
	
	var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep',
	              'Oct', 'Nov', 'Dec'];
	
	// 26 Feb 16:19:34
	function timestamp() {
	  var d = new Date();
	  var time = [pad(d.getHours()),
	              pad(d.getMinutes()),
	              pad(d.getSeconds())].join(':');
	  return [d.getDate(), months[d.getMonth()], time].join(' ');
	}
	
	
	// log is just a thin wrapper to console.log that prepends a timestamp
	exports.log = function() {
	  console.log('%s - %s', timestamp(), exports.format.apply(exports, arguments));
	};
	
	
	/**
	 * Inherit the prototype methods from one constructor into another.
	 *
	 * The Function.prototype.inherits from lang.js rewritten as a standalone
	 * function (not on Function.prototype). NOTE: If this file is to be loaded
	 * during bootstrapping this function needs to be rewritten using some native
	 * functions as prototype setup using normal JavaScript does not work as
	 * expected during bootstrapping (see mirror.js in r114903).
	 *
	 * @param {function} ctor Constructor function which needs to inherit the
	 *     prototype.
	 * @param {function} superCtor Constructor function to inherit prototype from.
	 */
	exports.inherits = __webpack_require__(5);
	
	exports._extend = function(origin, add) {
	  // Don't do anything if add isn't an object
	  if (!add || !isObject(add)) return origin;
	
	  var keys = Object.keys(add);
	  var i = keys.length;
	  while (i--) {
	    origin[keys[i]] = add[keys[i]];
	  }
	  return origin;
	};
	
	function hasOwnProperty(obj, prop) {
	  return Object.prototype.hasOwnProperty.call(obj, prop);
	}
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }()), __webpack_require__(3), __webpack_require__(1)))

/***/ },
/* 3 */
/***/ function(module, exports) {

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
	function defaultClearTimeout () {
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
	} ())
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
	    } catch(e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
	            return cachedSetTimeout.call(null, fun, 0);
	        } catch(e){
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
	    } catch (e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
	            return cachedClearTimeout.call(null, marker);
	        } catch (e){
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
	    while(len) {
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
	process.browser = true;
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
	
	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};
	
	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = function isBuffer(arg) {
	  return arg && typeof arg === 'object'
	    && typeof arg.copy === 'function'
	    && typeof arg.fill === 'function'
	    && typeof arg.readUInt8 === 'function';
	}

/***/ },
/* 5 */
/***/ function(module, exports) {

	if (typeof Object.create === 'function') {
	  // implementation from standard node.js 'util' module
	  module.exports = function inherits(ctor, superCtor) {
	    ctor.super_ = superCtor
	    ctor.prototype = Object.create(superCtor.prototype, {
	      constructor: {
	        value: ctor,
	        enumerable: false,
	        writable: true,
	        configurable: true
	      }
	    });
	  };
	} else {
	  // old school shim for old browsers
	  module.exports = function inherits(ctor, superCtor) {
	    ctor.super_ = superCtor
	    var TempCtor = function () {}
	    TempCtor.prototype = superCtor.prototype
	    ctor.prototype = new TempCtor()
	    ctor.prototype.constructor = ctor
	  }
	}


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {'use strict';
	
	// compare and isBuffer taken from https://github.com/feross/buffer/blob/680e9e5e488f22aac27599a57dc844a6315928dd/index.js
	// original notice:
	
	/*!
	 * The buffer module from node.js, for the browser.
	 *
	 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
	 * @license  MIT
	 */
	function compare(a, b) {
	  if (a === b) {
	    return 0;
	  }
	
	  var x = a.length;
	  var y = b.length;
	
	  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
	    if (a[i] !== b[i]) {
	      x = a[i];
	      y = b[i];
	      break;
	    }
	  }
	
	  if (x < y) {
	    return -1;
	  }
	  if (y < x) {
	    return 1;
	  }
	  return 0;
	}
	function isBuffer(b) {
	  if (global.Buffer && typeof global.Buffer.isBuffer === 'function') {
	    return global.Buffer.isBuffer(b);
	  }
	  return !!(b != null && b._isBuffer);
	}
	
	// based on node assert, original notice:
	
	// http://wiki.commonjs.org/wiki/Unit_Testing/1.0
	//
	// THIS IS NOT TESTED NOR LIKELY TO WORK OUTSIDE V8!
	//
	// Originally from narwhal.js (http://narwhaljs.org)
	// Copyright (c) 2009 Thomas Robinson <280north.com>
	//
	// Permission is hereby granted, free of charge, to any person obtaining a copy
	// of this software and associated documentation files (the 'Software'), to
	// deal in the Software without restriction, including without limitation the
	// rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
	// sell copies of the Software, and to permit persons to whom the Software is
	// furnished to do so, subject to the following conditions:
	//
	// The above copyright notice and this permission notice shall be included in
	// all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	// AUTHORS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
	// ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
	// WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
	
	var util = __webpack_require__(2);
	var hasOwn = Object.prototype.hasOwnProperty;
	var pSlice = Array.prototype.slice;
	var functionsHaveNames = (function () {
	  return function foo() {}.name === 'foo';
	}());
	function pToString (obj) {
	  return Object.prototype.toString.call(obj);
	}
	function isView(arrbuf) {
	  if (isBuffer(arrbuf)) {
	    return false;
	  }
	  if (typeof global.ArrayBuffer !== 'function') {
	    return false;
	  }
	  if (typeof ArrayBuffer.isView === 'function') {
	    return ArrayBuffer.isView(arrbuf);
	  }
	  if (!arrbuf) {
	    return false;
	  }
	  if (arrbuf instanceof DataView) {
	    return true;
	  }
	  if (arrbuf.buffer && arrbuf.buffer instanceof ArrayBuffer) {
	    return true;
	  }
	  return false;
	}
	// 1. The assert module provides functions that throw
	// AssertionError's when particular conditions are not met. The
	// assert module must conform to the following interface.
	
	var assert = module.exports = ok;
	
	// 2. The AssertionError is defined in assert.
	// new assert.AssertionError({ message: message,
	//                             actual: actual,
	//                             expected: expected })
	
	var regex = /\s*function\s+([^\(\s]*)\s*/;
	// based on https://github.com/ljharb/function.prototype.name/blob/adeeeec8bfcc6068b187d7d9fb3d5bb1d3a30899/implementation.js
	function getName(func) {
	  if (!util.isFunction(func)) {
	    return;
	  }
	  if (functionsHaveNames) {
	    return func.name;
	  }
	  var str = func.toString();
	  var match = str.match(regex);
	  return match && match[1];
	}
	assert.AssertionError = function AssertionError(options) {
	  this.name = 'AssertionError';
	  this.actual = options.actual;
	  this.expected = options.expected;
	  this.operator = options.operator;
	  if (options.message) {
	    this.message = options.message;
	    this.generatedMessage = false;
	  } else {
	    this.message = getMessage(this);
	    this.generatedMessage = true;
	  }
	  var stackStartFunction = options.stackStartFunction || fail;
	  if (Error.captureStackTrace) {
	    Error.captureStackTrace(this, stackStartFunction);
	  } else {
	    // non v8 browsers so we can have a stacktrace
	    var err = new Error();
	    if (err.stack) {
	      var out = err.stack;
	
	      // try to strip useless frames
	      var fn_name = getName(stackStartFunction);
	      var idx = out.indexOf('\n' + fn_name);
	      if (idx >= 0) {
	        // once we have located the function frame
	        // we need to strip out everything before it (and its line)
	        var next_line = out.indexOf('\n', idx + 1);
	        out = out.substring(next_line + 1);
	      }
	
	      this.stack = out;
	    }
	  }
	};
	
	// assert.AssertionError instanceof Error
	util.inherits(assert.AssertionError, Error);
	
	function truncate(s, n) {
	  if (typeof s === 'string') {
	    return s.length < n ? s : s.slice(0, n);
	  } else {
	    return s;
	  }
	}
	function inspect(something) {
	  if (functionsHaveNames || !util.isFunction(something)) {
	    return util.inspect(something);
	  }
	  var rawname = getName(something);
	  var name = rawname ? ': ' + rawname : '';
	  return '[Function' +  name + ']';
	}
	function getMessage(self) {
	  return truncate(inspect(self.actual), 128) + ' ' +
	         self.operator + ' ' +
	         truncate(inspect(self.expected), 128);
	}
	
	// At present only the three keys mentioned above are used and
	// understood by the spec. Implementations or sub modules can pass
	// other keys to the AssertionError's constructor - they will be
	// ignored.
	
	// 3. All of the following functions must throw an AssertionError
	// when a corresponding condition is not met, with a message that
	// may be undefined if not provided.  All assertion methods provide
	// both the actual and expected values to the assertion error for
	// display purposes.
	
	function fail(actual, expected, message, operator, stackStartFunction) {
	  throw new assert.AssertionError({
	    message: message,
	    actual: actual,
	    expected: expected,
	    operator: operator,
	    stackStartFunction: stackStartFunction
	  });
	}
	
	// EXTENSION! allows for well behaved errors defined elsewhere.
	assert.fail = fail;
	
	// 4. Pure assertion tests whether a value is truthy, as determined
	// by !!guard.
	// assert.ok(guard, message_opt);
	// This statement is equivalent to assert.equal(true, !!guard,
	// message_opt);. To test strictly for the value true, use
	// assert.strictEqual(true, guard, message_opt);.
	
	function ok(value, message) {
	  if (!value) fail(value, true, message, '==', assert.ok);
	}
	assert.ok = ok;
	
	// 5. The equality assertion tests shallow, coercive equality with
	// ==.
	// assert.equal(actual, expected, message_opt);
	
	assert.equal = function equal(actual, expected, message) {
	  if (actual != expected) fail(actual, expected, message, '==', assert.equal);
	};
	
	// 6. The non-equality assertion tests for whether two objects are not equal
	// with != assert.notEqual(actual, expected, message_opt);
	
	assert.notEqual = function notEqual(actual, expected, message) {
	  if (actual == expected) {
	    fail(actual, expected, message, '!=', assert.notEqual);
	  }
	};
	
	// 7. The equivalence assertion tests a deep equality relation.
	// assert.deepEqual(actual, expected, message_opt);
	
	assert.deepEqual = function deepEqual(actual, expected, message) {
	  if (!_deepEqual(actual, expected, false)) {
	    fail(actual, expected, message, 'deepEqual', assert.deepEqual);
	  }
	};
	
	assert.deepStrictEqual = function deepStrictEqual(actual, expected, message) {
	  if (!_deepEqual(actual, expected, true)) {
	    fail(actual, expected, message, 'deepStrictEqual', assert.deepStrictEqual);
	  }
	};
	
	function _deepEqual(actual, expected, strict, memos) {
	  // 7.1. All identical values are equivalent, as determined by ===.
	  if (actual === expected) {
	    return true;
	  } else if (isBuffer(actual) && isBuffer(expected)) {
	    return compare(actual, expected) === 0;
	
	  // 7.2. If the expected value is a Date object, the actual value is
	  // equivalent if it is also a Date object that refers to the same time.
	  } else if (util.isDate(actual) && util.isDate(expected)) {
	    return actual.getTime() === expected.getTime();
	
	  // 7.3 If the expected value is a RegExp object, the actual value is
	  // equivalent if it is also a RegExp object with the same source and
	  // properties (`global`, `multiline`, `lastIndex`, `ignoreCase`).
	  } else if (util.isRegExp(actual) && util.isRegExp(expected)) {
	    return actual.source === expected.source &&
	           actual.global === expected.global &&
	           actual.multiline === expected.multiline &&
	           actual.lastIndex === expected.lastIndex &&
	           actual.ignoreCase === expected.ignoreCase;
	
	  // 7.4. Other pairs that do not both pass typeof value == 'object',
	  // equivalence is determined by ==.
	  } else if ((actual === null || typeof actual !== 'object') &&
	             (expected === null || typeof expected !== 'object')) {
	    return strict ? actual === expected : actual == expected;
	
	  // If both values are instances of typed arrays, wrap their underlying
	  // ArrayBuffers in a Buffer each to increase performance
	  // This optimization requires the arrays to have the same type as checked by
	  // Object.prototype.toString (aka pToString). Never perform binary
	  // comparisons for Float*Arrays, though, since e.g. +0 === -0 but their
	  // bit patterns are not identical.
	  } else if (isView(actual) && isView(expected) &&
	             pToString(actual) === pToString(expected) &&
	             !(actual instanceof Float32Array ||
	               actual instanceof Float64Array)) {
	    return compare(new Uint8Array(actual.buffer),
	                   new Uint8Array(expected.buffer)) === 0;
	
	  // 7.5 For all other Object pairs, including Array objects, equivalence is
	  // determined by having the same number of owned properties (as verified
	  // with Object.prototype.hasOwnProperty.call), the same set of keys
	  // (although not necessarily the same order), equivalent values for every
	  // corresponding key, and an identical 'prototype' property. Note: this
	  // accounts for both named and indexed properties on Arrays.
	  } else if (isBuffer(actual) !== isBuffer(expected)) {
	    return false;
	  } else {
	    memos = memos || {actual: [], expected: []};
	
	    var actualIndex = memos.actual.indexOf(actual);
	    if (actualIndex !== -1) {
	      if (actualIndex === memos.expected.indexOf(expected)) {
	        return true;
	      }
	    }
	
	    memos.actual.push(actual);
	    memos.expected.push(expected);
	
	    return objEquiv(actual, expected, strict, memos);
	  }
	}
	
	function isArguments(object) {
	  return Object.prototype.toString.call(object) == '[object Arguments]';
	}
	
	function objEquiv(a, b, strict, actualVisitedObjects) {
	  if (a === null || a === undefined || b === null || b === undefined)
	    return false;
	  // if one is a primitive, the other must be same
	  if (util.isPrimitive(a) || util.isPrimitive(b))
	    return a === b;
	  if (strict && Object.getPrototypeOf(a) !== Object.getPrototypeOf(b))
	    return false;
	  var aIsArgs = isArguments(a);
	  var bIsArgs = isArguments(b);
	  if ((aIsArgs && !bIsArgs) || (!aIsArgs && bIsArgs))
	    return false;
	  if (aIsArgs) {
	    a = pSlice.call(a);
	    b = pSlice.call(b);
	    return _deepEqual(a, b, strict);
	  }
	  var ka = objectKeys(a);
	  var kb = objectKeys(b);
	  var key, i;
	  // having the same number of owned properties (keys incorporates
	  // hasOwnProperty)
	  if (ka.length !== kb.length)
	    return false;
	  //the same set of keys (although not necessarily the same order),
	  ka.sort();
	  kb.sort();
	  //~~~cheap key test
	  for (i = ka.length - 1; i >= 0; i--) {
	    if (ka[i] !== kb[i])
	      return false;
	  }
	  //equivalent values for every corresponding key, and
	  //~~~possibly expensive deep test
	  for (i = ka.length - 1; i >= 0; i--) {
	    key = ka[i];
	    if (!_deepEqual(a[key], b[key], strict, actualVisitedObjects))
	      return false;
	  }
	  return true;
	}
	
	// 8. The non-equivalence assertion tests for any deep inequality.
	// assert.notDeepEqual(actual, expected, message_opt);
	
	assert.notDeepEqual = function notDeepEqual(actual, expected, message) {
	  if (_deepEqual(actual, expected, false)) {
	    fail(actual, expected, message, 'notDeepEqual', assert.notDeepEqual);
	  }
	};
	
	assert.notDeepStrictEqual = notDeepStrictEqual;
	function notDeepStrictEqual(actual, expected, message) {
	  if (_deepEqual(actual, expected, true)) {
	    fail(actual, expected, message, 'notDeepStrictEqual', notDeepStrictEqual);
	  }
	}
	
	
	// 9. The strict equality assertion tests strict equality, as determined by ===.
	// assert.strictEqual(actual, expected, message_opt);
	
	assert.strictEqual = function strictEqual(actual, expected, message) {
	  if (actual !== expected) {
	    fail(actual, expected, message, '===', assert.strictEqual);
	  }
	};
	
	// 10. The strict non-equality assertion tests for strict inequality, as
	// determined by !==.  assert.notStrictEqual(actual, expected, message_opt);
	
	assert.notStrictEqual = function notStrictEqual(actual, expected, message) {
	  if (actual === expected) {
	    fail(actual, expected, message, '!==', assert.notStrictEqual);
	  }
	};
	
	function expectedException(actual, expected) {
	  if (!actual || !expected) {
	    return false;
	  }
	
	  if (Object.prototype.toString.call(expected) == '[object RegExp]') {
	    return expected.test(actual);
	  }
	
	  try {
	    if (actual instanceof expected) {
	      return true;
	    }
	  } catch (e) {
	    // Ignore.  The instanceof check doesn't work for arrow functions.
	  }
	
	  if (Error.isPrototypeOf(expected)) {
	    return false;
	  }
	
	  return expected.call({}, actual) === true;
	}
	
	function _tryBlock(block) {
	  var error;
	  try {
	    block();
	  } catch (e) {
	    error = e;
	  }
	  return error;
	}
	
	function _throws(shouldThrow, block, expected, message) {
	  var actual;
	
	  if (typeof block !== 'function') {
	    throw new TypeError('"block" argument must be a function');
	  }
	
	  if (typeof expected === 'string') {
	    message = expected;
	    expected = null;
	  }
	
	  actual = _tryBlock(block);
	
	  message = (expected && expected.name ? ' (' + expected.name + ').' : '.') +
	            (message ? ' ' + message : '.');
	
	  if (shouldThrow && !actual) {
	    fail(actual, expected, 'Missing expected exception' + message);
	  }
	
	  var userProvidedMessage = typeof message === 'string';
	  var isUnwantedException = !shouldThrow && util.isError(actual);
	  var isUnexpectedException = !shouldThrow && actual && !expected;
	
	  if ((isUnwantedException &&
	      userProvidedMessage &&
	      expectedException(actual, expected)) ||
	      isUnexpectedException) {
	    fail(actual, expected, 'Got unwanted exception' + message);
	  }
	
	  if ((shouldThrow && actual && expected &&
	      !expectedException(actual, expected)) || (!shouldThrow && actual)) {
	    throw actual;
	  }
	}
	
	// 11. Expected to throw an error:
	// assert.throws(block, Error_opt, message_opt);
	
	assert.throws = function(block, /*optional*/error, /*optional*/message) {
	  _throws(true, block, error, message);
	};
	
	// EXTENSION! This is annoying to write outside this module.
	assert.doesNotThrow = function(block, /*optional*/error, /*optional*/message) {
	  _throws(false, block, error, message);
	};
	
	assert.ifError = function(err) { if (err) throw err; };
	
	var objectKeys = Object.keys || function (obj) {
	  var keys = [];
	  for (var key in obj) {
	    if (hasOwn.call(obj, key)) keys.push(key);
	  }
	  return keys;
	};
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 7 */
/***/ function(module, exports) {

	module.exports = now
	
	function now() {
	    return new Date().getTime()
	}


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;/* WEBPACK VAR INJECTION */(function(console, global) {(function (global, factory) {
	     true ? factory(exports) :
	    typeof define === 'function' && define.amd ? define(['exports'], factory) :
	    (factory((global.Redsift = global.Redsift || {})));
	}(this, (function (exports) {
	
	var EmailClientController = function EmailClientController() {
	  this._proxy = self;
	  this._registerMessageListeners();
	};
	
	EmailClientController.prototype._registerMessageListeners = function _registerMessageListeners () {
	    var this$1 = this;
	
	  if(!this._proxy) return;
	  this._proxy.onmessage = function (e) {
	    // console.log('[SiftController::onmessage]: ', e.data);
	    var method = e.data.method;
	    if (this$1['_' + method]) {
	      this$1['_' + method](e.data.params);
	    }
	    else {
	      // console.log('[EmailClientController::onmessage]: method not implemented: ', method);
	    }
	  };
	};
	
	EmailClientController.prototype._emailStats = function _emailStats (stats) {
	  if(this.onstats) {
	    this.onstats(stats.name, stats.value);
	  }
	};
	
	EmailClientController.prototype._getThreadRowDisplayInfo = function _getThreadRowDisplayInfo (params) {
	    var this$1 = this;
	
	  // console.log('[EmailClientController::_getThreadRowDisplayInfo]: ', params);
	  var trdis = {};
	  params.tris.forEach(function (thread) {
	    if (thread.value !== undefined && thread.value.list !== undefined && this$1.loadThreadListView) {
	      trdis[thread.key] = this$1.loadThreadListView(thread.value.list, params.supportedTemplates);
	    }
	  });
	  // Notify the client
	  this._proxy.postMessage({
	    method: 'getThreadRowDisplayInfoCallback',
	    params: trdis
	  });
	};
	
	/**
	 * Observable pattern implementation.
	 * Supports topics as String or an Array.
	 */
	var Observable = function Observable() {
	  this._observers = [];
	};
	
	Observable.prototype.subscribe = function subscribe (topic, observer) {
	  this._op('_sub', topic, observer);
	};
	
	Observable.prototype.unsubscribe = function unsubscribe (topic, observer) {
	  this._op('_unsub', topic, observer);
	};
	
	Observable.prototype.unsubscribeAll = function unsubscribeAll (topic) {
	  if (!this._observers[topic]) {
	    return;
	  }
	  delete this._observers[topic];
	};
	
	Observable.prototype.publish = function publish (topic, message) {
	  this._op('_pub', topic, message);
	};
	
	/**
	 * Internal methods
	 */
	Observable.prototype._op = function _op (op, topic, value) {
	    var this$1 = this;
	
	  if (Array.isArray(topic)) {
	    topic.forEach(function (t) {
	      this$1[op](t, value);
	    });
	  }
	  else {
	    this[op](topic, value);
	  }
	};
	
	Observable.prototype._sub = function _sub (topic, observer) {
	  this._observers[topic] || (this._observers[topic] = []);
	  if(observer && this._observers[topic].indexOf(observer) === -1) {
	    this._observers[topic].push(observer);
	  }
	};
	
	Observable.prototype._unsub = function _unsub (topic, observer) {
	  if (!this._observers[topic]) {
	    return;
	  }
	  var index = this._observers[topic].indexOf(observer);
	  if (~index) {
	    this._observers[topic].splice(index, 1);
	  }
	};
	
	Observable.prototype._pub = function _pub (topic, message) {
	    var this$1 = this;
	
	  if (!this._observers[topic]) {
	    return;
	  }
	  for (var i = this._observers[topic].length - 1; i >= 0; i--) {
	    this$1._observers[topic][i](message)
	  }
	};
	
	var SiftView = function SiftView() {
	  this._resizeHandler = null;
	  this._proxy = parent;
	  this.controller = new Observable();
	  this._registerMessageListeners();
	};
	
	SiftView.prototype.publish = function publish (topic, value) {
	 this._proxy.postMessage({
	    method: 'notifyController',
	    params: {
	      topic: topic,
	      value: value } },
	    '*');
	};
	
	SiftView.prototype._registerMessageListeners = function _registerMessageListeners () {
	    var this$1 = this;
	
	  window.addEventListener('message', function (e) {
	    var method = e.data.method;
	    var params = e.data.params;
	    if(method === 'notifyView') {
	      this$1.controller.publish(params.topic, params.value);
	    }
	    else if(this$1[method]) {
	      this$1[method](params);
	    }
	    else {
	      console.warn('[SiftView]: method not implemented: ', method);
	    }
	  }, false);
	};
	
	var EmailClient = (function (Observable) {
	  function EmailClient(proxy) {
	    Observable.call(this);
	    this._proxy = proxy;
	  }
	
	  if ( Observable ) EmailClient.__proto__ = Observable;
	  EmailClient.prototype = Object.create( Observable && Observable.prototype );
	  EmailClient.prototype.constructor = EmailClient;
	
	  EmailClient.prototype.goto = function goto (params) {
	    this._postMessage('goto', params);
	  };
	
	  EmailClient.prototype.close = function close () {
	    this._postMessage('close');
	  };
	
	  EmailClient.prototype._postMessage = function _postMessage (topic, value) {
	    this._proxy.postMessage({
	      method: 'notifyClient',
	      params: {
	        topic: topic,
	        value: value
	      }
	    });
	  };
	
	  return EmailClient;
	}(Observable));
	
	var SiftStorage = (function (Observable) {
	  function SiftStorage() {
	    Observable.call(this);
	    this._storage = null;
	  }
	
	  if ( Observable ) SiftStorage.__proto__ = Observable;
	  SiftStorage.prototype = Object.create( Observable && Observable.prototype );
	  SiftStorage.prototype.constructor = SiftStorage;
	
	  SiftStorage.prototype.init = function init (storage) {
	    this._storage = storage;
	  };
	
	  SiftStorage.prototype.get = function get (d) { return this._storage.get(d) };
	  SiftStorage.prototype.getIndexKeys = function getIndexKeys (d) { return this._storage.getIndexKeys(d) };
	  SiftStorage.prototype.getIndex = function getIndex (d) { return this._storage.getIndex(d) };
	  SiftStorage.prototype.getWithIndex = function getWithIndex (d) { return this._storage.getWithIndex(d) };
	  SiftStorage.prototype.getAllKeys = function getAllKeys (d) { return this._storage.getAllKeys(d) };
	  SiftStorage.prototype.getAll = function getAll (d) { return this._storage.getAll(d) };
	  SiftStorage.prototype.getUser = function getUser (d) { return this._storage.getUser(d) };
	  SiftStorage.prototype.putUser = function putUser (d) { return this._storage.putUser(d) };
	  SiftStorage.prototype.delUser = function delUser (d) { return this._storage.delUser(d) };
	
	  return SiftStorage;
	}(Observable));
	
	var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {}
	
	function createCommonjsModule(fn, module) {
		return module = { exports: {} }, fn(module, module.exports), module.exports;
	}
	
	var loglevel = createCommonjsModule(function (module) {
	/*
	* loglevel - https://github.com/pimterry/loglevel
	*
	* Copyright (c) 2013 Tim Perry
	* Licensed under the MIT license.
	*/
	(function (root, definition) {
	    "use strict";
	    if (true) {
	        !(__WEBPACK_AMD_DEFINE_FACTORY__ = (definition), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	    } else if (typeof module === 'object' && module.exports) {
	        module.exports = definition();
	    } else {
	        root.log = definition();
	    }
	}(commonjsGlobal, function () {
	    "use strict";
	    var noop = function() {};
	    var undefinedType = "undefined";
	
	    function realMethod(methodName) {
	        if (typeof console === undefinedType) {
	            return false; // We can't build a real method without a console to log to
	        } else if (console[methodName] !== undefined) {
	            return bindMethod(console, methodName);
	        } else if (console.log !== undefined) {
	            return bindMethod(console, 'log');
	        } else {
	            return noop;
	        }
	    }
	
	    function bindMethod(obj, methodName) {
	        var method = obj[methodName];
	        if (typeof method.bind === 'function') {
	            return method.bind(obj);
	        } else {
	            try {
	                return Function.prototype.bind.call(method, obj);
	            } catch (e) {
	                // Missing bind shim or IE8 + Modernizr, fallback to wrapping
	                return function() {
	                    return Function.prototype.apply.apply(method, [obj, arguments]);
	                };
	            }
	        }
	    }
	
	    // these private functions always need `this` to be set properly
	
	    function enableLoggingWhenConsoleArrives(methodName, level, loggerName) {
	        return function () {
	            if (typeof console !== undefinedType) {
	                replaceLoggingMethods.call(this, level, loggerName);
	                this[methodName].apply(this, arguments);
	            }
	        };
	    }
	
	    function replaceLoggingMethods(level, loggerName) {
	        var this$1 = this;
	
	        /*jshint validthis:true */
	        for (var i = 0; i < logMethods.length; i++) {
	            var methodName = logMethods[i];
	            this$1[methodName] = (i < level) ?
	                noop :
	                this$1.methodFactory(methodName, level, loggerName);
	        }
	    }
	
	    function defaultMethodFactory(methodName, level, loggerName) {
	        /*jshint validthis:true */
	        return realMethod(methodName) ||
	               enableLoggingWhenConsoleArrives.apply(this, arguments);
	    }
	
	    var logMethods = [
	        "trace",
	        "debug",
	        "info",
	        "warn",
	        "error"
	    ];
	
	    function Logger(name, defaultLevel, factory) {
	      var self = this;
	      var currentLevel;
	      var storageKey = "loglevel";
	      if (name) {
	        storageKey += ":" + name;
	      }
	
	      function persistLevelIfPossible(levelNum) {
	          var levelName = (logMethods[levelNum] || 'silent').toUpperCase();
	
	          // Use localStorage if available
	          try {
	              window.localStorage[storageKey] = levelName;
	              return;
	          } catch (ignore) {}
	
	          // Use session cookie as fallback
	          try {
	              window.document.cookie =
	                encodeURIComponent(storageKey) + "=" + levelName + ";";
	          } catch (ignore) {}
	      }
	
	      function getPersistedLevel() {
	          var storedLevel;
	
	          try {
	              storedLevel = window.localStorage[storageKey];
	          } catch (ignore) {}
	
	          if (typeof storedLevel === undefinedType) {
	              try {
	                  var cookie = window.document.cookie;
	                  var location = cookie.indexOf(
	                      encodeURIComponent(storageKey) + "=");
	                  if (location) {
	                      storedLevel = /^([^;]+)/.exec(cookie.slice(location))[1];
	                  }
	              } catch (ignore) {}
	          }
	
	          // If the stored level is not valid, treat it as if nothing was stored.
	          if (self.levels[storedLevel] === undefined) {
	              storedLevel = undefined;
	          }
	
	          return storedLevel;
	      }
	
	      /*
	       *
	       * Public API
	       *
	       */
	
	      self.levels = { "TRACE": 0, "DEBUG": 1, "INFO": 2, "WARN": 3,
	          "ERROR": 4, "SILENT": 5};
	
	      self.methodFactory = factory || defaultMethodFactory;
	
	      self.getLevel = function () {
	          return currentLevel;
	      };
	
	      self.setLevel = function (level, persist) {
	          if (typeof level === "string" && self.levels[level.toUpperCase()] !== undefined) {
	              level = self.levels[level.toUpperCase()];
	          }
	          if (typeof level === "number" && level >= 0 && level <= self.levels.SILENT) {
	              currentLevel = level;
	              if (persist !== false) {  // defaults to true
	                  persistLevelIfPossible(level);
	              }
	              replaceLoggingMethods.call(self, level, name);
	              if (typeof console === undefinedType && level < self.levels.SILENT) {
	                  return "No console available for logging";
	              }
	          } else {
	              throw "log.setLevel() called with invalid level: " + level;
	          }
	      };
	
	      self.setDefaultLevel = function (level) {
	          if (!getPersistedLevel()) {
	              self.setLevel(level, false);
	          }
	      };
	
	      self.enableAll = function(persist) {
	          self.setLevel(self.levels.TRACE, persist);
	      };
	
	      self.disableAll = function(persist) {
	          self.setLevel(self.levels.SILENT, persist);
	      };
	
	      // Initialize with the right level
	      var initialLevel = getPersistedLevel();
	      if (initialLevel == null) {
	          initialLevel = defaultLevel == null ? "WARN" : defaultLevel;
	      }
	      self.setLevel(initialLevel, false);
	    }
	
	    /*
	     *
	     * Package-level API
	     *
	     */
	
	    var defaultLogger = new Logger();
	
	    var _loggersByName = {};
	    defaultLogger.getLogger = function getLogger(name) {
	        if (typeof name !== "string" || name === "") {
	          throw new TypeError("You must supply a name when creating a logger.");
	        }
	
	        var logger = _loggersByName[name];
	        if (!logger) {
	          logger = _loggersByName[name] = new Logger(
	            name, defaultLogger.getLevel(), defaultLogger.methodFactory);
	        }
	        return logger;
	    };
	
	    // Grab the current global log variable in case of overwrite
	    var _log = (typeof window !== undefinedType) ? window.log : undefined;
	    defaultLogger.noConflict = function() {
	        if (typeof window !== undefinedType &&
	               window.log === defaultLogger) {
	            window.log = _log;
	        }
	
	        return defaultLogger;
	    };
	
	    return defaultLogger;
	}));
	});
	
	var loglevel$1 = (loglevel && typeof loglevel === 'object' && 'default' in loglevel ? loglevel['default'] : loglevel);
	
	var index$2 = createCommonjsModule(function (module) {
	'use strict';
	var toString = Object.prototype.toString;
	
	module.exports = function (x) {
		var prototype;
		return toString.call(x) === '[object Object]' && (prototype = Object.getPrototypeOf(x), prototype === null || prototype === Object.getPrototypeOf({}));
	};
	});
	
	var require$$0$2 = (index$2 && typeof index$2 === 'object' && 'default' in index$2 ? index$2['default'] : index$2);
	
	var index$1 = createCommonjsModule(function (module, exports) {
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = range;
	
	var _isPlainObj = require$$0$2;
	
	var _isPlainObj2 = _interopRequireDefault(_isPlainObj);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 * Parse `opts` to valid IDBKeyRange.
	 * https://developer.mozilla.org/en-US/docs/Web/API/IDBKeyRange
	 *
	 * @param {Object} opts
	 * @return {IDBKeyRange}
	 */
	
	function range(opts) {
	  var IDBKeyRange = commonjsGlobal.IDBKeyRange || commonjsGlobal.webkitIDBKeyRange;
	  if (opts instanceof IDBKeyRange) return opts;
	  if (typeof opts === 'undefined' || opts === null) return null;
	  if (!(0, _isPlainObj2.default)(opts)) return IDBKeyRange.only(opts);
	  var keys = Object.keys(opts).sort();
	
	  if (keys.length === 1) {
	    var key = keys[0];
	    var val = opts[key];
	
	    switch (key) {
	      case 'eq':
	        return IDBKeyRange.only(val);
	      case 'gt':
	        return IDBKeyRange.lowerBound(val, true);
	      case 'lt':
	        return IDBKeyRange.upperBound(val, true);
	      case 'gte':
	        return IDBKeyRange.lowerBound(val);
	      case 'lte':
	        return IDBKeyRange.upperBound(val);
	      default:
	        throw new TypeError('"' + key + '" is not valid key');
	    }
	  } else {
	    var x = opts[keys[0]];
	    var y = opts[keys[1]];
	    var pattern = keys.join('-');
	
	    switch (pattern) {
	      case 'gt-lt':
	        return IDBKeyRange.bound(x, y, true, true);
	      case 'gt-lte':
	        return IDBKeyRange.bound(x, y, true, false);
	      case 'gte-lt':
	        return IDBKeyRange.bound(x, y, false, true);
	      case 'gte-lte':
	        return IDBKeyRange.bound(x, y, false, false);
	      default:
	        throw new TypeError('"' + pattern + '" are conflicted keys');
	    }
	  }
	}
	module.exports = exports['default'];
	});
	
	var require$$0$1 = (index$1 && typeof index$1 === 'object' && 'default' in index$1 ? index$1['default'] : index$1);
	
	var idbIndex = createCommonjsModule(function (module) {
	var parseRange = require$$0$1;
	
	/**
	 * Expose `Index`.
	 */
	
	module.exports = Index;
	
	/**
	 * Initialize new `Index`.
	 *
	 * @param {Store} store
	 * @param {String} name
	 * @param {String|Array} field
	 * @param {Object} opts { unique: false, multi: false }
	 */
	
	function Index(store, name, field, opts) {
	  this.store = store;
	  this.name = name;
	  this.field = field;
	  this.opts = opts;
	  this.multi = opts.multi || opts.multiEntry || false;
	  this.unique = opts.unique || false;
	}
	
	/**
	 * Get `key`.
	 *
	 * @param {Object|IDBKeyRange} key
	 * @param {Function} cb
	 */
	
	Index.prototype.get = function(key, cb) {
	  var result = [];
	  var isUnique = this.unique;
	  var opts = { range: key, iterator: iterator };
	
	  this.cursor(opts, function(err) {
	    if (err) return cb(err);
	    isUnique ? cb(null, result[0]) : cb(null, result);
	  });
	
	  function iterator(cursor) {
	    result.push(cursor.value);
	    cursor.continue();
	  }
	};
	
	/**
	 * Count records by `key`.
	 *
	 * @param {String|IDBKeyRange} key
	 * @param {Function} cb
	 */
	
	Index.prototype.count = function(key, cb) {
	  var name = this.store.name;
	  var indexName = this.name;
	
	  this.store.db.transaction('readonly', [name], function(err, tr) {
	    if (err) return cb(err);
	    var index = tr.objectStore(name).index(indexName);
	    var req = index.count(parseRange(key));
	    req.onerror = cb;
	    req.onsuccess = function onsuccess(e) { cb(null, e.target.result) };
	  });
	};
	
	/**
	 * Create cursor.
	 * Proxy to `this.store` for convinience.
	 *
	 * @param {Object} opts
	 * @param {Function} cb
	 */
	
	Index.prototype.cursor = function(opts, cb) {
	  opts.index = this.name;
	  this.store.cursor(opts, cb);
	};
	});
	
	var require$$0 = (idbIndex && typeof idbIndex === 'object' && 'default' in idbIndex ? idbIndex['default'] : idbIndex);
	
	var index$3 = createCommonjsModule(function (module) {
	/**
	 * toString ref.
	 */
	
	var toString = Object.prototype.toString;
	
	/**
	 * Return the type of `val`.
	 *
	 * @param {Mixed} val
	 * @return {String}
	 * @api public
	 */
	
	module.exports = function(val){
	  switch (toString.call(val)) {
	    case '[object Date]': return 'date';
	    case '[object RegExp]': return 'regexp';
	    case '[object Arguments]': return 'arguments';
	    case '[object Array]': return 'array';
	    case '[object Error]': return 'error';
	  }
	
	  if (val === null) return 'null';
	  if (val === undefined) return 'undefined';
	  if (val !== val) return 'nan';
	  if (val && val.nodeType === 1) return 'element';
	
	  val = val.valueOf
	    ? val.valueOf()
	    : Object.prototype.valueOf.apply(val)
	
	  return typeof val;
	};
	});
	
	var require$$2 = (index$3 && typeof index$3 === 'object' && 'default' in index$3 ? index$3['default'] : index$3);
	
	var idbStore = createCommonjsModule(function (module) {
	var type = require$$2;
	var parseRange = require$$0$1;
	
	/**
	 * Expose `Store`.
	 */
	
	module.exports = Store;
	
	/**
	 * Initialize new `Store`.
	 *
	 * @param {String} name
	 * @param {Object} opts
	 */
	
	function Store(name, opts) {
	  this.db = null;
	  this.name = name;
	  this.indexes = {};
	  this.opts = opts;
	  this.key = opts.key || opts.keyPath || undefined;
	  this.increment = opts.increment || opts.autoIncretement || undefined;
	}
	
	/**
	 * Get index by `name`.
	 *
	 * @param {String} name
	 * @return {Index}
	 */
	
	Store.prototype.index = function(name) {
	  return this.indexes[name];
	};
	
	/**
	 * Put (create or replace) `key` to `val`.
	 *
	 * @param {String|Object} [key] is optional when store.key exists.
	 * @param {Any} val
	 * @param {Function} cb
	 */
	
	Store.prototype.put = function(key, val, cb) {
	  var name = this.name;
	  var keyPath = this.key;
	  if (keyPath) {
	    if (type(key) == 'object') {
	      cb = val;
	      val = key;
	      key = null;
	    } else {
	      val[keyPath] = key;
	    }
	  }
	
	  this.db.transaction('readwrite', [name], function(err, tr) {
	    if (err) return cb(err);
	    var objectStore = tr.objectStore(name);
	    var req = keyPath ? objectStore.put(val) : objectStore.put(val, key);
	    tr.onerror = tr.onabort = req.onerror = cb;
	    tr.oncomplete = function oncomplete() { cb(null, req.result) };
	  });
	};
	
	/**
	 * Get `key`.
	 *
	 * @param {String} key
	 * @param {Function} cb
	 */
	
	Store.prototype.get = function(key, cb) {
	  var name = this.name;
	  this.db.transaction('readonly', [name], function(err, tr) {
	    if (err) return cb(err);
	    var objectStore = tr.objectStore(name);
	    var req = objectStore.get(key);
	    req.onerror = cb;
	    req.onsuccess = function onsuccess(e) { cb(null, e.target.result) };
	  });
	};
	
	/**
	 * Del `key`.
	 *
	 * @param {String} key
	 * @param {Function} cb
	 */
	
	Store.prototype.del = function(key, cb) {
	  var name = this.name;
	  this.db.transaction('readwrite', [name], function(err, tr) {
	    if (err) return cb(err);
	    var objectStore = tr.objectStore(name);
	    var req = objectStore.delete(key);
	    tr.onerror = tr.onabort = req.onerror = cb;
	    tr.oncomplete = function oncomplete() { cb() };
	  });
	};
	
	/**
	 * Count.
	 *
	 * @param {Function} cb
	 */
	
	Store.prototype.count = function(cb) {
	  var name = this.name;
	  this.db.transaction('readonly', [name], function(err, tr) {
	    if (err) return cb(err);
	    var objectStore = tr.objectStore(name);
	    var req = objectStore.count();
	    req.onerror = cb;
	    req.onsuccess = function onsuccess(e) { cb(null, e.target.result) };
	  });
	};
	
	/**
	 * Clear.
	 *
	 * @param {Function} cb
	 */
	
	Store.prototype.clear = function(cb) {
	  var name = this.name;
	  this.db.transaction('readwrite', [name], function(err, tr) {
	    if (err) return cb(err);
	    var objectStore = tr.objectStore(name);
	    var req = objectStore.clear();
	    tr.onerror = tr.onabort = req.onerror = cb;
	    tr.oncomplete = function oncomplete() { cb() };
	  });
	};
	
	/**
	 * Perform batch operation.
	 *
	 * @param {Object} vals
	 * @param {Function} cb
	 */
	
	Store.prototype.batch = function(vals, cb) {
	  var name = this.name;
	  var keyPath = this.key;
	  var keys = Object.keys(vals);
	
	  this.db.transaction('readwrite', [name], function(err, tr) {
	    if (err) return cb(err);
	    var store = tr.objectStore(name);
	    var current = 0;
	    tr.onerror = tr.onabort = cb;
	    tr.oncomplete = function oncomplete() { cb() };
	    next();
	
	    function next() {
	      if (current >= keys.length) return;
	      var currentKey = keys[current];
	      var currentVal = vals[currentKey];
	      var req;
	
	      if (currentVal === null) {
	        req = store.delete(currentKey);
	      } else if (keyPath) {
	        if (!currentVal[keyPath]) currentVal[keyPath] = currentKey;
	        req = store.put(currentVal);
	      } else {
	        req = store.put(currentVal, currentKey);
	      }
	
	      req.onerror = cb;
	      req.onsuccess = next;
	      current += 1;
	    }
	  });
	};
	
	/**
	 * Get all.
	 *
	 * @param {Function} cb
	 */
	
	Store.prototype.all = function(cb) {
	  var result = [];
	
	  this.cursor({ iterator: iterator }, function(err) {
	    err ? cb(err) : cb(null, result);
	  });
	
	  function iterator(cursor) {
	    result.push(cursor.value);
	    cursor.continue();
	  }
	};
	
	/**
	 * Create read cursor for specific `range`,
	 * and pass IDBCursor to `iterator` function.
	 * https://developer.mozilla.org/en-US/docs/Web/API/IDBCursor
	 *
	 * @param {Object} opts:
	 *   {IDBRange|Object} range - passes to .openCursor()
	 *   {Function} iterator - function to call with IDBCursor
	 *   {String} [index] - name of index to start cursor by index
	 * @param {Function} cb - calls on end or error
	 */
	
	Store.prototype.cursor = function(opts, cb) {
	  var name = this.name;
	  this.db.transaction('readonly', [name], function(err, tr) {
	    if (err) return cb(err);
	    var store = opts.index
	      ? tr.objectStore(name).index(opts.index)
	      : tr.objectStore(name);
	    var req = store.openCursor(parseRange(opts.range));
	
	    req.onerror = cb;
	    req.onsuccess = function onsuccess(e) {
	      var cursor = e.target.result;
	      cursor ? opts.iterator(cursor) : cb();
	    };
	  });
	};
	});
	
	var require$$1 = (idbStore && typeof idbStore === 'object' && 'default' in idbStore ? idbStore['default'] : idbStore);
	
	var schema$1 = createCommonjsModule(function (module) {
	var type = require$$2;
	var Store = require$$1;
	var Index = require$$0;
	
	/**
	 * Expose `Schema`.
	 */
	
	module.exports = Schema;
	
	/**
	 * Initialize new `Schema`.
	 */
	
	function Schema() {
	  if (!(this instanceof Schema)) return new Schema();
	  this._stores = {};
	  this._current = {};
	  this._versions = {};
	}
	
	/**
	 * Set new version.
	 *
	 * @param {Number} version
	 * @return {Schema}
	 */
	
	Schema.prototype.version = function(version) {
	  if (type(version) != 'number' || version < 1 || version < this.getVersion())
	    throw new TypeError('not valid version');
	
	  this._current = { version: version, store: null };
	  this._versions[version] = {
	    stores: [],      // db.createObjectStore
	    dropStores: [],  // db.deleteObjectStore
	    indexes: [],     // store.createIndex
	    dropIndexes: [], // store.deleteIndex
	    version: version // version
	  };
	
	  return this;
	};
	
	/**
	 * Add store.
	 *
	 * @param {String} name
	 * @param {Object} [opts] { key: false }
	 * @return {Schema}
	 */
	
	Schema.prototype.addStore = function(name, opts) {
	  if (type(name) != 'string') throw new TypeError('`name` is required');
	  if (this._stores[name]) throw new TypeError('store is already defined');
	  var store = new Store(name, opts || {});
	  this._stores[name] = store;
	  this._versions[this.getVersion()].stores.push(store);
	  this._current.store = store;
	  return this;
	};
	
	/**
	 * Drop store.
	 *
	 * @param {String} name
	 * @return {Schema}
	 */
	
	Schema.prototype.dropStore = function(name) {
	  if (type(name) != 'string') throw new TypeError('`name` is required');
	  var store = this._stores[name];
	  if (!store) throw new TypeError('store is not defined');
	  delete this._stores[name];
	  this._versions[this.getVersion()].dropStores.push(store);
	  return this;
	};
	
	/**
	 * Add index.
	 *
	 * @param {String} name
	 * @param {String|Array} field
	 * @param {Object} [opts] { unique: false, multi: false }
	 * @return {Schema}
	 */
	
	Schema.prototype.addIndex = function(name, field, opts) {
	  if (type(name) != 'string') throw new TypeError('`name` is required');
	  if (type(field) != 'string' && type(field) != 'array') throw new TypeError('`field` is required');
	  var store = this._current.store;
	  if (store.indexes[name]) throw new TypeError('index is already defined');
	  var index = new Index(store, name, field, opts || {});
	  store.indexes[name] = index;
	  this._versions[this.getVersion()].indexes.push(index);
	  return this;
	};
	
	/**
	 * Drop index.
	 *
	 * @param {String} name
	 * @return {Schema}
	 */
	
	Schema.prototype.dropIndex = function(name) {
	  if (type(name) != 'string') throw new TypeError('`name` is required');
	  var index = this._current.store.indexes[name];
	  if (!index) throw new TypeError('index is not defined');
	  delete this._current.store.indexes[name];
	  this._versions[this.getVersion()].dropIndexes.push(index);
	  return this;
	};
	
	/**
	 * Change current store.
	 *
	 * @param {String} name
	 * @return {Schema}
	 */
	
	Schema.prototype.getStore = function(name) {
	  if (type(name) != 'string') throw new TypeError('`name` is required');
	  if (!this._stores[name]) throw new TypeError('store is not defined');
	  this._current.store = this._stores[name];
	  return this;
	};
	
	/**
	 * Get version.
	 *
	 * @return {Number}
	 */
	
	Schema.prototype.getVersion = function() {
	  return this._current.version;
	};
	
	/**
	 * Generate onupgradeneeded callback.
	 *
	 * @return {Function}
	 */
	
	Schema.prototype.callback = function() {
	  var versions = Object.keys(this._versions)
	    .map(function(v) { return this._versions[v] }, this)
	    .sort(function(a, b) { return a.version - b.version });
	
	  return function onupgradeneeded(e) {
	    var db = e.target.result;
	    var tr = e.target.transaction;
	
	    versions.forEach(function(versionSchema) {
	      if (e.oldVersion >= versionSchema.version) return;
	
	      versionSchema.stores.forEach(function(s) {
	        var options = {};
	
	        // Only pass the options that are explicitly specified to createObjectStore() otherwise IE/Edge
	        // can throw an InvalidAccessError - see https://msdn.microsoft.com/en-us/library/hh772493(v=vs.85).aspx
	        if (typeof s.key !== 'undefined') options.keyPath = s.key;
	        if (typeof s.increment !== 'undefined') options.autoIncrement = s.increment;
	
	        db.createObjectStore(s.name, options);
	      });
	
	      versionSchema.dropStores.forEach(function(s) {
	        db.deleteObjectStore(s.name);
	      });
	
	      versionSchema.indexes.forEach(function(i) {
	        var store = tr.objectStore(i.store.name);
	        store.createIndex(i.name, i.field, {
	          unique: i.unique,
	          multiEntry: i.multi
	        });
	      });
	
	      versionSchema.dropIndexes.forEach(function(i) {
	        var store = tr.objectStore(i.store.name);
	        store.deleteIndex(i.name);
	      });
	    });
	  };
	};
	});
	
	var require$$2$1 = (schema$1 && typeof schema$1 === 'object' && 'default' in schema$1 ? schema$1['default'] : schema$1);
	
	var index = createCommonjsModule(function (module, exports) {
	var type = require$$2;
	var Schema = require$$2$1;
	var Store = require$$1;
	var Index = require$$0;
	
	/**
	 * Expose `Treo`.
	 */
	
	exports = module.exports = Treo;
	
	/**
	 * Initialize new `Treo` instance.
	 *
	 * @param {String} name
	 * @param {Schema} schema
	 */
	
	function Treo(name, schema) {
	  if (!(this instanceof Treo)) return new Treo(name, schema);
	  if (type(name) != 'string') throw new TypeError('`name` required');
	  if (!(schema instanceof Schema)) throw new TypeError('not valid schema');
	
	  this.name = name;
	  this.status = 'close';
	  this.origin = null;
	  this.stores = schema._stores;
	  this.version = schema.getVersion();
	  this.onupgradeneeded = schema.callback();
	
	  // assign db property to each store
	  Object.keys(this.stores).forEach(function(storeName) {
	    this.stores[storeName].db = this;
	  }, this);
	}
	
	/**
	 * Expose core classes.
	 */
	
	exports.schema = Schema;
	exports.cmp = cmp;
	exports.Treo = Treo;
	exports.Schema = Schema;
	exports.Store = Store;
	exports.Index = Index;
	
	/**
	 * Use plugin `fn`.
	 *
	 * @param {Function} fn
	 * @return {Treo}
	 */
	
	Treo.prototype.use = function(fn) {
	  fn(this, exports);
	  return this;
	};
	
	/**
	 * Drop.
	 *
	 * @param {Function} cb
	 */
	
	Treo.prototype.drop = function(cb) {
	  var name = this.name;
	  this.close(function(err) {
	    if (err) return cb(err);
	    var req = indexedDB().deleteDatabase(name);
	    req.onerror = cb;
	    req.onsuccess = function onsuccess() { cb() };
	  });
	};
	
	/**
	 * Close.
	 *
	 * @param {Function} cb
	 */
	
	Treo.prototype.close = function(cb) {
	  if (this.status == 'close') return cb();
	  this.getInstance(function(err, db) {
	    if (err) return cb(err);
	    db.origin = null;
	    db.status = 'close';
	    db.close();
	    cb();
	  });
	};
	
	/**
	 * Get store by `name`.
	 *
	 * @param {String} name
	 * @return {Store}
	 */
	
	Treo.prototype.store = function(name) {
	  return this.stores[name];
	};
	
	/**
	 * Get db instance. It starts opening transaction only once,
	 * another requests will be scheduled to queue.
	 *
	 * @param {Function} cb
	 */
	
	Treo.prototype.getInstance = function(cb) {
	  if (this.status == 'open') return cb(null, this.origin);
	  if (this.status == 'opening') return this.queue.push(cb);
	
	  this.status = 'opening';
	  this.queue = [cb]; // queue callbacks
	
	  var that = this;
	  var req = indexedDB().open(this.name, this.version);
	  req.onupgradeneeded = this.onupgradeneeded;
	
	  req.onerror = req.onblocked = function onerror(e) {
	    that.status = 'error';
	    that.queue.forEach(function(cb) { cb(e) });
	    delete that.queue;
	  };
	
	  req.onsuccess = function onsuccess(e) {
	    that.origin = e.target.result;
	    that.status = 'open';
	    that.origin.onversionchange = function onversionchange() {
	      that.close(function() {});
	    };
	    that.queue.forEach(function(cb) { cb(null, that.origin) });
	    delete that.queue;
	  };
	};
	
	/**
	 * Create new transaction for selected `stores`.
	 *
	 * @param {String} type (readwrite|readonly)
	 * @param {Array} stores - follow indexeddb semantic
	 * @param {Function} cb
	 */
	
	Treo.prototype.transaction = function(type, stores, cb) {
	  this.getInstance(function(err, db) {
	    err ? cb(err) : cb(null, db.transaction(stores, type));
	  });
	};
	
	/**
	 * Compare 2 values using IndexedDB comparision algotihm.
	 *
	 * @param {Mixed} value1
	 * @param {Mixed} value2
	 * @return {Number} -1|0|1
	 */
	
	function cmp() {
	  return indexedDB().cmp.apply(indexedDB(), arguments);
	}
	
	/**
	 * Dynamic link to `global.indexedDB` for polyfills support.
	 *
	 * @return {IDBDatabase}
	 */
	
	function indexedDB() {
	  return commonjsGlobal._indexedDB
	    || commonjsGlobal.indexedDB
	    || commonjsGlobal.msIndexedDB
	    || commonjsGlobal.mozIndexedDB
	    || commonjsGlobal.webkitIndexedDB;
	}
	});
	
	var treo = (index && typeof index === 'object' && 'default' in index ? index['default'] : index);
	
	var logger = loglevel$1.getLogger('RSStorage:operations');
	logger.setLevel('warn');
	
	// Email msg buckets
	var EMAIL_BUCKETS = ['_email.id', '_email.tid'];
	// Message Db schema
	var MSG_DB_VERSIONED_SCHEMA = [
	  // version 1
	  [
	    { name: '_id.list', indexes: ['sift.guid'] },
	    { name: '_tid.list', indexes: ['sift.guid'] }
	  ],
	  // version 2
	  [
	    { name: '_email.id', indexes: ['sift.guid'] },
	    { name: '_email.tid', indexes: ['sift.guid'] },
	    { name: '_id.list', drop: true },
	    { name: '_tid.list', drop: true }
	  ]
	];
	// Sync DB schema
	var SYNC_DB_SCHEMA = [
	  { name: 'events', indexes: ['value.sift.guid'] },
	  { name: 'admin' }];
	// Client DB schema
	var CLIENT_DB_SCHEMA = [
	  { name: 'tour'},
	  { name: 'spm' },
	  { name: 'auth' }];
	
	/*****************************************************************
	 * Operations (alphabetically ordered)
	 *****************************************************************/
	// Create Db
	function opCreateDb(dbInfo) {
	  logger.trace('[opCreateDb]: ', dbInfo);
	  var dbs = {};
	  switch (dbInfo.type) {
	    case 'MSG':
	      dbs.msg = treo('rs_msg_db-' + dbInfo.accountGuid, _getVersionedTreoSchema(MSG_DB_VERSIONED_SCHEMA));
	      break;
	    case 'SIFT':
	      if (!dbInfo.siftGuid) {
	        throw new Error('[opCreateDb]: dbInfo.siftGuid undefined');
	      }
	      logger.trace('[opCreateDb]: creating SIFT db');
	      var schema = _getTreoSchema(dbInfo.schema, true);
	      // Add user and redsift stores to sift db.
	      schema = schema.addStore('_user.default').addStore('_redsift');
	      dbs.db = treo(dbInfo.siftGuid + '-' + dbInfo.accountGuid, schema);
	      dbs.msg = treo('rs_msg_db-' + dbInfo.accountGuid, _getVersionedTreoSchema(MSG_DB_VERSIONED_SCHEMA));
	      break;
	    case 'SYNC':
	      logger.trace('[opCreateDb]: creating SYNC db');
	      dbs.db = treo('rs_sync_log-' + dbInfo.accountGuid, _getTreoSchema(SYNC_DB_SCHEMA));
	      break;
	    case 'CLIENT':
	      dbs.db = treo('rs_client_db-' + dbInfo.clientName, _getTreoSchema(CLIENT_DB_SCHEMA));
	      break;
	    default:
	      throw new Error('[opCreateDb]: unsupported db type: ' + dbInfo.type);
	  }
	  return dbs;
	}
	
	// Del
	function opDel(dbs, params, siftGuid) {
	  logger.trace('[opDel]: ', params, siftGuid);
	  if (!params.bucket) {
	    return Promise.reject('[opDel]: params.bucket undefined');
	  }
	  if (!params.keys || params.keys.length === 0) {
	    logger.trace('[opDel]: params.keys undefined');
	    return Promise.resolve();
	  }
	  if (EMAIL_BUCKETS.indexOf(params.bucket) !== -1) {
	    var keys = params.keys.map(function (k) {
	      return siftGuid + '/' + k;
	    });
	    return _batchDelete(dbs.msg, { bucket: params.bucket, keys: keys });
	  }
	  return _batchDelete(dbs.db, params);
	}
	
	// Get
	function opGet(dbs, params, siftGuid) {
	  logger.trace('[opGet]: ', params);
	  if (!params.bucket) {
	    return Promise.reject('[opGet]: params.bucket undefined');
	  }
	  if (!params.keys || params.keys.length === 0) {
	    return Promise.reject('[opGet]: param.keys undefined');
	  }
	  if (EMAIL_BUCKETS.indexOf(params.bucket) !== -1) {
	    var keys = params.keys.map(function (k) {
	      return siftGuid + '/' + k;
	    });
	    return _findIn(dbs.msg, { bucket: params.bucket, keys: keys }).then(function (result) {
	      return result.map(function (r) {
	        return { key: r.key.split('/')[1], value: r.value };
	      });
	    });
	  }
	  return _findIn(dbs.db, params);
	}
	
	// Get All
	function opGetAll(dbs, params, siftGuid) {
	  logger.trace('[opGetAll]: ', params, siftGuid);
	  if (!params.bucket) {
	    return Promise.reject('[opGetAll]: params.bucket undefined');
	  }
	  if (EMAIL_BUCKETS.indexOf(params.bucket) !== -1) {
	    return _getAll(dbs.msg, { bucket: params.bucket, index: 'sift.guid', range: siftGuid }, true)
	      .then(function (result) { return result.map(function (r) { return ({ key: r.key.split('/')[1], value: r.value }); }); }
	      );
	  }
	  return _getAll(dbs.db, params, true);
	}
	
	// Get All Keys
	function opGetAllKeys(dbs, params, siftGuid) {
	  logger.trace('[opGetAllKeys]: ', params, siftGuid);
	  if (!params.bucket) {
	    return Promise.reject('[opGetAllKeys]: params.bucket undefined');
	  }
	  if (EMAIL_BUCKETS.indexOf(params.bucket) !== -1) {
	    return _getAll(dbs.msg, { bucket: params.bucket, index: 'sift.guid', range: siftGuid }, false)
	      .then(function (result) { return result.map(function (r) { return r.key.split('/')[1]; }); });
	  }
	  return _getAll(dbs.db, params, false);
	}
	
	// Get Index
	function opGetIndex(dbs, params, siftGuid) {
	  logger.trace('[opGetIndex]: ', params, siftGuid);
	  if (!params.bucket) {
	    return Promise.reject('[opGetIndex]:params.bucket undefined');
	  }
	  if (EMAIL_BUCKETS.indexOf(params.bucket) !== -1) {
	    return _getAll(dbs.msg, { bucket: params.bucket, index: 'sift.guid', range: siftGuid }, true).then(function (result) {
	      return result.map(function (r) {
	        return { key: r.key.split('/')[1], value: r.value };
	      });
	    });
	  }
	  if (!params.index) {
	    return Promise.reject('[opGetIndex]:params.index undefined');
	  }
	  return _getAll(dbs.db, params, true);
	}
	
	// Get Index Keys
	function opGetIndexKeys(dbs, params, siftGuid) {
	  logger.trace('[opGetIndexKeys]: ', params, siftGuid);
	  if (!params.bucket) {
	    return Promise.reject('[opGetIndexKeys]: params.bucket undefined');
	  }
	  if (EMAIL_BUCKETS.indexOf(params.bucket) !== -1) {
	    return _getAll(dbs.msg, { bucket: params.bucket, index: 'sift.guid', range: siftGuid }, false).then(function (result) {
	      return result.map(function (r) {
	        return { key: r.key.split('/')[1], value: r.value };
	      });
	    });
	  }
	  if (!params.index) {
	    return Promise.reject('[opGetIndexKeys]: params.index undefined');
	  }
	  return _getAll(dbs.db, params, false);
	}
	
	// Get With Index
	function opGetWithIndex(dbs, params, siftGuid) {
	  logger.trace('[opGetWithIndex]: ', params, siftGuid);
	  if (!params.bucket) {
	    return Promise.reject('[opGetWithIndex]:params.bucket undefined');
	  }
	  if (!params.keys) {
	    return Promise.reject('[opGetWithIndex]:params.keys undefined');
	  }
	  if (EMAIL_BUCKETS.indexOf(params.bucket) !== -1) {
	    var keys = params.keys.map(function (k) {
	      return siftGuid + '/' + k;
	    });
	    return _getWithIndexRange(dbs.msg, { bucket: params.bucket, keys: keys, index: 'sift.guid', range: siftGuid }).then(function (result) {
	      return result.map(function (r) {
	        return { key: r.key.split('/')[1], value: r.value };
	      });
	    });
	  }
	  if (!params.index) {
	    return Promise.reject('[opGetWithIndex]:params.index undefined');
	  }
	  if (!params.range) {
	    return Promise.reject('[opGetWithIndex]:params.range undefined');
	  }
	  return _getWithIndexRange(dbs.db, params);
	}
	
	// Put
	function opPut(dbs, params, raw, siftGuid) {
	  logger.trace('[opPut]: ', params, raw, siftGuid);
	  var db = dbs.db;
	  if (!params.bucket) {
	    return Promise.reject('[opPut]: params.bucket undefined');
	  }
	  if (!params.kvs || params.kvs.length === 0) {
	    logger.warn('[opPut]: params.kvs undefined');
	    return Promise.resolve();
	  }
	  var kvs = params.kvs;
	  if (!raw) {
	    // Wrap value into a {value: object}
	    kvs = kvs.map(function (kv) {
	      return { key: kv.key, value: { value: kv.value } };
	    });
	  }
	  if (EMAIL_BUCKETS.indexOf(params.bucket) !== -1) {
	    db = dbs.msg;
	    var kvs = kvs.map(function (kv) {
	      return { key: siftGuid + '/' + kv.key, value: kv.value };
	    });
	  }
	  return _batchPut(db, { bucket: params.bucket, kvs: kvs }, raw);
	}
	
	/*****************************************************************
	 * Internal functions
	 *****************************************************************/
	
	// define db schema
	function _getTreoSchema(stores, sift) {
	  logger.trace('[_getTreoSchema]: ', stores, sift);
	  var schema = treo.schema().version(1);
	  stores.forEach(function (os) {
	    if (!(sift && (EMAIL_BUCKETS.indexOf(os.name) !== -1))) {
	      if (os.keypath) {
	        schema = schema.addStore(os.name, { key: os.keypath });
	      }
	      else {
	        schema = schema.addStore(os.name);
	      }
	      if (os.indexes) {
	        os.indexes.forEach(function (idx) {
	          schema = schema.addIndex(idx, idx, { unique: false });
	        });
	      }
	    }
	  });
	  return schema;
	}
	
	// versioned db schema
	function _getVersionedTreoSchema(versions, sift) {
	  logger.trace('[_getVersionedTreoSchema]: ', versions, sift);
	  var schema = treo.schema();
	  versions.forEach(function (stores, i) {
	    schema = schema.version(i + 1);
	    stores.forEach(function (os) {
	      if (!(sift && (EMAIL_BUCKETS.indexOf(os.name) !== -1))) {
	        if (os.drop) {
	          logger.trace('[_getVersionedTreoSchema]: dropping store: ', os.name);
	          schema = schema.dropStore(os.name);
	        }
	        else if (os.keypath) {
	          schema = schema.addStore(os.name, { key: os.keypath });
	        }
	        else {
	          schema = schema.addStore(os.name);
	        }
	        if (os.indexes) {
	          os.indexes.forEach(function (idx) {
	            if (os.drop) {
	              logger.trace('[_getVersionedTreoSchema]: dropping store/index: ' + os.name + '/' + idx);
	              schema = schema.dropIndex(idx);
	            }
	            else {
	              schema = schema.addIndex(idx, idx, { unique: false });
	            }
	          });
	        }
	      }
	    });
	  });
	  return schema;
	}
	
	// Batch deletion supports numeric keys
	function _batchDelete(db, params) {
	  logger.trace('[_batchDelete]: ', params);
	  return new Promise(function (resolve, reject) {
	    db.transaction('readwrite', [params.bucket], function (err, tr) {
	      if (err) { return reject(err); }
	      var store = tr.objectStore(params.bucket);
	      var current = 0;
	      var next = function () {
	        if (current >= params.keys.length) { return; }
	        var currentKey = params.keys[current];
	        var req;
	        req = store.delete(currentKey);
	        req.onerror = reject;
	        req.onsuccess = next;
	        current += 1;
	      };
	      tr.onerror = tr.onabort = reject;
	      tr.oncomplete = function () { resolve(); };
	      next();
	    });
	  });
	}
	
	function _batchPut(db, params) {
	  logger.trace('[_batchPut]: ', params);
	  return new Promise(function (resolve, reject) {
	    var count = params.kvs.length;
	    db.transaction('readwrite', [params.bucket], function (err, tr) {
	      if (err) { return reject(err); }
	      var store = tr.objectStore(params.bucket);
	      var current = 0;
	      var next = function () {
	        if (current >= count) { return; }
	        logger.trace('[_batchPut: put: ', params.kvs[current]);
	        var req;
	        req = store.put(params.kvs[current].value, params.kvs[current].key);
	        req.onerror = reject;
	        req.onsuccess = next;
	        current += 1;
	      };
	      tr.onerror = tr.onabort = reject;
	      tr.oncomplete = function () { resolve(); };
	      next();
	    });
	  });
	}
	
	function _getWithIndexRange(db, params) {
	  logger.trace('[_getWithIndexRange]: ', params);
	  return new Promise(function (resolve, reject) {
	    var store = db.store(params.bucket);
	    var result = [];
	    var found = 0;
	    var iterator = function (cursor) {
	      var ki = params.keys.indexOf(cursor.primaryKey);
	      if (ki !== -1) {
	        logger.trace('[found key: ', cursor.primaryKey);
	        result[ki].value = cursor.value.value;
	        found++;
	      }
	      if (found === params.keys.length) {
	        return done();
	      }
	      cursor.continue();
	    };
	    var done = function (err) {
	      logger.trace('[_getWithIndexRange: result: ', result);
	      err ? reject(err) : resolve(result);
	    };
	    params.keys.forEach(function (k) {
	      result.push({ key: k, value: undefined });
	    });
	    store.cursor({ index: params.index, range: params.range, iterator: iterator }, done);
	  });
	}
	
	function _findIn(db, params) {
	  logger.trace('[_findIn]: ', params);
	  return new Promise(function (resolve, reject) {
	    var store = db.store(params.bucket);
	    var result = [];
	    var current = 0;
	    var iterator = function (cursor) {
	      logger.trace('[_findIn]: iterator: ', cursor);
	      if (cursor.key > sKeys[current]) {
	        logger.trace('[_findIn]: cursor ahead: ', cursor.key, sKeys[current]);
	        while (cursor.key > sKeys[current] && current < sKeys.length) {
	          current += 1;
	          logger.trace('[_findIn]: moving to next key: ', cursor.key, sKeys[current]);
	        }
	        if (current > sKeys.length) {
	          logger.trace('[_findIn]: exhausted keys. done.');
	          return done();
	        }
	      }
	      if (cursor.key === sKeys[current]) {
	        logger.trace('[_findIn]: found key: ', cursor.key, cursor.value);
	        result[params.keys.indexOf(sKeys[current])] = { key: cursor.key, value: cursor.value.value };
	        current += 1;
	        (current < sKeys.length) ? cursor.continue(sKeys[current]) : done();
	      }
	      else {
	        logger.trace('[_findIn]: continuing to next key: ', sKeys[current]);
	        cursor.continue(sKeys[current]); // go to next key
	      }
	    };
	    var done = function (err) {
	      logger.trace('[findIn]: result: ', result);
	      err ? reject(err) : resolve(result);
	    };
	    var sKeys = params.keys.slice();
	    sKeys = sKeys.sort(treo.cmp);
	    logger.trace('[findIn: sorted keys: ', sKeys);
	    params.keys.forEach(function (k) {
	      result.push({ key: k, value: undefined });
	    });
	    store.cursor({ iterator: iterator }, done);
	  });
	}
	
	function _getAll(db, params, loadValue) {
	  logger.trace('[_getAll]: ', params, loadValue);
	  return new Promise(function (resolve, reject) {
	    var result = [];
	    var keys = [];
	    var store = db.store(params.bucket);
	    var iterator = function (cursor) {
	      var kv = { key: cursor.primaryKey };
	      logger.trace('[_getAll]: cursor', cursor);
	      if (loadValue) {
	        kv.value = cursor.value.value;
	      }
	      if (params.index) {
	        kv.index = cursor.key;
	      }
	      result.push(kv);
	      keys.push(cursor.primaryKey);
	      cursor.continue();
	    };
	    var opts = { iterator: iterator };
	    if (params.index) {
	      opts.index = params.index;
	    }
	    if (params.range) {
	      opts.range = params.range;
	    }
	    store.cursor(opts, function (err) {
	      if (err) {
	        reject(err);
	      }
	      else {
	        if (!params.index && !params.range && !loadValue) {
	          logger.trace('[_getAll]: resolving: ', keys);
	          resolve(keys);
	        }
	        else {
	          logger.trace('[_getAll]: resolving: ', result);
	          resolve(result);
	        }
	      }
	    });
	  });
	}
	
	/**
	 * Redsift SDK. Sift Storage module.
	 * Based on APIs from https://github.com/CrowdProcess/riak-pb
	 *
	 * Copyright (c) 2016 Redsift Limited. All rights reserved.
	 */
	var _siftGuid = new WeakMap();
	var _dbs = new WeakMap();
	
	var Storage = function Storage(dbInfo, ll) {
	  this._logger = loglevel$1.getLogger('RSStorage');
	  this._logger.setLevel(ll || 'warn');
	  if (!dbInfo.accountGuid) {
	    throw new Error('[Storage]: dbInfo.accountGuid undefined');
	  }
	  _siftGuid.set(this, dbInfo.siftGuid);
	  _dbs.set(this, opCreateDb(dbInfo));
	};
	
	/*****************************************************************
	 * External Operations
	 *****************************************************************/
	Storage.prototype.get = function get (params) {
	  this._logger.trace('[Storage::get]: ', params);
	  return opGet(_dbs.get(this), params, _siftGuid.get(this));
	};
	
	Storage.prototype.getAll = function getAll (params) {
	  this._logger.trace('[Storage::getAll]: ', params);
	  return opGetAll(_dbs.get(this), params, _siftGuid.get(this));
	};
	
	Storage.prototype.getAllKeys = function getAllKeys (params) {
	  this._logger.trace('[Storage::getAllKeys]: ', params);
	  return opGetAllKeys(_dbs.get(this), params, _siftGuid.get(this))
	};
	
	Storage.prototype.getIndex = function getIndex (params) {
	  this._logger.trace('[Storage::getIndex]: ', params);
	  return opGetIndex(_dbs.get(this), params, _siftGuid.get(this));
	};
	
	Storage.prototype.getIndexKeys = function getIndexKeys (params) {
	  this._logger.trace('[Storage::getIndexKeys]: ', params);
	  return opGetIndexKeys(_dbs.get(this), params, _siftGuid.get(this));
	};
	
	Storage.prototype.getWithIndex = function getWithIndex (params) {
	  this._logger.trace('[Storage::getWithIndex]: ', params);
	  return opGetWithIndex(_dbs.get(this), params, _siftGuid.get(this));
	};
	
	///////////////////////////////////////////////////////////////////////////////////////////////
	// Sift-only operations
	///////////////////////////////////////////////////////////////////////////////////////////////
	Storage.prototype.delUser = function delUser (params) {
	  params.bucket = '_user.default';
	  this._logger.trace('[Storage::delUser]: ', params);
	  return opDel(_dbs.get(this), params, _siftGuid.get(this));
	};
	
	Storage.prototype.getUser = function getUser (params) {
	  params.bucket = '_user.default';
	  this._logger.trace('[Storage::getUser]: ', params);
	  return opGet(_dbs.get(this), params, _siftGuid.get(this));
	};
	
	Storage.prototype.putUser = function putUser (params) {
	  params.bucket = '_user.default';
	  this._logger.trace('[Storage::putUser]: ', params);
	  if (!params.kvs || params.kvs.length === 0) {
	    return Promise.reject('[Storage::putUser]: params.kvs undefined');
	  }
	  return opPut(_dbs.get(this), params, false, _siftGuid.get(this));
	};
	
	var SiftController = function SiftController() {
	  this._proxy = self;
	  this.view = new Observable();
	  this.emailclient = new EmailClient(self);
	  this._registerMessageListeners();
	};
	
	SiftController.prototype.publish = function publish (topic, value) {
	  this._proxy.postMessage({
	    method: 'notifyView',
	    params: {
	      topic: topic,
	      value: value
	    }
	  });
	};
	
	SiftController.prototype._registerMessageListeners = function _registerMessageListeners () {
	    var this$1 = this;
	
	  if (!this._proxy) return;
	  this._proxy.onmessage = function (e) {
	    // console.log('[SiftController::onmessage]: ', e.data);
	    var method = e.data.method;
	    if (this$1['_' + method]) {
	      this$1['_' + method](e.data.params);
	    }
	    else {
	      // console.log('[SiftController:onmessage]: method not implemented: ', method);
	    }
	  };
	};
	
	SiftController.prototype._init = function _init (params) {
	  // console.log('[SiftController::_init]: ', params);
	  this.storage = new SiftStorage();
	  this.storage.init(
	    new Storage({
	      type: 'SIFT',
	      siftGuid: params.siftGuid,
	      accountGuid: params.accountGuid,
	      schema: params.dbSchema
	    })
	  );
	  // Initialise sift details
	  this._guid = params.siftGuid;
	  this._account = params.accountGuid;
	  // Init is done, post a message to the iframe_controller
	  this._proxy.postMessage({
	    method: 'initCallback',
	    result: params
	  });
	};
	
	SiftController.prototype._terminate = function _terminate () {
	  if (!this._proxy) return;
	  // console.log('[SiftController::_terminate]');
	  this._proxy.close();
	};
	
	SiftController.prototype._postCallback = function _postCallback (params, _result) {
	  this._proxy.postMessage({
	    method: 'loadViewCallback',
	    params: {
	      user: { guid: this._account },
	      sift: { guid: this._guid },
	      type: params.type,
	      sizeClass: params.sizeClass,
	      result: _result
	    }
	  });
	};
	
	SiftController.prototype._loadView = function _loadView (params) {
	    var this$1 = this;
	
	  // console.log('[SiftController::_loadView]: ', params);
	  if (!this.loadView) {
	    console.error('[SiftController::_loadView]: Sift controller must implement the loadView method');
	    return;
	  }
	  // Invoke loadView method
	  var result = this.loadView({
	    sizeClass: params.sizeClass,
	    type: params.type,
	    params: params.data
	  });
	  // console.log('[SiftController::_loadView] loadView result: ', result);
	  if (result.data && 'function' === typeof result.data.then) {
	    if (result.html) {
	      this._postCallback(params, { html: result.html });
	    }
	    result.data.then(function (data) {
	      this$1._postCallback(params, { html: result.html, data: data });
	    }).catch(function (error) {
	      console.error('[SiftController::loadView]: promise rejected: ', error);
	    });
	  }
	  else {
	    this._postCallback(params, result);
	  }
	};
	
	SiftController.prototype._storageUpdated = function _storageUpdated (params) {
	    var this$1 = this;
	
	  // console.log('[SiftController::_storageUpdated]: ', params);
	  // Notify the * listeners
	  this.storage.publish('*', params);
	  params.forEach(function (b) {
	    // Notify the bucket listeners.
	    // TODO: send the list of keys instead of "[b]"
	    this$1.storage.publish(b, [b]);
	  });
	};
	
	SiftController.prototype._notifyController = function _notifyController (params) {
	  // console.log('[SiftController::_notifyController]: ', params);
	  this.view.publish(params.topic, params.value);
	};
	
	SiftController.prototype._emailComposer = function _emailComposer (params) {
	  // console.log('[SiftController::_emailComposer]: ', params);
	  this.emailclient.publish(params.topic, params.value);
	};
	
	/**
	 * SiftView
	 */
	function registerSiftView(siftView) {
	  console.log('[Redsift::registerSiftView]: registered');
	}
	
	function createSiftView(instanceMethods) {
	  return _create(SiftView, instanceMethods);
	}
	
	/**
	 * SiftController
	 */
	function createSiftController(instanceMethods) {
	  return _create(SiftController, instanceMethods);
	}
	
	function registerSiftController(siftController) {
	  console.log('[Redsift::registerSiftController]: registered');
	}
	
	/**
	 * EmailClientController
	 */
	function createEmailClientController(instanceMethods) {
	  return _create(EmailClientController, instanceMethods);
	}
	
	function registerEmailClientController(emailClientController) {
	  console.log('[Redsift::registerEmailClientController]: registered');
	}
	
	/**
	 * Local functions
	 */
	function _create(Base, methods) {
	  var Creature = function() {
	    Base.call(this);
	    if(this.init && typeof this.init === 'function') {
	      this.init();
	    }
	  };
	  Creature.prototype = Object.create(Base.prototype);
	  Creature.constructor = Creature;
	  Object.keys(methods).forEach(function (method) {
	    Creature.prototype[method] = methods[method];
	  });
	  return new Creature();
	}
	
	exports.EmailClientController = EmailClientController;
	exports.SiftController = SiftController;
	exports.SiftStorage = SiftStorage;
	exports.SiftView = SiftView;
	exports.registerSiftView = registerSiftView;
	exports.createSiftView = createSiftView;
	exports.createSiftController = createSiftController;
	exports.registerSiftController = registerSiftController;
	exports.createEmailClientController = createEmailClientController;
	exports.registerEmailClientController = registerEmailClientController;
	
	Object.defineProperty(exports, '__esModule', { value: true });
	
	})));
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1), (function() { return this; }())))

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	!function(e,a){ true?a(exports,__webpack_require__(10),__webpack_require__(11)):"function"==typeof define&&define.amd?define(["exports","d3-selection","d3-shape"],a):a(e.d3_rs_pies=e.d3_rs_pies||{},e.d3,e.d3)}(this,function(e,a,t){"use strict";function n(e,a){if((t=(e=a?e.toExponential(a-1):e.toExponential()).indexOf("e"))<0)return null;var t,n=e.slice(0,t);return[n.length>1?n[0]+n.slice(2):n,+e.slice(t+1)]}function r(e){return e=n(Math.abs(e)),e?e[1]:NaN}function i(e,a){return function(t,n){for(var r=t.length,i=[],o=0,s=e[0],u=0;r>0&&s>0&&(u+s+1>n&&(s=Math.max(1,n-u)),i.push(t.substring(r-=s,r+s)),!((u+=s+1)>n));)s=e[o=(o+1)%e.length];return i.reverse().join(a)}}function o(e,a){e=e.toPrecision(a);e:for(var t,n=e.length,r=1,i=-1;r<n;++r)switch(e[r]){case".":i=t=r;break;case"0":0===i&&(i=r),t=r;break;case"e":break e;default:i>0&&(i=0)}return i>0?e.slice(0,i)+e.slice(t+1):e}function s(e,a){var t=n(e,a);if(!t)return e+"";var r=t[0],i=t[1],o=i-(j=3*Math.max(-8,Math.min(8,Math.floor(i/3))))+1,s=r.length;return o===s?r:o>s?r+new Array(o-s+1).join("0"):o>0?r.slice(0,o)+"."+r.slice(o):"0."+new Array(1-o).join("0")+n(e,Math.max(0,a+o-1))[0]}function u(e,a){var t=n(e,a);if(!t)return e+"";var r=t[0],i=t[1];return i<0?"0."+new Array((-i)).join("0")+r:r.length>i+1?r.slice(0,i+1)+"."+r.slice(i+1):r+new Array(i-r.length+2).join("0")}function m(e){return new d(e)}function d(e){if(!(a=w.exec(e)))throw new Error("invalid format: "+e);var a,t=a[1]||" ",n=a[2]||">",r=a[3]||"-",i=a[4]||"",o=!!a[5],s=a[6]&&+a[6],u=!!a[7],m=a[8]&&+a[8].slice(1),d=a[9]||"";"n"===d?(u=!0,d="g"):z[d]||(d=""),(o||"0"===t&&"="===n)&&(o=!0,t="0",n="="),this.fill=t,this.align=n,this.sign=r,this.symbol=i,this.zero=o,this.width=s,this.comma=u,this.precision=m,this.type=d}function l(e){return e}function c(e){function a(e){function a(e){var a,o,u,m=g,b=v;if("c"===f)b=p(e)+b,e="";else{e=+e;var N=(e<0||1/e<0)&&(e*=-1,!0);if(e=p(e,h),N)for(a=-1,o=e.length,N=!1;++a<o;)if(u=e.charCodeAt(a),48<u&&u<58||"x"===f&&96<u&&u<103||"X"===f&&64<u&&u<71){N=!0;break}if(m=(N?"("===i?i:"-":"-"===i||"("===i?"":i)+m,b=b+("s"===f?O[8+j/3]:"")+(N&&"("===i?")":""),y)for(a=-1,o=e.length;++a<o;)if(u=e.charCodeAt(a),48>u||u>57){b=(46===u?s+e.slice(a+1):e.slice(a))+b,e=e.slice(0,a);break}}c&&!d&&(e=n(e,1/0));var M=m.length+e.length+b.length,S=M<l?new Array(l-M+1).join(t):"";switch(c&&d&&(e=n(S+e,S.length?l-b.length:1/0),S=""),r){case"<":return m+e+b+S;case"=":return m+S+e+b;case"^":return S.slice(0,M=S.length>>1)+m+e+b+S.slice(M)}return S+m+e+b}e=m(e);var t=e.fill,r=e.align,i=e.sign,u=e.symbol,d=e.zero,l=e.width,c=e.comma,h=e.precision,f=e.type,g="$"===u?o[0]:"#"===u&&/[boxX]/.test(f)?"0"+f.toLowerCase():"",v="$"===u?o[1]:/[%p]/.test(f)?"%":"",p=z[f],y=!f||/[defgprs%]/.test(f);return h=null==h?f?6:12:/[gprs]/.test(f)?Math.max(1,Math.min(21,h)):Math.max(0,Math.min(20,h)),a.toString=function(){return e+""},a}function t(e,t){var n=a((e=m(e),e.type="f",e)),i=3*Math.max(-8,Math.min(8,Math.floor(r(t)/3))),o=Math.pow(10,-i),s=O[8+i/3];return function(e){return n(o*e)+s}}var n=e.grouping&&e.thousands?i(e.grouping,e.thousands):l,o=e.currency,s=e.decimal;return{format:a,formatPrefix:t}}function h(e){return x=c(e),T=x.format,D=x.formatPrefix,x}function f(e){function t(){h=i-d-u}function n(){f=o-s-m}function r(t){var n=t.selection?t.selection():t,u=void 0!==t.selection;n.each(function(){var n=a.select(this),m=n.select(r.self());m.empty()&&(m=n.append("svg").attr("version","1.1").attr("xmlns","http://www.w3.org/2000/svg").attr("xmlns:xlink","http://www.w3.org/1999/xlink").attr("preserveAspectRatio","xMidYMid meet").attr("id",e),m.append("defs"),m.append("g").attr("class","svg-child"));var c=m.select("defs"),h=c.selectAll("style").data(g?[g]:[]);h.exit().remove(),h=h.enter().append("style").attr("type","text/css").merge(h),h.text(g);var f=m.select(r.child());m.attr("class",v),u===!0&&(m=m.transition(t),f=f.transition(t)),m.attr("width",i*l).attr("height",o*l).attr("viewBox","0 0 "+i+" "+o),f.attr("transform","translate("+d+","+s+")")})}var i=300,o=150,s=16,u=16,m=16,d=16,l=1,c="g.svg-child",h=-1,f=-1,g=null,v="svg-svg";return t(),n(),r.self=function(){return"svg"+(e?"#"+e:"")},r.child=function(){return c},r.childDefs=function(){return"defs"},r.childWidth=function(){return h},r.childHeight=function(){return f},r.id=function(){return e},r.classed=function(e){return arguments.length?(v=e,r):v},r.style=function(e){return arguments.length?(g=e,r):g},r.width=function(e){return arguments.length?(i=e,t(),r):i},r.height=function(e){return arguments.length?(o=e,n(),r):i},r.scale=function(e){return arguments.length?(l=e,r):l},r.margin=function(e){return arguments.length?(void 0!==e.top?(s=e.top,u=e.right,m=e.bottom,d=e.left):(s=e,u=e,m=e,d=e),t(),n(),r):{top:s,right:u,bottom:m,left:d}},r}function g(e){var a={};return Object.keys(e).forEach(function(t){var n=t.split("_");n[0]===n[1].toLowerCase()&&(a[n[0]]=e[t]),a[t]=e[t]}),Object.keys(C).forEach(function(t){a[t]=e[C[t]]}),a}function v(e){var a=e;return null==a?"undefined"!=typeof navigator?(a=navigator.languages,null==a&&(a=[navigator.userLanguage||navigator.language])):a=["en"]:Array.isArray(a)||(a=[a]),a.map(function(e){return e.replace("-","_")})}function p(e){for(var a=v(e),t=0;t<a.length;++t){var n=a[t],r=jo[n];if(r)return{d3:r,iso639:n.replace("_","-")}}return{d3:ko.en_US,iso639:"en-US"}}function y(e){function t(){var t=a.select(document.createElement("div"));return t.attr("id",e).classed(j,!0).style("position","absolute").style("top",0).style("left",0).style("opacity",0).style("pointer-events","none").style("box-sizing","border-box"),t.node()}function n(e){if(e=e.node())return"svg"===e.tagName.toLowerCase()?e:e.ownerSVGElement}function r(){return null===A&&(A=t(),T.appendChild(A)),a.select(A)}function i(e){if(z=n(e)){w=z.createSVGPoint(),z=a.select(z),z.append("defs");var t=z.select("defs"),r=t.selectAll("style").data(D?[D]:[]);r.exit().remove(),r=r.enter().append("style").attr("type","text/css").merge(r),r.text(D)}}function o(){var e=f();return{top:e.n.y-A.offsetHeight,left:e.n.x-A.offsetWidth/2}}function s(){var e=f();return{top:e.s.y,left:e.s.x-A.offsetWidth/2}}function u(){var e=f();return{top:e.e.y-A.offsetHeight/2,left:e.e.x}}function m(){var e=f();return{top:e.w.y-A.offsetHeight/2,left:e.w.x-A.offsetWidth}}function d(){var e=f();return{top:e.nw.y-A.offsetHeight,left:e.nw.x-A.offsetWidth}}function l(){var e=f();return{top:e.ne.y-A.offsetHeight,left:e.ne.x}}function c(){var e=f();return{top:e.sw.y,left:e.sw.x-A.offsetWidth}}function h(){var e=f();return{top:e.se.y,left:e.se.x}}function f(){for(var e=x||a.event.target;"undefined"==typeof e.getScreenCTM&&"undefined"===e.parentNode;)e=e.parentNode;var t={},n=e.getScreenCTM(),r=e.getBBox(),i=r.width,o=r.height,s=r.x,u=r.y;return w.x=s,w.y=u,t.nw=w.matrixTransform(n),w.x+=i,t.ne=w.matrixTransform(n),w.y+=o,t.se=w.matrixTransform(n),w.x-=i,t.sw=w.matrixTransform(n),w.y-=o/2,t.w=w.matrixTransform(n),w.x+=i,t.e=w.matrixTransform(n),w.x-=i/2,w.y-=o/2,t.n=w.matrixTransform(n),w.y+=o,t.s=w.matrixTransform(n),t}var g=function(e){return"function"==typeof e?e:function(){return e}},v=function(){return"n"},p=function(){return[0,0]},y=function(){return" "},b=function(e){return e instanceof Node},N=[".d3-tip {line-height: 1;font-family: 'Source Code Pro'; font-weight: bold;font-size: 0.66em;padding: 8px;background: rgba(0, 0, 0, 0.66);color: #fff;border-radius: 2px;pointer-events: none;}","/* Creates a small triangle extender for the tooltip */",".d3-tip:after {box-sizing: border-box;display: inline;font-size: 0.66em;width: 100%;line-height: 1;color: rgba(0, 0, 0, 0.66);position: absolute;pointer-events: none;}","/* Northward tooltips */",'.d3-tip.n:after {content: "\\25bc";margin: -1px 0 0 0;top: 100%;left: 0;text-align: center;}',"/* Eastward tooltips */",'.d3-tip.e:after {content: "\\25C0";margin: -4px 0 0 0;top: 50%;left: -8px;}',"/* Southward tooltips */",'.d3-tip.s:after {content: "\\25B2";margin: 0 0 1px 0;top: -7px;left: 0;text-align: center;}',"/* Westward tooltips */",'.d3-tip.w:after {content: "\\25B6";margin: -4px 0 0 -1px;top: 50%;left: 100%;}'].join("\n"),M=v,S=p,k=y,j="d3-tip",A=t(),z=null,w=null,x=null,T=null,D=N;i.self=function(){return"g"+(e?"#"+e:"."+j)},i.id=function(){return e},i.classed=function(e){return arguments.length?(j=e,i):j},i.show=function(){T||i.parent(document.body);var e=[].slice.call(arguments);x=this,1===e.length&&b(e[0])&&(x=e[0],e[0]=x.__data__);var a,t=k.apply(x,e),n=S.apply(x,e),o=M.apply(x,e),s=r(),u=_.length,m=A.offsetParent.getBoundingClientRect();for(s.html(t).style("opacity",1).style("pointer-events","all");u--;)s.classed(_[u],!1);return a=O[o].apply(x),s.classed(o,!0).style("top",a.top+n[0]-m.top+"px").style("left",a.left+n[1]-m.left+"px"),i},i.hide=function(){var e=r();return e.style("opacity",0).style("pointer-events","none"),i},i.attr=function(e){if(arguments.length<2&&"string"==typeof e)return r().attr(e);var t=[].slice.call(arguments);return a.selection.prototype.attr.apply(r(),t),i},i.direction=function(e){return arguments.length?(M=null==e?e:g(e),i):M},i.offset=function(e){return arguments.length?(S=null==e?e:g(e),i):S},i.html=function(e){return arguments.length?(k=null==e?e:g(e),i):k},i.destroy=function(){return A&&(r().remove(),A=null),i},i.style=function(e){return arguments.length?(D=e,i):D},i.parent=function(e){if(!arguments.length)return T;T=e||document.body,T.appendChild(A);var t=a.select(A.offsetParent);return"static"===t.style("position")&&t.style("position","relative"),i};var O={n:o,s:s,e:u,w:m,nw:d,ne:l,sw:c,se:h},_=Object.keys(O);return i}function b(e){var a=e[0]/255,t=e[1]/255,n=e[2]/255;a=a>.04045?Math.pow((a+.055)/1.055,2.4):a/12.92,t=t>.04045?Math.pow((t+.055)/1.055,2.4):t/12.92,n=n>.04045?Math.pow((n+.055)/1.055,2.4):n/12.92;var r=.4124*a+.3576*t+.1805*n,i=.2126*a+.7152*t+.0722*n,o=.0193*a+.1192*t+.9505*n;return[100*r,100*i,100*o]}function N(e){var a,t,n,r=b(e),i=r[0],o=r[1],s=r[2];return i/=95.047,o/=100,s/=108.883,i=i>.008856?Math.pow(i,1/3):7.787*i+16/116,o=o>.008856?Math.pow(o,1/3):7.787*o+16/116,s=s>.008856?Math.pow(s,1/3):7.787*s+16/116,a=116*o-16,t=500*(i-o),n=200*(o-s),[a,t,n]}function M(e){var a=/^#?([a-f\d])([a-f\d])([a-f\d])$/i;e=e.replace(a,function(e,a,t,n){return a+a+t+t+n+n});var t=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(e);return t?[parseInt(t[1],16),parseInt(t[2],16),parseInt(t[3],16)]:[0,0,0]}function S(e,a){return a={exports:{}},e(a,a.exports),a.exports}function k(e){function n(e){return null==e?[]:Array.isArray(e)?e:[e]}function r(){var e=function(){return S};if(null==S){var a=Oo.standard;e=function(e,t){return a[t%a.length]}}else"function"==typeof S?e=S:Array.isArray(S)&&(e=function(e,a){return S[a%S.length]});return e}function i(n){var s=n.selection?n.selection():n,u=void 0!==n.selection;h(p(b).d3);var N=T(Eo),S=T(Io),C=T(Go),F=k;if(null==F)if(null!=j){var P=T(j);F=function(e){return P(e)}}else F=function(e){return 0===e?N(e):e>9999||e<=.001?S(e):e<1?C(e):N(e)};s.each(function(){var s=a.select(this),h=d||Math.round(m*Fo),p=null;e&&(p="svg-"+e);var b=f(p).width(m).height(h).margin(l).scale(g),N=s;u===!0&&(N=s.transition(n)),N.call(b);var S=s.select(b.self()),k=S.select("defs"),j=S.select(b.child()),T=null;e&&(T="tip-"+e);var C=y(T).html(function(e){return e}),P=c+" "+C.style();C.style(P),j.call(C);var J=j.select(i.self());J.empty()&&(J=j.append("g").attr("class",o).attr("id",e),J.append("g").attr("class","legend"),J.append("g").attr("class","pie"),k.append("path").attr("id","text-outer"),k.append("path").attr("id","text-inner"));var H=J.datum()||[1],Y=H.map(function(e,a){return _(e,a)});J.datum(Y);var B=b.childWidth(),L=b.childHeight();if(M.length>0){L-=Ho+Bo;var K=J.select("g.legend"),E=K.attr("transform","translate("+B/2+","+(L+Bo)+")").selectAll("g").data(M);E.exit().remove();var I=E.enter().append("g"),G=r();I.append("rect").attr("width",Ho).attr("height",Ho).attr("fill",G),I.append("text").attr("dominant-baseline","central").attr("y",Ho/2).attr("x",function(){return Ho+Yo}),E=I.merge(E),E.selectAll("text").text(function(e){return e});var X=M.map(function(e){return e.length*Lo+Ho+2*Yo}),R=[],W=X.reduce(function(e,a){return R.push(e),e+a},0),U=-W/2;K.selectAll("g").data(R).attr("transform",function(e){return"translate("+(U+e)+",0)"})}var V=r(),$=z;null==$&&($=(Math.min(B,L)-2*v)/2);var q=A;q<0&&(q=(1+q)*$);var Q=t.arc().innerRadius(q).outerRadius($).cornerRadius(null!==O?O:D>0?Ko:0),Z=t.pie().sortValues(null).sort(null).padAngle(D).startAngle(w).endAngle(x),ee=B/2,ae=J.select("g.pie").attr("transform","translate("+ee+","+($+v)+")").selectAll("g.slice").data(Z(Y));ae.exit().remove();var te=ae.enter().append("g").attr("class","slice");te.append("path"),te.append("text").attr("text-anchor","middle").attr("dominant-baseline","middle"),ae=te.merge(ae);var ne=ae.selectAll("path").data(function(e){return[e]});ne.attr("d",Q).attr("fill",function(e){return V(e.data,e.index)});var re=ae.selectAll("text").data(function(e){return[e]});re.attr("transform",function(e){return e.innerRadius=q,e.outerRadius=z,"translate("+Q.centroid(e)+")"}).attr("fill",function(e){return zo.white(V(e.data,e.index))?_o.text.white:_o.text.black}).text(function(e){var a=H[e.index].l||F(e.value);return e.endAngle-e.startAngle<.1?null:a})})}var o="chart-pies",s="light",u=null,m=Co,d=null,l=Po,c=Xo,g=1,v=Jo,b=null,N=-1,M=[],S=null,k=null,j=null,A=0,z=null,w=0,x=2*Math.PI,D=0,O=null,_=function(e){return Array.isArray(e)?e:"object"==typeof e?e.v:e};return i.self=function(){return"g"+(e?"#"+e:"."+o)},i.id=function(){return e},i.classed=function(e){return arguments.length?(o=e,i):o},i.background=function(e){return arguments.length?(u=e,i):u},i.theme=function(e){return arguments.length?(s=e,i):s},i.size=function(e){return arguments.length?(m=e,d=null,i):m},i.width=function(e){return arguments.length?(m=e,i):m},i.height=function(e){return arguments.length?(d=e,i):d},i.scale=function(e){return arguments.length?(g=e,i):g},i.margin=function(e){return arguments.length?(l=e,i):l},i.inset=function(e){return arguments.length?(v=e,i):v},i.style=function(e){return arguments.length?(c=e,i):c},i.value=function(e){return arguments.length?(_=e,i):_},i.language=function(e){return arguments.length?(b=e,i):b},i.legend=function(e){return arguments.length?(M=n(e),i):M},i.displayTip=function(e){return arguments.length?(N=e,i):N},i.fill=function(e){return arguments.length?(S=e,i):S},i.startAngle=function(e){return arguments.length?(w=e,i):w},i.endAngle=function(e){return arguments.length?(x=e,i):x},i.padAngle=function(e){return arguments.length?(D=e,i):D},i.cornerRadius=function(e){return arguments.length?(O=e,i):O},i.outerRadius=function(e){return arguments.length?(z=e,i):z},i.innerRadius=function(e){return arguments.length?(A=e,i):A},i.displayValue=function(e){return arguments.length?(k=e,i):k},i.displayFormatValue=function(e){return arguments.length?(j=e,i):j},i}var j,A="0.0.2",z={"":o,"%":function(e,a){return(100*e).toFixed(a)},b:function(e){return Math.round(e).toString(2)},c:function(e){return e+""},d:function(e){return Math.round(e).toString(10)},e:function(e,a){return e.toExponential(a)},f:function(e,a){return e.toFixed(a)},g:function(e,a){return e.toPrecision(a)},o:function(e){return Math.round(e).toString(8)},p:function(e,a){return u(100*e,a)},r:u,s:s,X:function(e){return Math.round(e).toString(16).toUpperCase()},x:function(e){return Math.round(e).toString(16)}},w=/^(?:(.)?([<>=^]))?([+\-\( ])?([$#])?(0)?(\d+)?(,)?(\.\d+)?([a-z%])?$/i;d.prototype.toString=function(){return this.fill+this.align+this.sign+this.symbol+(this.zero?"0":"")+(null==this.width?"":Math.max(1,0|this.width))+(this.comma?",":"")+(null==this.precision?"":"."+Math.max(0,0|this.precision))+this.type};var x,T,D,O=["y","z","a","f","p","n","µ","m","","k","M","G","T","P","E","Z","Y"];h({decimal:".",thousands:",",grouping:[3],currency:["$",""]});var _={ab:{name:"Abkhaz",nativeName:"аҧсуа"},aa:{name:"Afar",nativeName:"Afaraf"},af:{name:"Afrikaans",nativeName:"Afrikaans"},ak:{name:"Akan",nativeName:"Akan"},sq:{name:"Albanian",nativeName:"Shqip"},am:{name:"Amharic",nativeName:"አማርኛ"},ar:{name:"Arabic",nativeName:"العربية"},an:{name:"Aragonese",nativeName:"Aragonés"},hy:{name:"Armenian",nativeName:"Հայերեն"},as:{name:"Assamese",nativeName:"অসমীয়া"},av:{name:"Avaric",nativeName:"авар мацӀ, магӀарул мацӀ"},ae:{name:"Avestan",nativeName:"avesta"},ay:{name:"Aymara",nativeName:"aymar aru"},az:{name:"Azerbaijani",nativeName:"azərbaycan dili"},bm:{name:"Bambara",nativeName:"bamanankan"},ba:{name:"Bashkir",nativeName:"башҡорт теле"},eu:{name:"Basque",nativeName:"euskara, euskera"},be:{name:"Belarusian",nativeName:"Беларуская"},bn:{name:"Bengali",nativeName:"বাংলা"},bh:{name:"Bihari",nativeName:"भोजपुरी"},bi:{name:"Bislama",nativeName:"Bislama"},bs:{name:"Bosnian",nativeName:"bosanski jezik"},br:{name:"Breton",nativeName:"brezhoneg"},bg:{name:"Bulgarian",nativeName:"български език"},my:{name:"Burmese",nativeName:"ဗမာစာ"},ca:{name:"Catalan; Valencian",nativeName:"Català"},ch:{name:"Chamorro",nativeName:"Chamoru"},ce:{name:"Chechen",nativeName:"нохчийн мотт"},ny:{name:"Chichewa; Chewa; Nyanja",nativeName:"chiCheŵa, chinyanja"},zh:{name:"Chinese",nativeName:"中文 (Zhōngwén), 汉语, 漢語"},cv:{name:"Chuvash",nativeName:"чӑваш чӗлхи"},kw:{name:"Cornish",nativeName:"Kernewek"},co:{name:"Corsican",nativeName:"corsu, lingua corsa"},cr:{name:"Cree",nativeName:"ᓀᐦᐃᔭᐍᐏᐣ"},hr:{name:"Croatian",nativeName:"hrvatski"},cs:{name:"Czech",nativeName:"česky, čeština"},da:{name:"Danish",nativeName:"dansk"},dv:{name:"Divehi; Dhivehi; Maldivian;",nativeName:"ދިވެހި"},nl:{name:"Dutch",nativeName:"Nederlands, Vlaams"},en:{name:"English",nativeName:"English"},eo:{name:"Esperanto",nativeName:"Esperanto"},et:{name:"Estonian",nativeName:"eesti, eesti keel"},ee:{name:"Ewe",nativeName:"Eʋegbe"},fo:{name:"Faroese",nativeName:"føroyskt"},fj:{name:"Fijian",nativeName:"vosa Vakaviti"},fi:{name:"Finnish",nativeName:"suomi, suomen kieli"},fr:{name:"French",nativeName:"français, langue française"},ff:{name:"Fula; Fulah; Pulaar; Pular",nativeName:"Fulfulde, Pulaar, Pular"},gl:{name:"Galician",nativeName:"Galego"},ka:{name:"Georgian",nativeName:"ქართული"},de:{name:"German",nativeName:"Deutsch"},el:{name:"Greek, Modern",nativeName:"Ελληνικά"},gn:{name:"Guaraní",nativeName:"Avañeẽ"},gu:{name:"Gujarati",nativeName:"ગુજરાતી"},ht:{name:"Haitian; Haitian Creole",nativeName:"Kreyòl ayisyen"},ha:{name:"Hausa",nativeName:"Hausa, هَوُسَ"},he:{name:"Hebrew (modern)",nativeName:"עברית"},hz:{name:"Herero",nativeName:"Otjiherero"},hi:{name:"Hindi",nativeName:"हिन्दी, हिंदी"},ho:{name:"Hiri Motu",nativeName:"Hiri Motu"},hu:{name:"Hungarian",nativeName:"Magyar"},ia:{name:"Interlingua",nativeName:"Interlingua"},id:{name:"Indonesian",nativeName:"Bahasa Indonesia"},ie:{name:"Interlingue",nativeName:"Originally called Occidental; then Interlingue after WWII"},ga:{name:"Irish",nativeName:"Gaeilge"},ig:{name:"Igbo",nativeName:"Asụsụ Igbo"},ik:{name:"Inupiaq",nativeName:"Iñupiaq, Iñupiatun"},io:{name:"Ido",nativeName:"Ido"},is:{name:"Icelandic",nativeName:"Íslenska"},it:{name:"Italian",nativeName:"Italiano"},iu:{name:"Inuktitut",nativeName:"ᐃᓄᒃᑎᑐᑦ"},ja:{name:"Japanese",nativeName:"日本語 (にほんご／にっぽんご)"},jv:{name:"Javanese",nativeName:"basa Jawa"},kl:{name:"Kalaallisut, Greenlandic",nativeName:"kalaallisut, kalaallit oqaasii"},kn:{name:"Kannada",nativeName:"ಕನ್ನಡ"},kr:{name:"Kanuri",nativeName:"Kanuri"},ks:{name:"Kashmiri",nativeName:"कश्मीरी, كشميري‎"},kk:{name:"Kazakh",nativeName:"Қазақ тілі"},km:{name:"Khmer",nativeName:"ភាសាខ្មែរ"},ki:{name:"Kikuyu, Gikuyu",nativeName:"Gĩkũyũ"},rw:{name:"Kinyarwanda",nativeName:"Ikinyarwanda"},ky:{name:"Kirghiz, Kyrgyz",nativeName:"кыргыз тили"},kv:{name:"Komi",nativeName:"коми кыв"},kg:{name:"Kongo",nativeName:"KiKongo"},ko:{name:"Korean",nativeName:"한국어 (韓國語), 조선말 (朝鮮語)"},ku:{name:"Kurdish",nativeName:"Kurdî, كوردی‎"},kj:{name:"Kwanyama, Kuanyama",nativeName:"Kuanyama"},la:{name:"Latin",nativeName:"latine, lingua latina"},lb:{name:"Luxembourgish, Letzeburgesch",nativeName:"Lëtzebuergesch"},lg:{name:"Luganda",nativeName:"Luganda"},li:{name:"Limburgish, Limburgan, Limburger",nativeName:"Limburgs"},ln:{name:"Lingala",nativeName:"Lingála"},lo:{name:"Lao",nativeName:"ພາສາລາວ"},lt:{name:"Lithuanian",nativeName:"lietuvių kalba"},lu:{name:"Luba-Katanga",nativeName:""},lv:{name:"Latvian",nativeName:"latviešu valoda"},gv:{name:"Manx",nativeName:"Gaelg, Gailck"},mk:{name:"Macedonian",nativeName:"македонски јазик"},mg:{name:"Malagasy",nativeName:"Malagasy fiteny"},ms:{name:"Malay",nativeName:"bahasa Melayu, بهاس ملايو‎"},ml:{name:"Malayalam",nativeName:"മലയാളം"},mt:{name:"Maltese",nativeName:"Malti"},mi:{name:"Māori",nativeName:"te reo Māori"},mr:{name:"Marathi (Marāṭhī)",nativeName:"मराठी"},mh:{name:"Marshallese",nativeName:"Kajin M̧ajeļ"},mn:{name:"Mongolian",nativeName:"монгол"},na:{name:"Nauru",nativeName:"Ekakairũ Naoero"},nv:{name:"Navajo, Navaho",nativeName:"Diné bizaad, Dinékʼehǰí"},nb:{name:"Norwegian Bokmål",nativeName:"Norsk bokmål"},nd:{name:"North Ndebele",nativeName:"isiNdebele"},ne:{name:"Nepali",nativeName:"नेपाली"},ng:{name:"Ndonga",nativeName:"Owambo"},nn:{name:"Norwegian Nynorsk",nativeName:"Norsk nynorsk"},no:{name:"Norwegian",nativeName:"Norsk"},ii:{name:"Nuosu",nativeName:"ꆈꌠ꒿ Nuosuhxop"},nr:{name:"South Ndebele",nativeName:"isiNdebele"},oc:{name:"Occitan",nativeName:"Occitan"},oj:{name:"Ojibwe, Ojibwa",nativeName:"ᐊᓂᔑᓈᐯᒧᐎᓐ"},cu:{name:"Old Church Slavonic, Church Slavic, Church Slavonic, Old Bulgarian, Old Slavonic",nativeName:"ѩзыкъ словѣньскъ"},om:{name:"Oromo",nativeName:"Afaan Oromoo"},or:{name:"Oriya",nativeName:"ଓଡ଼ିଆ"},os:{name:"Ossetian, Ossetic",nativeName:"ирон æвзаг"},pa:{name:"Panjabi, Punjabi",nativeName:"ਪੰਜਾਬੀ, پنجابی‎"},pi:{name:"Pāli",nativeName:"पाऴि"},fa:{name:"Persian",nativeName:"فارسی"},pl:{name:"Polish",nativeName:"polski"},ps:{name:"Pashto, Pushto",nativeName:"پښتو"},pt:{name:"Portuguese",nativeName:"Português"},qu:{name:"Quechua",nativeName:"Runa Simi, Kichwa"},rm:{name:"Romansh",nativeName:"rumantsch grischun"},rn:{name:"Kirundi",nativeName:"kiRundi"},ro:{name:"Romanian, Moldavian, Moldovan",nativeName:"română"},ru:{name:"Russian",nativeName:"русский язык"},sa:{name:"Sanskrit (Saṁskṛta)",nativeName:"संस्कृतम्"},sc:{name:"Sardinian",nativeName:"sardu"},sd:{name:"Sindhi",nativeName:"सिन्धी, سنڌي، سندھی‎"},se:{name:"Northern Sami",nativeName:"Davvisámegiella"},sm:{name:"Samoan",nativeName:"gagana faa Samoa"},sg:{name:"Sango",nativeName:"yângâ tî sängö"},sr:{name:"Serbian",nativeName:"српски језик"},gd:{name:"Scottish Gaelic; Gaelic",nativeName:"Gàidhlig"},sn:{name:"Shona",nativeName:"chiShona"},si:{name:"Sinhala, Sinhalese",nativeName:"සිංහල"},sk:{name:"Slovak",nativeName:"slovenčina"},sl:{name:"Slovene",nativeName:"slovenščina"},so:{name:"Somali",nativeName:"Soomaaliga, af Soomaali"},st:{name:"Southern Sotho",nativeName:"Sesotho"},es:{name:"Spanish; Castilian",nativeName:"español, castellano"},su:{name:"Sundanese",nativeName:"Basa Sunda"},sw:{name:"Swahili",nativeName:"Kiswahili"},ss:{name:"Swati",nativeName:"SiSwati"},sv:{name:"Swedish",nativeName:"svenska"},ta:{name:"Tamil",nativeName:"தமிழ்"},te:{name:"Telugu",nativeName:"తెలుగు"},tg:{name:"Tajik",nativeName:"тоҷикӣ, toğikī, تاجیکی‎"},th:{name:"Thai",nativeName:"ไทย"},ti:{name:"Tigrinya",nativeName:"ትግርኛ"},bo:{name:"Tibetan Standard, Tibetan, Central",nativeName:"བོད་ཡིག"},tk:{name:"Turkmen",nativeName:"Türkmen, Түркмен"},tl:{name:"Tagalog",nativeName:"Wikang Tagalog, ᜏᜒᜃᜅ᜔ ᜆᜄᜎᜓᜄ᜔"},tn:{name:"Tswana",nativeName:"Setswana"},to:{name:"Tonga (Tonga Islands)",nativeName:"faka Tonga"},tr:{name:"Turkish",nativeName:"Türkçe"},ts:{name:"Tsonga",nativeName:"Xitsonga"},tt:{name:"Tatar",nativeName:"татарча, tatarça, تاتارچا‎"},tw:{name:"Twi",nativeName:"Twi"},ty:{name:"Tahitian",nativeName:"Reo Tahiti"},ug:{name:"Uighur, Uyghur",nativeName:"Uyƣurqə, ئۇيغۇرچە‎"},uk:{name:"Ukrainian",nativeName:"українська"},ur:{name:"Urdu",nativeName:"اردو"},uz:{name:"Uzbek",nativeName:"zbek, Ўзбек, أۇزبېك‎"},ve:{name:"Venda",nativeName:"Tshivenḓa"},vi:{name:"Vietnamese",nativeName:"Tiếng Việt"},vo:{name:"Volapük",nativeName:"Volapük"},wa:{name:"Walloon",nativeName:"Walon"},cy:{name:"Welsh",nativeName:"Cymraeg"},wo:{name:"Wolof",nativeName:"Wollof"},fy:{name:"Western Frisian",nativeName:"Frysk"},xh:{name:"Xhosa",nativeName:"isiXhosa"},yi:{name:"Yiddish",nativeName:"ייִדיש"},yo:{name:"Yoruba",nativeName:"Yorùbá"},za:{name:"Zhuang, Chuang",nativeName:"Saɯ cueŋƅ, Saw cuengh"}},C=(Object.keys(_).map(function(e){return[e,_[e].name.toLowerCase()]}),{ca:"ca_ES",cs:"cs_CZ",en:"en_US",he:"he_IL",ja:"ja_JP",ko:"ko_KR",pt:"pt_BR",sv:"sv_SE",zh:"zh_CN"}),F="%A, %e de %B de %Y, %X",P="%d/%m/%Y",J="%H:%M:%S",H=["AM","PM"],Y=["diumenge","dilluns","dimarts","dimecres","dijous","divendres","dissabte"],B=["dg.","dl.","dt.","dc.","dj.","dv.","ds."],L=["gener","febrer","març","abril","maig","juny","juliol","agost","setembre","octubre","novembre","desembre"],K=["gen.","febr.","març","abr.","maig","juny","jul.","ag.","set.","oct.","nov.","des."],E={dateTime:F,date:P,time:J,periods:H,days:Y,shortDays:B,months:L,shortMonths:K},I=Object.freeze({dateTime:F,date:P,time:J,periods:H,days:Y,shortDays:B,months:L,shortMonths:K,"default":E}),G="%A, der %e. %B %Y, %X",X="%d.%m.%Y",R="%H:%M:%S",W=["AM","PM"],U=["Sonntag","Montag","Dienstag","Mittwoch","Donnerstag","Freitag","Samstag"],V=["So","Mo","Di","Mi","Do","Fr","Sa"],$=["Januar","Februar","März","April","Mai","Juni","Juli","August","September","Oktober","November","Dezember"],q=["Jan","Feb","Mrz","Apr","Mai","Jun","Jul","Aug","Sep","Okt","Nov","Dez"],Q={dateTime:G,date:X,time:R,periods:W,days:U,shortDays:V,months:$,shortMonths:q},Z=Object.freeze({dateTime:G,date:X,time:R,periods:W,days:U,shortDays:V,months:$,shortMonths:q,"default":Q}),ee="%A, der %e. %B %Y, %X",ae="%d.%m.%Y",te="%H:%M:%S",ne=["AM","PM"],re=["Sonntag","Montag","Dienstag","Mittwoch","Donnerstag","Freitag","Samstag"],ie=["So","Mo","Di","Mi","Do","Fr","Sa"],oe=["Januar","Februar","März","April","Mai","Juni","Juli","August","September","Oktober","November","Dezember"],se=["Jan","Feb","Mrz","Apr","Mai","Jun","Jul","Aug","Sep","Okt","Nov","Dez"],ue={dateTime:ee,date:ae,time:te,periods:ne,days:re,shortDays:ie,months:oe,shortMonths:se},me=Object.freeze({dateTime:ee,date:ae,time:te,periods:ne,days:re,shortDays:ie,months:oe,shortMonths:se,"default":ue}),de="%a %b %e %X %Y",le="%Y-%m-%d",ce="%H:%M:%S",he=["AM","PM"],fe=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],ge=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],ve=["January","February","March","April","May","June","July","August","September","October","November","December"],pe=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],ye={dateTime:de,date:le,time:ce,periods:he,days:fe,shortDays:ge,months:ve,shortMonths:pe},be=Object.freeze({dateTime:de,date:le,time:ce,periods:he,days:fe,shortDays:ge,months:ve,shortMonths:pe,"default":ye}),Ne="%a %e %b %X %Y",Me="%d/%m/%Y",Se="%H:%M:%S",ke=["AM","PM"],je=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],Ae=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],ze=["January","February","March","April","May","June","July","August","September","October","November","December"],we=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],xe={dateTime:Ne,date:Me,time:Se,periods:ke,days:je,shortDays:Ae,months:ze,shortMonths:we},Te=Object.freeze({dateTime:Ne,date:Me,time:Se,periods:ke,days:je,shortDays:Ae,months:ze,shortMonths:we,"default":xe}),De="%a %b %e %X %Y",Oe="%m/%d/%Y",_e="%H:%M:%S",Ce=["AM","PM"],Fe=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],Pe=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],Je=["January","February","March","April","May","June","July","August","September","October","November","December"],He=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],Ye={dateTime:De,date:Oe,time:_e,periods:Ce,days:Fe,shortDays:Pe,months:Je,shortMonths:He},Be=Object.freeze({dateTime:De,date:Oe,time:_e,periods:Ce,days:Fe,shortDays:Pe,months:Je,shortMonths:He,"default":Ye}),Le="%A, %e de %B de %Y, %X",Ke="%d/%m/%Y",Ee="%H:%M:%S",Ie=["AM","PM"],Ge=["domingo","lunes","martes","miércoles","jueves","viernes","sábado"],Xe=["dom","lun","mar","mié","jue","vie","sáb"],Re=["enero","febrero","marzo","abril","mayo","junio","julio","agosto","septiembre","octubre","noviembre","diciembre"],We=["ene","feb","mar","abr","may","jun","jul","ago","sep","oct","nov","dic"],Ue={dateTime:Le,date:Ke,time:Ee,periods:Ie,days:Ge,shortDays:Xe,months:Re,shortMonths:We},Ve=Object.freeze({dateTime:Le,date:Ke,time:Ee,periods:Ie,days:Ge,shortDays:Xe,months:Re,shortMonths:We,"default":Ue}),$e="%A, %-d. %Bta %Y klo %X",qe="%-d.%-m.%Y",Qe="%H:%M:%S",Ze=["a.m.","p.m."],ea=["sunnuntai","maanantai","tiistai","keskiviikko","torstai","perjantai","lauantai"],aa=["Su","Ma","Ti","Ke","To","Pe","La"],ta=["tammikuu","helmikuu","maaliskuu","huhtikuu","toukokuu","kesäkuu","heinäkuu","elokuu","syyskuu","lokakuu","marraskuu","joulukuu"],na=["Tammi","Helmi","Maalis","Huhti","Touko","Kesä","Heinä","Elo","Syys","Loka","Marras","Joulu"],ra={dateTime:$e,date:qe,time:Qe,periods:Ze,days:ea,shortDays:aa,months:ta,shortMonths:na},ia=Object.freeze({dateTime:$e,date:qe,time:Qe,periods:Ze,days:ea,shortDays:aa,months:ta,shortMonths:na,"default":ra}),oa="%a %e %b %Y %X",sa="%Y-%m-%d",ua="%H:%M:%S",ma=["",""],da=["dimanche","lundi","mardi","mercredi","jeudi","vendredi","samedi"],la=["dim","lun","mar","mer","jeu","ven","sam"],ca=["janvier","février","mars","avril","mai","juin","juillet","août","septembre","octobre","novembre","décembre"],ha=["jan","fév","mar","avr","mai","jui","jul","aoû","sep","oct","nov","déc"],fa={dateTime:oa,date:sa,time:ua,periods:ma,days:da,shortDays:la,months:ca,shortMonths:ha},ga=Object.freeze({dateTime:oa,date:sa,time:ua,periods:ma,days:da,shortDays:la,months:ca,shortMonths:ha,"default":fa}),va="%A, le %e %B %Y, %X",pa="%d/%m/%Y",ya="%H:%M:%S",ba=["AM","PM"],Na=["dimanche","lundi","mardi","mercredi","jeudi","vendredi","samedi"],Ma=["dim.","lun.","mar.","mer.","jeu.","ven.","sam."],Sa=["janvier","février","mars","avril","mai","juin","juillet","août","septembre","octobre","novembre","décembre"],ka=["janv.","févr.","mars","avr.","mai","juin","juil.","août","sept.","oct.","nov.","déc."],ja={dateTime:va,date:pa,time:ya,periods:ba,days:Na,shortDays:Ma,months:Sa,shortMonths:ka},Aa=Object.freeze({dateTime:va,date:pa,time:ya,periods:ba,days:Na,shortDays:Ma,months:Sa,shortMonths:ka,"default":ja}),za="%A, %e ב%B %Y %X",wa="%d.%m.%Y",xa="%H:%M:%S",Ta=["AM","PM"],Da=["ראשון","שני","שלישי","רביעי","חמישי","שישי","שבת"],Oa=["א׳","ב׳","ג׳","ד׳","ה׳","ו׳","ש׳"],_a=["ינואר","פברואר","מרץ","אפריל","מאי","יוני","יולי","אוגוסט","ספטמבר","אוקטובר","נובמבר","דצמבר"],Ca=["ינו׳","פבר׳","מרץ","אפר׳","מאי","יוני","יולי","אוג׳","ספט׳","אוק׳","נוב׳","דצמ׳"],Fa={dateTime:za,date:wa,time:xa,periods:Ta,days:Da,shortDays:Oa,months:_a,shortMonths:Ca},Pa=Object.freeze({dateTime:za,date:wa,time:xa,periods:Ta,days:Da,shortDays:Oa,months:_a,shortMonths:Ca,"default":Fa}),Ja="%Y. %B %-e., %A %X",Ha="%Y. %m. %d.",Ya="%H:%M:%S",Ba=["de.","du."],La=["vasárnap","hétfő","kedd","szerda","csütörtök","péntek","szombat"],Ka=["V","H","K","Sze","Cs","P","Szo"],Ea=["január","február","március","április","május","június","július","augusztus","szeptember","október","november","december"],Ia=["jan.","feb.","már.","ápr.","máj.","jún.","júl.","aug.","szept.","okt.","nov.","dec."],Ga={dateTime:Ja,date:Ha,time:Ya,periods:Ba,days:La,shortDays:Ka,months:Ea,shortMonths:Ia},Xa=Object.freeze({dateTime:Ja,date:Ha,time:Ya,periods:Ba,days:La,shortDays:Ka,months:Ea,shortMonths:Ia,"default":Ga}),Ra="%A %e %B %Y, %X",Wa="%d/%m/%Y",Ua="%H:%M:%S",Va=["AM","PM"],$a=["Domenica","Lunedì","Martedì","Mercoledì","Giovedì","Venerdì","Sabato"],qa=["Dom","Lun","Mar","Mer","Gio","Ven","Sab"],Qa=["Gennaio","Febbraio","Marzo","Aprile","Maggio","Giugno","Luglio","Agosto","Settembre","Ottobre","Novembre","Dicembre"],Za=["Gen","Feb","Mar","Apr","Mag","Giu","Lug","Ago","Set","Ott","Nov","Dic"],et={
	dateTime:Ra,date:Wa,time:Ua,periods:Va,days:$a,shortDays:qa,months:Qa,shortMonths:Za},at=Object.freeze({dateTime:Ra,date:Wa,time:Ua,periods:Va,days:$a,shortDays:qa,months:Qa,shortMonths:Za,"default":et}),tt="%Y %b %e %a %X",nt="%Y/%m/%d",rt="%H:%M:%S",it=["AM","PM"],ot=["日曜日","月曜日","火曜日","水曜日","木曜日","金曜日","土曜日"],st=["日","月","火","水","木","金","土"],ut=["睦月","如月","弥生","卯月","皐月","水無月","文月","葉月","長月","神無月","霜月","師走"],mt=["1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月"],dt={dateTime:tt,date:nt,time:rt,periods:it,days:ot,shortDays:st,months:ut,shortMonths:mt},lt=Object.freeze({dateTime:tt,date:nt,time:rt,periods:it,days:ot,shortDays:st,months:ut,shortMonths:mt,"default":dt}),ct="%Y/%m/%d %a %X",ht="%Y/%m/%d",ft="%H:%M:%S",gt=["오전","오후"],vt=["일요일","월요일","화요일","수요일","목요일","금요일","토요일"],pt=["일","월","화","수","목","금","토"],yt=["1월","2월","3월","4월","5월","6월","7월","8월","9월","10월","11월","12월"],bt=["1월","2월","3월","4월","5월","6월","7월","8월","9월","10월","11월","12월"],Nt={dateTime:ct,date:ht,time:ft,periods:gt,days:vt,shortDays:pt,months:yt,shortMonths:bt},Mt=Object.freeze({dateTime:ct,date:ht,time:ft,periods:gt,days:vt,shortDays:pt,months:yt,shortMonths:bt,"default":Nt}),St="%A, %e %B %Y г. %X",kt="%d.%m.%Y",jt="%H:%M:%S",At=["AM","PM"],zt=["недела","понеделник","вторник","среда","четврток","петок","сабота"],wt=["нед","пон","вто","сре","чет","пет","саб"],xt=["јануари","февруари","март","април","мај","јуни","јули","август","септември","октомври","ноември","декември"],Tt=["јан","фев","мар","апр","мај","јун","јул","авг","сеп","окт","ное","дек"],Dt={dateTime:St,date:kt,time:jt,periods:At,days:zt,shortDays:wt,months:xt,shortMonths:Tt},Ot=Object.freeze({dateTime:St,date:kt,time:jt,periods:At,days:zt,shortDays:wt,months:xt,shortMonths:Tt,"default":Dt}),_t="%a %e %B %Y %T",Ct="%d-%m-%Y",Ft="%H:%M:%S",Pt=["AM","PM"],Jt=["zondag","maandag","dinsdag","woensdag","donderdag","vrijdag","zaterdag"],Ht=["zo","ma","di","wo","do","vr","za"],Yt=["januari","februari","maart","april","mei","juni","juli","augustus","september","oktober","november","december"],Bt=["jan","feb","mrt","apr","mei","jun","jul","aug","sep","okt","nov","dec"],Lt={dateTime:_t,date:Ct,time:Ft,periods:Pt,days:Jt,shortDays:Ht,months:Yt,shortMonths:Bt},Kt=Object.freeze({dateTime:_t,date:Ct,time:Ft,periods:Pt,days:Jt,shortDays:Ht,months:Yt,shortMonths:Bt,"default":Lt}),Et="%A, %e %B %Y, %X",It="%d/%m/%Y",Gt="%H:%M:%S",Xt=["AM","PM"],Rt=["Niedziela","Poniedziałek","Wtorek","Środa","Czwartek","Piątek","Sobota"],Wt=["Niedz.","Pon.","Wt.","Śr.","Czw.","Pt.","Sob."],Ut=["Styczeń","Luty","Marzec","Kwiecień","Maj","Czerwiec","Lipiec","Sierpień","Wrzesień","Październik","Listopad","Grudzień"],Vt=["Stycz.","Luty","Marz.","Kwie.","Maj","Czerw.","Lipc.","Sierp.","Wrz.","Paźdz.","Listop.","Grudz."],$t={dateTime:Et,date:It,time:Gt,periods:Xt,days:Rt,shortDays:Wt,months:Ut,shortMonths:Vt},qt=Object.freeze({dateTime:Et,date:It,time:Gt,periods:Xt,days:Rt,shortDays:Wt,months:Ut,shortMonths:Vt,"default":$t}),Qt="%A, %e de %B de %Y. %X",Zt="%d/%m/%Y",en="%H:%M:%S",an=["AM","PM"],tn=["Domingo","Segunda","Terça","Quarta","Quinta","Sexta","Sábado"],nn=["Dom","Seg","Ter","Qua","Qui","Sex","Sáb"],rn=["Janeiro","Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"],on=["Jan","Fev","Mar","Abr","Mai","Jun","Jul","Ago","Set","Out","Nov","Dez"],sn={dateTime:Qt,date:Zt,time:en,periods:an,days:tn,shortDays:nn,months:rn,shortMonths:on},un=Object.freeze({dateTime:Qt,date:Zt,time:en,periods:an,days:tn,shortDays:nn,months:rn,shortMonths:on,"default":sn}),mn="%A, %e %B %Y г. %X",dn="%d.%m.%Y",ln="%H:%M:%S",cn=["AM","PM"],hn=["воскресенье","понедельник","вторник","среда","четверг","пятница","суббота"],fn=["вс","пн","вт","ср","чт","пт","сб"],gn=["января","февраля","марта","апреля","мая","июня","июля","августа","сентября","октября","ноября","декабря"],vn=["янв","фев","мар","апр","май","июн","июл","авг","сен","окт","ноя","дек"],pn={dateTime:mn,date:dn,time:ln,periods:cn,days:hn,shortDays:fn,months:gn,shortMonths:vn},yn=Object.freeze({dateTime:mn,date:dn,time:ln,periods:cn,days:hn,shortDays:fn,months:gn,shortMonths:vn,"default":pn}),bn="%A den %d %B %Y %X",Nn="%Y-%m-%d",Mn="%H:%M:%S",Sn=["fm","em"],kn=["Söndag","Måndag","Tisdag","Onsdag","Torsdag","Fredag","Lördag"],jn=["Sön","Mån","Tis","Ons","Tor","Fre","Lör"],An=["Januari","Februari","Mars","April","Maj","Juni","Juli","Augusti","September","Oktober","November","December"],zn=["Jan","Feb","Mar","Apr","Maj","Jun","Jul","Aug","Sep","Okt","Nov","Dec"],wn={dateTime:bn,date:Nn,time:Mn,periods:Sn,days:kn,shortDays:jn,months:An,shortMonths:zn},xn=Object.freeze({dateTime:bn,date:Nn,time:Mn,periods:Sn,days:kn,shortDays:jn,months:An,shortMonths:zn,"default":wn}),Tn="%x %A %X",Dn="%Y年%-m月%-d日",On="%H:%M:%S",_n=["上午","下午"],Cn=["星期日","星期一","星期二","星期三","星期四","星期五","星期六"],Fn=["周日","周一","周二","周三","周四","周五","周六"],Pn=["一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月"],Jn=["一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月"],Hn={dateTime:Tn,date:Dn,time:On,periods:_n,days:Cn,shortDays:Fn,months:Pn,shortMonths:Jn},Yn=Object.freeze({dateTime:Tn,date:Dn,time:On,periods:_n,days:Cn,shortDays:Fn,months:Pn,shortMonths:Jn,"default":Hn}),Bn={ca_ES:I,de_CH:Z,de_DE:me,en_CA:be,en_GB:Te,en_US:Be,es_ES:Ve,fi_FI:ia,fr_CA:ga,fr_FR:Aa,he_IL:Pa,hu_HU:Xa,it_IT:at,ja_JP:lt,ko_KR:Mt,mk_MK:Ot,nl_NL:Kt,pl_PL:qt,pt_BR:un,ru_RU:yn,sv_SE:xn,zh_CN:Yn},Ln=(g(Bn),","),Kn=".",En=[3],In=[""," €"],Gn={decimal:Ln,thousands:Kn,grouping:En,currency:In},Xn=Object.freeze({decimal:Ln,thousands:Kn,grouping:En,currency:In,"default":Gn}),Rn=",",Wn=" ",Un=[3],Vn=[""," Kč"],$n={decimal:Rn,thousands:Wn,grouping:Un,currency:Vn},qn=Object.freeze({decimal:Rn,thousands:Wn,grouping:Un,currency:Vn,"default":$n}),Qn=",",Zn="'",er=[3],ar=[""," CHF"],tr={decimal:Qn,thousands:Zn,grouping:er,currency:ar},nr=Object.freeze({decimal:Qn,thousands:Zn,grouping:er,currency:ar,"default":tr}),rr=",",ir=".",or=[3],sr=[""," €"],ur={decimal:rr,thousands:ir,grouping:or,currency:sr},mr=Object.freeze({decimal:rr,thousands:ir,grouping:or,currency:sr,"default":ur}),dr=".",lr=",",cr=[3],hr=["$",""],fr={decimal:dr,thousands:lr,grouping:cr,currency:hr},gr=Object.freeze({decimal:dr,thousands:lr,grouping:cr,currency:hr,"default":fr}),vr=".",pr=",",yr=[3],br=["£",""],Nr={decimal:vr,thousands:pr,grouping:yr,currency:br},Mr=Object.freeze({decimal:vr,thousands:pr,grouping:yr,currency:br,"default":Nr}),Sr=".",kr=",",jr=[3],Ar=["$",""],zr={decimal:Sr,thousands:kr,grouping:jr,currency:Ar},wr=Object.freeze({decimal:Sr,thousands:kr,grouping:jr,currency:Ar,"default":zr}),xr=",",Tr=".",Dr=[3],Or=[""," €"],_r={decimal:xr,thousands:Tr,grouping:Dr,currency:Or},Cr=Object.freeze({decimal:xr,thousands:Tr,grouping:Dr,currency:Or,"default":_r}),Fr=".",Pr=",",Jr=[3],Hr=["$",""],Yr={decimal:Fr,thousands:Pr,grouping:Jr,currency:Hr},Br=Object.freeze({decimal:Fr,thousands:Pr,grouping:Jr,currency:Hr,"default":Yr}),Lr=",",Kr=" ",Er=[3],Ir=[""," €"],Gr={decimal:Lr,thousands:Kr,grouping:Er,currency:Ir},Xr=Object.freeze({decimal:Lr,thousands:Kr,grouping:Er,currency:Ir,"default":Gr}),Rr=",",Wr=" ",Ur=[3],Vr=["","$"],$r={decimal:Rr,thousands:Wr,grouping:Ur,currency:Vr},qr=Object.freeze({decimal:Rr,thousands:Wr,grouping:Ur,currency:Vr,"default":$r}),Qr=",",Zr=".",ei=[3],ai=[""," €"],ti={decimal:Qr,thousands:Zr,grouping:ei,currency:ai},ni=Object.freeze({decimal:Qr,thousands:Zr,grouping:ei,currency:ai,"default":ti}),ri=".",ii=",",oi=[3],si=["₪",""],ui={decimal:ri,thousands:ii,grouping:oi,currency:si},mi=Object.freeze({decimal:ri,thousands:ii,grouping:oi,currency:si,"default":ui}),di=",",li=" ",ci=[3],hi=[""," Ft"],fi={decimal:di,thousands:li,grouping:ci,currency:hi},gi=Object.freeze({decimal:di,thousands:li,grouping:ci,currency:hi,"default":fi}),vi=",",pi=".",yi=[3],bi=["€",""],Ni={decimal:vi,thousands:pi,grouping:yi,currency:bi},Mi=Object.freeze({decimal:vi,thousands:pi,grouping:yi,currency:bi,"default":Ni}),Si=".",ki=",",ji=[3],Ai=["","円"],zi={decimal:Si,thousands:ki,grouping:ji,currency:Ai},wi=Object.freeze({decimal:Si,thousands:ki,grouping:ji,currency:Ai,"default":zi}),xi=".",Ti=",",Di=[3],Oi=["₩",""],_i={decimal:xi,thousands:Ti,grouping:Di,currency:Oi},Ci=Object.freeze({decimal:xi,thousands:Ti,grouping:Di,currency:Oi,"default":_i}),Fi=",",Pi=".",Ji=[3],Hi=[""," ден."],Yi={decimal:Fi,thousands:Pi,grouping:Ji,currency:Hi},Bi=Object.freeze({decimal:Fi,thousands:Pi,grouping:Ji,currency:Hi,"default":Yi}),Li=",",Ki=".",Ei=[3],Ii=["€ ",""],Gi={decimal:Li,thousands:Ki,grouping:Ei,currency:Ii},Xi=Object.freeze({decimal:Li,thousands:Ki,grouping:Ei,currency:Ii,"default":Gi}),Ri=",",Wi=".",Ui=[3],Vi=["","zł"],$i={decimal:Ri,thousands:Wi,grouping:Ui,currency:Vi},qi=Object.freeze({decimal:Ri,thousands:Wi,grouping:Ui,currency:Vi,"default":$i}),Qi=",",Zi=".",eo=[3],ao=["R$",""],to={decimal:Qi,thousands:Zi,grouping:eo,currency:ao},no=Object.freeze({decimal:Qi,thousands:Zi,grouping:eo,currency:ao,"default":to}),ro=",",io=" ",oo=[3],so=[""," руб."],uo={decimal:ro,thousands:io,grouping:oo,currency:so},mo=Object.freeze({decimal:ro,thousands:io,grouping:oo,currency:so,"default":uo}),lo=",",co=" ",ho=[3],fo=["","SEK"],go={decimal:lo,thousands:co,grouping:ho,currency:fo},vo=Object.freeze({decimal:lo,thousands:co,grouping:ho,currency:fo,"default":go}),po=".",yo=",",bo=[3],No=["¥",""],Mo={decimal:po,thousands:yo,grouping:bo,currency:No},So=Object.freeze({decimal:po,thousands:yo,grouping:bo,currency:No,"default":Mo}),ko={ca_ES:Xn,cs_CZ:qn,de_CH:nr,de_DE:mr,en_CA:gr,en_GB:Mr,en_US:wr,es_ES:Cr,es_MX:Br,fi_FI:Xr,fr_CA:qr,fr_FR:ni,he_IL:mi,hu_HU:gi,it_IT:Mi,ja_JP:wi,ko_KR:Ci,mk_MK:Bi,nl_NL:Xi,pl_PL:qi,pt_BR:no,ru_RU:mo,sv_SE:vo,zh_CN:So},jo=g(ko),Ao=64,zo={white:function(e){("string"==typeof e||e instanceof String)&&(e=M(e));var a=N(e);return a[0]<Ao}},wo=["#00ce5c","#d800a2","#00d9d2","#AF5100","#bfbfbf","#DE0000","#F0DE00","#9200ff","#ED9200","#00aeff"],xo=["#56d58e","#d95cba","#63eae4","#C78348","#d6d6d6","#E06363","#FFF741","#965ede","#FCBB54","#73c5eb"],To=["#a5e6c3","#eda3da","#9af8f4","#EDC19C","#e5e5e5","#F5AAAA","#F7EFC3","#c6a8ef","#F8D296","#addbf0"],Do={green:0,pink:1,aqua:2,brown:3,grey:4,red:5,yellow:6,purple:7,orange:8,blue:9},Oo={standard:xo,dark:wo,light:To,names:Do},_o={text:{white:"#ffffff",black:"#262626"},lines:{seperator:"#EFF0F0"}},Co=(S(function(e){function a(e,a){return 1-3*a+3*e}function t(e,a){return 3*a-6*e}function n(e){return 3*e}function r(e,r,i){return((a(r,i)*e+t(r,i))*e+n(r))*e}function i(e,r,i){return 3*a(r,i)*e*e+2*t(r,i)*e+n(r)}function o(e,a,t,n,i){var o,s,u=0;do s=a+(t-a)/2,o=r(s,n,i)-e,o>0?t=s:a=s;while(Math.abs(o)>d&&++u<l);return s}function s(e,a,t,n){for(var o=0;o<u;++o){var s=i(a,t,n);if(0===s)return a;var m=r(a,t,n)-e;a-=m/s}return a}var u=4,m=.001,d=1e-7,l=10,c=11,h=1/(c-1),f="function"==typeof Float32Array;e.exports=function(e,a,t,n){function u(a){for(var n=0,r=1,u=c-1;r!==u&&d[r]<=a;++r)n+=h;--r;var l=(a-d[r])/(d[r+1]-d[r]),f=n+l*h,g=i(f,e,t);return g>=m?s(a,f,e,t):0===g?f:o(a,n,n+h,e,t)}if(!(0<=e&&e<=1&&0<=t&&t<=1))throw new Error("bezier x values must be in [0, 1] range");var d=f?new Float32Array(c):new Array(c);if(e!==a||t!==n)for(var l=0;l<c;++l)d[l]=r(l*h,e,t);return function(i){return e===a&&t===n?i:0===i?0:1===i?1:r(u(i),a,n)}}}),270),Fo=1,Po=12,Jo=0,Ho=10,Yo=8,Bo=24,Lo=8,Ko=3,Eo=",.0f",Io=".2s",Go=".3f",Xo=["@import url(https://fonts.googleapis.com/css?family=Source+Code+Pro:300);","text{ font-family: 'Source Code Pro', Consolas, 'Liberation Mono', Menlo, Courier, monospace; font-weight: 300; }",".legend text { font-size: 12px }"].join(" \n");e.version=A,e.html=k,Object.defineProperty(e,"__esModule",{value:!0})});
	//# sourceMappingURL=d3-rs-pies.umd-es2015.min.js.map


/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	// https://d3js.org/d3-selection/ Version 1.0.3. Copyright 2016 Mike Bostock.
	(function (global, factory) {
	   true ? factory(exports) :
	  typeof define === 'function' && define.amd ? define(['exports'], factory) :
	  (factory((global.d3 = global.d3 || {})));
	}(this, (function (exports) { 'use strict';
	
	var xhtml = "http://www.w3.org/1999/xhtml";
	
	var namespaces = {
	  svg: "http://www.w3.org/2000/svg",
	  xhtml: xhtml,
	  xlink: "http://www.w3.org/1999/xlink",
	  xml: "http://www.w3.org/XML/1998/namespace",
	  xmlns: "http://www.w3.org/2000/xmlns/"
	};
	
	var namespace = function(name) {
	  var prefix = name += "", i = prefix.indexOf(":");
	  if (i >= 0 && (prefix = name.slice(0, i)) !== "xmlns") name = name.slice(i + 1);
	  return namespaces.hasOwnProperty(prefix) ? {space: namespaces[prefix], local: name} : name;
	};
	
	function creatorInherit(name) {
	  return function() {
	    var document = this.ownerDocument,
	        uri = this.namespaceURI;
	    return uri === xhtml && document.documentElement.namespaceURI === xhtml
	        ? document.createElement(name)
	        : document.createElementNS(uri, name);
	  };
	}
	
	function creatorFixed(fullname) {
	  return function() {
	    return this.ownerDocument.createElementNS(fullname.space, fullname.local);
	  };
	}
	
	var creator = function(name) {
	  var fullname = namespace(name);
	  return (fullname.local
	      ? creatorFixed
	      : creatorInherit)(fullname);
	};
	
	var nextId = 0;
	
	function local() {
	  return new Local;
	}
	
	function Local() {
	  this._ = "@" + (++nextId).toString(36);
	}
	
	Local.prototype = local.prototype = {
	  constructor: Local,
	  get: function(node) {
	    var id = this._;
	    while (!(id in node)) if (!(node = node.parentNode)) return;
	    return node[id];
	  },
	  set: function(node, value) {
	    return node[this._] = value;
	  },
	  remove: function(node) {
	    return this._ in node && delete node[this._];
	  },
	  toString: function() {
	    return this._;
	  }
	};
	
	var matcher = function(selector) {
	  return function() {
	    return this.matches(selector);
	  };
	};
	
	if (typeof document !== "undefined") {
	  var element = document.documentElement;
	  if (!element.matches) {
	    var vendorMatches = element.webkitMatchesSelector
	        || element.msMatchesSelector
	        || element.mozMatchesSelector
	        || element.oMatchesSelector;
	    matcher = function(selector) {
	      return function() {
	        return vendorMatches.call(this, selector);
	      };
	    };
	  }
	}
	
	var matcher$1 = matcher;
	
	var filterEvents = {};
	
	exports.event = null;
	
	if (typeof document !== "undefined") {
	  var element$1 = document.documentElement;
	  if (!("onmouseenter" in element$1)) {
	    filterEvents = {mouseenter: "mouseover", mouseleave: "mouseout"};
	  }
	}
	
	function filterContextListener(listener, index, group) {
	  listener = contextListener(listener, index, group);
	  return function(event) {
	    var related = event.relatedTarget;
	    if (!related || (related !== this && !(related.compareDocumentPosition(this) & 8))) {
	      listener.call(this, event);
	    }
	  };
	}
	
	function contextListener(listener, index, group) {
	  return function(event1) {
	    var event0 = exports.event; // Events can be reentrant (e.g., focus).
	    exports.event = event1;
	    try {
	      listener.call(this, this.__data__, index, group);
	    } finally {
	      exports.event = event0;
	    }
	  };
	}
	
	function parseTypenames(typenames) {
	  return typenames.trim().split(/^|\s+/).map(function(t) {
	    var name = "", i = t.indexOf(".");
	    if (i >= 0) name = t.slice(i + 1), t = t.slice(0, i);
	    return {type: t, name: name};
	  });
	}
	
	function onRemove(typename) {
	  return function() {
	    var on = this.__on;
	    if (!on) return;
	    for (var j = 0, i = -1, m = on.length, o; j < m; ++j) {
	      if (o = on[j], (!typename.type || o.type === typename.type) && o.name === typename.name) {
	        this.removeEventListener(o.type, o.listener, o.capture);
	      } else {
	        on[++i] = o;
	      }
	    }
	    if (++i) on.length = i;
	    else delete this.__on;
	  };
	}
	
	function onAdd(typename, value, capture) {
	  var wrap = filterEvents.hasOwnProperty(typename.type) ? filterContextListener : contextListener;
	  return function(d, i, group) {
	    var on = this.__on, o, listener = wrap(value, i, group);
	    if (on) for (var j = 0, m = on.length; j < m; ++j) {
	      if ((o = on[j]).type === typename.type && o.name === typename.name) {
	        this.removeEventListener(o.type, o.listener, o.capture);
	        this.addEventListener(o.type, o.listener = listener, o.capture = capture);
	        o.value = value;
	        return;
	      }
	    }
	    this.addEventListener(typename.type, listener, capture);
	    o = {type: typename.type, name: typename.name, value: value, listener: listener, capture: capture};
	    if (!on) this.__on = [o];
	    else on.push(o);
	  };
	}
	
	var selection_on = function(typename, value, capture) {
	  var typenames = parseTypenames(typename + ""), i, n = typenames.length, t;
	
	  if (arguments.length < 2) {
	    var on = this.node().__on;
	    if (on) for (var j = 0, m = on.length, o; j < m; ++j) {
	      for (i = 0, o = on[j]; i < n; ++i) {
	        if ((t = typenames[i]).type === o.type && t.name === o.name) {
	          return o.value;
	        }
	      }
	    }
	    return;
	  }
	
	  on = value ? onAdd : onRemove;
	  if (capture == null) capture = false;
	  for (i = 0; i < n; ++i) this.each(on(typenames[i], value, capture));
	  return this;
	};
	
	function customEvent(event1, listener, that, args) {
	  var event0 = exports.event;
	  event1.sourceEvent = exports.event;
	  exports.event = event1;
	  try {
	    return listener.apply(that, args);
	  } finally {
	    exports.event = event0;
	  }
	}
	
	var sourceEvent = function() {
	  var current = exports.event, source;
	  while (source = current.sourceEvent) current = source;
	  return current;
	};
	
	var point = function(node, event) {
	  var svg = node.ownerSVGElement || node;
	
	  if (svg.createSVGPoint) {
	    var point = svg.createSVGPoint();
	    point.x = event.clientX, point.y = event.clientY;
	    point = point.matrixTransform(node.getScreenCTM().inverse());
	    return [point.x, point.y];
	  }
	
	  var rect = node.getBoundingClientRect();
	  return [event.clientX - rect.left - node.clientLeft, event.clientY - rect.top - node.clientTop];
	};
	
	var mouse = function(node) {
	  var event = sourceEvent();
	  if (event.changedTouches) event = event.changedTouches[0];
	  return point(node, event);
	};
	
	function none() {}
	
	var selector = function(selector) {
	  return selector == null ? none : function() {
	    return this.querySelector(selector);
	  };
	};
	
	var selection_select = function(select) {
	  if (typeof select !== "function") select = selector(select);
	
	  for (var groups = this._groups, m = groups.length, subgroups = new Array(m), j = 0; j < m; ++j) {
	    for (var group = groups[j], n = group.length, subgroup = subgroups[j] = new Array(n), node, subnode, i = 0; i < n; ++i) {
	      if ((node = group[i]) && (subnode = select.call(node, node.__data__, i, group))) {
	        if ("__data__" in node) subnode.__data__ = node.__data__;
	        subgroup[i] = subnode;
	      }
	    }
	  }
	
	  return new Selection(subgroups, this._parents);
	};
	
	function empty() {
	  return [];
	}
	
	var selectorAll = function(selector) {
	  return selector == null ? empty : function() {
	    return this.querySelectorAll(selector);
	  };
	};
	
	var selection_selectAll = function(select) {
	  if (typeof select !== "function") select = selectorAll(select);
	
	  for (var groups = this._groups, m = groups.length, subgroups = [], parents = [], j = 0; j < m; ++j) {
	    for (var group = groups[j], n = group.length, node, i = 0; i < n; ++i) {
	      if (node = group[i]) {
	        subgroups.push(select.call(node, node.__data__, i, group));
	        parents.push(node);
	      }
	    }
	  }
	
	  return new Selection(subgroups, parents);
	};
	
	var selection_filter = function(match) {
	  if (typeof match !== "function") match = matcher$1(match);
	
	  for (var groups = this._groups, m = groups.length, subgroups = new Array(m), j = 0; j < m; ++j) {
	    for (var group = groups[j], n = group.length, subgroup = subgroups[j] = [], node, i = 0; i < n; ++i) {
	      if ((node = group[i]) && match.call(node, node.__data__, i, group)) {
	        subgroup.push(node);
	      }
	    }
	  }
	
	  return new Selection(subgroups, this._parents);
	};
	
	var sparse = function(update) {
	  return new Array(update.length);
	};
	
	var selection_enter = function() {
	  return new Selection(this._enter || this._groups.map(sparse), this._parents);
	};
	
	function EnterNode(parent, datum) {
	  this.ownerDocument = parent.ownerDocument;
	  this.namespaceURI = parent.namespaceURI;
	  this._next = null;
	  this._parent = parent;
	  this.__data__ = datum;
	}
	
	EnterNode.prototype = {
	  constructor: EnterNode,
	  appendChild: function(child) { return this._parent.insertBefore(child, this._next); },
	  insertBefore: function(child, next) { return this._parent.insertBefore(child, next); },
	  querySelector: function(selector) { return this._parent.querySelector(selector); },
	  querySelectorAll: function(selector) { return this._parent.querySelectorAll(selector); }
	};
	
	var constant = function(x) {
	  return function() {
	    return x;
	  };
	};
	
	var keyPrefix = "$"; // Protect against keys like “__proto__”.
	
	function bindIndex(parent, group, enter, update, exit, data) {
	  var i = 0,
	      node,
	      groupLength = group.length,
	      dataLength = data.length;
	
	  // Put any non-null nodes that fit into update.
	  // Put any null nodes into enter.
	  // Put any remaining data into enter.
	  for (; i < dataLength; ++i) {
	    if (node = group[i]) {
	      node.__data__ = data[i];
	      update[i] = node;
	    } else {
	      enter[i] = new EnterNode(parent, data[i]);
	    }
	  }
	
	  // Put any non-null nodes that don’t fit into exit.
	  for (; i < groupLength; ++i) {
	    if (node = group[i]) {
	      exit[i] = node;
	    }
	  }
	}
	
	function bindKey(parent, group, enter, update, exit, data, key) {
	  var i,
	      node,
	      nodeByKeyValue = {},
	      groupLength = group.length,
	      dataLength = data.length,
	      keyValues = new Array(groupLength),
	      keyValue;
	
	  // Compute the key for each node.
	  // If multiple nodes have the same key, the duplicates are added to exit.
	  for (i = 0; i < groupLength; ++i) {
	    if (node = group[i]) {
	      keyValues[i] = keyValue = keyPrefix + key.call(node, node.__data__, i, group);
	      if (keyValue in nodeByKeyValue) {
	        exit[i] = node;
	      } else {
	        nodeByKeyValue[keyValue] = node;
	      }
	    }
	  }
	
	  // Compute the key for each datum.
	  // If there a node associated with this key, join and add it to update.
	  // If there is not (or the key is a duplicate), add it to enter.
	  for (i = 0; i < dataLength; ++i) {
	    keyValue = keyPrefix + key.call(parent, data[i], i, data);
	    if (node = nodeByKeyValue[keyValue]) {
	      update[i] = node;
	      node.__data__ = data[i];
	      nodeByKeyValue[keyValue] = null;
	    } else {
	      enter[i] = new EnterNode(parent, data[i]);
	    }
	  }
	
	  // Add any remaining nodes that were not bound to data to exit.
	  for (i = 0; i < groupLength; ++i) {
	    if ((node = group[i]) && (nodeByKeyValue[keyValues[i]] === node)) {
	      exit[i] = node;
	    }
	  }
	}
	
	var selection_data = function(value, key) {
	  if (!value) {
	    data = new Array(this.size()), j = -1;
	    this.each(function(d) { data[++j] = d; });
	    return data;
	  }
	
	  var bind = key ? bindKey : bindIndex,
	      parents = this._parents,
	      groups = this._groups;
	
	  if (typeof value !== "function") value = constant(value);
	
	  for (var m = groups.length, update = new Array(m), enter = new Array(m), exit = new Array(m), j = 0; j < m; ++j) {
	    var parent = parents[j],
	        group = groups[j],
	        groupLength = group.length,
	        data = value.call(parent, parent && parent.__data__, j, parents),
	        dataLength = data.length,
	        enterGroup = enter[j] = new Array(dataLength),
	        updateGroup = update[j] = new Array(dataLength),
	        exitGroup = exit[j] = new Array(groupLength);
	
	    bind(parent, group, enterGroup, updateGroup, exitGroup, data, key);
	
	    // Now connect the enter nodes to their following update node, such that
	    // appendChild can insert the materialized enter node before this node,
	    // rather than at the end of the parent node.
	    for (var i0 = 0, i1 = 0, previous, next; i0 < dataLength; ++i0) {
	      if (previous = enterGroup[i0]) {
	        if (i0 >= i1) i1 = i0 + 1;
	        while (!(next = updateGroup[i1]) && ++i1 < dataLength);
	        previous._next = next || null;
	      }
	    }
	  }
	
	  update = new Selection(update, parents);
	  update._enter = enter;
	  update._exit = exit;
	  return update;
	};
	
	var selection_exit = function() {
	  return new Selection(this._exit || this._groups.map(sparse), this._parents);
	};
	
	var selection_merge = function(selection) {
	
	  for (var groups0 = this._groups, groups1 = selection._groups, m0 = groups0.length, m1 = groups1.length, m = Math.min(m0, m1), merges = new Array(m0), j = 0; j < m; ++j) {
	    for (var group0 = groups0[j], group1 = groups1[j], n = group0.length, merge = merges[j] = new Array(n), node, i = 0; i < n; ++i) {
	      if (node = group0[i] || group1[i]) {
	        merge[i] = node;
	      }
	    }
	  }
	
	  for (; j < m0; ++j) {
	    merges[j] = groups0[j];
	  }
	
	  return new Selection(merges, this._parents);
	};
	
	var selection_order = function() {
	
	  for (var groups = this._groups, j = -1, m = groups.length; ++j < m;) {
	    for (var group = groups[j], i = group.length - 1, next = group[i], node; --i >= 0;) {
	      if (node = group[i]) {
	        if (next && next !== node.nextSibling) next.parentNode.insertBefore(node, next);
	        next = node;
	      }
	    }
	  }
	
	  return this;
	};
	
	var selection_sort = function(compare) {
	  if (!compare) compare = ascending;
	
	  function compareNode(a, b) {
	    return a && b ? compare(a.__data__, b.__data__) : !a - !b;
	  }
	
	  for (var groups = this._groups, m = groups.length, sortgroups = new Array(m), j = 0; j < m; ++j) {
	    for (var group = groups[j], n = group.length, sortgroup = sortgroups[j] = new Array(n), node, i = 0; i < n; ++i) {
	      if (node = group[i]) {
	        sortgroup[i] = node;
	      }
	    }
	    sortgroup.sort(compareNode);
	  }
	
	  return new Selection(sortgroups, this._parents).order();
	};
	
	function ascending(a, b) {
	  return a < b ? -1 : a > b ? 1 : a >= b ? 0 : NaN;
	}
	
	var selection_call = function() {
	  var callback = arguments[0];
	  arguments[0] = this;
	  callback.apply(null, arguments);
	  return this;
	};
	
	var selection_nodes = function() {
	  var nodes = new Array(this.size()), i = -1;
	  this.each(function() { nodes[++i] = this; });
	  return nodes;
	};
	
	var selection_node = function() {
	
	  for (var groups = this._groups, j = 0, m = groups.length; j < m; ++j) {
	    for (var group = groups[j], i = 0, n = group.length; i < n; ++i) {
	      var node = group[i];
	      if (node) return node;
	    }
	  }
	
	  return null;
	};
	
	var selection_size = function() {
	  var size = 0;
	  this.each(function() { ++size; });
	  return size;
	};
	
	var selection_empty = function() {
	  return !this.node();
	};
	
	var selection_each = function(callback) {
	
	  for (var groups = this._groups, j = 0, m = groups.length; j < m; ++j) {
	    for (var group = groups[j], i = 0, n = group.length, node; i < n; ++i) {
	      if (node = group[i]) callback.call(node, node.__data__, i, group);
	    }
	  }
	
	  return this;
	};
	
	function attrRemove(name) {
	  return function() {
	    this.removeAttribute(name);
	  };
	}
	
	function attrRemoveNS(fullname) {
	  return function() {
	    this.removeAttributeNS(fullname.space, fullname.local);
	  };
	}
	
	function attrConstant(name, value) {
	  return function() {
	    this.setAttribute(name, value);
	  };
	}
	
	function attrConstantNS(fullname, value) {
	  return function() {
	    this.setAttributeNS(fullname.space, fullname.local, value);
	  };
	}
	
	function attrFunction(name, value) {
	  return function() {
	    var v = value.apply(this, arguments);
	    if (v == null) this.removeAttribute(name);
	    else this.setAttribute(name, v);
	  };
	}
	
	function attrFunctionNS(fullname, value) {
	  return function() {
	    var v = value.apply(this, arguments);
	    if (v == null) this.removeAttributeNS(fullname.space, fullname.local);
	    else this.setAttributeNS(fullname.space, fullname.local, v);
	  };
	}
	
	var selection_attr = function(name, value) {
	  var fullname = namespace(name);
	
	  if (arguments.length < 2) {
	    var node = this.node();
	    return fullname.local
	        ? node.getAttributeNS(fullname.space, fullname.local)
	        : node.getAttribute(fullname);
	  }
	
	  return this.each((value == null
	      ? (fullname.local ? attrRemoveNS : attrRemove) : (typeof value === "function"
	      ? (fullname.local ? attrFunctionNS : attrFunction)
	      : (fullname.local ? attrConstantNS : attrConstant)))(fullname, value));
	};
	
	var defaultView = function(node) {
	  return (node.ownerDocument && node.ownerDocument.defaultView) // node is a Node
	      || (node.document && node) // node is a Window
	      || node.defaultView; // node is a Document
	};
	
	function styleRemove(name) {
	  return function() {
	    this.style.removeProperty(name);
	  };
	}
	
	function styleConstant(name, value, priority) {
	  return function() {
	    this.style.setProperty(name, value, priority);
	  };
	}
	
	function styleFunction(name, value, priority) {
	  return function() {
	    var v = value.apply(this, arguments);
	    if (v == null) this.style.removeProperty(name);
	    else this.style.setProperty(name, v, priority);
	  };
	}
	
	var selection_style = function(name, value, priority) {
	  var node;
	  return arguments.length > 1
	      ? this.each((value == null
	            ? styleRemove : typeof value === "function"
	            ? styleFunction
	            : styleConstant)(name, value, priority == null ? "" : priority))
	      : defaultView(node = this.node())
	          .getComputedStyle(node, null)
	          .getPropertyValue(name);
	};
	
	function propertyRemove(name) {
	  return function() {
	    delete this[name];
	  };
	}
	
	function propertyConstant(name, value) {
	  return function() {
	    this[name] = value;
	  };
	}
	
	function propertyFunction(name, value) {
	  return function() {
	    var v = value.apply(this, arguments);
	    if (v == null) delete this[name];
	    else this[name] = v;
	  };
	}
	
	var selection_property = function(name, value) {
	  return arguments.length > 1
	      ? this.each((value == null
	          ? propertyRemove : typeof value === "function"
	          ? propertyFunction
	          : propertyConstant)(name, value))
	      : this.node()[name];
	};
	
	function classArray(string) {
	  return string.trim().split(/^|\s+/);
	}
	
	function classList(node) {
	  return node.classList || new ClassList(node);
	}
	
	function ClassList(node) {
	  this._node = node;
	  this._names = classArray(node.getAttribute("class") || "");
	}
	
	ClassList.prototype = {
	  add: function(name) {
	    var i = this._names.indexOf(name);
	    if (i < 0) {
	      this._names.push(name);
	      this._node.setAttribute("class", this._names.join(" "));
	    }
	  },
	  remove: function(name) {
	    var i = this._names.indexOf(name);
	    if (i >= 0) {
	      this._names.splice(i, 1);
	      this._node.setAttribute("class", this._names.join(" "));
	    }
	  },
	  contains: function(name) {
	    return this._names.indexOf(name) >= 0;
	  }
	};
	
	function classedAdd(node, names) {
	  var list = classList(node), i = -1, n = names.length;
	  while (++i < n) list.add(names[i]);
	}
	
	function classedRemove(node, names) {
	  var list = classList(node), i = -1, n = names.length;
	  while (++i < n) list.remove(names[i]);
	}
	
	function classedTrue(names) {
	  return function() {
	    classedAdd(this, names);
	  };
	}
	
	function classedFalse(names) {
	  return function() {
	    classedRemove(this, names);
	  };
	}
	
	function classedFunction(names, value) {
	  return function() {
	    (value.apply(this, arguments) ? classedAdd : classedRemove)(this, names);
	  };
	}
	
	var selection_classed = function(name, value) {
	  var names = classArray(name + "");
	
	  if (arguments.length < 2) {
	    var list = classList(this.node()), i = -1, n = names.length;
	    while (++i < n) if (!list.contains(names[i])) return false;
	    return true;
	  }
	
	  return this.each((typeof value === "function"
	      ? classedFunction : value
	      ? classedTrue
	      : classedFalse)(names, value));
	};
	
	function textRemove() {
	  this.textContent = "";
	}
	
	function textConstant(value) {
	  return function() {
	    this.textContent = value;
	  };
	}
	
	function textFunction(value) {
	  return function() {
	    var v = value.apply(this, arguments);
	    this.textContent = v == null ? "" : v;
	  };
	}
	
	var selection_text = function(value) {
	  return arguments.length
	      ? this.each(value == null
	          ? textRemove : (typeof value === "function"
	          ? textFunction
	          : textConstant)(value))
	      : this.node().textContent;
	};
	
	function htmlRemove() {
	  this.innerHTML = "";
	}
	
	function htmlConstant(value) {
	  return function() {
	    this.innerHTML = value;
	  };
	}
	
	function htmlFunction(value) {
	  return function() {
	    var v = value.apply(this, arguments);
	    this.innerHTML = v == null ? "" : v;
	  };
	}
	
	var selection_html = function(value) {
	  return arguments.length
	      ? this.each(value == null
	          ? htmlRemove : (typeof value === "function"
	          ? htmlFunction
	          : htmlConstant)(value))
	      : this.node().innerHTML;
	};
	
	function raise() {
	  if (this.nextSibling) this.parentNode.appendChild(this);
	}
	
	var selection_raise = function() {
	  return this.each(raise);
	};
	
	function lower() {
	  if (this.previousSibling) this.parentNode.insertBefore(this, this.parentNode.firstChild);
	}
	
	var selection_lower = function() {
	  return this.each(lower);
	};
	
	var selection_append = function(name) {
	  var create = typeof name === "function" ? name : creator(name);
	  return this.select(function() {
	    return this.appendChild(create.apply(this, arguments));
	  });
	};
	
	function constantNull() {
	  return null;
	}
	
	var selection_insert = function(name, before) {
	  var create = typeof name === "function" ? name : creator(name),
	      select = before == null ? constantNull : typeof before === "function" ? before : selector(before);
	  return this.select(function() {
	    return this.insertBefore(create.apply(this, arguments), select.apply(this, arguments) || null);
	  });
	};
	
	function remove() {
	  var parent = this.parentNode;
	  if (parent) parent.removeChild(this);
	}
	
	var selection_remove = function() {
	  return this.each(remove);
	};
	
	var selection_datum = function(value) {
	  return arguments.length
	      ? this.property("__data__", value)
	      : this.node().__data__;
	};
	
	function dispatchEvent(node, type, params) {
	  var window = defaultView(node),
	      event = window.CustomEvent;
	
	  if (event) {
	    event = new event(type, params);
	  } else {
	    event = window.document.createEvent("Event");
	    if (params) event.initEvent(type, params.bubbles, params.cancelable), event.detail = params.detail;
	    else event.initEvent(type, false, false);
	  }
	
	  node.dispatchEvent(event);
	}
	
	function dispatchConstant(type, params) {
	  return function() {
	    return dispatchEvent(this, type, params);
	  };
	}
	
	function dispatchFunction(type, params) {
	  return function() {
	    return dispatchEvent(this, type, params.apply(this, arguments));
	  };
	}
	
	var selection_dispatch = function(type, params) {
	  return this.each((typeof params === "function"
	      ? dispatchFunction
	      : dispatchConstant)(type, params));
	};
	
	var root = [null];
	
	function Selection(groups, parents) {
	  this._groups = groups;
	  this._parents = parents;
	}
	
	function selection() {
	  return new Selection([[document.documentElement]], root);
	}
	
	Selection.prototype = selection.prototype = {
	  constructor: Selection,
	  select: selection_select,
	  selectAll: selection_selectAll,
	  filter: selection_filter,
	  data: selection_data,
	  enter: selection_enter,
	  exit: selection_exit,
	  merge: selection_merge,
	  order: selection_order,
	  sort: selection_sort,
	  call: selection_call,
	  nodes: selection_nodes,
	  node: selection_node,
	  size: selection_size,
	  empty: selection_empty,
	  each: selection_each,
	  attr: selection_attr,
	  style: selection_style,
	  property: selection_property,
	  classed: selection_classed,
	  text: selection_text,
	  html: selection_html,
	  raise: selection_raise,
	  lower: selection_lower,
	  append: selection_append,
	  insert: selection_insert,
	  remove: selection_remove,
	  datum: selection_datum,
	  on: selection_on,
	  dispatch: selection_dispatch
	};
	
	var select = function(selector) {
	  return typeof selector === "string"
	      ? new Selection([[document.querySelector(selector)]], [document.documentElement])
	      : new Selection([[selector]], root);
	};
	
	var selectAll = function(selector) {
	  return typeof selector === "string"
	      ? new Selection([document.querySelectorAll(selector)], [document.documentElement])
	      : new Selection([selector == null ? [] : selector], root);
	};
	
	var touch = function(node, touches, identifier) {
	  if (arguments.length < 3) identifier = touches, touches = sourceEvent().changedTouches;
	
	  for (var i = 0, n = touches ? touches.length : 0, touch; i < n; ++i) {
	    if ((touch = touches[i]).identifier === identifier) {
	      return point(node, touch);
	    }
	  }
	
	  return null;
	};
	
	var touches = function(node, touches) {
	  if (touches == null) touches = sourceEvent().touches;
	
	  for (var i = 0, n = touches ? touches.length : 0, points = new Array(n); i < n; ++i) {
	    points[i] = point(node, touches[i]);
	  }
	
	  return points;
	};
	
	exports.creator = creator;
	exports.local = local;
	exports.matcher = matcher$1;
	exports.mouse = mouse;
	exports.namespace = namespace;
	exports.namespaces = namespaces;
	exports.select = select;
	exports.selectAll = selectAll;
	exports.selection = selection;
	exports.selector = selector;
	exports.selectorAll = selectorAll;
	exports.touch = touch;
	exports.touches = touches;
	exports.window = defaultView;
	exports.customEvent = customEvent;
	
	Object.defineProperty(exports, '__esModule', { value: true });
	
	})));


/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	// https://d3js.org/d3-shape/ Version 1.0.4. Copyright 2016 Mike Bostock.
	(function (global, factory) {
	   true ? factory(exports, __webpack_require__(12)) :
	  typeof define === 'function' && define.amd ? define(['exports', 'd3-path'], factory) :
	  (factory((global.d3 = global.d3 || {}),global.d3));
	}(this, (function (exports,d3Path) { 'use strict';
	
	var constant$1 = function(x) {
	  return function constant() {
	    return x;
	  };
	};
	
	var epsilon = 1e-12;
	var pi = Math.PI;
	var halfPi = pi / 2;
	var tau = 2 * pi;
	
	function arcInnerRadius(d) {
	  return d.innerRadius;
	}
	
	function arcOuterRadius(d) {
	  return d.outerRadius;
	}
	
	function arcStartAngle(d) {
	  return d.startAngle;
	}
	
	function arcEndAngle(d) {
	  return d.endAngle;
	}
	
	function arcPadAngle(d) {
	  return d && d.padAngle; // Note: optional!
	}
	
	function asin(x) {
	  return x >= 1 ? halfPi : x <= -1 ? -halfPi : Math.asin(x);
	}
	
	function intersect(x0, y0, x1, y1, x2, y2, x3, y3) {
	  var x10 = x1 - x0, y10 = y1 - y0,
	      x32 = x3 - x2, y32 = y3 - y2,
	      t = (x32 * (y0 - y2) - y32 * (x0 - x2)) / (y32 * x10 - x32 * y10);
	  return [x0 + t * x10, y0 + t * y10];
	}
	
	// Compute perpendicular offset line of length rc.
	// http://mathworld.wolfram.com/Circle-LineIntersection.html
	function cornerTangents(x0, y0, x1, y1, r1, rc, cw) {
	  var x01 = x0 - x1,
	      y01 = y0 - y1,
	      lo = (cw ? rc : -rc) / Math.sqrt(x01 * x01 + y01 * y01),
	      ox = lo * y01,
	      oy = -lo * x01,
	      x11 = x0 + ox,
	      y11 = y0 + oy,
	      x10 = x1 + ox,
	      y10 = y1 + oy,
	      x00 = (x11 + x10) / 2,
	      y00 = (y11 + y10) / 2,
	      dx = x10 - x11,
	      dy = y10 - y11,
	      d2 = dx * dx + dy * dy,
	      r = r1 - rc,
	      D = x11 * y10 - x10 * y11,
	      d = (dy < 0 ? -1 : 1) * Math.sqrt(Math.max(0, r * r * d2 - D * D)),
	      cx0 = (D * dy - dx * d) / d2,
	      cy0 = (-D * dx - dy * d) / d2,
	      cx1 = (D * dy + dx * d) / d2,
	      cy1 = (-D * dx + dy * d) / d2,
	      dx0 = cx0 - x00,
	      dy0 = cy0 - y00,
	      dx1 = cx1 - x00,
	      dy1 = cy1 - y00;
	
	  // Pick the closer of the two intersection points.
	  // TODO Is there a faster way to determine which intersection to use?
	  if (dx0 * dx0 + dy0 * dy0 > dx1 * dx1 + dy1 * dy1) cx0 = cx1, cy0 = cy1;
	
	  return {
	    cx: cx0,
	    cy: cy0,
	    x01: -ox,
	    y01: -oy,
	    x11: cx0 * (r1 / r - 1),
	    y11: cy0 * (r1 / r - 1)
	  };
	}
	
	var arc = function() {
	  var innerRadius = arcInnerRadius,
	      outerRadius = arcOuterRadius,
	      cornerRadius = constant$1(0),
	      padRadius = null,
	      startAngle = arcStartAngle,
	      endAngle = arcEndAngle,
	      padAngle = arcPadAngle,
	      context = null;
	
	  function arc() {
	    var buffer,
	        r,
	        r0 = +innerRadius.apply(this, arguments),
	        r1 = +outerRadius.apply(this, arguments),
	        a0 = startAngle.apply(this, arguments) - halfPi,
	        a1 = endAngle.apply(this, arguments) - halfPi,
	        da = Math.abs(a1 - a0),
	        cw = a1 > a0;
	
	    if (!context) context = buffer = d3Path.path();
	
	    // Ensure that the outer radius is always larger than the inner radius.
	    if (r1 < r0) r = r1, r1 = r0, r0 = r;
	
	    // Is it a point?
	    if (!(r1 > epsilon)) context.moveTo(0, 0);
	
	    // Or is it a circle or annulus?
	    else if (da > tau - epsilon) {
	      context.moveTo(r1 * Math.cos(a0), r1 * Math.sin(a0));
	      context.arc(0, 0, r1, a0, a1, !cw);
	      if (r0 > epsilon) {
	        context.moveTo(r0 * Math.cos(a1), r0 * Math.sin(a1));
	        context.arc(0, 0, r0, a1, a0, cw);
	      }
	    }
	
	    // Or is it a circular or annular sector?
	    else {
	      var a01 = a0,
	          a11 = a1,
	          a00 = a0,
	          a10 = a1,
	          da0 = da,
	          da1 = da,
	          ap = padAngle.apply(this, arguments) / 2,
	          rp = (ap > epsilon) && (padRadius ? +padRadius.apply(this, arguments) : Math.sqrt(r0 * r0 + r1 * r1)),
	          rc = Math.min(Math.abs(r1 - r0) / 2, +cornerRadius.apply(this, arguments)),
	          rc0 = rc,
	          rc1 = rc,
	          t0,
	          t1;
	
	      // Apply padding? Note that since r1 ≥ r0, da1 ≥ da0.
	      if (rp > epsilon) {
	        var p0 = asin(rp / r0 * Math.sin(ap)),
	            p1 = asin(rp / r1 * Math.sin(ap));
	        if ((da0 -= p0 * 2) > epsilon) p0 *= (cw ? 1 : -1), a00 += p0, a10 -= p0;
	        else da0 = 0, a00 = a10 = (a0 + a1) / 2;
	        if ((da1 -= p1 * 2) > epsilon) p1 *= (cw ? 1 : -1), a01 += p1, a11 -= p1;
	        else da1 = 0, a01 = a11 = (a0 + a1) / 2;
	      }
	
	      var x01 = r1 * Math.cos(a01),
	          y01 = r1 * Math.sin(a01),
	          x10 = r0 * Math.cos(a10),
	          y10 = r0 * Math.sin(a10);
	
	      // Apply rounded corners?
	      if (rc > epsilon) {
	        var x11 = r1 * Math.cos(a11),
	            y11 = r1 * Math.sin(a11),
	            x00 = r0 * Math.cos(a00),
	            y00 = r0 * Math.sin(a00);
	
	        // Restrict the corner radius according to the sector angle.
	        if (da < pi) {
	          var oc = da0 > epsilon ? intersect(x01, y01, x00, y00, x11, y11, x10, y10) : [x10, y10],
	              ax = x01 - oc[0],
	              ay = y01 - oc[1],
	              bx = x11 - oc[0],
	              by = y11 - oc[1],
	              kc = 1 / Math.sin(Math.acos((ax * bx + ay * by) / (Math.sqrt(ax * ax + ay * ay) * Math.sqrt(bx * bx + by * by))) / 2),
	              lc = Math.sqrt(oc[0] * oc[0] + oc[1] * oc[1]);
	          rc0 = Math.min(rc, (r0 - lc) / (kc - 1));
	          rc1 = Math.min(rc, (r1 - lc) / (kc + 1));
	        }
	      }
	
	      // Is the sector collapsed to a line?
	      if (!(da1 > epsilon)) context.moveTo(x01, y01);
	
	      // Does the sector’s outer ring have rounded corners?
	      else if (rc1 > epsilon) {
	        t0 = cornerTangents(x00, y00, x01, y01, r1, rc1, cw);
	        t1 = cornerTangents(x11, y11, x10, y10, r1, rc1, cw);
	
	        context.moveTo(t0.cx + t0.x01, t0.cy + t0.y01);
	
	        // Have the corners merged?
	        if (rc1 < rc) context.arc(t0.cx, t0.cy, rc1, Math.atan2(t0.y01, t0.x01), Math.atan2(t1.y01, t1.x01), !cw);
	
	        // Otherwise, draw the two corners and the ring.
	        else {
	          context.arc(t0.cx, t0.cy, rc1, Math.atan2(t0.y01, t0.x01), Math.atan2(t0.y11, t0.x11), !cw);
	          context.arc(0, 0, r1, Math.atan2(t0.cy + t0.y11, t0.cx + t0.x11), Math.atan2(t1.cy + t1.y11, t1.cx + t1.x11), !cw);
	          context.arc(t1.cx, t1.cy, rc1, Math.atan2(t1.y11, t1.x11), Math.atan2(t1.y01, t1.x01), !cw);
	        }
	      }
	
	      // Or is the outer ring just a circular arc?
	      else context.moveTo(x01, y01), context.arc(0, 0, r1, a01, a11, !cw);
	
	      // Is there no inner ring, and it’s a circular sector?
	      // Or perhaps it’s an annular sector collapsed due to padding?
	      if (!(r0 > epsilon) || !(da0 > epsilon)) context.lineTo(x10, y10);
	
	      // Does the sector’s inner ring (or point) have rounded corners?
	      else if (rc0 > epsilon) {
	        t0 = cornerTangents(x10, y10, x11, y11, r0, -rc0, cw);
	        t1 = cornerTangents(x01, y01, x00, y00, r0, -rc0, cw);
	
	        context.lineTo(t0.cx + t0.x01, t0.cy + t0.y01);
	
	        // Have the corners merged?
	        if (rc0 < rc) context.arc(t0.cx, t0.cy, rc0, Math.atan2(t0.y01, t0.x01), Math.atan2(t1.y01, t1.x01), !cw);
	
	        // Otherwise, draw the two corners and the ring.
	        else {
	          context.arc(t0.cx, t0.cy, rc0, Math.atan2(t0.y01, t0.x01), Math.atan2(t0.y11, t0.x11), !cw);
	          context.arc(0, 0, r0, Math.atan2(t0.cy + t0.y11, t0.cx + t0.x11), Math.atan2(t1.cy + t1.y11, t1.cx + t1.x11), cw);
	          context.arc(t1.cx, t1.cy, rc0, Math.atan2(t1.y11, t1.x11), Math.atan2(t1.y01, t1.x01), !cw);
	        }
	      }
	
	      // Or is the inner ring just a circular arc?
	      else context.arc(0, 0, r0, a10, a00, cw);
	    }
	
	    context.closePath();
	
	    if (buffer) return context = null, buffer + "" || null;
	  }
	
	  arc.centroid = function() {
	    var r = (+innerRadius.apply(this, arguments) + +outerRadius.apply(this, arguments)) / 2,
	        a = (+startAngle.apply(this, arguments) + +endAngle.apply(this, arguments)) / 2 - pi / 2;
	    return [Math.cos(a) * r, Math.sin(a) * r];
	  };
	
	  arc.innerRadius = function(_) {
	    return arguments.length ? (innerRadius = typeof _ === "function" ? _ : constant$1(+_), arc) : innerRadius;
	  };
	
	  arc.outerRadius = function(_) {
	    return arguments.length ? (outerRadius = typeof _ === "function" ? _ : constant$1(+_), arc) : outerRadius;
	  };
	
	  arc.cornerRadius = function(_) {
	    return arguments.length ? (cornerRadius = typeof _ === "function" ? _ : constant$1(+_), arc) : cornerRadius;
	  };
	
	  arc.padRadius = function(_) {
	    return arguments.length ? (padRadius = _ == null ? null : typeof _ === "function" ? _ : constant$1(+_), arc) : padRadius;
	  };
	
	  arc.startAngle = function(_) {
	    return arguments.length ? (startAngle = typeof _ === "function" ? _ : constant$1(+_), arc) : startAngle;
	  };
	
	  arc.endAngle = function(_) {
	    return arguments.length ? (endAngle = typeof _ === "function" ? _ : constant$1(+_), arc) : endAngle;
	  };
	
	  arc.padAngle = function(_) {
	    return arguments.length ? (padAngle = typeof _ === "function" ? _ : constant$1(+_), arc) : padAngle;
	  };
	
	  arc.context = function(_) {
	    return arguments.length ? ((context = _ == null ? null : _), arc) : context;
	  };
	
	  return arc;
	};
	
	function Linear(context) {
	  this._context = context;
	}
	
	Linear.prototype = {
	  areaStart: function() {
	    this._line = 0;
	  },
	  areaEnd: function() {
	    this._line = NaN;
	  },
	  lineStart: function() {
	    this._point = 0;
	  },
	  lineEnd: function() {
	    if (this._line || (this._line !== 0 && this._point === 1)) this._context.closePath();
	    this._line = 1 - this._line;
	  },
	  point: function(x, y) {
	    x = +x, y = +y;
	    switch (this._point) {
	      case 0: this._point = 1; this._line ? this._context.lineTo(x, y) : this._context.moveTo(x, y); break;
	      case 1: this._point = 2; // proceed
	      default: this._context.lineTo(x, y); break;
	    }
	  }
	};
	
	var curveLinear = function(context) {
	  return new Linear(context);
	};
	
	function x(p) {
	  return p[0];
	}
	
	function y(p) {
	  return p[1];
	}
	
	var line = function() {
	  var x$$1 = x,
	      y$$1 = y,
	      defined = constant$1(true),
	      context = null,
	      curve = curveLinear,
	      output = null;
	
	  function line(data) {
	    var i,
	        n = data.length,
	        d,
	        defined0 = false,
	        buffer;
	
	    if (context == null) output = curve(buffer = d3Path.path());
	
	    for (i = 0; i <= n; ++i) {
	      if (!(i < n && defined(d = data[i], i, data)) === defined0) {
	        if (defined0 = !defined0) output.lineStart();
	        else output.lineEnd();
	      }
	      if (defined0) output.point(+x$$1(d, i, data), +y$$1(d, i, data));
	    }
	
	    if (buffer) return output = null, buffer + "" || null;
	  }
	
	  line.x = function(_) {
	    return arguments.length ? (x$$1 = typeof _ === "function" ? _ : constant$1(+_), line) : x$$1;
	  };
	
	  line.y = function(_) {
	    return arguments.length ? (y$$1 = typeof _ === "function" ? _ : constant$1(+_), line) : y$$1;
	  };
	
	  line.defined = function(_) {
	    return arguments.length ? (defined = typeof _ === "function" ? _ : constant$1(!!_), line) : defined;
	  };
	
	  line.curve = function(_) {
	    return arguments.length ? (curve = _, context != null && (output = curve(context)), line) : curve;
	  };
	
	  line.context = function(_) {
	    return arguments.length ? (_ == null ? context = output = null : output = curve(context = _), line) : context;
	  };
	
	  return line;
	};
	
	var area = function() {
	  var x0 = x,
	      x1 = null,
	      y0 = constant$1(0),
	      y1 = y,
	      defined = constant$1(true),
	      context = null,
	      curve = curveLinear,
	      output = null;
	
	  function area(data) {
	    var i,
	        j,
	        k,
	        n = data.length,
	        d,
	        defined0 = false,
	        buffer,
	        x0z = new Array(n),
	        y0z = new Array(n);
	
	    if (context == null) output = curve(buffer = d3Path.path());
	
	    for (i = 0; i <= n; ++i) {
	      if (!(i < n && defined(d = data[i], i, data)) === defined0) {
	        if (defined0 = !defined0) {
	          j = i;
	          output.areaStart();
	          output.lineStart();
	        } else {
	          output.lineEnd();
	          output.lineStart();
	          for (k = i - 1; k >= j; --k) {
	            output.point(x0z[k], y0z[k]);
	          }
	          output.lineEnd();
	          output.areaEnd();
	        }
	      }
	      if (defined0) {
	        x0z[i] = +x0(d, i, data), y0z[i] = +y0(d, i, data);
	        output.point(x1 ? +x1(d, i, data) : x0z[i], y1 ? +y1(d, i, data) : y0z[i]);
	      }
	    }
	
	    if (buffer) return output = null, buffer + "" || null;
	  }
	
	  function arealine() {
	    return line().defined(defined).curve(curve).context(context);
	  }
	
	  area.x = function(_) {
	    return arguments.length ? (x0 = typeof _ === "function" ? _ : constant$1(+_), x1 = null, area) : x0;
	  };
	
	  area.x0 = function(_) {
	    return arguments.length ? (x0 = typeof _ === "function" ? _ : constant$1(+_), area) : x0;
	  };
	
	  area.x1 = function(_) {
	    return arguments.length ? (x1 = _ == null ? null : typeof _ === "function" ? _ : constant$1(+_), area) : x1;
	  };
	
	  area.y = function(_) {
	    return arguments.length ? (y0 = typeof _ === "function" ? _ : constant$1(+_), y1 = null, area) : y0;
	  };
	
	  area.y0 = function(_) {
	    return arguments.length ? (y0 = typeof _ === "function" ? _ : constant$1(+_), area) : y0;
	  };
	
	  area.y1 = function(_) {
	    return arguments.length ? (y1 = _ == null ? null : typeof _ === "function" ? _ : constant$1(+_), area) : y1;
	  };
	
	  area.lineX0 =
	  area.lineY0 = function() {
	    return arealine().x(x0).y(y0);
	  };
	
	  area.lineY1 = function() {
	    return arealine().x(x0).y(y1);
	  };
	
	  area.lineX1 = function() {
	    return arealine().x(x1).y(y0);
	  };
	
	  area.defined = function(_) {
	    return arguments.length ? (defined = typeof _ === "function" ? _ : constant$1(!!_), area) : defined;
	  };
	
	  area.curve = function(_) {
	    return arguments.length ? (curve = _, context != null && (output = curve(context)), area) : curve;
	  };
	
	  area.context = function(_) {
	    return arguments.length ? (_ == null ? context = output = null : output = curve(context = _), area) : context;
	  };
	
	  return area;
	};
	
	var descending = function(a, b) {
	  return b < a ? -1 : b > a ? 1 : b >= a ? 0 : NaN;
	};
	
	var identity = function(d) {
	  return d;
	};
	
	var pie = function() {
	  var value = identity,
	      sortValues = descending,
	      sort = null,
	      startAngle = constant$1(0),
	      endAngle = constant$1(tau),
	      padAngle = constant$1(0);
	
	  function pie(data) {
	    var i,
	        n = data.length,
	        j,
	        k,
	        sum = 0,
	        index = new Array(n),
	        arcs = new Array(n),
	        a0 = +startAngle.apply(this, arguments),
	        da = Math.min(tau, Math.max(-tau, endAngle.apply(this, arguments) - a0)),
	        a1,
	        p = Math.min(Math.abs(da) / n, padAngle.apply(this, arguments)),
	        pa = p * (da < 0 ? -1 : 1),
	        v;
	
	    for (i = 0; i < n; ++i) {
	      if ((v = arcs[index[i] = i] = +value(data[i], i, data)) > 0) {
	        sum += v;
	      }
	    }
	
	    // Optionally sort the arcs by previously-computed values or by data.
	    if (sortValues != null) index.sort(function(i, j) { return sortValues(arcs[i], arcs[j]); });
	    else if (sort != null) index.sort(function(i, j) { return sort(data[i], data[j]); });
	
	    // Compute the arcs! They are stored in the original data's order.
	    for (i = 0, k = sum ? (da - n * pa) / sum : 0; i < n; ++i, a0 = a1) {
	      j = index[i], v = arcs[j], a1 = a0 + (v > 0 ? v * k : 0) + pa, arcs[j] = {
	        data: data[j],
	        index: i,
	        value: v,
	        startAngle: a0,
	        endAngle: a1,
	        padAngle: p
	      };
	    }
	
	    return arcs;
	  }
	
	  pie.value = function(_) {
	    return arguments.length ? (value = typeof _ === "function" ? _ : constant$1(+_), pie) : value;
	  };
	
	  pie.sortValues = function(_) {
	    return arguments.length ? (sortValues = _, sort = null, pie) : sortValues;
	  };
	
	  pie.sort = function(_) {
	    return arguments.length ? (sort = _, sortValues = null, pie) : sort;
	  };
	
	  pie.startAngle = function(_) {
	    return arguments.length ? (startAngle = typeof _ === "function" ? _ : constant$1(+_), pie) : startAngle;
	  };
	
	  pie.endAngle = function(_) {
	    return arguments.length ? (endAngle = typeof _ === "function" ? _ : constant$1(+_), pie) : endAngle;
	  };
	
	  pie.padAngle = function(_) {
	    return arguments.length ? (padAngle = typeof _ === "function" ? _ : constant$1(+_), pie) : padAngle;
	  };
	
	  return pie;
	};
	
	var curveRadialLinear = curveRadial(curveLinear);
	
	function Radial(curve) {
	  this._curve = curve;
	}
	
	Radial.prototype = {
	  areaStart: function() {
	    this._curve.areaStart();
	  },
	  areaEnd: function() {
	    this._curve.areaEnd();
	  },
	  lineStart: function() {
	    this._curve.lineStart();
	  },
	  lineEnd: function() {
	    this._curve.lineEnd();
	  },
	  point: function(a, r) {
	    this._curve.point(r * Math.sin(a), r * -Math.cos(a));
	  }
	};
	
	function curveRadial(curve) {
	
	  function radial(context) {
	    return new Radial(curve(context));
	  }
	
	  radial._curve = curve;
	
	  return radial;
	}
	
	function radialLine(l) {
	  var c = l.curve;
	
	  l.angle = l.x, delete l.x;
	  l.radius = l.y, delete l.y;
	
	  l.curve = function(_) {
	    return arguments.length ? c(curveRadial(_)) : c()._curve;
	  };
	
	  return l;
	}
	
	var radialLine$1 = function() {
	  return radialLine(line().curve(curveRadialLinear));
	};
	
	var radialArea = function() {
	  var a = area().curve(curveRadialLinear),
	      c = a.curve,
	      x0 = a.lineX0,
	      x1 = a.lineX1,
	      y0 = a.lineY0,
	      y1 = a.lineY1;
	
	  a.angle = a.x, delete a.x;
	  a.startAngle = a.x0, delete a.x0;
	  a.endAngle = a.x1, delete a.x1;
	  a.radius = a.y, delete a.y;
	  a.innerRadius = a.y0, delete a.y0;
	  a.outerRadius = a.y1, delete a.y1;
	  a.lineStartAngle = function() { return radialLine(x0()); }, delete a.lineX0;
	  a.lineEndAngle = function() { return radialLine(x1()); }, delete a.lineX1;
	  a.lineInnerRadius = function() { return radialLine(y0()); }, delete a.lineY0;
	  a.lineOuterRadius = function() { return radialLine(y1()); }, delete a.lineY1;
	
	  a.curve = function(_) {
	    return arguments.length ? c(curveRadial(_)) : c()._curve;
	  };
	
	  return a;
	};
	
	var circle = {
	  draw: function(context, size) {
	    var r = Math.sqrt(size / pi);
	    context.moveTo(r, 0);
	    context.arc(0, 0, r, 0, tau);
	  }
	};
	
	var cross = {
	  draw: function(context, size) {
	    var r = Math.sqrt(size / 5) / 2;
	    context.moveTo(-3 * r, -r);
	    context.lineTo(-r, -r);
	    context.lineTo(-r, -3 * r);
	    context.lineTo(r, -3 * r);
	    context.lineTo(r, -r);
	    context.lineTo(3 * r, -r);
	    context.lineTo(3 * r, r);
	    context.lineTo(r, r);
	    context.lineTo(r, 3 * r);
	    context.lineTo(-r, 3 * r);
	    context.lineTo(-r, r);
	    context.lineTo(-3 * r, r);
	    context.closePath();
	  }
	};
	
	var tan30 = Math.sqrt(1 / 3);
	var tan30_2 = tan30 * 2;
	
	var diamond = {
	  draw: function(context, size) {
	    var y = Math.sqrt(size / tan30_2),
	        x = y * tan30;
	    context.moveTo(0, -y);
	    context.lineTo(x, 0);
	    context.lineTo(0, y);
	    context.lineTo(-x, 0);
	    context.closePath();
	  }
	};
	
	var ka = 0.89081309152928522810;
	var kr = Math.sin(pi / 10) / Math.sin(7 * pi / 10);
	var kx = Math.sin(tau / 10) * kr;
	var ky = -Math.cos(tau / 10) * kr;
	
	var star = {
	  draw: function(context, size) {
	    var r = Math.sqrt(size * ka),
	        x = kx * r,
	        y = ky * r;
	    context.moveTo(0, -r);
	    context.lineTo(x, y);
	    for (var i = 1; i < 5; ++i) {
	      var a = tau * i / 5,
	          c = Math.cos(a),
	          s = Math.sin(a);
	      context.lineTo(s * r, -c * r);
	      context.lineTo(c * x - s * y, s * x + c * y);
	    }
	    context.closePath();
	  }
	};
	
	var square = {
	  draw: function(context, size) {
	    var w = Math.sqrt(size),
	        x = -w / 2;
	    context.rect(x, x, w, w);
	  }
	};
	
	var sqrt3 = Math.sqrt(3);
	
	var triangle = {
	  draw: function(context, size) {
	    var y = -Math.sqrt(size / (sqrt3 * 3));
	    context.moveTo(0, y * 2);
	    context.lineTo(-sqrt3 * y, -y);
	    context.lineTo(sqrt3 * y, -y);
	    context.closePath();
	  }
	};
	
	var c = -0.5;
	var s = Math.sqrt(3) / 2;
	var k = 1 / Math.sqrt(12);
	var a = (k / 2 + 1) * 3;
	
	var wye = {
	  draw: function(context, size) {
	    var r = Math.sqrt(size / a),
	        x0 = r / 2,
	        y0 = r * k,
	        x1 = x0,
	        y1 = r * k + r,
	        x2 = -x1,
	        y2 = y1;
	    context.moveTo(x0, y0);
	    context.lineTo(x1, y1);
	    context.lineTo(x2, y2);
	    context.lineTo(c * x0 - s * y0, s * x0 + c * y0);
	    context.lineTo(c * x1 - s * y1, s * x1 + c * y1);
	    context.lineTo(c * x2 - s * y2, s * x2 + c * y2);
	    context.lineTo(c * x0 + s * y0, c * y0 - s * x0);
	    context.lineTo(c * x1 + s * y1, c * y1 - s * x1);
	    context.lineTo(c * x2 + s * y2, c * y2 - s * x2);
	    context.closePath();
	  }
	};
	
	var symbols = [
	  circle,
	  cross,
	  diamond,
	  square,
	  star,
	  triangle,
	  wye
	];
	
	var symbol = function() {
	  var type = constant$1(circle),
	      size = constant$1(64),
	      context = null;
	
	  function symbol() {
	    var buffer;
	    if (!context) context = buffer = d3Path.path();
	    type.apply(this, arguments).draw(context, +size.apply(this, arguments));
	    if (buffer) return context = null, buffer + "" || null;
	  }
	
	  symbol.type = function(_) {
	    return arguments.length ? (type = typeof _ === "function" ? _ : constant$1(_), symbol) : type;
	  };
	
	  symbol.size = function(_) {
	    return arguments.length ? (size = typeof _ === "function" ? _ : constant$1(+_), symbol) : size;
	  };
	
	  symbol.context = function(_) {
	    return arguments.length ? (context = _ == null ? null : _, symbol) : context;
	  };
	
	  return symbol;
	};
	
	var noop = function() {};
	
	function point(that, x, y) {
	  that._context.bezierCurveTo(
	    (2 * that._x0 + that._x1) / 3,
	    (2 * that._y0 + that._y1) / 3,
	    (that._x0 + 2 * that._x1) / 3,
	    (that._y0 + 2 * that._y1) / 3,
	    (that._x0 + 4 * that._x1 + x) / 6,
	    (that._y0 + 4 * that._y1 + y) / 6
	  );
	}
	
	function Basis(context) {
	  this._context = context;
	}
	
	Basis.prototype = {
	  areaStart: function() {
	    this._line = 0;
	  },
	  areaEnd: function() {
	    this._line = NaN;
	  },
	  lineStart: function() {
	    this._x0 = this._x1 =
	    this._y0 = this._y1 = NaN;
	    this._point = 0;
	  },
	  lineEnd: function() {
	    switch (this._point) {
	      case 3: point(this, this._x1, this._y1); // proceed
	      case 2: this._context.lineTo(this._x1, this._y1); break;
	    }
	    if (this._line || (this._line !== 0 && this._point === 1)) this._context.closePath();
	    this._line = 1 - this._line;
	  },
	  point: function(x, y) {
	    x = +x, y = +y;
	    switch (this._point) {
	      case 0: this._point = 1; this._line ? this._context.lineTo(x, y) : this._context.moveTo(x, y); break;
	      case 1: this._point = 2; break;
	      case 2: this._point = 3; this._context.lineTo((5 * this._x0 + this._x1) / 6, (5 * this._y0 + this._y1) / 6); // proceed
	      default: point(this, x, y); break;
	    }
	    this._x0 = this._x1, this._x1 = x;
	    this._y0 = this._y1, this._y1 = y;
	  }
	};
	
	var basis = function(context) {
	  return new Basis(context);
	};
	
	function BasisClosed(context) {
	  this._context = context;
	}
	
	BasisClosed.prototype = {
	  areaStart: noop,
	  areaEnd: noop,
	  lineStart: function() {
	    this._x0 = this._x1 = this._x2 = this._x3 = this._x4 =
	    this._y0 = this._y1 = this._y2 = this._y3 = this._y4 = NaN;
	    this._point = 0;
	  },
	  lineEnd: function() {
	    switch (this._point) {
	      case 1: {
	        this._context.moveTo(this._x2, this._y2);
	        this._context.closePath();
	        break;
	      }
	      case 2: {
	        this._context.moveTo((this._x2 + 2 * this._x3) / 3, (this._y2 + 2 * this._y3) / 3);
	        this._context.lineTo((this._x3 + 2 * this._x2) / 3, (this._y3 + 2 * this._y2) / 3);
	        this._context.closePath();
	        break;
	      }
	      case 3: {
	        this.point(this._x2, this._y2);
	        this.point(this._x3, this._y3);
	        this.point(this._x4, this._y4);
	        break;
	      }
	    }
	  },
	  point: function(x, y) {
	    x = +x, y = +y;
	    switch (this._point) {
	      case 0: this._point = 1; this._x2 = x, this._y2 = y; break;
	      case 1: this._point = 2; this._x3 = x, this._y3 = y; break;
	      case 2: this._point = 3; this._x4 = x, this._y4 = y; this._context.moveTo((this._x0 + 4 * this._x1 + x) / 6, (this._y0 + 4 * this._y1 + y) / 6); break;
	      default: point(this, x, y); break;
	    }
	    this._x0 = this._x1, this._x1 = x;
	    this._y0 = this._y1, this._y1 = y;
	  }
	};
	
	var basisClosed = function(context) {
	  return new BasisClosed(context);
	};
	
	function BasisOpen(context) {
	  this._context = context;
	}
	
	BasisOpen.prototype = {
	  areaStart: function() {
	    this._line = 0;
	  },
	  areaEnd: function() {
	    this._line = NaN;
	  },
	  lineStart: function() {
	    this._x0 = this._x1 =
	    this._y0 = this._y1 = NaN;
	    this._point = 0;
	  },
	  lineEnd: function() {
	    if (this._line || (this._line !== 0 && this._point === 3)) this._context.closePath();
	    this._line = 1 - this._line;
	  },
	  point: function(x, y) {
	    x = +x, y = +y;
	    switch (this._point) {
	      case 0: this._point = 1; break;
	      case 1: this._point = 2; break;
	      case 2: this._point = 3; var x0 = (this._x0 + 4 * this._x1 + x) / 6, y0 = (this._y0 + 4 * this._y1 + y) / 6; this._line ? this._context.lineTo(x0, y0) : this._context.moveTo(x0, y0); break;
	      case 3: this._point = 4; // proceed
	      default: point(this, x, y); break;
	    }
	    this._x0 = this._x1, this._x1 = x;
	    this._y0 = this._y1, this._y1 = y;
	  }
	};
	
	var basisOpen = function(context) {
	  return new BasisOpen(context);
	};
	
	function Bundle(context, beta) {
	  this._basis = new Basis(context);
	  this._beta = beta;
	}
	
	Bundle.prototype = {
	  lineStart: function() {
	    this._x = [];
	    this._y = [];
	    this._basis.lineStart();
	  },
	  lineEnd: function() {
	    var x = this._x,
	        y = this._y,
	        j = x.length - 1;
	
	    if (j > 0) {
	      var x0 = x[0],
	          y0 = y[0],
	          dx = x[j] - x0,
	          dy = y[j] - y0,
	          i = -1,
	          t;
	
	      while (++i <= j) {
	        t = i / j;
	        this._basis.point(
	          this._beta * x[i] + (1 - this._beta) * (x0 + t * dx),
	          this._beta * y[i] + (1 - this._beta) * (y0 + t * dy)
	        );
	      }
	    }
	
	    this._x = this._y = null;
	    this._basis.lineEnd();
	  },
	  point: function(x, y) {
	    this._x.push(+x);
	    this._y.push(+y);
	  }
	};
	
	var bundle = (function custom(beta) {
	
	  function bundle(context) {
	    return beta === 1 ? new Basis(context) : new Bundle(context, beta);
	  }
	
	  bundle.beta = function(beta) {
	    return custom(+beta);
	  };
	
	  return bundle;
	})(0.85);
	
	function point$1(that, x, y) {
	  that._context.bezierCurveTo(
	    that._x1 + that._k * (that._x2 - that._x0),
	    that._y1 + that._k * (that._y2 - that._y0),
	    that._x2 + that._k * (that._x1 - x),
	    that._y2 + that._k * (that._y1 - y),
	    that._x2,
	    that._y2
	  );
	}
	
	function Cardinal(context, tension) {
	  this._context = context;
	  this._k = (1 - tension) / 6;
	}
	
	Cardinal.prototype = {
	  areaStart: function() {
	    this._line = 0;
	  },
	  areaEnd: function() {
	    this._line = NaN;
	  },
	  lineStart: function() {
	    this._x0 = this._x1 = this._x2 =
	    this._y0 = this._y1 = this._y2 = NaN;
	    this._point = 0;
	  },
	  lineEnd: function() {
	    switch (this._point) {
	      case 2: this._context.lineTo(this._x2, this._y2); break;
	      case 3: point$1(this, this._x1, this._y1); break;
	    }
	    if (this._line || (this._line !== 0 && this._point === 1)) this._context.closePath();
	    this._line = 1 - this._line;
	  },
	  point: function(x, y) {
	    x = +x, y = +y;
	    switch (this._point) {
	      case 0: this._point = 1; this._line ? this._context.lineTo(x, y) : this._context.moveTo(x, y); break;
	      case 1: this._point = 2; this._x1 = x, this._y1 = y; break;
	      case 2: this._point = 3; // proceed
	      default: point$1(this, x, y); break;
	    }
	    this._x0 = this._x1, this._x1 = this._x2, this._x2 = x;
	    this._y0 = this._y1, this._y1 = this._y2, this._y2 = y;
	  }
	};
	
	var cardinal = (function custom(tension) {
	
	  function cardinal(context) {
	    return new Cardinal(context, tension);
	  }
	
	  cardinal.tension = function(tension) {
	    return custom(+tension);
	  };
	
	  return cardinal;
	})(0);
	
	function CardinalClosed(context, tension) {
	  this._context = context;
	  this._k = (1 - tension) / 6;
	}
	
	CardinalClosed.prototype = {
	  areaStart: noop,
	  areaEnd: noop,
	  lineStart: function() {
	    this._x0 = this._x1 = this._x2 = this._x3 = this._x4 = this._x5 =
	    this._y0 = this._y1 = this._y2 = this._y3 = this._y4 = this._y5 = NaN;
	    this._point = 0;
	  },
	  lineEnd: function() {
	    switch (this._point) {
	      case 1: {
	        this._context.moveTo(this._x3, this._y3);
	        this._context.closePath();
	        break;
	      }
	      case 2: {
	        this._context.lineTo(this._x3, this._y3);
	        this._context.closePath();
	        break;
	      }
	      case 3: {
	        this.point(this._x3, this._y3);
	        this.point(this._x4, this._y4);
	        this.point(this._x5, this._y5);
	        break;
	      }
	    }
	  },
	  point: function(x, y) {
	    x = +x, y = +y;
	    switch (this._point) {
	      case 0: this._point = 1; this._x3 = x, this._y3 = y; break;
	      case 1: this._point = 2; this._context.moveTo(this._x4 = x, this._y4 = y); break;
	      case 2: this._point = 3; this._x5 = x, this._y5 = y; break;
	      default: point$1(this, x, y); break;
	    }
	    this._x0 = this._x1, this._x1 = this._x2, this._x2 = x;
	    this._y0 = this._y1, this._y1 = this._y2, this._y2 = y;
	  }
	};
	
	var cardinalClosed = (function custom(tension) {
	
	  function cardinal(context) {
	    return new CardinalClosed(context, tension);
	  }
	
	  cardinal.tension = function(tension) {
	    return custom(+tension);
	  };
	
	  return cardinal;
	})(0);
	
	function CardinalOpen(context, tension) {
	  this._context = context;
	  this._k = (1 - tension) / 6;
	}
	
	CardinalOpen.prototype = {
	  areaStart: function() {
	    this._line = 0;
	  },
	  areaEnd: function() {
	    this._line = NaN;
	  },
	  lineStart: function() {
	    this._x0 = this._x1 = this._x2 =
	    this._y0 = this._y1 = this._y2 = NaN;
	    this._point = 0;
	  },
	  lineEnd: function() {
	    if (this._line || (this._line !== 0 && this._point === 3)) this._context.closePath();
	    this._line = 1 - this._line;
	  },
	  point: function(x, y) {
	    x = +x, y = +y;
	    switch (this._point) {
	      case 0: this._point = 1; break;
	      case 1: this._point = 2; break;
	      case 2: this._point = 3; this._line ? this._context.lineTo(this._x2, this._y2) : this._context.moveTo(this._x2, this._y2); break;
	      case 3: this._point = 4; // proceed
	      default: point$1(this, x, y); break;
	    }
	    this._x0 = this._x1, this._x1 = this._x2, this._x2 = x;
	    this._y0 = this._y1, this._y1 = this._y2, this._y2 = y;
	  }
	};
	
	var cardinalOpen = (function custom(tension) {
	
	  function cardinal(context) {
	    return new CardinalOpen(context, tension);
	  }
	
	  cardinal.tension = function(tension) {
	    return custom(+tension);
	  };
	
	  return cardinal;
	})(0);
	
	function point$2(that, x, y) {
	  var x1 = that._x1,
	      y1 = that._y1,
	      x2 = that._x2,
	      y2 = that._y2;
	
	  if (that._l01_a > epsilon) {
	    var a = 2 * that._l01_2a + 3 * that._l01_a * that._l12_a + that._l12_2a,
	        n = 3 * that._l01_a * (that._l01_a + that._l12_a);
	    x1 = (x1 * a - that._x0 * that._l12_2a + that._x2 * that._l01_2a) / n;
	    y1 = (y1 * a - that._y0 * that._l12_2a + that._y2 * that._l01_2a) / n;
	  }
	
	  if (that._l23_a > epsilon) {
	    var b = 2 * that._l23_2a + 3 * that._l23_a * that._l12_a + that._l12_2a,
	        m = 3 * that._l23_a * (that._l23_a + that._l12_a);
	    x2 = (x2 * b + that._x1 * that._l23_2a - x * that._l12_2a) / m;
	    y2 = (y2 * b + that._y1 * that._l23_2a - y * that._l12_2a) / m;
	  }
	
	  that._context.bezierCurveTo(x1, y1, x2, y2, that._x2, that._y2);
	}
	
	function CatmullRom(context, alpha) {
	  this._context = context;
	  this._alpha = alpha;
	}
	
	CatmullRom.prototype = {
	  areaStart: function() {
	    this._line = 0;
	  },
	  areaEnd: function() {
	    this._line = NaN;
	  },
	  lineStart: function() {
	    this._x0 = this._x1 = this._x2 =
	    this._y0 = this._y1 = this._y2 = NaN;
	    this._l01_a = this._l12_a = this._l23_a =
	    this._l01_2a = this._l12_2a = this._l23_2a =
	    this._point = 0;
	  },
	  lineEnd: function() {
	    switch (this._point) {
	      case 2: this._context.lineTo(this._x2, this._y2); break;
	      case 3: this.point(this._x2, this._y2); break;
	    }
	    if (this._line || (this._line !== 0 && this._point === 1)) this._context.closePath();
	    this._line = 1 - this._line;
	  },
	  point: function(x, y) {
	    x = +x, y = +y;
	
	    if (this._point) {
	      var x23 = this._x2 - x,
	          y23 = this._y2 - y;
	      this._l23_a = Math.sqrt(this._l23_2a = Math.pow(x23 * x23 + y23 * y23, this._alpha));
	    }
	
	    switch (this._point) {
	      case 0: this._point = 1; this._line ? this._context.lineTo(x, y) : this._context.moveTo(x, y); break;
	      case 1: this._point = 2; break;
	      case 2: this._point = 3; // proceed
	      default: point$2(this, x, y); break;
	    }
	
	    this._l01_a = this._l12_a, this._l12_a = this._l23_a;
	    this._l01_2a = this._l12_2a, this._l12_2a = this._l23_2a;
	    this._x0 = this._x1, this._x1 = this._x2, this._x2 = x;
	    this._y0 = this._y1, this._y1 = this._y2, this._y2 = y;
	  }
	};
	
	var catmullRom = (function custom(alpha) {
	
	  function catmullRom(context) {
	    return alpha ? new CatmullRom(context, alpha) : new Cardinal(context, 0);
	  }
	
	  catmullRom.alpha = function(alpha) {
	    return custom(+alpha);
	  };
	
	  return catmullRom;
	})(0.5);
	
	function CatmullRomClosed(context, alpha) {
	  this._context = context;
	  this._alpha = alpha;
	}
	
	CatmullRomClosed.prototype = {
	  areaStart: noop,
	  areaEnd: noop,
	  lineStart: function() {
	    this._x0 = this._x1 = this._x2 = this._x3 = this._x4 = this._x5 =
	    this._y0 = this._y1 = this._y2 = this._y3 = this._y4 = this._y5 = NaN;
	    this._l01_a = this._l12_a = this._l23_a =
	    this._l01_2a = this._l12_2a = this._l23_2a =
	    this._point = 0;
	  },
	  lineEnd: function() {
	    switch (this._point) {
	      case 1: {
	        this._context.moveTo(this._x3, this._y3);
	        this._context.closePath();
	        break;
	      }
	      case 2: {
	        this._context.lineTo(this._x3, this._y3);
	        this._context.closePath();
	        break;
	      }
	      case 3: {
	        this.point(this._x3, this._y3);
	        this.point(this._x4, this._y4);
	        this.point(this._x5, this._y5);
	        break;
	      }
	    }
	  },
	  point: function(x, y) {
	    x = +x, y = +y;
	
	    if (this._point) {
	      var x23 = this._x2 - x,
	          y23 = this._y2 - y;
	      this._l23_a = Math.sqrt(this._l23_2a = Math.pow(x23 * x23 + y23 * y23, this._alpha));
	    }
	
	    switch (this._point) {
	      case 0: this._point = 1; this._x3 = x, this._y3 = y; break;
	      case 1: this._point = 2; this._context.moveTo(this._x4 = x, this._y4 = y); break;
	      case 2: this._point = 3; this._x5 = x, this._y5 = y; break;
	      default: point$2(this, x, y); break;
	    }
	
	    this._l01_a = this._l12_a, this._l12_a = this._l23_a;
	    this._l01_2a = this._l12_2a, this._l12_2a = this._l23_2a;
	    this._x0 = this._x1, this._x1 = this._x2, this._x2 = x;
	    this._y0 = this._y1, this._y1 = this._y2, this._y2 = y;
	  }
	};
	
	var catmullRomClosed = (function custom(alpha) {
	
	  function catmullRom(context) {
	    return alpha ? new CatmullRomClosed(context, alpha) : new CardinalClosed(context, 0);
	  }
	
	  catmullRom.alpha = function(alpha) {
	    return custom(+alpha);
	  };
	
	  return catmullRom;
	})(0.5);
	
	function CatmullRomOpen(context, alpha) {
	  this._context = context;
	  this._alpha = alpha;
	}
	
	CatmullRomOpen.prototype = {
	  areaStart: function() {
	    this._line = 0;
	  },
	  areaEnd: function() {
	    this._line = NaN;
	  },
	  lineStart: function() {
	    this._x0 = this._x1 = this._x2 =
	    this._y0 = this._y1 = this._y2 = NaN;
	    this._l01_a = this._l12_a = this._l23_a =
	    this._l01_2a = this._l12_2a = this._l23_2a =
	    this._point = 0;
	  },
	  lineEnd: function() {
	    if (this._line || (this._line !== 0 && this._point === 3)) this._context.closePath();
	    this._line = 1 - this._line;
	  },
	  point: function(x, y) {
	    x = +x, y = +y;
	
	    if (this._point) {
	      var x23 = this._x2 - x,
	          y23 = this._y2 - y;
	      this._l23_a = Math.sqrt(this._l23_2a = Math.pow(x23 * x23 + y23 * y23, this._alpha));
	    }
	
	    switch (this._point) {
	      case 0: this._point = 1; break;
	      case 1: this._point = 2; break;
	      case 2: this._point = 3; this._line ? this._context.lineTo(this._x2, this._y2) : this._context.moveTo(this._x2, this._y2); break;
	      case 3: this._point = 4; // proceed
	      default: point$2(this, x, y); break;
	    }
	
	    this._l01_a = this._l12_a, this._l12_a = this._l23_a;
	    this._l01_2a = this._l12_2a, this._l12_2a = this._l23_2a;
	    this._x0 = this._x1, this._x1 = this._x2, this._x2 = x;
	    this._y0 = this._y1, this._y1 = this._y2, this._y2 = y;
	  }
	};
	
	var catmullRomOpen = (function custom(alpha) {
	
	  function catmullRom(context) {
	    return alpha ? new CatmullRomOpen(context, alpha) : new CardinalOpen(context, 0);
	  }
	
	  catmullRom.alpha = function(alpha) {
	    return custom(+alpha);
	  };
	
	  return catmullRom;
	})(0.5);
	
	function LinearClosed(context) {
	  this._context = context;
	}
	
	LinearClosed.prototype = {
	  areaStart: noop,
	  areaEnd: noop,
	  lineStart: function() {
	    this._point = 0;
	  },
	  lineEnd: function() {
	    if (this._point) this._context.closePath();
	  },
	  point: function(x, y) {
	    x = +x, y = +y;
	    if (this._point) this._context.lineTo(x, y);
	    else this._point = 1, this._context.moveTo(x, y);
	  }
	};
	
	var linearClosed = function(context) {
	  return new LinearClosed(context);
	};
	
	function sign(x) {
	  return x < 0 ? -1 : 1;
	}
	
	// Calculate the slopes of the tangents (Hermite-type interpolation) based on
	// the following paper: Steffen, M. 1990. A Simple Method for Monotonic
	// Interpolation in One Dimension. Astronomy and Astrophysics, Vol. 239, NO.
	// NOV(II), P. 443, 1990.
	function slope3(that, x2, y2) {
	  var h0 = that._x1 - that._x0,
	      h1 = x2 - that._x1,
	      s0 = (that._y1 - that._y0) / (h0 || h1 < 0 && -0),
	      s1 = (y2 - that._y1) / (h1 || h0 < 0 && -0),
	      p = (s0 * h1 + s1 * h0) / (h0 + h1);
	  return (sign(s0) + sign(s1)) * Math.min(Math.abs(s0), Math.abs(s1), 0.5 * Math.abs(p)) || 0;
	}
	
	// Calculate a one-sided slope.
	function slope2(that, t) {
	  var h = that._x1 - that._x0;
	  return h ? (3 * (that._y1 - that._y0) / h - t) / 2 : t;
	}
	
	// According to https://en.wikipedia.org/wiki/Cubic_Hermite_spline#Representations
	// "you can express cubic Hermite interpolation in terms of cubic Bézier curves
	// with respect to the four values p0, p0 + m0 / 3, p1 - m1 / 3, p1".
	function point$3(that, t0, t1) {
	  var x0 = that._x0,
	      y0 = that._y0,
	      x1 = that._x1,
	      y1 = that._y1,
	      dx = (x1 - x0) / 3;
	  that._context.bezierCurveTo(x0 + dx, y0 + dx * t0, x1 - dx, y1 - dx * t1, x1, y1);
	}
	
	function MonotoneX(context) {
	  this._context = context;
	}
	
	MonotoneX.prototype = {
	  areaStart: function() {
	    this._line = 0;
	  },
	  areaEnd: function() {
	    this._line = NaN;
	  },
	  lineStart: function() {
	    this._x0 = this._x1 =
	    this._y0 = this._y1 =
	    this._t0 = NaN;
	    this._point = 0;
	  },
	  lineEnd: function() {
	    switch (this._point) {
	      case 2: this._context.lineTo(this._x1, this._y1); break;
	      case 3: point$3(this, this._t0, slope2(this, this._t0)); break;
	    }
	    if (this._line || (this._line !== 0 && this._point === 1)) this._context.closePath();
	    this._line = 1 - this._line;
	  },
	  point: function(x, y) {
	    var t1 = NaN;
	
	    x = +x, y = +y;
	    if (x === this._x1 && y === this._y1) return; // Ignore coincident points.
	    switch (this._point) {
	      case 0: this._point = 1; this._line ? this._context.lineTo(x, y) : this._context.moveTo(x, y); break;
	      case 1: this._point = 2; break;
	      case 2: this._point = 3; point$3(this, slope2(this, t1 = slope3(this, x, y)), t1); break;
	      default: point$3(this, this._t0, t1 = slope3(this, x, y)); break;
	    }
	
	    this._x0 = this._x1, this._x1 = x;
	    this._y0 = this._y1, this._y1 = y;
	    this._t0 = t1;
	  }
	};
	
	function MonotoneY(context) {
	  this._context = new ReflectContext(context);
	}
	
	(MonotoneY.prototype = Object.create(MonotoneX.prototype)).point = function(x, y) {
	  MonotoneX.prototype.point.call(this, y, x);
	};
	
	function ReflectContext(context) {
	  this._context = context;
	}
	
	ReflectContext.prototype = {
	  moveTo: function(x, y) { this._context.moveTo(y, x); },
	  closePath: function() { this._context.closePath(); },
	  lineTo: function(x, y) { this._context.lineTo(y, x); },
	  bezierCurveTo: function(x1, y1, x2, y2, x, y) { this._context.bezierCurveTo(y1, x1, y2, x2, y, x); }
	};
	
	function monotoneX(context) {
	  return new MonotoneX(context);
	}
	
	function monotoneY(context) {
	  return new MonotoneY(context);
	}
	
	function Natural(context) {
	  this._context = context;
	}
	
	Natural.prototype = {
	  areaStart: function() {
	    this._line = 0;
	  },
	  areaEnd: function() {
	    this._line = NaN;
	  },
	  lineStart: function() {
	    this._x = [];
	    this._y = [];
	  },
	  lineEnd: function() {
	    var x = this._x,
	        y = this._y,
	        n = x.length;
	
	    if (n) {
	      this._line ? this._context.lineTo(x[0], y[0]) : this._context.moveTo(x[0], y[0]);
	      if (n === 2) {
	        this._context.lineTo(x[1], y[1]);
	      } else {
	        var px = controlPoints(x),
	            py = controlPoints(y);
	        for (var i0 = 0, i1 = 1; i1 < n; ++i0, ++i1) {
	          this._context.bezierCurveTo(px[0][i0], py[0][i0], px[1][i0], py[1][i0], x[i1], y[i1]);
	        }
	      }
	    }
	
	    if (this._line || (this._line !== 0 && n === 1)) this._context.closePath();
	    this._line = 1 - this._line;
	    this._x = this._y = null;
	  },
	  point: function(x, y) {
	    this._x.push(+x);
	    this._y.push(+y);
	  }
	};
	
	// See https://www.particleincell.com/2012/bezier-splines/ for derivation.
	function controlPoints(x) {
	  var i,
	      n = x.length - 1,
	      m,
	      a = new Array(n),
	      b = new Array(n),
	      r = new Array(n);
	  a[0] = 0, b[0] = 2, r[0] = x[0] + 2 * x[1];
	  for (i = 1; i < n - 1; ++i) a[i] = 1, b[i] = 4, r[i] = 4 * x[i] + 2 * x[i + 1];
	  a[n - 1] = 2, b[n - 1] = 7, r[n - 1] = 8 * x[n - 1] + x[n];
	  for (i = 1; i < n; ++i) m = a[i] / b[i - 1], b[i] -= m, r[i] -= m * r[i - 1];
	  a[n - 1] = r[n - 1] / b[n - 1];
	  for (i = n - 2; i >= 0; --i) a[i] = (r[i] - a[i + 1]) / b[i];
	  b[n - 1] = (x[n] + a[n - 1]) / 2;
	  for (i = 0; i < n - 1; ++i) b[i] = 2 * x[i + 1] - a[i + 1];
	  return [a, b];
	}
	
	var natural = function(context) {
	  return new Natural(context);
	};
	
	function Step(context, t) {
	  this._context = context;
	  this._t = t;
	}
	
	Step.prototype = {
	  areaStart: function() {
	    this._line = 0;
	  },
	  areaEnd: function() {
	    this._line = NaN;
	  },
	  lineStart: function() {
	    this._x = this._y = NaN;
	    this._point = 0;
	  },
	  lineEnd: function() {
	    if (0 < this._t && this._t < 1 && this._point === 2) this._context.lineTo(this._x, this._y);
	    if (this._line || (this._line !== 0 && this._point === 1)) this._context.closePath();
	    if (this._line >= 0) this._t = 1 - this._t, this._line = 1 - this._line;
	  },
	  point: function(x, y) {
	    x = +x, y = +y;
	    switch (this._point) {
	      case 0: this._point = 1; this._line ? this._context.lineTo(x, y) : this._context.moveTo(x, y); break;
	      case 1: this._point = 2; // proceed
	      default: {
	        if (this._t <= 0) {
	          this._context.lineTo(this._x, y);
	          this._context.lineTo(x, y);
	        } else {
	          var x1 = this._x * (1 - this._t) + x * this._t;
	          this._context.lineTo(x1, this._y);
	          this._context.lineTo(x1, y);
	        }
	        break;
	      }
	    }
	    this._x = x, this._y = y;
	  }
	};
	
	var step = function(context) {
	  return new Step(context, 0.5);
	};
	
	function stepBefore(context) {
	  return new Step(context, 0);
	}
	
	function stepAfter(context) {
	  return new Step(context, 1);
	}
	
	var slice = Array.prototype.slice;
	
	var none = function(series, order) {
	  if (!((n = series.length) > 1)) return;
	  for (var i = 1, s0, s1 = series[order[0]], n, m = s1.length; i < n; ++i) {
	    s0 = s1, s1 = series[order[i]];
	    for (var j = 0; j < m; ++j) {
	      s1[j][1] += s1[j][0] = isNaN(s0[j][1]) ? s0[j][0] : s0[j][1];
	    }
	  }
	};
	
	var none$1 = function(series) {
	  var n = series.length, o = new Array(n);
	  while (--n >= 0) o[n] = n;
	  return o;
	};
	
	function stackValue(d, key) {
	  return d[key];
	}
	
	var stack = function() {
	  var keys = constant$1([]),
	      order = none$1,
	      offset = none,
	      value = stackValue;
	
	  function stack(data) {
	    var kz = keys.apply(this, arguments),
	        i,
	        m = data.length,
	        n = kz.length,
	        sz = new Array(n),
	        oz;
	
	    for (i = 0; i < n; ++i) {
	      for (var ki = kz[i], si = sz[i] = new Array(m), j = 0, sij; j < m; ++j) {
	        si[j] = sij = [0, +value(data[j], ki, j, data)];
	        sij.data = data[j];
	      }
	      si.key = ki;
	    }
	
	    for (i = 0, oz = order(sz); i < n; ++i) {
	      sz[oz[i]].index = i;
	    }
	
	    offset(sz, oz);
	    return sz;
	  }
	
	  stack.keys = function(_) {
	    return arguments.length ? (keys = typeof _ === "function" ? _ : constant$1(slice.call(_)), stack) : keys;
	  };
	
	  stack.value = function(_) {
	    return arguments.length ? (value = typeof _ === "function" ? _ : constant$1(+_), stack) : value;
	  };
	
	  stack.order = function(_) {
	    return arguments.length ? (order = _ == null ? none$1 : typeof _ === "function" ? _ : constant$1(slice.call(_)), stack) : order;
	  };
	
	  stack.offset = function(_) {
	    return arguments.length ? (offset = _ == null ? none : _, stack) : offset;
	  };
	
	  return stack;
	};
	
	var expand = function(series, order) {
	  if (!((n = series.length) > 0)) return;
	  for (var i, n, j = 0, m = series[0].length, y; j < m; ++j) {
	    for (y = i = 0; i < n; ++i) y += series[i][j][1] || 0;
	    if (y) for (i = 0; i < n; ++i) series[i][j][1] /= y;
	  }
	  none(series, order);
	};
	
	var silhouette = function(series, order) {
	  if (!((n = series.length) > 0)) return;
	  for (var j = 0, s0 = series[order[0]], n, m = s0.length; j < m; ++j) {
	    for (var i = 0, y = 0; i < n; ++i) y += series[i][j][1] || 0;
	    s0[j][1] += s0[j][0] = -y / 2;
	  }
	  none(series, order);
	};
	
	var wiggle = function(series, order) {
	  if (!((n = series.length) > 0) || !((m = (s0 = series[order[0]]).length) > 0)) return;
	  for (var y = 0, j = 1, s0, m, n; j < m; ++j) {
	    for (var i = 0, s1 = 0, s2 = 0; i < n; ++i) {
	      var si = series[order[i]],
	          sij0 = si[j][1] || 0,
	          sij1 = si[j - 1][1] || 0,
	          s3 = (sij0 - sij1) / 2;
	      for (var k = 0; k < i; ++k) {
	        var sk = series[order[k]],
	            skj0 = sk[j][1] || 0,
	            skj1 = sk[j - 1][1] || 0;
	        s3 += skj0 - skj1;
	      }
	      s1 += sij0, s2 += s3 * sij0;
	    }
	    s0[j - 1][1] += s0[j - 1][0] = y;
	    if (s1) y -= s2 / s1;
	  }
	  s0[j - 1][1] += s0[j - 1][0] = y;
	  none(series, order);
	};
	
	var ascending = function(series) {
	  var sums = series.map(sum);
	  return none$1(series).sort(function(a, b) { return sums[a] - sums[b]; });
	};
	
	function sum(series) {
	  var s = 0, i = -1, n = series.length, v;
	  while (++i < n) if (v = +series[i][1]) s += v;
	  return s;
	}
	
	var descending$1 = function(series) {
	  return ascending(series).reverse();
	};
	
	var insideOut = function(series) {
	  var n = series.length,
	      i,
	      j,
	      sums = series.map(sum),
	      order = none$1(series).sort(function(a, b) { return sums[b] - sums[a]; }),
	      top = 0,
	      bottom = 0,
	      tops = [],
	      bottoms = [];
	
	  for (i = 0; i < n; ++i) {
	    j = order[i];
	    if (top < bottom) {
	      top += sums[j];
	      tops.push(j);
	    } else {
	      bottom += sums[j];
	      bottoms.push(j);
	    }
	  }
	
	  return bottoms.reverse().concat(tops);
	};
	
	var reverse = function(series) {
	  return none$1(series).reverse();
	};
	
	exports.arc = arc;
	exports.area = area;
	exports.line = line;
	exports.pie = pie;
	exports.radialArea = radialArea;
	exports.radialLine = radialLine$1;
	exports.symbol = symbol;
	exports.symbols = symbols;
	exports.symbolCircle = circle;
	exports.symbolCross = cross;
	exports.symbolDiamond = diamond;
	exports.symbolSquare = square;
	exports.symbolStar = star;
	exports.symbolTriangle = triangle;
	exports.symbolWye = wye;
	exports.curveBasisClosed = basisClosed;
	exports.curveBasisOpen = basisOpen;
	exports.curveBasis = basis;
	exports.curveBundle = bundle;
	exports.curveCardinalClosed = cardinalClosed;
	exports.curveCardinalOpen = cardinalOpen;
	exports.curveCardinal = cardinal;
	exports.curveCatmullRomClosed = catmullRomClosed;
	exports.curveCatmullRomOpen = catmullRomOpen;
	exports.curveCatmullRom = catmullRom;
	exports.curveLinearClosed = linearClosed;
	exports.curveLinear = curveLinear;
	exports.curveMonotoneX = monotoneX;
	exports.curveMonotoneY = monotoneY;
	exports.curveNatural = natural;
	exports.curveStep = step;
	exports.curveStepAfter = stepAfter;
	exports.curveStepBefore = stepBefore;
	exports.stack = stack;
	exports.stackOffsetExpand = expand;
	exports.stackOffsetNone = none;
	exports.stackOffsetSilhouette = silhouette;
	exports.stackOffsetWiggle = wiggle;
	exports.stackOrderAscending = ascending;
	exports.stackOrderDescending = descending$1;
	exports.stackOrderInsideOut = insideOut;
	exports.stackOrderNone = none$1;
	exports.stackOrderReverse = reverse;
	
	Object.defineProperty(exports, '__esModule', { value: true });
	
	})));


/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	// https://d3js.org/d3-path/ Version 1.0.3. Copyright 2016 Mike Bostock.
	(function (global, factory) {
	   true ? factory(exports) :
	  typeof define === 'function' && define.amd ? define(['exports'], factory) :
	  (factory((global.d3 = global.d3 || {})));
	}(this, (function (exports) { 'use strict';
	
	var pi = Math.PI;
	var tau = 2 * pi;
	var epsilon = 1e-6;
	var tauEpsilon = tau - epsilon;
	
	function Path() {
	  this._x0 = this._y0 = // start of current subpath
	  this._x1 = this._y1 = null; // end of current subpath
	  this._ = "";
	}
	
	function path() {
	  return new Path;
	}
	
	Path.prototype = path.prototype = {
	  constructor: Path,
	  moveTo: function(x, y) {
	    this._ += "M" + (this._x0 = this._x1 = +x) + "," + (this._y0 = this._y1 = +y);
	  },
	  closePath: function() {
	    if (this._x1 !== null) {
	      this._x1 = this._x0, this._y1 = this._y0;
	      this._ += "Z";
	    }
	  },
	  lineTo: function(x, y) {
	    this._ += "L" + (this._x1 = +x) + "," + (this._y1 = +y);
	  },
	  quadraticCurveTo: function(x1, y1, x, y) {
	    this._ += "Q" + (+x1) + "," + (+y1) + "," + (this._x1 = +x) + "," + (this._y1 = +y);
	  },
	  bezierCurveTo: function(x1, y1, x2, y2, x, y) {
	    this._ += "C" + (+x1) + "," + (+y1) + "," + (+x2) + "," + (+y2) + "," + (this._x1 = +x) + "," + (this._y1 = +y);
	  },
	  arcTo: function(x1, y1, x2, y2, r) {
	    x1 = +x1, y1 = +y1, x2 = +x2, y2 = +y2, r = +r;
	    var x0 = this._x1,
	        y0 = this._y1,
	        x21 = x2 - x1,
	        y21 = y2 - y1,
	        x01 = x0 - x1,
	        y01 = y0 - y1,
	        l01_2 = x01 * x01 + y01 * y01;
	
	    // Is the radius negative? Error.
	    if (r < 0) throw new Error("negative radius: " + r);
	
	    // Is this path empty? Move to (x1,y1).
	    if (this._x1 === null) {
	      this._ += "M" + (this._x1 = x1) + "," + (this._y1 = y1);
	    }
	
	    // Or, is (x1,y1) coincident with (x0,y0)? Do nothing.
	    else if (!(l01_2 > epsilon)) {}
	
	    // Or, are (x0,y0), (x1,y1) and (x2,y2) collinear?
	    // Equivalently, is (x1,y1) coincident with (x2,y2)?
	    // Or, is the radius zero? Line to (x1,y1).
	    else if (!(Math.abs(y01 * x21 - y21 * x01) > epsilon) || !r) {
	      this._ += "L" + (this._x1 = x1) + "," + (this._y1 = y1);
	    }
	
	    // Otherwise, draw an arc!
	    else {
	      var x20 = x2 - x0,
	          y20 = y2 - y0,
	          l21_2 = x21 * x21 + y21 * y21,
	          l20_2 = x20 * x20 + y20 * y20,
	          l21 = Math.sqrt(l21_2),
	          l01 = Math.sqrt(l01_2),
	          l = r * Math.tan((pi - Math.acos((l21_2 + l01_2 - l20_2) / (2 * l21 * l01))) / 2),
	          t01 = l / l01,
	          t21 = l / l21;
	
	      // If the start tangent is not coincident with (x0,y0), line to.
	      if (Math.abs(t01 - 1) > epsilon) {
	        this._ += "L" + (x1 + t01 * x01) + "," + (y1 + t01 * y01);
	      }
	
	      this._ += "A" + r + "," + r + ",0,0," + (+(y01 * x20 > x01 * y20)) + "," + (this._x1 = x1 + t21 * x21) + "," + (this._y1 = y1 + t21 * y21);
	    }
	  },
	  arc: function(x, y, r, a0, a1, ccw) {
	    x = +x, y = +y, r = +r;
	    var dx = r * Math.cos(a0),
	        dy = r * Math.sin(a0),
	        x0 = x + dx,
	        y0 = y + dy,
	        cw = 1 ^ ccw,
	        da = ccw ? a0 - a1 : a1 - a0;
	
	    // Is the radius negative? Error.
	    if (r < 0) throw new Error("negative radius: " + r);
	
	    // Is this path empty? Move to (x0,y0).
	    if (this._x1 === null) {
	      this._ += "M" + x0 + "," + y0;
	    }
	
	    // Or, is (x0,y0) not coincident with the previous point? Line to (x0,y0).
	    else if (Math.abs(this._x1 - x0) > epsilon || Math.abs(this._y1 - y0) > epsilon) {
	      this._ += "L" + x0 + "," + y0;
	    }
	
	    // Is this arc empty? We’re done.
	    if (!r) return;
	
	    // Is this a complete circle? Draw two arcs to complete the circle.
	    if (da > tauEpsilon) {
	      this._ += "A" + r + "," + r + ",0,1," + cw + "," + (x - dx) + "," + (y - dy) + "A" + r + "," + r + ",0,1," + cw + "," + (this._x1 = x0) + "," + (this._y1 = y0);
	    }
	
	    // Otherwise, draw an arc!
	    else {
	      if (da < 0) da = da % tau + tau;
	      this._ += "A" + r + "," + r + ",0," + (+(da >= pi)) + "," + cw + "," + (this._x1 = x + r * Math.cos(a1)) + "," + (this._y1 = y + r * Math.sin(a1));
	    }
	  },
	  rect: function(x, y, w, h) {
	    this._ += "M" + (this._x0 = this._x1 = +x) + "," + (this._y0 = this._y1 = +y) + "h" + (+w) + "v" + (+h) + "h" + (-w) + "Z";
	  },
	  toString: function() {
	    return this._;
	  }
	};
	
	exports.path = path;
	
	Object.defineProperty(exports, '__esModule', { value: true });
	
	})));


/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	// https://d3js.org/d3-transition/ Version 1.0.3. Copyright 2016 Mike Bostock.
	(function (global, factory) {
	   true ? factory(exports, __webpack_require__(10), __webpack_require__(14), __webpack_require__(15), __webpack_require__(16), __webpack_require__(17), __webpack_require__(18)) :
	  typeof define === 'function' && define.amd ? define(['exports', 'd3-selection', 'd3-dispatch', 'd3-timer', 'd3-interpolate', 'd3-color', 'd3-ease'], factory) :
	  (factory((global.d3 = global.d3 || {}),global.d3,global.d3,global.d3,global.d3,global.d3,global.d3));
	}(this, (function (exports,d3Selection,d3Dispatch,d3Timer,d3Interpolate,d3Color,d3Ease) { 'use strict';
	
	var emptyOn = d3Dispatch.dispatch("start", "end", "interrupt");
	var emptyTween = [];
	
	var CREATED = 0;
	var SCHEDULED = 1;
	var STARTING = 2;
	var STARTED = 3;
	var RUNNING = 4;
	var ENDING = 5;
	var ENDED = 6;
	
	var schedule = function(node, name, id, index, group, timing) {
	  var schedules = node.__transition;
	  if (!schedules) node.__transition = {};
	  else if (id in schedules) return;
	  create(node, id, {
	    name: name,
	    index: index, // For context during callback.
	    group: group, // For context during callback.
	    on: emptyOn,
	    tween: emptyTween,
	    time: timing.time,
	    delay: timing.delay,
	    duration: timing.duration,
	    ease: timing.ease,
	    timer: null,
	    state: CREATED
	  });
	};
	
	function init(node, id) {
	  var schedule = node.__transition;
	  if (!schedule || !(schedule = schedule[id]) || schedule.state > CREATED) throw new Error("too late");
	  return schedule;
	}
	
	function set(node, id) {
	  var schedule = node.__transition;
	  if (!schedule || !(schedule = schedule[id]) || schedule.state > STARTING) throw new Error("too late");
	  return schedule;
	}
	
	function get(node, id) {
	  var schedule = node.__transition;
	  if (!schedule || !(schedule = schedule[id])) throw new Error("too late");
	  return schedule;
	}
	
	function create(node, id, self) {
	  var schedules = node.__transition,
	      tween;
	
	  // Initialize the self timer when the transition is created.
	  // Note the actual delay is not known until the first callback!
	  schedules[id] = self;
	  self.timer = d3Timer.timer(schedule, 0, self.time);
	
	  function schedule(elapsed) {
	    self.state = SCHEDULED;
	    self.timer.restart(start, self.delay, self.time);
	
	    // If the elapsed delay is less than our first sleep, start immediately.
	    if (self.delay <= elapsed) start(elapsed - self.delay);
	  }
	
	  function start(elapsed) {
	    var i, j, n, o;
	
	    // If the state is not SCHEDULED, then we previously errored on start.
	    if (self.state !== SCHEDULED) return stop();
	
	    for (i in schedules) {
	      o = schedules[i];
	      if (o.name !== self.name) continue;
	
	      // While this element already has a starting transition during this frame,
	      // defer starting an interrupting transition until that transition has a
	      // chance to tick (and possibly end); see d3/d3-transition#54!
	      if (o.state === STARTED) return d3Timer.timeout(start);
	
	      // Interrupt the active transition, if any.
	      // Dispatch the interrupt event.
	      if (o.state === RUNNING) {
	        o.state = ENDED;
	        o.timer.stop();
	        o.on.call("interrupt", node, node.__data__, o.index, o.group);
	        delete schedules[i];
	      }
	
	      // Cancel any pre-empted transitions. No interrupt event is dispatched
	      // because the cancelled transitions never started. Note that this also
	      // removes this transition from the pending list!
	      else if (+i < id) {
	        o.state = ENDED;
	        o.timer.stop();
	        delete schedules[i];
	      }
	    }
	
	    // Defer the first tick to end of the current frame; see d3/d3#1576.
	    // Note the transition may be canceled after start and before the first tick!
	    // Note this must be scheduled before the start event; see d3/d3-transition#16!
	    // Assuming this is successful, subsequent callbacks go straight to tick.
	    d3Timer.timeout(function() {
	      if (self.state === STARTED) {
	        self.state = RUNNING;
	        self.timer.restart(tick, self.delay, self.time);
	        tick(elapsed);
	      }
	    });
	
	    // Dispatch the start event.
	    // Note this must be done before the tween are initialized.
	    self.state = STARTING;
	    self.on.call("start", node, node.__data__, self.index, self.group);
	    if (self.state !== STARTING) return; // interrupted
	    self.state = STARTED;
	
	    // Initialize the tween, deleting null tween.
	    tween = new Array(n = self.tween.length);
	    for (i = 0, j = -1; i < n; ++i) {
	      if (o = self.tween[i].value.call(node, node.__data__, self.index, self.group)) {
	        tween[++j] = o;
	      }
	    }
	    tween.length = j + 1;
	  }
	
	  function tick(elapsed) {
	    var t = elapsed < self.duration ? self.ease.call(null, elapsed / self.duration) : (self.timer.restart(stop), self.state = ENDING, 1),
	        i = -1,
	        n = tween.length;
	
	    while (++i < n) {
	      tween[i].call(null, t);
	    }
	
	    // Dispatch the end event.
	    if (self.state === ENDING) {
	      self.on.call("end", node, node.__data__, self.index, self.group);
	      stop();
	    }
	  }
	
	  function stop() {
	    self.state = ENDED;
	    self.timer.stop();
	    delete schedules[id];
	    for (var i in schedules) return; // eslint-disable-line no-unused-vars
	    delete node.__transition;
	  }
	}
	
	var interrupt = function(node, name) {
	  var schedules = node.__transition,
	      schedule,
	      active,
	      empty = true,
	      i;
	
	  if (!schedules) return;
	
	  name = name == null ? null : name + "";
	
	  for (i in schedules) {
	    if ((schedule = schedules[i]).name !== name) { empty = false; continue; }
	    active = schedule.state > STARTING && schedule.state < ENDING;
	    schedule.state = ENDED;
	    schedule.timer.stop();
	    if (active) schedule.on.call("interrupt", node, node.__data__, schedule.index, schedule.group);
	    delete schedules[i];
	  }
	
	  if (empty) delete node.__transition;
	};
	
	var selection_interrupt = function(name) {
	  return this.each(function() {
	    interrupt(this, name);
	  });
	};
	
	function tweenRemove(id, name) {
	  var tween0, tween1;
	  return function() {
	    var schedule = set(this, id),
	        tween = schedule.tween;
	
	    // If this node shared tween with the previous node,
	    // just assign the updated shared tween and we’re done!
	    // Otherwise, copy-on-write.
	    if (tween !== tween0) {
	      tween1 = tween0 = tween;
	      for (var i = 0, n = tween1.length; i < n; ++i) {
	        if (tween1[i].name === name) {
	          tween1 = tween1.slice();
	          tween1.splice(i, 1);
	          break;
	        }
	      }
	    }
	
	    schedule.tween = tween1;
	  };
	}
	
	function tweenFunction(id, name, value) {
	  var tween0, tween1;
	  if (typeof value !== "function") throw new Error;
	  return function() {
	    var schedule = set(this, id),
	        tween = schedule.tween;
	
	    // If this node shared tween with the previous node,
	    // just assign the updated shared tween and we’re done!
	    // Otherwise, copy-on-write.
	    if (tween !== tween0) {
	      tween1 = (tween0 = tween).slice();
	      for (var t = {name: name, value: value}, i = 0, n = tween1.length; i < n; ++i) {
	        if (tween1[i].name === name) {
	          tween1[i] = t;
	          break;
	        }
	      }
	      if (i === n) tween1.push(t);
	    }
	
	    schedule.tween = tween1;
	  };
	}
	
	var transition_tween = function(name, value) {
	  var id = this._id;
	
	  name += "";
	
	  if (arguments.length < 2) {
	    var tween = get(this.node(), id).tween;
	    for (var i = 0, n = tween.length, t; i < n; ++i) {
	      if ((t = tween[i]).name === name) {
	        return t.value;
	      }
	    }
	    return null;
	  }
	
	  return this.each((value == null ? tweenRemove : tweenFunction)(id, name, value));
	};
	
	function tweenValue(transition, name, value) {
	  var id = transition._id;
	
	  transition.each(function() {
	    var schedule = set(this, id);
	    (schedule.value || (schedule.value = {}))[name] = value.apply(this, arguments);
	  });
	
	  return function(node) {
	    return get(node, id).value[name];
	  };
	}
	
	var interpolate = function(a, b) {
	  var c;
	  return (typeof b === "number" ? d3Interpolate.interpolateNumber
	      : b instanceof d3Color.color ? d3Interpolate.interpolateRgb
	      : (c = d3Color.color(b)) ? (b = c, d3Interpolate.interpolateRgb)
	      : d3Interpolate.interpolateString)(a, b);
	};
	
	function attrRemove(name) {
	  return function() {
	    this.removeAttribute(name);
	  };
	}
	
	function attrRemoveNS(fullname) {
	  return function() {
	    this.removeAttributeNS(fullname.space, fullname.local);
	  };
	}
	
	function attrConstant(name, interpolate$$1, value1) {
	  var value00,
	      interpolate0;
	  return function() {
	    var value0 = this.getAttribute(name);
	    return value0 === value1 ? null
	        : value0 === value00 ? interpolate0
	        : interpolate0 = interpolate$$1(value00 = value0, value1);
	  };
	}
	
	function attrConstantNS(fullname, interpolate$$1, value1) {
	  var value00,
	      interpolate0;
	  return function() {
	    var value0 = this.getAttributeNS(fullname.space, fullname.local);
	    return value0 === value1 ? null
	        : value0 === value00 ? interpolate0
	        : interpolate0 = interpolate$$1(value00 = value0, value1);
	  };
	}
	
	function attrFunction(name, interpolate$$1, value) {
	  var value00,
	      value10,
	      interpolate0;
	  return function() {
	    var value0, value1 = value(this);
	    if (value1 == null) return void this.removeAttribute(name);
	    value0 = this.getAttribute(name);
	    return value0 === value1 ? null
	        : value0 === value00 && value1 === value10 ? interpolate0
	        : interpolate0 = interpolate$$1(value00 = value0, value10 = value1);
	  };
	}
	
	function attrFunctionNS(fullname, interpolate$$1, value) {
	  var value00,
	      value10,
	      interpolate0;
	  return function() {
	    var value0, value1 = value(this);
	    if (value1 == null) return void this.removeAttributeNS(fullname.space, fullname.local);
	    value0 = this.getAttributeNS(fullname.space, fullname.local);
	    return value0 === value1 ? null
	        : value0 === value00 && value1 === value10 ? interpolate0
	        : interpolate0 = interpolate$$1(value00 = value0, value10 = value1);
	  };
	}
	
	var transition_attr = function(name, value) {
	  var fullname = d3Selection.namespace(name), i = fullname === "transform" ? d3Interpolate.interpolateTransformSvg : interpolate;
	  return this.attrTween(name, typeof value === "function"
	      ? (fullname.local ? attrFunctionNS : attrFunction)(fullname, i, tweenValue(this, "attr." + name, value))
	      : value == null ? (fullname.local ? attrRemoveNS : attrRemove)(fullname)
	      : (fullname.local ? attrConstantNS : attrConstant)(fullname, i, value));
	};
	
	function attrTweenNS(fullname, value) {
	  function tween() {
	    var node = this, i = value.apply(node, arguments);
	    return i && function(t) {
	      node.setAttributeNS(fullname.space, fullname.local, i(t));
	    };
	  }
	  tween._value = value;
	  return tween;
	}
	
	function attrTween(name, value) {
	  function tween() {
	    var node = this, i = value.apply(node, arguments);
	    return i && function(t) {
	      node.setAttribute(name, i(t));
	    };
	  }
	  tween._value = value;
	  return tween;
	}
	
	var transition_attrTween = function(name, value) {
	  var key = "attr." + name;
	  if (arguments.length < 2) return (key = this.tween(key)) && key._value;
	  if (value == null) return this.tween(key, null);
	  if (typeof value !== "function") throw new Error;
	  var fullname = d3Selection.namespace(name);
	  return this.tween(key, (fullname.local ? attrTweenNS : attrTween)(fullname, value));
	};
	
	function delayFunction(id, value) {
	  return function() {
	    init(this, id).delay = +value.apply(this, arguments);
	  };
	}
	
	function delayConstant(id, value) {
	  return value = +value, function() {
	    init(this, id).delay = value;
	  };
	}
	
	var transition_delay = function(value) {
	  var id = this._id;
	
	  return arguments.length
	      ? this.each((typeof value === "function"
	          ? delayFunction
	          : delayConstant)(id, value))
	      : get(this.node(), id).delay;
	};
	
	function durationFunction(id, value) {
	  return function() {
	    set(this, id).duration = +value.apply(this, arguments);
	  };
	}
	
	function durationConstant(id, value) {
	  return value = +value, function() {
	    set(this, id).duration = value;
	  };
	}
	
	var transition_duration = function(value) {
	  var id = this._id;
	
	  return arguments.length
	      ? this.each((typeof value === "function"
	          ? durationFunction
	          : durationConstant)(id, value))
	      : get(this.node(), id).duration;
	};
	
	function easeConstant(id, value) {
	  if (typeof value !== "function") throw new Error;
	  return function() {
	    set(this, id).ease = value;
	  };
	}
	
	var transition_ease = function(value) {
	  var id = this._id;
	
	  return arguments.length
	      ? this.each(easeConstant(id, value))
	      : get(this.node(), id).ease;
	};
	
	var transition_filter = function(match) {
	  if (typeof match !== "function") match = d3Selection.matcher(match);
	
	  for (var groups = this._groups, m = groups.length, subgroups = new Array(m), j = 0; j < m; ++j) {
	    for (var group = groups[j], n = group.length, subgroup = subgroups[j] = [], node, i = 0; i < n; ++i) {
	      if ((node = group[i]) && match.call(node, node.__data__, i, group)) {
	        subgroup.push(node);
	      }
	    }
	  }
	
	  return new Transition(subgroups, this._parents, this._name, this._id);
	};
	
	var transition_merge = function(transition) {
	  if (transition._id !== this._id) throw new Error;
	
	  for (var groups0 = this._groups, groups1 = transition._groups, m0 = groups0.length, m1 = groups1.length, m = Math.min(m0, m1), merges = new Array(m0), j = 0; j < m; ++j) {
	    for (var group0 = groups0[j], group1 = groups1[j], n = group0.length, merge = merges[j] = new Array(n), node, i = 0; i < n; ++i) {
	      if (node = group0[i] || group1[i]) {
	        merge[i] = node;
	      }
	    }
	  }
	
	  for (; j < m0; ++j) {
	    merges[j] = groups0[j];
	  }
	
	  return new Transition(merges, this._parents, this._name, this._id);
	};
	
	function start(name) {
	  return (name + "").trim().split(/^|\s+/).every(function(t) {
	    var i = t.indexOf(".");
	    if (i >= 0) t = t.slice(0, i);
	    return !t || t === "start";
	  });
	}
	
	function onFunction(id, name, listener) {
	  var on0, on1, sit = start(name) ? init : set;
	  return function() {
	    var schedule = sit(this, id),
	        on = schedule.on;
	
	    // If this node shared a dispatch with the previous node,
	    // just assign the updated shared dispatch and we’re done!
	    // Otherwise, copy-on-write.
	    if (on !== on0) (on1 = (on0 = on).copy()).on(name, listener);
	
	    schedule.on = on1;
	  };
	}
	
	var transition_on = function(name, listener) {
	  var id = this._id;
	
	  return arguments.length < 2
	      ? get(this.node(), id).on.on(name)
	      : this.each(onFunction(id, name, listener));
	};
	
	function removeFunction(id) {
	  return function() {
	    var parent = this.parentNode;
	    for (var i in this.__transition) if (+i !== id) return;
	    if (parent) parent.removeChild(this);
	  };
	}
	
	var transition_remove = function() {
	  return this.on("end.remove", removeFunction(this._id));
	};
	
	var transition_select = function(select) {
	  var name = this._name,
	      id = this._id;
	
	  if (typeof select !== "function") select = d3Selection.selector(select);
	
	  for (var groups = this._groups, m = groups.length, subgroups = new Array(m), j = 0; j < m; ++j) {
	    for (var group = groups[j], n = group.length, subgroup = subgroups[j] = new Array(n), node, subnode, i = 0; i < n; ++i) {
	      if ((node = group[i]) && (subnode = select.call(node, node.__data__, i, group))) {
	        if ("__data__" in node) subnode.__data__ = node.__data__;
	        subgroup[i] = subnode;
	        schedule(subgroup[i], name, id, i, subgroup, get(node, id));
	      }
	    }
	  }
	
	  return new Transition(subgroups, this._parents, name, id);
	};
	
	var transition_selectAll = function(select) {
	  var name = this._name,
	      id = this._id;
	
	  if (typeof select !== "function") select = d3Selection.selectorAll(select);
	
	  for (var groups = this._groups, m = groups.length, subgroups = [], parents = [], j = 0; j < m; ++j) {
	    for (var group = groups[j], n = group.length, node, i = 0; i < n; ++i) {
	      if (node = group[i]) {
	        for (var children = select.call(node, node.__data__, i, group), child, inherit = get(node, id), k = 0, l = children.length; k < l; ++k) {
	          if (child = children[k]) {
	            schedule(child, name, id, k, children, inherit);
	          }
	        }
	        subgroups.push(children);
	        parents.push(node);
	      }
	    }
	  }
	
	  return new Transition(subgroups, parents, name, id);
	};
	
	var Selection = d3Selection.selection.prototype.constructor;
	
	var transition_selection = function() {
	  return new Selection(this._groups, this._parents);
	};
	
	function styleRemove(name, interpolate$$1) {
	  var value00,
	      value10,
	      interpolate0;
	  return function() {
	    var style = d3Selection.window(this).getComputedStyle(this, null),
	        value0 = style.getPropertyValue(name),
	        value1 = (this.style.removeProperty(name), style.getPropertyValue(name));
	    return value0 === value1 ? null
	        : value0 === value00 && value1 === value10 ? interpolate0
	        : interpolate0 = interpolate$$1(value00 = value0, value10 = value1);
	  };
	}
	
	function styleRemoveEnd(name) {
	  return function() {
	    this.style.removeProperty(name);
	  };
	}
	
	function styleConstant(name, interpolate$$1, value1) {
	  var value00,
	      interpolate0;
	  return function() {
	    var value0 = d3Selection.window(this).getComputedStyle(this, null).getPropertyValue(name);
	    return value0 === value1 ? null
	        : value0 === value00 ? interpolate0
	        : interpolate0 = interpolate$$1(value00 = value0, value1);
	  };
	}
	
	function styleFunction(name, interpolate$$1, value) {
	  var value00,
	      value10,
	      interpolate0;
	  return function() {
	    var style = d3Selection.window(this).getComputedStyle(this, null),
	        value0 = style.getPropertyValue(name),
	        value1 = value(this);
	    if (value1 == null) value1 = (this.style.removeProperty(name), style.getPropertyValue(name));
	    return value0 === value1 ? null
	        : value0 === value00 && value1 === value10 ? interpolate0
	        : interpolate0 = interpolate$$1(value00 = value0, value10 = value1);
	  };
	}
	
	var transition_style = function(name, value, priority) {
	  var i = (name += "") === "transform" ? d3Interpolate.interpolateTransformCss : interpolate;
	  return value == null ? this
	          .styleTween(name, styleRemove(name, i))
	          .on("end.style." + name, styleRemoveEnd(name))
	      : this.styleTween(name, typeof value === "function"
	          ? styleFunction(name, i, tweenValue(this, "style." + name, value))
	          : styleConstant(name, i, value), priority);
	};
	
	function styleTween(name, value, priority) {
	  function tween() {
	    var node = this, i = value.apply(node, arguments);
	    return i && function(t) {
	      node.style.setProperty(name, i(t), priority);
	    };
	  }
	  tween._value = value;
	  return tween;
	}
	
	var transition_styleTween = function(name, value, priority) {
	  var key = "style." + (name += "");
	  if (arguments.length < 2) return (key = this.tween(key)) && key._value;
	  if (value == null) return this.tween(key, null);
	  if (typeof value !== "function") throw new Error;
	  return this.tween(key, styleTween(name, value, priority == null ? "" : priority));
	};
	
	function textConstant(value) {
	  return function() {
	    this.textContent = value;
	  };
	}
	
	function textFunction(value) {
	  return function() {
	    var value1 = value(this);
	    this.textContent = value1 == null ? "" : value1;
	  };
	}
	
	var transition_text = function(value) {
	  return this.tween("text", typeof value === "function"
	      ? textFunction(tweenValue(this, "text", value))
	      : textConstant(value == null ? "" : value + ""));
	};
	
	var transition_transition = function() {
	  var name = this._name,
	      id0 = this._id,
	      id1 = newId();
	
	  for (var groups = this._groups, m = groups.length, j = 0; j < m; ++j) {
	    for (var group = groups[j], n = group.length, node, i = 0; i < n; ++i) {
	      if (node = group[i]) {
	        var inherit = get(node, id0);
	        schedule(node, name, id1, i, group, {
	          time: inherit.time + inherit.delay + inherit.duration,
	          delay: 0,
	          duration: inherit.duration,
	          ease: inherit.ease
	        });
	      }
	    }
	  }
	
	  return new Transition(groups, this._parents, name, id1);
	};
	
	var id = 0;
	
	function Transition(groups, parents, name, id) {
	  this._groups = groups;
	  this._parents = parents;
	  this._name = name;
	  this._id = id;
	}
	
	function transition(name) {
	  return d3Selection.selection().transition(name);
	}
	
	function newId() {
	  return ++id;
	}
	
	var selection_prototype = d3Selection.selection.prototype;
	
	Transition.prototype = transition.prototype = {
	  constructor: Transition,
	  select: transition_select,
	  selectAll: transition_selectAll,
	  filter: transition_filter,
	  merge: transition_merge,
	  selection: transition_selection,
	  transition: transition_transition,
	  call: selection_prototype.call,
	  nodes: selection_prototype.nodes,
	  node: selection_prototype.node,
	  size: selection_prototype.size,
	  empty: selection_prototype.empty,
	  each: selection_prototype.each,
	  on: transition_on,
	  attr: transition_attr,
	  attrTween: transition_attrTween,
	  style: transition_style,
	  styleTween: transition_styleTween,
	  text: transition_text,
	  remove: transition_remove,
	  tween: transition_tween,
	  delay: transition_delay,
	  duration: transition_duration,
	  ease: transition_ease
	};
	
	var defaultTiming = {
	  time: null, // Set on use.
	  delay: 0,
	  duration: 250,
	  ease: d3Ease.easeCubicInOut
	};
	
	function inherit(node, id) {
	  var timing;
	  while (!(timing = node.__transition) || !(timing = timing[id])) {
	    if (!(node = node.parentNode)) {
	      return defaultTiming.time = d3Timer.now(), defaultTiming;
	    }
	  }
	  return timing;
	}
	
	var selection_transition = function(name) {
	  var id,
	      timing;
	
	  if (name instanceof Transition) {
	    id = name._id, name = name._name;
	  } else {
	    id = newId(), (timing = defaultTiming).time = d3Timer.now(), name = name == null ? null : name + "";
	  }
	
	  for (var groups = this._groups, m = groups.length, j = 0; j < m; ++j) {
	    for (var group = groups[j], n = group.length, node, i = 0; i < n; ++i) {
	      if (node = group[i]) {
	        schedule(node, name, id, i, group, timing || inherit(node, id));
	      }
	    }
	  }
	
	  return new Transition(groups, this._parents, name, id);
	};
	
	d3Selection.selection.prototype.interrupt = selection_interrupt;
	d3Selection.selection.prototype.transition = selection_transition;
	
	var root = [null];
	
	var active = function(node, name) {
	  var schedules = node.__transition,
	      schedule,
	      i;
	
	  if (schedules) {
	    name = name == null ? null : name + "";
	    for (i in schedules) {
	      if ((schedule = schedules[i]).state > SCHEDULED && schedule.name === name) {
	        return new Transition([[node]], root, name, +i);
	      }
	    }
	  }
	
	  return null;
	};
	
	exports.transition = transition;
	exports.active = active;
	exports.interrupt = interrupt;
	
	Object.defineProperty(exports, '__esModule', { value: true });
	
	})));


/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	// https://d3js.org/d3-dispatch/ Version 1.0.2. Copyright 2016 Mike Bostock.
	(function (global, factory) {
	   true ? factory(exports) :
	  typeof define === 'function' && define.amd ? define(['exports'], factory) :
	  (factory((global.d3 = global.d3 || {})));
	}(this, (function (exports) { 'use strict';
	
	var noop = {value: function() {}};
	
	function dispatch() {
	  for (var i = 0, n = arguments.length, _ = {}, t; i < n; ++i) {
	    if (!(t = arguments[i] + "") || (t in _)) throw new Error("illegal type: " + t);
	    _[t] = [];
	  }
	  return new Dispatch(_);
	}
	
	function Dispatch(_) {
	  this._ = _;
	}
	
	function parseTypenames(typenames, types) {
	  return typenames.trim().split(/^|\s+/).map(function(t) {
	    var name = "", i = t.indexOf(".");
	    if (i >= 0) name = t.slice(i + 1), t = t.slice(0, i);
	    if (t && !types.hasOwnProperty(t)) throw new Error("unknown type: " + t);
	    return {type: t, name: name};
	  });
	}
	
	Dispatch.prototype = dispatch.prototype = {
	  constructor: Dispatch,
	  on: function(typename, callback) {
	    var _ = this._,
	        T = parseTypenames(typename + "", _),
	        t,
	        i = -1,
	        n = T.length;
	
	    // If no callback was specified, return the callback of the given type and name.
	    if (arguments.length < 2) {
	      while (++i < n) if ((t = (typename = T[i]).type) && (t = get(_[t], typename.name))) return t;
	      return;
	    }
	
	    // If a type was specified, set the callback for the given type and name.
	    // Otherwise, if a null callback was specified, remove callbacks of the given name.
	    if (callback != null && typeof callback !== "function") throw new Error("invalid callback: " + callback);
	    while (++i < n) {
	      if (t = (typename = T[i]).type) _[t] = set(_[t], typename.name, callback);
	      else if (callback == null) for (t in _) _[t] = set(_[t], typename.name, null);
	    }
	
	    return this;
	  },
	  copy: function() {
	    var copy = {}, _ = this._;
	    for (var t in _) copy[t] = _[t].slice();
	    return new Dispatch(copy);
	  },
	  call: function(type, that) {
	    if ((n = arguments.length - 2) > 0) for (var args = new Array(n), i = 0, n, t; i < n; ++i) args[i] = arguments[i + 2];
	    if (!this._.hasOwnProperty(type)) throw new Error("unknown type: " + type);
	    for (t = this._[type], i = 0, n = t.length; i < n; ++i) t[i].value.apply(that, args);
	  },
	  apply: function(type, that, args) {
	    if (!this._.hasOwnProperty(type)) throw new Error("unknown type: " + type);
	    for (var t = this._[type], i = 0, n = t.length; i < n; ++i) t[i].value.apply(that, args);
	  }
	};
	
	function get(type, name) {
	  for (var i = 0, n = type.length, c; i < n; ++i) {
	    if ((c = type[i]).name === name) {
	      return c.value;
	    }
	  }
	}
	
	function set(type, name, callback) {
	  for (var i = 0, n = type.length; i < n; ++i) {
	    if (type[i].name === name) {
	      type[i] = noop, type = type.slice(0, i).concat(type.slice(i + 1));
	      break;
	    }
	  }
	  if (callback != null) type.push({name: name, value: callback});
	  return type;
	}
	
	exports.dispatch = dispatch;
	
	Object.defineProperty(exports, '__esModule', { value: true });
	
	})));


/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	// https://d3js.org/d3-timer/ Version 1.0.3. Copyright 2016 Mike Bostock.
	(function (global, factory) {
	   true ? factory(exports) :
	  typeof define === 'function' && define.amd ? define(['exports'], factory) :
	  (factory((global.d3 = global.d3 || {})));
	}(this, (function (exports) { 'use strict';
	
	var frame = 0;
	var timeout = 0;
	var interval = 0;
	var pokeDelay = 1000;
	var taskHead;
	var taskTail;
	var clockLast = 0;
	var clockNow = 0;
	var clockSkew = 0;
	var clock = typeof performance === "object" && performance.now ? performance : Date;
	var setFrame = typeof requestAnimationFrame === "function" ? requestAnimationFrame : function(f) { setTimeout(f, 17); };
	function now() {
	  return clockNow || (setFrame(clearNow), clockNow = clock.now() + clockSkew);
	}
	
	function clearNow() {
	  clockNow = 0;
	}
	
	function Timer() {
	  this._call =
	  this._time =
	  this._next = null;
	}
	
	Timer.prototype = timer.prototype = {
	  constructor: Timer,
	  restart: function(callback, delay, time) {
	    if (typeof callback !== "function") throw new TypeError("callback is not a function");
	    time = (time == null ? now() : +time) + (delay == null ? 0 : +delay);
	    if (!this._next && taskTail !== this) {
	      if (taskTail) taskTail._next = this;
	      else taskHead = this;
	      taskTail = this;
	    }
	    this._call = callback;
	    this._time = time;
	    sleep();
	  },
	  stop: function() {
	    if (this._call) {
	      this._call = null;
	      this._time = Infinity;
	      sleep();
	    }
	  }
	};
	
	function timer(callback, delay, time) {
	  var t = new Timer;
	  t.restart(callback, delay, time);
	  return t;
	}
	
	function timerFlush() {
	  now(); // Get the current time, if not already set.
	  ++frame; // Pretend we’ve set an alarm, if we haven’t already.
	  var t = taskHead, e;
	  while (t) {
	    if ((e = clockNow - t._time) >= 0) t._call.call(null, e);
	    t = t._next;
	  }
	  --frame;
	}
	
	function wake() {
	  clockNow = (clockLast = clock.now()) + clockSkew;
	  frame = timeout = 0;
	  try {
	    timerFlush();
	  } finally {
	    frame = 0;
	    nap();
	    clockNow = 0;
	  }
	}
	
	function poke() {
	  var now = clock.now(), delay = now - clockLast;
	  if (delay > pokeDelay) clockSkew -= delay, clockLast = now;
	}
	
	function nap() {
	  var t0, t1 = taskHead, t2, time = Infinity;
	  while (t1) {
	    if (t1._call) {
	      if (time > t1._time) time = t1._time;
	      t0 = t1, t1 = t1._next;
	    } else {
	      t2 = t1._next, t1._next = null;
	      t1 = t0 ? t0._next = t2 : taskHead = t2;
	    }
	  }
	  taskTail = t0;
	  sleep(time);
	}
	
	function sleep(time) {
	  if (frame) return; // Soonest alarm already set, or will be.
	  if (timeout) timeout = clearTimeout(timeout);
	  var delay = time - clockNow;
	  if (delay > 24) {
	    if (time < Infinity) timeout = setTimeout(wake, delay);
	    if (interval) interval = clearInterval(interval);
	  } else {
	    if (!interval) interval = setInterval(poke, pokeDelay);
	    frame = 1, setFrame(wake);
	  }
	}
	
	function timeout$1(callback, delay, time) {
	  var t = new Timer;
	  delay = delay == null ? 0 : +delay;
	  t.restart(function(elapsed) {
	    t.stop();
	    callback(elapsed + delay);
	  }, delay, time);
	  return t;
	}
	
	function interval$1(callback, delay, time) {
	  var t = new Timer, total = delay;
	  if (delay == null) return t.restart(callback, delay, time), t;
	  delay = +delay, time = time == null ? now() : +time;
	  t.restart(function tick(elapsed) {
	    elapsed += total;
	    t.restart(tick, total += delay, time);
	    callback(elapsed);
	  }, delay, time);
	  return t;
	}
	
	exports.now = now;
	exports.timer = timer;
	exports.timerFlush = timerFlush;
	exports.timeout = timeout$1;
	exports.interval = interval$1;
	
	Object.defineProperty(exports, '__esModule', { value: true });
	
	})));

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	// https://d3js.org/d3-interpolate/ Version 1.1.3. Copyright 2017 Mike Bostock.
	(function (global, factory) {
	   true ? factory(exports, __webpack_require__(17)) :
	  typeof define === 'function' && define.amd ? define(['exports', 'd3-color'], factory) :
	  (factory((global.d3 = global.d3 || {}),global.d3));
	}(this, (function (exports,d3Color) { 'use strict';
	
	function basis(t1, v0, v1, v2, v3) {
	  var t2 = t1 * t1, t3 = t2 * t1;
	  return ((1 - 3 * t1 + 3 * t2 - t3) * v0
	      + (4 - 6 * t2 + 3 * t3) * v1
	      + (1 + 3 * t1 + 3 * t2 - 3 * t3) * v2
	      + t3 * v3) / 6;
	}
	
	var basis$1 = function(values) {
	  var n = values.length - 1;
	  return function(t) {
	    var i = t <= 0 ? (t = 0) : t >= 1 ? (t = 1, n - 1) : Math.floor(t * n),
	        v1 = values[i],
	        v2 = values[i + 1],
	        v0 = i > 0 ? values[i - 1] : 2 * v1 - v2,
	        v3 = i < n - 1 ? values[i + 2] : 2 * v2 - v1;
	    return basis((t - i / n) * n, v0, v1, v2, v3);
	  };
	};
	
	var basisClosed = function(values) {
	  var n = values.length;
	  return function(t) {
	    var i = Math.floor(((t %= 1) < 0 ? ++t : t) * n),
	        v0 = values[(i + n - 1) % n],
	        v1 = values[i % n],
	        v2 = values[(i + 1) % n],
	        v3 = values[(i + 2) % n];
	    return basis((t - i / n) * n, v0, v1, v2, v3);
	  };
	};
	
	var constant = function(x) {
	  return function() {
	    return x;
	  };
	};
	
	function linear(a, d) {
	  return function(t) {
	    return a + t * d;
	  };
	}
	
	function exponential(a, b, y) {
	  return a = Math.pow(a, y), b = Math.pow(b, y) - a, y = 1 / y, function(t) {
	    return Math.pow(a + t * b, y);
	  };
	}
	
	function hue(a, b) {
	  var d = b - a;
	  return d ? linear(a, d > 180 || d < -180 ? d - 360 * Math.round(d / 360) : d) : constant(isNaN(a) ? b : a);
	}
	
	function gamma(y) {
	  return (y = +y) === 1 ? nogamma : function(a, b) {
	    return b - a ? exponential(a, b, y) : constant(isNaN(a) ? b : a);
	  };
	}
	
	function nogamma(a, b) {
	  var d = b - a;
	  return d ? linear(a, d) : constant(isNaN(a) ? b : a);
	}
	
	var rgb$1 = ((function rgbGamma(y) {
	  var color$$1 = gamma(y);
	
	  function rgb$$1(start, end) {
	    var r = color$$1((start = d3Color.rgb(start)).r, (end = d3Color.rgb(end)).r),
	        g = color$$1(start.g, end.g),
	        b = color$$1(start.b, end.b),
	        opacity = nogamma(start.opacity, end.opacity);
	    return function(t) {
	      start.r = r(t);
	      start.g = g(t);
	      start.b = b(t);
	      start.opacity = opacity(t);
	      return start + "";
	    };
	  }
	
	  rgb$$1.gamma = rgbGamma;
	
	  return rgb$$1;
	}))(1);
	
	function rgbSpline(spline) {
	  return function(colors) {
	    var n = colors.length,
	        r = new Array(n),
	        g = new Array(n),
	        b = new Array(n),
	        i, color$$1;
	    for (i = 0; i < n; ++i) {
	      color$$1 = d3Color.rgb(colors[i]);
	      r[i] = color$$1.r || 0;
	      g[i] = color$$1.g || 0;
	      b[i] = color$$1.b || 0;
	    }
	    r = spline(r);
	    g = spline(g);
	    b = spline(b);
	    color$$1.opacity = 1;
	    return function(t) {
	      color$$1.r = r(t);
	      color$$1.g = g(t);
	      color$$1.b = b(t);
	      return color$$1 + "";
	    };
	  };
	}
	
	var rgbBasis = rgbSpline(basis$1);
	var rgbBasisClosed = rgbSpline(basisClosed);
	
	var array = function(a, b) {
	  var nb = b ? b.length : 0,
	      na = a ? Math.min(nb, a.length) : 0,
	      x = new Array(nb),
	      c = new Array(nb),
	      i;
	
	  for (i = 0; i < na; ++i) x[i] = value(a[i], b[i]);
	  for (; i < nb; ++i) c[i] = b[i];
	
	  return function(t) {
	    for (i = 0; i < na; ++i) c[i] = x[i](t);
	    return c;
	  };
	};
	
	var date = function(a, b) {
	  var d = new Date;
	  return a = +a, b -= a, function(t) {
	    return d.setTime(a + b * t), d;
	  };
	};
	
	var number = function(a, b) {
	  return a = +a, b -= a, function(t) {
	    return a + b * t;
	  };
	};
	
	var object = function(a, b) {
	  var i = {},
	      c = {},
	      k;
	
	  if (a === null || typeof a !== "object") a = {};
	  if (b === null || typeof b !== "object") b = {};
	
	  for (k in b) {
	    if (k in a) {
	      i[k] = value(a[k], b[k]);
	    } else {
	      c[k] = b[k];
	    }
	  }
	
	  return function(t) {
	    for (k in i) c[k] = i[k](t);
	    return c;
	  };
	};
	
	var reA = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g;
	var reB = new RegExp(reA.source, "g");
	
	function zero(b) {
	  return function() {
	    return b;
	  };
	}
	
	function one(b) {
	  return function(t) {
	    return b(t) + "";
	  };
	}
	
	var string = function(a, b) {
	  var bi = reA.lastIndex = reB.lastIndex = 0, // scan index for next number in b
	      am, // current match in a
	      bm, // current match in b
	      bs, // string preceding current number in b, if any
	      i = -1, // index in s
	      s = [], // string constants and placeholders
	      q = []; // number interpolators
	
	  // Coerce inputs to strings.
	  a = a + "", b = b + "";
	
	  // Interpolate pairs of numbers in a & b.
	  while ((am = reA.exec(a))
	      && (bm = reB.exec(b))) {
	    if ((bs = bm.index) > bi) { // a string precedes the next number in b
	      bs = b.slice(bi, bs);
	      if (s[i]) s[i] += bs; // coalesce with previous string
	      else s[++i] = bs;
	    }
	    if ((am = am[0]) === (bm = bm[0])) { // numbers in a & b match
	      if (s[i]) s[i] += bm; // coalesce with previous string
	      else s[++i] = bm;
	    } else { // interpolate non-matching numbers
	      s[++i] = null;
	      q.push({i: i, x: number(am, bm)});
	    }
	    bi = reB.lastIndex;
	  }
	
	  // Add remains of b.
	  if (bi < b.length) {
	    bs = b.slice(bi);
	    if (s[i]) s[i] += bs; // coalesce with previous string
	    else s[++i] = bs;
	  }
	
	  // Special optimization for only a single match.
	  // Otherwise, interpolate each of the numbers and rejoin the string.
	  return s.length < 2 ? (q[0]
	      ? one(q[0].x)
	      : zero(b))
	      : (b = q.length, function(t) {
	          for (var i = 0, o; i < b; ++i) s[(o = q[i]).i] = o.x(t);
	          return s.join("");
	        });
	};
	
	var value = function(a, b) {
	  var t = typeof b, c;
	  return b == null || t === "boolean" ? constant(b)
	      : (t === "number" ? number
	      : t === "string" ? ((c = d3Color.color(b)) ? (b = c, rgb$1) : string)
	      : b instanceof d3Color.color ? rgb$1
	      : b instanceof Date ? date
	      : Array.isArray(b) ? array
	      : isNaN(b) ? object
	      : number)(a, b);
	};
	
	var round = function(a, b) {
	  return a = +a, b -= a, function(t) {
	    return Math.round(a + b * t);
	  };
	};
	
	var degrees = 180 / Math.PI;
	
	var identity = {
	  translateX: 0,
	  translateY: 0,
	  rotate: 0,
	  skewX: 0,
	  scaleX: 1,
	  scaleY: 1
	};
	
	var decompose = function(a, b, c, d, e, f) {
	  var scaleX, scaleY, skewX;
	  if (scaleX = Math.sqrt(a * a + b * b)) a /= scaleX, b /= scaleX;
	  if (skewX = a * c + b * d) c -= a * skewX, d -= b * skewX;
	  if (scaleY = Math.sqrt(c * c + d * d)) c /= scaleY, d /= scaleY, skewX /= scaleY;
	  if (a * d < b * c) a = -a, b = -b, skewX = -skewX, scaleX = -scaleX;
	  return {
	    translateX: e,
	    translateY: f,
	    rotate: Math.atan2(b, a) * degrees,
	    skewX: Math.atan(skewX) * degrees,
	    scaleX: scaleX,
	    scaleY: scaleY
	  };
	};
	
	var cssNode;
	var cssRoot;
	var cssView;
	var svgNode;
	
	function parseCss(value) {
	  if (value === "none") return identity;
	  if (!cssNode) cssNode = document.createElement("DIV"), cssRoot = document.documentElement, cssView = document.defaultView;
	  cssNode.style.transform = value;
	  value = cssView.getComputedStyle(cssRoot.appendChild(cssNode), null).getPropertyValue("transform");
	  cssRoot.removeChild(cssNode);
	  value = value.slice(7, -1).split(",");
	  return decompose(+value[0], +value[1], +value[2], +value[3], +value[4], +value[5]);
	}
	
	function parseSvg(value) {
	  if (value == null) return identity;
	  if (!svgNode) svgNode = document.createElementNS("http://www.w3.org/2000/svg", "g");
	  svgNode.setAttribute("transform", value);
	  if (!(value = svgNode.transform.baseVal.consolidate())) return identity;
	  value = value.matrix;
	  return decompose(value.a, value.b, value.c, value.d, value.e, value.f);
	}
	
	function interpolateTransform(parse, pxComma, pxParen, degParen) {
	
	  function pop(s) {
	    return s.length ? s.pop() + " " : "";
	  }
	
	  function translate(xa, ya, xb, yb, s, q) {
	    if (xa !== xb || ya !== yb) {
	      var i = s.push("translate(", null, pxComma, null, pxParen);
	      q.push({i: i - 4, x: number(xa, xb)}, {i: i - 2, x: number(ya, yb)});
	    } else if (xb || yb) {
	      s.push("translate(" + xb + pxComma + yb + pxParen);
	    }
	  }
	
	  function rotate(a, b, s, q) {
	    if (a !== b) {
	      if (a - b > 180) b += 360; else if (b - a > 180) a += 360; // shortest path
	      q.push({i: s.push(pop(s) + "rotate(", null, degParen) - 2, x: number(a, b)});
	    } else if (b) {
	      s.push(pop(s) + "rotate(" + b + degParen);
	    }
	  }
	
	  function skewX(a, b, s, q) {
	    if (a !== b) {
	      q.push({i: s.push(pop(s) + "skewX(", null, degParen) - 2, x: number(a, b)});
	    } else if (b) {
	      s.push(pop(s) + "skewX(" + b + degParen);
	    }
	  }
	
	  function scale(xa, ya, xb, yb, s, q) {
	    if (xa !== xb || ya !== yb) {
	      var i = s.push(pop(s) + "scale(", null, ",", null, ")");
	      q.push({i: i - 4, x: number(xa, xb)}, {i: i - 2, x: number(ya, yb)});
	    } else if (xb !== 1 || yb !== 1) {
	      s.push(pop(s) + "scale(" + xb + "," + yb + ")");
	    }
	  }
	
	  return function(a, b) {
	    var s = [], // string constants and placeholders
	        q = []; // number interpolators
	    a = parse(a), b = parse(b);
	    translate(a.translateX, a.translateY, b.translateX, b.translateY, s, q);
	    rotate(a.rotate, b.rotate, s, q);
	    skewX(a.skewX, b.skewX, s, q);
	    scale(a.scaleX, a.scaleY, b.scaleX, b.scaleY, s, q);
	    a = b = null; // gc
	    return function(t) {
	      var i = -1, n = q.length, o;
	      while (++i < n) s[(o = q[i]).i] = o.x(t);
	      return s.join("");
	    };
	  };
	}
	
	var interpolateTransformCss = interpolateTransform(parseCss, "px, ", "px)", "deg)");
	var interpolateTransformSvg = interpolateTransform(parseSvg, ", ", ")", ")");
	
	var rho = Math.SQRT2;
	var rho2 = 2;
	var rho4 = 4;
	var epsilon2 = 1e-12;
	
	function cosh(x) {
	  return ((x = Math.exp(x)) + 1 / x) / 2;
	}
	
	function sinh(x) {
	  return ((x = Math.exp(x)) - 1 / x) / 2;
	}
	
	function tanh(x) {
	  return ((x = Math.exp(2 * x)) - 1) / (x + 1);
	}
	
	// p0 = [ux0, uy0, w0]
	// p1 = [ux1, uy1, w1]
	var zoom = function(p0, p1) {
	  var ux0 = p0[0], uy0 = p0[1], w0 = p0[2],
	      ux1 = p1[0], uy1 = p1[1], w1 = p1[2],
	      dx = ux1 - ux0,
	      dy = uy1 - uy0,
	      d2 = dx * dx + dy * dy,
	      i,
	      S;
	
	  // Special case for u0 ≅ u1.
	  if (d2 < epsilon2) {
	    S = Math.log(w1 / w0) / rho;
	    i = function(t) {
	      return [
	        ux0 + t * dx,
	        uy0 + t * dy,
	        w0 * Math.exp(rho * t * S)
	      ];
	    };
	  }
	
	  // General case.
	  else {
	    var d1 = Math.sqrt(d2),
	        b0 = (w1 * w1 - w0 * w0 + rho4 * d2) / (2 * w0 * rho2 * d1),
	        b1 = (w1 * w1 - w0 * w0 - rho4 * d2) / (2 * w1 * rho2 * d1),
	        r0 = Math.log(Math.sqrt(b0 * b0 + 1) - b0),
	        r1 = Math.log(Math.sqrt(b1 * b1 + 1) - b1);
	    S = (r1 - r0) / rho;
	    i = function(t) {
	      var s = t * S,
	          coshr0 = cosh(r0),
	          u = w0 / (rho2 * d1) * (coshr0 * tanh(rho * s + r0) - sinh(r0));
	      return [
	        ux0 + u * dx,
	        uy0 + u * dy,
	        w0 * coshr0 / cosh(rho * s + r0)
	      ];
	    };
	  }
	
	  i.duration = S * 1000;
	
	  return i;
	};
	
	function hsl$1(hue$$1) {
	  return function(start, end) {
	    var h = hue$$1((start = d3Color.hsl(start)).h, (end = d3Color.hsl(end)).h),
	        s = nogamma(start.s, end.s),
	        l = nogamma(start.l, end.l),
	        opacity = nogamma(start.opacity, end.opacity);
	    return function(t) {
	      start.h = h(t);
	      start.s = s(t);
	      start.l = l(t);
	      start.opacity = opacity(t);
	      return start + "";
	    };
	  }
	}
	
	var hsl$2 = hsl$1(hue);
	var hslLong = hsl$1(nogamma);
	
	function lab$1(start, end) {
	  var l = nogamma((start = d3Color.lab(start)).l, (end = d3Color.lab(end)).l),
	      a = nogamma(start.a, end.a),
	      b = nogamma(start.b, end.b),
	      opacity = nogamma(start.opacity, end.opacity);
	  return function(t) {
	    start.l = l(t);
	    start.a = a(t);
	    start.b = b(t);
	    start.opacity = opacity(t);
	    return start + "";
	  };
	}
	
	function hcl$1(hue$$1) {
	  return function(start, end) {
	    var h = hue$$1((start = d3Color.hcl(start)).h, (end = d3Color.hcl(end)).h),
	        c = nogamma(start.c, end.c),
	        l = nogamma(start.l, end.l),
	        opacity = nogamma(start.opacity, end.opacity);
	    return function(t) {
	      start.h = h(t);
	      start.c = c(t);
	      start.l = l(t);
	      start.opacity = opacity(t);
	      return start + "";
	    };
	  }
	}
	
	var hcl$2 = hcl$1(hue);
	var hclLong = hcl$1(nogamma);
	
	function cubehelix$1(hue$$1) {
	  return (function cubehelixGamma(y) {
	    y = +y;
	
	    function cubehelix$$1(start, end) {
	      var h = hue$$1((start = d3Color.cubehelix(start)).h, (end = d3Color.cubehelix(end)).h),
	          s = nogamma(start.s, end.s),
	          l = nogamma(start.l, end.l),
	          opacity = nogamma(start.opacity, end.opacity);
	      return function(t) {
	        start.h = h(t);
	        start.s = s(t);
	        start.l = l(Math.pow(t, y));
	        start.opacity = opacity(t);
	        return start + "";
	      };
	    }
	
	    cubehelix$$1.gamma = cubehelixGamma;
	
	    return cubehelix$$1;
	  })(1);
	}
	
	var cubehelix$2 = cubehelix$1(hue);
	var cubehelixLong = cubehelix$1(nogamma);
	
	var quantize = function(interpolator, n) {
	  var samples = new Array(n);
	  for (var i = 0; i < n; ++i) samples[i] = interpolator(i / (n - 1));
	  return samples;
	};
	
	exports.interpolate = value;
	exports.interpolateArray = array;
	exports.interpolateBasis = basis$1;
	exports.interpolateBasisClosed = basisClosed;
	exports.interpolateDate = date;
	exports.interpolateNumber = number;
	exports.interpolateObject = object;
	exports.interpolateRound = round;
	exports.interpolateString = string;
	exports.interpolateTransformCss = interpolateTransformCss;
	exports.interpolateTransformSvg = interpolateTransformSvg;
	exports.interpolateZoom = zoom;
	exports.interpolateRgb = rgb$1;
	exports.interpolateRgbBasis = rgbBasis;
	exports.interpolateRgbBasisClosed = rgbBasisClosed;
	exports.interpolateHsl = hsl$2;
	exports.interpolateHslLong = hslLong;
	exports.interpolateLab = lab$1;
	exports.interpolateHcl = hcl$2;
	exports.interpolateHclLong = hclLong;
	exports.interpolateCubehelix = cubehelix$2;
	exports.interpolateCubehelixLong = cubehelixLong;
	exports.quantize = quantize;
	
	Object.defineProperty(exports, '__esModule', { value: true });
	
	})));


/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	// https://d3js.org/d3-color/ Version 1.0.2. Copyright 2016 Mike Bostock.
	(function (global, factory) {
	   true ? factory(exports) :
	  typeof define === 'function' && define.amd ? define(['exports'], factory) :
	  (factory((global.d3 = global.d3 || {})));
	}(this, (function (exports) { 'use strict';
	
	var define = function(constructor, factory, prototype) {
	  constructor.prototype = factory.prototype = prototype;
	  prototype.constructor = constructor;
	};
	
	function extend(parent, definition) {
	  var prototype = Object.create(parent.prototype);
	  for (var key in definition) prototype[key] = definition[key];
	  return prototype;
	}
	
	function Color() {}
	
	var darker = 0.7;
	var brighter = 1 / darker;
	
	var reI = "\\s*([+-]?\\d+)\\s*";
	var reN = "\\s*([+-]?\\d*\\.?\\d+(?:[eE][+-]?\\d+)?)\\s*";
	var reP = "\\s*([+-]?\\d*\\.?\\d+(?:[eE][+-]?\\d+)?)%\\s*";
	var reHex3 = /^#([0-9a-f]{3})$/;
	var reHex6 = /^#([0-9a-f]{6})$/;
	var reRgbInteger = new RegExp("^rgb\\(" + [reI, reI, reI] + "\\)$");
	var reRgbPercent = new RegExp("^rgb\\(" + [reP, reP, reP] + "\\)$");
	var reRgbaInteger = new RegExp("^rgba\\(" + [reI, reI, reI, reN] + "\\)$");
	var reRgbaPercent = new RegExp("^rgba\\(" + [reP, reP, reP, reN] + "\\)$");
	var reHslPercent = new RegExp("^hsl\\(" + [reN, reP, reP] + "\\)$");
	var reHslaPercent = new RegExp("^hsla\\(" + [reN, reP, reP, reN] + "\\)$");
	
	var named = {
	  aliceblue: 0xf0f8ff,
	  antiquewhite: 0xfaebd7,
	  aqua: 0x00ffff,
	  aquamarine: 0x7fffd4,
	  azure: 0xf0ffff,
	  beige: 0xf5f5dc,
	  bisque: 0xffe4c4,
	  black: 0x000000,
	  blanchedalmond: 0xffebcd,
	  blue: 0x0000ff,
	  blueviolet: 0x8a2be2,
	  brown: 0xa52a2a,
	  burlywood: 0xdeb887,
	  cadetblue: 0x5f9ea0,
	  chartreuse: 0x7fff00,
	  chocolate: 0xd2691e,
	  coral: 0xff7f50,
	  cornflowerblue: 0x6495ed,
	  cornsilk: 0xfff8dc,
	  crimson: 0xdc143c,
	  cyan: 0x00ffff,
	  darkblue: 0x00008b,
	  darkcyan: 0x008b8b,
	  darkgoldenrod: 0xb8860b,
	  darkgray: 0xa9a9a9,
	  darkgreen: 0x006400,
	  darkgrey: 0xa9a9a9,
	  darkkhaki: 0xbdb76b,
	  darkmagenta: 0x8b008b,
	  darkolivegreen: 0x556b2f,
	  darkorange: 0xff8c00,
	  darkorchid: 0x9932cc,
	  darkred: 0x8b0000,
	  darksalmon: 0xe9967a,
	  darkseagreen: 0x8fbc8f,
	  darkslateblue: 0x483d8b,
	  darkslategray: 0x2f4f4f,
	  darkslategrey: 0x2f4f4f,
	  darkturquoise: 0x00ced1,
	  darkviolet: 0x9400d3,
	  deeppink: 0xff1493,
	  deepskyblue: 0x00bfff,
	  dimgray: 0x696969,
	  dimgrey: 0x696969,
	  dodgerblue: 0x1e90ff,
	  firebrick: 0xb22222,
	  floralwhite: 0xfffaf0,
	  forestgreen: 0x228b22,
	  fuchsia: 0xff00ff,
	  gainsboro: 0xdcdcdc,
	  ghostwhite: 0xf8f8ff,
	  gold: 0xffd700,
	  goldenrod: 0xdaa520,
	  gray: 0x808080,
	  green: 0x008000,
	  greenyellow: 0xadff2f,
	  grey: 0x808080,
	  honeydew: 0xf0fff0,
	  hotpink: 0xff69b4,
	  indianred: 0xcd5c5c,
	  indigo: 0x4b0082,
	  ivory: 0xfffff0,
	  khaki: 0xf0e68c,
	  lavender: 0xe6e6fa,
	  lavenderblush: 0xfff0f5,
	  lawngreen: 0x7cfc00,
	  lemonchiffon: 0xfffacd,
	  lightblue: 0xadd8e6,
	  lightcoral: 0xf08080,
	  lightcyan: 0xe0ffff,
	  lightgoldenrodyellow: 0xfafad2,
	  lightgray: 0xd3d3d3,
	  lightgreen: 0x90ee90,
	  lightgrey: 0xd3d3d3,
	  lightpink: 0xffb6c1,
	  lightsalmon: 0xffa07a,
	  lightseagreen: 0x20b2aa,
	  lightskyblue: 0x87cefa,
	  lightslategray: 0x778899,
	  lightslategrey: 0x778899,
	  lightsteelblue: 0xb0c4de,
	  lightyellow: 0xffffe0,
	  lime: 0x00ff00,
	  limegreen: 0x32cd32,
	  linen: 0xfaf0e6,
	  magenta: 0xff00ff,
	  maroon: 0x800000,
	  mediumaquamarine: 0x66cdaa,
	  mediumblue: 0x0000cd,
	  mediumorchid: 0xba55d3,
	  mediumpurple: 0x9370db,
	  mediumseagreen: 0x3cb371,
	  mediumslateblue: 0x7b68ee,
	  mediumspringgreen: 0x00fa9a,
	  mediumturquoise: 0x48d1cc,
	  mediumvioletred: 0xc71585,
	  midnightblue: 0x191970,
	  mintcream: 0xf5fffa,
	  mistyrose: 0xffe4e1,
	  moccasin: 0xffe4b5,
	  navajowhite: 0xffdead,
	  navy: 0x000080,
	  oldlace: 0xfdf5e6,
	  olive: 0x808000,
	  olivedrab: 0x6b8e23,
	  orange: 0xffa500,
	  orangered: 0xff4500,
	  orchid: 0xda70d6,
	  palegoldenrod: 0xeee8aa,
	  palegreen: 0x98fb98,
	  paleturquoise: 0xafeeee,
	  palevioletred: 0xdb7093,
	  papayawhip: 0xffefd5,
	  peachpuff: 0xffdab9,
	  peru: 0xcd853f,
	  pink: 0xffc0cb,
	  plum: 0xdda0dd,
	  powderblue: 0xb0e0e6,
	  purple: 0x800080,
	  rebeccapurple: 0x663399,
	  red: 0xff0000,
	  rosybrown: 0xbc8f8f,
	  royalblue: 0x4169e1,
	  saddlebrown: 0x8b4513,
	  salmon: 0xfa8072,
	  sandybrown: 0xf4a460,
	  seagreen: 0x2e8b57,
	  seashell: 0xfff5ee,
	  sienna: 0xa0522d,
	  silver: 0xc0c0c0,
	  skyblue: 0x87ceeb,
	  slateblue: 0x6a5acd,
	  slategray: 0x708090,
	  slategrey: 0x708090,
	  snow: 0xfffafa,
	  springgreen: 0x00ff7f,
	  steelblue: 0x4682b4,
	  tan: 0xd2b48c,
	  teal: 0x008080,
	  thistle: 0xd8bfd8,
	  tomato: 0xff6347,
	  turquoise: 0x40e0d0,
	  violet: 0xee82ee,
	  wheat: 0xf5deb3,
	  white: 0xffffff,
	  whitesmoke: 0xf5f5f5,
	  yellow: 0xffff00,
	  yellowgreen: 0x9acd32
	};
	
	define(Color, color, {
	  displayable: function() {
	    return this.rgb().displayable();
	  },
	  toString: function() {
	    return this.rgb() + "";
	  }
	});
	
	function color(format) {
	  var m;
	  format = (format + "").trim().toLowerCase();
	  return (m = reHex3.exec(format)) ? (m = parseInt(m[1], 16), new Rgb((m >> 8 & 0xf) | (m >> 4 & 0x0f0), (m >> 4 & 0xf) | (m & 0xf0), ((m & 0xf) << 4) | (m & 0xf), 1)) // #f00
	      : (m = reHex6.exec(format)) ? rgbn(parseInt(m[1], 16)) // #ff0000
	      : (m = reRgbInteger.exec(format)) ? new Rgb(m[1], m[2], m[3], 1) // rgb(255, 0, 0)
	      : (m = reRgbPercent.exec(format)) ? new Rgb(m[1] * 255 / 100, m[2] * 255 / 100, m[3] * 255 / 100, 1) // rgb(100%, 0%, 0%)
	      : (m = reRgbaInteger.exec(format)) ? rgba(m[1], m[2], m[3], m[4]) // rgba(255, 0, 0, 1)
	      : (m = reRgbaPercent.exec(format)) ? rgba(m[1] * 255 / 100, m[2] * 255 / 100, m[3] * 255 / 100, m[4]) // rgb(100%, 0%, 0%, 1)
	      : (m = reHslPercent.exec(format)) ? hsla(m[1], m[2] / 100, m[3] / 100, 1) // hsl(120, 50%, 50%)
	      : (m = reHslaPercent.exec(format)) ? hsla(m[1], m[2] / 100, m[3] / 100, m[4]) // hsla(120, 50%, 50%, 1)
	      : named.hasOwnProperty(format) ? rgbn(named[format])
	      : format === "transparent" ? new Rgb(NaN, NaN, NaN, 0)
	      : null;
	}
	
	function rgbn(n) {
	  return new Rgb(n >> 16 & 0xff, n >> 8 & 0xff, n & 0xff, 1);
	}
	
	function rgba(r, g, b, a) {
	  if (a <= 0) r = g = b = NaN;
	  return new Rgb(r, g, b, a);
	}
	
	function rgbConvert(o) {
	  if (!(o instanceof Color)) o = color(o);
	  if (!o) return new Rgb;
	  o = o.rgb();
	  return new Rgb(o.r, o.g, o.b, o.opacity);
	}
	
	function rgb(r, g, b, opacity) {
	  return arguments.length === 1 ? rgbConvert(r) : new Rgb(r, g, b, opacity == null ? 1 : opacity);
	}
	
	function Rgb(r, g, b, opacity) {
	  this.r = +r;
	  this.g = +g;
	  this.b = +b;
	  this.opacity = +opacity;
	}
	
	define(Rgb, rgb, extend(Color, {
	  brighter: function(k) {
	    k = k == null ? brighter : Math.pow(brighter, k);
	    return new Rgb(this.r * k, this.g * k, this.b * k, this.opacity);
	  },
	  darker: function(k) {
	    k = k == null ? darker : Math.pow(darker, k);
	    return new Rgb(this.r * k, this.g * k, this.b * k, this.opacity);
	  },
	  rgb: function() {
	    return this;
	  },
	  displayable: function() {
	    return (0 <= this.r && this.r <= 255)
	        && (0 <= this.g && this.g <= 255)
	        && (0 <= this.b && this.b <= 255)
	        && (0 <= this.opacity && this.opacity <= 1);
	  },
	  toString: function() {
	    var a = this.opacity; a = isNaN(a) ? 1 : Math.max(0, Math.min(1, a));
	    return (a === 1 ? "rgb(" : "rgba(")
	        + Math.max(0, Math.min(255, Math.round(this.r) || 0)) + ", "
	        + Math.max(0, Math.min(255, Math.round(this.g) || 0)) + ", "
	        + Math.max(0, Math.min(255, Math.round(this.b) || 0))
	        + (a === 1 ? ")" : ", " + a + ")");
	  }
	}));
	
	function hsla(h, s, l, a) {
	  if (a <= 0) h = s = l = NaN;
	  else if (l <= 0 || l >= 1) h = s = NaN;
	  else if (s <= 0) h = NaN;
	  return new Hsl(h, s, l, a);
	}
	
	function hslConvert(o) {
	  if (o instanceof Hsl) return new Hsl(o.h, o.s, o.l, o.opacity);
	  if (!(o instanceof Color)) o = color(o);
	  if (!o) return new Hsl;
	  if (o instanceof Hsl) return o;
	  o = o.rgb();
	  var r = o.r / 255,
	      g = o.g / 255,
	      b = o.b / 255,
	      min = Math.min(r, g, b),
	      max = Math.max(r, g, b),
	      h = NaN,
	      s = max - min,
	      l = (max + min) / 2;
	  if (s) {
	    if (r === max) h = (g - b) / s + (g < b) * 6;
	    else if (g === max) h = (b - r) / s + 2;
	    else h = (r - g) / s + 4;
	    s /= l < 0.5 ? max + min : 2 - max - min;
	    h *= 60;
	  } else {
	    s = l > 0 && l < 1 ? 0 : h;
	  }
	  return new Hsl(h, s, l, o.opacity);
	}
	
	function hsl(h, s, l, opacity) {
	  return arguments.length === 1 ? hslConvert(h) : new Hsl(h, s, l, opacity == null ? 1 : opacity);
	}
	
	function Hsl(h, s, l, opacity) {
	  this.h = +h;
	  this.s = +s;
	  this.l = +l;
	  this.opacity = +opacity;
	}
	
	define(Hsl, hsl, extend(Color, {
	  brighter: function(k) {
	    k = k == null ? brighter : Math.pow(brighter, k);
	    return new Hsl(this.h, this.s, this.l * k, this.opacity);
	  },
	  darker: function(k) {
	    k = k == null ? darker : Math.pow(darker, k);
	    return new Hsl(this.h, this.s, this.l * k, this.opacity);
	  },
	  rgb: function() {
	    var h = this.h % 360 + (this.h < 0) * 360,
	        s = isNaN(h) || isNaN(this.s) ? 0 : this.s,
	        l = this.l,
	        m2 = l + (l < 0.5 ? l : 1 - l) * s,
	        m1 = 2 * l - m2;
	    return new Rgb(
	      hsl2rgb(h >= 240 ? h - 240 : h + 120, m1, m2),
	      hsl2rgb(h, m1, m2),
	      hsl2rgb(h < 120 ? h + 240 : h - 120, m1, m2),
	      this.opacity
	    );
	  },
	  displayable: function() {
	    return (0 <= this.s && this.s <= 1 || isNaN(this.s))
	        && (0 <= this.l && this.l <= 1)
	        && (0 <= this.opacity && this.opacity <= 1);
	  }
	}));
	
	/* From FvD 13.37, CSS Color Module Level 3 */
	function hsl2rgb(h, m1, m2) {
	  return (h < 60 ? m1 + (m2 - m1) * h / 60
	      : h < 180 ? m2
	      : h < 240 ? m1 + (m2 - m1) * (240 - h) / 60
	      : m1) * 255;
	}
	
	var deg2rad = Math.PI / 180;
	var rad2deg = 180 / Math.PI;
	
	var Kn = 18;
	var Xn = 0.950470;
	var Yn = 1;
	var Zn = 1.088830;
	var t0 = 4 / 29;
	var t1 = 6 / 29;
	var t2 = 3 * t1 * t1;
	var t3 = t1 * t1 * t1;
	
	function labConvert(o) {
	  if (o instanceof Lab) return new Lab(o.l, o.a, o.b, o.opacity);
	  if (o instanceof Hcl) {
	    var h = o.h * deg2rad;
	    return new Lab(o.l, Math.cos(h) * o.c, Math.sin(h) * o.c, o.opacity);
	  }
	  if (!(o instanceof Rgb)) o = rgbConvert(o);
	  var b = rgb2xyz(o.r),
	      a = rgb2xyz(o.g),
	      l = rgb2xyz(o.b),
	      x = xyz2lab((0.4124564 * b + 0.3575761 * a + 0.1804375 * l) / Xn),
	      y = xyz2lab((0.2126729 * b + 0.7151522 * a + 0.0721750 * l) / Yn),
	      z = xyz2lab((0.0193339 * b + 0.1191920 * a + 0.9503041 * l) / Zn);
	  return new Lab(116 * y - 16, 500 * (x - y), 200 * (y - z), o.opacity);
	}
	
	function lab(l, a, b, opacity) {
	  return arguments.length === 1 ? labConvert(l) : new Lab(l, a, b, opacity == null ? 1 : opacity);
	}
	
	function Lab(l, a, b, opacity) {
	  this.l = +l;
	  this.a = +a;
	  this.b = +b;
	  this.opacity = +opacity;
	}
	
	define(Lab, lab, extend(Color, {
	  brighter: function(k) {
	    return new Lab(this.l + Kn * (k == null ? 1 : k), this.a, this.b, this.opacity);
	  },
	  darker: function(k) {
	    return new Lab(this.l - Kn * (k == null ? 1 : k), this.a, this.b, this.opacity);
	  },
	  rgb: function() {
	    var y = (this.l + 16) / 116,
	        x = isNaN(this.a) ? y : y + this.a / 500,
	        z = isNaN(this.b) ? y : y - this.b / 200;
	    y = Yn * lab2xyz(y);
	    x = Xn * lab2xyz(x);
	    z = Zn * lab2xyz(z);
	    return new Rgb(
	      xyz2rgb( 3.2404542 * x - 1.5371385 * y - 0.4985314 * z), // D65 -> sRGB
	      xyz2rgb(-0.9692660 * x + 1.8760108 * y + 0.0415560 * z),
	      xyz2rgb( 0.0556434 * x - 0.2040259 * y + 1.0572252 * z),
	      this.opacity
	    );
	  }
	}));
	
	function xyz2lab(t) {
	  return t > t3 ? Math.pow(t, 1 / 3) : t / t2 + t0;
	}
	
	function lab2xyz(t) {
	  return t > t1 ? t * t * t : t2 * (t - t0);
	}
	
	function xyz2rgb(x) {
	  return 255 * (x <= 0.0031308 ? 12.92 * x : 1.055 * Math.pow(x, 1 / 2.4) - 0.055);
	}
	
	function rgb2xyz(x) {
	  return (x /= 255) <= 0.04045 ? x / 12.92 : Math.pow((x + 0.055) / 1.055, 2.4);
	}
	
	function hclConvert(o) {
	  if (o instanceof Hcl) return new Hcl(o.h, o.c, o.l, o.opacity);
	  if (!(o instanceof Lab)) o = labConvert(o);
	  var h = Math.atan2(o.b, o.a) * rad2deg;
	  return new Hcl(h < 0 ? h + 360 : h, Math.sqrt(o.a * o.a + o.b * o.b), o.l, o.opacity);
	}
	
	function hcl(h, c, l, opacity) {
	  return arguments.length === 1 ? hclConvert(h) : new Hcl(h, c, l, opacity == null ? 1 : opacity);
	}
	
	function Hcl(h, c, l, opacity) {
	  this.h = +h;
	  this.c = +c;
	  this.l = +l;
	  this.opacity = +opacity;
	}
	
	define(Hcl, hcl, extend(Color, {
	  brighter: function(k) {
	    return new Hcl(this.h, this.c, this.l + Kn * (k == null ? 1 : k), this.opacity);
	  },
	  darker: function(k) {
	    return new Hcl(this.h, this.c, this.l - Kn * (k == null ? 1 : k), this.opacity);
	  },
	  rgb: function() {
	    return labConvert(this).rgb();
	  }
	}));
	
	var A = -0.14861;
	var B = +1.78277;
	var C = -0.29227;
	var D = -0.90649;
	var E = +1.97294;
	var ED = E * D;
	var EB = E * B;
	var BC_DA = B * C - D * A;
	
	function cubehelixConvert(o) {
	  if (o instanceof Cubehelix) return new Cubehelix(o.h, o.s, o.l, o.opacity);
	  if (!(o instanceof Rgb)) o = rgbConvert(o);
	  var r = o.r / 255,
	      g = o.g / 255,
	      b = o.b / 255,
	      l = (BC_DA * b + ED * r - EB * g) / (BC_DA + ED - EB),
	      bl = b - l,
	      k = (E * (g - l) - C * bl) / D,
	      s = Math.sqrt(k * k + bl * bl) / (E * l * (1 - l)), // NaN if l=0 or l=1
	      h = s ? Math.atan2(k, bl) * rad2deg - 120 : NaN;
	  return new Cubehelix(h < 0 ? h + 360 : h, s, l, o.opacity);
	}
	
	function cubehelix(h, s, l, opacity) {
	  return arguments.length === 1 ? cubehelixConvert(h) : new Cubehelix(h, s, l, opacity == null ? 1 : opacity);
	}
	
	function Cubehelix(h, s, l, opacity) {
	  this.h = +h;
	  this.s = +s;
	  this.l = +l;
	  this.opacity = +opacity;
	}
	
	define(Cubehelix, cubehelix, extend(Color, {
	  brighter: function(k) {
	    k = k == null ? brighter : Math.pow(brighter, k);
	    return new Cubehelix(this.h, this.s, this.l * k, this.opacity);
	  },
	  darker: function(k) {
	    k = k == null ? darker : Math.pow(darker, k);
	    return new Cubehelix(this.h, this.s, this.l * k, this.opacity);
	  },
	  rgb: function() {
	    var h = isNaN(this.h) ? 0 : (this.h + 120) * deg2rad,
	        l = +this.l,
	        a = isNaN(this.s) ? 0 : this.s * l * (1 - l),
	        cosh = Math.cos(h),
	        sinh = Math.sin(h);
	    return new Rgb(
	      255 * (l + a * (A * cosh + B * sinh)),
	      255 * (l + a * (C * cosh + D * sinh)),
	      255 * (l + a * (E * cosh)),
	      this.opacity
	    );
	  }
	}));
	
	exports.color = color;
	exports.rgb = rgb;
	exports.hsl = hsl;
	exports.lab = lab;
	exports.hcl = hcl;
	exports.cubehelix = cubehelix;
	
	Object.defineProperty(exports, '__esModule', { value: true });
	
	})));


/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	// https://d3js.org/d3-ease/ Version 1.0.2. Copyright 2016 Mike Bostock.
	(function (global, factory) {
	   true ? factory(exports) :
	  typeof define === 'function' && define.amd ? define(['exports'], factory) :
	  (factory((global.d3 = global.d3 || {})));
	}(this, (function (exports) { 'use strict';
	
	function linear(t) {
	  return +t;
	}
	
	function quadIn(t) {
	  return t * t;
	}
	
	function quadOut(t) {
	  return t * (2 - t);
	}
	
	function quadInOut(t) {
	  return ((t *= 2) <= 1 ? t * t : --t * (2 - t) + 1) / 2;
	}
	
	function cubicIn(t) {
	  return t * t * t;
	}
	
	function cubicOut(t) {
	  return --t * t * t + 1;
	}
	
	function cubicInOut(t) {
	  return ((t *= 2) <= 1 ? t * t * t : (t -= 2) * t * t + 2) / 2;
	}
	
	var exponent = 3;
	
	var polyIn = (function custom(e) {
	  e = +e;
	
	  function polyIn(t) {
	    return Math.pow(t, e);
	  }
	
	  polyIn.exponent = custom;
	
	  return polyIn;
	})(exponent);
	
	var polyOut = (function custom(e) {
	  e = +e;
	
	  function polyOut(t) {
	    return 1 - Math.pow(1 - t, e);
	  }
	
	  polyOut.exponent = custom;
	
	  return polyOut;
	})(exponent);
	
	var polyInOut = (function custom(e) {
	  e = +e;
	
	  function polyInOut(t) {
	    return ((t *= 2) <= 1 ? Math.pow(t, e) : 2 - Math.pow(2 - t, e)) / 2;
	  }
	
	  polyInOut.exponent = custom;
	
	  return polyInOut;
	})(exponent);
	
	var pi = Math.PI;
	var halfPi = pi / 2;
	
	function sinIn(t) {
	  return 1 - Math.cos(t * halfPi);
	}
	
	function sinOut(t) {
	  return Math.sin(t * halfPi);
	}
	
	function sinInOut(t) {
	  return (1 - Math.cos(pi * t)) / 2;
	}
	
	function expIn(t) {
	  return Math.pow(2, 10 * t - 10);
	}
	
	function expOut(t) {
	  return 1 - Math.pow(2, -10 * t);
	}
	
	function expInOut(t) {
	  return ((t *= 2) <= 1 ? Math.pow(2, 10 * t - 10) : 2 - Math.pow(2, 10 - 10 * t)) / 2;
	}
	
	function circleIn(t) {
	  return 1 - Math.sqrt(1 - t * t);
	}
	
	function circleOut(t) {
	  return Math.sqrt(1 - --t * t);
	}
	
	function circleInOut(t) {
	  return ((t *= 2) <= 1 ? 1 - Math.sqrt(1 - t * t) : Math.sqrt(1 - (t -= 2) * t) + 1) / 2;
	}
	
	var b1 = 4 / 11;
	var b2 = 6 / 11;
	var b3 = 8 / 11;
	var b4 = 3 / 4;
	var b5 = 9 / 11;
	var b6 = 10 / 11;
	var b7 = 15 / 16;
	var b8 = 21 / 22;
	var b9 = 63 / 64;
	var b0 = 1 / b1 / b1;
	
	function bounceIn(t) {
	  return 1 - bounceOut(1 - t);
	}
	
	function bounceOut(t) {
	  return (t = +t) < b1 ? b0 * t * t : t < b3 ? b0 * (t -= b2) * t + b4 : t < b6 ? b0 * (t -= b5) * t + b7 : b0 * (t -= b8) * t + b9;
	}
	
	function bounceInOut(t) {
	  return ((t *= 2) <= 1 ? 1 - bounceOut(1 - t) : bounceOut(t - 1) + 1) / 2;
	}
	
	var overshoot = 1.70158;
	
	var backIn = (function custom(s) {
	  s = +s;
	
	  function backIn(t) {
	    return t * t * ((s + 1) * t - s);
	  }
	
	  backIn.overshoot = custom;
	
	  return backIn;
	})(overshoot);
	
	var backOut = (function custom(s) {
	  s = +s;
	
	  function backOut(t) {
	    return --t * t * ((s + 1) * t + s) + 1;
	  }
	
	  backOut.overshoot = custom;
	
	  return backOut;
	})(overshoot);
	
	var backInOut = (function custom(s) {
	  s = +s;
	
	  function backInOut(t) {
	    return ((t *= 2) < 1 ? t * t * ((s + 1) * t - s) : (t -= 2) * t * ((s + 1) * t + s) + 2) / 2;
	  }
	
	  backInOut.overshoot = custom;
	
	  return backInOut;
	})(overshoot);
	
	var tau = 2 * Math.PI;
	var amplitude = 1;
	var period = 0.3;
	
	var elasticIn = (function custom(a, p) {
	  var s = Math.asin(1 / (a = Math.max(1, a))) * (p /= tau);
	
	  function elasticIn(t) {
	    return a * Math.pow(2, 10 * --t) * Math.sin((s - t) / p);
	  }
	
	  elasticIn.amplitude = function(a) { return custom(a, p * tau); };
	  elasticIn.period = function(p) { return custom(a, p); };
	
	  return elasticIn;
	})(amplitude, period);
	
	var elasticOut = (function custom(a, p) {
	  var s = Math.asin(1 / (a = Math.max(1, a))) * (p /= tau);
	
	  function elasticOut(t) {
	    return 1 - a * Math.pow(2, -10 * (t = +t)) * Math.sin((t + s) / p);
	  }
	
	  elasticOut.amplitude = function(a) { return custom(a, p * tau); };
	  elasticOut.period = function(p) { return custom(a, p); };
	
	  return elasticOut;
	})(amplitude, period);
	
	var elasticInOut = (function custom(a, p) {
	  var s = Math.asin(1 / (a = Math.max(1, a))) * (p /= tau);
	
	  function elasticInOut(t) {
	    return ((t = t * 2 - 1) < 0
	        ? a * Math.pow(2, 10 * t) * Math.sin((s - t) / p)
	        : 2 - a * Math.pow(2, -10 * t) * Math.sin((s + t) / p)) / 2;
	  }
	
	  elasticInOut.amplitude = function(a) { return custom(a, p * tau); };
	  elasticInOut.period = function(p) { return custom(a, p); };
	
	  return elasticInOut;
	})(amplitude, period);
	
	exports.easeLinear = linear;
	exports.easeQuad = quadInOut;
	exports.easeQuadIn = quadIn;
	exports.easeQuadOut = quadOut;
	exports.easeQuadInOut = quadInOut;
	exports.easeCubic = cubicInOut;
	exports.easeCubicIn = cubicIn;
	exports.easeCubicOut = cubicOut;
	exports.easeCubicInOut = cubicInOut;
	exports.easePoly = polyInOut;
	exports.easePolyIn = polyIn;
	exports.easePolyOut = polyOut;
	exports.easePolyInOut = polyInOut;
	exports.easeSin = sinInOut;
	exports.easeSinIn = sinIn;
	exports.easeSinOut = sinOut;
	exports.easeSinInOut = sinInOut;
	exports.easeExp = expInOut;
	exports.easeExpIn = expIn;
	exports.easeExpOut = expOut;
	exports.easeExpInOut = expInOut;
	exports.easeCircle = circleInOut;
	exports.easeCircleIn = circleIn;
	exports.easeCircleOut = circleOut;
	exports.easeCircleInOut = circleInOut;
	exports.easeBounce = bounceOut;
	exports.easeBounceIn = bounceIn;
	exports.easeBounceOut = bounceOut;
	exports.easeBounceInOut = bounceInOut;
	exports.easeBack = backInOut;
	exports.easeBackIn = backIn;
	exports.easeBackOut = backOut;
	exports.easeBackInOut = backInOut;
	exports.easeElastic = elasticOut;
	exports.easeElasticIn = elasticIn;
	exports.easeElasticOut = elasticOut;
	exports.easeElasticInOut = elasticInOut;
	
	Object.defineProperty(exports, '__esModule', { value: true });
	
	})));


/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	!function(t,r){ true?r(exports):"function"==typeof define&&define.amd?define(["exports"],r):r(t.d3_rs_theme=t.d3_rs_theme||{})}(this,function(t){"use strict";function r(t){var r=t[0]/255,e=t[1]/255,n=t[2]/255;r=r>.04045?Math.pow((r+.055)/1.055,2.4):r/12.92,e=e>.04045?Math.pow((e+.055)/1.055,2.4):e/12.92,n=n>.04045?Math.pow((n+.055)/1.055,2.4):n/12.92;var a=.4124*r+.3576*e+.1805*n,i=.2126*r+.7152*e+.0722*n,o=.0193*r+.1192*e+.9505*n;return[100*a,100*i,100*o]}function e(t){var e,n,a,i=r(t),o=i[0],u=i[1],f=i[2];return o/=95.047,u/=100,f/=108.883,o=o>.008856?Math.pow(o,1/3):7.787*o+16/116,u=u>.008856?Math.pow(u,1/3):7.787*u+16/116,f=f>.008856?Math.pow(f,1/3):7.787*f+16/116,e=116*u-16,n=500*(o-u),a=200*(u-f),[e,n,a]}function n(t){var r,e,n,a,i=t[0],o=t[1],u=t[2];return i<=8?(e=100*i/903.3,a=7.787*(e/100)+16/116):(e=100*Math.pow((i+16)/116,3),a=Math.pow(e/100,1/3)),r=r/95.047<=.008856?r=95.047*(o/500+a-16/116)/7.787:95.047*Math.pow(o/500+a,3),n=n/108.883<=.008859?n=108.883*(a-u/200-16/116)/7.787:108.883*Math.pow(a-u/200,3),[r,e,n]}function a(t){var r,e,n,a=t[0]/100,i=t[1]/100,o=t[2]/100;return r=3.2406*a+i*-1.5372+o*-.4986,e=a*-.9689+1.8758*i+.0415*o,n=.0557*a+i*-.204+1.057*o,r=r>.0031308?1.055*Math.pow(r,1/2.4)-.055:r*=12.92,e=e>.0031308?1.055*Math.pow(e,1/2.4)-.055:e*=12.92,n=n>.0031308?1.055*Math.pow(n,1/2.4)-.055:n*=12.92,r=Math.min(Math.max(0,r),1),e=Math.min(Math.max(0,e),1),n=Math.min(Math.max(0,n),1),[255*r,255*e,255*n]}function i(t){return a(n(t)).map(function(t){return Math.round(t)})}function o(t){return"#"+t[0].toString(16)+t[1].toString(16)+t[2].toString(16)}function u(t){var r=/^#?([a-f\d])([a-f\d])([a-f\d])$/i;t=t.replace(r,function(t,r,e,n){return r+r+e+e+n+n});var e=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(t);return e?[parseInt(e[1],16),parseInt(e[2],16),parseInt(e[3],16)]:[0,0,0]}function f(t){if("string"==typeof t||t instanceof String)return Math.abs(t.split("").reduce(function(t,r){return t=(t<<5)-t+r.charCodeAt(0),t&t},0));if("number"==typeof t){var r=t%1;if(0===r)return t}return null}function l(t,r){("string"==typeof t||t instanceof String)&&(t=u(t));var n=e(t);return n[0]=n[0]*r,i(n)}function s(t,r){return null==r&&(r=Math.random),function(e){var n=f(e);return null==n?n=Math.floor(r()*t.length):n%=t.length,t[n]}}function c(t){return t&&"object"==typeof t&&"default"in t?t.default:t}function d(t,r){return r={exports:{}},t(r,r.exports),r.exports}function h(){return D(.175,.885,.335,1.155)}function p(t,r,e,n){function a(i){var o=i.selection?i.selection():i,u=void 0!==i.selection,f=o.select("defs");f.empty()&&(f=o.append("defs"));var l=f.select(a.self());l.empty()&&(l=f.append("filter").attr("filterUnits","objectBoundingBox").attr("x","0%").attr("y","0%").attr("width","100%").attr("height","100%").attr("id",t),r(l)),e(l),u===!0&&(l=l.transition(i)),n(l)}return a.id=function(){return t},a.self=function(){return"#"+t},a.url=function(){return"url(#"+t+")"},a.css=function(){return"fill: "+a.url()+";"},a}function g(t){var r=1,e=O.light.shadow,n=3,a="10";null==t&&(t="filter-shadow-"+P,P++);var i=p(t,function(t){t.append("feMorphology").attr("operator","dilate").attr("in","SourceAlpha").attr("result","TEMPLATE"),t.append("feFlood").attr("result","COLOUR"),t.append("feComposite").attr("in","COLOUR").attr("in2","TEMPLATE").attr("operator","in").attr("result","TEMPLATE_COLOUR"),t.append("feGaussianBlur").attr("result","BG");var r=t.append("feMerge");r.append("feMergeNode").attr("in","BG"),r.append("feMergeNode").attr("in","SourceGraphic")},function(t){t.attr("x","-"+a+"%").attr("y","-"+a+"%").attr("width",2*a+100+"%").attr("height",2*a+100+"%")},function(t){t.select("feMorphology").attr("radius",r),t.select("feFlood").attr("flood-color",e),t.select("feGaussianBlur").attr("stdDeviation",n)});return i.morphRadius=function(t){return arguments.length?(r=t,i):r},i.color=function(t){return arguments.length?(e=t,i):e},i.blurRadius=function(t){return arguments.length?(n=t,i):n},i.padding=function(t){return arguments.length?(a=t,i):a},i}function m(t){var r=1;null==t&&(t="filter-greyscale-"+P,P++);var e=p(t,function(t){t.append("feColorMatrix").attr("type","matrix")},function(){},function(t){var e=1/3,n=e*r,a=1-2*n;t.select("feColorMatrix").attr("values",a+" "+n+" "+n+" 0 0 "+n+" "+a+" "+n+" 0 0 "+n+" "+n+" "+a+" 0 0 0 0 0 1 0")});return e.strength=function(t){return arguments.length?(r=t,e):r},e}function w(t){var r=U.standard[U.names.grey],e=.6,n=.8;null==t&&(t="filter-emboss-"+P,P++);var a=p(t,function(t){t.append("feColorMatrix").attr("type","matrix").attr("values","0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0 0 0 1 0");var r=t.append("feComponentTransfer");["feFuncR","feFuncG","feFuncB"].forEach(function(t){r.append(t).attr("type","discrete").attr("tableValues","0.0 0.18 0.75 1.0")}),t.append("feGaussianBlur").attr("stdDeviation",e),t.append("feComponentTransfer").attr("result","TRANSFER").append("feFuncA").attr("type","discrete"),t.append("feFlood").attr("rect","").attr("x","0%").attr("y","0%").attr("width","100%").attr("height","100%").attr("result","FILL"),t.append("feBlend").attr("in","TRANSFER").attr("in2","FILL").attr("mode","multiply")},function(){},function(t){t.select("feFlood").attr("flood-color",r),t.select("feFuncA").attr("tableValues","0.0 "+n)});return a.color=function(t){return arguments.length?(r=t,a):r},a.strength=function(t){return arguments.length?(n=t,a):n},a}function y(t){function r(o){var l=o.selection?o.selection():o,s=l.select("defs");s.empty()&&(s=l.append("defs"));var c=t+"-inner",d=s.select("#"+c);d.empty()&&(d=s.append("pattern").attr("id",c).attr("x",0).attr("y",0).attr("patternUnits","userSpaceOnUse"),d.append("rect")),d.attr("width",e).attr("height",e).attr("patternTransform","rotate("+n+")"),d.select("rect").attr("x",i).attr("y",i).attr("width",a).attr("height",a).attr("fill",f);var h=s.select(r.self());h.empty()&&(h=s.append("pattern").attr("id",t).attr("x",0).attr("y",0).attr("width","100%").attr("height","100%").attr("patternUnits","objectBoundingBox"),h.append("rect").attr("class","pattern-background").attr("x",0).attr("y",0).attr("width","100%").attr("height","100%"),h.append("rect").attr("class","pattern-foreground").attr("x",0).attr("y",0).attr("width","100%").attr("height","100%").attr("fill","url(#"+c+")")),h.select("rect.pattern-background").attr("fill",u)}var e=8,n=45,a=5,i=(e-a)/2,o=2*Math.sqrt(e),u="transparent",f=O.light.highlight;return null==t&&(t="pattern-diagonals-"+W,W++),r.id=function(){return t},r.self=function(){return"#"+t},r.size=function(){return o},r.align=function(t){return Math.round(o*Math.ceil(t/o))},r.url=function(){return"url(#"+t+")"},r.css=function(){return"fill: "+r.url()+";"},r.foreground=function(t){return arguments.length?(f=t,r):f},r.background=function(t){return arguments.length?(u=t,r):u},r}function v(t,r){function e(r){var l=r.selection?r.selection():r,s=l.select("defs");s.empty()&&(s=l.append("defs"));var c=s.select(e.self());c.empty()&&(c=s.append("pattern").attr("id",t).attr("patternUnits","userSpaceOnUse"),c.append("rect").attr("class","pattern-background"),c.append("rect").attr("class","pattern-foreground")),c.attr("width",n).attr("height",n).attr("patternTransform","translate("+a*Math.sin(o*(Math.PI/180))+",0),rotate("+o+")"),c.select("rect.pattern-background").attr("width",n).attr("height",n).attr("fill",u),c.select("rect.pattern-foreground").attr("width",a).attr("height",i).attr("fill",f)}null==r&&(r={});var n=r.size||4,a=r.width||3,i=r.height||3,o=r.angle||45,u="transparent",f=O.light.highlight;return null==t&&(t="pattern-diagonals-"+W,W++),e.id=function(){return t},e.self=function(){return"#"+t},e.url=function(){return"url(#"+t+")"},e.css=function(){return"fill: "+e.url()+";"},e.size=function(t){return arguments.length?(n=t,e):n},e.width=function(t){return arguments.length?(a=t,e):a},e.height=function(t){return arguments.length?(i=t,e):i},e.angle=function(t){return arguments.length?(o=t,e):o},e.foreground=function(t){return arguments.length?(f=t,e):f},e.background=function(t){return arguments.length?(u=t,e):u},e}function b(t){return t<414?"12px":"14px"}var M="0.4.2",x=64,F={lightness:l,light:function(t){return o(l(t,1.6))},medium:function(t){return o(l(t,1.3))}},C={white:function(t){("string"==typeof t||t instanceof String)&&(t=u(t));var r=e(t);return r[0]<x}},A={lightness:function(t){var r=t.map(function(t){var r=t;return Array.isArray(t)||(r=u(t)),[e(r),t]}),n=r.sort(function(t,r){return t[0][0]<r[0][0]?-1:t[0][0]>r[0][0]?-1:0});return n.map(function(t){return t[1]})}},E=["#00ce5c","#d800a2","#00d9d2","#AF5100","#bfbfbf","#DE0000","#F0DE00","#9200ff","#ED9200","#00aeff"],S=["#56d58e","#d95cba","#63eae4","#C78348","#d6d6d6","#E06363","#FFF741","#965ede","#FCBB54","#73c5eb"],k=["#a5e6c3","#eda3da","#9af8f4","#EDC19C","#e5e5e5","#F5AAAA","#F7EFC3","#c6a8ef","#F8D296","#addbf0"],z={green:0,pink:1,aqua:2,brown:3,grey:4,red:5,yellow:6,purple:7,orange:8,blue:9},B={standard:S,darker:E,lighter:k,names:z},R=["#e11010","#0ab93a","#1671f4","#cacaca"],T=["#6a0000","#087927","#0b49a2","#828282"],I={red:0,green:1,blue:2,grey:3},U={standard:R,darker:T,names:I},L=["light","dark"],O={light:{background:"#ffffff",text:"#262626",axis:"#262626",grid:"#e0e0e0",highlight:"rgba(225,16,16,0.5)",lowlight:"rgba(127,127,127,0.3)",shadow:"rgba(127,127,127,0.4)",fillOpacity:.33,negative:{background:"rgba(0, 0, 0, 0.66)",text:"#ffffff"}},dark:{background:"#333333",text:"#ffffff",axis:"#ffffff",grid:"#6d6d6d",highlight:"rgba(225,16,16,0.5)",lowlight:"rgba(127,127,127,0.5)",shadow:"rgba(255,255,255,0.4)",fillOpacity:.33,negative:{background:"rgba(255, 255, 255, 0.85)",text:"#262626"}}},j=d(function(t){function r(t,r){return 1-3*r+3*t}function e(t,r){return 3*r-6*t}function n(t){return 3*t}function a(t,a,i){return((r(a,i)*t+e(a,i))*t+n(a))*t}function i(t,a,i){return 3*r(a,i)*t*t+2*e(a,i)*t+n(a)}function o(t,r,e,n,i){var o,u,f=0;do u=r+(e-r)/2,o=a(u,n,i)-t,o>0?e=u:r=u;while(Math.abs(o)>s&&++f<c);return u}function u(t,r,e,n){for(var o=0;o<f;++o){var u=i(r,e,n);if(0===u)return r;var l=a(r,e,n)-t;r-=l/u}return r}var f=4,l=.001,s=1e-7,c=10,d=11,h=1/(d-1),p="function"==typeof Float32Array;t.exports=function(t,r,e,n){function f(r){for(var n=0,a=1,f=d-1;a!==f&&s[a]<=r;++a)n+=h;--a;var c=(r-s[a])/(s[a+1]-s[a]),p=n+c*h,g=i(p,t,e);return g>=l?u(r,p,t,e):0===g?p:o(r,n,n+h,t,e)}if(!(0<=t&&t<=1&&0<=e&&e<=1))throw new Error("bezier x values must be in [0, 1] range");var s=p?new Float32Array(d):new Array(d);if(t!==r||e!==n)for(var c=0;c<d;++c)s[c]=a(c*h,t,e);return function(i){return t===r&&e===n?i:0===i?0:1===i?1:a(f(i),r,n)}}}),D=c(j),G=400,P=1,_=33.75,N={diagonal1:{angle:_,width:5,height:4,size:5},diagonal2:{angle:_,width:5,height:2,size:5},diagonal3:{angle:_,width:5,height:3,size:5},crosshatch1:{angle:45,width:4,height:4,size:5},crosshatch2:{angle:45,width:3,height:4,size:5},crosshatch3:{angle:45,width:3,height:3,size:5},blocks:{angle:0,width:3,height:4,size:5},redsift:{angle:_,width:3,height:3,size:5}},W=1,q={outline:.5,data:2.5,axis:1,grid:2},V={grid:"2,2"},$='-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',H={fixed:{cssImport:"@import url(https://fonts.googleapis.com/css?family=Source+Code+Pro:300,500);",weightMonochrome:300,weightColor:500,sizeForWidth:b,family:'"Source Code Pro", Consolas, "Liberation Mono", Menlo, Courier, monospace'},variable:{cssImport:"@import url(https://fonts.googleapis.com/css?family=Raleway:400,500);",weightMonochrome:400,weightColor:500,sizeForWidth:b,family:'"Raleway", "Trebuchet MS", '+$},brand:{cssImport:"@import url(https://fonts.googleapis.com/css?family=Electrolize);",weightMonochrome:400,weightColor:400,sizeForWidth:b,family:'"Electrolize", '+$}};t.version=M,t.transform=F,t.random=s,t.contrasts=C,t.sort=A,t.themes=L,t.presentation10=B,t.brand=U,t.display=O,t.duration=G,t.easing=h,t.shadow=g,t.greyscale=m,t.emboss=w,t.angle=_,t.patterns=N,t.diagonals=v,t.highlights=y,t.widths=q,t.dashes=V,t.fonts=H,Object.defineProperty(t,"__esModule",{value:!0})});
	//# sourceMappingURL=d3-rs-theme.umd-es2015.min.js.map


/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(console) {(function (global, factory) {
	     true ? factory(exports) :
	    typeof define === 'function' && define.amd ? define(['exports'], factory) :
	    (factory((global.RedsiftHero = global.RedsiftHero || {})));
	}(this, function (exports) {
	
	    var SCROLL_DURATION = 200;
	
	    // Adapted from https://coderwall.com/p/hujlhg/smooth-scrolling-without-jquery
	    function smooth_scroll_to(element, target, duration) {
	        target = Math.round(target);
	        duration = Math.round(duration);
	        if (duration < 0) {
	            return Promise.reject('bad duration');
	        }
	        if (duration === 0) {
	            element.scrollTop = target;
	            return Promise.resolve('no-duration');
	        }
	
	        var start_time = Date.now();
	        var end_time = start_time + duration;
	
	        var start_top = element.scrollTop;
	        var distance = target - start_top;
	
	        // based on http://en.wikipedia.org/wiki/Smoothstep
	        var smooth_step = function(start, end, point) {
	            if (point <= start) {
	                return 0;
	            }
	            if (point >= end) {
	                return 1;
	            }
	            var x = (point - start) / (end - start); // interpolation
	            return x * x * (3 - 2 * x);
	        }
	
	        return new Promise(function(resolve, reject) {
	            // This is to keep track of where the element's scrollTop is
	            // supposed to be, based on what we're doing
	            var previous_top = element.scrollTop;
	
	            var timer = null;
	            // This is like a think function from a game loop
	            var scroll_frame = function() {
	                /*
	                // This logic is too fragile
	                if(element.scrollTop != previous_top) {
	                    window.clearInterval(timer);
	                    reject('interrupted');
	                    return;
	                }
	                */
	                // set the scrollTop for this frame
	                var now = Date.now();
	                var point = smooth_step(start_time, end_time, now);
	                var frameTop = Math.round(start_top + (distance * point));
	                element.scrollTop = frameTop;
	
	                // check if we're done!
	                if (now >= end_time) {
	                    window.clearInterval(timer);
	                    resolve('done');
	                    return;
	                }
	
	                // If we were supposed to scroll but didn't, then we
	                // probably hit the limit, so consider it done; not
	                // interrupted.
	                if (element.scrollTop === previous_top && element.scrollTop !== frameTop) {
	                    window.clearInterval(timer);
	                    resolve('limit');
	                    return;
	                }
	                previous_top = element.scrollTop;
	            }
	
	            // boostrap the animation process
	            timer = setInterval(scroll_frame, 10);
	        });
	    }
	
	    function clickFor(to, offset) {
	        return function(evt) {
	            var target = document.getElementById(to);
	            if (target === undefined) {
	                return true;
	            }
	            offset = offset || 0;
	            var delta = getAbsoluteBoundingRect(target).top + offset;
	            smooth_scroll_to(document.body, delta, SCROLL_DURATION).catch(function(e) {
	                console.error(e);
	            });
	            evt.preventDefault();
	            return false;
	        }
	    }
	
	    var scrollNodes = [];
	
	    function throttle(type, name, obj) {
	        obj = obj || window;
	        var running = false;
	        var func = function() {
	            if (running) {
	                return;
	            }
	            running = true;
	            requestAnimationFrame(function() {
	                obj.dispatchEvent(new CustomEvent(name));
	                running = false;
	            });
	        };
	        obj.addEventListener(type, func);
	    }
	
	    function onScroll() {
	        var pos = window.scrollY;
	        scrollNodes.forEach(function(params) {
	            var node = params[0];
	            var current = params[1];
	            var cls = params[2];
	            var extents = params[4];
	
	            var state = false;
	            for (var i = 0; i < extents.length; i++) {
	                var extent = extents[i];
	                state = (pos > extent.start && pos < extent.end);
	                if (state) {
	                    break;
	                }
	            }
	
	            if (state === current) {
	                return;
	            }
	            params[1] = state;
	            if (state) {
	                node.classList.add(cls);
	            } else {
	                node.classList.remove(cls);
	            }
	        });
	    }
	
	    function getAbsoluteBoundingRect(el) {
	        var doc = document,
	            win = window,
	            body = doc.body,
	
	            // pageXOffset and pageYOffset work everywhere except IE <9.
	            offsetX = win.pageXOffset !== undefined ? win.pageXOffset :
	            (doc.documentElement || body.parentNode || body).scrollLeft,
	            offsetY = win.pageYOffset !== undefined ? win.pageYOffset :
	            (doc.documentElement || body.parentNode || body).scrollTop,
	
	            rect = el.getBoundingClientRect();
	
	        if (el !== body) {
	            var parent = el.parentNode;
	
	            // The element's rect will be affected by the scroll positions of
	            // *all* of its scrollable parents, not just the window, so we have
	            // to walk up the tree and collect every scroll offset. Good times.
	            while (parent !== body) {
	                offsetX += parent.scrollLeft;
	                offsetY += parent.scrollTop;
	                parent = parent.parentNode;
	            }
	        }
	
	        return {
	            bottom: rect.bottom + offsetY,
	            height: rect.height,
	            left: rect.left + offsetX,
	            right: rect.right + offsetX,
	            top: rect.top + offsetY,
	            width: rect.width
	        };
	    }
	
	    function updateRegions() {
	        scrollNodes.forEach(function(params) {
	            var target = params[0].getBoundingClientRect();
	            var overlap = params[3];
	
	            var nodes = document.querySelectorAll(overlap);
	            var all = [];
	            for (var i = 0; i < nodes.length; i++) {
	                var node = nodes[i];
	                var ext = getAbsoluteBoundingRect(node);
	                all.push({
	                    start: ext.top - target.height,
	                    end: ext.bottom
	                });
	            }
	            params[4] = all;
	        });
	    }
	
	    var Scroll = {
	        initSmooth: function initSmooth(selector, offset) {
	            var nodes = document.querySelectorAll(selector);
	            for (var i = 0; i < nodes.length; i++) {
	                var node = nodes[i];
	                var href = node.attributes.href;
	                if (href === undefined || href.length === 0) {
	                    continue;
	                }
	                var to = href.nodeValue.toString();
	                if (to.substr(0, 1) !== '#') {
	                    continue;
	                }
	
	                node.addEventListener('click', clickFor(to.substr(1), offset), false);
	            }
	        },
	        toggleClass: function toggleClass(selector, cls, overlap) {
	            var nodes = document.querySelectorAll(selector);
	            if (nodes.length > 0) {
	                window.addEventListener('optimizedResize', updateRegions);
	                window.addEventListener('optimizedScroll', onScroll);
	            }
	            for (var i = 0; i < nodes.length; i++) {
	                var node = nodes[i];
	                var param = [node, null, cls, overlap, []];
	
	                // check for this node
	                var found = false;
	                for (var ii = 0; i < scrollNodes.length; i++) {
	                    if (scrollNodes[ii][0] == node) {
	                        scrollNodes[ii] = param;
	                        found = true;
	                        break;
	                    }
	                }
	                if (!found) {
	                    scrollNodes.push(param);
	                }
	            }
	            updateRegions();
	            onScroll();
	        },
	        updateRegions: updateRegions
	    };
	
	    throttle('scroll', 'optimizedScroll');
	    throttle('resize', 'optimizedResize');
	
	    var style = document.createElement("style");
	    document.head.appendChild(style);
	    var sheet = style.sheet;
	
	    var heroTmpl = "<div class=\"hero\">\n    <div class=\"hero__header\">\n        <h3 class=\"hero__header__content\"><!-- yields header --></h3>\n    </div>\n    <div class=\"hero__container\">\n        <div class=\"hero__content\"><!-- yields content --></div>\n    </div>\n</div>\n";
	
	    var RedsiftHero = function RedsiftHero(el, opts) {
	      this.locators = {
	        hero: '.hero',
	        heroContainer: '.hero__container',
	        heroContent: '.hero__content',
	        heroHeader: '.hero__header',
	        heroHeaderContent: '.hero__header__content',
	        heroStickyHeader: '.hero-sticky-header',
	        heroStickyHeaderActive: '.hero-sticky-header--active',
	        scrollDownArrow: '#smooth'
	      }
	
	      this.downArrowHtml = '<div class="down-arrow"></div>';
	      this.hasStickyHeader = false;
	
	      this._setupElement(el, heroTmpl, opts);
	    };
	
	    RedsiftHero.prototype.setHeader = function setHeader(text) {
	      this.$headerContent.innerHTML = text;
	    };
	
	    RedsiftHero.prototype.setBgClass = function setBgClass(bgClass) {
	      this.$hero.className += " " + bgClass;
	    };
	
	    RedsiftHero.prototype.enableStickyHeader = function enableStickyHeader(flag, triggerElSelector) {
	        // NOTE: Do NOT use cached element here. For the first run these elements
	        // are only cached after this feature is handled!
	
	        if (flag) {
	            var $header = document.querySelector(this.locators.heroHeader),
	                $hero = document.querySelector(this.locators.hero);
	
	            if ($header) {
	              $header.classList.remove(this.locators.heroHeader.substr(1));
	              $header.classList.add(this.locators.heroStickyHeader.substr(1));
	              $hero.parentNode.parentNode.appendChild($header);
	            } // else the sticky-header is already present on the page
	
	            if (triggerElSelector && triggerElSelector != '') {
	                try {
	                    // TODO: change toggleClass signature to provide element list instead of selector
	                    //     for '.content' to be more flexible (i.e. provide first element after hero
	                    //     without having to know the name)
	                    Scroll.toggleClass(
	                        this.locators.heroStickyHeader,
	                        this.locators.heroStickyHeaderActive.substr(1),
	                        // FIXXME: replace hardcoded '.content' with something appropriate (based on aboves TODO)!
	                        triggerElSelector
	                    );
	                } catch (err) {
	                    console.log('[redsift-ui/hero] Error enabling sticky header. Did you specify a valid element name for the "sticky-header" attribute?');
	                }
	            }
	
	            this.hasStickyHeader = true;
	        } else {
	            var $header$1 = document.querySelector(this.locators.heroStickyHeader),
	                $hero$1 = document.querySelector(this.locators.hero);
	
	            if ($header$1) {
	                $header$1.classList.add(this.locators.heroHeader.substr(1));
	                $header$1.classList.remove(this.locators.heroStickyHeader.substr(1));
	                $hero$1.insertBefore($header$1, $hero$1.firstChild);
	
	                // TODO: remove toggleClass callback!
	
	                this.hasStickyHeader = false;
	            }
	        }
	    };
	
	    RedsiftHero.prototype.enableScrollFeature = function enableScrollFeature(flag, scrollTarget) {
	      if (flag) {
	        this.$scrollFeature = this._createScrollFeatureElement(scrollTarget);
	        this.$container.appendChild(this.$scrollFeature);
	
	        var offset = this._getStickyHeaderHeight();
	        Scroll.initSmooth(this.locators.scrollDownArrow, -offset);
	      } else if (this.$scrollFeature && this.$scrollFeature.parentNode) {
	        this.$scrollFeature.parentNode.removeChild(this.$scrollFeature);
	      }
	    };
	
	    //----------------------------------------------------------
	    // Private API:
	    //----------------------------------------------------------
	
	    RedsiftHero.prototype._setupElement = function _setupElement(el, heroTmpl, opts) {
	      // Get the user provided inner block of the element, replace the elements
	      // content with the hero tree and insert the content at the correct place.
	      var userTmpl = el.innerHTML;
	      el.innerHTML = heroTmpl;
	
	      var content = document.querySelector(this.locators.heroContent);
	      content.innerHTML = userTmpl;
	
	      // NOTE: handle sticky header before caching, as this.$header is set
	      // differently depending this feature:
	      if (opts.hasStickyHeader) {
	        this.enableStickyHeader(true, opts.stickyHeaderTrigger);
	      }
	
	      this._cacheElements(opts.hasStickyHeader);
	
	      if (opts.header) {
	        this.setHeader(opts.header);
	      }
	
	      if (opts.bgClass) {
	        this.setBgClass(opts.bgClass);
	      }
	
	      if (opts.scrollTarget) {
	        this.enableScrollFeature(true, opts.scrollTarget);
	      }
	    };
	
	    RedsiftHero.prototype._createScrollFeatureElement = function _createScrollFeatureElement(scrollTarget) {
	      var a = document.createElement('a');
	
	      a.id = this.locators.scrollDownArrow.substr(1);
	      a.href = scrollTarget;
	      a.innerHTML = this.downArrowHtml;
	
	      // FIXXME: If the arrow is on the same height as the header it is not
	      // clickable due to the z-index.
	
	      return a;
	    };
	
	    RedsiftHero.prototype._getStickyHeaderHeight = function _getStickyHeaderHeight() {
	        var height = 0;
	
	        try {
	            if (this.hasStickyHeader) {
	                height = this.$header.getBoundingClientRect().height
	            }
	        } catch (err) {
	            console.log('[redsift-ui/hero] Error enabling sticky header. Did you specify a valid element name for the "sticky-header" attribute?');
	        }
	    };
	
	    // TODO: implement generic caching functionality, e.g. this.querySelector(selector, useCache)
	    RedsiftHero.prototype._cacheElements = function _cacheElements(hasStickyHeader) {
	      this.$hero = document.querySelector(this.locators.hero);
	      if (hasStickyHeader) {
	        this.$header = document.querySelector(this.locators.heroStickyHeader);
	      } else {
	        this.$header = document.querySelector(this.locators.heroHeader);
	      }
	      this.$headerContent = document.querySelector(this.locators.heroHeaderContent);
	      this.$container = document.querySelector(this.locators.heroContainer);
	      this.$content = document.querySelector(this.locators.heroContent);
	      this.$scrollFeature = undefined;
	    };
	
	    var RedsiftHeroWebComponent = (function (HTMLElement) {
	      function RedsiftHeroWebComponent () {
	        HTMLElement.apply(this, arguments);
	      }
	
	      RedsiftHeroWebComponent.prototype = Object.create( HTMLElement && HTMLElement.prototype );
	      RedsiftHeroWebComponent.prototype.constructor = RedsiftHeroWebComponent;
	
	      var prototypeAccessors = { header: {},bgClass: {},hasStickyHeader: {},stickyHeader: {},scrollTarget: {} };
	
	      RedsiftHeroWebComponent.prototype.attachedCallback = function attachedCallback() {
	        var stickyHeaderTrigger = this.stickyHeader;
	
	        this.rsHero = new RedsiftHero(this, {
	          hasStickyHeader: this.hasStickyHeader,
	          stickyHeaderTrigger: stickyHeaderTrigger,
	          header: this.header,
	          bgClass: this.bgClass,
	          scrollTarget: this.scrollTarget
	        });
	      };
	
	      RedsiftHeroWebComponent.prototype.attributeChangedCallback = function attributeChangedCallback(attributeName, oldValue, newValue) {
	        if (attributeName === 'scroll-target') {
	          if (!newValue) {
	            this.rsHero.enableScrollFeature(false);
	          }
	
	          if (newValue && !oldValue) {
	            this.rsHero.enableScrollFeature(true, this.scrollTarget);
	          }
	        }
	
	        if (attributeName === 'sticky-header') {
	          if (this.hasStickyHeader) {
	            if (!newValue || newValue == '') {
	              console.log('[redsift-ui] WARNING: No selector specified with "sticky-header" attribute. No "hero-sticky-header--active" class will be added!');
	            }
	            this.rsHero.enableStickyHeader(true, this.stickyHeader);
	          } else {
	            this.rsHero.enableStickyHeader(false);
	          }
	        }
	      };
	
	      //----------------------------------------------------------------------------
	      // Attributes:
	      //----------------------------------------------------------------------------
	
	      prototypeAccessors.header.get = function() {
	        return this.getAttribute('header');
	      };
	
	      prototypeAccessors.header.set = function(val) {
	        this.setAttribute('header', val);
	      };
	
	      prototypeAccessors.bgClass.get = function() {
	        return this.getAttribute('bg-class');
	      };
	
	      prototypeAccessors.bgClass.set = function(val) {
	        this.setAttribute('bg-class', val);
	      };
	
	      prototypeAccessors.hasStickyHeader.get = function() {
	        var a = this.getAttribute('sticky-header');
	        if (a == '' || a) {
	          return true;
	        }
	
	        return false;
	      };
	
	      prototypeAccessors.stickyHeader.get = function() {
	          return this.getAttribute('sticky-header');
	      };
	
	      prototypeAccessors.stickyHeader.set = function(val) {
	        return this.setAttribute('sticky-header', val);
	      };
	
	      prototypeAccessors.scrollTarget.get = function() {
	        return this.getAttribute('scroll-target');
	      };
	
	      prototypeAccessors.scrollTarget.set = function(val) {
	        return this.setAttribute('scroll-target', val);
	      };
	
	      Object.defineProperties( RedsiftHeroWebComponent.prototype, prototypeAccessors );
	
	      return RedsiftHeroWebComponent;
	    }(HTMLElement));
	
	    function registerHeroElement () {
	        try {
	            document.registerElement('rs-hero', RedsiftHeroWebComponent);
	        } catch (e) {
	            console.log('[redsift-ui] Element already exists: ', e);
	        }
	    }
	
	    (function() {
	      if ('registerElement' in document
	          && 'import' in document.createElement('link')
	          && 'content' in document.createElement('template')) {
	        // platform is good!
	        // register the element per default:
	        registerHeroElement();
	      } else {
	        // polyfill the platform!
	        var e = document.createElement('script');
	        e.src = 'https://cdnjs.cloudflare.com/ajax/libs/webcomponentsjs/0.7.22/CustomElements.js';
	        document.body.appendChild(e);
	
	        window.addEventListener('WebComponentsReady', function(e) {
	          // register the element per default:
	          registerHeroElement();
	        });
	      }
	    })();
	
	    exports.registerHeroElement = registerHeroElement;
	    exports.RedsiftHero = RedsiftHero;
	
	    Object.defineProperty(exports, '__esModule', { value: true });
	
	}));
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ },
/* 21 */
/***/ function(module, exports) {

	module.exports = {
		"AAL": {
			"AAR": 99,
			"BRE": 454,
			"CPH": 238,
			"FRA": 790,
			"HUY": 753,
			"OSL": 352
		},
		"AAR": {
			"AAL": 99,
			"CPH": 147,
			"OSL": 434,
			"STN": 835
		},
		"ABJ": {
			"COO": 708,
			"LGW": 5115,
			"OUA": 832
		},
		"ABQ": {
			"DEN": 562,
			"DFW": 914,
			"IAH": 1196,
			"LAX": 1087,
			"ORD": 1796,
			"PHX": 527
		},
		"ABV": {
			"FRA": 4563,
			"LHR": 4776,
			"PHC": 445
		},
		"ABX": {
			"SYD": 450
		},
		"ABZ": {
			"BRS": 648,
			"DUB": 493,
			"FRA": 1064,
			"GLA": 201,
			"GVA": 1344,
			"KOI": 199,
			"LBA": 372,
			"LGW": 685,
			"LHR": 646,
			"LSI": 302,
			"LTN": 604,
			"MAN": 428
		},
		"ACC": {
			"BRU": 5056,
			"FRA": 5007,
			"LGW": 5065,
			"LHR": 5102
		},
		"ACE": {
			"BCN": 1974,
			"BFS": 2920,
			"BGY": 2758,
			"BHX": 2790,
			"BLQ": 2796,
			"BOH": 2620,
			"BRS": 2654,
			"BSL": 2757,
			"BVA": 2641,
			"CRL": 2831,
			"DUB": 2787,
			"EDI": 3111,
			"EIN": 2957,
			"EMA": 2841,
			"FAO": 1039,
			"FCO": 2730,
			"FUE": 60,
			"GLA": 3082,
			"HAM": 3346,
			"HHN": 2923,
			"LBA": 2936,
			"LGW": 2710,
			"LPL": 2850,
			"LTN": 2775,
			"MAD": 1576,
			"MAN": 2867,
			"MXP": 2693,
			"NCL": 3054,
			"NOC": 2803,
			"NRN": 3005,
			"ORK": 2581,
			"PIK": 3040,
			"SCQ": 1619,
			"SDR": 1831,
			"SEN": 2782,
			"SNN": 2670,
			"STN": 2796,
			"SVQ": 1183,
			"SXF": 3428,
			"VLC": 1679,
			"ZAZ": 1813
		},
		"ACT": {
			"DFW": 144
		},
		"ADB": {
			"LGW": 2567,
			"LHR": 2599,
			"MUC": 1667,
			"TXL": 1913
		},
		"ADD": {
			"DAR": 1764,
			"DOH": 2259,
			"FRA": 5350,
			"JED": 1413,
			"JRO": 1393,
			"KGL": 1550,
			"LHR": 5922,
			"MBA": 1450,
			"NBO": 1163
		},
		"ADL": {
			"HKG": 6877,
			"SIN": 5403,
			"SYD": 1164
		},
		"ADW": {
			"EWR": 311,
			"LHR": 5874,
			"SFO": 3937
		},
		"AEB": {
			"CKG": 668
		},
		"AER": {
			"DME": 1338,
			"FRA": 2482
		},
		"AES": {
			"CPH": 856,
			"OSL": 373
		},
		"AGA": {
			"CRL": 2518,
			"LGW": 2435,
			"LHR": 2463,
			"NRN": 2689,
			"STN": 2522
		},
		"AGP": {
			"AMS": 1884,
			"BCN": 766,
			"BFS": 2004,
			"BGY": 1550,
			"BHX": 1768,
			"BLL": 2356,
			"BLQ": 1589,
			"BOH": 1583,
			"BRE": 2093,
			"BRS": 1641,
			"BRU": 1735,
			"BSL": 1564,
			"BUD": 2284,
			"BVA": 1518,
			"CDG": 1486,
			"CGN": 1829,
			"CPH": 2472,
			"CRL": 1691,
			"CWL": 1639,
			"DUB": 1867,
			"DUS": 1853,
			"EDI": 2145,
			"EIN": 1819,
			"EMA": 1813,
			"FCO": 1548,
			"FKB": 1689,
			"FMM": 1741,
			"FMO": 1967,
			"FRA": 1815,
			"GLA": 2135,
			"GOT": 2640,
			"GRO": 852,
			"GVA": 1380,
			"HAM": 2192,
			"HHN": 1752,
			"IBZ": 571,
			"KRK": 2446,
			"LBA": 1924,
			"LCY": 1688,
			"LGW": 1645,
			"LHR": 1677,
			"LPL": 1857,
			"LTN": 1721,
			"MAD": 432,
			"MAN": 1863,
			"MMX": 2493,
			"MRS": 1116,
			"MUC": 1855,
			"MXP": 1486,
			"NCL": 2053,
			"NOC": 1945,
			"NRN": 1860,
			"NUE": 1898,
			"NYO": 2906,
			"ORK": 1715,
			"PIK": 2094,
			"PMI": 708,
			"RYG": 2754,
			"SCQ": 768,
			"SDR": 753,
			"SEN": 1706,
			"SNN": 1815,
			"STN": 1732,
			"SXF": 2243,
			"TRF": 2720,
			"TSF": 1712,
			"TXL": 2246,
			"VLC": 470,
			"VST": 2963,
			"WMI": 2630,
			"WRO": 2332
		},
		"AHO": {
			"AOI": 533,
			"BGY": 572,
			"BLL": 1681,
			"BLQ": 498,
			"BTS": 1096,
			"BVA": 1093,
			"CAG": 166,
			"CIA": 382,
			"CRL": 1132,
			"CUF": 438,
			"DTM": 1211,
			"DUB": 1793,
			"EIN": 1223,
			"FMM": 832,
			"GOT": 1915,
			"GRO": 483,
			"HHN": 1039,
			"LTN": 1414,
			"NRN": 1231,
			"NYO": 2108,
			"PMF": 494,
			"PSA": 381,
			"STN": 1394,
			"TRN": 510,
			"TRS": 713,
			"TSF": 641
		},
		"AKL": {
			"BKK": 9558,
			"HKG": 9172,
			"HNL": 7090,
			"IAH": 11946,
			"LAX": 10489,
			"SFO": 10511,
			"SIN": 8410,
			"SYD": 2160,
			"YVR": 11363
		},
		"ALA": {
			"FRA": 5092,
			"HKG": 4114,
			"LGW": 5622,
			"LHR": 5625,
			"TSE": 950
		},
		"ALB": {
			"CLT": 1040,
			"EWR": 230,
			"IAD": 522,
			"ORD": 1160
		},
		"ALC": {
			"BFS": 1870,
			"BGY": 1179,
			"BHX": 1578,
			"BLL": 2072,
			"BLQ": 1206,
			"BOH": 1393,
			"BRE": 1792,
			"BRS": 1466,
			"BRU": 1458,
			"BSL": 1225,
			"BVA": 1260,
			"CGN": 1524,
			"CPH": 2165,
			"CRL": 1410,
			"CWL": 1474,
			"DUB": 1739,
			"EDI": 1976,
			"EIN": 1536,
			"EMA": 1619,
			"FCO": 1157,
			"FKB": 1357,
			"FRA": 1492,
			"GDN": 2295,
			"GLA": 1977,
			"GOT": 2348,
			"GVA": 1040,
			"HAM": 1887,
			"HAU": 2378,
			"HHN": 1438,
			"HUY": 1700,
			"IBZ": 180,
			"KIR": 1694,
			"KRK": 2074,
			"KTW": 2056,
			"LBA": 1735,
			"LDY": 1929,
			"LGW": 1431,
			"LHR": 1467,
			"LIG": 855,
			"LPL": 1683,
			"LTN": 1511,
			"MAD": 356,
			"MAN": 1681,
			"MME": 1806,
			"MST": 1490,
			"NCL": 1865,
			"NOC": 1848,
			"NQY": 1396,
			"NRN": 1570,
			"NUE": 1553,
			"NYO": 2600,
			"ORK": 1629,
			"OUD": 407,
			"PIK": 1939,
			"POZ": 2067,
			"REU": 351,
			"RYG": 2481,
			"SCQ": 838,
			"SEN": 1481,
			"SNN": 1728,
			"STN": 1514,
			"STR": 1398,
			"SXF": 1908,
			"TMP": 3063,
			"TRF": 2449,
			"VST": 2663,
			"VXO": 2357,
			"WMI": 2271,
			"WRO": 1974
		},
		"ALF": {
			"TOS": 173
		},
		"ALG": {
			"FRA": 1543,
			"LGW": 1630
		},
		"AMA": {
			"DFW": 501
		},
		"AMM": {
			"FRA": 3046,
			"LHR": 3684,
			"VIE": 2449
		},
		"AMS": {
			"AGP": 1884,
			"BCN": 1241,
			"BFS": 771,
			"BHX": 442,
			"BOD": 923,
			"BRS": 524,
			"BSL": 560,
			"CAI": 3288,
			"DUB": 750,
			"EDI": 666,
			"EWR": 5870,
			"FCO": 1297,
			"FRA": 365,
			"GLA": 718,
			"GVA": 682,
			"HAM": 379,
			"IAD": 6208,
			"IAH": 8051,
			"LCY": 335,
			"LGW": 364,
			"LHR": 370,
			"LIN": 831,
			"LIS": 1846,
			"LPL": 524,
			"LTN": 353,
			"LYS": 732,
			"MAN": 486,
			"MRS": 987,
			"MUC": 664,
			"MXP": 796,
			"NAP": 1461,
			"NCE": 979,
			"ORD": 6613,
			"ORK": 906,
			"PHL": 5998,
			"PRG": 705,
			"SEN": 290,
			"STN": 312,
			"SXF": 594,
			"SZG": 772,
			"TFS": 3224,
			"TLS": 997,
			"TLV": 3312,
			"VCE": 937,
			"VIE": 959,
			"YYZ": 5991,
			"ZRH": 603
		},
		"ANC": {
			"KIX": 5909,
			"SEA": 2326,
			"STN": 7170
		},
		"ANU": {
			"LGW": 6565,
			"SKB": 100
		},
		"AOC": {
			"STN": 855
		},
		"AOI": {
			"AHO": 533,
			"CRL": 1016,
			"MUC": 540,
			"NRN": 1039,
			"STN": 1341,
			"TPS": 638
		},
		"ARM": {
			"SYD": 382
		},
		"ARN": {
			"BCN": 2315,
			"BHX": 1451,
			"CPH": 546,
			"DUS": 1162,
			"FRA": 1224,
			"GVA": 1683,
			"HAM": 825,
			"LHR": 1462,
			"LLA": 689,
			"LYS": 1766,
			"MUC": 1317,
			"MXP": 1674,
			"ORD": 6857,
			"TXL": 839
		},
		"ASB": {
			"DME": 2468,
			"FRA": 4118,
			"GYD": 767
		},
		"ASE": {
			"DEN": 201,
			"ORD": 1627
		},
		"ATH": {
			"BGY": 1457,
			"BLQ": 1285,
			"BTS": 1261,
			"BUD": 1123,
			"CFU": 395,
			"CHQ": 268,
			"CIA": 1058,
			"CRL": 2075,
			"DUB": 2876,
			"EDI": 2848,
			"FRA": 1817,
			"HAM": 2045,
			"JMK": 135,
			"JTR": 218,
			"LCA": 930,
			"LGW": 2393,
			"LHR": 2427,
			"MAN": 2637,
			"MLA": 872,
			"MUC": 1518,
			"MXP": 1520,
			"OTP": 759,
			"PFO": 844,
			"RHO": 404,
			"SKG": 299,
			"SOF": 531,
			"STN": 2408,
			"SXF": 1798,
			"WMI": 1634,
			"ZRH": 1639
		},
		"ATL": {
			"CLT": 364,
			"DFW": 1174,
			"EDI": 6439,
			"FRA": 7410,
			"IAD": 859,
			"JFK": 1222,
			"LCQ": 422,
			"LGW": 6792,
			"LHR": 6762,
			"MIA": 959,
			"ORD": 976,
			"PAP": 2063,
			"PHL": 1071,
			"PIK": 6377,
			"SDQ": 2238,
			"STN": 6793
		},
		"ATW": {
			"ORD": 258
		},
		"AUA": {
			"MIA": 1828,
			"ORD": 3707
		},
		"AUH": {
			"FRA": 4864,
			"LHR": 5518,
			"MCT": 380
		},
		"AUS": {
			"DEN": 1249,
			"DFW": 306,
			"EWR": 2417,
			"IAD": 2084,
			"IAH": 225,
			"JFK": 2446,
			"LAX": 1994,
			"LHR": 7894,
			"ORD": 1575,
			"PIK": 7469
		},
		"AXT": {
			"HND": 453
		},
		"AYT": {
			"FRA": 2299,
			"MUC": 2001,
			"TXL": 2212
		},
		"AZO": {
			"ORD": 196
		},
		"BAH": {
			"DMM": 86,
			"DOH": 146,
			"HKG": 6367,
			"LGW": 5068,
			"LHR": 5095,
			"RUH": 420,
			"STN": 5059,
			"ZAZ": 4982
		},
		"BAQ": {
			"BOG": 691
		},
		"BCN": {
			"ACE": 1974,
			"AGP": 766,
			"AMS": 1241,
			"ARN": 2315,
			"BGY": 784,
			"BHX": 1274,
			"BLQ": 831,
			"BOD": 453,
			"BRS": 1180,
			"BRU": 1084,
			"BSL": 822,
			"BUD": 1522,
			"BVA": 907,
			"CDG": 858,
			"CGN": 1133,
			"CIA": 876,
			"CPH": 1769,
			"DUB": 1485,
			"DUS": 1167,
			"EDI": 1677,
			"EMA": 1308,
			"EWR": 6178,
			"FCO": 848,
			"FEZ": 1028,
			"FLR": 797,
			"FRA": 1092,
			"FUE": 2032,
			"GRO": 87,
			"GVA": 637,
			"HAM": 1492,
			"IBZ": 276,
			"JFK": 6151,
			"LGW": 1109,
			"LHR": 1148,
			"LIS": 994,
			"LPA": 2175,
			"LPL": 1388,
			"LTN": 1191,
			"LYS": 549,
			"MAH": 241,
			"MAN": 1379,
			"MIA": 7546,
			"MRS": 350,
			"MUC": 1094,
			"MXP": 720,
			"NAP": 1023,
			"NCE": 496,
			"NCL": 1553,
			"NDR": 831,
			"NYO": 2204,
			"OPO": 898,
			"ORY": 826,
			"PIK": 1653,
			"PMI": 201,
			"PRG": 1358,
			"RAK": 1405,
			"RYG": 2099,
			"SCQ": 883,
			"SDR": 539,
			"SEN": 1147,
			"SOF": 1765,
			"STN": 1185,
			"SVQ": 809,
			"SXF": 1505,
			"TFN": 2195,
			"TFS": 2245,
			"TRN": 626,
			"TSF": 948,
			"TXL": 1510,
			"VCE": 952,
			"VGO": 893,
			"VIE": 1370,
			"VLC": 295,
			"VLL": 578,
			"VNO": 2258,
			"WMI": 1869,
			"XRY": 865,
			"ZRH": 856
		},
		"BDA": {
			"LGW": 5542
		},
		"BDL": {
			"CLT": 1035,
			"DUB": 4942,
			"EWR": 186,
			"IAD": 523,
			"LHR": 5379,
			"ORD": 1257
		},
		"BDS": {
			"BGY": 870,
			"BLQ": 694,
			"BRI": 113,
			"BSL": 1132,
			"CFU": 204,
			"CRL": 1509,
			"EIN": 1539,
			"FCO": 493,
			"GRO": 1275,
			"GVA": 1137,
			"MAN": 2071,
			"MXP": 929,
			"NYO": 2017,
			"PEG": 525,
			"PSA": 707,
			"STN": 1838,
			"TRN": 977,
			"TSF": 724
		},
		"BEB": {
			"GLA": 253
		},
		"BEG": {
			"FRA": 1056,
			"GVA": 1116,
			"LHR": 1702,
			"MUC": 760
		},
		"BES": {
			"LTN": 477,
			"LYS": 780,
			"MRS": 929,
			"OST": 605,
			"STN": 505
		},
		"BEY": {
			"FRA": 2840,
			"LHR": 3482,
			"TXL": 2731
		},
		"BFI": {
			"LHR": 7695
		},
		"BFS": {
			"ACE": 2920,
			"AGP": 2004,
			"ALC": 1870,
			"AMS": 771,
			"BGY": 1505,
			"BHX": 383,
			"BRS": 432,
			"BVA": 810,
			"CDG": 868,
			"CWL": 410,
			"DUB": 137,
			"EDI": 230,
			"FAO": 1966,
			"GDN": 1585,
			"GLA": 176,
			"GVA": 1276,
			"KEF": 1385,
			"KRK": 1825,
			"LGW": 561,
			"LHR": 522,
			"LPL": 264,
			"LTN": 496,
			"LYS": 1275,
			"MAD": 1587,
			"MAN": 295,
			"NCL": 292,
			"PIK": 140,
			"STN": 528,
			"SXF": 1325,
			"TFS": 3076,
			"WMI": 1780,
			"WRO": 1592
		},
		"BGA": {
			"BOG": 289
		},
		"BGI": {
			"LGW": 6760,
			"LHR": 6753
		},
		"BGO": {
			"CPH": 679,
			"FRA": 1160,
			"LHR": 1041,
			"OSL": 324,
			"TXL": 991
		},
		"BGR": {
			"CDG": 5240,
			"FRA": 5586,
			"GYR": 0,
			"KEF": 3552,
			"LAX": 4358,
			"MAN": 4758,
			"MUC": 5881,
			"SFB": 2092
		},
		"BGW": {
			"DOH": 1138
		},
		"BGY": {
			"ACE": 2758,
			"AGP": 1550,
			"AHO": 572,
			"ALC": 1179,
			"ATH": 1457,
			"BCN": 784,
			"BDS": 870,
			"BFS": 1505,
			"BLL": 1120,
			"BLQ": 177,
			"BRE": 822,
			"BRI": 760,
			"BRS": 1111,
			"BTS": 634,
			"BUD": 755,
			"BVA": 707,
			"CAG": 716,
			"CFU": 1072,
			"CGN": 607,
			"CHQ": 1656,
			"CPH": 1125,
			"CRL": 659,
			"CRV": 957,
			"CTA": 1015,
			"DUB": 1433,
			"EFL": 1224,
			"EIN": 716,
			"EMA": 1126,
			"FEZ": 1805,
			"FKB": 366,
			"FUE": 2816,
			"GDN": 1150,
			"GOA": 155,
			"GOT": 1345,
			"GRO": 697,
			"HAM": 885,
			"HHN": 509,
			"IBZ": 1019,
			"INI": 997,
			"KGS": 1752,
			"KLX": 1401,
			"KRK": 896,
			"LBA": 1220,
			"LGW": 949,
			"LIS": 1724,
			"LPA": 2958,
			"LPP": 2086,
			"LTN": 1008,
			"MAD": 1220,
			"MAN": 1212,
			"MLA": 1162,
			"MUC": 337,
			"MXP": 76,
			"NOC": 1607,
			"NRN": 709,
			"NUE": 437,
			"NYO": 1537,
			"OPO": 1559,
			"ORK": 1494,
			"OSR": 771,
			"OTP": 1290,
			"PIK": 1482,
			"PMI": 887,
			"PMO": 879,
			"PRG": 598,
			"PSA": 227,
			"PSR": 507,
			"RAK": 2186,
			"RHO": 1847,
			"RIX": 1590,
			"RYG": 1526,
			"SCQ": 1472,
			"SDR": 1099,
			"SKG": 1218,
			"STN": 977,
			"SUF": 924,
			"SVQ": 1585,
			"SXF": 795,
			"TFS": 3026,
			"TLL": 1829,
			"TMP": 1967,
			"TPS": 893,
			"TRF": 1503,
			"TSF": 193,
			"TSR": 902,
			"VLC": 1079,
			"VNO": 1486,
			"VOL": 1289,
			"VRN": 97,
			"WMI": 1095,
			"WRO": 802,
			"ZAZ": 971
		},
		"BHD": {
			"BRS": 417,
			"EMA": 358,
			"LHR": 502,
			"MAN": 274,
			"STN": 507
		},
		"BHM": {
			"DFW": 959,
			"HSV": 119,
			"IAH": 903,
			"MIA": 1065,
			"ORD": 941
		},
		"BHX": {
			"ACE": 2790,
			"AGP": 1768,
			"ALC": 1578,
			"AMS": 442,
			"ARN": 1451,
			"BCN": 1274,
			"BFS": 383,
			"BLL": 798,
			"BLQ": 1299,
			"BRU": 463,
			"BTS": 1423,
			"BZG": 1324,
			"CDG": 487,
			"CEG": 115,
			"CFU": 2185,
			"CGN": 637,
			"CMF": 939,
			"DOH": 5351,
			"DUB": 321,
			"DUS": 598,
			"EDI": 402,
			"EWR": 5446,
			"FAO": 1784,
			"FRA": 764,
			"FSS": 0,
			"FUE": 2850,
			"GDN": 1352,
			"GLA": 418,
			"GNB": 942,
			"GRO": 1221,
			"GVA": 894,
			"HAJ": 774,
			"HAM": 794,
			"IBZ": 1529,
			"INV": 584,
			"JFK": 5424,
			"KRK": 1515,
			"KTW": 1454,
			"LDY": 457,
			"LHR": 139,
			"LIN": 1118,
			"LPA": 2951,
			"LYS": 898,
			"MAD": 1337,
			"MAN": 106,
			"MJV": 1634,
			"MLA": 2243,
			"MPL": 1074,
			"MUC": 1060,
			"NCL": 287,
			"NYO": 1360,
			"PGF": 1133,
			"PIS": 669,
			"PMI": 1475,
			"PRG": 1141,
			"PSA": 1325,
			"RTM": 425,
			"SNN": 485,
			"SOF": 2160,
			"STN": 149,
			"STR": 879,
			"SXF": 1034,
			"TFS": 2979,
			"TRN": 1058,
			"TRS": 1326,
			"TXL": 1016,
			"VIE": 1384,
			"VNO": 1791,
			"VRN": 1209,
			"WMI": 1512
		},
		"BIA": {
			"FRA": 834,
			"LGW": 1204,
			"LHR": 1244,
			"MUC": 669,
			"TXL": 1148
		},
		"BIL": {
			"DEN": 732
		},
		"BIO": {
			"BRS": 898,
			"DUS": 1147,
			"FRA": 1148,
			"LGW": 896,
			"LHR": 927,
			"MAD": 316,
			"MAN": 1119,
			"MUC": 1267,
			"STN": 983
		},
		"BIQ": {
			"CDG": 691,
			"CRL": 899,
			"DUB": 1160,
			"LHR": 894,
			"NYO": 2120,
			"STN": 945
		},
		"BJL": {
			"BRU": 4592
		},
		"BJM": {
			"KGL": 176
		},
		"BJV": {
			"FRA": 2083,
			"LGW": 2680,
			"MUC": 1783
		},
		"BJX": {
			"DFW": 1394,
			"IAH": 1174
		},
		"BKK": {
			"AKL": 9558,
			"BNE": 7262,
			"CNX": 596,
			"FRA": 9004,
			"HAN": 995,
			"HKT": 673,
			"KBV": 650,
			"KUL": 1220,
			"LHR": 9580,
			"MEL": 7333,
			"MUC": 8802,
			"PEN": 933,
			"PER": 5327,
			"PNH": 504,
			"REP": 332,
			"RGN": 611,
			"SGN": 716,
			"SYD": 7516,
			"TPE": 2490,
			"USM": 465,
			"VIE": 8453,
			"VTE": 516
		},
		"BLK": {
			"DUB": 217,
			"STN": 303
		},
		"BLL": {
			"AGP": 2356,
			"AHO": 1681,
			"ALC": 2072,
			"BGY": 1120,
			"BHX": 798,
			"BUD": 1155,
			"CCF": 1476,
			"CFU": 1962,
			"CHQ": 2519,
			"CIA": 1570,
			"DUS": 519,
			"EDI": 781,
			"FAO": 2447,
			"FRA": 636,
			"GRO": 1607,
			"HUY": 656,
			"LCY": 761,
			"LHR": 790,
			"MAN": 782,
			"MLA": 2248,
			"OSL": 508,
			"PMI": 1861,
			"PSA": 1343,
			"STN": 724,
			"TFS": 3699
		},
		"BLQ": {
			"ACE": 2796,
			"AGP": 1589,
			"AHO": 498,
			"ALC": 1206,
			"ATH": 1285,
			"BCN": 831,
			"BDS": 694,
			"BGY": 177,
			"BHX": 1299,
			"BOD": 949,
			"BRI": 584,
			"BRS": 1288,
			"BVA": 884,
			"CAG": 616,
			"CPH": 1236,
			"CRL": 834,
			"CTA": 847,
			"DUB": 1611,
			"EDI": 1636,
			"FRA": 644,
			"IBZ": 1035,
			"KGS": 1582,
			"KRK": 888,
			"LGW": 1127,
			"LHR": 1163,
			"LPA": 2999,
			"MAD": 1295,
			"MAN": 1389,
			"MLA": 1002,
			"MUC": 426,
			"NRN": 873,
			"OTP": 1172,
			"PMI": 897,
			"PMO": 723,
			"RHO": 1679,
			"SKG": 1055,
			"STN": 1154,
			"SUF": 748,
			"SVQ": 1641,
			"SXF": 887,
			"TFS": 3073,
			"TPS": 743,
			"TSF": 142,
			"TXL": 904,
			"VGO": 1625,
			"VLC": 1121,
			"WMI": 1116,
			"WRO": 841
		},
		"BLR": {
			"FRA": 7423,
			"LHR": 8067
		},
		"BMA": {
			"HEL": 406
		},
		"BNA": {
			"CLT": 527,
			"DFW": 1014,
			"EWR": 1201,
			"IAD": 871,
			"JFK": 1230,
			"ORD": 659,
			"YYZ": 1032
		},
		"BNE": {
			"BKK": 7262,
			"HKG": 6950,
			"SIN": 6144,
			"SYD": 753
		},
		"BOD": {
			"AMS": 923,
			"BCN": 453,
			"BLQ": 949,
			"BRS": 743,
			"BRU": 778,
			"BSL": 704,
			"CIA": 1127,
			"CRL": 736,
			"DUB": 1036,
			"EDI": 1251,
			"GVA": 554,
			"LGW": 704,
			"LIL": 698,
			"LIS": 968,
			"LTN": 784,
			"LYS": 465,
			"MAD": 535,
			"MRS": 497,
			"MXP": 744,
			"NCE": 644,
			"OPO": 759,
			"ORK": 967,
			"RAK": 1602,
			"STN": 788,
			"SVQ": 930,
			"SXF": 1338,
			"VCE": 1026
		},
		"BOG": {
			"BAQ": 691,
			"BGA": 289,
			"CLO": 279,
			"CTG": 656,
			"EOH": 232,
			"FRA": 9087,
			"LHR": 8475,
			"MAD": 8033,
			"MDE": 215,
			"MEX": 3159,
			"MIA": 2435,
			"PEI": 176
		},
		"BOH": {
			"ACE": 2620,
			"AGP": 1583,
			"ALC": 1393,
			"CCF": 897,
			"CHQ": 2681,
			"CMF": 808,
			"DUB": 421,
			"EDI": 583,
			"FAO": 1606,
			"FCO": 1468,
			"FUE": 2680,
			"GRO": 1048,
			"GVA": 772,
			"IBZ": 1348,
			"JER": 176,
			"JFK": 5472,
			"KRK": 1528,
			"LGW": 122,
			"LIG": 590,
			"LPA": 2785,
			"MJV": 1448,
			"MLA": 2111,
			"OPO": 1183,
			"PIK": 556,
			"PMI": 1298,
			"REU": 1096,
			"RHO": 2862,
			"STN": 189,
			"TFS": 2815
		},
		"BOI": {
			"DEN": 1042,
			"DFW": 2045,
			"ORD": 2307,
			"SEA": 641,
			"SLC": 466
		},
		"BOM": {
			"FRA": 6572,
			"LHR": 7215,
			"MUC": 6313,
			"SGN": 3737,
			"STN": 7167
		},
		"BOO": {
			"OSL": 802
		},
		"BOS": {
			"CLT": 1171,
			"DEN": 2816,
			"DFW": 2509,
			"DUB": 4804,
			"FRA": 5889,
			"IAD": 663,
			"JFK": 300,
			"LAX": 4194,
			"LGA": 296,
			"LHR": 5240,
			"MAD": 5474,
			"MIA": 2028,
			"MUC": 6182,
			"ORD": 1391,
			"PHL": 450,
			"PHX": 3694,
			"SAT": 2836,
			"SNN": 4647
		},
		"BQH": {
			"BWE": 731
		},
		"BRE": {
			"AAL": 454,
			"AGP": 2093,
			"ALC": 1792,
			"BGY": 822,
			"BRE": 0,
			"BRU": 379,
			"BZR": 1153,
			"CFU": 1717,
			"CHQ": 2289,
			"DRS": 401,
			"DSA": 0,
			"EDI": 847,
			"ERF": 273,
			"ETZ": 485,
			"FAO": 2205,
			"FMO": 125,
			"FRA": 336,
			"FUE": 3305,
			"GRO": 1318,
			"HAJ": 88,
			"LCY": 618,
			"LIS": 2095,
			"LPA": 3426,
			"MAN": 737,
			"MUC": 563,
			"MXP": 824,
			"NUE": 425,
			"NYO": 813,
			"OPO": 1852,
			"PAD": 159,
			"PMI": 1570,
			"PRG": 500,
			"RIX": 1057,
			"RLG": 250,
			"SCN": 442,
			"SKG": 1756,
			"STN": 593,
			"STR": 485,
			"TFS": 3472,
			"TLL": 1213,
			"TMP": 1283,
			"TSF": 858,
			"VNO": 1094
		},
		"BRI": {
			"BDS": 113,
			"BGY": 760,
			"BLQ": 584,
			"BVA": 1468,
			"CAG": 687,
			"CRL": 1405,
			"DUB": 2193,
			"FCO": 383,
			"FKB": 1088,
			"GOA": 741,
			"HHN": 1225,
			"KGS": 1014,
			"LGW": 1709,
			"MLA": 620,
			"MST": 1376,
			"MUC": 893,
			"MXP": 818,
			"NRN": 1417,
			"PSA": 594,
			"STN": 1732,
			"SXF": 1274,
			"TRN": 865,
			"TRS": 585,
			"TSF": 622,
			"VLC": 1471
		},
		"BRO": {
			"DFW": 778,
			"IAH": 497
		},
		"BRQ": {
			"MUC": 370,
			"STN": 1200
		},
		"BRR": {
			"GLA": 224
		},
		"BRS": {
			"ABZ": 648,
			"ACE": 2654,
			"AGP": 1641,
			"ALC": 1466,
			"AMS": 524,
			"BCN": 1180,
			"BFS": 432,
			"BGY": 1111,
			"BHD": 417,
			"BIO": 898,
			"BLQ": 1288,
			"BOD": 743,
			"BRU": 505,
			"BSL": 851,
			"BUD": 1642,
			"BZR": 1005,
			"CDG": 458,
			"CDT": 0,
			"CHQ": 2768,
			"CPH": 1117,
			"CWL": 43,
			"DUB": 330,
			"EDI": 509,
			"EGC": 767,
			"EIN": 561,
			"FAO": 1650,
			"FCO": 1557,
			"FNC": 2371,
			"FRA": 806,
			"FUE": 2714,
			"GDN": 1454,
			"GIB": 1706,
			"GLA": 511,
			"GNB": 894,
			"GRO": 1133,
			"GVA": 862,
			"IBZ": 1427,
			"INN": 1115,
			"INV": 690,
			"IOM": 326,
			"JER": 244,
			"KEF": 1817,
			"KRK": 1584,
			"KTT": 2349,
			"KUN": 1818,
			"LIG": 677,
			"LIS": 1488,
			"LPA": 2815,
			"MAD": 1212,
			"MJV": 1520,
			"MLA": 2201,
			"MUC": 1090,
			"NCL": 412,
			"NOC": 498,
			"OPO": 1215,
			"OTP": 2258,
			"PFO": 3360,
			"PGF": 1049,
			"PMI": 1381,
			"POZ": 1342,
			"PRG": 1200,
			"PSA": 1301,
			"RAK": 2242,
			"REU": 1176,
			"RZE": 1738,
			"STN": 211,
			"SXF": 1118,
			"SZG": 1199,
			"TFS": 2842,
			"TLS": 914,
			"TRN": 1028,
			"TSF": 1267,
			"VCE": 1286,
			"VIE": 1428,
			"WMI": 1600,
			"WRO": 1361
		},
		"BRU": {
			"ACC": 5056,
			"AGP": 1735,
			"ALC": 1458,
			"BCN": 1084,
			"BHX": 463,
			"BJL": 4592,
			"BOD": 778,
			"BRE": 379,
			"BRS": 505,
			"BSL": 429,
			"BTS": 966,
			"CRL": 49,
			"DKR": 4478,
			"DUB": 784,
			"EDI": 764,
			"EWR": 5908,
			"FCO": 1172,
			"FIH": 6237,
			"FRA": 303,
			"GNB": 619,
			"GVA": 532,
			"HAJ": 398,
			"HAM": 481,
			"IAD": 6248,
			"JFK": 5887,
			"KGL": 6363,
			"LCA": 2937,
			"LHR": 350,
			"LIN": 702,
			"LIS": 1717,
			"MAD": 1313,
			"MAN": 535,
			"MLA": 1854,
			"MUC": 597,
			"MXP": 664,
			"NAP": 1345,
			"NBO": 6568,
			"NCE": 831,
			"NUE": 493,
			"OPO": 1473,
			"ORD": 6677,
			"OUA": 4321,
			"PMI": 1269,
			"STN": 314,
			"SXF": 644,
			"TSF": 815,
			"TXL": 633,
			"VLC": 1326,
			"VNO": 1453,
			"VRN": 774,
			"YUL": 5555,
			"YYZ": 6046,
			"ZRH": 483
		},
		"BSB": {
			"GIG": 914,
			"GRU": 854
		},
		"BSL": {
			"ACE": 2757,
			"AGP": 1564,
			"ALC": 1225,
			"AMS": 560,
			"BCN": 822,
			"BDS": 1132,
			"BOD": 704,
			"BRS": 851,
			"BRU": 429,
			"BUD": 880,
			"CGN": 365,
			"CPH": 959,
			"CTA": 1282,
			"DRS": 599,
			"DUB": 1168,
			"DUS": 415,
			"EDI": 1191,
			"FCO": 743,
			"FNC": 2628,
			"FRA": 280,
			"FUE": 2817,
			"HAM": 693,
			"KRK": 937,
			"LCA": 2581,
			"LGW": 684,
			"LHR": 720,
			"LIS": 1663,
			"LPA": 2950,
			"LTN": 740,
			"MAD": 1185,
			"MAN": 943,
			"MPL": 525,
			"MUC": 328,
			"NAP": 919,
			"NCE": 437,
			"NTE": 689,
			"OPO": 1464,
			"PMI": 973,
			"PRG": 566,
			"PRN": 1196,
			"PSA": 488,
			"RAK": 2213,
			"SCQ": 1350,
			"STN": 708,
			"SXF": 683,
			"TFS": 3010,
			"TLS": 650,
			"TLV": 2884,
			"VCE": 435
		},
		"BSR": {
			"DOH": 702
		},
		"BTL": {
			"JFK": 0
		},
		"BTR": {
			"DFW": 615,
			"IAH": 407
		},
		"BTS": {
			"AHO": 1096,
			"ATH": 1261,
			"BGY": 634,
			"BHX": 1423,
			"BRU": 966,
			"BVA": 1113,
			"CFU": 977,
			"CIA": 795,
			"CRL": 958,
			"DUB": 1741,
			"EDI": 1642,
			"GRO": 1329,
			"INI": 646,
			"LBA": 1458,
			"LPL": 1517,
			"LTN": 1318,
			"MAD": 1852,
			"MAN": 1481,
			"PMI": 1501,
			"STN": 1278,
			"SXF": 536,
			"TPS": 1203,
			"VDA": 2527
		},
		"BUD": {
			"AGP": 2284,
			"ATH": 1123,
			"BCN": 1522,
			"BGY": 755,
			"BLL": 1155,
			"BRS": 1642,
			"BSL": 880,
			"BVA": 1281,
			"CDG": 1247,
			"CFU": 873,
			"CIA": 818,
			"CPH": 1017,
			"CRL": 1130,
			"DUB": 1914,
			"DUS": 999,
			"EMA": 1578,
			"FRA": 836,
			"GVA": 1007,
			"LGW": 1464,
			"LHR": 1489,
			"LPA": 3693,
			"LYS": 1097,
			"MAD": 1974,
			"MAN": 1654,
			"MLA": 1347,
			"MUC": 566,
			"MXP": 829,
			"NUE": 645,
			"PIK": 1866,
			"PSA": 805,
			"STN": 1450,
			"SXF": 685,
			"TMP": 1579,
			"TSF": 575,
			"TXL": 711,
			"VCE": 570,
			"VDA": 2365
		},
		"BUF": {
			"EWR": 453,
			"IAD": 457,
			"ORD": 759
		},
		"BVA": {
			"ACE": 2641,
			"AGP": 1518,
			"AHO": 1093,
			"ALC": 1260,
			"BCN": 907,
			"BFS": 810,
			"BGY": 707,
			"BLQ": 884,
			"BRI": 1468,
			"BTS": 1113,
			"BUD": 1281,
			"BZR": 688,
			"CAG": 1260,
			"CIA": 1176,
			"DUB": 728,
			"EDI": 810,
			"FAO": 1603,
			"FEZ": 1822,
			"FSC": 1037,
			"GOT": 1130,
			"GRO": 841,
			"KRK": 1268,
			"LIS": 1485,
			"MAD": 1091,
			"MAN": 529,
			"NDR": 1662,
			"NYO": 1411,
			"OPO": 1240,
			"OUD": 1664,
			"PIK": 811,
			"PMI": 1102,
			"PMO": 1529,
			"PSA": 900,
			"PSR": 1214,
			"PUY": 1025,
			"RAK": 2157,
			"RBA": 1861,
			"RYG": 1236,
			"SKG": 1908,
			"SNN": 850,
			"STN": 300,
			"SVQ": 1484,
			"TFS": 2863,
			"TNG": 1660,
			"TPS": 1528,
			"TRS": 940,
			"TSF": 866,
			"VLC": 1127,
			"VNO": 1677,
			"WMI": 1336,
			"WRO": 1064,
			"ZAD": 1167,
			"ZAZ": 900
		},
		"BVE": {
			"STN": 754
		},
		"BWE": {
			"BQH": 731
		},
		"BWI": {
			"CLT": 580,
			"DFW": 1955,
			"EWR": 271,
			"IAD": 72,
			"JFK": 295,
			"LHR": 5834,
			"MIA": 1526,
			"ORD": 998,
			"YYR": 1999,
			"YYT": 2137
		},
		"BZE": {
			"MIA": 1236
		},
		"BZG": {
			"BHX": 1324,
			"DUB": 1605,
			"FRA": 735,
			"GLA": 1473,
			"NRN": 820,
			"STN": 1206
		},
		"BZN": {
			"DEN": 843,
			"ORD": 1904
		},
		"BZR": {
			"BRE": 1153,
			"BRS": 1005,
			"BVA": 688,
			"EDI": 1483,
			"LTN": 990,
			"MAN": 1189,
			"MRS": 150,
			"NRN": 944,
			"NYO": 1955,
			"RYG": 1856
		},
		"CAE": {
			"DFW": 1480,
			"IAD": 645,
			"ORD": 1073
		},
		"CAG": {
			"AHO": 166,
			"BGY": 716,
			"BLQ": 616,
			"BRI": 687,
			"BVA": 1260,
			"CIA": 412,
			"CRL": 1297,
			"CUF": 600,
			"EDI": 2070,
			"FKB": 1062,
			"FRA": 1199,
			"GOA": 574,
			"HHN": 1198,
			"KRK": 1470,
			"KUN": 2075,
			"LGW": 1505,
			"LHR": 1546,
			"MAD": 1085,
			"MAN": 1788,
			"MRS": 565,
			"MUC": 1035,
			"MXP": 710,
			"NRN": 1392,
			"PEG": 516,
			"PMF": 628,
			"PSA": 505,
			"PSR": 557,
			"STN": 1561,
			"TPS": 333,
			"TSF": 756,
			"VLC": 819,
			"VRN": 699
		},
		"CAI": {
			"AMS": 3288,
			"FRA": 2923,
			"LHR": 3533,
			"MUC": 2623
		},
		"CAK": {
			"CLE": 64,
			"EWR": 612,
			"ORD": 551
		},
		"CAL": {
			"GLA": 92
		},
		"CAN": {
			"PEK": 1881
		},
		"CBG": {
			"GOT": 980,
			"GVA": 790,
			"LGW": 120,
			"PAE": 7623
		},
		"CBR": {
			"SIN": 6212,
			"SYD": 236
		},
		"CCF": {
			"BLL": 1476,
			"BOH": 897,
			"CRL": 821,
			"DUB": 1298,
			"EDI": 1473,
			"EIN": 944,
			"EMA": 1102,
			"GLA": 1487,
			"LBA": 1219,
			"LPL": 1187,
			"MAN": 1176,
			"OPO": 930,
			"ORK": 1253,
			"PIK": 1453,
			"STN": 976
		},
		"CCS": {
			"FRA": 8076,
			"LGW": 7483,
			"MAD": 7007,
			"MUC": 8303
		},
		"CCU": {
			"FRA": 7394
		},
		"CDG": {
			"AGP": 1486,
			"BCN": 858,
			"BFS": 868,
			"BGR": 5240,
			"BHX": 487,
			"BIQ": 691,
			"BRS": 458,
			"BUD": 1247,
			"CPH": 1003,
			"CTA": 1631,
			"CWL": 496,
			"DFW": 7946,
			"DUB": 785,
			"DUS": 392,
			"EDI": 868,
			"EWR": 5858,
			"FAO": 1581,
			"FRA": 447,
			"GLA": 896,
			"HAM": 728,
			"IAD": 6199,
			"JFK": 5835,
			"KRK": 1246,
			"LGW": 307,
			"LHR": 347,
			"LIN": 644,
			"LIS": 1470,
			"LPL": 610,
			"LTN": 379,
			"MAD": 1062,
			"MAN": 588,
			"MIA": 7373,
			"MUC": 681,
			"MXP": 598,
			"NAP": 1289,
			"NCE": 694,
			"OPO": 1231,
			"ORD": 6666,
			"ORK": 842,
			"PHL": 5985,
			"PRG": 852,
			"PRN": 1596,
			"RAK": 2129,
			"SEN": 313,
			"SFO": 8964,
			"STN": 359,
			"SVQ": 1457,
			"TFS": 2847,
			"TLS": 605,
			"TLV": 3285,
			"TXL": 850,
			"VCE": 835,
			"VIE": 1035,
			"YMX": 5529,
			"YUL": 5525,
			"YYZ": 6021
		},
		"CDT": {
			"BRS": 0,
			"SOF": 0,
			"STN": 0
		},
		"CEG": {
			"BHX": 115
		},
		"CEK": {
			"DME": 1484
		},
		"CFE": {
			"OPO": 1079,
			"STN": 711
		},
		"CFS": {
			"SYD": 442
		},
		"CFU": {
			"ATH": 395,
			"BDS": 204,
			"BGY": 1072,
			"BHX": 2185,
			"BLL": 1962,
			"BRE": 1717,
			"BTS": 977,
			"BUD": 873,
			"CGN": 1598,
			"CRL": 1706,
			"EDI": 2493,
			"EIN": 1731,
			"EMA": 2184,
			"FCO": 690,
			"HHN": 1519,
			"KTW": 1211,
			"LBA": 2267,
			"LHR": 2052,
			"MAN": 2268,
			"MUC": 1169,
			"NRN": 1705,
			"PIK": 2526,
			"POZ": 1445,
			"PSA": 911,
			"RYG": 2291,
			"RZE": 1180,
			"SKG": 279,
			"STN": 2037,
			"TSF": 921,
			"WMI": 1430
		},
		"CGK": {
			"HKG": 3259,
			"SIN": 882,
			"XMN": 3630
		},
		"CGN": {
			"AGP": 1829,
			"ALC": 1524,
			"BCN": 1133,
			"BGY": 607,
			"BHX": 637,
			"BSL": 365,
			"CFU": 1598,
			"CIA": 1091,
			"CPH": 643,
			"CVG": 6869,
			"DKR": 4584,
			"DUB": 956,
			"EDI": 896,
			"EMA": 621,
			"FAE": 1521,
			"FAO": 1951,
			"FDH": 394,
			"FRA": 136,
			"GRO": 1051,
			"HAM": 363,
			"JFK": 6061,
			"LHR": 534,
			"LPA": 3175,
			"MAD": 1419,
			"MAN": 699,
			"MIA": 7643,
			"MLA": 1769,
			"MUC": 435,
			"OPO": 1617,
			"PIK": 935,
			"PMI": 1304,
			"RIX": 1287,
			"SOF": 1530,
			"STN": 492,
			"SXF": 471,
			"TBS": 3042,
			"TFS": 3224,
			"TXL": 463,
			"VIE": 746,
			"VLC": 1397,
			"WMI": 947,
			"ZRH": 391
		},
		"CGQ": {
			"PEK": 804
		},
		"CHC": {
			"SIN": 8405,
			"SYD": 2126
		},
		"CHQ": {
			"ATH": 268,
			"BGY": 1656,
			"BLL": 2519,
			"BOH": 2681,
			"BRE": 2289,
			"BRS": 2768,
			"CRL": 2293,
			"DUB": 3087,
			"EIN": 2316,
			"EMA": 2770,
			"FCO": 1244,
			"FMM": 1797,
			"GLA": 3127,
			"HHN": 2105,
			"KTW": 1711,
			"LBA": 2854,
			"LHR": 2638,
			"MAN": 2855,
			"MRS": 1841,
			"NRN": 2289,
			"NYO": 2640,
			"PFO": 763,
			"PSA": 1483,
			"RYG": 2824,
			"SKG": 564,
			"STN": 2624,
			"VNO": 2126,
			"WMI": 1902,
			"WRO": 1826
		},
		"CHR": {
			"PIK": 1056,
			"STN": 569
		},
		"CHS": {
			"DFW": 1585,
			"EWR": 1011,
			"IAD": 711,
			"IAH": 1486,
			"ORD": 1224
		},
		"CIA": {
			"AHO": 382,
			"ATH": 1058,
			"BCN": 876,
			"BLL": 1570,
			"BOD": 1127,
			"BTS": 795,
			"BUD": 818,
			"BVA": 1176,
			"CAG": 412,
			"CGN": 1091,
			"CPH": 1536,
			"CRL": 1148,
			"DUB": 1905,
			"EDI": 1949,
			"EFL": 787,
			"EIN": 1205,
			"EMA": 1609,
			"FEZ": 1769,
			"FMM": 712,
			"GOT": 1764,
			"HHN": 995,
			"IBZ": 1004,
			"KRK": 1074,
			"LIS": 1868,
			"LPL": 1721,
			"LTN": 1488,
			"MAD": 1359,
			"MAN": 1695,
			"MLA": 680,
			"MME": 1748,
			"NRN": 1195,
			"NUE": 864,
			"OPO": 1768,
			"ORK": 1943,
			"OTP": 1136,
			"PEG": 144,
			"PFO": 1901,
			"PIK": 1968,
			"POZ": 1223,
			"PRG": 932,
			"PSA": 276,
			"RAK": 2152,
			"RBA": 1897,
			"RHO": 1462,
			"RYG": 1959,
			"SDR": 1353,
			"SKG": 879,
			"SOF": 895,
			"STN": 1459,
			"SUF": 446,
			"SVQ": 1653,
			"SXF": 1178,
			"TPS": 432,
			"VLC": 1131,
			"VNO": 1703,
			"WMI": 1330,
			"WRO": 1085
		},
		"CID": {
			"ORD": 315
		},
		"CIY": {
			"CRL": 1701,
			"DUB": 2434,
			"FCO": 571,
			"HHN": 1555,
			"MXP": 1077,
			"NRN": 1755,
			"PSA": 824,
			"STN": 2003
		},
		"CKG": {
			"AEB": 668,
			"PEK": 1464,
			"PVG": 1461,
			"SHA": 1417
		},
		"CKY": {
			"DKR": 712
		},
		"CLE": {
			"CAK": 64,
			"CLT": 693,
			"EWR": 648,
			"IAD": 463,
			"IAH": 1756,
			"MIA": 1743,
			"ORD": 506,
			"YYZ": 310
		},
		"CLJ": {
			"MUC": 908
		},
		"CLL": {
			"DFW": 264,
			"IAH": 118
		},
		"CLO": {
			"BOG": 279,
			"MDE": 310
		},
		"CLT": {
			"ALB": 1040,
			"ATL": 364,
			"BDL": 1035,
			"BNA": 527,
			"BOS": 1171,
			"BWI": 580,
			"CLE": 693,
			"DCA": 532,
			"DFW": 1503,
			"EWR": 850,
			"FLL": 1019,
			"FRA": 7059,
			"HPN": 907,
			"IAD": 517,
			"IAH": 1467,
			"IND": 688,
			"JAX": 529,
			"LAS": 3077,
			"LAX": 3413,
			"LGA": 875,
			"LGW": 6439,
			"LHR": 6410,
			"MBJ": 1882,
			"MCO": 755,
			"MEM": 821,
			"MIA": 1049,
			"MSP": 1496,
			"MSY": 1047,
			"MUC": 7352,
			"ORD": 964,
			"ORF": 465,
			"PBI": 952,
			"PHL": 721,
			"PHX": 2849,
			"RSW": 968,
			"SAN": 3336,
			"SFO": 3687,
			"SJO": 2824,
			"SJU": 2376,
			"SYR": 971,
			"TPA": 819
		},
		"CMB": {
			"DOH": 3616
		},
		"CMF": {
			"BHX": 939,
			"BOH": 808,
			"LCY": 780,
			"LGW": 758,
			"STN": 808
		},
		"CMH": {
			"DCA": 518,
			"DFW": 1489,
			"EWR": 743,
			"IAD": 481,
			"JFK": 775,
			"ORD": 474,
			"PHL": 652
		},
		"CMI": {
			"ORD": 217
		},
		"CMN": {
			"FRA": 2276,
			"MAD": 869
		},
		"CNF": {
			"GIG": 361,
			"GRU": 495
		},
		"CNS": {
			"HKG": 5569,
			"SYD": 1973,
			"WEI": 623
		},
		"CNX": {
			"BKK": 596
		},
		"COO": {
			"ABJ": 708
		},
		"COS": {
			"DEN": 117,
			"DFW": 952,
			"ORD": 1463
		},
		"CPH": {
			"AAL": 238,
			"AAR": 147,
			"AES": 856,
			"AGP": 2472,
			"ALC": 2165,
			"ARN": 546,
			"BCN": 1769,
			"BGO": 679,
			"BGY": 1125,
			"BLQ": 1236,
			"BRS": 1117,
			"BSL": 959,
			"BUD": 1017,
			"CDG": 1003,
			"CGN": 643,
			"CIA": 1536,
			"CRL": 792,
			"DUB": 1241,
			"EDI": 1000,
			"EWR": 6208,
			"FRA": 680,
			"GOT": 228,
			"GVA": 1138,
			"HAJ": 401,
			"HAM": 279,
			"HEL": 892,
			"IAD": 6541,
			"KUN": 726,
			"LGW": 984,
			"LHR": 979,
			"LTN": 950,
			"LYS": 1220,
			"MAD": 2058,
			"MAN": 994,
			"MUC": 810,
			"MXP": 1144,
			"NYO": 435,
			"OPO": 2226,
			"ORD": 6855,
			"OSL": 517,
			"SEN": 907,
			"SVG": 556,
			"SXF": 364,
			"TFS": 3850,
			"TXL": 342,
			"YYZ": 6271
		},
		"CPT": {
			"DUR": 1245,
			"FRA": 9394,
			"JNB": 1271,
			"LGW": 9643,
			"LHR": 9684,
			"MUC": 9181,
			"PLZ": 646
		},
		"CRA": {
			"VLC": 2079
		},
		"CRL": {
			"ACE": 2831,
			"AGA": 2518,
			"AGP": 1691,
			"AHO": 1132,
			"ALC": 1410,
			"AOI": 1016,
			"ATH": 2075,
			"BDS": 1509,
			"BGY": 659,
			"BIQ": 899,
			"BLQ": 834,
			"BOD": 736,
			"BRI": 1405,
			"BRU": 49,
			"BTS": 958,
			"BUD": 1130,
			"CAG": 1297,
			"CCF": 821,
			"CFU": 1706,
			"CHQ": 2293,
			"CIA": 1148,
			"CIY": 1701,
			"CPH": 792,
			"DUB": 804,
			"EDI": 802,
			"EGC": 692,
			"EIN": 127,
			"FAO": 1792,
			"FEZ": 1992,
			"FNI": 745,
			"FSC": 1058,
			"FUE": 2892,
			"GLA": 843,
			"GRO": 960,
			"IBZ": 1311,
			"KGS": 2356,
			"KRK": 1088,
			"LEI": 1609,
			"LPA": 3012,
			"LRH": 633,
			"MAD": 1271,
			"MAN": 562,
			"MPL": 766,
			"MRS": 783,
			"MST": 105,
			"NDR": 1823,
			"NYO": 1221,
			"OPO": 1439,
			"OTP": 1745,
			"OUD": 1817,
			"PEG": 1022,
			"PFO": 2858,
			"PGF": 866,
			"PIK": 824,
			"PMI": 1220,
			"PRG": 697,
			"PSA": 877,
			"PSR": 1161,
			"PUY": 939,
			"RAK": 2336,
			"RBA": 2039,
			"RDZ": 689,
			"REU": 1066,
			"RHO": 2448,
			"RIX": 1465,
			"RJK": 952,
			"RYG": 1070,
			"SDR": 1001,
			"SKG": 1810,
			"SNN": 956,
			"SOF": 1679,
			"STN": 334,
			"SUF": 1583,
			"SVQ": 1666,
			"TFS": 3058,
			"TGD": 1444,
			"TLS": 794,
			"TNG": 1838,
			"TPS": 1533,
			"TRN": 631,
			"TRS": 843,
			"TSF": 785,
			"TSR": 1351,
			"VLC": 1279,
			"VNO": 1477,
			"VRN": 739,
			"WMI": 1141,
			"ZAD": 1081,
			"ZAZ": 1065,
			"ZTH": 1920
		},
		"CRP": {
			"DFW": 571,
			"IAH": 323
		},
		"CRV": {
			"BGY": 957,
			"PSA": 763
		},
		"CRW": {
			"IAH": 1568
		},
		"CSO": {
			"DRS": 181
		},
		"CSX": {
			"PEK": 1358
		},
		"CTA": {
			"BGY": 1015,
			"BLQ": 847,
			"BSL": 1282,
			"CDG": 1631,
			"EIN": 1731,
			"FCO": 539,
			"GVA": 1224,
			"LGW": 1938,
			"LTN": 2005,
			"MAD": 1642,
			"MAN": 2213,
			"MLA": 186,
			"MRS": 1064,
			"MUC": 1239,
			"MXP": 1049,
			"NAP": 386,
			"PEG": 662,
			"PSA": 795,
			"SXF": 1663,
			"TRN": 1059,
			"TRS": 939,
			"TSF": 940,
			"TXL": 1684
		},
		"CTG": {
			"BOG": 656
		},
		"CTS": {
			"HND": 820,
			"KIX": 1083,
			"NGO": 976
		},
		"CTU": {
			"FRA": 7814,
			"HGH": 1580,
			"KMG": 632,
			"LHR": 8303,
			"LHW": 616,
			"NKG": 1424,
			"PEK": 1556,
			"PVG": 1704,
			"XIY": 622
		},
		"CUF": {
			"AHO": 438,
			"CAG": 600,
			"TPS": 842
		},
		"CUN": {
			"DFW": 1657,
			"FRA": 8606,
			"IAH": 1307,
			"LGW": 7978,
			"MIA": 855,
			"ORD": 2331,
			"PHL": 2368
		},
		"CUR": {
			"FRA": 8084,
			"MIA": 1923
		},
		"CUU": {
			"DFW": 971
		},
		"CVG": {
			"CGN": 6869,
			"EWR": 914,
			"IAD": 623,
			"IAH": 1402,
			"MIA": 1530,
			"ORD": 425
		},
		"CWA": {
			"ORD": 341
		},
		"CWB": {
			"GIG": 673,
			"GRU": 359,
			"VCP": 348
		},
		"CWL": {
			"AGP": 1639,
			"ALC": 1474,
			"BFS": 410,
			"BRS": 43,
			"CDG": 496,
			"DAM": 3769,
			"DUB": 300,
			"EDI": 506,
			"GLA": 502,
			"LHR": 200,
			"MJV": 1528,
			"NOC": 463,
			"PAE": 7543,
			"SNN": 408,
			"STN": 252,
			"TFS": 2823
		},
		"DAC": {
			"DOH": 3918,
			"STN": 7958
		},
		"DAM": {
			"CWL": 3769
		},
		"DAR": {
			"ADD": 1764,
			"DOH": 3816,
			"LHR": 7510,
			"ZRH": 6753
		},
		"DAV": {
			"PTY": 343
		},
		"DAY": {
			"EWR": 856,
			"IAD": 590,
			"ORD": 386
		},
		"DBV": {
			"DUS": 1303,
			"FRA": 1115,
			"LGW": 1690,
			"MUC": 818,
			"TXL": 1172,
			"VCE": 575
		},
		"DCA": {
			"CLT": 532,
			"CMH": 518,
			"DFW": 1915,
			"EWR": 319,
			"IAH": 1942,
			"JAX": 1021,
			"JFK": 342,
			"MIA": 1484,
			"ORD": 982,
			"PHL": 191,
			"PHX": 3178
		},
		"DEB": {
			"MUC": 738
		},
		"DEL": {
			"EMA": 6765,
			"FRA": 6124,
			"HKG": 3747,
			"LHR": 6733,
			"MUC": 5901,
			"STN": 6678,
			"VIE": 5547
		},
		"DEN": {
			"ABQ": 562,
			"ASE": 201,
			"AUS": 1249,
			"BIL": 732,
			"BOI": 1042,
			"BOS": 2816,
			"BZN": 843,
			"COS": 117,
			"DFW": 1032,
			"DRO": 403,
			"DSM": 946,
			"EGE": 193,
			"ELP": 908,
			"EUG": 1600,
			"FAT": 1355,
			"FLL": 2739,
			"FRA": 8090,
			"FSD": 777,
			"GEG": 1343,
			"GJT": 340,
			"GRR": 1629,
			"IAD": 2332,
			"IAH": 1387,
			"ICT": 674,
			"IND": 1568,
			"JAC": 653,
			"LAS": 1009,
			"LAX": 1385,
			"LBB": 734,
			"LGA": 2600,
			"LGW": 7535,
			"LHR": 7498,
			"LNK": 679,
			"MAF": 908,
			"MIA": 2749,
			"MOT": 972,
			"MSN": 1326,
			"MTJ": 315,
			"MUC": 8389,
			"OMA": 758,
			"ORD": 1426,
			"PDX": 1592,
			"PHL": 2501,
			"PHX": 968,
			"PSP": 1247,
			"RNO": 1291,
			"SAN": 1371,
			"SFO": 1553,
			"SJC": 1522,
			"SLC": 627,
			"SMF": 1460,
			"SNA": 1360,
			"TUL": 870,
			"TUS": 1029
		},
		"DFW": {
			"ABQ": 914,
			"ACT": 144,
			"AMA": 501,
			"ATL": 1174,
			"AUS": 306,
			"BHM": 959,
			"BJX": 1394,
			"BNA": 1014,
			"BOI": 2045,
			"BOS": 2509,
			"BRO": 778,
			"BTR": 615,
			"BWI": 1955,
			"CAE": 1480,
			"CDG": 7946,
			"CHS": 1585,
			"CLL": 264,
			"CLT": 1503,
			"CMH": 1489,
			"COS": 952,
			"CRP": 571,
			"CUN": 1657,
			"CUU": 971,
			"DCA": 1915,
			"DEN": 1032,
			"ELP": 885,
			"EWR": 2205,
			"FAT": 2109,
			"FLL": 1799,
			"FRA": 8259,
			"FSD": 1188,
			"FSM": 366,
			"GDL": 1510,
			"GGG": 225,
			"GJT": 1242,
			"GPT": 803,
			"GRK": 216,
			"HNL": 6082,
			"HOU": 398,
			"IAH": 361,
			"ICT": 529,
			"JAC": 1684,
			"JAN": 655,
			"JAX": 1475,
			"JFK": 2235,
			"LAS": 1695,
			"LAW": 225,
			"LAX": 1983,
			"LBB": 452,
			"LFT": 564,
			"LGA": 2231,
			"LGW": 7662,
			"LHR": 7629,
			"LIT": 489,
			"MAD": 7974,
			"MAF": 496,
			"MAN": 7428,
			"MBJ": 2489,
			"MCI": 741,
			"MCO": 1582,
			"MEM": 693,
			"MEX": 1510,
			"MFE": 756,
			"MIA": 1802,
			"MLM": 1504,
			"MLU": 469,
			"MOB": 866,
			"MSP": 1372,
			"MSY": 719,
			"MTY": 845,
			"OKC": 282,
			"OMA": 940,
			"ONT": 1908,
			"ORD": 1291,
			"PBI": 1772,
			"PDX": 2597,
			"PHL": 2093,
			"PHX": 1394,
			"PNS": 970,
			"POS": 4408,
			"PSP": 1808,
			"PVR": 1583,
			"RDU": 1705,
			"RNO": 2161,
			"RSW": 1634,
			"SAF": 884,
			"SAN": 1880,
			"SAT": 398,
			"SAV": 1486,
			"SDF": 1178,
			"SEA": 2668,
			"SFO": 2352,
			"SGF": 586,
			"SHV": 304,
			"SJC": 2310,
			"SJD": 1648,
			"SJO": 2866,
			"SJT": 367,
			"SLC": 1589,
			"SMF": 2299,
			"SNA": 1935,
			"SPI": 1014,
			"STL": 885,
			"TPA": 1493,
			"TUL": 382,
			"TUS": 1306,
			"TXK": 290,
			"TYR": 164,
			"TYS": 1239,
			"VPS": 1029,
			"XNA": 451,
			"YQX": 3923,
			"YVR": 2820,
			"YYC": 2451
		},
		"DGX": {
			"DUB": 0,
			"LHR": 0
		},
		"DHA": {
			"LGW": 5036
		},
		"DKR": {
			"BRU": 4478,
			"CGN": 4584,
			"CKY": 712,
			"FRA": 4574,
			"LIS": 2796,
			"MXP": 4220
		},
		"DLC": {
			"PEK": 442
		},
		"DLE": {
			"FEZ": 1700,
			"OPO": 1294,
			"RAK": 2064
		},
		"DLH": {
			"MSP": 232
		},
		"DLM": {
			"LGW": 2793
		},
		"DMA": {
			"IAH": 1498
		},
		"DME": {
			"AER": 1338,
			"ASB": 2468,
			"CEK": 1484,
			"FRA": 2049,
			"KJA": 3322,
			"KRR": 1157,
			"KUF": 818,
			"KZN": 715,
			"LHR": 2545,
			"MUC": 1942,
			"OVB": 2790,
			"PEE": 1138,
			"ROV": 916,
			"SVX": 1422,
			"TXL": 1631
		},
		"DMK": {
			"LHR": 9550
		},
		"DMM": {
			"BAH": 86,
			"FRA": 4370,
			"KWI": 355,
			"STN": 4987
		},
		"DNR": {
			"EMA": 474,
			"LBA": 587,
			"STN": 401
		},
		"DOH": {
			"ADD": 2259,
			"BAH": 146,
			"BGW": 1138,
			"BHX": 5351,
			"BSR": 702,
			"CMB": 3616,
			"DAC": 3918,
			"DAR": 3816,
			"DPS": 7850,
			"EBL": 1419,
			"EDI": 5547,
			"FRA": 4588,
			"HKG": 6296,
			"ISB": 2277,
			"ISU": 1292,
			"JIB": 1763,
			"KBV": 5366,
			"KHI": 1570,
			"KRT": 2250,
			"KWI": 566,
			"LHE": 2335,
			"LHR": 5241,
			"LYP": 2201,
			"MAN": 5409,
			"MCT": 705,
			"MUX": 2027,
			"NJF": 1023,
			"PEW": 2154,
			"SEZ": 3356,
			"SGN": 6000,
			"SKT": 2356,
			"SLL": 951,
			"STN": 5205,
			"ZNZ": 3747
		},
		"DOK": {
			"MUC": 1914
		},
		"DOL": {
			"STN": 280
		},
		"DPS": {
			"DOH": 7850,
			"SIN": 1671
		},
		"DRO": {
			"DEN": 403
		},
		"DRS": {
			"BRE": 401,
			"BSL": 599,
			"CSO": 181,
			"DUS": 487,
			"FRA": 388,
			"MUC": 340,
			"ZRH": 556
		},
		"DSA": {
			"BRE": 0
		},
		"DSM": {
			"DEN": 946,
			"EWR": 1632,
			"ORD": 480
		},
		"DTM": {
			"AHO": 1211,
			"FAO": 2026,
			"GRO": 1131,
			"KRK": 869,
			"LTN": 551,
			"MUC": 461,
			"OPO": 1686,
			"PMI": 1383,
			"STN": 509
		},
		"DTW": {
			"FRA": 6679,
			"IAH": 1731,
			"LHR": 6045,
			"MEX": 2933,
			"ORD": 376,
			"OSC": 249
		},
		"DUB": {
			"ABZ": 493,
			"ACE": 2787,
			"AGP": 1867,
			"AHO": 1793,
			"ALC": 1739,
			"AMS": 750,
			"ATH": 2876,
			"BCN": 1485,
			"BDL": 4942,
			"BFS": 137,
			"BGY": 1433,
			"BHX": 321,
			"BIQ": 1160,
			"BLK": 217,
			"BLQ": 1611,
			"BOD": 1036,
			"BOH": 421,
			"BOS": 4804,
			"BRI": 2193,
			"BRS": 330,
			"BRU": 784,
			"BSL": 1168,
			"BTS": 1741,
			"BUD": 1914,
			"BVA": 728,
			"BZG": 1605,
			"CCF": 1298,
			"CDG": 785,
			"CGN": 956,
			"CHQ": 3087,
			"CIA": 1905,
			"CIY": 2434,
			"CPH": 1241,
			"CRL": 804,
			"CWL": 300,
			"DGX": 0,
			"DUS": 915,
			"EBU": 1160,
			"EDI": 337,
			"EIN": 818,
			"EMA": 336,
			"EWR": 5125,
			"FAO": 1829,
			"FCO": 1886,
			"FMM": 1306,
			"FRA": 1085,
			"FUE": 2845,
			"GDN": 1616,
			"GLA": 297,
			"GNB": 1225,
			"GRO": 1446,
			"GVA": 1191,
			"HAM": 1072,
			"HHN": 1008,
			"IAD": 5465,
			"IBZ": 1719,
			"INV": 479,
			"IOM": 130,
			"JER": 547,
			"JFK": 5104,
			"KEF": 1497,
			"KRK": 1821,
			"KTW": 1758,
			"KUN": 1967,
			"LAX": 8320,
			"LBA": 307,
			"LCJ": 1735,
			"LCY": 478,
			"LDE": 1228,
			"LEI": 1868,
			"LGG": 858,
			"LGW": 484,
			"LHR": 449,
			"LIL": 714,
			"LIN": 1427,
			"LIS": 1642,
			"LPA": 2932,
			"LPL": 227,
			"LRH": 883,
			"LTN": 433,
			"LUZ": 1971,
			"LYS": 1182,
			"MAD": 1452,
			"MAN": 265,
			"MCO": 6543,
			"MJV": 1790,
			"MLA": 2532,
			"MME": 338,
			"MRS": 1393,
			"MUC": 1381,
			"MXP": 1382,
			"NCE": 1466,
			"NCL": 347,
			"NOC": 176,
			"NTE": 771,
			"NYO": 1546,
			"OLB": 1826,
			"OPO": 1365,
			"ORD": 5896,
			"ORK": 230,
			"OTP": 2531,
			"PGF": 1365,
			"PHL": 5254,
			"PIK": 256,
			"PMI": 1686,
			"PMO": 2250,
			"POZ": 1546,
			"PRG": 1455,
			"PSA": 1629,
			"RAK": 2430,
			"RDZ": 1187,
			"REU": 1474,
			"RIX": 1943,
			"RTM": 739,
			"RYG": 1236,
			"RZE": 1968,
			"SDR": 1126,
			"SFO": 8185,
			"SNN": 194,
			"SOF": 2482,
			"SOU": 433,
			"STN": 470,
			"SUF": 2350,
			"SVQ": 1780,
			"SXF": 1328,
			"SZG": 1491,
			"SZZ": 1395,
			"TFS": 2946,
			"TLL": 2004,
			"TLS": 1224,
			"TRN": 1357,
			"TSF": 1581,
			"TUF": 829,
			"TXL": 1308,
			"VGO": 1256,
			"VLC": 1610,
			"VNO": 2048,
			"WAW": 1826,
			"WMI": 1797,
			"WRO": 1590,
			"YYZ": 5262,
			"ZAD": 1881,
			"ZRH": 1237
		},
		"DUR": {
			"CPT": 1245,
			"JNB": 501,
			"PLZ": 672
		},
		"DUS": {
			"AGP": 1853,
			"ARN": 1162,
			"BCN": 1167,
			"BHX": 598,
			"BIO": 1147,
			"BLL": 519,
			"BSL": 415,
			"BUD": 999,
			"CDG": 392,
			"DBV": 1303,
			"DRS": 487,
			"DUB": 915,
			"EDI": 844,
			"EWR": 6040,
			"FCO": 1134,
			"FNC": 2815,
			"FRA": 188,
			"GDN": 856,
			"GLA": 896,
			"GOT": 792,
			"GRZ": 790,
			"GVA": 563,
			"GWT": 416,
			"HAJ": 239,
			"HAM": 339,
			"HEL": 1508,
			"IBZ": 1443,
			"INV": 984,
			"JER": 677,
			"KBP": 1691,
			"KEF": 2213,
			"KIR": 1124,
			"LCY": 466,
			"LED": 1741,
			"LEJ": 380,
			"LGW": 484,
			"LHR": 501,
			"LIS": 1862,
			"LNZ": 631,
			"LPL": 691,
			"LYS": 630,
			"MAD": 1439,
			"MAH": 1286,
			"MAN": 655,
			"MIA": 7605,
			"MLA": 1822,
			"MUC": 485,
			"MXP": 645,
			"NAP": 1292,
			"NCE": 849,
			"NCL": 700,
			"NQY": 830,
			"NRT": 9333,
			"NUE": 364,
			"ORD": 6790,
			"OSL": 1026,
			"OTP": 1616,
			"PEK": 7798,
			"PMI": 1342,
			"PRG": 543,
			"RAK": 2502,
			"SIN": 10394,
			"SPU": 1119,
			"STR": 338,
			"SZG": 594,
			"TLV": 3136,
			"TRN": 680,
			"TXL": 468,
			"VAR": 1815,
			"VCE": 763,
			"VIE": 788,
			"VKO": 2058,
			"VLC": 1427,
			"WAW": 981,
			"WRO": 705,
			"XRY": 1909,
			"YYZ": 6166,
			"ZRH": 444
		},
		"DXB": {
			"FRA": 4846,
			"HKG": 5921,
			"LHR": 5499,
			"MCT": 348,
			"MUC": 4565,
			"STN": 5460,
			"ZRH": 4769
		},
		"EAS": {
			"MAD": 350
		},
		"EBB": {
			"KGL": 340,
			"LGW": 6459,
			"LHR": 6499
		},
		"EBJ": {
			"LTN": 713,
			"STN": 680
		},
		"EBL": {
			"DOH": 1419,
			"FRA": 3216,
			"VIE": 2595
		},
		"EBU": {
			"DUB": 1160,
			"FEZ": 1513,
			"OPO": 1150,
			"STN": 765
		},
		"EDI": {
			"ACE": 3111,
			"AGP": 2145,
			"ALC": 1976,
			"AMS": 666,
			"ATH": 2848,
			"ATL": 6439,
			"BCN": 1677,
			"BFS": 230,
			"BHX": 402,
			"BLL": 781,
			"BLQ": 1636,
			"BOD": 1251,
			"BOH": 583,
			"BRE": 847,
			"BRS": 509,
			"BRU": 764,
			"BSL": 1191,
			"BTS": 1642,
			"BVA": 810,
			"BZR": 1483,
			"CAG": 2070,
			"CCF": 1473,
			"CDG": 868,
			"CFU": 2493,
			"CGN": 896,
			"CIA": 1949,
			"CPH": 1000,
			"CRL": 802,
			"CWL": 506,
			"DOH": 5547,
			"DUB": 337,
			"DUS": 844,
			"EMA": 371,
			"EWR": 5246,
			"FAO": 2134,
			"FCO": 1934,
			"FMM": 1281,
			"FNC": 2786,
			"FRA": 1032,
			"FUE": 3170,
			"GDN": 1392,
			"GNB": 1325,
			"GOT": 969,
			"GVA": 1264,
			"HAM": 893,
			"HHN": 974,
			"IBZ": 1931,
			"INV": 181,
			"KEF": 1385,
			"KOI": 335,
			"KRK": 1671,
			"KUN": 1723,
			"LCY": 543,
			"LGW": 573,
			"LHR": 532,
			"LIS": 1956,
			"LPA": 3260,
			"LSI": 453,
			"LTN": 494,
			"LYS": 1280,
			"MAD": 1719,
			"MAN": 297,
			"MLA": 2610,
			"MRS": 1520,
			"MUC": 1330,
			"MXP": 1424,
			"NRN": 789,
			"ORY": 892,
			"PFO": 3596,
			"PIK": 90,
			"PIS": 1071,
			"PMI": 1878,
			"POZ": 1366,
			"PRG": 1341,
			"PSA": 1677,
			"RAK": 2731,
			"RYG": 922,
			"SDR": 1393,
			"SNN": 509,
			"SOU": 571,
			"STN": 510,
			"STR": 1173,
			"SXF": 1166,
			"SYY": 308,
			"TFS": 3277,
			"TMP": 1659,
			"VCE": 1597,
			"VIE": 1610,
			"WIC": 279,
			"WMI": 1601
		},
		"EFL": {
			"BGY": 1224,
			"CIA": 787,
			"PSA": 1049,
			"STN": 2195
		},
		"EGC": {
			"BRS": 767,
			"CRL": 692,
			"EMA": 900,
			"LPL": 977,
			"LTN": 786,
			"STN": 785
		},
		"EGE": {
			"DEN": 193
		},
		"EIN": {
			"ACE": 2957,
			"AGP": 1819,
			"AHO": 1223,
			"ALC": 1536,
			"BDS": 1539,
			"BGY": 716,
			"BRS": 561,
			"CCF": 944,
			"CFU": 1731,
			"CHQ": 2316,
			"CIA": 1205,
			"CRL": 127,
			"CTA": 1731,
			"DUB": 818,
			"FAO": 1919,
			"FEZ": 2119,
			"GRO": 1080,
			"IBZ": 1433,
			"KRK": 1023,
			"LIS": 1804,
			"LPA": 3138,
			"MAD": 1398,
			"MAN": 560,
			"MJV": 1596,
			"MLA": 1879,
			"MRS": 891,
			"NOC": 993,
			"OPO": 1560,
			"PIK": 797,
			"PMI": 1338,
			"PSA": 941,
			"RAK": 2464,
			"REU": 1190,
			"SOF": 1670,
			"STN": 357,
			"SVQ": 1794,
			"TFS": 3182,
			"TPS": 1605,
			"TRN": 715,
			"TSF": 816,
			"WMI": 1051
		},
		"ELP": {
			"DEN": 908,
			"DFW": 885,
			"IAH": 1072,
			"ORD": 1988,
			"PHX": 557
		},
		"ELS": {
			"JNB": 768
		},
		"EMA": {
			"ACE": 2841,
			"AGP": 1813,
			"ALC": 1619,
			"BCN": 1308,
			"BGY": 1126,
			"BHD": 358,
			"BUD": 1578,
			"CCF": 1102,
			"CFU": 2184,
			"CGN": 621,
			"CHQ": 2770,
			"CIA": 1609,
			"DEL": 6765,
			"DNR": 474,
			"DUB": 336,
			"EDI": 371,
			"EGC": 900,
			"FAO": 1833,
			"FRA": 751,
			"FUE": 2900,
			"GRO": 1253,
			"GRX": 1750,
			"IBZ": 1566,
			"ILN": 6166,
			"JFK": 5440,
			"KRK": 1489,
			"LCJ": 1410,
			"LEI": 1780,
			"LIG": 795,
			"LPA": 3002,
			"LPL": 116,
			"LRH": 739,
			"MAH": 1502,
			"MJV": 1675,
			"MLA": 2257,
			"MUC": 1049,
			"NOC": 511,
			"NTE": 631,
			"ORK": 498,
			"OST": 339,
			"PIK": 365,
			"PMI": 1508,
			"PMO": 1971,
			"PSA": 1333,
			"RAK": 2421,
			"REU": 1313,
			"RHO": 2924,
			"RIX": 1670,
			"RMI": 1416,
			"RZE": 1638,
			"STN": 149,
			"SVQ": 1750,
			"SXF": 1002,
			"TFS": 3029,
			"TLL": 1764,
			"TSF": 1262,
			"VLC": 1485,
			"WMI": 1478,
			"WRO": 1259,
			"YMX": 5106
		},
		"EOH": {
			"BOG": 232
		},
		"ERF": {
			"BRE": 273,
			"STN": 749
		},
		"ESB": {
			"MUC": 1912
		},
		"ESU": {
			"LTN": 2400,
			"MRS": 1871
		},
		"ETZ": {
			"BRE": 485
		},
		"EUG": {
			"DEN": 1600,
			"SFO": 726
		},
		"EVN": {
			"VIE": 2375
		},
		"EVV": {
			"ORD": 439
		},
		"EWR": {
			"ADW": 311,
			"ALB": 230,
			"AMS": 5870,
			"AUS": 2417,
			"BCN": 6178,
			"BDL": 186,
			"BHX": 5446,
			"BNA": 1201,
			"BRU": 5908,
			"BUF": 453,
			"BWI": 271,
			"CAK": 612,
			"CDG": 5858,
			"CHS": 1011,
			"CLE": 648,
			"CLT": 850,
			"CMH": 743,
			"CPH": 6208,
			"CVG": 914,
			"DAY": 856,
			"DCA": 319,
			"DFW": 2205,
			"DSM": 1632,
			"DUB": 5125,
			"DUS": 6040,
			"EDI": 5246,
			"FLL": 1717,
			"FRA": 6211,
			"GLA": 5183,
			"GRR": 971,
			"GSO": 716,
			"GSP": 956,
			"GVA": 6226,
			"IND": 1034,
			"JAX": 1321,
			"LAX": 3942,
			"LEX": 944,
			"LHR": 5563,
			"LIS": 5434,
			"MAD": 5789,
			"MAN": 5384,
			"MCI": 1753,
			"MCO": 1511,
			"MEM": 1520,
			"MIA": 1751,
			"MKE": 1163,
			"MSN": 1282,
			"MSP": 1619,
			"MSY": 1877,
			"MUC": 6504,
			"MXP": 6438,
			"NAS": 1767,
			"OMA": 1820,
			"ORD": 1154,
			"ORF": 457,
			"ORY": 5857,
			"PBI": 1650,
			"PHX": 3426,
			"PIT": 512,
			"PVD": 257,
			"PVR": 3681,
			"RDU": 670,
			"RIC": 446,
			"ROC": 396,
			"RSW": 1722,
			"SAT": 2523,
			"SAV": 1140,
			"SDF": 1031,
			"SEA": 3855,
			"SJU": 2595,
			"SNN": 4969,
			"STL": 1400,
			"STR": 6319,
			"SYR": 313,
			"TPA": 1607,
			"TXL": 6389,
			"TYS": 1014,
			"UVF": 3262,
			"VIE": 6828,
			"ZRH": 6334
		},
		"EXT": {
			"FRA": 850,
			"MUC": 1126
		},
		"EYW": {
			"MIA": 201
		},
		"EZE": {
			"FRA": 11503,
			"LGW": 11127,
			"LHR": 11140,
			"LIM": 3153,
			"MAD": 10089,
			"SCL": 1138
		},
		"FAE": {
			"CGN": 1521
		},
		"FAI": {
			"FRA": 7085,
			"GMP": 6075,
			"GOT": 6295,
			"KIX": 5978,
			"OKJ": 6013,
			"SEA": 2462
		},
		"FAO": {
			"ACE": 1039,
			"BFS": 1966,
			"BHX": 1784,
			"BLL": 2447,
			"BOH": 1606,
			"BRE": 2205,
			"BRS": 1650,
			"BVA": 1603,
			"CDG": 1581,
			"CGN": 1951,
			"CRL": 1792,
			"DTM": 2026,
			"DUB": 1829,
			"EDI": 2134,
			"EIN": 1919,
			"EMA": 1833,
			"FMM": 1919,
			"FRA": 1957,
			"GLA": 2114,
			"HHN": 1884,
			"KIR": 1691,
			"LBA": 1935,
			"LDY": 2006,
			"LGW": 1688,
			"LHR": 1713,
			"LIS": 221,
			"LPL": 1857,
			"LTN": 1757,
			"LYS": 1454,
			"MAN": 1869,
			"MUC": 2038,
			"NCL": 2060,
			"NOC": 1880,
			"NRN": 1965,
			"NTE": 1242,
			"OPO": 474,
			"ORK": 1649,
			"ORY": 1547,
			"PIK": 2072,
			"RYG": 2827,
			"SDR": 795,
			"SEN": 1756,
			"SNN": 1746,
			"STN": 1774,
			"TFS": 1281,
			"TLS": 1079,
			"TXL": 2391
		},
		"FAR": {
			"ORD": 895
		},
		"FAT": {
			"DEN": 1355,
			"DFW": 2109,
			"LAX": 336,
			"SFO": 253
		},
		"FAY": {
			"IAD": 457
		},
		"FCO": {
			"ACE": 2730,
			"AGP": 1548,
			"ALC": 1157,
			"AMS": 1297,
			"BCN": 848,
			"BDS": 493,
			"BOH": 1468,
			"BRI": 383,
			"BRS": 1557,
			"BRU": 1172,
			"BSL": 743,
			"CFU": 690,
			"CHQ": 1244,
			"CIY": 571,
			"CTA": 539,
			"DUB": 1886,
			"DUS": 1134,
			"EDI": 1934,
			"FKB": 841,
			"FRA": 958,
			"GVA": 695,
			"HAM": 1326,
			"KGS": 1391,
			"LGW": 1406,
			"LHR": 1445,
			"LTN": 1471,
			"LYS": 721,
			"MAN": 1678,
			"MRS": 603,
			"MUC": 729,
			"MXP": 511,
			"NCE": 460,
			"NRN": 1184,
			"NYO": 1916,
			"ORY": 1090,
			"PHL": 7018,
			"PIK": 1952,
			"PMI": 840,
			"PMO": 409,
			"PRG": 935,
			"SNN": 1993,
			"STN": 1442,
			"SUF": 467,
			"SVQ": 1625,
			"TLS": 911,
			"TPS": 433,
			"TXL": 1198,
			"VIE": 779,
			"YYZ": 7088,
			"ZRH": 694
		},
		"FDF": {
			"FRA": 7315
		},
		"FDH": {
			"CGN": 394,
			"FRA": 271,
			"LGW": 800
		},
		"FEZ": {
			"BCN": 1028,
			"BGY": 1805,
			"BVA": 1822,
			"CIA": 1769,
			"CRL": 1992,
			"DLE": 1700,
			"EBU": 1513,
			"EIN": 2119,
			"FNI": 1361,
			"HHN": 2043,
			"MAD": 740,
			"MRS": 1376,
			"NRN": 2159,
			"NTE": 1497,
			"PSA": 1713,
			"STN": 2040,
			"TLS": 1210
		},
		"FIH": {
			"BRU": 6237
		},
		"FKB": {
			"AGP": 1689,
			"ALC": 1357,
			"BGY": 366,
			"BRI": 1088,
			"CAG": 1062,
			"FCO": 841,
			"GRO": 870,
			"HHN": 142,
			"LPA": 3067,
			"MLA": 1529,
			"OPO": 1556,
			"PMI": 1110,
			"SKG": 1489,
			"SOF": 1365,
			"STN": 654,
			"STR": 84,
			"TFS": 3124,
			"TPS": 1259,
			"ZAD": 760
		},
		"FLL": {
			"CLT": 1019,
			"DEN": 2739,
			"DFW": 1799,
			"EWR": 1717,
			"IAD": 1453,
			"IAH": 1551,
			"ORD": 1905,
			"PHL": 1601
		},
		"FLN": {
			"GIG": 759,
			"GRU": 515
		},
		"FLR": {
			"BCN": 797,
			"FRA": 720,
			"LCY": 1193,
			"LGW": 1180,
			"MUC": 507,
			"ORY": 871
		},
		"FMM": {
			"AGP": 1741,
			"AHO": 832,
			"CHQ": 1797,
			"CIA": 712,
			"DUB": 1306,
			"EDI": 1281,
			"FAO": 1919,
			"GRO": 896,
			"OPO": 1669,
			"PMI": 1114,
			"PMO": 1115,
			"SNN": 1452,
			"SOF": 1183,
			"STN": 836,
			"TFS": 3200,
			"TPS": 1135
		},
		"FMO": {
			"AGP": 1967,
			"BRE": 125,
			"FRA": 242,
			"LCY": 528,
			"MUC": 511
		},
		"FNA": {
			"LHR": 4907,
			"ROB": 409
		},
		"FNC": {
			"BRS": 2371,
			"BSL": 2628,
			"DUS": 2815,
			"EDI": 2786,
			"FRA": 2834,
			"LGW": 2456,
			"LIS": 965,
			"MAN": 2571,
			"OPO": 1191,
			"TXL": 3263
		},
		"FNI": {
			"CRL": 745,
			"FEZ": 1361,
			"LGW": 891,
			"LPL": 1190,
			"LTN": 970
		},
		"FNT": {
			"ORD": 358
		},
		"FOC": {
			"PEK": 1598
		},
		"FOR": {
			"GIG": 2176,
			"GRU": 2346
		},
		"FPO": {
			"LGW": 6964
		},
		"FRA": {
			"AAL": 790,
			"ABV": 4563,
			"ABZ": 1064,
			"ACC": 5007,
			"ADD": 5350,
			"AER": 2482,
			"AGP": 1815,
			"ALA": 5092,
			"ALC": 1492,
			"ALG": 1543,
			"AMM": 3046,
			"AMS": 365,
			"ARN": 1224,
			"ASB": 4118,
			"ATH": 1817,
			"ATL": 7410,
			"AUH": 4864,
			"AYT": 2299,
			"BCN": 1092,
			"BEG": 1056,
			"BEY": 2840,
			"BGO": 1160,
			"BGR": 5586,
			"BHX": 764,
			"BIA": 834,
			"BIO": 1148,
			"BJV": 2083,
			"BKK": 9004,
			"BLL": 636,
			"BLQ": 644,
			"BLR": 7423,
			"BOG": 9087,
			"BOM": 6572,
			"BOS": 5889,
			"BRE": 336,
			"BRS": 806,
			"BRU": 303,
			"BSL": 280,
			"BUD": 836,
			"BZG": 735,
			"CAG": 1199,
			"CAI": 2923,
			"CCS": 8076,
			"CCU": 7394,
			"CDG": 447,
			"CGN": 136,
			"CLT": 7059,
			"CMN": 2276,
			"CPH": 680,
			"CPT": 9394,
			"CTU": 7814,
			"CUN": 8606,
			"CUR": 8084,
			"DBV": 1115,
			"DEL": 6124,
			"DEN": 8090,
			"DFW": 8259,
			"DKR": 4574,
			"DME": 2049,
			"DMM": 4370,
			"DOH": 4588,
			"DRS": 388,
			"DTW": 6679,
			"DUB": 1085,
			"DUS": 188,
			"DXB": 4846,
			"EBL": 3216,
			"EDI": 1032,
			"EMA": 751,
			"EWR": 6211,
			"EXT": 850,
			"EZE": 11503,
			"FAI": 7085,
			"FAO": 1957,
			"FCO": 958,
			"FDF": 7315,
			"FDH": 271,
			"FLR": 720,
			"FMO": 242,
			"FNC": 2834,
			"GDN": 830,
			"GIG": 9568,
			"GLA": 1082,
			"GOJ": 2421,
			"GOT": 883,
			"GRU": 9798,
			"GRZ": 609,
			"GVA": 458,
			"GYD": 3370,
			"HAJ": 282,
			"HAM": 412,
			"HEL": 1540,
			"HKG": 9157,
			"HND": 9365,
			"HYD": 7105,
			"IAD": 6551,
			"IAH": 8403,
			"IBZ": 1363,
			"ICN": 8547,
			"IKA": 3777,
			"INN": 370,
			"IST": 1864,
			"IVL": 2305,
			"JED": 4133,
			"JFK": 6189,
			"JKG": 932,
			"JNB": 8692,
			"KBP": 1586,
			"KEF": 2401,
			"KIX": 9265,
			"KLU": 569,
			"KRK": 802,
			"KTW": 750,
			"KUF": 2848,
			"KUL": 10002,
			"KWI": 4023,
			"KZN": 2765,
			"LAD": 6565,
			"LAX": 9323,
			"LCA": 2638,
			"LCY": 618,
			"LED": 1749,
			"LEJ": 303,
			"LGG": 230,
			"LGW": 628,
			"LHR": 653,
			"LIN": 512,
			"LIS": 1872,
			"LJU": 609,
			"LNZ": 456,
			"LOS": 4857,
			"LPA": 3183,
			"LTN": 656,
			"LUX": 173,
			"LUZ": 1007,
			"LYS": 543,
			"MAA": 7598,
			"MAD": 1418,
			"MAN": 831,
			"MCO": 7620,
			"MEX": 9553,
			"MIA": 7764,
			"MLA": 1647,
			"MLE": 7887,
			"MPL": 797,
			"MRS": 775,
			"MRU": 9203,
			"MSQ": 1397,
			"MUC": 300,
			"MXP": 489,
			"NAP": 1110,
			"NBO": 6318,
			"NCE": 715,
			"NGO": 9297,
			"NKG": 8639,
			"NRT": 9371,
			"NUE": 190,
			"OLB": 1018,
			"OPO": 1651,
			"ORD": 6971,
			"OSL": 1142,
			"OTP": 1452,
			"OVB": 4807,
			"PAE": 8154,
			"PDX": 8389,
			"PEK": 7791,
			"PHL": 6339,
			"PIK": 1070,
			"PMI": 1251,
			"PMO": 1366,
			"PNQ": 6688,
			"POP": 7572,
			"POZ": 635,
			"PRG": 408,
			"PRN": 1265,
			"PTY": 9090,
			"PVG": 8862,
			"RAK": 2466,
			"RIX": 1272,
			"RLG": 502,
			"RUH": 4295,
			"RZE": 960,
			"SEA": 8199,
			"SFO": 9150,
			"SHE": 8036,
			"SIN": 10284,
			"SJC": 9156,
			"SKG": 1542,
			"SLC": 8376,
			"SNN": 1245,
			"SOF": 1398,
			"SOU": 707,
			"SPU": 931,
			"STN": 617,
			"STR": 156,
			"SVG": 1001,
			"SVQ": 1813,
			"SVX": 3456,
			"SXB": 178,
			"SXF": 434,
			"SZG": 409,
			"TAO": 8329,
			"TIA": 1289,
			"TIP": 1968,
			"TLL": 1470,
			"TLS": 896,
			"TLV": 2955,
			"TOS": 2254,
			"TPA": 7739,
			"TRN": 540,
			"TSE": 4312,
			"TUN": 1471,
			"TXL": 433,
			"VCE": 577,
			"VCP": 9794,
			"VIE": 622,
			"VKO": 2010,
			"VLC": 1369,
			"VNO": 1244,
			"VRN": 544,
			"WAW": 898,
			"WRO": 601,
			"YQX": 4422,
			"YUL": 5855,
			"YVR": 8064,
			"YYC": 7530,
			"YYZ": 6344,
			"ZAD": 835,
			"ZAG": 735,
			"ZRH": 284
		},
		"FRL": {
			"LHR": 1234,
			"STN": 1224
		},
		"FSC": {
			"BVA": 1037,
			"CRL": 1058
		},
		"FSD": {
			"DEN": 777,
			"DFW": 1188,
			"ORD": 742
		},
		"FSM": {
			"DFW": 366
		},
		"FSS": {
			"BHX": 0
		},
		"FUE": {
			"ACE": 60,
			"BCN": 2032,
			"BGY": 2816,
			"BHX": 2850,
			"BOH": 2680,
			"BRE": 3305,
			"BRS": 2714,
			"BSL": 2817,
			"CRL": 2892,
			"DUB": 2845,
			"EDI": 3170,
			"EMA": 2900,
			"GVA": 2636,
			"HAM": 3406,
			"HHN": 2983,
			"LBA": 2995,
			"LGW": 2771,
			"LPL": 2910,
			"LTN": 2835,
			"MAD": 1635,
			"MAN": 2927,
			"MUC": 3117,
			"NRN": 3065,
			"ORK": 2639,
			"PIK": 3099,
			"PSA": 2743,
			"SNN": 2727,
			"STN": 2856,
			"SXF": 3488,
			"WMI": 3891
		},
		"FUK": {
			"HND": 881,
			"KIX": 451,
			"NGO": 601,
			"NKG": 1103,
			"NRT": 940
		},
		"FWA": {
			"ORD": 251
		},
		"GCI": {
			"LGW": 256,
			"MAN": 436
		},
		"GCM": {
			"NAS": 754
		},
		"GDL": {
			"DFW": 1510,
			"IAH": 1322,
			"MEX": 459
		},
		"GDN": {
			"ALC": 2295,
			"BFS": 1585,
			"BGY": 1150,
			"BHX": 1352,
			"BRS": 1454,
			"DUB": 1616,
			"DUS": 856,
			"EDI": 1392,
			"FRA": 830,
			"KRK": 486,
			"LBA": 1308,
			"LGW": 1301,
			"MAN": 1360,
			"MLA": 2082,
			"MUC": 814,
			"NCL": 1292,
			"NYO": 499,
			"ORK": 1810,
			"PSA": 1325,
			"RYG": 725,
			"STN": 1244,
			"TRF": 731,
			"VNO": 441,
			"WAW": 296,
			"WRO": 379
		},
		"GEG": {
			"DEN": 1343,
			"SEA": 359
		},
		"GGG": {
			"DFW": 225
		},
		"GIB": {
			"BRS": 1706,
			"LGW": 1717,
			"LHR": 1748,
			"MAN": 1928
		},
		"GIG": {
			"BSB": 914,
			"CNF": 361,
			"CWB": 673,
			"FLN": 759,
			"FOR": 2176,
			"FRA": 9568,
			"GRU": 337,
			"IGU": 1181,
			"LGW": 9239,
			"LHR": 9256,
			"MAD": 8149,
			"MUC": 9618,
			"POA": 1122,
			"REC": 1859,
			"SSA": 1217
		},
		"GJT": {
			"DEN": 340,
			"DFW": 1242
		},
		"GLA": {
			"ABZ": 201,
			"ACE": 3082,
			"AGP": 2135,
			"ALC": 1977,
			"AMS": 718,
			"BEB": 253,
			"BFS": 176,
			"BHX": 418,
			"BRR": 224,
			"BRS": 511,
			"BZG": 1473,
			"CAL": 92,
			"CCF": 1487,
			"CDG": 896,
			"CHQ": 3127,
			"CRL": 843,
			"CWL": 502,
			"DUB": 297,
			"DUS": 896,
			"EWR": 5183,
			"FAO": 2114,
			"FRA": 1082,
			"GVA": 1297,
			"ILY": 116,
			"INV": 187,
			"KEF": 1347,
			"KOI": 355,
			"LCY": 568,
			"LDY": 195,
			"LGW": 595,
			"LHR": 554,
			"LPA": 3228,
			"LSI": 482,
			"LTN": 518,
			"MAN": 312,
			"MUC": 1382,
			"MXP": 1463,
			"PIK": 41,
			"RIX": 1739,
			"SOF": 2467,
			"SOU": 584,
			"STN": 538,
			"SXF": 1228,
			"SYY": 284,
			"SZG": 1491,
			"TRE": 166,
			"WMI": 1667,
			"WRO": 1499
		},
		"GMP": {
			"FAI": 6075,
			"LHR": 8869
		},
		"GNB": {
			"BHX": 942,
			"BRS": 894,
			"BRU": 619,
			"DUB": 1225,
			"EDI": 1325,
			"LGW": 761,
			"LHR": 802,
			"LPL": 1064,
			"LTN": 836,
			"STN": 815
		},
		"GOA": {
			"BGY": 155,
			"BRI": 741,
			"CAG": 574,
			"IBZ": 873,
			"LGW": 1006,
			"LHR": 1045,
			"MUC": 493,
			"PSA": 148,
			"STN": 1046,
			"TPS": 784
		},
		"GOJ": {
			"FRA": 2421,
			"PEE": 762
		},
		"GOT": {
			"AGP": 2640,
			"AHO": 1915,
			"ALC": 2348,
			"BGY": 1345,
			"BVA": 1130,
			"CBG": 980,
			"CIA": 1764,
			"CPH": 228,
			"DUS": 792,
			"EDI": 969,
			"FAI": 6295,
			"FRA": 883,
			"HEL": 782,
			"LGW": 1081,
			"LHR": 1068,
			"LTN": 1033,
			"MLA": 2430,
			"MRS": 1657,
			"MUC": 1035,
			"PMI": 2128,
			"PSA": 1560,
			"STN": 1002,
			"TXL": 571,
			"WMI": 786,
			"ZAD": 1522
		},
		"GPA": {
			"PFO": 1059
		},
		"GPT": {
			"DFW": 803
		},
		"GRB": {
			"ORD": 279
		},
		"GRK": {
			"DFW": 216,
			"IAH": 267
		},
		"GRO": {
			"AGP": 852,
			"AHO": 483,
			"BCN": 87,
			"BDS": 1275,
			"BGY": 697,
			"BHX": 1221,
			"BLL": 1607,
			"BOH": 1048,
			"BRE": 1318,
			"BRS": 1133,
			"BTS": 1329,
			"BVA": 841,
			"CGN": 1051,
			"CRL": 960,
			"DTM": 1131,
			"DUB": 1446,
			"EIN": 1080,
			"EMA": 1253,
			"FKB": 870,
			"FMM": 896,
			"GRQ": 1279,
			"HHN": 960,
			"IBZ": 356,
			"KRK": 1593,
			"LBA": 1370,
			"LGW": 1052,
			"LPL": 1338,
			"LPP": 2725,
			"LTN": 1134,
			"MAN": 1327,
			"MLA": 1215,
			"MME": 1435,
			"MST": 1028,
			"NCL": 1496,
			"NOC": 1586,
			"NRN": 1109,
			"ORK": 1394,
			"PEG": 810,
			"PIK": 1604,
			"PMI": 261,
			"POZ": 1575,
			"PSA": 653,
			"PSR": 942,
			"RAK": 1493,
			"RBA": 1205,
			"SFT": 2782,
			"SKG": 1694,
			"STN": 1126,
			"TLL": 2468,
			"TLS": 223,
			"TMP": 2578,
			"TPS": 940,
			"WRO": 1484
		},
		"GRQ": {
			"GRO": 1279,
			"PMI": 1537,
			"STN": 450
		},
		"GRR": {
			"DEN": 1629,
			"EWR": 971,
			"ORD": 219
		},
		"GRU": {
			"BSB": 854,
			"CNF": 495,
			"CWB": 359,
			"FLN": 515,
			"FOR": 2346,
			"FRA": 9798,
			"GIG": 337,
			"GYN": 809,
			"IGU": 846,
			"LGW": 9448,
			"LHR": 9462,
			"MAD": 8381,
			"MUC": 9859,
			"MVD": 1570,
			"POA": 866,
			"REC": 2100,
			"SCL": 2615,
			"SSA": 1451,
			"ZRH": 9611
		},
		"GRX": {
			"EMA": 1750,
			"LCY": 1620,
			"LPL": 1797,
			"MAD": 368,
			"STN": 1664
		},
		"GRZ": {
			"DUS": 790,
			"FRA": 609,
			"MUC": 312,
			"STN": 1223,
			"STR": 500
		},
		"GSE": {
			"STN": 990
		},
		"GSO": {
			"EWR": 716,
			"IAD": 384,
			"ORD": 948
		},
		"GSP": {
			"EWR": 956,
			"IAD": 618,
			"ORD": 930
		},
		"GUA": {
			"MAD": 8710,
			"MIA": 1640
		},
		"GUM": {
			"SYD": 5318
		},
		"GVA": {
			"ABZ": 1344,
			"AGP": 1380,
			"ALC": 1040,
			"AMS": 682,
			"ARN": 1683,
			"BCN": 637,
			"BDS": 1137,
			"BEG": 1116,
			"BFS": 1276,
			"BHX": 894,
			"BOD": 554,
			"BOH": 772,
			"BRS": 862,
			"BRU": 532,
			"BUD": 1007,
			"CBG": 790,
			"CPH": 1138,
			"CTA": 1224,
			"DUB": 1191,
			"DUS": 563,
			"EDI": 1264,
			"EWR": 6226,
			"FCO": 695,
			"FRA": 458,
			"FUE": 2636,
			"GLA": 1297,
			"HAM": 867,
			"IAD": 6568,
			"INV": 1434,
			"KRK": 1098,
			"LBA": 1012,
			"LCY": 733,
			"LGW": 715,
			"LHR": 754,
			"LIL": 529,
			"LIS": 1496,
			"LPL": 1016,
			"LTN": 784,
			"MAD": 1008,
			"MAN": 992,
			"MUC": 488,
			"NAP": 887,
			"NCE": 299,
			"NCL": 1121,
			"NTE": 597,
			"OPO": 1308,
			"ORY": 394,
			"PMI": 792,
			"PMO": 1064,
			"PRN": 1251,
			"PSA": 440,
			"RAK": 2029,
			"SCQ": 1207,
			"SEN": 712,
			"STN": 759,
			"SVQ": 1394,
			"SXF": 868,
			"TFS": 2833,
			"TLS": 472,
			"TLV": 2919,
			"TXL": 873,
			"VCE": 490,
			"VIE": 817,
			"ZRH": 230
		},
		"GWT": {
			"DUS": 416,
			"MUC": 767,
			"TXL": 417
		},
		"GYD": {
			"ASB": 767,
			"FRA": 3370,
			"LGW": 3986,
			"LHR": 4003,
			"MAN": 4119
		},
		"GYE": {
			"PTY": 1250
		},
		"GYN": {
			"GRU": 809
		},
		"GYR": {
			"BGR": 0
		},
		"HAJ": {
			"BHX": 774,
			"BRE": 88,
			"BRU": 398,
			"CPH": 401,
			"DUS": 239,
			"FRA": 282,
			"LGW": 694,
			"LHR": 703,
			"MAN": 807,
			"MUC": 480,
			"VIE": 687,
			"ZRH": 561
		},
		"HAM": {
			"ACE": 3346,
			"AGP": 2192,
			"ALC": 1887,
			"AMS": 379,
			"ARN": 825,
			"ATH": 2045,
			"BCN": 1492,
			"BGY": 885,
			"BHX": 794,
			"BRU": 481,
			"BSL": 693,
			"CDG": 728,
			"CGN": 363,
			"CPH": 279,
			"DUB": 1072,
			"DUS": 339,
			"EDI": 893,
			"FCO": 1326,
			"FRA": 412,
			"FUE": 3406,
			"GVA": 867,
			"JER": 975,
			"KEF": 2166,
			"KRK": 779,
			"LCY": 711,
			"LED": 1406,
			"LGW": 743,
			"LHR": 745,
			"LIS": 2198,
			"LPA": 3529,
			"LPL": 849,
			"LTN": 723,
			"MAD": 1779,
			"MAH": 1591,
			"MAN": 811,
			"MUC": 600,
			"MXP": 894,
			"NAP": 1453,
			"NCE": 1127,
			"NCL": 772,
			"NUE": 465,
			"OPO": 1955,
			"ORY": 761,
			"OSL": 733,
			"PMI": 1659,
			"PSA": 1106,
			"SCN": 530,
			"SOF": 1566,
			"STN": 683,
			"STR": 552,
			"SZG": 682,
			"VCE": 919,
			"VIE": 767,
			"VKO": 1758,
			"ZRH": 693
		},
		"HAN": {
			"BKK": 995
		},
		"HAU": {
			"ALC": 2378,
			"OSL": 343,
			"PSA": 1777,
			"STN": 886,
			"ZAD": 1828
		},
		"HAV": {
			"LGW": 7510
		},
		"HEL": {
			"BMA": 406,
			"CPH": 892,
			"DUS": 1508,
			"FRA": 1540,
			"GOT": 782,
			"LEJ": 1263,
			"LGW": 1858,
			"LHR": 1847,
			"MAN": 1812,
			"MIA": 8329,
			"MUC": 1574,
			"OSL": 763,
			"OUL": 513,
			"RIX": 381,
			"RVN": 696,
			"TLL": 100,
			"TXL": 1119,
			"VNO": 632,
			"WAW": 939
		},
		"HER": {
			"LGW": 2680,
			"MUC": 1818
		},
		"HET": {
			"PEK": 411
		},
		"HFE": {
			"PEK": 925
		},
		"HGH": {
			"CTU": 1580,
			"PEK": 1149
		},
		"HGU": {
			"POM": 515
		},
		"HHN": {
			"ACE": 2923,
			"AGP": 1752,
			"AHO": 1039,
			"ALC": 1438,
			"BGY": 509,
			"BRI": 1225,
			"CAG": 1198,
			"CFU": 1519,
			"CHQ": 2105,
			"CIA": 995,
			"CIY": 1555,
			"DUB": 1008,
			"EDI": 974,
			"FAO": 1884,
			"FEZ": 2043,
			"FKB": 142,
			"FUE": 2983,
			"GRO": 960,
			"IBZ": 1316,
			"KGS": 2158,
			"KIR": 1196,
			"LIS": 1793,
			"LPA": 3110,
			"MPL": 751,
			"NDR": 1861,
			"NQY": 873,
			"OPO": 1568,
			"PDV": 1610,
			"PMI": 1209,
			"PSA": 736,
			"PSR": 990,
			"PUY": 752,
			"RAK": 2402,
			"REU": 1087,
			"RHO": 2249,
			"RIX": 1346,
			"SCQ": 1431,
			"SDR": 1112,
			"SKG": 1610,
			"STN": 537,
			"SUF": 1417,
			"SZZ": 662,
			"TFS": 3162,
			"TNG": 1906,
			"TPS": 1401,
			"TSF": 603,
			"TSR": 1144,
			"VLC": 1312,
			"VNO": 1327,
			"VOL": 1707,
			"XRY": 1815,
			"ZAD": 892
		},
		"HIJ": {
			"HND": 637
		},
		"HKD": {
			"HND": 697
		},
		"HKG": {
			"ADL": 6877,
			"AKL": 9172,
			"ALA": 4114,
			"BAH": 6367,
			"BNE": 6950,
			"CGK": 3259,
			"CNS": 5569,
			"DEL": 3747,
			"DOH": 6296,
			"DXB": 5921,
			"FRA": 9157,
			"KUL": 2543,
			"LHR": 9633,
			"MEL": 7414,
			"MUC": 9021,
			"PER": 6037,
			"SGN": 1493,
			"SHJ": 5904,
			"STN": 9568,
			"SUB": 3304,
			"SYD": 7395,
			"USM": 2048
		},
		"HKT": {
			"BKK": 673
		},
		"HND": {
			"AXT": 453,
			"CTS": 820,
			"FRA": 9365,
			"FUK": 881,
			"HIJ": 637,
			"HKD": 697,
			"ITM": 403,
			"KCZ": 602,
			"KIX": 431,
			"KMI": 872,
			"KMJ": 874,
			"KMQ": 317,
			"KOJ": 936,
			"LHR": 9593,
			"MUC": 9361,
			"MYJ": 675,
			"NGO": 281,
			"NGS": 952,
			"OIT": 772,
			"OKA": 1554,
			"OKJ": 545,
			"SIN": 5301,
			"TAK": 546,
			"TKS": 497,
			"TOY": 262,
			"UBJ": 797
		},
		"HNL": {
			"AKL": 7090,
			"DFW": 6082,
			"LAX": 4109,
			"SEA": 4309,
			"SFO": 3857,
			"YVR": 4354
		},
		"HOQ": {
			"LCY": 837
		},
		"HOU": {
			"DFW": 398
		},
		"HPN": {
			"CLT": 907,
			"ORD": 1185
		},
		"HRB": {
			"PEK": 999
		},
		"HRE": {
			"JNB": 958
		},
		"HRG": {
			"LGW": 3901
		},
		"HSV": {
			"BHM": 119,
			"IAD": 957,
			"ORD": 822
		},
		"HUY": {
			"AAL": 753,
			"ALC": 1700,
			"BLL": 656
		},
		"HYD": {
			"FRA": 7105,
			"LHR": 7740
		},
		"IAD": {
			"ALB": 522,
			"AMS": 6208,
			"ATL": 859,
			"AUS": 2084,
			"BDL": 523,
			"BNA": 871,
			"BOS": 663,
			"BRU": 6248,
			"BUF": 457,
			"BWI": 72,
			"CAE": 645,
			"CDG": 6199,
			"CHS": 711,
			"CLE": 463,
			"CLT": 517,
			"CMH": 481,
			"CPH": 6541,
			"CVG": 623,
			"DAY": 590,
			"DEN": 2332,
			"DUB": 5465,
			"FAY": 457,
			"FLL": 1453,
			"FRA": 6551,
			"GSO": 384,
			"GSP": 618,
			"GVA": 6568,
			"HSV": 957,
			"IAH": 1913,
			"IND": 764,
			"JAX": 1016,
			"JFK": 366,
			"LAX": 3675,
			"LHR": 5903,
			"LIS": 5767,
			"MCI": 1487,
			"MCO": 1222,
			"MDT": 151,
			"MIA": 1486,
			"MSP": 1459,
			"MSY": 1536,
			"MUC": 6844,
			"OKC": 1824,
			"ORF": 253,
			"PHX": 3142,
			"PIT": 293,
			"RDU": 360,
			"RIC": 160,
			"ROA": 284,
			"ROC": 464,
			"SAT": 2189,
			"SAV": 830,
			"SDF": 725,
			"SEA": 3702,
			"SFO": 3884,
			"STL": 1117,
			"SYR": 477,
			"TPA": 1307,
			"TYS": 674,
			"VIE": 7167,
			"YYZ": 556,
			"ZRH": 6675
		},
		"IAH": {
			"ABQ": 1196,
			"AKL": 11946,
			"AMS": 8051,
			"AUS": 225,
			"BHM": 903,
			"BJX": 1174,
			"BRO": 497,
			"BTR": 407,
			"CHS": 1486,
			"CLE": 1756,
			"CLL": 118,
			"CLT": 1467,
			"CRP": 323,
			"CRW": 1568,
			"CUN": 1307,
			"CVG": 1402,
			"DCA": 1942,
			"DEN": 1387,
			"DFW": 361,
			"DMA": 1498,
			"DTW": 1731,
			"ELP": 1072,
			"FLL": 1551,
			"FRA": 8403,
			"GDL": 1322,
			"GRK": 267,
			"IAD": 1913,
			"ICT": 874,
			"IND": 1359,
			"JAN": 563,
			"LAS": 1963,
			"LAX": 2215,
			"LBB": 736,
			"LCH": 204,
			"LFT": 323,
			"LGA": 2277,
			"LGW": 7796,
			"LHR": 7764,
			"LIT": 603,
			"LRD": 484,
			"MAF": 689,
			"MEM": 754,
			"MFE": 510,
			"MIA": 1549,
			"MOB": 685,
			"MSP": 1667,
			"MSY": 489,
			"MTY": 661,
			"OKC": 637,
			"ORD": 1491,
			"PHL": 2130,
			"PHX": 1621,
			"PIT": 1797,
			"PNS": 785,
			"SAN": 2093,
			"SAT": 306,
			"SDF": 1268,
			"SHV": 309,
			"SJU": 3228,
			"SNA": 2163,
			"STL": 1075,
			"STN": 7791,
			"TAM": 891,
			"TPA": 1265,
			"TUL": 693,
			"TUS": 1503,
			"TYS": 1240,
			"VER": 1208,
			"VPS": 848
		},
		"IAS": {
			"VIE": 833
		},
		"IBZ": {
			"AGP": 571,
			"ALC": 180,
			"BCN": 276,
			"BGY": 1019,
			"BHX": 1529,
			"BLQ": 1035,
			"BOH": 1348,
			"BRS": 1427,
			"CIA": 1004,
			"CRL": 1311,
			"DUB": 1719,
			"DUS": 1443,
			"EDI": 1931,
			"EIN": 1433,
			"EMA": 1566,
			"FRA": 1363,
			"GOA": 873,
			"GRO": 356,
			"HHN": 1316,
			"LBA": 1683,
			"LCY": 1408,
			"LGW": 1370,
			"LHR": 1409,
			"LPL": 1640,
			"MAD": 459,
			"MAN": 1634,
			"MRS": 600,
			"MUC": 1344,
			"MXP": 964,
			"NRN": 1463,
			"PIK": 1902,
			"PMI": 139,
			"PSA": 923,
			"STN": 1449,
			"TRN": 873,
			"TSF": 1164,
			"TXL": 1776,
			"VLC": 173
		},
		"ICN": {
			"FRA": 8547,
			"LHR": 8863,
			"MUC": 8501,
			"NRT": 1257,
			"PEK": 902
		},
		"ICT": {
			"DEN": 674,
			"DFW": 529,
			"IAH": 874,
			"ORD": 944
		},
		"IFN": {
			"VIE": 3399
		},
		"IGS": {
			"IGS": 0
		},
		"IGU": {
			"GIG": 1181,
			"GRU": 846
		},
		"IKA": {
			"FRA": 3777,
			"LHR": 4423,
			"MUC": 3514,
			"VIE": 3162
		},
		"ILN": {
			"EMA": 6166
		},
		"ILY": {
			"GLA": 116
		},
		"IND": {
			"CLT": 688,
			"DEN": 1568,
			"EWR": 1034,
			"IAD": 764,
			"IAH": 1359,
			"JFK": 1067,
			"MIA": 1646,
			"ORD": 285,
			"STN": 6439,
			"YYZ": 706
		},
		"INI": {
			"BGY": 997,
			"BTS": 646,
			"NRN": 1491,
			"SXF": 1180
		},
		"INN": {
			"BRS": 1115,
			"FRA": 370,
			"LGW": 941,
			"LHR": 973,
			"LTN": 986,
			"NCL": 1251,
			"TXL": 605
		},
		"INV": {
			"BHX": 584,
			"BRS": 690,
			"DUB": 479,
			"DUS": 984,
			"EDI": 181,
			"GLA": 187,
			"GVA": 1434,
			"KOI": 171,
			"LGW": 753,
			"LHR": 712,
			"LTN": 673,
			"SYY": 154
		},
		"IOM": {
			"BRS": 326,
			"DUB": 130,
			"LCY": 425,
			"LGW": 442,
			"LPL": 143
		},
		"ISB": {
			"DOH": 2277,
			"LHR": 6067,
			"MAN": 6147
		},
		"IST": {
			"FRA": 1864,
			"LHR": 2513,
			"MUC": 1572,
			"TLV": 1134,
			"TXL": 1741
		},
		"ISU": {
			"DOH": 1292
		},
		"ITM": {
			"HND": 403
		},
		"IVL": {
			"FRA": 2305,
			"LGW": 2434
		},
		"JAC": {
			"DEN": 653,
			"DFW": 1684,
			"ORD": 1866
		},
		"JAN": {
			"DFW": 655,
			"IAH": 563,
			"ORD": 1092
		},
		"JAX": {
			"CLT": 529,
			"DCA": 1021,
			"DFW": 1475,
			"EWR": 1321,
			"IAD": 1016,
			"MIA": 540,
			"ORD": 1392
		},
		"JED": {
			"ADD": 1413,
			"FRA": 4133,
			"LHR": 4749
		},
		"JER": {
			"BOH": 176,
			"BRS": 244,
			"DUB": 547,
			"DUS": 677,
			"HAM": 975,
			"LGW": 258,
			"LHR": 280,
			"LPL": 461,
			"MAN": 461,
			"MUC": 1027,
			"SNN": 610,
			"SOU": 202
		},
		"JFK": {
			"ATL": 1222,
			"AUS": 2446,
			"BCN": 6151,
			"BHX": 5424,
			"BNA": 1230,
			"BOH": 5472,
			"BOS": 300,
			"BRU": 5887,
			"BTL": 0,
			"BWI": 295,
			"CDG": 5835,
			"CGN": 6061,
			"CMH": 775,
			"DCA": 342,
			"DFW": 2235,
			"DUB": 5104,
			"EMA": 5440,
			"FRA": 6189,
			"IAD": 366,
			"IND": 1067,
			"LAS": 3610,
			"LAX": 3975,
			"LCY": 5574,
			"LGW": 5570,
			"LHR": 5541,
			"MAD": 5762,
			"MAN": 5363,
			"MCO": 1521,
			"MIA": 1757,
			"MUC": 6482,
			"MXP": 6414,
			"MZJ": 3445,
			"NRT": 10833,
			"ORD": 1188,
			"ORF": 466,
			"ORY": 5834,
			"PHL": 150,
			"PHX": 3459,
			"RDU": 686,
			"SAN": 3929,
			"SDQ": 2501,
			"SEA": 3887,
			"SFO": 4152,
			"SJU": 2578,
			"SNN": 4947,
			"STN": 5572,
			"SWF": 99,
			"SYR": 335,
			"VIE": 6806,
			"YUL": 537,
			"YYT": 1841,
			"YYZ": 588,
			"ZRH": 6311
		},
		"JIB": {
			"DOH": 1763
		},
		"JKG": {
			"FRA": 932,
			"KSD": 192
		},
		"JMK": {
			"ATH": 135,
			"LHR": 2553
		},
		"JNB": {
			"CPT": 1271,
			"DUR": 501,
			"ELS": 768,
			"FRA": 8692,
			"HRE": 958,
			"LHR": 9078,
			"LVI": 958,
			"MAD": 8108,
			"MRU": 3066,
			"MUC": 8446,
			"NBO": 2912,
			"PLZ": 908,
			"VFA": 928,
			"WDH": 1165
		},
		"JRO": {
			"ADD": 1393
		},
		"JTR": {
			"ATH": 218,
			"LHR": 2645,
			"MUC": 1736
		},
		"KBP": {
			"DUS": 1691,
			"FRA": 1586,
			"LHR": 2185,
			"LTN": 2172,
			"MUC": 1398
		},
		"KBV": {
			"BKK": 650,
			"DOH": 5366
		},
		"KCZ": {
			"HND": 602
		},
		"KEF": {
			"BFS": 1385,
			"BGR": 3552,
			"BRS": 1817,
			"DUB": 1497,
			"DUS": 2213,
			"EDI": 1385,
			"FRA": 2401,
			"GLA": 1347,
			"HAM": 2166,
			"LGW": 1935,
			"LHR": 1894,
			"LTN": 1862,
			"MAN": 1653,
			"MUC": 2692,
			"STN": 1885,
			"TXL": 2406,
			"YMX": 3722,
			"YYR": 2438
		},
		"KGL": {
			"ADD": 1550,
			"BJM": 176,
			"BRU": 6363,
			"EBB": 340
		},
		"KGS": {
			"BGY": 1752,
			"BLQ": 1582,
			"BRI": 1014,
			"CRL": 2356,
			"FCO": 1391,
			"HHN": 2158,
			"KRK": 1589,
			"KUN": 2033,
			"LBA": 2907,
			"LHR": 2712,
			"LPL": 2949,
			"PSA": 1607,
			"RYG": 2771,
			"STN": 2690
		},
		"KHI": {
			"DOH": 1570
		},
		"KIJ": {
			"NGO": 363
		},
		"KIN": {
			"LGW": 7538,
			"MIA": 945
		},
		"KIR": {
			"ALC": 1694,
			"DUS": 1124,
			"FAO": 1691,
			"HHN": 1196,
			"LTN": 627,
			"STN": 668
		},
		"KIV": {
			"MUC": 1291
		},
		"KIX": {
			"ANC": 5909,
			"CTS": 1083,
			"FAI": 5978,
			"FRA": 9265,
			"FUK": 451,
			"HND": 431,
			"NKG": 1553,
			"OKA": 1170
		},
		"KJA": {
			"DME": 3322
		},
		"KLU": {
			"FRA": 569,
			"STN": 1175,
			"VIE": 234
		},
		"KLX": {
			"BGY": 1401,
			"LHR": 2385
		},
		"KMG": {
			"CTU": 632,
			"PEK": 2115
		},
		"KMI": {
			"HND": 872,
			"NGO": 597
		},
		"KMJ": {
			"HND": 874,
			"NGO": 593
		},
		"KMQ": {
			"HND": 317
		},
		"KOA": {
			"LAX": 4026,
			"SEA": 4327,
			"SFO": 3809
		},
		"KOI": {
			"ABZ": 199,
			"EDI": 335,
			"GLA": 355,
			"INV": 171
		},
		"KOJ": {
			"HND": 936,
			"NGO": 659
		},
		"KRK": {
			"AGP": 2446,
			"ALC": 2074,
			"BFS": 1825,
			"BGY": 896,
			"BHX": 1515,
			"BLQ": 888,
			"BOH": 1528,
			"BRS": 1584,
			"BSL": 937,
			"BVA": 1268,
			"CAG": 1470,
			"CDG": 1246,
			"CIA": 1074,
			"CRL": 1088,
			"DTM": 869,
			"DUB": 1821,
			"EDI": 1671,
			"EIN": 1023,
			"EMA": 1489,
			"FRA": 802,
			"GDN": 486,
			"GRO": 1593,
			"GVA": 1098,
			"HAM": 779,
			"KGS": 1589,
			"LBA": 1522,
			"LGW": 1410,
			"LHR": 1427,
			"LPA": 3853,
			"LPL": 1594,
			"LYS": 1195,
			"MAD": 2102,
			"MAN": 1556,
			"MLA": 1638,
			"MUC": 611,
			"MXP": 960,
			"NAP": 1107,
			"NYO": 986,
			"PFO": 1995,
			"PMI": 1776,
			"PSA": 1006,
			"RYG": 1182,
			"SNN": 2000,
			"STN": 1379,
			"TFS": 3919,
			"TPS": 1472,
			"TRF": 1181,
			"VCE": 752,
			"VDA": 2573,
			"WMI": 270
		},
		"KRR": {
			"DME": 1157
		},
		"KRS": {
			"OSL": 280
		},
		"KRT": {
			"DOH": 2250
		},
		"KSC": {
			"VIE": 350
		},
		"KSD": {
			"JKG": 192
		},
		"KTT": {
			"BRS": 2349,
			"LGW": 2288,
			"MUC": 2274
		},
		"KTW": {
			"ALC": 2056,
			"BHX": 1454,
			"CFU": 1211,
			"CHQ": 1711,
			"DUB": 1758,
			"FRA": 750,
			"LTN": 1360,
			"STN": 1319
		},
		"KUF": {
			"DME": 818,
			"FRA": 2848
		},
		"KUL": {
			"BKK": 1220,
			"FRA": 10002,
			"HKG": 2543,
			"LHR": 10608,
			"USM": 778
		},
		"KUN": {
			"BRS": 1818,
			"CAG": 2075,
			"CPH": 726,
			"DUB": 1967,
			"EDI": 1723,
			"KGS": 2033,
			"LBA": 1661,
			"LGW": 1668,
			"LTN": 1647,
			"NOC": 2112,
			"PFO": 2343,
			"PMI": 2334,
			"RHO": 2086,
			"RYG": 937,
			"SNN": 2160,
			"STN": 1608,
			"TPS": 2088,
			"VDA": 2914
		},
		"KWI": {
			"DMM": 355,
			"DOH": 566,
			"FRA": 4023,
			"LHR": 4676,
			"STN": 4639
		},
		"KZN": {
			"DME": 715,
			"FRA": 2765
		},
		"LAD": {
			"FRA": 6565,
			"LHR": 6838
		},
		"LAN": {
			"ORD": 286
		},
		"LAS": {
			"CLT": 3077,
			"DEN": 1009,
			"DFW": 1695,
			"IAH": 1963,
			"JFK": 3610,
			"LAX": 380,
			"LGW": 8435,
			"LHR": 8396,
			"MIA": 3495,
			"ORD": 2432,
			"PHL": 3495,
			"PHX": 411,
			"SFO": 665
		},
		"LAW": {
			"DFW": 225
		},
		"LAX": {
			"ABQ": 1087,
			"AKL": 10489,
			"AUS": 1994,
			"BGR": 4358,
			"BOS": 4194,
			"CLT": 3413,
			"DEN": 1385,
			"DFW": 1983,
			"DUB": 8320,
			"EWR": 3942,
			"FAT": 336,
			"FRA": 9323,
			"HNL": 4109,
			"IAD": 3675,
			"IAH": 2215,
			"JFK": 3975,
			"KOA": 4026,
			"LAS": 380,
			"LHR": 8761,
			"LIH": 4204,
			"MCO": 3563,
			"MEL": 12761,
			"MIA": 3763,
			"MRY": 428,
			"MTJ": 1070,
			"MUC": 9618,
			"OGG": 3996,
			"OKC": 1906,
			"ORD": 2802,
			"PHL": 3857,
			"PHX": 594,
			"PSP": 176,
			"RNO": 629,
			"SAN": 175,
			"SBA": 142,
			"SBP": 250,
			"SFO": 543,
			"SJC": 495,
			"SLC": 949,
			"SMF": 600,
			"SYD": 12064,
			"TUS": 725,
			"TXL": 9321,
			"YYZ": 3494,
			"ZRH": 9536
		},
		"LBA": {
			"ABZ": 372,
			"ACE": 2936,
			"AGP": 1924,
			"ALC": 1735,
			"BGY": 1220,
			"BTS": 1458,
			"CCF": 1219,
			"CFU": 2267,
			"CHQ": 2854,
			"DNR": 587,
			"DUB": 307,
			"FAO": 1935,
			"FUE": 2995,
			"GDN": 1308,
			"GRO": 1370,
			"GVA": 1012,
			"IBZ": 1683,
			"KGS": 2907,
			"KRK": 1522,
			"KUN": 1661,
			"LHR": 277,
			"LIG": 912,
			"LPA": 3094,
			"LPL": 98,
			"MJV": 1790,
			"MLA": 2360,
			"MPL": 1215,
			"PMI": 1625,
			"PSA": 1432,
			"RIX": 1644,
			"TFS": 3118,
			"TSF": 1347,
			"VNO": 1742,
			"WMI": 1490
		},
		"LBB": {
			"DEN": 734,
			"DFW": 452,
			"IAH": 736
		},
		"LBC": {
			"STN": 735
		},
		"LCA": {
			"ATH": 930,
			"BRU": 2937,
			"BSL": 2581,
			"FRA": 2638,
			"LGW": 3248,
			"LHR": 3278,
			"LPL": 3504,
			"MUC": 2340,
			"MXP": 2413,
			"PFO": 105,
			"SXF": 2514,
			"VIE": 2036
		},
		"LCG": {
			"LHR": 1085,
			"MAD": 506
		},
		"LCH": {
			"IAH": 204
		},
		"LCJ": {
			"DUB": 1735,
			"EMA": 1410,
			"LPL": 1509,
			"MUC": 659,
			"RYG": 1007,
			"STN": 1314
		},
		"LCQ": {
			"ATL": 422
		},
		"LCY": {
			"AGP": 1688,
			"AMS": 335,
			"BLL": 761,
			"BRE": 618,
			"CMF": 780,
			"DUB": 478,
			"DUS": 466,
			"EDI": 543,
			"FLR": 1193,
			"FMO": 528,
			"FRA": 618,
			"GLA": 568,
			"GRX": 1620,
			"GVA": 733,
			"HAM": 711,
			"HOQ": 837,
			"IBZ": 1408,
			"IOM": 425,
			"JFK": 5574,
			"LGW": 43,
			"MAD": 1255,
			"MUC": 908,
			"PMI": 1345,
			"RTM": 305,
			"THF": 919,
			"TXL": 911,
			"ZRH": 759
		},
		"LDE": {
			"DUB": 1228,
			"STN": 968
		},
		"LDY": {
			"ALC": 1929,
			"BHX": 457,
			"FAO": 2006,
			"GLA": 195,
			"LPL": 338,
			"LTN": 571,
			"MAN": 369,
			"PIK": 171,
			"STN": 602
		},
		"LED": {
			"DUS": 1741,
			"FRA": 1749,
			"HAM": 1406,
			"LGW": 2121,
			"LHR": 2113,
			"MUC": 1741
		},
		"LEH": {
			"NHT": 227
		},
		"LEI": {
			"CRL": 1609,
			"DUB": 1868,
			"EMA": 1780,
			"LGW": 1600,
			"MAD": 419,
			"STN": 1685
		},
		"LEJ": {
			"DUS": 380,
			"FRA": 303,
			"HEL": 1263,
			"MUC": 343,
			"PAD": 251,
			"STN": 829,
			"VIE": 482,
			"ZRH": 515
		},
		"LEX": {
			"EWR": 944,
			"ORD": 520
		},
		"LFT": {
			"DFW": 564,
			"IAH": 323
		},
		"LGA": {
			"BOS": 296,
			"CLT": 875,
			"DEN": 2600,
			"DFW": 2231,
			"IAH": 2277,
			"MIA": 1768,
			"ORD": 1177,
			"YYZ": 573
		},
		"LGG": {
			"DUB": 858,
			"FRA": 230,
			"LHR": 423,
			"YMX": 5631
		},
		"LGW": {
			"ABJ": 5115,
			"ABZ": 685,
			"ACC": 5065,
			"ACE": 2710,
			"ADB": 2567,
			"AGA": 2435,
			"AGP": 1645,
			"ALA": 5622,
			"ALC": 1431,
			"ALG": 1630,
			"AMS": 364,
			"ANU": 6565,
			"ATH": 2393,
			"ATL": 6792,
			"BAH": 5068,
			"BCN": 1109,
			"BDA": 5542,
			"BFS": 561,
			"BGI": 6760,
			"BGY": 949,
			"BIA": 1204,
			"BIO": 896,
			"BJV": 2680,
			"BLQ": 1127,
			"BOD": 704,
			"BOH": 122,
			"BRI": 1709,
			"BSL": 684,
			"BUD": 1464,
			"CAG": 1505,
			"CBG": 120,
			"CCS": 7483,
			"CDG": 307,
			"CLT": 6439,
			"CMF": 758,
			"CPH": 984,
			"CPT": 9643,
			"CTA": 1938,
			"CUN": 7978,
			"DBV": 1690,
			"DEN": 7535,
			"DFW": 7662,
			"DHA": 5036,
			"DLM": 2793,
			"DUB": 484,
			"DUS": 484,
			"EBB": 6459,
			"EDI": 573,
			"EZE": 11127,
			"FAO": 1688,
			"FCO": 1406,
			"FDH": 800,
			"FLR": 1180,
			"FNC": 2456,
			"FNI": 891,
			"FPO": 6964,
			"FRA": 628,
			"FUE": 2771,
			"GCI": 256,
			"GDN": 1301,
			"GIB": 1717,
			"GIG": 9239,
			"GLA": 595,
			"GNB": 761,
			"GOA": 1006,
			"GOT": 1081,
			"GRO": 1052,
			"GRU": 9448,
			"GVA": 715,
			"GYD": 3986,
			"HAJ": 694,
			"HAM": 743,
			"HAV": 7510,
			"HEL": 1858,
			"HER": 2680,
			"HRG": 3901,
			"IAH": 7796,
			"IBZ": 1370,
			"INN": 941,
			"INV": 753,
			"IOM": 442,
			"IVL": 2434,
			"JER": 258,
			"JFK": 5570,
			"KEF": 1935,
			"KIN": 7538,
			"KRK": 1410,
			"KTT": 2288,
			"KUN": 1668,
			"LAS": 8435,
			"LCA": 3248,
			"LCY": 43,
			"LED": 2121,
			"LEI": 1600,
			"LHR": 41,
			"LIM": 10159,
			"LIN": 943,
			"LIS": 1542,
			"LJU": 1204,
			"LOS": 4968,
			"LPA": 2879,
			"LUX": 484,
			"LYS": 717,
			"MAD": 1213,
			"MAN": 283,
			"MCO": 6993,
			"MIA": 7135,
			"MJV": 1488,
			"MLA": 2063,
			"MLE": 8516,
			"MPL": 898,
			"MRS": 949,
			"MRU": 9750,
			"MUC": 913,
			"MXP": 899,
			"NAP": 1592,
			"NBO": 6804,
			"NCE": 1001,
			"NOC": 659,
			"NQY": 346,
			"NTE": 456,
			"OPO": 1278,
			"ORK": 579,
			"OSD": 1597,
			"OSL": 1226,
			"OVD": 950,
			"PFO": 3186,
			"PHX": 8501,
			"PIT": 6003,
			"PMI": 1309,
			"PMO": 1778,
			"PRG": 1024,
			"PRN": 1865,
			"PSA": 1148,
			"PUJ": 6898,
			"RAK": 2266,
			"RHO": 2772,
			"RIX": 1692,
			"RNS": 360,
			"SAN": 8846,
			"SCQ": 1108,
			"SIR": 777,
			"SJO": 8730,
			"SKB": 6614,
			"SKG": 2134,
			"SNN": 623,
			"SOF": 2011,
			"SPC": 2902,
			"SSH": 3867,
			"STN": 87,
			"STR": 726,
			"SVG": 935,
			"SVQ": 1592,
			"SXF": 952,
			"SZG": 1022,
			"TAB": 7019,
			"TFS": 2913,
			"TIA": 1864,
			"TIP": 2325,
			"TLL": 1816,
			"TLS": 844,
			"TLV": 3558,
			"TPA": 7113,
			"TRN": 879,
			"UVF": 6801,
			"VAR": 2275,
			"VCE": 1117,
			"VIE": 1250,
			"VLC": 1296,
			"VNO": 1742,
			"VRN": 1038,
			"YQM": 4619,
			"ZAG": 1337,
			"ZRH": 753
		},
		"LHE": {
			"DOH": 2335
		},
		"LHR": {
			"ABV": 4776,
			"ABZ": 646,
			"ACC": 5102,
			"ADB": 2599,
			"ADD": 5922,
			"ADW": 5874,
			"AGA": 2463,
			"AGP": 1677,
			"ALA": 5625,
			"ALC": 1467,
			"AMM": 3684,
			"AMS": 370,
			"ARN": 1462,
			"ATH": 2427,
			"ATL": 6762,
			"AUH": 5518,
			"AUS": 7894,
			"BAH": 5095,
			"BCN": 1148,
			"BDL": 5379,
			"BEG": 1702,
			"BEY": 3482,
			"BFI": 7695,
			"BFS": 522,
			"BGI": 6753,
			"BGO": 1041,
			"BHD": 502,
			"BHX": 139,
			"BIA": 1244,
			"BIO": 927,
			"BIQ": 894,
			"BKK": 9580,
			"BLL": 790,
			"BLQ": 1163,
			"BLR": 8067,
			"BOG": 8475,
			"BOM": 7215,
			"BOS": 5240,
			"BRU": 350,
			"BSL": 720,
			"BUD": 1489,
			"BWI": 5834,
			"CAG": 1546,
			"CAI": 3533,
			"CDG": 347,
			"CFU": 2052,
			"CGN": 534,
			"CHQ": 2638,
			"CLT": 6410,
			"CPH": 979,
			"CPT": 9684,
			"CTU": 8303,
			"CWL": 200,
			"DAR": 7510,
			"DEL": 6733,
			"DEN": 7498,
			"DFW": 7629,
			"DGX": 0,
			"DME": 2545,
			"DMK": 9550,
			"DOH": 5241,
			"DTW": 6045,
			"DUB": 449,
			"DUS": 501,
			"DXB": 5499,
			"EBB": 6499,
			"EDI": 532,
			"EWR": 5563,
			"EZE": 11140,
			"FAO": 1713,
			"FCO": 1445,
			"FNA": 4907,
			"FRA": 653,
			"FRL": 1234,
			"GIB": 1748,
			"GIG": 9256,
			"GLA": 554,
			"GMP": 8869,
			"GNB": 802,
			"GOA": 1045,
			"GOT": 1068,
			"GRU": 9462,
			"GVA": 754,
			"GYD": 4003,
			"HAJ": 703,
			"HAM": 745,
			"HEL": 1847,
			"HKG": 9633,
			"HND": 9593,
			"HYD": 7740,
			"IAD": 5903,
			"IAH": 7764,
			"IBZ": 1409,
			"ICN": 8863,
			"IKA": 4423,
			"INN": 973,
			"INV": 712,
			"ISB": 6067,
			"IST": 2513,
			"JED": 4749,
			"JER": 280,
			"JFK": 5541,
			"JMK": 2553,
			"JNB": 9078,
			"JTR": 2645,
			"KBP": 2185,
			"KEF": 1894,
			"KGS": 2712,
			"KLX": 2385,
			"KRK": 1427,
			"KUL": 10608,
			"KWI": 4676,
			"LAD": 6838,
			"LAS": 8396,
			"LAX": 8761,
			"LBA": 277,
			"LCA": 3278,
			"LCG": 1085,
			"LED": 2113,
			"LGG": 423,
			"LGW": 41,
			"LIN": 981,
			"LIS": 1565,
			"LOS": 5006,
			"LPA": 2900,
			"LPL": 262,
			"LUX": 514,
			"LYS": 758,
			"MAA": 8237,
			"MAD": 1244,
			"MAH": 1341,
			"MAN": 242,
			"MCO": 6967,
			"MCT": 5835,
			"MEX": 8906,
			"MIA": 7110,
			"MRS": 990,
			"MUC": 942,
			"MXP": 937,
			"NAS": 6978,
			"NBO": 6843,
			"NCE": 1041,
			"NCL": 404,
			"NRT": 9593,
			"OLB": 1402,
			"ORD": 6345,
			"ORK": 555,
			"ORY": 366,
			"OSL": 1205,
			"OTP": 2105,
			"OVD": 974,
			"PAE": 7660,
			"PEK": 8155,
			"PHL": 5691,
			"PHX": 8464,
			"PMI": 1348,
			"PMO": 1819,
			"PRG": 1044,
			"PSA": 1186,
			"PVG": 9243,
			"RDU": 6217,
			"RIC": 5999,
			"RMI": 1278,
			"RST": 6475,
			"RTM": 341,
			"RUH": 4942,
			"SAN": 8808,
			"SEA": 7703,
			"SEZ": 8178,
			"SFO": 8617,
			"SIN": 10886,
			"SJC": 8620,
			"SNN": 593,
			"SOF": 2041,
			"SPU": 1532,
			"STN": 66,
			"STR": 756,
			"SVG": 908,
			"SVN": 6672,
			"SZG": 1051,
			"TER": 2501,
			"TFN": 2879,
			"TIP": 2366,
			"TLS": 883,
			"TLV": 3589,
			"TXL": 947,
			"VCE": 1152,
			"VCV": 8648,
			"VIE": 1275,
			"WAW": 1469,
			"XFW": 733,
			"YHZ": 4585,
			"YOW": 5347,
			"YUL": 5215,
			"YVR": 7580,
			"YYC": 7016,
			"YYT": 3716,
			"YYZ": 5708,
			"ZAG": 1368,
			"ZRH": 788
		},
		"LHW": {
			"CTU": 616
		},
		"LIG": {
			"ALC": 855,
			"BOH": 590,
			"BRS": 677,
			"EMA": 795,
			"LBA": 912,
			"LPL": 879,
			"MAN": 869,
			"OPO": 945,
			"STN": 673
		},
		"LIH": {
			"LAX": 4204,
			"SFO": 3935
		},
		"LIL": {
			"BOD": 698,
			"DUB": 714,
			"GVA": 529,
			"LIS": 1623,
			"MRS": 808,
			"MXP": 689,
			"NCE": 828,
			"NTE": 511,
			"OPO": 1376,
			"TLS": 782
		},
		"LIM": {
			"EZE": 3153,
			"LGW": 10159,
			"MAD": 9529,
			"MIA": 4220,
			"PTY": 2359
		},
		"LIN": {
			"AMS": 831,
			"BHX": 1118,
			"BRU": 702,
			"CDG": 644,
			"DUB": 1427,
			"FRA": 512,
			"LGW": 943,
			"LHR": 981,
			"MAD": 1179,
			"ORY": 638,
			"TXL": 843
		},
		"LIS": {
			"AMS": 1846,
			"BCN": 994,
			"BGY": 1724,
			"BOD": 968,
			"BRE": 2095,
			"BRS": 1488,
			"BRU": 1717,
			"BSL": 1663,
			"BVA": 1485,
			"CDG": 1470,
			"CIA": 1868,
			"DKR": 2796,
			"DUB": 1642,
			"DUS": 1862,
			"EDI": 1956,
			"EIN": 1804,
			"EWR": 5434,
			"FAO": 221,
			"FNC": 965,
			"FRA": 1872,
			"GVA": 1496,
			"HAM": 2198,
			"HHN": 1793,
			"IAD": 5767,
			"LGW": 1542,
			"LHR": 1565,
			"LIL": 1623,
			"LPL": 1688,
			"LTN": 1606,
			"LUX": 1712,
			"LYS": 1399,
			"MAD": 513,
			"MAN": 1703,
			"MRS": 1307,
			"MUC": 1984,
			"MXP": 1652,
			"NCE": 1468,
			"NTE": 1113,
			"OPO": 277,
			"ORY": 1437,
			"PDL": 1449,
			"PSA": 1717,
			"STN": 1628,
			"SXF": 2306,
			"TER": 1554,
			"WMI": 2741,
			"ZRH": 1723
		},
		"LIT": {
			"DFW": 489,
			"IAH": 603,
			"ORD": 889
		},
		"LJU": {
			"FRA": 609,
			"LGW": 1204,
			"MUC": 311,
			"SKP": 742,
			"STN": 1209
		},
		"LLA": {
			"ARN": 689
		},
		"LNK": {
			"DEN": 679,
			"ORD": 748
		},
		"LNZ": {
			"DUS": 631,
			"FRA": 456,
			"STN": 1073
		},
		"LOS": {
			"FRA": 4857,
			"LGW": 4968,
			"LHR": 5006,
			"SSG": 674
		},
		"LPA": {
			"BCN": 2175,
			"BGY": 2958,
			"BHX": 2951,
			"BLQ": 2999,
			"BOH": 2785,
			"BRE": 3426,
			"BRS": 2815,
			"BSL": 2950,
			"BUD": 3693,
			"CGN": 3175,
			"CRL": 3012,
			"DUB": 2932,
			"EDI": 3260,
			"EIN": 3138,
			"EMA": 3002,
			"FKB": 3067,
			"FRA": 3183,
			"GLA": 3228,
			"HAM": 3529,
			"HHN": 3110,
			"KRK": 3853,
			"LBA": 3094,
			"LGW": 2879,
			"LHR": 2900,
			"LPL": 3006,
			"LTN": 2941,
			"MAD": 1766,
			"MAN": 3025,
			"MUC": 3255,
			"MXP": 2892,
			"NCL": 3210,
			"NRN": 3186,
			"NYO": 4230,
			"OPO": 1601,
			"ORK": 2720,
			"PIK": 3187,
			"PSA": 2890,
			"RYG": 4026,
			"SCQ": 1778,
			"SEN": 2952,
			"STN": 2964,
			"SVQ": 1377,
			"SXF": 3617,
			"TFS": 117,
			"TRF": 3990,
			"VLC": 1880,
			"WMI": 4028
		},
		"LPL": {
			"ACE": 2850,
			"AGP": 1857,
			"ALC": 1683,
			"AMS": 524,
			"BCN": 1388,
			"BFS": 264,
			"BTS": 1517,
			"CCF": 1187,
			"CDG": 610,
			"CIA": 1721,
			"DUB": 227,
			"DUS": 691,
			"EGC": 977,
			"EMA": 116,
			"FAO": 1857,
			"FNI": 1190,
			"FUE": 2910,
			"GNB": 1064,
			"GRO": 1338,
			"GRX": 1797,
			"GVA": 1016,
			"HAM": 849,
			"IBZ": 1640,
			"IOM": 143,
			"JER": 461,
			"KGS": 2949,
			"KRK": 1594,
			"LBA": 98,
			"LCA": 3504,
			"LCJ": 1509,
			"LDY": 338,
			"LHR": 262,
			"LIG": 879,
			"LIS": 1688,
			"LPA": 3006,
			"MAD": 1429,
			"MAN": 38,
			"MJV": 1737,
			"MLA": 2365,
			"NCE": 1304,
			"NOC": 398,
			"NTE": 693,
			"OPO": 1413,
			"ORK": 415,
			"PMI": 1589,
			"POZ": 1320,
			"PSA": 1445,
			"RAK": 2452,
			"REU": 1388,
			"RHO": 3040,
			"SOF": 2264,
			"SVQ": 1785,
			"SXF": 1102,
			"SZG": 1274,
			"SZZ": 1172,
			"TFS": 3029,
			"TPS": 2079,
			"TRF": 1035,
			"VNO": 1833,
			"WMI": 1572,
			"WRO": 1362
		},
		"LPP": {
			"BGY": 2086,
			"GRO": 2725
		},
		"LRD": {
			"IAH": 484
		},
		"LRH": {
			"CRL": 633,
			"DUB": 883,
			"EMA": 739,
			"OPO": 813,
			"STN": 643
		},
		"LRT": {
			"OPO": 834
		},
		"LSE": {
			"ORD": 345
		},
		"LSI": {
			"ABZ": 302,
			"EDI": 453,
			"GLA": 482
		},
		"LTN": {
			"ABZ": 604,
			"ACE": 2775,
			"AGP": 1721,
			"AHO": 1414,
			"ALC": 1511,
			"AMS": 353,
			"BCN": 1191,
			"BES": 477,
			"BFS": 496,
			"BGY": 1008,
			"BOD": 784,
			"BSL": 740,
			"BTS": 1318,
			"BZR": 990,
			"CDG": 379,
			"CIA": 1488,
			"CPH": 950,
			"CTA": 2005,
			"DTM": 551,
			"DUB": 433,
			"EBJ": 713,
			"EDI": 494,
			"EGC": 786,
			"ESU": 2400,
			"FAO": 1757,
			"FCO": 1471,
			"FNI": 970,
			"FRA": 656,
			"FUE": 2835,
			"GLA": 518,
			"GNB": 836,
			"GOT": 1033,
			"GRO": 1134,
			"GVA": 784,
			"HAM": 723,
			"INN": 986,
			"INV": 673,
			"KBP": 2172,
			"KEF": 1862,
			"KIR": 627,
			"KTW": 1360,
			"KUN": 1647,
			"LDY": 571,
			"LIS": 1606,
			"LPA": 2941,
			"LYS": 791,
			"MAD": 1289,
			"MJV": 1568,
			"MLA": 2133,
			"MUC": 949,
			"MXP": 961,
			"NAP": 1654,
			"NCE": 1074,
			"NOC": 610,
			"OPO": 1340,
			"PFO": 3229,
			"PMI": 1391,
			"RAK": 2339,
			"RZE": 1573,
			"STN": 41,
			"SXF": 948,
			"SZG": 1059,
			"TFS": 2973,
			"TLS": 926,
			"TLV": 3601,
			"TRN": 947,
			"TSF": 1149,
			"VCE": 1169,
			"VIE": 1277,
			"VNO": 1724,
			"VST": 1360,
			"ZRH": 806
		},
		"LUX": {
			"FRA": 173,
			"LGW": 484,
			"LHR": 514,
			"LIS": 1712,
			"MUC": 430,
			"MXP": 482,
			"OPO": 1485,
			"SCN": 79,
			"STN": 489,
			"TXL": 591
		},
		"LUZ": {
			"DUB": 1971,
			"FRA": 1007,
			"STN": 1549,
			"WMI": 195
		},
		"LVI": {
			"JNB": 958
		},
		"LWO": {
			"MUC": 900
		},
		"LYE": {
			"NCL": 393
		},
		"LYP": {
			"DOH": 2201
		},
		"LYS": {
			"AMS": 732,
			"ARN": 1766,
			"BCN": 549,
			"BES": 780,
			"BFS": 1275,
			"BHX": 898,
			"BOD": 465,
			"BUD": 1097,
			"CPH": 1220,
			"DUB": 1182,
			"DUS": 630,
			"EDI": 1280,
			"FAO": 1454,
			"FCO": 721,
			"FRA": 543,
			"KRK": 1195,
			"LGW": 717,
			"LHR": 758,
			"LIS": 1399,
			"LTN": 791,
			"MAD": 911,
			"MAN": 999,
			"MUC": 585,
			"NAP": 917,
			"NTE": 537,
			"OPO": 1215,
			"PIK": 1282,
			"RAK": 1935,
			"SEN": 725,
			"STN": 771,
			"SXF": 960,
			"TLS": 375,
			"TXL": 964,
			"VCE": 565,
			"VIE": 910,
			"YUL": 5867
		},
		"MAA": {
			"FRA": 7598,
			"LHR": 8237
		},
		"MAD": {
			"ACE": 1576,
			"AGP": 432,
			"ALC": 356,
			"BFS": 1587,
			"BGY": 1220,
			"BHX": 1337,
			"BIO": 316,
			"BLQ": 1295,
			"BOD": 535,
			"BOG": 8033,
			"BOS": 5474,
			"BRS": 1212,
			"BRU": 1313,
			"BSL": 1185,
			"BTS": 1852,
			"BUD": 1974,
			"BVA": 1091,
			"CAG": 1085,
			"CCS": 7007,
			"CDG": 1062,
			"CGN": 1419,
			"CIA": 1359,
			"CMN": 869,
			"CPH": 2058,
			"CRL": 1271,
			"CTA": 1642,
			"DFW": 7974,
			"DUB": 1452,
			"DUS": 1439,
			"EAS": 350,
			"EDI": 1719,
			"EIN": 1398,
			"EWR": 5789,
			"EZE": 10089,
			"FEZ": 740,
			"FRA": 1418,
			"FUE": 1635,
			"GIG": 8149,
			"GRU": 8381,
			"GRX": 368,
			"GUA": 8710,
			"GVA": 1008,
			"HAM": 1779,
			"IBZ": 459,
			"JFK": 5762,
			"JNB": 8108,
			"KRK": 2102,
			"LCG": 506,
			"LCY": 1255,
			"LEI": 419,
			"LGW": 1213,
			"LHR": 1244,
			"LIM": 9529,
			"LIN": 1179,
			"LIS": 513,
			"LPA": 1766,
			"LPL": 1429,
			"LTN": 1289,
			"LYS": 911,
			"MAH": 665,
			"MAN": 1433,
			"MDE": 8034,
			"MEX": 9068,
			"MIA": 7108,
			"MJV": 384,
			"MLA": 1656,
			"MLN": 582,
			"MRS": 795,
			"MUC": 1496,
			"MVD": 9950,
			"MXP": 1149,
			"OPO": 438,
			"ORD": 6746,
			"OTP": 2459,
			"OVD": 397,
			"PHL": 5911,
			"PMI": 546,
			"PMO": 1453,
			"PNA": 299,
			"PSA": 1203,
			"PTY": 8159,
			"RAK": 1066,
			"RBA": 769,
			"RYG": 2326,
			"SAL": 8667,
			"SCL": 10722,
			"SCQ": 483,
			"SDQ": 6691,
			"SDR": 326,
			"SJO": 8502,
			"SNN": 1417,
			"SOF": 2247,
			"SPC": 1847,
			"STN": 1299,
			"SVQ": 396,
			"SXF": 1852,
			"TFN": 1772,
			"TFS": 1825,
			"TLS": 535,
			"TNG": 568,
			"VGO": 464,
			"VLC": 285,
			"VNO": 2645,
			"VRN": 1294,
			"WAW": 2270,
			"WMI": 2264,
			"WRO": 1965,
			"XRY": 469,
			"YYZ": 6060
		},
		"MAF": {
			"DEN": 908,
			"DFW": 496,
			"IAH": 689
		},
		"MAH": {
			"BCN": 241,
			"DUS": 1286,
			"EMA": 1502,
			"HAM": 1591,
			"LHR": 1341,
			"MAD": 665,
			"TXL": 1572,
			"VLC": 404
		},
		"MAN": {
			"ABZ": 428,
			"ACE": 2867,
			"AGP": 1863,
			"ALC": 1681,
			"AMS": 486,
			"ATH": 2637,
			"BCN": 1379,
			"BDS": 2071,
			"BFS": 295,
			"BGR": 4758,
			"BGY": 1212,
			"BHD": 274,
			"BHX": 106,
			"BIO": 1119,
			"BLL": 782,
			"BLQ": 1389,
			"BRE": 737,
			"BRU": 535,
			"BSL": 943,
			"BTS": 1481,
			"BUD": 1654,
			"BVA": 529,
			"BZR": 1189,
			"CAG": 1788,
			"CCF": 1176,
			"CDG": 588,
			"CFU": 2268,
			"CGN": 699,
			"CHQ": 2855,
			"CIA": 1695,
			"CPH": 994,
			"CRL": 562,
			"CTA": 2213,
			"DFW": 7428,
			"DOH": 5409,
			"DUB": 265,
			"DUS": 655,
			"EDI": 297,
			"EIN": 560,
			"EWR": 5384,
			"FAO": 1869,
			"FCO": 1678,
			"FNC": 2571,
			"FRA": 831,
			"FUE": 2927,
			"GCI": 436,
			"GDN": 1360,
			"GIB": 1928,
			"GLA": 312,
			"GRO": 1327,
			"GVA": 992,
			"GYD": 4119,
			"HAJ": 807,
			"HAM": 811,
			"HEL": 1812,
			"IBZ": 1634,
			"ISB": 6147,
			"JER": 461,
			"JFK": 5363,
			"KEF": 1653,
			"KRK": 1556,
			"LDY": 369,
			"LGW": 283,
			"LHR": 242,
			"LIG": 869,
			"LIS": 1703,
			"LPA": 3025,
			"LPL": 38,
			"LYS": 999,
			"MAD": 1433,
			"MCO": 6806,
			"MJV": 1736,
			"MLA": 2342,
			"MRS": 1232,
			"MUC": 1130,
			"MXP": 1167,
			"NCE": 1282,
			"NTE": 691,
			"NUE": 1017,
			"OPO": 1429,
			"ORK": 452,
			"OSL": 1111,
			"PFO": 3412,
			"PHL": 5513,
			"PMI": 1581,
			"PRG": 1192,
			"PSA": 1419,
			"QLA": 255,
			"RAK": 2462,
			"REU": 1381,
			"RIX": 1703,
			"RTM": 478,
			"RYG": 1043,
			"RZE": 1703,
			"SKG": 2369,
			"SNN": 450,
			"SOF": 2229,
			"SOU": 274,
			"STN": 235,
			"STR": 955,
			"SXF": 1064,
			"TFS": 3049,
			"TLL": 1784,
			"TLV": 3786,
			"TPS": 2057,
			"TRF": 1007,
			"TRN": 1155,
			"TXL": 1044,
			"VCE": 1367,
			"VIE": 1443,
			"VLC": 1548,
			"VRN": 1297,
			"WAW": 1563,
			"WMI": 1534,
			"WRO": 1324,
			"ZAD": 1644,
			"ZRH": 1006
		},
		"MBA": {
			"ADD": 1450
		},
		"MBJ": {
			"CLT": 1882,
			"DFW": 2489,
			"MIA": 846,
			"ORD": 2777
		},
		"MCI": {
			"DFW": 741,
			"EWR": 1753,
			"IAD": 1487,
			"ORD": 647,
			"PHL": 1667,
			"PHX": 1677
		},
		"MCO": {
			"CLT": 755,
			"DFW": 1582,
			"DUB": 6543,
			"EWR": 1511,
			"FRA": 7620,
			"IAD": 1222,
			"JFK": 1521,
			"LAX": 3563,
			"LGW": 6993,
			"LHR": 6967,
			"MAN": 6806,
			"MIA": 310,
			"ORD": 1620,
			"PHL": 1388
		},
		"MCT": {
			"AUH": 380,
			"DOH": 705,
			"DXB": 348,
			"LHR": 5835
		},
		"MDE": {
			"BOG": 215,
			"CLO": 310,
			"MAD": 8034
		},
		"MDT": {
			"IAD": 151
		},
		"MEL": {
			"BKK": 7333,
			"HKG": 7414,
			"LAX": 12761,
			"SIN": 6034,
			"SYD": 705
		},
		"MEM": {
			"CLT": 821,
			"DFW": 693,
			"EWR": 1520,
			"IAH": 754,
			"ORD": 792
		},
		"MEX": {
			"BOG": 3159,
			"DFW": 1510,
			"DTW": 2933,
			"FRA": 9553,
			"GDL": 459,
			"LHR": 8906,
			"MAD": 9068,
			"MIA": 2051,
			"MUC": 9847,
			"ORD": 2719
		},
		"MFE": {
			"DFW": 756,
			"IAH": 510
		},
		"MFO": {
			"POM": 0
		},
		"MGA": {
			"MIA": 1638
		},
		"MHK": {
			"ORD": 804
		},
		"MIA": {
			"ATL": 959,
			"AUA": 1828,
			"BCN": 7546,
			"BHM": 1065,
			"BOG": 2435,
			"BOS": 2028,
			"BWI": 1526,
			"BZE": 1236,
			"CDG": 7373,
			"CGN": 7643,
			"CLE": 1743,
			"CLT": 1049,
			"CUN": 855,
			"CUR": 1923,
			"CVG": 1530,
			"DCA": 1484,
			"DEN": 2749,
			"DFW": 1802,
			"DUS": 7605,
			"EWR": 1751,
			"EYW": 201,
			"FRA": 7764,
			"GUA": 1640,
			"HEL": 8329,
			"IAD": 1486,
			"IAH": 1549,
			"IND": 1646,
			"JAX": 540,
			"JFK": 1757,
			"KIN": 945,
			"LAS": 3495,
			"LAX": 3763,
			"LGA": 1768,
			"LGW": 7135,
			"LHR": 7110,
			"LIM": 4220,
			"MAD": 7108,
			"MBJ": 846,
			"MCO": 310,
			"MEX": 2051,
			"MGA": 1638,
			"MSE": 7236,
			"MSY": 1084,
			"MUC": 8045,
			"MVD": 7211,
			"MXP": 7922,
			"ORD": 1930,
			"PHL": 1634,
			"PHX": 3169,
			"PLS": 930,
			"PNS": 853,
			"POP": 1201,
			"POS": 2614,
			"PTY": 1862,
			"RDU": 1130,
			"RTB": 1236,
			"SAL": 1651,
			"SDQ": 1365,
			"SFO": 4154,
			"SJO": 1805,
			"SJU": 1682,
			"STN": 7150,
			"STT": 1781,
			"TLH": 648,
			"TPA": 329,
			"YYZ": 1990,
			"ZRH": 7847
		},
		"MIR": {
			"STN": 1977
		},
		"MJV": {
			"BHX": 1634,
			"BOH": 1448,
			"BRS": 1520,
			"CWL": 1528,
			"DUB": 1790,
			"EIN": 1596,
			"EMA": 1675,
			"LBA": 1790,
			"LGW": 1488,
			"LPL": 1737,
			"LTN": 1568,
			"MAD": 384,
			"MAN": 1736,
			"PIK": 1992,
			"SNN": 1774,
			"STN": 1571
		},
		"MKE": {
			"EWR": 1163,
			"ORD": 107
		},
		"MLA": {
			"ATH": 872,
			"BGY": 1162,
			"BHX": 2243,
			"BLL": 2248,
			"BLQ": 1002,
			"BOH": 2111,
			"BRI": 620,
			"BRS": 2201,
			"BRU": 1854,
			"BUD": 1347,
			"CGN": 1769,
			"CIA": 680,
			"CTA": 186,
			"DUB": 2532,
			"DUS": 1822,
			"EDI": 2610,
			"EIN": 1879,
			"EMA": 2257,
			"FKB": 1529,
			"FRA": 1647,
			"GDN": 2082,
			"GOT": 2430,
			"GRO": 1215,
			"KRK": 1638,
			"LBA": 2360,
			"LGW": 2063,
			"LPL": 2365,
			"LTN": 2133,
			"MAD": 1656,
			"MAN": 2342,
			"MLA": 0,
			"MRS": 1156,
			"MUC": 1407,
			"NCE": 1065,
			"NCL": 2465,
			"NRN": 1872,
			"NUE": 1542,
			"NYO": 2556,
			"PIK": 2621,
			"PMO": 285,
			"POZ": 1851,
			"PSA": 937,
			"SNN": 2619,
			"STN": 2108,
			"SXF": 1839,
			"TLS": 1413,
			"TPS": 288,
			"TRN": 1187,
			"TSF": 1105,
			"VLC": 1375,
			"VNO": 2247,
			"WRO": 1706
		},
		"MLE": {
			"FRA": 7887,
			"LGW": 8516
		},
		"MLI": {
			"ORD": 223
		},
		"MLM": {
			"DFW": 1504
		},
		"MLN": {
			"MAD": 582
		},
		"MLU": {
			"DFW": 469
		},
		"MME": {
			"ALC": 1806,
			"CIA": 1748,
			"DUB": 338,
			"GRO": 1435
		},
		"MMX": {
			"AGP": 2493,
			"STN": 953
		},
		"MOB": {
			"DFW": 866,
			"IAH": 685,
			"ORD": 1255
		},
		"MOL": {
			"OSL": 349
		},
		"MOT": {
			"DEN": 972
		},
		"MPL": {
			"BHX": 1074,
			"BSL": 525,
			"CRL": 766,
			"FRA": 797,
			"HHN": 751,
			"LBA": 1215,
			"LGW": 898,
			"MRS": 102,
			"MUC": 804,
			"STN": 964
		},
		"MRS": {
			"AGP": 1116,
			"AMS": 987,
			"BCN": 350,
			"BES": 929,
			"BOD": 497,
			"BZR": 150,
			"CAG": 565,
			"CHQ": 1841,
			"CRL": 783,
			"CTA": 1064,
			"DUB": 1393,
			"EDI": 1520,
			"EIN": 891,
			"ESU": 1871,
			"FCO": 603,
			"FEZ": 1376,
			"FRA": 775,
			"GOT": 1657,
			"IBZ": 600,
			"LGW": 949,
			"LHR": 990,
			"LIL": 808,
			"LIS": 1307,
			"MAD": 795,
			"MAN": 1232,
			"MLA": 1156,
			"MPL": 102,
			"MUC": 746,
			"NDR": 1176,
			"NTE": 674,
			"NYO": 1886,
			"OPO": 1166,
			"OUD": 1141,
			"PMI": 478,
			"PMO": 883,
			"RAK": 1755,
			"RBA": 1469,
			"STN": 1010,
			"SVQ": 1152,
			"SXF": 1170,
			"TLN": 84,
			"TNG": 1280,
			"TUF": 565,
			"VLC": 646,
			"WMI": 1520,
			"ZAD": 816
		},
		"MRU": {
			"FRA": 9203,
			"JNB": 3066,
			"LGW": 9750
		},
		"MRY": {
			"LAX": 428,
			"PHX": 961,
			"SFO": 124
		},
		"MSE": {
			"MIA": 7236
		},
		"MSN": {
			"DEN": 1326,
			"EWR": 1282,
			"ORD": 174
		},
		"MSP": {
			"CLT": 1496,
			"DFW": 1372,
			"DLH": 232,
			"EWR": 1619,
			"IAD": 1459,
			"IAH": 1667,
			"ORD": 537
		},
		"MSQ": {
			"FRA": 1397
		},
		"MST": {
			"ALC": 1490,
			"BRI": 1376,
			"CRL": 105,
			"GRO": 1028,
			"OPO": 1543,
			"PMI": 1285,
			"STN": 398,
			"TFS": 3159,
			"TPS": 1539
		},
		"MSY": {
			"CLT": 1047,
			"DFW": 719,
			"EWR": 1877,
			"IAD": 1536,
			"IAH": 489,
			"MIA": 1084,
			"ORD": 1349,
			"YYZ": 1788
		},
		"MTJ": {
			"DEN": 315,
			"LAX": 1070
		},
		"MTY": {
			"DFW": 845,
			"IAH": 661
		},
		"MUC": {
			"ADB": 1667,
			"AGP": 1855,
			"AMS": 664,
			"AOI": 540,
			"ARN": 1317,
			"ATH": 1518,
			"AYT": 2001,
			"BCN": 1094,
			"BEG": 760,
			"BGR": 5881,
			"BGY": 337,
			"BHX": 1060,
			"BIA": 669,
			"BIO": 1267,
			"BJV": 1783,
			"BKK": 8802,
			"BLQ": 426,
			"BOM": 6313,
			"BOS": 6182,
			"BRE": 563,
			"BRI": 893,
			"BRQ": 370,
			"BRS": 1090,
			"BRU": 597,
			"BSL": 328,
			"BUD": 566,
			"CAG": 1035,
			"CAI": 2623,
			"CCS": 8303,
			"CDG": 681,
			"CFU": 1169,
			"CGN": 435,
			"CLJ": 908,
			"CLT": 7352,
			"CPH": 810,
			"CPT": 9181,
			"CTA": 1239,
			"DBV": 818,
			"DEB": 738,
			"DEL": 5901,
			"DEN": 8389,
			"DME": 1942,
			"DOK": 1914,
			"DRS": 340,
			"DTM": 461,
			"DUB": 1381,
			"DUS": 485,
			"DXB": 4565,
			"EDI": 1330,
			"EMA": 1049,
			"ESB": 1912,
			"EWR": 6504,
			"EXT": 1126,
			"FAO": 2038,
			"FCO": 729,
			"FLR": 507,
			"FMO": 511,
			"FRA": 300,
			"FUE": 3117,
			"GDN": 814,
			"GIG": 9618,
			"GLA": 1382,
			"GOA": 493,
			"GOT": 1035,
			"GRU": 9859,
			"GRZ": 312,
			"GVA": 488,
			"GWT": 767,
			"HAJ": 480,
			"HAM": 600,
			"HEL": 1574,
			"HER": 1818,
			"HKG": 9021,
			"HND": 9361,
			"IAD": 6844,
			"IBZ": 1344,
			"ICN": 8501,
			"IKA": 3514,
			"IST": 1572,
			"JER": 1027,
			"JFK": 6482,
			"JNB": 8446,
			"JTR": 1736,
			"KBP": 1398,
			"KEF": 2692,
			"KIV": 1291,
			"KRK": 611,
			"KTT": 2274,
			"LAX": 9618,
			"LCA": 2340,
			"LCJ": 659,
			"LCY": 908,
			"LED": 1741,
			"LEJ": 343,
			"LGW": 913,
			"LHR": 942,
			"LIS": 1984,
			"LJU": 311,
			"LPA": 3255,
			"LTN": 949,
			"LUX": 430,
			"LWO": 900,
			"LYS": 585,
			"MAD": 1496,
			"MAN": 1130,
			"MEX": 9847,
			"MIA": 8045,
			"MLA": 1407,
			"MPL": 804,
			"MRS": 746,
			"MUC": 0,
			"MXP": 381,
			"NAP": 853,
			"NCE": 630,
			"NRK": 1175,
			"NUE": 137,
			"ODS": 1434,
			"OLB": 848,
			"OPO": 1790,
			"ORD": 7271,
			"OSL": 1317,
			"OTP": 1172,
			"PAD": 427,
			"PEK": 7723,
			"PHL": 6633,
			"PMI": 1216,
			"PMO": 1136,
			"POZ": 576,
			"PRG": 264,
			"PRN": 965,
			"PSA": 530,
			"PUY": 417,
			"PVG": 8780,
			"RAK": 2499,
			"REU": 1158,
			"RLG": 619,
			"RTM": 658,
			"RUH": 4000,
			"RZE": 767,
			"SBZ": 973,
			"SFO": 9439,
			"SIN": 10061,
			"SJJ": 712,
			"SKG": 1241,
			"SOF": 1100,
			"SOU": 987,
			"SPU": 638,
			"STN": 911,
			"STR": 192,
			"SUF": 1109,
			"SVQ": 1877,
			"SXB": 307,
			"SXF": 464,
			"TBS": 2688,
			"TFS": 3318,
			"TIA": 992,
			"TLL": 1492,
			"TLS": 960,
			"TLV": 2655,
			"TRN": 471,
			"TRS": 308,
			"TSR": 776,
			"TUN": 1285,
			"TXL": 479,
			"VCE": 319,
			"VIE": 355,
			"VLC": 1388,
			"VRN": 336,
			"WAW": 777,
			"WRO": 477,
			"YMX": 6155,
			"YUL": 6152,
			"YVR": 8342,
			"YYZ": 6642,
			"ZAD": 545,
			"ZAG": 435,
			"ZRH": 260
		},
		"MUX": {
			"DOH": 2027
		},
		"MVD": {
			"GRU": 1570,
			"MAD": 9950,
			"MIA": 7211
		},
		"MXP": {
			"ACE": 2693,
			"AGP": 1486,
			"AMS": 796,
			"ARN": 1674,
			"ATH": 1520,
			"BCN": 720,
			"BDS": 929,
			"BGY": 76,
			"BOD": 744,
			"BRE": 824,
			"BRI": 818,
			"BRU": 664,
			"BUD": 829,
			"CAG": 710,
			"CDG": 598,
			"CIY": 1077,
			"CPH": 1144,
			"CTA": 1049,
			"DKR": 4220,
			"DUB": 1382,
			"DUS": 645,
			"EDI": 1424,
			"EWR": 6438,
			"FCO": 511,
			"FRA": 489,
			"GLA": 1463,
			"HAM": 894,
			"IBZ": 964,
			"JFK": 6414,
			"KRK": 960,
			"LCA": 2413,
			"LGW": 899,
			"LHR": 937,
			"LIL": 689,
			"LIS": 1652,
			"LPA": 2892,
			"LTN": 961,
			"LUX": 482,
			"MAD": 1149,
			"MAN": 1167,
			"MIA": 7922,
			"MUC": 381,
			"NAP": 693,
			"NTE": 810,
			"OLB": 530,
			"OPO": 1484,
			"ORY": 591,
			"OTP": 1366,
			"PMI": 835,
			"PMO": 904,
			"PRG": 645,
			"RAK": 2125,
			"SOF": 1213,
			"STN": 932,
			"STR": 342,
			"SUF": 969,
			"SVQ": 1518,
			"SXF": 827,
			"TFS": 2959,
			"TLL": 1870,
			"TLS": 623,
			"TLV": 2706,
			"WAW": 1150,
			"YMX": 6120,
			"YYZ": 6613
		},
		"MYJ": {
			"HND": 675
		},
		"MZJ": {
			"JFK": 3445,
			"ORD": 2315,
			"PHX": 121
		},
		"NAP": {
			"AMS": 1461,
			"BCN": 1023,
			"BRU": 1345,
			"BSL": 919,
			"CDG": 1289,
			"CTA": 386,
			"DUS": 1292,
			"FRA": 1110,
			"GVA": 887,
			"HAM": 1453,
			"KRK": 1107,
			"LGW": 1592,
			"LTN": 1654,
			"LYS": 917,
			"MUC": 853,
			"MXP": 693,
			"NCE": 658,
			"ORY": 1280,
			"PRG": 1024,
			"STN": 1625,
			"SXF": 1279,
			"VCE": 537,
			"VIE": 823
		},
		"NAS": {
			"EWR": 1767,
			"GCM": 754,
			"LHR": 6978,
			"PLS": 643
		},
		"NBO": {
			"ADD": 1163,
			"BRU": 6568,
			"FRA": 6318,
			"JNB": 2912,
			"LGW": 6804,
			"LHR": 6843,
			"ZAZ": 6118
		},
		"NCE": {
			"AMS": 979,
			"BCN": 496,
			"BOD": 644,
			"BRU": 831,
			"BSL": 437,
			"CDG": 694,
			"DUB": 1466,
			"DUS": 849,
			"FCO": 460,
			"FRA": 715,
			"GVA": 299,
			"HAM": 1127,
			"LGW": 1001,
			"LHR": 1041,
			"LIL": 828,
			"LIS": 1468,
			"LPL": 1304,
			"LTN": 1074,
			"MAN": 1282,
			"MLA": 1065,
			"MUC": 630,
			"NAP": 658,
			"NTE": 790,
			"ORY": 676,
			"RAK": 1891,
			"SNN": 1557,
			"STN": 1052,
			"SXF": 1076,
			"TLS": 470,
			"TXL": 1086,
			"VCE": 455
		},
		"NCL": {
			"ACE": 3054,
			"AGP": 2053,
			"ALC": 1865,
			"BCN": 1553,
			"BFS": 292,
			"BHX": 287,
			"BRS": 412,
			"DUB": 347,
			"DUS": 700,
			"FAO": 2060,
			"GDN": 1292,
			"GRO": 1496,
			"GVA": 1121,
			"HAM": 772,
			"INN": 1251,
			"LHR": 404,
			"LPA": 3210,
			"LYE": 393,
			"MLA": 2465,
			"RYG": 891,
			"SOU": 455,
			"SXF": 1041,
			"TFS": 3232,
			"WMI": 1490,
			"WRO": 1311
		},
		"NDR": {
			"BCN": 831,
			"BVA": 1662,
			"CRL": 1823,
			"HHN": 1861,
			"MRS": 1176
		},
		"NGO": {
			"CTS": 976,
			"FRA": 9297,
			"FUK": 601,
			"HND": 281,
			"KIJ": 363,
			"KMI": 597,
			"KMJ": 593,
			"KOJ": 659,
			"NGS": 671,
			"NRT": 340,
			"OKA": 1301,
			"SDJ": 517
		},
		"NGS": {
			"HND": 952,
			"NGO": 671
		},
		"NGU": {
			"RIC": 110
		},
		"NHT": {
			"LEH": 227
		},
		"NJF": {
			"DOH": 1023
		},
		"NKG": {
			"CTU": 1424,
			"FRA": 8639,
			"FUK": 1103,
			"KIX": 1553,
			"PEK": 949,
			"PVG": 287
		},
		"NOC": {
			"ACE": 2803,
			"AGP": 1945,
			"ALC": 1848,
			"BGY": 1607,
			"BRS": 498,
			"CWL": 463,
			"DUB": 176,
			"EIN": 993,
			"EMA": 511,
			"FAO": 1880,
			"GRO": 1586,
			"KUN": 2112,
			"LGW": 659,
			"LPL": 398,
			"LTN": 610,
			"STN": 647,
			"TFS": 2945
		},
		"NQY": {
			"ALC": 1396,
			"DUS": 830,
			"HHN": 873,
			"LGW": 346
		},
		"NRK": {
			"MUC": 1175
		},
		"NRN": {
			"ACE": 3005,
			"AGA": 2689,
			"AGP": 1860,
			"AHO": 1231,
			"ALC": 1570,
			"AOI": 1039,
			"BGY": 709,
			"BLQ": 873,
			"BRI": 1417,
			"BZG": 820,
			"BZR": 944,
			"CAG": 1392,
			"CFU": 1705,
			"CHQ": 2289,
			"CIA": 1195,
			"CIY": 1755,
			"EDI": 789,
			"FAO": 1965,
			"FCO": 1184,
			"FEZ": 2159,
			"FUE": 3065,
			"GRO": 1109,
			"IBZ": 1463,
			"INI": 1491,
			"LPA": 3186,
			"MLA": 1872,
			"NYO": 1049,
			"OLB": 1218,
			"OPO": 1612,
			"OUD": 1978,
			"PIK": 830,
			"PMI": 1365,
			"PMO": 1588,
			"PSA": 936,
			"PSR": 1186,
			"RAK": 2507,
			"RHO": 2419,
			"RIX": 1295,
			"SDR": 1175,
			"SKG": 1782,
			"SOF": 1632,
			"STN": 407,
			"SUF": 1615,
			"TFS": 3231,
			"TLL": 1454,
			"TSF": 797,
			"TSR": 1284,
			"VLC": 1441,
			"VXO": 812,
			"ZAD": 1078
		},
		"NRT": {
			"DUS": 9333,
			"FRA": 9371,
			"FUK": 940,
			"ICN": 1257,
			"JFK": 10833,
			"LHR": 9593,
			"NGO": 340,
			"ORD": 10076
		},
		"NTE": {
			"BSL": 689,
			"DUB": 771,
			"EMA": 631,
			"FAO": 1242,
			"FEZ": 1497,
			"GVA": 597,
			"LGW": 456,
			"LIL": 511,
			"LIS": 1113,
			"LPL": 693,
			"LYS": 537,
			"MAN": 691,
			"MRS": 674,
			"MXP": 810,
			"NCE": 790,
			"OPO": 864,
			"PMI": 914,
			"TLS": 455
		},
		"NUE": {
			"AGP": 1898,
			"ALC": 1553,
			"BGY": 437,
			"BRE": 425,
			"BRU": 493,
			"BUD": 645,
			"CIA": 864,
			"DUS": 364,
			"FRA": 190,
			"HAM": 465,
			"MAN": 1017,
			"MLA": 1542,
			"MUC": 137,
			"STN": 807,
			"TXL": 374,
			"ZRH": 292
		},
		"NYO": {
			"AGP": 2906,
			"AHO": 2108,
			"ALC": 2600,
			"BCN": 2204,
			"BDS": 2017,
			"BGY": 1537,
			"BHX": 1360,
			"BIQ": 2120,
			"BRE": 813,
			"BVA": 1411,
			"BZR": 1955,
			"CHQ": 2640,
			"CPH": 435,
			"CRL": 1221,
			"DUB": 1546,
			"FCO": 1916,
			"GDN": 499,
			"KRK": 986,
			"LPA": 4230,
			"MLA": 2556,
			"MRS": 1886,
			"NRN": 1049,
			"OLB": 2056,
			"PFO": 2911,
			"PIK": 1340,
			"PMI": 2363,
			"PSA": 1738,
			"RHO": 2618,
			"RJK": 1517,
			"SKG": 2076,
			"SOF": 1845,
			"STN": 1299,
			"TFS": 4272,
			"TSF": 1495,
			"WMI": 742,
			"ZAD": 1636
		},
		"ODS": {
			"MUC": 1434
		},
		"OGG": {
			"LAX": 3996,
			"SEA": 4249,
			"SFO": 3761
		},
		"OIT": {
			"HND": 772
		},
		"OKA": {
			"HND": 1554,
			"KIX": 1170,
			"NGO": 1301
		},
		"OKC": {
			"DFW": 282,
			"IAD": 1824,
			"IAH": 637,
			"LAX": 1906,
			"ORD": 1114
		},
		"OKJ": {
			"FAI": 6013,
			"HND": 545
		},
		"OLB": {
			"DUB": 1826,
			"FRA": 1018,
			"LHR": 1402,
			"MUC": 848,
			"MXP": 530,
			"NRN": 1218,
			"NYO": 2056
		},
		"OMA": {
			"DEN": 758,
			"DFW": 940,
			"EWR": 1820,
			"ORD": 668
		},
		"ONT": {
			"DFW": 1908,
			"PHX": 521
		},
		"OOL": {
			"SYD": 680
		},
		"OPO": {
			"BCN": 898,
			"BGY": 1559,
			"BOD": 759,
			"BOH": 1183,
			"BRE": 1852,
			"BRS": 1215,
			"BRU": 1473,
			"BSL": 1464,
			"BVA": 1240,
			"CCF": 930,
			"CDG": 1231,
			"CFE": 1079,
			"CGN": 1617,
			"CIA": 1768,
			"CPH": 2226,
			"CRL": 1439,
			"DLE": 1294,
			"DTM": 1686,
			"DUB": 1365,
			"EBU": 1150,
			"EIN": 1560,
			"FAO": 474,
			"FKB": 1556,
			"FMM": 1669,
			"FNC": 1191,
			"FRA": 1651,
			"GVA": 1308,
			"HAM": 1955,
			"HHN": 1568,
			"LGW": 1278,
			"LIG": 945,
			"LIL": 1376,
			"LIS": 277,
			"LPA": 1601,
			"LPL": 1413,
			"LRH": 813,
			"LRT": 834,
			"LTN": 1340,
			"LUX": 1485,
			"LYS": 1215,
			"MAD": 438,
			"MAN": 1429,
			"MRS": 1166,
			"MST": 1543,
			"MUC": 1790,
			"MXP": 1484,
			"NRN": 1612,
			"NTE": 864,
			"PDL": 1508,
			"PIK": 1614,
			"PMI": 983,
			"RNS": 936,
			"STN": 1363,
			"STR": 1628,
			"SVQ": 488,
			"SXB": 1514,
			"SXF": 2081,
			"TER": 1589,
			"TFS": 1634,
			"TLS": 865,
			"TUF": 1015,
			"VLC": 721,
			"WMI": 2530,
			"XCR": 1310
		},
		"ORD": {
			"ABQ": 1796,
			"ALB": 1160,
			"AMS": 6613,
			"ARN": 6857,
			"ASE": 1627,
			"ATL": 976,
			"ATW": 258,
			"AUA": 3707,
			"AUS": 1575,
			"AZO": 196,
			"BDL": 1257,
			"BHM": 941,
			"BNA": 659,
			"BOI": 2307,
			"BOS": 1391,
			"BRU": 6677,
			"BUF": 759,
			"BWI": 998,
			"BZN": 1904,
			"CAE": 1073,
			"CAK": 551,
			"CDG": 6666,
			"CHS": 1224,
			"CID": 315,
			"CLE": 506,
			"CLT": 964,
			"CMH": 474,
			"CMI": 217,
			"COS": 1463,
			"CPH": 6855,
			"CUN": 2331,
			"CVG": 425,
			"CWA": 341,
			"DAY": 386,
			"DCA": 982,
			"DEN": 1426,
			"DFW": 1291,
			"DSM": 480,
			"DTW": 376,
			"DUB": 5896,
			"DUS": 6790,
			"ELP": 1988,
			"EVV": 439,
			"EWR": 1154,
			"FAR": 895,
			"FLL": 1905,
			"FNT": 358,
			"FRA": 6971,
			"FSD": 742,
			"FWA": 251,
			"GRB": 279,
			"GRR": 219,
			"GSO": 948,
			"GSP": 930,
			"HPN": 1185,
			"HSV": 822,
			"IAH": 1491,
			"ICT": 944,
			"IND": 285,
			"JAC": 1866,
			"JAN": 1092,
			"JAX": 1392,
			"JFK": 1188,
			"LAN": 286,
			"LAS": 2432,
			"LAX": 2802,
			"LEX": 520,
			"LGA": 1177,
			"LHR": 6345,
			"LIT": 889,
			"LNK": 748,
			"LSE": 345,
			"MAD": 6746,
			"MBJ": 2777,
			"MCI": 647,
			"MCO": 1620,
			"MEM": 792,
			"MEX": 2719,
			"MHK": 804,
			"MIA": 1930,
			"MKE": 107,
			"MLI": 223,
			"MOB": 1255,
			"MSN": 174,
			"MSP": 537,
			"MSY": 1349,
			"MUC": 7271,
			"MZJ": 2315,
			"NRT": 10076,
			"OKC": 1114,
			"OMA": 668,
			"ORF": 1152,
			"PBI": 1844,
			"PDX": 2792,
			"PEK": 10565,
			"PHL": 1088,
			"PHX": 2314,
			"PIA": 209,
			"PIT": 662,
			"PSP": 2653,
			"PVG": 11337,
			"RDU": 1039,
			"RIC": 1031,
			"RNO": 2683,
			"ROA": 853,
			"ROC": 847,
			"RST": 431,
			"RSW": 1806,
			"SAN": 2768,
			"SAT": 1677,
			"SDF": 461,
			"SEA": 2762,
			"SFO": 2964,
			"SGF": 705,
			"SJC": 2937,
			"SJU": 3338,
			"SLC": 2006,
			"SMF": 2860,
			"SNA": 2772,
			"SNN": 5763,
			"SRQ": 1693,
			"STL": 415,
			"STT": 3408,
			"SUX": 700,
			"SYR": 974,
			"TOL": 342,
			"TPA": 1631,
			"TUL": 941,
			"TUS": 2310,
			"TVC": 360,
			"TYS": 764,
			"XNA": 840,
			"YVR": 2832,
			"YYC": 2224,
			"YYZ": 700
		},
		"ORF": {
			"CLT": 465,
			"EWR": 457,
			"IAD": 253,
			"JFK": 466,
			"ORD": 1152
		},
		"ORK": {
			"ACE": 2581,
			"AGP": 1715,
			"ALC": 1629,
			"AMS": 906,
			"BGY": 1494,
			"BOD": 967,
			"CCF": 1253,
			"CDG": 842,
			"CIA": 1943,
			"DUB": 230,
			"EMA": 498,
			"FAO": 1649,
			"FUE": 2639,
			"GDN": 1810,
			"GRO": 1394,
			"LGW": 579,
			"LHR": 555,
			"LPA": 2720,
			"LPL": 415,
			"MAN": 452,
			"PMI": 1616,
			"PSA": 1670,
			"REU": 1397,
			"SNN": 100,
			"STN": 599,
			"TFS": 2731,
			"TLS": 1171,
			"VNO": 2247,
			"WRO": 1751
		},
		"ORY": {
			"BCN": 826,
			"EDI": 892,
			"EWR": 5857,
			"FAO": 1547,
			"FCO": 1090,
			"FLR": 871,
			"GVA": 394,
			"HAM": 761,
			"JFK": 5834,
			"LHR": 366,
			"LIN": 638,
			"LIS": 1437,
			"MXP": 591,
			"NAP": 1280,
			"NCE": 676,
			"PSA": 833,
			"SXF": 886,
			"TLS": 571,
			"VCE": 835
		},
		"OSC": {
			"DTW": 249
		},
		"OSD": {
			"LGW": 1597
		},
		"OSI": {
			"STN": 1533
		},
		"OSL": {
			"AAL": 352,
			"AAR": 434,
			"AES": 373,
			"BGO": 324,
			"BLL": 508,
			"BOO": 802,
			"CPH": 517,
			"DUS": 1026,
			"FRA": 1142,
			"HAM": 733,
			"HAU": 343,
			"HEL": 763,
			"KRS": 280,
			"LGW": 1226,
			"LHR": 1205,
			"MAN": 1111,
			"MOL": 349,
			"MUC": 1317,
			"STN": 1141,
			"SVG": 340,
			"TOS": 1115,
			"TRD": 363,
			"VNO": 1047
		},
		"OSR": {
			"BGY": 771,
			"STN": 1276
		},
		"OST": {
			"BES": 605,
			"EMA": 339,
			"STN": 197
		},
		"OTP": {
			"ATH": 759,
			"BGY": 1290,
			"BLQ": 1172,
			"BRS": 2258,
			"CIA": 1136,
			"CRL": 1745,
			"DUB": 2531,
			"DUS": 1616,
			"FRA": 1452,
			"LHR": 2105,
			"MAD": 2459,
			"MUC": 1172,
			"MXP": 1366,
			"PNQ": 5270,
			"STN": 2067,
			"SXF": 1267,
			"TSR": 397,
			"TXL": 1292
		},
		"OUA": {
			"ABJ": 832,
			"BRU": 4321
		},
		"OUD": {
			"ALC": 407,
			"BVA": 1664,
			"CRL": 1817,
			"MRS": 1141,
			"NRN": 1978
		},
		"OUL": {
			"HEL": 513
		},
		"OVB": {
			"DME": 2790,
			"FRA": 4807
		},
		"OVD": {
			"LGW": 950,
			"LHR": 974,
			"MAD": 397,
			"STN": 1036
		},
		"PAD": {
			"BRE": 159,
			"LEJ": 251,
			"MUC": 427
		},
		"PAE": {
			"CBG": 7623,
			"CWL": 7543,
			"FRA": 8154,
			"LHR": 7660,
			"YVR": 157
		},
		"PAP": {
			"ATL": 2063
		},
		"PBI": {
			"CLT": 952,
			"DFW": 1772,
			"EWR": 1650,
			"ORD": 1844,
			"PHL": 1534
		},
		"PDL": {
			"LIS": 1449,
			"OPO": 1508,
			"SMA": 97,
			"STN": 2557
		},
		"PDV": {
			"HHN": 1610,
			"STN": 2148
		},
		"PDX": {
			"DEN": 1592,
			"DFW": 2597,
			"FRA": 8389,
			"ORD": 2792,
			"PHX": 1625,
			"SAN": 1503,
			"SEA": 208,
			"SFO": 886,
			"SJC": 916,
			"YVR": 403
		},
		"PEE": {
			"DME": 1138,
			"GOJ": 762
		},
		"PEG": {
			"BDS": 525,
			"CAG": 516,
			"CIA": 144,
			"CRL": 1022,
			"CTA": 662,
			"GRO": 810,
			"STN": 1340,
			"TPS": 576
		},
		"PEI": {
			"BOG": 176
		},
		"PEK": {
			"CAN": 1881,
			"CGQ": 804,
			"CKG": 1464,
			"CSX": 1358,
			"CTU": 1556,
			"DLC": 442,
			"DUS": 7798,
			"FOC": 1598,
			"FRA": 7791,
			"HET": 411,
			"HFE": 925,
			"HGH": 1149,
			"HRB": 999,
			"ICN": 902,
			"KMG": 2115,
			"LHR": 8155,
			"MUC": 7723,
			"NKG": 949,
			"ORD": 10565,
			"SHE": 583,
			"WNZ": 1408,
			"WUH": 1056,
			"XIY": 933,
			"XMN": 1734,
			"YNT": 510
		},
		"PEN": {
			"BKK": 933
		},
		"PER": {
			"BKK": 5327,
			"HKG": 6037,
			"SIN": 3911,
			"SYD": 3278
		},
		"PEW": {
			"DOH": 2154
		},
		"PFO": {
			"ATH": 844,
			"BRS": 3360,
			"CHQ": 763,
			"CIA": 1901,
			"CRL": 2858,
			"EDI": 3596,
			"GPA": 1059,
			"KRK": 1995,
			"KUN": 2343,
			"LCA": 105,
			"LGW": 3186,
			"LTN": 3229,
			"MAN": 3412,
			"NYO": 2911,
			"SKG": 1056,
			"STN": 3191
		},
		"PGF": {
			"BHX": 1133,
			"BRS": 1049,
			"CRL": 866,
			"DUB": 1365,
			"STN": 1036
		},
		"PHC": {
			"ABV": 445
		},
		"PHL": {
			"AMS": 5998,
			"ATL": 1071,
			"BOS": 450,
			"CDG": 5985,
			"CLT": 721,
			"CMH": 652,
			"CUN": 2368,
			"DCA": 191,
			"DEN": 2501,
			"DFW": 2093,
			"DUB": 5254,
			"FCO": 7018,
			"FLL": 1601,
			"FRA": 6339,
			"IAH": 2130,
			"JFK": 150,
			"LAS": 3495,
			"LAX": 3857,
			"LHR": 5691,
			"MAD": 5911,
			"MAN": 5513,
			"MCI": 1667,
			"MCO": 1388,
			"MIA": 1634,
			"MUC": 6633,
			"ORD": 1088,
			"PBI": 1534,
			"PHX": 3333,
			"PIK": 5311,
			"PIT": 429,
			"RDU": 542,
			"RSW": 1601,
			"SAN": 3806,
			"SEA": 3818,
			"SFO": 4048,
			"SJU": 2543,
			"STL": 1306,
			"SXM": 2693,
			"TPA": 1483
		},
		"PHX": {
			"ABQ": 527,
			"BOS": 3694,
			"CLT": 2849,
			"DCA": 3178,
			"DEN": 968,
			"DFW": 1394,
			"ELP": 557,
			"EWR": 3426,
			"IAD": 3142,
			"IAH": 1621,
			"JFK": 3459,
			"LAS": 411,
			"LAX": 594,
			"LGW": 8501,
			"LHR": 8464,
			"MCI": 1677,
			"MIA": 3169,
			"MRY": 961,
			"MZJ": 121,
			"ONT": 521,
			"ORD": 2314,
			"PDX": 1625,
			"PHL": 3333,
			"SAN": 488,
			"SEA": 1782,
			"SFO": 1046,
			"SMF": 1040,
			"YVR": 1980
		},
		"PIA": {
			"ORD": 209
		},
		"PIK": {
			"ACE": 3040,
			"AGP": 2094,
			"ALC": 1939,
			"ATL": 6377,
			"AUS": 7469,
			"BCN": 1653,
			"BFS": 140,
			"BGY": 1482,
			"BOH": 556,
			"BUD": 1866,
			"BVA": 811,
			"CCF": 1453,
			"CFU": 2526,
			"CGN": 935,
			"CHR": 1056,
			"CIA": 1968,
			"CRL": 824,
			"DUB": 256,
			"EDI": 90,
			"EIN": 797,
			"EMA": 365,
			"FAO": 2072,
			"FCO": 1952,
			"FRA": 1070,
			"FUE": 3099,
			"GLA": 41,
			"GRO": 1604,
			"IBZ": 1902,
			"LDY": 171,
			"LPA": 3187,
			"LYS": 1282,
			"MJV": 1992,
			"MLA": 2621,
			"NRN": 830,
			"NYO": 1340,
			"OPO": 1614,
			"PHL": 5311,
			"PMI": 1855,
			"PSA": 1694,
			"PSR": 1985,
			"REU": 1651,
			"RIX": 1760,
			"SNN": 421,
			"STN": 512,
			"TFS": 3202,
			"TRF": 977,
			"WMI": 1675,
			"WRO": 1501
		},
		"PIS": {
			"BHX": 669,
			"EDI": 1071,
			"SNN": 949,
			"STN": 589
		},
		"PIT": {
			"EWR": 512,
			"IAD": 293,
			"IAH": 1797,
			"LGW": 6003,
			"ORD": 662,
			"PHL": 429,
			"YYZ": 357
		},
		"PLQ": {
			"STN": 1433
		},
		"PLS": {
			"MIA": 930,
			"NAS": 643
		},
		"PLZ": {
			"CPT": 646,
			"DUR": 672,
			"JNB": 908
		},
		"PMF": {
			"AHO": 494,
			"CAG": 628,
			"STN": 1079,
			"TPS": 790
		},
		"PMI": {
			"AGP": 708,
			"BCN": 201,
			"BGY": 887,
			"BHX": 1475,
			"BLL": 1861,
			"BLQ": 897,
			"BOH": 1298,
			"BRE": 1570,
			"BRS": 1381,
			"BRU": 1269,
			"BSL": 973,
			"BTS": 1501,
			"BVA": 1102,
			"CGN": 1304,
			"CRL": 1220,
			"DTM": 1383,
			"DUB": 1686,
			"DUS": 1342,
			"EDI": 1878,
			"EIN": 1338,
			"EMA": 1508,
			"FCO": 840,
			"FKB": 1110,
			"FMM": 1114,
			"FRA": 1251,
			"GOT": 2128,
			"GRO": 261,
			"GRQ": 1537,
			"GVA": 792,
			"HAM": 1659,
			"HHN": 1209,
			"IBZ": 139,
			"KRK": 1776,
			"KUN": 2334,
			"LBA": 1625,
			"LCY": 1345,
			"LGW": 1309,
			"LHR": 1348,
			"LPL": 1589,
			"LTN": 1391,
			"MAD": 546,
			"MAN": 1581,
			"MRS": 478,
			"MST": 1285,
			"MUC": 1216,
			"MXP": 835,
			"NRN": 1365,
			"NTE": 914,
			"NYO": 2363,
			"OPO": 983,
			"ORK": 1616,
			"PIK": 1855,
			"REU": 221,
			"RYG": 2276,
			"SCQ": 1002,
			"SDR": 694,
			"SNN": 1711,
			"STN": 1384,
			"STR": 1139,
			"SVQ": 786,
			"SXF": 1648,
			"TXL": 1656,
			"VLC": 275,
			"WMI": 1983
		},
		"PMO": {
			"BGY": 879,
			"BLQ": 723,
			"BVA": 1529,
			"DUB": 2250,
			"EMA": 1971,
			"FCO": 409,
			"FMM": 1115,
			"FRA": 1366,
			"GVA": 1064,
			"LGW": 1778,
			"LHR": 1819,
			"MAD": 1453,
			"MLA": 285,
			"MRS": 883,
			"MUC": 1136,
			"MXP": 904,
			"NRN": 1588,
			"PSA": 653,
			"STN": 1823,
			"SVQ": 1667,
			"SXF": 1580,
			"TPS": 60,
			"TRN": 902,
			"TSF": 834,
			"VRN": 823
		},
		"PNA": {
			"MAD": 299
		},
		"PNH": {
			"BKK": 504,
			"SGN": 213
		},
		"PNQ": {
			"FRA": 6688,
			"OTP": 5270
		},
		"PNS": {
			"DFW": 970,
			"IAH": 785,
			"MIA": 853
		},
		"POA": {
			"GIG": 1122,
			"GRU": 866
		},
		"POM": {
			"HGU": 515,
			"MFO": 0
		},
		"POP": {
			"FRA": 7572,
			"MIA": 1201
		},
		"POS": {
			"DFW": 4408,
			"MIA": 2614,
			"YYZ": 4079
		},
		"POZ": {
			"ALC": 2067,
			"BRS": 1342,
			"CFU": 1445,
			"CIA": 1223,
			"DUB": 1546,
			"EDI": 1366,
			"FRA": 635,
			"GRO": 1575,
			"LPL": 1320,
			"MLA": 1851,
			"MUC": 576,
			"RYG": 859,
			"STN": 1131
		},
		"PQQ": {
			"SYD": 320
		},
		"PRG": {
			"AMS": 705,
			"BCN": 1358,
			"BGY": 598,
			"BHX": 1141,
			"BRE": 500,
			"BRS": 1200,
			"BSL": 566,
			"CDG": 852,
			"CIA": 932,
			"CRL": 697,
			"DUB": 1455,
			"DUS": 543,
			"EDI": 1341,
			"FCO": 935,
			"FRA": 408,
			"LGW": 1024,
			"LHR": 1044,
			"MAN": 1192,
			"MUC": 264,
			"MXP": 645,
			"NAP": 1024,
			"STN": 1000,
			"VCE": 530
		},
		"PRN": {
			"BSL": 1196,
			"CDG": 1596,
			"FRA": 1265,
			"GVA": 1251,
			"LGW": 1865,
			"MUC": 965,
			"SXF": 1226,
			"VIE": 707
		},
		"PSA": {
			"AHO": 381,
			"BDS": 707,
			"BGY": 227,
			"BHX": 1325,
			"BLL": 1343,
			"BRI": 594,
			"BRS": 1301,
			"BSL": 488,
			"BUD": 805,
			"BVA": 900,
			"CAG": 505,
			"CFU": 911,
			"CHQ": 1483,
			"CIA": 276,
			"CIY": 824,
			"CRL": 877,
			"CRV": 763,
			"CTA": 795,
			"DUB": 1629,
			"EDI": 1677,
			"EFL": 1049,
			"EIN": 941,
			"EMA": 1333,
			"FEZ": 1713,
			"FUE": 2743,
			"GDN": 1325,
			"GOA": 148,
			"GOT": 1560,
			"GRO": 653,
			"GVA": 440,
			"HAM": 1106,
			"HAU": 1777,
			"HHN": 736,
			"IBZ": 923,
			"KGS": 1607,
			"KRK": 1006,
			"LBA": 1432,
			"LGW": 1148,
			"LHR": 1186,
			"LIS": 1717,
			"LPA": 2890,
			"LPL": 1445,
			"MAD": 1203,
			"MAN": 1419,
			"MLA": 937,
			"MUC": 530,
			"NRN": 936,
			"NYO": 1738,
			"ORK": 1670,
			"ORY": 833,
			"PIK": 1694,
			"PMO": 653,
			"RAK": 2098,
			"RHO": 1705,
			"SKG": 1094,
			"SOF": 1059,
			"STN": 1184,
			"SUF": 721,
			"SVQ": 1539,
			"SXF": 994,
			"TFS": 2966,
			"TPS": 665,
			"TRF": 1724,
			"TRN": 275,
			"VLC": 1016,
			"WMI": 1235
		},
		"PSP": {
			"DEN": 1247,
			"DFW": 1808,
			"LAX": 176,
			"ORD": 2653,
			"SFO": 676
		},
		"PSR": {
			"BGY": 507,
			"BVA": 1214,
			"CAG": 557,
			"CRL": 1161,
			"GRO": 942,
			"HHN": 990,
			"NRN": 1186,
			"PIK": 1985,
			"STN": 1484
		},
		"PTY": {
			"DAV": 343,
			"FRA": 9090,
			"GYE": 1250,
			"LIM": 2359,
			"MAD": 8159,
			"MIA": 1862,
			"SAP": 1168,
			"SJO": 539,
			"TGU": 1017,
			"UIO": 1029
		},
		"PUJ": {
			"LGW": 6898
		},
		"PUY": {
			"BVA": 1025,
			"CRL": 939,
			"HHN": 752,
			"MUC": 417,
			"RYG": 1624,
			"STN": 1271
		},
		"PVD": {
			"EWR": 257
		},
		"PVG": {
			"CKG": 1461,
			"CTU": 1704,
			"FRA": 8862,
			"LHR": 9243,
			"MUC": 8780,
			"NKG": 287,
			"ORD": 11337,
			"WNZ": 371,
			"XIY": 1273
		},
		"PVR": {
			"DFW": 1583,
			"EWR": 3681
		},
		"QLA": {
			"MAN": 255
		},
		"RAK": {
			"BCN": 1405,
			"BGY": 2186,
			"BOD": 1602,
			"BRS": 2242,
			"BSL": 2213,
			"BVA": 2157,
			"CDG": 2129,
			"CIA": 2152,
			"CRL": 2336,
			"DLE": 2064,
			"DUB": 2430,
			"DUS": 2502,
			"EDI": 2731,
			"EIN": 2464,
			"EMA": 2421,
			"FRA": 2466,
			"GRO": 1493,
			"GVA": 2029,
			"HHN": 2402,
			"LGW": 2266,
			"LPL": 2452,
			"LTN": 2339,
			"LYS": 1935,
			"MAD": 1066,
			"MAN": 2462,
			"MRS": 1755,
			"MUC": 2499,
			"MXP": 2125,
			"NCE": 1891,
			"NRN": 2507,
			"PSA": 2098,
			"STN": 2353,
			"SVQ": 675,
			"TUF": 1911,
			"TXL": 2897,
			"XCR": 2167
		},
		"RBA": {
			"BVA": 1861,
			"CIA": 1897,
			"CRL": 2039,
			"GRO": 1205,
			"MAD": 769,
			"MRS": 1469,
			"STN": 2061
		},
		"RCO": {
			"STN": 672
		},
		"RDD": {
			"SFO": 321
		},
		"RDU": {
			"DFW": 1705,
			"EWR": 670,
			"IAD": 360,
			"JFK": 686,
			"LHR": 6217,
			"MIA": 1130,
			"ORD": 1039,
			"PHL": 542,
			"YYZ": 870
		},
		"RDZ": {
			"CRL": 689,
			"DUB": 1187,
			"STN": 848
		},
		"REC": {
			"GIG": 1859,
			"GRU": 2100
		},
		"REK": {
			"YYR": 0
		},
		"REP": {
			"BKK": 332
		},
		"REU": {
			"ALC": 351,
			"BOH": 1096,
			"BRS": 1176,
			"CRL": 1066,
			"DUB": 1474,
			"EIN": 1190,
			"EMA": 1313,
			"HHN": 1087,
			"LPL": 1388,
			"MAN": 1381,
			"MUC": 1158,
			"ORK": 1397,
			"PIK": 1651,
			"PMI": 221,
			"REU": 0,
			"STN": 1196
		},
		"RFD": {
			"VCV": 2592
		},
		"RGN": {
			"BKK": 611
		},
		"RHO": {
			"ATH": 404,
			"BGY": 1847,
			"BLQ": 1679,
			"BOH": 2862,
			"CIA": 1462,
			"CRL": 2448,
			"EMA": 2924,
			"HHN": 2249,
			"KUN": 2086,
			"LGW": 2772,
			"LPL": 3040,
			"NRN": 2419,
			"NYO": 2618,
			"PSA": 1705,
			"STN": 2782
		},
		"RIC": {
			"EWR": 446,
			"IAD": 160,
			"LHR": 5999,
			"NGU": 110,
			"ORD": 1031
		},
		"RIX": {
			"BGY": 1590,
			"BRE": 1057,
			"CGN": 1287,
			"CRL": 1465,
			"DUB": 1943,
			"EMA": 1670,
			"FRA": 1272,
			"GLA": 1739,
			"HEL": 381,
			"HHN": 1346,
			"LBA": 1644,
			"LGW": 1692,
			"MAN": 1703,
			"NRN": 1295,
			"PIK": 1760,
			"RYG": 819,
			"STN": 1625,
			"SXF": 839,
			"TLL": 281
		},
		"RJK": {
			"CRL": 952,
			"NYO": 1517
		},
		"RLG": {
			"BRE": 250,
			"FRA": 502,
			"MUC": 619
		},
		"RMI": {
			"EMA": 1416,
			"LHR": 1278,
			"STN": 1267
		},
		"RNO": {
			"DEN": 1291,
			"DFW": 2161,
			"LAX": 629,
			"ORD": 2683,
			"SFO": 308
		},
		"RNS": {
			"LGW": 360,
			"OPO": 936
		},
		"ROA": {
			"IAD": 284,
			"ORD": 853
		},
		"ROB": {
			"FNA": 409
		},
		"ROC": {
			"EWR": 396,
			"IAD": 464,
			"ORD": 847
		},
		"ROV": {
			"DME": 916
		},
		"RST": {
			"LHR": 6475,
			"ORD": 431
		},
		"RSW": {
			"CLT": 968,
			"DFW": 1634,
			"EWR": 1722,
			"ORD": 1806,
			"PHL": 1601
		},
		"RTB": {
			"MIA": 1236
		},
		"RTM": {
			"BHX": 425,
			"DUB": 739,
			"LCY": 305,
			"LHR": 341,
			"MAN": 478,
			"MUC": 658
		},
		"RUH": {
			"BAH": 420,
			"FRA": 4295,
			"LHR": 4942,
			"MUC": 4000
		},
		"RVN": {
			"HEL": 696
		},
		"RYG": {
			"AGP": 2754,
			"ALC": 2481,
			"BCN": 2099,
			"BGY": 1526,
			"BVA": 1236,
			"BZR": 1856,
			"CFU": 2291,
			"CHQ": 2824,
			"CIA": 1959,
			"CRL": 1070,
			"DUB": 1236,
			"EDI": 922,
			"FAO": 2827,
			"GDN": 725,
			"KGS": 2771,
			"KRK": 1182,
			"KUN": 937,
			"LCJ": 1007,
			"LPA": 4026,
			"MAD": 2326,
			"MAN": 1043,
			"NCL": 891,
			"PMI": 2276,
			"POZ": 859,
			"PUY": 1624,
			"RIX": 819,
			"SKG": 2263,
			"STN": 1062,
			"SVG": 298,
			"SXF": 796,
			"SZZ": 691,
			"TFS": 4059,
			"TLL": 793,
			"TSF": 1530,
			"VNO": 1021,
			"WMI": 983,
			"WRO": 997,
			"ZAD": 1726
		},
		"RZE": {
			"BRS": 1738,
			"CFU": 1180,
			"DUB": 1968,
			"EMA": 1638,
			"FRA": 960,
			"LTN": 1573,
			"MAN": 1703,
			"MUC": 767,
			"STN": 1531,
			"SXF": 642
		},
		"SAF": {
			"DFW": 884
		},
		"SAL": {
			"MAD": 8667,
			"MIA": 1651
		},
		"SAN": {
			"CLT": 3336,
			"DEN": 1371,
			"DFW": 1880,
			"IAH": 2093,
			"JFK": 3929,
			"LAX": 175,
			"LGW": 8846,
			"LHR": 8808,
			"ORD": 2768,
			"PDX": 1503,
			"PHL": 3806,
			"PHX": 488,
			"SFO": 719,
			"SLC": 1008
		},
		"SAP": {
			"PTY": 1168
		},
		"SAT": {
			"BOS": 2836,
			"DFW": 398,
			"EWR": 2523,
			"IAD": 2189,
			"IAH": 306,
			"ORD": 1677,
			"SAT": 0
		},
		"SAV": {
			"DFW": 1486,
			"EWR": 1140,
			"IAD": 830
		},
		"SBA": {
			"LAX": 142,
			"SFO": 421
		},
		"SBP": {
			"LAX": 250,
			"SFO": 306
		},
		"SBZ": {
			"MUC": 973
		},
		"SCL": {
			"EZE": 1138,
			"GRU": 2615,
			"MAD": 10722
		},
		"SCN": {
			"BRE": 442,
			"HAM": 530,
			"LUX": 79
		},
		"SCQ": {
			"ACE": 1619,
			"AGP": 768,
			"ALC": 838,
			"BCN": 883,
			"BGY": 1472,
			"BSL": 1350,
			"GVA": 1207,
			"HHN": 1431,
			"LGW": 1108,
			"LPA": 1778,
			"MAD": 483,
			"PMI": 1002,
			"STN": 1191,
			"SVQ": 645,
			"TFS": 1807,
			"VLC": 764
		},
		"SDF": {
			"DFW": 1178,
			"EWR": 1031,
			"IAD": 725,
			"IAH": 1268,
			"ORD": 461
		},
		"SDJ": {
			"NGO": 517
		},
		"SDQ": {
			"ATL": 2238,
			"JFK": 2501,
			"MAD": 6691,
			"MIA": 1365
		},
		"SDR": {
			"ACE": 1831,
			"AGP": 753,
			"BCN": 539,
			"BGY": 1099,
			"CIA": 1353,
			"CRL": 1001,
			"DUB": 1126,
			"EDI": 1393,
			"FAO": 795,
			"HHN": 1112,
			"MAD": 326,
			"NRN": 1175,
			"PMI": 694,
			"STN": 988,
			"SVQ": 690,
			"SXF": 1625,
			"TFS": 2056,
			"VLC": 518
		},
		"SEA": {
			"ANC": 2326,
			"BOI": 641,
			"DFW": 2668,
			"EWR": 3855,
			"FAI": 2462,
			"FRA": 8199,
			"GEG": 359,
			"HNL": 4309,
			"IAD": 3702,
			"JFK": 3887,
			"KOA": 4327,
			"LHR": 7703,
			"OGG": 4249,
			"ORD": 2762,
			"PDX": 208,
			"PHL": 3818,
			"PHX": 1782,
			"SFO": 1093,
			"SLC": 1107,
			"YVR": 204
		},
		"SEN": {
			"ACE": 2782,
			"AGP": 1706,
			"ALC": 1481,
			"AMS": 290,
			"BCN": 1147,
			"CDG": 313,
			"CPH": 907,
			"FAO": 1756,
			"GVA": 712,
			"LPA": 2952,
			"LYS": 725,
			"TFS": 2987
		},
		"SEZ": {
			"DOH": 3356,
			"LHR": 8178
		},
		"SFB": {
			"BGR": 2092
		},
		"SFJ": {
			"YRB": 1768
		},
		"SFO": {
			"ADW": 3937,
			"AKL": 10511,
			"CDG": 8964,
			"CLT": 3687,
			"DEN": 1553,
			"DFW": 2352,
			"DUB": 8185,
			"EUG": 726,
			"FAT": 253,
			"FRA": 9150,
			"HNL": 3857,
			"IAD": 3884,
			"JFK": 4152,
			"KOA": 3809,
			"LAS": 665,
			"LAX": 543,
			"LHR": 8617,
			"LIH": 3935,
			"MIA": 4154,
			"MRY": 124,
			"MUC": 9439,
			"OGG": 3761,
			"ORD": 2964,
			"PDX": 886,
			"PHL": 4048,
			"PHX": 1046,
			"PSP": 676,
			"RDD": 321,
			"RNO": 308,
			"SAN": 719,
			"SBA": 421,
			"SBP": 306,
			"SEA": 1093,
			"SJD": 2011,
			"SLC": 962,
			"SMF": 137,
			"SNA": 598,
			"SYD": 11953,
			"TUS": 1208
		},
		"SFT": {
			"GRO": 2782,
			"STN": 1851
		},
		"SGF": {
			"DFW": 586,
			"ORD": 705
		},
		"SGN": {
			"BKK": 716,
			"BOM": 3737,
			"DOH": 6000,
			"HKG": 1493,
			"PNH": 213
		},
		"SHA": {
			"CKG": 1417,
			"XIY": 1229
		},
		"SHE": {
			"FRA": 8036,
			"PEK": 583
		},
		"SHJ": {
			"HKG": 5904,
			"STN": 5464
		},
		"SHV": {
			"DFW": 304,
			"IAH": 309
		},
		"SIN": {
			"ADL": 5403,
			"AKL": 8410,
			"BNE": 6144,
			"CBR": 6212,
			"CGK": 882,
			"CHC": 8405,
			"DPS": 1671,
			"DUS": 10394,
			"FRA": 10284,
			"HND": 5301,
			"LHR": 10886,
			"MEL": 6034,
			"MUC": 10061,
			"PER": 3911,
			"SYD": 6295,
			"USM": 1010
		},
		"SIR": {
			"LGW": 777
		},
		"SJC": {
			"DEN": 1522,
			"DFW": 2310,
			"FRA": 9156,
			"LAX": 495,
			"LHR": 8620,
			"ORD": 2937,
			"PDX": 916,
			"SNA": 550
		},
		"SJD": {
			"DFW": 1648,
			"SFO": 2011
		},
		"SJJ": {
			"MUC": 712,
			"VIE": 495
		},
		"SJO": {
			"CLT": 2824,
			"DFW": 2866,
			"LGW": 8730,
			"MAD": 8502,
			"MIA": 1805,
			"PTY": 539
		},
		"SJT": {
			"DFW": 367
		},
		"SJU": {
			"CLT": 2376,
			"EWR": 2595,
			"IAH": 3228,
			"JFK": 2578,
			"MIA": 1682,
			"ORD": 3338,
			"PHL": 2543
		},
		"SKB": {
			"ANU": 100,
			"LGW": 6614
		},
		"SKG": {
			"ATH": 299,
			"BGY": 1218,
			"BLQ": 1055,
			"BRE": 1756,
			"BVA": 1908,
			"CFU": 279,
			"CHQ": 564,
			"CIA": 879,
			"CRL": 1810,
			"FKB": 1489,
			"FRA": 1542,
			"GRO": 1694,
			"HHN": 1610,
			"LGW": 2134,
			"MAN": 2369,
			"MUC": 1241,
			"NRN": 1782,
			"NYO": 2076,
			"PFO": 1056,
			"PSA": 1094,
			"RYG": 2263,
			"STN": 2144,
			"STR": 1414,
			"SXF": 1501,
			"VIE": 985,
			"WMI": 1338
		},
		"SKP": {
			"LJU": 742,
			"VIE": 790
		},
		"SKT": {
			"DOH": 2356
		},
		"SLC": {
			"BOI": 466,
			"DEN": 627,
			"DFW": 1589,
			"FRA": 8376,
			"LAX": 949,
			"ORD": 2006,
			"SAN": 1008,
			"SEA": 1107,
			"SFO": 962
		},
		"SLL": {
			"DOH": 951
		},
		"SMA": {
			"PDL": 97
		},
		"SMF": {
			"DEN": 1460,
			"DFW": 2299,
			"LAX": 600,
			"ORD": 2860,
			"PHX": 1040,
			"SFO": 137
		},
		"SNA": {
			"DEN": 1360,
			"DFW": 1935,
			"IAH": 2163,
			"ORD": 2772,
			"SFO": 598,
			"SJC": 550
		},
		"SNN": {
			"ACE": 2670,
			"AGP": 1815,
			"ALC": 1728,
			"BHX": 485,
			"BOS": 4647,
			"BVA": 850,
			"CRL": 956,
			"CWL": 408,
			"DUB": 194,
			"EDI": 509,
			"EWR": 4969,
			"FAO": 1746,
			"FCO": 1993,
			"FMM": 1452,
			"FRA": 1245,
			"FUE": 2727,
			"JER": 610,
			"JFK": 4947,
			"KRK": 2000,
			"KUN": 2160,
			"LGW": 623,
			"LHR": 593,
			"MAD": 1417,
			"MAN": 450,
			"MJV": 1774,
			"MLA": 2619,
			"NCE": 1557,
			"ORD": 5763,
			"ORK": 100,
			"PIK": 421,
			"PIS": 949,
			"PMI": 1711,
			"STN": 629,
			"SXF": 1512,
			"TFS": 2814,
			"WMI": 1985,
			"WRO": 1770
		},
		"SOF": {
			"ATH": 531,
			"BCN": 1765,
			"BHX": 2160,
			"CDT": 0,
			"CGN": 1530,
			"CIA": 895,
			"CRL": 1679,
			"DUB": 2482,
			"EIN": 1670,
			"FKB": 1365,
			"FMM": 1183,
			"FRA": 1398,
			"GLA": 2467,
			"HAM": 1566,
			"LGW": 2011,
			"LHR": 2041,
			"LPL": 2264,
			"MAD": 2247,
			"MAN": 2229,
			"MUC": 1100,
			"MXP": 1213,
			"NRN": 1632,
			"NYO": 1845,
			"PSA": 1059,
			"STN": 2012,
			"SXF": 1305,
			"TSF": 951
		},
		"SOU": {
			"DUB": 433,
			"EDI": 571,
			"FRA": 707,
			"GLA": 584,
			"JER": 202,
			"MAN": 274,
			"MUC": 987,
			"NCL": 455
		},
		"SPC": {
			"LGW": 2902,
			"MAD": 1847,
			"SXF": 3685
		},
		"SPI": {
			"DFW": 1014
		},
		"SPU": {
			"DUS": 1119,
			"FRA": 931,
			"LHR": 1532,
			"MUC": 638,
			"TXL": 1027
		},
		"SRQ": {
			"ORD": 1693
		},
		"SSA": {
			"GIG": 1217,
			"GRU": 1451
		},
		"SSG": {
			"LOS": 674
		},
		"SSH": {
			"LGW": 3867
		},
		"STL": {
			"DFW": 885,
			"EWR": 1400,
			"IAD": 1117,
			"IAH": 1075,
			"ORD": 415,
			"PHL": 1306
		},
		"STN": {
			"AAR": 835,
			"ACE": 2796,
			"AGA": 2522,
			"AGP": 1732,
			"AHO": 1394,
			"ALC": 1514,
			"AMS": 312,
			"ANC": 7170,
			"AOC": 855,
			"AOI": 1341,
			"ATH": 2408,
			"ATL": 6793,
			"BAH": 5059,
			"BCN": 1185,
			"BDS": 1838,
			"BES": 505,
			"BFS": 528,
			"BGY": 977,
			"BHD": 507,
			"BHX": 149,
			"BIO": 983,
			"BIQ": 945,
			"BLK": 303,
			"BLL": 724,
			"BLQ": 1154,
			"BOD": 788,
			"BOH": 189,
			"BOM": 7167,
			"BRE": 593,
			"BRI": 1732,
			"BRQ": 1200,
			"BRS": 211,
			"BRU": 314,
			"BSL": 708,
			"BTS": 1278,
			"BUD": 1450,
			"BVA": 300,
			"BVE": 754,
			"BZG": 1206,
			"CAG": 1561,
			"CCF": 976,
			"CDG": 359,
			"CDT": 0,
			"CFE": 711,
			"CFU": 2037,
			"CGN": 492,
			"CHQ": 2624,
			"CHR": 569,
			"CIA": 1459,
			"CIY": 2003,
			"CMF": 808,
			"CRL": 334,
			"CWL": 252,
			"DAC": 7958,
			"DEL": 6678,
			"DMM": 4987,
			"DNR": 401,
			"DOH": 5205,
			"DOL": 280,
			"DTM": 509,
			"DUB": 470,
			"DXB": 5460,
			"EBJ": 680,
			"EBU": 765,
			"EDI": 510,
			"EFL": 2195,
			"EGC": 785,
			"EIN": 357,
			"EMA": 149,
			"ERF": 749,
			"FAO": 1774,
			"FCO": 1442,
			"FEZ": 2040,
			"FKB": 654,
			"FMM": 836,
			"FRA": 617,
			"FRL": 1224,
			"FUE": 2856,
			"GDN": 1244,
			"GLA": 538,
			"GNB": 815,
			"GOA": 1046,
			"GOT": 1002,
			"GRO": 1126,
			"GRQ": 450,
			"GRX": 1664,
			"GRZ": 1223,
			"GSE": 990,
			"GVA": 759,
			"HAM": 683,
			"HAU": 886,
			"HHN": 537,
			"HKG": 9568,
			"IAH": 7791,
			"IBZ": 1449,
			"IND": 6439,
			"JFK": 5572,
			"KEF": 1885,
			"KGS": 2690,
			"KIR": 668,
			"KLU": 1175,
			"KRK": 1379,
			"KTW": 1319,
			"KUN": 1608,
			"KWI": 4639,
			"LBC": 735,
			"LCJ": 1314,
			"LDE": 968,
			"LDY": 602,
			"LEI": 1685,
			"LEJ": 829,
			"LGW": 87,
			"LHR": 66,
			"LIG": 673,
			"LIS": 1628,
			"LJU": 1209,
			"LNZ": 1073,
			"LPA": 2964,
			"LRH": 643,
			"LTN": 41,
			"LUX": 489,
			"LUZ": 1549,
			"LYS": 771,
			"MAD": 1299,
			"MAN": 235,
			"MIA": 7150,
			"MIR": 1977,
			"MJV": 1571,
			"MLA": 2108,
			"MMX": 953,
			"MPL": 964,
			"MRS": 1010,
			"MST": 398,
			"MUC": 911,
			"MXP": 932,
			"NAP": 1625,
			"NCE": 1052,
			"NOC": 647,
			"NRN": 407,
			"NUE": 807,
			"NYO": 1299,
			"OPO": 1363,
			"ORK": 599,
			"OSI": 1533,
			"OSL": 1141,
			"OSR": 1276,
			"OST": 197,
			"OTP": 2067,
			"OVD": 1036,
			"PDL": 2557,
			"PDV": 2148,
			"PEG": 1340,
			"PFO": 3191,
			"PGF": 1036,
			"PIK": 512,
			"PIS": 589,
			"PLQ": 1433,
			"PMF": 1079,
			"PMI": 1384,
			"PMO": 1823,
			"POZ": 1131,
			"PRG": 1000,
			"PSA": 1184,
			"PSR": 1484,
			"PUY": 1271,
			"RAK": 2353,
			"RBA": 2061,
			"RCO": 672,
			"RDZ": 848,
			"REU": 1196,
			"RHO": 2782,
			"RIX": 1625,
			"RMI": 1267,
			"RYG": 1062,
			"RZE": 1531,
			"SCQ": 1191,
			"SDR": 988,
			"SFT": 1851,
			"SHJ": 5464,
			"SKG": 2144,
			"SNN": 629,
			"SOF": 2012,
			"SUF": 1901,
			"SVQ": 1679,
			"SXB": 644,
			"SXF": 907,
			"SZG": 1020,
			"SZY": 0,
			"SZZ": 1003,
			"TFS": 2997,
			"TGD": 1778,
			"TLL": 1741,
			"TLN": 1072,
			"TLS": 922,
			"TLV": 3564,
			"TMP": 1763,
			"TRF": 1026,
			"TRN": 921,
			"TRS": 1177,
			"TSF": 1115,
			"TSR": 1678,
			"TUF": 496,
			"TXL": 891,
			"VBS": 1030,
			"VIE": 1237,
			"VLC": 1379,
			"VLL": 1195,
			"VNO": 1685,
			"VRN": 1062,
			"VST": 1331,
			"WMI": 1389,
			"WRO": 1153,
			"XRY": 1755,
			"YMX": 5244,
			"ZAD": 1414,
			"ZAZ": 1140
		},
		"STR": {
			"ALC": 1398,
			"BHX": 879,
			"BRE": 485,
			"DUS": 338,
			"EDI": 1173,
			"EWR": 6319,
			"FKB": 84,
			"FRA": 156,
			"GRZ": 500,
			"HAM": 552,
			"LGW": 726,
			"LHR": 756,
			"MAN": 955,
			"MUC": 192,
			"MXP": 342,
			"OPO": 1628,
			"PMI": 1139,
			"SKG": 1414,
			"TXL": 517,
			"VCE": 426,
			"VIE": 546,
			"ZRH": 145
		},
		"STT": {
			"MIA": 1781,
			"ORD": 3408
		},
		"SUB": {
			"HKG": 3304
		},
		"SUF": {
			"BGY": 924,
			"BLQ": 748,
			"CIA": 446,
			"CRL": 1583,
			"DUB": 2350,
			"FCO": 467,
			"HHN": 1417,
			"MUC": 1109,
			"MXP": 969,
			"NRN": 1615,
			"PSA": 721,
			"STN": 1901,
			"TSF": 820
		},
		"SUX": {
			"ORD": 700
		},
		"SVG": {
			"CPH": 556,
			"FRA": 1001,
			"LGW": 935,
			"LHR": 908,
			"OSL": 340,
			"RYG": 298
		},
		"SVN": {
			"LHR": 6672
		},
		"SVQ": {
			"ACE": 1183,
			"BCN": 809,
			"BGY": 1585,
			"BLQ": 1641,
			"BOD": 930,
			"BVA": 1484,
			"CDG": 1457,
			"CIA": 1653,
			"CRL": 1666,
			"DUB": 1780,
			"EIN": 1794,
			"EMA": 1750,
			"FCO": 1625,
			"FRA": 1813,
			"GVA": 1394,
			"LGW": 1592,
			"LPA": 1377,
			"LPL": 1785,
			"MAD": 396,
			"MRS": 1152,
			"MUC": 1877,
			"MXP": 1518,
			"OPO": 488,
			"PMI": 786,
			"PMO": 1667,
			"PSA": 1539,
			"RAK": 675,
			"SCQ": 645,
			"SDR": 690,
			"STN": 1679,
			"SXF": 2246,
			"TFS": 1442,
			"TLS": 923
		},
		"SVX": {
			"DME": 1422,
			"FRA": 3456
		},
		"SWF": {
			"JFK": 99
		},
		"SXB": {
			"FRA": 178,
			"MUC": 307,
			"OPO": 1514,
			"STN": 644
		},
		"SXF": {
			"ACE": 3428,
			"AGP": 2243,
			"ALC": 1908,
			"AMS": 594,
			"ATH": 1798,
			"BCN": 1505,
			"BFS": 1325,
			"BGY": 795,
			"BHX": 1034,
			"BLQ": 887,
			"BOD": 1338,
			"BRI": 1274,
			"BRS": 1118,
			"BRU": 644,
			"BSL": 683,
			"BTS": 536,
			"BUD": 685,
			"CGN": 471,
			"CIA": 1178,
			"CPH": 364,
			"CTA": 1663,
			"DUB": 1328,
			"EDI": 1166,
			"EMA": 1002,
			"FRA": 434,
			"FUE": 3488,
			"GLA": 1228,
			"GVA": 868,
			"INI": 1180,
			"LCA": 2514,
			"LGW": 952,
			"LIS": 2306,
			"LPA": 3617,
			"LPL": 1102,
			"LTN": 948,
			"LYS": 960,
			"MAD": 1852,
			"MAN": 1064,
			"MLA": 1839,
			"MRS": 1170,
			"MUC": 464,
			"MXP": 827,
			"NAP": 1279,
			"NCE": 1076,
			"NCL": 1041,
			"OPO": 2081,
			"ORY": 886,
			"OTP": 1267,
			"PMI": 1648,
			"PMO": 1580,
			"PRN": 1226,
			"PSA": 994,
			"RIX": 839,
			"RYG": 796,
			"RZE": 642,
			"SDR": 1625,
			"SKG": 1501,
			"SNN": 1512,
			"SOF": 1305,
			"SPC": 3685,
			"STN": 907,
			"SVQ": 2246,
			"SZG": 511,
			"SZZ": 162,
			"TFS": 3672,
			"TGD": 1194,
			"TLS": 1325,
			"TLV": 2846,
			"TRN": 906,
			"TSF": 754,
			"TSR": 925,
			"VCE": 769,
			"VIE": 521,
			"VLC": 1790,
			"VNO": 816,
			"ZAD": 929,
			"ZRH": 652
		},
		"SXM": {
			"PHL": 2693
		},
		"SYD": {
			"ABX": 450,
			"ADL": 1164,
			"AKL": 2160,
			"ARM": 382,
			"BKK": 7516,
			"BNE": 753,
			"CBR": 236,
			"CFS": 442,
			"CHC": 2126,
			"CNS": 1973,
			"GUM": 5318,
			"HKG": 7395,
			"LAX": 12064,
			"MEL": 705,
			"OOL": 680,
			"PER": 3278,
			"PQQ": 320,
			"SFO": 11953,
			"SIN": 6295,
			"WLG": 2228,
			"ZQN": 1939
		},
		"SYR": {
			"CLT": 971,
			"EWR": 313,
			"IAD": 477,
			"JFK": 335,
			"ORD": 974
		},
		"SYY": {
			"EDI": 308,
			"GLA": 284,
			"INV": 154
		},
		"SZG": {
			"AMS": 772,
			"BRS": 1199,
			"DUB": 1491,
			"DUS": 594,
			"FRA": 409,
			"GLA": 1491,
			"HAM": 682,
			"LGW": 1022,
			"LHR": 1051,
			"LPL": 1274,
			"LTN": 1059,
			"STN": 1020,
			"SXF": 511
		},
		"SZY": {
			"STN": 0
		},
		"SZZ": {
			"DUB": 1395,
			"HHN": 662,
			"LPL": 1172,
			"RYG": 691,
			"STN": 1003,
			"SXF": 162
		},
		"TAB": {
			"LGW": 7019
		},
		"TAK": {
			"HND": 546
		},
		"TAM": {
			"IAH": 891
		},
		"TAO": {
			"FRA": 8329
		},
		"TBS": {
			"CGN": 3042,
			"MUC": 2688
		},
		"TER": {
			"LHR": 2501,
			"LIS": 1554,
			"OPO": 1589
		},
		"TFN": {
			"BCN": 2195,
			"LHR": 2879,
			"MAD": 1772
		},
		"TFS": {
			"AMS": 3224,
			"BCN": 2245,
			"BFS": 3076,
			"BGY": 3026,
			"BHX": 2979,
			"BLL": 3699,
			"BLQ": 3073,
			"BOH": 2815,
			"BRE": 3472,
			"BRS": 2842,
			"BSL": 3010,
			"BVA": 2863,
			"CDG": 2847,
			"CGN": 3224,
			"CPH": 3850,
			"CRL": 3058,
			"CWL": 2823,
			"DUB": 2946,
			"EDI": 3277,
			"EIN": 3182,
			"EMA": 3029,
			"FAO": 1281,
			"FKB": 3124,
			"FMM": 3200,
			"GVA": 2833,
			"HHN": 3162,
			"KRK": 3919,
			"LBA": 3118,
			"LGW": 2913,
			"LPA": 117,
			"LPL": 3029,
			"LTN": 2973,
			"MAD": 1825,
			"MAN": 3049,
			"MST": 3159,
			"MUC": 3318,
			"MXP": 2959,
			"NCL": 3232,
			"NOC": 2945,
			"NRN": 3231,
			"NYO": 4272,
			"OPO": 1634,
			"ORK": 2731,
			"PIK": 3202,
			"PSA": 2966,
			"RYG": 4059,
			"SCQ": 1807,
			"SDR": 2056,
			"SEN": 2987,
			"SNN": 2814,
			"STN": 2997,
			"SVQ": 1442,
			"SXF": 3672,
			"TRF": 4023,
			"TSF": 3193,
			"VLC": 1952,
			"WMI": 4089,
			"WRO": 3790
		},
		"TGD": {
			"CRL": 1444,
			"STN": 1778,
			"SXF": 1194,
			"VIE": 673
		},
		"TGU": {
			"PTY": 1017
		},
		"THF": {
			"LCY": 919
		},
		"TIA": {
			"FRA": 1289,
			"LGW": 1864,
			"MUC": 992,
			"VIE": 785
		},
		"TIP": {
			"FRA": 1968,
			"LGW": 2325,
			"LHR": 2366
		},
		"TKS": {
			"HND": 497
		},
		"TLH": {
			"MIA": 648
		},
		"TLL": {
			"BGY": 1829,
			"BRE": 1213,
			"DUB": 2004,
			"EMA": 1764,
			"FRA": 1470,
			"GRO": 2468,
			"HEL": 100,
			"LGW": 1816,
			"MAN": 1784,
			"MUC": 1492,
			"MXP": 1870,
			"NRN": 1454,
			"RIX": 281,
			"RYG": 793,
			"STN": 1741
		},
		"TLN": {
			"MRS": 84,
			"STN": 1072
		},
		"TLS": {
			"AMS": 997,
			"BRS": 914,
			"BSL": 650,
			"CDG": 605,
			"CRL": 794,
			"DUB": 1224,
			"FAO": 1079,
			"FCO": 911,
			"FEZ": 1210,
			"FRA": 896,
			"GRO": 223,
			"GVA": 472,
			"LGW": 844,
			"LHR": 883,
			"LIL": 782,
			"LTN": 926,
			"LYS": 375,
			"MAD": 535,
			"MLA": 1413,
			"MUC": 960,
			"MXP": 623,
			"NCE": 470,
			"NTE": 455,
			"OPO": 865,
			"ORK": 1171,
			"ORY": 571,
			"STN": 922,
			"SVQ": 923,
			"SXF": 1325,
			"WMI": 1729
		},
		"TLV": {
			"AMS": 3312,
			"BSL": 2884,
			"CDG": 3285,
			"DUS": 3136,
			"FRA": 2955,
			"GVA": 2919,
			"IST": 1134,
			"LGW": 3558,
			"LHR": 3589,
			"LTN": 3601,
			"MAN": 3786,
			"MUC": 2655,
			"MXP": 2706,
			"STN": 3564,
			"SXF": 2846
		},
		"TMP": {
			"ALC": 3063,
			"BGY": 1967,
			"BRE": 1283,
			"BUD": 1579,
			"EDI": 1659,
			"GRO": 2578,
			"STN": 1763
		},
		"TNG": {
			"BVA": 1660,
			"CRL": 1838,
			"HHN": 1906,
			"MAD": 568,
			"MRS": 1280
		},
		"TOL": {
			"ORD": 342
		},
		"TOS": {
			"ALF": 173,
			"FRA": 2254,
			"OSL": 1115
		},
		"TOY": {
			"HND": 262
		},
		"TPA": {
			"CLT": 819,
			"DFW": 1493,
			"EWR": 1607,
			"FRA": 7739,
			"IAD": 1307,
			"IAH": 1265,
			"LGW": 7113,
			"MIA": 329,
			"ORD": 1631,
			"PHL": 1483
		},
		"TPE": {
			"BKK": 2490
		},
		"TPS": {
			"AOI": 638,
			"BGY": 893,
			"BLQ": 743,
			"BTS": 1203,
			"BVA": 1528,
			"CAG": 333,
			"CIA": 432,
			"CRL": 1533,
			"CUF": 842,
			"EIN": 1605,
			"FCO": 433,
			"FKB": 1259,
			"FMM": 1135,
			"GOA": 784,
			"GRO": 940,
			"HHN": 1401,
			"KRK": 1472,
			"KUN": 2088,
			"LPL": 2079,
			"MAN": 2057,
			"MLA": 288,
			"MST": 1539,
			"PEG": 576,
			"PMF": 790,
			"PMO": 60,
			"PSA": 665,
			"TRN": 904,
			"TRS": 884,
			"TSF": 860,
			"WMI": 1736
		},
		"TRD": {
			"OSL": 363
		},
		"TRE": {
			"GLA": 166
		},
		"TRF": {
			"AGP": 2720,
			"ALC": 2449,
			"BGY": 1503,
			"GDN": 731,
			"KRK": 1181,
			"LPA": 3990,
			"LPL": 1035,
			"MAN": 1007,
			"PIK": 977,
			"PSA": 1724,
			"STN": 1026,
			"TFS": 4023,
			"WMI": 989,
			"ZAD": 1712
		},
		"TRN": {
			"AHO": 510,
			"BCN": 626,
			"BDS": 977,
			"BHX": 1058,
			"BRI": 865,
			"BRS": 1028,
			"CRL": 631,
			"CTA": 1059,
			"DUB": 1357,
			"DUS": 680,
			"EIN": 715,
			"FRA": 540,
			"IBZ": 873,
			"LGW": 879,
			"LTN": 947,
			"MAN": 1155,
			"MLA": 1187,
			"MUC": 471,
			"PMO": 902,
			"PSA": 275,
			"STN": 921,
			"SXF": 906,
			"TPS": 904,
			"VLC": 921
		},
		"TRS": {
			"AHO": 713,
			"BHX": 1326,
			"BRI": 585,
			"BVA": 940,
			"CRL": 843,
			"CTA": 939,
			"MUC": 308,
			"STN": 1177,
			"TPS": 884,
			"VLC": 1338
		},
		"TSE": {
			"ALA": 950,
			"FRA": 4312
		},
		"TSF": {
			"AGP": 1712,
			"AHO": 641,
			"BCN": 948,
			"BDS": 724,
			"BGY": 193,
			"BLQ": 142,
			"BRE": 858,
			"BRI": 622,
			"BRS": 1267,
			"BRU": 815,
			"BUD": 575,
			"BVA": 866,
			"CAG": 756,
			"CFU": 921,
			"CRL": 785,
			"CTA": 940,
			"DUB": 1581,
			"EIN": 816,
			"EMA": 1262,
			"HHN": 603,
			"IBZ": 1164,
			"LBA": 1347,
			"LTN": 1149,
			"MLA": 1105,
			"NRN": 797,
			"NYO": 1495,
			"PMO": 834,
			"RYG": 1530,
			"SOF": 951,
			"STN": 1115,
			"SUF": 820,
			"SXF": 754,
			"TFS": 3193,
			"TPS": 860,
			"VLC": 1241,
			"WRO": 698
		},
		"TSR": {
			"BGY": 902,
			"CRL": 1351,
			"HHN": 1144,
			"MUC": 776,
			"NRN": 1284,
			"OTP": 397,
			"STN": 1678,
			"SXF": 925
		},
		"TUF": {
			"DUB": 829,
			"MRS": 565,
			"OPO": 1015,
			"RAK": 1911,
			"STN": 496
		},
		"TUL": {
			"DEN": 870,
			"DFW": 382,
			"IAH": 693,
			"ORD": 941
		},
		"TUN": {
			"FRA": 1471,
			"MUC": 1285
		},
		"TUS": {
			"DEN": 1029,
			"DFW": 1306,
			"IAH": 1503,
			"LAX": 725,
			"ORD": 2310,
			"SFO": 1208
		},
		"TVC": {
			"ORD": 360
		},
		"TXK": {
			"DFW": 290
		},
		"TXL": {
			"ADB": 1913,
			"AGP": 2246,
			"ARN": 839,
			"AYT": 2212,
			"BCN": 1510,
			"BEY": 2731,
			"BGO": 991,
			"BHX": 1016,
			"BIA": 1148,
			"BLQ": 904,
			"BRU": 633,
			"BUD": 711,
			"CDG": 850,
			"CGN": 463,
			"CPH": 342,
			"CTA": 1684,
			"DBV": 1172,
			"DME": 1631,
			"DUB": 1308,
			"DUS": 468,
			"EWR": 6389,
			"FAO": 2391,
			"FCO": 1198,
			"FNC": 3263,
			"FRA": 433,
			"GOT": 571,
			"GVA": 873,
			"GWT": 417,
			"HEL": 1119,
			"IBZ": 1776,
			"INN": 605,
			"IST": 1741,
			"KEF": 2406,
			"LAX": 9321,
			"LCY": 911,
			"LHR": 947,
			"LIN": 843,
			"LUX": 591,
			"LYS": 964,
			"MAH": 1572,
			"MAN": 1044,
			"MUC": 479,
			"NCE": 1086,
			"NUE": 374,
			"OTP": 1292,
			"PMI": 1656,
			"RAK": 2897,
			"SPU": 1027,
			"STN": 891,
			"STR": 517,
			"VIE": 546,
			"VKO": 1591,
			"VLC": 1794,
			"ZAD": 952,
			"ZAG": 784,
			"ZRH": 659
		},
		"TYR": {
			"DFW": 164
		},
		"TYS": {
			"DFW": 1239,
			"EWR": 1014,
			"IAD": 674,
			"IAH": 1240,
			"ORD": 764
		},
		"UBJ": {
			"HND": 797
		},
		"UIO": {
			"PTY": 1029
		},
		"USM": {
			"BKK": 465,
			"HKG": 2048,
			"KUL": 778,
			"SIN": 1010
		},
		"UVF": {
			"EWR": 3262,
			"LGW": 6801
		},
		"VAR": {
			"DUS": 1815,
			"LGW": 2275,
			"VIE": 1027
		},
		"VBS": {
			"STN": 1030
		},
		"VCE": {
			"AMS": 937,
			"BCN": 952,
			"BOD": 1026,
			"BRS": 1286,
			"BSL": 435,
			"BUD": 570,
			"CDG": 835,
			"DBV": 575,
			"DUS": 763,
			"EDI": 1597,
			"FRA": 577,
			"GVA": 490,
			"HAM": 919,
			"KRK": 752,
			"LGW": 1117,
			"LHR": 1152,
			"LTN": 1169,
			"LYS": 565,
			"MAN": 1367,
			"MUC": 319,
			"NAP": 537,
			"NCE": 455,
			"ORY": 835,
			"PRG": 530,
			"STR": 426,
			"SXF": 769,
			"VCE": 0
		},
		"VCP": {
			"CWB": 348,
			"FRA": 9794
		},
		"VCV": {
			"LHR": 8648,
			"RFD": 2592
		},
		"VDA": {
			"BTS": 2527,
			"BUD": 2365,
			"KRK": 2573,
			"KUN": 2914
		},
		"VER": {
			"IAH": 1208
		},
		"VFA": {
			"JNB": 928
		},
		"VGO": {
			"BCN": 893,
			"BLQ": 1625,
			"DUB": 1256,
			"MAD": 464
		},
		"VIE": {
			"AMM": 2449,
			"AMS": 959,
			"BCN": 1370,
			"BHX": 1384,
			"BKK": 8453,
			"BRS": 1428,
			"CDG": 1035,
			"CGN": 746,
			"DEL": 5547,
			"DUS": 788,
			"EBL": 2595,
			"EDI": 1610,
			"EVN": 2375,
			"EWR": 6828,
			"FCO": 779,
			"FRA": 622,
			"GVA": 817,
			"HAJ": 687,
			"HAM": 767,
			"IAD": 7167,
			"IAS": 833,
			"IFN": 3399,
			"IKA": 3162,
			"JFK": 6806,
			"KLU": 234,
			"KSC": 350,
			"LCA": 2036,
			"LEJ": 482,
			"LGW": 1250,
			"LHR": 1275,
			"LTN": 1277,
			"LYS": 910,
			"MAN": 1443,
			"MUC": 355,
			"NAP": 823,
			"PRN": 707,
			"SJJ": 495,
			"SKG": 985,
			"SKP": 790,
			"STN": 1237,
			"STR": 546,
			"SXF": 521,
			"TGD": 673,
			"TIA": 785,
			"TXL": 546,
			"VAR": 1027,
			"YYZ": 6950
		},
		"VKO": {
			"DUS": 2058,
			"FRA": 2010,
			"HAM": 1758,
			"TXL": 1591
		},
		"VLC": {
			"ACE": 1679,
			"AGP": 470,
			"BCN": 295,
			"BGY": 1079,
			"BLQ": 1121,
			"BRI": 1471,
			"BRU": 1326,
			"BVA": 1127,
			"CAG": 819,
			"CGN": 1397,
			"CIA": 1131,
			"CRA": 2079,
			"CRL": 1279,
			"DUB": 1610,
			"DUS": 1427,
			"EMA": 1485,
			"FRA": 1369,
			"HHN": 1312,
			"IBZ": 173,
			"LGW": 1296,
			"LPA": 1880,
			"MAD": 285,
			"MAH": 404,
			"MAN": 1548,
			"MLA": 1375,
			"MRS": 646,
			"MUC": 1388,
			"NRN": 1441,
			"OPO": 721,
			"PMI": 275,
			"PSA": 1016,
			"SCQ": 764,
			"SDR": 518,
			"STN": 1379,
			"SXF": 1790,
			"TFS": 1952,
			"TRN": 921,
			"TRS": 1338,
			"TSF": 1241,
			"TXL": 1794,
			"WMI": 2164
		},
		"VLL": {
			"BCN": 578,
			"STN": 1195
		},
		"VNO": {
			"BCN": 2258,
			"BGY": 1486,
			"BHX": 1791,
			"BRE": 1094,
			"BRU": 1453,
			"BVA": 1677,
			"CHQ": 2126,
			"CIA": 1703,
			"CRL": 1477,
			"DUB": 2048,
			"FRA": 1244,
			"GDN": 441,
			"HEL": 632,
			"HHN": 1327,
			"LBA": 1742,
			"LGW": 1742,
			"LPL": 1833,
			"LTN": 1724,
			"MAD": 2645,
			"MLA": 2247,
			"ORK": 2247,
			"OSL": 1047,
			"RYG": 1021,
			"STN": 1685,
			"SXF": 816
		},
		"VOL": {
			"BGY": 1289,
			"HHN": 1707
		},
		"VPS": {
			"DFW": 1029,
			"IAH": 848
		},
		"VRN": {
			"BGY": 97,
			"BHX": 1209,
			"BRU": 774,
			"CAG": 699,
			"CRL": 739,
			"FRA": 544,
			"LGW": 1038,
			"MAD": 1294,
			"MAN": 1297,
			"MUC": 336,
			"PMO": 823,
			"STN": 1062
		},
		"VST": {
			"AGP": 2963,
			"ALC": 2663,
			"LTN": 1360,
			"STN": 1331
		},
		"VTE": {
			"BKK": 516
		},
		"VXO": {
			"ALC": 2357,
			"NRN": 812
		},
		"WAW": {
			"DUB": 1826,
			"DUS": 981,
			"FRA": 898,
			"GDN": 296,
			"HEL": 939,
			"LHR": 1469,
			"MAD": 2270,
			"MAN": 1563,
			"MUC": 777,
			"MXP": 1150,
			"WRO": 305
		},
		"WDH": {
			"JNB": 1165
		},
		"WEI": {
			"CNS": 623
		},
		"WIC": {
			"EDI": 279
		},
		"WLG": {
			"SYD": 2228
		},
		"WMI": {
			"AGP": 2630,
			"ALC": 2271,
			"ATH": 1634,
			"BCN": 1869,
			"BFS": 1780,
			"BGY": 1095,
			"BHX": 1512,
			"BLQ": 1116,
			"BRS": 1600,
			"BVA": 1336,
			"CFU": 1430,
			"CGN": 947,
			"CHQ": 1902,
			"CIA": 1330,
			"CRL": 1141,
			"DUB": 1797,
			"EDI": 1601,
			"EIN": 1051,
			"EMA": 1478,
			"FUE": 3891,
			"GLA": 1667,
			"GOT": 786,
			"KRK": 270,
			"LBA": 1490,
			"LIS": 2741,
			"LPA": 4028,
			"LPL": 1572,
			"LUZ": 195,
			"MAD": 2264,
			"MAN": 1534,
			"MRS": 1520,
			"NCL": 1490,
			"NYO": 742,
			"OPO": 2530,
			"PIK": 1675,
			"PMI": 1983,
			"PSA": 1235,
			"RYG": 983,
			"SKG": 1338,
			"SNN": 1985,
			"STN": 1389,
			"TFS": 4089,
			"TLS": 1729,
			"TPS": 1736,
			"TRF": 989,
			"VLC": 2164,
			"WRO": 299
		},
		"WNZ": {
			"PEK": 1408,
			"PVG": 371
		},
		"WRO": {
			"AGP": 2332,
			"ALC": 1974,
			"BFS": 1592,
			"BGY": 802,
			"BLQ": 841,
			"BRS": 1361,
			"BVA": 1064,
			"CHQ": 1826,
			"CIA": 1085,
			"DUB": 1590,
			"DUS": 705,
			"EMA": 1259,
			"FRA": 601,
			"GDN": 379,
			"GLA": 1499,
			"GRO": 1484,
			"LPL": 1362,
			"MAD": 1965,
			"MAN": 1324,
			"MLA": 1706,
			"MUC": 477,
			"NCL": 1311,
			"ORK": 1751,
			"PIK": 1501,
			"RYG": 997,
			"SNN": 1770,
			"STN": 1153,
			"TFS": 3790,
			"TSF": 698,
			"WAW": 305,
			"WMI": 299
		},
		"WUH": {
			"PEK": 1056
		},
		"XCR": {
			"OPO": 1310,
			"RAK": 2167
		},
		"XFW": {
			"LHR": 733
		},
		"XIY": {
			"CTU": 622,
			"PEK": 933,
			"PVG": 1273,
			"SHA": 1229
		},
		"XMN": {
			"CGK": 3630,
			"PEK": 1734
		},
		"XNA": {
			"DFW": 451,
			"ORD": 840
		},
		"XRY": {
			"BCN": 865,
			"DUS": 1909,
			"HHN": 1815,
			"MAD": 469,
			"STN": 1755
		},
		"YCD": {
			"YVR": 52
		},
		"YEG": {
			"YUL": 2969,
			"YYC": 246,
			"YYZ": 2689
		},
		"YHZ": {
			"LHR": 4585,
			"YUL": 804,
			"YYZ": 1288
		},
		"YKA": {
			"YVR": 258
		},
		"YLW": {
			"YVR": 287,
			"YYC": 399
		},
		"YMX": {
			"CDG": 5529,
			"EMA": 5106,
			"KEF": 3722,
			"LGG": 5631,
			"MUC": 6155,
			"MXP": 6120,
			"STN": 5244
		},
		"YNT": {
			"PEK": 510
		},
		"YOW": {
			"LHR": 5347,
			"YUL": 151,
			"YYZ": 363
		},
		"YQB": {
			"YUL": 233,
			"YYZ": 731
		},
		"YQG": {
			"YYZ": 312
		},
		"YQM": {
			"LGW": 4619,
			"YUL": 706
		},
		"YQR": {
			"YYC": 661
		},
		"YQT": {
			"YYZ": 911
		},
		"YQX": {
			"DFW": 3923,
			"FRA": 4422
		},
		"YRB": {
			"SFJ": 1768
		},
		"YUL": {
			"BRU": 5555,
			"CDG": 5525,
			"FRA": 5855,
			"JFK": 537,
			"LHR": 5215,
			"LYS": 5867,
			"MUC": 6152,
			"YEG": 2969,
			"YHZ": 804,
			"YOW": 151,
			"YQB": 233,
			"YQM": 706,
			"YVR": 3683,
			"YWG": 1818,
			"YYC": 3006,
			"YYT": 1618,
			"YYZ": 507,
			"ZRH": 5997
		},
		"YVR": {
			"AKL": 11363,
			"DFW": 2820,
			"FRA": 8064,
			"HNL": 4354,
			"LHR": 7580,
			"MUC": 8342,
			"ORD": 2832,
			"PAE": 157,
			"PDX": 403,
			"PHX": 1980,
			"SEA": 204,
			"YCD": 52,
			"YKA": 258,
			"YLW": 287,
			"YUL": 3683,
			"YXS": 523,
			"YXY": 1483,
			"YYC": 686,
			"YYJ": 63,
			"YYZ": 3346
		},
		"YWG": {
			"YUL": 1818,
			"YYZ": 1504
		},
		"YXE": {
			"YYC": 518,
			"YYZ": 2210
		},
		"YXS": {
			"YVR": 523
		},
		"YXU": {
			"YYZ": 142
		},
		"YXY": {
			"YVR": 1483
		},
		"YYC": {
			"DFW": 2451,
			"FRA": 7530,
			"LHR": 7016,
			"ORD": 2224,
			"YEG": 246,
			"YLW": 399,
			"YQR": 661,
			"YUL": 3006,
			"YVR": 686,
			"YXE": 518,
			"YYJ": 727,
			"YYZ": 2689
		},
		"YYJ": {
			"YVR": 63,
			"YYC": 727,
			"YYZ": 3371
		},
		"YYR": {
			"BWI": 1999,
			"KEF": 2438,
			"REK": 0,
			"YYZ": 1766
		},
		"YYT": {
			"BWI": 2137,
			"JFK": 1841,
			"LHR": 3716,
			"YUL": 1618,
			"YYZ": 2124
		},
		"YYZ": {
			"AMS": 5991,
			"BNA": 1032,
			"BRU": 6046,
			"CDG": 6021,
			"CLE": 310,
			"CPH": 6271,
			"DUB": 5262,
			"DUS": 6166,
			"FCO": 7088,
			"FRA": 6344,
			"IAD": 556,
			"IND": 706,
			"JFK": 588,
			"LAX": 3494,
			"LGA": 573,
			"LHR": 5708,
			"MAD": 6060,
			"MIA": 1990,
			"MSY": 1788,
			"MUC": 6642,
			"MXP": 6613,
			"ORD": 700,
			"PIT": 357,
			"POS": 4079,
			"RDU": 870,
			"VIE": 6950,
			"YEG": 2689,
			"YHZ": 1288,
			"YOW": 363,
			"YQB": 731,
			"YQG": 312,
			"YQT": 911,
			"YUL": 507,
			"YVR": 3346,
			"YWG": 1504,
			"YXE": 2210,
			"YXU": 142,
			"YYC": 2689,
			"YYJ": 3371,
			"YYR": 1766,
			"YYT": 2124,
			"ZRH": 6492
		},
		"ZAD": {
			"BVA": 1167,
			"CRL": 1081,
			"DUB": 1881,
			"FKB": 760,
			"FRA": 835,
			"GOT": 1522,
			"HAU": 1828,
			"HHN": 892,
			"MAN": 1644,
			"MRS": 816,
			"MUC": 545,
			"NRN": 1078,
			"NYO": 1636,
			"RYG": 1726,
			"STN": 1414,
			"SXF": 929,
			"TRF": 1712,
			"TXL": 952
		},
		"ZAG": {
			"FRA": 735,
			"LGW": 1337,
			"LHR": 1368,
			"MUC": 435,
			"TXL": 784
		},
		"ZAZ": {
			"ACE": 1813,
			"BAH": 4982,
			"BGY": 971,
			"BVA": 900,
			"CRL": 1065,
			"NBO": 6118,
			"STN": 1140
		},
		"ZNZ": {
			"DOH": 3747
		},
		"ZQN": {
			"SYD": 1939
		},
		"ZRH": {
			"AMS": 603,
			"ATH": 1639,
			"BCN": 856,
			"BRU": 483,
			"CGN": 391,
			"DAR": 6753,
			"DRS": 556,
			"DUB": 1237,
			"DUS": 444,
			"DXB": 4769,
			"EWR": 6334,
			"FCO": 694,
			"FRA": 284,
			"GRU": 9611,
			"GVA": 230,
			"HAJ": 561,
			"HAM": 693,
			"IAD": 6675,
			"JFK": 6311,
			"LAX": 9536,
			"LCY": 759,
			"LEJ": 515,
			"LGW": 753,
			"LHR": 788,
			"LIS": 1723,
			"LTN": 806,
			"MAN": 1006,
			"MIA": 7847,
			"MUC": 260,
			"NUE": 292,
			"STR": 145,
			"SXF": 652,
			"TXL": 659,
			"YUL": 5997,
			"YYZ": 6492
		},
		"ZTH": {
			"CRL": 1920
		}
	};

/***/ }
/******/ ]);
//# sourceMappingURL=view.umd-es2015.js.map