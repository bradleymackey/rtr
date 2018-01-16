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

    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
        this.receivedEvent('deviceready');
        // add listeners inside `onDeviceReady`
        this.addButtonListeners();

        alert("device ready ");
    },

    // just a test for the moment
    addButtonListeners: function() {
        alert("add listeners");

        $("#show-map").on("touchend",function() {
            $("#map").show();
            $("#news").hide();
            $("#events").hide();
            $("#info").hide();
            $("#show-map").addClass("active");
            $("#show-news").removeClass("active");
            $("#show-events").removeClass("active");
            $("#show-info").removeClass("active");
            return false;
        })

        $("#show-news").click(function() {
            $("#map").hide();
            $("#news").show();
            $("#events").hide();
            $("#info").hide();
            $("#show-news").addClass("active");
            $("#show-map").removeClass("active");
            $("#show-events").removeClass("active");
            $("#show-info").removeClass("active");
            return false;
        });

        $("#show-events").click(function() {
            $("#map").hide();
            $("#news").hide();
            $("#events").show();
            $("#info").hide();
            $("#show-events").addClass("active");
            $("#show-news").removeClass("active");
            $("#show-map").removeClass("active");
            $("#show-info").removeClass("active");
            return false;
        });

        $("#show-info").click(function() {
            $("#map").hide();
            $("#news").hide();
            $("#events").hide();
            $("#info").show();
            $("#show-info").addClass("active");
            $("#show-news").removeClass("active");
            $("#show-events").removeClass("active");
            $("#show-map").removeClass("active");
            return false;
        });
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

};

app.initialize();