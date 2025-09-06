import React, { useState, useEffect } from 'react';
import ModalPortal from './ModalPortal';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      // Анимация появления
      setTimeout(() => setIsVisible(true), 10);
    } else {
      setIsVisible(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <ModalPortal containerId="modal-root">
      <div 
        className={`fixed inset-0 z-50 flex items-center justify-center p-4 bg-[rgba(0,0,0,0.6)] transition-opacity duration-300 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={onClose}
      >
        <div 
          className={`w-full max-w-lg bg-white rounded-lg shadow-xl overflow-hidden transform transition-all duration-300 ${
            isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
          }`}
          onClick={e => e.stopPropagation()}
        >
          {children}
        </div>
      </div>
    </ModalPortal>
  );
};

export default Modal;