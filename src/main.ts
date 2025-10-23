import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Button from '@/components/Button.vue'
import Footer from '@/components/Footer.vue'
import Link from '@/components/Link.vue'
import ServiceCard from '@/components/ServiceCard.vue'
import WorkModal from '@/components/WorkModal.vue'

const app = createApp(App)

app.component('Button', Button)
app.component('Footer', Footer)
app.component('Link', Link)
app.component('ServiceCard', ServiceCard)
app.component('WorkModal', WorkModal)

app.use(router)

app.mount('#app')
