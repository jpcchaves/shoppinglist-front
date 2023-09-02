import { useState } from "react";

const UseShoppingCartModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen((prevState) => !prevState);
  };

  return { toggleModal, isModalOpen };
};

export default UseShoppingCartModal;
