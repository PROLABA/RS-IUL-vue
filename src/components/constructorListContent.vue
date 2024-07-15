<template>
    <div className="container">
        <div class="white-bg">
            <div class="content-title">
                <p>Какой формат ИУЛ вы хотите получить?</p>
                <img src="/src/assets/img/result.png" alt="" srcset="">
            </div>
            <div class="content">
                <div class="conten-body">
                    <div class="content-item">
                        <div class="outline">

                            <Image preview alt="iul">
                                <template #previewicon>
                                    <img src=/src/assets/img/magnifier.png>
                                </template>
                                <template #image>
                                    <img className="iul-imges"
                                        src="https://primefaces.org/cdn/primevue/images/galleria/galleria11.jpg"
                                        alt="image" />
                                </template>
                                <template #preview="slotProps">
                                    <img src="https://primefaces.org/cdn/primevue/images/galleria/galleria11.jpg"
                                        alt="preview" :style="slotProps.style" @click="slotProps.onClick" />
                                </template>
                            </Image>
                        </div>

                    </div>
                    <div class="outline-button">
                        Выбрать
                    </div>
                </div>
                <div class="conten-body">
                    <div class="content-item">
                        <div class="outline">
                            <Image preview alt="iul">
                                <template #previewicon>
                                    <img src=/src/assets/img/magnifier.png>
                                </template>
                                <template #image>
                                    <img className="iul-imges"
                                        src="https://primefaces.org/cdn/primevue/images/galleria/galleria11.jpg"
                                        alt="image" />
                                </template>
                                <template #preview="slotProps">
                                    <img src="https://primefaces.org/cdn/primevue/images/galleria/galleria11.jpg"
                                        alt="preview" :style="slotProps.style" @click="slotProps.onClick" />
                                </template>
                            </Image>
                        </div>

                    </div>
                    <div class="outline-button">
                        Выбрать
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import Image from 'primevue/image';
export default defineComponent({
    name: 'constructorListContent',
    components: {
        Image,
    }
})
</script>
<style>
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
    border-radius:4px ;

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