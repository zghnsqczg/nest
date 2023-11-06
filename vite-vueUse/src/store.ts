import { ref } from "vue";
import { createGlobalState } from "@vueuse/core";

export const useGlobalState = createGlobalState(() => {
  // state
  const count = ref(0);

  // actions
  function increment() {
    count.value++;
  }
  function reduce() {
    count.value--;
  }

  return { count, reduce, increment };
});
