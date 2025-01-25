<script setup>
import Tool from '@/components/cards/Tool.vue';

</script>


<template>
    <div class="tools">
        <div v-for="post in arrangedPosts" :key="post.id" class="tool-wrapper">
            <Tool :id="post.id" 
                  :name="post.name" 
                  :image_src="post.image_src" 
                  :altIMG="post.altIMG"
                  description="A Decent Autoclicker with multiple customizations & cool UI"
                  download_text="Download Phantom" />
        </div>
    </div>
</template>

<script>
export default {
    props: {
        posts: {
            type: Array,
            required: true,
        },
    },
    computed: {
        arrangedPosts(){
            return this.posts.slice().sort((a, b) => b.id - a.id);
        },
    },
    methods: {}
};
</script>
<style scoped>
/* keep cards/tools same width */
.tool {
    width: 100%
}

.tools {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 36px;
    margin: auto;
    max-width: 1380px;
    padding: 20px;
    justify-items: center;
}

.tool-wrapper {
    width: 100%;
    display: flex;
    justify-content: center;
}

@media (max-width: 1200px) {
    .tools {
        grid-template-columns: repeat(3, 1fr);
    }
}

@media (max-width: 900px) {
    .tools {
        grid-template-columns: repeat(2, 1fr);
    }
}

@media (max-width: 600px) {
    .tools {
        grid-template-columns: repeat(1, 1fr);
    }
}
</style>
