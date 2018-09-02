var util = require('../../common/util.js');
Page({
  data: {
    active: 2,
    text: '文件解析完成,请点击以下按钮或者右上角分享....'
  },
  onChange(event) {
    util.navigate(event);
  },
  preview(){
    var file = util.getData(util.constant.FILE_KEY);
    if(file){
      util.openFile(file);
    }
  },
  save(){
    var file = util.getData(util.constant.FILE_KEY);
    if (file) {
      util.saveFile(file);
      wx.getSavedFileList({
        success: function (res) {
          console.log(res.fileList);
          var files = res.fileList;
          console.log(files[0]);
          console.log(files[0].filePath);
          util.openFile(files[0].filePath);
        }
      });
    }
  },
  //分享功能
  onShareAppMessage: function(res) {
    var that = this;
    //分享的类型为按键类型
    if (res.from == "button") {
      return {
        title: '小贝复制--分享给您的Excel',
        path: '/pages/index/index',
        success: function(res) {

        }
      }

    }

    //分享类型中右上角的分享
    else {

      return {
        title: '小贝复制--分享给您的Excel',
        path: '/pages/index/index',
        success: function(res) {


        }
      }


    }
  }
});