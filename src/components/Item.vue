<template>
  <div class="card flex flex-col">
    <img class="object-cover" src="../assets/card-img.jpg" alt="" />
    <p class="card-name">{{ item.name }}</p>
    <small class="card-desc">
      {{ item.description }}
    </small>
    <p class="card-price">{{ item.price }}₪</p>
    <button class="addtocart-btn" v-if="selectedDate" @click="(event) => addToCart(item)">
      הוסף לעגלה
    </button>
    <p class="pick-supplyday" v-else>יש לבחור תאריך אספקה</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useCartStore } from "@/store/cart";
import { storeToRefs } from "pinia";

export default defineComponent({
  props: ["item"],
  setup() {
    const cartStore = useCartStore();
    const { selectedDate } = storeToRefs(cartStore);

    const addToCart = (item: any) => {
      cartStore.updateCart(item);
    };
    return { addToCart, selectedDate };
  },
});
</script>

<style scoped>
.card {
  direction: rtl;
  width: 330px;
  border-bottom: 1px solid #1d1d1d;
}

@media (min-width: 640px) {
  .card {
    width: 300px;
    height: auto;
  }
}
.card img {
  margin-bottom: 7px;
}
.card-name {
  letter-spacing: 0.7px;
  @apply font-bold;
}

.card-desc {
  color: #584646;
  min-height: 20px;
}

.card-price {
  padding: 5px;
  margin-top: auto;
  @apply font-bold;
}

.addtocart-btn {
  border: none;
  background-image: linear-gradient(to right, #a2a3a2 50%, #131d5e 50%);
  background-size: 200% 100%;
  transition: background-position 0.3s;
  font-weight: 700;
  color: #fff;
  background-color: #a2a3a2;
  @apply relative p-2;
}
.addtocart-btn:hover {
  background-position: 100% -100%;
}
.pick-supplyday {
  background-color: #7d7d7d;
  @apply text-white text-center p-2 font-bold tracking-wider;
}
</style>
