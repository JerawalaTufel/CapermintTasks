const Category = require('../models/Category');
const { createCategoryValidation } = require('../validation/categoryValidation');
const { errorResponseWithoutData } = require('../services/Response');


const createCategory = async (req , res) => {
    try {
        const reqParam = req.body;  
        createCategoryValidation(reqParam , res , async (valid) => {
            if(valid) {
                const { name } = reqParam;
                
                const categories = await Category.findOne({name});
                if(categories){
                    return res.status(400).json({ 
                        status : 400,
                        message: 'categorie already exists' 
                    });
                }
                const category = new Category({ name });
                await category.save();
        
                return res.status(201).json({
                    status : 200,
                    message: 'category created' ,
                    data : category
                 });
            }
        }) 
    } catch (err) {
        console.error(err.message);
        errorResponseWithoutData(res , err.message)
    }
}

const getCategory = async (req , res) => {
    try {
        const categories = await Category.find({});

        return res.status(200).json({
            status : 200,
            message: 'List All the Category' ,
            data : categories
         });
    } catch (err) {
        console.error(err.message);
        errorResponseWithoutData(res , err.message)
    }
}

module.exports = {
    createCategory,
    getCategory
}