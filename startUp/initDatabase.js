const serviceDataMock = require("../mock/serviceData.json");
const Service = require("../models/Service");
const productsMock = require("../mock/products.json");
const Product = require("../models/Product");

module.exports = async () => {
	const services = await Service.find();
	if (services.length !== serviceDataMock.length) {
		await createInitialEntity(Service, serviceDataMock);
	}
	const products = await Product.find();
	if (products.length !== productsMock.length) {
		await createInitialEntity(Product, productsMock);
	}
};

async function createInitialEntity(Model, data) {
	await Model.collection.drop(); //clear collection
	return Promise.all(
		data.map(async (item) => {
			try {
				delete item._id;
				const newItem = new Model(item);
				await newItem.save();
				return newItem;
			} catch (e) {
				return e;
			}
		})
	);
}
