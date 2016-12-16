#compress
Compress is a web app that compresses png and jpeg images.

##Note
Still in the development stage for now. Its an AngularJs service now. Work would start on making it a library.
 For now manage this web app.


##Example
check the image folder to see images of example cases

##usage
 run the index.html file, click on select image button, adjust the slider to the compression level you want
 the click download to download the compressed image

#Methods of Compress
###AngularJs
[note] documentation in progress
To use Compress on with Angularjs add this line to html file

        //compress_ng.js is located in js/app/ folder
        <script src="path/to/compress_ng.js"></script>
Make sure it's added to your Angular apps module

         var appName = angular.module('APP',['file']);

Inject as a dependency to your controller
####Example
        appName.controller('name', function ($scope, $file) {
        var elem = document.querySelector('input#file');
        //initialize file withe the scope and the input file as parameters
        window.files = $file.init($scope, elem);
        $scope.dimension = {'width': 100, 'height': 100};
            $scope.compress = function () {
                $file.compress($file.imgTag, $scope.dimension);
            };
         //code
         }
the scope of the controller must contain this properties
    rate ($scope.rate)-> the rate of the compression
    src ($scope.src)-> the image of the the origninal file
    comp ($scope.comp)-> the image of the the compressed file
