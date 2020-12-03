/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable react/prop-types */
import React from 'react';
import classnames from 'classnames/bind';
import styles from './Table.module.scss';

const cx = classnames.bind(styles);

const Table = ({ data, onRemove, onUpdate }) => (
  <table className={cx('table')}>
    <thead>
      <tr>
        <th>Заголовок</th>
        <th>Текст</th>
        <th>Дата</th>
        <th>Действия</th>
      </tr>
    </thead>
    <tbody>
      {data.map((item) => (
        // eslint-disable-next-line no-underscore-dangle
        <tr key={item._id} className={cx('table__tr')}>
          <td>{item.name}</td>
          <td>{item.text}</td>
          <td>{item.date}</td>
          <td className={cx('table__actions')}>
            <button
              onClick={() => onRemove(item)}
              type="button"
              className={cx(['table__actions__button', 'table__actions__button-remove'])}
            />
            {item.status === 'pending' && (
              <button
                onClick={() => onUpdate(item)}
                type="button"
                className={cx(['table__actions__button', 'table__actions__button-approve'])}
              />
            )}
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default Table;
