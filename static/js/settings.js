
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
        
       
      $("#"+warper).append(
        $('<div/>')
          .attr("id", e+"_"+forms_name)
          .attr("style","position: absolute; left: 955px; top: 124px;")
          .addClass("ui-widget-content")
          .append($("<div/>").attr("id",e+"_tool_bar_"+forms_name)
              .append($("<div/>").attr("id",e+"_button_group_"+forms_name).addClass("float-right btn-group btn-group-sm").attr("role","group")
                .append($("<button/>").attr("id",e+"_button_edit"+forms_name).addClass("btn btn-secondary")
                  .append($("<i/>").addClass("fa fa-bars")),
                $("<button/>").attr("onclick","remove_group('"+e+"_"+forms_name+"','"+e+"','"+forms_name+"')").attr("id",e+"_button_remove"+forms_name).addClass("btn btn-secondary")
                  .append($("<i/>").addClass("fa fa-trash"))),
              
                $("<span/>").addClass("badge badge-secondary").text(e)
                
              )   
          )
      );
              
       $( "#"+e+"_"+forms_name ).draggable({ containment: "#"+warper, scroll: false ,snap: true,cursor: "move" });   
       $( "#"+e+"_"+forms_name ).resizable({minHeight: 118,
        minWidth: 116});
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

 /* $('#add').click(function() {
    myhtml = $("#containment-wrapper").html();
    $.ajax({
        type: "POST",
        url: "http://10.0.0.23:5000/",
        data: {html:myhtml} // made into a hash for retrieval
    });
    
});*/

