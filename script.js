// Function to move to the next slide
function nextSlide() {
  console.log("Next slide button clicked");
}

// Function to move to the previous slide
function prevSlide() {
  console.log("Previous slide button clicked");
}

// Function to initialize the slider when the page loads
function initSlider() {
  console.log("Slider initialized");
}

// Ensures the slider is initialized after the page is fully loaded
document.addEventListener("DOMContentLoaded", initSlider);
