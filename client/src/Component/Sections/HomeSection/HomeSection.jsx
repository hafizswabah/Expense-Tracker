import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import "./HomeSection.css"
import { RiEditCircleFill } from "react-icons/ri";

import axios from 'axios';
import AddMonthlyExpenseModal from '../../Modal/AddMonthlyExpenseModal';
function HomeSection() {
    const [modalShow, setModalShow] = useState(false)
    const [monthlyExpense, setMonthlyExpense] = useState(0)
    const [spent, setSpent] = useState(0)
  

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
    }, [monthlyExpense,modalShow])
    useEffect(() => {
        (async function () {
            let { data } = await axios.get("/user/get-totalExpense", { params: { userId } })
            if (!data.err) {
                setSpent(data.totalspent)
            }
        })()
    }, [monthlyExpense,modalShow])
    const balance=monthlyExpense-spent
    const currentDate=new Date()
    const currentMonth=currentDate.toLocaleDateString("default",{month:"long"})
    const currentYear = currentDate.getFullYear();

    return (
        <>
            <div className="home-com-sec">
                <div className="home-sec-det">
                    <h3 className='home-sec-user'>Welcome {user.details.name}</h3>
                    <div className="spent-det">
                        <p>spent</p>
                    </div>
                    <div className="spent-mon">
                        <h2> {spent} / ₹{monthlyExpense}</h2>
                        <div className='edit-sec' onClick={handleShowEdit}>
                            <p>Edit</p>
                            <RiEditCircleFill className='edit-icon' />
                        </div>
                    </div>
                    <div className="spent-det">
                        <p>Balance</p>
                    </div>
                    <div className="spent-mon">
                        <h2> ₹{balance} </h2>
                    </div>
                    <div className="spent-det">
                        <p>Month</p>
                    </div>
                    <div className="spent-mon">
                        <h2> {currentMonth} {currentYear}</h2>
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