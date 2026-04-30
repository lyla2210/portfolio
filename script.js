const projects = {
  aurora: {
    kicker: "App Experience · 2026",
    title: "Aurora Wellness",
    intro: "以清晨光感、轻盈卡片和柔和动效构建的健康管理应用，让记录、提醒和复盘都更安静自然。",
    description:
      "项目聚焦于低压力健康记录体验：通过浅色渐变建立情绪基调，用卡片化信息分层降低阅读负担，并为关键数据设计了可横向浏览的视觉摘要。实际替换作品时，可把 images 数组中的 src 改成你的 jpg、gif 或 png 路径。",
    facts: [
      ["Role", "Product / UI"],
      ["Scope", "Research, UI, Prototype"],
      ["Format", "JPG · GIF · PNG"]
    ],
    images: [
      { caption: "首页情绪面板", bg: "linear-gradient(135deg,#ede9ff,#ffdbe8 54%,#dbfff4)" },
      { caption: "记录流程与微交互", bg: "linear-gradient(135deg,#f7e9ff,#dff7ff 52%,#fff1dc)" },
      { caption: "数据复盘卡片", bg: "linear-gradient(135deg,#e4fff6,#f0ecff 50%,#ffdce9)" }
    ]
  },
  mellow: {
    kicker: "Identity System · 2025",
    title: "Mellow Studio",
    intro: "为生活方式工作室设计的品牌识别系统，强调松弛、温度、自然纹理和多场景延展。",
    description:
      "视觉语言以米白、奶油橙和淡粉为基础，结合圆角图形、低对比摄影和柔和版式。详情弹窗中的预览框适合放置品牌海报、空间照片、动效 gif 和社媒应用图。",
    facts: [
      ["Role", "Brand Designer"],
      ["Scope", "Logo, Visual, Social"],
      ["Mood", "Warm · Calm"]
    ],
    images: [
      { caption: "品牌主视觉", bg: "linear-gradient(135deg,#fff0d9,#ffe0ef 48%,#e8edff)" },
      { caption: "社媒版式系统", bg: "linear-gradient(135deg,#fff7df,#f0e6ff 46%,#dff8ff)" },
      { caption: "空间导视延展", bg: "linear-gradient(135deg,#ffe3d5,#fff4c7 52%,#e8f0ff)" }
    ]
  },
  lumen: {
    kicker: "Responsive Website · 2024",
    title: "Lumen Gallery",
    intro: "一个为艺术展览设计的响应式官网，使用流动网格、横向作品叙事和轻量动效组织内容。",
    description:
      "网站围绕展览浏览路径展开：首屏建立氛围，项目页通过可拖拽横向画廊呈现作品，再以清晰文字介绍策展概念、艺术家信息和参观方式。",
    facts: [
      ["Role", "Web / Front-end"],
      ["Scope", "UI, Motion, Build"],
      ["Device", "Desktop · Mobile"]
    ],
    images: [
      { caption: "展览首页", bg: "linear-gradient(135deg,#def7ff,#f1e9ff 48%,#fff3d7)" },
      { caption: "横向作品浏览", bg: "linear-gradient(135deg,#e5edff,#fff0f7 50%,#e2fff3)" },
      { caption: "移动端参观信息", bg: "linear-gradient(135deg,#f2e9ff,#ddf9ff 48%,#fff1d8)" }
    ]
  }
};

const modal = document.querySelector("#projectModal");
const rail = document.querySelector("#previewRail");
const title = document.querySelector("#modalTitle");
const kicker = document.querySelector("#modalKicker");
const intro = document.querySelector("#modalIntro");
const description = document.querySelector("#modalDescription");
const facts = document.querySelector("#modalFacts");
const prev = document.querySelector("#prevPreview");
const next = document.querySelector("#nextPreview");
let lastFocused = null;

function openProject(id) {
  const project = projects[id];
  if (!project) return;

  lastFocused = document.activeElement;
  kicker.textContent = project.kicker;
  title.textContent = project.title;
  intro.textContent = project.intro;
  description.textContent = project.description;
  facts.innerHTML = project.facts
    .map(([term, value]) => `<div><dt>${term}</dt><dd>${value}</dd></div>`)
    .join("");

  rail.innerHTML = project.images
    .map((image, index) => {
      const imageTag = image.src
        ? `<img src="${image.src}" alt="${project.title} 预览 ${index + 1}" />`
        : `<div class="placeholder-art" aria-hidden="true"></div>`;
      return `
        <figure class="preview-item" style="--preview-bg:${image.bg}">
          ${imageTag}
          <figcaption class="preview-caption">${String(index + 1).padStart(2, "0")} · ${image.caption}</figcaption>
        </figure>
      `;
    })
    .join("");

  rail.scrollLeft = 0;
  modal.classList.add("is-open");
  modal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
  title.focus?.();
}

function closeProject() {
  modal.classList.remove("is-open");
  modal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
  lastFocused?.focus?.();
}

function scrollPreview(direction) {
  rail.scrollBy({ left: direction * Math.max(320, rail.clientWidth * 0.72), behavior: "smooth" });
}

document.querySelectorAll(".project-card").forEach((card) => {
  card.addEventListener("click", () => openProject(card.dataset.project));
  card.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openProject(card.dataset.project);
    }
  });
});

document.querySelectorAll("[data-close]").forEach((item) => item.addEventListener("click", closeProject));
prev.addEventListener("click", () => scrollPreview(-1));
next.addEventListener("click", () => scrollPreview(1));

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && modal.classList.contains("is-open")) closeProject();
});

rail.addEventListener(
  "wheel",
  (event) => {
    if (Math.abs(event.deltaY) > Math.abs(event.deltaX)) {
      event.preventDefault();
      rail.scrollLeft += event.deltaY;
    }
  },
  { passive: false }
);

let isDragging = false;
let dragStartX = 0;
let scrollStart = 0;

rail.addEventListener("pointerdown", (event) => {
  isDragging = true;
  dragStartX = event.clientX;
  scrollStart = rail.scrollLeft;
  rail.setPointerCapture(event.pointerId);
});

rail.addEventListener("pointermove", (event) => {
  if (!isDragging) return;
  rail.scrollLeft = scrollStart - (event.clientX - dragStartX);
});

function stopDragging() {
  isDragging = false;
}

rail.addEventListener("pointerup", stopDragging);
rail.addEventListener("pointercancel", stopDragging);
rail.addEventListener("pointerleave", stopDragging);
