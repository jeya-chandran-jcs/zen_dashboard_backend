import express from "express"
import mongoose from "mongoose"
import * as dotenv from "dotenv"
import cors from "cors"
import authentication  from "./middleware.js"
import capstoneRouter from "./routes/capstone.js"
import classRouter from "./routes/class.js"
import leaderBoardRouter from "./routes/leaderBoard.js"
import leaveRouter from "./routes/leave.js"
import studentRouter from "./routes/student.js"
import taskRouter from "./routes/task.js"
import userProfileRouter from "./routes/userProfile.js"
import webCodeRouter from "./routes/webcode.js"

dotenv.config()
const app=express()
app.use(express.json())


app.use(cors())
const Mongo_URL=process.env.MONGO_URl
const POrt=5000

mongoose.connect(Mongo_URL)
.then(()=>{
    console.log("MongoDB connected")
    })
.catch(err=>
    {  console.log("db connnection error",err) })


app.use("/api/student",studentRouter)
app.use("/api/profile",userProfileRouter)
app.use("/api/class",authentication,classRouter)
app.use("/api/capstone",authentication,capstoneRouter)
app.use("/api/leave",authentication,leaveRouter)
app.use("/api/task",authentication,taskRouter)
app.use("/api/webcode",authentication,webCodeRouter)
app.use("/api/leaderboard",authentication,leaderBoardRouter)


app.listen(POrt,()=>{console.log("server is running",POrt)})