$(document).ready(function () {
   
    $('#linkContactModal').on('show.bs.modal', function (event) {
        var button = $(event.relatedTarget); 
        var clientId = button.data('client-id'); 
        var url = button.data('url'); 
        var modal = $(this);

      
        modal.find('#clientId').val(clientId);

    
        modal.find('#contactId').empty();

        // AJAX request to get the contacts linked to the client
        $.ajax({
            url: url,
            type: 'GET',
            success: function (contacts) {
                if (contacts && contacts.length > 0) {
                    $.each(contacts, function (index, contact) {
                        modal.find('#contactId').append(
                            $('<option>', {
                                value: contact.Id,
                                text: contact.Name
                            })
                        );
                    });
                } else {
                    console.log("No contacts available.");
                }
            },
            error: function (xhr, status, error) {
                console.error("An error occurred while fetching contacts: " + status + "\n" + error);
                $('#errorMessage .message-content').text('An error occurred while fetching contacts.');
                $('#errorMessage').show();

             
                setTimeout(function () {
                    location.reload();
                }, 3000);
            }
        });
    });

    // When the 'Link Contact' form is submitted
    $('#linkContactForm').on('submit', function (e) {
        e.preventDefault(); 

        var form = $(this);
        var actionUrl = form.attr('action'); 
        var formData = form.serialize(); 

        // AJAX request to submit the form data
        $.ajax({
            url: actionUrl,
            type: 'POST',
            data: formData,
            success: function (response) {
              
                $('#successMessage').hide();
                $('#infoMessage').hide();
                $('#errorMessage').hide();

                if (response.success) {
                    
                    $('#successMessage .message-content').text(response.message);
                    $('#successMessage').show();
                    $('#linkContactModal').modal('hide');

                   
                    setTimeout(function () {
                        location.reload();
                    }, 3000);
                } else {
                    
                    $('#errorMessage .message-content').text(response.message);
                    $('#errorMessage').show();

                  
                    setTimeout(function () {
                        location.reload();
                    }, 3000);
                }
            },
            error: function (xhr, status, error) {
                console.error("An error occurred: " + status + "\n" + error);
                $('#errorMessage .message-content').text('An error occurred while linking the contact.');
                $('#errorMessage').show();

               
                setTimeout(function () {
                    location.reload();
                }, 3000);
            }
        });
    });
});
