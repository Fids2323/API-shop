const express = require("express");
const router = express.Router({mergeParams: true});
const multer = require("multer");

const usersStorage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, "avatars");
	},
	filename: function (req, file, cb) {
		cb(null, file.originalname);
	},
});

const uploadAvatar = multer({
	storage: usersStorage,
	fileFilter: function (req, file, cb) {
		const allowedExtensions = /(\.jpg|\.jpeg|\.png|\.gif)$/i;
		const ext = allowedExtensions.exec(file.originalname);
		if (!ext) {
			cb(new Error("Неверный формат файла. Допустимы только изображения."));
			return;
		}
		cb(null, true);
	},
});

router.post("/", uploadAvatar.single("image"), (req, res) => {
	try {
		res.json({
			url: `/avatars/${req.file.originalname}`,
			message: "Фаил успешно загружен!",
		});
	} catch (e) {
		res.status(500).json({
			message: "На сервере произошла ошибка Попробуйте позже.",
		});
	}
});

module.exports = router;
