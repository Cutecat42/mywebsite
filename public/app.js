import firebaseConfig from 'firebaseConfig';
import { initializeApp } from 'firebase/compat/app';

const app = initializeApp(firebaseConfig);

// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navMenu.classList.toggle('active');
});


// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
  hamburger.classList.remove('active');
  navMenu.classList.remove('active');
}));

// Smooth scrolling for navigation links
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


// Active navigation link highlighting
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

function highlightNavLink() {
  let current = '';
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (scrollY >= (sectionTop - 200)) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
}

window.addEventListener('scroll', highlightNavLink);

// Navbar background on scroll
const navbar = document.querySelector('.navbar');

function updateNavbar() {
  if (window.scrollY > 100) {
    navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
    navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
  } else {
    navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
    navbar.style.boxShadow = 'none';
  }
}

window.addEventListener('scroll', updateNavbar);

// Intersection Observer for fade-in animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, observerOptions);

// Add fade-in class to elements and observe them
const animateElements = document.querySelectorAll('.skill-category, .project-card, .about-content, .contact-content');
animateElements.forEach(el => {
  el.classList.add('fade-in');
  observer.observe(el);
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  const heroImage = document.querySelector('.hero-image img');
  
  if (heroImage && scrolled < window.innerHeight) {
    heroImage.style.transform = `translateY(${scrolled * 0.5}px)`;
  }
});

// Skills animation on scroll
const skillItems = document.querySelectorAll('.skill-item');

const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.style.transform = 'translateY(0)';
        entry.target.style.opacity = '1';
      }, index * 100);
    }
  });
}, { threshold: 0.5 });

skillItems.forEach(item => {
  item.style.transform = 'translateY(20px)';
  item.style.opacity = '0';
  item.style.transition = 'all 0.3s ease';
  skillObserver.observe(item);
});

// Project card hover effects
const projectCards = document.querySelectorAll('.project-card');

projectCards.forEach(card => {
  card.addEventListener('mouseenter', () => {
    card.style.transform = 'translateY(-10px) scale(1.02)';
  });
  
  card.addEventListener('mouseleave', () => {
    card.style.transform = 'translateY(0) scale(1)';
  });
});

// Counter animation for stats
function animateCounter(element, target, duration = 2000) {
  let start = 0;
  const increment = target / (duration / 16);
  
  function updateCounter() {
    start += increment;
    if (start < target) {
      element.textContent = Math.floor(start) + '+';
      requestAnimationFrame(updateCounter);
    } else {
      element.textContent = target + '+';
    }
  }
  
  updateCounter();
}

// Initialize counter animation when stats section is visible
const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const statNumbers = entry.target.querySelectorAll('.stat h3');
      statNumbers.forEach(stat => {
        const target = parseInt(stat.textContent);
        animateCounter(stat, target);
      });
      statsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

const aboutStats = document.querySelector('.about-stats');
if (aboutStats) {
  statsObserver.observe(aboutStats);
}

// Smooth reveal animation for sections
const revealSections = document.querySelectorAll('section');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('section-visible');
    }
  });
}, { threshold: 0.1 });

revealSections.forEach(section => {
  section.style.opacity = '0';
  section.style.transform = 'translateY(50px)';
  section.style.transition = 'all 0.8s ease';
  sectionObserver.observe(section);
});

// Add CSS for section reveal animation
const style = document.createElement('style');
style.textContent = `
  .section-visible {
    opacity: 1 !important;
    transform: translateY(0) !important;
  }
`;
document.head.appendChild(style);

// Initialize all animations and interactions
document.addEventListener('DOMContentLoaded', () => {
  // Set initial active nav link
  highlightNavLink();
  
  // Add loading class to images
  const images = document.querySelectorAll('img');
  images.forEach(img => {
    img.classList.add('loading');
    img.addEventListener('load', () => {
      img.classList.remove('loading');
    });
  });
});









