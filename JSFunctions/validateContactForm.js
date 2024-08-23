$(document).ready(function () {
    $('#addContactForm').on('submit', function (event) {
        event.preventDefault(); 

        if (validateContactForm()) {
            
            var formData = $(this).serialize();
            $.ajax({
                type: 'POST',
                url: $(this).attr('action'),
                data: formData,
                success: function (response) {
                   
                    $('#successMessage').hide();
                    $('#infoMessage').hide();
                    $('#errorMessage').hide();

                 
                    $('#successMessage .message-content').text('Contact added successfully!');
                    $('#successMessage').show();

                   
                    $('#addContactModal').modal('hide');

                   
                    setTimeout(function () {
                        location.reload();
                    }, 3000);
                },
                error: function () {
                   
                    $('#successMessage').hide();
                    $('#infoMessage').hide();
                    $('#errorMessage').hide();

                  
                    $('#errorMessage .message-content').text('An error occurred while adding the contact.');
                    $('#errorMessage').show();

                   
                    setTimeout(function () {
                        location.reload();
                    }, 3000);
                }
            });
        }
    });

    function validateContactForm() {
        var isValid = true;

      
        var name = document.getElementById('contactName');
        var surname = document.getElementById('contactSurname');
        var email = document.getElementById('contactEmail');

        if (name.value.trim() === '') {
            name.classList.add('is-invalid');
            isValid = false;
        } else {
            name.classList.remove('is-invalid');
        }

        
        if (surname.value.trim() === '') {
            surname.classList.add('is-invalid');
            isValid = false;
        } else {
            surname.classList.remove('is-invalid');
        }

       
        var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email.value.trim())) {
            email.classList.add('is-invalid');
            isValid = false;
        } else {
            email.classList.remove('is-invalid');
        }

        return isValid;
    }
});
