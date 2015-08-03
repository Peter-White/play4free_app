$(function (){

  var $gameslist = $('#gameslist'),
    $title = $('#title'),
    $image = $('#image'),
    $desc = $('#desc'),
    $mode = $('#mode'),
    $genre = $('#genre'),
    $download = $('#download');

// var reset = function() {
//   $('#games').val('');
//   $('#image').val('');
//   $('#desc').val('');
// };

$.ajax({
  type: 'GET',
  url: 'http://localhost:3000/api/games',
  success: function(games) {
    $.each(games, function(i, game) {

      var date = (function(){
        var created = game.created_at.split('T');
        return created[0];
      })();

      // $games.append('<li>'+ game.image +' '+ game.title +'</li>');
      $gameslist.append('<li id="' + game.id + '"><h2 id="title">' + game.title + '</h2><h2 id="date">' + date + '</h2></li>');
  });
},
});

$('#submit').on('click', function() {
  var $formValues = $('form#values')[0];
  var game = {
    game: {
      title: $formValues.title.value,
      image: $formValues.image.value,
      desc: $formValues.desc.value,
      mode: $formValues.mode.value,
      genre: $formValues.genre.value,
      download: $formValues.download.value
    }
  };

  $.ajax({
    type: 'POST',
    url: 'http://localhost:3000/api/games',
    data: game,
    success: function(newGame) {
    },
    });
  });
});
