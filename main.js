function myInitCode() {}
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
  console.log("The load event has fired!");
  var hamburger = document.querySelector("#hamburger");
  hamburger.addEventListener("click", function () {
    hamburger.classList.toggle("open");
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
