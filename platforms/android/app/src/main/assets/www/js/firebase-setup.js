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
        // push.subscribe('events', () => {
        //     console.log('success');
        // }, (e) => {
        //     console.error('subscribe error:', e);
        // });
        // push.subscribe('news', () => {
        //     console.log('success');
        // }, (e) => {
        //     console.error('subcribe error:', e);
        // });
    });
    push.clearAllNotifications(() => {
        console.log('success');
    }, () => {
        console.log('error');
    });
}, false);

// const messaging = firebase.messaging();
// messaging.requestPermission()
// .then(function() {
//     console.log("have permission");
//     return messaging.getToken();
// })
// .then(function(token) {
//     console.log(token);
//     subscribeTokenToTopic(token,'events',config);
//     subscribeTokenToTopic(token, 'news',config);
// })
// .catch(function(err) {
//     console.log("error");
// });

function subscribeTokenToTopic(token, topic,configuration) {
    fetch('https://iid.googleapis.com/iid/v1/'+token+'/rel/topics/'+topic, {
      method: 'POST',
      headers: new Headers({
        'Authorization': 'key='+configuration.apiKey
      })
    }).then(response => {
      if (response.status < 200 || response.status >= 400) {
        throw 'Error subscribing to topic: '+response.status + ' - ' + response.text();
      }
      console.log('Subscribed to "'+topic+'"');
    }).catch(error => {
      console.error(error);
    })
}