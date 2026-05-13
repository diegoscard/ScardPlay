
import React, { useState } from 'react';
import { 
  Tv, 
  Smartphone, 
  Monitor, 
  Box, 
  ShieldCheck, 
  Zap, 
  PlayCircle, 
  Check, 
  ChevronDown, 
  Star,
  Flame,
  Globe,
  Users,
  Clock
} from 'lucide-react';
import { PLANS, FAQ_ITEMS, TESTIMONIALS, FEATURED_CONTENT } from './constants';
import { Plan, FAQItem } from './types';

const WHATSAPP_BASE_LINK = "https://wa.me/5541988745822?text=Ol%C3%A1,%20vim%20pelo%20site%20e%20quero%20mais%20informa%C3%A7%C3%B5es";

const LogoIcon = ({ size = 20, className = "" }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    className={className}
  >
    <path d="M8 5v14l11-7z" />
  </svg>
);

const BackgroundBlobs: React.FC = () => (
  <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
    <div className="blob blob-1" />
    <div className="blob blob-2" />
    <div className="blob blob-3" />
  </div>
);

const Header: React.FC = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-xl border-b border-white/5">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-scard-red rounded-xl flex items-center justify-center shadow-lg shadow-scard-red/40 rotate-12 group-hover:rotate-0 transition-transform">
             <LogoIcon size={22} className="text-white ml-0.5" />
          </div>
          <span className="font-black text-xl tracking-tighter uppercase group cursor-default">
            SCARD PLAY <span className="text-scard-red">IPTV</span>
          </span>
        </div>
        <nav className="hidden lg:flex items-center gap-8">
          <a href="#inicio" className="text-[11px] font-bold uppercase tracking-widest hover:text-scard-red transition-all hover:scale-105">Início</a>
          <a href="#beneficios" className="text-[11px] font-bold uppercase tracking-widest hover:text-scard-red transition-all hover:scale-105">Benefícios</a>
          <a href="#conteudos" className="text-[11px] font-bold uppercase tracking-widest hover:text-scard-red transition-all hover:scale-105">Destaques</a>
          <a href="#planos" className="text-[11px] font-bold uppercase tracking-widest hover:text-scard-red transition-all hover:scale-105">Planos</a>
          <a href="#faq" className="text-[11px] font-bold uppercase tracking-widest hover:text-scard-red transition-all hover:scale-105">FAQ</a>
        </nav>
        <a 
          href={WHATSAPP_BASE_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-scard-red hover:bg-red-700 text-white px-6 py-2.5 rounded-full text-[11px] font-black transition-all transform hover:scale-105 shadow-xl shadow-red-900/40 whitespace-nowrap active:scale-95"
        >
          ASSINAR AGORA
        </a>
      </div>
    </header>
  );
};

const Hero: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <section id="inicio" className="relative min-h-screen flex items-center pt-24 overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-12 gap-16 items-center">
          
          <div className="lg:col-span-7 space-y-10">
            <div className="space-y-6">
              <div className="flex flex-wrap items-center gap-4">
                <div className="inline-flex items-center gap-2 border border-scard-red/30 px-4 py-1.5 rounded-full bg-scard-red/10 backdrop-blur-md">
                  <Flame size={14} className="text-scard-red fill-scard-red" />
                  <span className="text-[10px] font-black uppercase tracking-[0.25em] text-white">Líder em Estabilidade 2024</span>
                </div>
                <div className="inline-flex items-center gap-2 border border-white/10 px-4 py-1.5 rounded-full bg-white/5 backdrop-blur-md">
                  <Star size={14} className="text-yellow-500 fill-yellow-500" />
                  <span className="text-[10px] font-black uppercase tracking-[0.25em] text-white">4.9/5 Satisfação</span>
                </div>
              </div>
              
              <div className="space-y-4">
                <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tighter leading-[0.8] uppercase">
                  LIBERTE O <br />
                  <span className="text-scard-red text-glow">ENTRETENIMENTO</span>
                </h1>
                <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-white/60 tracking-tight uppercase border-l-4 border-scard-red pl-6">
                  A Evolução Definitiva da TV
                </p>
              </div>
              
              <p className="text-white/40 text-lg sm:text-xl max-w-xl leading-relaxed font-medium">
                Diga adeus às mensalidades abusivas. Tenha acesso a mais de <span className="text-white font-bold">150.000 conteúdos</span> com estabilidade garantida e qualidade 4K nativa.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                "Ativação VIP em 5 minutos",
                "Sem Fidelidade ou Multas",
                "Suporte Humano 24/7",
                "Grade de Canais Completa"
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4 bg-white/5 backdrop-blur-xl p-4 rounded-2xl border border-white/5 hover:border-scard-red/20 transition-all group overflow-hidden relative">
                  <div className="absolute inset-0 bg-scard-red/0 group-hover:bg-scard-red/5 transition-colors" />
                  <div className="bg-scard-red/20 p-1.5 rounded-lg relative z-10">
                    <Check className="text-scard-red" size={18} />
                  </div>
                  <span className="text-base font-bold text-white/80 relative z-10">{item}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-6 pt-6">
              <a 
                href={WHATSAPP_BASE_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto bg-scard-red hover:bg-red-700 text-white px-12 py-6 rounded-3xl text-xl font-black transition-all flex items-center justify-center gap-4 shadow-2xl shadow-red-600/30 group active:scale-95"
              >
                <Zap size={24} className="group-hover:animate-pulse" />
                QUERO MEU ACESSO AGORA
              </a>
              <div className="flex items-center gap-4 px-4 py-2 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10">
                <div className="flex -space-x-3">
                  {[1,2,3,4].map(n => (
                    <div key={n} className="w-10 h-10 rounded-full border-2 border-black bg-zinc-800 overflow-hidden ring-2 ring-scard-red/20">
                      <img src={`https://i.pravatar.cc/100?u=${n + 10}`} alt="user" />
                    </div>
                  ))}
                </div>
                <div className="text-[11px] leading-tight font-black uppercase tracking-widest text-white/40">
                  <span className="text-white block">+15k USUÁRIOS</span>
                  ATIVOS HOJE
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 relative">
            <div className="relative group p-1 bg-white/10 rounded-[2.5rem] backdrop-blur-md border border-white/20">
              <div 
                className="relative z-10 rounded-[2.2rem] overflow-hidden bg-black shadow-2xl group cursor-pointer"
                onClick={() => !isPlaying && setIsPlaying(true)}
              >
                <div className="aspect-[4/5] sm:aspect-video relative">
                  {!isPlaying ? (
                    <>
                      <img 
                        src="https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&q=80&w=1200" 
                        alt="Streaming Experience"
                        className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-1000 scale-105 group-hover:scale-100"
                      />
                      <div className="absolute inset-0 bg-gradient-to-tr from-scard-red/40 to-transparent mix-blend-overlay" />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/10 transition-all duration-500">
                        <div className="relative">
                          <div className="absolute inset-0 bg-scard-red rounded-full blur-3xl opacity-60 group-hover:opacity-100 transition-opacity animate-pulse" />
                          <div className="relative w-24 h-24 rounded-full bg-white flex items-center justify-center shadow-2xl transform group-hover:scale-110 transition-transform">
                             <LogoIcon size={40} className="text-scard-red ml-1.5" />
                          </div>
                        </div>
                      </div>
                    </>
                  ) : (
                    <iframe 
                      src="https://player.vimeo.com/video/1050573081?autoplay=1" 
                      className="w-full h-full"
                      frameBorder="0" 
                      allow="autoplay; fullscreen; picture-in-picture" 
                      allowFullScreen
                    ></iframe>
                  )}
                  
                  <div className="absolute top-6 left-6 flex items-center gap-3 bg-black/40 backdrop-blur-xl px-4 py-2 rounded-full border border-white/10 pointer-events-none">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping" />
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white">Demonstração Real</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Floating Stats */}
            <div className="absolute -bottom-10 -left-10 bg-white/10 backdrop-blur-2xl p-6 rounded-3xl border border-white/20 shadow-2xl z-20 hidden sm:flex items-center gap-4 animate-bounce-slow">
              <div className="bg-green-500/20 p-3 rounded-2xl border border-green-500/20">
                <Clock className="text-green-500" size={24} />
              </div>
              <div>
                <span className="block text-[10px] text-white/50 font-black uppercase tracking-wider">Ativação Média</span>
                <span className="block text-lg font-black text-white">04:52 min</span>
              </div>
            </div>
            
            <div className="absolute -top-10 -right-10 bg-white/10 backdrop-blur-2xl p-6 rounded-3xl border border-white/20 shadow-2xl z-20 hidden sm:flex items-center gap-4">
              <div className="bg-scard-red/20 p-3 rounded-2xl border border-scard-red/20">
                <Users className="text-scard-red" size={24} />
              </div>
              <div>
                <span className="block text-[10px] text-white/50 font-black uppercase tracking-wider">Online Agora</span>
                <span className="block text-lg font-black text-white">2.418 pessoas</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Benefits: React.FC = () => {
  const benefitCards = [
    { icon: <Tv size={28} />, title: '150k+ Conteúdos', desc: 'A maior biblioteca de entretenimento direto na sua tela.' },
    { icon: <Smartphone size={28} />, title: 'Multi-Dispositivo', desc: 'Compatível com TV, celular, TV Box e computador.' },
    { icon: <Zap size={28} />, title: 'Qualidade 4K', desc: 'Imagem cristalina em HD, Full HD e resolução 4K Ultra.' },
    { icon: <ShieldCheck size={28} />, title: 'Segurança Total', desc: 'Servidores dedicados com estabilidade garantida.' },
    { icon: <Flame size={28} />, title: 'Conteúdo Adulto', desc: 'Acesso opcional protegido por senha para sua privacidade.' },
    { icon: <Zap size={28} />, title: 'Ativação Instantânea', desc: 'Pagou, ativou. Sem burocracia ou esperas longas.' },
  ];

  return (
    <section id="beneficios" className="py-32 relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl lg:text-6xl font-black uppercase tracking-tighter leading-tight">
            POR QUE ESCOLHER <br />
            <span className="text-scard-red text-glow tracking-widest">A SCARD PLAY</span>?
          </h2>
          <p className="text-white/40 max-w-2xl mx-auto text-xl font-medium">Tecnologia exclusiva que elimina travamentos mesmo em horários de pico.</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefitCards.map((benefit, idx) => (
            <div 
              key={idx} 
              className="p-8 sm:p-10 rounded-[2.5rem] bg-white/5 backdrop-blur-2xl border border-white/10 hover:border-scard-red/40 transition-all group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-scard-red/10 blur-3xl rounded-full -mr-16 -mt-16 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="text-scard-red mb-8 p-4 bg-scard-red/10 rounded-2xl inline-block group-hover:scale-110 transition-transform shadow-lg shadow-scard-red/10 border border-scard-red/20">
                {benefit.icon}
              </div>
              <h3 className="text-2xl font-black mb-4 uppercase tracking-tight">{benefit.title}</h3>
              <p className="text-white/50 text-lg leading-relaxed font-medium">{benefit.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const FeaturedContent: React.FC = () => {
  return (
    <section id="conteudos" className="py-32 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20 space-y-4">
          <h2 className="text-4xl lg:text-6xl font-black uppercase tracking-tighter leading-tight">O MELHOR DO <span className="text-scard-red text-glow tracking-widest">ENTRETENIMENTO</span></h2>
          <p className="text-white/40 max-w-2xl mx-auto text-xl font-medium">Cinema, Esportes, Séries e Canais Abertos em um só lugar.</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {FEATURED_CONTENT.map((item, idx) => (
            <div 
              key={idx} 
              className="relative group rounded-[2.5rem] overflow-hidden aspect-[16/10] cursor-pointer shadow-2xl border border-white/10 glass-container"
            >
              <img 
                src={item.image} 
                alt={item.title} 
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 grayscale-[0.3] group-hover:grayscale-0"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent flex flex-col justify-end p-8">
                <span className="text-scard-red font-black text-[10px] uppercase tracking-[0.4em] mb-3">{item.category}</span>
                <h3 className="text-2xl font-black text-white leading-tight uppercase tracking-tighter">{item.title}</h3>
                {item.badge && (
                  <div className="absolute top-8 right-8 bg-scard-red text-white text-[10px] font-black px-5 py-2 rounded-full shadow-2xl shadow-scard-red/40 border border-white/20">
                    {item.badge}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-20 text-center">
          <a 
            href={WHATSAPP_BASE_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-4 text-white text-base font-black hover:text-scard-red transition-all group py-5 px-12 border border-white/10 rounded-2xl bg-white/5 backdrop-blur-xl hover:bg-white/10 shadow-2xl active:scale-95"
          >
            VER CATÁLOGO COMPLETO
            <Zap size={22} className="group-hover:animate-pulse text-scard-red" />
          </a>
        </div>
      </div>
    </section>
  );
};

const SupportedApps: React.FC = () => {
  const systems = [
    {
      name: "Smart TV LG",
      icon: <Tv size={26} />,
      free: ["Play Sim", "Smarters Player Lite", "SS IPTV", "Room IPTV"],
      paid: ["IBO Player", "DuplexPlay", "Flix IPTV", "Bob Player"]
    },
    {
      name: "Smart TV Samsung",
      icon: <Monitor size={26} />,
      free: ["Play Sim", "Smarters Player Lite", "SS IPTV", "Room IPTV"],
      paid: ["IBO Player", "DuplexPlay", "Flix IPTV", "Bob Player"]
    },
    {
      name: "Sistema Roku",
      icon: <Box size={26} />,
      free: ["Play Sim", "IPTV Smarters", "MetaPlayer", "GSE Smart IPTV"],
      paid: ["ClouDDy", "IBO Player", "Rivu TV"]
    },
    {
      name: "Sistema Android",
      icon: <Smartphone size={26} />,
      free: ["Play Sim", "XCIPTV Player", "IPTV Smarters Pro", "Televizo"],
      paid: ["TiviMate", "IMPlayer", "IBO Player"]
    }
  ];

  return (
    <section className="py-32 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20 space-y-4">
          <h2 className="text-4xl lg:text-6xl font-black uppercase tracking-tighter">APLICATIVOS <span className="text-scard-red text-glow">COMPATÍVEIS</span></h2>
          <p className="text-white/40 text-xl font-medium">Temos o Player ideal para transformar sua experiência.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {systems.map((sys, idx) => (
            <div key={idx} className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] p-8 hover:bg-white/10 transition-all hover:border-scard-red/40 group">
              <div className="flex items-center gap-5 mb-10">
                <div className="w-14 h-14 rounded-2xl bg-scard-red/20 text-scard-red border border-scard-red/30 flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg shadow-scard-red/10">
                  {sys.icon}
                </div>
                <h3 className="text-2xl font-black uppercase tracking-tighter leading-tight">{sys.name}</h3>
              </div>

              <div className="space-y-8">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]"></div>
                    <h4 className="text-[11px] font-black text-white/50 uppercase tracking-[0.3em]">Canais Grátis</h4>
                  </div>
                  <ul className="space-y-3">
                    {sys.free.map((app, i) => (
                      <li key={i} className="flex items-center gap-3 text-white/70 text-base font-bold">
                        <Check size={16} className="text-green-500/50" />
                        {app}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="h-px w-full bg-white/5 shadow-inner"></div>

                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-2.5 h-2.5 rounded-full bg-scard-red shadow-[0_0_100px_rgba(204,0,0,0.5)]"></div>
                    <h4 className="text-[11px] font-black text-white/50 uppercase tracking-[0.3em]">Apps Premium</h4>
                  </div>
                  <ul className="space-y-3">
                    {sys.paid.map((app, i) => (
                      <li key={i} className="flex items-center gap-3 text-white/80 text-base font-bold">
                        <Star size={16} className="text-scard-red/50" />
                        {app}
                      </li>
                    ))}
                  </ul>
                </div>
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
    <section id="planos" className="py-32 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl lg:text-6xl font-black uppercase tracking-tighter leading-tight">ESCOLHA SEU <br /><span className="text-scard-red text-glow">PACOTE VIP</span></h2>
          <p className="text-white/40 text-xl font-medium">Lazer de alta performance que cabe no seu bolso.</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-10 max-w-7xl mx-auto items-stretch pt-12">
          {PLANS.map((plan) => {
            const innerContent = (
              <div className="text-center mb-12 relative z-10">
                <span className="text-white/40 text-[11px] font-black uppercase tracking-[0.5em] mb-6 block">{plan.name}</span>
                <h3 className="text-4xl font-black my-6 uppercase tracking-tighter leading-none">{plan.period}</h3>
                <div className="flex items-center justify-center gap-2">
                  <span className="text-3xl font-black text-white/30">R$</span>
                  <span className={`text-7xl font-black tracking-tighter ${plan.highlight ? 'text-scard-red text-glow' : 'text-white'}`}>{plan.price.split(',')[0]}</span>
                  <div className="text-left">
                    <span className={`text-3xl font-black block leading-none ${plan.highlight ? 'text-scard-red text-glow' : 'text-white'}`}>{plan.price.split(',')[1]}</span>
                    <span className="block text-[11px] text-white/30 font-black uppercase tracking-[0.2em] mt-1">{plan.durationLabel}</span>
                  </div>
                </div>
              </div>
            );

            const benefitsContent = (
              <div className="space-y-5 mb-12 flex-grow relative z-10 px-4">
                {plan.benefits.map((benefit, bIdx) => (
                  <div key={bIdx} className="flex items-start gap-4 text-white/60 group/item">
                    <div className="bg-scard-red/10 p-1 rounded-lg mt-0.5 group-hover/item:bg-scard-red/20 transition-colors border border-scard-red/10">
                      <Check size={16} className="text-scard-red shrink-0" />
                    </div>
                    <span className="font-bold text-base leading-tight group-hover/item:text-white transition-colors">{benefit}</span>
                  </div>
                ))}
              </div>
            );

            const footerContent = (
              <div className="relative z-10 mt-auto px-2 pb-2">
                <a 
                  href={plan.whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-full ${plan.highlight ? 'bg-scard-red hover:bg-red-700 shadow-scard-red/40' : 'bg-white/5 hover:bg-white/10 border border-white/10'} text-white px-8 py-6 rounded-[2rem] text-xl font-black transition-all flex items-center justify-center gap-4 shadow-2xl group active:scale-95`}
                >
                  <Zap size={24} className={`${plan.highlight ? 'animate-pulse' : 'text-scard-red'}`} />
                  ATIVAR AGORA
                </a>
              </div>
            );

            if (plan.highlight) {
              return (
                <div key={plan.id} className="relative z-20 flex flex-col lg:scale-110 mt-12 lg:mt-0">
                   <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-scard-red text-white px-10 py-3 rounded-full text-[11px] font-black uppercase tracking-[0.3em] z-30 shadow-2xl shadow-scard-red/50 border border-white/20 whitespace-nowrap">
                     PLANO RECOMENDADO
                   </div>
                   <div className="animated-border-container h-full flex flex-col">
                      <div className="relative p-10 h-full flex flex-col bg-black/80 backdrop-blur-[40px] rounded-[2.5rem]">
                        {innerContent}
                        {benefitsContent}
                        {footerContent}
                      </div>
                   </div>
                </div>
              );
            }

            return (
              <div key={plan.id} className="flex flex-col transform hover:translate-y-[-12px] transition-all duration-700">
                <div className="relative p-10 h-full flex flex-col bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] hover:border-scard-red/20 hover:bg-white/10 transition-all overflow-hidden group">
                   <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 blur-3xl rounded-full -mr-16 -mt-16 group-hover:bg-scard-red/10 transition-all" />
                   {innerContent}
                   {benefitsContent}
                   {footerContent}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

const Compatibility: React.FC = () => {
  const devices = [
    { icon: <Tv size={42} />, name: 'Smart TV' },
    { icon: <Smartphone size={42} />, name: 'Celular' },
    { icon: <Globe size={42} />, name: 'Web/PC' },
    { icon: <Box size={42} />, name: 'TV Box' },
    { icon: <Monitor size={42} />, name: 'Console' },
  ];

  return (
    <section className="py-24 bg-white/5 backdrop-blur-md border-y border-white/5 overflow-hidden">
      <div className="container mx-auto px-6 text-center">
        <h3 className="text-xl font-black mb-16 uppercase tracking-[0.4em] text-white/30">LIVRE PARA ASSISTIR ONDE QUISER</h3>
        <div className="flex flex-wrap justify-center gap-12 sm:gap-20 md:gap-32 lg:gap-40 opacity-40">
          {devices.map((device, idx) => (
            <div key={idx} className="flex flex-col items-center gap-5 group cursor-default transition-all duration-500 hover:opacity-100 hover:scale-110">
              <div className="text-white group-hover:text-scard-red transition-all duration-300 group-hover:text-glow">
                {device.icon}
              </div>
              <span className="text-[11px] font-black uppercase tracking-[0.5em] text-white/20 group-hover:text-white transition-colors">{device.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const SocialProof: React.FC = () => {
  return (
    <section className="py-32 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20 space-y-4">
          <h2 className="text-4xl lg:text-6xl font-black uppercase tracking-tighter">O QUE DIZEM NOSSOS <span className="text-scard-red text-glow tracking-widest">ASSINANTES</span></h2>
          <p className="text-white/40 text-xl font-medium">Credibilidade construída através de qualidade e suporte real.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-10">
          {TESTIMONIALS.map((t, idx) => (
            <div key={idx} className="bg-white/5 backdrop-blur-2xl p-10 rounded-[2.5rem] border border-white/10 space-y-8 hover:bg-white/10 transition-all group shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-scard-red/5 blur-3xl rounded-full -mr-16 -mt-16 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="flex gap-2">
                {[...Array(t.rating)].map((_, i) => (
                  <Star key={i} size={18} className="text-yellow-500 fill-yellow-500 drop-shadow-[0_0_8px_rgba(234,179,8,0.4)]" />
                ))}
              </div>
              <p className="text-xl text-white/70 font-bold leading-relaxed italic relative z-10">"{t.text}"</p>
              <div className="flex items-center gap-6 pt-8 border-t border-white/5 relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-scard-red/20 flex items-center justify-center font-black text-scard-red text-2xl uppercase border border-scard-red/20 shadow-lg">
                  {t.author[0]}
                </div>
                <div>
                  <span className="block font-black text-xl uppercase tracking-tighter">{t.author}</span>
                  <span className="block text-[11px] text-scard-red font-black uppercase tracking-[0.3em] mt-1">Cliente Verificado</span>
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
    <div className="border-b border-white/5 last:border-0 group/faq">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-8 sm:py-10 flex items-center justify-between text-left group gap-6"
      >
        <span className={`text-xl sm:text-2xl font-black transition-all ${isOpen ? 'text-scard-red translate-x-3' : 'text-white'}`}>{item.question}</span>
        <div className={`p-4 rounded-xl shrink-0 transition-all shadow-2xl ${isOpen ? 'bg-scard-red text-white rotate-180 scard-glow' : 'bg-white/5 text-white/20'}`}>
          <ChevronDown size={24} />
        </div>
      </button>
      <div className={`overflow-hidden transition-all duration-700 ease-in-out ${isOpen ? 'max-h-96 pb-12' : 'max-h-0'}`}>
        <p className="text-white/40 text-lg leading-relaxed max-w-4xl font-medium pl-3 border-l-2 border-scard-red/40 ml-1">
          {item.answer}
        </p>
      </div>
    </div>
  );
};

const FAQ: React.FC = () => {
  return (
    <section id="faq" className="py-32 relative overflow-hidden">
      <div className="container mx-auto px-6 max-w-5xl">
        <div className="text-center mb-20 space-y-4">
          <h2 className="text-4xl lg:text-6xl font-black uppercase tracking-tighter">CENTRAL DE <span className="text-scard-red text-glow">DÚVIDAS</span></h2>
          <p className="text-white/40 text-xl font-medium">Tudo o que você precisa saber resumido.</p>
        </div>
        <div className="bg-white/5 backdrop-blur-2xl rounded-[3rem] p-10 lg:p-16 border border-white/10 shadow-3xl">
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
    <section className="py-40 relative overflow-hidden">
      <div className="absolute inset-0 bg-scard-red z-0" />
      <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px] z-[1]">
         <div className="w-full h-full bg-[radial-gradient(circle_at_50%_50%,_transparent_0%,_rgba(204,0,0,0.4)_100%)]"></div>
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-10 select-none font-black text-[30vw] leading-none whitespace-nowrap tracking-tighter pointer-events-none">
            SCARD IPTV
         </div>
      </div>
      <div className="container mx-auto px-6 text-center relative z-10 space-y-12">
        <h2 className="text-5xl sm:text-7xl lg:text-[10rem] font-black text-white tracking-tighter uppercase leading-[0.8]">SUA TV NUNCA <br />MAIS SERÁ IGUAL.</h2>
        <div className="space-y-8">
          <p className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight leading-tight max-w-5xl mx-auto uppercase">
            Assine agora a <span className="text-black bg-white px-6 py-2 rounded-2xl shadow-2xl">SCARD PLAY</span> e economize até 90% em comparação com a TV comum.
          </p>
        </div>
        <div className="pt-10">
          <a 
            href={WHATSAPP_BASE_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-6 bg-white text-scard-red hover:bg-zinc-100 px-16 py-8 sm:px-24 sm:py-10 rounded-[2.5rem] text-2xl sm:text-4xl font-black transition-all transform hover:scale-105 active:scale-95 shadow-[0_20px_100px_rgba(255,255,255,0.4)] uppercase group"
          >
            <Zap size={48} className="fill-scard-red group-hover:scale-125 transition-transform" />
            VEM SER VIP AGORA
          </a>
        </div>
      </div>
    </section>
  );
};

const Footer: React.FC = () => {
  return (
    <footer className="bg-white/[0.02] backdrop-blur-3xl pt-32 pb-16 border-t border-white/5 relative z-10">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between gap-20 mb-24">
          <div className="space-y-10 max-w-lg">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-scard-red rounded-2xl flex items-center justify-center shadow-2xl shadow-scard-red/40 rotate-12 transition-transform hover:rotate-0">
                 <LogoIcon size={32} className="text-white ml-0.5" />
              </div>
              <span className="font-black text-3xl uppercase tracking-tighter">SCARD PLAY <span className="text-scard-red">IPTV</span></span>
            </div>
            <p className="text-white/40 text-xl leading-relaxed font-medium">
              Transformando a experiência de entretenimento no Brasil desde 2015. Qualidade extrema, preço justo e suporte real de quem entende do assunto.
            </p>
            <div className="flex gap-6">
                <a href="#" className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-scard-red hover:border-scard-red transition-all group shadow-xl">
                    <Globe size={22} className="text-white/40 group-hover:text-white" />
                </a>
                <a href="#" className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-scard-red hover:border-scard-red transition-all group shadow-xl">
                    <Monitor size={22} className="text-white/40 group-hover:text-white" />
                </a>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-12 sm:gap-24 lg:gap-32">
            <div className="space-y-8">
              <h4 className="font-black uppercase tracking-[0.3em] text-[11px] text-scard-red">Navegação</h4>
              <ul className="space-y-5 text-white/50 font-black uppercase text-xs tracking-widest">
                <li><a href="#inicio" className="hover:text-white hover:translate-x-2 transition-all inline-block">Início</a></li>
                <li><a href="#beneficios" className="hover:text-white hover:translate-x-2 transition-all inline-block">Benefícios</a></li>
                <li><a href="#planos" className="hover:text-white hover:translate-x-2 transition-all inline-block">Planos</a></li>
                <li><a href="#conteudos" className="hover:text-white hover:translate-x-2 transition-all inline-block">Destaques</a></li>
              </ul>
            </div>
            <div className="space-y-8">
              <h4 className="font-black uppercase tracking-[0.3em] text-[11px] text-scard-red">Suporte</h4>
              <ul className="space-y-5 text-white/50 font-black uppercase text-xs tracking-widest">
                <li><a href={WHATSAPP_BASE_LINK} target="_blank" className="hover:text-white hover:translate-x-2 transition-all inline-block">WhatsApp VIP</a></li>
                <li><a href="#faq" className="hover:text-white hover:translate-x-2 transition-all inline-block">Dúvidas</a></li>
                <li><a href="#" className="hover:text-white hover:translate-x-2 transition-all inline-block">Termos</a></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="border-t border-white/5 pt-16 flex flex-col lg:flex-row items-center justify-between gap-10 text-[10px] text-white/20 font-black uppercase tracking-[0.4em] text-center">
          <p>© 2015-2026 SCARD PLAY IPTV - TODOS OS DIREITOS RESERVADOS</p>
          <p className="max-w-3xl leading-loose">AVISO: NÃO HOSPEDAMOS NENHUM VÍDEO EM NOSSOS SERVIDORES. TODO CONTEÚDO É DISPONIBILIZADO POR PROVEDORES DE TERCEIROS.</p>
        </div>
      </div>
    </footer>
  );
};

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-scard-red selection:text-white relative">
      <BackgroundBlobs />
      <Header />
      <Hero />
      <Benefits />
      <FeaturedContent />
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
