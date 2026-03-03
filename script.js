const yearSlot = document.getElementById('year');
if (yearSlot) {
  yearSlot.textContent = String(new Date().getFullYear());
}

const translatableNodes = document.querySelectorAll('[data-en][data-hi]');
const switchButtons = document.querySelectorAll('[data-lang-switch]');

function applyLanguage(lang) {
  const activeLang = lang === 'hi' ? 'hi' : 'en';
  document.documentElement.lang = activeLang;

  translatableNodes.forEach((node) => {
    const value = activeLang === 'hi' ? node.dataset.hi : node.dataset.en;
    if (typeof value === 'string') {
      node.textContent = value;
    }
  });

  switchButtons.forEach((btn) => {
    const isActive = btn.dataset.langSwitch === activeLang;
    btn.classList.toggle('is-active', isActive);
    btn.setAttribute('aria-pressed', isActive ? 'true' : 'false');
  });

  localStorage.setItem('dd_lang', activeLang);
}

switchButtons.forEach((btn) => {
  btn.addEventListener('click', () => {
    applyLanguage(btn.dataset.langSwitch || 'en');
  });
});

const savedLanguage = localStorage.getItem('dd_lang');
if (savedLanguage === 'hi' || savedLanguage === 'en') {
  applyLanguage(savedLanguage);
} else {
  const browserLanguage = navigator.language && navigator.language.toLowerCase().startsWith('hi') ? 'hi' : 'en';
  applyLanguage(browserLanguage);
}

const siteHeader = document.querySelector('.site-header');
const menuButton = document.querySelector('.menu-toggle');
const primaryNav = document.querySelector('.primary-nav');

if (siteHeader && menuButton && primaryNav) {
  const MOBILE_BREAKPOINT = 920;

  const setMenuState = (open) => {
    siteHeader.classList.toggle('nav-open', open);
    menuButton.setAttribute('aria-expanded', open ? 'true' : 'false');
    primaryNav.hidden = !open;
  };

  const syncMenuForViewport = () => {
    const isMobile = window.innerWidth <= MOBILE_BREAKPOINT;
    if (isMobile) {
      setMenuState(false);
    } else {
      siteHeader.classList.remove('nav-open');
      menuButton.setAttribute('aria-expanded', 'false');
      primaryNav.hidden = false;
    }
  };

  syncMenuForViewport();

  menuButton.addEventListener('click', () => {
    const open = primaryNav.hidden;
    setMenuState(open);
  });

  document.addEventListener('click', (event) => {
    if (!siteHeader.contains(event.target)) {
      if (window.innerWidth <= MOBILE_BREAKPOINT) {
        setMenuState(false);
      }
    }
  });

  window.addEventListener('resize', () => {
    syncMenuForViewport();
  });
}
