$.urlParam=function(e){var a=new RegExp("[?&]"+e+"=([^&#]*)").exec(window.location.href);if(null!=a)return a[1]||0};var idActeur=details=imageLink="";if($.getNowPlayingMovies=function(e){$.ajax({async:!0,crossDomain:!0,url:"https://api.themoviedb.org/3/movie/now_playing?api_key=6b2d1b79a395d6c1c9c9a72f5afab091&language=fr&page="+e,method:"GET",headers:{},data:"{}"}).done(function(e){e.results.map(function(e){null==e.poster_path?imageLink="http://via.placeholder.com/500x742?text=No+Image+Yet":imageLink="https://image.tmdb.org/t/p/w500"+e.poster_path,$("section.wrapper").append('<article class=""><a href="single.html?id='+e.id+'"><img src="'+imageLink+'"></a></article>')}),$(window).data("ready",!0)})},"index"==currentPage){var moviePage=1;$(window).data("ready",!1),$.getNowPlayingMovies(moviePage),moviePage++,$(window).scroll(function(){if(0!=$(window).data("ready")){var e=navigator.userAgent.toLowerCase().match(/(iphone|ipod|ipad)/);($(window).scrollTop()+$(window).height()==$(document).height()||e&&$(window).scrollTop()+$(window).height()+150>$(document).height())&&($(window).data("ready",!1),$.getNowPlayingMovies(moviePage),moviePage++)}})}else if("single"==currentPage){idExistInArray=JSON.parse(localStorage.getItem("id")),-1!=$.inArray($.urlParam("id"),idExistInArray)?$(".mov-btn-add").hide():$(".mov-btn-rem").hide(),$(".mov-btn-add").click(function(){null==localStorage.getItem("id")&&localStorage.setItem("id",JSON.stringify([])),arrLocalStorage=JSON.parse(localStorage.getItem("id")),arrLocalStorage.push($.urlParam("id")),localStorage.setItem("id",JSON.stringify(arrLocalStorage)),$(".mov-btn-rem").show(),$(".mov-btn-add").hide()}),$(".mov-btn-rem").click(function(){$.urlParam("id");arrLocalStorage=JSON.parse(localStorage.getItem("id"));var e=arrLocalStorage.indexOf($.urlParam("id"));e>-1&&arrLocalStorage.splice(e,1),localStorage.setItem("id",JSON.stringify(arrLocalStorage)),$(".mov-btn-add").show(),$(".mov-btn-rem").hide()});var id=$.urlParam("id");$.ajax({async:!0,crossDomain:!0,url:"https://api.themoviedb.org/3/movie/"+id+"?api_key=6b2d1b79a395d6c1c9c9a72f5afab091&language=fr",method:"GET",headers:{},data:"{}"}).done(function(e){$(".mov-img").attr("src","https://image.tmdb.org/t/p/w500/"+e.poster_path),$(".mov-title").html(e.title);var a="";e.genres.map(function(e){a+=e.name+", ",$(".mov-gender").html(a)}),$(".mov-release-date").html(e.release_date),null!=e.homepage&&$(".mov-homepage").html('<a href="'+e.homepage+'">Site Web</a>'),$(".mov-vote-average").html(e.vote_average),$(".mov-runtime").html(e.runtime),$(".mov-synopsis").html(e.overview)})}else if("sort"==currentPage){var genres=[];$('input[type="checkbox"]').change(function(){$('input[name="genre"]').val(""),$('input[data-search="genre"]').each(function(){var e=$(this)[0];e.checked&&$('input[name="genre"]').val($('input[name="genre"]').val()+","+e.value)})});var url="https://api.themoviedb.org/3/search/movie?api_key=6b2d1b79a395d6c1c9c9a72f5afab091&language=fr&query=";if($.urlParam("search")){var movie=$.urlParam("search");$.ajax({async:!0,crossDomain:!0,url:url+movie+"&page=1",method:"GET",headers:{},data:"{}"}).done(function(e){var a="";e.results.map(function(e){var t="";t=null==e.poster_path?"http://via.placeholder.com/500x742?text=No+Image+Yet":"https://image.tmdb.org/t/p/w500"+e.poster_path,a+='<article><a href="single.html?id='+e.id+'"><img src="'+t+'"></a><h1>'+e.title+"</h1></article>",$("div.list").html(a)})})}else $.urlParam("submit")&&$.ajax({async:!0,crossDomain:!0,url:"https://api.themoviedb.org/3/search/person?api_key=6b2d1b79a395d6c1c9c9a72f5afab091&language=fr&query="+$.urlParam("acteur")+"&page=1",method:"GET",headers:{},data:"{}"}).done(function(e){if(idActeur=0!=$.urlParam("acteur")?"&with_cast="+e.results[0].id:"",0!=$.urlParam("genre"))var a="&with_genres="+$.urlParam("genre");else a="";$.ajax({async:!0,crossDomain:!0,url:"https://api.themoviedb.org/3/discover/movie?api_key=6b2d1b79a395d6c1c9c9a72f5afab091&language=fr&sort_by=release_date.desc&page=1"+idActeur+a,method:"GET",headers:{},data:"{}"}).done(function(e){e.results.map(function(e){null==e.poster_path?imageLink="http://via.placeholder.com/500x742?text=No+Image+Yet":imageLink="https://image.tmdb.org/t/p/w500"+e.poster_path,details+='<article><a href="single.html?id='+e.id+'"><img src="'+imageLink+'"></a><h1>'+e.title+"</h1></article>",$("div.list").html(details),console.log(details)})})})}