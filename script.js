/* ============================================================
   WARDROBE | FASHION TRENDS — Main JavaScript
   ============================================================ */

document.addEventListener("DOMContentLoaded", function () {
  "use strict";

  /* ----------------------------------------------------------
     DOM References
  ---------------------------------------------------------- */
  var header        = document.getElementById("siteHeader");
  var hamburgerBtn  = document.getElementById("hamburgerBtn");
  var mobileMenu    = document.getElementById("mobileMenu");
  var themeToggle   = document.getElementById("themeToggle");
  var themeIcon     = document.getElementById("themeIcon");
  var heroText      = document.getElementById("heroAnimatedText");
  var quickViewBtns = document.querySelectorAll(".quick-view-btn");
  var modal         = document.getElementById("quickViewModal");
  var modalClose    = document.getElementById("modalClose");
  var modalImage    = document.getElementById("modalImage");
  var modalTitle    = document.getElementById("modalTitle");
  var modalRating   = document.getElementById("modalRating");
  var modalPrice    = document.getElementById("modalPrice");
  var addToCartBtns = document.querySelectorAll(".add-to-cart-btn");
  var cartCountEl   = document.getElementById("cartCount");
  var newsletterForm = document.getElementById("newsletterForm");
  var pageContent   = document.getElementById("pageContent");
  var drawerOverlay = document.getElementById("drawerOverlay");

  var cartCount = 0;

  /* ----------------------------------------------------------
     1. Sticky Header on Scroll
  ---------------------------------------------------------- */
  function handleScroll() {
    if (window.scrollY > 60) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  }

  window.addEventListener("scroll", handleScroll, { passive: true });

  /* ----------------------------------------------------------
     2. Mobile Nav Drawer — Push Content Effect
  ---------------------------------------------------------- */
  var scrollPosition = 0;

  function openMobileMenu() {
    scrollPosition = window.pageYOffset;
    mobileMenu.classList.add("open");
    hamburgerBtn.classList.add("active");
    hamburgerBtn.setAttribute("aria-expanded", "true");
    mobileMenu.setAttribute("aria-hidden", "false");
    document.body.classList.add("menu-open");

    /* Shift page content + header */
    if (pageContent) pageContent.classList.add("shifted");
    if (header) header.classList.add("shifted");
    if (drawerOverlay) drawerOverlay.classList.add("visible");
  }

  function closeMobileMenu() {
    mobileMenu.classList.remove("open");
    hamburgerBtn.classList.remove("active");
    hamburgerBtn.setAttribute("aria-expanded", "false");
    mobileMenu.setAttribute("aria-hidden", "true");
    document.body.classList.remove("menu-open");

    /* Return page content + header */
    if (pageContent) pageContent.classList.remove("shifted");
    if (header) header.classList.remove("shifted");
    if (drawerOverlay) drawerOverlay.classList.remove("visible");
  }

  function toggleMobileMenu() {
    var isOpen = mobileMenu.classList.contains("open");
    if (isOpen) {
      closeMobileMenu();
    } else {
      openMobileMenu();
    }
  }

  if (hamburgerBtn) {
    hamburgerBtn.addEventListener("click", toggleMobileMenu);
  }

  /* Close drawer when overlay is tapped */
  if (drawerOverlay) {
    drawerOverlay.addEventListener("click", closeMobileMenu);
  }

  /* Close mobile menu when a link is clicked */
  var mobileLinks = document.querySelectorAll(".mobile-nav-link");
  mobileLinks.forEach(function (link) {
    link.addEventListener("click", function () {
      closeMobileMenu();
    });
  });

  /* Close mobile menu on Escape key */
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && mobileMenu && mobileMenu.classList.contains("open")) {
      closeMobileMenu();
    }
  });

  /* Close mobile menu when resizing above mobile breakpoint */
  var resizeTimer;
  window.addEventListener("resize", function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () {
      if (window.innerWidth > 768 && mobileMenu && mobileMenu.classList.contains("open")) {
        closeMobileMenu();
      }
    }, 150);
  }, { passive: true });

  /* ----------------------------------------------------------
     3. Dark / Light Mode Toggle
  ---------------------------------------------------------- */
  function getStoredTheme() {
    try {
      return localStorage.getItem("wardrobe-theme");
    } catch (e) {
      return null;
    }
  }

  function setTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);

    if (theme === "dark") {
      themeIcon.classList.remove("fa-moon");
      themeIcon.classList.add("fa-sun");
    } else {
      themeIcon.classList.remove("fa-sun");
      themeIcon.classList.add("fa-moon");
    }

    try {
      localStorage.setItem("wardrobe-theme", theme);
    } catch (e) {
      /* Storage unavailable, fail silently */
    }
  }

  /* Initialize theme from stored preference or system preference */
  var storedTheme = getStoredTheme();

  if (storedTheme) {
    setTheme(storedTheme);
  } else if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
    setTheme("dark");
  }

  if (themeToggle) {
    themeToggle.addEventListener("click", function () {
      var currentTheme = document.documentElement.getAttribute("data-theme");
      var newTheme = currentTheme === "dark" ? "light" : "dark";
      setTheme(newTheme);
    });
  }

  /* ----------------------------------------------------------
     4. Hero — Animated French Text (Typing Effect)
  ---------------------------------------------------------- */
  var frenchPhrases = [
    "L\u2019\u00E9l\u00E9gance est la seule beaut\u00E9 qui ne se fane jamais",
    "La mode est l\u2019armure pour survivre \u00E0 la r\u00E9alit\u00E9 quotidienne",
    "Le style est une fa\u00E7on de dire qui vous \u00EAtes sans parler",
    "Donnez-vous un nouveau style cette ann\u00E9e",
    "La beaut\u00E9 commence au moment o\u00F9 vous d\u00E9cidez d\u2019\u00EAtre vous-m\u00EAme"
  ];

  var phraseIndex   = 0;
  var charIndex     = 0;
  var isDeleting    = false;
  var typingSpeed   = 65;
  var deletingSpeed = 35;
  var pauseAfterType = 2200;
  var pauseAfterDelete = 500;

  function typeWriter() {
    if (!heroText) return;

    var currentPhrase = frenchPhrases[phraseIndex];

    if (!isDeleting) {
      /* Typing forward */
      heroText.textContent = currentPhrase.substring(0, charIndex + 1);
      charIndex++;

      if (charIndex === currentPhrase.length) {
        /* Finished typing, pause then start deleting */
        isDeleting = true;
        setTimeout(typeWriter, pauseAfterType);
        return;
      }

      setTimeout(typeWriter, typingSpeed);
    } else {
      /* Deleting backward */
      heroText.textContent = currentPhrase.substring(0, charIndex - 1);
      charIndex--;

      if (charIndex === 0) {
        /* Finished deleting, move to next phrase */
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % frenchPhrases.length;
        setTimeout(typeWriter, pauseAfterDelete);
        return;
      }

      setTimeout(typeWriter, deletingSpeed);
    }
  }

  /* Start the typing animation */
  if (heroText) {
    setTimeout(typeWriter, 800);
  }

  /* ----------------------------------------------------------
     5. Quick View Modal
  ---------------------------------------------------------- */
  function openQuickView(card) {
    if (!modal) return;

    var image = card.querySelector(".product-image-wrap img");
    var name  = card.querySelector(".product-name");
    var price = card.querySelector(".product-price");
    var rating = card.querySelector(".product-rating");

    if (image)  modalImage.src = image.src;
    if (name)   modalTitle.textContent = name.textContent;
    if (price)  modalPrice.textContent = price.textContent;
    if (rating) modalRating.innerHTML = rating.innerHTML;

    modal.classList.add("active");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  function closeQuickView() {
    if (!modal) return;

    modal.classList.remove("active");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  quickViewBtns.forEach(function (btn) {
    btn.addEventListener("click", function (e) {
      e.preventDefault();
      var card = btn.closest(".product-card");
      if (card) openQuickView(card);
    });
  });

  if (modalClose) {
    modalClose.addEventListener("click", closeQuickView);
  }

  if (modal) {
    modal.addEventListener("click", function (e) {
      if (e.target === modal) closeQuickView();
    });
  }

  /* Close modal with Escape key */
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && modal && modal.classList.contains("active")) {
      closeQuickView();
    }
  });

  /* ----------------------------------------------------------
     6. Add to Cart with Toast Notification
  ---------------------------------------------------------- */
  function showToast(message) {
    var existing = document.querySelector(".toast-notification");
    if (existing) existing.remove();

    var toast = document.createElement("div");
    toast.className = "toast-notification";
    toast.textContent = message;
    document.body.appendChild(toast);

    /* Trigger animation */
    requestAnimationFrame(function () {
      toast.classList.add("show");
    });

    setTimeout(function () {
      toast.classList.remove("show");
      setTimeout(function () {
        if (toast.parentNode) toast.remove();
      }, 400);
    }, 2800);
  }

  function handleAddToCart(e) {
    e.preventDefault();
    cartCount++;

    if (cartCountEl) {
      cartCountEl.textContent = cartCount;
      cartCountEl.style.transform = "scale(1.4)";
      setTimeout(function () {
        cartCountEl.style.transform = "scale(1)";
      }, 250);
    }

    var card = e.currentTarget.closest(".product-card");
    var productName = "Item";
    if (card) {
      var nameEl = card.querySelector(".product-name");
      if (nameEl) productName = nameEl.textContent;
    }

    showToast(productName + " added to cart!");
  }

  addToCartBtns.forEach(function (btn) {
    btn.addEventListener("click", handleAddToCart);
  });

  /* Modal add-to-cart button */
  var modalAddCart = document.querySelector(".modal-add-cart");
  if (modalAddCart) {
    modalAddCart.addEventListener("click", function (e) {
      cartCount++;
      if (cartCountEl) {
        cartCountEl.textContent = cartCount;
        cartCountEl.style.transform = "scale(1.4)";
        setTimeout(function () {
          cartCountEl.style.transform = "scale(1)";
        }, 250);
      }

      var productName = modalTitle ? modalTitle.textContent : "Item";
      showToast(productName + " added to cart!");
      closeQuickView();
    });
  }

  /* ----------------------------------------------------------
     7. Newsletter Form Handling
  ---------------------------------------------------------- */
  if (newsletterForm) {
    newsletterForm.addEventListener("submit", function (e) {
      e.preventDefault();
      var emailInput = newsletterForm.querySelector("input[type='email']");
      var email = emailInput ? emailInput.value.trim() : "";

      if (email && email.indexOf("@") > -1) {
        showToast("Thank you for subscribing!");
        if (emailInput) emailInput.value = "";
      }
    });
  }

  /* ----------------------------------------------------------
     8. Mobile Product Carousel — Arrow Navigation
  ---------------------------------------------------------- */
  var carouselWraps = document.querySelectorAll(".product-carousel-wrap");

  carouselWraps.forEach(function (wrap) {
    var grid = wrap.querySelector(".product-grid");
    var leftBtn = wrap.querySelector(".carousel-arrow-left");
    var rightBtn = wrap.querySelector(".carousel-arrow-right");

    if (!grid || !leftBtn || !rightBtn) return;

    /* Scroll distance = roughly one card width + gap */
    var scrollAmount = 184;

    leftBtn.addEventListener("click", function () {
      grid.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    });

    rightBtn.addEventListener("click", function () {
      grid.scrollBy({ left: scrollAmount, behavior: "smooth" });
    });

    /* Update arrow visibility based on scroll position */
    function updateArrows() {
      if (window.innerWidth > 768) return;

      var maxScroll = grid.scrollWidth - grid.clientWidth;

      leftBtn.style.opacity = grid.scrollLeft <= 4 ? "0" : "0.85";
      leftBtn.style.pointerEvents = grid.scrollLeft <= 4 ? "none" : "auto";

      rightBtn.style.opacity = grid.scrollLeft >= maxScroll - 4 ? "0" : "0.85";
      rightBtn.style.pointerEvents = grid.scrollLeft >= maxScroll - 4 ? "none" : "auto";
    }

    grid.addEventListener("scroll", updateArrows, { passive: true });
    window.addEventListener("resize", updateArrows, { passive: true });

    /* Initial check after layout settles */
    setTimeout(updateArrows, 300);
  });

  /* ----------------------------------------------------------
     9. AOS (Animate on Scroll) Initialization
  ---------------------------------------------------------- */
  if (typeof AOS !== "undefined") {
    AOS.init({
      duration: 700,
      easing: "ease-out-cubic",
      once: true,
      offset: 60,
      disable: function () {
        return window.innerWidth < 768;
      }
    });
  }

  /* ----------------------------------------------------------
     10. Smooth Scroll for Anchor Links
  ---------------------------------------------------------- */
  var anchorLinks = document.querySelectorAll('a[href^="#"]');

  anchorLinks.forEach(function (link) {
    link.addEventListener("click", function (e) {
      var targetId = this.getAttribute("href");
      if (targetId === "#") return;

      var target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        var offsetTop = target.getBoundingClientRect().top + window.pageYOffset - 80;
        window.scrollTo({ top: offsetTop, behavior: "smooth" });
      }
    });
  });

  /* ----------------------------------------------------------
     11. Active Nav Link on Scroll (Intersection Observer)
  ---------------------------------------------------------- */
  var sections = document.querySelectorAll("section[id]");
  var navLinks = document.querySelectorAll(".nav-link");

  if (sections.length > 0 && "IntersectionObserver" in window) {
    var observerOptions = {
      root: null,
      rootMargin: "-20% 0px -60% 0px",
      threshold: 0
    };

    var sectionObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var activeId = entry.target.getAttribute("id");
          navLinks.forEach(function (link) {
            link.classList.remove("active");
            if (link.getAttribute("href") === "#" + activeId) {
              link.classList.add("active");
            }
          });
        }
      });
    }, observerOptions);

    sections.forEach(function (section) {
      sectionObserver.observe(section);
    });
  }

});
