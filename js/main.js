document.documentElement.classList.add('js');

const header = document.querySelector('.header');
const nav = document.querySelector('.nav');
const navLinks = nav.querySelectorAll('.nav-link');
const burger = document.querySelector('.burger');


// Mobile menu

function setMenu(open) {
  nav.classList.toggle('open', open);
  burger.classList.toggle('active', open);
  burger.setAttribute('aria-expanded', open);
  burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
}

burger.addEventListener('click', () => setMenu(!nav.classList.contains('open')));
navLinks.forEach((link) => link.addEventListener('click', () => setMenu(false)));

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') setMenu(false);
});

document.addEventListener('click', (event) => {
  if (!header.contains(event.target)) setMenu(false);
});


// Header shadow on scroll

function updateHeader() {
  header.classList.toggle('scrolled', window.scrollY > 50);
}

window.addEventListener('scroll', updateHeader, { passive: true });
updateHeader();


// Fade-in on scroll

const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('visible');
    observer.unobserve(entry.target);
  });
}, { threshold: 0.15 });

document.querySelectorAll('.fade-in').forEach((el) => revealObserver.observe(el));


// Active menu link — the section that crosses the middle of the screen

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    navLinks.forEach((link) => {
      link.classList.toggle('active', link.hash === `#${entry.target.id}`);
    });
  });
}, { rootMargin: '-50% 0px -50% 0px' });

document.querySelectorAll('main section[id]').forEach((section) => sectionObserver.observe(section));


// Swipe rows (tablet / mobile)

document.querySelectorAll('.slider').forEach((slider) => {
  const track = slider.querySelector('.cards');
  const prevBtn = slider.querySelector('.slider-prev');
  const nextBtn = slider.querySelector('.slider-next');

  const getStep = () => {
    const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
    return track.firstElementChild.offsetWidth + gap;
  };

  const updateButtons = () => {
    prevBtn.disabled = track.scrollLeft <= 0;
    nextBtn.disabled = track.scrollLeft + track.clientWidth >= track.scrollWidth - 1;
  };

  prevBtn.addEventListener('click', () => track.scrollBy({ left: -getStep(), behavior: 'smooth' }));
  nextBtn.addEventListener('click', () => track.scrollBy({ left: getStep(), behavior: 'smooth' }));
  track.addEventListener('scroll', updateButtons, { passive: true });
  window.addEventListener('resize', updateButtons);
  updateButtons();
});


// Video tabs

const video = document.querySelector('.video-player video');
const videoTabs = document.querySelectorAll('.video-tab');

videoTabs.forEach((tab) => {
  tab.addEventListener('click', () => {
    if (tab.getAttribute('aria-pressed') === 'true') return;

    videoTabs.forEach((item) => item.setAttribute('aria-pressed', item === tab));

    video.poster = tab.dataset.poster;
    video.src = tab.dataset.video;
    video.setAttribute('aria-label', `${tab.querySelector('strong').textContent} assembly`);
    video.play().catch(() => {});
  });
});


// Contact form

const form = document.querySelector('.contact-form');
const formStatus = form.querySelector('.form-status');
const submitBtn = form.querySelector('[type="submit"]');

const rules = {
  name: (value) => value.length >= 2 || 'Please enter your name.',
  email: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) || 'Please enter a valid email address.',
  message: (value) => value.length >= 10 || 'Message should be at least 10 characters.',
};

function validateField(field) {
  const result = rules[field.name](field.value.trim());
  const error = result === true ? '' : result;

  field.classList.toggle('invalid', Boolean(error));
  field.setAttribute('aria-invalid', Boolean(error));
  document.getElementById(`${field.id}-error`).textContent = error;

  return !error;
}

function setStatus(text, type = '') {
  formStatus.textContent = text;
  formStatus.className = `form-status ${type}`;
}

// "Order now" buttons preselect the kit in the form
document.querySelectorAll('[data-kit]').forEach((btn) => {
  btn.addEventListener('click', () => {
    form.elements.kit.value = btn.dataset.kit;
  });
});

Object.keys(rules).forEach((name) => {
  const field = form.elements[name];
  field.addEventListener('input', () => {
    if (field.classList.contains('invalid')) validateField(field);
  });
});

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const fields = Object.keys(rules).map((name) => form.elements[name]);
  const results = fields.map(validateField);

  if (results.includes(false)) {
    fields[results.indexOf(false)].focus();
    return;
  }

  const name = form.elements.name.value.trim();
  submitBtn.disabled = true;
  setStatus('Sending…');

  try {
    const response = await fetch(form.action, {
      method: 'POST',
      body: new FormData(form),
      headers: { Accept: 'application/json' },
    });

    if (!response.ok) throw new Error(`Request failed: ${response.status}`);

    form.reset();
    setStatus(`Thanks, ${name}! We'll get back to you within one working day.`, 'success');
  } catch (error) {
    console.error(error);
    setStatus('Something went wrong. Please try again or email us at hello@modu.example.', 'error');
  } finally {
    submitBtn.disabled = false;
  }
});


document.querySelector('.year').textContent = new Date().getFullYear();
