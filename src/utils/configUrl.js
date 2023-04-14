import axios from 'axios'

/**
 * 请求获取项目路径配置
 */
async function getConfig() {
    if (process.env.NODE_ENV === "development") {
        configUrl(process.env.VUE_APP_BASE_API,process.env.VUE_APP_WEBSOCKET_URL)
    }else {
        try {
            let res = await axios.get(`/config`);
            //给配置地址赋值
            configUrl(res.data.VUE_APP_BASE_API,res.data.VUE_WEBSOCKET_URL)
        } catch (e) {
            console.log('请求路径配置错误:' + e)
        }
    }
}

/**
 * 将获取的配置路径赋值给全局的路径变量
 */
function configUrl(url,socketUrl){
    // 服务地址
    window.VUE_APP_URL = url;

    // 接口的线上环境
    window.VUE_APP_BASE_API = process.env.NODE_ENV === 'development' ? `${url}${process.env.VUE_APP_BASE_PORT}` : `${url}/api`;
    axios.post(`${VUE_APP_BASE_API}/basedata/school/info`,  {"schoolId": 1}).then(res=>{
        document.querySelector('link').setAttribute('href',res.data.data.logoIco);
        sessionStorage.setItem('schoolInfo',JSON.stringify(res.data.data))
    })

    //websocket链接地址
    window.VUE_APP_WEBSOCKET_URL = socketUrl;
    //登录页访问地址
    window.VUE_APP_LOGIN_URL = url;
    //客户端下载链接
    window.VUE_APP_CLIENTDOWNLOAD_URL = `${url}/clientDownload`;
    //基础资料访问地址
    window.VUE_APP_USERINFO_URL = `${url}/accountManage/#/account/accountInfo`
    //文件预览地址
    window.VUE_FILE_PREVIEW = `${url}${process.env.NODE_ENV === 'development' ?process.env.VUE_APP_BASE_PORT:''}/preview/onlinePreview`
    //接口的拼接字段
    window.VUE_INTERFACE = 'pc/'
    //接口的拼接字段
    window.VUE_INTERFACE_FIEID =  '/studentlearningcenter/web'
    console.log(window.VUE_APP_LOGIN_URL)
}

export default getConfig
