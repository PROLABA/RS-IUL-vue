<template>
    <div class="container">
        <div class="white-bg">
            <div class="content-title">
                <p>Дополните, пожалуйста, информацию</p>
                <img src="/src/assets/img/result3.png" alt="" srcset="">
                <!-- <Knob v-model="value" disabled /> -->

            </div>
            <div class="step3-container">
                <div class="left">
                    <div className="select-labels">
                        <p>1. Наименование объекта</p>
                        <InputText v-model="objectName" @blur="handleBlur" id="type-doc"
                            placeholder="Введите наименование" className="component-input" />

                    </div>
                    <div className="select-labels">
                        <p>2. Наименование документа</p>
                        <InputText v-model="documentName" disabled id="name-doc"
                            placeholder="Введите наименование документа" className="component-input" />
                    </div>
                    <!-- <div className="select-labels">
                        <p>3. Дата</p>
                        <DatePicker dateFormat="dd.mm.yy" showIcon fluid iconDisplay="input" style="width: 100%;"
                            placeholder="Выберите или введите дату" v-model="date">
                            <template #inputicon="slotProps" @blur="handleBlur">
                                <i class="pi pi-angle-down" @click="slotProps.clickCallback" />
                            </template>
                    </DatePicker>
                    </div> -->
                    <div v-if="selectedTemplateId === flagId" className="select-labels">
                        <p>3. Обозначение документа</p>
                        <InputText v-model="fileNameWx" @blur="handleBlur" placeholder="Введите Название документа, например Раздел ПД №12_ОСР_ЛСР"
                            className="component-input" />
                    </div>
                    <div className="select-labels">
                        <p>{{ selectedTemplateId === flagId ? '4' : '3' }}. Номер последего изменения </p>
                        <InputText v-model="lastNumberChange" @blur="handleBlur"
                            placeholder="Введите номер последего изменения" className="component-input" />
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
                    <div class="pag-container">
                        <div class="pagination-doc">
                            <button class='swiper-button-prev2'>
                                <svg width='20' height='11' viewBox='0 0 20 11' fill='none'
                                    xmlns='http://www.w3.org/2000/svg'>
                                    <path fill-rule='evenodd' clip-rule='evenodd'
                                        d='M4.81218 10.7812L0.211729 6.02812C-0.0705776 5.73645 -0.0705776 5.26355 0.211729 4.97188L4.81218 0.218757C5.09449 -0.0729189 5.5522 -0.0729189 5.83451 0.218757C6.11681 0.510432 6.11681 0.983331 5.83451 1.27501L2.46811 4.75312L20 4.75312V6.24688L2.46811 6.24688L5.83451 9.72499C6.11681 10.0167 6.11681 10.4896 5.83451 10.7812C5.5522 11.0729 5.09449 11.0729 4.81218 10.7812Z'
                                        fill='#333333' />
                                </svg>
                            </button>
                            <div class="swiper-pagination-custom"></div>
                            <button class='swiper-button-next2'>
                                <svg width='20' height='11' viewBox='0 0 20 11' fill='none'
                                    xmlns='http://www.w3.org/2000/svg'>
                                    <path fill-rule='evenodd' clip-rule='evenodd'
                                        d='M15.1878 0.218756L19.7883 4.97188C20.0706 5.26355 20.0706 5.73645 19.7883 6.02812L15.1878 10.7812C14.9055 11.0729 14.4478 11.0729 14.1655 10.7812C13.8832 10.4896 13.8832 10.0167 14.1655 9.72499L17.5319 6.24688H0L0 4.75312H17.5319L14.1655 1.27501C13.8832 0.98333 13.8832 0.510432 14.1655 0.218756C14.4478 -0.0729188 14.9055 -0.0729188 15.1878 0.218756Z'
                                        fill='#333333' />
                                </svg>
                            </button>
                        </div>
                    </div>
                    <div class="document-item">
                        <div class="dotted-border">
                            <button class="additional-prev"><svg width='20' height='11' viewBox='0 0 20 11' fill='none'
                                    xmlns='http://www.w3.org/2000/svg'>
                                    <path fill-rule='evenodd' clip-rule='evenodd'
                                        d='M4.81218 10.7812L0.211729 6.02812C-0.0705776 5.73645 -0.0705776 5.26355 0.211729 4.97188L4.81218 0.218757C5.09449 -0.0729189 5.5522 -0.0729189 5.83451 0.218757C6.11681 0.510432 6.11681 0.983331 5.83451 1.27501L2.46811 4.75312L20 4.75312V6.24688L2.46811 6.24688L5.83451 9.72499C6.11681 10.0167 6.11681 10.4896 5.83451 10.7812C5.5522 11.0729 5.09449 11.0729 4.81218 10.7812Z'
                                        fill='#333333' />
                                </svg></button>

                            <Swiper ref="swiperRef  " :modules="[Navigation, Pagination]" :navigation="{
                                nextEl: '.swiper-button-next2, .additional-next',
                                prevEl: '.swiper-button-prev2, .additional-prev'
                            }" :pagination="{
                                el: '.swiper-pagination-custom',
                                type: 'fraction',
                            }">
                                <SwiperSlide v-for="(content, index) in htmlPreview" :key="index">
                                    <div class="document-item">
                                        <iframe :src="createIframeSource(content)"></iframe>
                                    </div>
                                </SwiperSlide>

                            </Swiper>
                            <button class="additional-next"> <svg width='20' height='11' viewBox='0 0 20 11' fill='none'
                                    xmlns='http://www.w3.org/2000/svg'>
                                    <path fill-rule='evenodd' clip-rule='evenodd'
                                        d='M15.1878 0.218756L19.7883 4.97188C20.0706 5.26355 20.0706 5.73645 19.7883 6.02812L15.1878 10.7812C14.9055 11.0729 14.4478 11.0729 14.1655 10.7812C13.8832 10.4896 13.8832 10.0167 14.1655 9.72499L17.5319 6.24688H0L0 4.75312H17.5319L14.1655 1.27501C13.8832 0.98333 13.8832 0.510432 14.1655 0.218756C14.4478 -0.0729188 14.9055 -0.0729188 15.1878 0.218756Z'
                                        fill='#333333' />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>



<script lang="ts">
import { defineComponent, ref, computed, onMounted, watch, onBeforeUnmount, nextTick } from 'vue'
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import FloatLabel from "primevue/floatlabel";
import DatePicker from 'primevue/datepicker';
import 'primeicons/primeicons.css'
import Knob from 'primevue/knob';
import { useStore } from 'vuex';
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/swiper-bundle.css';
import { Navigation, Pagination } from 'swiper/modules';
import { formatDateDDMMYY } from "./../helpers/formatedData"



export default defineComponent({
    name: 'Step3',
    components: {
        Button,
        InputText,
        FloatLabel,
        DatePicker,
        Knob,
        Swiper,
        SwiperSlide
    },
    setup() {

        const store = useStore();

        const fileDataSelected = store.state.selectedItems.OBJECT_NAME || "";
        const selectedTemplateId = store.state.selectedItems.DOCUMENT_TYPE_ID;
        //@ts-ignore
        const selectedData = store.state.selectedItems.DATA_TEST;
        const selectedFileNameWx = store.state.selectedItems.FILE_NAME_WX || "";
        const selectedLastNumberChange = store.state.selectedItems.LAST_NUMBER_CHANGE || "";
        const editedData = formatDateDDMMYY('27.09.2024')
        const date = ref<string | null>(editedData ? editedData : null);

        const flagId = store.state.flagId;
        const objectName = ref('' || fileDataSelected);
        const documentName = ref('');
        const htmlPreview = ref<string>('');
        const swiperRef = ref(null);
        const fileNameWx = ref('' || selectedFileNameWx);;
        const lastNumberChange = ref('' || selectedLastNumberChange)


        const isNextButtonEnabled = computed(() => {
            return objectName.value !== '' &&
                documentName.value !== '' &&
                // lastNumberChange.value !== '' &&
                (selectedTemplateId === flagId ? fileNameWx.value !== '' : true);
        });

        const iframeSource = computed(() => {
            return URL.createObjectURL(new Blob([htmlPreview.value], { type: 'text/html' }));
        });
        onBeforeUnmount(() => {
            URL.revokeObjectURL(iframeSource.value);
        });
        onMounted(async () => {
            const data = store.getters.getSelectedItems;
            documentName.value = data?.DOCUMENT_NAME;

            await store.dispatch('getHTMLDOC');
            htmlPreview.value = store.state.htmlPreview;
            await nextTick(); // Убедитесь, что DOM обновлен

        });
        const createIframeSource = (content: string) => {
            return URL.createObjectURL(new Blob([content], { type: 'text/html' }));
        };


        const handleBlur = async () => {
            store.commit('addSelectedItem', {
                OBJECT_NAME: objectName.value,
                FILE_NAME_WX: fileNameWx.value,
                LAST_NUMBER_CHANGE: lastNumberChange.value,

            });
            await store.dispatch('getHTMLDOC');
            htmlPreview.value = store.state.htmlPreview;
        };
        watch(date, (newValue) => {
            store.commit('addSelectedItem', { DATA_TEST: newValue });
        });
        watch([objectName, fileNameWx, date, lastNumberChange], async () => {
            await store.dispatch('getHTMLDOC');
            htmlPreview.value = store.state.htmlPreview;
            await nextTick();

        }, { deep: true });

        return {
            date,
            objectName,
            documentName,
            isNextButtonEnabled,
            handleBlur,
            htmlPreview,
            iframeSource,
            createIframeSource,
            Pagination,
            Navigation,
            swiperRef,
            selectedTemplateId,
            flagId,
            fileNameWx,
            lastNumberChange
        }
    },
    methods: {
        goToStep4() {
            this.$router.push('/step4')
        },
        goToStep2() {
            this.$router.push('/step2')
        },
    },

});
</script>
<style>
.swiper-horizontal {
    width: 100%;
}

.pag-container {
    display: flex;
    justify-content: flex-end;
}

.pagination-doc {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 5px;
}

.pagination-doc button {
    background-color: transparent;
    border: none;
}

.pagination-doc button:disabled {
    background-color: white !important
}

.custom-pagination {
    display: flex;
    align-items: center;
    gap: 15px;
    padding-bottom: 5px;
    font-family: Roboto;
    font-size: 14px;
    font-weight: 500;
    line-height: 16.8px;
    text-align: center;
    color: #333333;

}

.additional-navigation {
    z-index: 222222;
    display: flex;
    justify-content: space-between;
}

.dotted-border button {
    background-color: transparent;
    border: none;
}

.dotted-border button:disabled {
    background-color: white !important
}

.bhtml {
    width: 100%;
    height: 100%;
    overflow: scroll;
}

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
    padding-bottom: 10px;
}

.dotted-border {
    display: flex;
    padding: 20px;
    box-sizing: border-box;
    text-align: center;
    border: 2px dashed #0578D6;
    border-radius: 4px;
    align-items: center;
    justify-content: center;
    gap: 5px;
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

.dotted-border iframe {
    width: 100%;
    height: 597px;

}

iframe {
    border: none;
    /* Убираем рамку iframe */

}

iframe body {
    overflow-x: hidden;

}



.p-datepicker-input {
    padding: 19px !important;
    font-family: "Roboto", sans-serif;
    box-shadow: 0px 4px 8px 0px #0000000D !important;


}
</style>