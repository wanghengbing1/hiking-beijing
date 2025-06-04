'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { HikingActivity } from '../../../types/hiking';

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
    description: '欣赏香山红叶，体验北京最美的秋季徒步路线'
  },
  // ... 其他活动数据 ...
];

export default function SignUp() {
  const params = useParams();
  const router = useRouter();
  const activity = mockActivities.find(a => a.id === params.id);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    idCard: '',
    emergencyContact: '',
    emergencyPhone: '',
    healthCondition: '',
    specialRequirements: ''
  });

  if (!activity) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">活动未找到</h1>
          <button
            onClick={() => router.push('/')}
            className="text-blue-600 hover:text-blue-800"
          >
            返回首页
          </button>
        </div>
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 这里添加报名逻辑
    alert('报名成功！我们会尽快与您联系。');
    router.push('/');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">活动报名</h1>
        
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">{activity.name}</h2>
          <div className="grid grid-cols-2 gap-4 text-gray-600">
            <p><span className="font-medium">日期：</span>{activity.date}</p>
            <p><span className="font-medium">出发时间：</span>{activity.departureTime}</p>
            <p><span className="font-medium">集合地点：</span>{activity.departureLocation}</p>
            <p><span className="font-medium">难度等级：</span>{activity.difficulty}</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-6">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                姓名 <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                手机号码 <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                name="phone"
                required
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                电子邮箱
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                身份证号 <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="idCard"
                required
                value={formData.idCard}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                紧急联系人 <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="emergencyContact"
                required
                value={formData.emergencyContact}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                紧急联系人电话 <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                name="emergencyPhone"
                required
                value={formData.emergencyPhone}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                健康状况
              </label>
              <textarea
                name="healthCondition"
                value={formData.healthCondition}
                onChange={handleChange}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="请说明您的健康状况，如高血压、心脏病等"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                特殊要求
              </label>
              <textarea
                name="specialRequirements"
                value={formData.specialRequirements}
                onChange={handleChange}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="如有特殊要求，请在此说明"
              />
            </div>
          </div>

          <div className="mt-8 flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => router.push('/')}
              className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
            >
              取消
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              提交报名
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 