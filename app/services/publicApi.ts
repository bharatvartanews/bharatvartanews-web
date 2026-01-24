const BASE_URL = process.env.API_BASE_URL;

if (!BASE_URL) {
  throw new Error("API_BASE_URL is not defined in env");
}

async function fetcher(path: string) {
  const res = await fetch(`${BASE_URL}${path}`, {
    cache: "no-store"
  });

  if (!res.ok) {
    throw new Error(`API error ${res.status} for ${path}`);
  }

  return res.json();
}

export const PublicApi = {
  getHome() {
    return fetcher("/api/home");
  },

  getTopNews(slug: string) {
    return fetcher(`/api/news/${slug}`);
  },

  getArticle(slug: string) {
    return fetcher(`/api/articles/${slug}`);
  },
  getArticleBySlug(slug: string) {
  return fetcher(`/api/articles/${slug}`);
},

getArticleById(id: number | string) {
  return fetcher(`/api/articles/${id}`);
}
,

  // CATEGORIES
  getCategories() {
    return fetcher("/api/categories");
  },

 getCategoryBySlug(slug: string) {
  return fetcher(`/api/categories/${slug}`);
}
,

  // ARTICLES
  getArticlesByCategory(categoryId: number) {
    return fetcher(`/api/articles?categoryId=${categoryId}`);
  },

  // VIDEOS
  getVideos() {
    return fetcher("/api/videos");
  }
};
