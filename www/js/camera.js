"use strict";

var pictureSource;   // picture source
var destinationType; // sets the format of returned value

var totalPhotosLoaded = 0;
const MAX_PHOTOS_TO_LOAD = 40;

function gotPhotosCallback(snapshot) {
    const photosData = snapshot.val();
    // if we cannot get the user photos data from the database for some reason, display an error message to the user
    if (photosData === undefined || photosData === null) {
      let errorMessage = "<div id=\"error\" class=\"standard-inset\" style=\"text-align:center;\"><h1 style=\"text-align:center;\">Error!</h1>" + "<p>Could not load content, please try again later.</p></div>";
      $('#photos-content').empty();
      $('#photos-content').html(errorMessage);
      return;
    }
    // increment the total number of photos loaded
    totalPhotosLoaded++;
    // only load a max of 50 photos, and then stop
    if (totalPhotosLoaded > MAX_PHOTOS_TO_LOAD) {
        // remove the listener so that we stop recieving new photos 
        firebase.database().ref("/photos").off();
        return;
    }
     // LIST OF PHOTOTS
     let photosList = '';
    photosList += "<div class='photos_item'><img src="+(photosData.link||"")+" alt='image'>";
    let date = new Date(photosData.date).toLocaleDateString('en-GB');
    photosList += "<p class='standard-inset'><b>" + (photosData.by + ", "||"") + (date||"") + "</b></p>";
    photosList += "<p class='standard-inset'>" + (photosData.desc||"") + "</p></div>";
    // hide the loading/error message when we fetch each image
     $("#error").hide();
     // prepend new photos so that they come in to the top of the photos list
     $('#photos-content').prepend(photosList);
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

        // get the metadata about the image, then this function will proceed to upload the image
        promptForName(imageUri);

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
        targetWidth: 1024,
        targetHeight: 1024,
        allowEdit: false,
        correctOrientation: true  // Corrects Android orientation quirks
    }
    return options;
}

function openFilePicker() {

    var srcType = Camera.PictureSourceType.SAVEDPHOTOALBUM;
    var options = setOptions(srcType);

    navigator.camera.getPicture(function cameraSuccess(imageUri) {

        // get the metadata about the image, then this function will proceed to upload the image
        promptForName(imageUri);

    }, function cameraError(error) {
        console.log("Unable to obtain picture: " + error, "app");
    }, options);
}

function promptForName(imageURI) {

    navigator.notification.prompt(
        'Please enter your name',  // message
        function(results) {        // callback to invoke
            switch(results.buttonIndex) {
                case 1:
                    promptForMessage(imageURI, results.input1);
                    break;
                case 2:
                    // post anonymously
                    promptForMessage(imageURI, "Anonymous");
                    break;
                case 3:
                    // cancel upload, just return
                    return;
                default:
                return;
            }
        },                  
        'Name',            // title
        ['OK','Post Anonymously', 'Cancel Upload'], // buttonLabels
        ''  // defaultText
    );

}

function promptForMessage(imageURI, name) {
    navigator.notification.prompt(
        'Describe your image!',  // message
        function(results) {        // callback to invoke
            switch(results.buttonIndex) {
                case 1:
                    // start the upload
                    uploadImage(imageURI, name, results.input1);
                    break;
                case 2:
                    // cancel upload
                    return;
                default:
                return;
            }
        },                  
        'Image Caption',  // title
        ['OK', 'Cancel Upload'], // buttonLabels
        ''  // defaultText
    );
}

function uploadImage(imageUri, postingUser, postingCaption) {

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

        // create a request to get the image from the disk
        var xhr = new XMLHttpRequest();
        xhr.open( "GET", imageUri, true );

        // Ask for the result as an ArrayBuffer.
        xhr.responseType = "arraybuffer";

        xhr.onload = function( e ) {
            // Obtain a blob: URL for the image data.
            var arrayBufferView = new Uint8Array( this.response );
            var blob = new Blob( [ arrayBufferView ], { type: "image/jpeg" } );
            // create a random name for the image to be called
            let uuid_string = UUIDjs.create(4).toString();
            // reference to where the image will be saved in Firebase Storage
            let imageRef = storageRef.child(`media/${user.uid}/images/${uuid_string}.jpg`);
            imageRef.put(blob).then(function (snapshot) {
                if (snapshot.downloadURL !== undefined && snapshot.downloadURL !== null) {
                    var newImage = {
                        link: snapshot.downloadURL,
                        desc: postingCaption,
                        by: postingUser,
                        date: firebase.database.ServerValue.TIMESTAMP
                    };
                    firebase.database().ref("/photosRequest").push(newImage).then(function() {
                        $("#photo-upload-error").hide();
                        $("#photo-upload-success").show();
                        $("#photo-upload-loading").hide();

                        if (totalPhotosLoaded > MAX_PHOTOS_TO_LOAD) {
                            // if we have stopped recieving photos (because we have received too many, add the image manually so that it looks like the image is being loaded from the database, even though this is just an illusion)
                            let photosList = '';
                            photosList += "<div class='photos_item'><img src="+(imageUri||"")+" alt='image'>";
                            let date = new Date().toLocaleDateString('en-GB');
                            photosList += "<p class='standard-inset'><b>" + (postingUser + ", "||"") + (date||"") + "</b></p>";
                            photosList += "<p class='standard-inset'>" + (postingCaption||"") + "</p></div>";
                            // hide the loading/error message when we fetch each image
                            $("#error").hide();
                            // prepend new photos so that they come in to the top of the photos list
                            $('#photos-content').prepend(photosList);
                        }
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

        // send the request to get the image from the disk
        xhr.send();
    });
    
}
