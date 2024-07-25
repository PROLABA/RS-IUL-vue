<template>

  <constructorHead />
  <div className="ask-qustion container"><a href="#">Часто задаваемы вопросы</a></div>
  <ConstructorListContent />
  <Step1 />
  <Step2 />
  <Step3 />
  <Step4 />
  <Step5 />
  <Step6 />
  <stepDone/>

</template>
<script>
import { defineComponent } from 'vue'
import ConstructorHead from './components/constructorHead.vue'
import ConstructorListContent from './components/constructorListContent.vue'
import Step1 from './components/step1.vue';
import Step2 from './components/step2.vue';
import Step3 from "./components/step3.vue"
import Step4 from "./components/step4.vue"
import Step5 from "./components/step5.vue"
import Step6 from "./components/step6.vue"
import stepDone from "./components/stepDone.vue"
export default defineComponent({
  components: {
    ConstructorHead,
    ConstructorListContent,
    Step1,
    Step2,
    Step3,
    Step4,
    Step5,
    Step6,
    stepDone,

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
