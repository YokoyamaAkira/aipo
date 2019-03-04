dojo.provide("aipo.accessctl");
dojo.require("aipo.widget.MemberNormalSelectList");
aipo.accessctl.onLoadAccessctlDialog=function(F){var H=dojo.byId("acl_role_name");
if(H){H.focus()
}var D=dijit.byId("membernormalselect");
if(D){var A=dojo.byId("init_memberlist");
var E;
var C=A.options;
if(C.length==1&&C[0].value==""){return 
}for(E=0;
E<C.length;
E++){D.addOptionSync(C[E].value,C[E].text,true)
}}var B=dojo.byId("urlacls"+F).value;
var G=dojo.byId("initfeature"+F).value;
aipo.accessctl.changeAcls(F,B,G)
};
aipo.accessctl.onReceiveMessage=function(B){if(!B){var A=dijit.byId("modalDialog");
if(A){A.hide()
}aipo.portletReload("accessctl")
}if(dojo.byId("messageDiv")){dojo.byId("messageDiv").innerHTML=B
}};
aipo.accessctl.changeAcls=function(B,A,C){aipo.accessctl.createCheckbox(B,"acls","aclsDiv",A+"?featureid="+C,"aclId","aclName","checked")
};
aipo.accessctl.createCheckbox=function(E,A,G,B,C,F,D){dojo.xhrGet({url:B,timeout:5000,encoding:"utf-8",handleAs:"json-comment-filtered",headers:{X_REQUESTED_WITH:"XMLHttpRequest"},load:function(J,H){var I="";
dojo.forEach(J,function(K){if(typeof K[C]=="undefined"||typeof K[F]=="undefined"){}else{if(K[D]=="true"){I+="<input name='"+K[C]+"' id='"+K[C]+"' type='checkbox' value='1' checked='checked'/><label for='"+K[C]+"'>&nbsp;"+K[F]+"</label>"
}else{I+="<input name='"+K[C]+"' id='"+K[C]+"' type='checkbox' value='1'/><label for='"+K[C]+"'>&nbsp;"+K[F]+"</label>"
}I+="&nbsp;"
}});
dojo.byId(G).innerHTML=I;
aipo.accessctl.setupAcl(E,"acllist");
aipo.accessctl.setupAcl(E,"acldetail");
aipo.accessctl.setupAcl(E,"aclinsert");
aipo.accessctl.setupAcl(E,"aclupdate");
aipo.accessctl.setupAcl(E,"acldelete");
aipo.accessctl.setupAcl(E,"aclexport")
}})
};
aipo.accessctl.setupAcl=function(B,A){var C=dojo.byId("init"+A+B);
if(C&&C.value=="checked"){dojo.byId(A).checked=true
}};
aipo.accessctl.submitList=function(A){submit_member(A.ac_users);
submit_member(A.ac_admins);
submit_member(A.ac_guests)
};
aipo.accessctl.changeACL=function(A,D,B){var H=A.elements[D].options;
var F=A.elements[B].options;
var C=0;
for(C=0;
C<H.length-1;
C++){var I=H[C];
if(!I.selected||!I.text){continue
}var E=false;
var G=F.length-1;
for(j=0;
j<G;
j++){if(F[j].text==I.text){E=true;
break
}}if(E){continue
}aipo.accessctl.addOption(F,I.text,I.value,G)
}};
aipo.accessctl.removeList=function(B,C){var A=B.elements[C].options;
for(i=0;
i<A.length-1;
i++){if(A[i].selected){A[i]=null;
i-=1
}}};
aipo.accessctl.addOption=function(B,E,C,F){var A=B.length;
if(F<0){F=A
}var D=new Option();
B[A]=D;
for(i=A;
i>F;
i--){B[i].text=B[i-1].text
}B[F].text=E;
B[F].value=C;
B[F].selected=true
};