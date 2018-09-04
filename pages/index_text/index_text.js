import Page from '../../common/page';
import Toast from '../../dist/toast/index';
var util = require('../../common/util.js');
Page({
  data: {
    active: 1
  },
  uploadPhoto() {
    var that = this;
    util.upload(1, that, Toast);
  },
  onChange(event) {
    util.navigate(event);
  }
});