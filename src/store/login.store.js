import { makeAutoObservable } from "mobx";
import { clearToken, getToken, http, setToken } from '../utils/index'

class LoginStore {
    token = getToken() || ''
    constructor(){
        makeAutoObservable(this)
    }

    login = async ({mobile, code}) => {
        const res = await http.post('/authorizations',{
            mobile, code
        })
        this.token = res.data.token
        setToken(this.token)
    }

    logout = () => {
        this.token = ""
        clearToken()
    }
}

export default LoginStore