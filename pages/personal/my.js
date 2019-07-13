var app = getApp();

Page({
    data: {
        issq: 1,
        showModal: !1,
        kgvip: 1,
        isvip: 1,
        issc: 1,
        btnshowModal: 1
    },
    
    onLoad: function(t) {
        
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