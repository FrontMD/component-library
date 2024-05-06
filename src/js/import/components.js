
@@include("../../blocks/modules/footer/footer.js")
@@include("../../blocks/modules/header/header.js")

@@include("../../blocks/components/form/form.js")
@@include("../../blocks/components/field-file/field-file.js")
@@include("../../blocks/components/select/select.js")

document.addEventListener('DOMContentLoaded', () => {
    validation();
    fileFieldInit();
    selectInit();
})

/*include("../../blocks/components/modal/modal.js")
include("../../blocks/components/spoiler/spoiler.js")
include("../../blocks/components/tabs-block/tabs-block.js")
include("../../blocks/components/image-slider/image-slider.js")
include("../../blocks/components/up-btn/up-btn.js")
include("../../blocks/components/cookie/cookie.js")

document.addEventListener('DOMContentLoaded', () => {
    accordeonInit();
    tabsBlockInit();
    imageSlidersInit();
    upBtnInit();
    cookieInit();
    
    //modals
    modal('orderService');
    modal('orderProduct');
    modal('orderVacancies');
    modal('infoRegistration');
    
})*/