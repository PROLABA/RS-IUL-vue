<template>
    <div v-if="loading" class="spinner-container">
        <div class="container-spinner">
            <ProgressSpinner />
        </div>
    </div>
    <div v-else className="container">
        <div class="white-bg">
            <div class="content-title">
                <p>Какой формат ИУЛ вы хотите получить?</p>
                <img src="/src/assets/img/result.png" alt="" srcset="">
            </div>


            <div class="content">
                <div class="conten-body" v-for="(item, index) in formattedItems" :key="item.id">
                    <div class="content-item">
                        <div class="outline">
                            <Image preview alt="iul">
                                <template #previewicon>
                                    <img src="/src/assets/img/magnifier.png" />
                                </template>
                                <template #image>
                                    <img class="iul-imges" :src="item.img" alt="image" />
                                </template>
                                <template #preview="slotProps">
                                    <img :src="item.img" alt="preview" :style="slotProps.style"
                                        @click="slotProps.onClick" />
                                </template>
                            </Image>
                        </div>
                    </div>
                    <div @click="selectItem(item)" class="outline-button">
                        Выбрать
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>
<script>
import { defineComponent, ref, onMounted, computed } from 'vue';
import ProgressSpinner from 'primevue/progressspinner';
import Image from 'primevue/image';
import { useStore } from 'vuex';

export default defineComponent({
    name: 'constructorListContent',
    components: {
        Image,
        ProgressSpinner,
    },
    setup() {
        const stepData = ref({});
        const store = useStore();
        const data = store.state.data;
        const loading = computed(() => !store.getters.getData);

        onMounted(async () => {
            await store.dispatch('fetchData');
            const data = store.getters.getData;
            stepData.value = data.step_1 || {};
            loading.value = false;
        });
        return {
            store,
            stepData,
             loading
        }
    },
    computed: {
        formattedItems() {
            if (this.stepData && this.stepData.elements && this.stepData.elements["48276"]) {
                return Object.values(this.stepData.elements["48276"].list);
            }
            return [];
        }
    },
    methods: {
        selectItem(item) {
            this.store.commit('addSelectedItem', { DOCUMENT_TYPE_ID: item.id, });
            this.goToStep1();
        },
        goToStep1() {
            this.$router.push('/step1')
        }
    }
})
</script>
<style>
.container-spinner {
    display: flex;
    justify-content: center;
    align-items: center;
}

.iul-imges {
    object-fit: cover;
    width: 210px !important;
    height: 260px !important;
}

.white-bg {
    background: #FFFFFF;
    border-radius: 4px;
    padding: 50px 30px
}

.content-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.content-title p {
    font-size: 18px;
    font-weight: 700;
    line-height: 21.09px;
    text-align: left;
}

.content {
    display: flex;

    gap: 20px;
}

.content-item {
    border: 1px solid #E9E9E9;
    padding: 20px;
    border-radius: 4px;

}


.outline-button {
    margin-top: 20px;
    padding: 18px 91px;
    border: 1.5px solid #0578D6;
    color: #0578D6;
    border-radius: 4px;
    cursor: pointer;

    font-size: 16px;
    font-weight: 700;
    line-height: 18.75px;

}
</style>