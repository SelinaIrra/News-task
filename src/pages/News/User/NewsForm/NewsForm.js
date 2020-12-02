import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import Form from '../../../../components/Form';
import { createNews } from '../../../../redux/news';

const NewsForm = () => {
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = () => {
    if (!title || !text) return;
    dispatch(createNews(title, text));
  };

  return (
    <Form
      onSubmit={handleSubmit}
      isValid={title && text}
      submitText="Сохранить"
    >
      <fieldset>
        <legend> Заголовок </legend>
        <input
          value={title}
          onChange={(ev) => setTitle(ev.target.value)}
          placeholder="Введите заголовок"
        />
      </fieldset>
      <fieldset>
        <legend> Текст </legend>
        <textarea
          value={text}
          onChange={(ev) => setText(ev.target.value)}
          placeholder="Введите текст"
        />
      </fieldset>
    </Form>
  );
};

export default NewsForm;
