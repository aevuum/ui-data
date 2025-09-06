import { useState, useCallback } from 'react';

export interface ModalData {
  isOpen: boolean;
  item: any | null;
  type: string | null;
}

export const useModal = () => {
  const [modalData, setModalData] = useState<ModalData>({
    isOpen: false,
    item: null,
    type: null
  });

  const openModal = useCallback((item: any, type: string) => {
    setModalData({
      isOpen: true,
      item,
      type
    });
  }, []);

  const closeModal = useCallback(() => {
    setModalData({
      isOpen: false,
      item: null,
      type: null
    });
  }, []);

  return {
    modalData,
    openModal,
    closeModal
  };
};