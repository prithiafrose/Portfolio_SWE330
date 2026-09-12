const body = document.body;

const themeBtn = document.getElementById("mode-toggle");

function applyThemeIcon() {
  if (!themeBtn) return;
  const isLight = body.classList.contains("light-mode");
  themeBtn.textContent = isLight ? "🌙" : "☀️";
  themeBtn.setAttribute("aria-label", isLight ? "Switch to dark mode" : "Switch to light mode");
}

if (localStorage.getItem("theme") === "light") {
  body.classList.add("light-mode");
}
applyThemeIcon();

themeBtn.addEventListener("click", () => {
  const isLight = body.classList.toggle("light-mode");
  localStorage.setItem("theme", isLight ? "light" : "dark");
  applyThemeIcon();
});

const typedText = document.getElementById("typedText");
const roles = [
  "Software Engineering Student",
  "Aspiring Software Engineer",
  "Web & Mobile App Developer",
  "Game Development Enthusiast",
];
let roleIndex = 0;
let charIndex = 0;
let deleting = false;

function typeLoop() {
  const word = roles[roleIndex];
  typedText.textContent = word.slice(0, charIndex);

  let delay = deleting ? 38 : 88;

  if (!deleting && charIndex === word.length) {
    delay = 2000;
    deleting = true;
  } else if (deleting && charIndex === 0) {
    deleting = false;
    roleIndex = (roleIndex + 1) % roles.length;
    delay = 450;
  } else {
    charIndex += deleting ? -1 : 1;
  }

  setTimeout(typeLoop, delay);
}
typeLoop();

const tabButtons = document.querySelectorAll(".tab-btn");
const timelinePanels = document.querySelectorAll(".timeline-panel");

tabButtons.forEach((btn) =>
  btn.addEventListener("click", () => {
    tabButtons.forEach((b) => {
      b.classList.remove("active");
      b.setAttribute("aria-selected", "false");
    });
    btn.classList.add("active");
    btn.setAttribute("aria-selected", "true");

    timelinePanels.forEach((panel) => {
      panel.hidden = panel.id !== btn.dataset.tab;
    });
  })
);

const scrollProgress = document.getElementById("scrollProgress");
const siteHeader = document.getElementById("siteHeader");
const backToTop = document.getElementById("backToTop");

const navLinks = document.querySelectorAll(".nav-link");
const sectionIds = [...navLinks].map((link) => link.getAttribute("href").slice(1));
const sections = sectionIds.map((id) => document.getElementById(id));

function onScroll() {
  const doc = document.documentElement;
  const scrolled = doc.scrollTop / (doc.scrollHeight - doc.clientHeight || 1);
  scrollProgress.style.width = scrolled * 100 + "%";

  siteHeader.classList.toggle("scrolled", window.scrollY > 30);
  backToTop.classList.toggle("show", window.scrollY > 600);

  let currentId = sectionIds[0];
  sections.forEach((section, index) => {
    if (section && window.scrollY >= section.offsetTop - 170) {
      currentId = sectionIds[index];
    }
  });

  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 80) {
    currentId = sectionIds[sectionIds.length - 1];
  }

  navLinks.forEach((link) => {
    const isActive = link.getAttribute("href") === "#" + currentId;
    link.classList.toggle("active-link", isActive);
    if (isActive) {
      link.setAttribute("aria-current", "true");
    } else {
      link.removeAttribute("aria-current");
    }
  });
}

window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

backToTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

const menuToggle = document.getElementById("menuToggle");
const navClose = document.getElementById("navClose");
const navList = document.getElementById("navList");

function setMenu(open) {
  navList.classList.toggle("open", open);
  body.classList.toggle("nav-open", open);
  menuToggle.setAttribute("aria-expanded", String(open));
}

menuToggle.addEventListener("click", () => setMenu(!navList.classList.contains("open")));
navClose.addEventListener("click", () => setMenu(false));
navLinks.forEach((link) => link.addEventListener("click", () => setMenu(false)));

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && navList.classList.contains("open")) {
    setMenu(false);
    menuToggle.focus();
  }
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12, rootMargin: "0px 0px -48px 0px" }
);

document.querySelectorAll(".reveal").forEach((el) => {
  if (el.dataset.delay) {
    el.style.transitionDelay = el.dataset.delay + "ms";
  }
  revealObserver.observe(el);
});

const filterButtons = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");

filterButtons.forEach((btn) =>
  btn.addEventListener("click", () => {
    filterButtons.forEach((b) => {
      b.classList.remove("active");
      b.setAttribute("aria-pressed", "false");
    });
    btn.classList.add("active");
    btn.setAttribute("aria-pressed", "true");

    const category = btn.dataset.filter;
    projectCards.forEach((card) => {
      const show = category === "all" || card.dataset.category === category;
      card.classList.toggle("hide", !show);
    });
  })
);

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

    if (!contactForm.checkValidity()) {
      contactForm.reportValidity();
      return;
    }

    const name = contactForm.Name.value.trim();
    const email = contactForm.Email.value.trim();
    const message = contactForm.Message.value.trim();

    const subject = encodeURIComponent("Portfolio message from " + name);
    const contactBody = encodeURIComponent(message + "\n\nFrom: " + email);
    window.location.href =
      "mailto:prithiafrose@gmail.com?subject=" + subject + "&body=" + contactBody;

    showToast("Opening your email app…");
    contactForm.reset();
  });
}

const yearEl = document.getElementById("year");
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}