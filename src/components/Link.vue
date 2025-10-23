<template>
    <a :href="href" :target="external ? '_blank' : undefined" :rel="external ? 'noopener' : undefined"
        :class="[{ 'link--hero': size === 'hero' }]">
        <slot />
        <span v-if="external" class="icon material-symbols-outlined" aria-hidden="true">arrow_outward</span>
    </a>
</template>

<script setup lang="ts">
const props = defineProps<{
    href: string
    external?: boolean
    size?: 'normal' | 'hero'
}>()

const { href, external, size } = props
</script>

<style scoped lang="scss">
.link--hero {
    font-size: clamp(1.5rem, 2.4vw + 0.6rem, 2rem);
}

a {
    display: inline-flex;
    align-items: center;
    justify-items: center;
    gap: 0.25em;
    position: relative;
    text-decoration: none;
}

a::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 0;
    height: 1px;
    background-color: currentColor;
    transition: width 0.3s ease;
}

a:hover::after {
    width: 100%;
}

.icon {
    font-size: 0.85em;
}

@media (max-width: 420px) {
    a {
        gap: 0.15em;
    }
}
</style>
