<script setup>
import Tools from '@/layouts/Tools.vue';
import posts from '@/utils/source';
import { onMounted, computed, ref, watch } from 'vue';
import { selectedTags, selectedVersions, lastType, resetFilters } from '@/stores/filterStore.js';

const searchQuery = ref('');
const showAllTagsDropdown = ref(false);
const showAllVersionsDropdown = ref(false);

const { type } = defineProps({
    type: {
        type: Number,
        default: 0,
    },
});

// Get all unique tags
const allTags = computed(() => {
    const tags = posts.flatMap(post => post.tags || []);
    return [...new Set(tags)];
});

// Get all unique versions
const allVersions = computed(() => {
    const versions = posts.flatMap(post => post.versions || []);
    return [...new Set(versions)];
});

// Toggle the dropdown
const toggleTagDropdown = () => {
    if (!showAllTagsDropdown.value) {
        showAllVersionsDropdown.value = false;
    }
    showAllTagsDropdown.value = !showAllTagsDropdown.value;
};

const toggleVersionDropdown = () => {
    if (!showAllVersionsDropdown.value) {
        showAllTagsDropdown.value = false;
    }
    showAllVersionsDropdown.value = !showAllVersionsDropdown.value;
};

// Toggle tag selection (select/deselect)
const toggleTag = (tag) => {
    if (selectedTags.value.includes(tag)) {
        selectedTags.value = selectedTags.value.filter(t => t !== tag);
    } else {
        selectedTags.value.push(tag);
    }
};

// Toggle version selection (select/deselect)
const toggleVersion = (version) => {
    if (selectedVersions.value.includes(version)) {
        selectedVersions.value = selectedVersions.value.filter(v => v !== version);
    } else {
        selectedVersions.value.push(version);
    }
};

// Watch the “type” prop. If it changes and is different from the lastType, reset filters.
watch(() => type, (newType) => {
  if (lastType.value !== null && lastType.value !== newType) {
    resetFilters();
  }
  lastType.value = newType;
});

const filteredPosts = computed(() => {
    if (!searchQuery.value && !selectedTags.value && !selectedVersions.value) {
        return posts;
    }
    return posts.filter(post => {
        const matchesType = type === 0 || post.type === type;
        const matchesSearchQuery = post.name.toLowerCase().includes(searchQuery.value.toLowerCase());
        const matchesTags = selectedTags.value.length
            ? selectedTags.value.every(tag => post.tags?.includes(tag))
            : true;
        const matchesVersions = selectedVersions.value.length
            ? selectedVersions.value.every(version => post.versions?.includes(version))
            : true;
        return matchesType && matchesSearchQuery && matchesTags && matchesVersions;
    });
});

const searchMessage = computed(() => {
    const typeString = type === 1 ? 'Minecraft clients' : (type === 2 ? 'Texture Packs' : 'All posts');
    if (!searchQuery.value) {
        return typeString;
    }
    return `Search results for "${searchQuery.value}" (${typeString})`;
});
</script>

<template>
    <div class="search-container">
        <div v-if="searchMessage" class="search-message">
            {{ searchMessage }}
        </div>
        <div class="controls-container">
            <div class="filter-group">
                <div class="tags-input">
                    <button class="filter-button" @click="toggleTagDropdown">
                        <span>Filter Tags</span>
                        <span class="badge" v-if="selectedTags.length">{{ selectedTags.length }}</span>
                    </button>
                    <div v-if="showAllTagsDropdown" class="dropdown-overlay" @click="showAllTagsDropdown = false"></div>
                    <div v-if="showAllTagsDropdown" class="tags-dropdown">
                        <div
                            v-for="(tag, index) in allTags"
                            :key="index"
                            :class="['tag-item', { selected: selectedTags.includes(tag) }]"
                            @click="toggleTag(tag)"
                        >
                            {{ tag }}
                        </div>
                    </div>
                </div>
                <div class="versions-input">
                    <button class="filter-button" @click="toggleVersionDropdown">
                        <span>Filter Versions</span>
                        <span class="badge" v-if="selectedVersions.length">{{ selectedVersions.length }}</span>
                    </button>
                    <div v-if="showAllVersionsDropdown" class="dropdown-overlay" @click="showAllVersionsDropdown = false"></div>
                    <div v-if="showAllVersionsDropdown" class="versions-dropdown">
                        <div
                            v-for="(version, index) in allVersions"
                            :key="index"
                            :class="['version-item', { selected: selectedVersions.includes(version) }]"
                            @click="toggleVersion(version)"
                        >
                            {{ version }}
                        </div>
                    </div>
                </div>
            </div>
            <input v-model="searchQuery" class="search-bar" type="text" placeholder="Search posts..." />
        </div>
        
        <!-- Selected Filters Section -->
        <div class="selected-filters" v-if="selectedTags.length || selectedVersions.length">
            <div class="filter-section" v-if="selectedTags.length">
                <div class="filter-header">Selected Tags</div>
                <div class="selected-tags">
                    <span v-for="(tag, index) in selectedTags" :key="index" class="tag">
                        {{ tag }}
                        <button class="remove-tag" @click="toggleTag(tag)">✕</button>
                    </span>
                </div>
            </div>
            <div class="filter-section" v-if="selectedVersions.length">
                <div class="filter-header">Selected Versions</div>
                <div class="selected-versions">
                    <span v-for="(version, index) in selectedVersions" :key="index" class="version">
                        {{ version }}
                        <button class="remove-version" @click="toggleVersion(version)">✕</button>
                    </span>
                </div>
            </div>
        </div>
    </div>

    <Tools :posts="filteredPosts" :searchMessage="searchMessage" />
</template>

<style scoped>
.search-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-left: 32px;
    padding-right: 32px;
    margin: auto;
    max-width: 1380px;
    position: relative;
    z-index: 100;
}

.search-message {
    font-family: 'Poppins';
    font-size: 18px;
    font-weight: bold;
    padding-left: 16px;
    color: #ffffffc4;
    margin-bottom: 16px;
    align-self: flex-start;
}

.search-bar {
    padding: 12px 20px;
    width: 300px;
    height: 44px;
    border-radius: 12px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(255, 255, 255, 0.03);
    color: #fff;
    font-family: 'Poppins';
    font-size: 14px;
    margin: 0;
    backdrop-filter: blur(10px);
    transition: all 0.3s ease;
}

.search-bar:focus {
    border-color: rgba(255, 255, 255, 0.2);
    background: rgba(255, 255, 255, 0.05);
    outline: none;
    box-shadow: 0 0 20px rgba(255, 255, 255, 0.05);
}

.controls-container {
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
    width: 100%;
    justify-content: center;
    margin-bottom: 16px;
    align-items: center;
}

.filter-group {
    display: flex;
    gap: 12px;
    flex-wrap: wrap;
}

.selected-filters {
    display: flex;
    flex-direction: column;
    gap: 16px;
    width: 100%;
    padding: 16px;
    background: rgba(255, 255, 255, 0.02);
    border-radius: 8px;
    margin-bottom: 16px;
}

.filter-section {
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.filter-header {
    font-family: 'Poppins';
    font-size: 14px;
    color: #666;
    font-weight: 500;
    padding-left: 4px;
}

.selected-tags, .selected-versions {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    align-items: center;
}

.tags-input, .versions-input {
    font-family: 'Poppins';
    border: 1px solid rgba(255, 255, 255, 0);
    border-radius: 8px;
    padding: 8px;
    display: inline-flex;
    position: relative;
    gap: 8px;
    align-items: center;
    height: 40px;
}

.tag, .version {
    font-weight: bold;
    display: inline-flex;
    align-items: center;
    background-color: #242424;
    color: #b4b4b4;
    padding: 4px 8px;
    border-radius: 8px;
    font-size: 14px;
    white-space: nowrap;
    height: 32px;
    font-family: 'Poppins';
}

.remove-tag, .remove-version {
    font-weight: bold;
    background: none;
    border: none;
    margin-left: 4px;
    color: #5a5a5a;
    cursor: pointer;
}

.filter-button {
    height: 44px;
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.02));
    color: #fff;
    border: 1px solid rgba(255, 255, 255, 0.1);
    padding: 0 20px;
    border-radius: 12px;
    cursor: pointer;
    font-family: 'Poppins';
    font-weight: 500;
    white-space: nowrap;
    backdrop-filter: blur(10px);
    display: flex;
    align-items: center;
    gap: 8px;
    transition: all 0.3s ease;
}

.filter-button:hover {
    border-color: rgba(255, 255, 255, 0.2);
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.08), rgba(255, 255, 255, 0.03));
    transform: translateY(-1px);
}

.badge {
    background: rgba(255, 255, 255, 0.1);
    padding: 2px 8px;
    border-radius: 12px;
    font-size: 12px;
}

.dropdown-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 1;
}

.tags-dropdown, .versions-dropdown {
    position: absolute;
    top: calc(100% + 8px);
    right: 0;
    background: rgba(20, 20, 20, 0.95);
    backdrop-filter: blur(20px);
    border: 1px solid rgba(255, 255, 255, 0.1);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
    border-radius: 12px;
    padding: 16px;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
    gap: 8px;
    z-index: 2;
    max-height: 400px;
    overflow-y: auto;
    scrollbar-width: thin;
    animation: dropdownFade 0.2s ease;
}

.tag-item, .version-item {
    padding: 10px 16px;
    background: rgba(255, 255, 255, 0.03);
    color: #fff;
    border: 1px solid rgba(255, 255, 255, 0.05);
    border-radius: 8px;
    text-align: center;
    cursor: pointer;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    transition: all 0.2s ease;
    font-size: 14px;
}

.tag-item:hover, .version-item:hover {
    background: rgba(255, 255, 255, 0.08);
    border-color: rgba(255, 255, 255, 0.1);
    transform: translateY(-1px);
}

.tag-item.selected, .version-item.selected {
    background: linear-gradient(135deg, var(--violet-6), var(--violet-8));
    border-color: rgba(255, 255, 255, 0.2);
    color: #fff;
    font-weight: 500;
}

@keyframes dropdownFade {
    from {
        opacity: 0;
        transform: translateY(-10px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@media (max-width: 768px) {
    .controls-container {
        flex-direction: column;
        align-items: stretch;
        gap: 12px;
    }

    .filter-group {
        flex-direction: row;
        justify-content: space-between;
        margin-top: 12px;
    }

    .filter-button {
        flex: 1;
        min-width: calc(50% - 6px); /* Half width minus half of the gap */
    }

    .search-bar {
        order: -1; /* Move search bar to top */
    }

    .controls-container {
        flex-direction: column;
        align-items: stretch;
    }

    .filter-group {
        flex-direction: column;
    }

    .search-bar {
        width: 100%;
    }

    .tags-dropdown, .versions-dropdown {
        position: fixed;
        left: 16px;
        right: 16px;
        bottom: 16px;
        top: auto;
        max-height: 60vh;
        grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
    }
}
</style>
