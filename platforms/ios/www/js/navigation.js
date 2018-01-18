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
    updateTitle("Map");
    return false;
});

$("#news-icon").click(function() {
    tabItemSelected($("#news-icon"),$("#news"));
    updateTitle("News");
    return false;
});

$("#events-icon").click(function() {
    tabItemSelected($("#events-icon"),$("#events"));
    updateTitle("Events");
    return false;
});

$("#info-icon").click(function() {
    tabItemSelected($("#info-icon"),$("#info"));
    updateTitle("Info");
    return false;
});

// update the top title of the navigation bar when a new section is selected
function updateTitle(titleText) {
    $("#topnav-title").text(titleText);
}

// when a tab item is selected, hide all current tab items and then only show the currently selected one
function tabItemSelected($tabItem,$section) {
    $(".app-section").hide();
    $section.show();
    $(".tab-icon").removeClass("active");
    $tabItem.addClass("active");
}
