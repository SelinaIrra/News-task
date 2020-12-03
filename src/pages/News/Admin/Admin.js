import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import classnames from 'classnames/bind';
import {
  news, draftNews, deleteNews, updateNews,
} from '../../../redux/news';
import Table from './Table';
import Search from '../../../components/Search/Search';
import styles from './Admin.module.scss';
import ItemList from '../../../components/ItemList';

const cx = classnames.bind(styles);

const Admin = () => {
  const [isPreview, setPreview] = useState(false);
  const allNews = useSelector(news);
  const userDraftNews = useSelector(draftNews);
  const dispatch = useDispatch();

  const handleRemove = (item) => {
    // eslint-disable-next-line no-underscore-dangle
    dispatch(deleteNews(item._id));
  };

  const handleUpdate = (item) => {
    // eslint-disable-next-line no-underscore-dangle
    dispatch(updateNews(item));
  };

  return (
    <>
      <div className={cx('header')}>
        <Search />
        {(isPreview && (
          <button
            className={cx('header__button')}
            type="button"
            onClick={() => setPreview(false)}
          >
            Назад
          </button>
        ))
        || (
          <button
            className={cx('header__button')}
            type="button"
            onClick={() => setPreview(true)}
          >
            Предварительный просмотр
          </button>
        )}
      </div>
      {(isPreview && <ItemList items={allNews.filter((item) => item.status === 'approved')} />) || (
      <Table
        data={[...userDraftNews, ...allNews]}
        onRemove={handleRemove}
        onUpdate={handleUpdate}
      />
      )}
    </>
  );
};

export default Admin;
