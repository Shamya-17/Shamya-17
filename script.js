const root = document.documentElement;
const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;

/* Theme: remembers choice, otherwise follows the device setting */
let saved = null;
try { saved = localStorage.getItem("theme"); } catch (e) {}
root.dataset.theme = saved || (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
document.getElementById("theme").addEventListener("click", () => {
  root.dataset.theme = root.dataset.theme === "dark" ? "light" : "dark";
  try { localStorage.setItem("theme", root.dataset.theme); } catch (e) {}
});

/* Mobile menu */
const menu = document.getElementById("menu");
const burger = document.getElementById("burger");
burger.addEventListener("click", () => {
  burger.setAttribute("aria-expanded", menu.classList.toggle("open"));
});
menu.addEventListener("click", () => { menu.classList.remove("open"); burger.setAttribute("aria-expanded", "false"); });

/* Highlight the nav link for the section in view */
const links = [...menu.querySelectorAll("a")];
const io = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) links.forEach(a => a.classList.toggle("active", a.getAttribute("href") === "#" + e.target.id));
  });
}, { rootMargin: "-45% 0px -50% 0px" });
document.querySelectorAll("section[id]").forEach(s => io.observe(s));

document.getElementById("year").textContent = new Date().getFullYear();

/* Hero: a dot grid that bends away from the cursor */
const canvas = document.getElementById("grid");
const ctx = canvas.getContext("2d");
const GAP = 30, RADIUS = 130;
let w, h, dpr, dots = [], mouse = { x: -999, y: -999 };

function resize() {
  dpr = window.devicePixelRatio || 1;
  w = canvas.clientWidth; h = canvas.clientHeight;
  canvas.width = w * dpr; canvas.height = h * dpr;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  dots = [];
  for (let x = GAP / 2; x < w; x += GAP)
    for (let y = GAP / 2; y < h; y += GAP) dots.push({ x, y });
  draw();
}

function draw() {
  const css = getComputedStyle(root);
  const base = css.getPropertyValue("--line").trim();
  const accent = css.getPropertyValue("--accent").trim();
  ctx.clearRect(0, 0, w, h);
  for (const d of dots) {
    const dx = d.x - mouse.x, dy = d.y - mouse.y, dist = Math.hypot(dx, dy);
    const near = Math.max(0, 1 - dist / RADIUS);
    const push = near * near * 22;
    const px = d.x + (dist ? (dx / dist) * push : 0);
    const py = d.y + (dist ? (dy / dist) * push : 0);
    ctx.beginPath();
    ctx.arc(px, py, 1.6 + near * 2.6, 0, Math.PI * 2);
    ctx.fillStyle = near > 0.05 ? accent : base;
    ctx.fill();
  }
}

if (!reduced) {
  const hero = canvas.parentElement;
  hero.addEventListener("pointermove", e => {
    const r = canvas.getBoundingClientRect();
    mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top;
    requestAnimationFrame(draw);
  });
  hero.addEventListener("pointerleave", () => { mouse.x = mouse.y = -999; requestAnimationFrame(draw); });
}
window.addEventListener("resize", resize);
new MutationObserver(draw).observe(root, { attributes: true, attributeFilter: ["data-theme"] });
resize();
