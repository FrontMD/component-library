function upBtnInit() {
    const upBtn = document.querySelector("[data-js='upBtn']");

    if(!upBtn) return

    upBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        window.scrollTo({
            top: 0, 
            behavior: 'smooth'
        });
        upBtn.blur();
    })
}