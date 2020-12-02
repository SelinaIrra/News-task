import React from 'react';
import { useSelector } from 'react-redux';
import classnames from 'classnames/bind';
import { news, draftNews } from '../../../redux/news';
import Table from './Table';
import Search from '../../../components/Search/Search';
import styles from './Admin.module.scss';

const cx = classnames.bind(styles);

const Admin = () => {
  const allNews = useSelector(news);
  const userDraftNews = useSelector(draftNews);
  return (
    <>
      <div className={cx('search')}>
        <Search />
      </div>
      <Table data={[...userDraftNews, ...allNews]} />
    </>
  );
};

export default Admin;
