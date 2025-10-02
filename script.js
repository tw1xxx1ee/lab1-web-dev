// Плавная прокрутка для навигации
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Изменение навигации при скролле
window.addEventListener('scroll', () => {
  const nav = document.querySelector('nav');
  if (window.scrollY > 100) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
});

// Параллакс эффект для героя
window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  const parallax = document.querySelector('.hero-bg');
  if (parallax) {
    parallax.style.transform = `translateY(${scrolled * 0.5}px)`;
  }
});

// Мобильное меню
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

mobileMenuBtn.addEventListener('click', () => {
  navLinks.classList.toggle('active');
  mobileMenuBtn.innerHTML = navLinks.classList.contains('active') 
    ? '<i class="fas fa-times"></i>' 
    : '<i class="fas fa-bars"></i>';
});

// Обработка формы
document.getElementById('contactForm').addEventListener('submit', function(e) {
  e.preventDefault();
  alert('Сообщение отправлено! Спасибо за ваше сообщение.');
  this.reset();
});

// Анимация появления элементов при скролле
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      
      // Анимация прогресс-баров
      if (entry.target.classList.contains('skill-card')) {
        const progressBar = entry.target.querySelector('.level-progress');
        const percentElement = entry.target.querySelector('.level-percent');
        if (progressBar && percentElement) {
          const targetPercent = progressBar.getAttribute('data-percent');
          let currentPercent = 0;
          
          const interval = setInterval(() => {
            if (currentPercent >= targetPercent) {
              clearInterval(interval);
              return;
            }
            currentPercent++;
            progressBar.style.width = `${currentPercent}%`;
            percentElement.textContent = `${currentPercent}%`;
          }, 20);
        }
      }
    }
  });
}, observerOptions);

// Наблюдаем за всеми элементами, которые должны появляться
document.querySelectorAll('.section-title, .about-text p, .hobby-item, .about-image, .skill-card, .project-card, .contact-item, .contact-form, footer').forEach(el => {
  observer.observe(el);
});