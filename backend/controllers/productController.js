import Product from "../models/productModel.js";

class APIfeatures {
    constructor(query, queryString){
        this.query = query;
        this.queryString = queryString;
    }

    filtering(){
        const queryObj = { ...this.queryString } //queryString = req.query

        console.log({before: queryObj}); //before delete page

        const excludedFields = ['page', 'sort', 'limit']
        excludedFields.forEach(el => delete(queryObj[el]))

        console.log({after: queryObj}) //after delete page
        
        let queryStr = JSON.stringify(queryObj)
        queryStr = queryStr.replace(/\b(gte|gt|lt|lte|regex|)\b/g, match => '$' + match)
        console.log({query})

        // gte = greater than or equal
        // lte = less than or equal
        // lt  = less than
        // gt  = greater than

        this.query.find(JSON.parse(queryStr))
        
        return this;
    }

    sorting(){
        if(this.queryString.sort){
            const sortBy = this.queryString.sort.split(',').join(' ')
            console.log(sortBy)
            this.query = this.query.sort(sortBy)
        }else {
            this.query = this.query.sort('-createdAt')
        }

        return this;
    }

    paginating(){
        const page = this.queryString.page * 1 || 1
        const limit = this.queryString.limit * 1 || 9
        const skip = (page - 1) * limit;
        this.query = this.query.skip(skip).limit(limit)
        return this;
    }
}

const productController = {
    getProduct: async (req, res) => {
        try {
            const features = APIfeatures(Product.find(), req.query).filtering().sorting().paginating()
            const product = await features.query
            res.json({
                status: 'success',
                result: product.length,
                product: product
            })
        } catch (err) {
            return res.status(500).json({err: message.err})
        }
    },

    createProduct: async (req, res) => {
        try {
            const { product_id, title, price, description,content, images, category } = req.body;
            if(!images) return res.status(400).json({message: "No image uploaded"});

            const product = await Product.findOne({product_id});
            if(product) return res.status(400).json({message: "Product already exists"});
            
            const newProduct = new Product({
                product_id, title: title.toLowerCase(), price, description,content, images, category
            });
            await newProduct.save();
            res.json({message: "Product created successfully"});
            
        } catch (err) {
            return res.status(500).json({message: err.message})
        }
    },

    deleteProduct: async (req, res) => {
        try {
            await Product.findOneAndDelete(req.params.id)
            return res.json({message: "Product deleted successfully"})
        } catch (err) {
            return res.status(500).json({message: err.message})
        }
    },

    updateProduct: async (req, res) => {
        try {
            const { title, price, description,content, images, category } = req.body;
            if(!images) return res.status(400).json({message: "No image uploaded"});
            await Product.findOneAndUpdate({_id: req.params.id}, {
                title: title.toLowerCase(), price, description,content, images, category 
            });

            res.json({message: "Product updated successfully"});

        } catch (err) {
            return res.status(500).json({message: err.message})
        }
    }
}

export default productController;