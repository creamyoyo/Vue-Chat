import request from "../utils/request";

export const handleRegister = async (userForm) => {
    const {data} = await request.post('/auth/register', {
        ...userForm
    });
    console.log(data)
    return data
};