import React, { JSXElementConstructor, useEffect } from "react";

import { Button, Box, Modal } from "@mui/material";

interface ModalProps {
  open: boolean;
  handleOpen: () => void;
  handleClose: () => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Form: JSXElementConstructor<any>;
  selectId: string;
  attSelectId: () => void;
}

const MyModal: React.FC<ModalProps> = ({
  open,
  handleOpen,
  handleClose,
  Form,
  selectId,
  attSelectId
}) => {
  const style = {
    position: "absolute" as const,
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 600,
    height: 550,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    overflow: "auto"
  };

  useEffect(() => {
    console.log("teste");
    return () => {
      attSelectId();
    };
  }, []);

  const newModal = () => {
    attSelectId();
    handleOpen();
  };

  return (
    <Box>
      <Button onClick={newModal}>Novo</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Form handleClose={handleClose} selectId={selectId} />
        </Box>
      </Modal>
    </Box>
  );
};

export default MyModal;
