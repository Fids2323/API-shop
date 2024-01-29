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

module.exports = router;
