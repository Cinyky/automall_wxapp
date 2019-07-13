var app = getApp();
const goodsApi = require('../../api/goodsApi.js');

Page({
    data: {
        issq: 1,
        showModal: !1,
        kgvip: 1,
        isvip: 1,
        issc: 1,
        btnshowModal: 1,
        images: [],
        imageUrl: goodsApi.imageUrl,
    },
    
    onLoad: function(t) {
        
    },
    getGoods: function() {
        let goodsImageArr = [];
        let goodsMap = app.globalData.goodsMap;
        for (let key in goodsMap) {
            if (!goodsMap[key]) {
                continue;
            }
            goodsImageArr = goodsImageArr.concat(goodsMap[key].carImages);
        }
        this.setData({
            images: goodsImageArr
        });
    },
    bindGetUserInfo: function(t) {
        console.log(t),this.setData({
            btnshowModal: !1
        });
    },
    reLoad: function() {
       
    },
    onReady: function() {},

    onShow: function() {
        this.getGoods();
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {
       setTimeout(function() {
            wx.stopPullDownRefresh();
        }, 1e3);
    },
    onReachBottom: function() {}
});