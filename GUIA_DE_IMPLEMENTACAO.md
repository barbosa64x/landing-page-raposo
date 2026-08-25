# 🦊 Guia de Implementação e Personalização - Raposo Promoções

Este documento contém todas as instruções necessárias para personalizar, configurar o Pixel do Facebook, alterar links, hospedar vídeos e realizar o deploy gratuito da sua Landing Page no **Netlify** e **GitHub**.

---

## 📁 Estrutura de Arquivos do Projeto

```text
LandingPage/
├── index.html               # Estrutura principal da Landing Page (HTML5 + Tailwind CSS)
├── config.js                # Arquivo CENTRAL de configurações (Link Telegram, Pixel, Popups)
├── GUIA_DE_IMPLEMENTACAO.md # Este manual passo a passo
├── public/
│   └── logo.png             # Logotipo oficial da Raposo Promoções (Mascote Raposa com Coroa)
└── src/
    ├── css/
    │   └── style.css        # Animações de brilho, botões pulsantes e estilos customizados
    └── js/
        ├── main.js          # Lógica interativa (contador online, popups, vídeo e carrossel)
        └── pixel.js         # Integração e rastreamento oficial do Meta (Facebook) Pixel
```

---

## ⚙️ 1. Como Alterar o Link do Telegram e o ID do Meta Pixel

Todas as configurações principais estão centralizadas no arquivo **`config.js`**. Você não precisa editar o HTML para trocar seu link ou seu Pixel!

### Passo a Passo:
1. Abra o arquivo [`config.js`](file:///c:/Users/Barbosa64x/OnCode%20-%20Projects/LandingPage/config.js).
2. Substitua o link do Telegram e o ID do Pixel nas linhas indicadas:

```javascript
window.RAPOSO_CONFIG = {
  // 1. LINK DO SEU CANAL / GRUPO DO TELEGRAM
  telegramUrl: "https://t.me/SEU_CANAL_AQUI", // Insira o link correto do seu canal

  // 2. ID DO SEU PIXEL DO FACEBOOK (META)
  facebookPixelId: "987654321098765", // Insira o ID do seu Pixel do Gerenciador de Anúncios

  // 3. NOME DO CANAL
  channelName: "Raposo Promoções",
  // ...
};
```

---

## 📊 2. Como Funciona o Rastreamento no Facebook Pixel (Meta Ads)

A Landing Page já possui rastreamento avançado de conversão configurado no arquivo `src/js/pixel.js`.

- **`PageView`**: Disparado automaticamente assim que o visitante acessa a página.
- **`Lead`**: Disparado automaticamente toda vez que o usuário clica em qualquer um dos botões CTA ("ENTRAR NO GRUPO VIP GRATUITO").
- **`TelegramJoinClick`**: Evento personalizado contendo a localização exata do botão clicado (`hero`, `garantia_section`, `final_cta`, `sticky_mobile`).

> [!TIP]
> **Como testar o Pixel?**
> Instale a extensão de navegador gratuita **Meta Pixel Helper** no Google Chrome. Ao abrir a página e clicar no botão do Telegram, a extensão mostrará os eventos `PageView` e `Lead` sendo disparados em verde.

---

## 🎬 3. Como Substituir ou Hospedar o Vídeo Vertical (9:16)

O container de vídeo na Hero Section está preparado para o formato vertical **9:16** (estilo TikTok / Reels / Shorts / Vturb / Panda Video).

### Opção A: YouTube Shorts / Embed Gratuito
1. Faça o upload do vídeo curto no YouTube.
2. Copie o ID do vídeo (exemplo: `dQw4w9WgXcQ`).
3. No arquivo [`index.html`](file:///c:/Users/Barbosa64x/OnCode%20-%20Projects/LandingPage/index.html#L75-L84), substitua o `src` do `iframe`:
```html
<iframe 
  id="video-iframe"
  class="w-full h-full object-cover"
  src="https://www.youtube.com/embed/SEU_ID_AQUI?controls=1" 
  title="Raposo Promoções Vídeo" 
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
  allowfullscreen>
</iframe>
```

### Opção B: Panda Video / Vturb / VTurb Player (Recomendado para VSL)
Substitua o trecho do `<iframe>` pelo código de embed fornecido pela plataforma.

---

## 🖼️ 4. Como Alterar ou Adicionar Depoimentos (Carrossel)

O carrossel de depoimentos utiliza o **Swiper.js**. Os cards estão definidos na seção de depoimentos do [`index.html`](file:///c:/Users/Barbosa64x/OnCode%20-%20Projects/LandingPage/index.html#L210-L310).

Para usar imagens em formato de **prints de telefone**:
1. Salve suas imagens na pasta `public/` (exemplo: `public/depoimento-1.jpg`).
2. Dentro de cada `<div class="swiper-slide">`, insira a tag `<img>`:
```html
<div class="swiper-slide w-[260px] sm:w-[280px]">
  <img src="./public/depoimento-1.jpg" alt="Print Depoimento Telegram" class="w-full rounded-2xl shadow-lg border border-amber-500/30">
</div>
```

---

## 🚀 5. Como Fazer o Deploy Gratuito no Netlify (`app.netlify.com`)

O Netlify permite hospedar esta Landing Page gratuitamente com suporte a SSL (HTTPS) e alta velocidade de entrega (CDN global).

### Método 1: Drag & Drop (Mais Fácil - Sem Git)
1. Acesse **[app.netlify.com](https://app.netlify.com)** e faça login ou crie sua conta gratuita.
2. No painel inicial, acesse a aba **"Sites"**.
3. Arraste e solte toda a pasta do projeto `LandingPage` na área indicada **"Drag and drop your site output folder here"**.
4. Em menos de 5 segundos, sua Landing Page estará no ar com uma URL própria!

### Método 2: Conectando com o GitHub (Deploy Automático)
1. Suba o repositório para a sua conta do GitHub (passo detalhado abaixo).
2. No Netlify, clique em **"Add new site" ➔ "Import from an existing project"**.
3. Selecione **GitHub** e escolha o repositório `LandingPage`.
4. Deixe o campo *Build command* em branco e defina *Publish directory* como `.` (ou `public`).
5. Clique em **"Deploy Site"**. Sempre que você atualizar o código no GitHub, o Netlify atualizará a página automaticamente!

---

## 🐙 6. Como Enviar o Projeto para o Seu GitHub (Commit e Push)

O repositório Git local já foi inicializado e o commit inicial foi realizado.

Para conectar ao seu GitHub pessoal e fazer o Push:

1. Acesse [github.com/new](https://github.com/new) e crie um novo repositório chamado `landing-page-raposo` (ou o nome de sua preferência).
2. Deixe o repositório **Público** ou **Privado** e **NÃO** marque a opção de adicionar README/gitignore (pois já criamos tudo localmente).
3. No seu terminal/PowerShell, rode os dois comandos a seguir (substituindo pelo link do seu repositório):

```bash
# 1. Vincular o repositório remoto ao seu GitHub
git remote add origin https://github.com/SEU_USUARIO_GITHUB/landing-page-raposo.git

# 2. Alterar a branch principal para main
git branch -M main

# 3. Enviar todos os arquivos para o GitHub
git push -u origin main
```

---

## 🛡️ Dicas de Otimização e Conversão

1. **Notificações Flutuantes (Popups)**: No arquivo `config.js`, adicione nomes de cidades da sua região de anúncios para gerar mais identificação com o público local.
2. **Urgência e Escassez**: O contador de pessoas online altera os valores de forma natural a cada 4 segundos para criar sensação de movimento constante na página.
3. **Botão Fixo no Mobile (Sticky CTA)**: O botão surge no rodapé do celular assim que o usuário faz rolagem na página, aumentando a taxa de clique (CTR).

