@@include("../../components/thanks-message/thanks-message.js")

function validation() {

    const forms = document.querySelectorAll('[data-validate]')

    if (!forms.length) return

    forms.forEach(form => {

        inputMasksInit(form);

        form.addEventListener('submit', event => {
            event.preventDefault()

            const inputFields = form.querySelectorAll('[data-js="formField"]');

            const dataReqexp = {
                email: /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,})$/,
                space: /^(\s)+$/,
            }

            function error(el, errorText = "") {
                let errorField = el.querySelector("[data-js='fieldError']")
                return {
                    set: () => {
                        el.classList.add("field--invalid")
                        errorField.innerHTML = errorText
                    },
                    remove: () => {
                        el.classList.remove("field--invalid")
                        errorField.innerHTML = errorText
                    },
                }
            }

            function validateInput(input) {
                const field = input.querySelector('input');

                if(!field) return

                const name = field.getAttribute('data-v-name');
                let valueField = name === "file" ? field.files : field.value;
                let spaceTrigger = name === "file" ? true : !valueField.match(dataReqexp.space);

                if (field.hasAttribute('required') && !field.hasAttribute('disabled')) {
                    if (valueField !== '' && spaceTrigger) {
                        switch (name) {
                            case 'email':
                                if (valueField.match(dataReqexp.email)) {
                                    error(input).remove()
                                } else {
                                    error(input, 'Email введён неверно').set()
                                }
                                break
                            case 'phone':
                                if (valueField.length === 18) {
                                    error(input).remove()
                                } else {
                                    error(input, 'Телефон введён неверно').set()
                                }
                                break
                            case 'date':
                                if (valueField.length === 10) {
                                    const valueTimestamp = Date.parse(valueField.split('.').reverse().join('-'))
                                    if (valueTimestamp < Date.now()) {
                                        error(input).remove()
                                    } else {
                                        error(input, 'Дата должна быть меньше текущей').set()
                                    }
                                } else {
                                    error(input, 'Дата введена неверно').set()
                                }
                                break
                            case 'file':
                                if (valueField.length > 0) {
                                    error(input).remove()
                                } else {
                                    error(input, 'Поле обязательно для заполнения').set()
                                }
                                break
                            default:
                                if (valueField.length !== 0) {
                                    error(input).remove()
                                } else {
                                    error(input, "Поле обязательно для заполнения").set()
                                }
                        }
                    } else {
                        error(input, 'Поле обязательно для заполнения').set()
                    }
                }
            }

            function checkFields() {
            
                inputFields.forEach(input => {
                    validateInput(input)
                })
            }

            function lifeValidate() {
                inputFields.forEach(input => {
                    input.addEventListener('click', () => {
                        if (form.getAttribute('data-validate')) {
                            const field = input.querySelector('input')

                            field.addEventListener('input', () =>
                                validateInput(input),
                            )
                            checkFields()
                        }
                    })
                })
            }

            function validate() {
                let errors = 0

                inputFields.forEach(input => {
                    if (input.classList.contains('field--invalid')) {
                        errors += 1
                    }
                })

                // тут отправляем данные
                if (errors === 0) {
                    const formData = new FormData(form);
                    let fileFields = form.querySelectorAll('.field-file[data-js="formField"]')
                    form.reset();

                    if(fileFields.length > 0) {
    
                        fileFields.forEach(fileField => {
                            let placeholderText = fileField.getAttribute('data-placeholder');
                            let fileName = fileField.querySelector('[data-js="fileName"]');
    
                            fileField.classList.remove('field-file--full');
                            fileName.innerHTML = placeholderText;
    
                        })
                    }

                    thanksMessageShow();
                }
            }

            lifeValidate()
            checkFields()
            form.setAttribute('data-validate', 'true')

            validate()
        })
    })
}

function inputMasksInit(form) {

    const phones = form.querySelectorAll('input[data-type="phoneNumber"]');
    const dates = form.querySelectorAll('input[data-type="date"]');

    ['input', 'focus', 'blur'].forEach(eventName=>{
        if(phones.length > 0) {
            phones.forEach(phone => {
                phone.addEventListener(eventName, phoneMask);
            })
            dates.forEach(date => {
                date.addEventListener(eventName, dateMask);
            })
        }
    }
    )

    function phoneMask(event) {
        let matrix = "+7 (___) ___-__-__"
          , i = 0
          , def = matrix.replace(/\D/g, "")
          , val = this.value.replace(/\D/g, "");
        if (def.length >= val.length)
            val = def;
        this.value = matrix.replace(/./g, function(a) {
            return /[_\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? "" : a
        });
        if (event.type == "blur") {
            if (this.value.length == 2)
                this.value = ""
        }
    }

    function dateMask() {
        let matrix = "__.__.____"
          , i = 0
          , def = matrix.replace(/\D/g, "")
          , val = this.value.replace(/\D/g, "");

          if (def.length >= val.length) {
              val = def;
          }

          if(val.length == 1 && parseInt(val) > 3) {
              val = '3'
          }

          if(val.length == 2 && parseInt(val) > 31) {
            val = '31'
          }

          if(val.length == 3 && parseInt(val.substring(2)) > 1) {
            val = val.slice(0, 2) + "1";
          }
          
          if(val.length == 4 && parseInt(val.substring(2)) > 12) {
            val = val.slice(0, 2) + "12";
          }

        this.value = matrix.replace(/./g, function(a) {
            return /[_\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? "" : a
        });
    }
}