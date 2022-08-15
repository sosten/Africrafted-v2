import jwt from "jsonwebtoken";

const auth = (req, res, next) => {
    try {
        const token = req.header("Authorization");
        if(!token) return res.status(400).json({message: "Invalied Authorization"});
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user)=>{
            if(err) return res.status(400).json({message: "Invalid Authorization"})

            req.user = user
            next()
        })
    } catch (err) {
        res.status(500).json({message: err.message});
    }
}

export default auth;