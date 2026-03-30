/* ── Mobile nav toggle ── */
const navToggle = document.getElementById('navToggle');
const navLinks  = document.getElementById('navLinks');
const spans     = navToggle.querySelectorAll('span');

function closeMenu() {
  navLinks.classList.remove('open');
  spans[0].style.transform = '';
  spans[1].style.opacity   = '';
  spans[2].style.transform = '';
  document.body.style.overflow = '';
}

navToggle.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  if (open) {
    spans[0].style.transform = 'rotate(45deg) translate(4px, 5px)';
    spans[1].style.opacity   = '0';
    spans[2].style.transform = 'rotate(-45deg) translate(4px, -5px)';
    document.body.style.overflow = 'hidden';
  } else {
    closeMenu();
  }
});
navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));

/* ── Scroll reveal ── */
const io = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

/* Stagger cards and timeline items in groups of 3 */
document.querySelectorAll('.reveal, .tl-item').forEach((el, i) => {
  el.style.transitionDelay = `${(i % 3) * 0.09}s`;
  io.observe(el);
});

/* ── Active nav highlight on scroll ── */
const sections = document.querySelectorAll('section[id]');
const anchors  = document.querySelectorAll('#navLinks a[href^="#"]');

const sectionIO = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      anchors.forEach(a => {
        a.classList.toggle('active', a.getAttribute('href') === `#${e.target.id}`);
      });
    }
  });
}, { threshold: 0.45 });

sections.forEach(s => sectionIO.observe(s));
