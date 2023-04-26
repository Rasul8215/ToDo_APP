const express=require("express")
const mongo=require('mongoose')
const cors=require("cors")
const app=express()
app.use(express.json())
app.use(cors())

mongo.connect("mongodb://127.0.0.1:27017/mern-todo",{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>console.log("connected")).catch(()=>console.log("error"))

const todo = require("./models/todos")


app.get("/todos",async (req,res)=>{
    const todos= await todo.find();
    res.json(todos)
})
app.post("/todo/new",(req,res)=>{
    const newtodo=new todo({
        text:req.body.text
    })
    newtodo.save()
    res.json(newtodo)
});
app.get("/todo/complete/:id", async (req,res)=>{
    const todoid=await todo.findById(req.params.id)
    todoid.complete=!todoid.complete
    todoid.save()
    res.json(todoid)
})

app.delete("/todo/delete/:id",async (req,res)=>{
    const deltodo=await todo.findByIdAndDelete(req.params.id)
    res.json(deltodo)
})





app.listen(3000)