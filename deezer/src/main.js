import { createApp } from 'vue';
import App from './App.vue';
import { registerPlugins } from '@/plugins';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

// Import FontAwesome styles
import '@fortawesome/fontawesome-svg-core/styles.css';

library.add(fas);

const app = createApp(App);

app.component('font-awesome-icon', FontAwesomeIcon);

registerPlugins(app);

app.mount('#app');
