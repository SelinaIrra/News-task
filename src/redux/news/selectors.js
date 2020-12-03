export const draftNews = (state) => state.news.draftNews;

export const news = (state) => state.news.news;

export const isLastPage = (state) => state.news.isLastPage;

export const emptyNews = (state) => !(state.news.news.length || state.news.draftNews.length);

export const offset = (state) => state.news.offset;
