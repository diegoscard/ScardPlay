
export interface Plan {
  id: string;
  name: string;
  period: string;
  price: string;
  highlight?: boolean;
  benefits: string[];
  durationLabel: string;
  whatsappLink: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface Testimonial {
  text: string;
  author: string;
  rating: number;
}

export interface FeaturedItem {
  title: string;
  category: string;
  image: string;
  badge?: string;
}
