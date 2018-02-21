
//this should overwrite as well as save new as long the correct id is passed
function writeNews(id,newtitle,text1,image1,text2,image2,text3,image3){
  //alert(title + " " + text1);
  firebase.database().ref('news/' + id).set(
  {title: newtitle,
  content: text1,
  image_1: image1,
  content_1: text2,
  image_2: image2,
  content_2: text3,
  image_3: image3
  });
  
    //display success Message and return to home page.
  return false;
}

function writeEvents(id,newtitle,text,img,contactee, location1, location2, bookreq){
	alert("been called");
	firebase.database().ref('events/'+id).set({
	booking_required: bookreq,
	contact: contactee,
	content: text,
	image: img,
	location_1: location1,
	location_2: location2,
	title: newtitle
	});
  //display success message and return to homepage
	return false;
}
