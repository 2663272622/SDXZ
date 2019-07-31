const url='http://192.168.1.7:8080/'
import {request} from './http.js'
export function userLogin(data){
    return request('post',url+'gunsApi/auth',data);
}

export function login(data,headers){
    return request('post',url+'gunsApi/test',data,headers);
}
