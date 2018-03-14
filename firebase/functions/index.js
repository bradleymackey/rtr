// Firebase Functions for River Tees Rediscovered
// Created by Team 2

"use strict";

// functions
const functions = require('firebase-functions');

// initialise firebase admin
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

const vision = require('@google-cloud/vision');
const Storage = require('@google-cloud/storage');

/**
 * When an image is uploaded we check if it is flagged as Adult or Violence by the Cloud Vision
 * API and if it is we replace it with some removal image.
 */
exports.removeOffensiveImages = functions.database.ref('photosRequest/{newPhoto}').onCreate(event => {

    const photoObject = event.data.val();
    const photoLink = photoObject.link;
    const databaseKey = event.data.key;

    // Creates a client
    const client = new vision.ImageAnnotatorClient();

    // Check the image content using the Cloud Vision API.
    return client.safeSearchDetection(photoLink).then((results) => {
        // the detections returned by the cloud vision API
        const detections = results[0].safeSearchAnnotation;

        console.log(detections);

        if (detections === null || detections === undefined) {
            // remove the request
            console.log("could not test image, removing");
            return admin.database().ref('photosRequest/'+databaseKey).set(null, (error) => {
                // delete the image from firebase storage
                const storage = new Storage();
                return storage.bucket('river-tees-rediscovered.appspot.com')
                .file(photoObject.ref)
                .delete();
            });
        }

        for (var key in detections) {
            if (detections[key] === "POSSIBLE" || 
                detections[key]  === "LIKELY" || 
                detections[key]  === "VERY_LIKELY") {
                // remove the request
                console.log("inappropriate image removed");
                return admin.database().ref('photosRequest/'+databaseKey).set(null, (error) => {
                    // delete the image from firebase storage
                    const storage = new Storage();
                    return storage.bucket('river-tees-rediscovered.appspot.com')
                    .file(photoObject.ref)
                    .delete();
                });
            }
        }
        // the image is fine, post it
        console.log("image not inappropriate");
        let toPost = {
            link: photoObject.link,
            desc: photoObject.desc,
            by: photoObject.by,
            date: photoObject.date
        };
        return admin.database().ref('photos').push(toPost, (error) => {
            return admin.database().ref('photosRequest/'+databaseKey).set(null);
        });
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
