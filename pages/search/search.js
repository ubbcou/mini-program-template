const app =getApp();
Page({
  data: {
    historyStatus: true,
    
    loading: false,
    loaded: false,

    form: {
      keyword: '',
      page: 1,
      pageSize: 30,
      withCoupon: true,
      sortType: 0
    },
  },

  onLoad() {
  },

  // 搜索词
  changeKeyWords(e) {
    const val = e.detail.value;
    this.setData({
      'form.keyword': val
    })
  },

  // 清清除搜索词
  clearKeyWord() {
    this.setData({
      'form.keyword': ''
    })
  },

  // 请求搜索结果
  submitSearch() {
    if(this.data.loading || !this.data.form.keyword) {
      return;
    }

    this.setData({
      historyStatus: false,
      loading: true
    })

    let form = this.data.form;
    console.log(form)

    return;
    wx.request({
      url: '',
      method: 'get',
      data: form,
      success(res) {

      },
      fail(err) {

      }
    })
  },

  // 历史搜索点击
  tapHistoryItem(e) {
    const val = e.currentTarget.dataset.key;
    this.setData({
      'form.keyword': val || '推荐'
    })
    this.submitSearch();
  }

})