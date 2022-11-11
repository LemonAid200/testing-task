import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
// import vueCustomScrollbar from 'vue-custom-scrollbar'



createApp(App).use(store).use(router).mount("#app");
