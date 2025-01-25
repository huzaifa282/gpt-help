<script setup>
import MediaComponent from '@/components/download/MediaComponent.vue';
import PopularPostsView from './PopularPostsView.vue';
import {slugify} from '@/utils/functions'
</script>
<template>
    <div class="media-page-layout">
        <div class="media-page-wrapper">
            <h1>{{ currentPost.name }}</h1>
            <MediaComponent :image-src="computedImageURL()" :youtube-embed-url="currentPost.youtubeEmbedUrl"
                :download-url="currentPost.downloadLink" :multi-download="multipleDownload()" :current-post-name="currentPost.name"/>
            <div class="post-content" v-html="currentPost.contents">
            </div>
        </div>
        <aside class="sidebar">
            <PopularPostsView :posts="popularPosts" />
        </aside>
    </div>
</template>

<script>
import posts from '@/utils/source';

  export default {
    name: "MediaPage",
    components: { MediaComponent },
    props: ["slug"], // Receive the ID from the route
    created() {
        // Remove meta update logic from here as it's now handled in router
    },
    computed: {
        currentPost() {
            return posts.find(post => slugify(post.name) == this.slug);
        },
        popularPosts(){
            return posts;
        },
    },
    methods:{
        computedImageURL() {
            const src = this.currentPost.image_src;
            try {
                new URL(src);
                return src;
            } catch {
                // Use the @/ alias which webpack/vite will properly resolve
                return new URL(`../../assets/images/post_images/${src}`, import.meta.url).href;
            }
        },
        multipleDownload(){
            return this.currentPost.multiDownload;
        }
    },
    
  };
  </script>

<style scoped>
.media-page-layout {
    display: flex;
    gap: 24px;
    padding: 24px;
    margin: 0 auto;
    background: linear-gradient(180deg, rgba(var(--violet-9-rgb), 0.05), rgba(var(--violet-9-rgb), 0));
}

@media (max-width: 768px) {
    .media-page-layout {
        flex-direction: column;
    }
}

.main-content {
    flex: 3;
    backdrop-filter: blur(10px);
    border-radius: 16px;
    transition: transform 0.3s ease;
}

.sidebar {
  margin-top: 72px;
  width: 320px;
  height: fit-content;
  flex-shrink: 0;
  background: rgba(17, 17, 17, 0.6);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.05);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
  transition: all 0.3s ease;
  position: sticky;
  padding-right: 0px;
}

.sidebar:hover {
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.2);
  transform: translateY(-2px);
}
</style>
<style scoped>
h1 {
    padding: 24px;
    color: var(--violet-2);
    font-family: "Inter", sans-serif;
    font-weight: 700;
    letter-spacing: -0.5px;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    background: linear-gradient(135deg, var(--violet-2), var(--violet-4));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}

.media-page-wrapper {
    padding: 40px;
    margin: 0 auto;
    width: 100%;
    max-width: 1080px;
    background: rgba(255, 255, 255, 0.02);
    border-radius: 24px;
    border: 1px solid rgba(255, 255, 255, 0.05);
    box-shadow: 0 12px 48px rgba(0, 0, 0, 0.15);
    backdrop-filter: blur(10px);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.media-page-wrapper:hover {
    transform: translateY(-2px);
    box-shadow: 0 16px 56px rgba(0, 0, 0, 0.2);
}

@media screen and (max-width: 768px) {
    .media-page-wrapper {
        padding: 16px;
        border-radius: 16px;
    }   
}

</style>
<style>
.post-content {
    color: #f5f5f5;
    font-family: "Inter", sans-serif;
    padding: 28px;
    line-height: 1.8;
}

.post-content h1 {
    color: var(--violet-2);
    font-size: 2.75em;
    margin-bottom: 48px;
    font-weight: 800;
}

.post-content h2 {
    margin-bottom: 36px;
    color: var(--violet-3);
    font-weight: 700;
}

.post-content ol {
    margin: 24px 0;
    padding-left: 56px;
}

.post-content ol li {
    color: #e1e1e1;
    font-size: 18px;
    font-weight: 400;
    margin-bottom: 12px;
    line-height: 1.6;
}

/* Add new filter button styles */
.filter-button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-family: 'Poppins', sans-serif;
    font-size: 14px;
    font-weight: 500;
    color: white;
    padding: 8px 16px;
    border-radius: 8px;
    border: none;
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    position: relative;
    overflow: hidden;
    margin: 4px;
    background: rgba(var(--violet-6-rgb), 0.1);
    backdrop-filter: blur(4px);
    border: 1px solid rgba(255, 255, 255, 0.05);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
}

.filter-button::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0));
    opacity: 0;
    transition: opacity 0.3s ease;
}

.filter-button:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(255, 255, 255, 0.15),
                0 2px 8px rgba(255, 255, 255, 0.1),
                0 0 2px rgba(255, 255, 255, 0.1);
}

.filter-button:hover::before {
    opacity: 1;
}

.filter-button:active {
    transform: scale(0.98);
    box-shadow: 0 2px 10px rgba(var(--green-6-rgb), 0.2);
}

.filter-button.active {
    background: linear-gradient(135deg, var(--green-5), var(--green-7));
    box-shadow: 0 0 15px rgba(var(--green-6-rgb), 0.3);
}

/* Premium Table Styles */
.post-content table {
    width: 100%;
    border-collapse: separate;
    border-spacing: 0;
    margin: 32px 0;
    border-radius: 16px;
    overflow: hidden;
    background: rgba(255, 255, 255, 0.03);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15),
                0 2px 8px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(8px);
}

.post-content table-wrapper {
    overflow-x: auto;
    display: block;
}

.post-content th {
    background: rgba(var(--violet-7-rgb), 0.6);
    color: var(--violet-1);
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    padding: 20px 28px;
    font-size: 15px;
    border-bottom: 2px solid rgba(var(--violet-6-rgb), 0.3);
    white-space: nowrap;
}

.post-content td {
    padding: 18px 28px;
    color: #f0f0f0;
    font-size: 16px;
    line-height: 1.7;
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
    white-space: nowrap;
}

.post-content tr:last-child td {
    border-bottom: none;
}

.post-content tr:hover {
    background: rgba(255, 255, 255, 0.05);
    transition: background-color 0.3s ease;
}

.post-content tbody tr {
    transition: all 0.3s ease;
}

.post-content tbody tr:hover {
    transform: translateY(-2px);
    background: rgba(255, 255, 255, 0.07);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
}

@media screen and (max-width: 768px) {
    .post-content table-wrapper {
        display: block;
        width: 100%;
        overflow-x: auto;
    }
    .post-content th, .post-content td {
        white-space: nowrap;
    }
    .post-content table {
        display: block;
        width: 100%;
        overflow-x: auto;
    }
}

</style>