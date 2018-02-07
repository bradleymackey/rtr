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

firebase.auth().signInAnonymously().then(function(user) {
    if (user) {
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
    // Handle Errors here.
    let errorCode = error.code;
    let errorMessage = error.message;
    // ...
    console.error("auth error " + errorCode + " " + errorMessage);
});


document.addEventListener('deviceready', function(event) {
    // ask for notification permission on iOS
    window.FirebasePlugin.grantPermission();
    // subscribe to the news and events channels to get notifications about them
    window.FirebasePlugin.subscribe("news");
    window.FirebasePlugin.subscribe("events");
}, false);

