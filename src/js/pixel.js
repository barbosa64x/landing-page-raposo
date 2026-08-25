/**
 * Meta (Facebook) Pixel Integration Module
 * Handles PageView tracking and custom Lead / CTA Click event tracking.
 */

(function initMetaPixel() {
  const config = window.RAPOSO_CONFIG || {};
  const pixelId = config.facebookPixelId;

  if (!pixelId || pixelId === "123456789012345") {
    console.warn("[Meta Pixel] ID do Pixel não configurado ou usando ID padrão em config.js");
  }

  // Standard Meta Pixel snippet
  !(function (f, b, e, v, n, t, s) {
    if (f.fbq) return;
    n = f.fbq = function () {
      n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
    };
    if (!f._fbq) f._fbq = n;
    n.push = n;
    n.loaded = !0;
    n.version = '2.0';
    n.queue = [];
    t = b.createElement(e);
    t.async = !0;
    t.src = v;
    s = b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t, s);
  })(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');

  if (pixelId) {
    fbq('init', pixelId);
    fbq('track', 'PageView');
    console.log(`[Meta Pixel] Inicializado com Sucesso (ID: ${pixelId}) - Evento PageView Disparado.`);
  }
})();

/**
 * Global Helper to Track Lead / CTA Click
 * @param {string} location - Name of button location (e.g., 'hero', 'sticky_mobile', 'faq_bottom')
 */
window.trackTelegramClick = function (location = 'hero') {
  const config = window.RAPOSO_CONFIG || {};
  const targetUrl = config.telegramUrl || "https://t.me/";

  console.log(`[Meta Pixel] CTA Clicado na localização: ${location}`);

  if (window.fbq) {
    // Track standard Lead event and custom TelegramClick event
    fbq('track', 'Lead', {
      content_name: 'Telegram Channel Join',
      content_category: 'CTA Click',
      button_location: location,
      value: 0.00,
      currency: 'BRL'
    });

    fbq('trackCustom', 'TelegramJoinClick', {
      button_location: location,
      timestamp: new Date().toISOString()
    });
  }

  // Redirect to Telegram channel after short delay or immediately
  setTimeout(() => {
    window.open(targetUrl, '_blank', 'noopener,noreferrer');
  }, 150);
};

