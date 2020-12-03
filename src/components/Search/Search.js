import React, { useState, useEffect } from 'react';
import classnames from 'classnames/bind';
import search from '../../style/images/search.png';
import styles from './Search.module.scss';

const cx = classnames.bind(styles);

const Search = ({ onSearch, isEmptyValue }) => {
  const [isChanged, setChanged] = useState(false);
  const [searchValue, setSearchVal] = useState('');
  const [timeout, setNewTimeout] = useState(null);

  useEffect(() => () => {
    if (timeout) {
      clearTimeout(timeout);
    }
  }, [timeout]);

  useEffect(() => {
    if (isEmptyValue) setSearchVal('');
  }, [isEmptyValue]);

  useEffect(() => {
    if (!isChanged) return;
    setNewTimeout(setTimeout(() => {
      onSearch(searchValue);
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
