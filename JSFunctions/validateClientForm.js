$(document).ready(function () {
    $('#addClientForm').on('submit', function (event) {
        event.preventDefault(); 

        if (validateClientForm()) {
            
            var formData = $(this).serialize();
            $.ajax({
                type: 'POST',
                url: $(this).attr('action'),
                data: formData,
                success: function (response) {
                  
                    $('#successMessage').hide();
                    $('#errorMessage').hide();

                 
                    $('#successMessage .message-content').text('Client added successfully!');
                    $('#successMessage').show();

                  
                    $('#addClientModal').modal('hide');

                    
                    setTimeout(function () {
                        location.reload();
                    }, 3000);
                },
                error: function () {
                   
                    $('#successMessage').hide();
                    $('#errorMessage').hide();

                    
                    $('#errorMessage .message-content').text('An error occurred while adding the client.');
                    $('#errorMessage').show();

                   
                    setTimeout(function () {
                        location.reload();
                    }, 3000);
                }
            });
        }
    });

    function validateClientForm() {
        var isValid = true;

      
        var clientName = document.getElementById('clientName');

      
        if (clientName.value.trim() === '') {
            clientName.classList.add('is-invalid');
            isValid = false;
        } else {
            clientName.classList.remove('is-invalid');
        }

        return isValid;
    }
});
