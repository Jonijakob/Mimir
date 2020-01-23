
    var Ir_value=[];
  var wifi_value=[];
  //if (typeof push_Ir_value != 'undefined') 
    Ir_value=push_Ir_value;
  //}
  //if (typeof push_wifi_value != 'undefined') {
  wifi_value=push_wifi_value;
//}
    $("div.ui-resizable-handle").remove(),
    $("div.ui-resizable-n").remove(),
  Ir_value.forEach(function(ir_name){
    $( "#"+ir_name+"_forms" ).draggable({ containment: "#containment-wrapper", scroll: false ,snap: true,cursor: "move" }),
    $( "#"+ir_name+"_forms" ).resizable({minHeight: 118,
      minWidth: 116});
  });
  wifi_value.forEach(function(wifi_name){
    $( "#"+wifi_name+"_forms2" ).draggable({ containment: "#containment-wrapper2", scroll: false ,snap: true,cursor: "move" }),  
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
       $( "#"+e+"_"+forms_name ).draggable({ containment: "#"+warper, scroll: false ,snap: true,cursor: "move" });   
       $( "#"+e+"_"+forms_name ).resizable({minHeight: 118,
        minWidth: 116});
        
/*
       body = $( "#"+e+"_"+forms_name ).parent().html();
       $.ajax({
       type: "POST",
       url: "http://10.0.0.23:5000/",
       data: {status:"creat",forms_id:forms_name,group_html:body,name:e} // made into a hash for retrieval
    });*/
              
            
    }};
 /* function updatepage(ir_tab,wifi_tab){
    tab_ir=$( "#"+ir_tab).html();
    tab_wifi=$( "#"+wifi_tab).html();
    $.ajax({
      type: "POST",
      url: "http://10.0.0.23:5000/",
      data: {status:"update",TAB_IR:tab_ir,TAB_WIFI:tab_wifi}
      });
     
  };*/
 /* function remove_group(remove_id,obj_name,forms_n){
      $("#"+remove_id).remove();
      tab_ir=$( "#containment-wrapper").html();
      tab_wifi=$( "#containment-wrapper2").html();
      $.ajax({
        type: "POST",
        url: "http://10.0.0.23:5000/",
        data: {status:"remove",obj_name:obj_name,forms_n:forms_n,ir_up:tab_ir, wifi_up:tab_wifi}
        });
  };*/

 function render(warper_name,input_value,what_form){
  $("#"+warper_name).append(
    $('<div/>')
      .attr({
        id: input_value+"_"+what_form,
        style:"position: absolute; left: 955px; top: 124px;",
        class:"ui-widget-content"})
      .append(
        $("<div/>").attr("id",input_value+"_tool_bar_"+what_form)
          .append(
            $("<div/>").attr({
              id: input_value+"_button_group_"+what_form,
              class:"float-right btn-group btn-group-sm",
              role:"group"})
            .append(
              $("<button/>").attr({
                  id: input_value+"_button_edit"+what_form,
                  class:"btn btn-primary",
                  type:"button"
                  }).attr("data-toggle","collapse").attr("data-target","#"+input_value+"_collapse_"+what_form).attr("aria-expandeda-","false")
                    .attr("aria-controls",input_value+"_collapse_"+what_form)
                  .append($("<i/>").addClass("fa fa-bars")),
              $("<button/>").attr({
                  id: input_value+"_button_remove"+what_form,
                  onclick:"remove_group('"+input_value+"_"+what_form+"','"+input_value+"','"+what_form+"')",
                  class:"btn btn-secondary"}).append($("<i/>").addClass("fa fa-trash"))),
              $("<span/>").addClass("badge badge-secondary").text(input_value),
              $("<div/>").attr({
                class: "collapse",
                id: input_value+"_collapse_"+what_form
              }).append($("<div/>").addClass("card card-body").append(create_group_form(input_value,what_form,input_value+"_tool_bar_"+what_form))
              )

            
          )   
      )
  );
 };
 function create_group_form(name,form,box){
  return $("<form/>").addClass("form-inline").append(
            $("<div/>").addClass(name+"group"+form+" mb-2").append(
              $("<input/>").attr({
                type: "text",
                class: "form-control",
                id: name+"group"+form+"_input"
              }),$("<button/>").attr({
                type: "button",
                class: "btn btn-primary mb-2",
                text: "Add button",
                onclick: "create_buttons('"+box+"','"+name+"group"+form+"_input')"
              })
            )

  );
 };

 function create_buttons(box_name,from_form){
  button_id=document.getElementById(from_form).value;
  $("#"+box_name).append($("<div/>").attr({
    id:button_id+"box",
    style: "width: 50px; height: 50px; padding: 0.5em ;border: 2px solid lightgrey; border-radius: 5px;"
  })
  .append($("<button/>").attr({
    id: button_id,
    class:"btn btn-primary",
    type:"button",
    text:button_id
    })
  )
  );
      $( "#"+button_id+"box" ).draggable({ containment: "#"+box_name, scroll: false ,snap: true,cursor: "move" });   
};

