
// data is returned in a value listener

function articlesCallback(snapshot) {
    const articles = snapshot.val();

    // if we cannot get the news articles from the database for some reason, display an error message to the user
    if (articles === undefined) {
      let errorMessage = "<div id=\"error\" class=\"standard-inset\" style=\"text-align:center;\"><h1 style=\"text-align:center;\">Error!</h1>" + "<p>Could not load content, please try again later.</p></div>";
      $('#news_main').empty();
      $('#news_main').html(errorMessage);
      return;
    }

    // MAIN NEWS LIST WITH THE LIST OF ARTICLES
    let articleInList = '';
    $.each(articles, function(i){
      articleInList += "<div id="+i+" class='news_item listed_item'><img src="+articles[i].image_1+" alt='image'>"
      articleInList += "<h3 class='list standard-inset' id="+i+">"+articles[i].title+"</h3></br></div>"
    });
    $("#new-News").hide();
    $("#edit-News").hide();
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
      $("#topnav-title").prepend('<img id="backbutton" src="img/left-arrow.png" alt="back">');
      let user = firebase.auth().currentUser;
      let admin = (user.email !== undefined && user.email !== null);
      if (admin==true){
        $("#topnav-title").append('<img  id="editNews" src="img/edit.png" align = "right" height="27px" width="27px" hspace="6px" vspace="2px">');
      }
      $("#topnav-title").on("click","#editNews", function(){editNews(eid);});
      $("#new-News").hide();
      $("#edit-News").hide();
      $('#news-article').empty();
      $('#news-article').html(articleDetail);
      $('#news-article').show();
  });

}
