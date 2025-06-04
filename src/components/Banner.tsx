'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Article } from '@/types/article';
import { getBannerArticles } from '@/services/articleService';

export default function Banner() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imageError, setImageError] = useState(false);
  const [banners, setBanners] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const articles = await getBannerArticles();
        setBanners(articles);
      } catch (error) {
        console.error('Failed to fetch banner articles:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBanners();
  }, []);

  useEffect(() => {
    if (banners.length === 0) return;

    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % banners.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [banners]);

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    console.error('Image failed to load:', e.currentTarget.src);
    setImageError(true);
  };

  const handleImageLoad = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    console.log('Image loaded successfully:', e.currentTarget.src);
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-4">
        <div className="relative w-full h-[300px] overflow-hidden rounded-lg shadow-lg bg-gray-100 flex items-center justify-center">
          <p className="text-gray-500">加载中...</p>
        </div>
      </div>
    );
  }

  if (banners.length === 0) {
    return (
      <div className="container mx-auto px-4 py-4">
        <div className="relative w-full h-[300px] overflow-hidden rounded-lg shadow-lg bg-gray-100 flex items-center justify-center">
          <p className="text-gray-500">暂无数据</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-4">
      <div className="relative w-full h-[300px] overflow-hidden rounded-lg shadow-lg bg-gray-100">
        {banners.map((banner, index) => (
          <div
            key={banner.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentIndex ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div className="relative w-full h-full">
              <Image
                src={banner.coverImage}
                alt={banner.title}
                fill
                sizes="100vw"
                priority={index === 0}
                className="object-cover"
                onError={handleImageError}
                onLoad={handleImageLoad}
                unoptimized
              />
            </div>
            {imageError && (
              <div className="w-full h-full flex items-center justify-center bg-gray-200">
                <p className="text-gray-500">图片加载失败</p>
              </div>
            )}
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
              <h1 className="text-3xl font-bold text-white text-center px-4">{banner.title}</h1>
            </div>
          </div>
        ))}
        
        <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
          {banners.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === currentIndex ? 'bg-white' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
} 