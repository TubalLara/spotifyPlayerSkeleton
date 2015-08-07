function fetchSongs (event) {
  event.preventDefault()
  var request = $.get('https://api.spotify.com/v1/search?query=' + $("#songs").val() + '&offset=0&limit=20&type=track');
    
  function handleSongs (songs) {
    console.log(songs);
    console.log(songs.tracks.items[0].artists[0].name);
    console.log(songs.tracks.items[0].name);
    console.log(songs.tracks.items[0].preview_url);
       
  }

  function handleError (err) {
    console.error('OH NO!!', err);
  }

  request.done(handleSongs);
  request.fail(handleError);
}

$('#js-submit').on('click', fetchSongs);