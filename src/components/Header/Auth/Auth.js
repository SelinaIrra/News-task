import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import classnames from 'classnames/bind';
import Modal from '../../Modal';
import Form from './Form';
import { logOut, userLogin } from '../../../redux/user';

import styles from './Auth.module.scss';

const cx = classnames.bind(styles);

function Auth() {
  const dispatch = useDispatch();
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const userAuthorized = useSelector(userLogin);
  useEffect(() => {
    if (userAuthorized) { setModalIsOpen(false); }
  }, [userAuthorized]);

  const handleLoginClick = () => {
    setModalIsOpen(!modalIsOpen);
  };
  const handleLogoutClick = () => {
    dispatch(logOut());
  };

  return (
    <>
      {(!userAuthorized && (
      <>
        <button
          type="button"
          className={cx('auth__button')}
          onClick={handleLoginClick}
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
      )) || (
      <button
        type="button"
        className={cx('auth__button')}
        onClick={handleLogoutClick}
      >
        Выход
      </button>
      )}
    </>
  );
}

export default Auth;
