export interface OnlineCounterConfig {
  min: number;
  max: number;
  intervalMs: number;
}

export interface NotificationConfig {
  avatar: string;
  name: string;
  city: string;
  action: string;
  time: string;
}

export interface RaposoConfig {
  whatsappUrl: string;
  telegramUrl: string;
  facebookPixelId: string;
  facebookCapiToken: string;
  channelName: string;
  tagline: string;
  onlineCounter: OnlineCounterConfig;
  notifications: NotificationConfig[];
}

export const RAPOSO_CONFIG: RaposoConfig = {
  // 1. LINK DO SEU GRUPO DO WHATSAPP
  whatsappUrl: "https://chat.whatsapp.com/F6KVyNE0oDQ37uZOI72i8t",
  telegramUrl: "https://chat.whatsapp.com/F6KVyNE0oDQ37uZOI72i8t", // Mantido para compatibilidade

  // 2. ID DO SEU PIXEL DO FACEBOOK (META)
  facebookPixelId: "2527556281306713", // Substitua pelo seu ID de Pixel (ex: 9876543210)

  // 3. TOKEN DA API DE CONVERSÕES DO META (CAPI)
  facebookCapiToken: "", // Deixe vazio aqui. Use variável de ambiente no Netlify.

  // 4. NOME DO GRUPO E BRANDING
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
    { avatar: "https://randomuser.me/api/portraits/women/12.jpg", name: "Maria S.",    city: "São Paulo - SP",       action: "entrou no grupo agora",                      time: "Há 12 segundos" },
    { avatar: "https://randomuser.me/api/portraits/men/61.jpg",   name: "Carlos M.",   city: "Rio de Janeiro - RJ",  action: "economizou R$ 145 no Mercado Livre",          time: "Há 45 segundos" },
    { avatar: "https://randomuser.me/api/portraits/women/53.jpg", name: "Fernanda R.", city: "Belo Horizonte - MG",  action: "pegou cupom de 50% na Shopee",               time: "Há 1 minuto"    },
    { avatar: "https://randomuser.me/api/portraits/men/14.jpg",   name: "João P.",     city: "Curitiba - PR",        action: "entrou no grupo agora",                      time: "Há 2 minutos"   },
    { avatar: "https://randomuser.me/api/portraits/women/81.jpg", name: "Luciana K.",  city: "Salvador - BA",        action: "garantiu lavadora com R$ 400 de desconto",   time: "Há 3 minutos"   },
    { avatar: "https://randomuser.me/api/portraits/men/47.jpg",   name: "Rodrigo A.",  city: "Campinas - SP",        action: "entrou no grupo agora",                      time: "Há 4 minutos"   },
    { avatar: "https://randomuser.me/api/portraits/women/36.jpg", name: "Patrícia F.", city: "Fortaleza - CE",       action: "economizou R$ 89 na Amazon",                 time: "Há 5 minutos"   }
  ]
};
