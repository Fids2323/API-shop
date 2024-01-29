const {Schema, model} = require("mongoose");

const schema = new Schema(
	{
		email: {type: String, required: true, unique: true},
		password: {type: String},
		username: {type: String},
		image: String,
		isAdmin: {
			type: Boolean,
			default: false,
		},
	},
	{
		timestamps: true,
	}
);

module.exports = model("User", schema);
