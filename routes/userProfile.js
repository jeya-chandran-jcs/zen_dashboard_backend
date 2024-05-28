import express from "express";
import userModel from "../models/studentSchema.js";
const router = express.Router();

router.get("/getAllStudents",async(req,res)=>{
    try{
        const user= await userModel.find()
        res.status(200).json({students:user})
    }
    catch(error){
        console.error(error,"from /getAllStudents")
        res.status(500).json({message:"internal server error"})
    }
})

router.get("/getStudent/:id",async(req,res)=>{
    const studentId=req.params.id
    try{
        const user=await userModel.findById(studentId)
        if(!user){
            return res.status(404).json({message:"user not found"})
        }
        res.status(200).json({user})
    }
    catch(error){
        console.error(error,"from /getStudent")
        res.status(500).json({message:"internal server error"})
    }
})


router.put("/updateStudent/:id",async(req,res)=>{
    const studentId=req.params.id
    const {name,phone}=req.body
    try{
        const user= await userModel.findById(studentId)
        if(!user){
            return res.status(404).json({message:"user not found"})
        }
        user.name=name
        user.phone=phone
        await user.save()
       
        res.status(200).json({message:"updated successfully"})
    }
    catch(error){
        console.error(error,"from /updateStudent")
        res.status(500).json({message:"internal server error"})
    }
})


export default router