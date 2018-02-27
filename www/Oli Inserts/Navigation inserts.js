//To add too navigation .js:
//At  the top
//The first line assumes there is a new news button with id new-news
//click through variable x
$("#newNewEvent").click(newNews);
$("#newNewsPublish").click(newsPublisher("#new-News"));
//click through variable y
$("#addNewNews").click(newEvent);
$("#newEventPublish").click(eventPublisher("#new-Event"));
//click through variable z
$("#z").click(editEvent);
$("#editEventPublish").click(eventPublisher("edit-Event"));
//click through variable x
$("#w").click(editNews);
$("#editNewsPublish").click(newsPublisher("#edit-News"));

function newNews(){
  //first line will have to be adapted for the precursor page
  $(".info_main").hide();
  $("#new-News").show();
  $("#topnav-title").prepend('<img id="backbutton" src="img/backbutton.png" alt="back">');
  currentPage = 3;
  return false;
}

function newEvent(){
  //first line will have to be adapted for the precursor page
  $(".info_main").hide();
  $("#new-Event").show();
  $("#topnav-title").prepend('<img id="backbutton" src="img/backbutton.png" alt="back">');
  currentPage = 5;
  return false;
}

function editNews(){
  //info-main will change
  $(".info_main").hide();
  $("#edit-News").show();
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
  });
  $("#editNewsTitle").val(title);
  $("#editNewsText1").val(text1);
  $("#editNewsImage1").val(img1);
  $("#editNewsText2").val(text2);
  $("#editNewsImage2").val(img2);
  $("#editNewsText3").val(text3);
  $("#editNewsImage3").val(img3);
  $("#editNewsID").val(id);
  return false;
}

//ID needs to be passed as an argument from the click through variable z.
function editEvent(id){
  //info-main will change
  $(".info_main").hide();
  $("#edit-Event").show();
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
  return false;
}


function newsPublisher(prevPage){
  var getInfo = document.getElementById("getNewsContent");
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
  var eventInfo = document.getElementById("getEventContent");
  var title = eventInfo.elements[0].value;
  var content = eventInfo.elements[1].value;
  var image = eventInfo.elements[2].value;
  var contact = eventInfo.elements[3].value;
  var location1 = eventInfo.elements[4].value;
  var location2 = eventInfo.elements[5].value;
  var id = eventInfo.elements[6].value;
  var x=$("#bookreq").is(":checked");
  alert(x);
  eventVerifyPublish(pageType, id, title, content, image, contact,location1, location2,book_req);
  //writeEvents(id, title, content, image, contact,location1, location2, book_req);
  return false;
}



function repopulateEvent(id,title,content,image,contact,location1, location2){
$("#eventTitle").val(title);
$("#eventContent").val(content);
$("#eventImage").val(image);
$("#eventContact").val(contact);
$("#eventLoc1").val(location1);
$("#eventLoc2").val(location2);
$("#eventID").val(id);
$("#verifyPublish").hide();
$("#new-Event").show();
return false;
}

function repopulateNews(id,title,text1,image1,text2,image2,text3,image3){
  $("#newsTitle").val(title);
  $("#newsText1").val(text1);
  $("#newsImage1").val(img1);
  $("#newsText2").val(text2);
  $("#newsImage2").val(img2);
  $("#newsText3").val(text3);
  $("#newsImage3").val(img3);
  $("#newsID").val(id);
  $("#verifyPublish").hide();
  $("#new-News").show();
  return false;
}


function eventVerifyPublish(prevPage, id, title, content, image, contact,location1, location2,book_req){
  $(prevPage).hide();
  $("#verifyPublish").show();
  $("#confirm").click(writeEvents(id, title, content, image, contact,location1, location2, book_req));
  $("#cancel").click(repopulateEvent(id, title, content, image, contact,location1, location2));
  return false;
}

function newsVerifyPublish(prevPage, id,title,text1,image1,text2,image2,text3,image3){
  $(prevPage).hide();
  $("#verifyPublish").show();
  $("#confirm").click(writeNews(id,title,text1,image1,text2,image2,text3,image3));
  $("#cancel").click(repopulateNews(id,title,text1,image1,text2,image2,text3,image3));
  return false;
}

//if admin is logged in
//display events
