dojo._xdResourceLoaded({defineResource:function(A){aimluck.namespace("utils.form");
aimluck.utils.form.createSelect=function(C,I,D,E,G,F,H,B){A.xhrGet({url:D,timeout:5000,encoding:"utf-8",handleAs:"json-comment-filtered",headers:{X_REQUESTED_WITH:"XMLHttpRequest"},load:function(L,J){var K="";
if(typeof B=="undefined"){K+='<select name="'+C+'">'
}else{K+='<select name="'+C+'" '+B+"/>"
}if(typeof H=="undefined"){K+=""
}else{K+=H
}A.forEach(L,function(M){if(typeof M[E]=="undefined"||typeof M[G]=="undefined"){}else{if(M[E]==F){K+="<option value='"+M[E]+"' selected='selected'>"+M[G]+"</option>"
}else{K+="<option value='"+M[E]+"'>"+M[G]+"</option>"
}}});
K+="</select>";
A.byId(I).innerHTML=K
}})
};
aimluck.utils.form.switchDisplay=function(B,C){A.html.setDisplay(A.byId(C),"none");
A.html.setDisplay(A.byId(B),"")
}
}});