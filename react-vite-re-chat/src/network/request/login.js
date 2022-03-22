import instance from "../../util/axios/axios";

export const login = (params) => {
  return instance({
    method: 'post',
    url: 'login',
    data: params,
  })
}