function imageSlidersInit() {
    const imageSliders = document.querySelectorAll('[data-js="imageSlider"]');

    if(imageSliders.length < 1) return

    imageSliders.forEach(imageSlider => {
        let imageSliderEx = new Swiper(imageSlider, {
            slidesPerView: 'auto',
            spaceBetween: 0,
            navigation: {
                nextEl: '.media-slider__next',
                prevEl: '.media-slider__prev',
            },
            breakpoints: {
                501: {
                    spaceBetween: 0,   
                }
            }
        })
    })

}