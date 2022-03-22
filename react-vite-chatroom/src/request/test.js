import axios from "./axios";

export const login = (params) => {
  return axios({
    method: 'get',
    url: '/login',
    params
  })
}