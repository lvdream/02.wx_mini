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
    url = "/pages/out/index";
  } else {
    url = "/pages/result_excel/result";
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
      that.toggle('middle');
      uploadfiles(that, tempFilePaths, fileType,that);
    }
  });
};
/**
 * 具体上传文件方法
 * @param page 页面对象
 * @param path 上传路径
 * @param fileType 上传类型,识别类型[文本,Excel]
 * @param that 页面对象
 */
function uploadfiles(page, path, fileType,that) {
  var url = constant.SERVER_URL + "/upload";
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
          that.toggle('middle');
          showMsg(constant.MSG_UPLOAD_ERROR);
          return;
        }
        var data = res.data;
        try {
          var j = JSON.parse(data);
          if (null != j.data.error_code) {
            that.toggle('middle');
            showMsg('文件解析失败,请重试!');
          } else {
            
            saveData(constant.FILE_KEY, j.data.returnstr);
            that.toggle('middle');
            navTo("/pages/result_excel/result");
          }
        } catch (e) {
          that.toggle('middle');
          showMsg(constant.MSG_UPLOAD_ERROR);
        }
      },
      fail: function(e) {
        that.toggle('middle');
        showMsg(constant.MSG_UPLOAD_ERROR);
      },
      complete: function() {
        that.toggle('middle');
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
 * 下载远程文件并且打开
 */
function openFile(fileRemote) {
  wx.downloadFile({
    url: constant.SERVER_URL + "/download?file=" + fileRemote,
    success: function(res) {
      var filePath = res.tempFilePath
      wx.openDocument({
        filePath: filePath,
        success: function(res) {
          console.log('打开文档成功')
        }
      })
    }
  });
}
/**
 * 下载远程文件并且保存
 */
function saveFile(fileRemote) {
  wx.downloadFile({
    url: constant.SERVER_URL + "/download?file=" + fileRemote,
    success: function (res) {
      var filePath = res.tempFilePath
      wx.saveFile({
        tempFilePath: filePath,
      });
    }
  });
}
/**
 * 保存变量
 * @param key 保存的键值
 * @param value 对应的值
 */
function saveData(key, value) {
  wx.setStorageSync(key, value);
}
/**
 * 获取变量
 * @param key 保存的键值
 */
function getData(key) {
  return wx.getStorageSync(key);
}
module.exports = {
  navigate: navigate,
  upload: upload,
  constant: constant,
  getData: getData,
  saveData: saveData,
  openFile: openFile,
  saveFile: saveFile
};