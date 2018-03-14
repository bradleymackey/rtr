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
        firebase.database().ref("/news").orderByChild("title").limitToFirst(25).once('value').then(articlesCallback);
        firebase.database().ref("/events").orderByChild("title").limitToFirst(15).once('value').then(eventsCallback);
        firebase.database().ref("/projectArticles").orderByChild("title").limitToFirst(15).once('value').then(volunteerCallback);
        firebase.database().ref("/photos").orderByChild("date").limitToFirst(25).on('child_added', gotPhotosCallback);
    } else { // we could not login, display an error message to the user
        let errorMessage = "<div id=\"error\" class=\"standard-inset\" style=\"text-align:center;\"><h1 style=\"text-align:center;\">Error!</h1>" + "<p>Could not load content, please try again later.</p></div>";
        // events
        $('#events_main').empty();
        $('#events_main').html(errorMessage);
        // news
        $('#news_main').empty();
        $('#news_main').html(errorMessage);
        // volunteer
        $('#volunteer_main').empty();
        $('#volunteer_main').html(errorMessage);
        // photos content
        $('#photos-content').empty();
        $('#photos-content').html(errorMessage);
    }
})
.catch(function(error) {
    console.error("AUTH ERROR: " + error);
    let errorMessage = "<div id=\"error\" class=\"standard-inset\" style=\"text-align:center;\"><h1 style=\"text-align:center;\">Error!</h1>" + "<p> Please try again later. " + error.message + "</p></div>";
    // events
    $('#events_main').empty();
    $('#events_main').html(errorMessage);
    // news
    $('#news_main').empty();
    $('#news_main').html(errorMessage);
    // volunteer
    $('#volunteer_main').empty();
    $('#volunteer_main').html(errorMessage);
    // photos content
    $('#photos-content').empty();
    $('#photos-content').html(errorMessage);
});

// Create a Firebase Storage reference
// (Firebase storage is where user photos are stored for the photo sharing service)
var storageRef = firebase.storage().ref();

// once the device is ready, subscribe the the relevant notification topics
// notifications are sent via FCM - Firebase Cloud Messaging
document.addEventListener('deviceready', function(event) {
    // ask for notification permission on iOS
    window.FirebasePlugin.grantPermission();
    // subscribe to the news and events channels to get notifications about them
    window.FirebasePlugin.subscribe("news");
    window.FirebasePlugin.subscribe("events");
}, false);
