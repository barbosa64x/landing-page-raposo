/**
 * RAPOSO PROMOÇÕES - ARQUIVO DE CONFIGURAÇÃO CENTRAL
 * 
 * Altere as informações abaixo para personalizar sua Landing Page.
 */

window.RAPOSO_CONFIG = {
  // 1. LINK DO SEU CANAL / GRUPO DO TELEGRAM
  telegramUrl: "https://t.me/raposodaspromo", // Substitua pelo seu link do Telegram

  // 2. ID DO SEU PIXEL DO FACEBOOK (META)
  facebookPixelId: "2527556281306713", // Substitua pelo seu ID de Pixel (ex: 9876543210)

  // 3. TOKEN DA API DE CONVERSÕES DO META (CAPI)
  // ⚠️ SEGURANÇA: Não coloque o token aqui — ele fica exposto publicamente no navegador.
  // Configure a variável de ambiente FACEBOOK_CAPI_TOKEN diretamente no painel do Netlify:
  // Netlify → Site → Site Configuration → Environment Variables
  // Se esta opção estiver vazia (""), o Pixel do navegador continuará funcionando normalmente.
  facebookCapiToken: "", // Deixe vazio aqui. Use variável de ambiente no Netlify.


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
    { avatar: "https://randomuser.me/api/portraits/women/44.jpg", name: "Maria S.", city: "São Paulo - SP", action: "entrou no canal agora", time: "Há 12 segundos" },
    { avatar: "https://randomuser.me/api/portraits/men/32.jpg",   name: "Carlos M.", city: "Rio de Janeiro - RJ", action: "economizou R$ 145 no Mercado Livre", time: "Há 45 segundos" },
    { avatar: "https://randomuser.me/api/portraits/women/68.jpg", name: "Fernanda R.", city: "Belo Horizonte - MG", action: "pegou cupom de 50% na Shopee", time: "Há 1 minuto" },
    { avatar: "https://randomuser.me/api/portraits/men/75.jpg",   name: "João P.", city: "Curitiba - PR", action: "entrou no canal agora", time: "Há 2 minutos" },
    { avatar: "https://randomuser.me/api/portraits/women/17.jpg", name: "Luciana K.", city: "Salvador - BA", action: "garantiu lavadora com R$ 400 de desconto", time: "Há 3 minutos" },
    { avatar: "https://randomuser.me/api/portraits/men/56.jpg",   name: "Rodrigo A.", city: "Campinas - SP", action: "entrou no canal agora", time: "Há 4 minutos" },
    { avatar: "https://randomuser.me/api/portraits/women/29.jpg", name: "Patrícia F.", city: "Fortaleza - CE", action: "economizou R$ 89 na Amazon", time: "Há 5 minutos" }
  ]
};
