import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import classnames from 'classnames/bind';
import Modal from '../../Modal';
import Form from './Form';
import { userId } from '../../../redux/user';

import styles from './Auth.module.scss';

const cx = classnames.bind(styles);

function Auth() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const handleClick = () => {
    setModalIsOpen(!modalIsOpen);
  };

  const userAuthorized = useSelector(userId);
  useEffect(() => {
    if (userAuthorized) { setModalIsOpen(false); }
  }, [userAuthorized]);
  return (
    <>
      <button
        type="button"
        className={cx('auth__button')}
        onClick={handleClick}
      >
        Вход

      </button>
      <Modal
        isOpen={modalIsOpen}
        title="Вход"
        onClose={() => setModalIsOpen(false)}
      >
        <Form />
      </Modal>
    </>
  );
}

export default Auth;
