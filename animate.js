//model for HTML5 canvas-based animation

//access canvas and buttons via DOM
var c = document.getElementById("playground");
var stopButton = document.getElementById( "stop" );

//prepare to interact with canvas in 2D
var ctx = c.getContext("2d");

//set fill color to lello
ctx.fillStyle = "#ff0000";


var requestID= 0;


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

var animateDVD = function() {
	img = new Image();
	img.src = 'dvd.png';
	var recx = 160;
	var recy = 70;
	var x = Math.random()*(c.width-recx);
	var y = Math.random()*(c.height-recy);
	window.cancelAnimationFrame(requestID);

	var MakeRec = function(x,y) {
		ctx.clearRect(0, 0, c.width, c.height);
		ctx.drawImage(img,x,y,recx,recy);
	};
	var MoveRightDown = function() {			
		MakeRec(x,y);
		x++;
		y++;
		if (x >= c.width-recx)
			return MoveLeftDown();
		if (y >= c.height-recy)
			return MoveRightUp();
		requestID = window.requestAnimationFrame(MoveRightDown);
	};
	var MoveRightUp = function() {			
		MakeRec(x,y);
		x++;
		y--;
		if (y <= 0)
			return MoveRightDown();
		if (x >= c.width-recx)
			return MoveLeftUp();
		requestID = window.requestAnimationFrame(MoveRightUp);
	};


	
	var MoveLeftUp = function() {			
		MakeRec(x,y);
		x--;
		y--;
		if (x <= 0)
			return MoveRightUp();
		if (y <= 0)
			return MoveLeftDown();
		requestID = window.requestAnimationFrame(MoveLeftUp);
	};
		var MoveLeftDown = function() {			
		MakeRec(x,y);
		x--;
		y++;
		if (y >= c.height-recy)
			return MoveLeftUp();
		if (x <= 0)
			return MoveRightDown();
		requestID = window.requestAnimationFrame(MoveLeftDown);
	};
	MoveLeftDown();
};

var stopIt = function() {
    console.log( requestID );
    window.cancelAnimationFrame( requestID );
};

document.getElementById('dvd').addEventListener('click', animateDVD);

//tie click-on-canvas to anime function
document.getElementById('circle').addEventListener( "click", anime );

//ideally, clicking stop will make the animation stop
stopButton.addEventListener( "click", stopIt );
