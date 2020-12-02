import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { logIn } from '../../../../redux/user';
import { loading } from '../../../../redux/system';
import Form from '../../../Form';

function AuthForm() {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = () => {
    if (!name || !password) return;
    dispatch(logIn(name, password));
  };

  return (
    <Form
      onSubmit={handleSubmit}
      isValid={loading && password}
      submitText="Войти"
    >
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
    </Form>
  );
}

export default AuthForm;
