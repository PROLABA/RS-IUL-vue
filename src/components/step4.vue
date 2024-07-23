<template>
    <div class="container">
        <div class="white-bg">
            <div class="content-title">
                <p>Внесите данные роли </p>
                <img src="/src/assets/img/result4.png" alt="" srcset="">
                <!-- <Knob v-model="value" disabled /> -->

            </div>
            <div class="step4-container">
                <div class="left">
                    <div class="dotted-continer">
                        <p className="role">Роль 1</p>
                        <div className="select-labels">
                            <p>1. Действие</p>
                            <Select style="width: 100%;" v-model="action"
                                placeholder="Выберите соответствующее действие" />

                        </div>
                        <div className="select-labels">
                            <p>2. Фамилия</p>
                            <InputText v-model="surname" id="name-doc" placeholder="Введите наименование документа"
                                className="component-input" />
                        </div>
                        <div className="select-labels">
                            <p>3. Дата</p>
                            <DatePicker showIcon fluid iconDisplay="input" style="width: 100%;"
                                placeholder="Выберите или введите дату" v-model="date">
                                <template #inputicon="slotProps">
                                    <i class="pi pi-angle-down" @click="slotProps.clickCallback" />
                                </template>
                            </DatePicker>
                        </div>
                    </div>
                    <div class="btn-footer" style="padding-top:20px;">
                        <div className="flex-just-spcbtw">
                            <Button label="Назад" className="prev" icon="pi pi-arrow-left" text />
                            <Button className="next" :disabled="!isNextButtonEnabled" label="Следующий шаг" />
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
.step4-container {
    display: grid;
    grid-template-columns: 495px 705px;
    gap: 20px;
}

.dotted-continer {
    border: 2px dashed #E9E9E9;
    padding: 20px;
    display:flex;
    flex-direction: column;
    gap: 20px
}


.step4-container input:focus-visible {
    border-color: #E9E9E9 !important;
}

.step4-container input[placeholder] {
    font-size: 14px !important;
    font-weight: 400;
    color: #B3B3B3;
}

.step4-container input[value] {
    font-size: 14px !important;
    font-weight: 400;
    color: black;
    width: 100%;
    padding: 19px;
}

.role {
    color: #333333;
    font-size: 16px;
    font-weight: 500;
    line-height: 1.2px;
    text-align: left;

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
import Select from 'primevue/select';
import Knob from 'primevue/knob';


export default defineComponent({
    name: 'Step4',
    components: {
        Button,
        InputText,
        FloatLabel,
        DatePicker,
        Knob,
        Select
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
    }
});
</script>
