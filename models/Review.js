const {Schema, model} = require("mongoose");

const schema = new Schema(
	{
		id: {
			type: Schema.Types.ObjectId,
			ref: "Product",
		},
		username: {
			type: String,
			required: true,
		},
		reviewText: {
			type: String,
			required: true,
		},
		rating: {
			type: Number,
			required: true,
			min: 0,
			max: 5,
			default: 0,
		},
	},
	{timestamps: true}
);

module.exports = model("Review", schema);
