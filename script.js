const tl = gsap.timeline();

tl.from(".loader img", {
  scale: 0,
  rotation: -360,
  duration: 1.5,
  ease: "elastic.out(1, 0.3)",
})
  .to(".loader", {
    opacity: 0,
    duration: 0.5,
    delay: 0.5,
    onComplete: () => {
      document.querySelector(".loader").remove();
    },
  })
  .to(".heading-container", {
    opacity: 1,
    duration: 1,
    y: 20,
    ease: "power3.out",
  })
  .from(".main-heading", {
    y: 50,
    opacity: 0,
    duration: 1,
    ease: "power3.out",
  })
  .to(".text-reveal::before", {
    scaleX: 1,
    duration: 0.8,
    ease: "power2.inOut",
  })
  .to(".text-reveal::before", {
    scaleX: 0,
    transformOrigin: "right",
    duration: 0.8,
    ease: "power2.inOut",
  })
  .to(".sub-heading", {
    opacity: 1,
    y: 0,
    duration: 0.8,
    ease: "power3.out",
  })
  .from(".nike-logo", {
    opacity: 0,
    y: -50,
    duration: 1,
    ease: "power3.out",
  })
  .to(".slider-container", {
    opacity: 1,
    duration: 1,
  })
  .from(".card", {
    opacity: 0,
    y: 100,
    stagger: 0.1,
    duration: 0.8,
    ease: "power3.out",
  });

const cards = document.querySelectorAll(".card");
cards.forEach((card) => {
  card.addEventListener("mouseenter", () => {
    gsap.to(card, {
      rotationY: 180,
      duration: 0.8,
      ease: "power2.inOut",
    });
  });

  card.addEventListener("mouseleave", () => {
    gsap.to(card, {
      rotationY: 0,
      duration: 0.8,
      ease: "power2.inOut",
    });
  });
});

const slider = document.querySelector(".slider");
let draggable = Draggable.create(slider, {
  type: "x",
  inertia: true,
  bounds: {
    minX: -slider.scrollWidth + window.innerWidth * 0.8,
    maxX: 0,
  },
  edgeResistance: 0.65,
  onDrag: function () {
    gsap.to(cards, {
      rotationY: 0,
      duration: 0.4,
    });
  },
})[0];

const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");
const cardWidth = cards[0].offsetWidth + 20;

prevBtn.addEventListener("click", () => {
  gsap.to(prevBtn, {
    scale: 0.9,
    duration: 0.1,
    yoyo: true,
    repeat: 1,
  });

  gsap.to(slider, {
    x: `+=${cardWidth}`,
    duration: 0.8,
    ease: "power2.out",
    modifiers: {
      x: function (x) {
        return Math.min(0, parseFloat(x));
      },
    },
  });
});

nextBtn.addEventListener("click", () => {
  gsap.to(nextBtn, {
    scale: 0.9,
    duration: 0.1,
    yoyo: true,
    repeat: 1,
  });

  gsap.to(slider, {
    x: `-=${cardWidth}`,
    duration: 0.8,
    ease: "power2.out",
    modifiers: {
      x: function (x) {
        const minX = -slider.scrollWidth + window.innerWidth * 0.8;
        return Math.max(minX, parseFloat(x));
      },
    },
  });
});

let autoScroll = gsap.to(slider, {
  x: () => -(slider.scrollWidth - window.innerWidth * 0.8),
  duration: 30,
  ease: "none",
  repeat: -1,
  paused: true,
});

slider.addEventListener("mouseenter", () => autoScroll.pause());
slider.addEventListener("mouseleave", () => autoScroll.play());

autoScroll.play();

window.addEventListener("resize", () => {
  draggable.kill();
  draggable = Draggable.create(slider, {
    type: "x",
    inertia: true,
    bounds: {
      minX: -slider.scrollWidth + window.innerWidth * 0.8,
      maxX: 0,
    },
    edgeResistance: 0.65,
  })[0];

  autoScroll.kill();
  autoScroll = gsap.to(slider, {
    x: () => -(slider.scrollWidth - window.innerWidth * 0.8),
    duration: 30,
    ease: "none",
    repeat: -1,
  });
});
