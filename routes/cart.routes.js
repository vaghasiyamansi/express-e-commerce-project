const express = require('express');
const {verifyToken} = require("../helpers/tokenVerify")
const { addToCart , deleteToCart , updateToCart , getAllCart } = require('../controller/cart.controller');

const CartRoutes = express.Router();

CartRoutes.get('/',verifyToken,getAllCart); 
CartRoutes.post('/',verifyToken,addToCart);
CartRoutes.post('/updateCart',verifyToken,updateToCart);  
CartRoutes.post('/deleteCart',verifyToken,deleteToCart); 

module.exports = CartRoutes;