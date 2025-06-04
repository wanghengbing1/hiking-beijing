import { Article } from '@/types/article';
import { getWechatArticles, getWechatArticleDetail } from './wechatService';

export interface ArticleListResponse {
  articles: Article[];
  total: number;
  page: number;
  pageSize: number;
}

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

export async function getArticleDetail(id: string): Promise<Article | null> {
  try {
    return await getWechatArticleDetail(id);
  } catch (error) {
    console.error('Error fetching article detail:', error);
    throw error;
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