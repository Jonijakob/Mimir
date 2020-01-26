
    var Ir_value=[];
  var wifi_value=[];
  //if (typeof push_Ir_value != 'undefined') 
    Ir_value=push_Ir_value;
  //}
  //if (typeof push_wifi_value != 'undefined') {
  wifi_value=push_wifi_value;
//}
    $("div.ui-resizable-handle").remove();
    $("div.ui-resizable-n").remove();
    $(".ui-droppable").droppable({
      classes: {
        "ui-droppable-hover": "ui-state-hover"
      }});
  Ir_value.forEach(function(ir_name){
    $( "#"+ir_name+"_forms" ).draggable({ containment: "#containment-wrapper", scroll: false ,snap: true,cursor: "move",revert: "valid"}),
    $( "#"+ir_name+"_forms" ).resizable({minHeight: 118,
      minWidth: 116});
  });
  wifi_value.forEach(function(wifi_name){
    $( "#"+wifi_name+"_forms2" ).draggable({ containment: "#containment-wrapper2", scroll: false ,snap: true,cursor: "move",revert: "valid"}),  
    $( "#"+wifi_name+"_forms2" ).resizable({minHeight: 118,
      minWidth: 116});
  });
  function sumbitcommand(forms_name,warper){
    var value_input = document.getElementById(forms_name).value;
    if(value_input!=""){
      var e;
      if(forms_name=="forms" && warper=="containment-wrapper"){
        Ir_value[Ir_value.length]=value_input
        for(var i=0;i<Ir_value.length-1;i++){
          if(value_input==Ir_value[i]){
            var n=Ir_value[Ir_value.length-1].slice(Ir_value[Ir_value.length-1].length-1);
            if(isNaN(n)){
              n=0;
            }
           n++;
            Ir_value[Ir_value.length]=value_input+n;
          }
        }
        e=Ir_value[Ir_value.length-1];
      }
       if(forms_name=="forms2" && warper=="containment-wrapper2"){
         wifi_value[wifi_value.length]=value_input
        for(var i=0;i<wifi_value.length-1;i++){
          if(value_input==wifi_value[i]){
            var n=wifi_value[wifi_value.length-1].slice(wifi_value[wifi_value.length-1].length-1);
            if(isNaN(n)){
              n=0;
            }
           n++;
            wifi_value[wifi_value.length]=value_input+n;
          }
        }
        e=wifi_value[wifi_value.length-1];
      }
        
       
      
      render(warper,e,forms_name);   
       $( "#"+e+"_"+forms_name ).draggable({ containment: "#"+warper, scroll: false ,snap: true,cursor: "move",revert: "valid"});   
       $( "#"+e+"_"+forms_name ).resizable({minHeight: 118,
        minWidth: 215});
        
        

       body = $( "#"+e+"_"+forms_name ).parent().html();
       $.ajax({
       type: "POST",
       url: "http://10.0.0.23:5000/",
       data: {status:"creat",forms_id:forms_name,group_html:body,name:e} // made into a hash for retrieval
    });
              
            
    }};
  function updatepage(ir_tab,wifi_tab){
    tab_ir=$( "#"+ir_tab).html();
    tab_wifi=$( "#"+wifi_tab).html();
    $.ajax({
      type: "POST",
      url: "http://10.0.0.23:5000/",
      data: {status:"update",TAB_IR:tab_ir,TAB_WIFI:tab_wifi}
      });
     
  };
  function remove_group(remove_id,obj_name,forms_n){
      $("#"+remove_id).remove();
      tab_ir=$( "#containment-wrapper").html();
      tab_wifi=$( "#containment-wrapper2").html();
      $.ajax({
        type: "POST",
        url: "http://10.0.0.23:5000/",
        data: {status:"remove",obj_name:obj_name,forms_n:forms_n,ir_up:tab_ir, wifi_up:tab_wifi}
        });
  };

 function render(warper_name,input_value,what_form){
  $("#"+warper_name).append(
    $('<div/>')
      .attr({
        id: input_value+"_"+what_form,
        style:"position: absolute; left: 806px; top: 125px;",
        class:"ui-widget-content"})
      .append(
        $("<div/>").attr("id",input_value+"_tool_bar_"+what_form)
          .append($("<span/>").addClass("badge badge-secondary").text(input_value),
            $("<div/>").attr({
              id: input_value+"_button_group_"+what_form,
              class:"float-right btn-group btn-group-sm",
              role:"group"})
            .append(
              $("<button/>").attr({
                  id: input_value+"_button_edit"+what_form,
                  class:"btn btn-secondary",
                  type:"button"
                  }).attr("data-toggle","collapse").attr("data-target","#"+input_value+"_collapse_"+what_form).attr("aria-expandeda-","false")
                    .attr("aria-controls",input_value+"_collapse_"+what_form)
                  .append($("<i/>").addClass("fa fa-bars")),
              $("<button/>").attr({
                  id: input_value+"_button_remove"+what_form,
                  onclick:"remove_group('"+input_value+"_"+what_form+"','"+input_value+"','"+what_form+"')",
                  class:"btn btn-secondary"}).append($("<i/>").addClass("fa fa-trash")),
                  $("<div/>").attr({
                    class: "collapse",
                    id: input_value+"_collapse_"+what_form,
                    style: "width: 109px; height: 50px; padding: 0em ;margin-center: 50px;"
                  }).append($("<div/>").addClass("card card-body").attr({
                    style: "width: 108px; height: 50px; padding: 0.5em ;"
                  }).append(create_group_form(input_value,what_form,input_value+"_"+what_form,input_value+"_tool_bar_"+what_form))
                  ))
              
              

            
          )   
      )
  );
  $( "#"+input_value+"_tool_bar_"+what_form ).droppable({
    classes: {
      "ui-droppable-hover": "ui-state-hover"
    }});
 };
 function create_group_form(name,form,box,tool_bar){
  return $("<form/>").addClass("form-inline").append(
            $("<div/>").addClass(name+"group"+form+" mb-1")
            .append(
              $("<input/>").attr({
                type: "text",
                class: "form-control form-control-sm",
                id: name+"group"+form+"_input",
                style: "width: 90px; height: 30px; padding: 0.5em ;"
              }),$("<button/>").attr({
                type: "button",
                class: "btn btn-primary btn-sm mb-1",
                onclick: "create_buttons('"+box+"','"+name+"group"+form+"_input','"+tool_bar+"')"
              }).prepend("Add button")
            )

  );
 };

 function create_buttons(box_name,from_form,tool_bar){
  button_id=document.getElementById(from_form).value;
  $("#"+box_name).append($("<div/>").attr({
    id:button_id+"box",
    style: "display: inline-flex; padding: 0.5em ;border: 2px solid lightgrey; border-radius: 5px;"
  })
  .append($("<button/>").attr({
    id: button_id,
    class:"btn btn-primary btn-sm mb-1",
    type:"button"
    }).prepend(button_id).append($("<div/>").attr({
      class:"dropdown-menu dropdown-menu-sm",
      id: button_id+"menu"})
    .append($("<a/>").attr({class:"dropdown-item", herf:"#"}).prepend("edit"),$("<a/>").attr(
      {class:"dropdown-item", onclick:"delete_buttons('"+button_id+"box')"}).prepend("remove")
    ))
  )
  );
  
      $( "#"+button_id+"box" ).draggable({ containment: "#"+box_name, scroll: false ,snap: true,cursor: "move" ,revert: "valid"}); 
      $( "#"+button_id+"box" ).droppable({
        classes: {
          "ui-droppable-hover": "ui-state-hover"
        }});
        

        $("#"+button_id+"box").on('contextmenu', function(e) {
          
          $("#"+button_id+"menu").css({
            display: "block"
            
          }).addClass("show");
          return false; //blocks default Webbrowser right click menu
        }).on("click", function() {
          $("#"+button_id+"menu").removeClass("show").hide();
        });
        
        $("#"+button_id+"menu"+" a").on("click", function() {
          $(this).parent().removeClass("show").hide();
        });
};
function delete_buttons(name){
  $("#"+name).remove();

};



