function fileFieldInit() {
    const fileFields = document.querySelectorAll('.field-file input');

    fileFields.forEach(field => {
        let fieldLabel = field.closest('.field-file');
        let fileName = fieldLabel.querySelector('[data-js="fileName"]');
        let fieldPlaceholder = fileName.innerHTML;
        let fullIcon = fieldLabel.querySelector('[data-js="iconFull"]');
        let fileError = fieldLabel.querySelector('[data-js="fieldError"]')


        field.addEventListener('change', () => {
            if(field.files.length > 0) {
                if(field.files[0].size > 10485760) {
                    field.value = '';
                    fieldLabel.classList.remove('field-file--full');
                    fieldLabel.classList.add('field--invalid');
                    fileName.innerHTML = fieldPlaceholder;
                    fileError.innerHTML = 'Файл превышает допустимый размер';
                } else {
                    fieldLabel.classList.remove('field--invalid');
                    fieldLabel.classList.add('field-file--full');
                    fileName.innerHTML = field.files[0].name;
                    fileError.innerHTML = '';
                }
            } else {
                fieldLabel.classList.remove('field-file--full')
                fileName.innerHTML = fieldPlaceholder;
            }
        })

        fullIcon.addEventListener('click', (e) => {
            e.preventDefault()
            e.stopPropagation()
            field.value = '';
            fieldLabel.classList.remove('field-file--full')
            fileName.innerHTML = fieldPlaceholder;
        })
    })
}