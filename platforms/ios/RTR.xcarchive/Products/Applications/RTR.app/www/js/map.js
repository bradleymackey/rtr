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
// do not adjust values
  $(window).on("resize", function () { 
    updateMapSize();
}).trigger("resize");

function updateMapSize() {
    // var div = document.createElement('div');
    // div.style.paddingTop = 'env(safe-area-inset-top)';
    // div.style.paddingBottom = 'env(safe-area-inset-bottom)';
    // document.body.appendChild(div);
    // const calculatedPadding =  parseInt(window.getComputedStyle(div).paddingTop) + parseInt(window.getComputedStyle(div).paddingBottom);
    // const topNavHeight = $(".topnav").height();
    // //$("#map-layer").height($(window).height()-topNavHeight-$(".tabbar").height()-calculatedPadding);
    // //$("#map-layer").css("margin-top",topNavHeight);
    // $("#map-layer").css("height","100%");
    // $("#map-layer").css("width","100%");
    // document.body.removeChild(div);
    // //map.invalidateSize();
}

 