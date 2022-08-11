import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userController = {
  register: async (req, res) => {
    try {
      const { name, email, password } = req.body;
      const user = await User.findOne({ email });
      if (user)
        return res.status(400).json({ message: "Email already exists." });

      if (password.length < 6)
          return res.status(400).json({ message: "Password should be atleast 8 characters long." });

          const hashPassword = await bcrypt.hash(password, 10);

          const newUser = new User({
            name, email, password: hashPassword
          })

          //jsonwebtoken to authentication
          const accessToken = createAccessToken({id: newUser._id});
          const refreshtoken = createRefreshToken({id:newUser._id});
          res.cookie('refreshtoken', refreshtoken, {
            httpOnly: true,
            path: '/api/refresh_token'
          })
          await newUser.save()
      res.json({ message: "Registered successfully" });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
  refreshToken: (req, res)=>{
    try{
      const ref_token = req.cookies.refreshtoken;
      if(!ref_token) return res.status(400).json({message: "Please Login or Register"});
      jwt.verify(ref_token, proccess.env.REFRESH_TOKEN_SECRET, (err, user)=>{
        if(err) return res.status(400).json({message: "Please Login or Register"});
        const accesstoken = createToken({id: user.id})
        res.json(user, accesstoken)
      })
        // res.json({ref_token})
    }
    catch (err) {
      return res.status(400).json({message: err.message})
    }
    
  }
};

const createAccessToken = (user) => {
   return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '1d'})
}

const createRefreshToken = (user) => {
  return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, {expiresIn: '7d'})
}

export default userController;
