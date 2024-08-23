<template>
  <Toast />
  <router-view />
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import mainPages from './main-pages.vue'
import Toast from 'primevue/toast'

export default defineComponent({
  components: {
    mainPages,
    Toast,
  }
})
// @ts-ignore
</script>
