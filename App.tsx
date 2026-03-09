
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

const Header: React.FC = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-md border-b border-white/5">
      <div className="container mx-auto px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-scard-red rounded-full flex items-center justify-center scard-glow">
             <LogoIcon size={18} className="text-white ml-0.5" />
          </div>
          <span className="font-black text-lg tracking-tighter uppercase">SCARD PLAY <span className="text-scard-red">IPTV</span></span>
        </div>
        <nav className="hidden lg:flex items-center gap-6">
          <a href="#inicio" className="text-[10px] font-bold uppercase tracking-widest hover:text-scard-red transition-colors">Início</a>
          <a href="#beneficios" className="text-[10px] font-bold uppercase tracking-widest hover:text-scard-red transition-colors">Benefícios</a>
          <a href="#conteudos" className="text-[10px] font-bold uppercase tracking-widest hover:text-scard-red transition-colors">Destaques</a>
          <a href="#planos" className="text-[10px] font-bold uppercase tracking-widest hover:text-scard-red transition-colors">Planos</a>
          <a href="#faq" className="text-[10px] font-bold uppercase tracking-widest hover:text-scard-red transition-colors">FAQ</a>
        </nav>
        <a 
          href={WHATSAPP_BASE_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-scard-red hover:bg-red-700 text-white px-5 py-2 rounded-full text-[10px] font-black transition-all transform hover:scale-105 shadow-xl shadow-red-900/30"
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
    <section id="inicio" className="relative min-h-[85vh] flex items-center pt-20 overflow-hidden bg-[#050505]">
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/4 -left-20 w-[500px] h-[500px] bg-scard-red/5 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 -right-20 w-[500px] h-[500px] bg-scard-red/10 rounded-full blur-[150px] animate-pulse" style={{ animationDelay: '1s' }} />
        
        <div className="absolute inset-0 flex flex-col items-center justify-center select-none overflow-hidden">
           <span className="text-[25vw] font-black tracking-tighter uppercase text-white/[0.02] leading-none transform -rotate-12 translate-y-[-20%]">SCARD</span>
           <span className="text-[25vw] font-black tracking-tighter uppercase text-white/[0.02] leading-none transform -rotate-12 translate-y-[-10%]">PLAY</span>
        </div>
        
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_black_90%)]" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-3">
                <div className="inline-flex items-center gap-2 border border-scard-red/30 px-3 py-1 rounded-full bg-scard-red/10 backdrop-blur-sm">
                  <Flame size={12} className="text-scard-red fill-scard-red" />
                  <span className="text-[9px] font-black uppercase tracking-[0.2em] text-white">Líder em Estabilidade 2024</span>
                </div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10">
                  <Star size={12} className="text-yellow-500 fill-yellow-500" />
                  <span className="text-[9px] font-black uppercase tracking-[0.2em] text-white">4.9/5 Satisfação</span>
                </div>
              </div>
              
              <div className="space-y-2">
                <h1 className="text-5xl lg:text-7xl font-black tracking-tighter leading-[0.85] uppercase">
                  LIBERTE O SEU <br />
                  <span className="text-scard-red">ENTRETENIMENTO</span>
                </h1>
                <p className="text-xl lg:text-2xl font-bold text-gray-300 tracking-tight uppercase border-l-4 border-scard-red pl-4">
                  IPTV Premium: A Evolução Definitiva da TV
                </p>
              </div>
              
              <p className="text-gray-400 text-lg max-w-lg leading-relaxed font-medium">
                Diga adeus às mensalidades abusivas. Tenha acesso instantâneo a <span className="text-white font-bold">150.000+ conteúdos</span> com estabilidade garantida e qualidade 4K.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                "Ativação VIP em 5 minutos",
                "Sem Fidelidade ou Multas",
                "Suporte Humano 24/7",
                "Grade de Canais Completa"
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 bg-white/[0.03] p-3 rounded-xl border border-white/5 hover:bg-white/[0.05] transition-colors">
                  <div className="bg-scard-red/20 p-1 rounded-lg">
                    <Check className="text-scard-red" size={16} />
                  </div>
                  <span className="text-sm font-bold text-gray-200">{item}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
              <a 
                href={WHATSAPP_BASE_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto bg-scard-red hover:bg-red-700 text-white px-10 py-5 rounded-2xl text-lg font-black transition-all flex items-center justify-center gap-4 scard-glow group"
              >
                <div className="w-3 h-3 rounded-full bg-white animate-pulse" />
                QUERO MEU ACESSO AGORA
              </a>
              <div className="flex items-center gap-3 px-4">
                <div className="flex -space-x-2">
                  {[1,2,3].map(n => (
                    <div key={n} className="w-8 h-8 rounded-full border-2 border-black bg-zinc-800 overflow-hidden">
                      <img src={`https://i.pravatar.cc/100?u=${n}`} alt="user" />
                    </div>
                  ))}
                </div>
                <div className="text-[10px] leading-tight font-black uppercase tracking-wider text-gray-500">
                  <span className="text-white block">+15k USUÁRIOS</span>
                  ATIVOS HOJE
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 relative">
            <div 
              className="relative z-10 rounded-[2rem] overflow-hidden border border-white/10 bg-zinc-900 shadow-[0_0_100px_-20px_rgba(204,0,0,0.3)] group cursor-pointer"
              onClick={() => !isPlaying && setIsPlaying(true)}
            >
              <div className="aspect-video relative">
                {!isPlaying ? (
                  <>
                    <img 
                      src="https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&q=80&w=1200" 
                      alt="Streaming Experience"
                      className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-1000"
                    />
                    <div className="absolute inset-0 bg-gradient-to-tr from-scard-red/20 to-transparent mix-blend-overlay" />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/40 group-hover:bg-black/20 transition-all duration-500">
                      <div className="relative">
                        <div className="absolute inset-0 bg-scard-red rounded-full blur-2xl opacity-50 group-hover:opacity-80 transition-opacity animate-pulse" />
                        <div className="relative w-20 h-20 rounded-full bg-white flex items-center justify-center shadow-2xl transform group-hover:scale-110 transition-transform">
                           <LogoIcon size={32} className="text-scard-red ml-1" />
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
                
                <div className="absolute top-4 left-4 flex items-center gap-2 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 pointer-events-none">
                  <div className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                  <span className="text-[9px] font-black uppercase tracking-widest text-white">Demonstração Real</span>
                </div>
              </div>
              
              <div className="p-5 bg-gradient-to-b from-zinc-800 to-black border-t border-white/5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-scard-red/20 flex items-center justify-center">
                      <Tv className="text-scard-red" size={20} />
                    </div>
                    <div>
                      <h4 className="text-sm font-black uppercase tracking-tighter leading-none mb-1">Canais 4K Ultra HD</h4>
                      <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Estabilidade Zero Travamento</p>
                    </div>
                  </div>
                  <Zap className="text-scard-red animate-pulse" size={20} />
                </div>
              </div>
            </div>
            
            <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-2xl shadow-2xl z-20 hidden sm:flex items-center gap-3 animate-bounce-slow">
              <div className="bg-green-100 p-2 rounded-lg">
                <Clock className="text-green-600" size={20} />
              </div>
              <div>
                <span className="block text-[10px] text-gray-500 font-black uppercase tracking-wider">Ativação Média</span>
                <span className="block text-sm font-black text-black">04:52 minutos</span>
              </div>
            </div>
            
            <div className="absolute -top-6 -right-6 bg-zinc-900 border border-white/10 p-4 rounded-2xl shadow-2xl z-20 hidden sm:flex items-center gap-3">
              <div className="bg-scard-red p-2 rounded-lg">
                <Users className="text-white" size={20} />
              </div>
              <div>
                <span className="block text-[10px] text-gray-500 font-black uppercase tracking-wider">Online Agora</span>
                <span className="block text-sm font-black text-white">2.418 pessoas</span>
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
    { icon: <Tv size={24} />, title: '150k+ Conteúdos', desc: 'A maior biblioteca de entretenimento direto na sua tela.' },
    { icon: <Smartphone size={24} />, title: 'Multi-Dispositivo', desc: 'Compatível com TV, celular, TV Box e computador.' },
    { icon: <Zap size={24} />, title: 'Qualidade 4K', desc: 'Imagem cristalina em HD, Full HD e resolução 4K Ultra.' },
    { icon: <ShieldCheck size={24} />, title: 'Segurança Total', desc: 'Servidores dedicados com estabilidade garantida.' },
    { icon: <Flame size={24} />, title: 'Conteúdo Adulto', desc: 'Acesso opcional protegido por senha para sua privacidade.' },
    { icon: <Zap size={24} />, title: 'Ativação Instantânea', desc: 'Pagou, ativou. Sem burocracia ou esperas longas.' },
  ];

  return (
    <section id="beneficios" className="py-20 bg-[#0a0a0a] relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16 space-y-3">
          <div className="inline-flex items-center justify-center w-12 h-1 bg-scard-red mb-4" />
          <h2 className="text-3xl lg:text-5xl font-black uppercase tracking-tighter leading-tight">POR QUE MILHARES ESCOLHEM <br /><span className="text-scard-red">A SCARD PLAY</span>?</h2>
          <p className="text-gray-400 max-w-xl mx-auto text-lg font-medium">Tecnologia proprietária que elimina travamentos mesmo em horários de pico.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {benefitCards.map((benefit, idx) => (
            <div 
              key={idx} 
              className="p-10 rounded-3xl bg-white/[0.02] border border-white/5 hover:border-scard-red/20 transition-all group hover:-translate-y-2 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-scard-red/5 blur-3xl rounded-full -mr-16 -mt-16" />
              <div className="text-scard-red mb-6 group-hover:scale-110 transition-transform">
                {benefit.icon}
              </div>
              <h3 className="text-xl font-black mb-3">{benefit.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed font-medium">{benefit.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const FeaturedContent: React.FC = () => {
  return (
    <section id="conteudos" className="py-24 bg-black overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 space-y-2">
          <h2 className="text-3xl lg:text-4xl font-black uppercase tracking-tighter">O MELHOR DO <span className="text-scard-red">ENTRETENIMENTO</span></h2>
          <p className="text-gray-400 max-w-xl mx-auto text-base">Cinema, Esportes, Séries e Canais Abertos em um só lugar.</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURED_CONTENT.map((item, idx) => (
            <div 
              key={idx} 
              className="relative group rounded-2xl overflow-hidden aspect-[16/10] cursor-pointer shadow-xl border border-white/5"
            >
              <img 
                src={item.image} 
                alt={item.title} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/20 to-transparent flex flex-col justify-end p-8">
                <span className="text-scard-red font-black text-[9px] uppercase tracking-[0.3em] mb-2">{item.category}</span>
                <h3 className="text-xl font-black text-white">{item.title}</h3>
                {item.badge && (
                  <div className="absolute top-6 right-6 bg-scard-red text-white text-[8px] font-black px-4 py-1.5 rounded-full shadow-lg">
                    {item.badge}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <a 
            href={WHATSAPP_BASE_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 text-white text-sm font-black hover:text-scard-red transition-all group py-4 px-10 border border-white/10 rounded-2xl bg-white/5 hover:bg-white/10 shadow-2xl"
          >
            FALAR COM ATENDENTE E VER CATÁLOGO
            <Zap size={18} className="group-hover:animate-pulse text-scard-red" />
          </a>
        </div>
      </div>
    </section>
  );
};

const PlansSection: React.FC = () => {
  return (
    <section id="planos" className="py-24 bg-[#0a0a0a] relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 space-y-3">
          <h2 className="text-4xl lg:text-6xl font-black uppercase tracking-tighter">ESCOLHA SEU <span className="text-scard-red">PACOTE</span></h2>
          <p className="text-gray-400 text-lg font-medium">Invista no seu lazer com planos que cabem no seu bolso.</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto items-stretch pt-8">
          {PLANS.map((plan) => {
            const innerContent = (
              <div className="text-center mb-10 relative z-10">
                <span className="text-gray-400 text-[10px] font-black uppercase tracking-[0.4em] mb-4 block uppercase font-bold">{plan.name}</span>
                <h3 className="text-3xl font-black my-4 uppercase tracking-tighter">{plan.period}</h3>
                <div className="flex items-center justify-center gap-1">
                  <span className="text-2xl font-black opacity-50">R$</span>
                  <span className={`text-6xl font-black tracking-tighter ${plan.highlight ? 'text-scard-red' : 'text-white'}`}>{plan.price.split(',')[0]}</span>
                  <div className="text-left">
                    <span className={`text-2xl font-black ${plan.highlight ? 'text-scard-red' : 'text-white'}`}>,{plan.price.split(',')[1]}</span>
                    <span className="block text-[10px] text-gray-500 font-black leading-none uppercase tracking-widest">/ {plan.durationLabel}</span>
                  </div>
                </div>
              </div>
            );

            const benefitsContent = (
              <div className="space-y-4 mb-10 flex-grow relative z-10">
                {plan.benefits.map((benefit, bIdx) => (
                  <div key={bIdx} className="flex items-start gap-3 text-gray-300">
                    <Check size={16} className="text-scard-red shrink-0 mt-0.5" />
                    <span className="font-bold text-sm leading-tight">{benefit}</span>
                  </div>
                ))}
              </div>
            );

            const footerContent = (
              <div className="relative z-10 mt-auto">
                <a 
                  href={plan.whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-scard-red hover:bg-red-700 text-white px-4 py-5 rounded-2xl text-lg font-black transition-all flex items-center justify-center gap-3 scard-glow group"
                >
                  <div className="w-2.5 h-2.5 rounded-full bg-white animate-pulse" />
                  ATIVAR AGORA
                </a>
              </div>
            );

            if (plan.highlight) {
              return (
                <div key={plan.id} className="relative z-20 flex flex-col scale-105">
                   <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-scard-red text-white px-8 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.2em] z-30 shadow-2xl whitespace-nowrap">
                     RECOMENDADO VIP
                   </div>
                   <div className="animated-border-container highlight-pulse h-full flex flex-col overflow-hidden rounded-3xl">
                      <div className="relative p-10 h-full flex flex-col bg-[#050505] rounded-3xl border border-scard-red/20">
                        {innerContent}
                        {benefitsContent}
                        {footerContent}
                      </div>
                   </div>
                </div>
              );
            }

            return (
              <div key={plan.id} className="flex flex-col transform hover:translate-y-[-8px] transition-all duration-500">
                <div className="relative p-10 h-full flex flex-col bg-zinc-900/40 border border-white/5 rounded-3xl hover:border-scard-red/20 transition-all overflow-hidden">
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
    { icon: <Tv size={36} />, name: 'Smart TV' },
    { icon: <Smartphone size={36} />, name: 'Celular' },
    { icon: <Globe size={36} />, name: 'Web/PC' },
    { icon: <Box size={36} />, name: 'TV Box' },
    { icon: <Monitor size={36} />, name: 'Console' },
  ];

  return (
    <section className="py-20 bg-black border-y border-white/5">
      <div className="container mx-auto px-6 text-center">
        <h3 className="text-xl font-black mb-12 uppercase tracking-widest opacity-60">Liberdade total para assistir onde quiser.</h3>
        <div className="flex flex-wrap justify-center gap-10 md:gap-24 opacity-30">
          {devices.map((device, idx) => (
            <div key={idx} className="flex flex-col items-center gap-4 group cursor-default">
              <div className="text-white group-hover:text-scard-red transition-all duration-300 group-hover:scale-110 group-hover:opacity-100">
                {device.icon}
              </div>
              <span className="text-[9px] font-black uppercase tracking-[0.4em]">{device.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const SocialProof: React.FC = () => {
  return (
    <section className="py-24 bg-black overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 space-y-3">
          <h2 className="text-4xl lg:text-5xl font-black uppercase tracking-tighter">O QUE DIZEM NOSSOS <span className="text-scard-red">ASSINANTES</span></h2>
          <p className="text-gray-400 text-lg font-medium">Credibilidade construída através de qualidade e suporte real.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((t, idx) => (
            <div key={idx} className="bg-zinc-900/20 p-10 rounded-3xl border border-white/5 space-y-6 hover:bg-zinc-900/40 transition-all">
              <div className="flex gap-1">
                {[...Array(t.rating)].map((_, i) => (
                  <Star key={i} size={16} className="text-yellow-500 fill-yellow-500" />
                ))}
              </div>
              <p className="text-lg text-gray-300 font-medium leading-relaxed italic">"{t.text}"</p>
              <div className="flex items-center gap-4 pt-6 border-t border-white/5">
                <div className="w-10 h-10 rounded-full bg-scard-red/20 flex items-center justify-center font-black text-scard-red text-base uppercase">
                  {t.author[0]}
                </div>
                <div>
                  <span className="block font-black text-base">{t.author}</span>
                  <span className="block text-[10px] text-gray-500 font-black uppercase tracking-widest">Cliente Verificado</span>
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
    <div className="border-b border-white/5 last:border-0">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-8 flex items-center justify-between text-left group"
      >
        <span className={`text-xl font-black transition-colors ${isOpen ? 'text-scard-red' : 'text-white'}`}>{item.question}</span>
        <div className={`p-2 rounded-full transition-all ${isOpen ? 'bg-scard-red text-white rotate-180' : 'bg-white/5 text-gray-500'}`}>
          <ChevronDown size={20} />
        </div>
      </button>
      <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-96 pb-8' : 'max-h-0'}`}>
        <p className="text-gray-400 text-base leading-relaxed max-w-3xl font-medium">
          {item.answer}
        </p>
      </div>
    </div>
  );
};

const FAQ: React.FC = () => {
  return (
    <section id="faq" className="py-24 bg-[#0a0a0a]">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="text-center mb-16 space-y-2">
          <h2 className="text-4xl lg:text-5xl font-black uppercase tracking-tighter">CENTRAL DE <span className="text-scard-red">DÚVIDAS</span></h2>
          <p className="text-gray-400 text-lg font-medium">Tudo o que você precisa saber.</p>
        </div>
        <div className="bg-black/40 rounded-3xl p-8 lg:p-12 border border-white/5 shadow-2xl">
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
    <section className="py-32 bg-scard-red relative overflow-hidden">
      <div className="absolute inset-0 bg-black/40 z-0">
         <div className="w-full h-full bg-[radial-gradient(circle_at_70%_50%,_rgba(255,255,255,0.1),_transparent)]"></div>
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-5 select-none font-black text-[20vw] leading-none whitespace-nowrap">
            SCARD IPTV
         </div>
      </div>
      <div className="container mx-auto px-6 text-center relative z-10 space-y-10">
        <h2 className="text-5xl lg:text-8xl font-black text-white tracking-tighter uppercase leading-[0.85]">Sua TV nunca <br />mais será a mesma.</h2>
        <p className="text-xl lg:text-2xl font-bold text-white/90 max-w-3xl mx-auto leading-tight">
          Assine agora a <span className="text-black bg-white px-3 py-1 rounded-xl">SCARD PLAY IPTV</span> e economize até 90% em comparação com a TV convencional.
        </p>
        <div className="pt-6">
          <a 
            href={WHATSAPP_BASE_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-white text-scard-red hover:bg-zinc-100 px-16 py-6 rounded-2xl text-2xl font-black transition-all transform hover:scale-105 active:scale-95 shadow-[0_25px_80px_-20px_rgba(255,255,255,0.4)] uppercase"
          >
            🔴 COMEÇAR AGORA
          </a>
        </div>
      </div>
    </section>
  );
};

const Footer: React.FC = () => {
  return (
    <footer className="bg-black pt-24 pb-12 border-t border-white/5">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between gap-16 mb-20">
          <div className="space-y-8 max-w-md">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-scard-red rounded-full flex items-center justify-center shadow-lg shadow-scard-red/20">
                 <LogoIcon size={24} className="text-white ml-0.5" />
              </div>
              <span className="font-black text-2xl uppercase tracking-tighter">SCARD PLAY <span className="text-scard-red">IPTV</span></span>
            </div>
            <p className="text-gray-500 text-base leading-relaxed font-medium">
              Transformando a experiência de entretenimento no Brasil desde 2015. Qualidade extrema, preço justo e suporte real de quem entende do assunto.
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-16 md:gap-32">
            <div className="space-y-6">
              <h4 className="font-black uppercase tracking-widest text-xs text-white">Navegação</h4>
              <ul className="space-y-4 text-gray-500 font-bold uppercase text-[10px] tracking-widest">
                <li><a href="#inicio" className="hover:text-scard-red transition-colors">Início</a></li>
                <li><a href="#beneficios" className="hover:text-scard-red transition-colors">Benefícios</a></li>
                <li><a href="#planos" className="hover:text-scard-red transition-colors">Planos</a></li>
                <li><a href="#conteudos" className="hover:text-scard-red transition-colors">Destaques</a></li>
              </ul>
            </div>
            <div className="space-y-6">
              <h4 className="font-black uppercase tracking-widest text-xs text-white">Atendimento</h4>
              <ul className="space-y-4 text-gray-500 font-bold uppercase text-[10px] tracking-widest">
                <li><a href={WHATSAPP_BASE_LINK} target="_blank" className="hover:text-scard-red transition-colors">WhatsApp VIP</a></li>
                <li><a href="#faq" className="hover:text-scard-red transition-colors">Perguntas Frequentes</a></li>
                <li><a href="#" className="hover:text-scard-red transition-colors">Termos de Uso</a></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="border-t border-white/5 pt-12 flex flex-col lg:flex-row items-center justify-between gap-8 text-[10px] text-gray-700 font-black uppercase tracking-[0.2em] text-center">
          <p>© 2015-2026 SCARD PLAY IPTV - TODOS OS DIREITOS RESERVADOS</p>
          <p className="max-w-2xl leading-loose opacity-50">AVISO: NÃO HOSPEDAMOS NENHUM VÍDEO EM NOSSOS SERVIDORES. TODO CONTEÚDO É DISPONIBILIZADO POR PROVEDORES DE TERCEIROS.</p>
        </div>
      </div>
    </footer>
  );
};

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-black text-white selection:bg-scard-red selection:text-white">
      <Header />
      <Hero />
      <Benefits />
      <FeaturedContent />
      <Compatibility />
      <PlansSection />
      <SocialProof />
      <FAQ />
      <CTAFinal />
      <Footer />
    </div>
  );
};

export default App;
