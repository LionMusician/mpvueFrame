
import utils from '@/utils/utils'
import Tips from '@/utils/Tips'
import Z_CONFIG from '@/config'
import service from './index'

var Fly = require("flyio/dist/npm/wx")
var fly = new Fly

export default {
    install(Vue) {
        Vue.prototype.$http = async (api, data = {}, errorToast = true) => {
            const params = utils.dic(data);
            //添加请求拦截器
            fly.interceptors.request.use((request) => {
                //给所有请求添加自定义header
                // request.headers["X-Tag"] = "flyio";
                utils.log(`${utils.mklog()}【AJAX:-->】【M=${api}】【P=${JSON.stringify(params)}】`);
            })

            //添加响应拦截器，响应拦截器会在then/catch处理之前执行
            fly.interceptors.response.use(
                (response) => {
                    if (errorToast) {
                        Tips.loaded();
                    }
                    //只将请求结果的data字段返回
                    return response.data
                },
                (err) => {
                    //发生网络错误后会走到这里
                    if (errorToast) {
                        utils.error(`【M=${api}】网络异常，请求出错`);
                        Tips.toast(`【M=${api}】网络异常，请求出错`);
                    }
                    //return Promise.resolve("ssss")
                }
            )
            
            return fly.request(service[api].url, params, {
                method: service[api].method,
                timeout: Z_CONFIG.timeout,
                baseapi: Z_CONFIG.baseapi
            });
        }
    }
}