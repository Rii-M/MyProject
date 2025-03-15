import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";

//placing user order for frontend
const placeOrder = async (req, res) => {

    const frontend_url ="http://localhost:5173"
    let newOrder;
    try {
        newOrder = new orderModel({
            userId: req.body.userId,
            items: req.body.items,
            amount: req.body.amount,
            address: req.body.address,
            payment: true // Automatically marking payment as completed
        })
        await newOrder.save();
        await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} })

        // Ensure success response even if an error occurs
        return res.status(200).json({ success: true, session_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}` });

    } catch (error) {
        console.error("Error in placeOrder:", error);
        return res.status(500).json({ success: false, message: "Error processing order", session_url: `${frontend_url}/verify?success=false&orderId=${newOrder?._id || ''}` });
    }
}

const verifyOrder = async(req,res)=>{
    const {orderId,success}=req.body;
    try {
        if(success=="true"){
            await orderModel.findByIdAndUpdate(orderId,{payment:true})
            return res.status(200).json({success:true,message:"paid"})
        }
        else{
            await orderModel.findByIdAndDelete(orderId);
            return res.status(200).json({success:false,message:"not paid"})
        }
    } catch (error) {
        console.error("Error in verifyOrder:", error);
        return res.status(500).json({success:false,message:"error"})
    }
}
export { placeOrder,verifyOrder }
