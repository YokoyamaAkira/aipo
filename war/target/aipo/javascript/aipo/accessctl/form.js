dojo.provide("aipo.accessctl");
dojo.require("aipo.widget.MemberNormalSelectList");
aipo.accessctl.onLoadAccessctlDialog=function(L){var J=dojo.byId("acl_role_name");
if(J){J.focus()
}var N=dijit.byId("membernormalselect");
if(N){var I=dojo.byId("init_memberlist");
var M;
var O=I.options;
if(O.length==1&&O[0].value==""){return 
}for(M=0;
M<O.length;
M++){N.addOptionSync(O[M].value,O[M].text,true)
}}var P=dojo.byId("urlacls"+L).value;
var K=dojo.byId("initfeature"+L).value;
aipo.accessctl.changeAcls(L,P,K)
};
aipo.accessctl.onReceiveMessage=function(D){if(!D){var C=dijit.byId("modalDialog");
if(C){C.hide()
}aipo.portletReload("accessctl")
}if(dojo.byId("messageDiv")){dojo.byId("messageDiv").innerHTML=D
}};
aipo.accessctl.changeAcls=function(F,D,E){aipo.accessctl.createCheckbox(F,"acls","aclsDiv",D+"?featureid="+E,"aclId","aclName","checked")
};
aipo.accessctl.createCheckbox=function(K,H,I,N,M,J,L){dojo.xhrGet({url:N,timeout:5000,encoding:"utf-8",handleAs:"json-comment-filtered",headers:{X_REQUESTED_WITH:"XMLHttpRequest"},load:function(A,C){var B="";
dojo.forEach(A,function(D){if(typeof D[M]=="undefined"||typeof D[J]=="undefined"){}else{if(D[L]=="true"){B+="<input name='"+D[M]+"' id='"+D[M]+"' type='checkbox' value='1' checked='checked'/><label for='"+D[M]+"'>&nbsp;"+D[J]+"</label>"
}else{B+="<input name='"+D[M]+"' id='"+D[M]+"' type='checkbox' value='1'/><label for='"+D[M]+"'>&nbsp;"+D[J]+"</label>"
}B+="&nbsp;"
}});
dojo.byId(I).innerHTML=B;
aipo.accessctl.setupAcl(K,"acllist");
aipo.accessctl.setupAcl(K,"acldetail");
aipo.accessctl.setupAcl(K,"aclinsert");
aipo.accessctl.setupAcl(K,"aclupdate");
aipo.accessctl.setupAcl(K,"acldelete");
aipo.accessctl.setupAcl(K,"aclexport")
}})
};
aipo.accessctl.setupAcl=function(F,D){var E=dojo.byId("init"+D+F);
if(E&&E.value=="checked"){dojo.byId(D).checked=true
}};
aipo.accessctl.submitList=function(B){submit_member(B.ac_users);
submit_member(B.ac_admins);
submit_member(B.ac_guests)
};
aipo.accessctl.changeACL=function(M,J,L){var O=M.elements[J].options;
var Q=M.elements[L].options;
var K=0;
for(K=0;
K<O.length-1;
K++){var N=O[K];
if(!N.selected||!N.text){continue
}var R=false;
var P=Q.length-1;
for(j=0;
j<P;
j++){if(Q[j].text==N.text){R=true;
break
}}if(R){continue
}aipo.accessctl.addOption(Q,N.text,N.value,P)
}};
aipo.accessctl.removeList=function(F,E){var D=F.elements[E].options;
for(i=0;
i<D.length-1;
i++){if(D[i].selected){D[i]=null;
i-=1
}}};
aipo.accessctl.addOption=function(L,I,K,H){var G=L.length;
if(H<0){H=G
}var J=new Option();
L[G]=J;
for(i=G;
i>H;
i--){L[i].text=L[i-1].text
}L[H].text=I;
L[H].value=K;
L[H].selected=true
};