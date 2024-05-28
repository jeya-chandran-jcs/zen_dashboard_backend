import mongoose from "mongoose";
import express from "express";
import classModel from "../models/classSchema.js";

const router=express.Router()

router.post("/post",async(req,res)=>{
    try{
        const {title,date,content,preRead}=req.body

        const newClass=new classModel({title,date,content,preRead})

        await newClass.save()

        newClass ? res.status(200).json({message:"Class created successfully"}) :
         res.status(400).json({message:"unable to create class"})
    }
    catch(error){
        console.error("error from class",error)
        res.status(500).json({message:"internal server error"})
        }
})

router.get("/get",async(req,res)=>{
    try{
        const data= await classModel.find()
        data ? res.status(200).json(data) : res.status(400).json({message:"unable to fetch data"})
    }
    catch(error){
        console.error(error,"from /get class")
        res.status(500).json({message:"internal server error"})
    }
})

export default router