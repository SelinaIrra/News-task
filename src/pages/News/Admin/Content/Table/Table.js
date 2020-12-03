/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import classnames from 'classnames/bind';
import styles from './Table.module.scss';
import { STATUS } from '../../../../../constants';

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
            {item.status === STATUS.PENDING && (
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
