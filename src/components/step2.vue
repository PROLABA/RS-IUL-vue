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
            <div class="doted-content-file-input">
               <input type="file">

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


.p-tooltip .p-tooltip-arrow {
    border-top-color: white !important;
}

.doted-content-file-input {
    padding: 20px;
    border-radius: 4px;
    border: 1px dotted #E9E9E9;
    max-width: 490px;
    width: 100%;
}

.no-icon .p-button-icon {
    display: none;
}

.doted-content-file-input .p-button {
    padding: 13px 45px !important;
    background: transparent !important;
    border: 1px solid #99CCFF !important;
    color: #99CCFF !important;
    border-radius: 4px !important;
    font-size: 16px !important;
    font-weight: 700 !important;
    line-height: 18.75px !important;


}

.doted-content-file-input .p-fileupload-basic {
    flex-direction: column-reverse;
    align-items: flex-start;

}
</style>

<script lang="ts">
import { defineComponent } from 'vue'
import Tooltip from 'primevue/tooltip';
import FileUpload from 'primevue/fileupload';

// document.getElementByClassName("myspan").textContent = "newtext";


export default defineComponent({
    name: 'Step2',
    components: { FileUpload, },
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
