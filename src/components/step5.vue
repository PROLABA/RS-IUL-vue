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
                            <Button className="next" @click="goToStep6" label="Следующий шаг" />
                        </div>
                    </div>
                </div>
                <div class=" right">
                    <div class="title-document-watch">
                        Предпросмотр ИУЛ
                    </div>
                    <div class="document-item">
                        <div class="dotted-border">
                            <iframe width="471px" height="597px" frameborder="0" :srcdoc="htmlPreview"></iframe>
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
import { defineComponent, ref, computed, onMounted, watch } from 'vue'
import Button from 'primevue/button';
import Select from 'primevue/select';
import { useStore } from "vuex";

export default defineComponent({
    name: 'Step5',
    components: {
        Button,
        Select
    },

    setup() {
        const selectedEncoding = ref<{ name: string, value: string } | null>(null);
        const encoding = ref<{ name: string, value: string }[]>([]);
        const store = useStore();

        const fetchHtmlPreview = async () => {
            try {
                await store.dispatch('getHTMLDOC');
                console.log('HTML preview fetched');
            } catch (error) {
                console.error('Ошибка при загрузке HTML-превью:', error);
            }
        };

        onMounted(async () => {
            try {
                await store.dispatch('fetchData');
                const data = store.getters.getData;
                const stepData = data.step_6.elements[48274].list;
                encoding.value = Object.entries(stepData).map(([key, value]) => ({
                    name: value,
                    value: key
                }));
                console.log('Step Data:', stepData);
                await fetchHtmlPreview();
            } catch (error) {
                console.error('Ошибка при загрузке данных:', error);
                await fetchHtmlPreview();
            }
        });

        watch(selectedEncoding, async (newValue) => {
            console.log('Selected Encoding changed:', newValue);
            if (newValue && newValue.name) {
                store.commit('addSelectedItem', { HASH_TYPE: newValue.name });
                console.log('Committed HASH_TYPE:', newValue.name);
                await fetchHtmlPreview();  // Добавляем вызов функции для обновления предпросмотра
            }
        });
        return {
            encoding,
            selectedEncoding,
            htmlPreview: computed(() => store.state.htmlPreview),

        };
    },
    computed: {
        htmlPreview() {
            return this.$store.state.htmlPreview;
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