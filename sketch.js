/***********************************************************************************
  Kylie Jenner Facelift Project 

  Uses the p5.timer.js class to show an animated progress bar on the screen

------------------------------------------------------------------------------------

***********************************************************************************/

// Global timer variable, uninitialized
var simpleTimer;

// Drawing
var progBarWidth;    // init in setup() to match screen width with marget
var progBarHeight = 20;
var hMargin = 40;
var vMargin = 60;
var images = [];
var button;
var kylie = false;

// preload
function preload () {
  images [0] = loadImage ('assets/kylie1.jpg');
  images [1] = loadImage ('assets/kylie2.jpg');
}

// Setup code goes here
function setup() {
  createCanvas(windowWidth, windowHeight);
  makeButton ();

  // Allocate a 5-second timer
  simpleTimer = new Timer(5000);

  textAlign(LEFT);
  textSize(24);
  rectMode(CORNER);

  progBarWidth = width - (hMargin*2);    // give some margin to edge
 }

// make button 
function makeButton() {
   // Create the clickable object
  button = new Clickable();
  
  // set the image to be this PNG
  button.text = "Start Injections";

  // This would give it a white background
  button.color = "#FFFFFF";

  // set width + height to image size
  button.width = 100;
  button.height = 50;

  // set to middle of screen, since we are drawing from the corners, we need to make an
  // additional calculation here
  button.locate( 100 , 270 );

  // Clickable callback functions, defined below
  button.onPress = buttonPressed;
}

function buttonPressed (){
   simpleTimer.start();
   kylie = true; 
}

// State 1 = Wait for mouse, just draw text on the screen
// State 2 = Progress bar is animating (wait for mouse is false)
function draw() {
  background(0);
  image (images[0], 500, 100, 500, 700);
  button.draw ();
  if (kylie === true) {
    drawProgressBar();
    drawTimerText();
  }

    if( simpleTimer.expired() && kylie == true ) {
      fill(255);
      text("Done", hMargin, 60 );
      image (images[1], 500, 100, 500, 700);
    }
  }


// Looks for elapsed time
function drawTimerText() {
  fill(255);
  textSize(20);
  text( "Old Kylie Remaining (%) = " + Math.round(simpleTimer.getPercentageRemaining()*100) + "%", 200, 150 );
  text( "Filler (%) = " + Math.round(simpleTimer.getPercentageElapsed()*100) + "%", 133, 200 );
  text( "Remaing time (ms) = " + Math.round(simpleTimer.getRemainingTime()), 180, 240 );
}

// draw the bar itself
function drawProgressBar() {
  // Draw a growing rectangle, from left to right
  noStroke();
  fill('blue');
  rect( hMargin, vMargin + progBarHeight, progBarWidth*simpleTimer.getPercentageElapsed(), progBarHeight );
  
  // draw an outline on top of the rect
  noFill();
  stroke(50);
  strokeWeight(1);
  rect( hMargin, vMargin + progBarHeight, progBarWidth, progBarHeight );

  noStroke();
}

