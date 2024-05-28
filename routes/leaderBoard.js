import express from "express";
import leadermodel from "../models/leaderSchema.js";
const router = express.Router();

router.post("/post",async(req,res)=>{
    try{
        const {name,batch,learning}=req.body

        const newLeader=new leadermodel({name,batch,learning})

        await newLeader.save()

        newLeader ? res.status(201).json({message:"leaderboard created successfully"}) :
         res.status(400).json({message:"unable to create leaderboard"})
    }
    catch(error){
        console.error(error,"from leader board")
        res.status(500).json({message:"internal server error"})
    }
})

router.get("/get",async(req,res)=>{
    try{
        const data= await leadermodel.find()
        data ? res.status(200).json(data) : res.status(400).json({message:"unable to fetch data"})
    }
    catch(error){
        console.error(error,"from leader board")
        res.status(500).json({message:"internal server error"})
    }
})

export default router