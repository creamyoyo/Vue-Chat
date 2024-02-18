<template>
    <div class="input-container">

        <form class="input" @submit="sendChat">
            <div class="button-container">
                <V3Emoji theme="dark" :recent="true" fix-pos="upright" size="big" @clickEmoji="handleEmojiClick($event)" ></V3Emoji>
            </div>
            <input type="text" placeholder="请输入您要发送的信息" v-model="msg" @keydown.enter="sendChat" />
            <button class="submit">
                <svg t="1695906210993" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
                    p-id="4049" width="28" height="28">
                    <path
                        d="M1014.543678 9.459202a32.239736 32.239736 0 0 0-34.383718-7.30394L20.66383 371.592232a32.295735 32.295735 0 0 0-20.367832 25.783788 32.303735 32.303735 0 0 0 12.799895 30.255752L348.557141 675.493739l247.813967 335.437248a32.327735 32.327735 0 0 0 30.247752 12.783895 32.255735 32.255735 0 0 0 25.791788-20.367833L1021.847618 43.84292a32.279735 32.279735 0 0 0-7.30394-34.383718zM98.639191 410.663911l762.833742-293.70959-493.019955 493.051955L98.639191 410.663911z m514.699778 514.699778L414.036604 655.589902l493.003955-493.035955-293.70159 762.809742z"
                        fill="#ffffff" p-id="4050"></path>
                </svg>
            </button>
        </form>
    </div>
</template>

<script setup>
import {ref} from 'vue'
import V3Emoji from 'vue3-emoji';
import 'vue3-emoji/dist/style.css';

const msg = ref('')
const props = defineProps({
    handleSendMsg: Function
});

const handleEmojiClick = (emoji) => {
    let message = msg.value;
    message += emoji;
    msg.value = message;
}

const sendChat = (e) => {
    e.preventDefault()
    if(msg.value.length>0){
        props.handleSendMsg(msg.value)
    }
    msg.value = ''
}   
</script>

<style scoped>
.emoji-container-open-btn {
    font-size: 200px;
    cursor: pointer;
}

.input-container {

    height: 10%;
    align-items: center;
    padding: 1rem 2rem;
    font-size: 1.5rem;

    .button-container {
        display: flex;
        align-items: center;
        color: white;
        padding: 0 0 0 4rem;
        gap: 1rem;
    }



    .input {
        height: 6rem;
        border-radius: 2rem;
        display: flex;
        align-items: center;
        gap: 4.5rem;
        background-color: rgb(56, 72, 93);

        input {
            width: 80%;
            height: 60%;
            background-color: transparent;
            color: white;
            border: none;
            padding-left: 1rem;

            &::selection {
                background-color: rgb(100, 182, 135);
            }

            &:focus {
                outline: none;
            }
        }

        button {
            padding: 0.3rem 2rem;
            border-radius: 2rem;
            display: flex;
            justify-content: center;
            align-items: center;
            background-color:rgb(56, 72, 93);
            border: none;
            cursor: pointer;
        }
    }
}
</style>