import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import "./HomeSection.css"
import { RiEditCircleFill } from "react-icons/ri";

import axios from 'axios';
import AddMonthlyExpenseModal from '../Modal/AddMonthlyExpenseModal';
function HomeSection() {
    const [modalShow, setModalShow] = useState(false)
    const [monthlyExpense, setMonthlyExpense] = useState(0)

    const { user } = useSelector((state) => {
        return state
    })
    const userId = user.details._id

    function handleShowEdit() {
        setModalShow(true)
    }
    function handleClose() {
        setModalShow(false)
    }
    useEffect(() => {
        (async function () {
            let { data } = await axios.get("/user/get-expense", { params: { userId } })
            if (!data.err) {
                setMonthlyExpense(data.MonthlyExpense)
            }
        })()
    }, [monthlyExpense])

    return (
        <>
            <div className="home-com-sec">
                <div className="home-sec-det">
                    <h3 className='home-sec-user'>Welcome {user.details.name}</h3>
                    <div className="spent-det">
                        <p>spent</p>
                    </div>
                    <div className="spent-mon">
                        <h2> ₹1000 / ₹{monthlyExpense}</h2>
                        <div className='edit-sec' onClick={handleShowEdit}>
                            <p>Edit</p>
                            <RiEditCircleFill className='edit-icon' />
                        </div>
                    </div>
                    <div className="spent-det">
                        <p>Balance</p>
                    </div>
                    <div className="spent-mon">
                        <h3> ₹1000 </h3>
                    </div>
                    <div className="spent-det">
                        <p>Month</p>
                    </div>
                    <div className="spent-mon">
                        <h4> sep </h4>
                    </div>
                </div>

            </div>


            <AddMonthlyExpenseModal
                modalShow={modalShow}
                handleClose={handleClose}
            />


        </>
    )
}

export default HomeSection