const express = require("express");
const Product = require("../models/Product");
const Review = require("../models/Review");
const router = express.Router({mergeParams: true});

//Create new Review
router.post("/:productId", async (req, res) => {
	const {productId} = req.params;
	const newReview = new Review({...req.body});
	try {
		const savedReview = await newReview.save();

		await Product.findByIdAndUpdate(productId, {
			$push: {reviews: savedReview._id},
		});
		res.status(200).json({
			success: true,
			message: "Review submitted",
			data: savedReview,
		});
	} catch (e) {
		console.log(e);
		res.status(500).json({
			message: "На сервере произошла ошибка Попробуйте позже.",
		});
	}
});

// Get all reviews for a specific product
router.get("/:productId", async (req, res) => {
	const {productId} = req.params;
	try {
		const product = await Product.findById(productId).populate("reviews");
		if (!product) {
			return res.status(404).json({
				success: false,
				message: "Product not found",
			});
		}
		res.status(200).json({
			success: true,
			message: "Reviews retrieved successfully",
			data: product.reviews,
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({
			success: false,
			message: "На сервере произошла ошибка. Попробуйте позже.",
		});
	}
});

module.exports = router;
