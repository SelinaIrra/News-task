import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import classnames from 'classnames/bind';
import { adminContentType, setAdminContentType } from '../../../../redux/system';
import styles from '../Admin.module.scss';

const cx = classnames.bind(styles);

const Header = () => {
  const contentType = useSelector(adminContentType);
  const dispatch = useDispatch();

  return (
    <>
      {contentType === 'preview' ? (
        <button
          type="button"
          className={cx('button')}
          onClick={() => dispatch(setAdminContentType('table'))}
        >
          Назад
        </button>
      ) : (
        <button
          type="button"
          className={cx('button')}
          onClick={() => dispatch(setAdminContentType('preview'))}
        >
          Предварительный просмотр
        </button>
      )}
    </>
  );
};

export default Header;
