import React, { useState } from 'react';
import Form from '../../../../components/Form';

const NewsForm = () => {
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');

  const handleSubmit = () => {
    // if (!title || !text) return;
  };

  return (
    <Form
      onSubmit={handleSubmit}
      isValid={title && text}
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
