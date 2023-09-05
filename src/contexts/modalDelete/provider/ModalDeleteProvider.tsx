import { JSX, useState } from "react";
import { ModalDeleteContext } from "../context/ModalDeleteContext";

interface IProps {
  children: JSX.Element;
}

const ModalDeleteProvider = ({ children }: IProps) => {
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);

  const toggleDeleteModal = () => {
    setIsModalDeleteOpen((prevState) => !prevState);
  };

  return (
    <ModalDeleteContext.Provider
      value={{ isModalDeleteOpen, toggleDeleteModal }}
    >
      {children}
    </ModalDeleteContext.Provider>
  );
};

export default ModalDeleteProvider;
