// pages/goods/goods.js
const app = getApp()
const cf = require("../../config.js");
const goodsApi = require('../../api/goodsApi.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    good: null,
    goodsId: "",
    isshare: 0,
    images: [],
    imageUrl: goodsApi.imageUrl,
    windowWidth: app.globalData.windowWidth
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    let tmpGoodsId;
    if (options) {
      tmpGoodsId = options.goodsId;
      this.setData({
        goodsId: tmpGoodsId
      });
      if (options.isshare) {
        this.setData({
          isshare: options.isshare
        });
      }
    }
    let good = app.globalData.goodsMap[tmpGoodsId];
    if (good) {
      this.setData({
        good: good,
        images: good.carImages
      });
    } else {
      this.getGoodsDetail();
    }
    
   
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    let path = `/pages/goods/goods?goodsId=${this.data.goodsId}&isshare=1`;
    console.log(path);
    return {
      title: cf.config.appName,
      path: path
    };
  },
  /**
   * 获取商品信息
   */
  getGoodsDetail: function () {
    let _this = this;
    let apiObj = goodsApi.goodsDetail;
    apiObj.url =  `${apiObj.url}/${_this.data.goodsId}`
    apiObj.success = function (res) {
        console.log(res);
        let data = res.data;
        _this.setData({
            good: data,
            images: good.carImages
        })
        
    };
    apiObj.fail = function (res) {
        console.log(res);
    }
    wx.request(apiObj);
  },
 
  /**
  * 回到首页(分享的时候)
  */
  backHome: function () {
    wx.reLaunch({
      url: '/pages/index/index'
    })
  },
  phoneCall: ()=> {
    wx.makePhoneCall({
      phoneNumber: '1340000' //仅为示例，并非真实的电话号码
    })
  }
})