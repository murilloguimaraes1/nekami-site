/**
 * NEKAMI CULINÁRIA JAPONESA — CLIENT SCRIPTS
 * Mobile-first • Interactive 3D Parallax • Horizontal Carousel • Particles
 */

document.addEventListener('DOMContentLoaded', () => {

  /* ==========================================================================
     1. STRUCTURED DATA (ISOLATED DATA OBJECTS FOR EASY MAINTENANCE)
     ========================================================================== */
  const NEKAMI_DATA = {
    units: [
      {
        id: 'plaza',
        name: 'Plaza Avenida Shopping',
        city: 'São José do Rio Preto - SP',
        address: 'Av. José Munia, 4775 - Jardim Redentor (Praça de Alimentação)',
        cep: '15085-350',
        hours: 'Segunda a Domingo: 11:00 às 22:00',
        serviceTypes: ['Self-Service', 'À La Carte', 'Balcão To-Go'],
        links: {
          whatsapp: 'https://api.whatsapp.com/send/?phone=%2B5517988126226&text&type=phone_number&app_absent=0',
          ifood: 'https://www.ifood.com.br/delivery/sao-jose-do-rio-preto-sp/nekami-sushi--temaki-plaza-jardim-redentor/464fe0f1-9ef7-4ac7-abc4-fad70235bfeb'
        },
        image: 'images/unit_plaza.jpg'
      },
      {
        id: 'iguatemi',
        name: 'Shopping Iguatemi',
        city: 'São José do Rio Preto - SP',
        address: 'Av. Pres. Juscelino K. de Oliveira, 5000 - Iguatemi',
        hours: 'Segunda a Domingo: 11:00 às 22:00',
        serviceTypes: ['Self-Service Premium', 'À La Carte', 'Bebidas'],
        links: {
          whatsapp: 'https://api.whatsapp.com/send/?phone=%2B5517997246326&text&type=phone_number&app_absent=0',
          ifood: 'https://www.ifood.com.br/delivery/sao-jose-do-rio-preto-sp/nekami-sushi--temaki-iguatemi-iguatemi/f99d181d-3497-497a-9081-a89e6e7bed73'
        },
        image: 'images/unit_iguatemi.jpg'
      }
    ],
    social: {
      instagram: 'https://www.instagram.com/nekami.riopreto/'
    },

    categories: [
      {
        id: 'sushi-sashimi',
        title: 'Sushi & Sashimi',
        subtitle: 'Cortes selecionados, frescor todos os dias',
        icon: '🍣',
        badge: 'Destaque',
        image: 'images/menu_sushi_sashimi.jpg'
      },
      {
        id: 'temaki',
        title: 'Temaki',
        subtitle: 'Enrolado na hora, do seu jeito',
        icon: '🌯',
        badge: 'Feito na Hora',
        image: 'images/menu_temaki.jpg'
      },
      {
        id: 'hot-roll',
        title: 'Hot Roll',
        subtitle: 'Empanado e crocante por fora, derretendo por dentro',
        icon: '🔥',
        badge: 'Crocante',
        image: 'images/menu_hot_roll.jpg'
      },
      {
        id: 'poke',
        title: 'Poke',
        subtitle: 'Montagem colorida e leve, no seu ritmo',
        icon: '🥗',
        badge: 'Leve & Colorido',
        image: 'images/menu_poke.jpg'
      },
      {
        id: 'combinados',
        title: 'Combinados',
        subtitle: 'O melhor do cardápio em um só prato',
        icon: '🍱',
        badge: 'Completo',
        image: 'images/menu_combinados.jpg'
      }
    ]
  };

  /* ==========================================================================
     2. NAVIGATION & HEADER SCROLL BEHAVIOR
     ========================================================================== */
  const header = document.getElementById('site-header');
  const navLinks = document.querySelectorAll('.desktop-nav .nav-link');
  const sections = document.querySelectorAll('main section, footer#contato');

  const handleHeaderScroll = () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // Active link highlighting on scroll
    let currentSectionId = '';
    const scrollPosition = window.scrollY + 120;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollPosition >= top && scrollPosition < top + height) {
        currentSectionId = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSectionId}`) {
        link.classList.add('active');
      }
    });
  };

  window.addEventListener('scroll', handleHeaderScroll, { passive: true });
  handleHeaderScroll();

  /* ==========================================================================
     3. MOBILE NAVIGATION DRAWER
     ========================================================================== */
  const mobileToggle = document.getElementById('mobile-toggle');
  const mobileDrawer = document.getElementById('mobile-drawer');
  const drawerClose = document.getElementById('drawer-close');
  const drawerOverlay = document.getElementById('drawer-overlay');
  const drawerLinks = document.querySelectorAll('.drawer-link, .drawer-cta');

  const openDrawer = () => {
    mobileDrawer.classList.add('is-open');
    mobileToggle.classList.add('is-active');
    mobileToggle.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  };

  const closeDrawer = () => {
    mobileDrawer.classList.remove('is-open');
    mobileToggle.classList.remove('is-active');
    mobileToggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  };

  if (mobileToggle) mobileToggle.addEventListener('click', openDrawer);
  if (drawerClose) drawerClose.addEventListener('click', closeDrawer);
  if (drawerOverlay) drawerOverlay.addEventListener('click', closeDrawer);

  drawerLinks.forEach(link => {
    link.addEventListener('click', () => {
      closeDrawer();
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileDrawer.classList.contains('is-open')) {
      closeDrawer();
    }
  });

  /* ==========================================================================
     4. HERO 3D PARALLAX & KEN BURNS INTERACTION
     ========================================================================== */
  const heroMedia = document.getElementById('hero-bg-media');
  const heroSection = document.getElementById('inicio');

  let mouseX = 0;
  let mouseY = 0;
  let targetX = 0;
  let targetY = 0;

  if (heroSection && heroMedia && window.matchMedia('(min-width: 992px)').matches) {
    heroSection.addEventListener('mouseleave', () => {
      targetX = 0;
      targetY = 0;
    });

    heroSection.addEventListener('mousemove', (e) => {
      const rect = heroSection.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      targetX = x * 20; // subtle shift in px
      targetY = y * 14;
    });

    const updateHeroParallax = () => {
      mouseX += (targetX - mouseX) * 0.08;
      mouseY += (targetY - mouseY) * 0.08;

      if (window.scrollY < window.innerHeight) {
        const scrollOffset = window.scrollY * 0.22;
        heroMedia.style.transform = `scale(1.04) translate3d(${mouseX.toFixed(2)}px, ${(mouseY + scrollOffset).toFixed(2)}px, 0)`;
      }
      requestAnimationFrame(updateHeroParallax);
    };

    updateHeroParallax();
  }

  /* ==========================================================================
     5. HORIZONTAL CONTINUOUS CAROUSEL WITH MARQUEE & INTERACTIVE SWIPE
     ========================================================================== */
  const carouselViewport = document.getElementById('carousel-viewport');
  const carouselTrack = document.getElementById('carousel-track');
  const btnPrev = document.getElementById('carousel-prev');
  const btnNext = document.getElementById('carousel-next');

  if (carouselViewport && carouselTrack) {
    // Clone cards to enable seamless infinite scroll experience
    const originalCards = Array.from(carouselTrack.children);
    originalCards.forEach(card => {
      const clone = card.cloneNode(true);
      clone.setAttribute('aria-hidden', 'true');
      carouselTrack.appendChild(clone);
    });

    let autoScrollSpeed = 0.75; // Pixels per frame
    let isPaused = false;
    let isDragging = false;
    let startX = 0;
    let scrollLeftStart = 0;

    // Continuous smooth translation loop
    const stepContinuous = () => {
      if (!isPaused && !isDragging) {
        carouselViewport.scrollLeft += autoScrollSpeed;

        // When reaching midpoint of duplicated content, seamlessly reset without jump
        const maxScroll = carouselTrack.scrollWidth / 2;
        if (carouselViewport.scrollLeft >= maxScroll) {
          carouselViewport.scrollLeft -= maxScroll;
        }
      }
      requestAnimationFrame(stepContinuous);
    };
    requestAnimationFrame(stepContinuous);

    // Pause on hover
    carouselViewport.addEventListener('mouseenter', () => { isPaused = true; });
    carouselViewport.addEventListener('mouseleave', () => { if (!isDragging) isPaused = false; });

    // Touch & Pointer Drag support
    carouselViewport.addEventListener('pointerdown', (e) => {
      isDragging = true;
      isPaused = true;
      startX = e.pageX - carouselViewport.offsetLeft;
      scrollLeftStart = carouselViewport.scrollLeft;
      carouselViewport.style.scrollBehavior = 'auto';
    });

    window.addEventListener('pointermove', (e) => {
      if (!isDragging) return;
      e.preventDefault();
      const x = e.pageX - carouselViewport.offsetLeft;
      const walk = (x - startX) * 1.5;
      carouselViewport.scrollLeft = scrollLeftStart - walk;
    });

    const stopDragging = () => {
      if (isDragging) {
        isDragging = false;
        carouselViewport.style.scrollBehavior = 'smooth';
        setTimeout(() => { isPaused = false; }, 1200);
      }
    };

    window.addEventListener('pointerup', stopDragging);
    window.addEventListener('pointercancel', stopDragging);

    // Manual Arrow Navigation
    const cardStep = 280; // card width + gap
    if (btnPrev) {
      btnPrev.addEventListener('click', () => {
        isPaused = true;
        carouselViewport.scrollBy({ left: -cardStep, behavior: 'smooth' });
        setTimeout(() => { isPaused = false; }, 2500);
      });
    }

    if (btnNext) {
      btnNext.addEventListener('click', () => {
        isPaused = true;
        carouselViewport.scrollBy({ left: cardStep, behavior: 'smooth' });
        setTimeout(() => { isPaused = false; }, 2500);
      });
    }
  }

  /* ==========================================================================
     6. 3D TILT EFFECT ON CARDS (DESKTOP & TOUCH INTERACTION)
     ========================================================================== */
  const tiltCards = document.querySelectorAll('.tilt-card');

  if (window.matchMedia('(min-width: 768px)').matches) {
    tiltCards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        // Dynamic tilt angles
        const rotateX = ((y - centerY) / centerY) * -7;
        const rotateY = ((x - centerX) / centerX) * 7;

        card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg) translateY(0px)';
      });
    });
  }

  /* ==========================================================================
     6.1 SUBTLE SCROLL PARALLAX ON CRAFT & UNIT CARD IMAGES
     ========================================================================== */
  const depthMedia = document.querySelectorAll('.unidade-media .unidade-img, .visual-card-main .visual-img');
  const handleDepthParallax = () => {
    depthMedia.forEach(img => {
      const rect = img.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        const progress = (rect.top / window.innerHeight) - 0.5;
        const shiftY = progress * 14; // gentle shift between -7px and +7px
        img.style.transform = `scale(1.04) translate3d(0, ${shiftY}px, 0)`;
      }
    });
  };

  window.addEventListener('scroll', handleDepthParallax, { passive: true });
  handleDepthParallax();

  /* ==========================================================================
     7. SCROLL REVEAL (INTERSECTION OBSERVER WITH STAGGER)
     ========================================================================== */
  const revealElements = document.querySelectorAll('.reveal-item');

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const delay = entry.target.dataset.delay || 0;
          setTimeout(() => {
            entry.target.classList.add('is-revealed');
          }, delay);
          observer.unobserve(entry.target);
        }
      });
    }, {
      rootMargin: '0px 0px -40px 0px',
      threshold: 0.1
    });

    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    revealElements.forEach(el => el.classList.add('is-revealed'));
  }

  /* ==========================================================================
     8. FLOATING AMBIENT LIGHT PARTICLES / EMBERS (CANVAS)
     ========================================================================== */
  const canvas = document.getElementById('particles-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    }, { passive: true });

    // Particle count: 28 for mobile, 45 for desktop (ultra-lightweight)
    const particleCount = window.innerWidth < 768 ? 24 : 45;
    const particles = [];

    class Particle {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * width;
        this.y = height + Math.random() * 80;
        this.size = Math.random() * 2.2 + 0.8;
        this.speedY = Math.random() * 0.45 + 0.15;
        this.speedX = (Math.random() - 0.5) * 0.3;
        this.opacity = Math.random() * 0.55 + 0.15;
        // Warm salmon / ember orange palette
        const colors = [
          'rgba(232, 84, 30, ',
          'rgba(255, 110, 56, ',
          'rgba(201, 134, 59, ',
          'rgba(255, 180, 100, '
        ];
        this.color = colors[Math.floor(Math.random() * colors.length)];
      }

      update() {
        this.y -= this.speedY;
        this.x += this.speedX;

        if (this.y < -20 || this.x < -20 || this.x > width + 20) {
          this.reset();
        }
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `${this.color}${this.opacity})`;
        ctx.shadowBlur = 10;
        ctx.shadowColor = 'rgba(232, 84, 30, 0.4)';
        ctx.fill();
      }
    }

    for (let i = 0; i < particleCount; i++) {
      const p = new Particle();
      p.y = Math.random() * height; // distribute initially
      particles.push(p);
    }

    const animateParticles = () => {
      ctx.clearRect(0, 0, width, height);
      particles.forEach(p => {
        p.update();
        p.draw();
      });
      requestAnimationFrame(animateParticles);
    };

    animateParticles();
  }

  // Smooth scroll click handler for internal links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

});
