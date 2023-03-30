/* eslint-disable no-unused-vars */
import React from 'react';
import {
  Modal, Button,
} from 'react-bootstrap';
import useRootData from '../../hooks/useRootData';

const AlertModal = () => {
  const {
    alertModalVisibility, alertModalContent, changeAlertModalVisibility,
  } = useRootData(({ appStore }) => ({
    alertModalVisibility: appStore.alertModalVisibility.get(),
    alertModalContent: appStore.alertModalContent.get(),

    changeAlertModalVisibility: appStore.changeAlertModalVisibility,
  }));

  return (
    <Modal show={alertModalVisibility} onHide={() => changeAlertModalVisibility(false)}>
      <Modal.Header closeButton />
      <Modal.Body>{alertModalContent}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => changeAlertModalVisibility(false)}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AlertModal;
