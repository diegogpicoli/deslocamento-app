import React, { JSXElementConstructor } from "react";

import { Button, Box, Modal } from "@mui/material";

interface ModalProps {
  open: boolean;
  handleOpen: () => void;
  handleClose: () => void;
  Form: JSXElementConstructor<any>;
}

const MyModal: React.FC<ModalProps> = ({
  open,
  handleOpen,
  handleClose,
  Form
}) => {
  const style = {
    position: "absolute" as const,
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 600,
    height: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    overflow: "auto"
  };

  return (
    <Box>
      <Button onClick={handleOpen}>Novo</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Form />
        </Box>
      </Modal>
    </Box>
  );
};

export default MyModal;
