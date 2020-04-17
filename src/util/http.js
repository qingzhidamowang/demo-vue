import axios from 'axios'
import { Message, Loading } from 'element-ui';
import qs from 'qs'

// 加载中动画
let loadingInstance

//设置请求超时 500S
axios.defaults.timeout = 500000;
// 默认的接口url前缀


// 环境的切换
if (process.env.NODE_ENV == 'development') {
    axios.defaults.baseURL = '/apis';
} else if (process.env.NODE_ENV == 'production') {
    axios.defaults.baseURL = '';
}
// axios.defaults.baseURL = 'http://blog.hzmuji.com/';

// post请求头的设置
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
axios.defaults.withCredentials = true


// request请求拦截器
axios.interceptors.request.use(
    config => {
        console.log('request,config', config)
        // 调用element  loding组件
        loadingInstance = Loading.service({
            lock: true,
            text: '正在努力加载中',
            background: 'rgba(0, 0, 0, 0.7)'
        })
        // 每次发送请求之前判断vuex中是否存在token
        // 如果存在，则统一在http请求的header都加上token，这样后台根据token判断你的登录情况
        // 即使本地存在token，也有可能token是过期的，所以在响应拦截器中要对返回状态进行判断
        // const token = store.state.token;
        // token && (config.headers.Authorization = token);
        return config;
    },
    error => {
        console.log('request,error' + error)
        return Promise.error(error);
    }
)

// 响应拦截器
axios.interceptors.response.use(
    response => {
        console.log('response,response', response)
        // 关闭加载动画
        loadingInstance.close();
        // 如果返回的状态码为200，说明接口请求成功，可以正常拿到数据
        // 否则的话抛出错误
        if (response.status === 200) {
            return Promise.resolve(response);
        } else {
            return Promise.reject(response);
        }
    },
    // 服务器状态码不是2开头的的情况
    // 这里可以跟你们的后台开发人员协商好统一的错误状态码
    // 然后根据返回的状态码进行一些操作，例如登录过期提示，错误提示等等
    // 下面列举几个常见的操作，其他需求可自行扩展
    error => {
        console.log('response,error' + error)
        if (error.response.status) {
            switch (error.response.status) {
                // 401: 未登录
                // 未登录则跳转登录页面，并携带当前页面的路径
                // 在登录成功后返回当前页面，这一步需要在登录页操作。
                // case 401:
                //     router.replace({
                //         path: '/login',
                //         // 登录成功后跳转回原页面
                //         query: {
                //             redirect: router.currentRoute.fullPath
                //         }
                //     });
                //     break;

                // 403 token过期
                // 登录过期对用户进行提示
                // 清除本地token和清空vuex中token对象
                // 跳转登录页面
                // case 403:
                //     Message({
                //         message: '登录过期，请重新登录',
                //         duration: 1000,
                //         type: 'error'
                //     });
                //     // 清除token
                //     // localStorage.removeItem('token');
                //     // store.commit('loginSuccess', null);
                //     // 跳转登录页面，并将要浏览的页面fullPath传过去，登录成功后跳转需要访问的页面
                //     setTimeout(() => {
                //         router.replace({
                //             path: '/login',
                //             query: {
                //                 redirect: router.currentRoute.fullPath
                //             }
                //         });
                //     }, 1000);
                //     break;

                // 404请求不存在
                case 404:
                    Message({
                        message: '网络请求不存在',
                        duration: 2000,
                        type: 'error'
                    });
                    break;
                // 其他错误，直接抛出错误提示
                default:
                    Message({
                        message: error.response.status + '  错误',
                        duration: 2000,
                        type: 'error'
                    });
            }
            return Promise.reject(error.response);
        }
        // 关闭加载动画
        loadingInstance.close();
    }
)

// 具体的请求
export function request({
    methods, url, params
}) {
    if (methods == "GET") {
        return get(url, params)
    } else if (methods == "POST") {
        return post(url, params)
    } else {
        console.log('methods错误')
    }
}

export function getUrl(url) {
  return get(url,null)
}

/**
 * get方法，对应get请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
function get(url, params) {
    return new Promise((resolve, reject) => {
        axios.get(url, {
            params: params
        })
            .then(res => {
                resolve(res.data);
            })
            .catch(err => {
                reject(err.data)
            })
    });
}

/**
 * post方法，对应post请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
function post(url, params) {
    // console.log(url)
    var params = (url == '/label/CascadeUpdate' || url == '/label/CascadeUpdateHid' ) ? params : qs.stringify(params)
   // var params = qs.stringify(params)|| url == '/label/CascadeUpdateHid'
    // var params = params
    // console.log(url, params)
    console.log(params)
    return new Promise((resolve, reject) => {
        axios.post(url, params)
            .then(res => {
                // console.log(res)
                resolve(res.data);
            })
            .catch(err => {
                // console.log(err)
                reject(err.data)
            })
    });
}


export function addComment({ url, params }) {
  return new Promise((resolve, reject) => {
    let instance = axios.create({
      headers: {
        'Content-Type': 'application/json'
      }
    });
    instance.post(url, params).then(res => {
      resolve(res.data);
    }).catch(error => {
      reject(error);
    })
  })
};

//上传图片的方法
export function upload({ url, params }) {
    console.log('url', url)
    console.log('params', params)
    return new Promise((resolve, reject) => {
        let instance = axios.create({
            baseURL: 'http://127.0.0.1:8080/',
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        instance.post(url, params).then(res => {
            resolve(res.data);
        }).catch(error => {
            reject(error);
        })
    })
};

//扫描更新信息
export function publishShowshttp({ url, params }) {
    // console.log(url)
    console.log('params', params)
    return new Promise((resolve, reject) => {
        let instance = axios.create({
            baseURL : 'apis',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        instance.post(url, params).then(res => {
            resolve(res.data);
        }).catch(error => {
            reject(error);
        })
    })
};

