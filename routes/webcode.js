import express from "express"
import webSchema from "../models/webSchema.js"

const router=express.Router()

router.post("/post",async(req,res)=>{
    try{
        const {title,mark,batch,submittedOn}=req.body

        const newWeb=new webSchema({title,mark,batch,submittedOn})

        await newWeb.save()

        newWeb ? res.status(200).json({message:"web code submitted successfully"}) :
         res.status(400).json({message:"unable to submit web code"})
    }
    catch(error){
        console.error("error from web code",error)
        res.status(500).json({message:"internal server error"})
    }
})

router.get("/get",async(req,res)=>{
    try{
        const data= await webSchema.find()
        data ? res.status(200).json(data) : res.status(400).json({message:"unable to fetch data"})
    }
    catch(error){
        console.error(error,"from /get web code")
        res.status(500).json({message:"internal server error"})
    }
})
export default router