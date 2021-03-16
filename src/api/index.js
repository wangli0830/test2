import {
    GET, http_post
} from './axios';

let agreementClearUrl = '/mock/agreement/data_init/';
const agreementClearResult = function (uid){
    return GET(agreementClearUrl + uid)()
}


let querUrl = "/qamock/agreement/get_exec_date"
const queryExecAt = function (data){
    return http_post(querUrl,data)
}

let startUrl = "/qamock/agreement/start_withold"
const withholdStart = function (data){
    return http_post(startUrl,data)
}

let testUrl1 = '/api/test';// 测试接口
const test1 = GET(testUrl1)


let clearStarkDataUrl = '/mock/jiedai_api/data_init/';
const starkClearResult = function (uid){
    return GET(clearStarkDataUrl + uid)()
}


export {
    agreementClearResult,
    queryExecAt,
    withholdStart,
    test1,
    starkClearResult
}