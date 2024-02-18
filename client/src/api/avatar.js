import axios from 'axios';
const api = 'https://api.multiavatar.com/45678945';
export const getAvatars = async () => { 
    const {data} = await axios.get(`${api}/${Math.round(Math.random() * 1000)}`); 
    return data
}

import request from '@/utils/request';
export const setAvatar = async (user, avatar) => {
    const res = request.post(`/auth/avatar/${user._id}`, {
        image: avatar
    })
    return res
}

