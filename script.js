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
const shareSiteButton = document.querySelector('[data-share-site]');

const promoTrack = document.querySelector('.promo-banner-track');
const sliderDots = document.querySelectorAll('.slider-dot');
let promoActiveIndex = 0;
let promoAutoRotate = null;

function updatePromoSlide(index) {
  if (!promoTrack) return;
  const slides = promoTrack.querySelectorAll('.promo-slide');
  if (!slides.length) return;

  promoActiveIndex = (index + slides.length) % slides.length;
  promoTrack.style.transform = `translateX(-${promoActiveIndex * 100}%)`;

  sliderDots.forEach((dot, dotIndex) => {
    dot.classList.toggle('is-active', dotIndex === promoActiveIndex);
  });
}

function startPromoRotation() {
  if (promoAutoRotate) {
    clearInterval(promoAutoRotate);
  }
  promoAutoRotate = setInterval(() => {
    updatePromoSlide(promoActiveIndex + 1);
  }, 5500);
}

if (sliderDots.length && promoTrack) {
  sliderDots.forEach((dot, dotIndex) => {
    dot.addEventListener('click', () => {
      updatePromoSlide(dotIndex);
      startPromoRotation();
    });
  });
  updatePromoSlide(0);
  startPromoRotation();
}

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

if (shareSiteButton) {
  shareSiteButton.addEventListener('click', async () => {
    const shareUrl = window.location.origin;
    const shareText = 'DekhoDeal par daily shopping deals, offer alerts aur savings updates milte hain. Join now:';
    const shareData = {
      title: 'DekhoDeal',
      text: shareText,
      url: shareUrl,
    };
    const copyText = `${shareText} ${shareUrl}`;

    try {
      if (navigator.share) {
        await navigator.share(shareData);
        return;
      }

      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(copyText);
        const nextLabel = document.documentElement.lang === 'hi' ? 'लिंक कॉपी हो गया' : 'Link copied';
        shareSiteButton.textContent = nextLabel;
        window.setTimeout(() => {
          const resetLabel = document.documentElement.lang === 'hi' ? 'वेबसाइट शेयर करें' : 'Share Website';
          shareSiteButton.textContent = resetLabel;
        }, 1800);
      }
    } catch (_error) {
      // Ignore share/copy errors to avoid blocking the page experience.
    }
  });
}
