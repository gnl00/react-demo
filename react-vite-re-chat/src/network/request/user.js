import instance from "../axios/axios";

export const login = (params) => {
  return instance({
    method: 'post',
    url: '/user/login',
    data: params,
  })
}

export const getContactList = (params) => {
  return [
    { uid: 'a' },
    { uid: 'b' },
    { uid: 'c' },
    { uid: 'd' },
    { uid: 'e' },
    { uid: 'f' },
  ]
}