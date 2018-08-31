import Page from '../../common/page';
var util = require('../../common/util.js');
Page({
  data: {
    active: 1
  },
  uploadPhoto() {
    var that = this;
    util.upload(1, that);
  },
  onChange(event) {
    util.navigate(event);
  }
});