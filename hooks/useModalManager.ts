import { useState } from "react";
import { LibraryItem } from "@/types";

export const useModalManager = () => {
  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    item: LibraryItem | null;
  }>({
    isOpen: false,
    item: null,
  });

  const openModal = (item: LibraryItem) => {
    setModalState({ isOpen: true, item });
  };

  const closeModal = () => {
    setModalState({ isOpen: false, item: null });
  };

  return {
    isOpen: modalState.isOpen,
    selectedItem: modalState.item,
    openModal,
    closeModal,
  };
};
