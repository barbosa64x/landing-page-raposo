/**
 * Meta Pixel - Módulo de Rastreamento de Eventos de Clique
 * O snippet base (fbq init + PageView) está INLINE no index.html para ser detectado
 * por ferramentas como Meta Ads Data Advisor e Meta Pixel Helper.
 * Este arquivo gerencia apenas eventos de clique (Lead, CAPI server-side).
 */

(function verifyPixel() {
  const config = window.RAPOSO_CONFIG || {};
  const pixelId = config.facebookPixelId;
  if (!pixelId) {
    console.warn("[Meta Pixel] ID do Pixel não configurado em config.js");
    return;
  }
  console.log(`[Meta Pixel] Ativo (ID: ${pixelId}) — PageView já registrado.`);
})();


/**
 * Global Helper to Track Lead / CTA Click (Browser + Server-Side CAPI)
 * @param {string} location - Name of button location (e.g., 'hero', 'sticky_mobile', 'garantia_section')
 */
window.trackTelegramClick = function (location = 'hero') {
  const config = window.RAPOSO_CONFIG || {};
  const targetUrl = config.telegramUrl || "https://t.me/";

  console.log(`[Meta Pixel] CTA Clicado na localização: ${location}`);

  // 1. Rastreamento via Navegador (Pixel Standard)
  if (window.fbq && config.facebookPixelId && config.facebookPixelId !== "123456789012345") {
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

  // 2. Rastreamento via Servidor (API de Conversões CAPI)
  // A função Netlify usa a variável de ambiente FACEBOOK_CAPI_TOKEN — seguro ✅
  fetch('/.netlify/functions/pixel', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        eventName: 'Lead',
        location: location,
        pixelId: config.facebookPixelId,
        // ⚠️ NÃO enviar o token aqui — a função Netlify lê de process.env.FACEBOOK_CAPI_TOKEN
        sourceUrl: window.location.href
      })
    }).catch(err => console.log('[Meta CAPI] Erro ao disparar evento server-side:', err));


  // Redirect to Telegram channel after short delay
  setTimeout(() => {
    window.open(targetUrl, '_blank', 'noopener,noreferrer');
  }, 150);
};
