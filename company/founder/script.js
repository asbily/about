document.addEventListener("DOMContentLoaded", () => {

  /* =====================================================
     HAMBURGER MENU
  ===================================================== */

  const menuButton = document.getElementById("menuToggle");
  const navigation = document.getElementById("mainNav");


  if (menuButton && navigation) {

    /* =========================
       CLOSE MENU
    ========================= */

    function closeMenu() {

      menuButton.classList.remove("open");

      navigation.classList.remove("open");

      menuButton.setAttribute(
        "aria-expanded",
        "false"
      );

      menuButton.setAttribute(
        "aria-label",
        "Open navigation"
      );

      document.body.classList.remove(
        "menu-open"
      );
    }


    /* =========================
       OPEN MENU
    ========================= */

    function openMenu() {

      menuButton.classList.add("open");

      navigation.classList.add("open");

      menuButton.setAttribute(
        "aria-expanded",
        "true"
      );

      menuButton.setAttribute(
        "aria-label",
        "Close navigation"
      );

      document.body.classList.add(
        "menu-open"
      );
    }


    /* =========================
       HAMBURGER CLICK
    ========================= */

    menuButton.addEventListener(
      "click",
      () => {

        const isOpen =
          navigation.classList.contains("open");

        if (isOpen) {
          closeMenu();
        } else {
          openMenu();
        }

      }
    );


    /* =========================
       CLOSE AFTER CLICKING LINK
    ========================= */

    navigation
      .querySelectorAll("a")
      .forEach((link) => {

        link.addEventListener(
          "click",
          () => {
            closeMenu();
          }
        );

      });


    /* =========================
       CLICK OUTSIDE → CLOSE
    ========================= */

    document.addEventListener(
      "click",
      (event) => {

        const target = event.target;

        if (
          navigation.classList.contains("open") &&
          !navigation.contains(target) &&
          !menuButton.contains(target)
        ) {

          closeMenu();

        }

      }
    );


    /* =========================
       ESCAPE → CLOSE
    ========================= */

    document.addEventListener(
      "keydown",
      (event) => {

        if (event.key === "Escape") {
          closeMenu();
        }

      }
    );


    /* =========================
       DESKTOP → CLOSE MENU
    ========================= */

    window.addEventListener(
      "resize",
      () => {

        if (window.innerWidth > 860) {
          closeMenu();
        }

      }
    );

  }


  /* =========================
     SMOOTH SCROLL
  ========================== */

  document
    .querySelectorAll('a[href^="#"]')
    .forEach((anchor) => {

      anchor.addEventListener(
        "click",
        function (event) {

          const targetId =
            this.getAttribute("href");

          if (
            targetId &&
            targetId !== "#"
          ) {

            const target =
              document.querySelector(
                targetId
              );

            if (target) {

              event.preventDefault();

              target.scrollIntoView({
                behavior: "smooth",
                block: "start"
              });

            }

          }

        }
      );

    });


  /* =====================================================
     ACTIVE MENU HIGHLIGHT ON SCROLL
  ===================================================== */

  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".navigation a");

  function changeActiveNav() {
    let scrollPosition = window.scrollY + 120;

    // Check if at top
    if (window.scrollY < 100) {
      navLinks.forEach((link) => {
        link.classList.remove("active");
        if (link.getAttribute("href") === "#top") {
          link.classList.add("active");
        }
      });
      return;
    }

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute("id");

      if (
        scrollPosition >= sectionTop &&
        scrollPosition < sectionTop + sectionHeight
      ) {
        navLinks.forEach((link) => {
          link.classList.remove("active");
          if (link.getAttribute("href") === "#" + sectionId) {
            link.classList.add("active");
          }
        });
      }
    });
  }

  window.addEventListener("scroll", changeActiveNav);
  changeActiveNav();


  /* =========================
     FOUNDER IMAGE
     SCROLL SCALE ANIMATION
  ========================== */

  const founderImage =
    document.querySelector(
      ".image-frame img"
    );


  if (founderImage) {

    const imageObserver =
      new IntersectionObserver(
        (entries) => {

          entries.forEach((entry) => {

            if (entry.isIntersecting) {

              founderImage.classList.add(
                "image-visible"
              );

              imageObserver.unobserve(
                founderImage
              );

            }

          });

        },
        {
          threshold: 0.25
        }
      );


    imageObserver.observe(
      founderImage
    );

  }


  /* =========================
     CURRENT YEAR
  ========================== */

  const year =
    document.getElementById("year");


  if (year) {

    year.textContent =
      new Date().getFullYear();

  }

});
