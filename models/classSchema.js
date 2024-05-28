import mongoose from "mongoose"

const classSchema=mongoose.Schema({
    title: { type: String, required: true },
    date:String,
    content: String,
    preRead: String,
})

const classModel=mongoose.model("class",classSchema)

export default classModel