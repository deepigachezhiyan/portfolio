/* ============================================================
   MK Mubashera Portfolio — JavaScript
   ============================================================ */

'use strict';

// ===== FORCE RESUME DOWNLOAD (prevents browser opening PDF) =====
function forceDownload(url, filename) {
  fetch(url)
    .then(res => res.blob())
    .then(blob => {
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      setTimeout(() => {
        URL.revokeObjectURL(a.href);
        document.body.removeChild(a);
      }, 100);
    })
    .catch(() => {
      // Fallback: direct link download
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    });
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.btn-download').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      forceDownload('Mk Mubashera.pdf', 'MK_Mubashera_Resume.pdf');
    });
  });
});

// ===== LOADER =====
function dismissLoader() {
  const loader = document.getElementById('loader');
  if (loader) {
    loader.classList.add('hidden');
  }
  document.body.classList.remove('loading');
}

window.addEventListener('load', () => {
  setTimeout(dismissLoader, 600);
});

// Fallback safety: ensure page is scrollable even if load event is delayed
setTimeout(dismissLoader, 1500);

// ===== CUSTOM CURSOR =====
const cursor = document.getElementById('cursor');
const cursorFollower = document.getElementById('cursor-follower');

let mouseX = 0, mouseY = 0;
let followerX = 0, followerY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  if (cursor) {
    cursor.style.left = mouseX + 'px';
    cursor.style.top = mouseY + 'px';
  }
});

function animateFollower() {
  followerX += (mouseX - followerX) * 0.12;
  followerY += (mouseY - followerY) * 0.12;
  if (cursorFollower) {
    cursorFollower.style.left = followerX + 'px';
    cursorFollower.style.top = followerY + 'px';
  }
  requestAnimationFrame(animateFollower);
}
animateFollower();

document.querySelectorAll('a, button, .skill-tag, .cert-card').forEach(el => {
  el.addEventListener('mouseenter', () => {
    if (cursor) { cursor.style.width = '16px'; cursor.style.height = '16px'; }
    if (cursorFollower) { cursorFollower.style.width = '50px'; cursorFollower.style.height = '50px'; }
  });
  el.addEventListener('mouseleave', () => {
    if (cursor) { cursor.style.width = '10px'; cursor.style.height = '10px'; }
    if (cursorFollower) { cursorFollower.style.width = '35px'; cursorFollower.style.height = '35px'; }
  });
});

// ===== HERO PARTICLES =====
function createParticles() {
  const container = document.getElementById('particles');
  if (!container) return;
  const count = 30;
  for (let i = 0; i < count; i++) {
    const p = document.createElement('div');
    p.classList.add('particle');
    p.style.setProperty('--dur', (4 + Math.random() * 8) + 's');
    p.style.setProperty('--delay', (Math.random() * 8) + 's');
    p.style.left = Math.random() * 100 + '%';
    p.style.bottom = Math.random() * 40 + '%';
    p.style.width = p.style.height = (2 + Math.random() * 4) + 'px';
    container.appendChild(p);
  }
}
createParticles();

// ===== NAVBAR =====
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

window.addEventListener('scroll', () => {
  if (navbar) {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }
});

if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    const spans = hamburger.querySelectorAll('span');
    if (navLinks.classList.contains('open')) {
      spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
      spans[1].style.opacity = '0';
      spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
    } else {
      spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
    }
  });
}

// Close mobile nav on link click
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    if (navLinks) navLinks.classList.remove('open');
    const spans = hamburger ? hamburger.querySelectorAll('span') : [];
    spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
  });
});

// ===== ACTIVE NAV LINK ON SCROLL =====
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-link[data-section]');

function updateActiveNav() {
  const scrollPos = window.scrollY + 120;
  sections.forEach(section => {
    const top = section.offsetTop;
    const height = section.offsetHeight;
    if (scrollPos >= top && scrollPos < top + height) {
      navItems.forEach(item => item.classList.remove('active'));
      const active = document.querySelector(`.nav-link[data-section="${section.id}"]`);
      if (active) active.classList.add('active');
    }
  });
}

window.addEventListener('scroll', updateActiveNav);

// ===== AOS (Animate On Scroll) — lightweight custom =====
function initAOS() {
  const elements = document.querySelectorAll('[data-aos]');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const delay = el.getAttribute('data-aos-delay') || 0;
        setTimeout(() => {
          el.classList.add('aos-animate');
        }, parseInt(delay));
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -50px 0px' });

  elements.forEach(el => observer.observe(el));
}
initAOS();

// ===== SKILL BARS =====
function animateSkillBars() {
  const bars = document.querySelectorAll('.skill-fill');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const bar = entry.target;
        const width = bar.getAttribute('data-width');
        bar.style.width = width + '%';
        observer.unobserve(bar);
      }
    });
  }, { threshold: 0.4 });
  bars.forEach(bar => observer.observe(bar));
}
animateSkillBars();

// ===== EDUCATION PROGRESS BARS =====
function animateEduBars() {
  const bars = document.querySelectorAll('.edu-progress-bar');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const bar = entry.target;
        const width = bar.getAttribute('data-width');
        bar.style.width = width + '%';
        observer.unobserve(bar);
      }
    });
  }, { threshold: 0.4 });
  bars.forEach(bar => observer.observe(bar));
}
animateEduBars();

// ===== CONTACT FORM =====
const contactForm = document.getElementById('contact-form');
const formSuccess = document.getElementById('form-success');
const sendBtn = document.getElementById('send-btn');

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Animate button
    if (sendBtn) {
      sendBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
      sendBtn.disabled = true;
    }

    // Simulate send
    setTimeout(() => {
      contactForm.reset();
      if (sendBtn) {
        sendBtn.innerHTML = '<i class="fas fa-check"></i> Sent!';
        sendBtn.style.background = '#22c55e';
        sendBtn.style.borderColor = '#22c55e';
      }
      if (formSuccess) {
        formSuccess.classList.add('show');
      }

      setTimeout(() => {
        if (sendBtn) {
          sendBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
          sendBtn.disabled = false;
          sendBtn.style.background = '';
          sendBtn.style.borderColor = '';
        }
        if (formSuccess) formSuccess.classList.remove('show');
      }, 4000);
    }, 1500);
  });
}

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (!href || href === '#') return;
    try {
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    } catch (_) {
      // Safely ignore invalid selectors
    }
  });
});

// ===== HERO IMAGE PARALLAX =====
const heroImageWrap = document.querySelector('.hero-image-wrap');
window.addEventListener('mousemove', (e) => {
  if (!heroImageWrap) return;
  const { innerWidth, innerHeight } = window;
  const x = (e.clientX / innerWidth - 0.5) * 12;
  const y = (e.clientY / innerHeight - 0.5) * 12;
  heroImageWrap.style.transform = `translate(${x}px, ${y}px)`;
});

// ===== SKILL TAGS HOVER RIPPLE =====
document.querySelectorAll('.skill-tag').forEach(tag => {
  tag.addEventListener('mouseenter', function() {
    this.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
  });
});

// ===== COUNTER ANIMATION =====
function animateCounter(el, target, suffix) {
  let current = 0;
  const step = target / 50;
  const timer = setInterval(() => {
    current += step;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    el.textContent = Math.floor(current) + (suffix || '');
  }, 30);
}

const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const statNums = entry.target.querySelectorAll('.stat-num');
      statNums.forEach(num => {
        const text = num.textContent;
        if (text === '2+') animateCounter(num, 2, '+');
        if (text === '6+') animateCounter(num, 6, '+');
      });
      statsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) statsObserver.observe(heroStats);

// ===== SCROLL PROGRESS =====
const scrollProgress = document.createElement('div');
scrollProgress.style.cssText = `
  position: fixed; top: 0; left: 0; height: 3px;
  background: linear-gradient(90deg, #E6C200, #FFD600);
  z-index: 2000; width: 0; transition: width 0.1s linear;
  box-shadow: 0 0 8px rgba(255,214,0,0.7);
`;
document.body.appendChild(scrollProgress);

window.addEventListener('scroll', () => {
  const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
  const pct = (window.scrollY / totalScroll) * 100;
  scrollProgress.style.width = pct + '%';
});

// ===== TYPING EFFECT on Hero Subtitle =====
const heroSub = document.querySelector('.hero-subtitle');
if (heroSub) {
  const text = heroSub.textContent;
  heroSub.textContent = '';
  let i = 0;
  setTimeout(() => {
    const interval = setInterval(() => {
      if (i < text.length) {
        heroSub.textContent += text[i];
        i++;
      } else {
        clearInterval(interval);
      }
    }, 45);
  }, 1200);
}

// ===== MAGNETIC BUTTONS =====
document.querySelectorAll('.btn-primary').forEach(btn => {
  btn.addEventListener('mousemove', function(e) {
    const rect = this.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    this.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px) translateY(-2px)`;
  });
  btn.addEventListener('mouseleave', function() {
    this.style.transform = '';
  });
});
