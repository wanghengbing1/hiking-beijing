'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { HikingActivity } from '../../../types/hiking';
import Image from 'next/image';

const difficultyColors = {
  '初级': 'bg-green-100 text-green-800',
  '中级': 'bg-yellow-100 text-yellow-800',
  '高级': 'bg-red-100 text-red-800',
};

// 模拟数据
const mockActivities: HikingActivity[] = [
  {
    id: '1',
    name: '香山红叶徒步',
    date: '2024-03-20',
    departureTime: '08:00',
    departureLocation: '香山公园东门',
    difficulty: '初级',
    elevationGain: 300,
    totalDistance: 5,
    imageUrl: '/images/xiangshan.jpg',
    description: '欣赏香山红叶，体验北京最美的秋季徒步路线',
    articleUrl: '/articles/1',
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
    date: '2024-03-25',
    departureTime: '07:30',
    departureLocation: '慕田峪长城景区门口',
    difficulty: '中级',
    elevationGain: 800,
    totalDistance: 8,
    imageUrl: '/images/mutianyu.jpg',
    description: '探索慕田峪长城，感受历史文化的魅力',
    articleUrl: '/articles/2',
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
    date: '2024-03-30',
    departureTime: '06:30',
    departureLocation: '灵山景区门口',
    difficulty: '高级',
    elevationGain: 1500,
    totalDistance: 12,
    imageUrl: '/images/lingshan.jpg',
    description: '挑战北京最高峰，体验极限徒步的乐趣',
    articleUrl: '/articles/3',
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
    name: '八达岭长城徒步',
    date: '2024-04-05',
    departureTime: '07:00',
    departureLocation: '八达岭长城景区门口',
    difficulty: '中级',
    elevationGain: 600,
    totalDistance: 7,
    imageUrl: '/images/badaling.jpg',
    description: '探索八达岭长城，感受历史文化的魅力',
    articleUrl: '/articles/4',
    organizer: {
      name: '长城徒步协会',
      phone: '13800138003',
      email: 'contact@greatwall.com'
    },
    leader: {
      name: '赵教练',
      experience: '6年徒步领队经验',
      phone: '13900139003'
    }
  },
  {
    id: '5',
    name: '十三陵徒步',
    date: '2024-04-10',
    departureTime: '08:30',
    departureLocation: '十三陵景区门口',
    difficulty: '初级',
    elevationGain: 200,
    totalDistance: 4,
    imageUrl: '/images/sanling.jpg',
    description: '探索明十三陵，感受历史文化',
    articleUrl: '/articles/5',
    organizer: {
      name: '北京户外俱乐部',
      phone: '13800138004',
      email: 'contact@bjoutdoor.com'
    },
    leader: {
      name: '刘教练',
      experience: '7年徒步领队经验',
      phone: '13900139004'
    }
  },
  {
    id: '6',
    name: '百花山徒步',
    date: '2024-04-15',
    departureTime: '07:00',
    departureLocation: '百花山景区门口',
    difficulty: '高级',
    elevationGain: 1200,
    totalDistance: 10,
    imageUrl: '/images/baihuashan.jpg',
    description: '探索百花山，欣赏自然风光',
    articleUrl: '/articles/6',
    organizer: {
      name: '北京登山协会',
      phone: '13800138005',
      email: 'contact@bjmountaineering.com'
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
    date: '2024-04-20',
    departureTime: '08:00',
    departureLocation: '妙峰山景区门口',
    difficulty: '中级',
    elevationGain: 700,
    totalDistance: 6,
    imageUrl: '/images/miaofengshan.jpg',
    description: '探索妙峰山，感受自然之美',
    articleUrl: '/articles/7',
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

export default function ActivityDetail() {
  const params = useParams();
  const activity = mockActivities.find(a => a.id === params?.id);

  if (!activity) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">活动未找到</h1>
          <Link href="/" className="text-blue-600 hover:text-blue-800">
            返回首页
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Link href="/" className="text-blue-600 hover:text-blue-800 mb-6 inline-block">
        ← 返回首页
      </Link>
      
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="relative h-64">
          <Image
            src={activity.imageUrl}
            alt={activity.name}
            width={800}
            height={400}
            className="w-full h-64 object-cover rounded-lg"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
            <h1 className="text-4xl font-bold text-white">{activity.name}</h1>
          </div>
        </div>
        
        <div className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-2xl font-semibold mb-4">活动详情</h2>
              <div className="space-y-4">
                <p><span className="font-medium">日期：</span>{activity.date}</p>
                <p><span className="font-medium">出发时间：</span>{activity.departureTime}</p>
                <p><span className="font-medium">集合地点：</span>{activity.departureLocation}</p>
                <p><span className="font-medium">难度等级：</span>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${difficultyColors[activity.difficulty]} ml-2`}>
                    {activity.difficulty}
                  </span>
                </p>
              </div>
            </div>
            
            <div>
              <h2 className="text-2xl font-semibold mb-4">路线信息</h2>
              <div className="space-y-4">
                <p><span className="font-medium">海拔爬升：</span>{activity.elevationGain}米</p>
                <p><span className="font-medium">总距离：</span>{activity.totalDistance}公里</p>
              </div>
            </div>
          </div>
          
          <div className="mt-8">
            <h2 className="text-2xl font-semibold mb-4">活动描述</h2>
            <p className="text-gray-600">{activity.description}</p>
          </div>
          
          <div className="mt-8">
            <button className="w-full md:w-auto px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              立即报名
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 