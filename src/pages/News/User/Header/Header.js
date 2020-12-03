import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import classnames from 'classnames/bind';
import { draftNews } from '../../../../redux/news';
import { userRole } from '../../../../redux/user';
import Modal from '../../../../components/Modal';
import NewsForm from './NewsForm';
import styles from '../User.module.scss';
import { ROLES } from '../../../../constants';

const cx = classnames.bind(styles);

const UserHeader = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const userDraftNews = useSelector(draftNews);
  const role = useSelector(userRole);

  useEffect(() => {
    if (userDraftNews.length > 0 && modalIsOpen) {
      setModalIsOpen(false);
    }
  }, [userDraftNews]);

  return (
    <>
      {role === ROLES.USER && (
        <button
          type="button"
          className={cx('button')}
          onClick={() => setModalIsOpen(true)}
        >
          Предложить новость
        </button>
      )}

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

export default UserHeader;
