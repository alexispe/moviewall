$.urlParam = function (name) {
    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
    if (results != null) {
        return results[1] || 0;
    }
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
            image += '<article><a href="single.html?id=' + elem.id + '"><img src="https://image.tmdb.org/t/p/w500' + elem.poster_path + '"></a></article>'
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
    $('input[type="checkbox"]').change(function() {
        $('input[name="genre"]').val('')
        $('input[type="checkbox"]').each(function(elem) {
            console.log($(this))
            if($(this).checked) {
                console.log( $('input[name="genre"]').val())
                console.log($(this))
                $('input[name="genre"]').val(
                    $('input[name="genre"]').val()+","+$(this)[0].val()
                )
            }
        });
        console.log($('input[name="genre"]').val())
    }) 

    if ($.urlParam('search')) {
        var movie = $.urlParam('search')
        $.ajax({
            "async": true,
            "crossDomain": true,
            "url": "https://api.themoviedb.org/3/search/movie?api_key=6b2d1b79a395d6c1c9c9a72f5afab091&language=fr&query=" + movie + "&page=1",
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
            idActeur = response.results[0].id
            $.ajax({
                "async": true,
                "crossDomain": true,
                "url": "https://api.themoviedb.org/3/discover/movie?api_key=6b2d1b79a395d6c1c9c9a72f5afab091&language=fr&sort_by=release_date.desc&page=1&with_cast=" + idActeur,
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
        });
    }
}

console.log($.urlParam('genre'));