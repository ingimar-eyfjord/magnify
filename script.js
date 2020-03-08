// Event listener to activate the other event listener
window.addEventListener("load", function() {
  //upload an image to try the effect on.
  document
    .querySelector('input[type="file"]')
    // The other event listener
    .addEventListener("change", function() {
      // find the images where you want to replace the href on.
      const img = document.querySelectorAll(".myImg");
      // make look to change both images
      img.forEach(e => {
        //make href const
        const href = URL.createObjectURL(this.files[0]);
        //set the href on bot the images
        e.setAttribute("href", href);
      });
    });
});
// had to make this variables global because having them inside the draw always reset the value.
// i set these variables to be 1 because if either of them are 0 the if statment below won't work.
let X = 1;
let Y = 1;
// MDM example of using Keydown and Mouse down.
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
let rightPressed = false;
let leftPressed = false;
let upPressed = false;
let downPressed = false;

// IN this function you find out which key is being pressed and se the let value to be true if beign pressed
function keyDownHandler(event) {
  if (event.keyCode == 39) {
    rightPressed = true;
  } else if (event.keyCode == 37) {
    leftPressed = true;
  }
  if (event.keyCode == 40) {
    downPressed = true;
  } else if (event.keyCode == 38) {
    upPressed = true;
  }
  //call this function to get X and Y coordinates
  move();
}
// IN this function you find out which key is being pressed and se the let value to be true if beign pressed
function keyUpHandler(event) {
  if (event.keyCode == 39) {
    rightPressed = false;
  } else if (event.keyCode == 37) {
    leftPressed = false;
  }
  if (event.keyCode == 40) {
    downPressed = false;
  } else if (event.keyCode == 38) {
    upPressed = false;
  }
  //call this function to get X and Y coordinates
  move();
}

function move() {
  if (rightPressed) {
    X += 5;
  } else if (leftPressed) {
    X -= 5;
  }
  if (downPressed) {
    Y += 5;
  } else if (upPressed) {
    Y -= 5;
  }
  // Native sizes is the sizes of the small image, so you could dynamically add and change image sizes.
  let native_height = getimgHeight();
  let native_width = getimgWidth();
  moveCircle(X, Y, native_height, native_width);
}

// get the svg element.
const svg = document.querySelector("svg");
// get the smallImage
const smallimage = document.querySelector(".Sanfransisco");
// add eventlistener and start the function
svg.addEventListener("mousemove", calc);
function calc(event) {
  // Here i'm getting the position of the mouse on the svg relative to the document.
  // so if youre in the top left corner of the image, it's 0 0, that way we can math out everything
  // relative to the svg coordinates.
  const rect = this.getBoundingClientRect(),
    scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
    scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  // X and Y end up as the coordinates on the SVG image
  X = event.pageX - (rect.left + scrollLeft);
  Y = event.pageY - (rect.top + scrollTop);

  // Native sizes is the sizes of the small image, so you could dynamically add and change image sizes.
  let native_height = getimgHeight();
  let native_width = getimgWidth();
  moveCircle(X, Y, native_height, native_width);
}
function moveCircle(X, Y, native_height, native_width) {
  // constants that We need to use in this function.
  const magnifyIngGlass = document.querySelector("#circle");
  const clipCircle = document.querySelector("#clipcircle");
  const largeImage = document.querySelector(".largeImage");
  const largeImage2 = document.querySelector(".largeImage2");
  // here is the start of the mgnifying function, I wanted to activate the glass when you go over the image and dissapear wehn you leave but
  // the way the event listener is created it just stops calculating when youre off the image so this is always true in a sense (when over the image).
  // Gonna look at this when I have time...

  if (X < native_width && Y < native_height && X > 0 && Y > 0) {
    largeImage.classList.add("active");
    clipCircle.style.display = "block";
    magnifyIngGlass.style.display = "block";
  } else {
    clipCircle.style.display = "none";
    magnifyIngGlass.style.display = "none";
  }
  if (largeImage.classList.contains("active")) {
    // here I'm setting the coordinates of the glass and cicles and the large image.
    clipCircle.setAttribute("cx", X);
    clipCircle.setAttribute("cy", Y);
    magnifyIngGlass.setAttribute("cx", X);
    magnifyIngGlass.setAttribute("cy", Y);
    // litterally just tried out different calculations for this and stumbled on this one, so -1 is the key, as it will ofsett it in the opisite direction so it's in the
    //right location, so this function would tecnhically only work if the larger image is exactly 2x the size.
    largeImage2.setAttribute("x", X * -1);
    largeImage2.setAttribute("y", Y * -1);
  }
}

// here are some blackbox functions to get the widths and heights, would be so much easier with Jquery but whatever...
function getimgWidth() {
  const positionInfo = smallimage.getBoundingClientRect();
  const width = positionInfo.width;
  return width;
}
function getimgHeight() {
  const positionInfo = smallimage.getBoundingClientRect();
  const height = positionInfo.height;
  return height;
}
