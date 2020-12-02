/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect } from 'react';
import ReactModal from 'react-modal';
import classnames from 'classnames/bind';

import styles from './Modal.module.scss';

const cx = classnames.bind(styles);

function Modal({
  // eslint-disable-next-line react/prop-types
  isOpen, onClose, title, children,
}) {
  useEffect(() => {
    ReactModal.setAppElement('body');
  }, []);

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onClose}
      overlayClassName={cx('overlay')}
      className={cx('overlay__modal')}
    >
      <div className={cx('overlay__modal__header')}>
        <p className={cx('overlay__modal__header__title')}>{title}</p>
        <button
          type="button"
          onClick={onClose}
          className={cx('overlay__modal__header__button')}
        />
      </div>
      {children}
    </ReactModal>

  );
}

export default Modal;
