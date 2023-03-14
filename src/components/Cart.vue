<template>
  <div @click="() => modalStore.toggleCartModal()" class="cart cursor-pointer">
    <font-awesome-icon icon="fa-solid fa-cart-shopping" size="2x" />
    <p class="cart-badge flex justify-center items-center">{{ cart.length }}</p>
  </div>
  <div class="cart-modal-container">
    <CartMenu />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useCartStore } from "@/store/cart";
import { useModalStore } from "@/store/modal";
import { storeToRefs } from "pinia";
import CartMenu from "@/components/CartMenu.vue";

export default defineComponent({
  components: {
    CartMenu,
  },
  setup() {
    const cartStore = useCartStore();
    const modalStore = useModalStore();
    const { selectedDate, cart } = storeToRefs(cartStore);

    return { cart, selectedDate, modalStore };
  },
});
</script>

<style scoped>
.cart {
  @apply relative;
}

.cart-badge {
  height: 20px;
  width: 20px;
  background-color: #1e2f9b;
  @apply rounded-full text-white absolute -top-3 -right-2;
}
</style>
