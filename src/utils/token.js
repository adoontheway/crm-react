const TOKEN_KEY = "test_token_key"

const getToken = () => window.localStorage.getItem(TOKEN_KEY)
const setToken = (value) => window.localStorage.setItem(TOKEN_KEY, value)
const clearToken = () => window.localStorage.removeItem(TOKEN_KEY)
/**
 * 卧槽，前端只需要判断这个token是否存在，
 * 第一次发起http请求的时候，
 * 服务端会判断他是否有效，
 * 无效的话直接跳转登陆页面就可以了， 
 * 我之前是不是傻
 *  */ 
const isAuth = () => !!getToken()

export {isAuth, getToken,setToken,clearToken}