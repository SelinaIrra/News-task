export const draftNews = (state) => state.news.draftNews;

export const news = (state) => state.news.news;

export const isTotalCountOnPage = (state) => state.news.isTotal;

export const emptyNews = (state) => !(state.news.news.length || state.news.draftNews.length);
