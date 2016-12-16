/**
 * Created by kayode on 7/7/2016.
 */
var file = angular.module('file', []);
file.factory('$file', function () {
    var $fileList = [],
        $fileSrc = [],
        $file = {};


    /**
     * @param files [File] the file or files selected from the user box*/
    function fillList(files) {
        for (var i in files) {
            $file.$fileList[i] = files[i];
        }
    }

    /**
     *gets the FileList
     * @param target
     * @returns {FileList}
     */
    function getFile(target) {
        return target.files;
    }

    function count() {
        return $fileList.length;
    }


    var img2 = new Image();// creating this second image holds the original width and height of the image
    /**
     * this function sets the Reader object and compresses the image when its through loading the image src
     * @param reader
     * @param file
     */
    function setReader(reader, file) {
        var index = $file.$fileList.indexOf(file);
        if (!(/image/.test($file.getType()))) {
            $file.$fileSrc[index] = $file.scope.startImg;
            $file.scope.$apply(function () {
                $file.scope.src = $file.$fileSrc[index];
                var img = document.querySelector("#oriImg");
                img.onload = function () {
                    img2.src = img.src;
                    $file.scope.dimension = {'width': img2.width, 'height': img2.height};
                    $file.scope.$apply(compress(img, $file.scope.dimension));
                }
            });
            alert('file selected was not an image')
        } else {
            reader.readAsDataURL(file);
            reader.onload = function () {
                "use strict";

                $file.$fileSrc[index] = reader.result;
                $file.scope.$apply(function () {
                    $file.scope.src = $file.$fileSrc[index];
                    var img = document.querySelector("#oriImg");
                    img.onload = function () {
                        img2.src = img.src;
                        $file.scope.dimension = {'width': img2.width, 'height': img2.height};
                        $file.scope.$apply(compress(img, $file.scope.dimension));
                    }
                });
            }
        }

    }

    /**
     *the main function responsible for compressing the image
     * it calls the returnCompressedLink which returns
     * the base64 src for the image
     * @param img
     * @param dimension
     */
    //@todo create a function
    function compress(img, dimension) {
        var canvas = document.createElement('canvas');
        console.log(($file.scope.rate / 80));
        $file.scope.comp = returnCompressedLink(canvas, img, img);
        //download section
        $file.scope.download = "compressed-" + ($file.getName().replace(/\..+/, ''));
        $file.createLink(returnCompressedLink(canvas, img2, dimension))
    }

    /**
     * returns the compressed image url
     * @param canvas the canvas object
     * @param img the image object
     * @param dimen the dimension of the imae
     * @returns {string} the compressed url
     */
    function returnCompressedLink(canvas, img, dimen) {
        var context = canvas.getContext('2d');
        var img2 = new Image();
        img2.src = img.src;
        var width = canvas.width = dimen.width;
        var height = canvas.height = dimen.height;
        context.drawImage(img2, 0, 0, width, height);
        return canvas.toDataURL("image/jpeg", ($file.scope.rate / 80))
    }

    /**
     *@description gets the name of the file
     * @param file the file object
     * @returns {String}
     */
    function getName(file) {
        var string;
        try {

            string = file.name;
        } catch (e) {
            string = 'testing';
        }
        return string;
    }

    /**
     *sets the type of the file
     * @param file the file object
     * @returns {String}
     */
    function getType(file) {
        return file.type;
    }

    /**
     *
     */
    function getSize(file) {
        return file.size;
    }

    /**
     *gets the last modified date of the file
     * @param file the file object
     * @returns {Date}
     */
    function getLastModDate(file) {
        return file.lastModifiedDate;
    }

    /**
     *returns the src of the file
     * @param file the file object
     * @returns {*}
     */
    function insertSrc(file) {
        var index = this.$fileList.indexOf(file);
        return this.$fileSrc[index];
    }

    /**
     *create the file from the onchange event
     * @param e
     * @returns {FileList}
     */
    function createFileFromChange(e) {
        return e.target.files;
    }

    /**
     *creates a file from the drag and drop event
     * @param e
     * @returns {FileList}
     */
    function createFileFromDrag(e) {
        "use strict";

        try {
            e.dataTransfer.dropEffect = "copy";
            return e.dataTransfer.files;
        } catch (e) {
            console.log(e);
        }
    }

    /**
     *creates the image based on the event fired
     * supports only change event for now
     * @param e
     */
    function createfile(e) {

        var file;
        e.preventDefault();
        if (e.type == 'change') {
            file = createFileFromChange(e);
        } else if(e.type == 'drop'){
            file = createFileFromDrag(e);
        }
        fillList(file);
        setReader($file.reader, $file.$fileList[0]);
    }

    /**
     *
     * @param elem {Element}
     */
    function evChange(elem) {
        "use strict";
        elem.addEventListener('change', createfile, false);
    }

    /**
     *
     * @param elem
     */
    function evDrop(elem) {
        elem.addEventListener('drop', createfile, false)
    }


    function init(scope, changeElem, dropElem) {
        "use strict";
        this.scope = scope;
        try {
            evChange(changeElem);
        } catch (e) {
            console.error('no change element specified');
        }

        try {
            evDrop(dropElem);
        } catch (e) {
            console.error('no drop element found')
        }
        return this;
    }

    function createLink(link) {
        return document.querySelector("#download").href = link;
    }

    return $file = {
        init: init,
        $fileList: [],
        $fileSrc: [],
        insertSrc: function () {
            return insertSrc(this.$fileList[0]);
        },
        getName: function () {
            return getName(this.$fileList[0]);
        },
        getsize: function () {
            return getSize(this.$fileList[0]);
        },
        getType: function () {
            return getType(this.$fileList[0]);
        },
        getLastModDate: function () {
            return getLastModDate(this.$fileList[0]);
        },
        reader: new FileReader(),
        compress: compress,
        imgTag: document.querySelector('#oriImg'),
        createLink: createLink
    }


});