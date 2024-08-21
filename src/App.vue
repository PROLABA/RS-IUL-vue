<template>
  <Toast />
  <router-view />
</template>
<script>
import { defineComponent } from 'vue'
import mainPages from './main-pages.vue'
import Toast from 'primevue/toast'
export default defineComponent({
  components: {
    mainPages,
    Toast,
  }
})
window.versionid
</script>
