var util = require('../../common/util.js');
import Toast from '../../dist/toast/index';
Page({
  onLoad: function(options) {
    var getData = util.getData(util.constant.TEXT_KEY);
    this.setData({
      ocrValue: getData
    });
    if (getData) {
      util.saveClip(getData, function(res) {

      });
    }
  },
  textTranslate() {
   var rData = util.textTranslate(this.data.ocrValue, Toast,this);
    
  },
  data: {
    ocrValue: "",
    textValue: "",
    active: 1,
    text: '识别文字已经在你的剪贴板里面了'
  },
  onChange(event) {
    util.navigate(event);
  }
});