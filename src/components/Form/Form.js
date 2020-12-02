/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classnames from 'classnames/bind';
import { loading, error, setErrorMessage } from '../../redux/system';

import styles from './Form.module.scss';

const cx = classnames.bind(styles);

function Form({
  onSubmit, isValid, submitText, children,
}) {
  const dispatch = useDispatch();
  const isLoading = useSelector(loading);
  const errorMessage = useSelector(error);

  const clearError = () => dispatch(setErrorMessage(null));
  useEffect(() => {
    clearError();
    return clearError;
  }, []);

  return (
    <form className={cx('form')}>
      {children}
      <button
        onClick={onSubmit}
        type="button"
        className={cx('form__button')}
        disabled={isLoading || !isValid}
      >
        {submitText}
      </button>
      { errorMessage && <p className={cx('form__error')}>{errorMessage}</p> }
    </form>
  );
}

export default Form;
