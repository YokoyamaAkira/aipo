dojo.provide("aipo.workflow.MemberNormalSelectList");
dojo.require("aipo.widget.MemberNormalSelectList");
dojo.declare("aipo.workflow.MemberNormalSelectList",[aipo.widget.MemberNormalSelectList],{addMember:function(J,N){if(document.all){var H=J.options;
var I=N.options;
if(H.length==1&&H[0].value==""){return 
}for(i=0;
i<H.length;
i++){if(!H[i].selected){continue
}var K=false;
for(j=0;
j<I.length;
j++){if(I[j].value==H[i].value){K=true;
break
}}if(K){continue
}var M=document.createElement("OPTION");
M.value=H[i].value;
M.text=H[i].text;
M.selected=true;
if(I.length==1&&I[0].value==""){I.remove(0)
}if(this.memberLimit!=0&&N.options.length>=this.memberLimit){return 
}var L=document.createElement("OPTION");
L.value=H[i].value;
L.text=(j+1)+". "+H[i].text;
L.selected=true;
I.add(L,I.length)
}}else{var H=J.options;
var I=N.options;
if(H.length==1&&H[0].value==""){return 
}for(i=0;
i<H.length;
i++){if(!H[i].selected){continue
}var K=false;
for(j=0;
j<I.length;
j++){if(I[j].value==H[i].value){K=true;
break
}}if(K){continue
}var M=document.createElement("OPTION");
M.value=H[i].value;
M.text=H[i].text;
M.selected=true;
if(N.options.length==1&&N.options[0].value==""){N.removeChild(N.options[0])
}if(this.memberLimit!=0&&N.options.length>=this.memberLimit){return 
}var L=document.createElement("OPTION");
L.value=H[i].value;
L.text=(j+1)+". "+H[i].text;
L.selected=true;
N.insertBefore(L,I[I.length])
}}},removeMemberSync:function(){var C=dojo.byId(this.memberToId);
if(document.all){var D=C.options;
for(i=0;
i<D.length;
i++){if(D[i].selected){D.remove(i);
i-=1;
if(i+1<D.length){for(j=i+1;
j<D.length;
j++){if(j<9){D[j].text=D[j].text.slice(3)
}else{D[j].text=D[j].text.slice(4)
}D[j].text=(j+1)+". "+D[j].text
}}}}}else{var D=C.options;
for(i=0;
i<D.length;
i++){if(D[i].selected){C.removeChild(D[i]);
i-=1;
if(i+1<D.length){for(j=i+1;
j<D.length;
j++){if(j<9){D[j].text=D[j].text.slice(3)
}else{D[j].text=D[j].text.slice(4)
}D[j].text=(j+1)+". "+D[j].text
}}}}}}});