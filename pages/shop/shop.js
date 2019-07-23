// pages/shop/shop.js


const shopApi = require('../../api/shopApi.js');
const fileUtil = require('../../utils/fileUtil.js')
Page({
    data: {

        markers: [],
        shop: null,
        imagewidth: 0,
        imageheight : 0,
        marqueePace: 1,//滚动速度
        marqueeDistance: 0,//初始滚动距离
        marquee_margin: 30,
        size:14,
        interval: 20 // 时间间隔

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
            }),self.scroll();
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

    onShow: function () {
       
      },

    scroll: function() {
        var that = this;
        var length = that.data.shop.description.length * that.data.size;//文字长度
        var windowWidth = wx.getSystemInfoSync().windowWidth;// 屏幕宽度
        //console.log(length,windowWidth);
        that.setData({
          length: length,
          windowWidth: windowWidth
        });
        that.scrolltxt();// 第一个字消失后立即从右边出现
    },
      
    scrolltxt: function () {
        var that = this;
        var length = that.data.length;//滚动文字的宽度
        var windowWidth = that.data.windowWidth;//屏幕宽度
        if (length < windowWidth){
          that.setData({ marquee_margin:"1000"});//只显示一条不滚动右边间距加大，防止重复显示
        } 
        var interval = setInterval(function () {
        var maxscrollwidth = length + that.data.marquee_margin;//滚动的最大宽度，文字宽度+间距，如果需要一行文字滚完后再显示第二行可以修改marquee_margin值等于windowWidth即可
        var crentleft = that.data.marqueeDistance;
        if (crentleft < maxscrollwidth) {//判断是否滚动到最大宽度
            that.setData({
            marqueeDistance: crentleft + that.data.marqueePace
            })
        }
        else {
            //console.log("替换");
            that.setData({
            marqueeDistance: 0 // 直接重新滚动
            });
            clearInterval(interval);
            that.scrolltxt();
        }
        }, that.data.interval);
        
    }
    
      
    
})