/* Nicole Bai | Week 4 homework */

/* FIRST CIRCLE*/
var show = true;

$('#disappear').click(function(){
    if(show) {
        $('#circle1').hide();
        show = false;
    } else {
        $('#circle1').show(delay);
        show = true;
    }
});

function delay(color){
  $( "#circle1" ).slideUp( 300 ).delay( 800 ).fadeIn( 200 );
  $('#circle1').css('background-color','yellow');
};


/* SECOND CIRCLE*/
$( "#changeColor" ).click(function(){
  $('#circle2').css('background-color','gray');
  $('#changeColor').html('Double Click Me');  
  $('#changeColor').css('color', 'blue');
});

$('#changeColor').dblclick(function(){
  $( "#changeColor").html('Having fun?');
  $( "#changeColor").css('color', 'yellow');
  $("#circle2").css('background-color', 'black');
});


/* THIRD CIRCLE*/

$( "#circle3" ).hover(function() {
    $( this ).append( $( "<h2>Hi</h2>" ) );
  }, function() {
    $( this ).find( "h2:last" ).remove();
  });


/*I was trying to replace the circle with a cat image, trigger by click function*/
/* Neither works... TT_TT
$( "changeShape" ).click(function() {
    console.log('whats wrong');
    $("#circle3").append($('<div id="catSwag"></div>'));
  });

$( "changeShape" ).click(function() {
    $('#circle3').replaceWith($('<div id="catSwag"></div>'));
  });
*/



