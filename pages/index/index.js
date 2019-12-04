//index.js
//获取应用实例
const app = getApp();

const rec = wx.getRecorderManager();
const aud = wx.createInnerAudioContext();
var tempFilePath, filePath;
const fs = wx.getFileSystemManager();
rec.onStop((res) => {
  tempFilePath = res.tempFilePath;
  fs.saveFile({
    tempFilePath: tempFilePath,
    success: (res) => {
      filePath = res.savedFilePath;
    },
  });
});
aud.onError((res) => {
  console.log(res.errMsg);
  console.log(res.errCode);
});
var timer;

Page({
  data: {
    time: 0,
    question: '',
  },

  onLoad: function () {
    this.setData({
      question: app.globalData.question ? app.globalData.questions[0] : '未输入',
    });
  },

  startRecording: function () {
    rec.start({
      duration: 1000,
      format: 'mp3',
    });
    this.timing(45);
  },

  bindEnterQuestion: function () {
    wx.navigateTo({
      url: '../questions/questions',
    });
  },

  bindPlay: function () {
    aud.src = filePath;
    aud.play();
  },

  timing: function (sec) {
    const that = this
    var countDownTime = sec;
    timer = setInterval(function () { // 设置定时器
      countDownTime--
      if (countDownTime <= 0) {
        clearInterval(timer)
        that.setData({
          time: countDownTime,
        })
      } else {
        that.setData({
          time: countDownTime,
        })
      }
      console.log(countDownTime + "s")
    }, 1000)
  },

})


// //index.js
// //获取应用实例
// const app = getApp()

// Page({
//   data: {
//     motto: 'Hello World',
//     userInfo: {},
//     hasUserInfo: false,
//     canIUse: wx.canIUse('button.open-type.getUserInfo')
//   },
//   //事件处理函数
//   bindViewTap: function () {
//     wx.navigateTo({
//       url: '../logs/logs'
//     })
//   },
//   onLoad: function () {
//     if (app.globalData.userInfo) {
//       this.setData({
//         userInfo: app.globalData.userInfo,
//         hasUserInfo: true
//       })
//     } else if (this.data.canIUse) {
//       // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
//       // 所以此处加入 callback 以防止这种情况
//       app.userInfoReadyCallback = res => {
//         this.setData({
//           userInfo: res.userInfo,
//           hasUserInfo: true
//         })
//       }
//     } else {
//       // 在没有 open-type=getUserInfo 版本的兼容处理
//       wx.getUserInfo({
//         success: res => {
//           app.globalData.userInfo = res.userInfo
//           this.setData({
//             userInfo: res.userInfo,
//             hasUserInfo: true
//           })
//         }
//       })
//     }
//   },
//   getUserInfo: function (e) {
//     console.log(e)
//     app.globalData.userInfo = e.detail.userInfo
//     this.setData({
//       userInfo: e.detail.userInfo,
//       hasUserInfo: true
//     })
//   }
// })
