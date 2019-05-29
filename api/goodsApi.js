/**
 * 商品api
 */
let cf = require("../config.js");
module.exports = {
	imageUrl: cf.config.configUrl + "file/image/",
	goodsList: {
		url: cf.config.configUrl + "goods/list",
		data: {
		},
		method: 'GET'
	}

}