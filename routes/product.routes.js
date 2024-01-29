const express = require("express");
const Product = require("../models/Product");
const router = express.Router({mergeParams: true});

//Get all products
router.get("/", async (req, res) => {
	try {
		const list = await Product.find().populate("reviews");
		res.status(200).send(list);
	} catch (e) {
		res.status(500).json({
			message: "На сервере произошла ошибка Попробуйте позже.",
		});
	}
});

//Get single product
router.get("/:productId", async (req, res) => {
	try {
		const {productId} = req.params;
		const product = await Product.findById(productId).populate("reviews");

		res.status(200).json({
			success: true,
			message: "Successfully",
			data: product,
		});
	} catch (e) {
		res.status(404).json({
			success: false,
			message: "not found",
		});
	}
});

//Create new product
router.post("/", async (req, res) => {
	const newProduct = new Product(req.body);
	try {
		const savedProduct = await newProduct.save();

		res.status(200).json({
			success: true,
			message: "Successfully created",
			data: savedProduct,
		});
	} catch (e) {
		res.status(500).json({
			message: "На сервере произошла ошибка Попробуйте позже.",
		});
	}
});

//Update product
router.patch("/:productId", async (req, res) => {
	try {
		const {productId} = req.params;

		const updatedProduct = await Product.findByIdAndUpdate(productId, req.body, {new: true});
		res.send(updatedProduct);
	} catch (e) {
		res.status(500).json({
			message: "На сервере произошла ошибка Попробуйте позже.",
		});
	}
});

//Delete product
router.delete("/:productId", async (req, res) => {
	try {
		const {productId} = req.params;
		await Product.findByIdAndDelete(productId);

		res.status(200).json({
			success: true,
			message: "Successfully deleted",
		});
	} catch (e) {
		res.status(500).json({
			message: "На сервере произошла ошибка. Попробуйте позже",
		});
	}
});

module.exports = router;
