import mongoose from "mongoose";

export const connectDB = async()=>{
    await mongoose.connect('mongodb+srv://rii7maharjan:<db_password>@cluster0.arr52.mongodb.net/7thsemproject').then(()=>console.log("DB connected"));
}