import React from 'react';
import classnames from 'classnames/bind';

import styles from './Loader.module.scss';

const cx = classnames.bind(styles);

const Loader = () => (
  <div className={cx('loader')}>
    <span className={cx('loader__item')} />
    <span className={cx('loader__item')} />
    <span className={cx('loader__item')} />
  </div>
);

export default Loader;
