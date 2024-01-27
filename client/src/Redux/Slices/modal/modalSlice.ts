import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { Modal } from "../../../Types/modal";

type ModalState = {
  modalQueue: Modal[] | [];
};

const initialState: ModalState = {
  modalQueue: [],
};

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal: (state, action) => {
      state.modalQueue = [action.payload, ...state.modalQueue];
    },
    closeModal: (state, action) => {
      state.modalQueue = state.modalQueue.filter(
        (modal) => modal.name !== action.payload
      );
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;

export const selectModal = (state: RootState) => state.modal;

export default modalSlice.reducer;
