"use client";
import { JSXElementConstructor, useState } from "react";

import MyModal from "./myModal";

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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Form: JSXElementConstructor<any>;
  deleteData: (id: string) => void;
}

function TableInfo({ headers, data, Form, deleteData }: TableInfoProps) {
  const [selectId, setSelectId] = useState("");
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpenEdit = (id: number) => {
    setSelectId(String(id));
    setOpen(true);
  };

  const attSelectId = () => {
    setSelectId("");
  };

  return (
    <Box sx={{ marginTop: "30px" }}>
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <MyModal
          selectId={selectId}
          attSelectId={attSelectId}
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
                  <DeleteIcon
                    style={{ cursor: "pointer", color: "red" }}
                    onClick={() => deleteData(String(item.id))}
                  />
                </TableCell>
                <TableCell>
                  <EditIcon
                    style={{ cursor: "pointer", color: "blue" }}
                    onClick={() => handleOpenEdit(item.id)}
                  />
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
