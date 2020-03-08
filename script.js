const magnifyIngGlass = document.querySelector("#circle");
const clipCircle = document.querySelector("#clipcircle");
const largeImage = document.querySelector(".largeImage");
const largeImage2 = document.querySelector(".largeImage2");
const svg = document.querySelector("svg");

svg.addEventListener("mousemove", moveCircle);
// Native sizes is the sizes of the small image, so this can be
let native_height = 1000;
let native_width = 500;

function moveCircle(event) {
  var rect = this.getBoundingClientRect(),
    scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
    scrollTop = window.pageYOffset || document.documentElement.scrollTop;

  const X = event.pageX - (rect.left + scrollLeft);
  const Y = event.pageY - (rect.top + scrollTop);

  if (X < 1000 && Y < 500 && X > 0 && Y > 0) {
    largeImage.classList.add("active");
  } else {
    largeImage.classList.remove("active");
  }

  if (largeImage.classList.contains("active")) {
    const rx = Math.round((X / 1000) * native_width - 2000 / 2) * -1;
    const ry = Math.round((Y / 500) * native_height - 1000 / 2) * -1;
    const px = X;
    const py = Y;
    clipCircle.setAttribute("cx", px);
    clipCircle.setAttribute("cy", py);
    magnifyIngGlass.setAttribute("cx", px);
    magnifyIngGlass.setAttribute("cy", py);
    largeImage2.setAttribute("x", px * -1);
    largeImage2.setAttribute("y", py * -1);
  }
}
