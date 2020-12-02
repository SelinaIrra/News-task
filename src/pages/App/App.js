import React from 'react';
import { useSelector } from 'react-redux';
import classnames from 'classnames/bind';
import { userLogin } from '../../redux/user';
import styles from './App.module.scss';
import Loader from '../../components/Loader/Loader';
import { loading } from '../../redux/system';

const cx = classnames.bind(styles);

function App() {
  const userName = useSelector(userLogin);
  const isLoading = useSelector(loading);
  return (
    <div className={cx('home')}>
      <i className={cx('home__title')}>
        Привет,
        {' '}
        {userName || 'Гость'}
        !
      </i>
      {isLoading && <Loader />}
    </div>
  );
}

export default App;
