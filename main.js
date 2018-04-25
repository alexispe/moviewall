var
    settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://api.themoviedb.org/3/movie/550?api_key=6b2d1b79a395d6c1c9c9a72f5afab091",
        "method": "GET",
        "headers": {},
        "data": "{}"
    }
$.ajax(settings).done(function (response) {
            console.log(response);
        });