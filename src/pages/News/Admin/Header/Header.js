import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import classnames from 'classnames/bind';
import { adminContentType, setAdminContentType } from '../../../../redux/system';
import styles from '../Admin.module.scss';
import { ADMIN_CONTENT_TYPE } from '../../../../constants';

const cx = classnames.bind(styles);

const Header = () => {
  const contentType = useSelector(adminContentType);
  const dispatch = useDispatch();

  return (
    <>
      {contentType === ADMIN_CONTENT_TYPE.PREVIEW ? (
        <button
          type="button"
          className={cx('button')}
          onClick={() => dispatch(setAdminContentType(ADMIN_CONTENT_TYPE.TABLE))}
        >
          Назад
        </button>
      ) : (
        <button
          type="button"
          className={cx('button')}
          onClick={() => dispatch(setAdminContentType(ADMIN_CONTENT_TYPE.PREVIEW))}
        >
          Предварительный просмотр
        </button>
      )}
    </>
  );
};

export default Header;
