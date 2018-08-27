const app = getApp();
var constants;
var getData;
Page({
  onLoad: function (options) {
    constants = app.globalData;
    getData = wx.getStorageSync('orcData').data.returnstr;
    this.setData({
      ocrValue: getData
    })
      }, 
      data: {
        ocrValue: ""
  }
});
