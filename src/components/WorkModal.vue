<template>
    <Teleport to="body">
        <Transition name="modal-fade">
            <div v-if="isOpen" class="modal-overlay" @click="closeModal">
                <div class="modal-content" @click.stop>
                    <div class="modal-header">
                        <div class="modal-header-top">
                            <h2 class="modal-title">{{ project.title }}</h2>
                            <button class="modal-close" @click="closeModal" aria-label="Close modal">
                                <span class="material-symbols-outlined">close</span>
                            </button>
                        </div>
                    </div>

                    <div class="modal-body">
                        <div class="modal-info">
                            <p class="modal-category">{{ project.category }}</p>
                            <p class="modal-description">{{ project.description }}</p>
                            <Link v-if="project.projectUrl" :href="project.projectUrl" external
                                class="modal-project-link">
                            View project
                            </Link>
                        </div>
                        <img :src="project.modalImage" :alt="project.title" class="modal-image" />
                    </div>
                </div>
            </div>
        </Transition>
    </Teleport>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';

interface Project {
    id: string;
    title: string;
    category: string;
    image: string;
    modalImage: string;
    description?: string;
    projectUrl?: string;
}

defineProps<{
    isOpen: boolean;
    project: Project;
}>();

const emit = defineEmits<{
    close: [];
}>();

const closeModal = () => {
    emit('close');
    document.body.style.overflow = 'auto';
};
</script>

<style scoped lang="scss">
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.85);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    padding: 1rem;
    overflow: hidden;

    @media (max-width: 750px) {
        padding: 0.5rem;
    }
}

.modal-content {
    position: relative;
    background: var(--light);
    border-radius: 0;
    max-width: 900px;
    width: 100%;
    max-height: 90vh;
    overflow-y: auto;
    overflow-x: hidden;
    display: flex;
    flex-direction: column;
    gap: 0;
    box-sizing: border-box;

    @media (max-width: 750px) {
        max-height: 95vh;
        border-radius: 0;
    }
}

.modal-header {
    position: sticky;
    top: 0;
    background: var(--light);
    padding: 2rem;
    z-index: 1001;

    @media (max-width: 750px) {
        padding: 1rem;
    }
}

.modal-header-top {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 1rem;
    margin-bottom: 0.5rem;
}

.modal-close {
    background: none;
    border: none;
    cursor: pointer;
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;

    .material-symbols-outlined {
        font-size: 2rem;
        font-variation-settings: 'FILL' 0, 'wght' 300, 'GRAD' 0, 'opsz' 48;
    }

    &:hover {
        opacity: 0.7;
    }

    @media (max-width: 750px) {
        .material-symbols-outlined {
            font-size: 1.5rem;
        }
    }
}

.modal-title {
    font-size: 3.5rem;
    line-height: 1.25;
    letter-spacing: -0.05em;
    text-transform: uppercase;
    font-weight: 400;
    margin: 0 0 0.5rem 0;
    word-break: break-word;

    @media (max-width: 1024px) {
        font-size: 2.5rem;
    }

    @media (max-width: 750px) {
        font-size: 1.75rem;
    }
}

.modal-body {
    display: flex;
    flex-direction: column;
    padding: 2rem;
    gap: 2rem;

    @media (max-width: 750px) {
        padding: 1rem;
        gap: 1rem;
    }
}

.modal-image {
    width: 100%;
    height: auto;
    object-fit: contain;
}

.modal-category {
    font-size: 1.25rem;
    color: var(--gray);
    font-weight: 300;
    margin: 0;

    @media (max-width: 750px) {
        font-size: 1rem;
    }
}

.modal-description {
    font-size: 1.25rem;
    line-height: 1.5;
    color: var(--dark);
    margin: 0;
    max-width: 750px;

    @media (max-width: 750px) {
        font-size: 1rem;
    }
}

.modal-info {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.modal-fade-enter-active,
.modal-fade-leave-active {
    transition: opacity 0.3s ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
    opacity: 0;
}

.modal-fade-enter-to,
.modal-fade-leave-from {
    opacity: 1;
}
</style>
