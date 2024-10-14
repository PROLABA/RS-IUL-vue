<template>
    <!-- @ts-ignore -->

    <div class="container">
        <div class="white-bg">
            <div class="content-title">
                <p>Внесите данные роли </p>
                <img src="/src/assets/img/result4.png" alt="" srcset="">

            </div>
            <div class="step4-container">
                <div class="left">
                    <div v-for="(role, index) in roles" :key="index" class="dotted-continer to-padding">
                        <!-- @ts-ignore -->
                        <div class="dflex-just-btwm">
                            <p className="role">Роль {{ index + 1 }}</p>
                            <div class="delete-btn" @click="deleteRole(index)">
                                <i class="pi pi-times-circle" style="font-size: 24px; color: #99CCFF;"
                                    v-if="roles.length > 1 && index !== 0"></i>
                            </div>
                        </div>
                        <div className="select-labels bold-p">
                            <p>1. Действие</p>
                            <!-- @ts-ignore -->
                            <Select style="width: 100%;" v-model="role.action" :options="actionOption"
                                optionLabel="name" placeholder=" Выберите соответствующее действие" />
                            <!-- @ts-ignore -->
                            <InputText style="margin-top: 10px;" v-if="role.action.name === 'Свой вариант'"
                                v-model="role.otherAction" placeholder="Укажите соответствующее действие"
                                className="component-input" />

                        </div>
                        <div className="select-labels bold-p">
                            <p>2. Фамилия</p>
                            <!-- @ts-ignore -->
                            <InputText v-model="role.surname" id="name-doc" placeholder="Введите наименование документа"
                                className="component-input" />
                        </div>
                        <div className="select-labels bold-p">
                            <p>3. Дата</p>
                            <!-- @ts-ignore -->
                            <DatePicker
                                dateFormat="dd.mm.yy"
                                showIcon
                                fluid
                                iconDisplay="input"
                                style="width: 100%;"
                                placeholder="Выберите или введите дату"
                                v-model="role.date"
                                :disabled="!role.action.name || !role.surname"
                            >
                                <template #inputicon="slotProps">
                                    <i class="pi pi-angle-down" @click="slotProps.clickCallback" />
                                </template>
                            </DatePicker>
                        </div>
                    </div>
                    <div class="add-new-role-btn">
                        <div class="description" v-if="roles.length === 1">
                            <span class="pi pi-exclamation-circle"></span>
                            <p> Вы можете добавить еще <br> роль, если у Вас
                                больше
                                1-ой роли</p>
                        </div>
                        <Button icon="pi pi-plus" @click="addRole" label="Добавить роль"> </Button>
                    </div>
                    <div class="btn-footer" style="padding-top:20px;">
                        <div className="flex-just-spcbtw">
                            <Button label="Назад" @click="goToStep3" className="prev" icon="pi pi-arrow-left" text />
                            <Button className="next" @click="goToStep5" :disabled="!isNextButtonEnabled"
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

                            <Swiper :modules="[Navigation, Pagination]" :navigation="{
                                nextEl: '.swiper-button-next2, .additional-next',
                                prevEl: '.swiper-button-prev2, .additional-prev'
                            }" :pagination="{
                                el: '.swiper-pagination-custom',
                                type: 'fraction',
                            }">>
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



<script lang="ts">
import { defineComponent, ref, computed, watch, onMounted } from 'vue'
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import FloatLabel from "primevue/floatlabel";
import DatePicker from 'primevue/datepicker';
import 'primeicons/primeicons.css'
import Select from 'primevue/select';
import Knob from 'primevue/knob';
import { useStore } from 'vuex';
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/swiper-bundle.css';
import { Navigation, Pagination } from 'swiper/modules';
import { useRouter } from 'vue-router';
import { formatDateDDMMYY } from "./../helpers/formatedData"
import dayjs from 'dayjs';
export default defineComponent({
    name: 'Step4',
    components: {
        Button,
        InputText,
        FloatLabel,
        DatePicker,
        Knob,
        Select,
        Swiper,
        SwiperSlide
    },

    setup() {
        // @ts-ignore
        const store = useStore();
        const router = useRouter();
        const actionOption = ref<{ name: string, value: string }[]>([]);
        // @ts-ignore
        const roles = ref<Array<{
            action: { name: string; value: string };
            otherAction: string;
            surname: string;
            date: string | null;
        }>>([]);
        const isNextButtonEnabled = computed(() => {
            return roles.value.every(role =>
                role.action.name !== '' &&
                role.surname !== '' &&
                role.date !== null
            );
        });
        // @ts-ignore
        const htmlPreview = computed(() => {
            return store.state.htmlPreview as string;
        });
        const goToStep5 = () => {
            router.push('/step5');
        };

        const goToStep3 = () => {
            router.push('/step3');
        };

        onMounted(async () => {
            try {
                await store.dispatch('fetchData');
                const data = store.getters.getData;
                const stepData = data.step_5.elements["48655"].list;
                // @ts-ignore
                actionOption.value = Object.entries(stepData).map(([key, value]) => ({
                    name: value,
                    value: key
                }));
                updateRolesFromStore();
            } catch (error) {
                console.error('Ошибка при загрузке данных:', error);
            }
        });

        const updateRolesFromStore = () => {
            const storedRoles = store.state.selectedItems.roles;
            if (storedRoles && storedRoles.length > 0) {
                // @ts-ignore
                roles.value = storedRoles.map(role => ({
                    action: role.IS_CUSTOM
                        ? actionOption.value.find(option => option.name === 'Свой вариант') || { name: 'Свой вариант', value: '' }
                        : actionOption.value.find(option => option.name === role.ACTION) || { name: '', value: '' },
                    otherAction: role.IS_CUSTOM ? role.ACTION : '',
                    surname: role.SECOND_NAME,
                    date: formatDateDDMMYY(role.ROLE_DATE)
                }));
            } else {

                // @ts-ignore
                roles.value = [{
                    action: { name: '', value: '' },
                    otherAction: "",
                    surname: "",
                    date: null
                }];
            }
        };

        watch(roles, (newRoles) => {
            if (isNextButtonEnabled.value) {
                updateRolesInStore(newRoles);
            }
        }, { deep: true });
        // @ts-ignore
        const updateRolesInStore = (newRoles) => {

            // @ts-ignore
            const formattedRoles = newRoles.map(role => ({
                ROLE_DATE: (()=> {
                  return formatDateDDMMYY(role.date)
                })(),
                ACTION: role.action.name === 'Свой вариант' ? role.otherAction : role.action.name,
                SECOND_NAME: role.surname,
                IS_CUSTOM: role.action.name === 'Свой вариант'
            }));

            store.commit('addSelectedItem', { roles: formattedRoles });
            store.dispatch('getHTMLDOC');
        };

        return {
            actionOption,
            roles,
            isNextButtonEnabled,
            htmlPreview,
            Pagination,
            Navigation,
            goToStep5,dayjs,
            goToStep3,
        };
    },

    methods: {
        addRole() {
            this.roles.push({
                action: { name: '', value: '' },
                otherAction: '',
                surname: '',
                date: null,
            });
        },
        deleteRole(index: number) {
            if (this.roles.length > 1 && index !== 0) {
                this.roles.splice(index, 1);
            }
        },

    }
});
</script>
<style>
.step4-container {
    display: grid;
    grid-template-columns: 495px 705px;
    gap: 20px;
    padding-top: 41px;
}

.bold-p p {
    font-size: 14px;
    font-weight: 500;
    line-height: 16.8px;
    text-align: left;
    color: #333333;

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
    font-weight: 600;
    line-height: 1.2px;
    text-align: left;
    padding-bottom: 22.5px;
}

.p-datepicker-input {
    padding: 19px !important;
    font-family: "Roboto", sans-serif;
    box-shadow: 0px 4px 8px 0px #0000000D !important;


}

.dflex-just-btwm {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.delete-btn i {
    cursor: pointer;
}
</style>