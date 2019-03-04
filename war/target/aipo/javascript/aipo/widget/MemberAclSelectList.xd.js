dojo._xdResourceLoaded({depends:[["provide","aipo.widget.MemberAclSelectList"]],defineResource:function(A){if(!A._hasResource["aipo.widget.MemberAclSelectList"]){A._hasResource["aipo.widget.MemberAclSelectList"]=true;
A.provide("aipo.widget.MemberAclSelectList");
A.require("dijit._Widget");
A.require("dijit._Templated");
A.declare("aipo.widget.MemberAclSelectList",[dijit._Widget,dijit._Templated],{widgetId:"",memberFromId:"",memberFromUrl:"",memberFromOptionKey:"",memberFromOptionValue:"",memberToTitle:"",memberToId:"",buttonAddId:"",buttonRemoveId:"",memberLimit:0,groupSelectId:"",groupSelectPreOptionKey:"",groupSelectPreOptionValue:"",groupSelectOptionKey:"",groupSelectOptionValue:"",memberGroupUrl:"",changeGroupUrl:"",memberValuesStr:"",memberValues:[],templateString:'<div id="${widgetId}" widgetId="${widgetId}"><table class="none wide mb15"><tbody><tr><td valign="top"><table class="auiRowTable wide mb5"><tbody name="${memberToId}" id="${memberToId}"><tr><th class="thin"><input type="checkbox" onclick="aimluck.io.switchCheckbox(this);"/></th><th class="w50">\u540D\u524D</th><th nowrap="nowrap">\u6A29\u9650</th></tr></tbody></table><input type="button" class="button" value="\u3000\u524A\u9664\u3000" dojoAttachEvent="onclick:onMemberRemoveClick"/></td><td class="thin" valign="top"><select style="width:140px" name="${groupSelectId}" id="${groupSelectId}" dojoAttachEvent="onchange:changeGroup"></select>\n<select size="8" multiple="multiple" style="width:140px" class="mb5" name="${memberFromId}" id="${memberFromId}"></select>\n<input type="button" class="button" value="\u3000\uFF1C \u8FFD\u52A0\u3000" dojoAttachEvent="onclick:onMemberAddClick"/></td></tr></tbody></table></div>\n',postCreate:function(){this.id=this.widgetId;
this.memberValues=[];
var C=this.memberValuesStr.split(",");
for(var E=0;
E<C.length;
E++){var B=C[E].split(":");
var D={};
D.key=B[0];
D.value=B[1];
this.memberValues.push(D)
}var F={url:this.memberFromUrl,key:this.memberFromOptionKey,value:this.memberFromOptionValue,preOptions:{key:"ug2",value:"\u005b\u5168\u54e1\u005d"},callback:this.addMemberSync,callbackTarget:this};
aimluck.io.createOptions(this.memberFromId,F);
F={url:this.memberGroupUrl,key:this.groupSelectOptionKey,value:this.groupSelectOptionValue,preOptions:{key:"all",value:"\u3059\u3079\u3066\u306e\u30e6\u30fc\u30b6\u30fc\u3001\u30b0\u30eb\u30fc\u30d7"}};
aimluck.io.createOptions(this.groupSelectId,F)
},addMemberSync:function(){var G=A.byId(this.memberFromId);
var B=A.byId(this.memberToId);
var F=G.options;
if(F.length==1&&F[0].value==""){return 
}for(var H=0;
H<F.length;
H++){var J=false;
var K="1";
for(j=0;
j<this.memberValues.length;
j++){if(this.memberValues[j].key==F[H].value){J=true;
K=this.memberValues[j].value;
break
}}if(!J){continue
}var I=document.createElement("tr");
I.id="tracldel"+F[H].value;
var E=document.createElement("td");
E.innerHTML=this.assingValue('<input type="checkbox" id="acldel__ID__" name="acldel" value="__ID__"/>',F[H].value,F[H].text,K);
var D=document.createElement("td");
D.innerHTML=this.assingValue('<label for="acldel__ID__">__NAME__</label>',F[H].value,F[H].text,K);
var C=document.createElement("td");
C.setAttribute("nowrap","true");
C.nowrap="true";
C.innerHTML=this.assingValue('<label><input type="radio" name="acl__ID__" value="1" __CHECKED1__/>\u95b2\u89a7\u306e\u307f</label>&nbsp;<label><input type="radio" name="acl__ID__" value="2" __CHECKED2__/>\u95b2\u89a7\u30fb\u8ffd\u52a0\u30fb\u7de8\u96c6\u30fb\u524a\u9664\u53ef\u80fd</label>',F[H].value,F[H].text,K);
I.appendChild(E);
I.appendChild(D);
I.appendChild(C);
B.appendChild(I)
}},assingValue:function(C,E,B,D){return C.replace(/__ID__/g,E).replace(/__NAME__/g,B).replace(/__CHECKED1__/g,"1"==D?"checked='checked'":"").replace(/__CHECKED2__/g,"2"==D?"checked='checked'":"")
},addMember:function(G,B){var F=G.options;
if(F.length==1&&F[0].value==""){return 
}for(var I=0;
I<F.length;
I++){if(!F[I].selected){continue
}var K=false;
for(var H=0;
H<this.memberValues.length;
H++){if(this.memberValues[H].key==F[I].value){K=true;
break
}}if(K){continue
}var L={};
L.key=F[I].value;
L.value="1";
this.memberValues.push(L);
var J=document.createElement("tr");
J.id="tracldel"+F[I].value;
var E=document.createElement("td");
E.innerHTML=this.assingValue('<input type="checkbox" id="acldel__ID__" name="acldel" value="__ID__"/>',F[I].value,F[I].text,"2");
var D=document.createElement("td");
D.innerHTML=this.assingValue('<label for="acldel__ID__">__NAME__</label>',F[I].value,F[I].text,"2");
var C=document.createElement("td");
C.setAttribute("nowrap","true");
C.nowrap="true";
C.innerHTML=this.assingValue('<label><input type="radio" name="acl__ID__" value="1" __CHECKED1__/>\u95b2\u89a7\u306e\u307f</label>&nbsp;<label><input type="radio" name="acl__ID__" value="2" __CHECKED2__/>\u95b2\u89a7\u30fb\u8ffd\u52a0\u30fb\u7de8\u96c6\u30fb\u524a\u9664\u53ef\u80fd</label>',F[I].value,F[I].text,"2");
J.appendChild(E);
J.appendChild(D);
J.appendChild(C);
B.appendChild(J)
}},removeMember:function(H){var F=[];
for(var E=0;
E<H.elements.length;
E++){var D=H.elements[E];
if("acldel"==D.name){if(D.checked){F.push(D)
}}}for(var E=0;
E<F.length;
E++){var B=F[E].id;
var G=A.byId("tr"+B);
G.parentNode.removeChild(G);
for(var C=0;
C<this.memberValues.length;
C++){if(this.memberValues[C].key==B.replace("acldel","")){this.memberValues.splice(C,1)
}}}},changeGroup:function(B){var E=B.target.options[B.target.selectedIndex].value;
var C=this.changeGroupUrl+"&groupname="+E;
var D={url:C,key:this.memberFromOptionKey,value:this.memberFromOptionValue,indicator:this.widgetId+"-memberlist-indicator"};
aimluck.io.createOptions(this.memberFromId,D)
},onMemberAddClick:function(B){this.addMember(A.byId(this.memberFromId),A.byId(this.memberToId))
},onMemberRemoveClick:function(B){this.removeMember(B.target.form)
}})
}}});