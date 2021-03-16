import axios from "axios";
import { Loading } from 'element-ui';
// console.log('== baseURL ==',baseURL.baseURL)
import { Message } from 'element-ui';
// import Qs from "qs";
axios.defaults.timeout = 30 * 1000;
// axios.defaults.baseURL = baseURL? baseURL.baseURL:'http://127.0.0.1';
axios.defaults.withCredentials = true;
axios.defaults.headers.post["Content-Type"] =
    "application/json;charset=UTF-8";

let deviceInfoData = null
let msg = '网络开小差了，请稍后重试';


let loading = false
//请求拦截
axios.interceptors.request.use(
    config => {
        if (!loading) {
            // isShowLoading
            if (config.data && config.data.isShowLoading == false) {
                delete config.data.isShowLoading;
            } else {
                loading = Loading.service({ fullscreen: true });
            }
        }
        // 根据请求类型进行更改数据
        let obj = {
            'get': () => {
                let t = {
                    // _: +new Date()
                };
                let params = config.params ? { ...config.params, ...t } : t;
                // 如果app版本信息存在，则提交
                if (deviceInfoData) {
                    params = { ...deviceInfoData, ...params }
                }
                config.params = params;
            },
            'post': () => {
                if (config.data) {
                    // 如果app版本信息存在，则提交
                    if (deviceInfoData) {
                        config.data = { ...deviceInfoData, ...config.data }
                    }
                    // console.log(config.data,'post == config.data ==')
                    // config.data = qs.stringify(config.data);
                    let postFormDataval = new FormData()
                    for (let item in config.data) {
                        postFormDataval.append(item, config.data[item])
                    }
                    config.data = postFormDataval
                }

            }
        }

        obj[config.method] && obj[config.method]();
        return config
    },
    error => {
        return Promise.reject(error);
    }
);

//响应拦截
axios.interceptors.response.use(
    response => {
        if (+response.data.code === 100002) {
            Message({
                message: "请登录后使用",
                type:'warning'
            })
            setTimeout(() => {
                window.location.href = response.data.data.target_url
            }, 2000)
            console.warn('==未登录的返回值==', response.data)
        }
        return response.data;
    },
    error => {
        return Promise.reject(error);
    }
);

const handleError = function (err) {
    console.log('handleError - err',err)
    Message({
        message: err.message || "未知错误",
        type:'warning'
    })
};

let cache = {}; // 防止表单重复提交
const GET = function (url) {
console.log('===')
    return function (data = {}) {
        let str = url + JSON.stringify(data)
        if (cache[str]) return new Promise((r) => { r(null, '请勿重复提交') })
        cache[str] = true
        return axios.get(url, { params: data }).catch(handleError).then(res => {
            if (loading) {
                loading.close();
                loading = false
            }
            delete cache[str];
            if (!res) {
                return { msg }
            }
            return res
        })
    }
}
const POST = function (url, config = {}) {
    return function (data = {}) {
        let str = url + JSON.stringify(data)
        if (cache[str]) return new Promise((r) => { r(null, '请勿重复提交') })
        cache[str] = true
        return axios.post(url, data, config).catch(handleError).then(res => {
            if (loading) {
                loading.close();
                loading = false
            }
            delete cache[str]
            if (!res) {
                return { msg }
            }
            return res
        })
    }
}

const http_post = function (url,param){
    // var data = Qs.stringify(param);
   return axios.post(url,param).catch(handleError).then(res=>{
        console.log('res=>',res);
        if (loading) {
            loading.close();
            loading = false
        }
        return res
    })
}


export {
    GET,
    POST,
    http_post
}

