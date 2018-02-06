
// data is returned in a value listener

firebase.database().ref("/events").orderByChild("title").once('value').then(function(snapshot) {
    var event = (snapshot.val()) || 'nothing';
      data = event;
      //main events list
      var f = '';
      $.each(data, function(i){
            f+= "<div id="+i+" class='event_item'><img src="+data[i].image+" alt='image'>"
            f+= "<h2 class='list' id="+i+">"+data[i].title+"</h2>"
            f+= "<p class='detail'>"+data[i].content+"</p></br></div>"
      });
      $('#events_main').empty();
      $('#events_main').html(f);

      //event detail
      var r = '';
      $('.event_item').click(function(){
        var eid = $(this).attr("id");
        ev = event[eid];
        updateTitle(ev.title);
        r+= '<img src='+ev.image+' alt="image" style="width:100%;"><div style="padding: 15px;">'
        r+= '<h1 style="color: #2dccd3; text-align: left;">'+ev.title+'</h1>'
        r+=  '<p class="detail">'+ev.content+'</p> <h2>Event Details</h2>'
        r+= '<p><img class="icon" style="width:25px;" src="img/where-icon.png"><b> WHERE</b></br>'+ev.location_1+'</br>'+ev.location_2+'</p>'
        r+= '<button type="button" class="event_b">VIEW ON MAP</button> <hr>'
        r+=  '<p><img class="icon" style="width:25px;" src="img/when-icon.png"><b> WHEN</b></br>DATE</br> End: 31st January, 2018 at 3:00pm</p>'
        r+=  '<button type="button" class="event_b">ADD TO CALENDAR</button></div>'
        $('#events_main').hide();
        $('#event_detail').empty();
        $('#event_detail').html(r);
        $('#event_detail').show();
    });

  });
