import { createSlice } from "@reduxjs/toolkit";

const initialModalState = { addModalOpen: false, deleteModalOpen: false };
const modalSlice = createSlice({
  name: "modal",
  initialState: initialModalState,
  reducers: {
    addModalOpen(state) {
      state.addModalOpen = true;
    },
    addModalClose(state) {
      state.addModalOpen = false;
    },
    deleteModalOpen(state) {
      state.deleteModalOpen = true;
    },
    deleteModalClose(state) {
      state.deleteModalOpen = false;
    },
  },
});

export default modalSlice.reducer;
export const modalActions = modalSlice.actions;
