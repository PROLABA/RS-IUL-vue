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
                <div class="grid-content">
                    <div class="left">
                        <div v-if="selectedFiles.length" style="padding-bottom:17.5px" class="selectedFiles">
                            <ul>
                                <li v-for="(file, index) in selectedFiles" :key="index">
                                    {{ file.name }}
                                    <button @click="removeFile(index)" class="pi pi-times"></button>
                                </li>
                            </ul>
                        </div>
                        <input type="file" ref="fileInput" @change="handleFileChange" class="hidden-file-input"
                            multiple>
                        <div class="buttons-item">
                            <button @click="triggerFileInput" class="custom-file-button">Выберите файл</button>
                            <div class="bottom-item-button">
                                *Размер файла не должен превышать 80 Мбайт
                            </div>
                        </div>
                    </div>
                    <div class="rigth">

                        <span className="select-file">Либо перетащите файл сюда</span>

                    </div>

                </div>
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
    max-width: 495px;
    width: 100%;
}

.doted-content-file-input span {
    font-size: 16px;
    font-weight: 700;
    line-height: 18.75px;
    text-align: left;
}

.select-file {
    font-size: 14px !important;
    font-weight: 400 !important;
    line-height: 16.8px !important;
    color: #B3B3B3;
}

.hidden-file-input {
    display: none;
}

.custom-file-button {
    padding: 13px 45px;
    background: transparent;
    border: 1px solid #99CCFF;
    color: #99CCFF;
    border-radius: 4px;
    font-size: 16px;
    font-weight: 700;
    line-height: 18.75px;
    cursor: pointer;
    transition: color 0.2s, background-color 0.2s;
    font-size: 16px;
    font-weight: 700;
    line-height: 18.75px;
    text-align: left;
}

.custom-file-button:hover {
    background-color: #99CCFF;
    color: white;
}

.custom-file-button:before {
    position: relative;
}

.doted-content-file-input {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
}

.bottom-item-button {
    font-size: 12px;
    font-weight: 400;
    line-height: 14.4px;
    text-align: center;
    color: #B3B3B3;
    max-width: 171px;
    text-align: center;
    padding-top: 5px;
    margin: 0px 15.5px;
}

.buttons-item {}

.doted-content-file-input ul li {
    font-size: 16px;
    font-weight: 700;
    line-height: 18.75px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-top: 17.5px
}


.doted-content-file-input ul li button {
    color: #99CCFF;
    font-size: 10px;
    padding: 6px;
    background-color: transparent;
    border-radius: 50%;
    border: 1px solid #99CCFF !important;
    cursor: pointer;

}

.grid-content {
    display: grid;
    grid-template-columns: 220px 1fr;
    gap: 41px;
    align-items: center;
}

.rigth {
    align-self: start;
    padding-top: 15px
}
</style>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import Tooltip from 'primevue/tooltip';
import FileUpload from 'primevue/fileupload';

export default defineComponent({
    name: 'Step2',
    components: { FileUpload, },
    directives: {
        'tooltip': Tooltip
    },
    setup() {
        const tooltipContent =
            `<p>1. Наименование файла должно содержать шифр и наименование своего раздела (например 17513.Раздел1.ПЗ.pdf)</p>
     <p>2. Расширение docx, doc, xlsx, xls, pdf</p>
     <p>3. Можно загрузить несколько файлов для смет (не более 10 файлов)</p>`;
        const fileInput = ref<HTMLInputElement | null>(null);
        const selectedFiles = ref<File[]>([]);

        const triggerFileInput = () => {
            fileInput.value?.click();
        };

        const handleFileChange = (event: Event) => {
            const target = event.target as HTMLInputElement;
            if (target.files) {
                const newFiles = Array.from(target.files);
                const totalFiles = selectedFiles.value.length + newFiles.length;

                if (totalFiles > 10) {
                    alert('Можно загрузить максимум 10 файлов.');
                    return;
                }

                for (const file of newFiles) {
                    if (file.size > 80 * 1024 * 1024) { // 80 Мбайт в байтах
                        alert(`Файл ${file.name} превышает лимит в 80 Мбайт.`);
                        return;
                    }
                }

                selectedFiles.value = selectedFiles.value.concat(newFiles);
            }
        };

        const removeFile = (index: number) => {
            selectedFiles.value.splice(index, 1);
        };

        return {
            tooltipContent,
            fileInput,
            selectedFiles,
            triggerFileInput,
            handleFileChange,
            removeFile,
        };
    }
})
</script>
