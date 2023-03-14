<template>
  <div class="list-container">
    <Item v-for="(item, index) in filteredProducts" :key="index" :item="item" />
  </div>
</template>

<script lang="ts">
import Item from "./Item.vue";
import { defineComponent, onBeforeMount } from "vue";
import { useCartStore } from "@/store/cart";
import { storeToRefs } from "pinia";

export default defineComponent({
  components: {
    Item,
  },
  setup() {
    const cartStore = useCartStore();

    const { filteredProducts } = storeToRefs(cartStore);

    onBeforeMount(async () => {
      cartStore.loadProducts();
    });

    return {
      filteredProducts,
    };
  },
});
</script>

<style scoped>
.list-container {
  direction: ltr;
  display: flex;
  flex-direction: column;
  gap: 55px;
  align-items: center;
  height: 555px;
  overflow: auto;
}

@media (min-width: 640px) {
  .list-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 10px;
    grid-row-gap: 60px;
    padding: 0 20px;
  }
}
</style>
