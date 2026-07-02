/* =========================================================
   THIAGO PAULINO — script.js
   Funções: header, menu mobile, animações e vídeos leves.
   ========================================================= */

(() => {
  'use strict';

  const header = document.querySelector('#siteHeader');
  const menu = document.querySelector('#mobileMenu');
  const openButton = document.querySelector('.menu-button');
  const closeButton = document.querySelector('.menu-close');
  const revealItems = document.querySelectorAll('.reveal');
  const videos = document.querySelectorAll('.managed-video');

  let scrollQueued = false;

  function onScroll() {
    if (!header || scrollQueued) return;

    scrollQueued = true;
    requestAnimationFrame(() => {
      header.classList.toggle('scrolled', window.scrollY > 24);
      scrollQueued = false;
    });
  }

  function openMenu() {
    if (!menu || !openButton) return;

    menu.hidden = false;
    requestAnimationFrame(() => menu.classList.add('is-open'));
    document.body.classList.add('no-scroll');
    openButton.setAttribute('aria-expanded', 'true');
  }

  function closeMenu() {
    if (!menu || !openButton) return;

    menu.classList.remove('is-open');
    document.body.classList.remove('no-scroll');
    openButton.setAttribute('aria-expanded', 'false');

    window.setTimeout(() => {
      if (!menu.classList.contains('is-open')) menu.hidden = true;
    }, 300);
  }

  function initMenu() {
    openButton?.addEventListener('click', openMenu);
    closeButton?.addEventListener('click', closeMenu);

    menu?.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', closeMenu);
    });
  }

  function initReveal() {
    if (!revealItems.length) return;

    if (!('IntersectionObserver' in window)) {
      revealItems.forEach((item) => item.classList.add('is-visible'));
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -48px 0px'
    });

    revealItems.forEach((item) => observer.observe(item));
  }

  function loadVideo(video) {
    if (!video || video.dataset.loaded === 'true') return;
    if (!video.dataset.src) return;

    video.src = video.dataset.src;
    video.load();
    video.dataset.loaded = 'true';
  }

  function tryPlayVideo(video) {
    if (!video) return;
    loadVideo(video);
    video.play?.().catch(() => {});
  }

  function initVideos() {
    if (!videos.length) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    videos.forEach((video) => {
      video.muted = true;
      video.playsInline = true;
      video.preload = 'none';
      video.addEventListener('pointerenter', () => loadVideo(video), { once: true });
      video.addEventListener('click', () => tryPlayVideo(video));
      video.addEventListener('touchstart', () => tryPlayVideo(video), { passive: true, once: true });
    });

    if (!('IntersectionObserver' in window)) {
      videos.forEach(loadVideo);
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const video = entry.target;

        if (!entry.isIntersecting) {
          video.pause?.();
          return;
        }

        loadVideo(video);

        if (!prefersReducedMotion) {
          tryPlayVideo(video);
        }
      });
    }, {
      threshold: 0.08,
      rootMargin: '220px 0px'
    });

    videos.forEach((video) => observer.observe(video));
  }

  function initWhatsAppForm() {
    const form = document.querySelector('#whatsappForm');
    if (!form) return;

    const feedback = form.querySelector('#serviceFeedback');

    form.addEventListener('submit', (event) => {
      event.preventDefault();

      const formData = new FormData(form);
      const selectedServices = formData.getAll('services');

      if (!selectedServices.length) {
        if (feedback) feedback.textContent = 'Selecione pelo menos um serviço para continuar.';
        form.querySelector('.service-fieldset')?.focus?.();
        return;
      }

      if (feedback) feedback.textContent = '';

      const name = String(formData.get('name') || '').trim();
      const whatsapp = String(formData.get('whatsapp') || '').trim();
      const message = String(formData.get('message') || '').trim();
      const phone = form.dataset.phone || '5511998132701';

      const lines = [
        'Olá, Thiago! Vim pelo site e gostaria de atendimento.',
        '',
        `Nome: ${name}`,
        `WhatsApp: ${whatsapp}`,
        `Serviços de interesse: ${selectedServices.join(', ')}`,
      ];

      if (message) {
        lines.push(`Mensagem: ${message}`);
      }

      const url = `https://wa.me/${phone}?text=${encodeURIComponent(lines.join('\n'))}`;
      window.open(url, '_blank', 'noopener');
    });
  }

  function initServiceCarousel() {
    const carousel = document.querySelector('.service-carousel');
    if (!carousel) return;

    const track = carousel.querySelector('.service-options');
    if (!track) return;

    const lockPageHorizontalScroll = () => {
      const top = window.scrollY || document.documentElement.scrollTop || 0;
      document.documentElement.scrollLeft = 0;
      document.body.scrollLeft = 0;

      if (window.scrollX !== 0) {
        window.scrollTo({ left: 0, top, behavior: 'auto' });
      }
    };

    carousel.querySelectorAll('[data-service-scroll]').forEach((button) => {
      button.addEventListener('click', () => {
        const direction = Number(button.dataset.serviceScroll || 1);
        const distance = Math.max(track.clientWidth * 0.76, 220);

        track.scrollBy({
          left: direction * distance,
          behavior: 'smooth'
        });
      });
    });

    carousel.querySelectorAll('.service-chip').forEach((chip) => {
      const input = chip.querySelector('input[name="services"]');
      const control = chip.querySelector('span');
      if (!input || !control) return;

      input.tabIndex = -1;
      control.setAttribute('role', 'checkbox');
      control.setAttribute('tabindex', '0');
      control.setAttribute('aria-checked', input.checked ? 'true' : 'false');

      const toggleService = () => {
        input.checked = !input.checked;
        input.dispatchEvent(new Event('change', { bubbles: true }));
      };

      chip.addEventListener('click', (event) => {
        event.preventDefault();
        toggleService();
      });

      control.addEventListener('keydown', (event) => {
        if (event.key !== 'Enter' && event.key !== ' ') return;
        event.preventDefault();
        toggleService();
      });

      input.addEventListener('change', () => {
        control.setAttribute('aria-checked', input.checked ? 'true' : 'false');
        lockPageHorizontalScroll();
        requestAnimationFrame(lockPageHorizontalScroll);
      });
    });
  }

  function initBrideCarousel() {
    const carousel = document.querySelector('.bride-carousel');
    if (!carousel) return;

    const track = carousel.querySelector('.bride-gallery');
    if (!track) return;

    carousel.querySelectorAll('[data-bride-scroll]').forEach((button) => {
      button.addEventListener('click', () => {
        const direction = Number(button.dataset.brideScroll || 1);
        const distance = Math.max(track.clientWidth * 0.9, 260);

        track.scrollBy({
          left: direction * distance,
          behavior: 'smooth'
        });
      });
    });
  }

  function init() {
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    initMenu();
    initReveal();
    initVideos();
    initWhatsAppForm();
    initServiceCarousel();
    initBrideCarousel();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }
})();
