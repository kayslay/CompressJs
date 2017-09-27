/**
 * Created by kayslay on 6/28/17.
 */

const mainCanvas = document.createElement('canvas');

function createImages(filesUrl, dimension) {
	"use strict";
	return filesUrl.map(url => {
		let image = new Image();
		image.src = url;
		return {image: image, dimension: Object.assign({}, dimension || {width: image.width, height: image.height})}
	})
}

function compress(image, rate) {
	const canvas = mainCanvas;
	const context = canvas.getContext('2d');
	context.drawImage(image.image,0,0,image.width,image.height);
	return (canvas.toDataURL("image/jpeg", (rate / 120)));
}

function compressAll(fileUrl,emitter,{rate,dimension}) {
	const images = createImages(fileUrl,dimension);
	emitter.emit("compressed",images.map(image=>compress(image,rate)))
}



