/**
 * 压缩插件
 */
const DEFALUT_WIDTH = 344;
const compress = (file, canvasId, _this, originalSize = false) => {
  wx.getImageInfo({
    src: file,
    success: function (res) {
      var ctx = wx.createCanvasContext(canvasId)
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
  wx.showLoading({ mask: true, title: '保存中...' })
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
                title:'保存成功',
                icon:'success',
                duration:2000
              })
            }
				  });
        }
      }
    });
}

module.exports = {
  compress: compress,
  saveFile: saveFile
}
