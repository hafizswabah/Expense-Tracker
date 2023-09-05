import axios from 'axios';
import React, { useState } from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';


const AddExpense = ({ showModal, handleCloseModal,  }) => {


  return (
    <Modal show={showModal} onHide={handleCloseModal} centered dialogClassName="modal-md">
      <Modal.Header closeButton>
        <Modal.Title>Add Your Expense</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
   
          <Row>
            <Col>
              <Form.Group className="mb-3" controlId="slots">
                <Form.Control type="text" style={{ width: '100%' }} placeholder='V' value={visitPlaces} onChange={(e) => { setPlaces(e.target.value) }} />
              </Form.Group>
            </Col>
          </Row>
        </Form>
      </Modal.Body>
      <Modal.Footer className="justify-content-center">
        <Button variant="secondary" onClick={handleCloseModal} className="flex-grow-1">
          Close
        </Button>
        <Button variant="primary" className="flex-grow-1">
       Add Expense
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddPackageModal;