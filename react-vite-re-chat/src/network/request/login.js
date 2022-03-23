import instance from "../axios/axios";

export const login = (params) => {
  return instance({
    method: 'post',
    url: '/user/login',
    data: params,
  })
}