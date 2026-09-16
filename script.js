document.addEventListener('DOMContentLoaded', () => {
  const navbar = document.querySelector('.navbar');
  const toTop = document.getElementById('toTop');
  const progress = document.getElementById('scrollProgress');
  const revealItems = document.querySelectorAll('.reveal');
  const contactForm = document.getElementById('contactForm');
  const formMessage = document.getElementById('formMessage');

  const updateScrollState = () => {
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    const amount = scrollable > 0 ? window.scrollY / scrollable : 0;
    progress.style.transform = `scaleX(${amount})`;
    navbar.classList.toggle('scrolled', window.scrollY > 30);
    toTop.classList.toggle('visible', window.scrollY > 500);
  };

  window.addEventListener('scroll', updateScrollState, { passive: true });
  updateScrollState();

  toTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  const observer = new IntersectionObserver((entries, currentObserver) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        currentObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealItems.forEach((item) => observer.observe(item));

  document.querySelectorAll('.navbar .nav-link').forEach((link) => {
    link.addEventListener('click', () => {
      const nav = document.getElementById('mainNav');
      if (nav.classList.contains('show')) bootstrap.Collapse.getOrCreateInstance(nav).hide();
    });
  });

  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(contactForm);
    const name = formData.get('name');
    const subject = encodeURIComponent(formData.get('subject'));
    const body = encodeURIComponent(`Hi Shreya,\\n\\nMy name is ${name}.\\n\\n${formData.get('message')}`);
    window.location.href = `mailto:shreyatyagi0081@gmail.com?subject=${subject}&body=${body}`;
    formMessage.textContent = 'Opening your email app...';
  });

  document.querySelectorAll('.project-links a[href="#"]').forEach((link) => {
    link.addEventListener('click', (event) => event.preventDefault());
  });
});
