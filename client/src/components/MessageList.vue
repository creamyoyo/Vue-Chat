<template>
    <div class="messagelist-container" ref="scrollRef">
        <div v-for="(message, index) in messages" :key="index"
            :class="`message ${message.fromSelf ? 'sended' : 'received'}`">
            <div class="content">
                <p>{{ message.message }}</p>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, watchEffect, nextTick } from 'vue';
import { useCurrentChatStore, useCurrentUserStore } from '@/stores';
import { getAllMessages } from '@/api/message';

const scrollRef = ref(null);

const userStore = useCurrentUserStore();
const chatStore = useCurrentChatStore();
const messages = ref(null);
watchEffect(async () => {
    const data = await getAllMessages(userStore.currentUser._id, chatStore.currentChat._id);
    messages.value = data;
    setTimeout(() => {
        scrollRef.value.scrollTop = scrollRef.value.scrollHeight;
    }, 10);
}, [chatStore.currentChat])

const handleSendMsg = (msg) => {
    const msgs = [...messages.value];
    msgs.push({ fromSelf: true, message: msg });
    messages.value = msgs;

    // 滚动条自动滚动到最下方
    nextTick(() => {
        scrollRef.value.scrollTop = scrollRef.value.scrollHeight;
    });
}

const handleReceiveMsg = (arrivalMsg) => {
    messages.value.push(arrivalMsg);

    // 滚动条自动滚动到最下方
    nextTick(() => {
        scrollRef.value.scrollTop = scrollRef.value.scrollHeight;
    });
}

defineExpose({ messages, handleSendMsg, handleReceiveMsg })

</script>

<style scoped>
.messagelist-container {
    height: 95%;
    padding: 1rem 2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    overflow: auto;

    .message {
        display: flex;
        align-items: center;

        .content {
            max-width: 40%;
            overflow-wrap: break-word;
            padding: 1rem;
            font-size: 2rem;
            border-radius: 1rem;
            color: #d1d1d1;
        }
    }

    .sended {
        justify-content: flex-end;

        .content {
            background-color:  rgb(56, 72, 93);
        }
    }

    .received {
        justify-content: flex-start;

        .content {
            background-color: rgb(56, 72, 93);
        }
    }
}</style>