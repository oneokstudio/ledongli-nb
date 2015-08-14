var WXSHARE = {

    config: {
        title: document.title,
        desc: '',
        link: location.href,
        imgUrl: '',
        successCallback: null,
        trigger: function (res) {
    //                alert('用户点击发送给朋友');
        },
        success: function (res) {
          ga('send', 'event', 'button', 'click', 'share');
          if (this.successCallback) {
            this.successCallback();
          }
        },
        cancel: function (res) {
    //                alert('已取消');
        },
        fail: function (res) {
    //                alert(JSON.stringify(res));
        }
    },

    init: function (config) {
      var _this = this;
      $.post ('/event-api/wx/config', {url:location.href}, function (res) {
          var _data = res.data.sign;
          wx.config({
              debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
              appId: 'wxe698f11ffa868d84', // 必填，公众号的唯一标识
              timestamp: _data.timestamp, // 必填，生成签名的时间戳
              nonceStr: _data.nonceStr, // 必填，生成签名的随机串
              signature: _data.signature,// 必填，签名，见附录1
              jsApiList: [
                  //分享
                  'onMenuShareTimeline',
                  'onMenuShareAppMessage',
                  'onMenuShareQQ',
                  'onMenuShareWeibo'
              ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
          });
          $.extend(_this.config, config);
          _this.set(_this.config);
      });
    },

    set: function (shareData) {
        var _config = $.extend(this.config, shareData);

        wx.ready(function () {
            wx.onMenuShareTimeline(_config);
            wx.onMenuShareAppMessage(_config);
            wx.onMenuShareWeibo(_config);
            wx.onMenuShareQQ(_config);
        });
    }
};