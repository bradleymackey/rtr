/*
 * Manages the naivgation bar and the display of elements.
 */

"use strict";

//stores current page for back button.
var currentPage = 0;

document.addEventListener('deviceready', onDeviceReady, false);
//document.querySelector("#eventsShowOnMap").addEventListener('click', showOnMap);

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

$("#event_detail").on("click", "#eventsShowOnMap", showOnMap);
//$(".event_b").click(console.log("button clicked"));
//document.getElementById("#eventsShowOnMap").onclick = console.log('button clicked');
//show event detail
//$("#events .content-item").click(displayEventContentItem);

//$("#news .content-item").click(displayNewsContentItem);

$("#volunteer-ops .content-item").click(displayVolunteerSignup);

//$("#backbutton").click(backButtonPressed);

$("#topnav-title").on("click", "#backbutton", backButtonPressed);

$("#topnav-title").on("click","#addNewNews",newNews);

//$("#newNewsPublish").click(newsPublisher("#new-News"));
$("#topnav-title").on("click","#addNewEvent",newEvent);

$("#editEventPublish").click(function(){eventPublisher("#edit-Event");});
$("#editNewsPublish").click(function(){newsPublisher("#edit-News");});
//$("#newEventPublish").click(eventPublisher("#new-Event"));

var count = 0;
$("#info-image").click(function(){
    count += 1;
    if (count === 5){
        displayAdminLogin();
        count = 0;
    }
});


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

function showOnMap() {
  displayMap();
  //$(".content").css("display", "none");
//  currentPage = 13;
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
    let user = firebase.auth().currentUser;
    let admin = (user.email !== undefined && user.email !== null);
    if (admin==true){
      $("#topnav-title").append(`
              <div class="input-group">
                  <input type="text" class="form-control" placeholder="Search News" style="height:34px">
                  <img  id="addNewNews" src="img/add.png" height="27px" width="27px" hspace="6px" vspace="2px">
              </div>`
      );
    }
    else {
      $("#topnav-title").append(`
            <div class="input-group">
                <input type="text" class="form-control" placeholder="Search News" style="height:34px">
            </div>`
      );
    }
    $(".content-item").show();
    hideBackButton();
    $("#new-News").hide();
    $("#edit-News").hide();
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
    $("#edit-Event").hide();
    $("#new-Event").hide();
    tabItemSelected($("#events-icon"),$("#events"));
    updateTitle("");
    let user = firebase.auth().currentUser;
    let admin = (user.email !== undefined && user.email !== null);
    if (admin==true){
      $("#topnav-title").append(`
              <div class="input-group">
                  <input type="text" class="form-control" placeholder="Search Events" style="height:34px">
                  <img  id="addNewEvent" src="img/add.png" height="27px" width="27px" hspace="6px" vspace="2px">
              </div>`
      );
    }
    else{
      $("#topnav-title").append(`
            <div class="input-group">
              <input type="text" class="form-control" placeholder="Search Events" style="height:34px">
            </div>`
      );
    }
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
    $("#info-image").show();
    $(".info_main").show();
    tabItemSelected($("#info-icon"),$("#info"));
    updateTitle("Information");
    hideBackButton();
    currentPage = 7;
    return false;
}

function displayVisions(){
    //changes margin so that there isnt a space between navbar and logo
    $(".info_main").hide();
    $(".fix").show();
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

function displayAdminLogin(){
    //changes margin so that there isnt a space between navbar and logo
    //$(".body").css({"background-color": "#1c7430"});
    $(".info_main").hide();
    $("#info-image").hide();
    $(".info-section").hide();
    $("#admin").show();
    updateTitle("Admin Login");
    $("#topnav-title").prepend('<img id="backbutton" src="img/left-arrow.png" alt="back">');
    currentPage = 14;
    return false;
}

function newNews(){
  //first line will have to be adapted for the precursor page
  $("#news_main").hide();
  $("#new-Event").hide();
  $("#new-News").show();
  $("#edit-Event").hide();
  updateTitle("New News Article");
  $("#topnav-title").prepend('<img id="backbutton" src="img/left-arrow.png" alt="back">');
  $("#newNewsPublish").click(function(){newsPublisher("#new-News");});
  currentPage = 3;
  return false;
}

function newEvent(){
  //first line will have to be adapted for the precursor page
  $("#new-News").hide();
  $("#events_main").hide();
  $("#new-Event").show();
  $("#edit-News").hide();
  updateTitle("New Event Creator");
  $("#topnav-title").prepend('<img id="backbutton" src="img/left-arrow.png" alt="back">');
  $("#newEventPublish").click(function(){eventPublisher("#new-Event");});
  currentPage = 5;
  return false;
}

function editEvent(id){
  //info-main will change
  $("#event_detail").hide();
  $("#edit-Event").show();
  $("#edit-News").hide();
  $("#new-News").hide();
  updateTitle("Edit Event Detail");
  $("#topnav-title").prepend('<img id="backbutton" src="img/left-arrow.png" alt="back">');
  currentPage = 5;
  var ref = firebase.database().ref('events/' + id);
  ref.once("value")
  .then(function(snapshot){
  var title = snapshot.child("title").val();
  var content = snapshot.child("content").val();
  var image = snapshot.child("image").val();
  var contact = snapshot.child("contact").val();
  var location1 = snapshot.child("location_1").val();
  var location2 = snapshot.child("location_2").val();
  var bool = snapshot.child("booking_required").val();
  if (bool == true){
    bool = "TRUE";
  }
  else{
    bool = "FALSE";
  }
  $("#editEventTitle").val(title);
  $("#editEventContent").val(content);
  $("#editEventImage").val(image);
  $("#editEventContact").val(contact);
  $("#editEventLoc1").val(location1);
  $("#editEventLoc2").val(location2);
  $("#editEventID").val(id);
  $("#bookreq").val(bool);
});
  return false;
}

function editNews(id){
  //info-main will change
  $("#news_main").hide();
  $("#news-article").hide();
  $("#new-News").hide();
  $("#edit-News").show();
  $("#edit-Event").hide();
  $("#new-Event").hide();
  $("#topnav-title").prepend('<img id="backbutton" src="img/left-arrow.png" alt="back">');
  currentPage = 3;
  updateTitle("Edit News Article");
  var ref = firebase.database().ref('news/' + id);
  ref.once("value")
  .then(function(snapshot){
  var title = snapshot.child("title").val();
  var text1 = snapshot.child("content").val();
  var img1 = snapshot.child("image_1").val();
  var text2 = snapshot.child("content_1").val();
  var img2 = snapshot.child("image_2").val();
  var text3 = snapshot.child("content_2").val();
  var img3 = snapshot.child("image_3").val();
  $("#editNewsTitle").val(title);
  $("#editNewsText1").val(text1);
  $("#editNewsImage1").val(img1);
  $("#editNewsText2").val(text2);
  $("#editNewsImage2").val(img2);
  $("#editNewsText3").val(text3);
  $("#editNewsImage3").val(img3);
  $("#editNewsID").val(id);
  });
  return false;
}


function newsPublisher(prevPage){
  if (prevPage=="#edit-News"){
    var getInfo = document.getElementById("getEditNewsContent");
  }
  else{
    var getInfo = document.getElementById("getNewsContent");
  }
  var title = getInfo.elements[0].value;
  var text1 = getInfo.elements[1].value;
  var image1 = getInfo.elements[2].value;
  var text2 = getInfo.elements[3].value;
  var image2 = getInfo.elements[4].value;
  var text3 = getInfo.elements[5].value;
  var image3 = getInfo.elements[6].value;
  var id = getInfo.elements[7].value;
  //alert (title+text1 + image1 + text2 +image2 +text3 + image3);
  newsVerifyPublish(prevPage,id,title,text1,image1,text2,image2,text3,image3);
  //writeNews(title,title,text1,image1,text2,image2,text3,image3);
  return false;
}

function eventPublisher(pageType){
  //important if statement here
  if (pageType=="#edit-Event"){
    var eventInfo = document.getElementById("getEditEventContent");
  }
  else{
    var eventInfo = document.getElementById("getEventContent");
  }
  var title = eventInfo.elements[0].value;
  var content = eventInfo.elements[1].value;
  var image = eventInfo.elements[2].value;
  var contact = eventInfo.elements[3].value;
  var location1 = eventInfo.elements[4].value;
  var location2 = eventInfo.elements[5].value;
  var id = eventInfo.elements[6].value;
  var x=$("#bookreq").is(":checked");
  //alert(x);
  eventVerifyPublish(pageType, id, title, content, image, contact,location1, location2,x);
  //writeEvents(id, title, content, image, contact,location1, location2, book_req);
  return false;
}



function repopulateEvent(id,title,content,image,contact,location1, location2,bookreq){
$("#editEventTitle").val(title);
$("#editEventContent").val(content);
$("#editEventImage").val(image);
$("#editEventContact").val(contact);
$("#editEventLoc1").val(location1);
$("#editEventLoc2").val(location2);
$("#editEventID").val(id);
$("#verifyPublish").hide();
$("#new-News").hide();
$("#edit-Event").show();
updateTitle("Event");
$("#topnav-title").prepend('<img id="backbutton" src="img/left-arrow.png" alt="back">');
$("#newEventsPublish").click(function(){eventPublisher("#edit-Event");});
currentPage = 5;
return false;
}

function repopulateNews(id,title,text1,image1,text2,image2,text3,image3){
  $("#newsTitle").val(title);
  $("#newsText1").val(text1);
  $("#newsImage1").val(image1);
  $("#newsText2").val(text2);
  $("#newsImage2").val(image2);
  $("#newsText3").val(text3);
  $("#newsImage3").val(image3);
  $("#newsID").val(id);
  $("#verifyPublish").hide();
  $("#new-Event").hide();
  $("#new-News").show();
  updateTitle("News Article");
  $("#topnav-title").prepend('<img id="backbutton" src="img/left-arrow.png" alt="back">');
  $("#newNewsPublish").click(function(){newsPublisher("#new-News");});
  $("#editNewsPublish").click(function(){newsPublisher("#edit-News");});
  currentPage = 3;
  return false;
}


function eventVerifyPublish(prevPage, id, title, content, image, contact,location1, location2,book_req){
  //alert(prevPage);
  $(prevPage).hide();
  $("#verifyPublish").show();
  updateTitle("Verify Publish");
  $("#confirm").click(function(){writeEvents(id, title, content, image, contact,location1, location2, book_req);});
  $("#cancel").click(function(){repopulateEvent(id, title, content, image, contact,location1, location2, book_req);});
  return false;
}

function newsVerifyPublish(prevPage, id,title,text1,image1,text2,image2,text3,image3){
  //alert(prevPage);
  $(prevPage).hide();
  $("#verifyPublish").show();
  updateTitle("Verify Publish");
  $("#confirm").click(function(){writeNews(id,title,text1,image1,text2,image2,text3,image3);});
  $("#cancel").click(function(){repopulateNews(id,title,text1,image1,text2,image2,text3,image3)});
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
        case 14:
            displayInfo();
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
