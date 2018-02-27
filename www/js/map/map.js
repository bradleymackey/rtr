/*
 * Manages the display and searching of the map.
 */

 "use strict";

 var map;

document.addEventListener("DOMContentLoaded", function(event) {
    mapboxgl.accessToken = 'pk.eyJ1IjoiYnJhZGxleW1hY2tleSIsImEiOiJjamNraW14eXYzanZzMzNwZ2UyNW9ua2tzIn0.4YBdPgKnDN5XFdVVMeo4LQ';
    map = new mapboxgl.Map({
        container: 'map-layer',
        style: 'mapbox://styles/bradleymackey/cjckjuujz01qh2spiu3lh87uu'
    });
    // Add geolocate control to the map.
    map.addControl(new mapboxgl.GeolocateControl({
        positionOptions: {
            enableHighAccuracy: true
        },
        trackUserLocation: true
    }));
});

  document.addEventListener("deviceready", function(event) {
    navigator.geolocation.getCurrentPosition(function(position) {
        console.log("getting position")
     });

  }, false);



