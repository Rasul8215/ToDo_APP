const mongo=require("mongoose")
const Schema=mongo.Schema;
const todoSchema=new Schema({
    text:{
        type:String,
        required:true
    },
    complete:{
        type:Boolean,
        default:false
    },
    timestamp:{
        type:String,
        default:Date.now()
    }

});

const todo=mongo.model("todo",todoSchema)
module.exports=todo;