document.addEventListener("DOMContentLoaded", () => {

  const menuToggle = document.getElementById("menuToggle");
  const menuClose = document.getElementById("menuClose");
  const mainNav = document.getElementById("mainNav");
  const menuOverlay = document.getElementById("menuOverlay");
  const brandLogo = document.getElementById("brandLogo");
  const navLinks = document.querySelectorAll(".nav-link");

  // Menu Control Functions
  function openMenu() {
    if (mainNav) mainNav.classList.add("active");
    if (menuOverlay) menuOverlay.classList.add("active");
    document.body.classList.add("no-scroll");
    if (menuToggle) menuToggle.setAttribute("aria-expanded", "true");
  }

  function closeMenu() {
    if (mainNav) mainNav.classList.remove("active");
    if (menuOverlay) menuOverlay.classList.remove("active");
    document.body.classList.remove("no-scroll");
    if (menuToggle) menuToggle.setAttribute("aria-expanded", "false");
  }

  if (menuToggle && mainNav) {
    menuToggle.addEventListener("click", () => {
      if (mainNav.classList.contains("active")) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    if (menuClose) {
      menuClose.addEventListener("click", closeMenu);
    }

    if (menuOverlay) {
      menuOverlay.addEventListener("click", closeMenu);
    }

    // Escape key close
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && mainNav.classList.contains("active")) {
        closeMenu();
      }
    });

    // Resize handler
    window.addEventListener("resize", () => {
      if (window.innerWidth > 860 && mainNav.classList.contains("active")) {
        closeMenu();
      }
    });
  }

  // Active Class Handler Function
  function setActiveLink(targetId) {
    navLinks.forEach(link => {
      if (link.getAttribute("href") === targetId) {
        link.classList.add("active");
      } else {
        link.classList.remove("active");
      }
    });
  }

  // Scroll to Top for Brand Logo
  if (brandLogo) {
    brandLogo.addEventListener("click", (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
      setActiveLink("#top");
      closeMenu();
    });
  }

  // Link Click Smooth Scroll & Active Toggle
  navLinks.forEach(link => {
    link.addEventListener("click", function (event) {
      const targetId = this.getAttribute("href");

      setActiveLink(targetId);
      closeMenu();

      if (targetId === "#top") {
        event.preventDefault();
        window.scrollTo({
          top: 0,
          behavior: "smooth"
        });
      } else if (targetId && targetId.startsWith("#")) {
        const targetSection = document.querySelector(targetId);
        if (targetSection) {
          event.preventDefault();
          targetSection.scrollIntoView({
            behavior: "smooth",
            block: "start"
          });
        }
      }
    });
  });

  // Auto Active State on Scroll (Intersection Observer)
  const sections = document.querySelectorAll("section[id], body[id]");

  const observerOptions = {
    root: null,
    rootMargin: "-25% 0px -65% 0px",
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute("id");
        if (id) {
          setActiveLink("#" + id);
        }
      }
    });
  }, observerOptions);

  sections.forEach(section => {
    observer.observe(section);
  });

  // Dynamic Year Calculation
  const year = document.getElementById("year");
  if (year) {
    year.textContent = new Date().getFullYear();
  }

});
