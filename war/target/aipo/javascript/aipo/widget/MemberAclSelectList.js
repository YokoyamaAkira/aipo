if(!dojo._hasResource["aipo.widget.MemberAclSelectList"]){dojo._hasResource["aipo.widget.MemberAclSelectList"]=true;
dojo.provide("aipo.widget.MemberAclSelectList");
dojo.require("dijit._Widget");
dojo.require("dijit._Templated");
dojo.declare("aipo.widget.MemberAclSelectList",[dijit._Widget,dijit._Templated],{widgetId:"",memberFromId:"",memberFromUrl:"",memberFromOptionKey:"",memberFromOptionValue:"",memberToTitle:"",memberToId:"",buttonAddId:"",buttonRemoveId:"",memberLimit:0,groupSelectId:"",groupSelectPreOptionKey:"",groupSelectPreOptionValue:"",groupSelectOptionKey:"",groupSelectOptionValue:"",memberGroupUrl:"",changeGroupUrl:"",memberValuesStr:"",memberValues:[],templateString:'<div id="${widgetId}" widgetId="${widgetId}"><table class="none wide mb15"><tbody><tr><td valign="top"><table class="auiRowTable wide mb5"><tbody name="${memberToId}" id="${memberToId}"><tr><th class="thin"><input type="checkbox" onclick="aimluck.io.switchCheckbox(this);"/></th><th class="w50">\u540D\u524D</th><th nowrap="nowrap">\u6A29\u9650</th></tr></tbody></table><input type="button" class="button" value="\u3000\u524A\u9664\u3000" dojoAttachEvent="onclick:onMemberRemoveClick"/></td><td class="thin" valign="top"><select style="width:140px" name="${groupSelectId}" id="${groupSelectId}" dojoAttachEvent="onchange:changeGroup"></select>\n<select size="8" multiple="multiple" style="width:140px" class="mb5" name="${memberFromId}" id="${memberFromId}"></select>\n<input type="button" class="button" value="\u3000\uFF1C \u8FFD\u52A0\u3000" dojoAttachEvent="onclick:onMemberAddClick"/></td></tr></tbody></table></div>\n',postCreate:function(){this.id=this.widgetId;
this.memberValues=[];
var B=this.memberValuesStr.split(",");
for(var D=0;
D<B.length;
D++){var A=B[D].split(":");
var C={};
C.key=A[0];
C.value=A[1];
this.memberValues.push(C)
}var E={url:this.memberFromUrl,key:this.memberFromOptionKey,value:this.memberFromOptionValue,preOptions:{key:"ug2",value:"\u005b\u5168\u54e1\u005d"},callback:this.addMemberSync,callbackTarget:this};
aimluck.io.createOptions(this.memberFromId,E);
E={url:this.memberGroupUrl,key:this.groupSelectOptionKey,value:this.groupSelectOptionValue,preOptions:{key:"all",value:"\u3059\u3079\u3066\u306e\u30e6\u30fc\u30b6\u30fc\u3001\u30b0\u30eb\u30fc\u30d7"}};
aimluck.io.createOptions(this.groupSelectId,E)
},addMemberSync:function(){var F=dojo.byId(this.memberFromId);
var A=dojo.byId(this.memberToId);
var E=F.options;
if(E.length==1&&E[0].value==""){return 
}for(var G=0;
G<E.length;
G++){var I=false;
var J="1";
for(j=0;
j<this.memberValues.length;
j++){if(this.memberValues[j].key==E[G].value){I=true;
J=this.memberValues[j].value;
break
}}if(!I){continue
}var H=document.createElement("tr");
H.id="tracldel"+E[G].value;
var D=document.createElement("td");
D.innerHTML=this.assingValue('<input type="checkbox" id="acldel__ID__" name="acldel" value="__ID__"/>',E[G].value,E[G].text,J);
var C=document.createElement("td");
C.innerHTML=this.assingValue('<label for="acldel__ID__">__NAME__</label>',E[G].value,E[G].text,J);
var B=document.createElement("td");
B.setAttribute("nowrap","true");
B.nowrap="true";
B.innerHTML=this.assingValue('<label><input type="radio" name="acl__ID__" value="1" __CHECKED1__/>\u95b2\u89a7\u306e\u307f</label>&nbsp;<label><input type="radio" name="acl__ID__" value="2" __CHECKED2__/>\u95b2\u89a7\u30fb\u8ffd\u52a0\u30fb\u7de8\u96c6\u30fb\u524a\u9664\u53ef\u80fd</label>',E[G].value,E[G].text,J);
H.appendChild(D);
H.appendChild(C);
H.appendChild(B);
A.appendChild(H)
}},assingValue:function(B,D,A,C){return B.replace(/__ID__/g,D).replace(/__NAME__/g,A).replace(/__CHECKED1__/g,"1"==C?"checked='checked'":"").replace(/__CHECKED2__/g,"2"==C?"checked='checked'":"")
},addMember:function(F,A){var E=F.options;
if(E.length==1&&E[0].value==""){return 
}for(var H=0;
H<E.length;
H++){if(!E[H].selected){continue
}var J=false;
for(var G=0;
G<this.memberValues.length;
G++){if(this.memberValues[G].key==E[H].value){J=true;
break
}}if(J){continue
}var K={};
K.key=E[H].value;
K.value="1";
this.memberValues.push(K);
var I=document.createElement("tr");
I.id="tracldel"+E[H].value;
var D=document.createElement("td");
D.innerHTML=this.assingValue('<input type="checkbox" id="acldel__ID__" name="acldel" value="__ID__"/>',E[H].value,E[H].text,"2");
var C=document.createElement("td");
C.innerHTML=this.assingValue('<label for="acldel__ID__">__NAME__</label>',E[H].value,E[H].text,"2");
var B=document.createElement("td");
B.setAttribute("nowrap","true");
B.nowrap="true";
B.innerHTML=this.assingValue('<label><input type="radio" name="acl__ID__" value="1" __CHECKED1__/>\u95b2\u89a7\u306e\u307f</label>&nbsp;<label><input type="radio" name="acl__ID__" value="2" __CHECKED2__/>\u95b2\u89a7\u30fb\u8ffd\u52a0\u30fb\u7de8\u96c6\u30fb\u524a\u9664\u53ef\u80fd</label>',E[H].value,E[H].text,"2");
I.appendChild(D);
I.appendChild(C);
I.appendChild(B);
A.appendChild(I)
}},removeMember:function(G){var E=[];
for(var D=0;
D<G.elements.length;
D++){var C=G.elements[D];
if("acldel"==C.name){if(C.checked){E.push(C)
}}}for(var D=0;
D<E.length;
D++){var A=E[D].id;
var F=dojo.byId("tr"+A);
F.parentNode.removeChild(F);
for(var B=0;
B<this.memberValues.length;
B++){if(this.memberValues[B].key==A.replace("acldel","")){this.memberValues.splice(B,1)
}}}},changeGroup:function(A){var D=A.target.options[A.target.selectedIndex].value;
var B=this.changeGroupUrl+"&groupname="+D;
var C={url:B,key:this.memberFromOptionKey,value:this.memberFromOptionValue,indicator:this.widgetId+"-memberlist-indicator"};
aimluck.io.createOptions(this.memberFromId,C)
},onMemberAddClick:function(A){this.addMember(dojo.byId(this.memberFromId),dojo.byId(this.memberToId))
},onMemberRemoveClick:function(A){this.removeMember(A.target.form)
}})
};