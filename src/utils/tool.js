/**
 * 时间格式化
 * @param {Date} dates 时间戳
 * @returns 日期格式
 */
export function dateFormat(dates) {
  let date = new Date(dates);
  let YY = date.getFullYear() + '-';
  let MM =
      (date.getMonth() + 1 < 10
          ? '0' + (date.getMonth() + 1)
          : date.getMonth() + 1) + '-';
  let DD = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
  let hh =
    (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
  let mm =
    (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) +
    ':';
  let ss = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
  return YY + MM + DD +' '+ hh + mm + ss;
}
/**
 * html剔除富文本标签，留下纯文本
 */
export function getSimpleText(html) {
  var re1 = new RegExp("<.+?>","g");//匹配html标签的正则表达式，"g"是搜索匹配多个符合的内容
  var msg = html.replace(re1,'');//执行替换成空字符
  return msg;
}
/**
 * 将秒数转化为时分秒
 */
export function formateTime(time,isChat) {
  const h = parseInt(time / 3600)
  const minute = parseInt(time / 60 % 60)
  const second = Math.ceil(time % 60)

  const hours = h < 10 ? '0' + h : h
  const formatSecond = second > 59 ? 59 : second
  if(isChat) {
    return `${hours > 0 ? `${hours}时` : ''}${minute > 0 ? `${minute}分` : ''}${formatSecond > 0? `${minute}秒` : '--秒'}`
  }else {
    return `${hours > 0 ? `${hours}:` : '00:'}${minute < 10 ? '0' + minute : minute}:${formatSecond < 10 ? '0' + formatSecond : formatSecond}`
  }

}



/**
 * 获取传递的日期距离当前日期的时间差值
 * @param {Date} optionTime
 * @returns 距离当前时间差描述
 */
export function differTime(optionTime) { //d1作为一个变量传进来
  //如果时间格式是正确的，那下面这一步转化时间格式就可以不用了
  if (!optionTime) {
    return false;
  }
  var dateBegin = new Date(optionTime.replace(/-/g, "/")); //将-转化为/，使用new Date
  var dateEnd = new Date(); //获取当前时间
  var dateDiff = dateEnd.getTime() - dateBegin.getTime(); //时间差的毫秒数
  var dayDiff = Math.floor(dateDiff / (24 * 3600 * 1000)); //计算出相差天数
  var leave1 = dateDiff % (24 * 3600 * 1000) //计算天数后剩余的毫秒数
  var hours = Math.floor(leave1 / (3600 * 1000)) //计算出小时数
  //计算相差分钟数
  var leave2 = leave1 % (3600 * 1000) //计算小时数后剩余的毫秒数
  var minutes = Math.floor(leave2 / (60 * 1000)) //计算相差分钟数
  //计算相差秒数
  var leave3 = leave2 % (60 * 1000) //计算分钟数后剩余的毫秒数
  var seconds = Math.round(leave3 / 1000)
  // console.log(" 相差 "+dayDiff+"天 "+hours+"小时 "+minutes+" 分钟"+seconds+" 秒")
  var returnStr = '';
  if (dayDiff > 0) {
    if (dayDiff > 30 && dayDiff < 365) {
      returnStr = ~~(dayDiff / 30) + '月前'
    } else if (dayDiff > 365) {
      returnStr = optionTime;
    } else {
      returnStr = dayDiff + '天前';
    }
  } else if (dayDiff <= 0 && hours > 0) {
    returnStr = hours + '小时前'
  } else if (dayDiff <= 0 && hours <= 0 && minutes > 0) {
    returnStr = minutes + '分钟前'
  } else {
    returnStr = (seconds == 0 ? 1 : seconds) + '秒前'
  }
  return returnStr;
}


/**
 * 获取当前时间
 */
export function getCurrentTime(isDate = false,beforeTime = 0) {
  var now = new Date();
  var year = now.getFullYear();       //年
  var month = now.getMonth() + 1;     //月
  var day = now.getDate();            //日

  //获取前多少分钟时间
  var minutes = parseInt(beforeTime);
  var interTimes= minutes * 60 * 1000;
  now = new Date(Date.parse(now) - interTimes);

  var hh = now.getHours(); //时
  var mm = now.getMinutes() % 60;  //分
  var ss = now.getSeconds();  //秒
  if (now.getMinutes() / 60 > 1) {
    hh += Math.floor(now.getMinutes() / 60);
  }

  var clock = year + "-";

  if(month < 10)
    clock += "0";

  clock += month + "-";

  if(day < 10)
    clock += "0";


  if(isDate){
    return clock += day;
  }else{
    clock += day + " ";
  }


  if(hh < 10)
    clock += "0";

  clock += hh + ":";
  if (mm < 10) clock += '0';


  clock += mm + ":";

  if (ss < 10) clock += '0';

  clock += ss;
  return(clock);
}
