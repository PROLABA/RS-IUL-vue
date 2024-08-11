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

                            <Swiper :modules="[Navigation, Pagination]" :navigation="{
                                nextEl: '.swiper-button-next2, .additional-next',
                                prevEl: '.swiper-button-prev2, .additional-prev'
                            }" :pagination="{
                                el: '.swiper-pagination-custom',
                                type: 'custom',
                                renderCustom: function (swiper, current, total) {
                                    return `
                <div class='custom-pagination'>              
                    <span>${current} из ${total}</span>
                </div>
            `;
                                }
                            }">
                                <SwiperSlide v-for="(preview, index) in htmlPreview" :key="index">
                                    <iframe width="471px" height="597px" :srcdoc="preview"></iframe>
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
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/swiper-bundle.css';
import { Navigation, Pagination } from 'swiper/modules';
import { isEqual } from 'lodash';

export default defineComponent({
    name: 'Step5',
    components: {
        Button,
        Select,
        Swiper,
        SwiperSlide
    },

    setup() {
        const selectedEncoding = ref<{ name: string, value: string } | null>(null);
        const encoding = ref<{ name: string, value: string }[]>([]);
        const store = useStore();
        const filesInfoHash = computed(() => store.state.filesInfoHash);
        const fetchHtmlPreview = async () => {
            try {
                await store.dispatch('getHTMLDOC');
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
                await fetchHtmlPreview();
            } catch (error) {
                console.error('Ошибка при загрузке данных:', error);
                await fetchHtmlPreview();
            }
        });
        let previousData = null;

        watch(selectedEncoding, async (newValue) => {
            if (newValue && newValue.name) {
                const selectedEncoding = newValue.name || "MD5";

                const newHashes = filesInfoHash.value.FILE_HASH.map((fileHash) => ({
                    FILE_HASH: fileHash[selectedEncoding],
                }));

                store.commit('updateFileHashes', { newHashes, selectedEncoding });
                await fetchHtmlPreview();
            }
        });
        return {
            encoding,
            selectedEncoding,
            htmlPreview: computed(() => store.state.htmlPreview),
            Navigation,
            Pagination,
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