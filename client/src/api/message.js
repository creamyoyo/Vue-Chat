import request from '@/utils/request';
export const sendMessage = async (from, to, message) => {
    const { data } = await request.post('/message/addmsg', {
        from, to, message
    });
    return data;
};

export const getAllMessages = async (from, to) => {
    const {data}= await request.post('/message/getmsg', {
        from, to
    });
    return data;
};