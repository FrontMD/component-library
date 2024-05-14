
@@include("../../blocks/modules/footer/footer.js")
@@include("../../blocks/modules/header/header.js")

@@include("../../blocks/components/form/form.js")
@@include("../../blocks/components/field-file/field-file.js")
@@include("../../blocks/components/select/select.js")
@@include("../../blocks/components/cookie/cookie.js")
@@include("../../blocks/components/up-btn/up-btn.js")
@@include("../../blocks/components/amount-input/amount-input.js")
@@include("../../blocks/components/tabs-block/tabs-block.js")
@@include("../../blocks/components/spoiler/spoiler.js")

document.addEventListener('DOMContentLoaded', () => {
    validation();
    fileFieldInit();
    selectInit();
    cookieInit();
    upBtnInit();
    amountInput();
    tabsBlockInit();
    accordeonInit();
})

/*include("../../blocks/components/modal/modal.js")
include("../../blocks/components/image-slider/image-slider.js")

document.addEventListener('DOMContentLoaded', () => {
    imageSlidersInit();
    
    //modals
    modal('orderService');
    modal('orderProduct');
    modal('orderVacancies');
    modal('infoRegistration');
    
})*/