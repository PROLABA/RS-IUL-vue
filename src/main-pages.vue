<template>
  <constructorHead />
  <div className="ask-qustion container">
    <Button label="Часто задаваемы вопросы" @click="openFAQModal" class="faq-button" />
  </div>
  <router-view />

  <Dialog v-model:visible="displayFAQModal" header="Часто задаваемы вопросы" :style="{ width: '50vw' }">
    <Accordion>
      <AccordionTab v-for="(question, index) in questions" :key="index" :header="question.title">
        <p v-html="question.text"></p>
      </AccordionTab>
    </Accordion>
  </Dialog>
</template>

<script setup>
import { defineComponent, watch, ref, computed, onMounted } from 'vue'
import ConstructorHead from './components/constructorHead.vue'
import Button from 'primevue/button'
import Dialog from 'primevue/dialog'
import Accordion from 'primevue/accordion'
import AccordionTab from 'primevue/accordiontab'
import { useStore } from 'vuex';

const displayFAQModal = ref(false)
const store = useStore();

const questions = ref([]);

const fetchQuestions = async () => {
  try {
    await store.dispatch('getFAQQuestions');
    questions.value = store.getters.getFAQQuestions;
    console.log(questions.value);
  } catch (error) {
    console.error("Error fetching FAQ questions:", error);
  }
};

onMounted(fetchQuestions);

const openFAQModal = () => {
  displayFAQModal.value = true
}
</script>
<style>
.ask-qustion {
  padding: 20px 0px;

}

.faq-button {
  font-size: 16px !important;
  font-weight: 700 !important;
  line-height: 19.2px !important;
  color: #0578D6 !important;
  background-color: transparent !important;
  border-color: transparent !important;
  text-decoration: underline !important;
}
</style>
