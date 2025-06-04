import Banner from '../components/Banner';
import ActivityList from '../components/ActivityList';
import { HikingActivity } from '../types/hiking';

// 模拟数据
const mockActivities: HikingActivity[] = [
  {
    id: '1',
    name: '香山红叶徒步',
    description: '秋季香山红叶观赏徒步活动，欣赏北京最美的秋色。',
    date: '2024-10-15',
    departureTime: '08:00',
    departureLocation: '香山公园东门',
    totalDistance: 5,
    elevationGain: 300,
    difficulty: '初级',
    articleUrl: 'https://example.com/xiangshan',
    imageUrl: '/images/xiangshan.jpg',
    organizer: {
      name: '北京户外俱乐部',
      phone: '13800138000',
      email: 'contact@bjoutdoor.com'
    },
    leader: {
      name: '张教练',
      experience: '5年徒步领队经验',
      phone: '13900139000'
    }
  },
  {
    id: '2',
    name: '慕田峪长城徒步',
    description: '探索慕田峪长城，感受历史文化的魅力。',
    date: '2024-10-20',
    departureTime: '07:30',
    departureLocation: '东直门交通枢纽',
    totalDistance: 8,
    elevationGain: 500,
    difficulty: '中级',
    articleUrl: 'https://example.com/mutianyu',
    imageUrl: '/images/mutianyu.jpg',
    organizer: {
      name: '长城徒步协会',
      phone: '13800138001',
      email: 'contact@greatwall.com'
    },
    leader: {
      name: '李教练',
      experience: '8年徒步领队经验',
      phone: '13900139001'
    }
  },
  {
    id: '3',
    name: '灵山徒步',
    description: '挑战北京最高峰，体验高山徒步的乐趣。',
    date: '2024-10-25',
    departureTime: '06:00',
    departureLocation: '西直门交通枢纽',
    totalDistance: 15,
    elevationGain: 1500,
    difficulty: '高级',
    articleUrl: 'https://example.com/lingshan',
    imageUrl: '/images/lingshan.jpg',
    organizer: {
      name: '北京登山协会',
      phone: '13800138002',
      email: 'contact@bjmountaineering.com'
    },
    leader: {
      name: '王教练',
      experience: '10年登山领队经验',
      phone: '13900139002'
    }
  },
  {
    id: '4',
    name: '百花山徒步',
    description: '春季百花山徒步，欣赏山花烂漫。',
    date: '2024-11-01',
    departureTime: '07:00',
    departureLocation: '天通苑北站',
    totalDistance: 6,
    elevationGain: 400,
    difficulty: '初级',
    articleUrl: 'https://example.com/baihuashan',
    imageUrl: '/images/baihuashan.jpg',
    organizer: {
      name: '北京户外俱乐部',
      phone: '13800138003',
      email: 'contact@bjoutdoor.com'
    },
    leader: {
      name: '赵教练',
      experience: '6年徒步领队经验',
      phone: '13900139003'
    }
  },
  {
    id: '5',
    name: '云蒙山徒步',
    description: '探索云蒙山自然风光，体验户外徒步的乐趣。',
    date: '2024-11-05',
    departureTime: '07:30',
    departureLocation: '东直门交通枢纽',
    totalDistance: 10,
    elevationGain: 800,
    difficulty: '中级',
    articleUrl: 'https://example.com/yunmengshan',
    imageUrl: '/images/yunmengshan.jpg',
    organizer: {
      name: '北京登山协会',
      phone: '13800138004',
      email: 'contact@bjmountaineering.com'
    },
    leader: {
      name: '刘教练',
      experience: '7年徒步领队经验',
      phone: '13900139004'
    }
  },
  {
    id: '6',
    name: '海坨山徒步',
    description: '挑战海坨山，体验高山徒步的刺激。',
    date: '2024-11-10',
    departureTime: '06:30',
    departureLocation: '西直门交通枢纽',
    totalDistance: 12,
    elevationGain: 1200,
    difficulty: '高级',
    articleUrl: 'https://example.com/haituoshan',
    imageUrl: '/images/haituoshan.jpg',
    organizer: {
      name: '长城徒步协会',
      phone: '13800138005',
      email: 'contact@greatwall.com'
    },
    leader: {
      name: '孙教练',
      experience: '9年徒步领队经验',
      phone: '13900139005'
    }
  },
  {
    id: '7',
    name: '妙峰山徒步',
    description: '探索妙峰山，感受自然与文化的完美结合。',
    date: '2024-11-15',
    departureTime: '08:00',
    departureLocation: '天通苑北站',
    totalDistance: 7,
    elevationGain: 600,
    difficulty: '中级',
    articleUrl: 'https://example.com/miaofengshan',
    imageUrl: '/images/miaofengshan.jpg',
    organizer: {
      name: '北京户外俱乐部',
      phone: '13800138006',
      email: 'contact@bjoutdoor.com'
    },
    leader: {
      name: '周教练',
      experience: '8年徒步领队经验',
      phone: '13900139006'
    }
  }
];

export default function Home() {
  return (
    <main>
      <Banner />
      <ActivityList activities={mockActivities} />
    </main>
  );
}
