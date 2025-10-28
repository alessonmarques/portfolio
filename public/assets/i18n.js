export const I18N = {
  'pt-BR': {
    'a11y.skip': 'Pular para o conteúdo',
    'nav.home': 'Início',
    'nav.about': 'Sobre',
    'ui.toggleTheme': 'Alternar tema',
    'hero.title': 'Oi, eu sou o Alesson.',
    'hero.blurb': 'Construo interfaces e backends simples, rápidos e acessíveis.',
    'cta.about': 'Saiba mais',
    'about.title': 'Sobre mim',
    'about.text': 'Sou dev focado em PHP, JS e dados públicos (Câmara dos Deputados).',
    'about.highlight': 'Destaque recente',
    'about.highlightText': 'Espelho local de dados abertos com cruzamento de gastos parlamentares.',
    'cards.speed.title': 'Rápido por padrão',
    'cards.speed.text': 'HTML limpo, CSS mínimo e zero dependências pesadas.',
    'cards.access.title': 'Acessível',
    'cards.access.text': 'Semântica, contraste alto e navegação por teclado.',
    'contact.title': 'Contato',
    'contact.name': 'Seu nome',
    'contact.email': 'Seu e-mail',
    'contact.msg': 'Mensagem',
    'contact.send': 'Enviar',
    'footer.rights': 'Todos os direitos reservados.'
  },
  'en': {
    'a11y.skip': 'Skip to main content',
    'nav.home': 'Home',
    'nav.about': 'About',
    'ui.toggleTheme': 'Toggle theme',
    'hero.title': "Hey, I'm Alesson.",
    'hero.blurb': 'I build simple, fast and accessible interfaces & backends.',
    'cta.about': 'Learn more',
    'about.title': 'About me',
    'about.text': 'I’m a dev focused on PHP, JS and open data (Brazilian Congress).',
    'about.highlight': 'Recent highlight',
    'about.highlightText': 'Local mirror of open data with parliamentary expenses cross-checks.',
    'cards.speed.title': 'Fast by default',
    'cards.speed.text': 'Clean HTML, tiny CSS and zero heavy deps.',
    'cards.access.title': 'Accessible',
    'cards.access.text': 'Semantics, high contrast and keyboard navigation.',
    'contact.title': 'Contact',
    'contact.name': 'Your name',
    'contact.email': 'Your email',
    'contact.msg': 'Message',
    'contact.send': 'Send',
    'footer.rights': 'All rights reserved.'
  }
};

function applyI18n(doc, lang) {
  doc.documentElement.lang = lang;
  doc.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    const value = I18N[lang]?.[key];
    if (typeof value === 'string') el.textContent = value;
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

const saved = localStorage.getItem('lang');
const fromUrl = getParamLang();
const initial = fromUrl || saved || (navigator.language?.startsWith('pt') ? 'pt-BR' : 'en');

applyI18n(document, initial);
localStorage.setItem('lang', initial);

const langSelect = document.getElementById('lang');
if (langSelect) {
  langSelect.value = initial;
  langSelect.addEventListener('change', () => {
    const lang = langSelect.value;
    applyI18n(document, lang);
    localStorage.setItem('lang', lang);
  });
}
