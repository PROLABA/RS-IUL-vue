<template>
    <div class="container">
        <div class="white-bg">
            <div class="content-title">
                <p>Выберите нужный вариант</p>
                <img src="/src/assets/img/result1.png" alt="" srcset="">
            </div>
            <div class="selects selects-content">
                <div class="select-labels">
                    <p>1. Тип документации</p>
                    <Select style="width: 100%;" :loading="isLoading" v-model="selectedType" :options="types"
                        optionLabel="name" placeholder="Выберите тип" class="type-document"
                        @change="onFirstDropdownChange" />
                </div>
                <div v-if="showAdditionalDropdowns" class="select-labels">
                    <p>2. Название раздела</p>
                    <Select style="width: 100%;" filter :loading="isLoading" v-model="selectedSection"
                        :options="filteredSections" optionLabel="name" placeholder="Выберите название раздела"
                        class="type-document" />
                </div>
                <div v-if="showAdditionalDropdowns" class="select-labels">
                    <p>3. Если выше не нашли нужного варианта</p>
                    <InputText class="customSelect" v-model="selectedCustom" placeholder="Ваш вариант" />

                </div>
                <div class="flex-just-spcbtw" v-if="showAdditionalDropdowns">
                    <Button label="Назад" class="prev" @click="goToStep1" icon="pi pi-arrow-left" text />
                    <Button class="next" @click="goToStep2" label="Следующий шаг" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { defineComponent, ref, onMounted, computed } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import Button from 'primevue/button';
import Select from 'primevue/select';
import InputText from 'primevue/inputtext';
import 'primeicons/primeicons.css';

export default defineComponent({
    name: 'Step1',
    components: {
        Button,
        Select,
        InputText
    },
    setup() {
        const selectedType = ref(null);
        const selectedSection = ref(null);
        const selectedCustom = ref(null);
        const showAdditionalDropdowns = ref(false);
        const store = useStore();
        const router = useRouter();
        const stepData = ref({});
        const types = ref([]);

        const filteredSections = computed(() => {
            if (!selectedType.value || !stepData.value) return [];

            const typeId = selectedType.value.code;
            const sections = stepData.value['48277'].values[typeId]?.values || {};

            return Object.keys(sections).map(key => ({
                name: sections[key].name,
                code: sections[key].id
            }));
        });

        const isLoading = computed(() => !store.getters.getData);

        onMounted(async () => {
            try {
                await store.dispatch('fetchData');
                const data = store.getters.getData;
                stepData.value = data.step_2.elements || {};
                types.value = formatTypes(stepData.value);

            } catch (error) {
                console.error('Ошибка при загрузке данных:', error);
            }
        });

        const formatTypes = (data) => {
            if (!data || !data["48277"]) return [];
            return Object.keys(data["48277"].values).map(key => ({
                name: data["48277"].values[key].value,
                code: data["48277"].values[key].id
            }));
        };

        const onFirstDropdownChange = () => {
            showAdditionalDropdowns.value = true;
        };

        const updateSelectedItems = () => {
            // Очистить текущие выбранные элементы
            //  store.commit('clearSelectedItems');

            if (selectedType.value) {
                store.commit('addSelectedItem', {
                    DOCUMENT_NAME: selectedType.value.name
                });
            }
            if (selectedSection.value) {
                store.commit('addSelectedItem', {
                    OBJECT_NAME: selectedSection.value.name
                });
            }
            if (selectedCustom.value) {
                store.commit('addSelectedItem', {
                    CUSTOM_VALUE: selectedCustom.value
                });
            }
        };

        const goToStep2 = async () => {
            updateSelectedItems();
            router.push('/step2');
        };

        const goToStep1 = () => {
            router.push('/');
        };

        return {
            selectedType,
            selectedSection,
            selectedCustom,
            types,
            filteredSections,
            showAdditionalDropdowns,
            onFirstDropdownChange,
            goToStep2,
            goToStep1,
            isLoading,
            stepData
        };
    }
});
</script>

<style>
.flex-just-spcbtw {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.customSelect {
    padding: 19px !important;
    width: 100% !important;
    box-shadow: 0px 4px 8px 0px #0000000D;
    border: 1.5px solid #E9E9E9;
    border-radius: 4px;
}

.p-inputtex {
    box-shadow: 0px 4px 8px 0px #0000000D !important;
    border: 1.5px solid #E9E9E9;
}

.p-inputtext {
    font-size: 14px !important;
    font-weight: 400 !important;
    line-height: 16.8px !important;
    text-align: left !important;

}

input[placeholder] {
    font-size: 14px !important;
    font-weight: 400;
}

.p-inputtext:enabled:focus {
    border-color: #E9E9E9 !important;
}



input:focus-visible {
    outline-offset: 0px;
    outline: none !important;
}

.next {
    background-color: #0578D6 !important;
    padding: 18px 37.5px !important;
    border-radius: 4px !important;
    border: none !important;
    font-family: Roboto !important;
    font-size: 16px !important;
    font-weight: 700 !important;
    line-height: 18.75px !important;
    text-align: left !important;
    color: white !important;
    cursor: pointer !important;
}

.prev {
    display: flex !important;
    border-radius: 4px !important;
    border: none !important;
    background-color: transparent !important;
    cursor: pointer !important;
    gap: 10px !important;
    font-family: Roboto !important;
    font-size: 16px !important;
    font-weight: 400 !important;
    line-height: 18.75px !important;
    text-align: left !important;
    color: #0578D6 !important;

}

button:disabled {
    background: #E9E9E9 !important;

}

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
    max-width: 490px !important;
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

.p-select-list-container {
    max-width: 490px;
}

.p-select-option-label {
    font-size: 14px;
    font-weight: 400;
    line-height: 16.8px;
    text-align: left;
    color: #333333 !important;
    text-wrap: wrap !important;
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