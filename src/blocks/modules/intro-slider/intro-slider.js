function introSliderInit() {
    const introSection = document.querySelector("[data-js='introSection']");
    const introSlider = document.querySelector("[data-js='introSlider']");

    if(!introSlider || !introSection) return

    const sliderControls = introSection.querySelector("[data-js='sliderControls']"); 
    const sliderPrev = sliderControls.querySelector("[data-js='sliderBtnPrev']");
    const sliderNext = sliderControls.querySelector("[data-js='sliderBtnNext']");
    const sliderPagination = sliderControls.querySelector("[data-js='sliderPagination']");

    let introSliderEx = new Swiper(introSlider, {
        autoplay: {
            delay: 3000,
            disableOnInteraction: true
        },
        speed: 1000,
        loop: true,
        slidesPerView: 1,
        navigation: {
            nextEl: sliderNext,
            prevEl: sliderPrev,
        },
        pagination: {
            el: sliderPagination,
            type: 'fraction',
        },
        on: {
            init: function(swiper){
                if(swiper.slides.length < 2) {
                    sliderControls.remove();
                } else {
                    sliderPagination.querySelectorAll('.swiper-pagination-current').forEach(item => {
                        item.innerHTML = ('0' + (swiper.realIndex + 1)).slice(-2);
                    });
                    sliderPagination.querySelectorAll('.swiper-pagination-total').forEach(item => {
                        item.innerHTML = ('0' + swiper.slides.length).slice(-2);
                    });
                }
            },
            slideChange: function(swiper) {
                if(swiper.slides.length > 1) {
                    sliderPagination.querySelectorAll('.swiper-pagination-current').forEach(item => {
                        item.innerHTML = ('0' + (swiper.realIndex + 1)).slice(-2);
                    });
                    sliderPagination.querySelectorAll('.swiper-pagination-total').forEach(item => {
                        item.innerHTML = ('0' + swiper.slides.length).slice(-2);
                    });
                }
            },
          }
    })
}