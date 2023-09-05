import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

function AddMonthlyExpenseModal({ modalShow, handleClose }) {
  return (
    <Modal show={modalShow} centered>
      <Modal.Header closeButton onClick={handleClose}>
        <Modal.Title>Monthly Income</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Control type="number" placeholder="Enter Monthly total Income" autoFocus />
          </Form.Group>
        
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleClose}>
          Update 
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default AddMonthlyExpenseModal;
