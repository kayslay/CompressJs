/**
 * Created by kayslay on 6/28/17.
 */

const mainCanvas = document.createElement('canvas');

/**
 * @description creates an array of images and set their dimensions
 * @param {[String]} filesUrl
 * @param {Emitter} emitter
 * @param {Object} dimension
 */
function createImages(filesUrl, emitter, dimension = {}) {
	let Images = [];
	let count = 0;
	return filesUrl.map(url => {
		let image = new Image();
		image.src = url;
		image.onload = () => {
			Images.push({img: image, dimension: Object.assign({}, {width: image.width, height: image.height}, dimension)});
			if (count === 0) {
				emitter.emit('ImageCreated', Images)
			}
		}

	})
}

/**
 * @description the place where the compression work is done
 * @param {{img:Image,dimension:{}} image
 * @param {Number} rate
 * @returns {string}
 */
export function compress(image, rate) {
	const context = mainCanvas.getContext('2d');
	mainCanvas.width = image.dimension.width;
	mainCanvas.height = image.dimension.height;
	context.drawImage(image.img, 0, 0, image.dimension.width, image.dimension.height);
	return mainCanvas.toDataURL("image/jpeg", rate/100);
}

/**
 * @description start the compression
 * @param {String} fileUrl
 * @param {Emitter } emitter
 * @param {Object}dimension
 */
export default function compressAll(fileUrl, emitter, {dimension}) {
	emitter.emit('compressing'); // notify loaders that are interested in knowing when the compression starts

	createImages(fileUrl, emitter, dimension);
}




