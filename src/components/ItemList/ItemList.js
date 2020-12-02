/* eslint-disable react/prop-types */
import React from 'react';
import classnames from 'classnames/bind';
import Item from './Item';
import styles from './ItemList.module.scss';

const cx = classnames.bind(styles);

// eslint-disable-next-line react/prop-types
function ItemList({ items }) {
  return (
    <div className={cx('list')}>
      {items.map((item) => (
        <Item data={item} key={item.id} />
      ))}
    </div>
  );
}

export default ItemList;
