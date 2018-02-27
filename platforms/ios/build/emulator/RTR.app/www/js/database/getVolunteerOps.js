
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

      // MAIN LIST OF VOLUNTEER OPPORTUNITIES
      let volInList = '';
      $.each(data, function(i){
            volInList+= "<div id="+i+" class='vol_item listed_item'><img class='volunteer-image' src="+data[i].image_1+" alt='image'>"
            volInList+= "<h3 class='list standard-inset' id="+i+">"+data[i].title+"</h3>"
            //volInList+= "<p class='detail standard-inset'>"+data[i].content+"</p></br></div>"
            volInList+= "</br></div>"
      });
      $('#volunteer_main').empty();
      $('#volunteer_main').html(volInList);

      // OPPORTUNITY DETAIL
      $('.vol_item').click(function(){
        currentPage = 10;
        let eid = $(this).attr("id");
        op = data[eid];
        updateTitle(op.title);
        //back button
        $("#topnav-title").prepend('<img id="backbutton" src="img/left-arrow.png" alt="back">');
        let opDetail = '';
        opDetail+= '<img src='+op.image_1+' alt="image"><div style="padding: 15px;">';
        opDetail+= '<h1 style="color: #2dccd3; text-align: left;">'+op.title+'</h1>';
        opDetail+= '<p class="detail">'+op.content+'</p></div>';
        opDetail+= '<form><input type="text" name="forename" placeholder="Forename"><br>';
        opDetail+= '<input type="text" name="surname" placeholder="Surname"><br>';
        opDetail+= '<input type="text" name="email" placeholder="Email"></form>';

        $('#volunteer_main').hide();
        $('#volunteer_detail').empty();
        $('#volunteer_detail').html(opDetail);
        $('#volunteer_detail').show();
    });

  }
