const {Schema, model} = require("mongoose");

const schema = new Schema(
	{
		icon: {type: String},
		title: {type: String},
		subtitle: {type: String},
		bg: {type: String},
	},
	{
		timestamps: true,
	}
);

module.exports = model("Service", schema);
