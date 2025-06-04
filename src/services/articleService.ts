import { Article, ArticleListResponse } from '@/types/article';
import { getWechatArticles, getWechatArticleDetail } from './wechatService';

// 微信公众号文章列表
const WECHAT_ARTICLES = [
  {
    id: '1',
    title: '北京最美徒步路线：香山红叶季',
    coverImage: '/images/xiangshan.jpg',
    description: '香山红叶季，是北京最美的徒步季节。本文为您介绍香山最佳徒步路线，以及观赏红叶的最佳时间。',
    publishDate: '2024-03-15',
    author: '北京徒步',
    url: 'https://mp.weixin.qq.com/s/example1',
    tags: ['香山', '红叶', '徒步路线'],
  },
  {
    id: '2',
    title: '慕田峪长城徒步攻略',
    coverImage: '/images/mutianyu.jpg',
    description: '慕田峪长城是北京最著名的长城景区之一，本文为您详细介绍慕田峪长城的徒步路线和注意事项。',
    publishDate: '2024-03-10',
    author: '北京徒步',
    url: 'https://mp.weixin.qq.com/s/example2',
    tags: ['慕田峪', '长城', '徒步攻略'],
  },
  {
    id: '3',
    title: '灵山徒步：北京最高峰',
    coverImage: '/images/lingshan.jpg',
    description: '灵山是北京最高峰，海拔2303米。本文为您介绍灵山徒步路线和注意事项。',
    publishDate: '2024-03-05',
    author: '北京徒步',
    url: 'https://mp.weixin.qq.com/s/example3',
    tags: ['灵山', '最高峰', '徒步路线'],
  },
];

export async function getArticles(page: number = 1, pageSize: number = 10): Promise<ArticleListResponse> {
  try {
    const offset = (page - 1) * pageSize;
    const articles = await getWechatArticles(offset, pageSize);

    return {
      articles,
      total: articles.length, // 注意：微信公众号API不返回总数，这里只是示例
      page,
      pageSize,
    };
  } catch (error) {
    console.error('Error fetching articles:', error);
    throw error;
  }
}

export async function getArticleById(id: string): Promise<Article | null> {
  try {
    return await getWechatArticleDetail(id);
  } catch (error) {
    console.error('Error fetching article:', error);
    return null;
  }
}

// 获取轮播图数据
export async function getBannerArticles(): Promise<Article[]> {
  try {
    const articles = await getWechatArticles(0, 3);
    return articles;
  } catch (error) {
    console.error('Error fetching banner articles:', error);
    return [];
  }
} 