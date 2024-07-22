<template>
    <div class="container">
        <div class="white-bg ">
            <div class="content-title">
                <p>Выберите нужный вариант</p>
                <img src="/src/assets/img/result1.png" alt="" srcset="">
            </div>
            <div className='selects selects-content'>
                <div className="select-labels">
                    <p>1. Тип документации</p>
                    <Dropdown v-model="selectedType" :options="types" optionLabel="name" placeholder="Выберите тип"
                        class="type-document" @change="onFirstDropdownChange" />
                </div>
                <div v-if="showAdditionalDropdowns" className="select-labels">
                    <p>2. Название раздела</p>
                    <Dropdown v-model="selectedSection" :options="sections" optionLabel="name"
                        placeholder="Выберите название раздела" class="type-document" />
                </div>
                <div v-if="showAdditionalDropdowns" className="select-labels">
                    <p>3. Если выше не нашли нужного варианта</p>
                    <Dropdown v-model="selectedCustom" :options="customOptions" optionLabel="name"
                        placeholder="Ваш вариант" class="type-document" />
                </div>
                <ButtonsFooter v-if="showAdditionalDropdowns" />
            </div>
        </div>
    </div>
</template>
<style>
.selects {
    display: flex;
    flex-direction: column;
    gap: 20px;
}

.select-labels p {
    padding-bottom: 10px;
}

.p-select {
    border: 1.5px solid #E9E9E9 !important;

}

.p-select-option.p-select-option-selected.p-focus {
    background-color: transparent !important;
    color: none;
}

.selects-content {
    max-width: 490px;
}

.type-document {
    max-width: 490px;
    width: 100%;
}

.p-placeholder {
    font-size: 14px;
    font-weight: 400;
    line-height: 16.8px;
    text-align: left;
    color: #333333 !important;
    padding: 19px !important;
}

.p-select-label.p-placeholder {
    color: #B3B3B3 !important;

}

.p-select-option-label {
    font-size: 14px;
    font-weight: 400;
    line-height: 16.8px;
    text-align: left;
    color: #333333 !important;
}

.p-select-label {
    padding: 19px !important;

}

.flex-just-spcbtw {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
</style>
<script lang="ts">
import { defineComponent, ref } from 'vue'
import Dropdown from 'primevue/dropdown'
import Button from 'primevue/button';
import ButtonsFooter from "./buttonsFooter.vue";
import 'primeicons/primeicons.css';

export default defineComponent({

    name: 'Step1',
    components: {
        Dropdown,
        Button, ButtonsFooter
    },
    setup() {
        const selectedType = ref(null)
        const selectedSection = ref(null)
        const selectedCustom = ref(null)
        const showAdditionalDropdowns = ref(false)

        const types = ref([
            { name: 'Результаты инженерных изысканий', code: 'RII' },
            { name: 'Проектная документация', code: 'PD' },
        ])

        const sections = ref([
            { name: 'Раздел 1', code: 'S1' },
            { name: 'Раздел 2', code: 'S2' },
        ])

        const customOptions = ref([
            { name: 'Опция 1', code: 'O1' },
            { name: 'Опция 2', code: 'O2' },
        ])

        const onFirstDropdownChange = () => {
            showAdditionalDropdowns.value = true
        }

        return {
            selectedType,
            selectedSection,
            selectedCustom,
            types,
            sections,
            customOptions,
            showAdditionalDropdowns,
            onFirstDropdownChange
        }
    }
})
</script>
