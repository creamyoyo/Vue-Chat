<template>
    <div class="message-container">
        <div class="chat-header">
            <div class="user-details">
                <div class="avatar">
                    <img :src="`data:image/svg+xml;base64,${chatStore.currentChat.avatarImage}`" alt="avatar" />
                </div>
                <div class="username">
                    <h3>{{ chatStore.currentChat.username }}</h3>
                </div>
                <i @click="handleFinishChat">
                    <svg t="1695892085136" class="icon" viewBox="0 0 1024 1024" version="1.1"
                        xmlns="http://www.w3.org/2000/svg" p-id="4185" width="50" height="50">
                        <path
                            d="M511.317333 456.021333a25.173333 25.173333 0 0 0 18.517334-7.509333 24.704 24.704 0 0 0 7.509333-18.090667V239.36a25.344 25.344 0 0 0-7.509333-18.304 24.832 24.832 0 0 0-18.517334-7.722667 24.362667 24.362667 0 0 0-18.133333 7.722667 25.344 25.344 0 0 0-7.509333 18.346667v191.018666a24.746667 24.746667 0 0 0 7.509333 18.090667 24.746667 24.746667 0 0 0 18.133333 7.509333z"
                            fill="#ffffff" p-id="4186"></path>
                        <path
                            d="M801.322667 468.352a288.768 288.768 0 0 0-25.344-66.346667 315.562667 315.562667 0 0 0-39.978667-58.325333A299.648 299.648 0 0 0 682.666667 295.381333c-36.266667-22.016-69.077333 20.778667-43.861334 45.354667a240.810667 240.810667 0 1 1-261.802666 5.205333c27.648-23.68-12.416-67.968-43.008-45.909333a323.754667 323.754667 0 0 0-50.645334 48c-14.933333 17.493333-27.733333 36.736-38.016 57.344-10.24 20.437333-18.090667 41.984-23.68 64.64A289.962667 289.962667 0 0 0 213.333333 539.349333c0 41.386667 7.765333 80.128 23.338667 116.352a296.746667 296.746667 0 0 0 64 94.634667 308.394667 308.394667 0 0 0 95.018667 64c36.224 15.786667 74.752 23.68 115.626666 23.68 41.386667 0 80.128-7.893333 116.352-23.637333a304.213333 304.213333 0 0 0 94.677334-64c26.88-26.88 48.213333-58.453333 64-94.72 15.786667-36.181333 23.68-74.965333 23.68-116.309334 0-23.893333-2.944-47.786667-8.704-70.997333z"
                            fill="#ffffff" p-id="4187"></path>
                    </svg>
                </i>
            </div>
        </div>
        <MessageList ref="child"></MessageList>
        <ChatInput :handleSendMsg="handleSendMsg"></ChatInput>
    </div>
</template>

<script setup>
import { ref, watchEffect } from 'vue'
import { useCurrentChatStore, useCurrentUserStore } from '@/stores';
import { sendMessage } from '@/api/message'

import ChatInput from './ChatInput.vue';
import MessageList from './MessageList.vue'

const chatStore = useCurrentChatStore()
const userStore = useCurrentUserStore()
const props = defineProps({
    socket: Object
});

const handleFinishChat = () => {
    chatStore.setCurrentChat(null);
};

const child = ref(null)
const handleSendMsg = async (msg) => {
    await sendMessage(userStore.currentUser._id, chatStore.currentChat._id, msg)
    console.log(props.socket.current)
    props.socket.current.emit("send-msg", {
        to: chatStore.currentChat._id,
        from: userStore.currentUser._id,
        message: msg
    })
    child.value.handleSendMsg(msg)
}

const arrivalMessage = ref(null);
watchEffect(() => {
    if (props.socket.current) {
        console.log(props.socket.current);
        props.socket.current.on('msg-recieve', (msg) => {
            console.log(msg);
            arrivalMessage.value = { fromSelf: false, message: msg };
            child.value.handleReceiveMsg(arrivalMessage.value);
        });
    }
}, [child.value]);
</script>

<style scoped>
.message-container {
    padding: 2rem;
    display: grid;
    grid-template-rows: 10% 78% 12%;
    gap: 0.1rem;
    overflow: hidden;

    @media screen and (min-width: 720px) and (max-width: 1080px) {
        grid-auto-rows: 15% 70% 15%;
    }

    .chat-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 2rem;
        position: relative;

        .user-details {
            display: flex;
            align-items: center;
            gap: 1rem;

            .avatar {
                img {
                    height: 4rem;
                }
            }

            .username {
                h3 {
                    font-size: 2rem;
                    color: white;
                    text-transform: uppercase;
                }
            }

            .icon {
                background-color: rgb(100, 182, 135);
                border-radius: 0.5rem;
                cursor: pointer;
                position: absolute;
                top: 0.5rem;
                right: 2rem;
            }
        }
    }
}</style>