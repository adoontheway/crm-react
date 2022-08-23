import React from "react";
import ChannelStore from "./channel.store";
import LoginStore from "./login.store";
import UserStore from "./user.store";

class RootStore {
    constructor(){
        this.loginStore = new LoginStore();
        this.userStore = new UserStore();
        this.channelStore = new ChannelStore();
    }
}
// 实例化
// 导出useStore和context
const rootStore = new RootStore()
const context = React.createContext(rootStore);

const useStore = ()=> React.useContext(context);

export { useStore }