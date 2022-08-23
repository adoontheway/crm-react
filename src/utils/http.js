import axios from "axios";
import { getToken } from "./token";
import history from "./history";

const http = axios.create({
    baseURL: 'http://geek.itheima.net/v1_0',
    timeout:5000
})

http.interceptors.request.use((config) => {
    let token = getToken()
    if(token)
        config.headers.Authorization = `Bear ${token}`
    return config
},(err)=>{
    return Promise.reject(err)
})

http.interceptors.response.use((response) => {
    return response.data
},(err)=>{
    if(err.response.status === 401){
        //todo  
        history.push('/login')
    }
    return Promise.reject(err)
})

export {http}