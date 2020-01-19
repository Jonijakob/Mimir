
    var Ir_value=[];
  var wifi_value=[];
  //if (typeof push_Ir_value != 'undefined') {
    Ir_value=push_Ir_value;
  //}
  //if (typeof push_wifi_value != 'undefined') {
  wifi_value=push_wifi_value;
//}
    $("div.ui-resizable-handle").remove(),
    $("div.ui-resizable-n").remove(),
  Ir_value.forEach(function(ir_name){
    $( "#"+ir_name+"_forms" ).draggable({ containment: "#containment-wrapper", scroll: false ,snap: true,cursor: "move" }),
    $( "#"+ir_name+"_forms" ).resizable();
  });
  wifi_value.forEach(function(wifi_name){
    $( "#"+wifi_name+"_forms2" ).draggable({ containment: "#containment-wrapper2", scroll: false ,snap: true,cursor: "move" }),  
    $( "#"+wifi_name+"_forms2" ).resizable();
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
        
        var div = document.createElement("div");
                        var set_class = document.createAttribute("class");
                        set_class.value ="ui-widget-content";
                        div.setAttribute("id",e+"_"+forms_name);
                        div.setAttribute("name",e+"_"+forms_name);
                        div.setAttributeNode(set_class);
                        div.setAttribute("style","position: absolute; left: 955px; top: 124px;");
                        document.getElementById(warper).appendChild(div);
                        var set_class2 = document.createAttribute("class");
                        set_class2.value ="ui-resizable";
                       
       var p = document.createElement("p");
       p.setAttributeNode(set_class2);               
                  p.innerHTML=e; 
                  document.getElementById(e+"_"+forms_name).appendChild(p);
            
            $( "#"+e+"_"+forms_name ).draggable({ containment: "#"+warper, scroll: false ,snap: true,cursor: "move" });   
            $( "#"+e+"_"+forms_name ).resizable();
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

 /* $('#add').click(function() {
    myhtml = $("#containment-wrapper").html();
    $.ajax({
        type: "POST",
        url: "http://10.0.0.23:5000/",
        data: {html:myhtml} // made into a hash for retrieval
    });
    
});*/

