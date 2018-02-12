"use strict";

// functions
const functions = require('firebase-functions');

// initialise firebase admin
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

exports.notifyVolunteer = functions.database.ref('volunteers/{newVolunteer}').onCreate(event => {
    const event_snapshot = event.data;
    const first_name = event_snapshot.child('first_name').val();
    const last_name = event_snapshot.child('last_name').val();
    const for_event = event_snapshot.child('related_to').val();
    const payload = {
        notification: {
          title: 'Volunteer Request',
          body: `${first_name} ${last_name} volunteered for ${for_event}`,
        }
      };
    return admin.messaging().sendToTopic('admin', payload).catch(error => {
        console.log(`error sending volunteer notification: ${error}`);
    });
});

exports.notifyEvent = functions.database.ref('events/{newEvent}').onCreate(event => {
    const event_snapshot = event.data;
    const event_title = event_snapshot.child('title').val();
    const payload = {
        notification: {
            title: 'New Event',
            body: `"${event_title}" has just been posted!`
        }
    };
    // event will only live for 1 week
    const options = {
        timeToLive: 60 * 60 * 24 * 7
    };
    return admin.messaging().sendToTopic('events', payload, options).catch(error => {
        console.log(`error sending events notification: ${error}`);
    });
});

exports.notifyNews = functions.database.ref('news/{newArticle}').onCreate(event => {
    const event_snapshot = event.data;
    const article_title = event_snapshot.child('title').val();
    const payload = {
        notification: {
            title: 'New Article',
            body: `${article_title}`
        }
    };
    return admin.messaging().sendToTopic('news', payload).catch(error => {
        console.log(`error sending news notification: ${error}`);
    });
});