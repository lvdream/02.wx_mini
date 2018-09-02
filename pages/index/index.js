import Page from '../../common/page';
var util = require('../../common/util.js');
Page({
  data: {
    active: 0,
    show: {
      middle: false
    }
  },
  toggle(type) {
    this.setData({
      [`show.${type}`]: !this.data.show[type]
    });
  },
  uploadPhoto() { 
    var that = this;
    util.upload(0,that);
  },
  onChange(event) {
    util.navigate(event);
  }
});