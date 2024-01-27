import { Dialog } from "@headlessui/react";
import Button from "../Button/Button";
import clsx from "clsx";

type ModalTypes = {
  title: React.ReactNode;
  children: React.ReactNode;
  actions?: React.ReactNode;
  isOpen: boolean;
  closeModal: () => void;
  size?: string;
};

const Modal = ({
  title,
  children,
  actions,
  isOpen,
  closeModal,
  size,
}: ModalTypes) => {
  return (
    <Dialog
      as="div"
      className="relative z-10 text-app-grey-600"
      open={isOpen}
      onClose={closeModal}
    >
      <div className="fixed inset-0 flex w-screen items-center justify-center p-4 bg-app-grey-50 bg-opacity-80" >
        <Dialog.Panel
          className={clsx("w-full  rounded bg-white p-4", size || "max-w-md")}
        >
          {title && <Dialog.Title className="text-base mb-6">{title}</Dialog.Title>}
          <Dialog.Description className="">{children}</Dialog.Description>
          <div className="flex justify-end mt-6">
            {actions || <Button onClick={closeModal}>Cancel</Button>}
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default Modal;
