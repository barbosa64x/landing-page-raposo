/**
 * RAPOSO PROMOÇÕES - MAIN INTERACTIVE LOGIC
 */

document.addEventListener('DOMContentLoaded', () => {
  const config = window.RAPOSO_CONFIG || {};

  // ==========================================
  // 1. DYNAMIC ONLINE USER COUNTER
  // ==========================================
  const counterEl = document.getElementById('online-counter-val');
  if (counterEl && config.onlineCounter) {
    let currentVal = Math.floor(
      Math.random() * (config.onlineCounter.max - config.onlineCounter.min + 1) + config.onlineCounter.min
    );
    counterEl.textContent = currentVal;

    setInterval(() => {
      // Random delta between -3 and +5
      const delta = Math.floor(Math.random() * 9) - 3;
      currentVal = Math.max(config.onlineCounter.min, Math.min(config.onlineCounter.max, currentVal + delta));
      counterEl.textContent = currentVal;
    }, config.onlineCounter.intervalMs || 4000);
  }

  // ==========================================
  // 2. SOCIAL PROOF FLOATING TOAST (TOP CENTER)
  // ==========================================
  const toastEl = document.getElementById('social-proof-toast');
  const toastAvatar = document.getElementById('toast-avatar');
  const toastName = document.getElementById('toast-name');
  const toastCity = document.getElementById('toast-city');
  const toastAction = document.getElementById('toast-action');
  const toastTime = document.getElementById('toast-time');

  if (toastEl && config.notifications && config.notifications.length > 0) {
    let toastIndex = 0;

    function showNextToast() {
      const item = config.notifications[toastIndex];
      if (toastAvatar && item.avatar) toastAvatar.src = item.avatar;
      if (toastName) toastName.textContent = item.name;
      if (toastCity) toastCity.textContent = item.city;
      if (toastAction) toastAction.textContent = item.action;
      if (toastTime) toastTime.textContent = item.time;

      // Slide down from top center
      toastEl.classList.remove('-translate-y-24', 'opacity-0');
      toastEl.classList.add('translate-y-0', 'opacity-100');

      // Hide after 4 seconds
      setTimeout(() => {
        toastEl.classList.remove('translate-y-0', 'opacity-100');
        toastEl.classList.add('-translate-y-24', 'opacity-0');
      }, 4000);

      toastIndex = (toastIndex + 1) % config.notifications.length;
    }

    // Initial show after 2.5 seconds
    setTimeout(() => {
      showNextToast();
      // Loop every 8 seconds
      setInterval(showNextToast, 8000);
    }, 2500);
  }

  // ==========================================
  // 3. STICKY MOBILE CTA VISIBILITY ON SCROLL
  // ==========================================
  const stickyCta = document.getElementById('sticky-mobile-cta');
  const heroCta = document.getElementById('hero-main-cta');

  if (stickyCta && heroCta) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // If hero CTA is not visible, show sticky CTA on mobile
          if (!entry.isIntersecting) {
            stickyCta.classList.remove('translate-y-32');
            stickyCta.classList.add('translate-y-0');
          } else {
            stickyCta.classList.remove('translate-y-0');
            stickyCta.classList.add('translate-y-32');
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(heroCta);
  }

  // ==========================================
  // 4. VERTICAL VIDEO OVERLAY INTERACTION
  // ==========================================
  const videoWrapper = document.getElementById('video-player-wrapper');
  const videoOverlay = document.getElementById('video-overlay');
  const videoIframe = document.getElementById('video-iframe');

  if (videoWrapper && videoOverlay) {
    videoOverlay.addEventListener('click', () => {
      videoOverlay.classList.add('hidden');
      if (videoIframe) {
        const currentSrc = videoIframe.getAttribute('src');
        if (currentSrc && !currentSrc.includes('autoplay=1')) {
          const separator = currentSrc.includes('?') ? '&' : '?';
          videoIframe.setAttribute('src', currentSrc + separator + 'autoplay=1&muted=0');
        }
      }
    });
  }
});
