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
        <div class="conten-body" v-for="item in formattedItems" :key="item.id">
          <div class="content-item"
            :class="{ 'selected-item': item.id === store.state.selectedItems.DOCUMENT_TYPE_ID }">
            <div class="outline">
              <Image preview alt="iul">
                <template #previewicon>
                  <img src="/src/assets/img/magnifier.png" />
                </template>
                <template #image>
                  <img class="iul-imges" :src="`https://services.rsexpertiza.ru${item.img}`" alt="img" />
                </template>
                <template #preview="slotProps">
                  <img width="570" height="650" :src="`https://services.rsexpertiza.ru${item.img_detail}`" alt="preview"
                    :style="slotProps.style" @click="slotProps.onClick" />
                </template>
              </Image>
            </div>
          </div>
          <div class="iul-name">
            <p>{{ item.name }}</p>
          </div>
          <div @click="selectItem(item)" class="outline-button">
            Выбрать
          </div>
        </div>
      </div>

    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, onMounted, computed } from 'vue';
import ProgressSpinner from 'primevue/progressspinner';
import Image from 'primevue/image';
import { useStore } from 'vuex';

interface StepData {
  elements?: {
    [key: string]: any;
  };
}

interface FormattedItem {
  id: string | number;
  img: string;
  img_detail: string;
  name: string;
}

export default defineComponent({
  name: 'constructorListContent',
  components: {
    Image,
    ProgressSpinner,
  },
  setup() {
    const stepData = ref<StepData>({});
    const store = useStore();
    // @ts-ignore
    const data = store.state.data;
    const loading = computed(() => !store.getters.getData);
    onMounted(async () => {
      await store.dispatch('fetchData');
      const data = store.getters.getData;
      stepData.value = data.step_1 || {};
      // @ts-ignore
      loading.value = false;
      await store.dispatch('getVersions');
    });
    return {
      store,
      stepData,
      loading
    }
  },

  computed: {
    formattedItems(): FormattedItem[] {
      if (this.stepData.elements && this.stepData.elements["48661"]) {
        return Object.values(this.stepData.elements["48661"]) as FormattedItem[];
      }
      return [];
    }
  },
  methods: {
    selectItem(item: FormattedItem) {
      const totalItems = this.formattedItems.length;
      if (totalItems >= 2 && item.id === this.formattedItems[1].id) {
        this.store.commit('setFlagId', item.id);
      }
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
.selected-item {
  border: 2px solid green !important
}

.container-spinner {
  display: flex;
  justify-content: center;
  align-items: center;
}

.iul-imges {
  object-fit: cover;
  width: 260px !important;
  height: 242px !important;
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
  gap: 80px;
}

.content-item {
  border: 1px solid #E9E9E9;
  padding: 20px;
  border-radius: 4px;
  transition: border-color 0.3s ease;

}

.content-item:hover {
  border: 1px solid #0578D6;
}

.content-item:hover .p-image-preview-mask {
  opacity: 1 !important;
  cursor: pointer !important;
}

.p-image-preview:hover>.p-image-preview-mask {
  opacity: 1;
  cursor: pointer;
  background: none !important;
}

.iul-name p {
  font-size: 16px;
  font-weight: 500;
  line-height: 19.2px;
  text-align: center;
  padding-top: 20px;
}

.outline-button {
  margin-top: 20px;
  padding: 18px 91px;
  border: 1.5px solid #0578D6;
  color: #0578D6;
  border-radius: 4px;
  cursor: pointer;
  text-align: center;
  font-size: 16px;
  font-weight: 700;
  line-height: 18.75px;

}
</style>