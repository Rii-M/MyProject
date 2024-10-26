import express from "express"
import cors from "cors"
import { connectDB } from "./config/db.js"

//app config 
const app=express()
const port = 4000

//middleware
app.use(express.json())
app.use(cors())

//database connection
connectDB();

app.get("/",(req,res)=>{
    res.send("API is working")
})

app.listen(port,()=>{
    console.log(`Server started on https://localhost:${port}`)
})

//mongodb+srv://rii7maharjan:<db_password>@cluster0.arr52.mongodb.net/?
//retryWrites=true&w=majority&appName=Cluster0
