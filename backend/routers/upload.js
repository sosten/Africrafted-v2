import express from "express";
import cloudinary from "cloudinary";
import auth from "../middlewares/auth.js";
import authAdmin from "../middlewares/authAdmin.js";
import fs from "fs";


const uploadRouter = express.Router();

// upload image to cloudinary

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_NAME,
    api_secret: process.env.API_SECRET
})

uploadRouter.post("/upload", auth, authAdmin, (req, res)=>{
    try {
        console.log(req.files);
        if(!req.files || Object.keys(req.files).length === 0)
            return res.status(400).json({message:"No files were uploaded."})

            const file = req.files.file;
            if(file.size > 1024*1024){
                removeTmp(file.tempFilePath);
                return res.status(400).json({message: "File size must be less than 1mb"});
            }
                
            if(file.mimetype !== 'image/jpeg' && file.mimetype !== 'image/jpg' && file.mimetype !== 'image/png'){
                removeTmp(file.tempFilePath);
                return res.status(400).json({message: "File format not supported"});
            }
                
            cloudinary.v2.uploader.upload(file.tempFilePath, {folder: "test"}, async (err, result) => {
                if(err) throw err;
                removeTmp(file.tempFilePath);
                // res.json({result})
                res.json({public_id: result.public_id, url: result.secure_url})
            })
        
    } catch (err) {
        return res.status(500).json({message: err.message})
    }
})

uploadRouter.post("/destroy", auth, authAdmin, (req, res) => {
    try {
        const { public_id } = req.body;
        if(!public_id) return res.status(400).json({message: "No image is selected"})

        cloudinary.v2.uploader.destroy(public_id, async(err, result)=>{
            if(err) throw err;
            res.json({message: "Image deleted successfully"})
        })
        
    } catch (err) {
        return res.status(500).json({message: err.message})
    }
})

const removeTmp = (path) => {
    fs.unlink(path, err => {
        if(err) throw err;
    })
}

export default uploadRouter;