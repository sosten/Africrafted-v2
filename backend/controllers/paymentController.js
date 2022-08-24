import Payment from "../models/paymentModel.js";
import User from "../models/userModel.js";
import Product from "../models/productModel.js";

const paymentController = {
    getPayments: async(req, res) => {
        try {
            const payments = await Payment.find();
            res.json(payments)
        } catch (err) {
            return res.status(500).json({message: err.message})
        }
    },

    createPayment: async(req, res) => {
        try {
            const user = await User.findById(req.user.id).select("name email")
                if(!user) return res.status(400).json({message: "User does not exist"});

            const {cart, paymentID, address} = req.body;
            const {_id, name, email} = user;

            const newPayment = new Payment({
                user_id: _id, name, email, cart, paymentID, address
            })

            req.json(newPayment)

        } catch (err) {
            return res.status(500).json({message: err.message})
        }
    }
}

export default paymentController;