/*
 * Manages the naivgation bar and the display of elements.
 */

"use strict";

document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    // ready to use device APIs
}

$("#map-icon").click(function() {
    $(".content").css({"margin-top": "3em"});
    tabItemSelected($("#map-icon"),$("#map"));
    updateTitle("Map");
    return false;
});

$("#news-icon").click(function() {
    $(".content").css({"margin-top": "3.0 em"});
    tabItemSelected($("#news-icon"),$("#news"));
    updateTitle("");
    $("#topnav-title").append(`
            <div class="input-group">
                <input type="text" class="form-control" placeholder="Search News">
            </div>`
    );
    $(".content-item").show();
    $("#news-article").hide();
    return false;
});

$("#events-icon").click(function() {
    $(".content").css({"margin-top": "3.0 em"});
    tabItemSelected($("#events-icon"),$("#events"));
    updateTitle("");
    $("#topnav-title").append(`
            <div class="input-group">
                <input type="text" class="form-control" placeholder="Search Events">
            </div>`
    );
    return false;
});

$("#info-icon").click(function() {
    //changes margin so that there isnt a space between navbar and logo
    $(".content").css({"margin-top": "4.3 em"});
    $(".info-section").hide();
    $(".info_main").show();
    tabItemSelected($("#info-icon"),$("#info"));
    updateTitle("Information");
    return false;
});

$("#infoToVisions").click(function() {
    //changes margin so that there isnt a space between navbar and logo
    $(".container").hide();
    $("#visions-aims").show();
    updateTitle("Visions and Aims");
    return false;
});

$("#infoToVolunteer").click(function() {
    //changes margin so that there isnt a space between navbar and logo
    $(".info_main").hide();
    $("#volunteer-ops").show();
    $(".info_images").hide();
    updateTitle("Volunteer Opportunities");
    return false;
});

$("#infoToLeaflets").click(function() {
    //changes margin so that there isnt a space between navbar and logo
    $(".info_main").hide();
    $("#leaflets").show();
    $(".info_images").hide();
    updateTitle("Leaflets");
    return false;
});

$("#news .content-item").click(function(){
    $(".content-item").hide();
    $("#news-article").show();
    updateTitle("Some Article");
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
