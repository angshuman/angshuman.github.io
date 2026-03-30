/* ── Navbar scroll effect ── */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
}, { passive: true });

/* ── Mobile nav toggle ── */
const navToggle = document.getElementById('navToggle');
const navLinks  = document.getElementById('navLinks');
const spans     = navToggle.querySelectorAll('span');

function closeNav() {
  navLinks.classList.remove('open');
  spans[0].style.transform = '';
  spans[1].style.opacity   = '';
  spans[2].style.transform = '';
  document.body.style.overflow = '';
}

navToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  if (isOpen) {
    spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
    spans[1].style.opacity   = '0';
    spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
    document.body.style.overflow = 'hidden';
  } else {
    closeNav();
  }
});

navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', closeNav));

/* ── Intersection Observer: timeline + fade-in elements ── */
const visibilityObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      visibilityObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -48px 0px' });

/* Timeline items: stagger by index */
document.querySelectorAll('.timeline-item').forEach((el, i) => {
  el.style.transitionDelay = `${i * 0.12}s`;
  visibilityObserver.observe(el);
});

/* Cards and groups: fade in with stagger per row-of-3 */
document.querySelectorAll(
  '.highlight-card, .project-card, .skill-group, .patent-card, .contact-card'
).forEach((el, i) => {
  el.classList.add('anim-fade');
  el.style.transitionDelay = `${(i % 3) * 0.1}s`;
  visibilityObserver.observe(el);
});

/* About text blocks */
document.querySelectorAll('.about-text, .edu-card').forEach(el => {
  el.classList.add('anim-fade');
  visibilityObserver.observe(el);
});

/* ── Active nav link highlight on scroll ── */
const sections   = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('#navLinks a[href^="#"]');

const activeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.id;
      navAnchors.forEach(a => {
        const isCurrent = a.getAttribute('href') === `#${id}`;
        a.style.color = isCurrent ? 'var(--cyan)' : '';
      });
    }
  });
}, { threshold: 0.45 });

sections.forEach(s => activeObserver.observe(s));

/* ── Smooth typewriter effect on hero title (optional subtle effect) ── */
const heroTitle = document.querySelector('.hero-title');
if (heroTitle) {
  const text = heroTitle.textContent;
  heroTitle.textContent = '';
  heroTitle.style.borderRight = '2px solid var(--cyan)';
  let i = 0;
  const type = () => {
    if (i < text.length) {
      heroTitle.textContent += text[i++];
      setTimeout(type, 55);
    } else {
      setTimeout(() => { heroTitle.style.borderRight = 'none'; }, 800);
    }
  };
  /* Small delay so it plays after page load */
  setTimeout(type, 600);
}
