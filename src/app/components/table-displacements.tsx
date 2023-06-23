"use client";
import { JSXElementConstructor, useContext, useEffect, useState } from "react";

import MyModal from "./myModal";

import { MainContextData, myContext } from "@/context/MainContext";
import { DisplacementsData } from "@/interfaces/types";
import { fetchApi } from "@/utils/api";
import { formatDate } from "@/utils/functions";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import DeleteIcon from "@mui/icons-material/Delete";
import PlayCircleFilledIcon from "@mui/icons-material/PlayCircleFilled";
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
  data: DisplacementsData[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Form: JSXElementConstructor<any>;
  deleteData: (id: string) => void;
}

const URL_CLIENT = "https://api-deslocamento.herokuapp.com/api/v1/Cliente/";
const URL_CONDUCTORS = "https://api-deslocamento.herokuapp.com/api/v1/Condutor";
const URL_VEHICLE = "https://api-deslocamento.herokuapp.com/api/v1/Veiculo/";

function TableDisplacements({
  headers,
  data,
  Form,
  deleteData
}: TableInfoProps) {
  const [selectId, setSelectId] = useState("");
  const [open, setOpen] = useState(false);
  const {
    clients,
    conductors,
    vehicles,
    setClients,
    setConductors,
    setVehicles
  } = useContext<MainContextData>(myContext);

  useEffect(() => {
    const fetchClients = async () => {
      const data = await fetchApi(URL_CLIENT);
      setClients(data);
    };
    const fetchConductors = async () => {
      const data = await fetchApi(URL_CONDUCTORS);
      setConductors(data);
    };
    const fetchVehicles = async () => {
      const data = await fetchApi(URL_VEHICLE);
      setVehicles(data);
    };
    fetchClients();
    fetchConductors();
    fetchVehicles();
  }, []);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const finishDisplacements = (id: string) => {
    setSelectId(id);
    setOpen(true);
  };

  const attSelectId = () => {
    setSelectId("");
  };

  const findClientName = (displacement: DisplacementsData) => {
    const findClient = clients.find(
      (client) => client.id == displacement.idCliente
    );
    if (findClient) return findClient.nome;

    return "";
  };

  const findVehicleName = (displacement: DisplacementsData) => {
    const findVehicle = vehicles.find(
      (vehicle) => vehicle.id == displacement.idVeiculo
    );
    if (findVehicle) return findVehicle.marcaModelo;

    return "";
  };

  const findConductorName = (displacement: DisplacementsData) => {
    const findConductor = conductors.find(
      (conductor) => conductor.id == displacement.idCondutor
    );
    if (findConductor) return findConductor.nome;

    return "";
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
          <TableCell key={"startIcon"}></TableCell>
        </TableHead>
        <TableBody>
          {data.map((displacement) => (
            <TableRow key={displacement.id} className="MuiTableRow-hover">
              <TableCell className="MuiTableCell">{displacement.id}</TableCell>
              <TableCell className="MuiTableCell">
                {displacement.kmInicial}
              </TableCell>
              <TableCell className="MuiTableCell">
                {displacement.kmFinal}
              </TableCell>
              <TableCell className="MuiTableCell">
                {formatDate(displacement.inicioDeslocamento)}
              </TableCell>
              <TableCell className="MuiTableCell">
                {displacement.fimDeslocamento &&
                  formatDate(displacement.fimDeslocamento)}
              </TableCell>
              <TableCell className="MuiTableCell">
                {displacement.checkList}
              </TableCell>
              <TableCell className="MuiTableCell">
                {displacement.motivo}
              </TableCell>
              <TableCell className="MuiTableCell">
                {displacement.observacao}
              </TableCell>
              <TableCell className="MuiTableCell">
                {findConductorName(displacement)}
              </TableCell>
              <TableCell className="MuiTableCell">
                {findVehicleName(displacement)}
              </TableCell>
              <TableCell className="MuiTableCell">
                {findClientName(displacement)}
              </TableCell>
              <TableCell className="MuiTableCell">
                <DeleteIcon
                  style={{ cursor: "pointer" }}
                  onClick={() => deleteData(String(displacement.id))}
                />
              </TableCell>
              <TableCell className="MuiTableCell">
                {!displacement.fimDeslocamento ? (
                  <PlayCircleFilledIcon
                    style={{ cursor: "pointer", color: "green" }}
                    onClick={() => finishDisplacements(String(displacement.id))}
                  />
                ) : (
                  <CheckCircleOutlineIcon
                    style={{ cursor: "pointer", color: "blue" }}
                    onClick={() => finishDisplacements(String(displacement.id))}
                  />
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
}
export default TableDisplacements;
