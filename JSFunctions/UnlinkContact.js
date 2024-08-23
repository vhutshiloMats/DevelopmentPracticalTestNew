$(document).ready(function () {
    $('#unlinkContactModal').on('show.bs.modal', function (event) {
        var button = $(event.relatedTarget); 
        var clientId = button.data('client-id'); 
        var url = button.data('url'); 
        var modal = $(this);
        modal.find('#unlinkClientId').val(clientId); 

      
        modal.find('#unlinkContactId').empty(); 

        // Use AJAX to get the linked contacts
        $.ajax({
            url: url,
            type: 'GET',
            data: { clientId: clientId },
            success: function (contacts) {
                console.log("Contacts received:", contacts); 

                if (contacts && contacts.length > 0) {
                    $.each(contacts, function (index, contact) {
                        modal.find('#unlinkContactId').append(  
                            $('<option>', {
                                value: contact.Id,
                                text: contact.Name + ' ' + contact.Surname
                            })
                        );
                    });
                } else {
                    console.log("No contacts linked to this client.");  
                }
            },
            error: function (xhr, status, error) {
                console.error("An error occurred: " + status + "\n" + error);  

                $('#errorMessage .message-content').text('An error occurred while fetching linked contacts.');
                $('#errorMessage').show();

                
                setTimeout(function () {
                    location.reload();
                }, 3000);
            }
        });
    });

    
    $('#unlinkContactForm').on('submit', function (e) {
        e.preventDefault(); 

        var form = $(this);
        var actionUrl = form.attr('action'); 
        var formData = form.serialize(); 

        $.ajax({
            url: actionUrl,
            type: 'POST',
            data: formData,
            success: function (response) {
                $('#successMessage').hide();
                $('#infoMessage').hide();
                $('#errorMessage').hide();

                if (response.success) {
                    
                    $('#unlinkContactModal').modal('hide');

                    $('#successMessage .message-content').text('Contact successfully unlinked.');
                    $('#successMessage').show();

                   
                    setTimeout(function () {
                        location.reload();
                    }, 3000);
                } else {
                    $('#errorMessage .message-content').text('Failed to unlink the contact: ' + response.message);
                    $('#errorMessage').show();

                    
                    setTimeout(function () {
                        location.reload();
                    }, 3000);
                }
            },
            error: function (xhr, status, error) {
                console.error("An error occurred: " + status + "\n" + error);

                $('#errorMessage .message-content').text('An error occurred while unlinking the contact.');
                $('#errorMessage').show();

               
                setTimeout(function () {
                    location.reload();
                }, 3000);
            }
        });
    });
});
