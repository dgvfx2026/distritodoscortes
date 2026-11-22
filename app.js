const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
const motionPreview = location.hostname === "127.0.0.1" &&
  new URLSearchParams(location.search).get("animacoes") === "1";

if (motionPreview) document.documentElement.classList.add("motion-preview");

if ("IntersectionObserver" in window && (motionPreview || !reducedMotion.matches)) {
  const observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      entry.target.classList.replace("reveal-wait", "reveal-in");
      observer.unobserve(entry.target);
    }
  }, { rootMargin: "0px 0px -32px 0px" });

  const blocks = [...document.querySelectorAll("[data-reveal]")];
  const upcomingBlocks = window.scrollY > 0
    ? blocks.filter(block => block.getBoundingClientRect().bottom > 0)
    : blocks;

  for (const block of upcomingBlocks) {
    block.classList.add("reveal-wait");
    observer.observe(block);
  }
}

const mobilePlans = document.querySelector(".mobile-plans");
const mobileViewport = window.matchMedia("(max-width: 760px)");
const hero = document.querySelector(".hero");
const offer = document.querySelector("#oferta");
let heroEnd = 0;
let offerStart = 0;

function updateMobilePlans() {
  const top = window.scrollY;
  const hidden = !mobileViewport.matches ||
    top < heroEnd ||
    top > offerStart - window.innerHeight;
  if (mobilePlans.hidden !== hidden) mobilePlans.hidden = hidden;
}

function measureMobilePlans() {
  if (mobileViewport.matches) {
    const top = window.scrollY;
    heroEnd = hero.getBoundingClientRect().bottom + top;
    offerStart = offer.getBoundingClientRect().top + top;
  }
  updateMobilePlans();
}

const canObserveSize = "ResizeObserver" in window;
if (canObserveSize) {
  const observer = new ResizeObserver(measureMobilePlans);
  observer.observe(hero);
  observer.observe(document.querySelector("main"));
}
window.addEventListener("scroll", canObserveSize ? updateMobilePlans : measureMobilePlans, { passive: true });
window.addEventListener("resize", measureMobilePlans);
window.addEventListener("pageshow", measureMobilePlans);
measureMobilePlans();

const dialog = document.querySelector(".player");
const video = document.querySelector("#clip-video");
const playerTitle = document.querySelector("#player-title");
const playerCreator = document.querySelector("#player-creator");
const playerCount = document.querySelector("#player-count");
const playerControls = dialog.querySelector(".player-controls");
const playerError = document.querySelector("#player-error");
const playerDownload = document.querySelector("#player-download");
let group = [];
let index = 0;
let opener = null;

function playClip() {
  const clip = group[index];
  const title = clip.querySelector(".clip-title").textContent;
  playerTitle.textContent = title;
  playerCreator.textContent = clip.dataset.creator;
  playerCount.textContent = `${index + 1} de ${group.length}`;
  playerControls.hidden = group.length === 1;
  playerError.hidden = true;
  playerDownload.href = clip.href;
  const poster = clip.querySelector("img");
  video.poster = poster.currentSrc || poster.src;
  video.src = clip.href;
  video.play().catch(() => {
    // Os controles nativos continuam disponíveis caso o navegador bloqueie a reprodução.
  });
}

function stepClip(direction) {
  index = (index + direction + group.length) % group.length;
  playClip();
}

if (typeof dialog.showModal === "function") {
  for (const clip of document.querySelectorAll("[data-clip]")) {
    clip.setAttribute("aria-haspopup", "dialog");

    clip.addEventListener("click", (event) => {
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      group = [...clip.closest("[data-player-group]").querySelectorAll("[data-clip]")];
      index = group.indexOf(clip);
      opener = clip;
      dialog.showModal();
      playClip();
    });
  }

  dialog.querySelector(".player-close").addEventListener("click", () => dialog.close());
  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) dialog.close();
  });
  dialog.addEventListener("close", () => {
    video.pause();
    video.removeAttribute("src");
    video.removeAttribute("poster");
    video.load();
    opener?.focus({ preventScroll: true });
  });

  video.addEventListener("error", () => {
    if (dialog.open && video.hasAttribute("src")) playerError.hidden = false;
  });

  document.querySelector("#prev-clip").addEventListener("click", () => stepClip(-1));
  document.querySelector("#next-clip").addEventListener("click", () => stepClip(1));
}
