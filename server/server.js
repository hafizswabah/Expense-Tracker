import express from "express";
import cookieParser from "cookie-parser";
import path from 'path'
import DBConnect from "./Config/DBConnect.js";
import UserAuthRouter from "./Router/UserAuthRouter.js"
import UserRouter from "./Router/UserRouter.js"
import cors from "cors"
const app = express()
app.use(
  cors({
    origin: [
      "https://tripifi.netlify.app",
      "http://localhost:3000",
      "http://localhost:4173"
    ],
    credentials: true,
  })
);
app.use(express.json({ limit: '50mb' }))
app.use(cookieParser());
app.use(express.urlencoded({ extended: true, limit: '50mb' }))
app.use(express.static(path.resolve() + "/public"))
DBConnect()
app.use("/user/auth", UserAuthRouter)
app.use("/user/", UserRouter)
app.listen(8888, () => { console.log("Server running at 8888"); })