/* ═══════════════════════════════════════════
   Scroll animations, glass nav, interactivity
   ═══════════════════════════════════════════ */

// ── Glass navigation scroll effect ──
const nav = document.querySelector('nav');
let lastScroll = 0;

function updateNav() {
  const y = window.scrollY;
  nav.classList.toggle('scrolled', y > 60);
  lastScroll = y;
}

window.addEventListener('scroll', updateNav, { passive: true });
updateNav();

// ── Scroll reveal ──
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -30px 0px' });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// ── Article hover (card border) ──
document.querySelectorAll('article, .cap-card, .contact-link, .case-study').forEach(el => {
  el.addEventListener('mouseenter', () => { el.style.borderColor = 'var(--accent)'; });
  el.addEventListener('mouseleave', () => { el.style.borderColor = ''; });
});

// ── Smooth nav scroll ──
document.querySelectorAll('nav a[href^="#"]').forEach(link => {
  link.addEventListener('click', (e) => {
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ── SVG diagram entrance animation ──
const diagramObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const svg = entry.target.querySelector('svg');
      if (svg) {
        svg.style.opacity = '1';
        svg.style.transform = 'translateY(0)';
        // Animate lines sequentially
        const lines = svg.querySelectorAll('line, path');
        lines.forEach((line, i) => {
          line.style.opacity = '0';
          line.style.transition = 'opacity .3s ease-out';
          setTimeout(() => { line.style.opacity = '1'; }, 200 + i * 80);
        });
      }
      diagramObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

document.querySelectorAll('.diagram').forEach(el => {
  const svg = el.querySelector('svg');
  if (svg) {
    svg.style.opacity = '0';
    svg.style.transform = 'translateY(12px)';
    svg.style.transition = 'opacity .6s ease-out, transform .6s ease-out';
  }
  diagramObserver.observe(el);
});
