import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  news, draftNews,
  deleteNews, updateNews, setOffset,
} from '../../../../redux/news';
import Table from './Table';
import ItemList from '../../../../components/ItemList';
import { adminContentType } from '../../../../redux/system';
import { STATUS, ADMIN_CONTENT_TYPE } from '../../../../constants';

const Content = () => {
  const contentType = useSelector(adminContentType);
  const allNews = useSelector(news);
  const userDraftNews = useSelector(draftNews);
  const dispatch = useDispatch();

  const handleRemove = (item) => {
    dispatch(setOffset(0));
    dispatch(deleteNews(item._id));
  };

  const handleUpdate = (item) => {
    dispatch(setOffset(0));
    dispatch(updateNews(item));
  };

  return (
    <>
      {contentType === ADMIN_CONTENT_TYPE.PREVIEW
        ? <ItemList items={allNews.filter((item) => item.status === STATUS.APPROVED)} />
        : (
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
