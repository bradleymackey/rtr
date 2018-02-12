
// data is returned in a value listener

function volunteerCallback(snapshot) {

     const data = snapshot.val();

     // if we cannot get the events from the database for some reason, display an error message to the user
     if (data === undefined) {
      let errorMessage = "<div id=\"error\" class=\"standard-inset\" style=\"text-align:center;\"><h1 style=\"text-align:center;\">Error!</h1>" + "<p>Could not load content, please try again later.</p></div>";
      $('#volunteer_main').empty();
      $('#volunteer_main').html(errorMessage);
      return;
    }

      // MAIN LIST OF EVENTS
      let volInList = '';
      $.each(data, function(i){
            volInList+= "<div id="+i+" class='event_item'><img src="+data[i].image+" alt='image'>"
            volInList+= "<h2 class='list standard-inset' id="+i+">"+data[i].title+"</h2>"
            volInList+= "<p class='detail standard-inset'>"+data[i].content+"</p></br></div>"
      });
      $('#events_main').empty();
      $('#events_main').html(volInList);

      // EVENT DETAIL
      $('.event_item').click(function(){
        let eid = $(this).attr("id");
        op = data[eid];
        updateTitle(op.title);
        //back button
        $("#topnav-title").prepend('<img id="backbutton" src="img/backbutton.png" alt="back">');
        let opDetail = '';
        opDetail+= '<img src='+op.image+' alt="image"><div style="padding: 15px;">'
        opDetail+= '<h1 style="color: #2dccd3; text-align: left;">'+op.title+'</h1>'
        opDetail+=  '<p class="detail">'+op.content+'</p> <h2>Event Details</h2>'
        if (op.location_1 !== undefined) {
          opDetail+= '<p><img class="icon" style="width:25px;" src="img/where-icon.png"><b> WHERE</b></br>'+op.location_1+'</br>'+(op.location_2 || "")+'</p>'
          opDetail+= '<button type="button" class="event_b">VIEW ON MAP</button> <hr>'
        }
        opDetail += '<p><img class="icon" style="width:25px;" src="img/when-icon.png"><b> WHEN</b></br>DATE</br> End: 31st January, 2018 at 3:00pm</p>'
        opDetail += '<button type="button" class="event_b">ADD TO CALENDAR</button></div>'
        $('#volunteer_main').hide();
        $('#volunteer_detail').empty();
        $('#volunteer_detail').html(eventDetail);
        $('#volunteer_detail').show();
    });

  }
