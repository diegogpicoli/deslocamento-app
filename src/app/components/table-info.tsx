"use client";
import { JSXElementConstructor, useState } from "react";

import MyModal from "./modal";

import {
  ClientData,
  ConductorData,
  DisplacementsData,
  VehiclesData
} from "@/interfaces/types";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from "@mui/material";

interface TableInfoProps {
  headers: string[];
  data: ClientData[] | ConductorData[] | VehiclesData[] | DisplacementsData[];
  Form: JSXElementConstructor<any>;
}

function TableInfo({ headers, data, Form }: TableInfoProps) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ marginTop: "30px" }}>
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <MyModal
          open={open}
          handleOpen={handleOpen}
          handleClose={handleClose}
          Form={Form}
        />
      </Box>
      <Table sx={{ maxWidth: "1150px" }} className="MuiTable">
        <TableHead>
          {headers.map((header, index) => (
            <TableCell key={index}>{header}</TableCell>
          ))}
          <TableCell key={"deleteIcon"}></TableCell>
          <TableCell key={"EditIcon"}></TableCell>
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
                <TableCell>
                  <EditIcon />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Box>
  );
}
export default TableInfo;
