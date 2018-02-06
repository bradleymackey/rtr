
// data is returned in a value listener

firebase.database().ref("/news").orderByChild("title").once('value').then(function(snapshot) {
    var event = (snapshot.val()) || 'nothing';

    //Main News page with a list of news articles
    dat = event;
    console.log(dat);
    var f = '';
    $.each(dat, function(i){
      f+= "<div id="+i+" class='news_item'><img src="+dat[i].image_1+" alt='image'>"
      f+= "<h2 class='list' id="+i+">"+dat[i].title+"</h2></br></div>"
    });
    $('#news_main').empty();
    $('#news_main').html(f);

    //News detail page
    console.log(dat);
    var r = '';
    $("#news .news_item").click(function(){
      console.log(dat);
      console.log('hello');
      var eid = $(this).attr("id");
      console.log(eid);
      article = dat[eid];
      console.log(article);
      r+= "<div><img src="+article.image_1+" alt='image'>"
      r+= "<h2 class='list'>"+article.title+"</h2>"
      r+= "<p class='detail'>"+article.content_1+"</p>"
      r+= "<img src="+article.image_2+" alt='image'><p class='detail'>"+article.content_2+"</p>"
      r+= "<img src="+article.image_3+" alt='image'><p class='detail'>"+article.content_3+"</p></br></div>"
      $('#news_main').hide();
      updateTitle(article.title);
      $('#news-article').empty();
      $('#news-article').html(r);
      $('#news-article').show();


      /*function displayNewsContentItem(){
          $("#backbutton").show();
          $(".content-item").hide();
          $("#news-article").show();
          updateTitle("Some Article");
          currentPage = 4;
          return false;
      }*/

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
