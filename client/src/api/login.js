import request from "../utils/request";

export const handleLogin = async (userForm) => {
    const { data } = await request.post('/auth/login', {
        ...userForm
    });
    return data;
};