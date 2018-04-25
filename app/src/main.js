var
    settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://api.themoviedb.org/3/movie/now_playing?api_key=6b2d1b79a395d6c1c9c9a72f5afab091&language=fr&page=1",
        "method": "GET",
        "headers": {},
        "data": "{}"
    }
$.ajax(settings).done(function (response) {
            var image = ""
            response.results.map(function(elem){
                image+= '<article><img src="https://image.tmdb.org/t/p/w500/'+elem.poster_path+'"></article>'
                $('.wrapper').html(image);
            }) 
        });

        