/*
 * Manages the naivgation bar and the display of elements.
 */

"use strict";

//stores current page for back button.
var currentPage = 0;

document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    // ready to use device APIs
    navigator.geolocation.getCurrentPosition(function() {
        console.log("success");
    });
}

$("#map-icon").click(displayMap);

$("#photos-icon").click(displayPhotos);

$("#news-icon").click(displayNews);

$("#events-icon").click(displayEvents);

$("#info-icon").click(displayInfo);

$("#infoToVisions").click(displayVisions);

$("#infoToVolunteer").click(displayVolunteer);

$("#infoToLeaflets").click(displayLeaflets);

//show event detail
//$("#events .content-item").click(displayEventContentItem);

//$("#news .content-item").click(displayNewsContentItem);

$("#volunteer-ops .content-item").click(displayVolunteerSignup);

$("#backbutton").click(backButtonPressed);

$("#topnav-title").on("click", "#backbutton", backButtonPressed);


function displayMap() {
    // hide content, because the map requires a different layout
    $(".content").css("display", "none");
    tabItemSelected($("#map-icon"),$("#map"));
    updateTitle("");
    $("#topnav-title").append(`
      <div class="input-group">
        <input type="text" class="form-control" placeholder="Search Map"style="height:34px">
      </div>`
    );
    hideBackButton();
    //updateMapSize();
    currentPage = 0;
    return false;
}

function displayPhotos() {
    $(".content").css("display", "block");
    $(".content").css({"margin-top": "3.0 em"});
    tabItemSelected($("#photos-icon"),$("#photos"));
    updateTitle("Photos");
    hideBackButton();
    $(".content-item").show();
    currentPage = 99;
    return false;
}

function displayNews(){
    // display content again (because map hides it)
    $(".content").css("display", "block");
    $(".content").css({"margin-top": "3.0 em"});
    tabItemSelected($("#news-icon"),$("#news"));
    updateTitle("");
    $("#topnav-title").append(`
            <div class="input-group">
                <input type="text" class="form-control" placeholder="Search News" style="height:34px">
            </div>`
    );

    $(".content-item").show();

    hideBackButton();
    $("#news_main").show();
    $("#news-article").empty();

    $("#news-article").hide();
    $("#news-article").empty();
    currentPage = 3;
    return false;
}

function displayEvents(){
    // display content again (because map hides it)
    $(".content").css("display", "block");
    $(".content").css({"margin-top": "3.0 em"});
    $(".event-section").hide();
    $("#events_main").show();
    tabItemSelected($("#events-icon"),$("#events"));
    updateTitle("");
    $("#topnav-title").append(`
            <div class="input-group">
              <input type="text" class="form-control" placeholder="Search Events" style="height:34px">
            </div>`
    );
    hideBackButton();
    $("#events_main").show();
    $("#event_detail").hide();
    currentPage = 5;
    return false;
}

function displayInfo(){
    // display content again (because map hides it)
    $(".content").css("display", "block");
    //changes margin so that there isnt a space between navbar and logo
    $(".content").css({"margin-top": "4.3 em"});
    $(".info-section").hide();
    $(".info_main").show();
    tabItemSelected($("#info-icon"),$("#info"));
    updateTitle("Information");
    hideBackButton();
    currentPage = 7;
    return false;
}

function displayVisions(){
    //changes margin so that there isnt a space between navbar and logo
    $(".container").hide();
    $("#visions-aims").show();
    updateTitle("Visions and Aims");
    $("#topnav-title").prepend('<img id="backbutton" src="img/left-arrow.png" alt="back">');  
    currentPage = 8;
    return false;
}

function displayVolunteer(){
    //changes margin so that there isnt a space between navbar and logo
    $(".info_main").hide();
    $("#volunteer-ops").show();
    $("#volunteer_main").show();
    $("#volunteer_detail").empty();
    $("#volunteer_detail").hide();
    $(".info_images").hide();
    updateTitle("Volunteer Opportunities");
    $("#topnav-title").prepend('<img id="backbutton" src="img/left-arrow.png" alt="back">');    
    //showBackButton();
    currentPage = 9;
    return false;
}

function displayVolunteerSignup(){
    $("#volunteer-ops").hide();
    $("#volunteer-signup").show();
    updateTitle("Volunteer sign up");
    showBackButton();
    currentPage = 10;
    return false;
}

function displayLeaflets(){
    //changes margin so that there isnt a space between navbar and logo
    $(".info_main").hide();
    $("#leaflets").show();
    $(".info_images").hide();
    updateTitle("Leaflets");
    $("#topnav-title").prepend('<img id="backbutton" src="img/left-arrow.png" alt="back">');  
    currentPage = 11;
    return false;
}

/*
function displayEventContentItem(){
    //changes margin so that there isnt a space between navbar and logo
    $(".events_main").hide();
    $("#event_detail").show();
    updateTitle("Event Detail");
    //back button
    $("#topnav-title").prepend('<img id="backbutton" src="img/left-arrow.png" alt="back">');
    currentPage = 6;
    return false;
}*/

/*
function displayNewsContentItem(){
    $("#backbutton").show();
    $(".content-item").hide();
    $("#news-article").show();
    updateTitle("Some Article");
    currentPage = 4;
    return false;
}*/

function showBackButton(){
  $("#backbutton").show();
  $("#topnav-title").css({"padding-left":"90px"});
}

function hideBackButton(){
  $("#backbutton").hide();
  $("#topnav-title").css({"padding-left":"13px"});
}

function backButtonPressed() {
    //alert(currentPage);
    console.log("back button pressed");
    //updateMapSize();
    switch(currentPage){
        case 0:
        case 1:
        case 2:
            displayMap();
            break;
        case 3:
            displayNews();
            break;
        case 5:
            displayEvents();
            break;
        case 8:
        case 9:
            displayInfo();
            break;
        case 10:
            displayVolunteer();
            break;
        case 11:
            displayInfo();
            break;
        case 12:
            displayLeaflets();
            break;
        case 99:
            displayPhotos();
            break;
        default:
        break;
    }
}

document.addEventListener("backbutton", function(){
   backButtonPressed();
});

// update the top title of the navigation bar when a new section is selected
function updateTitle(titleText) {
    $("#topnav-title").text(titleText);
    // if we are changing the title, we are likley changing page, so scroll to top
    window.scrollTo(0, 0);
}

// when a tab item is selected, hide all current tab items and then only show the currently selected one
function tabItemSelected($tabItem,$section) {
    $(".app-section").hide();
    $section.show();
    $(".tab-icon").removeClass("active");
    $tabItem.addClass("active");
}
