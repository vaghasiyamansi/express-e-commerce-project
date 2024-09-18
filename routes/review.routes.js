const express = require('express');
const reviewRoutes = express.Router();
const { verifyToken } = require('../helpers/tokenVerify');
const {
    addReview,
    getAllReview,
    getReview,
    // updateReview,
    deleteReview
} = require('../controller/review.controller');

reviewRoutes.post('/', verifyToken, addReview);
reviewRoutes.get('/', verifyToken, getAllReview);
// reviewRoutes.put('/update-Review', verifyToken, updateReview);
reviewRoutes.delete('/', verifyToken, deleteReview);

module.exports = reviewRoutes;