<template>

    <div className="flex-just-spcbtw">
        <Button label="Назад" className="prev" icon="pi pi-arrow-left" text />
        <Button className="next" label="Следующий шаг" />
    </div>

</template>
<style>
.flex-just-spcbtw {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.next {
    background-color: #0578D6;
    padding: 18px 37.5px;
    border-radius: 4px;
    border: none;
    font-family: Roboto;
    font-size: 16px;
    font-weight: 700;
    line-height: 18.75px;
    text-align: left;
    color: white;
    cursor: pointer;
}

.prev {
    display: flex;
    border-radius: 4px;
    border: none;
    background-color: transparent !important;
    cursor: pointer;
    gap: 10px;
    font-family: Roboto;
    font-size: 16px;
    font-weight: 400;
    line-height: 18.75px;
    text-align: left;
    color: #0578D6;

}

button:disabled {
    background: #E9E9E9 !important;

}
</style>
<script lang="ts">
import { defineComponent, } from 'vue'
import Button from 'primevue/button';


export default defineComponent({
    name: 'ButtonsFooter',
    components: {
        Button
    },

})
</script>
