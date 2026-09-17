import './styles.css';
import './responsive.css';

// Replace this one value with the documentary URL when the film is released.
const YOUTUBE_FILM_URL = 'https://drive.google.com/file/d/1xXJkoDLbK0jQx4D3b6i95kH_JbTXupoN/view?usp=sharing';




const products = {
  warli: {
    art: 'Warli Art',
    name: 'Pencil Pouch',
    price: '₹950 · US$10',
    technique: 'Print with quilting and tassel puller',
    description: 'A compact everyday pouch animated by the circles, figures and scenes associated with Warli visual storytelling.',
    images: [
      { src: '/images/warli-pouch.png', alt: 'Maroon Warli art pencil pouch with a white village scene' },
      { src: '/images/warli-pouch-detail.png', alt: 'Reverse of the Warli pencil pouch with dancing figures and musicians' },
    ],
  },
  madhubani: {
    art: 'Madhubani Art',
    name: 'Tote Bag',
    price: '₹1,950 · US$20',
    technique: 'Print with embroidery',
    description: 'A generous carryall that brings bold geometry, fish and floral references into a practical daily form.',
    images: [
      { src: '/images/madhubani-tote.png', alt: 'Front of the Madhubani tote with fish and floral motifs' },
      { src: '/images/madhubani-tote-detail.png', alt: 'Reverse of the Madhubani tote with a dotted circle design' },
    ],
  },
  gond: {
    art: 'Gond Art',
    name: 'Tote Bag',
    price: '₹1,250 · US$13',
    technique: 'Print with raw-edge appliqué fringes',
    description: 'A tactile tote pairing a nature-led Gond motif with a lively raw-edge fringe treatment.',
    images: [
      { src: '/images/gond-tote.png', alt: 'Gond art tote bag with raw-edge appliqué fringe' },
      { src: '/images/gond-tote.png', alt: 'Gond art tote bag with raw-edge appliqué fringe' },
    ],
  },
  tanjore: {
    art: 'Tanjore Painting',
    name: 'Document Folder',
    price: '₹1,950 · US$20',
    technique: 'Print with quilting and embroidery',
    description: 'A structured document folder enriched with golden fish, lotus details, quilting and embroidery.',
    images: [
      { src: '/images/tanjore-folder.png', alt: 'Tanjore painting document folder with gold fish and lotus embroidery' },
      { src: '/images/tanjore-folder-detail.png', alt: 'Tanjore painting document folder shown with an envelope inside' },
    ],
  },
  phad: {
    art: 'Phad Art',
    name: 'Laptop Bag',
    price: '₹2,450 · US$26',
    technique: 'Print with quilting and pompom puller',
    description: 'A quilted laptop bag that turns a continuous forest and river scene into a functional travelling artwork.',
    images: [
      { src: '/images/phad-laptop.png', alt: 'Phad art laptop bag with a forest and river scene' },
      { src: '/images/phad-laptop-detail.png', alt: 'Reverse of the Phad laptop bag with an elephant motif border' },
    ],
  },
  rangoli: {
    art: 'Rangoli Art',
    name: 'iPad Cover',
    price: '₹1,950 · US$20',
    technique: 'Print with quilting and tassel puller',
    description: 'A protective quilted cover centred on an indigo-and-rust mandala inspired by Rangoli pattern making.',
    images: [
      { src: '/images/rangoli-ipad.png', alt: 'Rangoli art iPad cover with an indigo and rust mandala' },
      { src: '/images/rangoli-ipad-detail.png', alt: 'Close-up of the Rangoli mandala pattern and quilting' },
    ],
  },
  rogan: {
    art: 'Rogan Art',
    name: 'Pencil Pouch',
    price: '₹1,950 · US$20',
    technique: 'Crewel embroidery, quilted back and tassel',
    description: 'A richly embroidered pouch with curling botanical forms on one side and hand-quilted texture on the other.',
    images: [
      { src: '/images/rogan-pouch.png', alt: 'Rogan art pencil pouch with crewel embroidered florals' },
      { src: '/images/rogan-pouch-detail.png', alt: 'Quilted reverse of the Rogan art pencil pouch' },
    ],
  },
  'block-pouch': {
    art: 'Block Printing',
    name: 'Pencil Pouch',
    price: '₹950 · US$10',
    technique: 'Block print with patchwork and tassel puller',
    description: 'A graphic patchwork pouch that brings together small sections of block-printed fabric.',
    images: [
      { src: '/images/block-pouch.png', alt: 'Block printed pencil pouch with a geometric patchwork front' },
      { src: '/images/block-pouch-detail.png', alt: 'Alternate side of the block printed patchwork pencil pouch' },
    ],
  },
  'block-ipad': {
    art: 'Block Printing',
    name: 'iPad Cover',
    price: '₹1,450 · US$15',
    technique: 'Block print with patchwork, hand quilting and tassel puller',
    description: 'A hand-quilted sleeve that arranges block-printed remnants into a useful patchwork composition.',
    images: [
      { src: '/images/block-ipad.png', alt: 'Block printed patchwork iPad cover with a tassel' },
      { src: '/images/block-ipad-detail.png', alt: 'Full quilted pattern on the block printed iPad cover' },
    ],
  },
  kangra: {
    art: 'Kangra Painting',
    name: 'Laptop Bag',
    price: '₹2,450 · US$26',
    technique: 'Print with quilting',
    description: 'A softly quilted laptop bag carrying a detailed Kangra-inspired landscape of trees, water, birds and figures.',
    images: [
      { src: '/images/kangra-laptop.png', alt: 'Kangra painting laptop bag with a tree, chariot and peacock scene' },
      { src: '/images/kangra-laptop-detail.png', alt: 'Striped reverse of the Kangra painting laptop bag' },
    ],
  },
};

const header = document.querySelector('[data-header]');
const menuButton = document.querySelector('[data-menu-toggle]');
const menu = document.querySelector('[data-menu]');
document.querySelectorAll('[data-youtube-link]').forEach((youtubeLink) => {
  if (youtubeLink instanceof HTMLAnchorElement) youtubeLink.href = YOUTUBE_FILM_URL;
});

const closeMenu = () => {
  menuButton?.setAttribute('aria-expanded', 'false');
  menu?.classList.remove('is-open');
  document.body.classList.remove('menu-open');
};

menuButton?.addEventListener('click', () => {
  const opening = menuButton.getAttribute('aria-expanded') !== 'true';
  menuButton.setAttribute('aria-expanded', String(opening));
  menu?.classList.toggle('is-open', opening);
  document.body.classList.toggle('menu-open', opening);
});

menu?.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && menuButton?.getAttribute('aria-expanded') === 'true') {
    closeMenu();
    menuButton.focus();
  }
});

const updateHeader = () => header?.classList.toggle('is-scrolled', window.scrollY > 18);
updateHeader();
window.addEventListener('scroll', updateHeader, { passive: true });

const revealElements = document.querySelectorAll('.reveal');
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (prefersReducedMotion || !('IntersectionObserver' in window)) {
  revealElements.forEach((element) => element.classList.add('is-visible'));
} else {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
  );

  revealElements.forEach((element) => revealObserver.observe(element));
}

const filterButtons = document.querySelectorAll('[data-filter]');
const productCards = document.querySelectorAll('[data-product-card]');
const resultCount = document.querySelector('[data-result-count]');

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const filter = button.dataset.filter;
    let visible = 0;

    filterButtons.forEach((item) => item.setAttribute('aria-pressed', String(item === button)));
    productCards.forEach((card) => {
      const shouldShow = filter === 'all' || card.dataset.category === filter;
      card.hidden = !shouldShow;
      if (shouldShow) visible += 1;
    });

    if (resultCount) resultCount.textContent = String(visible);
  });
});

const dialog = document.querySelector('[data-product-dialog]');
const dialogImage = dialog?.querySelector('[data-dialog-image]');
const dialogThumbs = dialog?.querySelector('[data-dialog-thumbs]');
const dialogArt = dialog?.querySelector('[data-dialog-art]');
const dialogName = dialog?.querySelector('[data-dialog-name]');
const dialogPrice = dialog?.querySelector('[data-dialog-price]');
const dialogDescription = dialog?.querySelector('[data-dialog-description]');
const dialogTechnique = dialog?.querySelector('[data-dialog-technique]');
const dialogEnquire = dialog?.querySelector('[data-dialog-enquire]');
let activeDialogTrigger = null;

const setDialogImage = (image, activeButton) => {
  if (!dialogImage) return;
  dialogImage.src = image.src;
  dialogImage.alt = image.alt;
  dialogThumbs?.querySelectorAll('button').forEach((button) => {
    button.setAttribute('aria-pressed', String(button === activeButton));
  });
};

const openProduct = (productKey, trigger) => {
  const product = products[productKey];
  if (!product || !dialog) return;

  activeDialogTrigger = trigger;
  if (dialogArt) dialogArt.textContent = product.art;
  if (dialogName) dialogName.textContent = product.name;
  if (dialogPrice) dialogPrice.textContent = product.price;
  if (dialogDescription) dialogDescription.textContent = product.description;
  if (dialogTechnique) dialogTechnique.textContent = product.technique;

  if (dialogEnquire) {
    dialogEnquire.dataset.productName = `${product.art} ${product.name}`;
    dialogEnquire.href = '#contact';
  }

  if (dialogThumbs) {
    dialogThumbs.replaceChildren();
    product.images.forEach((image, index) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.setAttribute('aria-label', `Show image ${index + 1} of ${product.images.length}`);
      button.setAttribute('aria-pressed', String(index === 0));

      const thumbnail = document.createElement('img');
      thumbnail.src = image.src;
      thumbnail.alt = '';
      thumbnail.loading = 'lazy';
      button.append(thumbnail);
      button.addEventListener('click', () => setDialogImage(image, button));
      dialogThumbs.append(button);
    });
  }

  setDialogImage(product.images[0], dialogThumbs?.querySelector('button'));
  dialog.showModal();
};

document.querySelectorAll('[data-quick-view]').forEach((button) => {
  button.addEventListener('click', () => {
    const card = button.closest('[data-product]');
    openProduct(card?.dataset.product, button);
  });
});

dialog?.querySelector('[data-dialog-close]')?.addEventListener('click', () => dialog.close());
dialog?.addEventListener('click', (event) => {
  if (event.target === dialog) dialog.close();
});
dialog?.addEventListener('close', () => activeDialogTrigger?.focus());

const enquiryForm = document.querySelector('#enquiry-form');
const formStatus = enquiryForm?.querySelector('[data-form-status]');
const formEndpoint = 'https://formspree.io/f/xljrqvzz';
const enquiryMessage = enquiryForm?.elements.namedItem('message');

const updateEnquiryPlaceholder = () => {
  if (!(enquiryMessage instanceof HTMLTextAreaElement)) return;
  enquiryMessage.placeholder = window.matchMedia('(max-width: 620px)').matches
    ? 'Which piece are you interested in?'
    : 'Tell us which piece, quantity, city, or timeline you have in mind…';
};

window.addEventListener('resize', updateEnquiryPlaceholder);
updateEnquiryPlaceholder();

dialogEnquire?.addEventListener('click', (event) => {
  event.preventDefault();
  const productName = dialogEnquire.dataset.productName;
  const interest = enquiryForm?.elements.namedItem('interest');
  const message = enquiryForm?.elements.namedItem('message');

  if (interest instanceof HTMLSelectElement) interest.value = 'Personal order';
  if (message instanceof HTMLTextAreaElement && productName) {
    message.value = `I’d like to enquire about the ${productName}.`;
  }

  dialog?.close();
  document.querySelector('#contact')?.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth' });
  window.setTimeout(() => {
    const name = enquiryForm?.elements.namedItem('name');
    if (name instanceof HTMLInputElement) name.focus();
  }, prefersReducedMotion ? 0 : 500);
});

const validateField = (field) => {
  if (!(field instanceof HTMLInputElement || field instanceof HTMLTextAreaElement || field instanceof HTMLSelectElement)) {
    return true;
  }

  const valid = field.checkValidity();
  field.setAttribute('aria-invalid', String(!valid));
  return valid;
};

enquiryForm?.querySelectorAll('[required]').forEach((field) => {
  field.addEventListener('input', () => validateField(field));
  field.addEventListener('change', () => validateField(field));
});

enquiryForm?.addEventListener('submit', async (event) => {
  event.preventDefault();
  const requiredFields = [...enquiryForm.querySelectorAll('[required]')];
  const valid = requiredFields.every(validateField);
  const honeypot = enquiryForm.elements.namedItem('_gotcha');

  if (!valid) {
    const firstInvalid = requiredFields.find((field) => field.getAttribute('aria-invalid') === 'true');
    firstInvalid?.focus();
    if (formStatus) formStatus.textContent = 'Please check the highlighted fields.';
    return;
  }

  if (honeypot instanceof HTMLInputElement && honeypot.value) return;

  const submitButton = enquiryForm.querySelector('button[type="submit"]');
  const data = Object.fromEntries(new FormData(enquiryForm));
  delete data._gotcha;

  submitButton?.setAttribute('disabled', '');
  if (formStatus) formStatus.textContent = 'Sending your enquiry…';

  try {
    const response = await fetch(formEndpoint, {
      method: 'POST',
      headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (!response.ok) throw new Error(`Form request failed with ${response.status}`);
    enquiryForm.reset();
    enquiryForm.querySelectorAll('[aria-invalid]').forEach((field) => field.removeAttribute('aria-invalid'));
    if (formStatus) formStatus.textContent = 'Thank you. Your enquiry has been sent to Radha.';
  } catch {
    if (formStatus) formStatus.textContent = 'The form could not send. Please email radhabahl22@gmail.com directly.';
  } finally {
    submitButton?.removeAttribute('disabled');
  }
});

document.querySelectorAll('[data-year]').forEach((element) => {
  element.textContent = String(new Date().getFullYear());
});

// A restrained image-only parallax adds depth without taking control of scrolling.
const heroFigure = document.querySelector('.hero__figure');
let parallaxFrame;

const updateHeroParallax = () => {
  parallaxFrame = undefined;

  if (!heroFigure || prefersReducedMotion || window.innerWidth < 900) {
    heroFigure?.style.removeProperty('--hero-parallax');
    return;
  }

  const progress = Math.min(window.scrollY / Math.max(window.innerHeight, 1), 1);
  heroFigure.style.setProperty('--hero-parallax', `${progress * -18}px`);
};

window.addEventListener(
  'scroll',
  () => {
    if (!parallaxFrame) parallaxFrame = window.requestAnimationFrame(updateHeroParallax);
  },
  { passive: true },
);
window.addEventListener('resize', updateHeroParallax);
updateHeroParallax();

// Film page: the banner loop is a 5 MB download, so only wider screens that have not
// asked for reduced motion ever fetch it. Everyone else keeps the poster still.
const bannerVideo = document.querySelector('[data-banner-video]');

if (bannerVideo instanceof HTMLVideoElement && !prefersReducedMotion && window.innerWidth >= 900) {
  bannerVideo.addEventListener('playing', () => bannerVideo.classList.add('is-playing'), { once: true });
  bannerVideo.src = bannerVideo.dataset.src ?? '';
  bannerVideo.play().catch(() => bannerVideo.removeAttribute('src'));
}

// Film page: enlarge a still in a lightbox.
const stillDialog = document.querySelector('[data-still-dialog]');
const stillDialogImage = stillDialog?.querySelector('[data-still-image]');
const stillDialogCaption = stillDialog?.querySelector('[data-still-caption]');
let activeStillTrigger = null;

document.querySelectorAll('[data-still-open]').forEach((trigger) => {
  trigger.addEventListener('click', () => {
    const image = trigger.querySelector('img');
    if (!(stillDialog instanceof HTMLDialogElement) || !(image instanceof HTMLImageElement)) return;

    activeStillTrigger = trigger;
    if (stillDialogImage instanceof HTMLImageElement) {
      stillDialogImage.src = image.currentSrc || image.src;
      stillDialogImage.alt = image.alt;
    }
    if (stillDialogCaption) {
      stillDialogCaption.textContent = trigger.closest('figure')?.querySelector('figcaption')?.textContent ?? '';
    }
    stillDialog.showModal();
  });
});

stillDialog?.querySelector('[data-still-close]')?.addEventListener('click', () => stillDialog.close());
stillDialog?.addEventListener('click', (event) => {
  if (event.target === stillDialog) stillDialog.close();
});
stillDialog?.addEventListener('close', () => activeStillTrigger?.focus());
