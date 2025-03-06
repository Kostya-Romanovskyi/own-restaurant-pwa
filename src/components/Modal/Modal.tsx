import { FC, ReactNode, useEffect } from 'react';
import './modal.scss';

interface IModal {
  children: ReactNode;
  isOpen: boolean;
  onClose?: () => void;
  classStyle?: string;
}

const Modal: FC<IModal> = ({ children, isOpen, onClose, classStyle }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className={`modal-content-staff ${classStyle}`} onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
