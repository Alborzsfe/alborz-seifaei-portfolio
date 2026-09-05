const navToggle = document.querySelector('#navToggle');
const navLinks = document.querySelector('#navLinks');
const progress = document.querySelector('#pageProgress');

navToggle?.addEventListener('click', () => {
  const open = navToggle.getAttribute('aria-expanded') === 'true';
  navToggle.setAttribute('aria-expanded', String(!open));
  navLinks?.classList.toggle('open', !open);
});

navLinks?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    navToggle?.setAttribute('aria-expanded', 'false');
    navLinks.classList.remove('open');
  });
});

const updateProgress = () => {
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  const percent = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
  if (progress) progress.style.width = `${Math.min(100, Math.max(0, percent))}%`;
};

window.addEventListener('scroll', updateProgress, { passive: true });
updateProgress();

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -50px' });

document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));

document.querySelectorAll('.case-details').forEach((detail) => {
  detail.addEventListener('toggle', () => {
    if (!detail.open) return;
    document.querySelectorAll('.case-details[open]').forEach((other) => {
      if (other !== detail) other.removeAttribute('open');
    });
  });
});

const year = document.querySelector('#year');
if (year) year.textContent = String(new Date().getFullYear());
