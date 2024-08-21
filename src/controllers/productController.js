const Product = require('../models/Product');
const { createProductValidation, updateProductValidation } = require('../validation/productValidation');
const { errorResponseWithoutData } = require('../services/Response');

const createProduct = async (req, res) => {
    try {
        const reqParam = req.body;  
        createProductValidation(reqParam , res , async (valid) => {

            if(valid) {

                const { title, category, description, amount, image } = reqParam;
                const products = await Product.findOne({title});
                if(products){
                    return res.status(400).json({ 
                        status : 400,
                        message: 'product already exists' 
                    });
                }
                const product = new Product({ title, category, description, amount, image });
                await product.save();
        
                return res.status(201).json({
                    status : 200,
                    message: 'product created',
                    data : product
                });
            }
        })
    } catch (err) {
        console.error(err.message);
        errorResponseWithoutData(res , err.message)
    }
}

const getProduct = async (req, res) => {
    const { title } = req.query;
    try {
        const query = title ? { title: new RegExp(title, 'i') } : {};
        const products = await Product.find(query).populate('category', 'name');
       
        return res.status(201).json({
            status : 200,
            message: 'all the products list' ,
            data : products
         });
    } catch (err) {
        console.error(err.message);
        errorResponseWithoutData(res , err.message)
    }
}

const updateProduct = async (req, res) => {

    try {
        const reqParam = req.body;  
        updateProductValidation(reqParam , res , async (valid) => {
            if(valid) {
                const { title, category, description, amount, image } = reqParam;

                const product = await Product.findByIdAndUpdate(
                    req.params.id,
                    { $set: { title, category, description, amount, image } },
                    { new: true }
                );
        
                return res.status(201).json({
                    status : 200,
                    message: 'product Updated' ,
                    data : product
                });
            }
        })
    } catch (err) {
        console.error(err.message);
        errorResponseWithoutData(res , err.message)
    }
}
 
const deleteProduct = async (req, res) => {
    try {
        const findProd = await Product.findOne({_id : req.params.id});
        if(!findProd) {
            return res.status(400).json({ 
                status : 400,
                message: 'product is not exists' 
            });
        }
        await Product.findByIdAndDelete(req.params.id);
        res.json({ status: 200, message: 'Product deleted successfully' });
    } catch (err) {
        console.error(err.message);
        errorResponseWithoutData(res, err.message);
    }
}


module.exports = {
    createProduct,
    getProduct,
    updateProduct,
    deleteProduct
}