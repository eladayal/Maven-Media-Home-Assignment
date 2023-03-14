import { defineStore } from "pinia";
import { Ref, ref } from "vue";

export const useModalStore = defineStore("modal", () => {
  //State

  const isCartModal: Ref<boolean> = ref(false);
  // Getters

  // Methods

  const toggleCartModal = () => {
    isCartModal.value = !isCartModal.value;
  };

  return {
    isCartModal,
    toggleCartModal,
  };
});
