const app = getApp();
var constant = app.globalData;
/**
 * 定义导航共用方法
 */
function navigate(eventObj) {
  var url = "";
  if (eventObj.detail == 0) {
    url = "/pages/index/index";
  } else if (eventObj.detail == 1) {
    url = "/pages/index_text/index_text";
  } else {
    url = "/pages/index_eng/index_eng";
  }
  wx.navigateTo({
    url: url
  });
};
/**
 * 定义文件的上传
 * @param fileType: 文件类型{0,excel;1,text;2,english}
 */
function upload(fileType,that){
  wx.chooseImage({
    count: 1, // 默认9
    sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
    sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
    success: function (res) {
      var tempFilePaths = res.tempFilePaths;
      uploadfiles(that, tempFilePaths);
    }
  });
};
function uploadfiles(page, path) {
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
};
module.exports = {
  navigate:  navigate,
  upload: upload
};