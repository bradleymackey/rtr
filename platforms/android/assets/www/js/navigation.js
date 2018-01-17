/*
 * Manages the naivgation bar and the display of elements.
 */

"use strict";

document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    // ready to use device APIs
    alert("device ready");
    var autoHideNavigationBar = false;
	window.navigationbar.setUp(autoHideNavigationBar);
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

function updateTitle(titleText) {
    $("#topnav-title").text(titleText);
}

function tabItemSelected($tabItem,$section) {
    $(".app-section").hide();
    $section.show();
    $(".tab-icon").removeClass("active");
    $tabItem.addClass("active");
}
