#CompresJs
CompressJs is a library that compresses png and jpeg images to smaller jpeg images. CompressJs fully supports jpeg image compression.
For other image file they would be converted to jpeg images.
In PNG images, it compresses but changes the image type to jpeg, and if the file has transparent parts they would be converted to black blank area's.
In GIF images,  it compresses but changes the image type to jpeg that contains only the first part of the gif

##Dependencies
CompressJs is not dependent on any script, just use it
##Installation
CompressJs can be downloaded from the CompressJs github repo (https://github.com/kayslay/CompressJs).


###bower


##Demo and Tutorial
open demo/index.html to see alive example of the library

###Hello World(Quick example)
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

##Compress.option

The Compress option is the configuration of the Compress Object instance. the Compress.optionis an Object Literal that contains properties
used to set the behaviour of the Compress.

###The Properties of Compress.option

 - **inputSelector** :: this is the selector of the input element thst selects the image. For now, Compress support's one
    input per Compress Object instance. It's takes the first of the selectors.
 - **downloadSelector** :: this is the selector of the link that would be used to download the compressed image. For now, Compress support's one
     link per Compress Object instance. It's takes the first of the selectors. downloadSelector must be set on creation of the Compress Object.

 - **imageSelector** :: this is the selector for the img tag that's used to preview the compressed image. For now, Compress support's one
      img tag per Compress Object instance. It's takes the first of the selectors.