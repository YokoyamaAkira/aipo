dojo._xdResourceLoaded({depends:[["provide","aipo.workflow.MemberNormalSelectList"],["require","aipo.widget.MemberNormalSelectList"]],defineResource:function(A){if(!A._hasResource["aipo.workflow.MemberNormalSelectList"]){A._hasResource["aipo.workflow.MemberNormalSelectList"]=true;
A.provide("aipo.workflow.MemberNormalSelectList");
A.require("aipo.widget.MemberNormalSelectList");
A.declare("aipo.workflow.MemberNormalSelectList",[aipo.widget.MemberNormalSelectList],{addMember:function(G,C){if(document.all){var B=G.options;
var H=C.options;
if(B.length==1&&B[0].value==""){return 
}for(i=0;
i<B.length;
i++){if(!B[i].selected){continue
}var F=false;
for(j=0;
j<H.length;
j++){if(H[j].value==B[i].value){F=true;
break
}}if(F){continue
}var D=document.createElement("OPTION");
D.value=B[i].value;
D.text=B[i].text;
D.selected=true;
if(H.length==1&&H[0].value==""){H.remove(0)
}if(this.memberLimit!=0&&C.options.length>=this.memberLimit){return 
}var E=document.createElement("OPTION");
E.value=B[i].value;
E.text=(j+1)+". "+B[i].text;
E.selected=true;
H.add(E,H.length)
}}else{var B=G.options;
var H=C.options;
if(B.length==1&&B[0].value==""){return 
}for(i=0;
i<B.length;
i++){if(!B[i].selected){continue
}var F=false;
for(j=0;
j<H.length;
j++){if(H[j].value==B[i].value){F=true;
break
}}if(F){continue
}var D=document.createElement("OPTION");
D.value=B[i].value;
D.text=B[i].text;
D.selected=true;
if(C.options.length==1&&C.options[0].value==""){C.removeChild(C.options[0])
}if(this.memberLimit!=0&&C.options.length>=this.memberLimit){return 
}var E=document.createElement("OPTION");
E.value=B[i].value;
E.text=(j+1)+". "+B[i].text;
E.selected=true;
C.insertBefore(E,H[H.length])
}}},removeMemberSync:function(){var B=A.byId(this.memberToId);
if(document.all){var C=B.options;
for(i=0;
i<C.length;
i++){if(C[i].selected){C.remove(i);
i-=1;
if(i+1<C.length){for(j=i+1;
j<C.length;
j++){if(j<9){C[j].text=C[j].text.slice(3)
}else{C[j].text=C[j].text.slice(4)
}C[j].text=(j+1)+". "+C[j].text
}}}}}else{var C=B.options;
for(i=0;
i<C.length;
i++){if(C[i].selected){B.removeChild(C[i]);
i-=1;
if(i+1<C.length){for(j=i+1;
j<C.length;
j++){if(j<9){C[j].text=C[j].text.slice(3)
}else{C[j].text=C[j].text.slice(4)
}C[j].text=(j+1)+". "+C[j].text
}}}}}}})
}}});