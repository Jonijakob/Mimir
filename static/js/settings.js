 
    var Ir_value=[];
  var wifi_value=[];
  
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
                        set_class.value ="draggable ui-widget-content";
                        div.setAttribute("id",e+"_"+forms_name);
                        div.setAttribute("name",e+"_"+forms_name);
                        div.setAttributeNode(set_class);
                        div.setAttribute("style","position: absolute; left: 955px; top: 124px;");
                        document.getElementById(warper).appendChild(div);
       var p = document.createElement("p");                 
                  p.innerHTML=e; 
                  document.getElementById(e+"_"+forms_name).appendChild(p);
            
            $( "#"+e+"_"+forms_name ).draggable({ containment: "#"+warper, scroll: false ,snap: true,cursor: "move" });   
            $( "#"+e+"_"+forms_name ).resizable();
            body = $( "#"+e+"_"+forms_name ).parent().html();
            $.ajax({
            type: "POST",
            url: "http://10.0.0.23:5000/",
            data: {forms_id:forms_name,group_html:body,name:e} // made into a hash for retrieval
    });
              
            
  }};

 /* $('#add').click(function() {
    myhtml = $("#containment-wrapper").html();
    $.ajax({
        type: "POST",
        url: "http://10.0.0.23:5000/",
        data: {html:myhtml} // made into a hash for retrieval
    });
    
});*/

