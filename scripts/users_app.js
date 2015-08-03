$(function (){

  var $users = $('#users');
  var $username = $('#Username');
  var $password = $('#Password');
  var $email = $('#Email');

$('#submit').on('click', function(e) {
  e.preventDefault()
  var user = {auth:{
    username: $username.val(),
    password: $password.val(),
    email: $email.val(),
  }};

  $.ajax({
    type: 'POST',
    url: 'http://localhost:3000/register',
    data: user,
    success: function(newGame) {
      alert('Success');
      window.location.replace('http://localhost:5000/pages/games.html');
    },
    error: function() {
      alert('Invalid');
    }
    });
  });
});
