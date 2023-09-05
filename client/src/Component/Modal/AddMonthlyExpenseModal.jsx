import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { useSelector } from 'react-redux';

function AddMonthlyExpenseModal({ modalShow, handleClose }) {
  const { user } = useSelector((state) => {
    return state
  })
  const _id = user.details._id
  const [monthlyExpense, setMonthlyExpense] = useState(null)
  async function updateMonthlyExpense(e) {
    e.preventDefault()
    if(monthlyExpense!=null){
      let { data } = await axios.post("/user/update-monthlyExpense", { _id, monthlyExpense, })
      handleClose()
    }

  }

  return (
    <Modal show={modalShow} centered>
      <Modal.Header closeButton onClick={handleClose}>
        <Modal.Title>Monthly Income</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Control type="number" placeholder="Enter Monthly total Income" autoFocus onChange={(e) => { setMonthlyExpense(e.target.value) }} />
          </Form.Group>

        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={updateMonthlyExpense} style={{background:" #FF464D"}}>
          Update
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default AddMonthlyExpenseModal;
