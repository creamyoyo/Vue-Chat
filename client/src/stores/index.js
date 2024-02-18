// 导入方法
import { ref } from 'vue';
import { defineStore } from 'pinia';

// 当前会话对象
export const useCurrentChatStore = defineStore('currentChat', () => {
  const currentChat = ref(null);
  const setCurrentChat = (chat) => {
    currentChat.value = chat;
  };

  return {
    currentChat,
    setCurrentChat
  };
},{
  persist: true
});

// 当前登录用户
export const useCurrentUserStore = defineStore('currentUser', () => {
  const currentUser = ref(null);
  const setCurrentUser = (val) => {
    currentUser.value = val;
  };

  return {
    currentUser,
    setCurrentUser
  };
}, {
  persist: true
})

