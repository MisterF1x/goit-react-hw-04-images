import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Overlay, StyledlModal } from './Modal.styled';
import PropTypes from 'prop-types';
const modalRoot = document.querySelector('#modal-root');

export const Modal = ({ onClose, children }) => {
  const handleKeyDown = ({ code }) => {
    if (code === 'Escape') onClose();
  };
  const onClickOverlay = ({ currentTarget, target }) => {
    if (currentTarget === target) onClose();
  };
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  });
  return createPortal(
    <Overlay onClick={onClickOverlay}>
      <StyledlModal>{children}</StyledlModal>
    </Overlay>,
    modalRoot
  );
};
Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
};
