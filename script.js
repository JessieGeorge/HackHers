var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext('2d');
//var download = canvas.getElementById('download');

//lines with rounded edges
ctx.lineJoin = 'round';
ctx.lineCap = 'round';

ctx.lineWidth = 5; //default size
ctx.strokeStyle = 'purple'; //default is purple
var nowColor = 'purple';
var nowTool = 'marker';

function setColor(value) //when you click a button, change color
{
	ctx.lineWidth = 5;
	ctx.strokeStyle = value;
	nowColor = value;
}

function useMarker()
{
	ctx.lineWidth = 5; 
	ctx.strokeStyle = nowColor;
	nowTool = 'marker';
}

function useEraser()
{
	ctx.lineWidth = 30; 
	ctx.strokeStyle = 'white';
}

function MysteryBox()
{
	var guess = Math.floor(Math.random()*10); //choose a random number between 0-9
	ctx.lineWidth = 50; 
	var spray = new Image();

	if(guess===0 || guess===1)
	{
		spray.src = "Images/sponge.jpg";
	}
	
	else if(guess===2 || guess===3)
	{
		spray.src = "Images/steven.jpg";
	}
	
	else if(guess===4 || guess===5)
	{
		spray.src = "Images/awkward.jpg";
	}
	
	else if(guess===6 || guess===7)
	{
		spray.src = "Images/flinstones.jpg";
	}
	
	else
	{
		spray.src = "Images/NyanCat.png";
	}
	
	spray.onload = function() {
	var pattern = ctx.createPattern(spray, 'repeat');
	ctx.strokeStyle = pattern;
	}
}
/*
function downloadImage() 
{
	var dataURL = canvas.toDataURL('image/png');
    dowanload.href = dataURL;
}
*/ 
var button = document.getElementById('btn-download');
button.addEventListener('click', function (e) {
    var dataURL = canvas.toDataURL('image/png');
	button.href = dataURL;
});

// ---- MOUSE SENSITIVITY ---- //

//store mouse position
var mouse = {x:0, y:0};

//make it mouse sensitive
canvas.addEventListener('mousemove', getMousePos , false); //false means don't let the event bubble up to the parent function
canvas.addEventListener('mousedown', draw, false); //mousedown works whether you click left button or right button on mouse, but onClick works only for left button
canvas.addEventListener('mouseup', stopDraw, false);

//get the mouse position relative to the canvas
function getMousePos(e)
{
	
	mouse.x = e.clientX - this.offsetLeft;
	mouse.y = e.clientY - this.offsetTop;
}

//draw based on where the mouse is clicked 
function draw(e)
{
	ctx.beginPath();
	ctx.moveTo(mouse.x, mouse.y);
	canvas.addEventListener('mousemove', onPaint, false);
}

//stop drawing when the mouse is not clicked
function stopDraw(e)
{
	canvas.removeEventListener('mousemove', onPaint, false);
}

//function returns a value stored in the onPaint variable i.e. draw a line or stroke to position x,y
var onPaint = function()
{	
	ctx.lineTo(mouse.x, mouse.y);
	ctx.stroke();
}