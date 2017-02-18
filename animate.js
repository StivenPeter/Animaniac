//model for HTML5 canvas-based animation

//access canvas and buttons via DOM
var c = document.getElementById("playground");
var stopButton = document.getElementById( "stop" );

//prepare to interact with canvas in 2D
var ctx = c.getContext("2d");

//set fill color to lello
ctx.fillStyle = "#ff0000";


var requestID;


var clear = function(e) {
    e.preventDefault();
    ctx.clearRect(0, 0, 500, 500);
};


//wrapper function will allow inner function to keep track of
// its own complement of local variables (radius, xcor...)
var anime = function() {
	
    window.cancelAnimationFrame( requestID );
	
    console.log(requestID);

    //init params for drawing dot
    var radius = 0;
    var xcor = c.width / 2;
    var grow = true;
    
    //Q: what happens w/ & w/o next line?
    //window.cancelAnimationFrame( requestID );

    var drawDot = function() {
	console.log( requestID )

	ctx.clearRect( 0, 0, c.width, c.height );
	
	ctx.beginPath();
	ctx.arc( xcor, c.height/2, radius, 0, 2 * Math.PI );
	ctx.stroke();
	ctx.fill();
	if (radius != c.width/2 && grow)
		radius++;
	if (radius == c.width/2)
		grow = false;
	if (radius != 0 && grow == false)
		radius --; 
	if (radius == 0)
		grow = true;
	requestID = window.requestAnimationFrame( drawDot );
    };

    drawDot();
};
var animeDvd = function() {
	
    window.cancelAnimationFrame( requestID );
	
    console.log(requestID);

    //init params for drawing dot
    var xcor = c.width / 2;
    var grow = true;
    
    //Q: what happens w/ & w/o next line?
    //window.cancelAnimationFrame( requestID );

    var moveDvd = function() {
	console.log( requestID )

	ctx.clearRect( 0, 0, c.width, c.height );
	
	ctx.beginPath();
	ctx.stroke();
	ctx.fill();
	requestID = window.requestAnimationFrame( drawDot );
    };

    drawDot();
};

var stopIt = function() {
    console.log( requestID );
    window.cancelAnimationFrame( requestID );
};


//tie click-on-canvas to anime function
c.addEventListener( "click", anime )

//ideally, clicking stop will make the animation stop
stopButton.addEventListener( "click", stopIt );
