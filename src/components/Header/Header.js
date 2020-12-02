import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import classnames from 'classnames/bind';
import Modal from '../Modal';

import styles from './Header.module.scss';

const cx = classnames.bind(styles);

function Header() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const handleClick = () => {
    setModalIsOpen(!modalIsOpen);
  };

  return (
    <>
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
        <button type="button" className={cx('header__button')} onClick={handleClick}>Вход</button>
      </header>
      <Modal
        isOpen={modalIsOpen}
        title="Вход"
        onClose={() => setModalIsOpen(false)}
      />
    </>
  );
}

export default Header;
