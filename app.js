App({
  onLaunch: function () {
    this.determineWhetherToRelogin();
  },
  globalData: {
    temp: '',
    loginInfo: null
  },

  // 登陆事件
  loginMethod() {
    let encryptedData;
    let iv;
    let rawData;
    let signature;
    wx.showLoading({
      title: '...',
    })
    wx.login({
      success: wxloginInfo => {
        wx.getUserInfo({
          success: getuser => {
            // 可以将 res 发送给后台解码出 unionId
            setTimeout(() => {

              // 将以下键值对发送给后台，自定义登录
              console.log('do login request', {
                js_code: wxloginInfo.code,
                iv: getuser.iv,
                encrypted_data: getuser.encryptedData,
                rawData: getuser.rawData
              })
              const myLoginInfo = {
                token: 'here is a mock token',
                userInfo: { ...getuser.userInfo }
              };
              // 将用户登陆后的信息以callback的形式返回 ( 1号位置 )
              if (this.loginMethodsCallback) {
                this.loginMethodsCallback(myLoginInfo);
              }
              this.globalData.loginInfo = myLoginInfo;
              wx.setStorage({
                key: 'loginInfo',
                data: myLoginInfo
              })
              wx.hideLoading();
              wx.showToast({
                title: '用户信息更新完成',
                icon: 'none'
              })
            }, 3000)
          },
          fail: err => {
            // wx.getUserInfo 失败（网络原因或者未授权）
            console.log("can't do login rquest", err)
          }
        })
      },
      fail: err => {
        // wx.login 失败
        console.log('wx.login err' + err)
      }
    })

  },

  // 判断何时执行登陆事件（更新登陆信息）
  determineWhetherToRelogin() {
    const _this = this;
    // 1. 先判断本地有无缓存
    wx.getStorage({
      key: 'loginInfo',
      success: (result) => {
        // 2. 然后判断是否过期
        wx.checkSession({
          success: () => {
            //session_key 未过期，并且在本生命周期一直有效
            _this.globalData.loginInfo = result.data;
            // 将用户登陆后的信息以callback的形式返回 ( 2号位置 )
            if (_this.loginMethodsCallback) {
              _this.loginMethodsCallback(result.data);
            }
          },
          fail: () => {
            // session_key 已经失效，需要重新执行登录流程
            _this.loginMethod();
          }
        })
      },
      fail: err => {
        _this.loginMethod();
      }
    })
  },

  // 打开页面 , data-url="pages/.../..."
  openPage(e) {
    console.log(e)
    let url;
    try {
      url = e.currentTarget.dataset.url;
    } catch(err) {
      url = "/pages/index/index";
    }
    wx.navigateTo({
      url: url
    });
  }
})