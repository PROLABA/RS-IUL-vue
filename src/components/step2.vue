<template>
    <div class="container">
        <div class="white-bg">
            <div class="content-title atention">
                <p>
                    <span>
                        <i v-tooltip.top="{
                            value: tooltipContent,
                            escape: false,

                            pt: {
                                arrow: {
                                    style: {
                                        borderBottomColor: '#FFFFFFFF'
                                    }
                                },
                            }
                        }
                            " class="pi pi-exclamation-circle"></i>
                    </span>Загрузите файл раздела проектной документации
                </p>
                <img src="/src/assets/img/result2.png" alt="" srcset="">
            </div>
        </div>
    </div>
</template>

<style>
.atention p {
    display: flex;
    align-items: center;
    gap: 10px;
}

.content-title span .pi {
    font-size: 24px;
    color: #99CCFF;
}

.p-tooltip-top {

    max-width: 300px !important;

    border-radius: 4px;
    padding: 15px !important;
    left: 260px !important;

}


.p-tooltip-text {
    width: 300px !important;

    background-color: transparent;
    color: black !important;
    font-size: 12px;
    font-weight: 400;
    line-height: 14.4px;
    text-align: left;
    background-color: #ffffff !important;
    width: 100% !important;

}
.p-tooltip-text p { 
    padding-bottom: 5px !important;
}

.p-tooltip .p-tooltip-arrow {
    left: 15px !important;
    border-top-color: white !important;
}
</style>

<script lang="ts">
import { defineComponent } from 'vue'
import Tooltip from 'primevue/tooltip';

export default defineComponent({
    name: 'Step2',
    directives: {
        'tooltip': Tooltip
    },
    setup() {
        const tooltipContent = `
      <p>1. Наименование файла должно содержать шифр и наименование своего раздела (например 17513.Раздел1.ПЗ.pdf)</p>
      <p>2. Расширение docx, doc, xlsx, xls, pdf</p>
      <p>3. Можно загрузить несколько файлов для смет (не более 10 файлов)</p>
    `;


        return { tooltipContent };
    }
})
</script>
