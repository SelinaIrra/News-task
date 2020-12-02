import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import classnames from 'classnames/bind';
import ItemList from '../../../components/ItemList';
import { news, draftNews } from '../../../redux/news';
import Search from '../../../components/Search/Search';
import styles from './User.module.scss';
import { userRole } from '../../../redux/user';
import Modal from '../../../components/Modal';
import { loading } from '../../../redux/system';
import NewsForm from './NewsForm/NewsForm';

const cx = classnames.bind(styles);

const User = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const allNews = useSelector(news);
  const userDraftNews = useSelector(draftNews);
  const role = useSelector(userRole);
  const isLoading = useSelector(loading);

  useEffect(() => {
    if (userDraftNews.length > 0 && modalIsOpen) {
      setModalIsOpen(false);
    }
  }, [userDraftNews]);

  return (
    <>
      <div className={cx('header')}>
        <Search />
        {role === 'user' && (
        <button
          type="button"
          className={cx('header__button')}
          onClick={() => setModalIsOpen(true)}
        >
          Предложить новость
        </button>
        )}
      </div>
      { userDraftNews.length > 0 && (
      <div className={cx('main')}>
        <ItemList items={userDraftNews} />
      </div>
      ) }
      <ItemList items={allNews} />
      {
        !userDraftNews.length && !allNews.length && !isLoading && <p>Новости отсутствуют</p>
      }
      <Modal
        isOpen={modalIsOpen}
        onClose={() => setModalIsOpen(false)}
        title="Новая новость"
      >
        <NewsForm />
      </Modal>
    </>
  );
};

export default User;
