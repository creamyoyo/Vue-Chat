<template>
    <div class="contacts-container">
        <div class="brand">
            <img src="../assets/logo.svg" alt="logo" />
            <h1>VueChat</h1>
        </div>
        <div class="contacts" ref="contacts_ref">
            <div class="contact" v-for="(contact, index) in contacts" :key="index"
                @click="changeCurrentChat(index, contact, $event)">
                <div class="avatar">
                    <img :src="`data:image/svg+xml;base64,${contact.avatarImage}`" alt="avatar" />
                </div>
                <div class="username">
                    <h2>{{ contact.username }}</h2>
                </div>
            </div>
        </div>
        <div class="current-user">
            <div class="avatar">
                <img :src="`data:image/svg+xml;base64,${userStore.currentUser.avatarImage}`" alt="avatar" />
            </div>
            <div class="username">
                <h2>{{ userStore.currentUser.username }}</h2>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, watchEffect } from 'vue';
import { useCurrentUserStore, useCurrentChatStore } from '@/stores';
const userStore = useCurrentUserStore();
const chatStore = useCurrentChatStore();

defineProps({
    contacts: {
        type: Array,
        required: true
    }
});

const contacts_ref = ref(null);
const selectedChat = ref(null);
const changeCurrentChat = (index, contact, e) => {
    if (e.target.classList.contains('selected')) {
        e.target.classList.remove('selected');
        chatStore.setCurrentChat(null);
        return;
    } else if (e.target.parentNode.classList.contains('selected')) {
        e.target.parentNode.classList.remove('selected');
        chatStore.setCurrentChat(null);
        return;
    }
    for (let c of contacts_ref.value.children) {
        if (c.classList.contains('selected')) {
            c.classList.remove('selected');
            selectedChat.value = null;
        }
    }
    selectedChat.value = index;
    if (e.target.classList.contains('contact')) {
        e.target.classList.add('selected');
    } else if (e.target.parentNode.classList.contains('contact')) {
        e.target.parentNode.classList.add('selected');
    }
    chatStore.setCurrentChat(contact);
};

watchEffect(() => {
    if (!chatStore.currentChat) {
        const selectedDom = document.getElementsByClassName('selected');
        if (selectedDom.length !== 0) {
            selectedDom[0].className = 'contact';
        }
    }
}, [chatStore.currentChat]);
</script>

<style scoped>
.contacts-container {
    display: grid;
    grid-template-rows: 10% 75% 15%;
    overflow: hidden;
    border-radius: 1rem 0 0 1rem;
    background-color: #080420;

    .brand {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 1rem;

        img {
            height: 4rem;
        }

        h1 {
            color: rgb(100, 182, 135);
            font-weight: 600;
            text-transform: uppercase;
            padding-top: 0.6rem;
        }
    }

    .contacts {
        display: flex;
        flex-direction: column;
        align-items: center;
        overflow: auto;
        gap: 0.8rem;

        &::-webkit-scrollbar {
            width: 0.2rem;

            &-thumb {
                background-color: rgb(56, 72, 93);
                width: 0.1rem;
                border-radius: 1rem;
            }
        }

        .contact {
            background-color: rgb(56, 72, 93);
            min-height: 5rem;
            height: 9rem;
            width: 90%;
            cursor: pointer;
            border-radius: 0.2rem;
            padding: 2rem;
            gap: 1rem;
            display: flex;
            align-items: center;
            transition: 0.5s ease-in-out;

            .avatar {
                img {
                    height: 4rem;
                }

                @media screen and (max-width: 100px) {
                    img {
                        height: 3rem;
                    }
                }
            }

            .username {
                h2 {
                    color: white;
                    text-transform: uppercase;
                    font-weight: 600;
                    padding-top: 0.5rem;
                }
            }
        }

        .selected {
            background-color: rgb(100, 182, 135);
        }
    }

    .current-user {
        background-color: #0d0d30;
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 2rem;

        .avatar {
            img {
                height: 5rem;
                max-inline-size: 100%;
            }
        }

        .username {
            h2 {
                color: rgb(100, 182, 135);
                text-transform: uppercase;
                font-weight: 600;
            }
        }

        @media screen and (min-width: 720px) and (max-width: 1080px) {
            gap: 0.5rem;

            .username {
                h2 {
                    font-size: 1rem;
                }
            }
        }
    }
}</style>