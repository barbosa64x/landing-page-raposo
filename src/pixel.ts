import { RAPOSO_CONFIG } from './config';

declare global {
  interface Window {
    fbq?: any;
    trackWhatsAppClick?: (location?: string) => void;
    trackTelegramClick?: (location?: string) => void;
  }
}

export function trackWhatsAppClick(location: string = 'hero') {
  const config = RAPOSO_CONFIG;
  const targetUrl = config.whatsappUrl || config.telegramUrl || "https://chat.whatsapp.com/";

  console.log(`[Meta Pixel] CTA WhatsApp Clicado na localização: ${location}`);

  // 1. Rastreamento via Navegador (Pixel Standard)
  if (window.fbq && config.facebookPixelId) {
    window.fbq('track', 'Lead', {
      content_name: 'WhatsApp Group Join',
      content_category: 'CTA Click',
      button_location: location,
      value: 0.00,
      currency: 'BRL'
    });

    window.fbq('trackCustom', 'WhatsAppJoinClick', {
      button_location: location,
      timestamp: new Date().toISOString()
    });
  }

  // 2. Rastreamento via Servidor (API de Conversões CAPI)
  fetch('/.netlify/functions/pixel', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      eventName: 'Lead',
      location: location,
      pixelId: config.facebookPixelId,
      sourceUrl: window.location.href
    })
  }).catch(err => console.log('[Meta CAPI] Erro ao disparar evento server-side:', err));

  // Redirect to WhatsApp group after short delay
  setTimeout(() => {
    window.open(targetUrl, '_blank', 'noopener,noreferrer');
  }, 150);
}

// Alias for backwards compatibility
export const trackTelegramClick = trackWhatsAppClick;

// Bind to window to allow legacy integration if necessary
if (typeof window !== 'undefined') {
  window.trackWhatsAppClick = trackWhatsAppClick;
  window.trackTelegramClick = trackWhatsAppClick;

  // Auto-initialize Pixel Standard
  if (window.fbq && RAPOSO_CONFIG.facebookPixelId) {
    window.fbq('init', RAPOSO_CONFIG.facebookPixelId);
    window.fbq('track', 'PageView');
    console.log(`[Meta Pixel] Standard Initialized (ID: ${RAPOSO_CONFIG.facebookPixelId}) & PageView registered.`);
  } else {
    console.warn("[Meta Pixel] facebookPixelId não configurado ou biblioteca fbq não carregada.");
  }
}
