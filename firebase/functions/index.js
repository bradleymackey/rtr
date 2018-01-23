"use strict";

// functions
const functions = require('firebase-functions');

// initialise firebase admin
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

exports.notifyVolunteer = functions.database.ref('volunteers/{someID}').onCreate(event => {
    const event_snapshot = event.data;
    const first_name = event_snapshot.first_name.val();
    const last_name = event_snapshot.last_name.val();
    const for_event = event_snapshot.related_to.val();
    const payload = {
        notification: {
          title: 'Volunteer Request',
          body: `${first_name} ${last_name} volunteered for ${for_event}`,
        }
      };
    return admin.messaging().sendToTopic('admin', payload);
})
