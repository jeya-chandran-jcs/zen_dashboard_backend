import mongoose from "mongoose"

const studentSchema=mongoose.Schema({
    name: {
        type: String,
        required: true,
      },
      batch: {
        type: String,
        default: "B47-WD2 Tamil",
      },
      phone: {
        type: String,
      },
      email: {
        type: String,
        required: true,
        unique: true,
      },
      password: {
        type: String,
        required: true,
      }
})

const studentModel=mongoose.model("student",studentSchema)

export default studentModel