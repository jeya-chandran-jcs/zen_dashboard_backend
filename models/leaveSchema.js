import mongoose from "mongoose"

const leaveSchema=mongoose.Schema({
    reason: {
        type: String,
        required:true,
      },
      appliedOn: {
        type: String,
        required: true,
      },
      status: {
        type: String,
        default: "Waiting for Approval",
      },
})

const leaveModel=mongoose.model("leave",leaveSchema)

export default leaveModel