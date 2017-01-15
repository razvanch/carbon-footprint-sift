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
	
	var _d3RsGeo = __webpack_require__(9);
	
	var _d3Selection = __webpack_require__(10);
	
	var _d3Transition = __webpack_require__(11);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	function whiteLine(selection) {
	  // selection.each(function(d, i) {
	  // console.log("hey", d, i);
	  // });
	
	  selection.attr('stroke', 'white') //set colour
	  .attr('stroke-width', '1px') //set width
	  .attr('stroke-dasharray', '5,3'); //set dash line
	}
	
	function displayText(selection) {
	  selection.each(function (d, i) {
	    //parameters: d and i
	    var node = (0, _d3Selection.select)(this) //select svg element
	    .selectAll('text') //select all the text
	    .data([d]); //iterate through the data
	
	    node = node.enter() //indicates that data will be added to selection
	    .append('text') //add text
	    .attr('stroke', 'white') //style text
	    .attr('stroke-width', '0.9px').style('font-size', '10px').merge(node); //merge the text to a single array
	
	    node.text(d[2]); //get the third item in the array
	  });
	}
	
	var MyView = function (_SiftView) {
	  _inherits(MyView, _SiftView);
	
	  function MyView() {
	    _classCallCheck(this, MyView);
	
	    var _this = _possibleConstructorReturn(this, (MyView.__proto__ || Object.getPrototypeOf(MyView)).call(this));
	
	    _this.controller.subscribe('footprint', _this.onFootprint.bind(_this));
	    _this.controller.subscribe('history', _this.onHistory.bind(_this));
	
	    _this._zoomed = false;
	    _this._links = [];
	    _this._points = [];
	
	    _this._geo = (0, _d3RsGeo.html)('empty').onClick(_this.onClick.bind(_this));
	
	    (0, _d3Selection.select)('#map').datum({ url: 'https://static.redsift.io/thirdparty/topojson/examples/world-110m.json' }).call(_this._geo);
	    return _this;
	  }
	
	  _createClass(MyView, [{
	    key: 'onClick',
	    value: function onClick(d, i, c) {
	      var geo = this._geo;
	
	      console.log(this._points);
	
	      if (this._zoomed) {
	        geo.zoom(1).zoomX(null).zoomY(null);
	      } else {
	        geo.zoom(4).zoomX(c[0]).zoomY(c[1]);
	      }
	
	      (0, _d3Selection.select)('#map').transition().duration(750).call(geo);
	
	      this._zoomed = !this._zoomed;
	    }
	  }, {
	    key: 'presentView',
	    value: function presentView(value) {
	      console.log('email-demo: presentView: ', value);
	      this.onFootprint(value.data);
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
	      Object.keys(data).forEach(function (k) {
	        document.getElementById(k).textContent = data[k];
	      });
	    }
	  }, {
	    key: 'onHistory',
	    value: function onHistory(data) {
	      var history = JSON.parse(data.history);
	
	      console.log('email-demo: onHistory: ', history);
	
	      var points = [];
	      var links = [];
	
	      history.forEach(function (flight) {
	        links.push([flight.source.longitude, flight.source.latitude, flight.destination.longitude, flight.destination.latitude]);
	
	        points.push([flight.source.longitude, flight.source.latitude, flight.source.code], [flight.destination.longitude, flight.destination.latitude, flight.destination.code]);
	      });
	
	      this._links = links;
	      this._points = points;
	
	      this._geo.links(links).linksDisplay(whiteLine).points(points).pointsDisplay(displayText);
	
	      (0, _d3Selection.select)('#map').call(this._geo);
	    }
	  }]);
	
	  return MyView;
	}(_siftSdkWeb.SiftView);
	
	exports.default = MyView;
	
	
	(0, _siftSdkWeb.registerSiftView)(new MyView(window));
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

	/* WEBPACK VAR INJECTION */(function(console) {!function(t,n){ true?n(exports,__webpack_require__(10)):"function"==typeof define&&define.amd?define(["exports","d3-selection"],n):n(t.d3_rs_geo=t.d3_rs_geo||{},t.d3)}(this,function(t,n){"use strict";function i(){}function r(t,n){var r=new i;if(t instanceof i)t.each(function(t,n){r.set(n,t)});else if(Array.isArray(t)){var e,o=-1,u=t.length;if(null==n)for(;++o<u;)r.set(o,t[o]);else for(;++o<u;)r.set(n(e=t[o],o,t),e)}else if(t)for(var a in t)r.set(a,t[a]);return r}function e(){}function o(t,n){var i=new e;if(t instanceof e)t.each(function(t){i.add(t)});else if(t){var r=-1,o=t.length;if(null==n)for(;++r<o;)i.add(t[r]);else for(;++r<o;)i.add(n(t[r],r,t))}return i}function u(){for(var t,n=arguments,i=0,r=arguments.length,e={};i<r;++i){if(!(t=n[i]+"")||t in e)throw new Error("illegal type: "+t);e[t]=[]}return new a(e)}function a(t){this._=t}function s(t,n){return t.trim().split(/^|\s+/).map(function(t){var i="",r=t.indexOf(".");if(r>=0&&(i=t.slice(r+1),t=t.slice(0,r)),t&&!n.hasOwnProperty(t))throw new Error("unknown type: "+t);return{type:t,name:i}})}function l(t,n){for(var i,r=0,e=t.length;r<e;++r)if((i=t[r]).name===n)return i.value}function c(t,n,i){for(var r=0,e=t.length;r<e;++r)if(t[r].name===n){t[r]=Pi,t=t.slice(0,r).concat(t.slice(r+1));break}return null!=i&&t.push({name:n,value:i}),t}function h(t){return function(n,i){t(null==n?i:null)}}function f(t){var n=t.responseType;return n&&"text"!==n?t.response:t.responseText}function p(t){return new Function("d","return {"+t.map(function(t,n){return JSON.stringify(t)+": d["+n+"]"}).join(",")+"}")}function _(t,n){var i=p(t);return function(r,e){return n(i(r),e,t)}}function v(t){var n=Object.create(null),i=[];return t.forEach(function(t){for(var r in t)r in n||i.push(n[r]=r)}),i}function d(t,n){return function(i){return t(i.responseText,n)}}function y(){this.reset()}function g(t,n,i){var r=t.s=n+i,e=r-n,o=r-e;t.t=n-o+(i-e)}function x(t){return t>1?0:t<-1?pr:Math.acos(t)}function m(t){return t>1?_r:t<-1?-_r:Math.asin(t)}function w(t){return(t=kr(t/2))*t}function E(){}function b(t,n){t&&Ar.hasOwnProperty(t.type)&&Ar[t.type](t,n)}function M(t,n,i){var r,e=-1,o=t.length-i;for(n.lineStart();++e<o;)r=t[e],n.point(r[0],r[1],r[2]);n.lineEnd()}function S(t,n){var i=-1,r=t.length;for(n.polygonStart();++i<r;)M(t[i],n,1);n.polygonEnd()}function k(t){return[wr(t[1],t[0]),m(t[2])]}function T(t){var n=t[0],i=t[1],r=Er(i);return[r*Er(n),r*kr(n),kr(i)]}function N(t,n){return t[0]*n[0]+t[1]*n[1]+t[2]*n[2]}function P(t,n){return[t[1]*n[2]-t[2]*n[1],t[2]*n[0]-t[0]*n[2],t[0]*n[1]-t[1]*n[0]]}function A(t,n){t[0]+=n[0],t[1]+=n[1],t[2]+=n[2]}function C(t,n){return[t[0]*n,t[1]*n,t[2]*n]}function z(t){var n=Tr(t[0]*t[0]+t[1]*t[1]+t[2]*t[2]);t[0]/=n,t[1]/=n,t[2]/=n}function j(t,n){Qi.push(Ui=[Di=t,Gi=t]),n<Hi&&(Hi=n),n>Wi&&(Wi=n)}function q(t,n){return(n-=t)<0?n+360:n}function F(t,n){t*=gr,n*=gr;var i=Er(n);L(i*Er(t),i*kr(t),kr(n))}function L(t,n,i){++Zi,Yi+=(t-Yi)/Zi,$i+=(n-$i)/Zi,Ki+=(i-Ki)/Zi}function R(){zr.point=O}function O(t,n){t*=gr,n*=gr;var i=Er(n);ar=i*Er(t),sr=i*kr(t),lr=kr(n),zr.point=I,L(ar,sr,lr)}function I(t,n){t*=gr,n*=gr;var i=Er(n),r=i*Er(t),e=i*kr(t),o=kr(n),u=wr(Tr((u=sr*o-lr*e)*u+(u=lr*r-ar*o)*u+(u=ar*e-sr*r)*u),ar*r+sr*e+lr*o);Ji+=u,Vi+=u*(ar+(ar=r)),tr+=u*(sr+(sr=e)),nr+=u*(lr+(lr=o)),L(ar,sr,lr)}function D(){zr.point=F}function H(){zr.point=W}function G(){B(or,ur),zr.point=F}function W(t,n){or=t,ur=n,t*=gr,n*=gr,zr.point=B;var i=Er(n);ar=i*Er(t),sr=i*kr(t),lr=kr(n),L(ar,sr,lr)}function B(t,n){t*=gr,n*=gr;var i=Er(n),r=i*Er(t),e=i*kr(t),o=kr(n),u=sr*o-lr*e,a=lr*r-ar*o,s=ar*e-sr*r,l=Tr(u*u+a*a+s*s),c=ar*r+sr*e+lr*o,h=l&&-x(c)/l,f=wr(l,c);ir+=h*u,rr+=h*a,er+=h*s,Ji+=f,Vi+=f*(ar+(ar=r)),tr+=f*(sr+(sr=e)),nr+=f*(lr+(lr=o)),L(ar,sr,lr)}function X(t,n){return[t>pr?t-dr:t<-pr?t+dr:t,n]}function Q(t,n,i){return(t%=dr)?n||i?jr(Z(t),J(n,i)):Z(t):n||i?J(n,i):X}function U(t){return function(n,i){return n+=t,[n>pr?n-dr:n<-pr?n+dr:n,i]}}function Z(t){var n=U(t);return n.invert=U(-t),n}function J(t,n){function i(t,n){var i=Er(n),a=Er(t)*i,s=kr(t)*i,l=kr(n),c=l*r+a*e;return[wr(s*o-c*u,a*r-l*e),m(c*o+s*u)]}var r=Er(t),e=kr(t),o=Er(n),u=kr(n);return i.invert=function(t,n){var i=Er(n),a=Er(t)*i,s=kr(t)*i,l=kr(n),c=l*o-s*u;return[wr(s*o+l*u,a*r+c*e),m(c*r-a*e)]},i}function Y(t,n,i,r,e,o){if(i){var u=Er(n),a=kr(n),s=r*i;null==e?(e=n+r*dr,o=n-s/2):(e=$(u,e),o=$(u,o),(r>0?e<o:e>o)&&(e+=r*dr));for(var l,c=e;r>0?c>o:c<o;c-=s)l=k([u,-a*Er(c),-a*kr(c)]),t.point(l[0],l[1])}}function $(t,n){n=T(n),n[0]-=t,z(n);var i=x(-n[1]);return((-n[2]<0?-i:i)+dr-hr)%dr}function K(t,n,i,r){this.x=t,this.z=n,this.o=i,this.e=r,this.v=!1,this.n=this.p=null}function V(t){if(n=t.length){for(var n,i,r=0,e=t[0];++r<n;)e.n=i=t[r],i.p=e,e=i;e.n=i=t[0],i.p=e}}function tt(t){return function(n,i){return Qr(t(n),i)}}function nt(t,n,i,r){function e(e,o){return t<=e&&e<=i&&n<=o&&o<=r}function o(e,o,a,l){var c=0,h=0;if(null==e||(c=u(e,a))!==(h=u(o,a))||s(e,o)<0^a>0){do l.point(0===c||3===c?t:i,c>1?r:n);while((c=(c+a+4)%4)!==h)}else l.point(o[0],o[1])}function u(r,e){return xr(r[0]-t)<hr?e>0?0:3:xr(r[0]-i)<hr?e>0?2:1:xr(r[1]-n)<hr?e>0?1:0:e>0?3:2}function a(t,n){return s(t.x,n.x)}function s(t,n){var i=u(t,1),r=u(n,1);return i!==r?i-r:0===i?n[1]-t[1]:1===i?t[0]-n[0]:2===i?t[1]-n[1]:n[0]-t[0]}return function(u){function s(t,n){e(t,n)&&k.point(t,n)}function l(){for(var n=0,i=0,e=d.length;i<e;++i)for(var o,u,a=d[i],s=1,l=a.length,c=a[0],h=c[0],f=c[1];s<l;++s)o=h,u=f,c=a[s],h=c[0],f=c[1],u<=r?f>r&&(h-o)*(r-u)>(f-u)*(t-o)&&++n:f<=r&&(h-o)*(r-u)<(f-u)*(t-o)&&--n;return n}function c(){k=T,v=[],d=[],S=!0}function h(){var t=l(),n=S&&t,i=(v=Kr(v)).length;(n||i)&&(u.polygonStart(),n&&(u.lineStart(),o(null,null,1,u),u.lineEnd()),i&&Xr(v,a,t,o,u),u.polygonEnd()),k=u,v=d=y=null}function f(){N.point=_,d&&d.push(y=[]),M=!0,b=!1,w=E=NaN}function p(){v&&(_(g,x),m&&b&&T.rejoin(),v.push(T.result())),N.point=s,b&&k.lineEnd()}function _(o,u){var a=e(o,u);if(d&&y.push([o,u]),M)g=o,x=u,m=a,M=!1,a&&(k.lineStart(),k.point(o,u));else if(a&&b)k.point(o,u);else{var s=[w=Math.max(te,Math.min(Vr,w)),E=Math.max(te,Math.min(Vr,E))],l=[o=Math.max(te,Math.min(Vr,o)),u=Math.max(te,Math.min(Vr,u))];Wr(s,l,t,n,i,r)?(b||(k.lineStart(),k.point(s[0],s[1])),k.point(l[0],l[1]),a||k.lineEnd(),S=!1):a&&(k.lineStart(),k.point(o,u),S=!1)}w=o,E=u,b=a}var v,d,y,g,x,m,w,E,b,M,S,k=u,T=Gr(),N={point:s,lineStart:f,lineEnd:p,polygonStart:c,polygonEnd:h};return N}}function it(t,n,i){var r=Yr(t,n-hr,i).concat(n);return function(t){return r.map(function(n){return[t,n]})}}function rt(t,n,i){var r=Yr(t,n-hr,i).concat(n);return function(t){return r.map(function(n){return[n,t]})}}function et(){oe.point=ot}function ot(t,n){oe.point=ut,qr=Lr=t,Fr=Rr=n}function ut(t,n){ee.add(Rr*t-Lr*n),Lr=t,Rr=n}function at(){ut(qr,Fr)}function st(t,n){t<ue&&(ue=t),t>se&&(se=t),n<ae&&(ae=n),n>le&&(le=n)}function lt(t,n){he+=t,fe+=n,++pe}function ct(){me.point=ht}function ht(t,n){me.point=ft,lt(Dr=t,Hr=n)}function ft(t,n){var i=t-Dr,r=n-Hr,e=Tr(i*i+r*r);_e+=e*(Dr+t)/2,ve+=e*(Hr+n)/2,de+=e,lt(Dr=t,Hr=n)}function pt(){me.point=lt}function _t(){me.point=dt}function vt(){yt(Or,Ir)}function dt(t,n){me.point=yt,lt(Or=Dr=t,Ir=Hr=n)}function yt(t,n){var i=t-Dr,r=n-Hr,e=Tr(i*i+r*r);_e+=e*(Dr+t)/2,ve+=e*(Hr+n)/2,de+=e,e=Hr*t-Dr*n,ye+=e*(Dr+t),ge+=e*(Hr+n),xe+=3*e,lt(Dr=t,Hr=n)}function gt(t){this._context=t}function xt(){this._string=[]}function mt(t){return"m0,"+t+"a"+t+","+t+" 0 1,1 0,"+-2*t+"a"+t+","+t+" 0 1,1 0,"+2*t+"z"}function wt(t){return t.length>1}function Et(t,n){return((t=t.x)[0]<0?t[1]-_r-hr:_r-t[1])-((n=n.x)[0]<0?n[1]-_r-hr:_r-n[1])}function bt(t){var n,i=NaN,r=NaN,e=NaN;return{lineStart:function(){t.lineStart(),n=1},point:function(o,u){var a=o>0?pr:-pr,s=xr(o-i);xr(s-pr)<hr?(t.point(i,r=(r+u)/2>0?_r:-_r),t.point(e,r),t.lineEnd(),t.lineStart(),t.point(a,r),t.point(o,r),n=0):e!==a&&s>=pr&&(xr(i-e)<hr&&(i-=e*hr),xr(o-a)<hr&&(o-=a*hr),r=Mt(i,r,o,u),t.point(e,r),t.lineEnd(),t.lineStart(),t.point(a,r),n=0),t.point(i=o,r=u),e=a},lineEnd:function(){t.lineEnd(),i=r=NaN},clean:function(){return 2-n}}}function Mt(t,n,i,r){var e,o,u=kr(t-i);return xr(u)>hr?mr((kr(n)*(o=Er(r))*kr(i)-kr(r)*(e=Er(n))*kr(t))/(e*o*u)):(n+r)/2}function St(t,n,i,r){var e;if(null==t)e=i*_r,r.point(-pr,e),r.point(0,e),r.point(pr,e),r.point(pr,0),r.point(pr,-e),r.point(0,-e),r.point(-pr,-e),r.point(-pr,0),r.point(-pr,e);else if(xr(t[0]-n[0])>hr){var o=t[0]<n[0]?pr:-pr;e=i*o/2,r.point(-o,e),r.point(0,e),r.point(o,e)}else r.point(n[0],n[1])}function kt(t){function n(){}var i=n.prototype=Object.create(Tt.prototype);for(var r in t)i[r]=t[r];return function(t){var i=new n;return i.stream=t,i}}function Tt(){}function Nt(t,n,i){var r=n[1][0]-n[0][0],e=n[1][1]-n[0][1],o=t.clipExtent&&t.clipExtent();t.scale(150).translate([0,0]),null!=o&&t.clipExtent(null),Cr(i,t.stream(ce));var u=ce.result(),a=Math.min(r/(u[1][0]-u[0][0]),e/(u[1][1]-u[0][1])),s=+n[0][0]+(r-a*(u[1][0]+u[0][0]))/2,l=+n[0][1]+(e-a*(u[1][1]+u[0][1]))/2;return null!=o&&t.clipExtent(o),t.scale(150*a).translate([s,l])}function Pt(t){return function(n,i){return Nt(t,[[0,0],n],i)}}function At(t){return function(n,i){return Nt(t,n,i)}}function Ct(t){return kt({point:function(n,i){n=t(n,i),this.stream.point(n[0],n[1])}})}function zt(t,n){function i(r,e,o,u,a,s,l,c,h,f,p,_,v,d){var y=l-r,g=c-e,x=y*y+g*g;if(x>4*n&&v--){var w=u+f,E=a+p,b=s+_,M=Tr(w*w+E*E+b*b),S=m(b/=M),k=xr(xr(b)-1)<hr||xr(o-h)<hr?(o+h)/2:wr(E,w),T=t(k,S),N=T[0],P=T[1],A=N-r,C=P-e,z=g*A-y*C;(z*z/x>n||xr((y*A+g*C)/x-.5)>.3||u*f+a*p+s*_<Ne)&&(i(r,e,o,u,a,s,N,P,k,w/=M,E/=M,b,v,d),d.point(N,P),i(N,P,k,w,E,b,l,c,h,f,p,_,v,d))}}return function(n){function r(i,r){i=t(i,r),n.point(i[0],i[1])}function e(){y=NaN,E.point=o,n.lineStart()}function o(r,e){var o=T([r,e]),u=t(r,e);i(y,g,d,x,m,w,y=u[0],g=u[1],d=r,x=o[0],m=o[1],w=o[2],Te,n),n.point(y,g)}function u(){E.point=r,n.lineEnd()}function a(){e(),E.point=s,E.lineEnd=l}function s(t,n){o(c=t,n),h=y,f=g,p=x,_=m,v=w,E.point=o}function l(){i(y,g,d,x,m,w,h,f,c,p,_,v,Te,n),E.lineEnd=u,u()}var c,h,f,p,_,v,d,y,g,x,m,w,E={point:r,lineStart:e,lineEnd:u,polygonStart:function(){n.polygonStart(),E.lineStart=a},polygonEnd:function(){n.polygonEnd(),E.lineStart=e}};return E}}function jt(t){return qt(function(){return t})()}function qt(t){function n(t){return t=c(t[0]*gr,t[1]*gr),[t[0]*d+a,s-t[1]*d]}function i(t){return t=c.invert((t[0]-a)/d,(s-t[1])/d),t&&[t[0]*yr,t[1]*yr]}function r(t,n){return t=u(t,n),[t[0]*d+a,s-t[1]*d]}function e(){c=jr(l=Q(w,E,b),u);var t=u(x,m);return a=y-t[0]*d,s=g+t[1]*d,o()}function o(){return _=v=null,n}var u,a,s,l,c,h,f,p,_,v,d=150,y=480,g=250,x=0,m=0,w=0,E=0,b=0,M=null,S=Se,k=null,T=ie,N=.5,P=Pe(r,N);return n.stream=function(t){return _&&v===t?_:_=Ae(S(l,P(T(v=t))))},n.clipAngle=function(t){return arguments.length?(S=+t?ke(M=t*gr,6*gr):(M=null,Se),o()):M*yr},n.clipExtent=function(t){return arguments.length?(T=null==t?(k=h=f=p=null,ie):nt(k=+t[0][0],h=+t[0][1],f=+t[1][0],p=+t[1][1]),o()):null==k?null:[[k,h],[f,p]]},n.scale=function(t){return arguments.length?(d=+t,e()):d},n.translate=function(t){return arguments.length?(y=+t[0],g=+t[1],e()):[y,g]},n.center=function(t){return arguments.length?(x=t[0]%360*gr,m=t[1]%360*gr,e()):[x*yr,m*yr]},n.rotate=function(t){return arguments.length?(w=t[0]%360*gr,E=t[1]%360*gr,b=t.length>2?t[2]%360*gr:0,e()):[w*yr,E*yr,b*yr]},n.precision=function(t){return arguments.length?(P=Pe(r,N=t*t),o()):Tr(N)},n.fitExtent=At(n),n.fitSize=Pt(n),function(){return u=t.apply(this,arguments),n.invert=u.invert&&i,e()}}function Ft(t){var n=0,i=pr/3,r=qt(t),e=r(n,i);return e.parallels=function(t){return arguments.length?r(n=t[0]*gr,i=t[1]*gr):[n*yr,i*yr]},e}function Lt(t,n){function i(t,n){var i=Tr(o-2*e*kr(n))/e;return[i*kr(t*=e),u-i*Er(t)]}var r=kr(t),e=(r+kr(n))/2,o=1+r*(2*e-r),u=Tr(o)/e;return i.invert=function(t,n){var i=u-n;return[wr(t,i)/e,m((o-(t*t+i*i)*e*e)/(2*e))]},i}function Rt(t){var n=t.length;return{point:function(i,r){for(var e=-1;++e<n;)t[e].point(i,r)},sphere:function(){for(var i=-1;++i<n;)t[i].sphere()},lineStart:function(){for(var i=-1;++i<n;)t[i].lineStart()},lineEnd:function(){for(var i=-1;++i<n;)t[i].lineEnd()},polygonStart:function(){for(var i=-1;++i<n;)t[i].polygonStart()},polygonEnd:function(){for(var i=-1;++i<n;)t[i].polygonEnd()}}}function Ot(t){return function(n,i){var r=Er(n),e=Er(i),o=t(r*e);return[o*e*kr(n),o*kr(i)]}}function It(t){return function(n,i){var r=Tr(n*n+i*i),e=t(r),o=kr(e),u=Er(e);return[wr(n*o,r*u),m(r&&i*o/r)]}}function Dt(t,n){return[t,Sr(Nr((_r+n)/2))]}function Ht(t){var n,i=jt(t),r=i.scale,e=i.translate,o=i.clipExtent;return i.scale=function(t){return arguments.length?(r(t),n&&i.clipExtent(null),i):r()},i.translate=function(t){return arguments.length?(e(t),n&&i.clipExtent(null),i):e()},i.clipExtent=function(t){if(!arguments.length)return n?null:o();if(n=null==t){var u=pr*r(),a=e();t=[[a[0]-u,a[1]-u],[a[0]+u,a[1]+u]]}return o(t),i},i.clipExtent(null)}function Gt(t,n){return[t,n]}function Wt(t,n){var i=Er(n),r=Er(t)*i;return[i*kr(t)/r,kr(n)/r]}function Bt(t,n){return[Er(n)*kr(t),kr(n)]}function Xt(t,n){return[Sr(Nr((_r+n)/2)),-t]}function Qt(){this._x0=this._y0=this._x1=this._y1=null,this._=[]}function Ut(){return new Qt}function Zt(t){this._context=t}function Jt(t){return t[0]}function Yt(t){return t[1]}function $t(t){this._curve=t}function Kt(t){function n(n){return new $t(t(n))}return n._curve=t,n}function Vt(t,n,i){t._context.bezierCurveTo((2*t._x0+t._x1)/3,(2*t._y0+t._y1)/3,(t._x0+2*t._x1)/3,(t._y0+2*t._y1)/3,(t._x0+4*t._x1+n)/6,(t._y0+4*t._y1+i)/6)}function tn(t){this._context=t}function nn(t,n){this._basis=new tn(t),this._beta=n}function rn(t,n,i){t._context.bezierCurveTo(t._x1+t._k*(t._x2-t._x0),t._y1+t._k*(t._y2-t._y0),t._x2+t._k*(t._x1-n),t._y2+t._k*(t._y1-i),t._x2,t._y2)}function en(t,n){this._context=t,this._k=(1-n)/6}function on(t,n){this._context=t,this._k=(1-n)/6}function un(t,n){this._context=t,this._k=(1-n)/6}function an(t,n,i){var r=t._x1,e=t._y1,o=t._x2,u=t._y2;if(t._l01_a>Be){var a=2*t._l01_2a+3*t._l01_a*t._l12_a+t._l12_2a,s=3*t._l01_a*(t._l01_a+t._l12_a);r=(r*a-t._x0*t._l12_2a+t._x2*t._l01_2a)/s,e=(e*a-t._y0*t._l12_2a+t._y2*t._l01_2a)/s}if(t._l23_a>Be){var l=2*t._l23_2a+3*t._l23_a*t._l12_a+t._l12_2a,c=3*t._l23_a*(t._l23_a+t._l12_a);o=(o*l+t._x1*t._l23_2a-n*t._l12_2a)/c,u=(u*l+t._y1*t._l23_2a-i*t._l12_2a)/c}t._context.bezierCurveTo(r,e,o,u,t._x2,t._y2)}function sn(t,n){this._context=t,this._alpha=n}function ln(t,n){this._context=t,this._alpha=n}function cn(t,n){this._context=t,this._alpha=n}function hn(t){return t<0?-1:1}function fn(t,n,i){var r=t._x1-t._x0,e=n-t._x1,o=(t._y1-t._y0)/(r||e<0&&-0),u=(i-t._y1)/(e||r<0&&-0),a=(o*e+u*r)/(r+e);return(hn(o)+hn(u))*Math.min(Math.abs(o),Math.abs(u),.5*Math.abs(a))||0}function pn(t,n){var i=t._x1-t._x0;return i?(3*(t._y1-t._y0)/i-n)/2:n}function _n(t,n,i){var r=t._x0,e=t._y0,o=t._x1,u=t._y1,a=(o-r)/3;t._context.bezierCurveTo(r+a,e+a*n,o-a,u-a*i,o,u)}function vn(t){this._context=t}function dn(t){this._context=new yn(t)}function yn(t){this._context=t}function gn(t){this._context=t}function xn(t){var n,i,r=t.length-1,e=new Array(r),o=new Array(r),u=new Array(r);for(e[0]=0,o[0]=2,u[0]=t[0]+2*t[1],n=1;n<r-1;++n)e[n]=1,o[n]=4,u[n]=4*t[n]+2*t[n+1];for(e[r-1]=2,o[r-1]=7,u[r-1]=8*t[r-1]+t[r],n=1;n<r;++n)i=e[n]/o[n-1],o[n]-=i,u[n]-=i*u[n-1];for(e[r-1]=u[r-1]/o[r-1],n=r-2;n>=0;--n)e[n]=(u[n]-e[n+1])/o[n];for(o[r-1]=(t[r]+e[r-1])/2,n=0;n<r-1;++n)o[n]=2*t[n+1]-e[n+1];return[e,o]}function mn(t){if(!t)return ro;var n,i,r=t.scale[0],e=t.scale[1],o=t.translate[0],u=t.translate[1];return function(t,a){a||(n=i=0),t[0]=(n+=t[0])*r+o,t[1]=(i+=t[1])*e+u}}function wn(t,n){for(var i,r=t.length,e=r-n;e<--r;)i=t[e],t[e++]=t[r],t[r]=i}function En(t,n){for(var i=0,r=t.length;i<r;){var e=i+r>>>1;t[e]<n?i=e+1:r=e}return i}function bn(t,n){var i={type:"Feature",id:n.id,properties:n.properties||{},geometry:Mn(t,n)};return null==n.id&&delete i.id,i}function Mn(t,n){function i(t,n){n.length&&n.pop();for(var i,r=l[t<0?~t:t],e=0,o=r.length;e<o;++e)n.push(i=r[e].slice()),s(i,e);t<0&&wn(n,o)}function r(t){return t=t.slice(),s(t,0),t}function e(t){for(var n=[],r=0,e=t.length;r<e;++r)i(t[r],n);return n.length<2&&n.push(n[0].slice()),n}function o(t){for(var n=e(t);n.length<4;)n.push(n[0].slice());return n}function u(t){return t.map(o)}function a(t){var n=t.type;return"GeometryCollection"===n?{type:n,geometries:t.geometries.map(a)}:n in c?{type:n,coordinates:c[n](t)}:null}var s=mn(t.transform),l=t.arcs,c={Point:function(t){return r(t.coordinates)},MultiPoint:function(t){return t.coordinates.map(r)},LineString:function(t){return e(t.arcs)},MultiLineString:function(t){return t.arcs.map(e)},Polygon:function(t){return u(t.arcs)},MultiPolygon:function(t){return t.arcs.map(u)}};return a(n)}function Sn(t,n,i){function r(t){var n=t<0?~t:t;(l[n]||(l[n]=[])).push({i:t,g:s})}function e(t){t.forEach(r)}function o(t){t.forEach(e)}function u(t){"GeometryCollection"===t.type?t.geometries.forEach(u):t.type in c&&(s=t,c[t.type](t.arcs))}var a=[];if(arguments.length>1){var s,l=[],c={LineString:e,MultiLineString:o,Polygon:o,MultiPolygon:function(t){t.forEach(o)}};u(n),l.forEach(arguments.length<3?function(t){a.push(t[0].i)}:function(t){i(t[0].g,t[t.length-1].g)&&a.push(t[0].i)})}else for(var h=0,f=t.arcs.length;h<f;++h)a.push(h);return{type:"MultiLineString",arcs:oo(t,a)}}function kn(t){return t?t/Math.sin(t):1}function Tn(t){return t>1?So:t<-1?-So:Math.asin(t)}function Nn(t){return t>1?0:t<-1?Mo:Math.acos(t)}function Pn(t){return t>0?Math.sqrt(t):0}function An(t){return t=fo(2*t),(t-1)/(t+1)}function Cn(t){return(fo(t)-fo(-t))/2}function zn(t){return(fo(t)+fo(-t))/2}function jn(t){return _o(t+Pn(t*t+1))}function qn(t){return _o(t+Pn(t*t-1))}function Fn(t,n){var i=ho(n),r=kn(Nn(i*ho(t/=2)));return[2*i*mo(t)*r,mo(n)*r]}function Ln(t,n){var i=wo(n/2),r=Pn(1-i*i),e=1+r*ho(t/=2),o=mo(t)*r/e,u=i/e,a=o*o,s=u*u;return[4/3*o*(3+a-3*s),4/3*u*(3+3*a-s)]}function Rn(t,n){var i=so(n);return i<ko?[t,_o(wo(ko+n/2))]:[t*ho(i)*(2*No-1/mo(i)),xo(n)*(2*No*(i-ko)-_o(wo(i/2)))]}function On(t,n){var i,r=t*mo(n),e=30;do n-=i=(n+mo(n)-r)/(1+ho(n));while(so(i)>Eo&&--e>0);return n/2}function In(t,n,i){function r(r,e){return[t*r*ho(e=On(i,e)),n*mo(e)]}return r.invert=function(r,e){return e=Tn(e/n),[r/(t*ho(e)),Tn((2*e+mo(2*e))/i)]},r}function Dn(t,n){var i=On(Mo,n);return[Fo*t/(1/ho(n)+Lo/ho(i)),(n+No*mo(i))/Fo]}function Hn(t,n){return[t*ho(n),n]}function Gn(t,n){var i=Pn(1-mo(n));return[2/Po*t*i,Po*(1-i)]}function Wn(t){function n(t,n){return[t*i,mo(n)/i]}var i=ho(t);return n.invert=function(t,n){return[t/i,Tn(n*i)]},n}function Bn(t,n){var i=Pn(4-3*mo(so(n)));return[2/Pn(6*Mo)*t*i,xo(n)*Pn(2*Mo/3)*(2-i)]}function Xn(t,n){for(var i=(1+So)*mo(n),r=0,e=1/0;r<10&&so(e)>Eo;r++)n-=e=(n+mo(n)-i)/(1+ho(n));return i=Pn(2+Mo),[t*(1+ho(n))/i,2*n/i]}function Qn(t,n){var i=mo(t/=2),r=ho(t),e=Pn(ho(n)),o=ho(n/=2),u=mo(n)/(o+No*r*e),a=Pn(2/(1+u*u)),s=Pn((No*o+(r+i)*e)/(No*o+(r-i)*e));return[Ro*(a*(s-1/s)-2*_o(s)),Ro*(a*u*(s+1/s)-2*lo(u))]}function Un(t,n){var i=t*t,r=n*n;return[t*(1-.162388*r)*(.87-952426e-9*i*i),n*(1+r/12)]}function Zn(t,n){var i=xo(t),r=xo(n),e=ho(n),o=ho(t)*e,u=mo(t)*e,a=mo(r*n);t=so(co(u,a)),n=Tn(o),so(t-So)>Eo&&(t%=So);var s=Jn(t>Mo/4?So-t:t,n);return t>Mo/4&&(a=s[0],s[0]=-s[1],s[1]=-a),s[0]*=i,s[1]*=-r,s}function Jn(t,n){if(n===So)return[0,0];var i,r,e=mo(n),o=e*e,u=o*o,a=1+u,s=1+3*u,l=1-u,c=Tn(1/Pn(a)),h=l+o*a*c,f=(1-e)/h,p=Pn(f),_=f*a,v=Pn(_),d=p*l;if(0===t)return[0,-(d+o*v)];var y,g=ho(n),x=1/g,m=2*e*g,w=(-3*o+c*s)*m,E=(-h*g-(1-e)*w)/(h*h),b=.5*E/p,M=l*b-2*o*p*m,S=o*a*E+f*s*m,k=-x*m,T=-x*S,N=-2*x*M,P=4*t/Mo;if(t>.222*Mo||n<Mo/4&&t>.175*Mo){if(i=(d+o*Pn(_*(1+u)-d*d))/(1+u),t>Mo/4)return[i,i];var A=i,C=.5*i;i=.5*(C+A),r=50;do{var z=Pn(_-i*i),j=i*(N+k*z)+T*Tn(i/v)-P;if(!j)break;j<0?C=i:A=i,i=.5*(C+A)}while(so(A-C)>Eo&&--r>0)}else{i=Eo,r=25;do{var q=i*i,F=Pn(_-q),L=N+k*F,R=i*L+T*Tn(i/v)-P,O=L+(T-k*q)/F;i-=y=F?R/O:0}while(so(y)>Eo&&--r>0)}return[i,-d-o*Pn(_-i*i)]}function Yn(t,n){for(var i=0,r=1,e=.5,o=50;;){var u=e*e,a=Pn(e),s=Tn(1/Pn(1+u)),l=1-u+e*(1+u)*s,c=(1-a)/l,h=Pn(c),f=c*(1+u),p=h*(1-u),_=f-t*t,v=Pn(_),d=n+p+e*v;if(so(r-i)<bo||0===--o||0===d)break;d>0?i=e:r=e,e=.5*(i+r)}if(!o)return null;var y=Tn(a),g=ho(y),x=1/g,m=2*a*g,w=(-3*e+s*(1+3*u))*m,E=(-l*g-(1-a)*w)/(l*l),b=.5*E/h,M=(1-u)*b-2*e*h*m,S=-2*x*M,k=-x*m,T=-x*(e*(1+u)*E+c*(1+3*u)*m);return[Mo/4*(t*(S+k*v)+T*Tn(t/Pn(f))),y]}function $n(t,n,i){var r,e,o;return t?(r=Kn(t,i),n?(e=Kn(n,1-i),o=e[1]*e[1]+i*r[0]*r[0]*e[0]*e[0],[[r[0]*e[2]/o,r[1]*r[2]*e[0]*e[1]/o],[r[1]*e[1]/o,-r[0]*r[2]*e[0]*e[2]/o],[r[2]*e[1]*e[2]/o,-i*r[0]*r[1]*e[0]/o]]):[[r[0],0],[r[1],0],[r[2],0]]):(e=Kn(n,1-i),[[0,e[0]/e[1]],[1/e[1],0],[e[2]/e[1],0]])}function Kn(t,n){var i,r,e,o,u;if(n<Eo)return o=mo(t),r=ho(t),i=n*(t-o*r)/4,[o-i*r,r+i*o,1-n*o*o/2,t-i];if(n>=1-Eo)return i=(1-n)/4,r=zn(t),o=An(t),e=1/r,u=r*Cn(t),[o+i*(u-t)/(r*r),e-i*o*e*(u-t),e+i*o*e*(u+t),2*lo(fo(t))-So+i*(u-t)/r];var a=[1,0,0,0,0,0,0,0,0],s=[Pn(n),0,0,0,0,0,0,0,0],l=0;for(r=Pn(1-n),u=1;so(s[l]/a[l])>Eo&&l<8;)i=a[l++],s[l]=(i-r)/2,a[l]=(i+r)/2,r=Pn(i*r),u*=2;e=u*a[l]*t;do o=s[l]*mo(r=e)/a[l],e=(Tn(o)+e)/2;while(--l);return[mo(e),o=ho(e),o/ho(e-r),e]}function Vn(t,n,i){var r=so(t),e=so(n),o=Cn(e);if(r){var u=1/mo(r),a=1/(wo(r)*wo(r)),s=-(a+i*(o*o*u*u)-1+i),l=(i-1)*a,c=(-s+Pn(s*s-4*l))/2;return[ti(lo(1/Pn(c)),i)*xo(t),ti(lo(Pn((c/a-1)/i)),1-i)*xo(n)]}return[0,ti(lo(o),1-i)*xo(n)]}function ti(t,n){if(!n)return t;if(1===n)return _o(wo(t/2+ko));for(var i=1,r=Pn(1-n),e=Pn(n),o=0;so(e)>Eo;o++){if(t%Mo){var u=lo(r*wo(t)/i);u<0&&(u+=Mo),t+=u+~~(t/Mo)*Mo}else t+=t;e=(i+r)/2,r=Pn(i*r),e=((i=e)-r)/2}return t/(go(2,o)*i)}function ni(t,n){var i=(No-1)/(No+1),r=Pn(1-i*i),e=ti(So,r*r),o=-1,u=_o(wo(Mo/4+so(n)/2)),a=fo(o*u)/Pn(i),s=ii(a*ho(o*t),a*mo(o*t)),l=Vn(s[0],s[1],r*r);return[-l[1],(n>=0?1:-1)*(.5*e-l[0])]}function ii(t,n){var i=t*t,r=n+1,e=1-i-n*n;return[.5*((t>=0?So:-So)-co(e,2*t)),-.25*_o(e*e+4*i)+.5*_o(r*r+i)]}function ri(t,n){var i=n[0]*n[0]+n[1]*n[1];return[(t[0]*n[0]+t[1]*n[1])/i,(t[1]*n[0]-t[0]*n[1])/i]}function ei(t,n){return[t*ho(n)/ho(n/=2),2*mo(n)]}function oi(t,n){return n>-Wo?(t=qo(t,n),t[1]+=Bo,t):Hn(t,n)}function ui(t,n){return so(n)>Wo?(t=qo(t,n),t[1]-=n>0?Bo:-Bo,t):Hn(t,n)}function ai(t,n){return so(t[0]-n[0])<Eo&&so(t[1]-n[1])<Eo}function si(t,n){for(var i,r,e,o=-1,u=t.length,a=t[0],s=[];++o<u;){i=t[o],r=(i[0]-a[0])/n,e=(i[1]-a[1])/n;for(var l=0;l<n;++l)s.push([a[0]+l*r,a[1]+l*e]);a=i}return s.push(i),s}function li(t){var n,i,r,e,o,u,a,s=[],l=t[0].length;for(a=0;a<l;++a)n=t[0][a],i=n[0][0],r=n[0][1],e=n[1][1],o=n[2][0],u=n[2][1],s.push(si([[i+Eo,r+Eo],[i+Eo,e-Eo],[o-Eo,e-Eo],[o-Eo,u+Eo]],30));for(a=t[1].length-1;a>=0;--a)n=t[1][a],i=n[0][0],r=n[0][1],e=n[1][1],o=n[2][0],u=n[2][1],s.push(si([[o-Eo,u-Eo],[o-Eo,e+Eo],[i+Eo,e+Eo],[i+Eo,r-Eo]],30));return{type:"Polygon",coordinates:[Kr(s)]}}function ci(t,n){var i=t*t,r=n*n;return[t*(.975534+r*(-.119161+i*-.0143059+r*-.0547009)),n*(1.00384+i*(.0802894+r*-.02855+199025e-9*i)+r*(.0998909+r*-.0491032))]}function hi(t,n){return[mo(t)/ho(n),wo(n)*ho(t)]}function fi(t,n){var i=n*n,r=i*i;return[t*(.8707-.131979*i+r*(-.013791+r*(.003971*i-.001529*r))),n*(1.007226+i*(.015085+r*(-.044475+.028874*i-.005916*r)))]}function pi(t,n){var i=n*n;return[t,n*(Ko+i*i*(Vo+i*(tu+nu*i)))]}function _i(t,n){if(so(n)<Eo)return[t,0];var i=wo(n),r=t*mo(n);return[mo(r)/i,n+(1-ho(r))/i]}function vi(t,n){var i,r=yo(18,36*so(n)/Mo),e=po(r),o=r-e,u=(i=lu[e])[0],a=i[1],s=(i=lu[++e])[0],l=i[1],c=(i=lu[yo(19,++e)])[0],h=i[1];return[t*(s+o*(c-u)/2+o*o*(c-2*s+u)/2),(n>0?So:-So)*(l+o*(h-a)/2+o*o*(h-2*l+a)/2)]}function di(t,n){if(so(n)<Eo)return[t,0];var i=so(n/So),r=Tn(i);if(so(t)<Eo||so(so(n)-So)<Eo)return[0,xo(n)*Mo*wo(r/2)];var e=ho(r),o=so(Mo/t-t/Mo)/2,u=o*o,a=e/(i+e-1),s=a*(2/i-1),l=s*s,c=l+u,h=a-l,f=u+a;return[xo(t)*Mo*(o*h+Pn(u*h*h-c*(a*a-l)))/c,xo(n)*Mo*(s*f-o*Pn((u+1)*c-f*f))/c]}function yi(t,n){if(so(n)<Eo)return[t,0];var i=so(n/So),r=Tn(i);if(so(t)<Eo||so(so(n)-So)<Eo)return[0,xo(n)*Mo*wo(r/2)];var e=ho(r),o=so(Mo/t-t/Mo)/2,u=o*o,a=e*(Pn(1+u)-o*e)/(1+u*i*i);return[xo(t)*Mo*a,xo(n)*Mo*Pn(1-a*(2*o+a))]}function gi(t,n){if(so(n)<Eo)return[t,0];var i=n/So,r=Tn(i);if(so(t)<Eo||so(so(n)-So)<Eo)return[0,Mo*wo(r/2)];var e=(Mo/t-t/Mo)/2,o=i/(1+ho(r));return[Mo*(xo(t)*Pn(e*e+1-o*o)-e),Mo*o]}function xi(t,n){if(!n)return[t,0];var i=so(n);if(!t||i===So)return[0,n];var r=i/So,e=r*r,o=(8*r-e*(e+2)-5)/(2*e*(r-1)),u=o*o,a=r*o,s=e+u+2*a,l=r+3*o,c=t/So,h=c+1/c,f=xo(so(t)-So)*Pn(h*h-4),p=f*f,_=s*(e+u*p-1)+(1-e)*(e*(l*l+4*u)+12*a*u+4*u*u),v=(f*(s+u-1)+2*Pn(_))/(4*s+p);return[xo(t)*So*v,xo(n)*So*Pn(1+f*so(v)-v*v)]}function mi(t,n){var i=Fn(t,n);return[(i[0]+t/So)/2,(i[1]+n)/2]}function wi(t){function i(){p=o-c-s}function r(){_=u-a-l}function e(i){var r=i.selection?i.selection():i,s=void 0!==i.selection;r.each(function(){var r=n.select(this),l=r.select(e.self());if(l.empty()){var f=(null==t?"":t+"-")+"title",p=(null==t?"":t+"-")+"desc";l=r.append("svg").attr("version","1.1").attr("xmlns","http://www.w3.org/2000/svg").attr("xmlns:xlink","http://www.w3.org/1999/xlink").attr("preserveAspectRatio","xMidYMid meet").attr("aria-labelledby",f).attr("aria-describedby",p).attr("id",t),l.append("title").attr("id",f),l.append("desc").attr("id",p),l.append("defs"),l.append("rect").attr("class","background"),l.append("g").attr("class","svg-child")}var _=l.select("defs"),w=_.selectAll("style").data(v?[v]:[]);w.exit().remove(),w=w.enter().append("style").attr("type","text/css").merge(w),w.text(v),l.attr("role",x),l.select("title").text(y),l.select("desc").text(g);var E=l.select("rect.background").attr("width",null!=d?o*h:null).attr("height",null!=d?u*h:null);l.attr("class",m);var b=l.select(e.child());s===!0&&(l=l.transition(i),b=b.transition(i),E=E.transition(i)),l.attr("width",o*h).attr("height",u*h).attr("viewBox","0 0 "+o+" "+u),b.attr("transform","translate("+c+","+a+")"),E.attr("fill",d)})}var o=300,u=150,a=16,s=16,l=16,c=16,h=1,f="g.svg-child",p=-1,_=-1,v=null,d=null,y=null,g=null,x="img",m="svg-svg";return i(),r(),e.self=function(){return"svg"+(t?"#"+t:"")},e.child=function(){return f},e.childDefs=function(){return"defs"},e.childWidth=function(){return p},e.childHeight=function(){return _},e.id=function(){return t},e.classed=function(t){return arguments.length?(m=t,e):m},e.style=function(t){return arguments.length?(v=t,e):v},e.background=function(t){return arguments.length?(d=t,e):d},e.width=function(t){return arguments.length?(o=t,i(),e):o},e.height=function(t){return arguments.length?(u=t,r(),e):o},e.scale=function(t){return arguments.length?(h=t,e):h},e.title=function(t){return arguments.length?(y=t,e):y},e.desc=function(t){return arguments.length?(g=t,e):g},e.role=function(t){return arguments.length?(x=t,e):x},e.margin=function(t){return arguments.length?(void 0!==t.top?(a=t.top,s=t.right,l=t.bottom,c=t.left):(a=t,s=t,l=t,c=t),i(),r(),e):{top:a,right:s,bottom:l,left:c}},e}function Ei(t,n){return n={exports:{}},t(n,n.exports),n.exports}function bi(t){return t<414?"12px":"14px"}function Mi(t){return null==t?[]:Array.isArray(t)?t:[t]}function Si(t){function i(S){function k(){var t=function(){return d};if(null==d){var n=du.standard.filter(function(t,n){return n!==du.names.yellow&&n!==du.names.grey&&n!==du.names.brown});t=function(t,i,r){return n[(r+du.names.brown)%n.length]}}else"function"==typeof d?t=d:Array.isArray(d)&&(t=function(t,n,i){return d[i%d.length]});return t}var T=S.selection?S.selection():S,N=void 0!==S.selection,P=o;void 0===P&&(P=yu[e].background);var A=l;void 0===A&&(A=i.defaultStyle(e,u));var C=Mu,z=f;"string"==typeof z&&(C=Eu[z]||C,z=wu[z]);var j=a||Math.round(u*C.a),q=k(),F=b;void 0==F&&(F=function(t){t.attr("stroke",du.standard[du.names.yellow]).attr("stroke-width","2px").attr("stroke-dasharray","5,3")});var L=E;if(void 0===L&&(L=to),L&&"function"==typeof L.draw){var R=L;L=function(t){var i=no().type(R).size(ku);t.each(function(t){var r=n.select(this).selectAll("path").data([t]);r=r.enter().append("path").merge(r),r.attr("d",function(){return i()}).attr("opacity",.9).attr("stroke","#fff").attr("fill",du.darker[du.names.yellow]).attr("pointer-events","none").attr("stroke-width","0.5px")})}}T.each(function(){var e=n.select(this),o=null;t&&(o="svg-"+t);var a=wi(o).width(u).height(j).margin(s).scale(c).background(P).style(A),l=e;N===!0&&(l=e.transition(S)),l.call(a);var f=e.select(a.self()),d=f.select(a.child()),E=a.childWidth(),b=a.childHeight(),k=z().scale(p||E/C.s).translate([E/2,b/2]),T=we().projection(k),R="geo-clip-"+Tu,O="geo-shape-"+Tu,I=d.select(i.self());if(I.empty()){var D=f.select("defs");D.append("path").attr("id",R),D.append("clipPath").attr("id",O).append("use").attr("xlink:href","#"+R),I=d.append("g").attr("class",r).attr("id",t),I.append("use").attr("class","border").attr("pointer-events","none"),I.append("use").attr("class","fill").attr("pointer-events","none"),I.append("path").attr("class","land"),I.append("g").attr("class","country"),I.append("path").attr("class","boundary"),I.append("g").attr("class","links"),I.append("g").attr("class","points"),I.append("path").attr("class","graticule")}var H=I;N===!0&&(H=I.transition(S)),H.attr("transform","scale("+x+")translate("+(m?Math.round(-m+E/(2*x)):0)+","+(w?Math.round(-w+b/(2*x)):0)+")"),_?(f.select("#"+R).datum({type:"Sphere"}).attr("d",T),f.select("use.border").attr("xlink:href","#"+R),f.select("use.fill").attr("xlink:href","#"+R)):(f.select("#"+R).attr("d",null),f.select("use.border").attr("xlink:href",null),f.select("use.fill").attr("xlink:href",null)),I.select("path.graticule").datum(ne()).attr("clip-path",_?"url(#"+O+")":null).attr("d",T).attr("stroke-opacity",h);var G=I.datum()||{},W=null;W="string"==typeof G?new Promise(function(t,n){return zi(G,function(i,r){return i?n(i):t(r)})}):G.url?new Promise(function(t,n){return zi(G.url,function(i,r){return i?n(i):t(r)})}):Promise.resolve(G);var B=g||G.links||[],X=y||G.points||[];W.then(function(t){var r=t.objects||{},e=null;if(v){var o=eo(t,r.countries||{}).features,u=ao(r.countries.geometries),a=I.select("g.country").attr("clip-path",_?"url(#"+O+")":null).selectAll("path").data(o).enter().append("path");a.attr("d",T).attr("fill",function(t,n){return q(t,n,t.color=$r(u[n],function(t){return o[t].color})+1|0)}),I.select("path.land").attr("d",null),e=a}else{var s=I.select("path.land").datum(eo(t,r.land||{})).attr("clip-path",_?"url(#"+O+")":null).attr("fill",function(t,n){return q(t,n,n)}).attr("d",T);I.select("g.country").selectAll("path").attr("d",null),e=s}e.on("click",function(t,r){var e=null;e=t&&t.id?T.centroid(t):n.mouse(this),M&&M.apply(i,[t,r,e])}),f.select("rect.background").on("click",function(){M&&M.apply(i,[null,-1,n.mouse(this)])}),I.select("path.boundary").datum(uo(t,r.countries||{},function(t,n){return t!==n})).attr("clip-path",_?"url(#"+O+")":null).attr("d",T);var l=I.select("g.links").selectAll("path").data(B.map(function(t){return{type:"LineString",coordinates:[[t[0],t[1]],[t[2],t[3]]]}}));l.exit().remove(),l=l.enter().append("path").attr("fill","none").attr("pointer-events","none").merge(l),l.attr("d",T),F&&l.call(F);var c=I.select("g.points").selectAll("g").data(X);c.exit().remove(),c=c.enter().append("g").merge(c),c.attr("transform",function(t){var n=k(t);return"translate("+n[0]+", "+n[1]+")"}),L&&c.call(L)}).catch(function(t){console.error("d3-rs-geo error:",t.stack)})})}var r="chart-geo",e="light",o=void 0,u=bu,a=null,s=Su,l=void 0,c=1,h=.5,f="geoPatterson",p=null,_=!0,v=!1,d=null,y=null,g=null,x=1,m=void 0,w=void 0,E=void 0,b=void 0,M=null;return Tu+=1,i.self=function(){return"g"+(t?"#"+t:"."+r)},i.id=function(){return t},i.defaultStyle=function(t,n){return"\n                "+mu.variable.cssImport+" \n                "+i.self()+" text { \n                                      font-family: "+mu.variable.family+";\n                                      font-size: "+mu.variable.sizeForWidth(n)+";  \n                                      font-weight: "+mu.fixed.weightMonochrome+";  \n                                      fill: "+yu[t].text+";\n                                      text-anchor: middle;\n                                      dominant-baseline: central;              \n                                    }\n                                                    \n                "+i.self()+" .border {\n                      fill: none;\n                      stroke: "+yu[t].axis+";\n                      stroke-width: "+gu.axis+";\n                      stroke-linejoin: round;\n                      stroke-linecap: round;\n                      pointer-events: none;\n                    }\n                \n                "+i.self()+" .fill {\n                      fill: #010539;\n                    }\n\n                "+i.self()+" .graticule {\n                      fill: none;\n                      stroke: "+yu[t].grid+";\n                      stroke-width: 0.5px;\n                      pointer-events: none;\n                    }\n\n                  "+i.self()+" .boundary {\n                    fill: none;\n                    stroke: #fff;\n                    stroke-width: 0.5px;\n                    pointer-events: none;\n                  }\n                ";
	},i.classed=function(t){return arguments.length?(r=t,i):r},i.background=function(t){return arguments.length?(o=t,i):o},i.theme=function(t){return arguments.length?(e=t,i):e},i.size=function(t){return arguments.length?(u=t,a=null,i):u},i.width=function(t){return arguments.length?(u=t,i):u},i.height=function(t){return arguments.length?(a=t,i):a},i.scale=function(t){return arguments.length?(c=t,i):c},i.margin=function(t){return arguments.length?(s=t,i):s},i.graticule=function(t){return arguments.length?(h=t,i):h},i.projection=function(t){return arguments.length?(f=t,i):f},i.projectionScale=function(t){return arguments.length?(p=t,i):p},i.interrupted=function(t){return arguments.length?(_=t,i):_},i.country=function(t){return arguments.length?(v=t,i):v},i.fill=function(t){return arguments.length?(d=t,i):d},i.pointsDisplay=function(t){return arguments.length?(E=t,i):E},i.zoom=function(t){return arguments.length?(x=t,i):x},i.zoomX=function(t){return arguments.length?(m=t,i):m},i.zoomY=function(t){return arguments.length?(w=t,i):w},i.points=function(t){return arguments.length?(y=Mi(t),i):y},i.links=function(t){return arguments.length?(g=Mi(t),i):g},i.linksDisplay=function(t){return arguments.length?(b=t,i):b},i.onClick=function(t){return arguments.length?(M=t,i):M},i}var ki="0.0.2",Ti="$";i.prototype=r.prototype={constructor:i,has:function(t){return Ti+t in this},get:function(t){return this[Ti+t]},set:function(t,n){return this[Ti+t]=n,this},remove:function(t){var n=Ti+t;return n in this&&delete this[n]},clear:function(){var t=this;for(var n in this)n[0]===Ti&&delete t[n]},keys:function(){var t=[];for(var n in this)n[0]===Ti&&t.push(n.slice(1));return t},values:function(){var t=this,n=[];for(var i in this)i[0]===Ti&&n.push(t[i]);return n},entries:function(){var t=this,n=[];for(var i in this)i[0]===Ti&&n.push({key:i.slice(1),value:t[i]});return n},size:function(){var t=0;for(var n in this)n[0]===Ti&&++t;return t},empty:function(){for(var t in this)if(t[0]===Ti)return!1;return!0},each:function(t){var n=this;for(var i in this)i[0]===Ti&&t(n[i],i.slice(1),n)}};var Ni=r.prototype;e.prototype=o.prototype={constructor:e,has:Ni.has,add:function(t){return t+="",this[Ti+t]=t,this},remove:Ni.remove,clear:Ni.clear,values:Ni.keys,size:Ni.size,empty:Ni.empty,each:Ni.each};var Pi={value:function(){}};a.prototype=u.prototype={constructor:a,on:function(t,n){var i,r=this._,e=s(t+"",r),o=-1,u=e.length;{if(!(arguments.length<2)){if(null!=n&&"function"!=typeof n)throw new Error("invalid callback: "+n);for(;++o<u;)if(i=(t=e[o]).type)r[i]=c(r[i],t.name,n);else if(null==n)for(i in r)r[i]=c(r[i],t.name,null);return this}for(;++o<u;)if((i=(t=e[o]).type)&&(i=l(r[i],t.name)))return i}},copy:function(){var t={},n=this._;for(var i in n)t[i]=n[i].slice();return new a(t)},call:function(t,n){var i=arguments;if((r=arguments.length-2)>0)for(var r,e,o=new Array(r),u=0;u<r;++u)o[u]=i[u+2];if(!this._.hasOwnProperty(t))throw new Error("unknown type: "+t);for(e=this._[t],u=0,r=e.length;u<r;++u)e[u].value.apply(n,o)},apply:function(t,n,i){if(!this._.hasOwnProperty(t))throw new Error("unknown type: "+t);for(var r=this._[t],e=0,o=r.length;e<o;++e)r[e].value.apply(n,i)}};var Ai=function(t,n){function i(t){var n,i=p.status;if(!i&&f(p)||i>=200&&i<300||304===i){if(a)try{n=a.call(e,p)}catch(t){return void l.call("error",e,t)}else n=p;l.call("load",e,n)}else l.call("error",e,t)}var e,o,a,s,l=u("beforesend","progress","load","error"),c=r(),p=new XMLHttpRequest,_=null,v=null,d=0;if("undefined"==typeof XDomainRequest||"withCredentials"in p||!/^(http(s)?:)?\/\//.test(t)||(p=new XDomainRequest),"onload"in p?p.onload=p.onerror=p.ontimeout=i:p.onreadystatechange=function(t){p.readyState>3&&i(t)},p.onprogress=function(t){l.call("progress",e,t)},e={header:function(t,n){return t=(t+"").toLowerCase(),arguments.length<2?c.get(t):(null==n?c.remove(t):c.set(t,n+""),e)},mimeType:function(t){return arguments.length?(o=null==t?null:t+"",e):o},responseType:function(t){return arguments.length?(s=t,e):s},timeout:function(t){return arguments.length?(d=+t,e):d},user:function(t){return arguments.length<1?_:(_=null==t?null:t+"",e)},password:function(t){return arguments.length<1?v:(v=null==t?null:t+"",e)},response:function(t){return a=t,e},get:function(t,n){return e.send("GET",t,n)},post:function(t,n){return e.send("POST",t,n)},send:function(n,i,r){return p.open(n,t,!0,_,v),null==o||c.has("accept")||c.set("accept",o+",*/*"),p.setRequestHeader&&c.each(function(t,n){p.setRequestHeader(n,t)}),null!=o&&p.overrideMimeType&&p.overrideMimeType(o),null!=s&&(p.responseType=s),d>0&&(p.timeout=d),null==r&&"function"==typeof i&&(r=i,i=null),null!=r&&1===r.length&&(r=h(r)),null!=r&&e.on("error",r).on("load",function(t){r(null,t)}),l.call("beforesend",e,p),p.send(null==i?null:i),e},abort:function(){return p.abort(),e},on:function(){var t=l.on.apply(l,arguments);return t===l?e:t}},null!=n){if("function"!=typeof n)throw new Error("invalid callback: "+n);return e.get(n)}return e},Ci=function(t,n){return function(i,r){var e=Ai(i).mimeType(t).response(n);if(null!=r){if("function"!=typeof r)throw new Error("invalid callback: "+r);return e.get(r)}return e}};Ci("text/html",function(t){return document.createRange().createContextualFragment(t.responseText)});var zi=Ci("application/json",function(t){return JSON.parse(t.responseText)});Ci("text/plain",function(t){return t.responseText}),Ci("application/xml",function(t){var n=t.responseXML;if(!n)throw new Error("parse error");return n});var ji=function(t){function n(t,n){var r,e,o=i(t,function(t,i){return r?r(t,i-1):(e=t,void(r=n?_(t,n):p(t)))});return o.columns=e,o}function i(t,n){function i(){if(c>=l)return u;if(e)return e=!1,o;var n,i=c;if(34===t.charCodeAt(i)){for(var r=i;r++<l;)if(34===t.charCodeAt(r)){if(34!==t.charCodeAt(r+1))break;++r}return c=r+2,n=t.charCodeAt(r+1),13===n?(e=!0,10===t.charCodeAt(r+2)&&++c):10===n&&(e=!0),t.slice(i+1,r).replace(/""/g,'"')}for(;c<l;){var a=1;if(n=t.charCodeAt(c++),10===n)e=!0;else if(13===n)e=!0,10===t.charCodeAt(c)&&(++c,++a);else if(n!==s)continue;return t.slice(i,c-a)}return t.slice(i)}for(var r,e,o={},u={},a=[],l=t.length,c=0,h=0;(r=i())!==u;){for(var f=[];r!==o&&r!==u;)f.push(r),r=i();n&&null==(f=n(f,h++))||a.push(f)}return a}function r(n,i){return null==i&&(i=v(n)),[i.map(u).join(t)].concat(n.map(function(n){return i.map(function(t){return u(n[t])}).join(t)})).join("\n")}function e(t){return t.map(o).join("\n")}function o(n){return n.map(u).join(t)}function u(t){return null==t?"":a.test(t+="")?'"'+t.replace(/\"/g,'""')+'"':t}var a=new RegExp('["'+t+"\n]"),s=t.charCodeAt(0);return{parse:n,parseRows:i,format:r,formatRows:e}},qi=ji(","),Fi=qi.parse,Li=ji("\t"),Ri=Li.parse,Oi=function(t,n){return function(i,r,e){arguments.length<3&&(e=r,r=null);var o=Ai(i).mimeType(t);return o.row=function(t){return arguments.length?o.response(d(n,r=t)):r},o.row(r),e?o.get(e):o}};Oi("text/csv",Fi),Oi("text/tab-separated-values",Ri);var Ii=function(){return new y};y.prototype={constructor:y,reset:function(){this.s=this.t=0},add:function(t){g(cr,t,this.t),g(this,cr.s,this.s),this.s?this.t+=cr.t:this.s=cr.t},valueOf:function(){return this.s}};var Di,Hi,Gi,Wi,Bi,Xi,Qi,Ui,Zi,Ji,Yi,$i,Ki,Vi,tr,nr,ir,rr,er,or,ur,ar,sr,lr,cr=new y,hr=1e-6,fr=1e-12,pr=Math.PI,_r=pr/2,vr=pr/4,dr=2*pr,yr=180/pr,gr=pr/180,xr=Math.abs,mr=Math.atan,wr=Math.atan2,Er=Math.cos,br=Math.ceil,Mr=Math.exp,Sr=Math.log,kr=(Math.pow,Math.sin),Tr=(Math.sign||function(t){return t>0?1:t<0?-1:0},Math.sqrt),Nr=Math.tan,Pr={Feature:function(t,n){b(t.geometry,n)},FeatureCollection:function(t,n){for(var i=t.features,r=-1,e=i.length;++r<e;)b(i[r].geometry,n)}},Ar={Sphere:function(t,n){n.sphere()},Point:function(t,n){t=t.coordinates,n.point(t[0],t[1],t[2])},MultiPoint:function(t,n){for(var i=t.coordinates,r=-1,e=i.length;++r<e;)t=i[r],n.point(t[0],t[1],t[2])},LineString:function(t,n){M(t.coordinates,n,0)},MultiLineString:function(t,n){for(var i=t.coordinates,r=-1,e=i.length;++r<e;)M(i[r],n,0)},Polygon:function(t,n){S(t.coordinates,n)},MultiPolygon:function(t,n){for(var i=t.coordinates,r=-1,e=i.length;++r<e;)S(i[r],n)},GeometryCollection:function(t,n){for(var i=t.geometries,r=-1,e=i.length;++r<e;)b(i[r],n)}},Cr=function(t,n){t&&Pr.hasOwnProperty(t.type)?Pr[t.type](t,n):b(t,n)},zr=(Ii(),Ii(),Ii(),{sphere:E,point:F,lineStart:R,lineEnd:D,polygonStart:function(){zr.lineStart=H,zr.lineEnd=G},polygonEnd:function(){zr.lineStart=R,zr.lineEnd=D}}),jr=function(t,n){function i(i,r){return i=t(i,r),n(i[0],i[1])}return t.invert&&n.invert&&(i.invert=function(i,r){return i=n.invert(i,r),i&&t.invert(i[0],i[1])}),i};X.invert=X;var qr,Fr,Lr,Rr,Or,Ir,Dr,Hr,Gr=function(){var t,n=[];return{point:function(n,i){t.push([n,i])},lineStart:function(){n.push(t=[])},lineEnd:E,rejoin:function(){n.length>1&&n.push(n.pop().concat(n.shift()))},result:function(){var i=n;return n=[],t=null,i}}},Wr=function(t,n,i,r,e,o){var u,a=t[0],s=t[1],l=n[0],c=n[1],h=0,f=1,p=l-a,_=c-s;if(u=i-a,p||!(u>0)){if(u/=p,p<0){if(u<h)return;u<f&&(f=u)}else if(p>0){if(u>f)return;u>h&&(h=u)}if(u=e-a,p||!(u<0)){if(u/=p,p<0){if(u>f)return;u>h&&(h=u)}else if(p>0){if(u<h)return;u<f&&(f=u)}if(u=r-s,_||!(u>0)){if(u/=_,_<0){if(u<h)return;u<f&&(f=u)}else if(_>0){if(u>f)return;u>h&&(h=u)}if(u=o-s,_||!(u<0)){if(u/=_,_<0){if(u>f)return;u>h&&(h=u)}else if(_>0){if(u<h)return;u<f&&(f=u)}return h>0&&(t[0]=a+h*p,t[1]=s+h*_),f<1&&(n[0]=a+f*p,n[1]=s+f*_),!0}}}}},Br=function(t,n){return xr(t[0]-n[0])<hr&&xr(t[1]-n[1])<hr},Xr=function(t,n,i,r,e){var o,u,a=[],s=[];if(t.forEach(function(t){if(!((n=t.length-1)<=0)){var n,i,r=t[0],u=t[n];if(Br(r,u)){for(e.lineStart(),o=0;o<n;++o)e.point((r=t[o])[0],r[1]);return void e.lineEnd()}a.push(i=new K(r,t,null,(!0))),s.push(i.o=new K(r,null,i,(!1))),a.push(i=new K(u,t,null,(!1))),s.push(i.o=new K(u,null,i,(!0)))}}),a.length){for(s.sort(n),V(a),V(s),o=0,u=s.length;o<u;++o)s[o].e=i=!i;for(var l,c,h=a[0];;){for(var f=h,p=!0;f.v;)if((f=f.n)===h)return;l=f.z,e.lineStart();do{if(f.v=f.o.v=!0,f.e){if(p)for(o=0,u=l.length;o<u;++o)e.point((c=l[o])[0],c[1]);else r(f.x,f.n.x,1,e);f=f.n}else{if(p)for(l=f.p.z,o=l.length-1;o>=0;--o)e.point((c=l[o])[0],c[1]);else r(f.x,f.p.x,-1,e);f=f.p}f=f.o,l=f.z,p=!p}while(!f.v);e.lineEnd()}}},Qr=function(t,n){return t<n?-1:t>n?1:t>=n?0:NaN},Ur=function(t){return 1===t.length&&(t=tt(t)),{left:function(n,i,r,e){for(null==r&&(r=0),null==e&&(e=n.length);r<e;){var o=r+e>>>1;t(n[o],i)<0?r=o+1:e=o}return r},right:function(n,i,r,e){for(null==r&&(r=0),null==e&&(e=n.length);r<e;){var o=r+e>>>1;t(n[o],i)>0?e=o:r=o+1}return r}}},Zr=Ur(Qr),Jr=(Zr.right,Array.prototype),Yr=(Jr.slice,Jr.map,function(t,n,i){t=+t,n=+n,i=(e=arguments.length)<2?(n=t,t=0,1):e<3?1:+i;for(var r=-1,e=0|Math.max(0,Math.ceil((n-t)/i)),o=new Array(e);++r<e;)o[r]=t+r*i;return o}),$r=(Math.sqrt(50),Math.sqrt(10),Math.sqrt(2),function(t,n){var i,r,e=-1,o=t.length;if(null==n){for(;++e<o;)if(null!=(r=t[e])&&r>=r){i=r;break}for(;++e<o;)null!=(r=t[e])&&r>i&&(i=r)}else{for(;++e<o;)if(null!=(r=n(t[e],e,t))&&r>=r){i=r;break}for(;++e<o;)null!=(r=n(t[e],e,t))&&r>i&&(i=r)}return i}),Kr=function(t){for(var n,i,r,e=t.length,o=-1,u=0;++o<e;)u+=t[o].length;for(i=new Array(u);--e>=0;)for(r=t[e],n=r.length;--n>=0;)i[--u]=r[n];return i},Vr=1e9,te=-Vr,ne=(Ii(),function(){function t(){return{type:"MultiLineString",coordinates:n()}}function n(){return Yr(br(o/d)*d,e,d).map(f).concat(Yr(br(l/y)*y,s,y).map(p)).concat(Yr(br(r/_)*_,i,_).filter(function(t){return xr(t%d)>hr}).map(c)).concat(Yr(br(a/v)*v,u,v).filter(function(t){return xr(t%y)>hr}).map(h))}var i,r,e,o,u,a,s,l,c,h,f,p,_=10,v=_,d=90,y=360,g=2.5;return t.lines=function(){return n().map(function(t){return{type:"LineString",coordinates:t}})},t.outline=function(){return{type:"Polygon",coordinates:[f(o).concat(p(s).slice(1),f(e).reverse().slice(1),p(l).reverse().slice(1))]}},t.extent=function(n){return arguments.length?t.extentMajor(n).extentMinor(n):t.extentMinor()},t.extentMajor=function(n){return arguments.length?(o=+n[0][0],e=+n[1][0],l=+n[0][1],s=+n[1][1],o>e&&(n=o,o=e,e=n),l>s&&(n=l,l=s,s=n),t.precision(g)):[[o,l],[e,s]]},t.extentMinor=function(n){return arguments.length?(r=+n[0][0],i=+n[1][0],a=+n[0][1],u=+n[1][1],r>i&&(n=r,r=i,i=n),a>u&&(n=a,a=u,u=n),t.precision(g)):[[r,a],[i,u]]},t.step=function(n){return arguments.length?t.stepMajor(n).stepMinor(n):t.stepMinor()},t.stepMajor=function(n){return arguments.length?(d=+n[0],y=+n[1],t):[d,y]},t.stepMinor=function(n){return arguments.length?(_=+n[0],v=+n[1],t):[_,v]},t.precision=function(n){return arguments.length?(g=+n,c=it(a,u,90),h=rt(r,i,g),f=it(l,s,90),p=rt(o,e,g),t):g},t.extentMajor([[-180,-90+hr],[180,90-hr]]).extentMinor([[-180,-80-hr],[180,80+hr]])}),ie=function(t){return t},re=Ii(),ee=Ii(),oe={point:E,lineStart:E,lineEnd:E,polygonStart:function(){oe.lineStart=et,oe.lineEnd=at},polygonEnd:function(){oe.lineStart=oe.lineEnd=oe.point=E,re.add(xr(ee)),ee.reset()},result:function(){var t=re/2;return re.reset(),t}},ue=1/0,ae=ue,se=-ue,le=se,ce={point:st,lineStart:E,lineEnd:E,polygonStart:E,polygonEnd:E,result:function(){var t=[[ue,ae],[se,le]];return se=le=-(ae=ue=1/0),t}},he=0,fe=0,pe=0,_e=0,ve=0,de=0,ye=0,ge=0,xe=0,me={point:lt,lineStart:ct,lineEnd:pt,polygonStart:function(){me.lineStart=_t,me.lineEnd=vt},polygonEnd:function(){me.point=lt,me.lineStart=ct,me.lineEnd=pt},result:function(){var t=xe?[ye/xe,ge/xe]:de?[_e/de,ve/de]:pe?[he/pe,fe/pe]:[NaN,NaN];return he=fe=pe=_e=ve=de=ye=ge=xe=0,t}};gt.prototype={_radius:4.5,pointRadius:function(t){return this._radius=t,this},polygonStart:function(){this._line=0},polygonEnd:function(){this._line=NaN},lineStart:function(){this._point=0},lineEnd:function(){0===this._line&&this._context.closePath(),this._point=NaN},point:function(t,n){switch(this._point){case 0:this._context.moveTo(t,n),this._point=1;break;case 1:this._context.lineTo(t,n);break;default:this._context.moveTo(t+this._radius,n),this._context.arc(t,n,this._radius,0,dr)}},result:E},xt.prototype={_circle:mt(4.5),pointRadius:function(t){return this._circle=mt(t),this},polygonStart:function(){this._line=0},polygonEnd:function(){this._line=NaN},lineStart:function(){this._point=0},lineEnd:function(){0===this._line&&this._string.push("Z"),this._point=NaN},point:function(t,n){switch(this._point){case 0:this._string.push("M",t,",",n),this._point=1;break;case 1:this._string.push("L",t,",",n);break;default:this._string.push("M",t,",",n,this._circle)}},result:function(){if(this._string.length){var t=this._string.join("");return this._string=[],t}}};var we=function(){function t(t){return t&&("function"==typeof o&&e.pointRadius(+o.apply(this,arguments)),Cr(t,i(e))),e.result()}var n,i,r,e,o=4.5;return t.area=function(t){return Cr(t,i(oe)),oe.result()},t.bounds=function(t){return Cr(t,i(ce)),ce.result()},t.centroid=function(t){return Cr(t,i(me)),me.result()},t.projection=function(r){return arguments.length?(i=null==(n=r)?ie:r.stream,t):n},t.context=function(n){return arguments.length?(e=null==(r=n)?new xt:new gt(n),"function"!=typeof o&&e.pointRadius(o),t):r},t.pointRadius=function(n){return arguments.length?(o="function"==typeof n?n:(e.pointRadius(+n),+n),t):o},t.projection(null).context(null)},Ee=Ii(),be=function(t,n){var i=n[0],r=n[1],e=[kr(i),-Er(i),0],o=0,u=0;Ee.reset();for(var a=0,s=t.length;a<s;++a)if(c=(l=t[a]).length)for(var l,c,h=l[c-1],f=h[0],p=h[1]/2+vr,_=kr(p),v=Er(p),d=0;d<c;++d,f=g,_=w,v=E,h=y){var y=l[d],g=y[0],x=y[1]/2+vr,w=kr(x),E=Er(x),b=g-f,M=b>=0?1:-1,S=M*b,k=S>pr,N=_*w;if(Ee.add(wr(N*M*kr(S),v*E+N*Er(S))),o+=k?b+M*dr:b,k^f>=i^g>=i){var A=P(T(h),T(y));z(A);var C=P(e,A);z(C);var j=(k^b>=0?-1:1)*m(C[2]);(r>j||r===j&&(A[0]||A[1]))&&(u+=k^b>=0?1:-1)}}return(o<-hr||o<hr&&Ee<-hr)^1&u},Me=function(t,n,i,r){return function(e,o){function u(n,i){var r=e(n,i);t(n=r[0],i=r[1])&&o.point(n,i)}function a(t,n){var i=e(t,n);d.point(i[0],i[1])}function s(){w.point=a,d.lineStart()}function l(){w.point=u,d.lineEnd()}function c(t,n){v.push([t,n]);var i=e(t,n);x.point(i[0],i[1])}function h(){x.lineStart(),v=[]}function f(){c(v[0][0],v[0][1]),x.lineEnd();var t,n,i,r,e=x.clean(),u=g.result(),a=u.length;if(v.pop(),p.push(v),v=null,a)if(1&e){if(i=u[0],(n=i.length-1)>0){for(m||(o.polygonStart(),m=!0),o.lineStart(),t=0;t<n;++t)o.point((r=i[t])[0],r[1]);o.lineEnd()}}else a>1&&2&e&&u.push(u.pop().concat(u.shift())),_.push(u.filter(wt))}var p,_,v,d=n(o),y=e.invert(r[0],r[1]),g=Gr(),x=n(g),m=!1,w={point:u,lineStart:s,lineEnd:l,polygonStart:function(){w.point=c,w.lineStart=h,w.lineEnd=f,_=[],p=[]},polygonEnd:function(){w.point=u,w.lineStart=s,w.lineEnd=l,_=Kr(_);var t=be(p,y);_.length?(m||(o.polygonStart(),m=!0),Xr(_,Et,t,i,o)):t&&(m||(o.polygonStart(),m=!0),o.lineStart(),i(null,null,1,o),o.lineEnd()),m&&(o.polygonEnd(),m=!1),_=p=null},sphere:function(){o.polygonStart(),o.lineStart(),i(null,null,1,o),o.lineEnd(),o.polygonEnd()}};return w}},Se=Me(function(){return!0},bt,St,[-pr,-_r]),ke=function(t,n){function i(i,r,e,o){Y(o,t,n,e,i,r)}function r(t,n){return Er(t)*Er(n)>a}function e(t){var n,i,e,a,c;return{lineStart:function(){a=e=!1,c=1},point:function(h,f){var p,_=[h,f],v=r(h,f),d=s?v?0:u(h,f):v?u(h+(h<0?pr:-pr),f):0;if(!n&&(a=e=v)&&t.lineStart(),v!==e&&(p=o(n,_),(Br(n,p)||Br(_,p))&&(_[0]+=hr,_[1]+=hr,v=r(_[0],_[1]))),v!==e)c=0,v?(t.lineStart(),p=o(_,n),t.point(p[0],p[1])):(p=o(n,_),t.point(p[0],p[1]),t.lineEnd()),n=p;else if(l&&n&&s^v){var y;d&i||!(y=o(_,n,!0))||(c=0,s?(t.lineStart(),t.point(y[0][0],y[0][1]),t.point(y[1][0],y[1][1]),t.lineEnd()):(t.point(y[1][0],y[1][1]),t.lineEnd(),t.lineStart(),t.point(y[0][0],y[0][1])))}!v||n&&Br(n,_)||t.point(_[0],_[1]),n=_,e=v,i=d},lineEnd:function(){e&&t.lineEnd(),n=null},clean:function(){return c|(a&&e)<<1}}}function o(t,n,i){var r=T(t),e=T(n),o=[1,0,0],u=P(r,e),s=N(u,u),l=u[0],c=s-l*l;if(!c)return!i&&t;var h=a*s/c,f=-a*l/c,p=P(o,u),_=C(o,h),v=C(u,f);A(_,v);var d=p,y=N(_,d),g=N(d,d),x=y*y-g*(N(_,_)-1);if(!(x<0)){var m=Tr(x),w=C(d,(-y-m)/g);if(A(w,_),w=k(w),!i)return w;var E,b=t[0],M=n[0],S=t[1],z=n[1];M<b&&(E=b,b=M,M=E);var j=M-b,q=xr(j-pr)<hr,F=q||j<hr;if(!q&&z<S&&(E=S,S=z,z=E),F?q?S+z>0^w[1]<(xr(w[0]-b)<hr?S:z):S<=w[1]&&w[1]<=z:j>pr^(b<=w[0]&&w[0]<=M)){var L=C(d,(-y+m)/g);return A(L,_),[w,k(L)]}}}function u(n,i){var r=s?t:pr-t,e=0;return n<-r?e|=1:n>r&&(e|=2),i<-r?e|=4:i>r&&(e|=8),e}var a=Er(t),s=a>0,l=xr(a)>hr;return Me(r,e,i,s?[0,-t]:[-pr,t-pr])};Tt.prototype={point:function(t,n){this.stream.point(t,n)},sphere:function(){this.stream.sphere()},lineStart:function(){this.stream.lineStart()},lineEnd:function(){this.stream.lineEnd()},polygonStart:function(){this.stream.polygonStart()},polygonEnd:function(){this.stream.polygonEnd()}};var Te=16,Ne=Er(30*gr),Pe=function(t,n){return+n?zt(t,n):Ct(t)},Ae=kt({point:function(t,n){this.stream.point(t*gr,n*gr)}}),Ce=function(){return Ft(Lt).scale(155.424).center([0,33.6442])},ze=function(){return Ce().parallels([29.5,45.5]).scale(1070).translate([480,250]).rotate([96,0]).center([-.6,38.7])},je=function(){function t(t){var n=t[0],i=t[1];return u=null,r.point(n,i),u||(e.point(n,i),u)||(o.point(n,i),u)}var n,i,r,e,o,u,a=ze(),s=Ce().rotate([154,0]).center([-2,58.5]).parallels([55,65]),l=Ce().rotate([157,0]).center([-3,19.9]).parallels([8,18]),c={point:function(t,n){u=[t,n]}};return t.invert=function(t){var n=a.scale(),i=a.translate(),r=(t[0]-i[0])/n,e=(t[1]-i[1])/n;return(e>=.12&&e<.234&&r>=-.425&&r<-.214?s:e>=.166&&e<.234&&r>=-.214&&r<-.115?l:a).invert(t)},t.stream=function(t){return n&&i===t?n:n=Rt([a.stream(i=t),s.stream(t),l.stream(t)])},t.precision=function(n){return arguments.length?(a.precision(n),s.precision(n),l.precision(n),t):a.precision()},t.scale=function(n){return arguments.length?(a.scale(n),s.scale(.35*n),l.scale(n),t.translate(a.translate())):a.scale()},t.translate=function(n){if(!arguments.length)return a.translate();var i=a.scale(),u=+n[0],h=+n[1];return r=a.translate(n).clipExtent([[u-.455*i,h-.238*i],[u+.455*i,h+.238*i]]).stream(c),e=s.translate([u-.307*i,h+.201*i]).clipExtent([[u-.425*i+hr,h+.12*i+hr],[u-.214*i-hr,h+.234*i-hr]]).stream(c),o=l.translate([u-.205*i,h+.212*i]).clipExtent([[u-.214*i+hr,h+.166*i+hr],[u-.115*i-hr,h+.234*i-hr]]).stream(c),t},t.fitExtent=At(t),t.fitSize=Pt(t),t.scale(1070)},qe=Ot(function(t){return Tr(2/(1+t))});qe.invert=It(function(t){return 2*m(t/2)});var Fe=Ot(function(t){return(t=x(t))&&t/kr(t)});Fe.invert=It(function(t){return t}),Dt.invert=function(t,n){return[t,2*mr(Mr(n))-_r]};var Le=function(){return Ht(Dt).scale(961/dr)};Gt.invert=Gt;var Re=function(){return jt(Gt).scale(152.63)};Wt.invert=It(mr),Bt.invert=It(m);var Oe=function(){return jt(Bt).scale(249.5).clipAngle(90+hr)};Xt.invert=function(t,n){return[-n,2*mr(Mr(t))-_r]};var Ie=Math.PI,De=2*Ie,He=1e-6,Ge=De-He;Qt.prototype=Ut.prototype={constructor:Qt,moveTo:function(t,n){this._.push("M",this._x0=this._x1=+t,",",this._y0=this._y1=+n)},closePath:function(){null!==this._x1&&(this._x1=this._x0,this._y1=this._y0,this._.push("Z"))},lineTo:function(t,n){this._.push("L",this._x1=+t,",",this._y1=+n)},quadraticCurveTo:function(t,n,i,r){this._.push("Q",+t,",",+n,",",this._x1=+i,",",this._y1=+r)},bezierCurveTo:function(t,n,i,r,e,o){this._.push("C",+t,",",+n,",",+i,",",+r,",",this._x1=+e,",",this._y1=+o)},arcTo:function(t,n,i,r,e){t=+t,n=+n,i=+i,r=+r,e=+e;var o=this._x1,u=this._y1,a=i-t,s=r-n,l=o-t,c=u-n,h=l*l+c*c;if(e<0)throw new Error("negative radius: "+e);if(null===this._x1)this._.push("M",this._x1=t,",",this._y1=n);else if(h>He)if(Math.abs(c*a-s*l)>He&&e){var f=i-o,p=r-u,_=a*a+s*s,v=f*f+p*p,d=Math.sqrt(_),y=Math.sqrt(h),g=e*Math.tan((Ie-Math.acos((_+h-v)/(2*d*y)))/2),x=g/y,m=g/d;Math.abs(x-1)>He&&this._.push("L",t+x*l,",",n+x*c),this._.push("A",e,",",e,",0,0,",+(c*f>l*p),",",this._x1=t+m*a,",",this._y1=n+m*s)}else this._.push("L",this._x1=t,",",this._y1=n);else;},arc:function(t,n,i,r,e,o){t=+t,n=+n,i=+i;var u=i*Math.cos(r),a=i*Math.sin(r),s=t+u,l=n+a,c=1^o,h=o?r-e:e-r;if(i<0)throw new Error("negative radius: "+i);null===this._x1?this._.push("M",s,",",l):(Math.abs(this._x1-s)>He||Math.abs(this._y1-l)>He)&&this._.push("L",s,",",l),i&&(h>Ge?this._.push("A",i,",",i,",0,1,",c,",",t-u,",",n-a,"A",i,",",i,",0,1,",c,",",this._x1=s,",",this._y1=l):(h<0&&(h=h%De+De),this._.push("A",i,",",i,",0,",+(h>=Ie),",",c,",",this._x1=t+i*Math.cos(e),",",this._y1=n+i*Math.sin(e))))},rect:function(t,n,i,r){this._.push("M",this._x0=this._x1=+t,",",this._y0=this._y1=+n,"h",+i,"v",+r,"h",-i,"Z")},toString:function(){return this._.join("")}};var We=function(t){return function(){return t}},Be=1e-12,Xe=Math.PI,Qe=2*Xe;Zt.prototype={areaStart:function(){this._line=0},areaEnd:function(){this._line=NaN},lineStart:function(){this._point=0},lineEnd:function(){(this._line||0!==this._line&&1===this._point)&&this._context.closePath(),this._line=1-this._line},point:function(t,n){switch(t=+t,n=+n,this._point){case 0:this._point=1,this._line?this._context.lineTo(t,n):this._context.moveTo(t,n);break;case 1:this._point=2;default:this._context.lineTo(t,n)}}};var Ue=function(t){return new Zt(t)};Kt(Ue);$t.prototype={areaStart:function(){this._curve.areaStart()},areaEnd:function(){this._curve.areaEnd()},lineStart:function(){this._curve.lineStart()},lineEnd:function(){this._curve.lineEnd()},point:function(t,n){this._curve.point(n*Math.sin(t),n*-Math.cos(t))}};var Ze={draw:function(t,n){var i=Math.sqrt(n/Xe);t.moveTo(i,0),t.arc(0,0,i,0,Qe)}},Je=(Math.sqrt(1/3),Math.sin(Xe/10)/Math.sin(7*Xe/10)),Ye=(Math.sin(Qe/10)*Je,-Math.cos(Qe/10)*Je,Math.sqrt(3),-.5),$e=Math.sqrt(3)/2,Ke=1/Math.sqrt(12),Ve=3*(Ke/2+1),to={draw:function(t,n){var i=Math.sqrt(n/Ve),r=i/2,e=i*Ke,o=r,u=i*Ke+i,a=-o,s=u;t.moveTo(r,e),t.lineTo(o,u),t.lineTo(a,s),t.lineTo(Ye*r-$e*e,$e*r+Ye*e),t.lineTo(Ye*o-$e*u,$e*o+Ye*u),t.lineTo(Ye*a-$e*s,$e*a+Ye*s),t.lineTo(Ye*r+$e*e,Ye*e-$e*r),t.lineTo(Ye*o+$e*u,Ye*u-$e*o),t.lineTo(Ye*a+$e*s,Ye*s-$e*a),t.closePath()}},no=function(){function t(){var t;if(r||(r=t=Ut()),n.apply(this,arguments).draw(r,+i.apply(this,arguments)),t)return r=null,t+""||null}var n=We(Ze),i=We(64),r=null;return t.type=function(i){return arguments.length?(n="function"==typeof i?i:We(i),t):n},t.size=function(n){return arguments.length?(i="function"==typeof n?n:We(+n),t):i},t.context=function(n){return arguments.length?(r=null==n?null:n,t):r},t},io=function(){};tn.prototype={areaStart:function(){this._line=0},areaEnd:function(){this._line=NaN},lineStart:function(){this._x0=this._x1=this._y0=this._y1=NaN,this._point=0},lineEnd:function(){switch(this._point){case 3:Vt(this,this._x1,this._y1);case 2:this._context.lineTo(this._x1,this._y1)}(this._line||0!==this._line&&1===this._point)&&this._context.closePath(),this._line=1-this._line},point:function(t,n){switch(t=+t,n=+n,this._point){case 0:this._point=1,this._line?this._context.lineTo(t,n):this._context.moveTo(t,n);break;case 1:this._point=2;break;case 2:this._point=3,this._context.lineTo((5*this._x0+this._x1)/6,(5*this._y0+this._y1)/6);default:Vt(this,t,n)}this._x0=this._x1,this._x1=t,this._y0=this._y1,this._y1=n}},nn.prototype={lineStart:function(){this._x=[],this._y=[],this._basis.lineStart()},lineEnd:function(){var t=this,n=this._x,i=this._y,r=n.length-1;if(r>0)for(var e,o=n[0],u=i[0],a=n[r]-o,s=i[r]-u,l=-1;++l<=r;)e=l/r,t._basis.point(t._beta*n[l]+(1-t._beta)*(o+e*a),t._beta*i[l]+(1-t._beta)*(u+e*s));this._x=this._y=null,this._basis.lineEnd()},point:function(t,n){this._x.push(+t),this._y.push(+n)}},function t(n){function i(t){return 1===n?new tn(t):new nn(t,n)}return i.beta=function(n){return t(+n)},i}(.85),en.prototype={areaStart:function(){this._line=0},areaEnd:function(){this._line=NaN},lineStart:function(){this._x0=this._x1=this._x2=this._y0=this._y1=this._y2=NaN,this._point=0},lineEnd:function(){switch(this._point){case 2:this._context.lineTo(this._x2,this._y2);break;case 3:rn(this,this._x1,this._y1)}(this._line||0!==this._line&&1===this._point)&&this._context.closePath(),this._line=1-this._line},point:function(t,n){switch(t=+t,n=+n,this._point){case 0:this._point=1,this._line?this._context.lineTo(t,n):this._context.moveTo(t,n);break;case 1:this._point=2,this._x1=t,this._y1=n;break;case 2:this._point=3;default:rn(this,t,n)}this._x0=this._x1,this._x1=this._x2,this._x2=t,this._y0=this._y1,this._y1=this._y2,this._y2=n}},function t(n){function i(t){return new en(t,n)}return i.tension=function(n){return t(+n)},i}(0),on.prototype={areaStart:io,areaEnd:io,lineStart:function(){this._x0=this._x1=this._x2=this._x3=this._x4=this._x5=this._y0=this._y1=this._y2=this._y3=this._y4=this._y5=NaN,this._point=0},lineEnd:function(){switch(this._point){case 1:this._context.moveTo(this._x3,this._y3),this._context.closePath();break;case 2:this._context.lineTo(this._x3,this._y3),this._context.closePath();break;case 3:this.point(this._x3,this._y3),this.point(this._x4,this._y4),this.point(this._x5,this._y5)}},point:function(t,n){switch(t=+t,n=+n,this._point){case 0:this._point=1,this._x3=t,this._y3=n;break;case 1:this._point=2,this._context.moveTo(this._x4=t,this._y4=n);break;case 2:this._point=3,this._x5=t,this._y5=n;break;default:rn(this,t,n)}this._x0=this._x1,this._x1=this._x2,this._x2=t,this._y0=this._y1,this._y1=this._y2,this._y2=n}},function t(n){function i(t){return new on(t,n)}return i.tension=function(n){return t(+n)},i}(0),un.prototype={areaStart:function(){this._line=0},areaEnd:function(){this._line=NaN},lineStart:function(){this._x0=this._x1=this._x2=this._y0=this._y1=this._y2=NaN,this._point=0},lineEnd:function(){(this._line||0!==this._line&&3===this._point)&&this._context.closePath(),this._line=1-this._line},point:function(t,n){switch(t=+t,n=+n,this._point){case 0:this._point=1;break;case 1:this._point=2;break;case 2:this._point=3,this._line?this._context.lineTo(this._x2,this._y2):this._context.moveTo(this._x2,this._y2);break;case 3:this._point=4;default:rn(this,t,n)}this._x0=this._x1,this._x1=this._x2,this._x2=t,this._y0=this._y1,this._y1=this._y2,this._y2=n}},function t(n){function i(t){return new un(t,n)}return i.tension=function(n){return t(+n)},i}(0),sn.prototype={areaStart:function(){this._line=0},areaEnd:function(){this._line=NaN},lineStart:function(){this._x0=this._x1=this._x2=this._y0=this._y1=this._y2=NaN,this._l01_a=this._l12_a=this._l23_a=this._l01_2a=this._l12_2a=this._l23_2a=this._point=0},lineEnd:function(){switch(this._point){case 2:this._context.lineTo(this._x2,this._y2);break;case 3:this.point(this._x2,this._y2)}(this._line||0!==this._line&&1===this._point)&&this._context.closePath(),this._line=1-this._line},point:function(t,n){if(t=+t,n=+n,this._point){var i=this._x2-t,r=this._y2-n;this._l23_a=Math.sqrt(this._l23_2a=Math.pow(i*i+r*r,this._alpha))}switch(this._point){case 0:this._point=1,this._line?this._context.lineTo(t,n):this._context.moveTo(t,n);break;case 1:this._point=2;break;case 2:this._point=3;default:an(this,t,n)}this._l01_a=this._l12_a,this._l12_a=this._l23_a,this._l01_2a=this._l12_2a,this._l12_2a=this._l23_2a,this._x0=this._x1,this._x1=this._x2,this._x2=t,this._y0=this._y1,this._y1=this._y2,this._y2=n}},function t(n){function i(t){return n?new sn(t,n):new en(t,0)}return i.alpha=function(n){return t(+n)},i}(.5),ln.prototype={areaStart:io,areaEnd:io,lineStart:function(){this._x0=this._x1=this._x2=this._x3=this._x4=this._x5=this._y0=this._y1=this._y2=this._y3=this._y4=this._y5=NaN,this._l01_a=this._l12_a=this._l23_a=this._l01_2a=this._l12_2a=this._l23_2a=this._point=0},lineEnd:function(){switch(this._point){case 1:this._context.moveTo(this._x3,this._y3),this._context.closePath();break;case 2:this._context.lineTo(this._x3,this._y3),this._context.closePath();break;case 3:this.point(this._x3,this._y3),this.point(this._x4,this._y4),this.point(this._x5,this._y5)}},point:function(t,n){if(t=+t,n=+n,this._point){var i=this._x2-t,r=this._y2-n;this._l23_a=Math.sqrt(this._l23_2a=Math.pow(i*i+r*r,this._alpha))}switch(this._point){case 0:this._point=1,this._x3=t,this._y3=n;break;case 1:this._point=2,this._context.moveTo(this._x4=t,this._y4=n);break;case 2:this._point=3,this._x5=t,this._y5=n;break;default:an(this,t,n)}this._l01_a=this._l12_a,this._l12_a=this._l23_a,this._l01_2a=this._l12_2a,this._l12_2a=this._l23_2a,this._x0=this._x1,this._x1=this._x2,this._x2=t,this._y0=this._y1,this._y1=this._y2,this._y2=n}},function t(n){function i(t){return n?new ln(t,n):new on(t,0)}return i.alpha=function(n){return t(+n)},i}(.5),cn.prototype={areaStart:function(){this._line=0},areaEnd:function(){this._line=NaN},lineStart:function(){this._x0=this._x1=this._x2=this._y0=this._y1=this._y2=NaN,this._l01_a=this._l12_a=this._l23_a=this._l01_2a=this._l12_2a=this._l23_2a=this._point=0},lineEnd:function(){(this._line||0!==this._line&&3===this._point)&&this._context.closePath(),this._line=1-this._line},point:function(t,n){if(t=+t,n=+n,this._point){var i=this._x2-t,r=this._y2-n;this._l23_a=Math.sqrt(this._l23_2a=Math.pow(i*i+r*r,this._alpha))}switch(this._point){case 0:this._point=1;break;case 1:this._point=2;break;case 2:this._point=3,this._line?this._context.lineTo(this._x2,this._y2):this._context.moveTo(this._x2,this._y2);break;case 3:this._point=4;default:an(this,t,n)}this._l01_a=this._l12_a,this._l12_a=this._l23_a,this._l01_2a=this._l12_2a,this._l12_2a=this._l23_2a,this._x0=this._x1,this._x1=this._x2,this._x2=t,this._y0=this._y1,this._y1=this._y2,this._y2=n}},function t(n){function i(t){return n?new cn(t,n):new un(t,0)}return i.alpha=function(n){return t(+n)},i}(.5),vn.prototype={areaStart:function(){this._line=0},areaEnd:function(){this._line=NaN},lineStart:function(){this._x0=this._x1=this._y0=this._y1=this._t0=NaN,this._point=0},lineEnd:function(){switch(this._point){case 2:this._context.lineTo(this._x1,this._y1);break;case 3:_n(this,this._t0,pn(this,this._t0))}(this._line||0!==this._line&&1===this._point)&&this._context.closePath(),this._line=1-this._line},point:function(t,n){var i=NaN;if(t=+t,n=+n,t!==this._x1||n!==this._y1){switch(this._point){case 0:this._point=1,this._line?this._context.lineTo(t,n):this._context.moveTo(t,n);break;case 1:this._point=2;break;case 2:this._point=3,_n(this,pn(this,i=fn(this,t,n)),i);break;default:_n(this,this._t0,i=fn(this,t,n))}this._x0=this._x1,this._x1=t,this._y0=this._y1,this._y1=n,
	this._t0=i}}},(dn.prototype=Object.create(vn.prototype)).point=function(t,n){vn.prototype.point.call(this,n,t)},yn.prototype={moveTo:function(t,n){this._context.moveTo(n,t)},closePath:function(){this._context.closePath()},lineTo:function(t,n){this._context.lineTo(n,t)},bezierCurveTo:function(t,n,i,r,e,o){this._context.bezierCurveTo(n,t,r,i,o,e)}},gn.prototype={areaStart:function(){this._line=0},areaEnd:function(){this._line=NaN},lineStart:function(){this._x=[],this._y=[]},lineEnd:function(){var t=this,n=this._x,i=this._y,r=n.length;if(r)if(this._line?this._context.lineTo(n[0],i[0]):this._context.moveTo(n[0],i[0]),2===r)this._context.lineTo(n[1],i[1]);else for(var e=xn(n),o=xn(i),u=0,a=1;a<r;++u,++a)t._context.bezierCurveTo(e[0][u],o[0][u],e[1][u],o[1][u],n[a],i[a]);(this._line||0!==this._line&&1===r)&&this._context.closePath(),this._line=1-this._line,this._x=this._y=null},point:function(t,n){this._x.push(+t),this._y.push(+n)}};var ro=(Array.prototype.slice,function(){}),eo=function(t,n){return"GeometryCollection"===n.type?{type:"FeatureCollection",features:n.geometries.map(function(n){return bn(t,n)})}:bn(t,n)},oo=function(t,n){function i(n){var i,r=t.arcs[n<0?~n:n],e=r[0];return t.transform?(i=[0,0],r.forEach(function(t){i[0]+=t[0],i[1]+=t[1]})):i=r[r.length-1],n<0?[i,e]:[e,i]}function r(t,n){for(var i in t){var r=t[i];delete n[r.start],delete r.start,delete r.end,r.forEach(function(t){e[t<0?~t:t]=1}),a.push(r)}}var e={},o={},u={},a=[],s=-1;return n.forEach(function(i,r){var e,o=t.arcs[i<0?~i:i];o.length<3&&!o[1][0]&&!o[1][1]&&(e=n[++s],n[s]=i,n[r]=e)}),n.forEach(function(t){var n,r,e=i(t),a=e[0],s=e[1];if(n=u[a])if(delete u[n.end],n.push(t),n.end=s,r=o[s]){delete o[r.start];var l=r===n?n:n.concat(r);o[l.start=n.start]=u[l.end=r.end]=l}else o[n.start]=u[n.end]=n;else if(n=o[s])if(delete o[n.start],n.unshift(t),n.start=a,r=u[a]){delete u[r.end];var c=r===n?n:r.concat(n);o[c.start=r.start]=u[c.end=n.end]=c}else o[n.start]=u[n.end]=n;else n=[t],o[n.start=a]=u[n.end=s]=n}),r(u,o),r(o,u),n.forEach(function(t){e[t<0?~t:t]||a.push([t])}),a},uo=function(t){return Mn(t,Sn.apply(this,arguments))},ao=function(t){function n(t,n){t.forEach(function(t){t<0&&(t=~t);var i=e[t];i?i.push(n):e[t]=[n]})}function i(t,i){t.forEach(function(t){n(t,i)})}function r(t,n){"GeometryCollection"===t.type?t.geometries.forEach(function(t){r(t,n)}):t.type in u&&u[t.type](t.arcs,n)}var e={},o=t.map(function(){return[]}),u={LineString:n,MultiLineString:i,Polygon:i,MultiPolygon:function(t,n){t.forEach(function(t){i(t,n)})}};t.forEach(r);for(var a in e)for(var s=e[a],l=s.length,c=0;c<l;++c)for(var h=c+1;h<l;++h){var f,p=s[c],_=s[h];(f=o[p])[a=En(f,_)]!==_&&f.splice(a,0,_),(f=o[_])[a=En(f,p)]!==p&&f.splice(a,0,p)}return o},so=Math.abs,lo=Math.atan,co=Math.atan2,ho=Math.cos,fo=Math.exp,po=Math.floor,_o=Math.log,vo=Math.max,yo=Math.min,go=Math.pow,xo=(Math.round,Math.sign||function(t){return t>0?1:t<0?-1:0}),mo=Math.sin,wo=Math.tan,Eo=1e-6,bo=1e-12,Mo=Math.PI,So=Mo/2,ko=Mo/4,To=Math.SQRT1_2,No=Pn(2),Po=Pn(Mo),Ao=180/Mo,Co=Mo/180;Fn.invert=function(t,n){if(!(t*t+4*n*n>Mo*Mo+Eo)){var i=t,r=n,e=25;do{var o,u=mo(i),a=mo(i/2),s=ho(i/2),l=mo(r),c=ho(r),h=mo(2*r),f=l*l,p=c*c,_=a*a,v=1-p*s*s,d=v?Nn(c*s)*Pn(o=1/v):o=0,y=2*d*c*a-t,g=d*l-n,x=o*(p*_+d*c*s*f),m=o*(.5*u*h-2*d*l*a),w=.25*o*(h*a-d*l*p*u),E=o*(f*s+d*_*c),b=m*w-E*x;if(!b)break;var M=(g*m-y*E)/b,S=(y*w-g*x)/b;i-=M,r-=S}while((so(M)>Eo||so(S)>Eo)&&--e>0);return[i,r]}},Ln.invert=function(t,n){if(t*=3/8,n*=3/8,!t&&so(n)>1)return null;var i=t*t,r=n*n,e=1+i+r,o=Pn((e-Pn(e*e-4*n*n))/2),u=Tn(o)/3,a=o?qn(so(n/o))/3:jn(so(t))/3,s=ho(u),l=zn(a),c=l*l-s*s;return[2*xo(t)*co(Cn(a)*s,.25-c),2*xo(n)*co(l*mo(u),.25+c)]};var zo=Pn(8),jo=_o(1+No);Rn.invert=function(t,n){if((r=so(n))<jo)return[t,2*lo(fo(n))-So];var i,r,e=ko,o=25;do{var u=ho(e/2),a=wo(e/2);e-=i=(zo*(e-ko)-_o(a)-r)/(zo-u*u/(2*a))}while(so(i)>bo&&--o>0);return[t/(ho(e)*(zo-1/mo(e))),xo(n)*e]};var qo=In(No/So,No,Mo),Fo=2.00276,Lo=1.11072;Dn.invert=function(t,n){var i,r,e=Fo*n,o=n<0?-ko:ko,u=25;do r=e-No*mo(o),o-=i=(mo(2*o)+2*o-Mo*mo(r))/(2*ho(2*o)+2+Mo*ho(r)*No*ho(o));while(so(i)>Eo&&--u>0);return r=e-No*mo(o),[t*(1/ho(r)+Lo/ho(o))/Fo,r]},Hn.invert=function(t,n){return[t/ho(n),n]};In(1,4/Mo,Mo);Gn.invert=function(t,n){var i=(i=n/Po-1)*i;return[i>0?t*Pn(Mo/i)/2:0,Tn(1-i)]},Bn.invert=function(t,n){var i=2-so(n)/Pn(2*Mo/3);return[t*Pn(6*Mo)/(2*i),xo(n)*Tn((4-i*i)/3)]},Xn.invert=function(t,n){var i=1+So,r=Pn(i/2);return[2*t*r/(1+ho(n*=r)),Tn((n+mo(n))/i)]};var Ro=3+2*No;Qn.invert=function(t,n){if(!(i=Ln.invert(t/1.2,1.065*n)))return null;var i,r=i[0],e=i[1],o=20;t/=Ro,n/=Ro;do{var u=r/2,a=e/2,s=mo(u),l=ho(u),c=mo(a),h=ho(a),f=ho(e),p=Pn(f),_=c/(h+No*l*p),v=_*_,d=Pn(2/(1+v)),y=No*h+(l+s)*p,g=No*h+(l-s)*p,x=y/g,m=Pn(x),w=m-1/m,E=m+1/m,b=d*w-2*_o(m)-t,M=d*_*E-2*lo(_)-n,S=c&&To*p*s*v/c,k=(No*l*h+p)/(2*(h+No*l*p)*(h+No*l*p)*p),T=-.5*_*d*d*d,N=T*S,P=T*k,A=(A=2*h+No*p*(l-s))*A*m,C=(No*l*h*p+f)/A,z=-(No*s*c)/(p*A),j=w*N-2*C/m+d*(C+C/x),q=w*P-2*z/m+d*(z+z/x),F=_*E*N-2*S/(1+v)+d*E*S+d*_*(C-C/x),L=_*E*P-2*k/(1+v)+d*E*k+d*_*(z-z/x),R=q*F-L*j;if(!R)break;var O=(M*q-b*L)/R,I=(b*F-M*j)/R;r-=O,e=vo(-So,yo(So,e-I))}while((so(O)>Eo||so(I)>Eo)&&--o>0);return so(so(e)-So)<Eo?[0,e]:o&&[r,e]};var Oo=function(t,n,i,r,e,o,u,a){function s(s,l){if(!l)return[t*s/Mo,0];var c=l*l,h=t+c*(n+c*(i+c*r)),f=l*(e-1+c*(o-a+c*u)),p=(h*h+f*f)/(2*f),_=s*Tn(h/p)/Mo;return[p*mo(_),l*(1+c*a)+p*(1-ho(_))]}return arguments.length<8&&(a=0),s.invert=function(s,l){var c,h,f=Mo*s/t,p=l,_=50;do{var v=p*p,d=t+v*(n+v*(i+v*r)),y=p*(e-1+v*(o-a+v*u)),g=d*d+y*y,x=2*y,m=g/x,w=m*m,E=Tn(d/m)/Mo,b=f*E,M=d*d,S=(2*n+v*(4*i+6*v*r))*p,k=e+v*(3*o+5*v*u),T=2*(d*S+y*(k-1)),N=2*(k-1),P=(T*x-g*N)/(x*x),A=ho(b),C=mo(b),z=m*A,j=m*C,q=f/Mo*(1/Pn(1-M/w))*(S*m-d*P)/w,F=j-s,L=p*(1+v*a)+m-z-l,R=P*C+z*q,O=z*E,I=1+P-(P*A-j*q),D=j*E,H=R*D-I*O;if(!H)break;f-=c=(L*R-F*I)/H,p-=h=(F*D-L*O)/H}while((so(c)>Eo||so(h)>Eo)&&--_>0);return[f,p]},s};Oo(2.8284,-1.6988,.75432,-.18071,1.76003,-.38914,.042555),Oo(2.583819,-.835827,.170354,-.038094,1.543313,-.411435,.082742),Oo(5/6*Mo,-.62636,-.0344,0,1.3493,-.05524,0,.045);Un.invert=function(t,n){var i,r=t,e=n,o=50;do{var u=e*e;e-=i=(e*(1+u/12)-n)/(1+u/4)}while(so(i)>Eo&&--o>0);o=50,t/=1-.162388*u;do{var a=(a=r*r)*a;r-=i=(r*(.87-952426e-9*a)-t)/(.87-.00476213*a)}while(so(i)>Eo&&--o>0);return[r,e]};var Io=(Oo(2.6516,-.76534,.19123,-.047094,1.36289,-.13965,.031762),function(t){function n(n,r){var e=n>0?-.5:.5,o=t(n+e*Mo,r);return o[0]-=e*i,o}var i=t(So,0)[0]-t(-So,0)[0];return t.invert&&(n.invert=function(n,r){var e=n>0?-.5:.5,o=t.invert(n+e*i,r),u=o[0]-e*Mo;return u<-Mo?u+=2*Mo:u>Mo&&(u-=2*Mo),o[0]=u,o}),n});Zn.invert=function(t,n){var i=xo(t),r=xo(n),e=-i*t,o=-r*n,u=o/e<1,a=Yn(u?o:e,u?e:o),s=a[0],l=a[1],c=ho(l);return u&&(s=-So-s),[i*(co(mo(s)*c,-mo(l))+Mo),r*Tn(ho(s)*c)]};var Do=function(t){function n(n,r){var e=so(n)<So,o=t(e?n:n>0?n-Mo:n+Mo,r),u=(o[0]-o[1])*To,a=(o[0]+o[1])*To;if(e)return[u,a];var s=i*To,l=u>0^a>0?-1:1;return[l*u-xo(a)*s,l*a-xo(u)*s]}var i=t(So,0)[0]-t(-So,0)[0];return t.invert&&(n.invert=function(n,r){var e=(n+r)*To,o=(r-n)*To,u=so(e)<.5*i&&so(o)<.5*i;if(!u){var a=i*To,s=e>0^o>0?-1:1,l=-s*(n+(o>0?1:-1)*a),c=-s*(r+(e>0?1:-1)*a);e=(-l-c)*To,o=(l-c)*To}var h=t.invert(e,o);return u||(h[0]+=e>0?Mo:-Mo),h}),n};ni.invert=function(t,n){var i=(No-1)/(No+1),r=Pn(1-i*i),e=ti(So,r*r),o=-1,u=$n(.5*e-n,-t,r*r),a=ri(u[0],u[1]),s=co(a[1],a[0])/o;return[s,2*lo(fo(.5/o*_o(i*a[0]*a[0]+i*a[1]*a[1])))-So]};var Ho=function(){return jt(Io(ni)).scale(151.496)};ei.invert=function(t,n){var i=2*Tn(n/2);return[t*ho(i/2)/ho(i),i]};var Go=41+48/36+37/3600,Wo=(Wn(0),.7109889596207567),Bo=.0528035274542;oi.invert=function(t,n){return n>-Wo?qo.invert(t,n-Bo):Hn.invert(t,n)},ui.invert=function(t,n){return so(n)>Wo?qo.invert(t,n+(n>0?Bo:-Bo)):Hn.invert(t,n)};var Xo=function(t,n){function i(i,r){for(var e=r<0?-1:1,o=n[+(r<0)],u=0,a=o.length-1;u<a&&i>o[u][2][0];++u);var s=t(i-o[u][1][0],r);return s[0]+=t(o[u][1][0],e*r>e*o[u][0][1]?o[u][0][1]:r)[0],s}var r=li(n);n=n.map(function(t){return t.map(function(t){return[[t[0][0]*Co,t[0][1]*Co],[t[1][0]*Co,t[1][1]*Co],[t[2][0]*Co,t[2][1]*Co]]})});var e=n.map(function(n){return n.map(function(n){var i,r=t(n[0][0],n[0][1])[0],e=t(n[2][0],n[2][1])[0],o=t(n[1][0],n[0][1])[1],u=t(n[1][0],n[1][1])[1];return o>u&&(i=o,o=u,u=i),[[r,o],[e,u]]})}),o=jt(i),u=o.stream;return t.invert&&(i.invert=function(r,o){for(var u=e[+(o<0)],a=n[+(o<0)],s=0,l=u.length;s<l;++s){var c=u[s];if(c[0][0]<=r&&r<c[1][0]&&c[0][1]<=o&&o<c[1][1]){var h=t.invert(r-t(a[s][1][0],0)[0],o);return h[0]+=a[s][1][0],ai(i(h[0],h[1]),[r,o])?h:null}}}),o.stream=function(t){var n=o.rotate(),i=u(t),e=(o.rotate([0,0]),u(t));return o.rotate(n),i.sphere=function(){Cr(r,e)},i},o},Qo=[[[[-180,0],[-100,90],[-40,0]],[[-40,0],[30,90],[180,0]]],[[[-180,0],[-160,-90],[-100,0]],[[-100,0],[-60,-90],[-20,0]],[[-20,0],[20,-90],[80,0]],[[80,0],[140,-90],[180,0]]]],Uo=function(){return Xo(Dn,Qo).scale(160.857)},Zo=[[[[-180,0],[-100,90],[-40,0]],[[-40,0],[30,90],[180,0]]],[[[-180,0],[-160,-90],[-100,0]],[[-100,0],[-60,-90],[-20,0]],[[-20,0],[20,-90],[80,0]],[[80,0],[140,-90],[180,0]]]],Jo=function(){return Xo(ui,Zo).scale(152.63)},Yo=[[[[-180,0],[-90,90],[0,0]],[[0,0],[90,90],[180,0]]],[[[-180,0],[-90,-90],[0,0]],[[0,0],[90,-90],[180,0]]]],$o=function(){return Xo(qo,Yo).scale(169.529).rotate([20,0])};ci.invert=function(t,n){var i=xo(t)*Mo,r=n/2,e=50;do{var o=i*i,u=r*r,a=i*r,s=i*(.975534+u*(-.119161+o*-.0143059+u*-.0547009))-t,l=r*(1.00384+o*(.0802894+u*-.02855+199025e-9*o)+u*(.0998909+u*-.0491032))-n,c=.975534-u*(.119161+3*o*.0143059+.0547009*u),h=-a*(.238322+.2188036*u+.0286118*o),f=a*(.1605788+7961e-7*o+-.0571*u),p=1.00384+o*(.0802894+199025e-9*o)+u*(3*(.0998909-.02855*o)-.245516*u),_=h*f-p*c,v=(l*h-s*p)/_,d=(s*f-l*c)/_;i-=v,r-=d}while((so(v)>Eo||so(d)>Eo)&&--e>0);return e&&[i,r]},hi.invert=function(t,n){var i=t*t,r=n*n,e=r+1,o=t?To*Pn((e-Pn(i*i+2*i*(r-1)+e*e))/i+1):1/Pn(e);return[Tn(t*o),xo(n)*Nn(o)]},fi.invert=function(t,n){var i,r=n,e=25;do{var o=r*r,u=o*o;r-=i=(r*(1.007226+o*(.015085+u*(-.044475+.028874*o-.005916*u)))-n)/(1.007226+o*(.045255+u*(-.311325+.259866*o-.005916*11*u)))}while(so(i)>Eo&&--e>0);return[t/(.8707+(o=r*r)*(-.131979+o*(-.013791+o*o*o*(.003971-.001529*o)))),r]};var Ko=1.0148,Vo=.23185,tu=-.14499,nu=.02406,iu=Ko,ru=5*Vo,eu=7*tu,ou=9*nu,uu=1.790857183;pi.invert=function(t,n){n>uu?n=uu:n<-uu&&(n=-uu);var i,r=n;do{var e=r*r;r-=i=(r*(Ko+e*e*(Vo+e*(tu+nu*e)))-n)/(iu+e*e*(ru+e*(eu+ou*e)))}while(so(i)>Eo);return[t,r]};var au=function(){return jt(pi).scale(139.319)},su=function(){return jt(Do(ni)).scale(111.48).rotate([-90,-90,45]).clipAngle(179.999)};_i.invert=function(t,n){if(so(n)<Eo)return[t,0];var i,r=t*t+n*n,e=.5*n,o=10;do{var u=wo(e),a=1/ho(e),s=r-2*n*e+e*e;e-=i=(u*s+2*(e-n))/(2+s*a*a+2*(e-n)*u)}while(so(i)>Eo&&--o>0);return u=wo(e),[(so(n)<so(e+1/u)?Tn(t*u):xo(t)*(Nn(so(t*u))+So))/mo(e),e]};var lu=[[.9986,-.062],[1,0],[.9986,.062],[.9954,.124],[.99,.186],[.9822,.248],[.973,.31],[.96,.372],[.9427,.434],[.9216,.4958],[.8962,.5571],[.8679,.6176],[.835,.6769],[.7986,.7346],[.7597,.7903],[.7186,.8435],[.6732,.8936],[.6213,.9394],[.5722,.9761],[.5322,1]];lu.forEach(function(t){t[1]*=1.0144}),vi.invert=function(t,n){var i=n/So,r=90*i,e=yo(18,so(r/5)),o=vo(0,po(e));do{var u=lu[o][1],a=lu[o+1][1],s=lu[yo(19,o+2)][1],l=s-u,c=s-2*a+u,h=2*(so(i)-a)/l,f=c/l,p=h*(1-f*h*(1-2*f*h));if(p>=0||1===o){r=(n>=0?5:-5)*(p+e);var _,v=50;do e=yo(18,so(r)/5),o=po(e),p=e-o,u=lu[o][1],a=lu[o+1][1],s=lu[yo(19,o+2)][1],r-=(_=(n>=0?So:-So)*(a+p*(s-u)/2+p*p*(s-2*a+u)/2)-n)*Ao;while(so(_)>bo&&--v>0);break}}while(--o>=0);var d=lu[o][0],y=lu[o+1][0],g=lu[yo(19,o+2)][0];return[t/(y+p*(g-d)/2+p*p*(g-2*y+d)/2),r*Co]},di.invert=function(t,n){if(so(n)<Eo)return[t,0];if(so(t)<Eo)return[0,So*mo(2*lo(n/Mo))];var i=(t/=Mo)*t,r=(n/=Mo)*n,e=i+r,o=e*e,u=-so(n)*(1+e),a=u-2*r+i,s=-2*u+1+2*r+o,l=r/s+(2*a*a*a/(s*s*s)-9*u*a/(s*s))/27,c=(u-a*a/(3*s))/s,h=2*Pn(-c/3),f=Nn(3*l/(c*h))/3;return[Mo*(e-1+Pn(1+2*(i-r)+o))/(2*t),xo(n)*Mo*(-h*ho(f+Mo/3)-a/(3*s))]},yi.invert=function(t,n){if(!t)return[0,So*mo(2*lo(n/Mo))];var i=so(t/Mo),r=(1-i*i-(n/=Mo)*n)/(2*i),e=r*r,o=Pn(e+1);return[xo(t)*Mo*(o-r),xo(n)*So*mo(2*co(Pn((1-2*r*i)*(r+o)-i),Pn(o+r+i)))]},gi.invert=function(t,n){if(!n)return[t,0];var i=n/Mo,r=(Mo*Mo*(1-i*i)-t*t)/(2*Mo*t);return[t?Mo*(xo(t)*Pn(r*r+1)-r):0,So*mo(2*lo(i))]},xi.invert=function(t,n){var i;if(!t||!n)return[t,n];n/=Mo;var r=xo(t)*t/So,e=(r*r-1+4*n*n)/so(r),o=e*e,u=2*n,a=50;do{var s=u*u,l=(8*u-s*(s+2)-5)/(2*s*(u-1)),c=(3*u-s*u-10)/(2*s*u),h=l*l,f=u*l,p=u+l,_=p*p,v=u+3*l,d=_*(s+h*o-1)+(1-s)*(s*(v*v+4*h)+h*(12*f+4*h)),y=-2*p*(4*f*h+(1-4*s+3*s*s)*(1+c)+h*(-6+14*s-o+(-8+8*s-2*o)*c)+f*(-8+12*s+(-10+10*s-o)*c)),g=Pn(d),x=e*(_+h-1)+2*g-r*(4*_+o),m=e*(2*l*c+2*p*(1+c))+y/g-8*p*(e*(-1+h+_)+2*g)*(1+c)/(o+4*_);u-=i=x/m}while(i>Eo&&--a>0);return[xo(t)*(Pn(e*e+4)+e)*Mo/4,So*u]};var cu=4*Mo+3*Pn(3),hu=2*Pn(2*Mo*Pn(3)/cu);In(hu*Pn(3)/Mo,hu,cu/6);mi.invert=function(t,n){var i=t,r=n,e=25;do{var o,u=ho(r),a=mo(r),s=mo(2*r),l=a*a,c=u*u,h=mo(i),f=ho(i/2),p=mo(i/2),_=p*p,v=1-c*f*f,d=v?Nn(u*f)*Pn(o=1/v):o=0,y=.5*(2*d*u*p+i/So)-t,g=.5*(d*a+r)-n,x=.5*o*(c*_+d*u*f*l)+.5/So,m=o*(h*s/4-d*a*p),w=.125*o*(s*p-d*a*c*h),E=.5*o*(l*f+d*_*u)+.5,b=m*w-E*x,M=(g*m-y*E)/b,S=(y*w-g*x)/b;i-=M,r-=S}while((so(M)>Eo||so(S)>Eo)&&--e>0);return[i,r]};var fu=["#00ce5c","#d800a2","#00d9d2","#AF5100","#bfbfbf","#DE0000","#F0DE00","#9200ff","#ED9200","#00aeff"],pu=["#56d58e","#d95cba","#63eae4","#C78348","#d6d6d6","#E06363","#FFF741","#965ede","#FCBB54","#73c5eb"],_u=["#a5e6c3","#eda3da","#9af8f4","#EDC19C","#e5e5e5","#F5AAAA","#F7EFC3","#c6a8ef","#F8D296","#addbf0"],vu={green:0,pink:1,aqua:2,brown:3,grey:4,red:5,yellow:6,purple:7,orange:8,blue:9},du={standard:pu,darker:fu,lighter:_u,names:vu},yu={light:{background:"#ffffff",text:"#262626",axis:"#262626",grid:"#e0e0e0",highlight:"rgba(225,16,16,0.5)",lowlight:"rgba(127,127,127,0.3)",shadow:"rgba(127,127,127,0.4)",fillOpacity:.33,negative:{background:"rgba(0, 0, 0, 0.66)",text:"#ffffff"}},dark:{background:"#333333",text:"#ffffff",axis:"#ffffff",grid:"#6d6d6d",highlight:"rgba(225,16,16,0.5)",lowlight:"rgba(127,127,127,0.5)",shadow:"rgba(255,255,255,0.4)",fillOpacity:.33,negative:{background:"rgba(255, 255, 255, 0.85)",text:"#262626"}}},gu=(Ei(function(t){function n(t,n){return 1-3*n+3*t}function i(t,n){return 3*n-6*t}function r(t){return 3*t}function e(t,e,o){return((n(e,o)*t+i(e,o))*t+r(e))*t}function o(t,e,o){return 3*n(e,o)*t*t+2*i(e,o)*t+r(e)}function u(t,n,i,r,o){var u,a,s=0;do a=n+(i-n)/2,u=e(a,r,o)-t,u>0?i=a:n=a;while(Math.abs(u)>c&&++s<h);return a}function a(t,n,i,r){for(var u=0;u<s;++u){var a=o(n,i,r);if(0===a)return n;var l=e(n,i,r)-t;n-=l/a}return n}var s=4,l=.001,c=1e-7,h=10,f=11,p=1/(f-1),_="function"==typeof Float32Array;t.exports=function(t,n,i,r){function s(n){for(var r=0,e=1,s=f-1;e!==s&&c[e]<=n;++e)r+=p;--e;var h=(n-c[e])/(c[e+1]-c[e]),_=r+h*p,v=o(_,t,i);return v>=l?a(n,_,t,i):0===v?_:u(n,r,r+p,t,i)}if(!(0<=t&&t<=1&&0<=i&&i<=1))throw new Error("bezier x values must be in [0, 1] range");var c=_?new Float32Array(f):new Array(f);if(t!==n||i!==r)for(var h=0;h<f;++h)c[h]=e(h*p,t,i);return function(o){return t===n&&i===r?o:0===o?0:1===o?1:e(s(o),n,r)}}}),{outline:.5,data:2.5,axis:1,grid:2}),xu='-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',mu={fixed:{cssImport:"@import url(https://fonts.googleapis.com/css?family=Source+Code+Pro:300,500);",weightMonochrome:300,weightColor:500,sizeForWidth:bi,family:'"Source Code Pro", Consolas, "Liberation Mono", Menlo, Courier, monospace'},variable:{cssImport:"@import url(https://fonts.googleapis.com/css?family=Raleway:400,500);",weightMonochrome:400,weightColor:500,sizeForWidth:bi,family:'"Raleway", "Trebuchet MS", '+xu},brand:{cssImport:"@import url(https://fonts.googleapis.com/css?family=Electrolize);",weightMonochrome:400,weightColor:400,sizeForWidth:bi,family:'"Electrolize", '+xu}},wu={geoAlbersUsa:je,geoEquirectangular:Re,geoAlbers:ze,geoGuyou:Ho,geoMercator:Le,geoOrthographic:Oe,geoPatterson:au,geoPeirceQuincuncial:su,geoInterruptedHomolosine:Jo,geoInterruptedBoggs:Uo,geoInterruptedMollweideHemispheres:$o},Eu={geoPeirceQuincuncial:{a:1,s:4.47613863},geoPatterson:{a:.5700506757,s:2*Math.PI},geoMercator:{a:1,s:2*Math.PI},geoOrthographic:{a:1,s:2}},bu=960,Mu={a:.5,s:2*Math.PI},Su=4,ku=24,Tu=0;t.version=ki,t.html=Si,Object.defineProperty(t,"__esModule",{value:!0})});
	//# sourceMappingURL=d3-rs-geo.umd-es2015.min.js.map
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

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

	// https://d3js.org/d3-transition/ Version 1.0.3. Copyright 2016 Mike Bostock.
	(function (global, factory) {
	   true ? factory(exports, __webpack_require__(10), __webpack_require__(12), __webpack_require__(13), __webpack_require__(14), __webpack_require__(15), __webpack_require__(16)) :
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
/* 12 */
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
/* 13 */
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
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	// https://d3js.org/d3-interpolate/ Version 1.1.3. Copyright 2017 Mike Bostock.
	(function (global, factory) {
	   true ? factory(exports, __webpack_require__(15)) :
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
/* 15 */
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
/* 16 */
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


/***/ }
/******/ ]);
//# sourceMappingURL=view.umd-es2015.js.map