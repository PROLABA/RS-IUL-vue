<template>
    <div class="container">
        <div class="white-bg">
            <div class="content-title">
                <p>Дополните, пожалуйста информацию</p>
                <img src="/src/assets/img/result3.png" alt="" srcset="">
                <!-- <Knob v-model="value" disabled /> -->

            </div>
            <div class="step3-container">
                <div class="left">
                    <div className="select-labels">
                        <p>1. Наименование объекта</p>
                        <InputText v-model="objectName" id="type-doc" placeholder="Введите наименование"
                            className="component-input" />

                    </div>
                    <div className="select-labels">
                        <p>2. Наименование документа</p>
                        <InputText v-model="documentName" id="name-doc" placeholder="Введите наименование документа"
                            className="component-input" />
                    </div>
                    <div className="select-labels">
                        <p>3. Дата</p>
                        <DatePicker dateFormat="dd/mm/yy" showIcon fluid iconDisplay="input" style="width: 100%;"
                            placeholder="Выберите или введите дату" v-model="date">
                            <template #inputicon="slotProps">
                                <i class="pi pi-angle-down" @click="slotProps.clickCallback" />
                            </template>
                        </DatePicker>
                    </div>
                    <div class="btn-footer" style="padding-top:20px;">
                        <div className="flex-just-spcbtw">
                            <Button label="Назад" @click="goToStep2" className="prev" icon="pi pi-arrow-left" text />
                            <Button className="next" @click="goToStep4" :disabled="!isNextButtonEnabled"
                                label="Следующий шаг" />
                        </div>
                    </div>
                </div>
                <div class=" right">
                    <div class="title-document-watch">
                        Предпросмотр ИУЛ
                    </div>
                    <div class="document-item">
                        <div class="dotted-border">
                            <iframe width="471px" height="597px" src="/src/assets/img/doc-sample.png"></iframe>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>

<style>
.step3-container {
    display: grid;
    grid-template-columns: 495px 705px;
    gap: 20px;
}

.title-document-watch {
    font-size: 16px;
    font-weight: 700;
    line-height: 1.17;
    text-align: center;
    padding-bottom: 20px;
}

.dotted-border {
    padding: 20px;
    display: flex;
    align-items: center;
    border: 2px dashed #0578D6;
    border-radius: 4px;
}

.dotted-border iframe {
    margin: 0 auto;
    overflow-x: hidden;
}

.left {
    display: flex;
    flex-direction: column;
    gap: 20px;
}

.component-input {
    width: 100%;
    padding: 19px;
    box-shadow: 0px 4px 8px 0px #0000000D;
    border: 1.5px solid #E9E9E9;
    border-radius: 4px;
    color: black !important;
}

.p-inputtex {
    box-shadow: 0px 4px 8px 0px #0000000D !important;
    border: 1.5px solid #E9E9E9;


}

.step3-container input:focus-visible {
    border-color: #E9E9E9 !important;
}

.step3-container input[placeholder] {
    font-size: 14px !important;
    font-weight: 400;
    color: #B3B3B3;
}

.step3-container input[value] {
    font-size: 14px !important;
    font-weight: 400;
    color: black;
    width: 100%;
    padding: 19px;
}



.p-datepicker-input {
    padding: 19px !important;
    font-family: "Roboto", sans-serif;
    box-shadow: 0px 4px 8px 0px #0000000D !important;


}
</style>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import FloatLabel from "primevue/floatlabel";
import DatePicker from 'primevue/datepicker';
import 'primeicons/primeicons.css'
import Knob from 'primevue/knob';


export default defineComponent({
    name: 'Step3',
    components: {
        Button,
        InputText,
        FloatLabel,
        DatePicker,
        Knob
    },
    setup() {
        const date = ref<Date | null>(null);
        const objectName = ref('');
        const documentName = ref('');
        const isNextButtonEnabled = computed(() => {
            return objectName.value !== '' && documentName.value !== '' && date.value !== null;
        });
        console.log(isNextButtonEnabled);

        return {
            date,
            objectName,
            documentName,
            isNextButtonEnabled,
        }
    },
    methods: {
        goToStep4() {
            this.$router.push('/step4')
        },
        goToStep2() {
            this.$router.push('/step2')
        },
    }
});
</script>
