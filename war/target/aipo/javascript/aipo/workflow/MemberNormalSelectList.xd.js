dojo._xdResourceLoaded({depends:[["provide","aipo.workflow.MemberNormalSelectList"],["require","aipo.widget.MemberNormalSelectList"]],defineResource:function(B){if(!B._hasResource["aipo.workflow.MemberNormalSelectList"]){B._hasResource["aipo.workflow.MemberNormalSelectList"]=true;
B.provide("aipo.workflow.MemberNormalSelectList");
B.require("aipo.widget.MemberNormalSelectList");
B.declare("aipo.workflow.MemberNormalSelectList",[aipo.widget.MemberNormalSelectList],{addMember:function(I,M){if(document.all){var N=I.options;
var A=M.options;
if(N.length==1&&N[0].value==""){return 
}for(i=0;
i<N.length;
i++){if(!N[i].selected){continue
}var J=false;
for(j=0;
j<A.length;
j++){if(A[j].value==N[i].value){J=true;
break
}}if(J){continue
}var L=document.createElement("OPTION");
L.value=N[i].value;
L.text=N[i].text;
L.selected=true;
if(A.length==1&&A[0].value==""){A.remove(0)
}if(this.memberLimit!=0&&M.options.length>=this.memberLimit){return 
}var K=document.createElement("OPTION");
K.value=N[i].value;
K.text=(j+1)+". "+N[i].text;
K.selected=true;
A.add(K,A.length)
}}else{var N=I.options;
var A=M.options;
if(N.length==1&&N[0].value==""){return 
}for(i=0;
i<N.length;
i++){if(!N[i].selected){continue
}var J=false;
for(j=0;
j<A.length;
j++){if(A[j].value==N[i].value){J=true;
break
}}if(J){continue
}var L=document.createElement("OPTION");
L.value=N[i].value;
L.text=N[i].text;
L.selected=true;
if(M.options.length==1&&M.options[0].value==""){M.removeChild(M.options[0])
}if(this.memberLimit!=0&&M.options.length>=this.memberLimit){return 
}var K=document.createElement("OPTION");
K.value=N[i].value;
K.text=(j+1)+". "+N[i].text;
K.selected=true;
M.insertBefore(K,A[A.length])
}}},removeMemberSync:function(){var D=B.byId(this.memberToId);
if(document.all){var A=D.options;
for(i=0;
i<A.length;
i++){if(A[i].selected){A.remove(i);
i-=1;
if(i+1<A.length){for(j=i+1;
j<A.length;
j++){if(j<9){A[j].text=A[j].text.slice(3)
}else{A[j].text=A[j].text.slice(4)
}A[j].text=(j+1)+". "+A[j].text
}}}}}else{var A=D.options;
for(i=0;
i<A.length;
i++){if(A[i].selected){D.removeChild(A[i]);
i-=1;
if(i+1<A.length){for(j=i+1;
j<A.length;
j++){if(j<9){A[j].text=A[j].text.slice(3)
}else{A[j].text=A[j].text.slice(4)
}A[j].text=(j+1)+". "+A[j].text
}}}}}}})
}}});