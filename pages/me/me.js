const app = getApp()

Page({
  data: {
    userInfo: {},
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  onLoad: function () {
    this.autoGetUserInfo();
  },

  // 自动获取用户信息
  autoGetUserInfo() {
    if (app.globalData.loginInfo) {
      this.setData({
        userInfo: app.globalData.loginInfo.userInfo,
      })
    } else {
      // 由于 登陆 是异步请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.loginMethodsCallback = res => {
        this.setData({
          userInfo: res.userInfo,
        })
      }
    }
  },

  // 手动获取/更新信息
  getUserInfo(e) {
    app.loginMethod()
    
  },

  // 授权管理
  openAuthorize() {
    wx.openSetting({
      success: (res) => {
      },
      fail: err => {
        wx.showToast({
          title: '授权管理界面打开失败' + JSON.stringify(err),
          icon: 'none'
        })
      }
    })
  },

  // 清理缓存
  clearHistory() {
    wx.clearStorage({
      success: res => {
        wx.showToast({
          title: '清理完成',
          icon: 'none'
        })
      }
    })
  },
})
