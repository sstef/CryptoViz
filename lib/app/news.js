const api = "https://newsapi.org/v2/top-headlines?sources=crypto-coins-news&apiKey=bd205a575a56417b8144475600fb1e74"

d3.json(api, function(error, data){
  data.articles.forEach((a) => {
    a.title = a.title;
    a.author = a.author;
    a.description = a.description;
    a.url = a.url;
    a.urlToImage = a.urlToImage;

    var article = d3.select(".news-articles").append("li")
    .attr("class", "article");

    article.append('h4').attr('class', 'article-title').html(a.title);
    var wrapper = article.append("div").attr('class', 'wrapper');
    wrapper.append('div').attr('class', 'url').html("<a href='" + a.url + "' target='newsFrame'>See more</a>").on("click", () => {
        $('#news-view').toggleClass("hidden instructions");
      });
    wrapper.append('h6').attr('class', 'author').html("By: " + a.author);
    article.append('p').attr('class', 'summary').html(a.description);
  })

});
