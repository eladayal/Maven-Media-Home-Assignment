<template>
  <TransitionRoot as="template" :show="isCartModal">
    <Dialog as="div" class="relative z-10" @close="toggleModal">
      <TransitionChild
        as="template"
        enter="ease-in-out duration-500"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="ease-in-out duration-500"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
      </TransitionChild>

      <div class="fixed inset-0 overflow-hidden">
        <div class="absolute inset-0 overflow-hidden">
          <div class="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
            <TransitionChild
              as="template"
              enter="transform transition ease-in-out duration-500 sm:duration-700"
              enter-from="translate-x-full"
              enter-to="translate-x-0"
              leave="transform transition ease-in-out duration-500 sm:duration-700"
              leave-from="translate-x-0"
              leave-to="translate-x-full"
            >
              <DialogPanel class="pointer-events-auto relative w-screen max-w-md">
                <TransitionChild
                  as="template"
                  enter="ease-in-out duration-500"
                  enter-from="opacity-0"
                  enter-to="opacity-100"
                  leave="ease-in-out duration-500"
                  leave-from="opacity-100"
                  leave-to="opacity-0"
                >
                  <div class="absolute top-0 left-0 -ml-8 flex pt-4 pr-2 sm:-ml-10 sm:pr-4">
                    <button
                      type="button"
                      class="rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                      @click="toggleModal"
                    >
                      <span class="sr-only">Close panel</span>
                      <XMarkIcon class="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>
                </TransitionChild>
                <div class="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl dir-rtl">
                  <div class="px-4 sm:px-6">
                    <div class="flex justify-between">
                      <DialogTitle class="text-3xl font-semibold leading-6 text-gray-900 mb-7">
                        עגלת קניות
                      </DialogTitle>
                      <button
                        @click="() => cartStore.clearCart()"
                        class="underline hover:no-underline"
                      >
                        נקה הכל
                      </button>
                    </div>
                  </div>
                  <div class="relative flex flex-col gap-8 mt-6 flex-1 px-4 sm:px-6">
                    <div class="border-b-2" v-for="(item, index) in cart" :key="index" :item="item">
                      <div class="flex gap-3.5">
                        <img class="w-40 h-24 rounded-lg" src="@/assets/card-img.jpg" alt="" />
                        <div class="flex flex-col w-full min-width-224 justify-between">
                          <div class="flex justify-between leading-none">
                            <p class="font-bold">{{ item.name }}</p>
                            <button
                              class="flex gap-0.5 self-start"
                              @click="() => cartStore.removeItemFromCart(item.id)"
                            >
                              הסר
                              <font-awesome-icon icon="fa-solid fa-trash" />
                            </button>
                          </div>
                          <p class="self-end font-bold">{{ item.price }}₪</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="cart-footer flex flex-col gap-6 p-3">
                    <div class="flex justify-between">
                      <h3 class="font-normal">סה"כ לתשלום</h3>
                      <p class="font-semibold">{{ cartTotal }}₪</p>
                    </div>
                    <button
                      class="pay-btn text-white font-medium w-1/2 self-center rounded-lg pointer-curser"
                    >
                      המשך לתשלום
                    </button>
                  </div>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup lang="ts">
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from "@headlessui/vue";
import { XMarkIcon } from "@heroicons/vue/24/outline";
import { useCartStore } from "@/store/cart";
import { useModalStore } from "@/store/modal";
import { storeToRefs } from "pinia";
import { Ref, ref } from "vue";

const cartStore = useCartStore();
const modalStore = useModalStore();

const toggleModal = () => {
  modalStore.toggleCartModal();
};

const { cart, cartTotal } = storeToRefs(cartStore);
const { isCartModal } = storeToRefs(modalStore);
</script>

<style scoped>
.cart-footer {
  background-color: #eeefef;
  height: 150px;
  box-shadow: 0 -3px 6px 0 rgb(0 0 0 / 16%);
}

.pay-btn {
  background-color: #1d1d1d;
  height: 50px;
}
</style>
