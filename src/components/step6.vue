<template>
    <div class="container">
        <div class="white-bg">
            <div class="content-title">
                <p>Ваш ИУЛ сформирован, скачайте его:</p>
                <img src="/src/assets/img/result5.png" alt="" srcset="">
            </div>
            <div className="flex-just-spcbtw" style="max-width: 495px ;">
                <Button label="Назад" @click="goToStep5" className="prev" icon="pi pi-arrow-left" text />
                <Button className="next" @click="downloadDocument" label="Скачать" />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import FloatLabel from "primevue/floatlabel";
import DatePicker from 'primevue/datepicker';
import 'primeicons/primeicons.css'
import Select from 'primevue/select';
import { useStore } from 'vuex';

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
            // Используйте router для перехода
            store.state.router.push('/stepDone');
        };

        const goToStep5 = () => {
            store.state.router.push('/step4');
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