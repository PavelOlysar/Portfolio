<template>
    <div class="home">
        <WorkModal :isOpen="isModalOpen" :project="selectedProject" @close="closeModal" />

        <div class="home__container">
            <header>
                <img :src="HeaderImage" alt="Pavel Olysar Header" class="header__image">
                <div class="header__content">
                    <div class="header__text">
                        <b>Jsem designer a web developer, který tvoří digitální projekty, jež nejen vypadají skvěle, ale
                            zároveň přinášejí uživatelům intuitivní a příjemný zážitek. Specializuji se na UI/UX design,
                            moderní webový vývoj a tvorbu vizuálních identit.</b>
                        <nav class="hero-nav" aria-label="primary">
                            <ol>
                                <li>
                                    <Link href="#works" size="hero">Projekty</Link>
                                </li>
                                <li>
                                    <Link href="#services" size="hero">Služby</Link>
                                </li>
                                <li>
                                    <Link href="#contact" size="hero">Kontakt</Link>
                                </li>
                            </ol>
                        </nav>
                    </div>
                    <div class="header__images">
                        <img :src="ProfileImage" alt="Additional Image 1" class="header__images-second">
                    </div>
                </div>
            </header>

            <section class="works" id="works">
                <div class="works__header">
                    <h2 class="works__heading">Vybrané projekty</h2>
                    <!--<Button class="works__button">All projects</Button>-->
                </div>

                <div class="works__grid">
                    <article v-for="(project, index) in projects" :key="project.id"
                        :class="{ 'works__card--left': index < 2 }" class="works__card" @click="openModal(project)"
                        role="button" tabindex="0" @keydown.enter="openModal(project)"
                        @keydown.space="openModal(project)">
                        <img :src="project.image" :alt="project.title" class="works__card-image" />
                        <h3 class="works__card-title">{{ project.title }}</h3>
                        <p class="works__card-tag">{{ project.category }}</p>
                    </article>
                </div>
            </section>

            <section class="services" id="services">
                <h2 class="services__heading">Služby</h2>

                <div class="services__content">
                    <p class="services__description">Specializuji se na tvorbu moderních webů, intuitivních
                        uživatelských rozhraní a silných vizuálních identit, které propojují design a technologii.
                        Přečtěte si více o službách, které nabízím, a zjistěte, co přesně tvořím.</p>

                    <div class="services__list">
                        <ServiceCard title="Grafický Design"
                            description="Vytvářím vizuální design, který dokáže zaujmout a zanechat dojem. Od log, plakátů a magazínů až po komplexní grafické materiály. Každý projekt stavím tak, aby komunikoval jasně a efektivně, a zároveň odrážel osobnost značky."
                            :tags="['Loga', 'Plakáty', 'Magazíny']" />

                        <ServiceCard title="UI/UX Design"
                            description="Navrhuji uživatelská rozhraní, která jsou nejen estetická, ale hlavně funkční. S důrazem na intuitivní interakce a přehlednou navigaci pomáhám uživatelům rychle najít to, co potřebují a zajistit skvělý zážitek při každém používání."
                            :tags="['Web Design', 'Mobile App Design']" />

                        <ServiceCard title="Vývoj Webu"
                            description="Vyvíjím moderní weby a aplikace, které kombinují estetiku s robustním kódem. Od responzivního designu po komplexní frontend a backend řešení. Každý projekt stavím tak, aby byl rychlý, funkční a přinášel skutečnou hodnotu uživatelům i klientům."
                            :tags="['HTML/CSS', 'React/Vue', 'Webflow/Framer', 'Next.js', 'Express.js', 'SQL/MongoDB']" />
                    </div>
                </div>
            </section>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import HeaderImage from '@/assets/header.png';
import ProfileImage from '@/assets/profile.png';

// work images
import PetrhovKamenyShort from '@/assets/works/petrovy_kameny_short.png';
import PetrhovKamenyLong from '@/assets/works/petrovy_kameny_long.png';
import KxgShort from '@/assets/works/kxg_short.jpg';
import KxgLong from '@/assets/works/kxg_long.jpg';
import KaiserShort from '@/assets/works/kaiser_short.jpg';
import KaiserLong from '@/assets/works/kaiser_long.jpg';
import FlexlyShort from '@/assets/works/flexly_short.jpg';
import FlexlyLong from '@/assets/works/flexly_long.jpg';
import KatieShort from '@/assets/works/katie_short.jpg';
import KatieLong from '@/assets/works/katie_long.jpg';
import BoxShort from '@/assets/works/box_short.jpg';
import BoxLong from '@/assets/works/box_long.jpg';

interface Project {
    id: string;
    title: string;
    category: string;
    image: string;
    modalImage: string;
    description: string;
    projectUrl?: string;
}

const isModalOpen = ref(false);
const selectedProject = ref<Project>({
    id: '',
    title: '',
    category: '',
    image: '',
    modalImage: '',
    description: '',
});

const projects: Project[] = [
    {
        id: '1',
        title: 'KXG Hospitality',
        category: 'Web Design',
        image: KxgShort,
        modalImage: KxgLong,
        description: 'Design webu pro KXG Hospitality vytvořený v rámci praxe v marketingové agentuře Pickerly. Projekt se zaměřuje na luxusní a minimalistický design, který zvýrazňuje to nejpodstatnější a nabízí návštěvníkům přehledný a elegantní zážitek. V tuto chvíli je web pouze vizuálním návrhem, který ukazuje schopnost kombinovat estetiku s funkčností a propracovaným UX.',
    },
    {
        id: '2',
        title: 'Franz Josef Kaiser',
        category: 'Web Design',
        image: KaiserShort,
        modalImage: KaiserLong,
        description: 'Návrh designu webu pro značku Franz Josef Kaiser, která klade důraz na luxus. Web je koncipován tak, aby zvýraznil kvalitu produktů a vytvořil příjemný vizuální zážitek pro návštěvníky. Tento projekt sloužil jako konceptuální práce, nikoli reálná zakázka.',
    },
    {
        id: '3',
        title: 'Flexly AI App',
        category: 'Brand Identity, Logo Design',
        image: FlexlyShort,
        modalImage: FlexlyLong,
        description: 'Vizuální identita pro AI aplikaci zahrnující logo, barevnou paletu, typografii a celkový vizuální styl. Důraz je kladen na vyjádření hodnot značky, jako jsou ambice, sebevědomí a inovativní přístup, a na vytvoření jednotného, profesionálního a zapamatovatelného vzhledu.',
    },
    {
        id: '4',
        title: 'Katie Feygie Art Gallery',
        category: 'Web Design',
        image: KatieShort,
        modalImage: KatieLong,
        description: 'Návrh moderního webu pro malou galerii umění zaměřenou na současné umění. Projekt klade důraz na přehledné a atraktivní předání informací návštěvníkům, prezentaci umělců a jejich děl a vytvoření příjemného uživatelského zážitku. V tuto chvíli je web stále ve fázi tvorby.',
    },
    {
        id: '5',
        title: 'Petrovy Kameny',
        category: 'Web Design',
        image: PetrhovKamenyShort,
        modalImage: PetrhovKamenyLong,
        description: 'Design webu pro hotel Petrovy Kamen vytvořený v rámci praxe v marketingové agentuře Pickerly. Projekt se zaměřuje na moderní a přehledný vzhled, který usnadňuje orientaci návštěvníků, prezentuje služby hotelu a vytváří příjemný uživatelský zážitek.',
    },
    {
        id: '6',
        title: 'Boxerna Mudroch team',
        category: 'Web Design',
        image: BoxShort,
        modalImage: BoxLong,
        description: 'Jedna z mých prvních prací, design webu Boxerna Mudroch Team. Projekt mi umožnil učit se základy UI/UX designu. Web klade důraz na přehledné uživatelské rozhraní, prezentaci služeb a zároveň slouží jako ukázka mého raného přístupu k designu a digitálním projektům.',
    },
];

const openModal = (project: Project) => {
    selectedProject.value = project;
    isModalOpen.value = true;
    document.body.style.overflow = 'hidden';
};

const closeModal = () => {
    isModalOpen.value = false;
    document.body.style.overflow = 'auto';
};
</script>

<style scoped lang="scss">
.home {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;

    &__container {
        max-width: 1920px;
        width: 100%;
        min-height: 100vh;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 1rem;
        gap: 8rem;
        margin-bottom: 10rem;

        @media (max-width: 750px) {
            padding: 0.75rem;
            min-height: auto;
            margin-bottom: 5rem;
            gap: 4rem;
        }
    }
}

header {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    gap: 2rem;
    padding-bottom: 10rem;
    margin-bottom: 0;

    @media (max-width: 750px) {
        padding-bottom: 2rem;
        gap: 1rem;
    }

    .header__image {
        width: 100%;
        height: auto;
        object-fit: contain;
        margin-bottom: 2rem;

        @media (max-width: 750px) {
            margin-bottom: 1rem;
        }
    }

    .header__content {
        display: flex;
        justify-content: space-between;
        align-items: stretch;
        gap: 2rem;
        width: 100%;

        @media (max-width: 750px) {
            flex-direction: column;
            align-items: center;
            gap: 1rem;
            justify-content: flex-start;
        }

        .header__text {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            gap: 2rem;
            flex: 1 1 480px;
            height: 100%;

            @media (max-width: 750px) {
                justify-content: flex-start;
                gap: 2rem;
                flex: 1 1 32px;
            }

            b {
                max-width: 750px;
                font-size: clamp(1.5rem, 2vw, 2rem);

                @media (max-width: 750px) {
                    max-width: 100%;
                }
            }

            .hero-nav {
                margin-top: 1rem;

                @media (max-width: 750px) {
                    margin-top: 0;
                }
            }
        }

        .header__images {
            display: flex;
            justify-content: flex-end;
            align-items: flex-end;
            gap: 1rem;
            flex-shrink: 0;

            @media (max-width: 750px) {
                justify-content: center;
                width: 100%;
                max-width: none;
                flex-direction: column;
                align-items: center;
                gap: 1rem;
            }

            img {
                width: 100%;
                max-width: 460px;
                height: auto;
                object-fit: cover;

                @media (max-width: 1440px) {
                    max-width: 320px;
                }

                @media (max-width: 1024px) {
                    max-width: 280px;
                }

                @media (max-width: 750px) {
                    max-width: none;
                    width: 100%;
                }
            }

            img.header__images-first {
                aspect-ratio: 460 / 560;
                display: none;

                @media (max-width: 1440px) {
                    display: none;
                }
            }

            img.header__images-second {
                aspect-ratio: 460 / 700;

                @media (max-width: 750px) {
                    aspect-ratio: 4 / 5;
                    max-height: 500px;
                }
            }
        }
    }
}

@media (min-width: 1024px) {
    .header__content {
        align-items: stretch;
    }

    .header__images img.header__images-second {
        max-width: 500px;
        height: 560px;
        object-fit: cover;
    }

    @media (min-width: 1400px) {
        header {
            height: 1080px;
        }

        .header__images img.header__images-second {
            height: 700px;
        }

        .header__text {
            height: 700px;
        }
    }
}

.works {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 2rem;

    &__header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 2rem;
        width: 100%;

        @media (max-width: 750px) {
            flex-direction: column;
            align-items: flex-start;
            gap: 1.5rem;
        }
    }

    &__heading {
        font-size: 6rem;
        line-height: 1;
        letter-spacing: -0.075em;
        text-transform: uppercase;
        font-weight: 400;
        margin: 0;
        flex: 1;

        @media (max-width: 1024px) {
            font-size: 4rem;
        }

        @media (max-width: 750px) {
            font-size: 2rem;
        }
    }

    &__button {
        flex-shrink: 0;

        @media (max-width: 750px) {
            align-self: flex-start;
        }
    }

    &__grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 2rem;

        @media (max-width: 1024px) {
            grid-template-columns: repeat(2, 1fr);
            gap: 1.5rem;
        }

        @media (max-width: 750px) {
            grid-template-columns: 1fr;
            gap: 1rem;
        }
    }

    &__card {
        display: flex;
        flex-direction: column;
        gap: 0.25rem;
        cursor: pointer;
        transition: transform 0.3s ease;

        &:hover {
            transform: translateY(-4px);
        }

        &:focus {
            outline: 2px solid var(--dark);
            outline-offset: 2px;
        }

        @media (max-width: 750px) {
            &:hover {
                transform: none;
            }
        }
    }

    &__card--left &__card-image {
        object-position: 10% center;
    }

    &__card-image {
        width: 100%;
        height: auto;
        aspect-ratio: 16 / 10;
        object-fit: cover;
        border-radius: 0;
    }

    &__card-title {
        font-size: 1.25rem;
        line-height: 1.5;
        font-weight: 500;
        color: var(--dark);
        text-transform: none;
        letter-spacing: -0.015em;
        position: relative;
        display: inline-block;
        align-self: flex-start;
    }

    &__card-title::after {
        content: '';
        position: absolute;
        bottom: -2px;
        left: 0;
        width: 0;
        height: 1px;
        background-color: currentColor;
        transition: width 0.3s ease;
    }

    &__card:hover &__card-title::after {
        width: 100%;
    }

    &__card-tag {
        font-size: 1.25rem;
        line-height: 1.5;
        color: var(--gray);
        font-weight: 300;

        @media (max-width: 750px) {
            font-size: 1rem;
        }
    }
}

.services {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 2rem;

    &__heading {
        font-size: 6rem;
        line-height: 1;
        letter-spacing: -0.075em;
        text-transform: uppercase;
        font-weight: 400;
        margin: 0;

        @media (max-width: 1024px) {
            font-size: 4rem;
        }

        @media (max-width: 750px) {
            font-size: 2rem;
        }
    }

    &__content {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 3rem;
        width: 100%;
        align-items: start;

        @media (max-width: 1024px) {
            grid-template-columns: 1fr;
            gap: 2rem;
        }

        @media (max-width: 750px) {
            gap: 1.5rem;
        }
    }

    &__description {
        max-width: 550px;
    }

    &__list {
        display: flex;
        flex-direction: column;
    }
}
</style>