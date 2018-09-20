//logs.js
const util = require('../../utils/util.js')

Page({
  onLoad:function(e){
    let second = 2;
    const timer = setInterval(() => {
      second--;
      if (!second) {
        clearInterval(timer);
        wx.redirectTo({
          url: '../index/index'
        })
      }
    }, 1000);
  }
})
