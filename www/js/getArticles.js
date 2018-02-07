
// data is returned in a value listener

firebase.database().ref("/news").orderByChild("title").once('value').then(function(snapshot) {
    const articles = snapshot.val();

    // MAIN NEWS LIST WITH THE LIST OF ARTICLES
    let articleInList = '';
    $.each(articles, function(i){
      articleInList += "<div id="+i+" class='news_item'><img src="+articles[i].image_1+" alt='image'>"
      articleInList += "<h2 class='list standard-inset' id="+i+">"+articles[i].title+"</h2></br></div>"
    });
    $('#news_main').empty();
    $('#news_main').html(articleInList);

    // NEWS DETAIL
    $("#news .news_item").click(function(){
      var eid = $(this).attr("id");
      article = articles[eid];
      let articleDetail = '';
      articleDetail+= "<div><img src="+article.image_1+" alt='image'>"
      articleDetail+= "<h2 class='list standard-inset'>"+article.title+"</h2>"
      articleDetail+= "<p class='detail standard-inset'>"+(article.content_1 || "")+"</p>"
      if (article.image_2 !== undefined) {
        articleDetail += "<img src="+article.image_2+" alt='image'>";
      }
      articleDetail +="<p class='detail standard-inset'>"+(article.content_2 || "")+"</p>"
      if (article.image_3 !== undefined) {
        articleDetail += "<img src="+article.image_3+" alt='image'>";
      }
      articleDetail +="<p class='detail standard-inset'>"+(article.content_3 || "")+"</p></br></div>";
      $('#news_main').hide();
      updateTitle(article.title);
      //back button
      $("#topnav-title").prepend('<img id="backbutton" src="img/backbutton.png" alt="back">');
      $('#news-article').empty();
      $('#news-article').html(articleDetail);
      $('#news-article').show();
  });
  
});
