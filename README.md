
# CompresJs

CompressJs is a simple library that compresses png and jpeg images to smaller jpeg images. Compress make use of the Canvas element internally for 
compressing the images. 


## Dependencies
CompressJs is not dependent on any script, just use it.

## Installation
CompressJs can be downloaded from the CompressJs github repo (https://github.com/kayslay/CompressJs).

#### bower

        $ bower install CompressJs --save

#### npm

        $ npm install compress-js --save
      

## Demo and Tutorial
check out [demo](https://kayslay.github.io/CompressJs/demo) or open demo/index.html to see alive example of the library


### Usage

#### HTML

 ```html
  <script src="../dist/compressjs.js"></script>
 ```
#### JAVASCRIPT

```javascript
let comp = Compress({
		inputSelector: '#input_cmprss',
		downloadSelector: '#comp_download',
		imageSelector: '#comp_img',
		dropSelector: ".img-con",
		rate: 100,
		imagePrefix: 'compressed-',
		dimen: null,
		rateSelector: '#comp_rate',
	});
	comp.on('compressed', (files) => {
		console.group('compressed images data url');
		console.log('this array contains the url for the compressed images');
		console.log(files);
		console.log('listen to the compressed event to get the array');
		console.groupEnd();
	});

	comp.on('compressing', () => console.log('compressing'))

```
The Compress function returns an Object. The Obejct returned by the Compress function contains two properties:
#### options: 
The option give you the ability to get and set the Compress.options

#### on:
The `on`  methods adds a listener to an event fired by Compress.

The events that can be emitted by Compressjs:
- **startCompression :** fired to start the compression. the `listener` takes three arguments:

    - fileUrl `{String[]}`: An array of the data urls for the original images dropped or inputted.
    - emitter `{Emitter}` : This Object manages the event emitting and listening.
    - {dimension} `{dimension:{width:Number,height:{Number}}}`: an Object containing a dimension property.
    
- **saveFileUrl :** fired to save the original data url of the images added. the `listener` takes an argument:

    - fileUrl `{String[]}`: An array of the data urls for the original images dropped or inputted.
- **compressed :** fired when the images have been compressed. the `listener` takes an argument:
    - compressedImgs `{String[]}`: An array of the data urls for the compress imagesg.



## Compress.options

The Compression

### The Properties of Compress.option

 - **inputSelector** :: this is the selector of the input element that selects the image.
 - **downloadSelector** :: this is the selector of the link that would be used to download the compressed image.
 - **imageSelector** :: this is the selector for the img tag that's used to preview the compressed image.
 - **dropSelector** :: the selector of the element to drop the image for compression.
 - **rate** :: the default rate at which the image is compressed. the lower the rate the higher the compression.
 - **imagePrefix** :: the prefix to the name of the compressed file when downloaded.
 - **dimen**: : an object literal holding the width and height of the compressed image.
 - **rateSelector** :: the selector of the element used to control the rate of compression
