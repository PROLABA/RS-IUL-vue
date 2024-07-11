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
                            <div class="grey-bg"></div>
                        </div>

                    </div>
                    <div class="outline-button">
                        Выбрать
                    </div>
                </div>
                <div class="conten-body">
                    <div class="content-item">
                        <div class="outline">
                            <div class="grey-bg"></div>
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
export default defineComponent({
    name: 'constructorListContent',

})
</script>
<style>
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
    font-family: Roboto;
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

}

.grey-bg {
    background: #E9E9E9;
    width: 210px;
    height: 260px;
    border-radius: 4px;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
}

.grey-bg::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    cursor: pointer;

    background: url(../assets/img/magnifier.png) no-repeat center center;
    background-size: contain;
    width: 32px;
    height: 32px;
    opacity: 0;
    transition: opacity 0.3s ease;
}

.grey-bg:hover::before {
    opacity: 1;
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