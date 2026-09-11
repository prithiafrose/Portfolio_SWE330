const tabLinks = document.querySelectorAll(".tab-links");
const tabContents = document.querySelectorAll(".tab-contents");

function opentab(tabname, el) {
  tabLinks.forEach((link) => link.classList.remove("active"));
  tabContents.forEach((content) => content.classList.remove("active"));
  el.classList.add("active");
  document.getElementById(tabname).classList.add("active");
}

const themeBtn = document.getElementById("mode-toggle");

function applyThemeIcon() {
  const isLight = document.body.classList.contains("light-mode");
  themeBtn.textContent = isLight ? "🌙" : "☀️";
  themeBtn.setAttribute("aria-label", isLight ? "Switch to dark mode" : "Switch to light mode");
}

if (localStorage.getItem("theme") === "light") {
  document.body.classList.add("light-mode");
}
applyThemeIcon();

themeBtn.addEventListener("click", () => {
  const isLight = document.body.classList.toggle("light-mode");
  localStorage.setItem("theme", isLight ? "light" : "dark");
  applyThemeIcon();
});

const typedText = document.getElementById("typedText");
const roles = ["Software Developer", "Web Designer", "App Developer", "Game Developer"];
let roleIndex = 0;
let charIndex = 0;
let deleting = false;

function typeLoop() {
  const word = roles[roleIndex];
  typedText.textContent = word.slice(0, charIndex);

  let delay = deleting ? 40 : 90;

  if (!deleting && charIndex === word.length) {
    delay = 2000;
    deleting = true;
  } else if (deleting && charIndex === 0) {
    deleting = false;
    roleIndex = (roleIndex + 1) % roles.length;
    delay = 400;
  } else {
    charIndex += deleting ? -1 : 1;
  }

  setTimeout(typeLoop, delay);
}
typeLoop();

const scrollProgress = document.getElementById("scrollProgress");
const navbar = document.getElementById("navbar");
const backToTop = document.getElementById("backToTop");

const navLinks = document.querySelectorAll(".nav-link");
const sectionIds = [...navLinks].map((link) => link.getAttribute("href").slice(1));
const sections = sectionIds.map((id) => document.getElementById(id));

function onScroll() {
  const doc = document.documentElement;
  const scrolled = doc.scrollTop / (doc.scrollHeight - doc.clientHeight || 1);
  scrollProgress.style.width = scrolled * 100 + "%";

  navbar.classList.toggle("scrolled", window.scrollY > 40);
  backToTop.classList.toggle("show", window.scrollY > 600);

  let currentId = sectionIds[0];
  sections.forEach((section, index) => {
    if (window.scrollY >= section.offsetTop - 160) {
      currentId = sectionIds[index];
    }
  });

  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 60) {
    currentId = sectionIds[sectionIds.length - 1];
  }

  navLinks.forEach((link) =>
    link.classList.toggle("active", link.getAttribute("href") === "#" + currentId)
  );
}

window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

backToTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

const menuToggle = document.getElementById("menuToggle");
const navClose = document.getElementById("navClose");
const navMenu = document.getElementById("nav-menu");

menuToggle.addEventListener("click", () => navMenu.classList.add("open"));
navClose.addEventListener("click", () => navMenu.classList.remove("open"));
navLinks.forEach((link) =>
  link.addEventListener("click", () => navMenu.classList.remove("open"))
);

const intersectObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        intersectObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
);

document.querySelectorAll(".reveal").forEach((el) => {
  if (el.dataset.delay) {
    el.style.transitionDelay = el.dataset.delay + "ms";
  }
  intersectObserver.observe(el);
});

const filterButtons = document.querySelectorAll(".filter-btn");
const works = document.querySelectorAll(".work");

filterButtons.forEach((btn) =>
  btn.addEventListener("click", () => {
    filterButtons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");

    const category = btn.dataset.filter;
    works.forEach((work) => {
      const show = category === "all" || work.dataset.category === category;
      work.classList.toggle("hide", !show);
    });
  })
);

const cursorGlow = document.getElementById("cursorGlow");

if (window.matchMedia("(pointer: fine)").matches) {
  let targetX = window.innerWidth / 2;
  let targetY = window.innerHeight / 2;
  let currentX = targetX;
  let currentY = targetY;

  window.addEventListener("mousemove", (e) => {
    targetX = e.clientX;
    targetY = e.clientY;
  });

  (function animateGlow() {
    currentX += (targetX - currentX) * 0.12;
    currentY += (targetY - currentY) * 0.12;
    cursorGlow.style.transform = `translate(${currentX - 250}px, ${currentY - 250}px)`;
    requestAnimationFrame(animateGlow);
  })();
} else {
  cursorGlow.style.display = "none";
}

const contactForm = document.getElementById("contact-form");
const toast = document.getElementById("toast");
let toastTimer;

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 3500);
}

if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = contactForm.Name.value.trim();
    const email = contactForm.Email.value.trim();
    const message = contactForm.Message.value.trim();

    const subject = encodeURIComponent("Portfolio message from " + name);
    const body = encodeURIComponent(message + "\n\nFrom: " + email);
    window.location.href = "mailto:prithiafrose@gmail.com?subject=" + subject + "&body=" + body;

    showToast("Opening your email app…");
    contactForm.reset();
  });
}