// Function to create a single star element
function createStar() {
  const star = document.createElement('div');
  star.classList.add('star');
  star.style.width = `${Math.random() * 3}px`;
  star.style.height = `${Math.random() * 3}px`;
  star.style.top = `${Math.random() * 100}vh`;
  star.style.left = `${Math.random() * 100}vw`;
  star.style.animationDuration = `${Math.random() * 3 + 2}s`;
  star.style.animationDelay = `${Math.random() * 5}s`;
  document.body.appendChild(star);
}

// Create multiple stars
for (let i = 0; i < 200; i++) {
  createStar();
}

// Existing JavaScript for image track handling
const track = document.getElementById("image-track");

const handleOnDown = e => track.dataset.mouseDownAt = e.clientX;

const handleOnUp = () => {
  track.dataset.mouseDownAt = "0";  
  track.dataset.prevPercentage = track.dataset.percentage;
}

const handleOnMove = e => {
  if(track.dataset.mouseDownAt === "0") return;
  
  const mouseDelta = parseFloat(track.dataset.mouseDownAt) - e.clientX,
        maxDelta = window.innerWidth * 2;
  
  const percentage = (mouseDelta / maxDelta) * -100,
        nextPercentageUnconstrained = parseFloat(track.dataset.prevPercentage) + percentage,
        nextPercentage = Math.max(Math.min(nextPercentageUnconstrained, 0), -100);
  
  track.dataset.percentage = nextPercentage;
  
  track.animate({
      transform: `translate(${nextPercentage}%, -50%)`
  }, { duration: 1200, fill: "forwards" });
  
  for(const image of track.getElementsByClassName("image")) {
      image.animate({
          objectPosition: `${100 + nextPercentage}% center`
      }, { duration: 1200, fill: "forwards" });
  }
}

// Mouse and touch event listeners
window.onmousedown = e => handleOnDown(e);
window.ontouchstart = e => handleOnDown(e.touches[0]);
window.onmouseup = e => handleOnUp(e);
window.ontouchend = e => handleOnUp(e.touches[0]);
window.onmousemove = e => handleOnMove(e);
window.ontouchmove = e => handleOnMove(e.touches[0]);
