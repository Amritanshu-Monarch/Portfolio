document.addEventListener("DOMContentLoaded", () => {
  // --- 1. Liquid Navigation Logic (Desktop) ---
  const navContainer = document.getElementById("nav-container");
  const links = document.querySelectorAll(".nav-link");
  const indicator = document.getElementById("liquid-indicator");
  const themeToggleLabel = document.getElementById("theme-toggle-label");

  // NEW: Variable to track the pill's current X position
  let currentTranslateX = 0;

  links.forEach((link) => {
    link.addEventListener("mouseenter", (e) => {
      const rect = e.target.getBoundingClientRect();
      const containerRect = navContainer.getBoundingClientRect();

      // Store the position
      currentTranslateX = rect.left - containerRect.left;

      indicator.style.opacity = "1";
      indicator.style.transform = `translateX(${currentTranslateX}px) scale(1)`;
      indicator.style.width = `${rect.width}px`;
    });
  });

  const hideIndicator = () => {
    indicator.style.opacity = "0";
    // UPDATED: Keep the pill at its current horizontal position while it shrinks and fades
    indicator.style.transform = `translateX(${currentTranslateX}px) scale(0.95)`;
  };

  navContainer.addEventListener("mouseleave", hideIndicator);
  themeToggleLabel.addEventListener("mouseenter", hideIndicator);

  // --- 2. Theme Toggle Logic ---
  const themeToggleInput = document.getElementById("theme-toggle");
  const htmlElement = document.documentElement;

  const setTheme = (isDark) => {
    if (isDark) {
      htmlElement.classList.add("dark");
      themeToggleInput.checked = true;
    } else {
      htmlElement.classList.remove("dark");
      themeToggleInput.checked = false;
    }
    localStorage.setItem("portfolio-theme", isDark ? "dark" : "light");
  };

  const savedTheme = localStorage.getItem("portfolio-theme");
  const systemPrefersDark = window.matchMedia(
    "(prefers-color-scheme: dark)",
  ).matches;

  setTheme(savedTheme === "dark" || (!savedTheme && systemPrefersDark));

  themeToggleInput.addEventListener("change", (e) => {
    setTheme(e.target.checked);
  });

  // --- 3. Mobile Menu Logic ---
  const mobileMenuBtn = document.getElementById("mobile-menu-btn");
  const mobileMenu = document.getElementById("mobile-menu");
  const hamburgerIcon = document.getElementById("hamburger-icon");
  const closeIcon = document.getElementById("close-icon");
  const mobileLinks = document.querySelectorAll(".mobile-link");

  const toggleMobileMenu = () => {
    const isOpen = mobileMenu.classList.contains("opacity-100");

    if (isOpen) {
      mobileMenu.classList.remove("opacity-100", "pointer-events-auto");
      mobileMenu.classList.add("opacity-0", "pointer-events-none");

      hamburgerIcon.classList.remove("hidden");
      closeIcon.classList.add("hidden");
    } else {
      mobileMenu.classList.remove("opacity-0", "pointer-events-none");
      mobileMenu.classList.add("opacity-100", "pointer-events-auto");

      hamburgerIcon.classList.add("hidden");
      closeIcon.classList.remove("hidden");
    }
  };

  mobileMenuBtn.addEventListener("click", toggleMobileMenu);

  mobileLinks.forEach((link) => {
    link.addEventListener("click", toggleMobileMenu);
  });
});