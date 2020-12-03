import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classnames from 'classnames/bind';
import {
  getNews, clearNews, filterNews, isLastPage, emptyNews, offset, setOffset,
} from '../../redux/news';
import { userLogin, userRole } from '../../redux/user';
import { loading } from '../../redux/system';
import UserContent from './User/Content';
import UserHeader from './User/Header';
import AdminContent from './Admin/Content';
import AdminHeader from './Admin/Header';
import Loader from '../../components/Loader/Loader';
import styles from './News.module.scss';
import LazyLoading from '../../components/LazyLoading/LazyLoading';
import Search from '../../components/Search/Search';
import { ROLES, LIMIT } from '../../constants';

const cx = classnames.bind(styles);

function News() {
  const [searchValue, setSearchValue] = useState('');
  const dispatch = useDispatch();
  const user = useSelector(userLogin);
  const isLoading = useSelector(loading);
  const role = useSelector(userRole);
  const lastPage = useSelector(isLastPage);
  const isEmptyNews = useSelector(emptyNews);
  const newsOffset = useSelector(offset);

  const clearParams = () => {
    dispatch(setOffset(0));
    setSearchValue('');
  };
  useEffect(() => {
    clearParams();
    dispatch(getNews());
  }, [user]);

  useEffect(() => () => {
    clearParams();
    dispatch(clearNews());
  }, []);

  const handleScroll = () => {
    if (lastPage || isEmptyNews) return;
    if (searchValue) {
      dispatch(filterNews(searchValue, newsOffset + LIMIT));
    } else {
      dispatch(getNews(newsOffset + LIMIT));
    }
    dispatch(setOffset(newsOffset + LIMIT));
  };

  const handleSearch = (searchStr) => {
    setSearchValue(searchStr);
    dispatch(setOffset(0));
    if (searchStr) {
      dispatch(filterNews(searchStr));
    } else {
      dispatch(getNews());
    }
  };

  return (
    <main className={cx('main')}>
      {isLoading && <Loader />}
      <div className={cx('main__header')}>
        <Search
          onSearch={handleSearch}
          isEmptyValue={!searchValue}
        />
        {(role === ROLES.ADMIN) ? <AdminHeader /> : <UserHeader />}
      </div>
      <LazyLoading onScroll={handleScroll}>
        {(role === ROLES.ADMIN) ? <AdminContent /> : <UserContent />}
      </LazyLoading>
    </main>
  );
}

export default News;
