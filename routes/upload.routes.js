const express = require("express");
const router = express.Router({mergeParams: true});
const upload = require("../middleware/multerMiddleware");

router.post("/", upload.single("image"), (req, res) => {
	try {
		res.json({
			url: `/uploads/${req.file.originalname}`,
			message: "Фаил успешно загружен!",
		});
	} catch (e) {
		res.status(500).json({
			message: "На сервере произошла ошибка Попробуйте позже.",
		});
	}
});

module.exports = router;
