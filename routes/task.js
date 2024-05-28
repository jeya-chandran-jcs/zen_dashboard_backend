import express from "express"
import taskModel from "../models/taskSchema.js"
const router=express.Router()

router.post("/post",async(req,res)=>{
    try{
        const {day,task,title,frontEndCode,frontEndURL,backEndCode,backEndURL}=req.body

        const newTask=new taskModel(
            {day,task,title,frontEndCode,frontEndURL,backEndCode,backEndURL})

        await newTask.save()

        newTask ? res.status(200).json({message:"task created successfully"}) :
         res.status(400).json({message:"unable to create task"})
    }
    catch(error){
        console.error("error from task",error)
        res.status(500).json({message:"internal server error"})
    }
})

router.get("/get",async(req,res)=>{
    try{
        const data= await taskModel.find()
        data ? res.status(200).json(data) : res.status(400).json({message:"unable to fetch data"})
    }
    catch(error){
        console.error(error,"from /get task")
        res.status(500).json({message:"internal server error"})
    }
})

export default router