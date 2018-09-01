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
  navTo(url);
};
/**
 * 定义文件的上传
 * @param fileType: 文件类型{0,excel;1,text;2,english}
 */
function upload(fileType, that) {
  wx.chooseImage({
    count: 1, // 默认9
    sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
    sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
    success: function(res) {
      var tempFilePaths = res.tempFilePaths;
      uploadfiles(that, tempFilePaths, fileType);
    }
  });
};
/**
 * 具体上传文件方法
 * @param page 页面对象
 * @param path 上传路径
 * @param fileType 上传类型,识别类型[文本,Excel]
 */
function uploadfiles(page, path, fileType) {
  var url = constant.SERVER_URL + "/upload";
  wx.showToast({
      icon: "loading",
      title: "正在上传"
    }),
    wx.uploadFile({
      url: url,
      filePath: path[0],
      name: 'file',
      header: {
        "Content-Type": "multipart/form-data"
      },
      formData: {
        //和服务器约定的token, 一般也可以放在header中
        'session_token': wx.getStorageSync('session_token'),
        'type': fileType
      },
      success: function(res) {
        if (res.statusCode != 200) {
          showMsg('上传失败');
          return;
        }
        var data = res.data;
        try {
          var j = JSON.parse(data);
          if (null != j.data.error_code) {
            showMsg('文件解析失败,请重试!');
          } else {

          }
        } catch (e) {
          showMsg('上传失败');
        }
        console.log(data);

      },
      fail: function(e) {
        showMsg('上传失败');
      },
      complete: function() {
        wx.hideToast(); //隐藏Toast
      }
    })
};
/**
 * 显示提示框
 */
function showMsg(content) {
  wx.showModal({
    title: '提示',
    content: content,
    showCancel: false
  });
}
/**
 * 导航方法
 */
function navTo(url) {
  wx.navigateTo({
    url: url,
    fail: function() {
      showMsg('页面开了小差');

    }
  })
}
/**
 * 保存变量
 * @param key 保存的键值
 * @param value 对应的值
 */
function saveData(key, value) {
  wx.setStorageSync(key, value);
}

module.exports = {
  navigate: navigate,
  upload: upload
};