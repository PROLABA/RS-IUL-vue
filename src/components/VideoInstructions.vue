<!-- VideoInstructions.vue -->
<template>
    <div class="video-instructions-container">
        <Dialog v-model:visible="visible" modal :style="{ width: '66.5rem' }">
            <template #header>
                <div class="inline-flex items-center justify-center gap-2">
                </div>
            </template>
            <p>
                <video width="100%" controls autoplay>
                    <source src="https://www.youtube.com/watch?v=QcGJcaG2OtA" />
                </video>
            </p>
        </Dialog>
    </div>
</template>
<style>
.video-instructions-container.p-dialog-header {
    padding: 0px !important;
}

.video-instructions-container.p-button {
    margin: 20px 20px 0px 16px !important;
}

.video-instructions-container.p-dialog-content {
    padding: 20px 60px 60px 60px !important;
}

.video-instructions-container.p-icon {
    width: 24px !important;
    height: 24px !important;
    color: #333333;
}
</style>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import Dialog from 'primevue/dialog';

export default defineComponent({
    name: 'VideoInstructions',
    components: {
        Dialog,
    },
    setup() {
        const visible = ref(false);
        const show = () => { visible.value = true; };
        const hide = () => { visible.value = false; };

        return {
            visible,
            show,
            hide,
        };
    },
});
</script>
