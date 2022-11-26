import { useState } from 'react';

function useConfirmPopup(confirmCallback?: () => void) {
  const [isOpen, setIsOpen] = useState(false);

  //get props from ConfirmComponent
  function onConfirm() {
    setIsOpen(false);
    confirmCallback?.();
  }

  function onCancel() {
    setIsOpen(false);
  }

  function open() {
    setIsOpen(true);
  }

  return {
    isOpen,
    onConfirm,
    onCancel,
    open,
  };
}

export default useConfirmPopup;
