import mongoose from "mongoose"

const leaderSchema=mongoose.Schema({
    name: {
        type: String,
      },
      batch:{
        type:String,
        default:"B42WE Tamil"
      },
      
      learning: {
        type: String,
        default: "",
      }
     
})

const leadermodel=mongoose.model("leader",leaderSchema)

export default leadermodel