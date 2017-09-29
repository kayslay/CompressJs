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
		rate: 50,
		imagePrefix: 'compressed-',
		name: "image"
	};

	var option = Object.assign({}, defaultOptions, options);

	var currentFiles = []; //holds the original images data url
	var compressedURLs = []; //holds the compressed images data url

	var inputElem = option.inputSelector ? setElems(option.inputSelector, 'change') : null;
	//set the dropElement
	var dropElem = option.dropSelector ? setElems(option.dropSelector, 'drop') : null;
	setDropElem(dropElem);

	var rateElem = option.rateSelector ? setRateElems(option.rateSelector, 'change') : null;

	var downloadElem = option.downloadSelector ? document.querySelector(option.downloadSelector) : null;
	downloadElem.addEventListener('click', download);
	var link = null;

	var emitter = new _emitter2.default();

	//SET THE EVENTS
	//compress the images on startCompression
	emitter.on('startCompression', _compress2.default);
	//set the current files when the files have been saved
	emitter.on('saveFileUrl', function (files) {
		currentFiles = files;
	});
	//compress the images have been created
	emitter.on('ImageCreated', function (images) {
		var compressedImg = images.map(function (image) {
			return (0, _compress.compress)(image, option.rate);
		});
		emitter.emit("compressed", compressedImg); // for the compression to start
	});
	//set compressedURLs and the image src when the compression is finished
	emitter.on("compressed", function (compressedSrc) {
		if (option.imageSelector) {
			document.querySelector(option.imageSelector).src = compressedSrc[0];
		}
		compressedURLs = compressedSrc;
	});

	//SET THE EVENTS

	/**
  * @description adds events to the selector elements
  * handles selectors that return multiple elements too.
  * Why this function? the functions meant to make it easily to change/ add support for multiple selectors
  *
  * @param {String} selector
  * @param {String} eventName
  * @param {Boolean} single
  * @returns {Element[]|Element}
  */
	function setElems(selector, eventName) {
		var single = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;


		var elem = single ? document.querySelector(selector) : Array.from(document.querySelectorAll(selector));

		if (Array.isArray(elem)) {
			elem.forEach(function (el) {
				addListeners(el, eventName, function (ev) {
					(0, _file2.default)(ev, emitter, { rate: option.rate, dimension: option.dimen });
				});
			});
		} else {
			addListeners(elem, eventName, function (ev) {
				(0, _file2.default)(ev, emitter, { rate: option.rate, dimension: option.dimen });
			});
		}
		return elem;
	}

	/**
  * @description adds events to the rateElem.
  * @param {String} selector
  * @param {String} eventName
  * @param {Boolean} single
  * @returns {Element[]|Element}
  */
	function setRateElems(selector, eventName) {
		var single = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;


		var elem = single ? document.querySelector(selector) : Array.from(document.querySelectorAll(selector));

		if (Array.isArray(elem)) {
			elem.forEach(function (el) {
				addListeners(el, eventName, function (ev) {
					option.rate = parseInt(ev.target.value);
					emitter.emit('startCompression', currentFiles, emitter, { rate: option.rate, dimension: option.dimen });
				});
			});
		} else {
			addListeners(elem, eventName, function (ev) {
				option.rate = parseInt(ev.target.value);
				emitter.emit('startCompression', currentFiles, emitter, { rate: option.rate, dimension: option.dimen });
			});
		}
		return elem;
	}

	/**
  * @description adds events
  * @param {Element} el
  * @param {String} eventName
  * @param {function} cb
  */
	function addListeners(el, eventName, cb) {
		el.addEventListener(eventName, function (ev) {
			ev.preventDefault();
			ev.stopPropagation();
			cb(ev);
		});
	}

	/**
  * @description adds events to the dropElem.
  * @param {Element} dropElem
  */
	function setDropElem(dropElem) {
		if (dropElem) {
			dropElem.addEventListener('dragenter', function (e) {
				e.preventDefault();
				console.log('drag entered');
			});

			dropElem.addEventListener('dragover', function (e) {
				e.preventDefault();
				console.log('drag entered');
			});

			dropElem.addEventListener('dragleave', function (e) {
				e.preventDefault();
				console.log('drag entered');
			});
		}
	}

	/**
  * @description used to download the compressed images
  * @param {Event} ev
  */
	function download(ev) {
		ev.preventDefault();
		ev.stopPropagation();
		var a = link = link || document.createElement('a');
		a.download = option.imagePrefix + option.name.replace(/\..+/, '');
		a.href = compressedURLs[0];
		a.click();
	}

	return {
		options: option,
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
 * @description gets the file from the input.files or the dragged dataTransfer.files
 * @param {Event} e
 * @param {Emitter} emitter
 * @returns {File[]}
 */
function getFile(e, emitter) {
	var files = Array.from(e.target.files || e.dataTransfer.files);

	var event = e.target.files ? "changed" : "dropped";
	emitter.emit(event, files);
	return files;
}

/**
 * @description gets the data url of the images uploaded
 * @param {File[]} files
 * @param {Emitter} emitter
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
			emitter.emit('saveFileUrl', filesUrl);
			emitter.emit.apply(emitter, ['startCompression', filesUrl, emitter].concat(extra)); // for the compression to start
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

	//event listener


	_createClass(Emitter, [{
		key: "on",
		value: function on(eventName, callback) {
			var event = this._events;
			event[eventName] = event[eventName] || [];
			event[eventName].push(callback);
		}

		//fire the event

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


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.compress = compress;
exports.default = compressAll;
/**
 * Created by kayslay on 6/28/17.
 */

var mainCanvas = document.createElement('canvas');

/**
 * @description creates an array of images and set their dimensions
 * @param {[String]} filesUrl
 * @param {Emitter} emitter
 * @param {Object} dimension
 */
function createImages(filesUrl, emitter) {
	var dimension = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

	var Images = [];
	var count = 0;
	return filesUrl.map(function (url) {
		var image = new Image();
		image.src = url;
		image.onload = function () {
			Images.push({ img: image, dimension: Object.assign({}, { width: image.width, height: image.height }, dimension) });
			if (count === 0) {
				emitter.emit('ImageCreated', Images);
			}
		};
	});
}

/**
 * @description the place where the compression work is done
 * @param {{img:Image,dimension:{}} image
 * @param {Number} rate
 * @returns {string}
 */
function compress(image, rate) {
	var context = mainCanvas.getContext('2d');
	mainCanvas.width = image.dimension.width;
	mainCanvas.height = image.dimension.height;
	context.drawImage(image.img, 0, 0, image.dimension.width, image.dimension.height);
	return mainCanvas.toDataURL("image/jpeg", rate / 100);
}

/**
 * @description start the compression
 * @param {String} fileUrl
 * @param {Emitter } emitter
 * @param {Object}dimension
 */
function compressAll(fileUrl, emitter, _ref) {
	var dimension = _ref.dimension;

	emitter.emit('compressing'); // notify loaders that are interested in knowing when the compression starts

	createImages(fileUrl, emitter, dimension);
}

/***/ })
/******/ ]);
//# sourceMappingURL=compressjs.js.map