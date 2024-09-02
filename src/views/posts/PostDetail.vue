<script setup>
import axios from 'axios';
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

import { useDisableLinks } from '../../composables/useDisableLinks';


const post = ref(null);
const route = useRoute();

const fetchPost = async () => {
    try {
        const response = await axios.get(`https://priojob.com/wp-json/wp/v2/posts/${route.params.id}`);
        post.value = response.data;
    } catch (error) {
        console.error('Error fetching post:', error);
    }
};

useDisableLinks(post, 'https://priojob.com/');

onMounted(fetchPost);

</script>

<template>
    <div class="prose">
        <div v-if="post">
            <h1>{{ post.title.rendered }}</h1>
            <div class="text-justify" v-html="post.content.rendered"></div>
        </div>
        <div v-else>
            <div class="animate-pulse">
                <div class="w-full h-8 bg-gray-300 rounded mb-3"></div>
                <div class="w-full h-96 bg-gray-300 rounded mb-3"></div>
                <div class="w-full h-6 bg-gray-300 rounded mb-3"></div>
                <div class="w-full h-6 bg-gray-300 rounded mb-3"></div>
                <div class="w-full h-6 bg-gray-300 rounded mb-3"></div>
                <div class="w-full h-6 bg-gray-300 rounded mb-3"></div>
                <div class="w-full h-6 bg-gray-300 rounded mb-3"></div>
                <div class="w-full h-6 bg-gray-300 rounded mb-3"></div>
                <div class="w-full h-6 bg-gray-300 rounded mb-3"></div>
                <div class="w-full h-6 bg-gray-300 rounded mb-3"></div>
                <div class="w-full h-6 bg-gray-300 rounded mb-3"></div>
                <div class="w-full h-6 bg-gray-300 rounded mb-3"></div>
            </div>
        </div>
    </div>
</template>

<style scoped></style>