import jwt from "jsonwebtoken"
import dotenv from "dotenv"

dotenv.config()
const secretKey=process.env.secret

const authentication=async(req,res,next)=>{
    const token=req.header("x-access-token")

    if (!token){
        return res.status(401).json({message:"no token provided"})
    }
    try{
        const decoded=jwt.verify(token,secretKey)
        req.user=decoded
        next()
    }
    catch(error){
        res.status(400).json({message:"invalid token"})
    }
}

export default authentication