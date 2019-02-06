aimluck.namespace("utils.form");
aimluck.utils.form.createSelect=function(E,C,F,G,A,H,B,D){dojo.xhrGet({url:F,timeout:5000,encoding:"utf-8",handleAs:"json-comment-filtered",headers:{X_REQUESTED_WITH:"XMLHttpRequest"},load:function(I,J){var K="";
if(typeof D=="undefined"){K+='<select name="'+E+'">'
}else{K+='<select name="'+E+'" '+D+"/>"
}if(typeof B=="undefined"){K+=""
}else{K+=B
}dojo.forEach(I,function(L){if(typeof L[G]=="undefined"||typeof L[A]=="undefined"){}else{if(L[G]==H){K+="<option value='"+L[G]+"' selected='selected'>"+L[A]+"</option>"
}else{K+="<option value='"+L[G]+"'>"+L[A]+"</option>"
}}});
K+="</select>";
dojo.byId(C).innerHTML=K
}})
};
aimluck.utils.form.switchDisplay=function(B,A){dojo.html.setDisplay(dojo.byId(A),"none");
dojo.html.setDisplay(dojo.byId(B),"")
};