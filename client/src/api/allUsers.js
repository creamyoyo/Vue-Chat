import request from '@/utils/request';
export const getAllUsers = async () => {
    const user = await JSON.parse(localStorage.getItem('currentUser'))?.currentUser
    const {data} = await request.get(`/auth/allusers/${user._id}`);
    return data;
};