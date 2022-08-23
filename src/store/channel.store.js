import { http } from "../utils";
import { makeAutoObservable } from "mobx";


class ChannelStore{
    channelList = []
    constructor(){
        makeAutoObservable(this)
    }

    fetchChannel=async()=>{
        let res = await http.get('/channels')
        this.channelList = res.data.channels
    }
}

export default ChannelStore