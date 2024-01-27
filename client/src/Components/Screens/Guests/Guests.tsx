import React from "react";
import { Button } from "../../UI";
import { useGetAllGuestsQuery } from "../../../Redux/Slices/guests/guestsApi";

import GuestsTable from "../../Table/GuestsTable/GuestsTable";
import { useDispatch } from "react-redux";
import { openModal } from "../../../Redux/Slices/modal/modalSlice";
import { GUEST_MODAL } from "../../../Utils/constants";

const Guests = () => {
  const { data: guests, isLoading, isError } = useGetAllGuestsQuery();
  const dispatch = useDispatch();
  
  const addNewGuest = () => {
    dispatch(openModal({ name: GUEST_MODAL }));
  };

  return (
    <div className="flex flex-col grow overflow-auto">
      <div className="font-medium text-xs text-app-grey-400 mb-4">Guests</div>
      <div className="flex justify-end py-4">
        <Button onClick={addNewGuest}>+ Add Guest</Button>
      </div>
      <GuestsTable
        data={guests?.data || []}
        isError={isError}
        isLoading={isLoading}
      />
    </div>
  );
};

export default Guests;
