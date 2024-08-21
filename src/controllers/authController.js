const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { errorResponseWithoutData } = require('../services/Response');
const { registerValidation, loginValidation } = require('../validation/authValidation');

const register = async (req, res) => {

    try {
        const reqParam = req.body;   
        registerValidation(reqParam , res , async (valid) => {

            if(valid) {
                const { name, email, phone, password } = reqParam
                let user = await User.findOne({ email });
                if (user) {
                    return res.status(400).json({ 
                        status : 400,
                        message: 'User already exists' 
                    });
                }
        
                user = new User({ name, email, phone, password });
        
                const salt = await bcrypt.genSalt(10);
                user.password = await bcrypt.hash(password, salt);
        
                const newUser = await user.save();
                res.status(201).json({ status : 200 , message: 'User registered successfully', newUser });
            }
        })
    } catch (err) {
        console.error(err.message);
        errorResponseWithoutData(res , err.message)
    }

}

const login = async (req , res) => {

    try {
        const reqParam = req.body;   
        loginValidation(reqParam , res , async (valid) => {
            if(valid) {
                const { email, password } = reqParam;
                let user = await User.findOne({ email });
                if (!user) {
                    return res.status(400).json({status : 400 , message: 'Invalid credentials' });
                }
        
                const isMatch = await bcrypt.compare(password, user.password);
                if (!isMatch) {
                    return res.status(400).json({ status : 400 , message: 'Invalid credentials' });
                }
        
                const payload = { user: { id: user.id } };
                jwt.sign(payload, process.env.JWT_KEY, { expiresIn: 3600 }, (err, token) => {
                    if (err) throw err;
                    res.status(200).json({status : 200 , message: 'Login successfully', token : token });
                });
            }
        })
    } catch (err) {
        console.error(err.message);
        errorResponseWithoutData(res , err.message)
    }
}

const authMiddleware = async (req , res , next) => {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }
    let mainToken = token.slice(7, token.length);

    try {
        jwt.verify(mainToken, process.env.JWT_KEY, (err, decoded) => {
            if (err) return res.status(401).json({status : 400 , message: 'Failed to authenticate token' });
            req.userId = decoded.userId;
            next();
          }); 
    } catch (err) {
        errorResponseWithoutData(res , error.message)
    }
}

module.exports = {
    register,
    login,
    authMiddleware
}