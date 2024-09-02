<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const posts = ref([]);
const loading = ref(true);

const fetchPosts = async () => {
    try {
        const response = await axios.get('https://priojob.com/wp-json/wp/v2/posts');
        posts.value = response.data;
    } catch (error) {
        console.error('Error fetching posts:', error);
    } finally {
        loading.value = false;
    }
};

const cardClass = (index) => {
    return index === 0 ? 'md:row-span-4 md:space-y-4' : '';
};

const metaClass = (index) => {
    return index === 0 ? 'md:block' : '';
};

onMounted(() => {
    fetchPosts();
});


</script>

<template>

    <!-- recent posts -->
    <section id="recentPosts">
        <div class="container mx-auto px-6">

            <!-- Heading section -->
            <h2 class="font-bold text-2xl text-center mt-4">
                <span class="text-blue-700 text-4xl">সা</span>ম্প্রতিক পোস্টসমূহ
            </h2>

            <!-- posts card -->
            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 py-4">

                <div v-for="(post, index) in posts" :key="index" :class="['rCard', cardClass(index)]">

                    <img src="https://srtechzone.com/wp-content/uploads/2024/07/ই-পাসপোর্ট-করার-নিয়ম-ও-বিস্তারিত-তথ্য-01.webp"
                        :alt="post.title.rendered">


                    <div class="p-2 space-y-4">
                        <h2 class="font-bold rCardHeading">
                            <RouterLink :to="`/${post.id}`" class="text-md font-medium hover:text-blue-600">
                                <h2>{{ post.title.rendered }}</h2>
                            </RouterLink>
                        </h2>

                        <div v-html="post.excerpt.rendered" :class="['postMeta', metaClass(index)]"></div>
                    </div>
                </div>

            </div>

            <!-- loading posts card -->
            <div v-if="loading"
                class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 py-4 animate-pulse">
                <div v-for="(n, index) in 7" :key="n" :class="['rCard', cardClass(index)]">
                    <div class="w-full h-[190px] bg-slate-300"></div>
                    <div class="p-2 space-y-4">
                        <h2 class="font-bold rCardHeading">
                            <div class="w-full h-6 rounded-md bg-slate-300"></div>
                        </h2>

                        <div :class="['postMeta', metaClass(index)]">
                            <div class="w-full h-[150px] rounded-md bg-slate-200"></div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </section>
</template>
