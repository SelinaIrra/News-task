import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import classnames from 'classnames/bind';
import ItemList from '../../../../components/ItemList';
import { news, draftNews } from '../../../../redux/news';
import styles from '../User.module.scss';
import { loading } from '../../../../redux/system';

const cx = classnames.bind(styles);

const Content = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const allNews = useSelector(news);
  const userDraftNews = useSelector(draftNews);
  const isLoading = useSelector(loading);

  useEffect(() => {
    if (userDraftNews.length > 0 && modalIsOpen) {
      setModalIsOpen(false);
    }
  }, [userDraftNews]);

  return (
    <>
      { userDraftNews.length > 0 && (
      <div className={cx('main')}>
        <ItemList items={userDraftNews} />
      </div>
      ) }
      <ItemList items={allNews} />
      {
        !userDraftNews.length && !allNews.length && !isLoading && <p>Новости отсутствуют</p>
      }
    </>
  );
};

export default Content;
