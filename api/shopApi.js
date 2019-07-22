/**
 * 商品api
 */
const cf = require("../config.js");
module.exports = {
    shopList: {
        url: cf.config.configUrl + "shop/list",
        data: {},
        method: 'GET'
    },

}