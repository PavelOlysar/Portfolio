<template>
    <div class="footer-image-wrapper">
        <img class="footer-image-rotated" :src="FooterImage" alt="Footer visual" />
    </div>
    <footer id="contact">
        <div class="footer__container">
            <div class="footer__row footer__row--top">
                <h3 class="footer__heading">Máte zájem se mnou spolupracovat?</h3>
                <!-- <Button variant="white">Project Form</Button> -->
            </div>
            <div class="footer__row footer__row--bottom">
                <div class="footer__contact">
                    <div>
                        <div class="footer__label">Pošlete zprávu:</div>
                        <a class="footer__link" href="mailto:olysarp@gmail.com">olysarp@gmail.com</a>
                    </div>
                    <div>
                        <div class="footer__label">Zavolejte:</div>
                        <a class="footer__link" href="tel:+420728035080">+420 728 035 080</a>
                    </div>
                </div>
                <nav class="footer__socials" aria-label="Social links">
                    <Link href="https://www.linkedin.com/in/pavel-oly%C5%A1ar-25309a331/" external>Linkedin</Link>
                    <Link href="https://www.behance.net/pavelolysar" external>Behance</Link>
                    <Link href="https://www.instagram.com/pavel_olysar/" external>Instagram</Link>
                    <Link href="https://www.youtube.com/@pavelolysar" external>YouTube</Link>
                </nav>
            </div>
        </div>
        <div class="footer__bottom">
            <span>Copyright @ 2025 Pavel Olyšar. Všechna práva vyhrazena.</span>
            <span class="footer__credit">Design &amp; Development - Pavel Olyšar</span>
        </div>
    </footer>
</template>

<script setup lang="ts">
import FooterImage from '@/assets/footer-image.jpg';
</script>

<style scoped lang="scss">
footer {
    padding: 3rem 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    background: var(--dark);
    color: var(--light);
    width: 100%;
}


.footer__container {
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 1920px;
    width: 100%;
    padding-bottom: 3rem;
    gap: 3.5rem;
}

.footer__row {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 2.5rem;
}

.footer__row--top {
    align-items: center;
}


.footer__row--top Button {
    margin-left: auto;
}

.footer__row--bottom {
    align-items: flex-start;
}

.footer__contact {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    color: var(--gray);
    font-size: 1.25rem;
}

.footer__label {
    color: var(--gray);
}

.footer__link {
    color: var(--light);
    position: relative;
    text-decoration: none;
    display: inline-block;
}

.footer__link::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 0;
    height: 1px;
    background-color: currentColor;
    transition: width 0.3s ease;
}

.footer__link:hover::after {
    width: 100%;
}

.footer__socials {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 0.5rem;
    font-size: 1.25rem;
}

.footer__bottom {
    max-width: 1920px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-top: 1px solid var(--gray);
    padding-top: 3rem;
    font-size: 1rem;
    color: var(--gray);
    flex-wrap: wrap;
}

.footer__credit {
    font-size: 1rem;
    color: var(--gray);
}

.footer__heading {
    font-size: 6rem;
    line-height: 1;
    letter-spacing: -0.075em;
    text-transform: uppercase;
    font-weight: 400;
    margin: 0;

    @media (max-width: 1024px) {
        font-size: 4rem;
        letter-spacing: -0.025em;

    }

    @media (max-width: 750px) {
        font-size: 1.5rem;
        letter-spacing: -0.015em;
    }
}

@media (max-width: 900px) {
    .footer__container {
        gap: 2rem;
        padding: 2.5rem 1rem 4rem 1rem;
    }

    .footer__row {
        flex-direction: column;
        align-items: flex-start;
        gap: 2rem;
    }

    .footer__row--top Button {
        margin-left: 0;
        margin-top: 1.5rem;
    }

    .footer__socials {
        align-items: flex-start;
    }

    .footer__bottom {
        flex-direction: column;
        align-items: flex-start;
        gap: 0.5rem;
        padding: 1.25rem 1rem 0 1rem;
    }
}

.footer-image-wrapper {
    width: 100%;
    overflow: hidden;
    position: relative;
    height: 700px;
    z-index: 1;
}

.footer-image-rotated {
    display: block;
    width: 120vw;
    max-width: none;
    position: absolute;
    top: -20%;
    left: 50%;
    transform: translateX(-50%) rotate(4deg);
    height: 1000px;
    object-fit: cover;
    pointer-events: none;
    user-select: none;
}
</style>