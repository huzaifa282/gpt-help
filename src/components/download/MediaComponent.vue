<template>

  <!-- ads -->
  <center>
    <a :href="trackerUrl" target="_blank" rel="nofollow">
      <img src="https://utfs.io/f/yveV5dqrfAFWwxya8an6EaFuAtzDkUHYpGI7mOlSXBx0CdeP" border="0" class="tracker-image" alt="Ad banner" />
    </a>
  </center>
  <!-- ads -->

  <div class="component-wrapper">
    <!-- Media (YouTube or Fallback Image) -->
    <div class="media-container">
      <div v-if="isYoutubeAvailable" class="youtube-container">
        <div v-if="isLoading" class="loading-indicator">
          Loading video...
        </div>
        <iframe v-show="!isLoading" :src="youtubeEmbedUrl" title="YouTube Video" frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen class="responsive-iframe" @load="handleLoad"></iframe>
      </div>
      <div v-else class="image-container">
        <img :src="imageSrc" :alt="altBlogIMG || `${currentPostName} blog post thumbnail`" class="responsive-image" />
      </div>
    </div>

    <!-- Download Button -->
    <div class="button-container">
      <a v-if="!isMultiDownload()" :href="downloadUrl" target="_blank" rel="nofollow" class="download-button">Download</a>
      <a v-for="(each, index) in multiDownload" :key="index" :href="each.downloadUrl" target="_blank" rel="nofollow"
        class="download-button">Download ({{ each.name }})</a>
    </div>
  </div>
</template>

<script>
export default {
  name: "MediaComponent",
  props: {
    imageSrc: {
      type: String,
      required: true,
    },
    youtubeEmbedUrl: {
      type: String,
      required: false,
      default: "", // Default to an empty string
    },
    downloadUrl: {
      type: String,
      required: true,
    },
    multiDownload:{
      type: Array,
    },
    currentPostName: {
      type: String,
      required: true,
    },
    altBlogIMG: {
      type: String,
      required: false,
      default: '' // Add a default value
    },
  },
  data() {
    return {
      isLoading: true, // Tracks the loading state of the iframe
    };
  },
  computed: {
    isYoutubeAvailable() {
      // Check if the YouTube URL is not empty
      return this.youtubeEmbedUrl && this.youtubeEmbedUrl.trim() !== "";
    },
    trackerUrl() {
      return `https://creatureicicle.xyz/tracker/index.php?code=cyd&q=${this.currentPostName}`;
    } // ads in here
  },
  methods: {
    handleLoad() {
      // Set loading to false once the iframe has loaded
      this.isLoading = false;
    },
    isMultiDownload(){
      return this.multiDownload && this.multiDownload.length > 0;
    }
    // Remove handleDownload method as it's no longer needed
  },
};
</script>

<style scoped>
/* Component Wrapper */
.component-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  padding: 16px;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1); /* Subtle shadow */
  width: 100%;
  margin: 0 auto;
}

@media screen and (max-width: 768px) {
  .component-wrapper {
    padding: 0px;
  }
}

/* Media Container */
.media-container {
  width: 100%;
  border-radius: 8px;
  overflow: hidden;
  position: relative;
  display: flex;
  justify-content: center;
}

/* Loading Indicator */
.loading-indicator {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.1);
  font-size: 16px;
  color: #555;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 10;
  text-align: center;
}

/* Image Styling */
.image-container {
  width: 100%;
  display: flex;
  justify-content: center;
}

.responsive-image {
  width: 100%;
  height: auto;
  display: block;
  border-radius: 8px;
}

@media (max-width: 768px) {
  .responsive-image {
    width: 360px;
    max-width: 100%;
    height: auto;
    object-fit: contain;
  }
  .youtube-container{
    width: 360px;
    max-width: 100%;
    margin: 0 auto;
  }
}

/* YouTube Embed Styling */
.youtube-container {
  transform: scale(0.99);
  width: 100%;
  aspect-ratio: 16 / 9;
  overflow: hidden;
  border-radius: 8px;
  position: relative;
  transition: transform 0.2s ease, box-shadow 0.3s ease;
}

.youtube-container:hover {
  transform: scale(1.00);
}

.responsive-iframe {
  width: 100%;
  height: 100%;
  border: none;
}

/* Button Styling */
.button-container {
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: center;
  justify-content: center;
  width: 100%;
}

.download-button {
  padding: 16px 80px;
  width: 360px;
  font-family: "Poppins", sans-serif;
  font-size: 20px;
  font-weight: 600;
  color: white;
  background: linear-gradient(135deg, var(--violet-7), var(--violet-9));
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.3s ease;
  box-shadow: 0 4px 15px rgba(58, 21, 119, 0.1);
  text-decoration: none;  /* Add this to remove the underline */
  display: inline-block;  /* Add this to maintain button-like appearance */
  text-align: center;     /* Add this to center the text */
}

@media screen and (max-width: 768px) {
  .button-container {
    width: 360px;
    max-width: 100%;
    margin: 0 auto;
  }
  .download-button {
    width: 100%;
    padding: 16px 40px;
  }
}

.download-button:hover {
  transform: scale(1.02);
  box-shadow: 
    0 6px 25px rgba(58, 21, 119, 0.25),
    0 4px 10px rgba(var(--violet-2-rgb), 0.2),
    0 0 20px rgba(var(--violet-4-rgb), 0.15);
}

.download-button:active {
  transform: scale(0.98);
  box-shadow: 
    0 4px 15px rgba(90, 34, 179, 0.2),
    0 2px 8px rgba(var(--violet-7-rgb), 0.15);
}

.loading-indicator {
  font-family: 'Poppins', sans-serif;
}

.tracker-image {
  width: 400px;
}

@media screen and (max-width: 768px) {
  .tracker-image {
    width: 360px;
    max-width: 100%;
    height: auto;
  }
  center {
    width: 360px;
    max-width: 100%;
    margin: 0 auto;
    display: flex;
    justify-content: center;
  }
}
</style>
