import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import classnames from 'classnames/bind';
import search from '../../style/images/search.png';
import styles from './Search.module.scss';
import { filterNews, getNews } from '../../redux/news';

const cx = classnames.bind(styles);

const Search = () => {
  const [isChanged, setChanged] = useState(false);
  const [searchValue, setSearchVal] = useState('');
  // eslint-disable-next-line no-undef
  const [timeout, setNewTimeout] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => () => {
    if (timeout) {
      clearTimeout(timeout);
    }
  }, [timeout]);

  useEffect(() => {
    if (!isChanged) return;
    setNewTimeout(setTimeout(() => {
      if (searchValue) {
        dispatch(filterNews(searchValue));
      } else {
        dispatch(getNews());
      }
    }, 500));
  }, [searchValue]);

  const handleChange = (ev) => {
    setSearchVal(ev.target.value);
    setChanged(true);
  };

  return (
    <div className={cx('search')}>
      <input
        value={searchValue}
        onChange={handleChange}
        placeholder="Поиск по заголовкам..."
      />
      <img alt="search" src={search} />
    </div>
  );
};

export default Search;
