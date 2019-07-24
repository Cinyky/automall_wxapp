//index.js
//获取应用实例
const app = getApp()
const goodsApi = require('../../api/goodsApi.js');
const fileUtil = require('../../utils/fileUtil.js')
const TOTAL_NUM = 10;
const EACH_NUM = 2;

Page({
    data: {
        isIndexShowMag: false,  
        motto: 'Hello World',
        userInfo: {},
        hasUserInfo: false,
        canIUse: wx.canIUse('button.open-type.getUserInfo'),
        imageUrl: goodsApi.imageUrl,
        goodsList: [],
        images: [],
        imageSize: [],
        imageArray: [],
        windowWidth: app.globalData.windowWidth
    },
    //事件处理函数
    bindViewTap: function () {
        wx.navigateTo({
            url: '../logs/logs'
        })
    },
  

    onLoad: function () {
        let self = this; 

        // 获取用户信息
        if (app.globalData.userInfo) {
            self.setData({
                userInfo: app.globalData.userInfo,
                hasUserInfo: true
            })
        } else if (this.data.canIUse) {
            // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
            // 所以此处加入 callback 以防止这种情况
            app.userInfoReadyCallback = res => {
                self.setData({
                    userInfo: res.userInfo,
                    hasUserInfo: true
                })
            }
        } else {
            // 在没有 open-type=getUserInfo 版本的兼容处理
            wx.getUserInfo({
                success: res => {
                    app.globalData.userInfo = res.userInfo
                    self.setData({
                        userInfo: res.userInfo,
                        hasUserInfo: true
                    })
                }
            })
        }

        this.getGoodsList();
        
        let show = wx.getStorageSync("isIndexShowMag") || false;
        if (!show) {
            wx.setStorageSync("isIndexShowMag", true);
            this.setData({
                isIndexShowMag: true
            });
        }

    },
    getGoodsList() {
        let self = this;
        let apiObj = goodsApi.goodsList;
        apiObj.success = function (res) {
            console.log(res);
            let goods = res.data;
            let totalNum = 0;
            let tmpImages = [];
            let goodsMap = {};
            for (let good of goods) {
                goodsMap[good.id] = good;
                if (totalNum >= TOTAL_NUM) {
                    continue;
                }
                let num = 0;
                for (let image of good.carImages) {
                    if (num >= EACH_NUM || totalNum >= TOTAL_NUM) {
                        break;
                    }
                    image.title = good.title;
                    tmpImages.push(image);
                    num--;
                    totalNum++;
                }
            }
            tmpImages.sort(function() {
                return (0.5 - Math.random());
            })
            self.setData({
                goodsList: goods || [],
                images: tmpImages || []
            })
            app.globalData.goodsMap = goodsMap || {};
            
        };
        apiObj.fail = function (res) {
            console.log(res);
        }
        wx.request(apiObj);
    },

    getUserInfo: function (e) {
        console.log(e)
        app.globalData.userInfo = e.detail.userInfo
        this.setData({
            userInfo: e.detail.userInfo,
            hasUserInfo: true
        })
    },
    onChooseImage: function () {
        let self = this;
        wx.chooseImage({
            count: 9,
            sizeType: ["compressed"],
            sourceType: ["album", "camera"],
            success: function (e) {
                let images = e.tempFiles;
                for (let i = 0; i < images.length; i++) {
                    let image = images[i];
                    self.save(image.path);
                }
                self.setData({
                    imageArray: images,
                });
            }

        });
    },

    /**
     * 压缩
     */
    compress() {
        let _this = this;
        wx.chooseImage({
            count: 1,
            sizeType: ['compressed'],
            success: function (photo) {
                fileUtil.compress(photo.tempFilePaths[0], 'photo_canvas', _this);
            }
        })

    },
    wxParseImgLoad(e) {
        fileUtil.wxParseImgLoad(e,this);
    },
    adaptImageSize(idx, size) {
        this.data.imageSize[idx] = size;
    },
    goodsDetail(e) {
        let goodsId = e.currentTarget.dataset.goods;
        wx.navigateTo({
            url: `/pages/goods/goods?goodsId=${goodsId}&isshare=0`
        });
    },
    closeMsk() {
        this.setData({
          isIndexShowMag: false
        });
    },
     /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {
        let path = `/pages/index/index?isshare=1`;
        console.log(path);
        return {
        path: path,
        };
    },

})