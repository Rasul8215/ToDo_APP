import './App.css';
import {useState, useEffect} from "react"

function App() {
  const [todos,settodos]=useState([]);
  const [active,setactive]=useState(false)
  const [newtodo,setnewtodo]=useState("")
  const api="http://localhost:3000/"

  useEffect(()=>
    {
      gettodo();
    },[]
  )
const gettodo=()=>{
  fetch(api+"todos").then(res=>res.json()).then(data=>settodos(data)).catch(err=>console.log("error"))
}
const complete=async id=>{
  const data=await fetch(api+"todo/complete/"+id).then(res=>res.json())
  settodos(todos=>todos.map(todo=>{
    if (todo._id===data._id){
      todo.complete=data.complete
    }
    return todo
  }))
  
}
const deltodo=async id=>{
  const data=await fetch(api+"todo/delete/"+id,{method:"DELETE"}).then(res=>res.json())
  settodos(todos=>todos.filter(todo=>todo._id !==data._id))

}
const addtodo=async ()=>{
  const data=await fetch(api+"todo/new",{method:"POST",
  headers:{
    "content-type":"application/json"
  },
  body:JSON.stringify({
    text:newtodo
  })
}).then(res=>res.json())
settodos([...todos,data])
setnewtodo=""
}

  return (
    <>
    <div class="head">
    <h3>Todo List</h3>
</div>
<div class="full">
  {todos.map(todo=>(
    <div class="list">
    <div class={""+(todo.complete ? "iscomplete":"checkbox")}
    onClick={()=>complete(todo._id)}>
    </div>
    <div>
        <h3 class={""+(todo.complete ? "text":"")}>{todo.text}</h3>
    </div>
    <div class="del" onClick={()=>deltodo(todo._id)}>
        <h3 class="delbut">X</h3>
    </div>
</div>
  ))
}

<div class="button">
<input type='text'onChange={(e)=>setnewtodo(e.target.value)} value={newtodo}/>
<button onClick={addtodo}>Add Todo</button>
</div>

</div>
    </>
  );
}

export default App;
