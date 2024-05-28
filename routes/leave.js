import express from "express";
import leaveModel from "../models/leaveSchema.js";

const router = express.Router();

router.post("/post", async (req, res) => {
    try{
        const {reason,appliedOn}=req.body

        if(!reason || !appliedOn){
            return res.status(400).json({message:"please fill all the fields"})
    }

    const newLeave = new leaveModel({reason,appliedOn})

    await newLeave.save()
    newLeave ? res.status(201).json({message:"leave applied successfully"}) :
     res.status(400).json({message:"unable to apply leave"})
}
    catch(error){
        console.error(error,"from /post leave")
        res.status(500).json({message:"internal server error"})
    }
})

router.get("/get",async(req,res)=>{
    try{
        const data= await leaveModel.find()
        data ? res.status(200).json(data) : res.status(400).json({message:"unable to fetch data"})
    }
    catch(error){
        console.error(error,"from /get leave")
        res.status(500).json({message:"internal server error"})
    }
})

export default router