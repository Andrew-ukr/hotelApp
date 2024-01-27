import { Modal } from "../Types/modal";

export const isModalOpen = (
  modalQueue: Modal[] | [],
  name: string
): boolean => {
  return !!modalQueue.find((modal) => modal.name === name);
};
