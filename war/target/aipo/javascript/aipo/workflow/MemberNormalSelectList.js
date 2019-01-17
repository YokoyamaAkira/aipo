dojo.provide("aipo.workflow.MemberNormalSelectList");
dojo.require("aipo.widget.MemberNormalSelectList");
dojo.declare("aipo.workflow.MemberNormalSelectList",[aipo.widget.MemberNormalSelectList],{addMember:function(F,B){if(document.all){var A=F.options;
var G=B.options;
if(A.length==1&&A[0].value==""){return 
}for(i=0;
i<A.length;
i++){if(!A[i].selected){continue
}var E=false;
for(j=0;
j<G.length;
j++){if(G[j].value==A[i].value){E=true;
break
}}if(E){continue
}var C=document.createElement("OPTION");
C.value=A[i].value;
C.text=A[i].text;
C.selected=true;
if(G.length==1&&G[0].value==""){G.remove(0)
}if(this.memberLimit!=0&&B.options.length>=this.memberLimit){return 
}var D=document.createElement("OPTION");
D.value=A[i].value;
D.text=(j+1)+". "+A[i].text;
D.selected=true;
G.add(D,G.length)
}}else{var A=F.options;
var G=B.options;
if(A.length==1&&A[0].value==""){return 
}for(i=0;
i<A.length;
i++){if(!A[i].selected){continue
}var E=false;
for(j=0;
j<G.length;
j++){if(G[j].value==A[i].value){E=true;
break
}}if(E){continue
}var C=document.createElement("OPTION");
C.value=A[i].value;
C.text=A[i].text;
C.selected=true;
if(B.options.length==1&&B.options[0].value==""){B.removeChild(B.options[0])
}if(this.memberLimit!=0&&B.options.length>=this.memberLimit){return 
}var D=document.createElement("OPTION");
D.value=A[i].value;
D.text=(j+1)+". "+A[i].text;
D.selected=true;
B.insertBefore(D,G[G.length])
}}},removeMemberSync:function(){var A=dojo.byId(this.memberToId);
if(document.all){var B=A.options;
for(i=0;
i<B.length;
i++){if(B[i].selected){B.remove(i);
i-=1;
if(i+1<B.length){for(j=i+1;
j<B.length;
j++){if(j<9){B[j].text=B[j].text.slice(3)
}else{B[j].text=B[j].text.slice(4)
}B[j].text=(j+1)+". "+B[j].text
}}}}}else{var B=A.options;
for(i=0;
i<B.length;
i++){if(B[i].selected){A.removeChild(B[i]);
i-=1;
if(i+1<B.length){for(j=i+1;
j<B.length;
j++){if(j<9){B[j].text=B[j].text.slice(3)
}else{B[j].text=B[j].text.slice(4)
}B[j].text=(j+1)+". "+B[j].text
}}}}}}});