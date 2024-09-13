<template>
    <div class="container">
        <div class="white-bg">
            <div class="content-title">
                <p>Ваш ИУЛ сформирован, скачайте его:</p>
<!--                <img src="/src/assets/img/result5.png" alt="" srcset="">-->
            </div>
            <div className="flex-just-spcbtw" style="max-width: 495px ;">
                <Button label="Назад" @click="goToStep5" className="prev" icon="pi pi-arrow-left" text />
                <Button className="next2" @click="downloadDocument" label="Скачать" />
            </div>
        </div>
    </div>
</template>
<style>
.flex-just-spcbtw{
  margin-top: 30px;
}
button{
  cursor: pointer;
}
.next2 {
    font-size: 16px;
    font-weight: 700;
    line-height: 18.75px;
    text-align: left;
    padding: 18px 68.5px;
    background: #0578D6;
    border-radius: 4px;
    border-color: transparent !important;
    color: white !important;
}
</style>
<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import FloatLabel from "primevue/floatlabel";
import DatePicker from 'primevue/datepicker';
import 'primeicons/primeicons.css'
import Select from 'primevue/select';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

export default defineComponent({
    name: 'Step6',
    components: {
        Button,
        InputText,
        FloatLabel,
        DatePicker,
        Select
    },

    setup() {
        const store = useStore();
        const selectedEncoding = ref('')
        const encoding = ref([
            { name: ' MD5', value: "md5" },
            { name: 'MD6', value: "md6" },
        ])
        const router = useRouter();
        const isNextButtonEnabled = computed(() => {
            return selectedEncoding.value !== "";
        });

        const downloadDocument = async () => {
            try {
                await store.dispatch('downloadDocument');
                // После успешной загрузки можно перейти на следующую страницу
                goToStepDone();
            } catch (error) {
                console.error('Failed to download document:', error);
                // Здесь можно добавить обработку ошибок, например, показать уведомление пользователю
            }
        };

        const goToStepDone = () => {
            router.push('/stepDone');
        };

        const goToStep5 = () => {
            router.push('/step5');
        };

        return {
            encoding,
            isNextButtonEnabled,
            selectedEncoding,
            downloadDocument,
            goToStepDone,
            goToStep5
        }
    },
});
</script>