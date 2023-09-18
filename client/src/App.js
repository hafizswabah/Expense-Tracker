import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom'
import Signup from './Component/Signup/Signup'
import HomePage from "./Component/NavBar/HomePage"
import axios from "axios"
import { useSelector, useDispatch } from "react-redux"
import { useEffect } from 'react';
function App() {
  axios.defaults.withCredentials = true;
  axios.defaults.baseURL = "https://expense-tracker-uydk.onrender.com";
  const { user, refresh } = useSelector((state) => {
    return state
  })
  const dispatch = useDispatch()
  useEffect(() => {
    (async function () {
      let { data } = await axios.get("/user/auth/check")
      console.log("user:", data);
      dispatch({ type: "user", payload: { login: data.loggedIn, details: data.user } })
    })()
  }, [refresh])
  return (
    <div className="App">
      <Routes>
        {user.login &&
          <>
            <Route path="/signup" element={<Navigate to={"/"} />} />
            <Route path={"/"} element={<HomePage/>}/>
          </>
        }
        {user.login == false &&
          <>
            <Route path="/signup" element={<Signup />} />
            <Route path="/" element={<Navigate to={"/signup"} />} />
          </>}

      </Routes>
    </div>
  );
}

export default App;
