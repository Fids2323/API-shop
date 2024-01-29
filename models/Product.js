const {Schema, model, default: mongoose} = require("mongoose");

const schema = new Schema(
	{
		title: {
			type: String,
			required: true,
		},
		imgUrl: {
			type: String,
			required: true,
		},
		category: {
			type: String,
			required: true,
		},
		price: {
			type: Number,
			required: true,
		},
		shortDesc: {
			type: String,
			required: true,
		},
		description: {
			type: String,
			required: true,
		},
		reviews: [
			{
				type: Schema.Types.ObjectId,
				ref: "Review",
			},
		],
	},
	{
		timestamps: true,
	}
);

module.exports = model("Product", schema);
