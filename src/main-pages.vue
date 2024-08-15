<template>
  <constructorHead />
  <div className="ask-qustion container">
    <a href="#">Часто задаваемы вопросы</a>
  </div>
  <router-view />

</template>
<script setup>
import { defineComponent, watch, ref, computed } from 'vue'
import ConstructorHead from './components/constructorHead.vue'

</script>
<style>
.ask-qustion {
  padding: 20px 0px;

}

.ask-qustion a {
  font-size: 16px;
  font-weight: 700;
  line-height: 19.2px;
  color: #0578D6;

}
</style>
