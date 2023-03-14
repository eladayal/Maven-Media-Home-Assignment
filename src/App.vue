<template class="layout">
  <AppHeader />
  <main>
    <h1 class="page-headline font-bold text-3xl text-center">מגשי אירוח - הזמנות</h1>
    <div class="datepicker-container">
      <VueDatePicker
        disable-month-year-select
        v-model="date"
        @update:model-value="onDateSelect"
        placeholder="בחר תאריך אספקה"
        input-class-name="text-center"
        :min-date="new Date()"
        :max-date="new Date(Date.now() + 12096e5)"
      ></VueDatePicker>
    </div>
    <ItemList />
  </main>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import AppHeader from "@/components/AppHeader.vue";
import ItemList from "@/components/ItemList.vue";
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import { useCartStore } from "@/store/cart";

export default defineComponent({
  name: "App",
  components: {
    AppHeader,
    ItemList,
    VueDatePicker,
  },
  setup() {
    const cartStore = useCartStore();

    const date = ref();

    const onDateSelect = (date: any) => {
      cartStore.updateSelectedDate(date);
    };
    return {
      date,
      onDateSelect,
    };
  },
});
</script>

<style scoped>
main {
}
.layout {
  position: relative;
  margin: 35px 35px;
  /* display: grid;
  grid-template-rows: repeat(4, minmax(0, 1fr));
  grid-gap: 10px; */
}

.page-headline {
  padding-bottom: 15px;
  border-bottom: 1px solid #adadad;
  text-align: center;
  margin-top: 0;
  margin-bottom: 20px;
}
.datepicker-container {
  /* width: 30%; */
  margin: 0 auto 15px;
  @apply w-3/4 md:w-1/2 lg:w-1/3;
}
</style>
