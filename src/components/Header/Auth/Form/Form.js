import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classnames from 'classnames/bind';
import { logIn } from '../../../../redux/user';
import { loading, error, setErrorMessage } from '../../../../redux/system';

import styles from './Form.module.scss';
import Loader from '../../../Loader/Loader';

const cx = classnames.bind(styles);

function Form() {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const isLoading = useSelector(loading);
  const errorMessage = useSelector(error);

  const handleSubmit = () => {
    if (!name || !password) return;
    dispatch(logIn(name, password));
  };

  const clearError = () => dispatch(setErrorMessage(null));
  useEffect(() => {
    clearError();
    return clearError;
  }, []);

  return (
    <form className={cx('form')}>
      <fieldset>
        <legend> Логин </legend>
        <input
          value={name}
          onChange={(ev) => setName(ev.target.value)}
          placeholder="Введите логин"
        />
      </fieldset>
      <fieldset>
        <legend> Пароль </legend>
        <input
          value={password}
          onChange={(ev) => setPassword(ev.target.value)}
          type="password"
          placeholder="Введите пароль"
        />
      </fieldset>
      <button
        onClick={handleSubmit}
        type="button"
        className={cx('form__button')}
        disabled={isLoading || !name || !password}
      >
        Войти
      </button>
      {isLoading && <Loader />}
      { errorMessage && <p className={cx('form__error')}>{errorMessage}</p> }
    </form>
  );
}

export default Form;
