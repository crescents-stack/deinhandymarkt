"use client";

import {
  ColumnDef,
  SortingState,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  useReactTable,
  getPaginationRowModel,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ReactNode, useState } from "react";
import { Input } from "@/components/ui/input";
import { DataTableViewOptions } from "./datatable-view-options";
import { useAuthContext } from "@/lib/contexts/auth-context-provider";

export type TFilterInputField =
  | { id: number; placeholder: string; columnAccessor: string }[]
  | undefined;
interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  addButton?: ReactNode;
  filterInputFields?: TFilterInputField;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  addButton,
  filterInputFields = [
    {
      id: 1,
      placeholder: "Filter by name...",
      columnAccessor: "name",
    },
  ],
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [rowSelection, setRowSelection] = useState({});
  const { auth } = useAuthContext();

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
      columnFilters,
      rowSelection,
    },
  });

  return (
    <div className="bg-white px-4 rounded-[10px]">
      <div className="flex items-center justify-end gap-4 flex-wrap py-4">
        {/* <div className="flex flex-wrap gap-4">
          {filterInputFields.map((field: any) => {
            const { id, placeholder, columnAccessor } = field;
            return (
              <Input
                key={id}
                placeholder={placeholder}
                value={
                  (table
                    .getColumn(columnAccessor)
                    ?.getFilterValue() as string) ?? ""
                }
                onChange={(event) =>
                  table
                    .getColumn(columnAccessor)
                    ?.setFilterValue(event.target.value)
                }
                className="max-w-sm"
              />
            );
          })}
        </div> */}
        <div className="flex items-center gap-4">
          <DataTableViewOptions table={table} />
          {addButton}
        </div>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      className="font-semibold bg-gray-100"
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="py-[4px]">
                      {cell.column.id !== "Actions"
                        ? flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )
                        : null}
                      {cell.column.id === "Actions" && auth?.role === "admin"
                        ? flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )
                        : null}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-start md:justify-end gap-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of&nbsp;
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>

        <div className="flex items-center justify-end space-x-2 py-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
