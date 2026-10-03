<template>
    <div class="service-card" :class="{ 'service-card--expanded': isExpanded }">
        <button class="service-card__header" @click="isExpanded = !isExpanded" :aria-expanded="isExpanded">
            <h3 class="service-card__title">{{ title }}</h3>
            <span class="service-card__icon" aria-hidden="true">{{ isExpanded ? '−' : '+' }}</span>
        </button>

        <div v-if="isExpanded" class="service-card__content">
            <p class="service-card__description">{{ description }}</p>
            <ul v-if="tags && tags.length" class="service-card__tags">
                <li v-for="tag in tags" :key="tag" class="service-card__tag">{{ tag }}</li>
            </ul>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

defineProps<{
    title: string
    description: string
    tags?: string[]
}>()

const isExpanded = ref(false)
</script>

<style scoped lang="scss">
.service-card {
    border-bottom: 1px solid var(--dark);
    padding: 1.5rem 0;

    @media (max-width: 750px) {
        padding: 1rem 0;
    }

    &:first-child {
        padding-top: 0;
    }

    &__header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        background: none;
        border: none;
        padding: 0;
        cursor: pointer;
        text-align: left;
        font-family: inherit;
    }

    &__title {
        font-size: 2rem;

        @media (max-width: 750px) {
            font-size: 1.5rem;
        }
    }

    &__icon {
        font-size: 2.5rem;
        font-weight: 300;
        line-height: 1;
        color: var(--dark);

        @media (max-width: 750px) {
            font-size: 2rem;
        }
    }

    &__content {
        padding-top: 1.5rem;
        animation: slideDown 0.3s ease;

        @media (max-width: 750px) {
            padding-top: 1rem;
        }
    }

    &__description {
        margin: 0 0 1rem 0;
        max-width: 600px;

        @media (max-width: 750px) {
            margin-bottom: 0.75rem;
        }
    }

    &__tags {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
    }

    &__tag {
        color: var(--gray);

        &::before {
            content: '• ';
            margin-right: 0.5rem;
        }
    }
}

@keyframes slideDown {
    from {
        opacity: 0;
        transform: translateY(-10px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}
</style>
