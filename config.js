/**
 * RAPOSO PROMOÇÕES - ARQUIVO DE CONFIGURAÇÃO CENTRAL
 * 
 * Altere as informações abaixo para personalizar sua Landing Page.
 */

window.RAPOSO_CONFIG = {
  // 1. LINK DO SEU CANAL / GRUPO DO TELEGRAM
  telegramUrl: "https://t.me/seu_canal_raposo_promocoes", // Substitua pelo seu link do Telegram

  // 2. ID DO SEU PIXEL DO FACEBOOK (META)
  facebookPixelId: "123456789012345", // Substitua pelo seu ID de Pixel (ex: 9876543210)

  // 3. TOKEN DA API DE CONVERSÕES DO META (OPCIONAL - SERVER SIDE CAPI)
  // Deixe em branco se for usar apenas o Pixel tradicional do Navegador
  facebookCapiToken: "", // Cole aqui o Token gerado no Gerenciador de Anúncios (ex: EAAB...)

  // 4. NOME DO CANAL E BRANDING
  channelName: "Raposo Promoções",
  tagline: "Achados Diários com até 80% de Desconto",

  // 5. CONFIGURAÇÃO DO CONTADOR DE PESSOAS ONLINE (MOCKADO)
  onlineCounter: {
    min: 310,
    max: 485,
    intervalMs: 4000
  },

  // 6. NOTIFICAÇÕES FLUTUANTES DE PROVA SOCIAL (TOASTS)
  notifications: [
    { name: "Maria S.", city: "São Paulo - SP", action: "entrou no canal agora", time: "Há 12 segundos" },
    { name: "Carlos M.", city: "Rio de Janeiro - RJ", action: "economizou R$ 145 no Mercado Livre", time: "Há 45 segundos" },
    { name: "Fernanda R.", city: "Belo Horizonte - MG", action: "pegou cupom de 50% na Shopee", time: "Há 1 minuto" },
    { name: "João P.", city: "Curitiba - PR", action: "entrou no canal agora", time: "Há 2 minutos" },
    { name: "Luciana K.", city: "Salvador - BA", action: "garantiu lavadora com R$ 400 de desconto", time: "Há 3 minutos" },
    { name: "Rodrigo A.", city: "Campinas - SP", action: "entrou no canal agora", time: "Há 4 minutos" },
    { name: "Patrícia F.", city: "Fortaleza - CE", action: "economizou R$ 89 na Amazon", time: "Há 5 minutos" }
  ]
};
