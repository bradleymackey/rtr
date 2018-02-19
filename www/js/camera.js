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
        quality: 20,
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
        console.log("uploading...");
        uploadImage(imageUri);
        console.log("upload call done");

    }, function cameraError(error) {
        console.log("Unable to obtain picture: " + error, "app");
    }, options);
}


function uploadImage(imageUri) {
    let user = firebase.auth().currentUser;
    if (user === undefined || user === null) {
        // the user is not logged in
        alert('Could not upload image! Make sure you are connected to the internet.');
        return;
    }
    let uuid_string = UUIDjs.create(4).toString();
    let imageRef = storageRef.child(`media/${user.uid}/images/${uuid_string}.jpg`);
    // Simulate a call to Dropbox or other service that can
    // return an image as an ArrayBuffer.
    var xhr = new XMLHttpRequest();
    
    xhr.open( "GET", imageUri, true );

    // Ask for the result as an ArrayBuffer.
    xhr.responseType = "arraybuffer";

    xhr.onload = function( e ) {
        // Obtain a blob: URL for the image data.
        var arrayBufferView = new Uint8Array( this.response );
        var blob = new Blob( [ arrayBufferView ], { type: "image/jpeg" } );
        storageRef.put(blob).then(function (snapshot) {
            console.log("upload success");
        }).catch(function(error) {
            console.log("upload error",error);
        });
    }
    xhr.send();

}
