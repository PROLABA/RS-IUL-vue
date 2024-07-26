<template>
    <div class="container">
        <div class="white-bg">
            <div class="content-title">
                <p>Выберите кодировку </p>
                <img src="/src/assets/img/result5.png" alt="" srcset="">
                <!-- <Knob v-model="value" disabled /> -->

            </div>
            <div class="step5-container">
                <div class="left">
                    <p className="role"></p>
                    <div className="select-labels">
                        <Select v-model="selectedEncoding" :options="encoding" optionLabel="name" style="width: 100%;"
                            placeholder="Выберите " />

                    </div>

                    <div class="btn-footer" style="padding-top:20px;">
                        <div className="flex-just-spcbtw">
                            <Button label="Назад" @click="goToStep4" className="prev" icon="pi pi-arrow-left" text />
                            <Button className="next" @click="goToStep6" :disabled="!isNextButtonEnabled"
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
.step5-container {
    display: grid;
    grid-template-columns: 495px 705px;
    gap: 20px;
}

.dotted-continer {
    border: 2px dashed #E9E9E9;
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 20px
}

.add-new-role-btn {
    display: flex;
    justify-content: space-between;
    align-items: center;

    font-size: 16px;
    font-weight: 700;
    line-height: 1.2;
    text-align: left;

}

.add-new-role-btn button {
    border-radius: 4px;
    background-color: transparent;
    color: #99CCFF;
    border-color: #99CCFF;
    padding: 13px 29px;

}

.add-new-role-btn button:hover {
    background-color: #99CCFF !important;
    color: white !important;
    border-color: #99CCFF !important;

}


.description {
    display: flex;
    gap: 10px;
    font-size: 14px;
    font-weight: 400;
    line-height: 1.2;

}

.description .pi {
    font-size: 24px;
    color: #99CCFF;
}

.step5-container input:focus-visible {
    border-color: #E9E9E9 !important;
}

.step5-container input[placeholder] {
    font-size: 14px !important;
    font-weight: 400;
    color: #B3B3B3;
}

.step5-container input[value] {
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


export default defineComponent({
    name: 'Step5',
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


        return {
            encoding,
            isNextButtonEnabled,
            selectedEncoding
        }
    },
    methods: {
        goToStep6() {
            this.$router.push('/step6')
        },
        goToStep4() {
            this.$router.push('/step4')
        },
    }

});

</script>
