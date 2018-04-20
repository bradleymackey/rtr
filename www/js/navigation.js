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

$("#topnav-title").on("click","#addNewProject",newProject);

$("#editEventPublish").click(function(){eventPublisher("#edit-Event", "publish");});
$("#editNewsPublish").click(function(){newsPublisher("#edit-News", "publish");});
$("#editProjectPublish").click(function(){projectPublisher("#edit-Project", "publish");});
$("#deleteNews").click(function(){newsPublisher("#edit-News", "delete");});
$("#deleteEvent").click(function(){eventPublisher("#edit-Event", "delete");});
$("#deleteProject").click(function(){projectPublisher("#edit-Project","delete");});
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
    // reset the admin login touch count
    count = 0;
    // show all map markers that may have been hidden during the last search
    $(".marker").show();

    if (layerIDs !== undefined && layerIDs !== null) {
        // make all the labels for projects visible that may have been hidden during the last search
        layerIDs.forEach(function(layerID) {
            map.setLayoutProperty(layerID, 'visibility', 'visible');
        });
    }
  $('.topnav').css('background-color', '#0c2340');
	$("#edit-Event").hide();
	$("#new-Event").hide();
	$("#edit-News").hide();
	$("#new-News").hide();
  $("#new-Project").hide();
  $("#edit-Project").hide();
    // hide content, because the map requires a different layout
    $(".content").css("display", "none");
    tabItemSelected($("#map-icon"),$("#map"));
    updateTitle("");
    let user = firebase.auth().currentUser;
    let admin = (user.email !== undefined && user.email !== null);
    //admin =true;
    if (admin==true){
      $("#topnav-title").append(`
              <div class="input-group">
                  <input type="text" class="form-control" id="search-bar" placeholder="Search Map"style="height:34px">
                  <img  id="addNewProject" src="img/add.png" height="27px" width="27px" hspace="6px" vspace="2px">
              </div>`
      );
    }
    else{
    $("#topnav-title").append(`
      <div class="input-group">
        <input type="text" class="form-control" id="search-bar" placeholder="Search Map"style="height:34px">
      </div>`
    );
  }
    hideBackButton();
    //updateMapSize();
    currentPage = 0;
    return false;
}

function displayPhotos() {
    // reset the admin login touch count
    count = 0;
    // hide both of the messages
    $("#photo-upload-error").hide();
    $("#photo-upload-success").hide();
    $("#photo-upload-loading").hide();
    // hide the other content panels
	$("#edit-Event").hide();
	$("#new-Event").hide();
	$("#edit-News").hide();
	$("#new-News").hide();
  $("#new-Project").hide();
  $("#edit-Project").hide();
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
    // reset the admin login touch count
    count = 0;
    // display content again (because map hides it)
	$("#edit-Event").hide();
	$("#new-Event").hide();
	$("#edit-News").hide();
	$("#new-News").hide();
  $("#new-Project").hide();
  $("#edit-Project").hide();
    $(".content").css("display", "block");
    $(".content").css({"margin-top": "3.0 em"});
    tabItemSelected($("#news-icon"),$("#news"));
    updateTitle("");
    let user = firebase.auth().currentUser;
    let admin = (user.email !== undefined && user.email !== null);
    if (admin==true){
      $("#topnav-title").append(`
              <div class="input-group">
                  <input type="text" class="form-control" id="search-bar" placeholder="Search News" style="height:34px">
                  <img  id="addNewNews" src="img/add.png" height="27px" width="27px" hspace="6px" vspace="2px">
              </div>`
      );
    }
    else {
      $("#topnav-title").append(`
            <div class="input-group">
                <input type="text" class="form-control" id="search-bar"  placeholder="Search News" style="height:34px">
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
    // reset the admin login touch count
    count = 0;
	$("#edit-Event").hide();
	$("#new-Event").hide();
	$("#edit-News").hide();
	$("#new-News").hide();
  $("#new-Project").hide();
  $("#edit-Project").hide();
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
                  <input type="text" class="form-control" id="search-bar"  placeholder="Search Events" style="height:34px">
                  <img  id="addNewEvent" src="img/add.png" height="27px" width="27px" hspace="6px" vspace="2px">
              </div>`
      );
    }
    else{
      $("#topnav-title").append(`
            <div class="input-group">
              <input type="text" class="form-control" id="search-bar"  placeholder="Search Events" style="height:34px">
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
	$("#edit-Event").hide();
	$("#new-Event").hide();
	$("#edit-News").hide();
	$("#new-News").hide();
  $("#new-Project").hide();
  $("#edit-Project").hide();
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
    // reset the admin login touch count
    count = 0;
	$("#edit-Event").hide();
	$("#new-Event").hide();
	$("#edit-News").hide();
	$("#new-News").hide();
  $("#edit-Project").hide();
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
    // reset the admin login touch count
    count = 0;
	$("#edit-Event").hide();
	$("#new-Event").hide();
	$("#edit-News").hide();
	$("#new-News").hide();
  $("#edit-Project").hide();
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
    // reset the admin login touch count
    count = 0;
	$("#edit-Event").hide();
	$("#new-Event").hide();
	$("#edit-News").hide();
	$("#new-News").hide();
  $("#edit-Project").hide();
  $("#new-Project").hide();
    $("#volunteer-ops").hide();
    $("#volunteer-signup").show();
    updateTitle("Volunteer sign up");
    showBackButton();
    currentPage = 10;
    return false;
}

function displayLeaflets(){
    // reset the admin login touch count
    count = 0;
	$("#edit-Event").hide();
	$("#new-Event").hide();
	$("#edit-News").hide();
	$("#new-News").hide();
  $("#new-Project").hide();
  $("#edit-Project").hide();
    //changes margin so that there isnt a space between navbar and logo
    $(".info_main").hide();
    $("#leaflets").show();
    $(".info_images").hide();
    updateTitle("Leaflets");
    showBackButton();
    currentPage = 11;
    return false;
}

function displayAdminLogin(){
    //changes margin so that there isnt a space between navbar and logo
    //$(".body").css({"background-color": "#1c7430"});
	$("#edit-Event").hide();
	$("#new-Event").hide();
	$("#edit-News").hide();
	$("#new-News").hide();
  $("#edit-Project").hide();
  $("#new-Project").hide();
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
    // reset the admin login touch count
    count = 0;
  //first line will have to be adapted for the precursor page
  $("#edit-Event").hide();
  $("#new-Event").hide();
  $("#edit-News").hide();
  $("#new-News").hide();
  $("#news_main").hide();
  $("#new-Event").hide();
  $("#new-News").show();
  $("#edit-Event").hide();
  $("#new-Project").hide();
  updateTitle("New News Article");
  $("#topnav-title").prepend('<img id="backbutton" src="img/left-arrow.png" alt="back">');
  $("#newNewsPublish").click(function(){newsPublisher("#new-News", "publish");});
  currentPage = 3;
  return false;
}

function newEvent(){
    // reset the admin login touch count
    count = 0;
  //first line will have to be adapted for the precursor page
  $("#new-News").hide();
  $("#events_main").hide();
  $("#new-Event").show();
  $("#edit-News").hide();
  $("#new-Project").hide();
  updateTitle("New Event Creator");
  $("#topnav-title").prepend('<img id="backbutton" src="img/left-arrow.png" alt="back">');
  $("#newEventPublish").click(function(){eventPublisher("#new-Event", "publish");});
  currentPage = 5;
  return false;
}

function newProject(){
  $("#map").hide();
  $("#new-Project").show();
  updateTitle("New Project");
  $("#projectPublish").click(function(){projectPublisher("#new-Project", "publish");});
  $("#topnav-title").prepend('<img id="backbutton" src="img/left-arrow.png" alt="back">');
  currentPage = 0;
  return false;
}

function editProject(id){
  $("#map").hide();
  $("#event_detail").hide();
  $("#project-detail").hide();
  $("#edit-Event").hide();
  $("#edit-News").hide();
  $("#new-News").hide();
  $("#edit-Project").show();
  updateTitle("Edit Project");
  $("#editProjectPublish").click(function(){projectPublisher("#new-Project", "publish");});
  $("#topnav-title").prepend('<img id="backbutton" src="img/left-arrow.png" alt="back">');
  var ref = firebase.database().ref('projects/' + id);
  ref.once("value")
  .then(function(snapshot){
    var title = snapshot.child("title").val();
    var description = snapshot.child("description").val();
    var image = snapshot.child("image").val();
    var moreInfo = snapshot.child("more_info").val();
    var tag = snapshot.child("tag").val();
    var lat = snapshot.child("lat").val();
    var long = snapshot.child("long").val();
    $("#editProjectID").val(id);
    $("#editProjectTitle").val(title);
    $("#editProjectDescription").val(description);
    $("#editProjectImage").val(image);
    $("#editProjectMoreInfo").val(moreInfo);
    $("#editProjectTag").val(tag);
    $("#editProjectLat").val(lat);
    $("#editProjectLong").val(long);
  });
  currentPage = 0;
  return false;
}


function editEvent(id){
    // reset the admin login touch count
    count = 0;
  //info-main will change
  $("#event_detail").hide();
  $("#edit-Event").show();
  $("#edit-News").hide();
  $("#new-News").hide();
  $("#edit-Project").hide();
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
  var bookingRequired = snapshot.child("booking_required").val();
  if (bookingRequired == true){
    bookingRequired = "TRUE";
  } else {
    bookingRequired = "FALSE";
  }
  $("#editEventTitle").val(title);
  $("#editEventContent").val(content);
  $("#editEventImage").val(image);
  $("#editEventContact").val(contact);
  $("#editEventLoc1").val(location1);
  $("#editEventLoc2").val(location2);
  $("#editEventID").val(id);
  $("#bookreq").bookingRequired(bookingRequired);
});
  return false;
}

function editNews(id){
    // reset the admin login touch count
    count = 0;
  //info-main will change
  $("#news_main").hide();
  $("#news-article").hide();
  $("#new-News").hide();
  $("#edit-News").show();
  $("#edit-Event").hide();
  $("#edit-Project").hide();
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


function newsPublisher(prevPage, operation){
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
  if (id==="" && operation !== "publish"){
    alert("Unique ID incorrect or invalid!");
  }
  else{
  //alert (title+text1 + image1 + text2 +image2 +text3 + image3);
  newsVerifyPublish(prevPage,id,title,text1,image1,text2,image2,text3,image3, operation);
}
  //writeNews(title,title,text1,image1,text2,image2,text3,image3);
  return false;
}

function eventPublisher(pageType, operation){
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
  if (id==="" && operation !== "publish"){
    alert("Unique ID incorrect or invalid!");
  }
  else{
  eventVerifyPublish(pageType, id, title, content, image, contact,location1, location2,x, operation);
  //writeEvents(id, title, content, image, contact,location1, location2, book_req);
}
  return false;
}

function projectPublisher(prevPage, operation){
  if (prevPage == "#new-Project" ){
  var getInfo = document.getElementById("getNewProjectContent");
  }
  else{
    var getInfo = document.getElementById("getEditProjectContent");
  }
  var title = getInfo.elements[0].value;
  var description = getInfo.elements[1].value;
  var image = getInfo.elements[2].value;
  var moreInfo = getInfo.elements[3].value;
  var tag = getInfo.elements[4].value;
  var lat = getInfo.elements[5].value;
  var long = getInfo.elements[6].value;
  var id = getInfo.elements[7].value;
  if (id === "" && operation !== "publish"){
    alert("Unique ID incorrect or invalid!");
  }
  else{
  projectsVerifyPublish(prevPage, id, title, image, lat, long, tag, moreInfo, description, operation);
  }
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
$("#editEventPublish").click(function(){eventPublisher("#edit-Event");})
$("#deleteEvent").click(function(){deleteVerify("#edit-Event", "delete");});
currentPage = 5;
return false;
}

function repopulateNews(id,title,text1,image1,text2,image2,text3,image3){
  $("#editNewsTitle").val(title);
  $("#editNewsText1").val(text1);
  $("#editNewsImage1").val(image1);
  $("#editNewsText2").val(text2);
  $("#editNewsImage2").val(image2);
  $("#editNewsText3").val(text3);
  $("#editNewsImage3").val(image3);
  $("#editNewsID").val(id);
  $("#verifyPublish").hide();
  $("#new-Event").hide();
  $("#new-News").hide();
  $("#edit-News").show();
  updateTitle("News Article");
  $("#topnav-title").prepend('<img id="backbutton" src="img/left-arrow.png" alt="back">');
    $("#editNewsPublish").click(function(){newsPublisher("#edit-News", "publish");});
  $("#deleteNews").click(function(){deleteVerify("#edit-News", "delete")});
  currentPage = 3;
  return false;
}

function repopulateProjects(id, title, image, lat, long, tag, moreInfo, description){
 $("#editProjectTitle").val(title);
 $("#editProjectID").val(id);
 $("#editProjectImage").val(image);
 $("#editProjectLat").val(lat);
 $("#editProjectLong").val(long);
 $("#editProjectMoreInfo").val(moreInfo);
 $("#editProjectTag").val(tag);
 $("#editProjectDescription").val(description);
 $("#edit-Project").show();
 $("#verifyPublish").hide();
 $("#new-Project").hide();
 updateTitle("Project");
 $("#topnav-title").prepend('<img id="backbutton" src="img/left-arrow.png" alt="back">');
 $("#editProjectPublish").click(function(){projectPublisher("#edit-Project", "publish");});
 $("#deleteProject").click(function(){projectPublisher("#edit-Project", "delete");});
 currentPage=0;
 return false;
}

function eventVerifyPublish(prevPage, id, title, content, image, contact,location1, location2,book_req, operation){
  //alert(prevPage);
  $(prevPage).hide();
  $("#verifyPublish").show();
  updateTitle("Verify Publish");
  if (operation == "delete"){
    $("#confirm").click(function(){deleteEvent(id);$("#verifyPublish").hide();});
    $("#cancel").click(function(){repopulateEvent(id, title, content, image, contact,location1, location2,book_req);$("#verifyPublish").hide();});
  }
  else{
  $("#confirm").click(function(){writeEvents(title, content, image, contact,location1, location2, book_req);$("#verifyPublish").hide();});
  $("#cancel").click(function(){repopulateEvent(id, title, content, image, contact,location1, location2, book_req);$("#verifyPublish").hide();});
  }
  return false;
}

function newsVerifyPublish(prevPage, id,title,text1,image1,text2,image2,text3,image3,operation){
  //alert(prevPage);
  $(prevPage).hide();
  $("#verifyPublish").show();
  updateTitle("Verify Publish");
  if (operation == "delete"){
    $("#confirm").click(function(){deleteNews(id);$("#verifyPublish").hide();});
    $("#cancel").click(function(){repopulateNews(id,title,text1,image1,text2,image2,text3,image3);$("#verifyPublish").hide();});
  }
  else{
  $("#confirm").click(function(){writeNews(title,text1,image1,text2,image2,text3,image3);$("#verifyPublish").hide();});
  $("#cancel").click(function(){repopulateNews(id,title,text1,image1,text2,image2,text3,image3);$("#verifyPublish").hide();});
  }
  return false;
}

function projectsVerifyPublish (prevPage, id, title, image, lat, long, tag, moreInfo, description, operation){
  $(prevPage).hide();
  $("#verifyPublish").show();
  updateTitle("Verify Publish");
  if (operation == "publish"){
    $("#confirm").click(function(){writeProjects(title, image, lat, long, tag, moreInfo, description);$("#verifyPublish").hide();});
    $("#cancel").click(function(){repopulateProjects( id, title, image, lat, long, tag, moreInfo, description);$("#verifyPublish").hide();});
  }
  else{
    $("#confirm").click(function(){deleteProject(id);$("#verifyPublish").hide();});
    $("#cancel").click(function(){repopulateProjects( id, title, image, lat, long, tag, moreInfo, description);$("#verifyPublish").hide();});
  }
  return false;
}

/*
function displayEventContentItem(){
    //changes margin so that there isnt a space between navbar and logo
    $(".events_main").hide(); id, title, image, lat, long, tag, moreInfo, description
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
  if (device.platform.toUpperCase() == "ANDROID")
  {
    return;
  }
  $("#topnav-title").prepend('<img id="backbutton" src="img/left-arrow.png" alt="back">');
  $("#backbutton").show();
}

function hideBackButton(){
  $("#backbutton").hide();
  $("#topnav-title").css({"padding-left":"13px"});
}

function backButtonPressed() {
    // reset the admin login touch count
    count = 0;
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
	$("#edit-Event").hide();
	$("#new-Event").hide();
	$("#edit-News").hide();
	$("#new-News").hide();
  $("#new-Project").hide();
	$("#verifyPublish").hide();
  $("#edit-Project").hide();
}
