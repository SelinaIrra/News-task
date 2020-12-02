import React from 'react';
import { useSelector } from 'react-redux';
import classnames from 'classnames/bind';
import { userLogin } from '../../redux/user';
import styles from './App.module.scss';

const cx = classnames.bind(styles);

function App() {
  const userName = useSelector(userLogin);
  return (
    <div className={cx('home')}>
      <i className={cx('home__title')}>
        Привет,
        {' '}
        {userName || 'Гость'}
        !
      </i>
    </div>
  );
}

export default App;
