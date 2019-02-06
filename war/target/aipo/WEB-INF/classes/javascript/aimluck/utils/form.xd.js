dojo._xdResourceLoaded({defineResource:function(A){aimluck.namespace("utils.form");
aimluck.utils.form.createSelect=function(G,C,H,I,D,B,E,F){A.xhrGet({url:H,timeout:5000,encoding:"utf-8",handleAs:"json-comment-filtered",headers:{X_REQUESTED_WITH:"XMLHttpRequest"},load:function(L,J){var K="";
if(typeof F=="undefined"){K+='<select name="'+G+'">'
}else{K+='<select name="'+G+'" '+F+"/>"
}if(typeof E=="undefined"){K+=""
}else{K+=E
}A.forEach(L,function(M){if(typeof M[I]=="undefined"||typeof M[D]=="undefined"){}else{if(M[I]==B){K+="<option value='"+M[I]+"' selected='selected'>"+M[D]+"</option>"
}else{K+="<option value='"+M[I]+"'>"+M[D]+"</option>"
}}});
K+="</select>";
A.byId(C).innerHTML=K
}})
};
aimluck.utils.form.switchDisplay=function(C,B){A.html.setDisplay(A.byId(B),"none");
A.html.setDisplay(A.byId(C),"")
}
}});