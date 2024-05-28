import express from "express"
import capstoneModel from "../models/capstone.js"

const router =express.Router()

router.post("/post",async(req,res)=>{
    try{
        const {comment,frontendUrl,backendUrl,frontendCode,backendCode}=req.body

        const newCapstone= new capstoneModel({comment,frontendUrl,backendUrl,frontendCode,backendCode})
   
        await newCapstone.save()

        newCapstone ? res.status(201).json({message:"capstone successfully submitted"}) :
         res.status(400).json({message:"unable to submit capstone"})
    }
    catch(error){
        console.error(error,"from /post capstone")
        res.status(500).json({message:"internal server error"})
    }
})

router.get("/get",async(req,res)=>{
 try{
    const data= await capstoneModel.find()
    data ? res.status(200).json(data) : res.status(400).json({message:"unable to fetch data"})
 }
 catch(error){
    console.error(error,"from /get capstone")
    res.status(500).json({message:"internal server error"})
}
})

export default router