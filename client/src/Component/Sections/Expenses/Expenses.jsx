import React, { useEffect, useState } from 'react'
import "./Expense.css"
import { FcOk } from "react-icons/fc";
import axios from 'axios';
import { useSelector } from 'react-redux';
function Expenses() {
    const [expenses, setExpenses] = useState([])

    const { user } = useSelector((state) => {
        return state
    })
    const userId = user.details._id
    useEffect(() => {
        (async function () {
            let { data } = await axios.get("/user/get-all-expense", { params: { userId } })
            console.log(data,"data");
            if (!data.err) {
                setExpenses(data.expenses)
            }
        })()
    }, [])
    console.log(expenses);
    return (
        <>
            <div className="expense-sec">
                {expenses?.map((item) => {
                    return <div className="expense-sec-det">

                        <div className="icon-sec">
                            <FcOk className='icon'></FcOk>
                        </div>
                        <div className="exp-details">
                            <div className="exp-det-head">
                                <h3>
                                    {item.category}
                                </h3>
                            </div>
                            <div className="exp-det-desc">
                                <p>
                                    {item.description}
                                </p>
                            </div>
                        </div>
                        <div className="exp-date exp-det-head">
                            <h3>{item.amount} ₹</h3>
                            <p>{new Date(item.date).toDateString()}</p>
                        </div>
                    </div>
                })}



            </div>


        </>
    )
}

export default Expenses