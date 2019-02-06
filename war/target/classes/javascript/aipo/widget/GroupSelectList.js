if(!dojo._hasResource["aipo.widget.GroupSelectList"]){dojo._hasResource["aipo.widget.GroupSelectList"]=true;
dojo.provide("aipo.widget.GroupSelectList");
dojo.require("dijit._Widget");
dojo.require("dijit._Templated");
dojo.declare("aipo.widget.GroupSelectList",[dijit._Widget,dijit._Templated],{inputWidth:"95%",hiddenId:"",hiddenValue:"",inputId:"",inputValue:"",memberLimit:0,groupSelectId:"",groupSelectOptionKey:"",groupSelectOptionValue:"",memberGroupUrl:"",changeGroupUrl:"",widgetId:"",selectId:"",inputId:"",buttonAddId:"",buttonRemoveId:"",memberFromTitle:"",memberFromId:"",memberToTitle:"",memberToId:"",memberFromUrl:"",memberFromOptionKey:"",memberFromOptionValue:"",templateString:'<div id="${widgetId}" widgetId="${widgetId}"><table class="none"><tr><td><div id="groupPopupDiv"><div class="outer"><div class="popup"><div class="clearfix"><div class="memberlistToTop">${memberToTitle}</div><div class="memberlistFromTop">${memberFromTitle}</div></div><div class="clearfix"><div class="memberlistToBody"><select size="10" multiple="multiple" style="width:100%" name="${memberToId}" id="${memberToId}"></select></div><div class="memberlistFromBody"><select size="10" multiple="multiple" style="width:100%" name="${memberFromId}" id="${memberFromId}"></select></div></div><div class="clearfix"><div class="memberlistToBottom"><div class="alignright"><input id="${buttonRemoveId}" name="${buttonRemoveId}" type="button" class="button" value="\u3000\u524a\u9664\u3000" dojoAttachEvent="onclick:onMemberRemoveClick"/></div></div><div class="memberlistFromBottom"><div class="alignright"><input id="${buttonAddId}" name="${buttonAddId}" type="button" class="button" value="\u3000\uff1c\u0020\u8ffd\u52a0\u3000" dojoAttachEvent="onclick:onMemberAddClick"/></div></div></div></div></div></div></td></tr></table></div>\n',postCreate:function(){this.id=this.widgetId;
params={url:this.memberFromUrl,key:this.memberFromOptionKey,value:this.memberFromOptionValue};
aimluck.io.createOptions(this.memberFromId,params)
},addOption:function(D,A,B,C){aimluck.io.addOption(D,A,B,C)
},addOptionSync:function(B,C,D){var F=dojo.byId(this.memberToId);
var E=dojo.byId(this.selectId);
if(this.memberLimit!=0&&F.options.length>=this.memberLimit){return 
}if(document.all){var A=document.createElement("OPTION");
A.value=B;
A.text=C;
A.selected=D;
var G=document.createElement("OPTION");
G.value=B;
G.text=C;
G.selected=D;
if(F.options.length==1&&F.options[0].value==""){F.options.remove(0);
E.options.remove(0)
}F.add(A,F.options.length);
E.add(G,E.options.length)
}else{var A=document.createElement("OPTION");
A.value=B;
A.text=C;
A.selected=D;
var G=document.createElement("OPTION");
G.value=B;
G.text=C;
G.selected=D;
if(F.options.length==1&&F.options[0].value==""){F.removeChild(F.options[0]);
E.removeChild(F.options[0])
}F.insertBefore(A,F.options[F.options.length]);
E.insertBefore(G,E.options[E.options.length])
}this.inputMemberSync()
},addMember:function(D,A){if(document.all){var F=D.options;
var E=A.options;
if(F.length==1&&F[0].value==""){return 
}for(i=0;
i<F.length;
i++){if(!F[i].selected){continue
}var C=false;
for(j=0;
j<E.length;
j++){if(E[j].value==F[i].value){C=true;
break
}}if(C){continue
}var B=document.createElement("OPTION");
B.value=F[i].value;
B.text=F[i].text;
B.selected=true;
if(E.length==1&&E[0].value==""){E.remove(0)
}if(this.memberLimit!=0&&A.options.length>=this.memberLimit){return 
}E.add(B,E.length)
}}else{var F=D.options;
var E=A.options;
if(F.length==1&&F[0].value==""){return 
}for(i=0;
i<F.length;
i++){if(!F[i].selected){continue
}var C=false;
for(j=0;
j<E.length;
j++){if(E[j].value==F[i].value){C=true;
break
}}if(C){continue
}var B=document.createElement("OPTION");
B.value=F[i].value;
B.text=F[i].text;
B.selected=true;
if(A.options.length==1&&A.options[0].value==""){A.removeChild(A.options[0])
}if(this.memberLimit!=0&&A.options.length>=this.memberLimit){return 
}A.insertBefore(B,E[E.length])
}}},removeAllMember:function(B){if(document.all){var A=B.options;
for(i=0;
i<A.length;
i++){if(A[i].selected){A.remove(i);
i-=1
}}}else{var A=B.options;
for(i=0;
i<A.length;
i++){if(A[i].selected){B.removeChild(A[i]);
i-=1
}}}},removeMember:function(B){if(document.all){var A=B.options;
for(i=0;
i<A.length;
i++){if(A[i].selected){A.remove(i);
i-=1
}}}else{var A=B.options;
for(i=0;
i<A.length;
i++){if(A[i].selected){B.removeChild(A[i]);
i-=1
}}}},removeMemberSync:function(){var B=dojo.byId(this.memberToId);
var A=dojo.byId(this.selectId);
if(document.all){var C=B.options;
var D=A.options;
for(i=0;
i<C.length;
i++){if(C[i].selected){C.remove(i);
D.remove(i);
i-=1
}}}else{var C=B.options;
var D=A.options;
for(i=0;
i<C.length;
i++){if(C[i].selected){B.removeChild(C[i]);
A.removeChild(D[i]);
i-=1
}}}},inputMemberSync:function(){var D=dojo.byId(this.selectId);
var A=dojo.byId(this.inputId);
var B="";
var C=D.options;
for(i=0;
i<C.length;
i++){if(i!=0){B+=", "
}B+=C[i].text
}A.innerHTML=B
},changeGroup:function(D){var C=D.target.options[D.target.selectedIndex].value;
var A=this.changeGroupUrl+"&groupname="+C;
var B={url:A,key:this.memberFromOptionKey,value:this.memberFromOptionValue};
aimluck.io.createOptions(this.memberFromId,B)
},onMemberAddClick:function(A){this.addMember(dojo.byId(this.memberFromId),dojo.byId(this.memberToId));
this.addMember(dojo.byId(this.memberFromId),dojo.byId(this.selectId));
this.inputMemberSync()
},onMemberRemoveClick:function(A){this.removeMemberSync();
this.inputMemberSync()
}})
};