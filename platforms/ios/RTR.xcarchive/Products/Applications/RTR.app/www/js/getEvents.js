
// `database` is already scoped
// data is returned in a value listener

firebase.database().ref("/events").orderByChild("title").once('value').then(function(snapshot) {
    var event = (snapshot.val()) || 'nothing';
    console.log(event)
    $("#demo").html(event.birdsEvent.contact);
    // ...
  });

