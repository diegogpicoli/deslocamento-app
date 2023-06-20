"use client";
import {
  ClientData,
  ConductorData,
  DisplacementsData,
  VehiclesData
} from "@/interfaces/types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from "@mui/material";

interface TableInfoProps {
  headers: string[];
  data: ClientData[] | ConductorData[] | VehiclesData[] | DisplacementsData[];
}

function TableInfo({ headers, data }: TableInfoProps) {
  return (
    <Table sx={{ maxWidth: "1150px" }} className="MuiTable">
      <TableHead>
        {headers.map((header, index) => (
          <TableCell key={index}>{header}</TableCell>
        ))}
      </TableHead>
      <TableBody>
        {data.map((item, index) => {
          return (
            <TableRow key={index} className="MuiTableRow-hover">
              {Object.values(item).map((value, index) => (
                <TableCell key={index} className="MuiTableCell">
                  {String(value)}
                </TableCell>
              ))}
              <TableCell>
                <DeleteIcon />
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
export default TableInfo;
