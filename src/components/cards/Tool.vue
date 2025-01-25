<script setup>
// Vue Props
const props = defineProps({
    id: Number,
    name: String,
    color: String,
    description: String,
    download_text: String,
    image_src: String,
    altIMG: String,
    altSideIMG: String,
    altBlogIMG: String,
});

// Add new import for dynamic image loading
import { ref, computed } from 'vue';
const isLoading = ref(true);

const handleImageLoad = () => {
    isLoading.value = false;
};

// Update computedHref to be usable by all elements
const computedHref = computed(() => {
    const slug = props.name.toLowerCase().replace(/\s+/g, '-');
    return `/${slug}`;
});
</script>

<template>
    <div class="tool">
        <div class="tool-container">
            <a :href="computedHref" 
               class="tool-image-container" 
               @click.prevent="navigateToMedia(name, altBlogIMG)"
               :class="{ 'is-loading': isLoading }">
                <img :src="image_local_src" 
                     :alt="altIMG || `${name} thumbnail`" 
                     class="tool-image" 
                     loading="lazy"
                     @load="handleImageLoad" />
            </a>
            <a :href="computedHref"
               class="tool-title"
               @click.prevent="navigateToMedia(name, altBlogIMG)"
               :title="name">{{ name }}</a>
        </div>
        <a :href="computedHref" 
           class="tool-button" 
           @click.prevent="navigateToMedia(name, altBlogIMG)">
            {{ `Download ${name}` }}
        </a>
    </div>
</template>

<script>
export default {
    methods: {
        navigateToMedia(name, altBlogIMG) {
            const slug = name.toLowerCase().replace(/\s+/g, '-');
            this.$router.push({ 
                name: 'CardView', 
                params: { slug },
                state: { altBlogIMG } // Pass altBlogIMG through router state
            });
        },
    },
    computed: {
        image_local_src() {
            try {
                new URL(this.image_src);
                return this.image_src;
            } catch {
                // Use the @/ alias which webpack/vite will properly resolve
                return new URL(`../../assets/images/post_images/toolView/${this.image_src}`, import.meta.url).href;
            }
        },
    },
};
</script>

<style scoped>
.tool {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
    max-width: 300px; /* Adjust based on grid size */
}

.tool-container {
    width: 100%; /* Fixed width */
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    border-radius: 12px;
    border: 1px solid rgba(255, 255, 255, 0.08);
    padding: 16px;
    background: linear-gradient(145deg, rgba(255, 255, 255, 0.03), rgba(255, 255, 255, 0.01));
    text-align: center;
    backdrop-filter: blur(10px);
    transition: all 0.3s ease;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.tool-container:hover {
    border-color: rgba(255, 255, 255, 0.15);
    box-shadow: 0 8px 25px rgba(255, 255, 255, 0.08);
    transform: translateY(-2px);
}

.tool-image-container {
    text-decoration: none;
    width: 100%;
    height: 150px;
    overflow: hidden;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(145deg, rgba(255, 255, 255, 0.02), rgba(0, 0, 0, 0.02));
    border: 1px solid rgba(255, 255, 255, 0.03);
    cursor: pointer;
    transition: transform 0.3s ease;
    transform-origin: center center; /* Add this line to ensure scaling from center */
}

.tool-image-container.is-loading {
    position: relative;
    animation: pulse 1.5s ease-in-out infinite;
    background: linear-gradient(145deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.02));
}

.tool-image-container.is-loading::after {
    content: '';
    position: absolute;
    top: -150%;
    left: -150%;
    width: 200%;
    height: 200%;
    background: linear-gradient(
        45deg,
        transparent,
        rgba(255, 255, 255, 0.08),
        transparent
    );
    transform-origin: 0 0;
    animation: diagonal-shimmer 2s infinite;
}

.tool-image-container.is-loading img {
    opacity: 0;
}

@keyframes pulse {
    0% { opacity: 0.6; }
    50% { opacity: 0.8; }
    100% { opacity: 0.6; }
}

@keyframes shimmer {
    0% { transform: translateX(0); }
    100% { transform: translateX(400%); }
}

@keyframes diagonal-shimmer {
    0% { transform: rotate(45deg) translateY(-100%); }
    100% { transform: rotate(45deg) translateY(100%); }
}

.tool-image-container:hover {
    transform: scale(1.05); /* Reduced scale value */
    border-color: rgba(255, 255, 255, 0.1);
}

.tool-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transform: scale(1.05); /* Add slight scale to prevent white edges */
    transition: opacity 0.3s ease, transform 0.3s ease;
}

.tool-image-container:hover .tool-image {
    transform: scale(1); /* Reset scale on hover */
}

.tool-title {
    text-decoration: none;
    font-family: 'Poppins', sans-serif;
    font-size: 16px;
    font-weight: 600;
    color: var(--violet-7);
    white-space: nowrap; /* Ensure title fits in one line */
    overflow: hidden;
    text-overflow: ellipsis; /* Add ellipsis for overflow */
    margin: 0;
    cursor: pointer;
    transition: color 0.3s ease;
}

.tool-title:hover {
    color: var(--violet-5);
}

.tool-button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-family: 'Poppins', sans-serif;
    font-size: 14px;
    font-weight: 500;
    color: white;
    padding: 12px 20px;
    border-radius: 10px;
    background: linear-gradient(135deg, var(--violet-6), var(--violet-8));
    border: none;
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    width: 100%;
    position: relative;
    overflow: hidden;
    text-decoration: none; /* Add this line */
}

.tool-button::before {
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

.tool-button:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(255, 255, 255, 0.15),
                0 2px 8px rgba(255, 255, 255, 0.1),
                0 0 2px rgba(255, 255, 255, 0.1);
}

.tool-button:hover::before {
    opacity: 1;
}

.tool-button:active {
    transform: scale(1);
    box-shadow: 0 2px 10px rgba(var(--violet-6-rgb), 0.2);
}
</style>
