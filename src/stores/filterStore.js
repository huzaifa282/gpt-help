
import { ref } from 'vue';

export const selectedTags = ref([]);
export const selectedVersions = ref([]);
export const lastType = ref(null);

export function resetFilters() {
  selectedTags.value = [];
  selectedVersions.value = [];
}