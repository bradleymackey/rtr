"use strict";

var pictureSource;   // picture source
var destinationType; // sets the format of returned value

document.addEventListener("deviceready", function(event) {
    pictureSource = navigator.camera.PictureSourceType;
    destinationType = navigator.camera.DestinationType;
}, false);

$("#photo-button").click(function() {
    openCamera();
});

$("#photo-library-button").click(function() {
    openFilePicker();
});

function displayImage(imgUri) {
    var elem = document.getElementById('user-image');
    elem.src = imgUri;
}

function openCamera() {

    var srcType = Camera.PictureSourceType.CAMERA;
    var options = setOptions(srcType);

    navigator.camera.getPicture(function cameraSuccess(imageUri) {

        displayImage(imageUri);

    }, function cameraError(error) {
        console.debug("Unable to obtain picture: " + error, "app");

    }, options);
}


  function setOptions(srcType) {
    var options = {
        // Some common settings are 20, 50, and 100
        quality: 50,
        destinationType: Camera.DestinationType.FILE_URI,
        // In this app, dynamically set the picture source, Camera or photo gallery
        sourceType: srcType,
        encodingType: Camera.EncodingType.JPEG,
        mediaType: Camera.MediaType.PICTURE,
        allowEdit: true,
        correctOrientation: true  //Corrects Android orientation quirks
    }
    return options;
}

function openFilePicker() {

    var srcType = Camera.PictureSourceType.SAVEDPHOTOALBUM;
    var options = setOptions(srcType);

    navigator.camera.getPicture(function cameraSuccess(imageUri) {

        // Do something
        displayImage(imageUri);

    }, function cameraError(error) {
        console.debug("Unable to obtain picture: " + error, "app");

    }, options);
}