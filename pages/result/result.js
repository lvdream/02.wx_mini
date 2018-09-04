var util = require('../../common/util.js');
var getData;
Page({
  onLoad: function(options) {
    getData = util.getData(util.constant.TEXT_KEY);
    this.setData({
      ocrValue: getData
    });
    if (file) {
      util.saveClip(file, function(res) {
        Toast.clear();
      });
    }
  },
  data: {
    ocrValue: ""
  }
});