
// data is returned in a value listener

firebase.database().ref("/events").orderByChild("title").once('value').then(function(snapshot) {
    let data = snapshot.val();
    console.log(data);
    
    // if there is no data for whatever reason, just exit.
    if (data === null || data === undefined) {
      return;
    }

      let eventsToShow = '';
      $.each(data, function(i) {
          eventsToShow += "<div id=" + i + "><img src=" + data[i].image + " alt='image'>";
          eventsToShow += "<h2 class='list'>" + data[i].title + "</h2>";
          eventsToShow += "<p class='detail'>" + data[i].content + "</p></br></div>";
      });
      console.log(eventsToShow);
      $('#events_main').empty();
      $('#events_main').html(eventsToShow);
//      $('h2').click(function() {
  //      event.preventDefault();
    //    var eid = $(this).attr("title");
      //  console.log(eid);
      //  $('div#'+eid).toggle();
    //  }
  });

/*
  $('#result').empty();
  $('#result').html(result);
  $('.info').hide();
  $('h2').click(function() {
    event.preventDefault();
    var eid = $(this).attr("id");
    $('div#'+eid).toggle();
  });
}*/
