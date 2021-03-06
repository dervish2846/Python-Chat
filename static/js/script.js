// Connecting socketio to the server
var socket = io.connect( 'http://' + document.domain + ':' + location.port )
// while socket is connected
var username =  $('input.username').val();
socket.on( 'connect', function() {
  // On submit of the form the function will return e
  $( 'form' ).submit(function( e ) {
    // To prevent the default action of POST
    e.preventDefault()
    // Sending the object containing username and message
    socket.emit( 'my event', {
      username : $('input.username').val(), // Storing the value from input tag and class username
      message : $( 'input.message' ).val(), // Storing the value from input tag and class message (an extra ',' is used at the end to avoid an error)
    } )
    // empty the input field and focusing
    $('input.message').val('').focus()
  } )
} )
// capture message from the server containing the json object
socket.on( 'my response', function( json ) {
  // To avoid printing 'undefined' value for username and message

  if(typeof json.username !== 'undefined' ) {
    if(username !== json.username){
    $( 'div.messagebox' ).append("<div class='msg_bubble'><strong>"+json.username+"</strong>&nbsp;&nbsp;"+json.message+"</div><br>")
  }
    else{
      $( 'div.messagebox' ).append("<div class='right_msg_bubble'><strong>"+json.username+"</strong>&nbsp;&nbsp;"+json.message+"</div><br>")
    }
  }
})
