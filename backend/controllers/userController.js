import User from "../models/userModel.js";
import Payment from "../models/paymentModel.js";
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
        return res
          .status(400)
          .json({ message: "Password should be atleast 8 characters long." });

      const hashPassword = await bcrypt.hash(password, 10);

      const newUser = new User({
        name,
        email,
        password: hashPassword,
      });
      await newUser.save();
      res.json({ message: "Registered successfully" });

      //jsonwebtoken to authentication
      const accesstoken = createAccessToken({ id: newUser._id });
      const refreshtoken = createRefreshToken({ id: newUser._id });
      res.cookie("refreshtoken", refreshtoken, {
        httpOnly: true,
        path: "/api/refresh_token",
      });
      res.json({ accesstoken });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user)
        return res.status(400).json({ message: "User does not exist" });
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch)
        return res.status(400).json({ message: "Incorrect Password" });

      //if login is successful create access and refresh tokens
      // res.json({message: "Login Successfully!"});
      const accesstoken = createAccessToken({ id: user._id });
      const refreshtoken = createRefreshToken({ id: user._id });
      res.cookie("refreshtoken", refreshtoken, {
        httpOnly: true,
        path: "/api/refresh_token",
        maxAge: 7*24*60*60*1000 // 7d
      });
      res.json({ accesstoken });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  },
  logout: async (req, res) => {
    try {
      res.clearCookie("refreshtoken", { path: "/api/refresh_token" });
      return res.json({ message: "Logout Successfully!" });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
  refreshToken: (req, res) => {
    try {
      const ref_token = req.cookies.refreshtoken;
      if (!ref_token)
        return res.status(400).json({ message: "Please Login or Register" });
      jwt.verify(ref_token, proccess.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err)
          return res.status(400).json({ message: "Please Login or Register" });
        const accesstoken = createAccessToken({ id: user.id });
        res.json(user, accesstoken);
      });
      // res.json({ref_token})
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  },
  getUser: async (req, res) => {
    try {
      const user = await User.findById(req.user.id).select("-password");
      if (!user)
        return res.status(400).json({ message: "User does not exist!" });
      res.json(user);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
  addToCart: async (req, res) => {
    try {
      const user = await User.findById(req.user.id);
      if (!user)
        return res.status(400).json({ message: "User does not exist" });

      await User.findByIdAndUpdate(
        { _id: req.user.id },
        {
          cart: req.body.cart,
        }
      );
      return res.json({ message: "Added to cart" });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  },
  history: async (req, res) => {
    try {
      const history = await Payment.find({user_id: req.user.id})
      res.json(history)
      
    } catch (err) {
      return res.status(500).json({ message: error.message });
    }
  }
};

const createAccessToken = (user) => {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "17s" });
};

const createRefreshToken = (user) => {
  return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "1d" });
};

export default userController;
