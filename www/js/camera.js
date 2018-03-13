"use strict";

var pictureSource;   // picture source
var destinationType; // sets the format of returned value

function gotPhotosCallback(snapshot) {
    const photosData = snapshot.val();
    // if we cannot get the user photos data from the database for some reason, display an error message to the user
    if (photosData === undefined || photosData === null) {
      let errorMessage = "<div id=\"error\" class=\"standard-inset\" style=\"text-align:center;\"><h1 style=\"text-align:center;\">Error!</h1>" + "<p>Could not load content, please try again later.</p></div>";
      $('#photos-content').empty();
      $('#photos-content').html(errorMessage);
      return;
    }
     // LIST OF PHOTOTS
     let photosList = '';
     $.each(photosData, function(i){
        photosList += "<div id="+i+" class='photos_item'><img src="+(photosData[i].link||"")+" alt='image'>";
        let date = new Date(photosData[i].date).toLocaleDateString('en-GB');
        photosList += "<p class='standard-inset'><b>" + (photosData[i].by||"") + ", " + (date||"") + "</b></p>";
        photosList += "<p class='standard-inset'>" + (photosData[i].desc||"") + "</p></div>";
     });
     $('#photos-content').empty();
     $('#photos-content').html(photosList);
}

document.addEventListener("deviceready", function(event) {
    pictureSource = navigator.camera.PictureSourceType;
    destinationType = navigator.camera.DestinationType;
}, false);

$("#camera-button").click(function() {
    openCamera();
});

$("#library-button").click(function() {
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

        // upload the image
        uploadImage(imageUri);
        console.log("upload call done");

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

        // upload the image
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
    
    resolveLocalFileSystemURL(imageUri, function success(fileEntry) {

        // hide both of the messages
        $("#photo-upload-error").hide();
        $("#photo-upload-success").hide();
        $("#photo-upload-loading").show();

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
            let uuid_string = UUIDjs.create(4).toString();
            let imageRef = storageRef.child(`media/${user.uid}/images/${uuid_string}.jpg`);
            imageRef.put(blob).then(function (snapshot) {
                if (snapshot.downloadURL !== undefined && snapshot.downloadURL !== null) {
                    var newImage = {
                        link: snapshot.downloadURL,
                        desc: "testing"
                    };
                    firebase.database().ref("/photos").push(newImage).then(function() {
                        $("#photo-upload-error").hide();
                        $("#photo-upload-success").show();
                        $("#photo-upload-loading").hide();
                        // RELOAD THE RECENT IMAGES
                        firebase.database().ref("/photos").orderByChild("date").limitToFirst(15).once('value').then(gotPhotosCallback);
                    })
                    .catch(function(error) {
                        console.error("set photo data in database error:",error);
                        $("#photo-upload-error").show();
                        $("#photo-upload-success").hide();
                        $("#photo-upload-loading").hide();
                    });
                } else {
                    console.error("no download url for image");
                    $("#photo-upload-error").show();
                    $("#photo-upload-success").hide();
                    $("#photo-upload-loading").hide();
                }
                
            }).catch(function(error) {
                console.log("upload error",error);
                $("#photo-upload-error").show();
                $("#photo-upload-success").hide();
                $("#photo-upload-loading").hide();
            });
        }

        xhr.send();
    });
    
}
