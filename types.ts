
export interface Product {
  id: string;
  name: string;
  category: 'blackout' | 'sunscreen' | 'zebra' | 'motorized';
  description: string;
  longDescription: string;
  image: string;
  gallery: string[];
  tag: string;
  specs: { label: string; value: string }[];
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

export enum NavigationSection {
  Hero = 'hero',
  Showcase = 'showcase',
  AI = 'ai',
  Contact = 'contact'
}
