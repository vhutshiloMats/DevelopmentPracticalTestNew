$(document).ready(function () {
    $('#linkClientModal').on('show.bs.modal', function (event) {
        var button = $(event.relatedTarget);
        var contactId = button.data('contact-id');
        var url = button.data('url');
        var modal = $(this);
        modal.find('#contactId').val(contactId);

        modal.find('#clientId').empty();

        $.ajax({
            url: url,
            type: 'GET',
            success: function (clients) {
                if (clients && clients.length > 0) {
                    $.each(clients, function (index, client) {
                        modal.find('#clientId').append(
                            $('<option>', {
                                value: client.Id,
                                text: client.Name
                            })
                        );
                    });
                } else {
                    console.log("No clients available.");
                }
            },
            error: function (xhr, status, error) {
                console.error("An error occurred while fetching clients: " + status + "\n" + error);
                $('#errorMessage .message-content').text('An error occurred while fetching clients.');
                $('#errorMessage').show();

             
                setTimeout(function () {
                    location.reload();
                }, 3000);
            }
        });
    });

    $('#linkClientForm').on('submit', function (e) {
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
                    $('#successMessage .message-content').text(response.message);
                    $('#successMessage').show();

                    $('#linkClientModal').modal('hide');

                  
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
                $('#errorMessage .message-content').text('An error occurred while linking the client.');
                $('#errorMessage').show();

                setTimeout(function () {
                    location.reload();
                }, 3000);
            }
        });
    });
});
