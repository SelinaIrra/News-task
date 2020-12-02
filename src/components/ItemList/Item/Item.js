/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import classnames from 'classnames/bind';
import styles from './Item.module.scss';

const cx = classnames.bind(styles);

// eslint-disable-next-line react/prop-types
function Item({ data }) {
  const [textIsShort, setTextIsShort] = useState(true);
  const handleClick = () => {
    if (!textIsShort) return;
    setTextIsShort(false);
  };
  return (
    // eslint-disable-next-line no-underscore-dangle
    <article key={data._id} className={cx('article')} onClick={handleClick} onKeyDown={handleClick} role="presentation">
      <header className={cx('article__header')}><h3>{data.name}</h3></header>
      <p className={cx(['article__text', textIsShort ? 'article__text_short' : 'article__text_full'])}>{data.text}</p>
      <time className={cx('article__time')}>{data.date}</time>
    </article>
  );
}

export default Item;
