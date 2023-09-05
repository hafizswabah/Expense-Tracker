import React, { useState } from 'react'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { FiPieChart, FiShare } from 'react-icons/fi'
import { FaGavel } from "react-icons/fa";
import { RiHome4Line } from "react-icons/ri";
import Swal from 'sweetalert2';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import "./NavBar.css"
import HomeSection from '../Sections/HomeSection';
function NavBar() {

    const dispatch = useDispatch()
    const [value, setValue] = useState(0);
    const [bg, setBg] = useState("home");
    const [activeTab, setActiveTab] = useState(false);

    const handleChange = (event, newValue) => {
        setValue(newValue);

    };

    function handleLogout() {
        setBg("Logout")
        Swal.fire({
            title: 'Do you want to logout',
            text: "Are you sure ?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: 'red',
            cancelButtonColor: '##a8a8a8',
            confirmButtonText: 'Yes,Logout!'
        }).then(async (result) => {
            if (result.isConfirmed) {

                await axios.get("/user/auth/logout");
                dispatch({ type: "refresh" })
            }
        })
    }
    return (
        <>

            <div className="nav-bar">
                <Tabs
                    value={value}
                    onChange={handleChange}
                    aria-label="icon label tabs example"
                    variant="fullWidth"
                    TabIndicatorProps={{ style: { display: 'none' } }}

                >
                    <Tab
                        icon={<RiHome4Line />}
                        label="Home"
                        style={{
                            flex: 1,
                            background: `${bg == "home" ? "#FF4A2C" : ""}`,
                            color: `${bg == "home" ? "white" : ""}`,
                            borderRadius: `${bg == "home" ? "30px" : ""}`,
                        }}
                        onClick={() => { setBg("home") }}

                    />
                    <Tab
                        icon={<FiPieChart />}
                        label="Add Expense"
                        style={{
                            flex: 1,
                            background: `${bg == "Add Expense" ? "#FF4A2C" : ""}`,
                            color: `${bg == "Add Expense" ? "white" : ""}`,
                            borderRadius: `${bg == "Add Expense" ? "30px" : ""}`,
                        }}
                        onClick={() => { setBg("Add Expense") }}
                    />

                    <Tab
                        icon={<FaGavel />}
                        label="Expenses"
                        style={{
                            flex: 1,
                            background: `${bg == "Expenses" ? "#FF4A2C" : ""}`,
                            color: `${bg == "Expenses" ? "white" : ""}`,
                            borderRadius: `${bg == "Expenses" ? "30px" : ""}`,
                        }}
                        onClick={() => { setBg("Expenses") }}
                    />

                    <Tab
                        icon={<FiShare />}
                        label="Logout"
                        style={{
                            flex: 1,
                            background: `${bg == "Logout" ? "#FF4A2C" : ""}`,
                            color: `${bg == "Logout" ? "white" : ""}`,
                            borderRadius: `${bg == "Logout" ? "30px" : ""}`,
                        }}
                        onClick={handleLogout}

                    />
                </Tabs>

            </div>
            <div className="complete-sec">
                {bg == 'home' && <HomeSection />}
            </div>
        </>
    )
}

export default NavBar