import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { useSelector } from 'react-redux';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
function AddExpense({ modalShow, handleClose }) {
    const { user } = useSelector((state) => {
        return state
    })
    const _id = user.details._id
    const [state, setState] = React.useState({

        vertical: 'bottom',
        horizontal: 'center',
    });
    const { vertical, horizontal } = state;
    const [expense, setExpense] = useState(null)
    const [category, setCategory] = useState(null)
    const [description, setDescription] = useState(null)
    const [open, setOpen] = useState(false);
    const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });

    const handleCloseSnackBar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };
    async function handleAddExpense(e) {
        e.preventDefault()
        if (expense != null) {

            let { data } = await axios.post("/user/add-expense", { expense, category, description })
        } else {

            setOpen(true);
        }
        console.log(expense, category, description);

    }


    return (
        <>

            <Modal show={modalShow} centered>
                <Modal.Header closeButton onClick={handleClose}>
                    <Modal.Title>Add Expense</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form style={{ margin: "0px", width: "100%" }}>
                        <Form.Group className="mb-3 w-100" controlId="exampleForm.ControlInput1">
                            <Form.Control type="number" placeholder="Enter Amount" autoFocus onChange={(e) => { setExpense(e.target.value) }} />
                        </Form.Group>
                        <Form.Group className="mb-3 w-100" controlId="exampleForm.ControlInput1">
                            <Form.Select className="form-select-sm" onChange={(e) => { setCategory(e.target.value) }}>
                                <option value="Food">Food</option>
                                <option value="Rent">Rent</option>
                                <option value="Enterteiment">Enterteiment</option>
                                <option value="Gadgets">Gadgets</option>
                                <option value="Petrol">Petrol</option>
                                <option value="Maintenance">Maintenance</option>
                                <option value="Emi">Emi</option>
                                <option value="Hospital Case">Hospital Case</option>
                                <option value="Others">Others</option>
                            </Form.Select >
                        </Form.Group>
                        <Form.Group className="mb-3 w-100" controlId="exampleForm.ControlInput1">
                            <Form.Control type="text" placeholder="add descripttion" autoFocus onChange={(e) => { setDescription(e.target.value) }} />
                        </Form.Group>

                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleAddExpense} style={{ background: " #FF464D" }}>
                        ADD
                    </Button>
                </Modal.Footer>
            </Modal>

            <Snackbar open={open} autoHideDuration={2000} onClose={handleCloseSnackBar} key={vertical + horizontal} anchorOrigin={{ vertical, horizontal }}>
                <Alert severity="error">Please Enter Amount!</Alert>

            </Snackbar>
        </>
    );
}

export default AddExpense;
