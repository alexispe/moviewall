$.urlParam = function(name) {
    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
    if (results != null) {
        return results[1] || 0;
    }
}
$.getNowPlayingMovies = function(page) {
  $.ajax({
      "async": true,
      "crossDomain": true,
      "url": "https://api.themoviedb.org/3/movie/now_playing?api_key=6b2d1b79a395d6c1c9c9a72f5afab091&language=fr&page="+page,
      "method": "GET",
      "headers": {},
      "data": "{}"
  }).done(function (response) {
      response.results.map(function (elem) {
          $('section.wrapper').append('<article class=""><a href="single.html?id=' + elem.id + '"><img src="https://image.tmdb.org/t/p/w500' + elem.poster_path + '"></a></article>');
      })
      $(window).data('ready', true);
  });
}
if (currentPage == "index") {
  var moviePage = 1

  $(window).data('ready', false);
  $.getNowPlayingMovies(moviePage);
  moviePage++;

  $(window).scroll(function() {
    if ($(window).data('ready') == false) return; // If ready = false stop
    var agentID = navigator.userAgent.toLowerCase().match(/(iphone|ipod|ipad)/);
    if(($(window).scrollTop() + $(window).height()) == $(document).height()
    || agentID && ($(window).scrollTop() + $(window).height()) + 150 > $(document).height()) {
      $(window).data('ready', false);

      $.getNowPlayingMovies(moviePage);
      moviePage++;
    }
  });
}
else if (currentPage == "single") {
    var id = $.urlParam('id');
    $.ajax({
        "async": true,
        "crossDomain": true,
        "url": "https://api.themoviedb.org/3/movie/" + id + "?api_key=6b2d1b79a395d6c1c9c9a72f5afab091&language=fr",
        "method": "GET",
        "headers": {},
        "data": "{}"
    }).done(function (response) {
        $('.mov-img').attr('src', 'https://image.tmdb.org/t/p/w500/' + response.poster_path)
        $('.mov-title').html(response.title)
        var gender = ""
        response.genres.map(function (elem) {
            gender += elem.name + ", "
            $('.mov-gender').html(gender)
        })
        $('.mov-release-date').html(response.release_date)
        $('.mov-homepage').html('<a href="' + response.homepage + '">Site Web</a>')
        $('.mov-vote-average').html(response.vote_average)
        $('.mov-runtime').html(response.runtime)
        $('.mov-synopsis').html(response.overview)
    });
}
else if (currentPage == "sort") {
    var genres = [];
    $('input[type="checkbox"]').change(function () {
        $('input[name="genre"]').val('')
        $('input[data-search="genre"]').each(function () {
            var input = $(this)[0]
            if (input.checked) {
                $('input[name="genre"]').val(
                    $('input[name="genre"]').val() + "," + input.value
                )
            }
        });
    })
    var url = "https://api.themoviedb.org/3/search/movie?api_key=6b2d1b79a395d6c1c9c9a72f5afab091&language=fr&query="
    if ($.urlParam('search')) {
        var movie = $.urlParam('search')
        $.ajax({
            "async": true,
            "crossDomain": true,
            "url": url + movie + "&page=1",
            "method": "GET",
            "headers": {},
            "data": "{}"
        }).done(function (response) {
            var details = ""
            response.results.map(function (elem) {
                details += '<article><a href="single.html?id=' + elem.id + '"><img src="https://image.tmdb.org/t/p/w500' + elem.poster_path + '"><h1>' + elem.title + '</h1></a></article>';
                $('div.list').html(details)
            })
        });
    }
    else if ($.urlParam('submit')) {
        var idActeur = ""
        $.ajax({
            "async": true,
            "crossDomain": true,
            "url": "https://api.themoviedb.org/3/search/person?api_key=6b2d1b79a395d6c1c9c9a72f5afab091&language=fr&query=" + $.urlParam('acteur') + "&page=1",
            "method": "GET",
            "headers": {},
            "data": "{}"
        }).done(function (response) {
            if ($.urlParam('acteur') != 0) {
                idActeur = "&with_cast=" + response.results[0].id
            }
            else { idActeur = "" }
            if ($.urlParam('genre') != 0) {
                var genre = "&with_genres=" + $.urlParam('genre')
            }
            else { genre = "" }
            var url = "https://api.themoviedb.org/3/discover/movie?api_key=6b2d1b79a395d6c1c9c9a72f5afab091&language=fr&sort_by=release_date.desc&page=1"
            $.ajax({
                "async": true,
                "crossDomain": true,
                "url": url + idActeur + genre,
                "method": "GET",
                "headers": {},
                "data": "{}"
            }).done(function (response) {
                var details = ""
                response.results.map(function (elem) {
                    details += '<article><a href="single.html?id=' + elem.id + '"><img src="https://image.tmdb.org/t/p/w500' + elem.poster_path + '"></a><h1>' + elem.title + '</h1></article>';
                    $('div.list').html(details)
                })
            });
        });
    }
}
