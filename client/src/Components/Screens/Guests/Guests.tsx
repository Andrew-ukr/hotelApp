import React from "react";
import { Button } from "../../UI";
import { useGetAllGuestsQuery } from "../../../Redux/Slices/guests/guestsApi";

import GuestsTable from "../../Table/GuestsTable/GuestsTable";

const Guests = () => {
  const { data: guests, isLoading, isError } = useGetAllGuestsQuery();

  return (
    <div className="flex flex-col grow overflow-auto">
      <div className="font-medium text-xs text-app-grey-400 mb-4">Guests</div>
      <div className="flex justify-end py-4">
        <Button>+ Add Guest</Button>
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
