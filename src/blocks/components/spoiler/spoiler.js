function accordeonInit() {
    const accordion = document.querySelector("[data-js='accordion']");

    if(!accordion) return

    document.addEventListener("click", (e) => {

        if(e.target.closest('[data-js="spoilerHeader"]') && true /* тут можно указать какой-то внутренний контент с отдельным кликом */) {

            e.preventDefault()
            e.stopPropagation()
            let targetSpoiler = e.target.closest('[data-js="spoiler"]');

            if(targetSpoiler.classList.contains('spoiler--empty')) return;

            if(targetSpoiler.classList.contains('spoiler--expanded')) {
                spoilerCollapse(targetSpoiler)
            } else {
                spoilerExpand(targetSpoiler)
            }
        }
    })

    document.addEventListener("mousemove", (e) => {

        if(e.target.closest('[data-js="spoilerHeader"]')) {

            e.preventDefault()
            e.stopPropagation()
            if (false /* тут можно указать какой-то внутренний контент с отдельным ховером */) {
                e.target.closest('[data-js="spoilerHeader"]').classList.add("no-hover")
            } else {
                e.target.closest('[data-js="spoilerHeader"]').classList.remove("no-hover")
            }
        }
    })

}

function spoilerExpand(spoiler) {

    let targetContent = spoiler.querySelector('[data-js="spoilerContent"]');
    let targetWrapper = spoiler.querySelector('.spoiler__wrapper');
    let innerSpoilers = spoiler.querySelectorAll('[data-js="spoiler"]');
    let summHeight = 0;
    let parentSlider = spoiler.closest('[data-js="tabsBlockSlides"]') //проверяем лежит ли спойлер в слайдере или вкладках

    if(innerSpoilers.length > 0) {
        innerSpoilers.forEach(innerSpoiler => {
            let innerSpoilerContent = innerSpoiler.querySelector('[data-js="spoilerContent"]');
            summHeight += innerSpoiler.scrollHeight + innerSpoilerContent.scrollHeight;
        });
    }
    
    let targetMaxHeight = targetContent.scrollHeight + summHeight;
    
    //spoiler.style.transitionDuration = targetMaxHeight < 400 ? targetMaxHeight * 5 + "ms" : targetMaxHeight < 700 ? targetMaxHeight * 2 + "ms" : targetMaxHeight + "ms";
    targetContent.style.transitionDuration = targetMaxHeight < 400 ? targetMaxHeight * 5 + "ms" : targetMaxHeight < 700 ? targetMaxHeight * 2 + "ms" : targetMaxHeight + "ms";
    targetWrapper.style.transitionDuration = targetMaxHeight < 400 ? targetMaxHeight * 5 + "ms" : targetMaxHeight < 700 ? targetMaxHeight * 2 + "ms" : targetMaxHeight + "ms"; 
    targetContent.style.maxHeight = targetMaxHeight + 'px';
    
    spoiler.classList.add("spoiler--expanded");

    if(parentSlider) {
        parentSlider.swiper.updateAutoHeight(10)
    }
    document.activeElement.blur();

}

function spoilerCollapse(spoiler) {
    let spoilerContent = spoiler.querySelector('[data-js="spoilerContent"]');
    let parentSlider = spoiler.closest('[data-js="tabsBlockSlides"]');
    spoilerContent.style.maxHeight = 0;
    spoiler.classList.remove('spoiler--expanded');
    if(parentSlider) {
        parentSlider.swiper.updateAutoHeight(10)
    }
    document.activeElement.blur();
}