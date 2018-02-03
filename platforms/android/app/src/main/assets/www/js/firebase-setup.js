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
    const push = PushNotification.init({
        android: {
            topics: ['events', 'news']
        },
        ios: {
            alert: true,
            badge: true,
            sound: true,
            clearBadge: true,
            fcmSandbox:true,
            topics: ['events', 'news']
        }
    });
    push.on('registration', (data) => {
        console.log(data.registrationId);
        console.log(data.registrationType);
    });
    push.clearAllNotifications(() => {
        console.log('success');
    }, () => {
        console.log('error');
    });
    push.subscribe('events', () => {
        console.log('success');
    }, (e) => {
        console.error('subscribe error:', e);
    });
    push.subscribe('news', () => {
        console.log('success');
    }, (e) => {
        console.error('subcribe error:', e);
    });
}, false);

