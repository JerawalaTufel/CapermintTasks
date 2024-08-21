const { register, login, authMiddleware } = require('../controllers/authController');
const { getCategory, createCategory } = require('../controllers/categoryController');
const { getProduct, createProduct, updateProduct, deleteProduct } = require('../controllers/productController');

const apiRoute = require('express').Router();

//auth routes
apiRoute.post('/register',register);
apiRoute.post('/login',login)

apiRoute.get('/chat', (req, res) => {
    res.render('chat');
  });
apiRoute.use(authMiddleware);

//category routes
apiRoute.get('/getCategory' , getCategory);
apiRoute.post('/createCategory',createCategory)

//product routes
apiRoute.get('/getProduct',getProduct)
apiRoute.post('/createProduct' , createProduct)
apiRoute.put('/putProduct/:id' , updateProduct)
apiRoute.delete('/deleteProduct/:id' , deleteProduct)


module.exports = apiRoute