import { createWebHistory, createRouter } from "vue-router";
import newDeal from "@/components/newDeal.vue";


const routes = [
  {
    path: "/",
    name: "newDeal",
    component: newDeal,
  },

];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;