/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

"use strict";

var app = {

    counter: 0,

    map: document.getElementById("map"),
    news: document.getElementById("news"),
    events: document.getElementById("events"),
    info: document.getElementById("info"),
    
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
        alert('device is ready');
        this.receivedEvent('deviceready');
        // add listeners inside `onDeviceReady`
        this.addButtonListeners();
        this.showMap();
    },

    // just a test for the moment
    addButtonListeners: function() {
        document.getElementById("test-button").addEventListener('click', function(e) {
            // app.counter++;
            // document.getElementById("counter").innerHTML = app.counter.toString();
            window.location.replace("https://google.com");
        }, false);

        document.getElementById("tab-map").addEventListener("click", app.showMap(), false);
        document.getElementById("tab-news").addEventListener("click", app.showNews(), false);
        document.getElementById("tab-events").addEventListener("click", app.showEvents(), false);
        document.getElementById("tab-info").addEventListener("click", app.showMap(), false);
    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    },

    showMap: function(e) {
        app.map.setAttribute('style', 'display:block;');
        app.news.setAttribute('style', 'display:none;');
        app.events.setAttribute('style', 'display:none;');
        app.info.setAttribute('style', 'display:none;');
        return false;
    },

    showNews: function(e) {
        app.map.setAttribute('style', 'display:none;');
        app.news.setAttribute('style', 'display:block;');
        app.events.setAttribute('style', 'display:none;');
        app.info.setAttribute('style', 'display:none;');
        return false;
    },

    showEvents: function(e) {
        app.map.setAttribute('style', 'display:none;');
        app.news.setAttribute('style', 'display:none;');
        app.events.setAttribute('style', 'display:block;');
        app.info.setAttribute('style', 'display:none;');
        return false;
    },

    showInfo: function(e) {
        app.map.setAttribute('style', 'display:none;');
        app.news.setAttribute('style', 'display:none;');
        app.events.setAttribute('style', 'display:none;');
        app.info.setAttribute('style', 'display:block;');
        return false;
    }
};

app.initialize();