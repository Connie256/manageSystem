import _ from "lodash";

// 全局方法注册
export default {
  install(Vue, options) {
    /**
     * @description 筛选课程数组中没有封面图的课程，并且给上默认封面图
     * @param {Array} arr 课程数组
     *  @param {String} coverName 课程封面图字段名称
     */
    Vue.prototype.$getCourseCover = (arr, coverName = 'coursePic') => {
      //默认封面图图片
      let defaultImg = [
        require("@/assets/common/def1.png"),
        require("@/assets/common/def2.png"),
        require("@/assets/common/def3.png"),
        require("@/assets/common/def4.png"),
      ]
      //默认封面图字体颜色
      let defaultColor = ["#2E83ED", "#EB5E5E", "#179330", "#134046"];
      arr.forEach((item, index) => {
        if (!item[coverName]) {
          item[coverName] = defaultImg[index % 4];
          item.color = defaultColor[index % 4];
        }
      });
      return arr;
    }
    /**
     * @description 对象数组根据共同key字段分组
     * @param {Array} arr 对象数组
     * @param {String} key 共同的字段名
     */
    Vue.prototype.$classify = (arr, key) => {
        let map = {};
        let myArr = [];
        for (let i = 0; i < arr.length; i++) {
          if (!map[arr[i][key]]) {
            myArr.push({
              id: arr[i][key],
              data: [arr[i]],
            });
            map[arr[i][key]] = arr[i];
          } else {
            for (let j = 0; j < myArr.length; j++) {
              if (arr[i][key] === myArr[j].id) {
                myArr[j].data.push(arr[i]);
                break;
              }
            }
          }
        }
        return myArr;
      },
      Vue.prototype.$randomNumTemp = (n) => {
        var t = "";
        for (var i = 0; i < n; i++) {
          t += Math.floor(Math.random() * 10);
        }
        return t;
      };
    // Vue.prototype.$utils = utils
    Vue.prototype.$isEmpty = function (data) {
      if (/^\d+(\.\d+)?$/.test(data)) {
        return false;
      }
      return _.isEmpty(data);
    };
    Vue.prototype.$clone = function (data) {
      return _.cloneDeep(data);
    };
    /***
     * 消息提示
     * @param msg
     * @param temp 类型值 默认是成功，1是错误，2是警告
     */
    (Vue.prototype.$msgTip = function (msg, temp) {
      let type = "success";
      if (temp) {
        switch (temp) {
          case 1:
            type = "error";
          case 2:
            type = "warning";
        }
      }
      this.$message({
        message: msg,
        type: type,
        duration: 1500,
      });
    }),
    /**
     * 时间格式化
     * @param {时间} time
     */
    (Vue.prototype.$timeFormate = function (time) {
      let date = new Date(time);
      let min =
        date.getMinutes() > 9 ? date.getMinutes() : "0" + date.getMinutes();
      let hour =
        date.getHours() > 9 ? date.getHours() : "0" + date.getHours();
      let sec =
        date.getSeconds() > 9 ? date.getSeconds() : "0" + date.getSeconds();
      return hour + ":" + min + ":" + sec;
    }),
    /**
     * 日期格式化
     * @param {时间} time
     */
    (Vue.prototype.$dateFormate = function (time) {
      let date = new Date(time);
      let year = date.getFullYear();
      let mon =
        date.getMonth() + 1 > 9 ?
        date.getMonth() + 1 :
        "0" + (date.getMonth() + 1);
      let day = date.getDate() > 9 ? date.getDate() : "0" + date.getDate();
      let min =
        date.getMinutes() > 9 ? date.getMinutes() : "0" + date.getMinutes();
      let hour =
        date.getHours() > 9 ? date.getHours() : "0" + date.getHours();
      let sec =
        date.getSeconds() > 9 ? date.getSeconds() : "0" + date.getSeconds();
      return (
        year + "-" + mon + "-" + day + "  " + hour + ":" + min + ":" + sec
      );
    }),
    /**
     * @description 生成区间随机数
     * @param {number} minNum 区间最小值
     * @param {number} maxNum 区间最大值
     * @returns
     */
    (Vue.prototype.$randomNum = function (minNum, maxNum) {
      switch (arguments.length) {
        case 1:
          return parseInt(Math.random() * minNum + 1, 10);
          break;
        case 2:
          return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10);
          break;
        default:
          return 0;
          break;
      }
    });
  },
};