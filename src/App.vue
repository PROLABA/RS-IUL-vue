<template>

  <constructorHead />
  <div className="ask-qustion container"><a href="#">Часто задаваемы вопросы</a></div>
  <ConstructorListContent />


</template>
<script>
import { defineComponent } from 'vue'
import ConstructorHead from './components/constructorHead.vue'
import ConstructorListContent from './components/constructorListContent.vue'
export default defineComponent({
  components: {
    ConstructorHead,
    ConstructorListContent
  }
})
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
