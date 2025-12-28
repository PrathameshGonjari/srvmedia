(function() {
    'use strict';

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    class HeroSlider {
        constructor(container) {
            this.container = container;
            this.track = container.querySelector('.hero__track--horizontal');
            this.slides = container.querySelectorAll('.hero__slide');
            this.dots = container.querySelectorAll('.hero__dot');
            this.prevBtn = container.querySelector('.hero__control--prev');
            this.nextBtn = container.querySelector('.hero__control--next');
            this.currentSlide = 0;
            this.totalSlides = this.slides.length;
            this.autoPlayInterval = null;
            this.isPaused = false;
            this.touchStartX = 0;
            this.touchEndX = 0;
            this.minSwipeDistance = 50;

            this.init();
        }

        init() {
            if (this.prevBtn) {
                this.prevBtn.addEventListener('click', () => this.goToPrev());
                this.prevBtn.addEventListener('keydown', (e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        this.goToPrev();
                    }
                });
            }

            if (this.nextBtn) {
                this.nextBtn.addEventListener('click', () => this.goToNext());
                this.nextBtn.addEventListener('keydown', (e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        this.goToNext();
                    }
                });
            }

            this.dots.forEach((dot, index) => {
                dot.addEventListener('click', () => this.goToSlide(index));
                dot.addEventListener('keydown', (e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        this.goToSlide(index);
                    }
                });
            });

            this.container.addEventListener('touchstart', (e) => {
                this.touchStartX = e.changedTouches[0].screenX;
            }, { passive: true });

            this.container.addEventListener('touchend', (e) => {
                this.touchEndX = e.changedTouches[0].screenX;
                this.handleSwipe();
            }, { passive: true });

            this.container.addEventListener('mouseenter', () => {
                this.pauseAutoPlay();
            });

            this.container.addEventListener('mouseleave', () => {
                if (!this.isPaused) {
                    this.startAutoPlay();
                }
            });

            this.container.addEventListener('keydown', (e) => {
                if (e.key === 'ArrowLeft') {
                    e.preventDefault();
                    this.goToPrev();
                } else if (e.key === 'ArrowRight') {
                    e.preventDefault();
                    this.goToNext();
                }
            });

            this.container.setAttribute('tabindex', '0');

            if (!prefersReducedMotion) {
                this.startAutoPlay();
            }

            this.updateAriaAttributes();
        }

        goToSlide(index) {
            if (index < 0 || index >= this.totalSlides) return;

            this.currentSlide = index;
            this.updateSlides();
            this.updateDots();
            this.updateAriaAttributes();
            this.resetAutoPlay();
        }

        goToNext() {
            const next = (this.currentSlide + 1) % this.totalSlides;
            this.goToSlide(next);
        }

        goToPrev() {
            const prev = (this.currentSlide - 1 + this.totalSlides) % this.totalSlides;
            this.goToSlide(prev);
        }

        updateSlides() {
            this.slides.forEach((slide, index) => {
                if (index === this.currentSlide) {
                    slide.classList.add('hero__slide--active');
                    slide.setAttribute('aria-hidden', 'false');
                } else {
                    slide.classList.remove('hero__slide--active');
                    slide.setAttribute('aria-hidden', 'true');
                }
            });
        }

        updateDots() {
            this.dots.forEach((dot, index) => {
                if (index === this.currentSlide) {
                    dot.classList.add('hero__dot--active');
                    dot.setAttribute('aria-selected', 'true');
                } else {
                    dot.classList.remove('hero__dot--active');
                    dot.setAttribute('aria-selected', 'false');
                }
            });
        }

        updateAriaAttributes() {
            this.slides.forEach((slide, index) => {
                slide.setAttribute('aria-label', `Slide ${index + 1} of ${this.totalSlides}`);
            });
        }

        handleSwipe() {
            const swipeDistance = this.touchStartX - this.touchEndX;
            
            if (Math.abs(swipeDistance) > this.minSwipeDistance) {
                if (swipeDistance > 0) {
                    this.goToNext();
                } else {
                    this.goToPrev();
                }
            }
        }

        startAutoPlay() {
            if (prefersReducedMotion) return;
            
            this.autoPlayInterval = setInterval(() => {
                if (!this.isPaused) {
                    this.goToNext();
                }
            }, 5000);
        }

        pauseAutoPlay() {
            if (this.autoPlayInterval) {
                clearInterval(this.autoPlayInterval);
                this.autoPlayInterval = null;
            }
        }

        resetAutoPlay() {
            this.pauseAutoPlay();
            if (!this.isPaused) {
                this.startAutoPlay();
            }
        }
    }

    class SchoolsSlider {
        constructor(container) {
            this.container = container;
            this.track = container.querySelector('.schools__track');
            this.cards = container.querySelectorAll('.schools__card');
            this.dots = container.querySelectorAll('.schools__dot');
            this.prevBtn = container.querySelector('.schools__control--prev');
            this.nextBtn = container.querySelector('.schools__control--next');
            this.currentCard = 0;
            this.totalCards = this.cards.length;
            this.isMobile = window.innerWidth <= 768;
            this.touchStartX = 0;
            this.touchEndX = 0;
            this.minSwipeDistance = 50;

            this.init();
            window.addEventListener('resize', () => this.handleResize());
        }

        init() {
            if (!this.isMobile) {
                this.track.style.transform = 'translateX(0)';
                return;
            }

            this.setupMobileSlider();
        }

        setupMobileSlider() {
            if (this.prevBtn) {
                this.prevBtn.addEventListener('click', () => this.goToPrev());
                this.prevBtn.addEventListener('keydown', (e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        this.goToPrev();
                    }
                });
            }

            if (this.nextBtn) {
                this.nextBtn.addEventListener('click', () => this.goToNext());
                this.nextBtn.addEventListener('keydown', (e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        this.goToNext();
                    }
                });
            }

            this.dots.forEach((dot, index) => {
                dot.addEventListener('click', () => this.goToCard(index));
                dot.addEventListener('keydown', (e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        this.goToCard(index);
                    }
                });
            });

            this.container.addEventListener('touchstart', (e) => {
                this.touchStartX = e.changedTouches[0].screenX;
            }, { passive: true });

            this.container.addEventListener('touchend', (e) => {
                this.touchEndX = e.changedTouches[0].screenX;
                this.handleSwipe();
            }, { passive: true });

            this.container.addEventListener('keydown', (e) => {
                if (e.key === 'ArrowLeft') {
                    e.preventDefault();
                    this.goToPrev();
                } else if (e.key === 'ArrowRight') {
                    e.preventDefault();
                    this.goToNext();
                }
            });

            this.updateCards();
            this.updateDots();
        }

        goToCard(index) {
            if (index < 0 || index >= this.totalCards) return;

            this.currentCard = index;
            this.updateCards();
            this.updateDots();
        }

        goToNext() {
            const next = (this.currentCard + 1) % this.totalCards;
            this.goToCard(next);
        }

        goToPrev() {
            const prev = (this.currentCard - 1 + this.totalCards) % this.totalCards;
            this.goToCard(prev);
        }

        updateCards() {
            if (!this.isMobile) return;

            const cardWidth = this.cards[0].offsetWidth;
            const gap = 32;
            const translateX = -(this.currentCard * (cardWidth + gap));
            
            this.track.style.transform = `translateX(${translateX}px)`;
        }

        updateDots() {
            this.dots.forEach((dot, index) => {
                if (index === this.currentCard) {
                    dot.classList.add('schools__dot--active');
                    dot.setAttribute('aria-selected', 'true');
                } else {
                    dot.classList.remove('schools__dot--active');
                    dot.setAttribute('aria-selected', 'false');
                }
            });
        }

        handleSwipe() {
            const swipeDistance = this.touchStartX - this.touchEndX;
            
            if (Math.abs(swipeDistance) > this.minSwipeDistance) {
                if (swipeDistance > 0) {
                    this.goToNext();
                } else {
                    this.goToPrev();
                }
            }
        }

        handleResize() {
            const wasMobile = this.isMobile;
            this.isMobile = window.innerWidth <= 768;
            
            if (wasMobile !== this.isMobile) {
                this.init();
            }
        }
    }

    class ExhibitionSlider {
        constructor(container) {
            this.container = container;
            this.track = container.querySelector('.exhibition__track');
            this.cards = container.querySelectorAll('.exhibition__card');
            this.dots = container.querySelectorAll('.exhibition__dot');
            this.prevBtn = container.querySelector('.exhibition__control--prev');
            this.nextBtn = container.querySelector('.exhibition__control--next');
            this.currentCard = 0;
            this.totalCards = this.cards.length;
            this.cardsPerView = this.getCardsPerView();
            this.autoPlayInterval = null;
            this.isPaused = false;
            this.touchStartX = 0;
            this.touchEndX = 0;
            this.minSwipeDistance = 50;

            this.init();
            window.addEventListener('resize', () => this.handleResize());
        }

        getCardsPerView() {
            if (window.innerWidth <= 768) return 1;
            if (window.innerWidth <= 968) return 2;
            return 3;
        }

        init() {
            if (this.prevBtn) {
                this.prevBtn.addEventListener('click', () => this.goToPrev());
                this.prevBtn.addEventListener('keydown', (e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        this.goToPrev();
                    }
                });
            }

            if (this.nextBtn) {
                this.nextBtn.addEventListener('click', () => this.goToNext());
                this.nextBtn.addEventListener('keydown', (e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        this.goToNext();
                    }
                });
            }

            this.dots.forEach((dot, index) => {
                dot.addEventListener('click', () => this.goToCard(index));
                dot.addEventListener('keydown', (e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        this.goToCard(index);
                    }
                });
            });

            this.container.addEventListener('touchstart', (e) => {
                this.touchStartX = e.changedTouches[0].screenX;
            }, { passive: true });

            this.container.addEventListener('touchend', (e) => {
                this.touchEndX = e.changedTouches[0].screenX;
                this.handleSwipe();
            }, { passive: true });

            this.container.addEventListener('mouseenter', () => {
                this.pauseAutoPlay();
            });

            this.container.addEventListener('mouseleave', () => {
                if (!this.isPaused) {
                    this.startAutoPlay();
                }
            });

            this.container.addEventListener('keydown', (e) => {
                if (e.key === 'ArrowLeft') {
                    e.preventDefault();
                    this.goToPrev();
                } else if (e.key === 'ArrowRight') {
                    e.preventDefault();
                    this.goToNext();
                }
            });

            if (!prefersReducedMotion) {
                this.startAutoPlay();
            }

            this.updateCards();
            this.updateDots();
        }

        goToCard(index) {
            const maxIndex = Math.max(0, this.totalCards - this.cardsPerView);
            if (index < 0) index = 0;
            if (index > maxIndex) index = maxIndex;

            this.currentCard = index;
            this.updateCards();
            this.updateDots();
            this.resetAutoPlay();
        }

        goToNext() {
            const maxIndex = Math.max(0, this.totalCards - this.cardsPerView);
            const next = Math.min(this.currentCard + 1, maxIndex);
            this.goToCard(next);
        }

        goToPrev() {
            const prev = Math.max(this.currentCard - 1, 0);
            this.goToCard(prev);
        }

        updateCards() {
            const cardWidth = this.cards[0]?.offsetWidth || 0;
            const gap = 32;
            const translateX = -(this.currentCard * (cardWidth + gap));
            
            this.track.style.transform = `translateX(${translateX}px)`;
        }

        updateDots() {
            this.dots.forEach((dot, index) => {
                if (index === this.currentCard) {
                    dot.classList.add('exhibition__dot--active');
                    dot.setAttribute('aria-selected', 'true');
                } else {
                    dot.classList.remove('exhibition__dot--active');
                    dot.setAttribute('aria-selected', 'false');
                }
            });
        }

        handleSwipe() {
            const swipeDistance = this.touchStartX - this.touchEndX;
            
            if (Math.abs(swipeDistance) > this.minSwipeDistance) {
                if (swipeDistance > 0) {
                    this.goToNext();
                } else {
                    this.goToPrev();
                }
            }
        }

        startAutoPlay() {
            if (prefersReducedMotion) return;
            
            this.autoPlayInterval = setInterval(() => {
                if (!this.isPaused) {
                    this.goToNext();
                    if (this.currentCard >= Math.max(0, this.totalCards - this.cardsPerView)) {
                        this.goToCard(0);
                    }
                }
            }, 4000);
        }

        pauseAutoPlay() {
            if (this.autoPlayInterval) {
                clearInterval(this.autoPlayInterval);
                this.autoPlayInterval = null;
            }
        }

        resetAutoPlay() {
            this.pauseAutoPlay();
            if (!this.isPaused) {
                this.startAutoPlay();
            }
        }

        handleResize() {
            this.cardsPerView = this.getCardsPerView();
            this.goToCard(this.currentCard);
        }
    }

    document.addEventListener('DOMContentLoaded', function() {
        const heroSlider = document.querySelector('.hero__slider');
        if (heroSlider) {
            new HeroSlider(heroSlider);
        }

        const schoolsSlider = document.querySelector('.schools__slider');
        if (schoolsSlider) {
            new SchoolsSlider(schoolsSlider);
        }

        const exhibitionSlider = document.querySelector('.exhibition__slider');
        if (exhibitionSlider) {
            new ExhibitionSlider(exhibitionSlider);
        }

        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                if (href === '#') return;
                
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    const headerOffset = 80;
                    const elementPosition = target.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: prefersReducedMotion ? 'auto' : 'smooth'
                    });
                }
            });
        });

        const skipLink = document.querySelector('.skip-link');
        if (skipLink) {
            skipLink.addEventListener('click', function(e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.setAttribute('tabindex', '-1');
                    target.focus();
                    target.removeAttribute('tabindex');
                }
            });
        }
    });

    window.matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change', function() {
        if (this.matches) {
            document.querySelectorAll('.logos__track').forEach(track => {
                track.style.animationPlayState = 'paused';
            });
        }
    });

})();
