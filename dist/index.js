/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/dists/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(1);


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

var _file = __webpack_require__(3);

var _file2 = _interopRequireDefault(_file);

var _emitter = __webpack_require__(4);

var _emitter2 = _interopRequireDefault(_emitter);

var _compress = __webpack_require__(5);

var _compress2 = _interopRequireDefault(_compress);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Compress(options) {
	var defaultOptions = {
		inputSelector: '#input_cmprss',
		downloadSelector: '#comp_download',
		imageSelector: '#comp_img',
		changeFn: null,
		dropFn: null,
		dropSelector: null,
		rate: 50,
		imagePrefix: 'compressed-',
		dimen: null,
		compressFn: null,
		rateSelector: '#comp_rate',
		rateEvent: 'change',
		rateFn: null
	};

	var option = Object.assign({}, defaultOptions, options);

	var inputElem = Array.from(document.querySelectorAll(option.inputSelector));
	var dropElem = Array.from(document.querySelectorAll(option.dropSelector));
	var emitter = new _emitter2.default();

	inputElem.forEach(function (el) {
		"use strict";

		el.addEventListener('change', function (ev) {
			(0, _file2.default)(ev, emitter, { rate: option.rate, dimension: option.dimen });
		});
	});
	dropElem.forEach(function (el) {
		"use strict";

		el.addEventListener('dr', function (ev) {
			(0, _file2.default)(ev, emitter, { rate: option.rate, dimension: option.dimen });
		});
	});

	return {
		on: function on(eventName, callback) {
			emitter.on(eventName, callback);
		}
	};
} /**
   * Created by kayslay on 6/28/17.
   */

global.Compress = Compress;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var g;

// This works in non-strict mode
g = function () {
	return this;
}();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1, eval)("this");
} catch (e) {
	// This works if the window reference is available
	if ((typeof window === "undefined" ? "undefined" : _typeof(window)) === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function (e, emitter) {
	for (var _len2 = arguments.length, extra = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
		extra[_key2 - 2] = arguments[_key2];
	}

	getImageUrl.apply(undefined, [getFile(e, emitter), emitter].concat(extra));
};

/**
 *
 * @param {Event} e
 * @param {Emitter} emitter
 * @returns {Array}
 */
function getFile(e, emitter) {
	var files = Array.from(e.target.files || e.dataTransfer.files);

	var event = e.target.files ? "changed" : "dropped";
	emitter.emit(event, files);
	return files;
}

//todo: is there a need to convert it to a arraybuffer or just use the url directly
//todo: add support for multiple images
/**
 *
 * @param files
 * @param emitter
 */
function getImageUrl(files, emitter) {
	for (var _len = arguments.length, extra = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
		extra[_key - 2] = arguments[_key];
	}

	var reader = new FileReader();
	var count = 0;
	var filesUrl = [];
	reader.onload = function () {
		count--;
		filesUrl.push(reader.result);
		if (count === 0) {
			emitter.emit.apply(emitter, ['readImageUrl', filesUrl, emitter].concat(extra));
		}
	};
	files.forEach(function (file) {
		count++;
		reader.readAsDataURL(file);
	});
}

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Emitter = function () {
	function Emitter() {
		_classCallCheck(this, Emitter);

		this._events = {};
	}

	_createClass(Emitter, [{
		key: "on",
		value: function on(eventName, callback) {
			var event = this._events;
			event[eventName] = event[eventName] || [];
			event[eventName].push(callback);
		}
	}, {
		key: "emit",
		value: function emit(eventName) {
			for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
				args[_key - 1] = arguments[_key];
			}

			var event = this._events;
			if (!(eventName in event)) return false;

			event[eventName].forEach(function (cb) {
				return cb.apply(undefined, args);
			});
		}
	}]);

	return Emitter;
}();

exports.default = Emitter;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Created by kayslay on 6/28/17.
 */

var mainCanvas = document.createElement('canvas');

function createImages(filesUrl, dimension) {
	"use strict";

	return filesUrl.map(function (url) {
		var image = new Image();
		image.src = url;
		return { image: image, dimension: Object.assign({}, dimension || { width: image.width, height: image.height }) };
	});
}

function compress(image, rate) {
	var canvas = mainCanvas;
	var context = canvas.getContext('2d');
	context.drawImage(image.image, 0, 0, image.width, image.height);
	return canvas.toDataURL("image/jpeg", rate / 120);
}

function compressAll(fileUrl, emitter, _ref) {
	var rate = _ref.rate,
	    dimension = _ref.dimension;

	var images = createImages(fileUrl, dimension);
	emitter.emit("compressed", images.map(function (image) {
		return compress(image, rate);
	}));
}

/***/ })
/******/ ]);
//# sourceMappingURL=index.js.map