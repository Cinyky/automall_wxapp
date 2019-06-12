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
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _this = this;
    _this.setData({
      goodsId : options.goodsId
    });
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
    let t = this;
    let path = `/pages/goods/goods?goodsId=${t.data.goodsId}`;
    return {
      title: cf.config.appName,
      path: path,
      success() {
        wx.showModal({
          title:'提示',
          content:'分享成功'
        });
      }
    };
  },
  /**
   * 获取商品信息
   */
  getGoodsDetail: () => {
    let self = this;
    let apiObj = goodsApi.goodsDetail;
    apiObj.success = function (res) {
        console.log(res);
        let data = res.data;
        
        self.setData({
            goods: data,
           
        })
        
    };
    apiObj.fail = function (res) {
        console.log(res);
    }
    wx.request(apiObj);
},
})