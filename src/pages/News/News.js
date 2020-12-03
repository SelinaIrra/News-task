import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classnames from 'classnames/bind';
import {
  getNews, clearNews, filterNews, isTotalCountOnPage, emptyNews,
} from '../../redux/news';
import { userLogin, userRole } from '../../redux/user';
import { loading } from '../../redux/system';
import UserMain from './User/Content';
import UserHeader from './User/Header';
import AdminMain from './Admin/Content';
import AdminHeader from './Admin/Header';
import Loader from '../../components/Loader/Loader';
import styles from './News.module.scss';
import LazyLoading from '../../components/LazyLoading/LazyLoading';
import Search from '../../components/Search/Search';

const cx = classnames.bind(styles);

function News() {
  const [offset, setOffset] = useState(0);
  const [searchValue, setSearchValue] = useState('');
  const dispatch = useDispatch();
  const user = useSelector(userLogin);
  const isLoading = useSelector(loading);
  const role = useSelector(userRole);
  const isTotalCount = useSelector(isTotalCountOnPage);
  const isEmptyNews = useSelector(emptyNews);

  const clearParams = () => {
    setOffset(0);

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
    if (isTotalCount || isEmptyNews) return;
    if (searchValue) {
      dispatch(filterNews(searchValue, offset + 30));
    } else {
      dispatch(getNews(offset + 30));
    }
    setOffset(offset + 30);
  };

  const handleSearch = (searchStr) => {
    setSearchValue(searchStr);
    setOffset(0);
    if (searchStr) {
      dispatch(filterNews(searchStr));
    } else {
      dispatch(getNews());
    }
  };

  return (
    <main className={cx('main')}>
      {isLoading && <Loader />}
      <LazyLoading onScroll={handleScroll}>
        <div className={cx('main__header')}>
          <Search
            onSearch={handleSearch}
            isEmptyValue={!searchValue}
          />
          {(role === 'user' || !role) && <UserHeader />}
          {(role === 'admin') && <AdminHeader />}
        </div>

        {(role === 'user' || !role) && <UserMain />}
        {(role === 'admin') && <AdminMain />}
      </LazyLoading>
    </main>
  );
}

export default News;
