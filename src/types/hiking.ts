export interface HikingActivity {
  id: string;
  name: string;
  description: string;
  date: string;
  departureTime: string;
  departureLocation: string;
  totalDistance: number;
  elevationGain: number;
  difficulty: '初级' | '中级' | '高级';
  articleUrl: string;
  imageUrl: string;
  organizer: {
    name: string;
    phone: string;
    email: string;
  };
  leader: {
    name: string;
    experience: string;
    phone: string;
  };
} 