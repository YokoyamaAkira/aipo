aimluck.namespace("utils.form");
aimluck.utils.form.createSelect=function(B,H,C,D,F,E,G,A){dojo.xhrGet({url:C,timeout:5000,encoding:"utf-8",handleAs:"json-comment-filtered",headers:{X_REQUESTED_WITH:"XMLHttpRequest"},load:function(K,I){var J="";
if(typeof A=="undefined"){J+='<select name="'+B+'">'
}else{J+='<select name="'+B+'" '+A+"/>"
}if(typeof G=="undefined"){J+=""
}else{J+=G
}dojo.forEach(K,function(L){if(typeof L[D]=="undefined"||typeof L[F]=="undefined"){}else{if(L[D]==E){J+="<option value='"+L[D]+"' selected='selected'>"+L[F]+"</option>"
}else{J+="<option value='"+L[D]+"'>"+L[F]+"</option>"
}}});
J+="</select>";
dojo.byId(H).innerHTML=J
}})
};
aimluck.utils.form.switchDisplay=function(A,B){dojo.html.setDisplay(dojo.byId(B),"none");
dojo.html.setDisplay(dojo.byId(A),"")
};