export default function (options = {}) {
  return Page({
    onShareAppMessage() {
      return {
        title: '小贝复制'
      };
    },
    ...options
  });
}