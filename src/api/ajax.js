/*
 定义发送ajax请求的模块
 包装axios
 函数的返回值 是一个promise对象
 axios返回的本质就是一个promise 进一步封装promsie将response.data的值传递出去
* */

import axios from "axios"

export default function (url,data={},method="GET") {
    let promise
    if(method.toUpperCase()==="GET"){
      promise = axios.get(url,{
         params:data
       })
    }else{
      promise= axios.post(url,data)
    }
    return new Promise((res,rej)=>{
         promise
           .then(response=>{
             const result = response.data
             res(result)
           })
           .catch(err=>{
             alert("请求错误",err.message)
           })
    })
}

