/*
 * Manages the display and searching of the map.
 */

 "use strict";

 var map;

 document.addEventListener('deviceready', odr, false);

 function odr() {
    var div = document.getElementById("map-canvas");
    // Initialize the map view
    map = plugin.google.maps.Map.getMap(div);
    // Wait until the map is ready status.
    alert(plugin.google);
    map.addEventListener(plugin.google.maps.event.MAP_READY, onMapReady);
 }

 function onMapReady() {

 }

 