/**
 * Created by kayslay on 6/28/17.
 */

import fileListener from './file'
import Emitter from './emitter'
import compressAll, {compress} from './compress'

function Compress(options) {
	const defaultOptions = {
		rate: 50,
		imagePrefix: 'compressed-',
		name: "image"
	};

	const option = Object.assign({}, defaultOptions, options);

	let currentFiles = []; //holds the original images data url
	let compressedURLs = []; //holds the compressed images data url

	const inputElem = option.inputSelector ? setElems(option.inputSelector, 'change') : null;
	//set the dropElement
	const dropElem = option.dropSelector ? setElems(option.dropSelector, 'drop') : null;
	setDropElem(dropElem);

	const rateElem = option.rateSelector ? setRateElems(option.rateSelector, 'change') : null;

	const downloadElem = option.downloadSelector ? document.querySelector(option.downloadSelector) : null;
	downloadElem.addEventListener('click', download);
	let link = null;

	const emitter = new Emitter();

	//SET THE EVENTS
	//compress the images on startCompression
	emitter.on('startCompression', compressAll);
	//set the current files when the files have been saved
	emitter.on('saveFileUrl', (files) => {
		currentFiles = files
	});
	//compress the images have been created
	emitter.on('ImageCreated', (images) => {
		const compressedImg = images.map(image => compress(image, option.rate));
		emitter.emit("compressed", compressedImg) // for the compression to start
	});
//set compressedURLs and the image src when the compression is finished
	emitter.on("compressed", (compressedSrc) => {
		if (option.imageSelector) {
			document.querySelector(option.imageSelector).src = compressedSrc[0]
		}
		compressedURLs = compressedSrc
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
	function setElems(selector, eventName, single = true) {

		let elem = single ? document.querySelector(selector) : Array.from(document.querySelectorAll(selector));

		if (Array.isArray(elem)) {
			elem.forEach(el => {
				addListeners(el, eventName, (ev) => {
					fileListener(ev, emitter, {rate: option.rate, dimension: option.dimen})
				})
			})
		} else {
			addListeners(elem, eventName, (ev) => {
				fileListener(ev, emitter, {rate: option.rate, dimension: option.dimen})
			})
		}
		return elem
	}

	/**
	 * @description adds events to the rateElem.
	 * @param {String} selector
	 * @param {String} eventName
	 * @param {Boolean} single
	 * @returns {Element[]|Element}
	 */
	function setRateElems(selector, eventName, single = true) {

		let elem = single ? document.querySelector(selector) : Array.from(document.querySelectorAll(selector));

		if (Array.isArray(elem)) {
			elem.forEach(el => {
				addListeners(el, eventName, (ev) => {
					option.rate = parseInt(ev.target.value);
					emitter.emit('startCompression', currentFiles, emitter, {rate: option.rate, dimension: option.dimen})
				})
			})
		} else {
			addListeners(elem, eventName, (ev) => {
				option.rate = parseInt(ev.target.value);
				emitter.emit('startCompression', currentFiles, emitter, {rate: option.rate, dimension: option.dimen})
			})
		}
		return elem
	}

	/**
	 * @description adds events
	 * @param {Element} el
	 * @param {String} eventName
	 * @param {function} cb
	 */
	function addListeners(el, eventName, cb) {
		el.addEventListener(eventName, ev => {
			ev.preventDefault();
			ev.stopPropagation();
			cb(ev)
		})
	}

	/**
	 * @description adds events to the dropElem.
	 * @param {Element} dropElem
	 */
	function setDropElem(dropElem) {
		if (dropElem) {
			dropElem.addEventListener('dragenter', e => {
				e.preventDefault();
				console.log('drag entered');
			});

			dropElem.addEventListener('dragover', e => {
				e.preventDefault();
				console.log('drag entered');
			});

			dropElem.addEventListener('dragleave', e => {
				e.preventDefault();
				console.log('drag entered');
			})
		}
	}

	/**
	 * @description used to download the compressed images
	 * @param {Event} ev
	 */
	function download(ev) {
		ev.preventDefault();
		ev.stopPropagation();
		let a = link = link || document.createElement('a');
		a.download = option.imagePrefix + option.name.replace(/\..+/, '');
		a.href = compressedURLs[0];
		a.click();
	}

	return {
		options: option,
		on(eventName, callback) {
			emitter.on(eventName, callback)
		}
	}

}

global.Compress = Compress;


