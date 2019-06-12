/**
 * 压缩插件
 */

const app = getApp()
const DEFALUT_WIDTH = 344;
const compress = (file, canvasId, _this, originalSize = false) => {
    wx.getImageInfo({
        src: file,
        success: function (res) {
            let ctx = wx.createCanvasContext(canvasId)
            //设置canvas尺寸
            let originalWidth = res.width;
            let originalHeight = res.height;
            let targetWidth = res.width;
            let targetHeight = res.height;
            if (originalSize) {
                let width = DEFALUT_WIDTH;
                if (res.width < width) {
                    width = res.width;
                }
                targetWidth = width;           //按宽度344px的比例压缩
                targetHeight = Math.trunc(width * originalHeight / originalWidth);        //根据图片比例换算出图片高度
            }
            _this.setData({
                canvas_w: targetWidth,
                canvas_h: targetHeight
            })
            ctx.drawImage(file, 0, 0, originalWidth, originalHeight, 0, 0, targetWidth, targetHeight)
            ctx.draw(false, function () {
                wx.canvasToTempFilePath({
                    canvasId: canvasId,
                    fileType: "jpg",
                    success: function (res) {
                        console.log(res.tempFilePath)
                        saveFile(res.tempFilePath);
                    }
                }, this)
            })
        }
    })
}

/**
 * 文件保存
 * @param {文件} filePath
 */
const saveFile = (filePath) => {
    wx.showLoading({mask: true, title: '保存中...'})
    wx.getSetting({
        success: (res) => {
            // 首次请求权限
            if (res.authSetting['scope.writePhotosAlbum'] === undefined) {
                wx.authorize({
                    scope: 'scope.writePhotosAlbum',
                    success: () => {
                        saveFile(filePath);
                    },
                    fail: wx.hideLoading
                })
            } else if (res.authSetting['scope.writePhotosAlbum'] === false) {
                wx.hideLoading()
                // 提示开启权限
                wx.showModal({
                    title: '',
                    content: '请打开小程序使用相册的权限',
                    confirmText: '去开启',
                    success: (modalRes) => {
                        if (modalRes.confirm) {
                            wx.openSetting({
                                success: (settingRes) => {
                                    if (settingRes.authSetting['scope.writePhotosAlbum']) {
                                        saveFile(filePath);
                                    }
                                }
                            })
                        }
                    }
                })
            } else {
                wx.saveImageToPhotosAlbum({
                    filePath: filePath,
                    success(res) {
                        console.log("保存图片成功")
                        console.log(res)
                        wx.showToast({
                            title: '保存成功',
                            icon: 'success',
                            duration: 2000
                        })
                    }
                });
            }
        }
    });
}

/**
 * 图片视觉宽高计算函数区 
 **/
const wxParseImgLoad = (e, target) => {
    let that = target;
    //因为无法获取view宽度 需要自定义padding进行计算，稍后处理
    let recal = wxAutoImageCal(e.detail.width, e.detail.height);
    that.adaptImageSize(e.currentTarget.dataset.idx, recal);
  }
  
  // 计算视觉优先的图片宽高
const wxAutoImageCal = (originalWidth, originalHeight ) => {
    //获取图片的原始长宽
    let windowWidth = app.globalData.windowWidth, windowHeight = app.globalData.windowHeight;
    let autoWidth = 0, autoHeight = 0;
    let results = {};
    //判断按照那种方式进行缩放
    console.log("windowWidth" + windowWidth);
    autoWidth = windowWidth;
    console.log("autoWidth" + autoWidth);
    autoHeight = (autoWidth * originalHeight) / originalWidth;
    console.log("autoHeight" + autoHeight);
    results.imageWidth = autoWidth;
    results.imageheight = autoHeight;
    return results;
  }

module.exports = {
    compress: compress,
    saveFile: saveFile,
    wxParseImgLoad: wxParseImgLoad
}
