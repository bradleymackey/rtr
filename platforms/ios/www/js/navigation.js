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
    updateTitle("");
    $("#topnav-title").append(`
            <div class="input-group">
                <span class="input-group-btn">
        <button class="btn btn-search" type="button"><i class="glyphicon glyphicon-search"></i></button>
      </span>
                <input type="text" class="form-control" placeholder="Search Map...">
            </div>`
    );
    return false;
});

$("#news-icon").click(function() {
    tabItemSelected($("#news-icon"),$("#news"));
    updateTitle("");
    $("#topnav-title").append(`
            <div class="input-group">
                <span class="input-group-btn">
        <button class="btn btn-search" type="button"><i class="glyphicon glyphicon-search"></i></button>
      </span>
                <input type="text" class="form-control" placeholder="Search News...">
            </div>`
    );
    return false;
});

$("#events-icon").click(function() {
    tabItemSelected($("#events-icon"),$("#events"));
    updateTitle("");
    $("#topnav-title").append(`
            <div class="input-group">
                <span class="input-group-btn">
        <button class="btn btn-search" type="button"><i class="glyphicon glyphicon-search"></i></button>
      </span>
                <input type="text" class="form-control" placeholder="Search Events...">
            </div>`
    );
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
