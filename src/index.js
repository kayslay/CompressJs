/**
 * Created by kayslay on 6/28/17.
 */

import fileListener from './file'
import Emitter from './emitter'
import compress from './compress'

function Compress(options) {
	const defaultOptions = {
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

	const option = Object.assign({}, defaultOptions, options)

	const inputElem = Array.from(document.querySelectorAll(option.inputSelector));
	const dropElem = Array.from(document.querySelectorAll(option.dropSelector));
	const emitter = new Emitter();

	inputElem.forEach(el => {
		"use strict";
		el.addEventListener('change', (ev) => {
			fileListener(ev, emitter, {rate: option.rate, dimension: option.dimen})
		})
	});

	dropElem.forEach(el => {
		"use strict";
		el.addEventListener('dr', (ev) => {
			fileListener(ev, emitter, {rate: option.rate, dimension: option.dimen})
		})
	});




	return {
		on(eventName, callback) {
			emitter.on(eventName, callback)
		}
	}

}

function setElems(){

}

global.Compress = Compress


