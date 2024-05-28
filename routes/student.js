import express from "express";
import studentModel from "../models/studentSchema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv"
import sendmail from "../mailer.js";

dotenv.config()
const secretKey=process.env.SECRET
const Email=process.env.EMAIL

const router = express.Router();

router.post("/register",async(req,res)=>{
    const {name,batch,email,password,phone}=req.body
    try{
        const user= await studentModel.findOne({email})
        if(!user){
            const hashed=await bcrypt.hash(password,10)
            const newUser=new studentModel({name,batch,email,password:hashed,phone})
            await newUser.save()

            if(newUser){
                res.status(201).json({message:"student registered successfully"})
            }   
             else{
                res.status(400).json({message:"unable to register student"})
             }
        }
        else{
            return res.status(409).json({message:"user already exists"})
        }
    }
    catch(error){
        console.error(error,"from student /post")
        res.status(500).json({message:"internal server error"})
    }
})

  router.post("/login",async(req,res)=>{
    const {email,password}=req.body
    try{
        const user = await studentModel.findOne({email})
        if(!user){
            return res.status(404).json({message:"user not found"})
        }
        const passwordCompare= await bcrypt.compare(password,user.password)
        if(!passwordCompare){
            return res.status(401).json({message:"invalid password"})
        }
        const token = jwt.sign({id:user._id},secretKey,{expiresIn:"1d"})

        res.status(200).json({user,token,message:"login successful"})
    }
    catch(error){
        console.error(error,"error while login")
        res.status(500).json({message:"internal server error"})
    }
  })

  router.post("/resetpassword",async(req,res)=>{
    const {email}= req.body
    try{
        const user=await studentModel.findOne({email})
        if(!user){
            return res.status(404).json({message:"user not found"})
        }
        const resetToken=jwt.sign({id:user._id},secretKey,{expiresIn:"1h"})

        let PasswordResetLink=`http://localhost:3000/resetpassword/${resetToken}`

        const mailOption={
            from:Email,
            to:user.email,
            subject:"password reset",
            text:"<p> if you did not request a password reset, please ignore this email</p>",
            html:`You requested a password reset.\n Click the link below to reset your password:\n\n ${PasswordResetLink} \n\nIf you did not request a password reset, please ignore this email.`
        }

        sendmail(mailOption.to,mailOption.subject,mailOption.html,mailOption.text)

        sendmail ? res.status(200).json({message:"password reset link sent to your email"}) :
        res.status(400).json({message:"unable to send password reset link"})
    }
    catch(error){
        console.error(error,"from /resetpassword")
        res.status(500).json({message:"internal server error"})
    }
  })

  router.post("/savePassword",async(req,res)=>{
      const {newPassword,resetToken}=req.body
    try{
        const decoded= jwt.verify(resetToken,secretKey)

        const userId=decoded.id
        const user=await studentModel.findById(userId)
        if(!user){
            return res.status(404).json({message:"user not found"})
        }
        const hashedPassword= await bcrypt.hash(newPassword,10)
        user.password=hashedPassword
        await user.save()

        res.status(200).json({message:"password reset successful"})
    }
    catch(error){
        console.error(error,"from /savePassword")
        res.status(500).json({message:"internal server error"})
    }
  })

  export default router