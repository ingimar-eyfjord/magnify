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
  const X = event.pageX - (rect.left + scrollLeft);
  const Y = event.pageY - (rect.top + scrollTop);
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
  } else {
    largeImage.classList.remove("active");
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
