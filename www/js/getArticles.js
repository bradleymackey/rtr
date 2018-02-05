
// data is returned in a value listener

firebase.database().ref("/news").orderByChild("title").once('value').then(function(snapshot) {
    var event = (snapshot.val()) || 'nothing';
  //  $("#ev_title").html(event.birdsEvent.title);
  //  $("#ev_img").html(event.birdsEvent.image);
  //  $("#ev_content").hmtl(event.birdsEvent.content);

      //Main News page with a list of news articles
      data = event;
      var f = '';
      $.each(data, function(i){
        console.log(i);
        f+= "<div id="+i+"><img src="+data[i].image_1+" alt='image'>"
        f+= "<h2 class='list' id="+i+">"+data[i].title+"</h2></br></div>"
      });
      $('#news_main').empty();
      $('#news_main').html(f);
      $('#news_main').html(f);

      //News detail page
      var r = '';
    //  $("#events.content-item").click(displayEventContentItem);
      $('#news.content-item').click(function(){
        var eid = $(this).attr("id");
        console.log(eid);
        article = data[eid];
        console.log(article);
      /*  r+= "<div id="+i+"><img src="+article.image_1+" alt='image'>"
        r+= "<h2 class='list' id="+i+">"+article.title+"</h2>"
        r+= "<p class='detail'>"+article.content_1+"</p>"
        r+= "<img src="+article.image_2+" alt='image'><p class='detail'>"+article.content_2+"</p>"
        r+= "<img src="+article.image_3+" alt='image'><p class='detail'>"+article.content_3+"</p></br></div>"*/
        $('#news_main').hide();
        $('#news-article').empty();
        $('#news-article').html(r);
        $('#news-article').show();
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
