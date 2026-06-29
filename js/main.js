/* ============================================================
   Alissa Zhu Portfolio — interactions
   ============================================================ */
(function () {
  "use strict";

  const PAGE = (n) => `assets/pages/page-${String(n).padStart(2, "0")}.jpg`;

  /* ---- Gallery content ---- */
  const GALLERIES = {
    unlaces: [
      { n: 30, title: "She Unlaces", sub: "Reborn femininity · Couture", span: "full" },
      { n: 31, title: "Moodboard", sub: "Victorian spirit photography" },
      { n: 32, title: "Visual Research", sub: "Colorboard & undergarments" },
      { n: 33, title: "Textile Development", sub: "Smocking · Fringe · Digital print" },
      { n: 34, title: "Design Process", sub: "Collage · Draping · Subtraction cutting" },
      { n: 35, title: "Design Process", sub: "Silhouette sketches" },
      { n: 36, title: "Collection Lineup", sub: "Unlacing — ten looks", span: "full" },
      { n: 37, title: "Look 1", sub: "Illustration · Flats · Fitting" },
      { n: 38, title: "Look 2", sub: "Illustration · Flats · Draping" },
      { n: 39, title: "Look 3", sub: "Illustration · Flats · Corset & veil" },
      { n: 40, title: "Look 4", sub: "Illustration · Flats · Fitting" },
      { n: 41, title: "Look 5", sub: "Illustration · Flats · Bodysuit" },
      { n: 42, title: "Look 6", sub: "Illustration · Flats · Fitting" },
    ],
    technical: [
      { n: 2, title: "Floats", sub: "Illustration · Flats · CLO 3D", span: "full" },
      { n: 3, title: "Hooded Draping", sub: "Illustration · Flats" },
      { n: 4, title: "Structured Blouse", sub: "Illustration · Flats" },
      { n: 5, title: "Twisted Bodice", sub: "Illustration · Flats · Inspiration" },
      { n: 6, title: "Cocoon Drape", sub: "Illustration · Flats" },
      { n: 7, title: "Asymmetric Sash", sub: "Illustration · Flats" },
      { n: 8, title: "Flow", sub: "Self-authored narrative", span: "full" },
    ],
    invisible: [
      { n: 9,  title: "Invisible Space", sub: "Concept & Collage", span: "full" },
      { n: 10, title: "Research", sub: "Housing & living area data" },
      { n: 11, title: "Development", sub: "Confined-space experiment" },
      { n: 12, title: "Draping Experiments", sub: "Negative cutting" },
      { n: 13, title: "Development", sub: "Silhouette sketches" },
      { n: 14, title: "Textile & Colorboard", sub: "Woven fabric study" },
      { n: 15, title: "Line-up & Fitting", sub: "Three looks", span: "full" },
      { n: 16, title: "Shooting", sub: "Lookbook" },
      { n: 17, title: "Shooting", sub: "Lookbook" },
      { n: 18, title: "Shooting", sub: "Lookbook" },
      { n: 19, title: "Shooting", sub: "Lookbook" },
    ],
    witches: [
      { n: 20, title: "Night Witches", sub: "Concept & Collage", span: "full" },
      { n: 21, title: "Research", sub: "WWII aviators" },
      { n: 22, title: "Development", sub: "Pattern study" },
      { n: 23, title: "Development", sub: "Calico prototypes" },
      { n: 24, title: "Development & Fitting", sub: "Three looks" },
      { n: 25, title: "Textile & Colorboard", sub: "Rust dye & aging" },
      { n: 26, title: "Sketches & Line-up", sub: "Final collection", span: "full" },
      { n: 27, title: "Shooting", sub: "Lookbook" },
      { n: 28, title: "Shooting", sub: "Lookbook" },
      { n: 29, title: "Shooting", sub: "Lookbook" },
    ],
  };

  /* Flat ordered list for lightbox navigation */
  const FLAT = [];

  /* ---- Build galleries ---- */
  Object.keys(GALLERIES).forEach((key) => {
    const wrap = document.querySelector(`[data-gallery="${key}"]`);
    if (!wrap) return;
    GALLERIES[key].forEach((item) => {
      const idx = FLAT.length;
      FLAT.push(item);

      const fig = document.createElement("figure");
      fig.className = "gallery__item" + (item.span === "full" ? " gallery__item--full" : "");
      fig.setAttribute("tabindex", "0");
      fig.setAttribute("role", "button");
      fig.setAttribute("aria-label", `${item.title} — open larger view`);
      fig.dataset.index = idx;

      fig.innerHTML = `
        <img src="${PAGE(item.n)}" alt="${item.title} — ${item.sub}" loading="lazy" decoding="async" />
        <span class="gallery__zoom" aria-hidden="true">⤢</span>
        <figcaption class="gallery__meta">
          <span class="gallery__meta-title">${item.title}</span><br />
          <span class="gallery__meta-sub">${item.sub}</span>
        </figcaption>`;

      fig.addEventListener("click", () => openLightbox(idx));
      fig.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") { e.preventDefault(); openLightbox(idx); }
      });
      wrap.appendChild(fig);
    });
  });

  /* ---- Reveal on scroll ---- */
  const io = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (en.isIntersecting) { en.target.classList.add("is-in"); io.unobserve(en.target); }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });

  document.querySelectorAll(".reveal, .gallery__item").forEach((el) => io.observe(el));

  /* ---- Nav scroll state + progress + active section ---- */
  const nav = document.getElementById("nav");
  const progress = document.getElementById("scrollProgress");
  const sections = ["unlaces", "technical", "invisible", "witches", "contact"]
    .map((id) => document.getElementById(id)).filter(Boolean);
  const links = Array.from(document.querySelectorAll(".nav__links a"));

  function onScroll() {
    const y = window.scrollY;
    nav.classList.toggle("nav--scrolled", y > window.innerHeight * 0.75);

    const h = document.documentElement.scrollHeight - window.innerHeight;
    progress.style.width = (h > 0 ? (y / h) * 100 : 0) + "%";

    let current = "";
    sections.forEach((s) => { if (y >= s.offsetTop - 200) current = s.id; });
    links.forEach((a) => a.classList.toggle("is-active", a.getAttribute("href") === `#${current}`));
  }
  let ticking = false;
  window.addEventListener("scroll", () => {
    if (!ticking) { requestAnimationFrame(() => { onScroll(); ticking = false; }); ticking = true; }
  }, { passive: true });
  onScroll();

  /* ---- Hero parallax ---- */
  const heroMedia = document.getElementById("heroMedia");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (heroMedia && !reduceMotion) {
    window.addEventListener("scroll", () => {
      const y = window.scrollY;
      if (y < window.innerHeight) heroMedia.style.transform = `translateY(${y * 0.28}px)`;
    }, { passive: true });
  }

  /* ---- Mobile menu ---- */
  const toggle = document.getElementById("navToggle");
  toggle.addEventListener("click", () => {
    const open = document.body.classList.toggle("menu-open");
    toggle.setAttribute("aria-expanded", open);
  });
  document.querySelectorAll(".nav__links a").forEach((a) =>
    a.addEventListener("click", () => {
      document.body.classList.remove("menu-open");
      toggle.setAttribute("aria-expanded", "false");
    })
  );

  /* ---- Lightbox ---- */
  const lb = document.getElementById("lightbox");
  const lbImg = document.getElementById("lbImg");
  const lbCap = document.getElementById("lbCaption");
  let current = 0;

  function render() {
    const item = FLAT[current];
    lbImg.src = PAGE(item.n);
    lbImg.alt = `${item.title} — ${item.sub}`;
    lbCap.textContent = `${item.title} · ${item.sub} — ${current + 1} / ${FLAT.length}`;
  }
  function openLightbox(i) {
    current = i; render();
    lb.classList.add("is-open"); lb.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }
  function closeLightbox() {
    lb.classList.remove("is-open"); lb.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }
  const step = (d) => { current = (current + d + FLAT.length) % FLAT.length; render(); };

  document.getElementById("lbClose").addEventListener("click", closeLightbox);
  document.getElementById("lbPrev").addEventListener("click", () => step(-1));
  document.getElementById("lbNext").addEventListener("click", () => step(1));
  lb.addEventListener("click", (e) => { if (e.target === lb) closeLightbox(); });
  document.addEventListener("keydown", (e) => {
    if (!lb.classList.contains("is-open")) return;
    if (e.key === "Escape") closeLightbox();
    else if (e.key === "ArrowRight") step(1);
    else if (e.key === "ArrowLeft") step(-1);
  });

  /* swipe on touch */
  let touchX = null;
  lb.addEventListener("touchstart", (e) => { touchX = e.touches[0].clientX; }, { passive: true });
  lb.addEventListener("touchend", (e) => {
    if (touchX === null) return;
    const dx = e.changedTouches[0].clientX - touchX;
    if (Math.abs(dx) > 50) step(dx < 0 ? 1 : -1);
    touchX = null;
  }, { passive: true });

  /* ---- Year ---- */
  document.getElementById("year").textContent = new Date().getFullYear();
})();
