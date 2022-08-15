import Category from "../models/categoryModel.js";

const categoryController = {
getCategory: async (req, res) => {
    try{
        const categories = await Category.find()
        res.json('Test category')

    } catch (err){
        return res.status(500).json({message: err.message});
    }
},
createCategory: async (req, res) =>{
    try{
        res.json('Admin create category')

    } catch (err) {
        return res.status(500).json({message: err.message});
    }
}
}

export default categoryController;