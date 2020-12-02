import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getNews, clearNews } from '../../redux/news';
import { userLogin } from '../../redux/user';
import { loading } from '../../redux/system';
import Loader from '../../components/Loader/Loader';

function News() {
  const dispatch = useDispatch();
  const user = useSelector(userLogin);
  const isLoading = useSelector(loading);

  useEffect(() => {
    dispatch(getNews());
  }, [user]);

  useEffect(() => () => dispatch(clearNews()), []);

  return (
    <div>
      {isLoading && <Loader />}
    </div>
  );
}

export default News;
