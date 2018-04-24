
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
        opDetail+= '<div id="signup-form"><h2>Signup</h2>';
        opDetail+= '<form><input type="text" id="forename" name="forename" placeholder="Forename"><br>';
        opDetail+= '<input type="text" id="surname" name="surname" placeholder="Surname"><br>';
        opDetail+= '<input type="text" id="email" name="email" placeholder="Email"><br>';
        opDetail+= '<textarea rows="5" cols="23" placeholder="Comment" id="comment"></textarea></form>';
        opDetail+= '<button type="button" id="volunteer-button" class="event_b">Submit</button>';
        opDetail+= '<p id="output"></p></div><br><br>';

        $('#volunteer_main').hide();
        $('#volunteer_detail').empty();
        $('#volunteer_detail').html(opDetail);
        $('#volunteer_detail').show();
        });


      //submit form
      $(document).on("click", "#volunteer-button", function(){
        //validation
        var nameRegex = /[a-zA-Z][a-zA-Z]*/;
        var emailRegex = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;
        var outputText = "";
        if(!nameRegex.test($("#forename").val()))
        {
          outputText += "Forename invalid";
        }
        else if(!nameRegex.test($("#surname").val()))
        {
          outputText += "Surname invalid";
        }
        else if(!emailRegex.test($("#email").val()))
        {
          outputText += "Email invalid";
        }
        else
        {
          outputText += "Form submitted.";
          emailRequest();
          $("#forename").val("");
          $("#surname").val("");
          $("#email").val("");
          $("#comment").val("");
        }
        $("#output").html(outputText);
      });
  }

var url = "";

function emailRequest()
{
  $.post(url, {
    email: $("#email").val(),
    forename: $("#forename").val(),
    surname: $("#surname").val(),
    comment: $("#comment").val()
  }, function(data, status)
    {
      if (status == "success")
      {
        $("#output").html("Submission recieved.");
      }
      else
      {
        $("#output").html("Error submitting - please try again.");
      }
    });
}









//email
var CLIENT_ID = "24690165291-jvo2hkq9df0hlpaflrpjrp6qa387iboa.apps.googleusercontent.com";
var API_KEY = "AIzaSyCYGusGkn_i0_wZDCnmg8KmIjJ70p85TD4";
var SCOPES = "https://www.googleapis.com/auth/gmail.readonly";

function sendEmail()
{
  console.log("sendEmail");
  return;
}

function handleClientLoad()
{
  console.log("handleClientLoad");
  gapi.client.setApiKey(API_KEY);
  window.setTimeout(checkAuth, 1);
}

function checkAuth()
{
  console.log("checkAuth");
  gapi.auth.authorize(
  {
    client_id: CLIENT_ID,
    scope: SCOPES,
    immediate: true
  }, handleAuthResult);
}

function handleAuthClick()
{
  gapi.auth.authorize(
  {
    client_id: CLIENT_ID,
    scope: SCOPES,
    immediate: false
  }, handleAuthResult);
  return false;
}

function handleAuthResult(authResult)
{
  console.log("handleAuthResult");
  if(authResult && !authResult.error)
  {
    console.log("SUCCESS");
    loadGmailApi();
    $("#email").remove();
  }
  else
  {
    console.log("ERROR");
    $("#email").on("click", function()
    {
      handleAuthClick();
    });
  }
}

function loadGmailApi()
{
  console.log("loadGmailApi");
  gapi.client.load("gmail", "v1", displayInbox);
}

function displayInbox()
{
  var request = gapi.client.gmail.users.messages.list(
  {
    'userId': 'me',
    'labelIds': 'INBOX',
    'maxResults': 10
  });

  $("#emailtest").append("<p>TEST</p>");
  console.log(request);

  request.execute(function(response) {
    $.each(response.messages, function() {
      var messageRequest = gapi.client.gmail.users.messages.get({
        'userId': 'me',
        'id': this.id
      });

      messageRequest.execute(appendMessageRow);
    });
  });
}

function appendMessageRow(message)
{
  $("#emailtest").append("<p>TEST</p>");
}