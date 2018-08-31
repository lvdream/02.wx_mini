import Page from '../../common/page';
const app = getApp();
var constant = app.globalData;
Page({
  data: {
    active: 0
  },
  uploadPhoto() {
    var that = this;
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        var tempFilePaths = res.tempFilePaths;
        upload(that, tempFilePaths);
      }
    })
  },
  onChange(event) {
    console.log(event)
    if(event.detail==1){
      wx.navigateTo({
        url: '',
      });
      wx.downloadFile({
        url: 'http://localhost:8080/download?file=4225ffa59f2348f0a928e45afc8099ce_new.xlsx',
        success: function (res) {
          var filePath = res.tempFilePath;
          console.log(res);
          wx.openDocument({
            filePath: filePath,
            success: function (res) {
              console.log('打开文档成功');
            }
          })
        }
      })
    }
  }
});
function upload(page, path) {
  wx.showToast({
    icon: "loading",
    title: "正在上传"
  }),
    wx.uploadFile({
      url: constant.SERVER_URL + "/upload",
      filePath: path[0],
      name: 'file',
      header: { "Content-Type": "multipart/form-data" },
      formData: {
        //和服务器约定的token, 一般也可以放在header中
        'session_token': wx.getStorageSync('session_token')
      },
      success: function (res) {
        if (res.statusCode != 200) {
          wx.showModal({
            title: '提示',
            content: '上传失败',
            showCancel: false
          })
          return;
        }
        var data = res.data
        
      },
      fail: function (e) {
        wx.showModal({
          title: '提示',
          content: '上传失败',
          showCancel: false
        })
      },
      complete: function () {
        wx.hideToast();  //隐藏Toast
      }
    })
}