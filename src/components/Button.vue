<template>
    <button :class="['btn', `btn--${props.variant}`]" :type="props.type" @click="$emit('click')">
        <span class="btn__overlay" aria-hidden="true"></span>
        <span class="label">
            <slot />
        </span>
        <span class="icon material-symbols-outlined" aria-hidden="true">arrow_outward</span>
    </button>
</template>

<script setup lang="ts">
import { withDefaults, defineProps } from 'vue'

const props = withDefaults(defineProps<{ type?: 'button' | 'submit' | 'reset'; variant?: 'primary' | 'white' }>(), {
    type: 'button',
    variant: 'primary',
})
</script>

<style scoped lang="scss">
.btn {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    padding: 0.5rem 1rem;
    cursor: pointer;
    font-size: 1.5rem;
    font-weight: 300;
    line-height: 1.5;
}

.label {
    position: relative;
    display: inline-block;
    align-self: flex-start;
}

.label::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 0;
    height: 1px;
    background-color: currentColor;
    transition: width 0.3s ease;
}

.btn:hover .label::after {
    width: 100%;
}

.icon {
    font-size: 1.75rem;
}


.btn--primary {
    background-color: var(--dark);
    color: var(--light);
}

.btn--white {
    background-color: var(--light);
    color: var(--dark);
}
</style>
