import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classnames from 'classnames/bind';
import { getNews, clearNews } from '../../redux/news';
import { userLogin, userRole } from '../../redux/user';
import { loading } from '../../redux/system';
import User from './User';
import Admin from './Admin';
import Loader from '../../components/Loader/Loader';
import styles from './News.module.scss';

const cx = classnames.bind(styles);

function News() {
  const dispatch = useDispatch();
  const user = useSelector(userLogin);
  const isLoading = useSelector(loading);
  const role = useSelector(userRole);

  useEffect(() => {
    dispatch(getNews());
  }, [user]);

  useEffect(() => () => dispatch(clearNews()), []);

  return (
    <main className={cx('main')}>
      {isLoading && <Loader />}
      {(role === 'user' || !role) && <User />}
      {(role === 'admin') && <Admin />}
    </main>
  );
}

export default News;
