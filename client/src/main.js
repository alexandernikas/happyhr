import { createApp } from 'vue';
import deals_app from './App.vue';
import router from './router'; // Import your router configuration

const app = createApp(deals_app);
app.use(router);
app.mount('#app');
