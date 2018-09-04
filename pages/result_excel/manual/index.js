import Page from '../../../common/page';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    active: 0,
    manual_text: '点击[保存下载地址到剪贴板]按钮',
    steps: [{
        text: '步骤一',
        desc: '点击按钮',
        content: '点击[保存下载地址到剪贴板]按钮'
      },
      {
        text: '步骤二',
        desc: '获得网址',
        content: '程序会自动将下载文件的网址复制'
      },
      {
        text: '步骤三',
        desc: '下载文件[浏览器/微信]',
        content: '切换到手机浏览器,粘贴这个网址并打开,就可以获得Excel文件.\n 微信打开方式,打开任意一个聊天对话框,粘贴并且发送,就可以看到你发出的网址,点击网址便可以在微信中预览,之后就可以点击右上角进行分享了'
      }
    ]
  },


  nextStep() {
    this.setData({
      active: ++this.data.active % 3,
      manual_text: this.data.steps[this.data.active % 3].content
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})