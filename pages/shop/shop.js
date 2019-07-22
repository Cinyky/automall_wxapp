// pages/shop/shop.js

const shopApi = require('../../api/shopApi.js');
const fileUtil = require('../../utils/fileUtil.js')
Page({
    data: {

        markers: [],
        shop: null,
        imagewidth: 0,
        imageheight : 0,
    },
    onLoad: function () {
        let self = this;
        let apiObj = shopApi.shopList;
        apiObj.success = function (res) {
            console.log("success", res);
            let shop = res.data[0];
            let markers = [];
            markers.push({
                id: 1,
                latitude: shop.latitude,
                longitude: shop.longitude,
                name: shop.name,
                iconPath: '/assets/image/location.png'
            });


            self.setData({
                shop: shop,
                markers: markers
            })
        };
        apiObj.fail = function (res) {
            console.log("fail", res);
        }
        wx.request(apiObj);
    },
    onReady: function (e) {
        this.mapCtx = wx.createMapContext('myMap')
    },
    map: function () {
        let self = this;
        wx.getLocation({
            type: 'gcj02', //返回可以用于wx.openLocation的经纬度
            success: function (res) {
                let latitude = res.latitude
                let longitude = res.longitude
                wx.openLocation({
                    latitude: self.data.shop.latitude,
                    longitude: self.data.shop.longitude,
                    scale: 28
                })
            }
        });
    },

    imageLoad: function (e) {
        let imageSize = fileUtil.imageUtil(e,1.0);
        this.setData({
          imagewidth: imageSize.imageWidth,
          imageheight: imageSize.imageHeight
        })
      },
      
    
})