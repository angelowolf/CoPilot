export const apiDomain = 'http://192.168.0.107:8080/api/'
export const loginUrl = apiDomain + 'autorizar/login'
export const usuarioUrl = apiDomain + 'usuario/'
export const hijosListUrl = apiDomain + 'api/hijos'

export const getHeader = function () {
  // const tokenData = JSON.parse(window.localStorage.getItem('authUser'))
  const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
    // 'Authorization': 'Bearer ' + tokenData.access_token
  }
  return headers
}
