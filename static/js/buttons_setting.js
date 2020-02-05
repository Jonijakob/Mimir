$('#button_settings').on('show.bs.modal', function (event) {
    var button = $(event.relatedTarget) // Button that triggered the modal
    var name = button.data('group_name')
    var from_where = button.data('tab_name')
    var button_id = button.data('button_name')
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
    modal.find('.modal-title').text(name+" "+button_id+" setting")
    
        
        $("#savefromoptions").click(function () {
            $.ajax({
                type: "POST",
                url: "http://10.0.0.23:5000/",
                data: {status:"save_button_value",button_id:button_id,from_where:from_where,group_name:name,button_code:document.getElementById("wifi_settings_button").value}
                });
       });
  })
  