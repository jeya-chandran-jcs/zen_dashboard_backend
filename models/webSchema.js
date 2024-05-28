import mongoose from "mongoose"

const webSchema=mongoose.Schema({
    batch: {
        type: String,
        require:true
      },
      
      mark: {
        type: String,
        require:true
      },
    
      title: {
        type: String,
        require:true
      },
      submittedOn: {
        type: String,
        require:true
      },
})

const webModel=mongoose.model("web",webSchema)

export default webModel