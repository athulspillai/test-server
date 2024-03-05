import mongoose from "mongoose"

const categorySchema = new mongoose.Schema({
   categoryid: {
      type: String,
      required: true
   },
   categoryname: {
      type: String,
      required: true
   },
})

const Category = mongoose.model('Category', categorySchema)

export default Category