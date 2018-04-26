$.urlParam = function (name) {
    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
    return results[1] || 0;
}

if (currentPage == "index") {

    $.ajax({
        "async": true,
        "crossDomain": true,
        "url": "https://api.themoviedb.org/3/movie/now_playing?api_key=6b2d1b79a395d6c1c9c9a72f5afab091&language=fr&page=1",
        "method": "GET",
        "headers": {},
        "data": "{}"
    }).done(function (response) {
        var image = ""
        response.results.map(function (elem) {
            console.log(elem)
            image += '<article><a href="single.html?id=' + elem.id + '"><img src="https://image.tmdb.org/t/p/w500/' + elem.poster_path + '"></a></article>'
            $('section.wrapper').html(image);
        })
    });
} else if (currentPage == "single") {
    var id = $.urlParam('id');
    $.ajax({
        "async": true,
        "crossDomain": true,
        "url": "https://api.themoviedb.org/3/movie/" + id + "?api_key=6b2d1b79a395d6c1c9c9a72f5afab091&language=fr",
        "method": "GET",
        "headers": {},
        "data": "{}"
    }).done(function (response) {
        console.log(response)
        $('.mov-img').attr('src', 'https://image.tmdb.org/t/p/w500/' + response.poster_path)
        $('.mov-title').html(response.title)
        var gender = "Genre : "        
        response.genres.map(function (elem) {
            gender += elem.name + ", "
            $('.mov-gender').html(gender)
        })
        $('.mov-release-date').html(response.release_date)
        $('.mov-homepage').html(response.homepage)
        $('.mov-vote-average').html(response.vote_average)
        $('.mov-runtime').html(response.runtime)
        $('.mov-synopsis').html(response.overview)
        

    });

}