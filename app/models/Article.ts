export interface Article {
  _id: string;
  title: string;
  slug: string;
  excerpt?: string;
  content: string;
  coverImage?: string;
  category: {
    name: string;
    slug: string;
  };
  publishedAt: string;
}
