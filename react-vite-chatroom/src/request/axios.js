import axios from "axios";

const instance = axios.create({
  baseURL: '/api',
  timeout: 10000
})

instance.interceptors.request.use(request => {
 return request
})

instance.interceptors.response.use(response => {
  return response
}, error => {
  console.log(error)
  return Promise.reject(error)
})

export default instance