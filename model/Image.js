const mongoose=require('mongoose')

const imageSchema=new mongoose.Schema({
    imgUrl:{
        type:String,
        required:true
    },
    title:{
        type:String,
    },
    des:{
        type:String,
    },
    author:{
      type:mongoose.Schema.Types.ObjectId,
      ref:'User'
    }
},{timestamps:true})


const Image=mongoose.model('image',imageSchema);

module.exports=Image;