// Wait for the HTML document to fully load before running any of this code
$(document).ready(function () {
  // Grab the slider container (the thing holding all the slides) using jQuery
  const $slider = $(".slider");
  // Get all the individual slides inside the slider, also with jQuery
  const $slides = $(".slide");
  // Find the "previous" button using plain JS (no jQuery here, just raw DOM stuff)
  const prevBtn = document.querySelector(".prev");
  // Same deal for the "next" button
  const nextBtn = document.querySelector(".next");

  // Keep track of which slide we’re on, starting at 0 (first slide)
  let index = 0;
  // Count how many slides we’ve got total
  let totalSlides = $slides.length;
  // Figure out how many slides should be visible at once (depends on screen size)
  let visibleSlides = getVisibleSlides();
  // Get the width of a single slide (we’ll need this for sliding)
  let slideWidth = getSlideWidth();

  // Kick off the slider by setting it up
  function initSlider() {
    // Move the slider to the right spot and update visuals
    updateSlider();
    // Start the auto-scrolling magic
    startAutoPlay();
    // Hook up all the button clicks and other interactions
    bindEvents();
  }

  // Calculate the width of one slide (including margins) using the first slide
  function getSlideWidth() {
    // .eq(0) grabs the first slide, .outerWidth() gets its full width
    return $slides.eq(0).outerWidth();
  }

  // Decide how many slides to show based on screen size
  function getVisibleSlides() {
    // If the window is 768px or smaller (mobile), show 1 slide, otherwise show 3
    return window.innerWidth <= 768 ? 1 : 3;
  }

  // Move the slider to the right position and highlight the middle slide
  function updateSlider() {
    // Figure out how far to shift the slider left (negative because we’re sliding left)
    let translateX = -index * slideWidth;
    // Use CSS transform to slide the whole thing smoothly
    $slider.css("transform", `translateX(${translateX}px)`);
    // Grab all slides again (just in case something changed in the DOM)
    slides = document.querySelectorAll(".slide");
    // Remove the "middle" class from every slide first
    slides.forEach((slide) => slide.classList.remove("middle"));
    // Calculate which slide should be in the middle of the visible ones
    let middleIndex = index + Math.floor(visibleSlides / 2);
    // If we’re not past the end, add the "middle" class to that slide
    if (middleIndex < totalSlides) {
      $slides.eq(middleIndex).addClass("middle");
    }
  }

  // Set up the slider to auto-scroll every 3 seconds
  function startAutoPlay() {
    // Run this every 3000ms (3 seconds)
    setInterval(function () {
      // If we’re not at the end yet, move to the next slide
      if (index < totalSlides - visibleSlides) {
        index++;
      } else {
        // If we’re at the end, loop back to the start
        index = 0;
      }
      // Update the slider position after changing the index
      updateSlider();
    }, 3000);
  }

  // Move to the previous slide if we’re not already at the start
  function goToPrevious() {
    // Only go back if we’re not on the first slide
    if (index > 0) {
      index--;
      // Shift the slider to match the new index
      updateSlider();
    }
  }

  // Move to the next slide if we’re not at the end
  function goToNext() {
    // Only go forward if there’s room (don’t go past the last visible slide)
    if (index < totalSlides - visibleSlides) {
      index++;
      // Update the slider to reflect the new position
      updateSlider();
    }
  }

  // Add swipe support for touch devices (like phones)
  function setupSwipe() {
    // Track where the finger starts and ends
    let touchStartX = 0;
    let touchEndX = 0;

    // When the user touches the slider, save the starting X position
    $slider.on("touchstart", function (e) {
      touchStartX = e.touches[0].clientX;
    });

    // Grab the slider with plain JS for the touchend event
    slider = document.querySelector(".slider");
    // When the user lifts their finger, figure out which way they swiped
    slider.addEventListener("touchend", function (e) {
      touchEndX = e.changedTouches[0].clientX;

      // If they swiped left more than 50px, go to the next slide
      if (touchStartX - touchEndX > 50) {
        goToNext();
        // If they swiped right more than 50px, go to the previous slide
      } else if (touchEndX - touchStartX > 50) {
        goToPrevious();
      }
    });
  }

  // Hook up all the interactive stuff (buttons, swipes, resizing)
  function bindEvents() {
    // When the prev button is clicked, go back
    $(prevBtn).on("click", goToPrevious);
    // When the next button is clicked, go forward (plain JS style here)
    nextBtn.addEventListener("click", goToNext);
    // Set up swipe gestures
    setupSwipe();
    // When the window resizes, recalculate everything and update
    $(window).on("resize", function () {
      console.log("resizing");
      // Update how many slides are visible based on new window size
      visibleSlides = getVisibleSlides();
      // Recalculate slide width in case it changed
      slideWidth = getSlideWidth();
      // Move the slider to the right spot with the new settings
      updateSlider();
    });
  }

  // Start the whole thing running!
  initSlider();
});
