import axios from "axios";
import { getToken,removeToken } from "@/utils/auth";
import {  message } from "@/utils/resetMessage";
import router from "@/router";

const service = axios.create({
  //定义服务的返回状态码是多少,promise实例是成功的
  validateStatus: function (status) {
    return (status >= 200 && status < 300) ; // default
  },
  timeout: 90000, // request timeout
  //下载进度
  onDownloadProgress: (p) => {
    return 100 * (p.loaded / p.total);
  },
});

service.interceptors.request.use(
  (config) => {
    // eslint-disable-next-line no-undef
    config.baseURL = VUE_APP_BASE_API; //给axios实例的baseURL赋值
    const testToken =getToken();//process.env.NODE_ENV=='development'?'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxOjExMDE6MDoxNjMzMDA1OTg3MjA2NjUxOTA1Om51bGwiLCJleHAiOjE2ODA3NjQ0NzIsImlhdCI6MTY4MDc2MDg3Mn0.oCKJ3ilV2Z3rSfymb1EEo7aXBpPLKVCFoqk28P-9oH4' :
    if (testToken) {
      config.headers["X-Token"] = testToken;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
   */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  (response) => {
    const res = response.data;
    //在此数组的接口不用判断状态码
    let requestUrls = [
      // '/teachingassistant/web/rtc/getToken'
    ];

    if (
      res&&res.code == 200 ||
      (requestUrls.includes(response.config.url) && response.status == 200)
    ) {
      return res;
    } else {

      return Promise.reject(response);
    }
  },
  (error) => {
    if(error.response&&error.response.status){
      switch(error.response.status){
        case 401:
          //未登录
          router.replace({
            path:'/login'
          })
          break;
        case 403:
          //登录过期
          removeToken()
          message.error({
            message: '登录过期，请重新登录',
            type: "error",
            duration: 1000,
          });
          setTimeout(()=>{
            router.replace({
              path:'/login'
            })
          },3000)
          break;
        default:
          message.error({
            message: error.response.data.msg,
            type: "error",
            duration: 3 * 1000,
          });
      }
    }else if(error.code=="ECONNABORTED"){
      message.error({
        message: '网络请求超时！',
        type: "error",
        duration: 3 * 1000,
      });
    }
    console.log(error)

    return Promise.reject(error);
  }
);

export default service;

// 判断
// function isJSON(str) {
//   if (typeof str == "string") {
//     try {
//       JSON.parse(str);
//       return true;
//     } catch (e) {
//       return false;
//     }
//   }
// }
