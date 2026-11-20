import React, { useState } from 'react';
import {
  Tv,
  Smartphone,
  Monitor,
  Box,
  ShieldCheck,
  Zap,
  Check,
  Plus,
  Star,
  Globe,
  Clock,
  Menu,
  X,
  Play,
  RotateCcw,
  Headphones,
  Film,
  MessageCircle
} from 'lucide-react';
import { PLANS, FAQ_ITEMS, TESTIMONIALS, FEATURED_CONTENT } from './constants';
import { FAQItem } from './types';
import { CatalogCarousel } from './CatalogCarousel';
import { HeroTrailer } from './HeroTrailer';

const WHATSAPP_BASE_LINK = "https://wa.me/5541988745822?text=Ol%C3%A1,%20vim%20pelo%20site%20e%20quero%20mais%20informa%C3%A7%C3%B5es";

const NAV_LINKS = [
  { href: '#catalogo', label: 'Catálogo 2026' },
  { href: '#beneficios', label: 'Benefícios' },
  { href: '#conteudos', label: 'Conteúdos' },
  { href: '#compatibilidade', label: 'Aparelhos e apps' },
  { href: '#planos', label: 'Planos' },
  { href: '#faq', label: 'Dúvidas' },
];

/* ---------- Brand ---------- */

const LogoIcon = ({ size = 20, className = "" }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M8 5v14l11-7z" />
  </svg>
);

const Wordmark: React.FC<{ compact?: boolean }> = ({ compact }) => (
  <span className="flex items-center gap-2.5">
    <span className={`${compact ? 'w-8 h-8' : 'w-9 h-9'} bg-scard-red rounded-[10px] flex items-center justify-center shadow-[0_6px_24px_-6px_rgba(229,9,20,0.7)]`}>
      <LogoIcon size={compact ? 16 : 18} className="text-white ml-0.5" />
    </span>
    <span className="display text-[1.3rem] sm:text-[1.55rem] leading-none tracking-wide text-white whitespace-nowrap">
      SCARD PLAY <span className="text-scard-red">IPTV</span>
    </span>
  </span>
);

const WhatsAppButton: React.FC<{
  href?: string;
  children: React.ReactNode;
  variant?: 'red' | 'light' | 'ghost';
  size?: 'md' | 'lg';
  className?: string;
}> = ({ href = WHATSAPP_BASE_LINK, children, variant = 'red', size = 'md', className = '' }) => {
  const variants = {
    red: 'bg-scard-red hover:bg-scard-redDark text-white shadow-[0_10px_30px_-10px_rgba(229,9,20,0.8)]',
    light: 'bg-scard-bone hover:bg-white text-black',
    ghost: 'bg-transparent hover:bg-white/[0.06] text-scard-bone border border-scard-line hover:border-white/30',
  };
  const sizes = {
    md: 'px-5 py-3 text-sm',
    lg: 'px-7 py-4 text-base',
  };
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center gap-2.5 rounded-full font-semibold transition-colors active:scale-[0.98] ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {variant !== 'ghost' && <MessageCircle size={size === 'lg' ? 18 : 16} aria-hidden="true" />}
      <span>{children}</span>
    </a>
  );
};

const SectionHeading: React.FC<{ title: string; intro?: string; className?: string }> = ({ title, intro, className = '' }) => (
  <div className={`max-w-2xl ${className}`}>
    <h2 className="display text-5xl sm:text-6xl lg:text-7xl text-white text-balance">{title}</h2>
    {intro && <p className="mt-5 text-scard-ash text-base sm:text-lg leading-relaxed max-w-xl">{intro}</p>}
  </div>
);

/* ---------- Header ---------- */

const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-xl border-b border-white/[0.07]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-[68px] flex items-center justify-between gap-6">
        <a href="#inicio" className="shrink-0" aria-label="SCARD PLAY IPTV, voltar ao início">
          <Wordmark />
        </a>

        <nav className="hidden lg:flex items-center gap-7 text-sm text-scard-ash" aria-label="Seções">
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href} className="hover:text-white transition-colors">
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2 shrink-0">
          <div className="hidden sm:block">
            <WhatsAppButton className="!py-2.5">Assinar agora</WhatsAppButton>
          </div>
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden w-10 h-10 flex items-center justify-center rounded-full text-scard-bone hover:bg-white/[0.08]"
            aria-label={mobileMenuOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="lg:hidden bg-black border-t border-white/[0.07] px-4 sm:px-6 pb-6">
          <nav className="flex flex-col" aria-label="Seções">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="display text-3xl py-3 border-b border-white/[0.07] text-scard-bone hover:text-scard-red flex items-center justify-between"
              >
                {link.label}
                {link.href === '#catalogo' && (
                  <span className="font-sans normal-case text-xs font-semibold tracking-normal bg-scard-red text-white px-2 py-0.5 rounded-full" style={{ fontStretch: '100%', fontVariationSettings: "'wdth' 100" }}>
                    Novo
                  </span>
                )}
              </a>
            ))}
          </nav>
          <WhatsAppButton size="lg" className="w-full mt-6">Falar com um atendente</WhatsAppButton>
        </div>
      )}
    </header>
  );
};

/* ---------- Hero (headline + catalog tunnel) ---------- */

const Hero: React.FC = () => (
  <section id="inicio" className="relative bg-black">
    <div className="relative min-h-[92svh] flex items-end overflow-hidden">
      <HeroTrailer />

      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-14 sm:pb-20">
        <div className="max-w-3xl">
          <h1 className="display hero-title text-white drop-shadow-[0_4px_30px_rgba(0,0,0,0.6)]">
            <span className="rise-mask"><span className="rise-line">Toda a TV</span></span>
            <span className="rise-mask"><span className="rise-line" style={{ animationDelay: '90ms' }}>num só</span></span>
            <span className="rise-mask"><span className="rise-line" style={{ animationDelay: '180ms' }}>acesso.</span></span>
          </h1>

          <p className="mt-7 text-scard-bone/90 text-lg leading-relaxed max-w-lg">
            Mais de 150 mil conteúdos entre canais abertos e fechados, filmes, séries e esportes ao vivo em Full HD e 4K. Sem fidelidade e sem multa.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <WhatsAppButton size="lg">Quero meu acesso</WhatsAppButton>
            <a
              href="#planos"
              className="inline-flex items-center justify-center rounded-full px-7 py-4 text-base font-semibold text-white bg-white/10 backdrop-blur border border-white/20 hover:bg-white/20 transition-colors"
            >
              Ver planos
            </a>
          </div>

          <dl className="mt-10 grid grid-cols-3 gap-4 max-w-lg pt-5 border-t border-white/15">
            <div>
              <dt className="text-xs text-scard-ash">Clientes ativos</dt>
              <dd className="display text-3xl text-white mt-1">+15 mil</dd>
            </div>
            <div>
              <dt className="text-xs text-scard-ash">Avaliação média</dt>
              <dd className="display text-3xl text-white mt-1 flex items-center gap-1.5">
                4,9 <Star size={16} className="text-scard-red fill-scard-red" aria-hidden="true" />
              </dd>
            </div>
            <div>
              <dt className="text-xs text-scard-ash">Tempo de ativação</dt>
              <dd className="display text-3xl text-white mt-1">5 min</dd>
            </div>
          </dl>
        </div>
      </div>
    </div>

    <CatalogCarousel />
  </section>
);

/* ---------- Demo video ---------- */

const Demo: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <section id="demonstracao" className="py-24 sm:py-32 bg-scard-coal border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        <div className="lg:col-span-7 order-2 lg:order-1">
          <div className="relative rounded-2xl overflow-hidden bg-black ring-1 ring-white/10 shadow-[0_40px_120px_-40px_rgba(229,9,20,0.35)]">
            <div className="aspect-video relative group">
              {!isPlaying ? (
                <>
                  <img
                    src="/images/hero_cinematic_livingroom_1794004161004.jpg"
                    alt="Sala de estar com a interface da SCARD PLAY aberta na Smart TV"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                  <button
                    onClick={() => setIsPlaying(true)}
                    className="absolute inset-0 flex items-center justify-center"
                    aria-label="Assistir ao vídeo de demonstração"
                  >
                    <span className="relative w-20 h-20 rounded-full bg-scard-red text-white flex items-center justify-center transition-transform group-hover:scale-110">
                      <span className="absolute inset-0 rounded-full bg-scard-red/50 animate-ping motion-reduce:hidden" />
                      <Play size={28} className="relative ml-1 fill-white" />
                    </span>
                  </button>
                  <p className="absolute bottom-5 left-5 right-5 text-sm text-scard-bone/90">
                    Vídeo de 1 minuto com a interface e a qualidade de imagem reais.
                  </p>
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
                    className="absolute top-3 right-3 bg-black/80 hover:bg-black text-white px-3 py-2 rounded-full text-xs font-semibold flex items-center gap-1.5 border border-white/10 z-20"
                  >
                    <RotateCcw size={12} />
                    <span>Fechar vídeo</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 order-1 lg:order-2">
          <SectionHeading
            title="Veja como fica na sua TV"
            intro="A mesma grade que você teria na TV a cabo, organizada num aplicativo só, com busca, categorias e guia de programação."
          />
          <ul className="mt-9 space-y-4">
            {[
              "Ativação em até 5 minutos",
              "Sem contrato de fidelidade",
              "Suporte por pessoas reais no WhatsApp",
              "Grade completa em Full HD e 4K",
            ].map((item) => (
              <li key={item} className="flex items-center gap-3.5 text-scard-bone">
                <span className="w-6 h-6 rounded-full bg-scard-red flex items-center justify-center shrink-0">
                  <Check size={14} strokeWidth={3} className="text-white" />
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

/* ---------- Benefits ---------- */

const Benefits: React.FC = () => {
  const items = [
    { icon: <Film size={22} />, title: "Mais de 150 mil conteúdos", desc: "Canais abertos e fechados, lançamentos do cinema, séries completas, novelas e documentários, atualizados toda semana." },
    { icon: <Zap size={22} />, title: "4K sem travar", desc: "Servidores dedicados e banda larga de alta velocidade para ver o jogo do seu time e os filmes sem buffering." },
    { icon: <Smartphone size={22} />, title: "Funciona em tudo", desc: "Smart TV Samsung, LG, Roku e Android, celular, TV Box, computador ou tablet." },
    { icon: <Headphones size={22} />, title: "Suporte VIP", desc: "A equipe técnica acompanha a instalação passo a passo e tira suas dúvidas direto no WhatsApp." },
    { icon: <ShieldCheck size={22} />, title: "Controle parental", desc: "Conteúdo adulto é opcional e fica bloqueado por senha. A programação da família fica sob seu controle." },
    { icon: <Clock size={22} />, title: "Ativação sem burocracia", desc: "Sem fila, sem técnico em casa e sem contrato com multa ou cláusula abusiva." },
  ];

  return (
    <section id="beneficios" className="py-24 sm:py-32 bg-black border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
        <div className="lg:col-span-4 min-w-0">
          <div className="lg:sticky lg:top-28">
            <SectionHeading
              title="Por que escolhem a SCARD PLAY"
              intro="Estrutura própria para entregar a estabilidade que a TV convencional e os serviços amadores não entregam."
            />
          </div>
        </div>

        <ul className="lg:col-span-8 grid sm:grid-cols-2 gap-x-10">
          {items.map((item) => (
            <li key={item.title} className="py-8 border-t border-scard-line">
              <span className="text-scard-red block mb-5" aria-hidden="true">{item.icon}</span>
              <h3 className="text-xl font-semibold text-white tracking-tight">{item.title}</h3>
              <p className="mt-2 text-scard-ash leading-relaxed">{item.desc}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

/* ---------- Featured content ---------- */

const FeaturedContentSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('todos');

  const categories = [
    { id: 'todos', label: 'Tudo' },
    { id: 'cinema', label: 'Cinema e filmes' },
    { id: 'series', label: 'Séries e novelas' },
    { id: 'esportes', label: 'Esportes ao vivo' },
  ];

  const filteredItems = FEATURED_CONTENT.filter(item => {
    if (activeCategory === 'todos') return true;
    if (activeCategory === 'cinema') return item.title.includes('Filmes') || item.category.includes('Cinema');
    if (activeCategory === 'series') return item.title.includes('Séries') || item.category.includes('Dramas');
    if (activeCategory === 'esportes') return item.title.includes('Esportes') || item.category.includes('Transmissão');
    return true;
  });

  return (
    <section id="conteudos" className="py-24 sm:py-32 bg-scard-coal border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12">
          <SectionHeading
            title="Cinema, esporte e TV no mesmo lugar"
            intro="Imagem e som de qualidade para a família inteira assistir junto."
          />

          <div className="flex gap-1 p-1 rounded-full bg-black border border-scard-line overflow-x-auto no-scrollbar max-w-full self-start lg:self-auto shrink-0" role="tablist" aria-label="Filtrar conteúdos">
            {categories.map((cat) => (
              <button
                key={cat.id}
                role="tab"
                aria-selected={activeCategory === cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                  activeCategory === cat.id ? 'bg-scard-red text-white' : 'text-scard-ash hover:text-white'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 auto-rows-[240px] lg:auto-rows-[260px] gap-4">
          {filteredItems.map((item, idx) => {
            const isLead = idx === 0 && filteredItems.length >= 3;
            return (
              <article
                key={item.title}
                className={`group relative rounded-xl overflow-hidden bg-black flex flex-col justify-end ${
                  isLead ? 'sm:col-span-2 lg:row-span-2' : ''
                }`}
              >
                <img
                  src={item.image}
                  alt=""
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                {item.badge && (
                  <span className="absolute top-4 left-4 text-xs font-semibold text-white bg-black/60 backdrop-blur px-2.5 py-1 rounded-full border border-white/15">
                    {item.badge}
                  </span>
                )}
                <div className="relative p-6">
                  <p className="text-sm text-white/80 font-medium flex items-center gap-2"><span className="w-4 h-0.5 bg-scard-red" aria-hidden="true" />{item.category}</p>
                  <h3 className={`display text-white mt-1.5 ${isLead ? 'text-5xl sm:text-6xl' : 'text-3xl'}`}>
                    {item.title}
                  </h3>
                </div>
              </article>
            );
          })}
        </div>

        <div className="mt-12 flex justify-center">
          <WhatsAppButton variant="ghost" size="lg">Pedir o catálogo completo no WhatsApp</WhatsAppButton>
        </div>
      </div>
    </section>
  );
};

/* ---------- Devices + apps ---------- */

const DevicesAndApps: React.FC = () => {
  const devices = [
    { icon: <Tv size={26} />, name: 'Smart TV', detail: 'Samsung, LG, TCL, Philco' },
    { icon: <Box size={26} />, name: 'TV Box e sticks', detail: 'Fire TV, Mi Box, Chromecast' },
    { icon: <Smartphone size={26} />, name: 'Celular', detail: 'Android e iPhone' },
    { icon: <Globe size={26} />, name: 'Computador', detail: 'Windows, Mac e navegador' },
    { icon: <Monitor size={26} />, name: 'Tablet e console', detail: 'iPad, tablets e Xbox' },
  ];

  const systems = [
    { name: "Smart TV LG", platform: "webOS", icon: <Tv size={18} />, apps: ["Play Sim", "Smarters Player Lite", "SS IPTV", "Room IPTV", "IBO Player", "DuplexPlay", "Flix IPTV", "Bob Player"] },
    { name: "Smart TV Samsung", platform: "Tizen OS", icon: <Monitor size={18} />, apps: ["Play Sim", "Smarters Player Lite", "SS IPTV", "Room IPTV", "IBO Player", "DuplexPlay", "Flix IPTV", "Bob Player"] },
    { name: "Roku", platform: "Roku OS, AOC e Philco", icon: <Box size={18} />, apps: ["Play Sim", "IPTV Smarters", "MetaPlayer", "GSE Smart IPTV", "ClouDDy", "IBO Player", "Rivu TV"] },
    { name: "Android", platform: "Android TV, TV Box e celular", icon: <Smartphone size={18} />, apps: ["Play Sim", "XCIPTV Player", "IPTV Smarters Pro", "Televizo", "TiviMate", "IMPlayer", "IBO Player"] },
  ];

  const [active, setActive] = useState(0);
  const sys = systems[active];

  return (
    <section id="compatibilidade" className="py-24 sm:py-32 bg-black border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Funciona no aparelho que você já tem"
          intro="Compatível com os principais sistemas do mercado. Não precisa comprar nada novo."
        />

        <ul className="mt-12 grid grid-cols-2 md:grid-cols-5 border-t border-l border-scard-line">
          {devices.map((d) => (
            <li key={d.name} className="p-6 border-b border-r border-scard-line">
              <span className="text-scard-red" aria-hidden="true">{d.icon}</span>
              <p className="mt-4 font-semibold text-white">{d.name}</p>
              <p className="mt-1 text-sm text-scard-ash">{d.detail}</p>
            </li>
          ))}
        </ul>

        <div id="aplicativos" className="mt-20 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          <div className="lg:col-span-4 min-w-0">
            <h3 className="display text-4xl sm:text-5xl text-white">Qual app instalar</h3>
            <p className="mt-4 text-scard-ash leading-relaxed">
              Escolha sua TV e veja os aplicativos compatíveis testados pela nossa equipe.
            </p>
            <div className="mt-8 flex lg:flex-col gap-2 overflow-x-auto no-scrollbar -mx-4 px-4 lg:mx-0 lg:px-0" role="tablist" aria-label="Sistema da sua TV">
              {systems.map((s, i) => (
                <button
                  key={s.name}
                  role="tab"
                  aria-selected={active === i}
                  onClick={() => setActive(i)}
                  className={`shrink-0 flex items-center gap-3 text-left px-4 py-3.5 rounded-xl border transition-colors ${
                    active === i
                      ? 'border-scard-red bg-scard-red/[0.08] text-white'
                      : 'border-scard-line text-scard-ash hover:text-white hover:border-white/25'
                  }`}
                >
                  <span className={active === i ? 'text-scard-red' : ''}>{s.icon}</span>
                  <span>
                    <span className="block font-semibold text-sm">{s.name}</span>
                    <span className="block text-xs text-scard-ash mt-0.5">{s.platform}</span>
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="lg:col-span-8 rounded-2xl bg-scard-coal border border-scard-line p-6 sm:p-10" role="tabpanel" aria-label={sys.name}>
            <div>
              <div className="flex items-baseline justify-between border-b border-scard-line pb-3">
                <h4 className="font-semibold text-white">Aplicativos compatíveis</h4>
                <span className="text-xs text-scard-ash">{sys.apps.length} opções</span>
              </div>
              <ul className="mt-5 grid sm:grid-cols-2 gap-x-10 gap-y-3.5">
                {sys.apps.map((app) => (
                  <li key={app} className="flex items-center gap-3 text-scard-bone">
                    <Check size={16} className="text-scard-red shrink-0" />
                    {app}
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-10 pt-6 border-t border-scard-line flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <p className="text-sm text-scard-ash">Não sabe instalar? A gente configura com você.</p>
              <WhatsAppButton variant="ghost">Pedir ajuda com a {sys.name}</WhatsAppButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ---------- Plans ---------- */

const PlansSection: React.FC = () => (
  <section id="planos" className="relative py-24 sm:py-32 bg-scard-coal border-t border-white/[0.06] overflow-hidden">
    <div className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 w-[900px] h-[400px] rounded-full bg-scard-red/[0.07] blur-[150px]" />
    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <SectionHeading
        title="Escolha seu plano"
        intro="Preço fechado, sem taxa escondida e sem renovação automática. Todos os planos têm o catálogo completo."
      />

      <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 items-stretch">
        {PLANS.map((plan) => {
          const isHighlight = plan.highlight;
          const [reais, centavos] = plan.price.split(',');
          return (
            <div
              key={plan.id}
              className={`relative rounded-2xl flex flex-col p-7 xl:p-6 ${
                isHighlight
                  ? 'bg-black ring-2 ring-scard-red shadow-[0_30px_80px_-30px_rgba(229,9,20,0.6)] xl:-my-4 xl:py-10'
                  : 'bg-black/60 ring-1 ring-scard-line'
              }`}
            >
              <div className="flex items-center justify-between gap-2">
                <span className="text-sm text-scard-ash">{plan.name}</span>
                {isHighlight && (
                  <span className="text-xs font-semibold bg-scard-red text-white px-3 py-1 rounded-full whitespace-nowrap shrink-0">
                    Mais escolhido
                  </span>
                )}
              </div>

              <h3 className="display text-5xl xl:text-[2.75rem] text-white mt-3">{plan.period}</h3>

              <div className="mt-6 flex items-start gap-1 text-white">
                <span className="text-lg font-semibold mt-2">R$</span>
                <span className="display text-[5.5rem] xl:text-[4.5rem] leading-[0.85] tabular">{reais}</span>
                <span className="display text-4xl xl:text-3xl mt-1 tabular">,{centavos}</span>
              </div>
              <p className="mt-2 text-sm text-scard-ash">por {plan.durationLabel}</p>

              <ul className="mt-8 pt-8 border-t border-scard-line space-y-3.5 flex-1">
                {plan.benefits.map((benefit) => (
                  <li key={benefit} className="flex items-start gap-3 text-scard-bone text-[15px]">
                    <Check size={18} className="text-scard-red shrink-0 mt-0.5" />
                    <span className="leading-snug">{benefit}</span>
                  </li>
                ))}
              </ul>

              <WhatsAppButton
                href={plan.whatsappLink}
                variant={isHighlight ? 'red' : 'light'}
                size="lg"
                className="w-full mt-10 xl:!px-4 xl:!py-3.5 xl:!text-sm whitespace-nowrap"
              >
                Contratar plano {plan.period.toLowerCase()}
              </WhatsAppButton>
            </div>
          );
        })}
      </div>

      <div className="mt-14 flex flex-col sm:flex-row items-start sm:items-center gap-4 max-w-3xl">
        <ShieldCheck size={28} className="text-scard-red shrink-0" />
        <p className="text-scard-ash leading-relaxed">
          <span className="text-white font-semibold">Ativação rápida e suporte de verdade.</span>{' '}
          Depois de escolher o plano, você recebe os dados de acesso no WhatsApp com o passo a passo para a sua TV.
        </p>
      </div>
    </div>
  </section>
);

/* ---------- Testimonials ---------- */

const SocialProof: React.FC = () => (
  <section className="py-24 sm:py-32 bg-black border-t border-white/[0.06]">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
        <SectionHeading title="Quem assina, recomenda" />
        <div className="flex items-center gap-4">
          <span className="display text-7xl text-white">4,9</span>
          <div>
            <div className="flex gap-0.5 text-scard-red">
              {[...Array(5)].map((_, i) => <Star key={i} size={16} className="fill-scard-red" />)}
            </div>
            <p className="text-sm text-scard-ash mt-1">média de +15 mil assinantes</p>
          </div>
        </div>
      </div>

      <div className="mt-14 grid md:grid-cols-3 gap-10 md:gap-0 md:divide-x divide-scard-line">
        {TESTIMONIALS.map((t, idx) => (
          <figure key={idx} className="md:px-10 first:md:pl-0 last:md:pr-0 flex flex-col justify-between">
            <blockquote className="text-xl leading-relaxed text-scard-bone text-pretty">
              “{t.text}”
            </blockquote>
            <figcaption className="mt-8 flex items-center gap-3">
              <span className="w-10 h-10 rounded-full bg-scard-red text-white flex items-center justify-center font-bold">
                {t.author[0]}
              </span>
              <span>
                <span className="block font-semibold text-white">{t.author}</span>
                <span className="block text-sm text-scard-ash">Assinante verificado</span>
              </span>
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  </section>
);

/* ---------- FAQ ---------- */

const FAQAccordionItem: React.FC<{ item: FAQItem; id: string }> = ({ item, id }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-scard-line">
      <h3>
        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-controls={id}
          className="w-full py-6 flex items-center justify-between text-left gap-6 group"
        >
          <span className={`text-lg sm:text-xl font-semibold tracking-tight transition-colors ${isOpen ? 'text-white' : 'text-scard-bone group-hover:text-white'}`}>
            {item.question}
          </span>
          <span className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${isOpen ? 'bg-scard-red text-white rotate-45' : 'bg-white/[0.06] text-scard-bone'}`}>
            <Plus size={18} />
          </span>
        </button>
      </h3>
      <div id={id} className="accordion-panel" data-open={isOpen}>
        <div>
          <p className="pb-7 pr-14 text-scard-ash leading-relaxed max-w-2xl">{item.answer}</p>
        </div>
      </div>
    </div>
  );
};

const FAQ: React.FC = () => (
  <section id="faq" className="py-24 sm:py-32 bg-scard-coal border-t border-white/[0.06]">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
      <div className="lg:col-span-5">
        <div className="lg:sticky lg:top-28">
          <SectionHeading
            title="Dúvidas antes de assinar"
            intro="As perguntas que mais recebemos. Se a sua não estiver aqui, é só chamar."
          />
          <WhatsAppButton variant="ghost" className="mt-8">Perguntar no WhatsApp</WhatsAppButton>
        </div>
      </div>
      <div className="lg:col-span-7 border-t border-scard-line">
        {FAQ_ITEMS.map((item, idx) => (
          <FAQAccordionItem key={idx} item={item} id={`faq-${idx}`} />
        ))}
      </div>
    </div>
  </section>
);

/* ---------- Final CTA ---------- */

const CTAFinal: React.FC = () => (
  <section className="relative bg-scard-red overflow-hidden">
    <LogoIcon size={720} className="pointer-events-none absolute -right-40 top-1/2 -translate-y-1/2 text-black/[0.12]" />
    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
      <h2 className="display cta-title text-white max-w-4xl text-balance">
        Sua TV nunca mais será a mesma.
      </h2>
      <p className="mt-6 text-white/90 text-lg max-w-xl leading-relaxed">
        Assine hoje e tenha o catálogo completo em alta definição, pagando até 90% menos que um pacote de TV a cabo.
      </p>
      <div className="mt-10 flex flex-col sm:flex-row gap-3">
        <a
          href={WHATSAPP_BASE_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2.5 rounded-full bg-black hover:bg-neutral-900 text-white px-8 py-4 text-base font-semibold transition-colors active:scale-[0.98]"
        >
          <MessageCircle size={18} />
          Começar pelo WhatsApp
        </a>
        <a
          href="#planos"
          className="inline-flex items-center justify-center rounded-full border border-white/50 hover:bg-white/10 text-white px-8 py-4 text-base font-semibold transition-colors"
        >
          Comparar planos
        </a>
      </div>
    </div>
  </section>
);

/* ---------- Footer ---------- */

const Footer: React.FC = () => (
  <footer className="bg-black pt-20 pb-10">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-14 border-b border-scard-line">
        <div className="md:col-span-5 space-y-5">
          <Wordmark compact />
          <p className="text-scard-ash leading-relaxed max-w-sm">
            Entretenimento digital desde 2015. Transmissão estável, atendimento atencioso e grade completa para toda a família.
          </p>
        </div>

        <nav className="md:col-span-3" aria-label="Rodapé">
          <h4 className="text-sm font-semibold text-white">Navegação</h4>
          <ul className="mt-4 space-y-2.5 text-sm text-scard-ash">
            <li><a href="#inicio" className="hover:text-white transition-colors">Início</a></li>
            {NAV_LINKS.map((l) => (
              <li key={l.href}><a href={l.href} className="hover:text-white transition-colors">{l.label}</a></li>
            ))}
          </ul>
        </nav>

        <div className="md:col-span-4">
          <h4 className="text-sm font-semibold text-white">Atendimento e suporte</h4>
          <p className="mt-4 text-sm text-scard-ash leading-relaxed">
            Ativação de novos acessos e suporte técnico para assinantes pelo WhatsApp.
          </p>
          <WhatsAppButton className="mt-5">Falar com o atendimento</WhatsAppButton>
        </div>
      </div>

      <div className="pt-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-xs text-scard-ash/70">
        <p>© 2015–2026 SCARD PLAY IPTV. Todos os direitos reservados.</p>
        <p className="md:text-right max-w-xl">
          Não hospedamos arquivos em servidores próprios. Todo o conteúdo é retransmitido por provedores e tecnologias de terceiros compatíveis.
        </p>
      </div>
    </div>
  </footer>
);

const App: React.FC = () => (
  <div className="min-h-screen bg-black text-scard-bone font-sans">
    <Header />
    <main>
      <Hero />
      <Demo />
      <Benefits />
      <FeaturedContentSection />
      <DevicesAndApps />
      <PlansSection />
      <SocialProof />
      <FAQ />
      <CTAFinal />
    </main>
    <Footer />
  </div>
);

export default App;
