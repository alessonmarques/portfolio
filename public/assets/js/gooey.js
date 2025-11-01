document.addEventListener('DOMContentLoaded', () => {
  const SELECTOR_PICKERS = '.theme-goo-picker .tg-picker';
  const HTML_ATTR = 'data-theme';
  const REDUCED = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches === true;

  const getActiveTheme = () =>
    document.documentElement.getAttribute(HTML_ATTR) || 'main';

  const setActiveTheme = (theme) => {
    if (!theme) return;
    document.documentElement.setAttribute(HTML_ATTR, theme);
  };

  function applyHideForThemeInPicker(picker, theme) {
    const opts = picker.querySelectorAll('.tg-option');
    opts.forEach(btn => {
      const isActive = btn.getAttribute('data-theme-name') === theme;
      if (isActive) {
          btn.classList.add('hide');
      }
    });
  }

  function clearHideInPicker(picker) {
    picker.querySelectorAll('.tg-option.hide').forEach(b => b.classList.remove('hide'));
  }

  function closeAll(except){
    document.querySelectorAll(SELECTOR_PICKERS).forEach(p=>{
      if(p !== except){
        p.setAttribute('aria-expanded','false');
        p.querySelector('.tg-trigger')?.setAttribute('aria-expanded','false');
      }
    });
  }

  function togglePicker(picker){
    const isOpen = picker.getAttribute('aria-expanded') === 'true';
    picker.setAttribute('aria-expanded', String(!isOpen));
    const trigger = picker.querySelector('.tg-trigger');
    if (trigger) {
      trigger.setAttribute('aria-expanded', String(!isOpen));
      if (!REDUCED) {
        trigger.classList.remove('tg-splash');
        void trigger.offsetWidth;
        trigger.classList.add('tg-splash');
      }
    }
  }

  document.querySelectorAll(SELECTOR_PICKERS).forEach(picker => {
    const trigger = picker.querySelector('.tg-trigger');

    trigger?.addEventListener('click', (e) => {
      e.stopPropagation();
      const themeNow = getActiveTheme();
      clearHideInPicker(picker);
      applyHideForThemeInPicker(picker, themeNow);
      closeAll(picker);
      togglePicker(picker);
    });

    picker.querySelectorAll('.tg-option').forEach(btn => {
      btn.addEventListener('click', () => {
        picker.setAttribute('aria-expanded','false');
        trigger?.setAttribute('aria-expanded','false');
      });
    });
  });

  document.addEventListener('click', () => closeAll(null));
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeAll(null); });

  const initialTheme = getActiveTheme();
  document.querySelectorAll(SELECTOR_PICKERS).forEach(p => {
    clearHideInPicker(p);
    applyHideForThemeInPicker(p, initialTheme);
  });
});