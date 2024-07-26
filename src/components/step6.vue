<template>
    <div class="container">
        <div class="white-bg">
            <div class="content-title">
                <p>Ваш ИУЛ сформирован, скачайте его:</p>
                <img src="/src/assets/img/result5.png" alt="" srcset="">
                <!-- <Knob v-model="value" disabled /> -->
            </div>
            <div className="flex-just-spcbtw" style="max-width: 495px ;">
                <Button label="Назад" @click="goToStep5" className="prev" icon="pi pi-arrow-left" text />
                <Button className="next" @click="goToStepDone" label="Скачать" />
            </div>

        </div>
    </div>
</template>

<style></style>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import FloatLabel from "primevue/floatlabel";
import DatePicker from 'primevue/datepicker';
import 'primeicons/primeicons.css'
import Select from 'primevue/select';


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
        const selectedEncoding = ref('')
        const encoding = ref([
            { name: ' MD5', value: "md5" },
            { name: 'MD6', value: "md6" },
        ])
        const isNextButtonEnabled = computed(() => {
            return selectedEncoding.value !== "";
        });
        console.log(isNextButtonEnabled);


        return {
            encoding,
            isNextButtonEnabled,
            selectedEncoding
        }
    },
    methods: {
        goToStepDone() {
            this.$router.push('/stepDone')
        },
        goToStep5() {
            this.$router.push('/step4')
        },
    }

});

</script>
