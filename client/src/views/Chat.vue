<template>
    <div class="container">
        <button class="logout-btn" @click="handleLogout">退出</button>
        <div class="chat-container">
            <Contacts :contacts="users" />
            <Message :socket="socket" v-if="chatStore.currentChat"></Message>
            <Welcome v-else/>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref, watchEffect} from 'vue';
import { getAllUsers } from '../api/allUsers';
import Welcome from '@/components/Welcome.vue';
import Contacts from '@/components/Contacts.vue';
import Message from '@/components/Message.vue'
import { useCurrentChatStore, useCurrentUserStore } from '@/stores';
import { useRouter } from 'vue-router';
import { io } from 'socket.io-client';


const users = ref(null);
onMounted(async () => {
    const data = await getAllUsers();
    users.value = data;
})

const chatStore = useCurrentChatStore()
const userStore = useCurrentUserStore()
const socket = ref({
  current: null
});

watchEffect(() => {
  if (userStore.currentUser) {
    socket.value.current = io('http://localhost:8800');
    socket.value.current.emit('add-user', userStore.currentUser._id);
  }
}, [userStore.currentUser]);

const router = useRouter()
const handleLogout = () => {
  router.push('/login')
  localStorage.removeItem('currentUser')
  userStore.setCurrentUser(null)
}

</script>

<style scoped>
.container {
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  background-color: #131324;
  .logout-btn {
    position: absolute;
    top: 1rem;
    right: 0rem;
    background-color: rgb(56, 72, 93);
    color: white;
    margin: 0 2rem;
    padding: 0.5rem 1rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    transition: 0.5s ease-in-out;
    &:hover {
      background-color: rgb(100, 182, 135);
    }
  }
  .chat-container {
    height: 85vh;
    width: 85vw;
    border-radius: 1rem;
    background-color: #00000076;
    display: grid;
    grid-template-columns: 25% 75%;
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-columns: 35% 65%;
    }
  }
}
</style>