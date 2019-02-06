dojo._xdResourceLoaded({depends:[["provide","aipo.widget.MemberAclSelectList"]],defineResource:function(B){if(!B._hasResource["aipo.widget.MemberAclSelectList"]){B._hasResource["aipo.widget.MemberAclSelectList"]=true;
B.provide("aipo.widget.MemberAclSelectList");
B.require("dijit._Widget");
B.require("dijit._Templated");
B.declare("aipo.widget.MemberAclSelectList",[dijit._Widget,dijit._Templated],{widgetId:"",memberFromId:"",memberFromUrl:"",memberFromOptionKey:"",memberFromOptionValue:"",memberToTitle:"",memberToId:"",buttonAddId:"",buttonRemoveId:"",memberLimit:0,groupSelectId:"",groupSelectPreOptionKey:"",groupSelectPreOptionValue:"",groupSelectOptionKey:"",groupSelectOptionValue:"",memberGroupUrl:"",changeGroupUrl:"",memberValuesStr:"",memberValues:[],templateString:'<div id="${widgetId}" widgetId="${widgetId}"><table class="none wide mb15"><tbody><tr><td valign="top"><table class="auiRowTable wide mb5"><tbody name="${memberToId}" id="${memberToId}"><tr><th class="thin"><input type="checkbox" onclick="aimluck.io.switchCheckbox(this);"/></th><th class="w50">\u540D\u524D</th><th nowrap="nowrap">\u6A29\u9650</th></tr></tbody></table><input type="button" class="button" value="\u3000\u524A\u9664\u3000" dojoAttachEvent="onclick:onMemberRemoveClick"/></td><td class="thin" valign="top"><select style="width:140px" name="${groupSelectId}" id="${groupSelectId}" dojoAttachEvent="onchange:changeGroup"></select>\n<select size="8" multiple="multiple" style="width:140px" class="mb5" name="${memberFromId}" id="${memberFromId}"></select>\n<input type="button" class="button" value="\u3000\uFF1C \u8FFD\u52A0\u3000" dojoAttachEvent="onclick:onMemberAddClick"/></td></tr></tbody></table></div>\n',postCreate:function(){this.id=this.widgetId;
this.memberValues=[];
var I=this.memberValuesStr.split(",");
for(var G=0;
G<I.length;
G++){var J=I[G].split(":");
var H={};
H.key=J[0];
H.value=J[1];
this.memberValues.push(H)
}var A={url:this.memberFromUrl,key:this.memberFromOptionKey,value:this.memberFromOptionValue,preOptions:{key:"ug2",value:"\u005b\u5168\u54e1\u005d"},callback:this.addMemberSync,callbackTarget:this};
aimluck.io.createOptions(this.memberFromId,A);
A={url:this.memberGroupUrl,key:this.groupSelectOptionKey,value:this.groupSelectOptionValue,preOptions:{key:"all",value:"\u3059\u3079\u3066\u306e\u30e6\u30fc\u30b6\u30fc\u3001\u30b0\u30eb\u30fc\u30d7"}};
aimluck.io.createOptions(this.groupSelectId,A)
},addMemberSync:function(){var R=B.byId(this.memberFromId);
var M=B.byId(this.memberToId);
var S=R.options;
if(S.length==1&&S[0].value==""){return 
}for(var Q=0;
Q<S.length;
Q++){var O=false;
var N="1";
for(j=0;
j<this.memberValues.length;
j++){if(this.memberValues[j].key==S[Q].value){O=true;
N=this.memberValues[j].value;
break
}}if(!O){continue
}var P=document.createElement("tr");
P.id="tracldel"+S[Q].value;
var T=document.createElement("td");
T.innerHTML=this.assingValue('<input type="checkbox" id="acldel__ID__" name="acldel" value="__ID__"/>',S[Q].value,S[Q].text,N);
var A=document.createElement("td");
A.innerHTML=this.assingValue('<label for="acldel__ID__">__NAME__</label>',S[Q].value,S[Q].text,N);
var L=document.createElement("td");
L.setAttribute("nowrap","true");
L.nowrap="true";
L.innerHTML=this.assingValue('<label><input type="radio" name="acl__ID__" value="1" __CHECKED1__/>\u95b2\u89a7\u306e\u307f</label>&nbsp;<label><input type="radio" name="acl__ID__" value="2" __CHECKED2__/>\u95b2\u89a7\u30fb\u8ffd\u52a0\u30fb\u7de8\u96c6\u30fb\u524a\u9664\u53ef\u80fd</label>',S[Q].value,S[Q].text,N);
P.appendChild(T);
P.appendChild(A);
P.appendChild(L);
M.appendChild(P)
}},assingValue:function(G,A,H,F){return G.replace(/__ID__/g,A).replace(/__NAME__/g,H).replace(/__CHECKED1__/g,"1"==F?"checked='checked'":"").replace(/__CHECKED2__/g,"2"==F?"checked='checked'":"")
},addMember:function(T,N){var U=T.options;
if(U.length==1&&U[0].value==""){return 
}for(var R=0;
R<U.length;
R++){if(!U[R].selected){continue
}var P=false;
for(var S=0;
S<this.memberValues.length;
S++){if(this.memberValues[S].key==U[R].value){P=true;
break
}}if(P){continue
}var O={};
O.key=U[R].value;
O.value="1";
this.memberValues.push(O);
var Q=document.createElement("tr");
Q.id="tracldel"+U[R].value;
var V=document.createElement("td");
V.innerHTML=this.assingValue('<input type="checkbox" id="acldel__ID__" name="acldel" value="__ID__"/>',U[R].value,U[R].text,"2");
var A=document.createElement("td");
A.innerHTML=this.assingValue('<label for="acldel__ID__">__NAME__</label>',U[R].value,U[R].text,"2");
var M=document.createElement("td");
M.setAttribute("nowrap","true");
M.nowrap="true";
M.innerHTML=this.assingValue('<label><input type="radio" name="acl__ID__" value="1" __CHECKED1__/>\u95b2\u89a7\u306e\u307f</label>&nbsp;<label><input type="radio" name="acl__ID__" value="2" __CHECKED2__/>\u95b2\u89a7\u30fb\u8ffd\u52a0\u30fb\u7de8\u96c6\u30fb\u524a\u9664\u53ef\u80fd</label>',U[R].value,U[R].text,"2");
Q.appendChild(V);
Q.appendChild(A);
Q.appendChild(M);
N.appendChild(Q)
}},removeMember:function(A){var J=[];
for(var K=0;
K<A.elements.length;
K++){var L=A.elements[K];
if("acldel"==L.name){if(L.checked){J.push(L)
}}}for(var K=0;
K<J.length;
K++){var N=J[K].id;
var I=B.byId("tr"+N);
I.parentNode.removeChild(I);
for(var M=0;
M<this.memberValues.length;
M++){if(this.memberValues[M].key==N.replace("acldel","")){this.memberValues.splice(M,1)
}}}},changeGroup:function(H){var A=H.target.options[H.target.selectedIndex].value;
var G=this.changeGroupUrl+"&groupname="+A;
var F={url:G,key:this.memberFromOptionKey,value:this.memberFromOptionValue,indicator:this.widgetId+"-memberlist-indicator"};
aimluck.io.createOptions(this.memberFromId,F)
},onMemberAddClick:function(A){this.addMember(B.byId(this.memberFromId),B.byId(this.memberToId))
},onMemberRemoveClick:function(A){this.removeMember(A.target.form)
}})
}}});