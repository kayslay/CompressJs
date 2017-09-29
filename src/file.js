/**
 * @description gets the file from the input.files or the dragged dataTransfer.files
 * @param {Event} e
 * @param {Emitter} emitter
 * @returns {File[]}
 */
function getFile(e, emitter) {
	const files = Array.from(e.target.files || e.dataTransfer.files);

	const event = e.target.files ? "changed" : "dropped";
	emitter.emit(event, files);
	return files
}

/**
 * @description gets the data url of the images uploaded
 * @param {File[]} files
 * @param {Emitter} emitter
 */
function getImageUrl(files, emitter, ...extra) {
	const reader = new FileReader();
	let count = 0;
	let filesUrl = [];

	reader.onload = function () {
		count--;
		filesUrl.push(reader.result);
		if (count === 0) {
			emitter.emit('saveFileUrl',filesUrl);
			emitter.emit('startCompression', filesUrl, emitter, ...extra) // for the compression to start
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
