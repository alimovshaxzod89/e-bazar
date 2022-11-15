import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { initializeApp } from "firebase/app";



const firebaseConfig = {
    apiKey: "AIzaSyDPywKP8N3wAMETS6-VpS67YCGpV4mZ4xg",
    authDomain: "e-bazar-53ff7.firebaseapp.com",
    projectId: "e-bazar-53ff7",
    storageBucket: "e-bazar-53ff7.appspot.com",
    messagingSenderId: "75760490315",
    appId: "1:75760490315:web:8b180e7af8612f1e517ace",
    measurementId: "G-9PMLHD0Z7H"
};

initializeApp(firebaseConfig);

const app = createApp(App)

app.use(store);
app.use(router);
app.mount('#app');