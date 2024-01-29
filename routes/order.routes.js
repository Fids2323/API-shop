const express = require("express");
const auth = require("../middleware/auth.middleware");
const {check, validationResult} = require("express-validator");
const Order = require("../models/Order");
const router = express.Router();

// Создание заказа

router.post("/", async (req, res) => {
	const newOrder = new Order(req.body);
	try {
		const SavedOrder = await newOrder.save();

		res.status(200).json({
			success: true,
			message: "Successfully created",
			data: SavedOrder,
		});
	} catch (e) {
		console.log(e);
		res.status(500).json({
			message: "На сервере произошла ошибка Попробуйте позже.",
		});
	}
});
// router.post(
// 	"/",
// 	[
// 		auth,
// 		check("products", "Укажите товары").isArray({min: 1}),
// 		check("address", "Укажите адрес доставки").not().isEmpty(),
// 		check("phone", "Укажите телефон").not().isEmpty(),
// 		check("email", "Укажите корректный email").isEmail(),
// 	],
// 	async (req, res) => {
// 		try {
// 			const errors = validationResult(req);
// 			if (!errors.isEmpty()) {
// 				return res.status(400).json({errors: errors.array(), message: "Некорректный заказ"});
// 			}

// 			const order = new Order({
// 				user: req.user.userId,
// 				products: req.body.products,
// 				address: req.body.address,
// 				phone: req.body.phone,
// 				email: req.body.email,
// 			});

// 			await order.save();
// 			res.status(201).json({message: "Заказ успешно создан", order});
// 		} catch (e) {
// 			res.status(500).json({
// 				message: "На сервере произошла ошибкаю Попробуйте позже.",
// 			});
// 		}
// 	}
// );

// Получение всех заказов
router.get("/", auth, async (req, res) => {
	try {
		const list = await Order.find();
		res.send(list);
	} catch (e) {
		console.log(e);
		res.status(500).json({
			message: "На сервере произошла ошибка Попробуйте позже.",
		});
	}
});

// Получение конкретного заказа пользователя
router.get("/:id", auth, async (req, res) => {
	try {
		const order = await Order.findById(req.params.id);
		if (!order) {
			return res.status(404).json({message: "Заказ не найден"});
		}
		if (order.user.toString() !== req.user.userId) {
			return res.status(401).json({message: "Пользователь не авторизован"});
		}
		res.json(order);
	} catch (e) {
		res.status(500).json({
			message: "На сервере произошла ошибкаю Попробуйте позже.",
		});
	}
});

module.exports = router;
