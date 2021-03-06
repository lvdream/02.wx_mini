import Page from '../../common/page';
import Toast from '../../dist/toast/index';
var util = require('../../common/util.js');
Page({
  data: {
    active: 0,
    show: {
      middle: false
    }
  },
  uploadPhoto() {
    var that = this;
    util.upload(0, that, Toast, ['album']);
  },
  uploadCamera() {
    var that = this;
    util.upload(0, that, Toast, ['camera']);
  },
  onChange(event) {
    util.navigate(event);
  }
});