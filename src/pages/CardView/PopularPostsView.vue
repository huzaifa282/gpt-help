<template>
    <div class="popular-posts">
      <h2 class="section-title">Recent Posts</h2>
      <ul class="post-list">
        <li
          v-for="post in topPosts"
          :key="post.id"
          class="post-item"
          @click="navigateToPost(post.name)"
        >
          <img :src="computedImgUrl(post.image_src)" 
               :alt="post.altSideIMG || `${post.name} recent post sidebar`" 
               class="post-thumbnail" />
          <div class="post-info">
            <h3 class="post-title">{{ post.name }}</h3>
            <!-- <p class="post-meta">{{ 100 }} views • {{ post.date }}</p> -->
          </div>
        </li>
      </ul>
    </div>
  </template>
  
  <script>
import { slugify } from '@/utils/functions';

  export default {
    name: "PopularPostsView",
    props: {
      posts: {
        type: Array,
        required: true,
      },
    },
    methods: {
      navigateToPost(name) {
        const slug = slugify(name);
        this.$router.push({ name: "CardView", params: { slug } });
      },
      computedImgUrl(src) {
        try {
          new URL(src);
          return src;
        } catch {
          // Use the @/ alias which webpack/vite will properly resolve
          return new URL(`../../assets/images/post_images/sidebarView/${src}`, import.meta.url).href;
        }
      }
    },
    computed:{
      topPosts(){
        return [...this.posts]
          .sort((a, b) => b.id - a.id)
          .slice(0, 6);
      }
    }
  };
  </script>
  
  <style scoped>
  .popular-posts {
    width: 100%;
    max-width: 320px;
    background: rgba(17, 17, 17, 0.6);
    backdrop-filter: blur(10px);
    border-radius: 16px;
    border: 1px solid rgba(255, 255, 255, 0.05);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
    padding: 20px;
    overflow-y: auto;
    transition: all 0.3s ease;
  }

  .popular-posts:hover {
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.2);
    transform: translateY(-2px);
  }

  @media (max-width: 768px) {
    .popular-posts {
      display: none;
    }
  }
    
  .section-title {
    font-size: 20px;
    font-weight: 700;
    margin-bottom: 20px;
    color: var(--violet-2);
    font-family: "Inter", sans-serif;
    letter-spacing: -0.5px;
    padding-bottom: 12px;
    border-bottom: 2px solid rgba(var(--violet-6-rgb), 0.2);
  }
  
  .post-list {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
  
  .post-item {
    display: flex;
    gap: 12px;
    align-items: center;
    padding: 8px;
    cursor: pointer;
    border-radius: 12px;
    background: rgba(255, 255, 255, 0.02);
    border: 1px solid rgba(255, 255, 255, 0.02);
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }
  
  .post-item:hover {
    background: rgba(95, 61, 196, 0.2);
    border-color: rgba(var(--violet-6-rgb), 0.3);
    transform: translateX(4px);
  }
  
  .post-item:hover .post-thumbnail {
    transform: scale(1.05);
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  }
  
  .post-item:hover .post-title {
    color: var(--violet-2);
  }
  
  .post-thumbnail {
    width: 64px;
    height: 64px;
    object-fit: cover;
    border-radius: 10px;
    transition: all 0.3s ease;
    border: 1px solid rgba(255, 255, 255, 0.05);
  }
  
  .post-info {
    flex: 1;
    transition: all 0.3s ease;
  }
  
  .post-title {
    font-size: 14px;
    font-weight: 500;
    margin: 0;
    color: #f1f3f5;
    line-height: 1.4;
    font-family: "Inter", sans-serif;
    transition: color 0.3s ease;
  }
  
  .post-meta {
    font-size: 12px;
    color: rgba(255, 255, 255, 0.5);
    margin-top: 4px;
    font-family: "Inter", sans-serif;
    transition: color 0.3s ease;
  }
  
  .post-item:hover .post-meta {
    color: rgba(255, 255, 255, 0.7);
  }
  </style>
