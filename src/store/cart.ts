import { defineStore } from "pinia";
import { computed, Ref, ref } from "vue";
import data from "../data.json";
import { Product } from "@/interfaces/index";
import moment from "moment";
import Swal from "sweetalert2";
import { makeId } from "@/services/util";

export const useCartStore = defineStore("cart", () => {
  //State
  const productList: Ref<Product[]> = ref([]);
  const cart: Ref<Product[]> = ref([]);
  const selectedDate: Ref<string> = ref("");

  // Getters
  const filteredProducts = computed(() => {
    if (!selectedDate.value) return productList.value;
    return productList.value.filter(filterProductList);
  });

  const cartTotal = computed(() => {
    return cart.value.reduce((acc: number, item: Product) => acc + item.price, 0);
  });

  // Methods
  function loadProducts() {
    //importing from Json file
    productList.value = data.data;
  }
  const updateSelectedDate = (date: string) => {
    selectedDate.value = date;
    if (cart.value.length) {
      if (!cart.value.every((item: Product) => checkProductAvalibilty(item))) {
        cartAlert();
      }
    }
  };

  const updateCart = (product: Product): void => {
    product.id = makeId(); //adding a uniqe id
    cart.value.push(product);
    addToCartAlert();
  };

  const removeItemFromCart = (productId: string) => {
    const productIndex = cart.value.findIndex((product: Product) => product.id === productId);
    cart.value.splice(productIndex, 1);
  };

  const clearCart = () => {
    cart.value = [];
  };
  const checkProductAvalibilty = (product: Product) => {
    const dateFormat = "YYYY-MM-DD";
    const currentFormatedDate = moment().format(dateFormat);
    const selectedFormatedDate = moment(selectedDate.value).format(dateFormat);

    // Check the "makeDays" rule
    const checkMakeDays = moment(currentFormatedDate)
      .add(product.times.makeDays, "days")
      .isSameOrBefore(selectedFormatedDate);

    // Check the "availableDaysOfWeek" rule
    const checkAvailableDaysOfWeek = product.times.availableDaysOfWeek.includes(
      moment(selectedDate.value).day() + 1
    );

    // Check the "excludeDates" rule
    const checkExcludedDates = () => {
      if (!product.times.excludeDates.length) return true;
      return product.times.excludeDates.every((date) => {
        return !moment(selectedFormatedDate).isSame(moment(date.date).format(dateFormat));
      });
    };

    // Checking the three rules if all conditions are met then true is returend and the check passes
    return checkMakeDays && checkAvailableDaysOfWeek && checkExcludedDates() ? true : false;
  };

  function filterProductList(product: Product) {
    if (checkProductAvalibilty(product)) {
      return product;
    }
  }

  const cartAlert = () => {
    Swal.fire({
      position: "center",
      icon: "info",
      title: "!שים לב<br/>אחד המוצרים בעגלה חורג את מגבלות התאריך הנבחר",
      showConfirmButton: false,
      timer: 3000,
    });
  };

  const addToCartAlert = () => {
    const Toast = Swal.mixin({
      toast: true,
      position: "top",
      showConfirmButton: false,
      timer: 1500,
      timerProgressBar: true,
    });

    Toast.fire({
      icon: "success",
      title: "המוצר נוסף לעגלה",
    });
  };

  return {
    cart,
    selectedDate,
    productList,
    filteredProducts,
    cartTotal,
    updateCart,
    loadProducts,
    updateSelectedDate,
    removeItemFromCart,
    clearCart,
  };
});
