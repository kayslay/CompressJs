#CompresJs
CompressJs is a library that compresses png and jpeg images to smaller jpeg images.

##Dependencies
CompressJs is not dependent on any script, just use it
##Instalation
CompressJs can be downloaded from the CompressJs github repo (https://github.com/kayslay/CompressJs).

##Demo and Tutorial
open comp.html to see alive example of the library

###Hello World(Quick example)
_script/main.js_
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
