//logs.js
const util = require('../../utils/util.js')

Page({
    data: {
        logs: [],
        latitude: 23.099994,
        longitude: 113.324520,
        markers: [{
            id: 1,
            latitude: 23.099994,
            longitude: 113.324520,
            name: 'T.I.T 创意园',
            iconPath: '/assets/image/location.png'
        }],
        covers: [{
            latitude: 23.099994,
            longitude: 113.344520,
            iconPath: '/assets/image/location.png'
        }, {
            latitude: 23.099994,
            longitude: 113.304520,
            iconPath: '/assets/image/location.png'
        }],
    },
    onLoad: function () {
        this.setData({
            logs: (wx.getStorageSync('logs') || []).map(log => {
                return util.formatTime(new Date(log))
            })
        })
    },
    onReady: function (e) {
        this.mapCtx = wx.createMapContext('myMap')
    },
    map: function () {
        let self = this;
        wx.getLocation({
            type: 'gcj02', //返回可以用于wx.openLocation的经纬度
            success: function (res) {
                var latitude = res.latitude
                var longitude = res.longitude
                wx.openLocation({
                    latitude: self.data.latitude,
                    longitude: self.data.longitude,
                    scale: 28
                })
            }
        });
    },
})
