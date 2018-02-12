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
        firebase.database().ref("/projectArticles").orderByChild("title").once('value').then(volunteerCallback);
    } else {
        let errorMessage = "<div id=\"error\" class=\"standard-inset\" style=\"text-align:center;\"><h1 style=\"text-align:center;\">Error!</h1>" + "<p>Could not load content, please try again later.</p></div>";
        $('#events_main').empty();
        $('#events_main').html(errorMessage);
        $('#news_main').empty();
        $('#news_main').html(errorMessage);
        $('#volunteer_main').empty();
        $('#volunteer_main').html(errorMessage);
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

// once the device is ready, subscribe the the relevant notification topics
// notifications are sent via FCM - Firebase Cloud Messaging
document.addEventListener('deviceready', function(event) {
    // ask for notification permission on iOS
    window.FirebasePlugin.grantPermission();
    // subscribe to the news and events channels to get notifications about them
    window.FirebasePlugin.subscribe("news");
    window.FirebasePlugin.subscribe("events");
}, false);
