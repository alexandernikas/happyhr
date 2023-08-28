import { createRouter, createWebHistory } from 'vue-router';
import AddDeal from './components/AddDeal.vue';
import DealsList from './components/DealsList.vue';
import Deal from './components/Deal.vue';


const routes = [
  { path: '/deals', component: DealsList },
  { path: '/add', component: AddDeal },
  { path: '/deals/:id', component: Deal },
];

var router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;