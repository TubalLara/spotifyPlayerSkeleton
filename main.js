
function fetchSongs (event) {
  event.preventDefault()
  var request = $.get('https://api.spotify.com/v1/search?query=' + $("#songs").val() + '&offset=0&limit=20&type=track');
    
  function handleSongs (songs) {
    console.log(songs);
    //$('#song_author').text(songs.tracks.items[0].artists[0].name);
    var name_image = '<button type="button" class="btn btn-primary btn-lg" data-toggle="modal" data-target="#myModal" id="' + songs.tracks.items[0].artists[0].name + '">'
  	+ songs.tracks.items[0].artists[0].name + '</button>';
    $('#song_author').append(name_image);
    $('#song_title').text(songs.tracks.items[0].name);
    $('.cover').append("<img src=" + songs.tracks.items[0].album.images[0].url + ">");
    var fileName = songs.tracks.items[0].preview_url;
    console.log(fileName);
    $("#audio").attr("src",fileName);
    console.log($("#audio audio").attr('src'));  
  }

  function handleError (err) {
    console.error('OH NO!!', err);
  }

  request.done(handleSongs);
  request.fail(handleError);
}

function fetchArtists (event) {
  event.preventDefault()
  var request = $.get('https://api.spotify.com/v1/search?type=artist&query=' + $(".btn-primary").text());
    
  function handleArtists (artists) {
    var artist_searched = artists.artists.items[0];
    var name_image = '<ul><li><h3>'+ artist_searched.name + '<h3></li><li><img class="img-responsive" src ="' + artist_searched.images[0].url + '"></li><ul>';
    $('.modal-body').append(name_image);
    
  }

  function handleError (err) {
    console.error('OH NO!!', err);
  }

  request.done(handleArtists);
  request.fail(handleError);
}
// Define a function to print the player's current time
function printTime () {
  var current = $('.js-player').prop('currentTime');
  console.debug('Current time: ' + current);
  $('progress').attr({
  	value: current
  });
}

// Have printTime be called when the time is updated
$('.js-player').on('timeupdate', printTime);

$('#js-submit').on('click', fetchSongs);

$('.btn-play').click(function(){
	$(this).toggleClass('playing disabled');
	if ($(this).hasClass('playing')) {
	  	$('.js-player').trigger('play');
	  	console.log('playing');
	} else {
	  	$('.js-player').trigger('pause');
	  	console.log('pausing');
  	}
});

$('#myModal').on('shown.bs.modal', fetchArtists);
