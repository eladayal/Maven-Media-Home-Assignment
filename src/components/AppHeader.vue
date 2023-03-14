<template>
  <header class="header flex justify-between items-center">
    <div class="header-logo flex">
      <img class="logo" alt="logo" src="../assets/maritozzologo.jpg" />
    </div>
    <div class="cart-section">
      <Cart />
    </div>
  </header>
</template>

<script lang="ts">
import { useCartStore } from "@/store/cart";
import { defineComponent } from "vue";
import { storeToRefs } from "pinia";
import Cart from "@/components/Cart.vue";

export default defineComponent({
  components: {
    Cart,
  },
  setup() {
    const cartStore = useCartStore();
    const { selectedDate } = storeToRefs(cartStore);

    return { selectedDate };
  },
});
</script>

<style scoped>
.header {
  background-image: url("@/assets/wallpaper.jpg");
  min-height: 150px;
  border: none;
  box-shadow: 0 3px 6px 0 rgb(0 0 0 / 16%);
  @apply flex justify-between px-4 mb-7  sm:px-28;
}
.logo {
  height: 75px;
  @apply p-2.5;
}

.cart-section {
  @apply mr-8;
}
</style>
