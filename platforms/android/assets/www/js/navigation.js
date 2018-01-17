/*
 * Manages the naivgation bar and the display of elements.
 */

"use strict";

document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    // ready to use device APIs
}

$("#map-icon").click(function() {
    tabItemSelected($("#map-icon"),$("#map"));
    return false;
});

$("#news-icon").click(function() {
    tabItemSelected($("#news-icon"),$("#news"));
    return false;
});

$("#events-icon").click(function() {
    tabItemSelected($("#events-icon"),$("#events"));
    return false;
});

$("#info-icon").click(function() {
    tabItemSelected($("#info-icon"),$("#info"));
    return false;
});

function tabItemSelected($tabItem,$section) {
    $(".app-section").hide();
    $section.show();
    $(".tab-icon").removeClass("active");
    $tabItem.addClass("active");
}
