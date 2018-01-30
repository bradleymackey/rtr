/*
 * Manages the display and searching of the map.
 */

 "use strict";

 var map;

 document.addEventListener("DOMContentLoaded", function(event) {
    mapboxgl.accessToken = 'pk.eyJ1IjoiYnJhZGxleW1hY2tleSIsImEiOiJjamNraW14eXYzanZzMzNwZ2UyNW9ua2tzIn0.4YBdPgKnDN5XFdVVMeo4LQ';
    navigator.geolocation.getCurrentPosition(function(position) {
        alert(position.coords);
    });
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
    cordova.plugins.locationAccuracy.canRequest(function(canRequest){
        if(canRequest){
            cordova.plugins.locationAccuracy.request(function(){
                console.log("Request successful");
            }, function (error){
                console.error("Request failed");
                if(error){
                    // Android only
                    console.error("error code="+error.code+"; error message="+error.message);
                    if(error.code !== cordova.plugins.locationAccuracy.ERROR_USER_DISAGREED){
                        if(window.confirm("Failed to automatically set Location Mode to 'High Accuracy'. Would you like to switch to the Location Settings page and do this manually?")){
                            cordova.plugins.diagnostic.switchToLocationSettings();
                        }
                    }
                }
            }, cordova.plugins.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY // iOS will ignore this
            );
        }
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
    //map.invalidateSize(); 
    document.body.removeChild(div);
}).trigger("resize");


 