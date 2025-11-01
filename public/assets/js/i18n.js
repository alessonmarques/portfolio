export const I18N = window.I18N;

const PREFERS_REDUCED = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches === true;
const SHUFFLE_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&*+-_=<>/\\';

function animateTextSwap(el, newText, {
  minDuration = 300,
  maxDuration = 600,
  charset = SHUFFLE_CHARS
} = {}) {
  if (PREFERS_REDUCED || el.getAttribute('data-i18n-anim') === 'off') {
    el.textContent = newText;
    return;
  }

  const oldText = el.textContent || '';
  if (oldText === newText) return;

  const length = Math.max(oldText.length, newText.length);
  const start = performance.now();
  const custom = parseInt(el.getAttribute('data-i18n-duration') || '', 10);
  const duration = Number.isFinite(custom)
    ? custom
    : (minDuration + Math.random() * (maxDuration - minDuration)); // <- FIX

  const revealAt = Array.from({ length }, (_, i) =>
    start + (i / Math.max(1, length)) * (duration * 0.5) + Math.random() * (duration * 0.5)
  );

  if (el.__shuffleCancel) el.__shuffleCancel();
  let cancelled = false;
  el.__shuffleCancel = () => { cancelled = true; };

  const step = (t) => {
    if (cancelled) return;

    let done = true;
    let out = '';

    for (let i = 0; i < length; i++) {
      const targetChar = newText[i] ?? '';
      if (t >= revealAt[i]) {
        out += targetChar;
      } else {
        done = false;
        out += (targetChar && /\s/.test(targetChar))
          ? targetChar
          : charset[Math.floor(Math.random() * charset.length)];
      }
    }

    el.textContent = out;

    if (!done) requestAnimationFrame(step);
    else delete el.__shuffleCancel;
  };

  requestAnimationFrame(step);
}

function applyI18n(doc, lang = 'pt-BR', opts = {}) {
  doc.documentElement.lang = lang;

  doc.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    const value = I18N[lang]?.[key];
    if (typeof value !== 'string') return;

    if (el.__shuffleCancel) el.__shuffleCancel();

    if (el.hasAttribute('data-i18n-html')) {
      el.innerHTML = value;
    } else if ((opts?.animate ?? false) === true) {
      animateTextSwap(el, value);
    } else {
      el.textContent = value;
    }
  });

  doc.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    const value = I18N[lang]?.[key];
    if (typeof value === 'string') el.setAttribute('placeholder', value);
  });
}

function getParamLang() {
  const m = location.search.match(/(?:\?|&)lang=([a-zA-Z-]+)/);
  return m ? decodeURIComponent(m[1]) : null;
}
function setParamLang(lang) {
  const url = new URL(location.href);
  url.searchParams.set('lang', lang);
  history.replaceState(null, '', url);
}

const saved = localStorage.getItem('lang');
const fromUrl = getParamLang();
const initial = fromUrl || saved || (navigator.language?.startsWith('pt') ? 'pt-BR' : 'en');

applyI18n(document, initial, { animate: false });
localStorage.setItem('lang', initial);

if (typeof window !== 'undefined') {
  window.applyI18n = applyI18n;
  window.animateTextSwap = animateTextSwap;
}

const $lang = document.getElementById('lang');
if ($lang) {
  if ([...$lang.options].some(o => o.value === initial)) $lang.value = initial;

  $lang.addEventListener('change', (e) => {
    const lang = e.target.value;
    applyI18n(document, lang, { animate: !PREFERS_REDUCED });
    localStorage.setItem('lang', lang);
    setParamLang(lang);
  });
}
