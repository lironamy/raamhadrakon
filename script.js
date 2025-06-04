document.addEventListener("DOMContentLoaded", function() {
    const formContainer = document.getElementById('formContainer');
    const mobileFooter = document.querySelector('.mobile-footer');
    const desktopForm = document.getElementById('desktopForm');
    const mobileForm = document.getElementById('mobileForm');
    const closeBtn = document.querySelector('.closeBtn');
    const submitBtn = document.getElementById('submitBtn');
    const mobileSubmitBtn = document.getElementById('mobileSubmitBtn');
    const afterClick = document.querySelectorAll('.afterClick');
    const beforeClick = document.querySelectorAll('.beforeClick');

    window.toggleForm = function() {
        formContainer.classList.toggle('open');
    }

    window.closeForm = function() {
        formContainer.classList.remove('open');
    }

    formContainer.addEventListener('click', function(event) {
        event.stopPropagation();
    });

    document.addEventListener('click', function(event) {
        const isClickInsideFooter = mobileFooter.contains(event.target);
        const isClickInsideForm = formContainer.contains(event.target);

        if (!isClickInsideFooter && !isClickInsideForm && formContainer.classList.contains('open')) {
            closeForm();
        }
    });

    closeBtn.addEventListener('click', function() {
        closeForm();
    });

    // tel field validation for exactly 10 digits
    const telFields = document.querySelectorAll('input[type="tel"]');
    telFields.forEach(field => {
        field.addEventListener('input', function() {
            const value = field.value.replace(/\D/g, ''); // Remove non-digit characters
            field.value = value;

            if (value.length !== 10) {
                field.classList.add('error');
            } else {
                field.classList.remove('error');
            }
        });
    });

    function validateForm(name, email, tel) {
        let isValid = true;
        [name, email, tel].forEach(field => {
            if (!field.value || (field.type === 'tel' && field.value.length !== 10)) {
                field.classList.add('error');
                isValid = false;
            } else {
                field.classList.remove('error');
            }
        });
        return isValid;
    }

    function sendMail(name, email, tel) {
        const params = { name, email, tel };
        console.log(params);
        emailjs.send('service_6rodxpk', 'template_rd9ue0e', params).then(function(response) {
            console.log('SUCCESS!', response.status, response.text);
        }, function(error) {
            console.log('FAILED...', error);
        });
    }

    function handleFormSubmit(event, nameId, emailId, telId) {
        event.preventDefault();
        const name = document.getElementById(nameId);
        const email = document.getElementById(emailId);
        const tel = document.getElementById(telId);

        if (validateForm(name, email, tel)) {
            sendMail(name.value, email.value, tel.value);
            afterClick.forEach(element => element.style.display = "block");
            beforeClick.forEach(element => element.style.display = "none");
        }
    }

    desktopForm.addEventListener('submit', function(event) {
        handleFormSubmit(event, 'name', 'email', 'tel');
    });

    mobileForm.addEventListener('submit', function(event) {
        handleFormSubmit(event, 'mobileName', 'mobileEmail', 'mobileTel');
    });

    submitBtn.addEventListener('click', function() {
        desktopForm.dispatchEvent(new Event('submit'));
    });

    mobileSubmitBtn.addEventListener('click', function() {
        mobileForm.dispatchEvent(new Event('submit'));
    });
});
