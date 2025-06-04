import { Article } from '@/types/article';

// 模拟数据
const MOCK_ARTICLES: Article[] = [
  {
    id: '1',
    title: '北京香山徒步之旅',
    description: '探索香山红叶，感受秋天的魅力',
    coverImage: '/images/xiangshan.jpg',
    publishDate: '2024-03-20T10:00:00Z',
    author: '徒步北京',
    content: '香山位于北京市海淀区，是著名的赏红叶胜地。这里不仅有美丽的自然风光，还有丰富的历史文化。每年秋天，漫山遍野的红叶吸引着无数游客前来观赏。徒步路线从香山公园东门开始，沿着山路蜿蜒而上，可以欣赏到不同角度的红叶美景。',
    url: '/articles/1',
    readCount: 1234,
    likeCount: 88,
    tags: ['香山', '徒步', '红叶'],
    source: '户外星'
  },
  {
    id: '2',
    title: '慕田峪长城徒步攻略',
    description: '征服慕田峪长城，体验历史与自然的完美结合',
    coverImage: '/images/mutianyu.jpg',
    publishDate: '2024-03-19T14:30:00Z',
    author: '徒步北京',
    content: '慕田峪长城是明长城中保存最好的一段，也是北京最著名的长城景区之一。这里的长城蜿蜒于崇山峻岭之间，景色壮丽。徒步路线从慕田峪景区入口开始，沿着长城步道前行，可以欣赏到不同角度的长城美景。',
    url: '/articles/2',
    readCount: 2156,
    likeCount: 156,
    tags: ['长城', '慕田峪', '徒步'],
    source: '北驴'
  },
  {
    id: '3',
    title: '灵山徒步探险',
    description: '挑战北京最高峰，感受云端的壮丽景色',
    coverImage: '/images/lingshan.jpg',
    publishDate: '2024-03-18T09:15:00Z',
    author: '徒步北京',
    content: '灵山是北京最高峰，海拔2303米。这里四季景色各异，春天山花烂漫，夏天绿树成荫，秋天层林尽染，冬天白雪皑皑。徒步路线从灵山景区入口开始，沿着山路蜿蜒而上，可以欣赏到不同季节的自然美景。',
    url: '/articles/3',
    readCount: 1890,
    likeCount: 142,
    tags: ['灵山', '徒步', '探险'],
    source: '徒步大自然'
  },
  {
    id: '4',
    title: '百花山徒步之旅',
    description: '探索百花山的自然奇观，感受大自然的鬼斧神工',
    coverImage: '/images/baihuashan.jpg',
    publishDate: '2024-03-17T11:20:00Z',
    author: '徒步北京',
    content: '百花山位于北京市门头沟区，是著名的自然风景区。这里山势险峻，植被丰富，四季景色各异。徒步路线从百花山景区入口开始，沿着山路蜿蜒而上，可以欣赏到不同季节的自然美景。',
    url: '/articles/4',
    readCount: 1567,
    likeCount: 98,
    tags: ['百花山', '徒步', '自然'],
    source: '阅徒'
  },
  {
    id: '5',
    title: '八达岭长城徒步攻略',
    description: '征服八达岭长城，体验历史与自然的完美结合',
    coverImage: '/images/badaling.jpg',
    publishDate: '2024-03-16T15:45:00Z',
    author: '徒步北京',
    content: '八达岭长城是明长城中保存最好的一段，也是北京最著名的长城景区之一。这里的长城蜿蜒于崇山峻岭之间，景色壮丽。徒步路线从八达岭景区入口开始，沿着长城步道前行，可以欣赏到不同角度的长城美景。',
    url: '/articles/5',
    readCount: 2345,
    likeCount: 167,
    tags: ['长城', '八达岭', '徒步'],
    source: '徒步强国'
  }
];

// 获取所有文章列表
export async function getWechatArticles(offset: number = 0, count: number = 10): Promise<Article[]> {
  console.log('Using mock articles');
  return MOCK_ARTICLES.slice(offset, offset + count);
}

// 获取文章详情
export async function getWechatArticleDetail(id: string): Promise<Article | null> {
  console.log('Using mock article detail');
  return MOCK_ARTICLES.find(article => article.id === id) || null;
}

// 从 HTML 内容中提取第一张图片
function extractImageFromContent(content: string | undefined): string | null {
  if (!content) return null;
  const match = content.match(/<img[^>]+src="([^">]+)"/);
  return match ? match[1] : null;
} 