import { useSelector } from "react-redux";
import { closeModal, selectModal } from "../Redux/Slices/modal/modalSlice";
import { useDispatch } from "react-redux";
import { isModalOpen } from "../Utils/isModalOpen";

export const useModalVisibility = (name: string) => {
  const { modalQueue } = useSelector(selectModal);
  const dispatch = useDispatch();
  const isOpen = isModalOpen(modalQueue, name);
  const handleCloseModal = () => {
    dispatch(closeModal(name));
  };

  return { isOpen, handleCloseModal };
};
