<template>
    <div class="FormContainer">
        <form action="">
            <div class="brand">
                <img src="../assets/logo.svg" alt="">
                <h1>Vue Chat</h1>
            </div>
            <input v-model="userForm.username" type="text" placeholder="请输入用户名" name="username" />
            <input v-model="userForm.password" type="password" placeholder="请输入密码" name="password" />
            <span class="button">
                <button type="submit" @click.prevent="handleSubmit">登录</button>
                <button type="reset" @click.prevent="handleReset">重置</button>
            </span>
            <span>没有账号？<router-link to="/register">去注册</router-link></span>
        </form>
    </div>
</template>

<script setup>
import { RouterLink, useRouter } from 'vue-router';
import { ref } from 'vue';
import { message } from 'ant-design-vue';
import { handleLogin } from '../api/login';
import { useCurrentUserStore } from '@/stores';

const userForm = ref({
    username: '',
    password: ''
});

message.config({
    top: `45vh`,
    duration: 2,
});

const handleValidation = () => {
    const { username, password} = userForm.value;
    if (username.trim().length < 3) {
        message.error('用户名长度应不少于3个字符！');
        return false;
    } else if (password.trim().length < 6) {
        message.error('密码长度应不少于6个字符！');
        return false;
    }
    return true;
};

const router = useRouter();
const userStore = useCurrentUserStore()
const handleSubmit = async () => {
    if (!handleValidation()) return;
    const data = await handleLogin(userForm.value);
    localStorage.setItem('currentUser', JSON.stringify(data));
    userStore.setCurrentUser(data)
    router.push('/');
};

const handleReset = () => {
    userForm.value.username = '';
    userForm.value.password = '';
}

</script>

<style scoped>
.FormContainer {
    height: 100vh;
    width: 100vw;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 1rem;
    align-items: center;
    background-color: #131324;

    .brand {
        display: flex;
        align-items: center;
        gap: 1rem;
        justify-content: center;

        img {
            height: 5rem;
        }

        h1 {
            padding-top: 1rem;
            color: rgb(100, 182, 135);
            text-transform: uppercase;
            font-weight: 600;

        }
    }

    form {
        display: flex;
        flex-direction: column;
        gap: 2rem;
        background-color: #00000076;
        border-radius: 2rem;
        width: 40vw;
        max-width: 700px;
        padding: 3rem 5rem;

        input {
            background-color: transparent;
            padding: 1rem;
            border: 0.1rem solid rgb(56, 72, 93);
            color: white;
            width: 100%;
            font-size: 1rem;

            &:focus {
                border: 0.1rem solid rgb(100, 182, 135);
                outline: none;
            }
        }


        button {
            background-color: rgb(56, 72, 93);
            color: white;
            margin: 0 2rem;
            padding: 1rem 2rem;
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

        span {
            color: white;
            text-transform: uppercase;
            text-align: center;

            a {
                color: rgb(100, 182, 135);
                text-decoration: none;
                font-weight: bold;
            }
        }
    }
}
</style>