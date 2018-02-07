// Initialize Firebase
var config = {
    apiKey: "AIzaSyCwa-0R5azR29HIHS4VA7iJ1XhNvUhunac",
    authDomain: "river-tees-rediscovered.firebaseapp.com",
    databaseURL: "https://river-tees-rediscovered.firebaseio.com",
    projectId: "river-tees-rediscovered",
    storageBucket: "river-tees-rediscovered.appspot.com",
    messagingSenderId: "24690165291"
};
firebase.initializeApp(config);

// sign in the user annoymously, THEN make the requests for all the data
// this is because the database policy now requires users to be logged in to access the data, so they have to be logged in first
firebase.auth().signInAnonymously().then(function(user) {
    if (user) { // we have a valid login! go ahead and get all the data that we need
        firebase.database().ref("/projects").orderByChild("title").once('value').then(projectsCallback);
        firebase.database().ref("/news").orderByChild("title").once('value').then(articlesCallback);
        firebase.database().ref("/events").orderByChild("title").once('value').then(eventsCallback);
    } else {
        let errorMessage = "<div id=\"error\" class=\"standard-inset\" style=\"text-align:center;\"><h1 style=\"text-align:center;\">Error!</h1>" + "<p>Could not load content, please try again later.</p></div>";
        $('#events_main').empty();
        $('#events_main').html(errorMessage);
        $('#news_main').empty();
        $('#news_main').html(errorMessage);
    }
})
.catch(function(error) {
    console.error("AUTH ERROR " + errorCode + " " + errorMessage);
    let errorMessage = "<div id=\"error\" class=\"standard-inset\" style=\"text-align:center;\"><h1 style=\"text-align:center;\">Error!</h1>" + "<p> Please try again later. " + error.message + "</p></div>";
    $('#events_main').empty();
    $('#events_main').html(errorMessage);
    $('#news_main').empty();
    $('#news_main').html(errorMessage);
});

var pictureSource;   // picture source
var destinationType; // sets the format of returned value

// once the device is ready, subscribe the the relevant notification topics
// notifications are sent via FCM - Firebase Cloud Messaging
document.addEventListener('deviceready', function(event) {
    // ask for notification permission on iOS
    window.FirebasePlugin.grantPermission();
    // subscribe to the news and events channels to get notifications about them
    window.FirebasePlugin.subscribe("news");
    window.FirebasePlugin.subscribe("events");
    pictureSource=navigator.camera.PictureSourceType;
    destinationType=navigator.camera.DestinationType;
    
}, false);


// Called when a photo is successfully retrieved
//
function onPhotoDataSuccess(imageData) {
  // Uncomment to view the base64-encoded image data
  // console.log(imageData);
}

// Called when a photo is successfully retrieved
//
function onPhotoURISuccess(imageURI) {
  // Uncomment to view the image file URI
  // console.log(imageURI);

}

// A button will call this function
//
function capturePhoto() {
  // Take picture using device camera and retrieve image as base64-encoded string
  navigator.camera.getPicture(onPhotoDataSuccess, onFail, { quality: 50,
    destinationType: destinationType.DATA_URL });
}

// A button will call this function
//
function capturePhotoEdit() {
  // Take picture using device camera, allow edit, and retrieve image as base64-encoded string
  navigator.camera.getPicture(onPhotoDataSuccess, onFail, { quality: 20, allowEdit: true,
    destinationType: destinationType.DATA_URL });
}

// A button will call this function
//
function getPhoto(source) {
  // Retrieve image file location from specified source
  navigator.camera.getPicture(onPhotoURISuccess, onFail, { quality: 50,
    destinationType: destinationType.FILE_URI,
    sourceType: source });
}

// Called if something bad happens.
//
function onFail(message) {
  alert('Failed because: ' + message);
}