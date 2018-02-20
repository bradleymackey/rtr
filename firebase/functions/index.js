// Firebase Functions for River Tees Rediscovered
// Created by Team 2

"use strict";

// functions
const functions = require('firebase-functions');

// initialise firebase admin
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

exports.notifyVolunteer = functions.database.ref('volunteers/{newVolunteer}').onCreate(event => {
    const volunteer_object = event.data.val();
    const first_name = volunteer_object.first_name;
    const last_name = volunteer_object.last_name;
    const for_event = volunteer_object.related_to;
    const payload = {
        notification: {
          title: 'Volunteer Request',
          body: `${first_name} ${last_name} volunteered for ${for_event}`,
        }
      };
      // return the promise so that we do not exit the function too early
    return admin.messaging().sendToTopic('admin', payload).catch(error => {
        console.log(`error sending volunteer notification: ${error}`);
    });
});

exports.notifyEvent = functions.database.ref('events/{newEvent}').onCreate(event => {
    const event_object = event.data.val();
    const event_title = event_object.title;
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
    // return the promise so that we do not exit the function too early
    return admin.messaging().sendToTopic('events', payload, options).catch(error => {
        console.log(`error sending events notification: ${error}`);
    });
});

exports.notifyNews = functions.database.ref('news/{newArticle}').onCreate(event => {
    const article_object = event.data.val();
    const article_title = article_object.title;
    const payload = {
        notification: {
            title: 'New Article',
            body: `${article_title}`
        }
    };
    // news article will only live for 1 week
    const options = {
        timeToLive: 60 * 60 * 24 * 7
    };
    // return the promise so that we do not exit the function too early
    return admin.messaging().sendToTopic('news', payload, options).catch(error => {
        console.log(`error sending news notification: ${error}`);
    });
});
