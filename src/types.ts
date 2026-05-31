export interface ChatMessage {
  id: string;
  sender: 'owner' | 'ai';
  text: string;
  timestamp: string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface MarketShareChoice {
  id: 'quality' | 'price' | 'ads';
  title: string;
  description: string;
  shares: { player: number; competitor: number };
  status: string;
  insight: string;
}

export interface PricingOption {
  price: number;
  type: string;
  volume: number;
  profit: number;
  insight: string;
}

export interface SimulationChoice {
  id: number;
  title: string;
  description: string;
  profitDelta: string;
  marketShare: string;
  supplyWidth: string;
  status: string;
}
