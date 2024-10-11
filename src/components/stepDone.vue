<template>
    <div class="container">
        <div class="white-bg">
            <div class="acsess">
                <div class="icon">
                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd"
                            d="M16 30C23.732 30 30 23.732 30 16C30 8.26801 23.732 2 16 2C8.26801 2 2 8.26801 2 16C2 23.732 8.26801 30 16 30ZM16 32C24.8366 32 32 24.8366 32 16C32 7.16344 24.8366 0 16 0C7.16344 0 0 7.16344 0 16C0 24.8366 7.16344 32 16 32Z"
                            fill="#0578D6" />
                        <path fill-rule="evenodd" clip-rule="evenodd"
                            d="M23.1267 7.11231C23.6171 7.36638 23.8086 7.96987 23.5546 8.46024L15.2647 24.4602C15.1179 24.7437 14.8445 24.94 14.529 24.9886C14.2135 25.0371 13.8937 24.9322 13.6684 24.706L7.29161 18.306C6.9018 17.9148 6.90295 17.2816 7.29418 16.8918C7.68541 16.502 8.31857 16.5032 8.70839 16.8944L14.1188 22.3245L21.7788 7.54017C22.0328 7.0498 22.6363 6.85824 23.1267 7.11231Z"
                            fill="#0578D6" />
                    </svg>
                    Готово
                </div>
                <img src="../assets/img/result7.svg" alt="" srcset="">
                <div class="grey-line"></div>
            </div>
            <div class="acsess-description ">
                <div class="acsess-title">Ваш ИУЛ скачан в папку «Загрузки» на Ваш компьютер. </div>
                <div class="btn-container">
                    <Button style="cursor: pointer;" label="Редактировать" className="edit-btn"
                        @click="goToEditStepOne" />
                    <Button style="cursor: pointer;" label="Оформить новый ИУЛ" className="create-new-iul"
                        @click="goToStep1" />
                </div>
                <div class="acsess-sub-title">Вы можете скачать ИУЛ повторно или отредактировать его <br /> в «Моих
                    документах».
                </div>
                <div class="acsess-link"><a href="https://services.rsexpertiza.ru/account/history/">Мои документы</a>
                </div>
            </div>
        </div>
    </div>
</template>

<style>
.icon {
    display: flex;

    align-items: center;
    font-size: 24px;
    font-weight: 700;
    line-height: 1.17;
    text-align: left;
    color: #0578D6;


}

.icon svg {
    margin-right: 10px;
}

.grey-line {
    width: 100%;
    height: 1.5px;
    margin-top: 30px;
    background-color: #E9E9E9;
}

.acsess{ 
    display: flex;
    align-self: center;
    flex-wrap: wrap;
    justify-content: space-between;
}
.acsess-link {
    padding-top: 15px;
}

.acsess-description {
    padding-top: 30px;

}

.acsess-title {
    font-size: 18px;
    font-weight: 700;
    line-height: 1.17;
    text-align: left;
}

.btn-container {
    padding: 30px 0px;
    max-width: 495px;
    display: flex;
    gap: 20px;
}

.edit-btn {
    padding: 13px 41.5px;
    color: #99CCFF;
    background-color: transparent;
    border: 1px solid #99CCFF !important;
    border-radius: 4px;
    font-size: 16px;
    font-weight: 700 !important;
    line-height: 1.7;
}

.create-new-iul {
    padding: 13px 15.5px;
    color: white;
    background-color: #99CCFF;
    border: 1px solid #99CCFF !important;
    border-radius: 4px;
    font-size: 16px;
    font-weight: 700 !important;
    line-height: 1.7;
}

.edit-btn .p-button-label {
    font-weight: 700 !important;
}

.create-new-iul .p-button-label {
    font-weight: 700 !important;
}

.acsess-sub-title {
    font-size: 14px;
    font-weight: 400;
    line-height: 1.2;
    text-align: left;

}

.acsess-link a {
    padding-top: 15px;
    font-size: 16px;
    font-weight: 700;
    line-height: 1.7;
    color: #0578D6;
}
</style>


<script lang="ts">
import { defineComponent, } from 'vue'
import Button from 'primevue/button';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

export default defineComponent({
    name: 'stepDone',
    components: { Button },
    setup() {
        const router = useRouter();
        const store = useStore();

        const goToEditStepOne = async () => {
            try {
                await store.dispatch('getVersions');
                router.push('/');
            } catch (error) {
                console.error("Error getting versions:", error);
            }
        };

        const goToStep1 = () => {
            store.commit('clearSelectedItems');
            store.commit('clearCureentVersion')
            router.push('/');
        };

        return {
            goToEditStepOne,
            goToStep1
        };
    }
});

</script>
