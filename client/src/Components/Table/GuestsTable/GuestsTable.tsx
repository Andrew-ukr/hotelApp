import React from "react";
import SyncLoader from "react-spinners/SyncLoader";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useNavigate } from "react-router-dom";
import { Guest } from "../../../Types/guests";
import { TEXT_NO_DATA } from "../../../Utils/constants";
import { Button, Icon } from "../../UI";
import { useDeleteGuestMutation } from "../../../Redux/Slices/guests/guestsApi";

type TableTypes = {
  isLoading: boolean;
  isError: boolean;
  data: Guest[] | [];
};

const GuestsTable = ({ isLoading: loading, isError, data }: TableTypes) => {
  const [deleteGuest, { isLoading: deleting }] = useDeleteGuestMutation();
  const navigate = useNavigate();
  const columnHelper = createColumnHelper<Guest>();
  
  const isLoading = loading || deleting;

  const onDeleteGuest = async (
    e: React.MouseEvent<HTMLButtonElement>,
    id: string
  ) => {
    e.stopPropagation();
    try {
      await deleteGuest(id).unwrap();
    } catch (error) {}
  };

  const columns = [
    columnHelper.accessor("firstName", {
      header: () => "Name",
    }),
    columnHelper.accessor("lastName", {
      header: () => "Surname",
    }),
    columnHelper.accessor("phone", {
      header: () => "Phone",
    }),
    columnHelper.accessor("email", {
      header: () => "Email",
    }),
    columnHelper.accessor("city", {
      header: "City",
    }),
    columnHelper.accessor("passportNumber", {
      header: "Passport",
    }),
    // temporary commented, to do: delete and edit icons

    columnHelper.accessor("_id", {
      header: "",
      cell: ({ row }) => {
        return (
          <div className="flex gap-1">
            <Button
              className="!p-1 !h-6"
              onClick={(e) => {
                e.stopPropagation();
                console.log("hello");
              }}
            >
              <Icon name="PencilSimple" color="white"></Icon>
            </Button>
            <Button
              className="!p-1 !h-6 bg-app-red-600"
              onClick={(e) => onDeleteGuest(e, row.original._id)}
            >
              <Icon name="Trash" color="white"></Icon>
            </Button>
          </div>
        );
      },
      size: 100
    }),
  ];

  const onRowClick = (id: string) => {
    navigate(`/guest/${id}`);
  };

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const noData = (
    <div className="flex justify-center py-6 text-app-grey-500">
      {TEXT_NO_DATA}
    </div>
  );
  return (
    <div className="flex flex-col overflow-auto grow">
      {isLoading && (
        <div className="flex items-center justify-center w-full grow">
          <SyncLoader color="#1570ef" />
        </div>
      )}
      {!isLoading && !isError && !!data.length && (
        <table className="max-w-full border rounded border-app-grey-50">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className="sticky top-0 bg-app-blue-50">
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="px-6 py-2 text-xs text-left truncate text-app-grey-500"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                className="border border-app-grey-50 hover:bg-app-blue-50 hover:bg-opacity-50"
                onClick={() => onRowClick(row?.original?._id)}
              >
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className="max-w-[200px] text-sm text-app-grey-600 py-4 px-6 text-left truncate cursor-pointer w-fit"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {!isLoading && !isError && !data.length && noData}
    </div>
  );
};

export default GuestsTable;
