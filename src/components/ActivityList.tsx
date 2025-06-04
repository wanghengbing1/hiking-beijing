'use client';

import React, { useState, useMemo } from 'react';
import { HikingActivity } from '../types/hiking';
import { MapPinIcon, CalendarIcon, ClockIcon, ArrowTrendingUpIcon, ScaleIcon, UserIcon, PhoneIcon, EnvelopeIcon, StarIcon, FunnelIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import Image from 'next/image';

interface ActivityListProps {
  activities: HikingActivity[];
}

const difficultyColors = {
  '初级': 'bg-green-100 text-green-800',
  '中级': 'bg-yellow-100 text-yellow-800',
  '高级': 'bg-red-100 text-red-800',
};

interface FilterOptions {
  difficulty: string[];
  dateRange: {
    start: string;
    end: string;
  };
  distanceRange: {
    min: number;
    max: number;
  };
}

export default function ActivityList({ activities }: ActivityListProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<FilterOptions>({
    difficulty: [],
    dateRange: {
      start: '',
      end: '',
    },
    distanceRange: {
      min: 0,
      max: 20,
    },
  });

  // 处理难度筛选
  const handleDifficultyChange = (difficulty: string) => {
    setFilters(prev => ({
      ...prev,
      difficulty: prev.difficulty.includes(difficulty)
        ? prev.difficulty.filter(d => d !== difficulty)
        : [...prev.difficulty, difficulty],
    }));
    setCurrentPage(1);
  };

  // 处理日期范围筛选
  const handleDateRangeChange = (type: 'start' | 'end', value: string) => {
    setFilters(prev => ({
      ...prev,
      dateRange: {
        ...prev.dateRange,
        [type]: value,
      },
    }));
    setCurrentPage(1);
  };

  // 处理距离范围筛选
  const handleDistanceRangeChange = (type: 'min' | 'max', value: number) => {
    setFilters(prev => ({
      ...prev,
      distanceRange: {
        ...prev.distanceRange,
        [type]: value,
      },
    }));
    setCurrentPage(1);
  };

  // 重置筛选条件
  const resetFilters = () => {
    setFilters({
      difficulty: [],
      dateRange: {
        start: '',
        end: '',
      },
      distanceRange: {
        min: 0,
        max: 20,
      },
    });
    setCurrentPage(1);
  };

  // 应用筛选条件
  const filteredActivities = useMemo(() => {
    return activities.filter(activity => {
      // 难度筛选
      if (filters.difficulty.length > 0 && !filters.difficulty.includes(activity.difficulty)) {
        return false;
      }

      // 日期范围筛选
      if (filters.dateRange.start && new Date(activity.date) < new Date(filters.dateRange.start)) {
        return false;
      }
      if (filters.dateRange.end && new Date(activity.date) > new Date(filters.dateRange.end)) {
        return false;
      }

      // 距离范围筛选
      if (activity.totalDistance < filters.distanceRange.min || activity.totalDistance > filters.distanceRange.max) {
        return false;
      }

      return true;
    });
  }, [activities, filters]);

  const activitiesPerPage = 6;
  const totalPages = Math.ceil(filteredActivities.length / activitiesPerPage);
  
  const startIndex = (currentPage - 1) * activitiesPerPage;
  const endIndex = startIndex + activitiesPerPage;
  const currentActivities = filteredActivities.slice(startIndex, endIndex);

  const handleSignUp = (e: React.MouseEvent, activityId: string) => {
    e.preventDefault();
    window.open(`/signup/${activityId}`, '_blank');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold">徒步活动</h2>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
        >
          <FunnelIcon className="h-5 w-5" />
          <span>筛选</span>
        </button>
      </div>

      {/* 筛选面板 */}
      {showFilters && (
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* 难度筛选 */}
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-3">难度等级</h3>
              <div className="space-y-2">
                {Object.keys(difficultyColors).map((difficulty) => (
                  <label key={difficulty} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={filters.difficulty.includes(difficulty)}
                      onChange={() => handleDifficultyChange(difficulty)}
                      className="rounded text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-600">{difficulty}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* 日期范围筛选 */}
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-3">日期范围</h3>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm text-gray-600 mb-1">开始日期</label>
                  <input
                    type="date"
                    value={filters.dateRange.start}
                    onChange={(e) => handleDateRangeChange('start', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">结束日期</label>
                  <input
                    type="date"
                    value={filters.dateRange.end}
                    onChange={(e) => handleDateRangeChange('end', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>

            {/* 距离范围筛选 */}
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-3">距离范围（公里）</h3>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm text-gray-600 mb-1">最小距离</label>
                  <input
                    type="number"
                    min="0"
                    max={filters.distanceRange.max}
                    value={filters.distanceRange.min}
                    onChange={(e) => handleDistanceRangeChange('min', Number(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">最大距离</label>
                  <input
                    type="number"
                    min={filters.distanceRange.min}
                    value={filters.distanceRange.max}
                    onChange={(e) => handleDistanceRangeChange('max', Number(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* 重置按钮 */}
          <div className="mt-6 flex justify-end">
            <button
              onClick={resetFilters}
              className="px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              重置筛选
            </button>
          </div>
        </div>
      )}

      {/* 活动列表 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentActivities.map((activity) => (
          <div key={activity.id} className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-all duration-300 border border-gray-100">
            {/* 活动图片 */}
            <div className="relative h-48 w-full bg-gray-100">
              <Image
                src={activity.imageUrl}
                alt={activity.name}
                fill
                unoptimized
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = 'https://images.unsplash.com/photo-1551632811-561732d1e306?q=80&w=800&auto=format&fit=crop';
                  target.onerror = null;
                }}
                priority={currentPage === 1}
              />
            </div>
            <div className="p-6">
              {/* 标题和难度 */}
              <div className="flex items-center justify-between gap-3 mb-4">
                <h3 className="text-lg font-bold text-gray-800 line-clamp-2 flex-1">{activity.name}</h3>
                <span className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap ${difficultyColors[activity.difficulty]}`}>
                  {activity.difficulty}
                </span>
              </div>

              {/* 活动信息列表 */}
              <div className="space-y-4 mb-4">
                <div className="flex items-center gap-3 text-gray-600">
                  <div className="p-2 bg-blue-50 rounded-lg shrink-0">
                    <CalendarIcon className="h-4 w-4 text-blue-500" />
                  </div>
                  <div className="flex-1 min-w-0 flex items-center gap-2">
                    <span className="text-sm text-gray-500 whitespace-nowrap w-20">日期：</span>
                    <span className="text-sm text-gray-700 flex-1">{activity.date}</span>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-gray-600">
                  <div className="p-2 bg-blue-50 rounded-lg shrink-0">
                    <ClockIcon className="h-4 w-4 text-blue-500" />
                  </div>
                  <div className="flex-1 min-w-0 flex items-center gap-2">
                    <span className="text-sm text-gray-500 whitespace-nowrap w-20">出发时间：</span>
                    <span className="text-sm text-gray-700 flex-1">{activity.departureTime}</span>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-gray-600">
                  <div className="p-2 bg-blue-50 rounded-lg shrink-0">
                    <MapPinIcon className="h-4 w-4 text-blue-500" />
                  </div>
                  <div className="flex-1 min-w-0 flex items-center gap-2">
                    <span className="text-sm text-gray-500 whitespace-nowrap w-20">集合地点：</span>
                    <span className="text-sm text-gray-700 flex-1">{activity.departureLocation}</span>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-gray-600">
                  <div className="p-2 bg-blue-50 rounded-lg shrink-0">
                    <ScaleIcon className="h-4 w-4 text-blue-500" />
                  </div>
                  <div className="flex-1 min-w-0 flex items-center gap-2">
                    <span className="text-sm text-gray-500 whitespace-nowrap w-20">路线信息：</span>
                    <span className="text-sm text-gray-700 flex-1">{activity.totalDistance}公里 / {activity.elevationGain}米</span>
                  </div>
                </div>
              </div>

              {/* 组织方信息 */}
              <div className="mb-4">
                <div className="flex items-center gap-3 text-gray-600">
                  <div className="p-2 bg-blue-50 rounded-lg shrink-0">
                    <UserIcon className="h-4 w-4 text-blue-500" />
                  </div>
                  <div className="flex-1 min-w-0 flex items-center gap-2">
                    <span className="text-sm text-gray-500 whitespace-nowrap w-20">组织方：</span>
                    <span className="text-sm text-gray-700 flex-1">{activity.organizer.name}</span>
                  </div>
                </div>
              </div>

              {/* 按钮组 */}
              <div className="flex gap-3">
                <a
                  href={activity.articleUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 px-4 py-2 bg-gray-50 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors text-sm font-medium text-center"
                >
                  活动详情
                </a>
                <button
                  onClick={(e) => handleSignUp(e, activity.id)}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                >
                  立即报名
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* 分页控件 */}
      <div className="flex justify-center mt-8 space-x-2">
        <button
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-4 py-2 rounded-md bg-gray-200 text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300"
        >
          上一页
        </button>
        <span className="px-4 py-2 text-gray-700">
          第 {currentPage} 页，共 {totalPages} 页
        </span>
        <button
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="px-4 py-2 rounded-md bg-gray-200 text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300"
        >
          下一页
        </button>
      </div>
    </div>
  );
} 