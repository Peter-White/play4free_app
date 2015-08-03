$(function(){

  var $gamecontainer = $('#gamecontainer');
  var $gamedetails = $('#gamedetails');
  var $description = $('#description');

  $('ul').on('click', function(event) {
    var id = event.target.id || event.target.parentNode.id;
    console.log(id);
    if(!Number.isFinite(parseInt(id))) {
      return;
    }

    window.location.href = window.location.search ?
      window.location.href.replace(window.location.pathname, '/pages/game.html') + '&id=' + id :
      window.location.href.replace(window.location.pathname, '/pages/game.html') + '?id=' + id;
  });

  // make sure pathname starts with '/pages/game.html'
  if (window.location.pathname.indexOf('/pages/game.html') === 0) {
    var params;

    (function() {
      // `window.location.search` stores the query string
      // which is the '?' onward in a URL
      var qs = window.location.search;

      params = {};

      // if `qs` is falsey (empty string), stop executing this function here
      if(!qs) {
        return;
      }

      // set qs to itself starting at index 1 and going to the end of the string
      qs = qs.slice(1);
      var pairs = qs.split('&');
      pairs.forEach(function(pair) {
        var keyval = pair.split('=');
        params[keyval[0]] = keyval[1];
      });
    })();

    $.ajax({
      type: 'GET',
      url: 'http://localhost:3000/api/games/' + params.id,
      success: function(game) {

          var date = (function(){
            var created = game.created_at.split('T');
            return created[0];
          })();

          $gamecontainer.append('<div id="imgcontainer" style="background-image: url(' + game.image + ')";></div>');
          $gamedetails.append('<h1>' + game.title + '</h1><h2>Genre: ' + game.genre + '</h2><h2>Listed: ' + date + '</h2><h2>Mode: ' + game.mode + '</h2><a href="' + game.download + '">Download Here</a>');
          $description.append('<p>' + game.desc + '</p>');
      },
      error: (function() {
        alert("Not Found");
      })
    })
  }
});
