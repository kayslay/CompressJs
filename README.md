#compress
Compress is a little project that compresses png and jpeg images.

##Note
this an example code (a side project) for now. planning on building an javascript library from this


##Example
check the image folder to see images of example cases

##How to compress image with Compresss
 run the index.html file, click on select image button, adjust the slider to the compression level you want
 the click download to download the compressed image

##Initialization
###AngularJs
[note] documentation in progress
To use Compress on with Angularjs add this line to html file.
        <script src="path/to/compress_ng.js"></script>
compress_ng.js is located in js/app/ folder
Make sure it's added to your Angular apps module

         var appName = angular.module('APP',['compressNg']);

Inject as a dependency to your controller
####Example

```javascript
appName.controller('name', function ($scope, $file) {
   var elem = document.querySelector('input#file');
 initialize file withe the scope and the input file as parameters
 window.files = $file.init($scope, elem);
 $scope.dimension = {'width': 100, 'height': 100};
  $scope.compress = function () {
 $file.compress($file.imgTag, $scope.dimension);
  };
 code
 }
 ```

the scope of the controller must contain this properties
    rate ($scope.rate)-> the rate of the compression
    src ($scope.src)-> the image of the the origninal file
    comp ($scope.comp)-> the image of the the compressed file
