import Category from "../models/categoryModel.js";
import Product from "../models/productModel.js"

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
},
deleteCategory: async (req, res) => {
    try {
        const product = await Product.findOne({category: req.params.id})
            if(product) return res.status(400).json({message: "Delete all products with a relationship"})
        await Category.findByIdAndDelete(req.params.id)
        res.json({message: "Category Deleted"})
        
    } catch (err) {
        return res.status(500).json({message: err.message})
    }
},
updateCategory: async (req, res) => {
    try {
        const { name } = req.body;
        await Category.findOneAndUpdate({_id: req.params.id}, {name})
        res.json({message: "Category Updated"});
    } catch (err) {
        return res.status(500).json({message: err.message});
    }
}
}

export default categoryController;