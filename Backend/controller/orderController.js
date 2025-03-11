import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import axios from "axios"

const frontend_url = "http://localhost:5173";

// Placing order and redirecting to eSewa
const placeOrder = async (req, res) => {
    try {
        const newOrder = new orderModel({
            userId: req.body.userId,
            items: req.body.items,
            amount: req.body.amount,
            address: req.body.address
        });

        await newOrder.save();
        await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });

        const esewa_payment_url = `https://rc.esewa.com.np/api/epay/transaction/status/?product_code=EPAYTEST&total_amount=100&transaction_uuid=123`;
        const esewa_success_url = `${frontend_url}/verify?success=true&orderId=${newOrder._id}`;
        const esewa_failure_url = `${frontend_url}/verify?success=false&orderId=${newOrder._id}`;

        const formData = {
            amt: req.body.amount + 2,  // Total amount including delivery
            psc: 0,
            pdc: 0,
            txAmt: 2,  // Delivery charge
            tAmt: req.body.amount + 2,
            pid: newOrder._id,
            scd: "EPAYTEST",  // Replace with your actual Merchant Code
            su: esewa_success_url,
            fu: esewa_failure_url
        };

        res.json({ success: true, esewa_payment_url, formData });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error processing order" });
    }
};

// Verify eSewa Payment

const verifyEsewaPayment = async (req, res) => {
    const { refId, transactionUuid, totalAmount } = req.body; // Assuming you are sending these fields

    try {
        // Verify the payment with eSewa using their URL
        const verification_url = `https://uat.esewa.com.np/epay/transrec?amt=${totalAmount}&rid=${refId}&pid=${transactionUuid}&scd=EPAYTEST`;

        // Send GET request to verify the payment
        const response = await axios.get(verification_url);

        // Check if the response status is "COMPLETE"
        if (response.data.status === "COMPLETE") {
            // Payment is successful, update the order status
            await orderModel.findByIdAndUpdate(refId, { payment: true, status: "Paid" });

            // Redirect to success page
            res.redirect(`http://localhost:5173/verify?success=true&orderId=${refId}`);
        } else {
            // Payment failed
            res.redirect(`http://localhost:5173/verify?success=false&orderId=${refId}`);
        }
    } catch (error) {
        console.error(error);
        res.redirect(`http://localhost:5173/verify?success=false&orderId=${refId}`);
    }
};

export { placeOrder, verifyEsewaPayment };
