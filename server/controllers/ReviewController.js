const Review = require("../models/Review");

const getReviews = async (req, res) => {
    try {
        const productId = req.params.id;
        const reviews = await Review.find({productId}).populate('user').select("-password")
        return res.json({
            success: true,
            reviews
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
        success: false,
        message: "Server not found!",
        });
    }
}

const postReview = async (req, res) => {
    try {
        const newReview = new Review({...req.body})
        await newReview.save()
        return res.json({
            succes: true,
            review: newReview
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
        success: false,
        message: "Server not found!",
        });
    }
}

module.exports = {
    getReviews,
    postReview
}