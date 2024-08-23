$(document).ready(function () {
    $('#unlinkClientModal').on('show.bs.modal', function (event) {
        var button = $(event.relatedTarget); 
        var contactId = button.data('contact-id'); 
        var url = button.data('url'); 
        var modal = $(this);
        modal.find('#unlinkContactId').val(contactId); 

       
        modal.find('#unlinkClientId').empty();  

        // Use AJAX to get the linked clients
        $.ajax({
            url: url,
            type: 'GET',
            data: { contactId: contactId },
            success: function (clients) {
                console.log("Clients received:", clients); 

                if (clients && clients.length > 0) {
                    $.each(clients, function (index, client) {
                        modal.find('#unlinkClientId').append(  
                            $('<option>', {
                                value: client.Id,
                                text: client.Name
                            })
                        );
                    });
                } else {
                    console.log("No Clients linked to this Contact.");  
                }
            },
            error: function (xhr, status, error) {
                console.error("An error occurred: " + status + "\n" + error);  
            }
        });
    });

    // Handle form submission
    $('#unlinkClientForm').on('submit', function (e) {
        e.preventDefault(); 

        var form = $(this);
        var actionUrl = form.attr('action'); 
        var formData = form.serialize(); /

        $.ajax({
            url: actionUrl,
            type: 'POST',
            data: formData,
            success: function (response) {
                console.log("Response received:", response); 

               
                $('#successMessage').hide();
                $('#infoMessage').hide();
                $('#errorMessage').hide();

                if (response.success) {
                   
                    $('#successMessage .message-content').text('Client successfully unlinked.');
                    $('#successMessage').show();

                  
                    setTimeout(function () {
                        $('#successMessage').fadeOut(function () {
                            window.location.reload(); 
                        });
                    }, 3000);

                   
                    $('#unlinkClientModal').modal('hide');

                    
                } else {
                   
                    $('#errorMessage .message-content').text('Failed to unlink the client: ' + response.message);
                    $('#errorMessage').show();

                  
                    setTimeout(function () {
                        $('#errorMessage').fadeOut(function () {
                            window.location.reload(); 
                        });
                    }, 3000);
                }
            },
            error: function (xhr, status, error) {
                console.error("An error occurred: " + status + "\n" + error);
               
                $('#errorMessage .message-content').text('An error occurred while unlinking the client.');
                $('#errorMessage').show();

               
                setTimeout(function () {
                    $('#errorMessage').fadeOut(function () {
                        window.location.reload(); 
                    });
                }, 3000);
            }
        });
    });
});
