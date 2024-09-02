<script setup>


</script>

<template>
    <div>

        <section id="recentPosts">
            <div class="container mx-auto px-6">

                <!-- Heading section -->
                <h2 class="font-bold text-2xl text-center mt-4">
                    <span class="text-blue-700 text-4xl">সা</span>ম্প্রতিক পোস্টসমূহ
                </h2>

                <!-- Posts section grid grid-rows-4 grid-flow-col gap-4 -->
                <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 py-4">
                    <div v-for="(card, index) in rCards" :key="index" :class="['rCard', cardClass(index)]">
                        <!-- <img src="/" alt=""> -->

                        <div class="p-2 space-y-4">
                            <h2 class="font-bold rCardHeading">
                                <a href="">
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid, dolorem.
                                </a>
                            </h2>

                            <div v-for="(meta, index) in postMeta" :key="index" :class="['postMeta', metaClass(index)]">
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem necessitatibus atque
                                    architecto doloribus quas eius possimus aspernatur recusandae tenetur inventore.</p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    </div>
</template>


<style scoped>
/* Add any necessary styles here */
</style>
