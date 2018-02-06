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


document.addEventListener('deviceready', function(event) {
    window.FirebasePlugin.subscribe("news");
    window.FirebasePlugin.subscribe("events");
}, false);

