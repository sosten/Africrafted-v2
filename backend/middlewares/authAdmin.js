import User from "../models/userModel.js";

const authAdmin = async (red, res, next) => {
    try {
        //get user infor by id
        const user = await User.findOne({
            _id: req.user.id
        })
        if(user.role === 0) return res.status(400).json({message: "Admin resources access denied"});

        next()
        
    } catch (err) {
        return res.status(500).json({message: err.message})
    }
}

export default authAdmin;