// 🌟 Select Elements
const slider = document.querySelector(".slider");
const slides = document.querySelectorAll(".slide");
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");

let index = 0;
let totalSlides = slides.length;
let visibleSlides = window.innerWidth <= 768 ? 1 : 3;
let slideWidth = slides[0].clientWidth;

// 🔄 Function to Update Slide Position & Middle Effect
function updateSlider() {
  slider.style.transform = `translateX(-${index * slideWidth}px)`;

  slides.forEach((slide, i) => {
    slide.classList.remove("middle");
    if (i === index + Math.floor(visibleSlides / 2)) {
      slide.classList.add("middle"); // 🎯 Highlight middle slide
    }
  });
}

// 🔄 Auto-Play
let autoPlay = setInterval(() => {
  index = (index + 1) % (totalSlides - visibleSlides + 1);
  updateSlider();
}, 3000);

// 🎯 Click Events for Buttons
if (prevBtn && nextBtn) {
  prevBtn.addEventListener("click", () => {
    index = Math.max(0, index - 1);
    updateSlider();
  });

  nextBtn.addEventListener("click", () => {
    index = Math.min(totalSlides - visibleSlides, index + 1);
    updateSlider();
  });
}

// 🎯 Swipe Gesture for Mobile
let touchStartX = 0;
let touchEndX = 0;

slider.addEventListener("touchstart", (e) => {
  touchStartX = e.touches[0].clientX;
});

slider.addEventListener("touchend", (e) => {
  touchEndX = e.changedTouches[0].clientX;
  if (touchStartX - touchEndX > 50) {
    index = Math.min(totalSlides - 1, index + 1);
  } else if (touchEndX - touchStartX > 50) {
    index = Math.max(0, index - 1);
  }
  updateSlider();
});

// 🔄 Update Slide Width on Resize
window.addEventListener("resize", () => {
  visibleSlides = window.innerWidth <= 768 ? 1 : 3;
  slideWidth = slides[0].clientWidth;
  updateSlider();
});

// 🎯 Initial Middle Slide Highlight
updateSlider();
