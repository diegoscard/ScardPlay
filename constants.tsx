
import { Plan, FAQItem, Testimonial, FeaturedItem } from './types';

export const PLANS: Plan[] = [
  {
    id: 'basico',
    name: 'Plano Básico',
    period: 'Mensal',
    price: '39,90',
    durationLabel: 'mês',
    whatsappLink: 'https://wa.me/5541988745822?text=Ol%C3%A1%2C%20tenho%20interesse%20no%20PLANO%20MENSAL%20do%20SCARD%20PLAY%20IPTV.%20Pode%20me%20passar%20mais%20informa%C3%A7%C3%B5es%3F',
    benefits: [
      'Mais de 150 mil conteúdos',
      'Assista em vários aparelhos',
      'Filmes, Séries, Novelas, Cursos',
      'Conteúdo Adulto Opcional',
      'Qualidade Full HD / 4K'
    ]
  },
  {
    id: 'avancado',
    name: 'Plano Avançado',
    period: 'Trimestral',
    price: '94,90',
    highlight: true,
    durationLabel: '3 meses + 10 dias',
    whatsappLink: 'https://wa.me/5541988745822?text=Ol%C3%A1%2C%20tenho%20interesse%20no%20PLANO%20TRIMESTRAL%20do%20SCARD%20PLAY%20IPTV.%20Queria%20saber%20valores%20e%20vantagens.',
    benefits: [
      'Mais de 150 mil conteúdos',
      'Assista em vários aparelhos',
      'Filmes, Séries, Novelas, Cursos',
      'Conteúdo Adulto Opcional',
      'Suporte Prioritário VIP',
      'Melhor custo-benefício'
    ]
  },
  {
    id: 'premium',
    name: 'Plano Premium',
    period: 'Anual',
    price: '329,90',
    durationLabel: '12 meses',
    whatsappLink: 'https://wa.me/5541988745822?text=Ol%C3%A1%2C%20tenho%20interesse%20no%20PLANO%20ANUAL%20do%20SCARD%20PLAY%20IPTV.%20Pode%20me%20explicar%20como%20funciona%3F',
    benefits: [
      'Mais de 150 mil conteúdos',
      'Assista em vários aparelhos',
      'Filmes, Séries, Novelas, Cursos',
      'Conteúdo Adulto Opcional',
      'Economia Máxima',
      'Acesso 12 Meses Ininterruptos'
    ]
  }
];

export const FAQ_ITEMS: FAQItem[] = [
  {
    question: 'O que é IPTV?',
    answer: 'IPTV é a tecnologia que permite a transmissão de sinais de TV via internet, garantindo acesso a milhares de canais, filmes e séries sem a necessidade de cabos ou antenas parabólicas.'
  },
  {
    question: 'Funciona em qualquer internet?',
    answer: 'Sim, mas para uma experiência fluida em 4K, recomendamos uma conexão estável de pelo menos 15MB a 30MB.'
  },
  {
    question: 'Posso assistir em mais de um dispositivo?',
    answer: 'Nossos planos permitem a ativação em vários dispositivos, porém a reprodução simultânea depende do plano escolhido. Consulte nosso suporte para detalhes de telas extras.'
  },
  {
    question: 'Como é feita a ativação?',
    answer: 'A ativação é imediata após a confirmação do pagamento. Você receberá os dados de acesso via WhatsApp ou E-mail com um tutorial completo.'
  },
  {
    question: 'Tem suporte?',
    answer: 'Com certeza! Temos uma equipe de suporte dedicada via WhatsApp disponível para ajudar você em qualquer configuração ou dúvida.'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    text: "Qualidade de imagem impressionante. Assisto os jogos do meu time sem travamentos, o que era um problema em outros serviços que testei.",
    author: "Ricardo M.",
    rating: 5
  },
  {
    text: "O catálogo de filmes e séries é gigantesco. Meus filhos adoram a parte de desenhos e eu não perco mais minhas novelas.",
    author: "Ana Beatriz",
    rating: 5
  },
  {
    text: "Atendimento nota 10. Precisei de ajuda para configurar na minha Smart TV e o suporte resolveu em minutos.",
    author: "Marcos V.",
    rating: 5
  }
];

export const FEATURED_CONTENT: FeaturedItem[] = [
  {
    title: "Filmes de Bilheteria",
    category: "Lançamentos",
    image: "https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&q=80&w=800",
    badge: "4K HDR"
  },
  {
    title: "Séries Completas",
    category: "Entretenimento",
    image: "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?auto=format&fit=crop&q=80&w=800",
    badge: "Atualizado"
  },
  {
    title: "Filmes & Séries HBO",
    category: "Premium",
    image: "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&q=80&w=800",
    badge: "Cinema em Casa"
  },
  {
    title: "Infantil e Desenhos",
    category: "Kids",
    image: "https://images.unsplash.com/photo-1559131397-f94da358f7ca?auto=format&fit=crop&q=80&w=800"
  },
  {
    title: "Documentários",
    category: "Cultura",
    image: "https://images.unsplash.com/photo-1535941339077-2dd1c7963098?auto=format&fit=crop&q=80&w=800"
  },
  {
    title: "Esportes e Realitys",
    category: "Esportes",
    image: "https://images.unsplash.com/photo-1504450758481-7338eba7524a?auto=format&fit=crop&q=80&w=800"
  }
];
