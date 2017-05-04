// let Table = require('./schema.json');
let mongoose = require('mongoose'),
	schema = require('./schema');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/kchat');

let model = {};

/**
 * 建立集合模型
 * @param {Object} obj 模型骨架
 */
function set_model (obj) {
	for (let item in obj) {
		model[item] = mongoose.model(item, new mongoose.Schema(obj[item]));
	}
}

// 初始化模型
set_model(schema);

module.exports = {
	/**
	 * 获取集合模型
	 * @param  {String} name 集合名
	 * @return {Object}      模型
	 */
	get_model: function (name) {
		return model[name];
	},
	/**
	 * 添加新集合模型
	 * @param {Object} obj 模型骨架
	 */
	add_model: function (obj) {
		Object.assign(schema, obj);
		set_model(obj);
	}
}
// console.log('---------staring-----------');


// db.connection.on('error', function (error) {
// 	console.log(error);
// });
// db.connection.on('open', function () {
// 	console.log('连接成功!');
// });
