// Initialize all variables first
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');
const contactForm = document.getElementById('contactForm');
const progressFills = document.querySelectorAll('.progress-fill');
const floatingHeartsContainer = document.getElementById('floatingHearts');
const bgHeartsContainer = document.getElementById('bgHearts');

// Check for reduced motion preference
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Create floating hearts
function createFloatingHearts() {
  if (prefersReducedMotion || !floatingHeartsContainer) return;
  
  const heartSVG = `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>`;
  
  for (let i = 0; i < 15; i++) {
    const heart = document.createElement('div');
    heart.className = 'heart';
    heart.innerHTML = heartSVG;
    heart.style.left = Math.random() * 100 + '%';
    heart.style.animationDuration = (Math.random() * 10 + 15) + 's';
    heart.style.animationDelay = (Math.random() * 15) + 's';
    
    const size = Math.max(12, Math.random() * 25);
    heart.style.width = size + 'px';
    heart.style.height = size + 'px';
    
    floatingHeartsContainer.appendChild(heart);
  }
}

// Create background hearts
function createBackgroundHearts() {
  if (!bgHeartsContainer) return;
  
  const heartSVG = `<svg viewBox="0 0 24 24" fill="var(--accent)"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>`;
  
  const positions = [
    { top: '10%', left: '5%', size: 80 },
    { top: '20%', right: '8%', size: 60 },
    { top: '60%', left: '3%', size: 50 },
    { top: '80%', right: '5%', size: 70 },
    { top: '40%', left: '10%', size: 40 },
    { top: '75%', left: '15%', size: 55 },
    { top: '15%', right: '20%', size: 45 },
    { top: '50%', right: '3%', size: 65 },
  ];
  
  positions.forEach(pos => {
    const heart = document.createElement('div');
    heart.className = 'bg-heart';
    heart.innerHTML = heartSVG;
    if (pos.top) heart.style.top = pos.top;
    if (pos.left) heart.style.left = pos.left;
    if (pos.right) heart.style.right = pos.right;
    heart.style.width = pos.size + 'px';
    heart.style.height = pos.size + 'px';
    bgHeartsContainer.appendChild(heart);
  });
}

// Initialize hearts
createFloatingHearts();
createBackgroundHearts();

// Mobile Menu Toggle
if (mobileMenuBtn && mobileMenu) {
  mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
  });

  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.add('hidden');
    });
  });
}

// Scroll Reveal Animation
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
    }
  });
}, {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
});

revealElements.forEach(el => {
  revealObserver.observe(el);
});

// Progress Bar Animation
const progressObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const width = entry.target.dataset.width;
      if (width) {
        entry.target.style.width = width + '%';
      }
    }
  });
}, {
  threshold: 0.5
});

progressFills.forEach(fill => {
  fill.style.width = '0%';
  progressObserver.observe(fill);
});

// Contact Form Handling
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    
    submitBtn.innerHTML = `
      <svg class="animate-spin" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
      </svg>
      Sending...
    `;
    submitBtn.disabled = true;
    
    setTimeout(() => {
      submitBtn.innerHTML = `
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="none">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
        </svg>
        Message Sent!
      `;
      
      setTimeout(() => {
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        contactForm.reset();
      }, 2000);
    }, 1500);
  });
}

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    if (href && href !== '#') {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({
          behavior: prefersReducedMotion ? 'auto' : 'smooth',
          block: 'start'
        });
      }
    }
  });
});

// Add CSS for spinning animation dynamically
const style = document.createElement('style');
style.textContent = `
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
  .animate-spin {
    animation: spin 1s linear infinite;
  }
`;
document.head.appendChild(style);