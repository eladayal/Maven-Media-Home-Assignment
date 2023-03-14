import { createApp } from "vue";
import { createPinia } from "pinia";
/* import the fontawesome */
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faUserSecret, faCartShopping, faTrash } from "@fortawesome/free-solid-svg-icons";
//
import App from "./App.vue";
import "@/assets/css/main.css";

library.add(faUserSecret, faCartShopping, faTrash);
const pinia = createPinia();

createApp(App).component("font-awesome-icon", FontAwesomeIcon).use(pinia).mount("#app");
