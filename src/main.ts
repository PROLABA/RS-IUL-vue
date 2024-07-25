import { createApp } from 'vue';
import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura';
import App from './App.vue'
import 'primeicons/primeicons.css';
import { ru } from './helper/local';

const app = createApp(App);
app.use(PrimeVue, {
    locale: ru,
    theme: {
        preset: Aura

    }
});
app.mount('#app');
