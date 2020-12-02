import React from 'react';
import { useSelector } from 'react-redux';
// import classnames from 'classnames/bind';
// import styles from './User.module.scss';
import ItemList from '../../../components/ItemList';
import { news } from '../../../redux/news';

// const cx = classnames.bind(styles);

function User() {
  const allNews = useSelector(news);
  return (
    <ItemList items={allNews} />
  );
}

export default User;
