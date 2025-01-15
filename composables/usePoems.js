// composables/usePoems.js
import { ref } from "vue";

// Create a singleton state outside the composable function
const recentPoems = ref([]);

export const usePoems = () => {
  const setRecentPoems = (poems) => {
    recentPoems.value = poems;
  };

  console.log("Recent Poems in Composables:", recentPoems.value); // Debugging

  return {
    recentPoems,
    setRecentPoems,
  };
};
