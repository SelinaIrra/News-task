import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  news, draftNews, deleteNews, updateNews,
} from '../../../../redux/news';
import Table from './Table';
import ItemList from '../../../../components/ItemList';
import { adminContentType } from '../../../../redux/system';

const Content = () => {
  const contentType = useSelector(adminContentType);
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
      {(contentType === 'preview'
        && <ItemList items={allNews.filter((item) => item.status === 'approved')} />
      ) || (
        <Table
          data={[...userDraftNews, ...allNews]}
          onRemove={handleRemove}
          onUpdate={handleUpdate}
        />
      )}
    </>
  );
};

export default Content;
