function accordeonInit() {
    const accordion = document.querySelector("[data-js='accordion']");

    if(!accordion) return

    document.addEventListener("click", (e) => {

        if(e.target.closest('[data-js="spoilerHeader"]') && !(e.target.closest('[data-modal]'))) {

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
            if (e.target.closest('.spoiler__btn')) {
                e.target.closest('[data-js="spoilerHeader"]').classList.add("no-hover")
            } else {
                e.target.closest('[data-js="spoilerHeader"]').classList.remove("no-hover")
            }
        }
    })

}

function spoilerExpand(spoiler) {

    let targetContent = spoiler.querySelector('[data-js="spoilerContent"]');
    let innerSpoilers = spoiler.querySelectorAll('[data-js="spoiler"]');
    let summHeight = 0;
    let parentSpoiler = spoiler.closest('[data-js="tabsBlockSlides"]')

    if(innerSpoilers.length > 0) {
        innerSpoilers.forEach(innerSpoiler => {
            let innerSpoilerContent = innerSpoiler.querySelector('[data-js="spoilerContent"]');
            summHeight += innerSpoiler.scrollHeight + innerSpoilerContent.scrollHeight;
        });
    }
    spoiler.classList.add("spoiler--expanded");
    targetContent.style.maxHeight = targetContent.scrollHeight + summHeight + 'px';
    if(parentSpoiler) {
        parentSpoiler.swiper.updateAutoHeight(10)
    }
    document.activeElement.blur();

}

function spoilerCollapse(spoiler) {
    let spoilerContent = spoiler.querySelector('[data-js="spoilerContent"]');
    let parentSpoiler = spoiler.closest('[data-js="tabsBlockSlides"]');
    spoiler.classList.remove('spoiler--expanded');
    spoilerContent.style.maxHeight = 0;
    if(parentSpoiler) {
        parentSpoiler.swiper.updateAutoHeight(10)
    }
    document.activeElement.blur();
    if (spoiler.closest('[data-js="spoilerContent"]')) {
        spoiler.closest('[data-js="spoilerContent"]').scrollIntoView({ behavior: "smooth", block: "start", inline: "start" });
    }
}