import mongoose, { mongo } from "mongoose"

const taskSchema=mongoose.Schema({
    day: {
        type: String,
        required: true,
      },
      frontEndCode: {
        type: String,
      },
      frontEndURL: {
        type: String,
      },
      backEndCode: {
        type: String,
      },
      backEndURL: {
        type: String,
      },
      mark: {
        type: String,
      },
    
      title: {
        type: String,
      },
      submittedOn: {
        type: String,
      },
})

const taskModel=mongoose.model("task",taskSchema)

export default taskModel