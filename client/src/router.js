import { createWebHistory, createRouter } from "vue-router";
import AddDeal from "@/components/AddDeal.vue";



const routes = [
  {
    path: "/add",
    name: "add",
    component: AddDeal
  },

];

const Router = createRouter({
  history: createWebHistory(),
  routes,
});

export default Router;