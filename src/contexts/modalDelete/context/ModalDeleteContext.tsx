import { createContext } from "react";

export type ModalDeleteContextType = {
  isModalDeleteOpen: boolean;
  toggleDeleteModal: () => void;
};

export const ModalDeleteContext = createContext<ModalDeleteContextType>(null!);
