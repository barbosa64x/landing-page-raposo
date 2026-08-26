import { useState, useEffect, useRef } from 'react';
import { 
  MessageCircle, 
  Crown, 
  Search, 
  Tag, 
  BellRing, 
  ShieldCheck, 
  CheckCircle2, 
  Smartphone, 
  Lock, 
  ChevronDown, 
  ArrowRight,
  TrendingUp
} from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import { RAPOSO_CONFIG } from './config';
import { trackWhatsAppClick } from './pixel';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

export default function App() {
  const [onlineCount, setOnlineCount] = useState(RAPOSO_CONFIG.onlineCounter.min);
  const [currentToastIdx, setCurrentToastIdx] = useState(0);
  const [toastVisible, setToastVisible] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [isHeroVisible, setIsHeroVisible] = useState(true);

  const heroRef = useRef<HTMLElement>(null);

  const toastItem = RAPOSO_CONFIG.notifications[currentToastIdx];

  // 1. Dynamic Online User Counter
  useEffect(() => {
    // Initial random value
    setOnlineCount(
      Math.floor(
        Math.random() * (RAPOSO_CONFIG.onlineCounter.max - RAPOSO_CONFIG.onlineCounter.min + 1) + 
        RAPOSO_CONFIG.onlineCounter.min
      )
    );

    const interval = setInterval(() => {
      setOnlineCount((prev) => {
        const delta = Math.floor(Math.random() * 9) - 3; // random delta between -3 and +5
        return Math.max(
          RAPOSO_CONFIG.onlineCounter.min, 
          Math.min(RAPOSO_CONFIG.onlineCounter.max, prev + delta)
        );
      });
    }, RAPOSO_CONFIG.onlineCounter.intervalMs);

    return () => clearInterval(interval);
  }, []);

  // 2. Social Proof Floating Toast Loop
  useEffect(() => {
    const showNextToast = () => {
      setToastVisible(true);
      
      // Hide after 4 seconds
      const hideTimeout = setTimeout(() => {
        setToastVisible(false);
        // Wait for slide-out animation (500ms) before transitioning index
        const indexTimeout = setTimeout(() => {
          setCurrentToastIdx((prev) => (prev + 1) % RAPOSO_CONFIG.notifications.length);
        }, 500);
        return () => clearTimeout(indexTimeout);
      }, 4000);

      return () => clearTimeout(hideTimeout);
    };

    // First toast after 2.5s
    const initialTimeout = setTimeout(() => {
      showNextToast();
      // Setup interval every 8s
      const interval = setInterval(showNextToast, 8000);
      return () => clearInterval(interval);
    }, 2500);

    return () => clearTimeout(initialTimeout);
  }, []);

  // 3. Hero Section Intersection Observer (Hide Popup in Hero)
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsHeroVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (heroRef.current) {
      observer.observe(heroRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleFAQToggle = (idx: number) => {
    setOpenFaq(openFaq === idx ? null : idx);
  };

  return (
    <div className="bg-midnight-canvas text-frost-glow min-h-screen relative font-untitled-sans overflow-x-hidden selection:bg-void-violet selection:text-pure-white pb-32 md:pb-12">
      {/* BACKGROUND EFFECTS */}
      <div className="absolute inset-0 blueprint-grid pointer-events-none z-0 min-h-full" />
      <div className="absolute top-0 left-0 right-0 h-[650px] spotlight-halo pointer-events-none z-0" />

      {/* ==========================================
           TOP NOTICE BAR (Contador de Acessos Online)
           ========================================== */}
      <header className="relative z-40 bg-[#05060f]/60 backdrop-blur-md border-b border-glass-edge py-2.5 px-4 text-center">
        <div className="max-w-4xl mx-auto flex items-center justify-center gap-2 text-xs md:text-sm font-medium">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-void-violet opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-void-violet"></span>
          </span>
          <span className="text-moon-mist">
            🔥 <strong className="text-pure-white font-semibold">{onlineCount}</strong> pessoas economizando agora • Cupons 100% Gratuitos
          </span>
        </div>
      </header>

      {/* CONTENT WRAPPER */}
      <main className="relative z-10 max-w-[480px] mx-auto px-4 pt-8 space-y-16">
        
        {/* ==========================================
             HERO SECTION (AIDA Copy + Mascot)
             ========================================== */}
        <section ref={heroRef} className="text-center space-y-6">
          {/* Logo & Glow */}
          <div className="flex justify-center">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-void-violet to-fox-gold rounded-full blur-md opacity-50 group-hover:opacity-70 transition duration-1000"></div>
              <img 
                src="/logo.png" 
                alt={RAPOSO_CONFIG.channelName} 
                className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full border-2 border-glass-edge object-cover shadow-2xl logo-gold-glow"
              />
            </div>
          </div>

          {/* Eyebrow */}
          <div className="flex items-center gap-3 justify-center">
            <div className="eyebrow-line" />
            <span className="font-dotdigital text-xs uppercase tracking-[0.15em] text-moon-mist flex items-center gap-1.5">
              <Crown className="w-3.5 h-3.5 text-fox-gold" />
              {RAPOSO_CONFIG.channelName}
            </span>
            <div className="eyebrow-line" />
          </div>

          {/* Heading */}
          <h1 className="font-display text-3xl sm:text-4xl font-semibold leading-tight tracking-tight text-pure-white">
            Economize até{" "}
            <span className="relative inline-block whitespace-nowrap">
              <span className="text-skywash font-bold">80% em Compras</span>
              <svg className="absolute -bottom-2.5 left-0 w-full h-3 text-fox-gold drop-shadow-[0_2px_6px_rgba(224,86,27,0.4)]" viewBox="0 0 250 14" fill="none" preserveAspectRatio="none">
                <path d="M4 9.5C65 2.5 185 2.5 246 9.5" stroke="currentColor" strokeWidth="4.5" strokeLinecap="round"/>
              </svg>
            </span>{" "}
            no Mercado Livre, Shopee e Amazon!
          </h1>

          {/* Subheading */}
          <p className="text-moon-mist text-sm leading-relaxed max-w-sm mx-auto">
            O Raposo rastreia e envia diariamente cupons secretos, erros de preço e pechinchas exclusivas. Entre <strong>100% grátis no WhatsApp</strong> antes que os estoques se esgotem!
          </p>

          {/* CTA Action Stack */}
          <div className="space-y-3 pt-2">
            <button 
              onClick={() => trackWhatsAppClick('hero')}
              className="w-full py-5 px-8 rounded-full bg-void-violet text-pure-white font-bold text-base sm:text-lg tracking-wide transition-all btn-cta-pulse active:scale-[0.98] flex items-center justify-center gap-2.5 border-t border-glass-edge shadow-[0_0_24px_rgba(224,86,27,0.4)] hover:brightness-110"
            >
              <MessageCircle className="w-5 h-5 fill-current" />
              <span>ENTRAR NO GRUPO DO WHATSAPP</span>
            </button>
            
            <p className="text-[11px] text-fog-veil flex items-center justify-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-blueprint-blue" />
              <span>Acesso Instantâneo • Sem Cadastro • 100% Seguro</span>
            </p>
          </div>
        </section>

        {/* ==========================================
             INFINITE MARQUEE SECTION (Brand Logos)
             ========================================== */}
        <section className="py-2 border-y border-glass-edge bg-steel-plate/10">
          <div className="text-center mb-3">
            <span className="font-dotdigital text-[10px] uppercase tracking-[0.12em] text-fog-veil">
              Ofertas verificadas dos maiores marketplaces
            </span>
          </div>

          <div className="logos-marquee-wrapper">
            <div className="logos-marquee-track">
              {/* Group 1 */}
              <div className="logos-marquee-group">
                <div className="logos-marquee-item original"><img src="/logo-mercado-livre.png" alt="Mercado Livre" /></div>
                <div className="logos-marquee-item"><img src="/logo-shopee.svg" alt="Shopee" /></div>
                <div className="logos-marquee-item"><img src="/logo-amazon.svg" alt="Amazon" /></div>
                <div className="logos-marquee-item original"><img src="/logo-magalu.webp" alt="Magalu" /></div>
                <div className="logos-marquee-item original"><img src="/logo-aliexpress.webp" alt="AliExpress" /></div>
                <div className="logos-marquee-item original"><img src="/logo-shein.png" alt="Shein" /></div>
              </div>
              {/* Group 2 (Duplicate for Infinite Loop) */}
              <div className="logos-marquee-group" aria-hidden="true">
                <div className="logos-marquee-item original"><img src="/logo-mercado-livre.png" alt="Mercado Livre" /></div>
                <div className="logos-marquee-item"><img src="/logo-shopee.svg" alt="Shopee" /></div>
                <div className="logos-marquee-item"><img src="/logo-amazon.svg" alt="Amazon" /></div>
                <div className="logos-marquee-item original"><img src="/logo-magalu.webp" alt="Magalu" /></div>
                <div className="logos-marquee-item original"><img src="/logo-aliexpress.webp" alt="AliExpress" /></div>
                <div className="logos-marquee-item original"><img src="/logo-shein.png" alt="Shein" /></div>
              </div>
            </div>
          </div>
        </section>

        {/* ==========================================
             ABOUT & FEATURES SECTION (Por que o Raposo)
             ========================================== */}
        <section className="space-y-6">
          <div className="text-center space-y-2">
            <div className="flex items-center gap-3 justify-center">
              <div className="eyebrow-line" />
              <span className="font-dotdigital text-xs uppercase tracking-[0.15em] text-moon-mist">
                Como Ajudamos
              </span>
              <div className="eyebrow-line" />
            </div>
            <h2 className="font-display text-xl sm:text-2xl font-semibold text-pure-white">
              Por que o grupo é único?
            </h2>
            <p className="text-fog-veil text-xs max-w-xs mx-auto">
              Fazemos o garimpo duro para você comprar mais barato todos os dias.
            </p>
          </div>

          <div className="space-y-3">
            {/* Feature 1 */}
            <div className="glass-card-feature p-5 flex items-center gap-5">
              <div className="w-12 h-12 rounded-full bg-steel-plate flex items-center justify-center flex-shrink-0 text-blueprint-blue border border-glass-edge shadow-inner">
                <Search className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h3 className="font-semibold text-pure-white text-sm">Garimpo Inteligente 24h</h3>
                <p className="text-xs text-moon-mist leading-relaxed">
                  Vasculhamos milhares de páginas por segundo buscando cupons escondidos e erros sistêmicos de preço.
                </p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="glass-card-feature p-5 flex items-center gap-5">
              <div className="w-12 h-12 rounded-full bg-steel-plate flex items-center justify-center flex-shrink-0 text-blueprint-blue border border-glass-edge shadow-inner">
                <Tag className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h3 className="font-semibold text-pure-white text-sm">Cupons que Funcionam</h3>
                <p className="text-xs text-moon-mist leading-relaxed">
                  Chega de testar cupons expirados. No grupo, os cupons são validados em tempo real antes de serem compartilhados.
                </p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="glass-card-feature p-5 flex items-center gap-5">
              <div className="w-12 h-12 rounded-full bg-steel-plate flex items-center justify-center flex-shrink-0 text-blueprint-blue border border-glass-edge shadow-inner">
                <BellRing className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h3 className="font-semibold text-pure-white text-sm">Alertas Instantâneos</h3>
                <p className="text-xs text-moon-mist leading-relaxed">
                  Bugs de preços acabam rápido. Notificamos você no WhatsApp instantaneamente para garantir sua compra antes do estoque acabar.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ==========================================
             SECURITY & GUARANTEES SECTION
             ========================================== */}
        <section className="space-y-6">
          <div className="glass-card-modal p-6 text-center space-y-4">
            <div className="w-12 h-12 bg-steel-plate rounded-full flex items-center justify-center mx-auto text-blueprint-blue border border-glass-edge shadow-inner">
              <ShieldCheck className="w-6 h-6" />
            </div>
            
            <div className="space-y-1">
              <h2 className="font-display text-base sm:text-lg font-semibold text-pure-white">
                Sua Segurança é Prioridade
              </h2>
              <p className="text-xs text-fog-veil leading-relaxed">
                Links seguros, auditados e livres de spam ou vírus.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-2.5 my-4">
              <div className="bg-midnight-canvas/40 p-2.5 rounded-lg border border-glass-edge text-center space-y-1">
                <div className="text-[10px] text-blueprint-blue font-bold tracking-wider flex items-center justify-center gap-1">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>GRÁTIS</span>
                </div>
                <p className="text-[9px] text-moon-mist leading-tight">Sem cobrança ou taxas ocultas.</p>
              </div>

              <div className="bg-midnight-canvas/40 p-2.5 rounded-lg border border-glass-edge text-center space-y-1">
                <div className="text-[10px] text-blueprint-blue font-bold tracking-wider flex items-center justify-center gap-1">
                  <Smartphone className="w-3 h-3" />
                  <span>APLICATIVO</span>
                </div>
                <p className="text-[9px] text-moon-mist leading-tight">A compra finaliza direto no app oficial.</p>
              </div>

              <div className="bg-midnight-canvas/40 p-2.5 rounded-lg border border-glass-edge text-center space-y-1">
                <div className="text-[10px] text-blueprint-blue font-bold tracking-wider flex items-center justify-center gap-1">
                  <Lock className="w-3 h-3" />
                  <span>SEGURO</span>
                </div>
                <p className="text-[9px] text-moon-mist leading-tight">Links verificados e encurtados limpos.</p>
              </div>
            </div>

            <button 
              onClick={() => trackWhatsAppClick('garantia_section')}
              className="btn-primary-ghost w-full py-4.5 px-6 font-semibold text-xs tracking-wider uppercase flex items-center justify-center gap-2 hover:bg-glass-edge"
            >
              <span>Quero Economizar com Segurança</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </section>

        {/* ==========================================
             TESTIMONIALS SECTION (UGC / Swiper Slider)
             ========================================== */}
        <section className="space-y-6">
          <div className="text-center space-y-2">
            <div className="flex items-center gap-3 justify-center">
              <div className="eyebrow-line" />
              <span className="font-dotdigital text-xs uppercase tracking-[0.15em] text-moon-mist">
                Prova Social
              </span>
              <div className="eyebrow-line" />
            </div>
            <h2 className="font-display text-xl sm:text-2xl font-semibold text-pure-white">
              Quem já entrou economizou
            </h2>
            <p className="text-fog-veil text-xs max-w-xs mx-auto">
              Veja prints e depoimentos enviados por inscritos reais!
            </p>
          </div>

          {/* Swiper React */}
          <div className="pb-8 select-none">
            <Swiper
              modules={[Autoplay, Pagination]}
              slidesPerView={'auto'}
              spaceBetween={14}
              centeredSlides={false}
              loop={true}
              autoplay={{
                delay: 4000,
                disableOnInteraction: false,
              }}
              pagination={{
                clickable: true,
                dynamicBullets: true,
              }}
              className="w-full"
            >
              {/* Testimonial 1 */}
              <SwiperSlide className="!w-[260px]">
                <div className="glass-card-feature p-6 flex flex-col justify-between min-h-[190px] text-left">
                  <div className="flex items-center gap-3">
                    <img 
                      src="https://randomuser.me/api/portraits/women/44.jpg" 
                      alt="Ana Paula S." 
                      className="w-8.5 h-8.5 rounded-full object-cover border border-glass-edge flex-shrink-0"
                    />
                    <div>
                      <h4 className="font-semibold text-xs text-pure-white">Ana Paula S.</h4>
                      <p className="text-[9px] text-fog-veil">Mãe de 2 filhos • São Paulo/SP</p>
                    </div>
                  </div>
                  <p className="text-xs text-moon-mist leading-relaxed italic mt-2 flex-grow">
                    "Consegui comprar o fraldão da Shopee por R$ 39 com o cupom que o Raposo mandou de manhã! Economizei muito!"
                  </p>
                  <div className="text-[10px] text-blueprint-blue font-semibold font-mono flex items-center gap-1 border-t border-glass-edge/40 pt-2 mt-2">
                    <TrendingUp className="w-3 h-3" />
                    <span>✓ Economizou R$ 85,00</span>
                  </div>
                </div>
              </SwiperSlide>

              {/* Testimonial 2 */}
              <SwiperSlide className="!w-[260px]">
                <div className="glass-card-feature p-6 flex flex-col justify-between min-h-[190px] text-left">
                  <div className="flex items-center gap-3">
                    <img 
                      src="https://randomuser.me/api/portraits/men/32.jpg" 
                      alt="Carlos Lima" 
                      className="w-8.5 h-8.5 rounded-full object-cover border border-glass-edge flex-shrink-0"
                    />
                    <div>
                      <h4 className="font-semibold text-xs text-pure-white">Carlos Lima</h4>
                      <p className="text-[9px] text-fog-veil">Rio de Janeiro/RJ</p>
                    </div>
                  </div>
                  <p className="text-xs text-moon-mist leading-relaxed italic mt-2 flex-grow">
                    "Peguei uma Smart TV de 50 polegadas por R$ 1.200 no Mercado Livre por causa da falha de preço avisada no grupo!"
                  </p>
                  <div className="text-[10px] text-blueprint-blue font-semibold font-mono flex items-center gap-1 border-t border-glass-edge/40 pt-2 mt-2">
                    <TrendingUp className="w-3 h-3" />
                    <span>✓ Economizou R$ 650,00</span>
                  </div>
                </div>
              </SwiperSlide>

              {/* Testimonial 3 */}
              <SwiperSlide className="!w-[260px]">
                <div className="glass-card-feature p-6 flex flex-col justify-between min-h-[190px] text-left">
                  <div className="flex items-center gap-3">
                    <img 
                      src="https://randomuser.me/api/portraits/women/68.jpg" 
                      alt="Fernanda Ramos" 
                      className="w-8.5 h-8.5 rounded-full object-cover border border-glass-edge flex-shrink-0"
                    />
                    <div>
                      <h4 className="font-semibold text-xs text-pure-white">Fernanda Ramos</h4>
                      <p className="text-[9px] text-fog-veil">Belo Horizonte/MG</p>
                    </div>
                  </div>
                  <p className="text-xs text-moon-mist leading-relaxed italic mt-2 flex-grow">
                    "Eu tinha medo de entrar nesses grupos, mas é super seguro. Você clica e compra dentro do próprio aplicativo oficial."
                  </p>
                  <div className="text-[10px] text-blueprint-blue font-semibold font-mono flex items-center gap-1 border-t border-glass-edge/40 pt-2 mt-2">
                    <TrendingUp className="w-3 h-3" />
                    <span>✓ Economizou R$ 140,00</span>
                  </div>
                </div>
              </SwiperSlide>

              {/* Testimonial 4 */}
              <SwiperSlide className="!w-[260px]">
                <div className="glass-card-feature p-6 flex flex-col justify-between min-h-[190px] text-left">
                  <div className="flex items-center gap-3">
                    <img 
                      src="https://randomuser.me/api/portraits/men/75.jpg" 
                      alt="João Pedro" 
                      className="w-8.5 h-8.5 rounded-full object-cover border border-glass-edge flex-shrink-0"
                    />
                    <div>
                      <h4 className="font-semibold text-xs text-pure-white">João Pedro</h4>
                      <p className="text-[9px] text-fog-veil">Curitiba/PR</p>
                    </div>
                  </div>
                  <p className="text-xs text-moon-mist leading-relaxed italic mt-2 flex-grow">
                    "Melhor grupo do WhatsApp! Todo dia tem frete grátis e cupons de 20 reais sem valor mínimo. Vale muito a pena!"
                  </p>
                  <div className="text-[10px] text-blueprint-blue font-semibold font-mono flex items-center gap-1 border-t border-glass-edge/40 pt-2 mt-2">
                    <TrendingUp className="w-3 h-3" />
                    <span>✓ Economizou R$ 210,00</span>
                  </div>
                </div>
              </SwiperSlide>

              {/* Testimonial 5 */}
              <SwiperSlide className="!w-[260px]">
                <div className="glass-card-feature p-6 flex flex-col justify-between min-h-[190px] text-left">
                  <div className="flex items-center gap-3">
                    <img 
                      src="https://randomuser.me/api/portraits/women/17.jpg" 
                      alt="Márcia Santos" 
                      className="w-8.5 h-8.5 rounded-full object-cover border border-glass-edge flex-shrink-0"
                    />
                    <div>
                      <h4 className="font-semibold text-xs text-pure-white">Márcia Santos</h4>
                      <p className="text-[9px] text-fog-veil">Salvador/BA</p>
                    </div>
                  </div>
                  <p className="text-xs text-moon-mist leading-relaxed italic mt-2 flex-grow">
                    "Comprei um jogo de panela com 70% de desconto por conta de um bug alertado. Chegou tudo certinho no app oficial."
                  </p>
                  <div className="text-[10px] text-blueprint-blue font-semibold font-mono flex items-center gap-1 border-t border-glass-edge/40 pt-2 mt-2">
                    <TrendingUp className="w-3 h-3" />
                    <span>✓ Economizou R$ 190,00</span>
                  </div>
                </div>
              </SwiperSlide>
            </Swiper>
          </div>
        </section>

        {/* ==========================================
             FAQ SECTION (Accordion)
             ========================================== */}
        <section className="space-y-6">
          <div className="text-center space-y-2">
            <div className="flex items-center gap-3 justify-center">
              <div className="eyebrow-line" />
              <span className="font-dotdigital text-xs uppercase tracking-[0.15em] text-moon-mist">
                Dúvidas Comuns
              </span>
              <div className="eyebrow-line" />
            </div>
            <h2 className="font-display text-xl sm:text-2xl font-semibold text-pure-white">
              Perguntas Frequentes
            </h2>
            <p className="text-fog-veil text-xs max-w-xs mx-auto">
              Esclareça suas principais dúvidas antes de entrar no grupo vip.
            </p>
          </div>

          <div className="space-y-3">
            {/* FAQ 1 */}
            <div className="glass-card-feature overflow-hidden">
              <button 
                onClick={() => handleFAQToggle(1)}
                className="w-full py-5 px-6 text-left font-semibold text-sm text-pure-white flex justify-between items-center gap-2 hover:bg-glass-edge/10 transition-colors"
              >
                <span>É realmente 100% gratuito?</span>
                <ChevronDown className={`w-5 h-5 text-blueprint-blue transition-transform duration-300 ${openFaq === 1 ? 'rotate-180' : ''}`} />
              </button>
              <div 
                className={`transition-all duration-300 ease-in-out overflow-hidden ${openFaq === 1 ? 'max-h-32 opacity-100 border-t border-glass-edge/30 px-6 pb-5 pt-3' : 'max-h-0 opacity-0'}`}
              >
                <p className="text-xs text-moon-mist leading-relaxed">
                  Sim! Você não paga absolutamente nada para entrar ou permanecer no grupo. Nosso serviço é totalmente gratuito para os membros.
                </p>
              </div>
            </div>

            {/* FAQ 2 */}
            <div className="glass-card-feature overflow-hidden">
              <button 
                onClick={() => handleFAQToggle(2)}
                className="w-full py-5 px-6 text-left font-semibold text-sm text-pure-white flex justify-between items-center gap-2 hover:bg-glass-edge/10 transition-colors"
              >
                <span>É seguro clicar nos links das promoções?</span>
                <ChevronDown className={`w-5 h-5 text-blueprint-blue transition-transform duration-300 ${openFaq === 2 ? 'rotate-180' : ''}`} />
              </button>
              <div 
                className={`transition-all duration-300 ease-in-out overflow-hidden ${openFaq === 2 ? 'max-h-32 opacity-100 border-t border-glass-edge/30 px-6 pb-5 pt-3' : 'max-h-0 opacity-0'}`}
              >
                <p className="text-xs text-moon-mist leading-relaxed">
                  Totalmente seguro. Todos os links direcionam diretamente para os aplicativos oficiais ou sites verificados do Mercado Livre, Shopee, Amazon e Magalu.
                </p>
              </div>
            </div>

            {/* FAQ 3 */}
            <div className="glass-card-feature overflow-hidden">
              <button 
                onClick={() => handleFAQToggle(3)}
                className="w-full py-5 px-6 text-left font-semibold text-sm text-pure-white flex justify-between items-center gap-2 hover:bg-glass-edge/10 transition-colors"
              >
                <span>Como compro com os descontos?</span>
                <ChevronDown className={`w-5 h-5 text-blueprint-blue transition-transform duration-300 ${openFaq === 3 ? 'rotate-180' : ''}`} />
              </button>
              <div 
                className={`transition-all duration-300 ease-in-out overflow-hidden ${openFaq === 3 ? 'max-h-40 opacity-100 border-t border-glass-edge/30 px-6 pb-5 pt-3' : 'max-h-0 opacity-0'}`}
              >
                <p className="text-xs text-moon-mist leading-relaxed">
                  Basta clicar no link publicado no grupo do WhatsApp. O aplicativo correspondente (Shopee, Amazon, etc.) abrirá automaticamente no seu celular com o desconto ou cupom aplicado no carrinho.
                </p>
              </div>
            </div>

            {/* FAQ 4 */}
            <div className="glass-card-feature overflow-hidden">
              <button 
                onClick={() => handleFAQToggle(4)}
                className="w-full py-5 px-6 text-left font-semibold text-sm text-pure-white flex justify-between items-center gap-2 hover:bg-glass-edge/10 transition-colors"
              >
                <span>Posso silenciar as notificações?</span>
                <ChevronDown className={`w-5 h-5 text-blueprint-blue transition-transform duration-300 ${openFaq === 4 ? 'rotate-180' : ''}`} />
              </button>
              <div 
                className={`transition-all duration-300 ease-in-out overflow-hidden ${openFaq === 4 ? 'max-h-32 opacity-100 border-t border-glass-edge/30 px-6 pb-5 pt-3' : 'max-h-0 opacity-0'}`}
              >
                <p className="text-xs text-moon-mist leading-relaxed">
                  Sim. Você pode silenciar o grupo no WhatsApp a qualquer momento e verificar os achados somente quando quiser fazer compras no dia.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ==========================================
             FINAL CTA SECTION
             ========================================== */}
        <section className="py-4">
          <div className="glass-card-modal p-6 text-center space-y-4 border border-void-violet/40 shadow-[0_0_32px_rgba(224,86,27,0.2)]">
            <h3 className="font-display text-lg font-semibold text-pure-white">
              Pare de perder dinheiro à toa!
            </h3>
            <p className="text-xs text-moon-mist leading-relaxed">
              Dezenas de bugs de preço e cupons são disparados a cada hora. Entre no grupo vip gratuito e garanta suas ofertas.
            </p>

            <button 
              onClick={() => trackWhatsAppClick('final_cta')}
              className="w-full py-5 px-8 rounded-full bg-void-violet text-pure-white font-bold text-base tracking-wide transition-all btn-cta-pulse active:scale-[0.98] flex items-center justify-center gap-2.5 shadow-[0_0_24px_rgba(224,86,27,0.4)] border-t border-glass-edge/40 hover:brightness-110"
            >
              <MessageCircle className="w-5 h-5 fill-current" />
              <span>ENTRAR NO WHATSAPP AGORA</span>
            </button>
          </div>
        </section>

        {/* ==========================================
             FOOTER
             ========================================== */}
        <footer className="text-center py-6 text-[10px] text-fog-veil border-t border-glass-edge/30 space-y-1">
          <p>© 2026 {RAPOSO_CONFIG.channelName}. Todos os direitos reservados.</p>
          <p className="max-w-xs mx-auto leading-relaxed">
            Este site não possui vínculo direto com o WhatsApp, Facebook Meta, Mercado Livre, Shopee ou Amazon.
          </p>
        </footer>
      </main>

      {/* ==========================================
           FLOATING SOCIAL PROOF TOAST
           ========================================== */}
      <div 
        className={`fixed top-14 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-[320px] glass-card-modal p-3 flex items-center gap-3 transition-all duration-500 ease-in-out border border-void-violet/30 shadow-[0_0_24px_rgba(224,86,27,0.25)] ${
          toastVisible && !isHeroVisible ? 'translate-y-0 opacity-100' : '-translate-y-32 opacity-0 pointer-events-none'
        }`}
      >
        {toastItem && (
          <>
            <img
              src={toastItem.avatar}
              alt={toastItem.name}
              className="w-9.5 h-9.5 rounded-full object-cover border border-glass-edge flex-shrink-0 shadow-sm"
            />
            <div className="text-left text-xs leading-tight flex-1">
              <p className="font-semibold text-pure-white">
                {toastItem.name} <span className="font-normal text-fog-veil text-[9px]">({toastItem.city})</span>
              </p>
              <p className="text-blueprint-blue text-[10px] font-medium mt-0.5">{toastItem.action}</p>
              <span className="text-[8px] text-fog-veil">{toastItem.time}</span>
            </div>
          </>
        )}
      </div>

    </div>
  );
}
