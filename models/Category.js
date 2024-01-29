const {Schema, model} = require("mongoose");

const schema = new Schema(
    {
        userId: {type: String, required: true},
        name: {
            type: String,
            required: true
        },
    },
    {
        timestamps: true,
    }
);

module.exports = model("Category", schema);
