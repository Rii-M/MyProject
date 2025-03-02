import mongoose from "mongoose";

export const connectDB  = async()=>{
    await mongoose.connect('mongodb+srv://rii7maharjan:33858627@cluster0.u5zcf.mongodb.net/7thsemproject').then(()=>console.log("DB Connected"));
}