$('#button_settings').on('show.bs.modal', function (event) {
    var button = $(event.relatedTarget) // Button that triggered the modal
    var name = button.data('whatever')
    var from_where = button.data('key')
    var ir_button_set = document.getElementById("ir_button_set_input")
    var wifi_button_set = document.getElementById("wifi_button_set_input")
     // Extract info from data-* attributes
    // If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
    // Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.
    if(from_where == "forms"){
        ir_button_set.style.display = "block";
        wifi_button_set.style.display = "none";
    }
    else if(from_where == "forms2"){
        ir_button_set.style.display = "none";
        wifi_button_set.style.display = "block";
    }
    var modal = $(this)
    modal.find('.modal-title').text(name)
  })
  