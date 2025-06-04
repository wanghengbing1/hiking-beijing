export interface Article {
  id: string;
  title: string;
  description: string;
  coverImage: string;
  publishDate: string;
  author: string;
  content: string;
  url: string;
  readCount: number;
  likeCount: number;
  tags: string[];
  source: string;
}

export interface ArticleListResponse {
  articles: Article[];
  total: number;
  page: number;
  pageSize: number;
}

export interface WechatArticleResponse {
  total_count: number;
  item_count: number;
  item: {
    media_id: string;
    content: {
      news_item: {
        title: string;
        thumb_url: string;
        digest: string;
        content_url: string;
        author: string;
        create_time: number;
        read_count: number;
        like_count: number;
        tags: string[];
      }[];
    };
  }[];
} 