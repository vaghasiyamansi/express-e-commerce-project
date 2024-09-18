const ReviewServices = require('../services/review.services');
const reviewService = new ReviewServices();

exports.addReview = async (req, res) => {
    try {
        let review = await reviewService.getReview({
            user: req.user._id,
            product: req.query.productId,
            isDelete: false
        });
        review = await reviewService.addNewReview({ ...req.body, user: req.user._id});
        res.status(201).json({review, message: "Your review has been submitted successfully."});
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: `Internal Server Error...${console.error()}` });
    }
};

exports.getAllReview = async (req, res) => {
    try {
        let review = await reviewService.getAllReview({isDelete: false});
        if (!review) {
            return res.status(404).json({ message: "Review Not Found...."});
        }
        res.status(200).json(review);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: `Internal Server Error...${console.error()}`});
    }
};

exports.deleteReview = async (req, res) => {
    try {
        let review = await reviewService.getReviewById({_id: req.query.reviewId, isDelete: false});
        if (!review) {
            return res.status(404).json({ message:  "This Review does not exist!" });
        }
        review = await reviewService.updateReview(review._id,{ isDelete: true});
        res.status(200).json({message:"The product review has been deleted successfully."});
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: `Internal Server Error...${console.error()}`});
    }
};