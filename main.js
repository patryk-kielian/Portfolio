// cursor
document.body.addEventListener("mousemove", (evt) => {
  const mouseX = evt.clientX;
  const mouseY = evt.clientY;

  // gsap.set(".cursor", {
  //   x: mouseX,
  //   y: mouseY,
  // });

  gsap.to(".shape", {
    x: mouseX,
    y: mouseY,
    stagger: -0.1,
  });
});

// hamburger icon
window.addEventListener("load", function () {
  const hamburger = document.querySelector("#hamburger");
  const navbar = document.querySelector(".navbar_open");
  hamburger.addEventListener("click", function () {
    hamburger.classList.toggle("open");
    navbar.classList.toggle("hidden");
  });
});

// section shortcut
document.querySelectorAll("a[href*='#']").forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    const targetId = link.getAttribute("href").slice(1);
    const target = document.getElementById(targetId);
    if (!target) return; // Return if target is not found
    const targetPos = target.getBoundingClientRect().top + window.pageYOffset;
    const startPos = window.pageYOffset;
    if (targetPos === startPos) return; // Return if target position is already the current scroll position
    const distance = targetPos - startPos;
    const duration = 1000;
    let startTime = null;

    function animation(currentTime) {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const run = easeInOutCubic(timeElapsed, startPos, distance, duration);
      window.scrollTo(0, run);
      if (timeElapsed < duration) requestAnimationFrame(animation);
    }

    function easeInOutCubic(t, b, c, d) {
      t /= d / 2;
      if (t < 1) return (c / 2) * t * t * t + b;
      t -= 2;
      return (c / 2) * (t * t * t + 2) + b;
    }

    requestAnimationFrame(animation);
  });
});

// Get the light and night mode buttons
const lightButton = document.querySelector("#light");
const nightButton = document.querySelector("#night");

// Check if the mode is already set in local storage
let selectedMode = localStorage.getItem("selectedMode");

// If no mode is set, default to light
if (!selectedMode) {
  selectedMode = "light";
  localStorage.setItem("selectedMode", selectedMode);
}

// Function to switch between light and night modes
const switchMode = (mode) => {
  localStorage.setItem("selectedMode", mode);
  if (mode === "light") {
    document.documentElement.style.setProperty("--black", "#000814");
    document.documentElement.style.setProperty("--white", "#ffffff");
    document.documentElement.style.setProperty("--black_95", "#000814f2");
    document.documentElement.style.setProperty("--white_95", "#fffffff2");
    document.documentElement.style.setProperty("--mix-blend-mode", "lighten");
    lightButton.classList.add("selected");
    nightButton.classList.remove("selected");
  } else {
    document.documentElement.style.setProperty("--black", "#ffffff");
    document.documentElement.style.setProperty("--white", "#000814");
    document.documentElement.style.setProperty("--black_95", "#fffffff2");
    document.documentElement.style.setProperty("--white_95", "#000814f2");
    document.documentElement.style.setProperty("--mix-blend-mode", "darken");
    lightButton.classList.remove("selected");
    nightButton.classList.add("selected");
  }
};

// Set the initial state of the buttons and root styles based on the selected mode
switchMode(selectedMode);

// Add event listeners to the buttons to change the selected mode
lightButton.addEventListener("click", () => {
  switchMode("light");
});

nightButton.addEventListener("click", () => {
  switchMode("night");
});

// Video full-screen toggle
const video = document.querySelector("video.project");
const popup = document.querySelector(".project_popup");
video.addEventListener("click", (event) => {
  event.preventDefault();
  if (
    video.classList.contains("full") &&
    !event.target.closest(".video-controls")
  ) {
    video.classList.remove("full");
    video.removeAttribute("controls");
  } else {
    video.classList.add("full");
    video.setAttribute("controls", "");
    setTimeout(() => {
      popup.classList.remove("hidden");
      setTimeout(() => {
        popup.classList.add("hidden");
      }, 2000);
    }, 500);
    // setTimeout(() => {
    //   video.classList.add("fixed");
    // }, 500);
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && video.classList.contains("full")) {
    video.classList.remove("full");
    video.removeAttribute("controls");
  }
});
