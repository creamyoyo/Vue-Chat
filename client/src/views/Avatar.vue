<template>
    <div>
        <div class="container" v-if="isLoading">
            <img src="../assets/loader.gif" class="loader" alt="" />
            <span>加载太久了？<a href="/avatar">刷新</a></span>
        </div>
        <div class="container" v-else>
            <div class="title-container">
                <h1>请选择您的头像</h1>
            </div>
            <div class="avatars" ref="avatars_ref">
                <div v-for="(avatar, index) in avatars" :key="index" class="avatar"
                    @click="setSelectedAvatar(index, $event)">
                    <img :src="`data:image/svg+xml;base64,${avatar}`" alt="avatar" />
                </div>
            </div>
            <button class="submit-btn" @click="setProfilePicture">设置为头像</button>
            <span>没有喜欢的头像？<a href="/avatar">换一批</a></span>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { Buffer } from 'buffer';
import { message } from 'ant-design-vue';
import { getAvatars, setAvatar } from '../api/avatar.js';
import { useCurrentUserStore } from '@/stores';
const avatars = ref([]);
const avatars_ref = ref(null);
const isLoading = ref(true);
const selectedAvatar = ref(null);
const router = useRouter();

onMounted(async () => {
    for (let i = 0; i < 4; i++) {
        const img = await getAvatars();
        const buffer = new Buffer(img);
        avatars.value.push(buffer.toString('base64'));
    }
    isLoading.value = false;
});

const setSelectedAvatar = (index, e) => {
    for (let a of avatars_ref.value.children) {
        if (a.classList.contains('selected')) {
            a.classList.remove('selected');
            selectedAvatar.value = null;
        }
    }
    selectedAvatar.value = index;
    e.target.parentNode.classList.add('selected');
};

const userStore = useCurrentUserStore()
const setProfilePicture = async () => {
    if (!selectedAvatar.value) {
        message.error('请选择头像');
        return;
    }
    const user = userStore.currentUser;
    const { data } = await setAvatar(user, avatars.value[selectedAvatar.value]);
    if (data.isAvatarImageSet) {
        userStore.setCurrentUser(data)
        localStorage.setItem('user', JSON.stringify(data));
        router.push('/')
    } else {
        message.error('头像设置失败，请再试一次');
    }
}

</script>

<style scoped>
.container {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 3rem;
    background-color: #131324;
    height: 100vh;
    width: 100vw;

    .loader {
        max-inline-size: 100%;
    }

    .title-container {
        h1 {
            color: white;
        }
    }

    .avatars {
        display: flex;
        gap: 2rem;

        .avatar {
            border: 0.4rem solid transparent;
            padding: 0.4rem;
            border-radius: 5rem;
            display: flex;
            justify-content: center;
            align-items: center;
            transition: 0.5s ease-in-out;

            img {
                height: 6rem;
            }

        }

        .selected {
            border: 0.4rem solid rgb(100, 182, 135);
        }

    }

    .submit-btn {
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
</style>