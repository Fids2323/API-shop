const tokenService = require("../services/token.service");

module.exports = (req, res, next) => {
	if (req.method === "OPTIONS") {
		return next();
	}

	try {
		const token = req.headers.authorization.split(" ")[1];
		if (!token) {
			return res.status(401).json({message: "Unauthorized"});
		}

		const data = tokenService.validateAccess(token);

		if (!data) {
			return res.status(401).json({message: "Unauthorized"});
		}

		req.user = data;

		next();
	} catch (e) {
		res.status(401).json({message: "Unauthorized"});
	}
};

// const verifyUser = (req, res, next) => {
// 	auth(req, res, next, () => {
// 		if (req.user.id === req.params.id || req.user.role !== "admin") {
// 			next();
// 		} else {
// 			return res.status(401).json({
// 				success: false,
// 				message: "You are not authenticated",
// 			});
// 		}
// 	});
// };

// const verifyAdmin = (req, res, next) => {
// 	auth(req, res, next, () => {
// 		if (req.user.role === "admin") {
// 			next();
// 		} else {
// 			return res.status(401).json({
// 				success: false,
// 				message: "You are not authorize",
// 			});
// 		}
// 	});
// };
