// ano no footer
const y = document.getElementById('year');
if (y) y.textContent = String(new Date().getFullYear());

// toggle de tema simples (dark <-> light)
const root = document.documentElement;
const btn = document.getElementById('theme-toggle');
const THEME_KEY = 'theme';

function setTheme(mode) {
  root.setAttribute('data-theme', mode);
  localStorage.setItem(THEME_KEY, mode);
}

setTheme(localStorage.getItem(THEME_KEY) || 'dark');

btn?.addEventListener('click', () => {
  const current = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  setTheme(current);
});
