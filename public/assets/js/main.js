{
  const y = document.getElementById("year");
  if (y) y.textContent = String(new Date().getFullYear());
}

const root = document.documentElement;
const themeBtns = document.getElementsByClassName("theme-toggle");
const THEME_KEY = "theme";

const COLOR_SCHEMES = {
  main: "main",
  link: "link",
  wario: "wario",
  omen: "omen",
};

function getCurrentTheme() {
  try {
    return localStorage.getItem(THEME_KEY) || "main";
  } catch {
    return "main";
  }
}

function setTheme(theme) {
  const html = document.documentElement;
  
  html.classList.add("theme-changing");
  
  html.setAttribute("data-theme", theme);
  html.style.colorScheme = COLOR_SCHEMES[theme] || "dark";
  
  try {
    localStorage.setItem(THEME_KEY, theme);
  } catch {}
  
  requestAnimationFrame(() => html.classList.remove("theme-changing"));
}

setTheme(
  (() => {
    try {
      return localStorage.getItem(THEME_KEY) || "main";
    } catch {
      return "main";
    }
  })()
);

Array.from(themeBtns).forEach((btn) => {
  btn.addEventListener("click", () => {
    const theme = btn.dataset.themeName || "main";
    applyThemeWithWipe(theme);
  });
});

function applyThemeWithWipe(nextTheme, opts = {}) {
  const { direction = "ltr" } = opts;
  
  if (getCurrentTheme() === nextTheme) {
    return;
  }
  
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    setTheme(nextTheme);
    return;
  }
  
  if (document.querySelector(".theme-wipe")) return;
  
  const vars = readThemeVars(nextTheme, ["--bg", "--bg-offset", "--wipe-bg-url", "--wipe-gradient"]);
  
  const wipe = document.createElement("div");
  wipe.className = "theme-wipe";
  wipe.style.setProperty("--bg", vars["--bg"] || "");
  wipe.style.setProperty("--bg-offset", vars["--bg-offset"] || "");

  const background = document.createElement("div");
  background.className = "theme-wipe-background";
  
  const wipeBackgroundContent = document.createElement("div");
  wipeBackgroundContent.className = "wipe-mark";

  wipeBackgroundContent.style.setProperty("background", vars["--wipe-gradient"] || "");
  wipeBackgroundContent.style.setProperty("--webkit-mask-image", vars["--wipe-bg-url"] || "");
  wipeBackgroundContent.style.setProperty("mask-image", vars["--wipe-bg-url"] || "");

  background.appendChild(wipeBackgroundContent);
  wipe.appendChild(background);

  if (direction === "rtl") wipe.setAttribute("data-dir", "rtl");
  document.body.appendChild(wipe);
  
  onAnimationEnd(wipe)
  .then(() => {
    setTheme(nextTheme);
    
    wipe.classList.add("is-leaving");
    return onAnimationEnd(wipe);
  })
  .then(() => {
    wipe.remove();
  })
  .catch(() => {
    setTheme(nextTheme);
    wipe.remove();
  });

  document.focus();
}

function onAnimationEnd(el) {
  return new Promise((resolve) => {
    const done = () => {
      el.removeEventListener("animationend", done);
      resolve();
    };
    el.addEventListener("animationend", done, { once: true });
  });
}

function readThemeVars(themeName, keys) {
  const html = document.documentElement;
  const prevTheme = html.getAttribute("data-theme");
  
  html.setAttribute("data-theme", themeName);
  const cs = getComputedStyle(html);
  const out = {};
  keys.forEach((k) => {
    out[k] = cs.getPropertyValue(k).trim();
  });
  
  html.setAttribute("data-theme", prevTheme || "");
  
  return out;
}

const ROTATE_WORDS = [
  "Alesson",
  "Aneccoh",
  "Alessera",
  "Canela",
  "Marques",
  "Knella",
  "A lesson",
  "Alessaum",
  "Awlessome",
];

function startBrandRotator({
  selector = ".brand",
  words = ROTATE_WORDS,
  interval = 2200,
  pauseOnHover = true,
  respectVisibility = true,
  immediate = true,
} = {}) {
  const el = document.querySelector(selector);
  if (!el || !Array.isArray(words) || words.length === 0) return;
  
  if (el.__rotateCancel) el.__rotateCancel();
  
  let idx = 0;
  const current = (el.textContent || "").trim();
  const found = words.indexOf(current);
  if (found >= 0) {
    idx = found;
  } else {
    el.textContent = words[0];
    idx = 0;
  }
  
  let timer = null;
  let cancelled = false;
  
  const swap = (txt) => {
    try {
      if (typeof animateTextSwap === "function") {
        animateTextSwap(el, txt);
      } else {
        el.textContent = txt;
      }
    } catch {
      el.textContent = txt;
    }
  };
  
  const clearTimer = () => {
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
  };
  
  const schedule = (delay = interval) => {
    if (cancelled) return;
    clearTimer();
    timer = setTimeout(() => {
      if (cancelled) return;
      idx = (idx + 1) % words.length;
      swap(words[idx]);
      schedule(interval);
    }, delay);
  };
  
  const onVis = () => {
    if (!respectVisibility) return;
    if (document.hidden) {
      clearTimer();
    } else if (!cancelled) {
      schedule();
    }
  };
  
  let onEnter, onLeave;
  if (pauseOnHover) {
    onEnter = () => {
      clearTimer();
    };
    onLeave = () => {
      if (!cancelled) schedule();
    };
    el.addEventListener("mouseenter", onEnter);
    el.addEventListener("mouseleave", onLeave);
  }
  
  if (respectVisibility) document.addEventListener("visibilitychange", onVis);
  
  schedule(immediate ? 120 : interval);
  
  el.__rotateCancel = () => {
    cancelled = true;
    clearTimer();
    if (respectVisibility)
      document.removeEventListener("visibilitychange", onVis);
    if (pauseOnHover) {
      el.removeEventListener("mouseenter", onEnter);
      el.removeEventListener("mouseleave", onLeave);
    }
  };
}

(function initBrandRotatorWhenReady() {
  const start = () => startBrandRotator();
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start, { once: true });
  } else {
    start();
  }
})();
