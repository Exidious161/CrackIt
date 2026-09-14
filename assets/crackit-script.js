// ===== CrackIt site interactions =====

// --- Launch banner: click-to-copy discount code ---
const launchCode = document.getElementById("launchCode");
const copiedMsg = document.getElementById("copiedMsg");
if (launchCode && copiedMsg) {
  launchCode.addEventListener("click", () => {
    const code = launchCode.dataset.code;
    const showCopied = () => {
      copiedMsg.classList.add("show");
      setTimeout(() => copiedMsg.classList.remove("show"), 1800);
    };
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(code).then(showCopied).catch(showCopied);
    } else {
      showCopied();
    }
  });
}

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

// --- Company logo marquee ---
const COMPANIES = [
  "TCS","Infosys","Wipro","Capgemini","Accenture","Cognizant","HCL Technologies",
  "Tech Mahindra","IBM","LTIMindtree","Deloitte","Genpact","Zoho","Oracle",
  "Mphasis","Hexaware","Persistent Systems","Amazon","Publicis Sapient",
  "EPAM Systems","Virtusa","NTT Data","Zensar Technologies"
];
const logosScroll = document.getElementById("logosScroll");
if (logosScroll) {
  const chips = COMPANIES.map(c => `<span class="logo-chip">${c}</span>`).join("");
  // duplicate the list once so the CSS translateX(-50%) loop is seamless
  logosScroll.innerHTML = chips + chips;
}

// --- Scroll progress bar ---
const progressBar = document.getElementById("progressBar");
function onScroll() {
  if (progressBar) {
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? (window.scrollY / docHeight) * 100 : 0;
    progressBar.style.width = pct + "%";
  }
}
document.addEventListener("scroll", onScroll, { passive: true });
onScroll();

// --- Nav: compact + hide-on-scroll-down, show-on-scroll-up ---
const navEl = document.getElementById("nav");
let lastScrollY = window.scrollY;
function onNavScroll() {
  if (!navEl) return;
  const y = window.scrollY;
  navEl.classList.toggle("nav-compact", y > 40);
  const menuOpen = document.getElementById("navLinks")?.classList.contains("open");
  if (!menuOpen && y > lastScrollY && y > 160) navEl.classList.add("nav-hidden");
  else navEl.classList.remove("nav-hidden");
  lastScrollY = y;
}
document.addEventListener("scroll", onNavScroll, { passive: true });
onNavScroll();

// --- Mobile nav toggle ---
const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");
if (navToggle && navLinks) {
  navToggle.addEventListener("click", () => navLinks.classList.toggle("open"));
  navLinks.querySelectorAll("a").forEach(a =>
    a.addEventListener("click", () => navLinks.classList.remove("open"))
  );
}

// --- "How It Works" story-style scrubber ---
const howPanels = document.querySelectorAll(".how-panel");
const scrubSegs = document.querySelectorAll(".scrub-seg");
const scrubPlay = document.getElementById("scrubPlay");
if (howPanels.length && scrubSegs.length) {
  const STEP_MS = 4500;
  let current = 0;
  let playing = true;
  let segStart = null;
  let rafId = null;

  function setStep(i) {
    current = (i + howPanels.length) % howPanels.length;
    howPanels.forEach(p => p.classList.toggle("active", Number(p.dataset.step) === current));
    scrubSegs.forEach((seg, idx) => {
      seg.classList.remove("active", "done");
      const fill = seg.querySelector(".scrub-fill");
      fill.style.transition = "none";
      if (idx < current) { seg.classList.add("done"); fill.style.width = "100%"; }
      else if (idx === current) { fill.style.width = "0%"; }
      else { fill.style.width = "0%"; }
    });
    segStart = null;
  }

  function tick(now) {
    if (!playing) return;
    if (segStart === null) segStart = now;
    const elapsed = now - segStart;
    const seg = scrubSegs[current];
    seg.classList.add("active");
    const fill = seg.querySelector(".scrub-fill");
    fill.style.transition = "none";
    fill.style.width = Math.min((elapsed / STEP_MS) * 100, 100) + "%";
    if (elapsed >= STEP_MS) {
      setStep(current + 1);
    }
    rafId = requestAnimationFrame(tick);
  }

  function play() {
    playing = true;
    scrubPlay.textContent = "❚❚";
    scrubPlay.setAttribute("aria-label", "Pause");
    segStart = null;
    cancelAnimationFrame(rafId);
    rafId = requestAnimationFrame(tick);
  }
  function pause() {
    playing = false;
    scrubPlay.textContent = "▶";
    scrubPlay.setAttribute("aria-label", "Play");
    cancelAnimationFrame(rafId);
  }

  scrubPlay.addEventListener("click", () => (playing ? pause() : play()));
  scrubSegs.forEach((seg, idx) => {
    seg.addEventListener("click", () => { setStep(idx); if (playing) { cancelAnimationFrame(rafId); rafId = requestAnimationFrame(tick); } });
  });

  setStep(0);
  const howObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && playing) { segStart = null; cancelAnimationFrame(rafId); rafId = requestAnimationFrame(tick); }
      else if (!entry.isIntersecting) { cancelAnimationFrame(rafId); }
    });
  }, { threshold: 0.4 });
  howObserver.observe(document.getElementById("howVisual"));
}

// --- Reveal-on-scroll (IntersectionObserver) ---
const revealEls = document.querySelectorAll(".reveal");
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("in-view");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });
revealEls.forEach(el => revealObserver.observe(el));

// --- Animated stat counters (trigger once hero stats are visible) ---
const statNums = document.querySelectorAll(".stat-num");
function animateCount(el) {
  const target = parseInt(el.dataset.count, 10) || 0;
  const duration = 1400;
  const start = performance.now();
  function tick(now) {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.round(eased * target);
    if (progress < 1) requestAnimationFrame(tick);
    else el.textContent = target;
  }
  requestAnimationFrame(tick);
}
if (statNums.length) {
  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        statNums.forEach(animateCount);
        statsObserver.disconnect();
      }
    });
  }, { threshold: 0.4 });
  statsObserver.observe(document.querySelector(".hero-stats"));
}

// --- What's Inside tabs ---
const tabButtons = document.querySelectorAll(".tab-btn");
const tabPanels = document.querySelectorAll(".tab-panel");
tabButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    tabButtons.forEach(b => b.classList.remove("active"));
    tabPanels.forEach(p => p.classList.remove("active"));
    btn.classList.add("active");
    document.getElementById("tab-" + btn.dataset.tab).classList.add("active");
  });
});

// --- FAQ accordion ---
document.querySelectorAll(".faq-item").forEach(item => {
  const q = item.querySelector(".faq-q");
  const a = item.querySelector(".faq-a");
  q.addEventListener("click", () => {
    const isOpen = item.classList.contains("open");
    document.querySelectorAll(".faq-item.open").forEach(other => {
      if (other !== item) {
        other.classList.remove("open");
        other.querySelector(".faq-a").style.maxHeight = null;
      }
    });
    item.classList.toggle("open", !isOpen);
    a.style.maxHeight = !isOpen ? a.scrollHeight + "px" : null;
  });
});

// --- Hero cursor glow + mascot tilt ---
if (!prefersReducedMotion && canHover) {
  const heroSection = document.querySelector(".hero");
  const cursorGlow = document.querySelector(".cursor-glow");
  const mascotWrap = document.querySelector(".mascot-wrap");
  if (heroSection) {
    heroSection.addEventListener("mousemove", (e) => {
      const rect = heroSection.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      if (cursorGlow) {
        cursorGlow.style.left = x + "px";
        cursorGlow.style.top = y + "px";
      }
      if (mascotWrap) {
        const px = x / rect.width - 0.5;
        const py = y / rect.height - 0.5;
        mascotWrap.style.transform = `perspective(700px) rotateY(${px * 10}deg) rotateX(${-py * 10}deg)`;
      }
    });
    heroSection.addEventListener("mouseleave", () => {
      if (mascotWrap) mascotWrap.style.transform = "";
    });
  }
}

// --- Pricing card 3D tilt + shine ---
document.querySelectorAll(".price-card").forEach(card => {
  const shine = document.createElement("div");
  shine.className = "price-card-shine";
  card.appendChild(shine);
  if (prefersReducedMotion || !canHover) return;
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const px = x / rect.width - 0.5;
    const py = y / rect.height - 0.5;
    card.style.transform = `perspective(900px) rotateX(${-py * 6}deg) rotateY(${px * 6}deg) translateY(-4px)`;
    shine.style.setProperty("--mx", `${(x / rect.width) * 100}%`);
    shine.style.setProperty("--my", `${(y / rect.height) * 100}%`);
  });
  card.addEventListener("mouseleave", () => { card.style.transform = ""; });
});

// --- Button ripple ---
document.querySelectorAll(".btn").forEach(btn => {
  btn.addEventListener("click", (e) => {
    if (prefersReducedMotion) return;
    const rect = btn.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const ripple = document.createElement("span");
    ripple.className = "ripple";
    ripple.style.width = ripple.style.height = size + "px";
    ripple.style.left = (e.clientX - rect.left - size / 2) + "px";
    ripple.style.top = (e.clientY - rect.top - size / 2) + "px";
    btn.appendChild(ripple);
    ripple.addEventListener("animationend", () => ripple.remove());
  });
});

// --- Back to top ---
const backToTop = document.getElementById("backToTop");
if (backToTop) {
  const toggleBackToTop = () => backToTop.classList.toggle("visible", window.scrollY > 700);
  document.addEventListener("scroll", toggleBackToTop, { passive: true });
  toggleBackToTop();
  backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: prefersReducedMotion ? "auto" : "smooth" });
  });
}

