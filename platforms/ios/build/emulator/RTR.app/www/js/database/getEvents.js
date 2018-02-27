
// data is returned in a value listener

function eventsCallback(snapshot) {

     const events = snapshot.val();

     // if we cannot get the events from the database for some reason, display an error message to the user
     if (events === undefined) {
      let errorMessage = "<div id=\"error\" class=\"standard-inset\" style=\"text-align:center;\"><h1 style=\"text-align:center;\">Error!</h1>" + "<p>Could not load content, please try again later.</p></div>";
      $('#events_main').empty();
      $('#events_main').html(errorMessage);
      return;
    }

      // MAIN LIST OF EVENTS
      let eventInList = '';
      $.each(events, function(i){
            eventInList+= "<div id="+i+" class='event_item listed_item'><img src="+events[i].image+" alt='image'>"
            eventInList+= "<h3 class='list standard-inset' id="+i+">"+events[i].title+"</h3>"
            eventInList+= "<p class='detail standard-inset'>"+events[i].content+"</p></br></div>"
      });
      $('#events_main').empty();
      $('#events_main').html(eventInList);

      // EVENT DETAIL
      $('.event_item').click(function(){
        let eid = $(this).attr("id");
        ev = events[eid];
        updateTitle(ev.title);
        //back button
        $("#topnav-title").prepend('<img id="backbutton" src="img/left-arrow.png" alt="back">');
        let eventDetail = '';
        eventDetail+= '<img src='+ev.image+' alt="image"><div style="padding: 15px;">'
        eventDetail+= '<h1 style="color: #2dccd3; text-align: left;">'+ev.title+'</h1>'
        eventDetail+=  '<p class="detail">'+ev.content+'</p> <h2>Event Details</h2>'
        if (ev.location_1 !== undefined) {
          eventDetail+= '<p><img class="icon" style="width:25px;" src="img/where-icon.png"><b> WHERE</b></br>'+ev.location_1+'</br>'+(ev.location_2 || "")+'</p>'
          eventDetail+= '<button type="button" class="event_b" id="eventsShowOnMap">VIEW ON MAP</button> <hr>'
        }
        eventDetail += '<p><img class="icon" style="width:25px;" src="img/when-icon.png"><b> WHEN</b></br>DATE</br> End: 31st January, 2018 at 3:00pm</p>'
        eventDetail += '<button type="button" class="event_b">ADD TO CALENDAR</button></div>'
        $('#events_main').hide();
        $('#event_detail').empty();
        $('#event_detail').html(eventDetail);
        $('#event_detail').show();

      //  document.getElementById("#eventsShowOnMap").onclick = console.log('button clickedDDDD');
    });

  }