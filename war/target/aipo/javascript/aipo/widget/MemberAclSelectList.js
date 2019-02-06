if(!dojo._hasResource["aipo.widget.MemberAclSelectList"]){dojo._hasResource["aipo.widget.MemberAclSelectList"]=true;
dojo.provide("aipo.widget.MemberAclSelectList");
dojo.require("dijit._Widget");
dojo.require("dijit._Templated");
dojo.declare("aipo.widget.MemberAclSelectList",[dijit._Widget,dijit._Templated],{widgetId:"",memberFromId:"",memberFromUrl:"",memberFromOptionKey:"",memberFromOptionValue:"",memberToTitle:"",memberToId:"",buttonAddId:"",buttonRemoveId:"",memberLimit:0,groupSelectId:"",groupSelectPreOptionKey:"",groupSelectPreOptionValue:"",groupSelectOptionKey:"",groupSelectOptionValue:"",memberGroupUrl:"",changeGroupUrl:"",memberValuesStr:"",memberValues:[],templateString:'<div id="${widgetId}" widgetId="${widgetId}"><table class="none wide mb15"><tbody><tr><td valign="top"><table class="auiRowTable wide mb5"><tbody name="${memberToId}" id="${memberToId}"><tr><th class="thin"><input type="checkbox" onclick="aimluck.io.switchCheckbox(this);"/></th><th class="w50">\u540D\u524D</th><th nowrap="nowrap">\u6A29\u9650</th></tr></tbody></table><input type="button" class="button" value="\u3000\u524A\u9664\u3000" dojoAttachEvent="onclick:onMemberRemoveClick"/></td><td class="thin" valign="top"><select style="width:140px" name="${groupSelectId}" id="${groupSelectId}" dojoAttachEvent="onchange:changeGroup"></select>\n<select size="8" multiple="multiple" style="width:140px" class="mb5" name="${memberFromId}" id="${memberFromId}"></select>\n<input type="button" class="button" value="\u3000\uFF1C \u8FFD\u52A0\u3000" dojoAttachEvent="onclick:onMemberAddClick"/></td></tr></tbody></table></div>\n',postCreate:function(){this.id=this.widgetId;
this.memberValues=[];
var J=this.memberValuesStr.split(",");
for(var H=0;
H<J.length;
H++){var F=J[H].split(":");
var I={};
I.key=F[0];
I.value=F[1];
this.memberValues.push(I)
}var G={url:this.memberFromUrl,key:this.memberFromOptionKey,value:this.memberFromOptionValue,preOptions:{key:"ug2",value:"\u005b\u5168\u54e1\u005d"},callback:this.addMemberSync,callbackTarget:this};
aimluck.io.createOptions(this.memberFromId,G);
G={url:this.memberGroupUrl,key:this.groupSelectOptionKey,value:this.groupSelectOptionValue,preOptions:{key:"all",value:"\u3059\u3079\u3066\u306e\u30e6\u30fc\u30b6\u30fc\u3001\u30b0\u30eb\u30fc\u30d7"}};
aimluck.io.createOptions(this.groupSelectId,G)
},addMemberSync:function(){var S=dojo.byId(this.memberFromId);
var N=dojo.byId(this.memberToId);
var T=S.options;
if(T.length==1&&T[0].value==""){return 
}for(var R=0;
R<T.length;
R++){var P=false;
var O="1";
for(j=0;
j<this.memberValues.length;
j++){if(this.memberValues[j].key==T[R].value){P=true;
O=this.memberValues[j].value;
break
}}if(!P){continue
}var Q=document.createElement("tr");
Q.id="tracldel"+T[R].value;
var K=document.createElement("td");
K.innerHTML=this.assingValue('<input type="checkbox" id="acldel__ID__" name="acldel" value="__ID__"/>',T[R].value,T[R].text,O);
var L=document.createElement("td");
L.innerHTML=this.assingValue('<label for="acldel__ID__">__NAME__</label>',T[R].value,T[R].text,O);
var M=document.createElement("td");
M.setAttribute("nowrap","true");
M.nowrap="true";
M.innerHTML=this.assingValue('<label><input type="radio" name="acl__ID__" value="1" __CHECKED1__/>\u95b2\u89a7\u306e\u307f</label>&nbsp;<label><input type="radio" name="acl__ID__" value="2" __CHECKED2__/>\u95b2\u89a7\u30fb\u8ffd\u52a0\u30fb\u7de8\u96c6\u30fb\u524a\u9664\u53ef\u80fd</label>',T[R].value,T[R].text,O);
Q.appendChild(K);
Q.appendChild(L);
Q.appendChild(M);
N.appendChild(Q)
}},assingValue:function(H,F,E,G){return H.replace(/__ID__/g,F).replace(/__NAME__/g,E).replace(/__CHECKED1__/g,"1"==G?"checked='checked'":"").replace(/__CHECKED2__/g,"2"==G?"checked='checked'":"")
},addMember:function(U,O){var V=U.options;
if(V.length==1&&V[0].value==""){return 
}for(var S=0;
S<V.length;
S++){if(!V[S].selected){continue
}var Q=false;
for(var T=0;
T<this.memberValues.length;
T++){if(this.memberValues[T].key==V[S].value){Q=true;
break
}}if(Q){continue
}var P={};
P.key=V[S].value;
P.value="1";
this.memberValues.push(P);
var R=document.createElement("tr");
R.id="tracldel"+V[S].value;
var L=document.createElement("td");
L.innerHTML=this.assingValue('<input type="checkbox" id="acldel__ID__" name="acldel" value="__ID__"/>',V[S].value,V[S].text,"2");
var M=document.createElement("td");
M.innerHTML=this.assingValue('<label for="acldel__ID__">__NAME__</label>',V[S].value,V[S].text,"2");
var N=document.createElement("td");
N.setAttribute("nowrap","true");
N.nowrap="true";
N.innerHTML=this.assingValue('<label><input type="radio" name="acl__ID__" value="1" __CHECKED1__/>\u95b2\u89a7\u306e\u307f</label>&nbsp;<label><input type="radio" name="acl__ID__" value="2" __CHECKED2__/>\u95b2\u89a7\u30fb\u8ffd\u52a0\u30fb\u7de8\u96c6\u30fb\u524a\u9664\u53ef\u80fd</label>',V[S].value,V[S].text,"2");
R.appendChild(L);
R.appendChild(M);
R.appendChild(N);
O.appendChild(R)
}},removeMember:function(I){var K=[];
for(var L=0;
L<I.elements.length;
L++){var M=I.elements[L];
if("acldel"==M.name){if(M.checked){K.push(M)
}}}for(var L=0;
L<K.length;
L++){var H=K[L].id;
var J=dojo.byId("tr"+H);
J.parentNode.removeChild(J);
for(var N=0;
N<this.memberValues.length;
N++){if(this.memberValues[N].key==H.replace("acldel","")){this.memberValues.splice(N,1)
}}}},changeGroup:function(E){var F=E.target.options[E.target.selectedIndex].value;
var H=this.changeGroupUrl+"&groupname="+F;
var G={url:H,key:this.memberFromOptionKey,value:this.memberFromOptionValue,indicator:this.widgetId+"-memberlist-indicator"};
aimluck.io.createOptions(this.memberFromId,G)
},onMemberAddClick:function(B){this.addMember(dojo.byId(this.memberFromId),dojo.byId(this.memberToId))
},onMemberRemoveClick:function(B){this.removeMember(B.target.form)
}})
};