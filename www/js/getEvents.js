
// `database` is already scoped
// data is returned in a value listener

firebase.database().ref("/events").orderByChild("title").once('value').then(function(snapshot) {
    var event = (snapshot.val()) || 'nothing';
    console.log(event);
    console.log('hello');
  //  $("#ev_title").html(event.birdsEvent.title);
  //  $("#ev_img").html(event.birdsEvent.image);
  //  $("#ev_content").hmtl(event.birdsEvent.content);

      data = event;
      var f = '';
      $.each(data, function(i){
            f+= "<div id="+i+"><img src="+data[i].image+" alt='image'>"
            f+= "<h2 class='list'>"+data[i].title+"</h2>"
            f+= "<p class='detail'>"+data[i].content+"</p></br></div>"
      });
      console.log(f);
      $('#events_main').empty();
      $('#events_main').html(f);
      $('h2').click(function() {
        event.preventDefault();
        var eid = $(this).attr("title");
        console.log(eid);
      //  $('div#'+eid).toggle();
      }
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
