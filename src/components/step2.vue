<template>
    <div class="container">
        <div class="white-bg">
            <div v-if="isLoading" class="spinner-container">
                <div class="container-spinner">
                    <ProgressSpinner />
                </div>
            </div>
            <div v-else class="content-type">
                <div class="content-title atention">
                    <div class="c">
                        <div class="tooltip-container">
                            <i class="pi pi-exclamation-circle"></i>
                            <div class="custom-tooltip">
                                <div class="tooltip-content">
                                    <p>1. Наименование файла должно содержать шифр и наименование своего раздела
                                        (например 17513.Раздел1.ПЗ.pdf)</p>
                                    <p>2. Расширение docx, doc, xlsx, xls, pdf</p>
                                    <p>3. Можно загрузить несколько файлов для смет (не более 10 файлов)</p>
                                </div>
                                <div class="tooltip-arrow"></div>
                            </div>
                        </div>
                        <p>Загрузите файл раздела проектной документации</p>
                    </div>
                    <img src="/src/assets/img/result2.png" alt="">
                </div>
                <div class="doted-content-file-input" @dragover.prevent="onDragOver" @dragleave="onDragLeave"
                    @drop.prevent="onDrop" :class="{ 'drag-over': isDragOver }">
                    <div class="grid-content">
                        <div class="left">
                            <div v-if="fileSizeError" class="file-error">
                                <i class="pi pi-exclamation-circle error-icon"
                                    style="color: #FC3F3F; font-size: 24px;"></i>
                                <span v-html="fileSizeError"></span>
                            </div>
                            <div v-if="selectedFiles.length" style="padding-bottom:17.5px" class="selectedFiles">
                                <ul>
                                    <li v-for="(file, index) in selectedFiles" :key="index">
                                        {{ file.name }}
                                        <button @click="removeFile(file.name)" class="pi pi-times"></button>
                                    </li>
                                </ul>
                            </div>
                            <input type="file" ref="fileInput" @change="handleFileChange" class="hidden-file-input"
                                multiple>
                            <div class="buttons-item">
                                <div class="flex-item">
                                    <button @click="triggerFileInput" class="custom-file-button">Выберите файл</button>
                                    <span class="select-file">Либо перетащите файл сюда</span>
                                </div>
                                <div class="bottom-item-button">
                                    *Размер файла не должен превышать 80 Мбайт
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="btn-footer" style="max-width: 495px; padding-top:20px;">
                    <div class="flex-just-spcbtw">
                        <Button label="Назад" @click="goToStep1" class="prev" icon="pi pi-arrow-left" text />
                        <Button class="next" @click="goToStep3" :disabled="isNextButtonDisabled"
                            label="Следующий шаг" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<script lang="ts">
import { defineComponent, ref, computed, watchEffect } from 'vue';
import { useStore } from 'vuex';
import Tooltip from 'primevue/tooltip';
import Button from 'primevue/button';
import ProgressSpinner from 'primevue/progressspinner';
import { useRouter } from 'vue-router';
import { useToast } from 'primevue/usetoast';

export default defineComponent({
    name: 'Step2',
    components: { Button, ProgressSpinner },
    directives: {
        'tooltip': Tooltip
    },
    setup() {
        const toast = useToast();
        const fileInput = ref<HTMLInputElement | null>(null);
        const selectedFiles = ref<File[]>([]);
        const fileSizeError = ref<string | null>(null);
        const isDragOver = ref(false);
        const store = useStore();
        const router = useRouter();
        const isLoading = ref(false);

        const mappedFiles = computed(() => {
            const files = store.state.selectedItems.files || [];
            return files.map((file: { FILE_NAME: any; FILE_SIZE: any; FILE_HASH: any; }) => ({
                name: file.FILE_NAME,
                size: file.FILE_SIZE,
                hash: file.FILE_HASH,
            }));
        });

        watchEffect(() => {
            selectedFiles.value = mappedFiles.value;
        });

        const triggerFileInput = () => {
            fileInput.value?.click();
        };

        const isNextButtonDisabled = computed(() => {
            return selectedFiles.value.length === 0;
        });

        const handleFileChange = (event: Event) => {
            const target = event.target as HTMLInputElement;
            if (target.files) {
                processFiles(Array.from(target.files));
            }
        };

        const onDragOver = (event: DragEvent) => {
            event.preventDefault();
            isDragOver.value = true;
        };

        const onDragLeave = () => {
            isDragOver.value = false;
        };

        const onDrop = (event: DragEvent) => {
            event.preventDefault();
            isDragOver.value = false;

            if (event.dataTransfer?.files) {
                processFiles(Array.from(event.dataTransfer.files));
            }
        };

        const processFiles = (files: File[]) => {
            const maxSizeInBytes = 80 * 1024 * 1024; // 80 MB
            const validFiles: File[] = [];
            const allowedExtensions = ['docx', 'doc', 'xlsx', 'xls', 'pdf', 'xml'];

            for (const file of files) {
                const fileExtension = file.name.split('.').pop()?.toLowerCase();
                if (!allowedExtensions.includes(fileExtension || '')) {
                    toast.add({ severity: 'error', summary: 'Ошибка', detail: 'Неверный тип файла. Поддерживаются только файлы с расширениями docx, doc, xlsx, xls, pdf.', life: 3600 });
                    continue;
                }

                if (file.size > maxSizeInBytes) {
                    fileSizeError.value = 'Файл не был загружен, так как <br> он превышает допустимый размер файла.';
                } else if (!selectedFiles.value.find(f => f.name === file.name && f.size === file.size)) {
                    validFiles.push(file);
                }
            }

            if (validFiles.length > 0) {
                fileSizeError.value = null;
                selectedFiles.value = selectedFiles.value.concat(validFiles);
            }
        };

        const removeFile = (fileName: string) => {
            // Удаляем файл из локального состояния
            selectedFiles.value = selectedFiles.value.filter(f => f.name !== fileName);

            // Удаляем файл из хранилища Vuex
            store.dispatch('removeFileFromStore', fileName);
        };

        const goToStep3 = async () => {
            isLoading.value = true;
            try {
                await store.dispatch('uploadFile', selectedFiles.value);
                router.push('/step3');
            } catch (error) {
                console.error('Error during file upload and navigation:', error);
            } finally {
                isLoading.value = false;
            }
        };

        const goToStep1 = () => {
            router.push('/step1');
        };

        return {
            fileInput,
            selectedFiles,
            triggerFileInput,
            handleFileChange,
            removeFile,
            fileSizeError,
            isNextButtonDisabled,
            isLoading,
            goToStep3,
            goToStep1,
            onDragOver,
            onDragLeave,
            onDrop,
            isDragOver
        };
    }
});
</script>

<style>
.c {
    display: flex;
    align-items: center;
    gap: 10px;
}

.tooltip-container {
    position: relative;
    display: inline-block;
}

.tooltip-container .pi {
    font-size: 24px;
    color: #99CCFF;
}

.custom-tooltip {
    visibility: hidden;
    padding: 15px;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 5px 25px -2px rgba(0, 0, 0, 0.1);
    color: black;
    border-radius: 6px;
    padding: 10px;
    position: absolute;
    z-index: 1;
    bottom: 125%;
    left: 50%;
    transform: translateX(-5%);
    opacity: 0;
    transition: opacity 0.3s;
    width: 278px;

}

.custom-tooltip p {
    color: black !important;
    font-size: 12px;
    font-weight: 400;
    line-height: 14.4px;
    text-align: left;

}

.tooltip-content {
    text-align: left;
    display: flex;
    flex-direction: column;
    gap: 5px;
    /* Выравнивание текста по левому краю */
}

.tooltip-arrow {
    position: absolute;
    top: 100%;
    margin-left: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: white transparent transparent transparent;
}

.tooltip-container:hover .custom-tooltip {
    visibility: visible;
    opacity: 1;
}

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
    gap: 10px;
    padding-top: 17.5px;
    max-width: 222px
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


.flex-item {
    display: flex;
    gap: 41px;
    align-items: center;
}

.rigth {
    align-self: start;
    padding-top: 15px
}

.file-error {
    display: flex;
    align-items: flex-start;
    gap: 10px;
}

.file-error span {
    font-size: 16px;
    font-weight: 400;
    line-height: 1.17;
    text-align: left;
    padding-bottom: 15px;
}
</style>