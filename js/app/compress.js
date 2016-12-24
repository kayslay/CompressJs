/**
 * Created by kayode on 12/16/2016.
 */
(function (global, factory) {
    "use strict";

    if (typeof define === 'function' && define.amd) { // AMD + global
        define([], function () {
            return (global.Compress = factory(global));
        });
    }
    else if (typeof module === "object" && typeof module.exports === "object") {
        //For commonJs environment and its environment like libraries
        //For nodeJs community which also uses window and not a document based interface for operation
        //we try to take care of the discrepancy between this libraries in that environment and in a nodeJs like type of environs
        //Compress needs a document for the service based version of the library
        //so throw Error if a document is not found
        module.exports = global.document ? global.Compress = factory(global) :
            function (win) {
                if (!win.document) {
                    throw new Error("Compress requires a document to run by default");
                }
                return global.Compress = factory(win);
            }
    }
    else {
        //for the browser based globals (We also try to tell the user that a document is required)
        global.document ? global.Compress = factory(global) : (function () {
                throw new Error("Compress requires a document to run by default");
            })();
    }
})(typeof window !== undefined ? window : this, function (global) {
    //utils
    /**
     *extend's the properties of the target object from the suource object
     *
     * @param target {Object} the target to extend
     * @param source {...Object} the sources to extend from
     */
    var extend = function (target, source) {
        var args = Array.prototype.slice.call(arguments, 1);
        if (!target) {
            return console.log('the target object needed')
        }
        if (args.length < 1) {
            return console.log('at least one source object is needed')
        }
        for (var i = 0; i < args.length; i++) {
            var source = args[i];
            for (var prop in source) {
                if (source.hasOwnProperty(prop)) {
                    target[prop] = source[prop];
                }
            }
        }
        return target;
    };


    //region EventListeners
    /**
     *
     *
     */
    var eventListeners = {
        change: function (e) {
            this.files = Array.prototype.slice.call(e.target.files);
            //fire the changeFn if set
            if (this.option.changeFn) {
                this.option.changeFn(e, this.files);
            }
        },
//not in use for now
        //Todo: make use of this
        drop: function (e) {
            this.files = Array.prototype.slice.call(e.target.files);
            //fire the changeFn if set
            if (this.option.dropFn) {
                this.option.dropFn(e, this.files);
            }
        }

    };

    //endregion
// sets the event listeners to the input element
    var setEvent = function () {
        var input = document.querySelectorAll(this.option.inputSelector)[0];
        for (var event in eventListeners) {
            input.addEventListener(event, eventListeners[event].bind(this))
        }
        if (this.option.rateSelector) {
            var rateElem = document.querySelectorAll(this.option.rateSelector)[0];
            rateElem.addEventListener(this.option.rateEvent, this.option.rateFn.bind(this));
        }
        console.log(this)
    };

    /**
     * this is a default function that is called after the image is compressed
     * it take a single parameter - the source of the compressed image
     * @param src the src of the compressed file
     */
    function defaultCompressFn(src) {
       console.log('compressed file ')
    }

//the default rateFn
    function defaultRateFn(e) {
        var target = e.target;
        this.option.rate = parseInt(target.value)
    }

    /**
     *An object literal containing the default config for the
     * compress object
     *The allowed options
     * -----------------------------------------------------------------------
     * inputSelector: the selector of the input element
     *
     * downloadSelector: the selector of the link used to download the image
     *
     * imageSelector:
     *
     * changeFn: function that is fired when the change event is fired on the input
     *
     * dropFn: function that is fired when the drop event is fired on the input
     * TODO: add more event listeners
     * rate: the rate of compression the lower the value, the higher the compression.
     *       the rate is between 0 - 100
     *
     * imagePrefix: the prefix of the compressed image name
     *
     *dimen: the width and height of the compressed image.
     *
     *compressFn: function called when the compression as compressed
     *
     * >>>the rate selector,Fn and event must be set on the creation of the Compress Object<<<
     * ----------------------------------------------------------------------------------------------
     * rateSelector: the selector that control's the rate of compression
     *
     * rateEvent: the event type that is fired to change the rate
     *
     * rateFn: the function tht is called by the
     */
    var option = {
        inputSelector: '#input_cmprss',
        downloadSelector: '#comp_download',
        imageSelector: '#comp_img',
        changeFn: null,
        dropFn: null,
        rate: 20,
        imagePrefix: 'compressed-',
        dimen: null,
        compressFn: defaultCompressFn,
        rateSelector: '#comp_rate',
        rateEvent: 'change',
        rateFn: defaultRateFn
    };
    /**
     *the constructor function
     * initialization
     * ----------------------------------------------------------------------------------------------------
     * example:
     *          1: var compress = new Compress() -> this uses the default options
     *          2: var compress = new Compress({inputSelector: "#input"}) -> this changes the input function;
     *          3: var compress = new Compress();
     *              compress.option.changeFn = function(){...};
     *              compress.option.inputSelector = "#input";
     *              sets the option properties after creating the instance of Compress
     *
     *
     * @param param
     * @constructor
     */
    var Compress = function (param) {
        //extends a new object to prevent new instances having the
        // same param due to reference in Objects
        var param = param || {};
        this.option = extend({}, option, param);
        setEvent.call(this);
    };


    /**
     * @private
     *this call the returnCompressLink, that creates the the compressed image
     * It then calls the option.compressFn
     * @param src the src from the FileReader result
     * @param dimension the dimension of the compressed image width and height.
     *        if the option.dimen not set it uses the image width
     */
    function createCompressed(src, dimension) {
        this.compSrc = returnCompressedLink.call(this, src, dimension);
        //download section
        if (this.option.compressFn) {
            this.option.compressFn.call(this, this.compSrc)
        }
    }

    function download() {
        var a = this.link || document.createElement('a');
        a.download = this.option.imagePrefix + this.files[0].name.replace(/\..+/, '');
         a.href = this.compSrc;
         a.click();
    };

    /**
     * this is where the compression of the image takes place.
     * if the dimen parameter is null it uses that of the image
     * @param src {string}the src of the image to compress
     * @param dimen  {{width:{number},height:{number}} the width and height of the compressed image
     * @returns {string}
     */
    function returnCompressedLink(src, dimen) {
        var canvas = Compress.canvas;
        var context = canvas.getContext('2d');
        var img2 = new Image();
        img2.src = src;
        var width, height;
        if (dimen) {
            width = canvas.width = dimen.width;
            height = canvas.height = dimen.height;
        } else {
            width = canvas.width = img2.width;
            height = canvas.height = img2.height;
        }
        context.drawImage(img2, 0, 0, width, height);
        return (canvas.toDataURL("image/jpeg", (this.option.rate / 100)));
    }

    /**
     * compresses the image. makes a call to the createCompressed private method
     * the creaeCompressed method is called when the FileReader result as loaded
     *
     *
     * @public
     *
     */
    function compress() {
        if (this.files && /image\/.+/.test(this.files[0].type)) {
            var reader = new FileReader();
            reader.onload = function () {
                createCompressed.call(this, reader.result, this.option.dimen)
            }.bind(this);
            reader.readAsDataURL(this.files[0])
        } else {
            console.error('an image must be selected and must be an image type')
        }

    }

//the prototype of the Compress class
    Compress.prototype = {
        constructor: Compress,
        version: '0.0.1',
        compress: compress,
        download: download
    };
//static property canvas
    var canvas = document.createElement('canvas');
    Compress.canvas = canvas;

    return Compress;
});
