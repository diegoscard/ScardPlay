import React, { useState } from 'react';
import { 
  Tv, 
  Smartphone, 
  Monitor, 
  Box, 
  ShieldCheck, 
  Zap, 
  Check, 
  ChevronDown, 
  Star,
  Globe,
  Clock,
  ArrowRight,
  Menu,
  X,
  Play,
  RotateCcw,
  Sparkles,
  Headphones,
  Film
} from 'lucide-react';
import { PLANS, FAQ_ITEMS, TESTIMONIALS, FEATURED_CONTENT } from './constants';
import { Plan, FAQItem } from './types';
import { CatalogCarousel } from './CatalogCarousel';

const WHATSAPP_BASE_LINK = "https://wa.me/5541988745822?text=Ol%C3%A1,%20vim%20pelo%20site%20e%20quero%20mais%20informa%C3%A7%C3%B5es";

const LogoIcon = ({ size = 20, className = "" }: { size?: number; className?: string }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    className={className}
    aria-hidden="true"
  >
    <path d="M8 5v14l11-7z" />
  </svg>
);

const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#07080A]/90 backdrop-blur-md border-b border-white/[0.08]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark */}
        <a href="#inicio" className="flex items-center gap-3 shrink-0 group">
          <div className="w-9 h-9 bg-scard-red rounded-xl flex items-center justify-center shadow-lg shadow-scard-red/25 transition-transform group-hover:scale-105">
            <LogoIcon size={18} className="text-white ml-0.5" />
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-base sm:text-lg tracking-tight uppercase text-white leading-none">
              SCARD PLAY <span className="text-scard-red">IPTV</span>
            </span>
            <span className="text-[10px] text-gray-400 font-medium tracking-wider uppercase mt-1">
              Streaming Premium
            </span>
          </div>
        </a>

        {/* Zone 2: Navigation Links (Desktop) */}
        <nav className="hidden lg:flex items-center gap-7 text-xs font-semibold uppercase tracking-widest text-gray-300">
          <a href="#catalogo" className="text-scard-red hover:text-white transition-colors flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-scard-red animate-pulse" />
            <span>Catálogo 2026</span>
          </a>
          <a href="#inicio" className="hover:text-white transition-colors">Início</a>
          <a href="#beneficios" className="hover:text-white transition-colors">Benefícios</a>
          <a href="#conteudos" className="hover:text-white transition-colors">Destaques</a>
          <a href="#compatibilidade" className="hover:text-white transition-colors">Aparelhos</a>
          <a href="#aplicativos" className="hover:text-white transition-colors">Apps</a>
          <a href="#planos" className="hover:text-white transition-colors">Planos</a>
          <a href="#faq" className="hover:text-white transition-colors">Dúvidas</a>
        </nav>

        {/* Zone 3: Primary Action & Mobile Toggle */}
        <div className="flex items-center gap-4 shrink-0">
          <a 
            href={WHATSAPP_BASE_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-2 bg-scard-red hover:bg-scard-redDark text-white px-5 py-2.5 rounded-lg text-xs font-bold tracking-wider uppercase transition-all shadow-md shadow-scard-red/20 active:scale-95"
          >
            <span>Assinar Agora</span>
            <ArrowRight size={14} />
          </a>

          <button 
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-gray-300 hover:text-white focus:outline-none"
            aria-label={mobileMenuOpen ? "Fechar menu" : "Abrir menu"}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0A0C10] border-b border-white/[0.08] px-6 py-6 space-y-4 animate-in fade-in duration-200">
          <nav className="flex flex-col space-y-3 text-sm font-semibold uppercase tracking-wider text-gray-300">
            <a 
              href="#catalogo" 
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 border-b border-white/5 text-scard-red font-bold flex items-center justify-between"
            >
              <span>Catálogo 2026 (Lançamentos)</span>
              <span className="text-[10px] bg-scard-red/15 text-scard-red px-2 py-0.5 rounded">Novo</span>
            </a>
            <a 
              href="#inicio" 
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 border-b border-white/5 hover:text-scard-red"
            >
              Início
            </a>
            <a 
              href="#beneficios" 
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 border-b border-white/5 hover:text-scard-red"
            >
              Benefícios
            </a>
            <a 
              href="#conteudos" 
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 border-b border-white/5 hover:text-scard-red"
            >
              Destaques de Conteúdo
            </a>
            <a 
              href="#compatibilidade" 
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 border-b border-white/5 hover:text-scard-red"
            >
              Aparelhos Compatíveis
            </a>
            <a 
              href="#aplicativos" 
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 border-b border-white/5 hover:text-scard-red"
            >
              Aplicativos Grátis e Pagos
            </a>
            <a 
              href="#planos" 
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 border-b border-white/5 hover:text-scard-red"
            >
              Planos e Valores
            </a>
            <a 
              href="#faq" 
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 hover:text-scard-red"
            >
              Central de Dúvidas
            </a>
          </nav>

          <div className="pt-2">
            <a 
              href={WHATSAPP_BASE_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 bg-scard-red hover:bg-scard-redDark text-white py-3.5 rounded-lg text-sm font-bold uppercase tracking-wider shadow-lg"
            >
              <span>Falar com Atendente VIP</span>
              <ArrowRight size={16} />
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

const Hero: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <section id="inicio" className="relative pt-16 pb-20 md:pt-20 md:pb-28 overflow-hidden bg-[#07080A]">
      {/* Subtle architectural ambient background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-1/4 w-[600px] h-[500px] bg-scard-red/[0.04] rounded-full blur-[140px]" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[400px] bg-white/[0.02] rounded-full blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Value Proposition */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-5">
              {/* Clean metadata kicker - zero tacky pill */}
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-gray-400">
                <span className="text-scard-red font-bold">Qualidade 4K Ultra HD</span>
                <span aria-hidden="true" className="text-gray-600">·</span>
                <span>Servidores Dedicados</span>
                <span aria-hidden="true" className="text-gray-600">·</span>
                <span>Ativação Instantânea</span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.08] text-balance">
                A experiência definitiva de televisão na sua casa.
              </h1>
              
              <p className="text-gray-300 text-base sm:text-lg leading-relaxed max-w-2xl font-normal">
                Mais de <strong className="text-white font-semibold">150.000 conteúdos</strong> entre canais abertos e fechados, filmes de cinema, séries completas e esportes ao vivo com estabilidade garantida, sem multas e sem contratos de fidelidade.
              </p>
            </div>

            {/* Value checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
              {[
                "Ativação rápida em até 5 minutos",
                "Sem contratos de fidelidade",
                "Suporte humano dedicado via WhatsApp",
                "Grade completa em Full HD e 4K"
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 py-1">
                  <div className="w-5 h-5 rounded-full bg-scard-red/10 border border-scard-red/30 flex items-center justify-center shrink-0">
                    <Check className="text-scard-red" size={12} />
                  </div>
                  <span className="text-sm font-medium text-gray-200">{item}</span>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-3">
              <a 
                href={WHATSAPP_BASE_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 bg-scard-red hover:bg-scard-redDark text-white px-8 py-4 rounded-xl text-sm font-bold tracking-wider uppercase transition-all shadow-lg shadow-scard-red/25 hover:shadow-scard-red/40 active:scale-95"
              >
                <span>Quero Meu Acesso Agora</span>
                <ArrowRight size={16} />
              </a>
              
              <a
                href="#planos"
                className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl text-sm font-semibold text-gray-300 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] transition-colors"
              >
                <span>Ver Todos os Planos</span>
              </a>
            </div>

            {/* Social Proof Strip */}
            <div className="pt-4 border-t border-white/[0.08] flex flex-wrap items-center gap-6 sm:gap-10 text-xs text-gray-400">
              <div className="flex items-center gap-2">
                <div className="flex -space-x-1.5">
                  {[1, 2, 3].map((n) => (
                    <img 
                      key={n}
                      src={`https://i.pravatar.cc/100?u=scard_${n}`} 
                      alt="Assinante SCARD PLAY" 
                      className="w-7 h-7 rounded-full border border-black object-cover"
                    />
                  ))}
                </div>
                <span className="font-semibold text-gray-200">+15.000 clientes</span>
              </div>
              
              <div className="flex items-center gap-1.5">
                <div className="flex text-yellow-500">
                  {[...Array(5)].map((_, idx) => (
                    <Star key={idx} size={13} className="fill-yellow-500" />
                  ))}
                </div>
                <span className="font-semibold text-gray-200">4.9/5 de avaliação</span>
              </div>

              <div className="flex items-center gap-1.5 text-gray-400">
                <Clock size={14} className="text-scard-red" />
                <span>Ativação média: <strong>5 min</strong></span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Video Showcase */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl overflow-hidden border border-white/[0.1] bg-[#0E1015] shadow-2xl">
              <div className="aspect-video relative group">
                {!isPlaying ? (
                  <>
                    <img 
                      src="/src/assets/images/hero_cinematic_livingroom_1794004161004.jpg" 
                      alt="Experiência SCARD PLAY na Smart TV"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                    
                    {/* Play Button Trigger */}
                    <button 
                      onClick={() => setIsPlaying(true)}
                      className="absolute inset-0 flex items-center justify-center group focus:outline-none"
                      aria-label="Assistir demonstração"
                    >
                      <div className="w-16 h-16 rounded-full bg-scard-red text-white flex items-center justify-center shadow-2xl transition-transform transform group-hover:scale-110 active:scale-95">
                        <Play size={24} className="ml-1 fill-white" />
                      </div>
                    </button>

                    <div className="absolute top-4 left-4 bg-black/75 backdrop-blur-md px-3 py-1.5 rounded-md border border-white/10 text-[11px] font-semibold text-gray-200 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-scard-red animate-pulse" />
                      <span>Demonstração do Sistema</span>
                    </div>

                    <div className="absolute bottom-4 left-4 right-4 text-left">
                      <p className="text-xs text-gray-400 uppercase tracking-widest font-semibold mb-1">Vídeo Oficial</p>
                      <p className="text-sm font-bold text-white">Clique para ver a interface e qualidade real</p>
                    </div>
                  </>
                ) : (
                  <div className="w-full h-full relative bg-black">
                    <iframe 
                      src="https://player.vimeo.com/video/1050573081?autoplay=1" 
                      className="w-full h-full"
                      frameBorder="0" 
                      allow="autoplay; fullscreen; picture-in-picture" 
                      allowFullScreen
                      title="Demonstração SCARD PLAY IPTV"
                    />
                    <button 
                      onClick={() => setIsPlaying(false)}
                      className="absolute top-3 right-3 bg-black/80 hover:bg-black text-white p-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 border border-white/10 transition-colors z-20"
                    >
                      <RotateCcw size={12} />
                      <span>Fechar Vídeo</span>
                    </button>
                  </div>
                )}
              </div>

              {/* Sub-strip with technical reassurance */}
              <div className="p-4 bg-[#0A0C10] border-t border-white/[0.08] flex items-center justify-between text-xs text-gray-400">
                <div className="flex items-center gap-2">
                  <Tv size={16} className="text-scard-red" />
                  <span className="font-medium text-gray-300">Grade HD / Full HD / 4K</span>
                </div>
                <div className="flex items-center gap-1.5 text-gray-300 font-medium">
                  <ShieldCheck size={16} className="text-scard-red" />
                  <span>Estabilidade Contínua</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

const Benefits: React.FC = () => {
  const benefitItems = [
    { 
      number: "01",
      icon: <Film size={22} />, 
      title: "Mais de 150.000 Conteúdos", 
      desc: "Catálogo completo com canais abertos e fechados, lançamentos do cinema, séries completas, novelas e documentários atualizados semanalmente." 
    },
    { 
      number: "02",
      icon: <Zap size={22} />, 
      title: "Transmissão 4K Sem Travamentos", 
      desc: "Servidores dedicados com largura de banda de alta velocidade para você assistir aos jogos do seu time e filmes sem buffering." 
    },
    { 
      number: "03",
      icon: <Smartphone size={22} />, 
      title: "Compatibilidade Universal", 
      desc: "Funciona perfeitamente na sua Smart TV (Samsung, LG, Roku, Android), Celular, TV Box, Computador ou Tablet." 
    },
    { 
      number: "04",
      icon: <Headphones size={22} />, 
      title: "Suporte Humano VIP", 
      desc: "Equipe técnica disponível para auxiliar no passo a passo da instalação e sanar qualquer dúvida diretamente no WhatsApp." 
    },
    { 
      number: "05",
      icon: <ShieldCheck size={22} />, 
      title: "Privacidade e Controle Parental", 
      desc: "Conteúdo adulto opcional com bloqueio seguro por senha, mantendo a programação da sua família sob total controle." 
    },
    { 
      number: "06",
      icon: <Clock size={22} />, 
      title: "Ativação Rápida e Transparente", 
      desc: "Sem filas de espera, sem necessidade de técnico na sua residência e sem contratos com multas ou cláusulas abusivas." 
    },
  ];

  return (
    <section id="beneficios" className="py-24 bg-[#0A0C10] border-t border-white/[0.06] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16 space-y-4">
          <p className="text-xs font-bold uppercase tracking-widest text-scard-red">
            Vantagens Exclusivas
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Por que milhares de clientes escolhem a SCARD PLAY?
          </h2>
          <p className="text-gray-400 text-base sm:text-lg leading-relaxed">
            Uma estrutura moderna pensada para oferecer a estabilidade que a TV convencional e serviços amadores não entregam.
          </p>
        </div>

        {/* Asymmetric Editorial Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefitItems.map((item, idx) => (
            <div 
              key={idx} 
              className="p-8 rounded-2xl bg-[#0F1116] border border-white/[0.06] hover:border-scard-red/30 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-10 h-10 rounded-lg bg-white/[0.04] border border-white/[0.08] text-scard-red flex items-center justify-center transition-colors group-hover:bg-scard-red group-hover:text-white">
                    {item.icon}
                  </div>
                  <span className="font-mono text-xs font-semibold text-gray-500 tracking-wider">
                    {item.number}
                  </span>
                </div>
                
                <h3 className="text-lg font-bold text-white mb-2 tracking-tight group-hover:text-scard-red transition-colors">
                  {item.title}
                </h3>
                
                <p className="text-sm text-gray-400 leading-relaxed font-normal">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

const FeaturedContentSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('todos');

  const categories = [
    { id: 'todos', label: 'Todos os Destaques' },
    { id: 'cinema', label: 'Cinema & Filmes' },
    { id: 'series', label: 'Séries & Novelas' },
    { id: 'esportes', label: 'Esportes Ao Vivo' },
  ];

  const filteredItems = FEATURED_CONTENT.filter(item => {
    if (activeCategory === 'todos') return true;
    if (activeCategory === 'cinema') return item.title.includes('Filmes') || item.category.includes('Cinema');
    if (activeCategory === 'series') return item.title.includes('Séries') || item.category.includes('Dramas');
    if (activeCategory === 'esportes') return item.title.includes('Esportes') || item.category.includes('Transmissão');
    return true;
  });

  return (
    <section id="conteudos" className="py-24 bg-[#07080A] border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
          <div className="max-w-2xl space-y-3">
            <p className="text-xs font-bold uppercase tracking-widest text-scard-red">
              Catálogo Sob Demanda e Ao Vivo
            </p>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
              O melhor do cinema, esportes e televisão.
            </h2>
            <p className="text-gray-400 text-sm sm:text-base">
              Conteúdo com qualidade de áudio e imagem para toda a família curtir junto.
            </p>
          </div>

          {/* Interactive filter tabs */}
          <div className="flex flex-wrap gap-2 p-1 bg-[#0F1116] rounded-xl border border-white/[0.06] shrink-0">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3.5 py-2 rounded-lg text-xs font-semibold tracking-wide transition-colors ${
                  activeCategory === cat.id 
                    ? 'bg-scard-red text-white' 
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Media Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item, idx) => (
            <div 
              key={idx}
              className="group relative rounded-xl overflow-hidden bg-[#0F1116] border border-white/[0.06] hover:border-white/[0.15] transition-all aspect-[16/10] flex flex-col justify-end"
            >
              <img 
                src={item.image} 
                alt={item.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent" />
              
              <div className="relative p-6 z-10 space-y-1.5">
                <div className="flex items-center gap-2 text-xs font-semibold text-gray-300">
                  <span className="text-scard-red uppercase tracking-wider text-[11px] font-bold">
                    {item.category}
                  </span>
                  {item.badge && (
                    <>
                      <span aria-hidden="true" className="text-gray-500">·</span>
                      <span className="text-gray-300 text-[11px]">{item.badge}</span>
                    </>
                  )}
                </div>
                <h3 className="text-lg font-bold text-white tracking-tight">
                  {item.title}
                </h3>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Catalog Callout */}
        <div className="mt-14 text-center">
          <a 
            href={WHATSAPP_BASE_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 text-sm font-bold text-gray-200 hover:text-white bg-[#0F1116] hover:bg-[#151820] border border-white/[0.1] hover:border-scard-red/40 px-8 py-4 rounded-xl transition-all shadow-lg group"
          >
            <span>Falar com Atendente e Ver Catálogo Completo</span>
            <ArrowRight size={16} className="text-scard-red transition-transform group-hover:translate-x-1" />
          </a>
        </div>

      </div>
    </section>
  );
};

const Compatibility: React.FC = () => {
  const devices = [
    { icon: <Tv size={28} />, name: 'Smart TV', detail: 'Samsung, LG, TCL, Philco' },
    { icon: <Box size={28} />, name: 'TV Box & Sticks', detail: 'Fire TV, Mi Box, Chromecast' },
    { icon: <Smartphone size={28} />, name: 'Celulares', detail: 'Android & iOS iPhone' },
    { icon: <Globe size={28} />, name: 'Computador & Web', detail: 'Windows, Mac, Navegadores' },
    { icon: <Monitor size={28} />, name: 'Tablets & Consoles', detail: 'iPad, Tablets, Xbox' },
  ];

  return (
    <section id="compatibilidade" className="py-20 bg-[#0A0C10] border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <p className="text-xs font-bold uppercase tracking-widest text-scard-red">
            Liberdade Multi-Telas
          </p>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Assista no aparelho que você já tem em casa.
          </h2>
          <p className="text-gray-400 text-sm sm:text-base">
            Compatibilidade garantida com os principais sistemas e aplicativos do mercado.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {devices.map((device, idx) => (
            <div 
              key={idx}
              className="p-6 rounded-2xl bg-[#0F1116] border border-white/[0.06] hover:border-white/[0.15] transition-all text-center flex flex-col items-center justify-center space-y-3"
            >
              <div className="text-gray-300">
                {device.icon}
              </div>
              <h3 className="text-sm font-bold text-white tracking-tight">
                {device.name}
              </h3>
              <p className="text-[11px] text-gray-500 font-medium">
                {device.detail}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

const SupportedApps: React.FC = () => {
  const systems = [
    {
      name: "Smart TV LG",
      platform: "webOS",
      icon: <Tv size={22} className="text-scard-red" />,
      free: ["Play Sim", "Smarters Player Lite", "SS IPTV", "Room IPTV"],
      paid: ["IBO Player", "DuplexPlay", "Flix IPTV", "Bob Player"]
    },
    {
      name: "Smart TV Samsung",
      platform: "Tizen OS",
      icon: <Monitor size={22} className="text-scard-red" />,
      free: ["Play Sim", "Smarters Player Lite", "SS IPTV", "Room IPTV"],
      paid: ["IBO Player", "DuplexPlay", "Flix IPTV", "Bob Player"]
    },
    {
      name: "Sistema Roku",
      platform: "Roku OS / AOC / Philco",
      icon: <Box size={22} className="text-scard-red" />,
      free: ["Play Sim", "IPTV Smarters", "MetaPlayer", "GSE Smart IPTV"],
      paid: ["ClouDDy", "IBO Player", "Rivu TV"]
    },
    {
      name: "Sistema Android",
      platform: "Android TV / TV Box / Celular",
      icon: <Smartphone size={22} className="text-scard-red" />,
      free: ["Play Sim", "XCIPTV Player", "IPTV Smarters Pro", "Televizo"],
      paid: ["TiviMate", "IMPlayer", "IBO Player"]
    }
  ];

  return (
    <section id="aplicativos" className="py-24 bg-[#07080A] border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="max-w-3xl mb-16 space-y-3">
          <p className="text-xs font-bold uppercase tracking-widest text-scard-red">
            Guia de Aplicativos
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Aplicativos compatíveis para cada tipo de TV
          </h2>
          <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
            Seja em aplicativos 100% gratuitos ou reprodutores premium com recursos avançados, nossa lista foi testada para máxima estabilidade.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {systems.map((sys, idx) => (
            <div 
              key={idx} 
              className="bg-[#0F1116] border border-white/[0.08] rounded-2xl p-6 sm:p-7 hover:border-scard-red/30 transition-all flex flex-col justify-between"
            >
              <div>
                {/* System Header */}
                <div className="flex items-center gap-3.5 pb-5 mb-5 border-b border-white/[0.08]">
                  <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center shrink-0">
                    {sys.icon}
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white tracking-tight leading-tight">
                      {sys.name}
                    </h3>
                    <span className="text-[11px] text-gray-500 font-medium">
                      {sys.platform}
                    </span>
                  </div>
                </div>

                {/* Free Apps List */}
                <div className="space-y-4 mb-6">
                  <div className="flex items-center justify-between text-xs font-semibold">
                    <span className="text-gray-300">Aplicativos Grátis</span>
                    <span className="text-[10px] text-emerald-400 font-mono uppercase bg-emerald-500/10 px-2 py-0.5 rounded">Sem Custo</span>
                  </div>
                  <ul className="space-y-2">
                    {sys.free.map((app, i) => (
                      <li key={i} className="flex items-center gap-2 text-xs text-gray-300">
                        <Check size={14} className="text-emerald-400 shrink-0" />
                        <span>{app}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Divider */}
                <div className="h-px w-full bg-white/[0.06] my-5" />

                {/* Paid / Premium Apps List */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-xs font-semibold">
                    <span className="text-gray-300">Aplicativos Pagos</span>
                    <span className="text-[10px] text-scard-red font-mono uppercase bg-scard-red/10 px-2 py-0.5 rounded">Premium</span>
                  </div>
                  <ul className="space-y-2">
                    {sys.paid.map((app, i) => (
                      <li key={i} className="flex items-center gap-2 text-xs text-gray-300">
                        <Star size={13} className="text-scard-red fill-scard-red shrink-0" />
                        <span>{app}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-white/[0.06]">
                <a 
                  href={WHATSAPP_BASE_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full text-center block text-[11px] font-semibold text-gray-400 hover:text-white transition-colors"
                >
                  Ajuda para instalar este sistema →
                </a>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

const PlansSection: React.FC = () => {
  return (
    <section id="planos" className="py-24 bg-[#0A0C10] border-t border-white/[0.06] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <p className="text-xs font-bold uppercase tracking-widest text-scard-red">
            Valores Transparentes
          </p>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
            Escolha o pacote ideal para você
          </h2>
          <p className="text-gray-400 text-base">
            Invista no seu entretenimento com planos claros, sem taxas ocultas e sem renovação automática forçada.
          </p>
        </div>
        
        {/* Plans Grid */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto items-stretch">
          {PLANS.map((plan) => {
            const isHighlight = plan.highlight;

            return (
              <div 
                key={plan.id}
                className={`relative rounded-2xl flex flex-col justify-between p-8 sm:p-10 transition-all duration-300 ${
                  isHighlight 
                    ? 'bg-[#0E1015] border-2 border-scard-red shadow-2xl shadow-scard-red/15 lg:-translate-y-2' 
                    : 'bg-[#0F1116] border border-white/[0.08] hover:border-white/[0.18]'
                }`}
              >
                {/* Highlight Badge */}
                {isHighlight && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-scard-red text-white text-[10px] font-bold uppercase tracking-widest px-4 py-1 rounded-full shadow-lg">
                    Mais Popular · Melhor Custo-Benefício
                  </div>
                )}

                <div>
                  {/* Plan Header */}
                  <div className="border-b border-white/[0.08] pb-6 mb-8 text-center sm:text-left">
                    <span className="text-xs font-semibold text-gray-400 uppercase tracking-widest block mb-2">
                      {plan.name}
                    </span>
                    <h3 className="text-2xl font-extrabold text-white tracking-tight mb-4">
                      {plan.period}
                    </h3>
                    
                    {/* Price Display */}
                    <div className="flex items-baseline justify-center sm:justify-start gap-1">
                      <span className="text-xl font-bold text-gray-400">R$</span>
                      <span className="text-5xl font-extrabold text-white tracking-tight font-mono">
                        {plan.price.split(',')[0]}
                      </span>
                      <span className="text-2xl font-bold text-gray-300 font-mono">
                        ,{plan.price.split(',')[1]}
                      </span>
                      <span className="text-xs text-gray-400 font-medium ml-1">
                        / {plan.durationLabel}
                      </span>
                    </div>
                  </div>

                  {/* Benefit Items */}
                  <div className="space-y-3.5 mb-10">
                    <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-4">
                      O que está incluso:
                    </p>
                    {plan.benefits.map((benefit, bIdx) => (
                      <div key={bIdx} className="flex items-start gap-3">
                        <Check size={16} className="text-scard-red shrink-0 mt-0.5" />
                        <span className="text-sm font-medium text-gray-300 leading-snug">
                          {benefit}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Plan Action CTA Button */}
                <div className="pt-4 mt-auto">
                  <a 
                    href={plan.whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-full py-4 px-6 rounded-xl text-sm font-bold tracking-wider uppercase flex items-center justify-center gap-2 transition-all active:scale-95 ${
                      isHighlight
                        ? 'bg-scard-red hover:bg-scard-redDark text-white shadow-lg shadow-scard-red/25'
                        : 'bg-white/[0.06] hover:bg-white/[0.12] text-white border border-white/[0.1]'
                    }`}
                  >
                    <span>Contratar {plan.period}</span>
                    <ArrowRight size={16} />
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* Guarantee Banner */}
        <div className="mt-16 max-w-3xl mx-auto p-6 rounded-2xl bg-[#0F1116] border border-white/[0.08] flex flex-col sm:flex-row items-center gap-5 text-center sm:text-left">
          <div className="w-12 h-12 rounded-xl bg-scard-red/10 border border-scard-red/25 flex items-center justify-center shrink-0">
            <ShieldCheck size={26} className="text-scard-red" />
          </div>
          <div className="space-y-1">
            <h4 className="text-sm font-bold text-white tracking-tight">
              Ativação Rápida e Suporte Humanizado
            </h4>
            <p className="text-xs text-gray-400 leading-relaxed">
              Após escolher seu pacote, nossa equipe envia seus dados de acesso imediatos via WhatsApp com instruções claras de configuração para sua TV.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};

const SocialProof: React.FC = () => {
  return (
    <section className="py-24 bg-[#07080A] border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="max-w-2xl mb-16 space-y-3">
          <p className="text-xs font-bold uppercase tracking-widest text-scard-red">
            Opinião de Quem Já Assina
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Credibilidade construída através de estabilidade e suporte.
          </h2>
          <p className="text-gray-400 text-sm sm:text-base">
            Depoimentos reais de clientes que utilizam a SCARD PLAY diariamente.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, idx) => (
            <div 
              key={idx} 
              className="bg-[#0F1116] p-8 rounded-2xl border border-white/[0.06] flex flex-col justify-between space-y-6 hover:border-white/[0.12] transition-colors"
            >
              <div className="space-y-4">
                <div className="flex gap-1 text-yellow-500">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} size={15} className="fill-yellow-500" />
                  ))}
                </div>
                <p className="text-gray-300 text-sm leading-relaxed font-normal italic">
                  "{t.text}"
                </p>
              </div>

              <div className="flex items-center gap-3 pt-5 border-t border-white/[0.06]">
                <div className="w-9 h-9 rounded-full bg-scard-red/15 border border-scard-red/30 flex items-center justify-center font-bold text-scard-red text-xs uppercase">
                  {t.author[0]}
                </div>
                <div>
                  <span className="block font-bold text-sm text-white">{t.author}</span>
                  <span className="block text-[11px] text-gray-500 font-medium">Assinante Verificado</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

const FAQAccordionItem: React.FC<{ item: FAQItem }> = ({ item }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-white/[0.08] last:border-0">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-6 flex items-center justify-between text-left group gap-4 focus:outline-none"
      >
        <span className={`text-base sm:text-lg font-bold tracking-tight transition-colors ${isOpen ? 'text-scard-red' : 'text-white group-hover:text-gray-200'}`}>
          {item.question}
        </span>
        <div className={`p-1.5 rounded-lg transition-transform duration-300 shrink-0 ${isOpen ? 'text-scard-red rotate-180 bg-scard-red/10' : 'text-gray-500 bg-white/[0.04]'}`}>
          <ChevronDown size={18} />
        </div>
      </button>
      
      {isOpen && (
        <div className="pb-6 animate-in fade-in duration-200">
          <p className="text-gray-300 text-sm leading-relaxed max-w-3xl font-normal">
            {item.answer}
          </p>
        </div>
      )}
    </div>
  );
};

const FAQ: React.FC = () => {
  return (
    <section id="faq" className="py-24 bg-[#0A0C10] border-t border-white/[0.06]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16 space-y-3">
          <p className="text-xs font-bold uppercase tracking-widest text-scard-red">
            Perguntas Frequentes
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Tire suas dúvidas antes de assinar
          </h2>
          <p className="text-gray-400 text-sm sm:text-base">
            Separamos as respostas para as perguntas mais comuns dos nossos clientes.
          </p>
        </div>

        <div className="bg-[#0F1116] rounded-2xl p-6 sm:p-10 border border-white/[0.08]">
          {FAQ_ITEMS.map((item, idx) => (
            <FAQAccordionItem key={idx} item={item} />
          ))}
        </div>

      </div>
    </section>
  );
};

const CTAFinal: React.FC = () => {
  return (
    <section className="py-24 bg-[#0E1015] border-t border-white/[0.08] relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-scard-red/[0.08] blur-[150px] rounded-full" />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-xs font-semibold text-gray-300">
          <Sparkles size={14} className="text-scard-red" />
          <span>Ativação Rápida e Suporte Direto</span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
          Sua televisão nunca mais será a mesma.
        </h2>

        <p className="text-gray-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
          Assine a SCARD PLAY IPTV hoje mesmo e tenha acesso ilimitado a todo o catálogo em alta definição, economizando até 90% em comparação com pacotes tradicionais de TV a cabo.
        </p>

        <div className="pt-2">
          <a 
            href={WHATSAPP_BASE_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-3 bg-scard-red hover:bg-scard-redDark text-white px-10 py-5 rounded-xl text-base font-bold uppercase tracking-wider transition-all shadow-xl shadow-scard-red/25 hover:shadow-scard-red/40 active:scale-95"
          >
            <span>Começar Agora via WhatsApp</span>
            <ArrowRight size={18} />
          </a>
        </div>
      </div>
    </section>
  );
};

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#07080A] pt-20 pb-12 border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-white/[0.08]">
          
          {/* Brand info */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-scard-red rounded-lg flex items-center justify-center shadow-md shadow-scard-red/30">
                <LogoIcon size={18} className="text-white ml-0.5" />
              </div>
              <span className="font-extrabold text-lg uppercase tracking-tight text-white">
                SCARD PLAY <span className="text-scard-red">IPTV</span>
              </span>
            </div>
            
            <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
              Serviço especializado em entretenimento digital de alta performance desde 2015. Qualidade de transmissão, suporte atencioso e grade completa para toda a família.
            </p>
          </div>
          
          {/* Nav links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="font-bold text-xs uppercase tracking-widest text-white">
              Navegação
            </h4>
            <ul className="space-y-2.5 text-xs text-gray-400 font-medium">
              <li><a href="#inicio" className="hover:text-white transition-colors">Início</a></li>
              <li><a href="#beneficios" className="hover:text-white transition-colors">Benefícios</a></li>
              <li><a href="#conteudos" className="hover:text-white transition-colors">Destaques</a></li>
              <li><a href="#compatibilidade" className="hover:text-white transition-colors">Aparelhos</a></li>
              <li><a href="#aplicativos" className="hover:text-white transition-colors">Aplicativos</a></li>
              <li><a href="#planos" className="hover:text-white transition-colors">Planos</a></li>
              <li><a href="#faq" className="hover:text-white transition-colors">Perguntas Frequentes</a></li>
            </ul>
          </div>

          {/* Contact and Support */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="font-bold text-xs uppercase tracking-widest text-white">
              Atendimento e Suporte
            </h4>
            <p className="text-xs text-gray-400 leading-relaxed">
              Atendimento disponível via WhatsApp para ativação de novos acessos e suporte técnico para assinantes.
            </p>
            <div className="pt-2">
              <a 
                href={WHATSAPP_BASE_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-bold text-scard-red hover:text-white transition-colors"
              >
                <span>Falar com o Atendimento VIP</span>
                <ArrowRight size={14} />
              </a>
            </div>
          </div>

        </div>

        {/* Legal Notice */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-6 text-[11px] text-gray-500">
          <p>© 2015-2026 SCARD PLAY IPTV. Todos os direitos reservados.</p>
          <p className="text-center md:text-right max-w-xl text-[10px] text-gray-600">
            Aviso: Não hospedamos arquivos em servidores próprios. Todo o conteúdo é retransmitido através de provedores e tecnologias de terceiros compatíveis.
          </p>
        </div>
      </div>
    </footer>
  );
};

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#07080A] text-white selection:bg-scard-red selection:text-white font-sans">
      <Header />
      <CatalogCarousel />
      <Hero />
      <Benefits />
      <FeaturedContentSection />
      <Compatibility />
      <SupportedApps />
      <PlansSection />
      <SocialProof />
      <FAQ />
      <CTAFinal />
      <Footer />
    </div>
  );
};

export default App;
