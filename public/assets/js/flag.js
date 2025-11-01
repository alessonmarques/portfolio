document.addEventListener('DOMContentLoaded', () => {
  const STORAGE_KEY = 'lang';
  const HTML_ATTR = 'lang';
  const picker = document.querySelector('.lang-fab');
  if (!picker) return;

  const trigger = picker.querySelector('.lf-trigger');
  const options = picker.querySelectorAll('.lf-option');

  function getLang(){
    try { return localStorage.getItem(STORAGE_KEY) } catch(_) {}
    return document.documentElement.getAttribute(HTML_ATTR) || 'pt-BR';
  }
  function setLang(lang){
    if (!lang) return;
    document.documentElement.setAttribute(HTML_ATTR, lang);
    try { localStorage.setItem(STORAGE_KEY, lang) } catch(_) {}
    if (typeof window.applyI18n === 'function') {
      window.applyI18n(document, lang, { animate: true });
    }
    applyHide(lang);
  }
  function applyHide(lang){
    options.forEach(btn=>{
      btn.classList.toggle('hide', btn.getAttribute('data-lang') === lang);
    });
  }
  function openPicker(open){
    picker.setAttribute('aria-expanded', String(!!open));
    trigger.setAttribute('aria-expanded', String(!!open));
  }

  const initial = getLang();
  document.documentElement.setAttribute(HTML_ATTR, initial);
  applyHide(initial);
  openPicker(false);

  trigger.addEventListener('click', (e)=>{
    e.stopPropagation();
    applyHide(getLang());
    openPicker(picker.getAttribute('aria-expanded') !== 'true');
  });
  document.addEventListener('click', ()=> openPicker(false));
  document.addEventListener('keydown', (e)=>{ if(e.key==='Escape') openPicker(false) });

  options.forEach(btn=>{
    btn.addEventListener('click', ()=>{
      const lang = btn.getAttribute('data-lang');
      setLang(lang);
      openPicker(false);
    });
  });

  new MutationObserver(muts=>{
    for(const m of muts){
      if(m.type==='attributes' && m.attributeName===HTML_ATTR){
        applyHide(getLang());
        break;
      }
    }
  }).observe(document.documentElement, { attributes:true, attributeFilter:[HTML_ATTR] });
});