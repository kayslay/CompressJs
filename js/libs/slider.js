/**
 * Created by new on 6/14/2016.
 */
//"use strict";
/**
 * slider is the box that slides from under
 * or it can display as an allert
 * or any animation style give*/

var slider = angular.module("slider", []);

slider.factory("modalSlide", function (template) {
    var defaultParams = {
        "height": "100px",
        "width": "100%",
        "animationStyle": "default",
        "confirmText": "confirm",
        "confirmFn": null,
        "template": "defaultTemplate",
        "allowOutsideClick": false,
        "init": null
    };
    /*the modal Element and its scope*/
    var modal, scope;
    /**
     *@description this set the event listeners for the different types of modals available
     * its sets the event listener by the template name of the alertModal
     * @properties replace object controls the event of the replacer
     * @properties find object controls the event of the finder
     * @description further : the property named with the functions of the app
     * contain properties/ property that are the form {eventName:{evType,fn,iden}}
     * evtype: the event that was fired
     * fn: the function to be called
     * iden: the selector identfier
     * */
    
    var events = {

        "replace": { //the replace event listens
            ".btn": {
                evType: "click",
                fn: function (e) {
                    var text = modal.children("input#h").val(),
                        texR = modal.children("input#r").val();
                    scope.replace(text, texR);
                    e.stopPropagation();
                },
                iden: ".btn"
            }
        },
        "find": { // the find event listeners
            ".btn": {
                evType: "click",
                fn: function (e) {
                    var textFind = modal.children("input#needle").val();
                    scope.find(textFind);
                    e.stopPropagation()
                },
                iden: ".btn"
            },
            ".input": {
                evType: "keyup",
                fn: function (e) {
                    var textFind = modal.children("input#needle").val();
                    scope.find(textFind);
                    e.stopPropagation()
                },
                iden: "#needle"
            }
        },

        addListeners: function (type) {// used to add the event listeners
            var _self = this,
                op = _self[type];
            for (var prop in _self[type]) {
                modal.children(op[prop].iden).on(op[prop].evType, op[prop].fn);
            }
        },
        removeListener: function (type) {
            var _self = this,
                op = _self[type];
            for (var prop in _self[type]) {
                modal.children(op[prop].iden).unbind(op[prop].evType, op[prop].fn);
            }
        }
    };

    /**
     * the animation and style of the modal class
     *
     * @description the way the open and closing of
     * the modal is animated
     *
     * @name animation
     * @properties
     * -animation
     * -styles : the style of the elements (still contemplating maybe to add it to the overlay element)*/

    var animation = {
        add: function (name, obj) {
            this.animations[name] = obj;
        },
        animations: {
            "default": {
                openModal: function () {
                    $('body').css({
                        "overflow": "hidden"
                    });
                    $(".overlay").css({
                        "visibility": "visible"
                    });
                    modal.css({
                        'bottom': '40px'
                    });
                },
                closeModal: function () {
                    $('body').css({
                        "overflow": "auto"
                    });
                    setTimeout(function () {
                        $(".overlay").css({
                            "visibility": "hidden"
                        })
                    }, 550);
                    modal.css({
                        'bottom': '-100%'
                    })
                }
            }
        },
        styles: {
            "bottom": "-50%",
            "backgroundColor": "#c96469",
            "position": "absolute",
            "width": "100%",
            "height": "70px",
            "-moz-transition": "all .5s ease-in 0s",
            "-o-transition": "all .5s ease-in 0s",
            "-webkit-transition": "all .5s ease-in 0s",
            "transition": "all .5s ease-in 0s"
        }
    };
    //testing
    //template.add("replace", "<input type='text' id='h'><input type='text' id='r'> <button class='btn'> click</button>");
    /**
     * @description create the modal element
     * this bootstraps the app on loading the window
     * it checks if the div#modal element exist
     *      if it does not exist create the element*/
    function bootstrap() {
        if (document.querySelector("#modal") == null) {
            //create a new instance
            createModal();
        }
    }

    /**
     * @description create a new modal element
     * this function creates the overlay and modal element
     * and puts in the default template for the slideModal
     *  this also create the scope uf the modal object
     * */
    function createModal() {
        var modalSlide = document.createElement("div");
        // var modalContainer = document.createElement("div");
        var overlay = document.createElement("div");
        overlay.classList.add("overlay");
        // modalContainer.classList.add("modal-container");
        modalSlide.classList.add("modalslide");
        modalSlide.id = "modal";
        document.body.appendChild(overlay);
        overlay.appendChild(modalSlide);
        // modalContainer.appendChild(modalSlide);
        modalSlide.innerHTML = template[defaultParams.template];
        // $(".modal").html(template[defaultParams.template])
        $.extend(modalSlide.style, animation.styles);
        //define the modal
        modal = angular.element(".modalslide"),
            scope = modal.scope();

    }

    /**
     * bootstrap the slideModal*/
    bootstrap();

    /**
     * @description this function is used to call the modal to life.
     * this set the params
     * checks if the param is valid
     * creates the openModal
     * creates the closeModal
     * @param [Object] params the configuration of the modal
     *
     * */
    return window.alertModal = function alertModal(params) {
        var alertParams;
        if (typeof params !== "object") {
            return console.log('the param is not an object');
        }
        alertParams = $.extend({}, defaultParams, params);
        var addedStyle = {
            width: alertParams.width,
            height: alertParams.height
        };
        //add the style to the class
        modal.css(addedStyle);
        //prevent bubble
        modal.click(function (e) {
            e.stopPropagation();
        });
        modal.html(template[alertParams.template]); //insert the template
        document.querySelector(".overlay").addEventListener("click", closeModal);//close the overlay when its clicked on

        function openModal() {
            animation.animations[alertParams.animationStyle].openModal();
        }

        function closeModal() {
            animation.animations[alertParams.animationStyle].closeModal();
        }
        events.addListeners(alertParams.template);
        openModal();
    }
});

slider.service("template", function () {
        this.add = function (names, values) {
            this[names] = values;
        };
        this.remove = function (name) {
            delete this[name];
        };
        this["defaultTemplate"] = "<default></default>";
        this["replace"] = ' <input type="text" id="h" placeholder ="find"> <input type="text" id="r" placeholder="replace"><button class="btn">replace</button>';
        this["find"] = '<input type="text" id="needle"> <button class="btn ">find</button>'
    }
);

slider.directive("default", function () {
    return {
        restrict: "EA",
        template: "<p>the cool thing</p>",
        replace: true
    }
});