import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import "./HomeSection.css"
import { RiEditCircleFill } from "react-icons/ri";
function HomeSection() {
   const [showEdit, setShowEdit] = useState(false)

    const { user } = useSelector((state) => {
        return state
    })

    function handleShowEdit() {
        setShowEdit(true)
    }

    return (
        <div className="home-com-sec">
            <div className="home-sec-det">
                <h3 className='home-sec-user'>Welcome {user.details.name}</h3>
                <div className="spent-det">
                    <p>spent</p>
                </div>
                <div className="spent-mon">
                    <h2> ₹1000 / ₹5000</h2>
                    <div className='edit-sec' onClick={handleShowEdit}>
                        <p>Edit</p>
                        <RiEditCircleFill className='edit-icon' />
                    </div>
                </div>
            </div>

        </div>
    )
}

export default HomeSection