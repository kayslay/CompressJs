<<<<<<< HEAD
#CompresJs
=======
# CompresJs
>>>>>>> 26556aead5436e88cd4f82e1a28d3694541b73d8
CompressJs is a simple library that compresses png and jpeg images to smaller jpeg images. CompressJs fully support's jpeg image compression, other image file they would be converted to jpeg images.
For PNG images, it compresses but changes the image type to jpeg, and if the file has transparent parts they would be converted to black blank area's.
For GIF images,  it compresses but changes the image type to jpeg that contains only the first part of the gif

<<<<<<< HEAD
##Dependencies
CompressJs is not dependent on any script, just use it.
##Installation
CompressJs can be downloaded from the CompressJs github repo (https://github.com/kayslay/CompressJs).


###bower
bower install CompressJs --save

##Demo and Tutorial
open demo/index.html to see alive example of the library

###Hello World(Quick example)
=======
## Dependencies
CompressJs is not dependent on any script, just use it.
## Installation
CompressJs can be downloaded from the CompressJs github repo (https://github.com/kayslay/CompressJs).


### bower
bower install CompressJs --save

## Demo and Tutorial
open demo/index.html to see alive example of the library

### Hello World(Quick example)
>>>>>>> 26556aead5436e88cd4f82e1a28d3694541b73d8
create a javascript file . let's say main.js.
_main.js_
```javascript
       
//run the default fn
    var comp = new Compress({
        changeFn: function (e, file) {
            comp.compress();
        },
        rateSelector: "#slider",
        rateFn: function (e) {
            var target = e.target;
            this.option.rate = parseInt(target.value)
            this.compress();
        }
    });
    comp.option.downloadSelector = "#comp_download"; // set the downolad button selector
```
        
 _index.html_

 ```html

 <div id="first_test">
     <img src="" alt="" id="img">
     <input type="file" name="file" id="input_cmprss">
     <a href="" download="file" id="comp_download">download</a>
     <input type="range" min="0" max="10" id="slider">

 </div>
     <script src="../js/app/compress.js"></script>
 ```
Then run the index file on your browser. It's that easy

<<<<<<< HEAD
##Compress.option
=======
## Compress.option
>>>>>>> 26556aead5436e88cd4f82e1a28d3694541b73d8

The Compress option is the configuration of the Compress Object instance. the Compress.optionis an Object Literal that contains properties
used to set the behaviour of the Compress.

<<<<<<< HEAD
###The Properties of Compress.option
=======
### The Properties of Compress.option
>>>>>>> 26556aead5436e88cd4f82e1a28d3694541b73d8

 - **inputSelector** :: this is the selector of the input element thst selects the image.
 - **downloadSelector** :: this is the selector of the link that would be used to download the compressed image. downloadSelector must be set on creation of the Compress Object.
 - **imageSelector** :: this is the selector for the img tag that's used to preview the compressed image.
 - **changeFn** :: the function to be called when the input is changed.
 - **dropFn**  :: the function to be called when there is a drop on the input o the dropSelector.
 - **dropSelector** :: the selector of the elemnt to drop the image for compression.
 - **rate** :: the default rate at which the image is compressed. the lower the rate the higher the compression.
 - **imagePrefix** :: the prefix to the name of the compressed file when downloaded.
 - **dimen**: : an object literal holding the width and height of the compressed image.
 - **compressFn** :: the function to be called as soon as comression is complete
 - **rateSelector** :: the selctor of the element used to control the rate of compression
 - **rateEvent** :: the event fired that call the rateFn
 - **rateFn** :: the function that changes the rate of the compression
