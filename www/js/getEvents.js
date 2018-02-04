
// data is returned in a value listener

firebase.database().ref("/events").orderByChild("title").once('value').then(function(snapshot) {
    var event = (snapshot.val()) || 'nothing';
  //  $("#ev_title").html(event.birdsEvent.title);
  //  $("#ev_img").html(event.birdsEvent.image);
  //  $("#ev_content").hmtl(event.birdsEvent.content);

      data = event;
      var f = '';
      $.each(data, function(i){
            f+= "<div id="+i+"><img src="+data[i].image+" alt='image'>"
            f+= "<h2 class='list' id="+i+">"+data[i].title+"</h2>"
            f+= "<p class='detail'>"+data[i].content+"</p></br></div>"
      });
      $('#events_main').empty();
      $('#events_main').html(f);
      var r = '';
      $("#events.content-item").click(displayEventContentItem);
      $('h2').click(function(){
        var eid = $(this).attr("id");
        ev = event[eid];
        r+= '<img src='+ev.image+' alt="image" style="width:100%;"><div style="padding: 15px;">'
        r+= '<h1 style="color: #2dccd3; text-align: left;">'+ev.title+'</h1>'
        r+=  '<p class="detail">'+ev.content+'</p> <h2>Event Details</h2>'
        r+= '<p><img class="icon" style="width:25px;" src="img/where-icon.png"><b> WHERE</b></br>'+ev.location_1+'</br>'+ev.location_2+'</p>'
        r+= '<button type="button" class="event_b">VIEW ON MAP</button> <hr>'
        r+=  '<p><img class="icon" style="width:25px;" src="img/when-icon.png"><b> WHEN</b></br>DATE</br> End: 31st January, 2018 at 3:00pm</p>'
        r+=  '<button type="button" class="event_b">ADD TO CALENDAR</button></div>'
        $('#events_main').hide();
        $('#event_detail').empty();
        $('#event_detail').show();
        $('#event_detail').html(r);
    });


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
