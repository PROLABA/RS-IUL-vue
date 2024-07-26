<template>
  <router-view />
</template>
<script>
import { defineComponent } from 'vue'
import mainPages from './main-pages.vue'
export default defineComponent({
  components: {
    mainPages,
  }
})
</script>
