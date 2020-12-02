import React from 'react';
import { useSelector } from 'react-redux';
import classnames from 'classnames/bind';
import ItemList from '../../../components/ItemList';
import { news, draftNews } from '../../../redux/news';
import Search from '../../../components/Search/Search';
import styles from './User.module.scss';
import { userRole } from '../../../redux/user';

const cx = classnames.bind(styles);

const User = () => {
  const allNews = useSelector(news);
  const userDraftNews = useSelector(draftNews);
  const role = useSelector(userRole);
  return (
    <>
      <div className={cx('header')}>
        <Search />
        {role === 'user' && <button type="button" className={cx('header__button')}>Предложить новость</button>}
      </div>
      { userDraftNews.length > 0 && (
      <div className={cx('main')}>
        <ItemList items={userDraftNews} />
      </div>
      ) }
      <ItemList items={allNews} />
    </>
  );
};

export default User;
