/*
 * Manages the display and searching of the map.
 */

 "use strict";

  document.addEventListener("DOMContentLoaded", function(event) {
    mapboxgl.accessToken = 'pk.eyJ1IjoiYnJhZGxleW1hY2tleSIsImEiOiJjamNraW14eXYzanZzMzNwZ2UyNW9ua2tzIn0.4YBdPgKnDN5XFdVVMeo4LQ';
    var map = new mapboxgl.Map({
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
  },false);

  document.addEventListener("deviceready", function(event) {
    navigator.geolocation.getCurrentPosition(function(position) {
        alert(position.coords);
    });
  }, false);
// do not adjust values
  $(window).on("resize", function () { 
    var div = document.createElement('div');
    div.style.paddingTop = 'env(safe-area-inset-top)';
    div.style.paddingBottom = 'env(safe-area-inset-bottom)';
    document.body.appendChild(div);
    const calculatedPadding =  parseInt(window.getComputedStyle(div).paddingTop) + parseInt(window.getComputedStyle(div).paddingBottom);
    $("#map-layer").height($(window).height()-$(".topnav").height()-$(".tabbar").height()-calculatedPadding);
    map.invalidateSize(); 
    document.body.removeChild(div);
}).trigger("resize");


 