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

type TableTypes = {
  isLoading: boolean;
  isError: boolean;
  data: Guest[] | [];
};

const GuestsTable = ({ isLoading, isError, data }: TableTypes) => {
  const navigate = useNavigate();

  const columnHelper = createColumnHelper<Guest>();

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

    // columnHelper.accessor("_id", {
    //   header: "",
    //   cell: (prop) => console.log(prop),
    // }),
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
    <div className="flex justify-center py-6 text-app-grey-500">no data</div>
  );
  return (
    <div className="flex flex-col grow overflow-auto">
      {isLoading && (
        <div className="flex justify-center items-center grow w-full">
          <SyncLoader color="#1570ef" />
        </div>
      )}
      {!isLoading && !isError && data.length && (
        <table className="border border-app-grey-50 rounded max-w-full">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className="bg-app-blue-50 sticky top-0">
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="text-xs text-app-grey-500 py-2 px-6 text-left truncate"
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
                    className="max-w-[200px] text-sm text-app-grey-600 py-4 px-6 text-left truncate cursor-pointer"
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
