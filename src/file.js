/**
 *
 * @param {Event} e
 * @param {Emitter} emitter
 * @returns {Array}
 */
function getFile(e, emitter) {
	const files = Array.from(e.target.files || e.dataTransfer.files);

	const event = e.target.files ? "changed" : "dropped";
	emitter.emit(event, files);
	return files
}

//todo: is there a need to convert it to a arraybuffer or just use the url directly
//todo: add support for multiple images
/**
 *
 * @param files
 * @param emitter
 */
function getImageUrl(files, emitter, ...extra) {
	const reader = new FileReader();
	let count = 0;
	let filesUrl = [];
	reader.onload = function () {
		count--;
		filesUrl.push(reader.result);
		if (count === 0) {
			emitter.emit('readImageUrl', filesUrl, emitter, ...extra)
		}
	};
	files.forEach(file => {
		count++;
		reader.readAsDataURL(file)
	})
}

export default function (e, emitter, ...extra) {
	getImageUrl(getFile(e, emitter), emitter, ...extra)
}
