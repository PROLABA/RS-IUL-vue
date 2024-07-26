import { createRouter, createWebHashHistory } from "vue-router";
import ConstructorListContent from "./components/constructorListContent.vue";
import Step1 from "./components/step1.vue";
import Step2 from "./components/step2.vue";
import Step3 from "./components/step3.vue";
import Step4 from "./components/step4.vue";
import Step5 from "./components/step5.vue";
import Step6 from "./components/step6.vue";
import stepDone from "./components/stepDone.vue";
import mainPages from "./main-pages.vue";
const routes = [
  {
    path: "/",
    component: mainPages,
    children: [
      { path: "", component: ConstructorListContent },
      { path: "step1", component: Step1 },
      { path: "step2", component: Step2 },
      { path: "step3", component: Step3 },
      { path: "step4", component: Step4 },
      { path: "step5", component: Step5 },
      { path: "step6", component: Step6 },
      { path: "stepDone", component: stepDone },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
