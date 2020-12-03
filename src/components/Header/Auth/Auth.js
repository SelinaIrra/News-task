import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import classnames from 'classnames/bind';
import Modal from '../../Modal';
import { clearNews } from '../../../redux/news';
import AuthForm from './AuthForm';
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
    setModalIsOpen(true);
  };

  const handleLogoutClick = () => {
    dispatch(logOut());
    dispatch(clearNews());
  };

  return (
    <>
      <button
        type="button"
        className={cx('auth__button')}
        onClick={userAuthorized ? handleLogoutClick : handleLoginClick}
      >
        {userAuthorized ? 'Выход' : 'Вход'}
      </button>

      <Modal
        isOpen={modalIsOpen}
        title="Вход"
        onClose={() => setModalIsOpen(false)}
      >
        <AuthForm />
      </Modal>

    </>
  );
}

export default Auth;
