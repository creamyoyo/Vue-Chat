<template>
    <div class="welcome-container">
        <img src="../assets/robot.gif" alt="Robot" />
        <h1>
            Welcome, <span>{{ userStore.currentUser.username }}!</span>
        </h1>
        <h2>Start New Chat</h2>
    </div>
</template>

<script setup>
import { useCurrentUserStore } from '@/stores';
const userStore = useCurrentUserStore()
</script>

<style scoped>
.welcome-container {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    color: rgb(100, 182, 135);
    font-weight: 900;
    font-size: 1.5rem;

    img {
        height: 20rem;
    }

    span {
        text-transform: uppercase;
        font-weight: 700;
    }
}
</style>