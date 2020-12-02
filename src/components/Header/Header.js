import React from 'react';
import { NavLink } from 'react-router-dom';

import classnames from 'classnames/bind';
import styles from './Header.module.scss';

const cx = classnames.bind(styles);

function Header() {
  return (
    <header className={cx('header')}>
      <nav className={cx('header__nav')}>
        <ul className={cx('header__nav__ul')}>
          <li className={cx('header__nav__ul__li')}>
            <NavLink
              to="/"
              exact
              activeClassName={cx('header__nav__ul__li__active')}
            >
              Главная
            </NavLink>
          </li>
          <li className={cx('header__nav__ul__li')}>
            <NavLink
              to="/news"
              exact
              activeClassName={cx('header__nav__ul__li__active')}
            >
              Новости
            </NavLink>
          </li>
        </ul>
      </nav>
      <button type="button" className={cx('header__button')}>Вход</button>
    </header>
  );
}

export default Header;
