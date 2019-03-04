if(!dojo._hasResource["aipo.widget.MemberSelectList"]){dojo._hasResource["aipo.widget.MemberSelectList"]=true;
dojo.provide("aipo.widget.MemberSelectList");
dojo.require("dijit._Widget");
dojo.require("dijit._Templated");
dojo.declare("aipo.widget.MemberSelectList",[dijit._Widget,dijit._Templated],{widgetId:"",inputWidth:"95%",hiddenId:"",hiddenValue:"",inputId:"",inputValue:"",selectId:"",memberFromId:"",memberFromUrl:"",memberFromOptionKey:"",memberFromOptionValue:"",memberToTitle:"",memberToId:"",buttonAddId:"",buttonRemoveId:"",memberLimit:0,groupSelectId:"",groupSelectPreOptionKey:"",groupSelectPreOptionValue:"",groupSelectOptionKey:"",groupSelectOptionValue:"",memberGroupUrl:"",changeGroupUrl:"",templateString:'<div id="${widgetId}" widgetId="${widgetId}"><table class="none"><tr><td><div id="memberPopupDiv"><div class="outer"><div class="popup"><div class="clearfix"><div class="memberlistToTop" >${memberToTitle}</div><div class="memberlistFromTop"><select size="1" style="width:100%" name="${groupSelectId}" id="${groupSelectId}" dojoAttachEvent="onchange:changeGroup"></select></div></div><div class="clearfix"><div class="memberlistToBody"><select size="10" multiple="multiple" style="width:100%" name="${memberToId}" id="${memberToId}"></select></div><div class="memberlistFromBody"><select size="10" multiple="multiple" style="width:100%" name="${memberFromId}" id="${memberFromId}"></select></div></div><div class="clearfix"><div class="memberlistToBottom"><div class="alignright"><input id="${buttonRemoveId}" name="${buttonRemoveId}" type="button" class="button" value="\u3000\u524a\u9664\u3000"/ dojoAttachEvent="onclick:onMemberRemoveClick"></div></div><div class="memberlistFromBottom"><div class="alignright"><input id="${buttonAddId}" name="${buttonAddId}" type="button" class="button" value="\u3000\uff1c\u0020\u8ffd\u52a0\u3000"/ dojoAttachEvent="onclick:onMemberAddClick"></div></div></div></div></div></div></td></tr></table></div>\n',postCreate:function(){this.id=this.widgetId;
params={url:this.memberFromUrl,key:this.memberFromOptionKey,value:this.memberFromOptionValue};
aimluck.io.createOptions(this.memberFromId,params);
params={url:this.memberGroupUrl,key:this.groupSelectOptionKey,value:this.groupSelectOptionValue,preOptions:{key:this.groupSelectPreOptionKey,value:this.groupSelectPreOptionValue}};
aimluck.io.createOptions(this.groupSelectId,params)
},addOption:function(A,B,C,D){aimluck.io.addOption(A,B,C,D)
},addOptionSync:function(E,F,G){var B=dojo.byId(this.memberToId);
var A=dojo.byId(this.selectId);
if(this.memberLimit!=0&&B.options.length>=this.memberLimit){return 
}if(document.all){var D=document.createElement("OPTION");
D.value=E;
D.text=F;
D.selected=G;
var C=document.createElement("OPTION");
C.value=E;
C.text=F;
C.selected=G;
if(B.options.length==1&&B.options[0].value==""){B.options.remove(0);
A.options.remove(0)
}B.add(D,B.options.length);
A.add(C,A.options.length)
}else{var D=document.createElement("OPTION");
D.value=E;
D.text=F;
D.selected=G;
var C=document.createElement("OPTION");
C.value=E;
C.text=F;
C.selected=G;
if(B.options.length==1&&B.options[0].value==""){B.removeChild(B.options[0]);
A.removeChild(B.options[0])
}B.insertBefore(D,B.options[B.options.length]);
A.insertBefore(C,A.options[A.options.length])
}this.inputMemberSync()
},addMember:function(E,B){if(document.all){var A=E.options;
var F=B.options;
if(A.length==1&&A[0].value==""){return 
}for(i=0;
i<A.length;
i++){if(!A[i].selected){continue
}var D=false;
for(j=0;
j<F.length;
j++){if(F[j].value==A[i].value){D=true;
break
}}if(D){continue
}var C=document.createElement("OPTION");
C.value=A[i].value;
C.text=A[i].text;
C.selected=true;
if(F.length==1&&F[0].value==""){F.remove(0)
}if(this.memberLimit!=0&&B.options.length>=this.memberLimit){return 
}F.add(C,F.length)
}}else{var A=E.options;
var F=B.options;
if(A.length==1&&A[0].value==""){return 
}for(i=0;
i<A.length;
i++){if(!A[i].selected){continue
}var D=false;
for(j=0;
j<F.length;
j++){if(F[j].value==A[i].value){D=true;
break
}}if(D){continue
}var C=document.createElement("OPTION");
C.value=A[i].value;
C.text=A[i].text;
C.selected=true;
if(B.options.length==1&&B.options[0].value==""){B.removeChild(B.options[0])
}if(this.memberLimit!=0&&B.options.length>=this.memberLimit){return 
}B.insertBefore(C,F[F.length])
}}},removeAllMember:function(A){if(document.all){var B=A.options;
for(i=0;
i<B.length;
i++){if(B[i].selected){B.remove(i);
i-=1
}}}else{var B=A.options;
for(i=0;
i<B.length;
i++){if(B[i].selected){A.removeChild(B[i]);
i-=1
}}}},removeMember:function(A){if(document.all){var B=A.options;
for(i=0;
i<B.length;
i++){if(B[i].selected){B.remove(i);
i-=1
}}}else{var B=A.options;
for(i=0;
i<B.length;
i++){if(B[i].selected){A.removeChild(B[i]);
i-=1
}}}},removeMemberSync:function(){var C=dojo.byId(this.memberToId);
var B=dojo.byId(this.selectId);
if(document.all){var D=C.options;
var A=B.options;
for(i=0;
i<D.length;
i++){if(D[i].selected){D.remove(i);
A.remove(i);
i-=1
}}}else{var D=C.options;
var A=B.options;
for(i=0;
i<D.length;
i++){if(D[i].selected){C.removeChild(D[i]);
B.removeChild(A[i]);
i-=1
}}}},inputMemberSync:function(){var A=dojo.byId(this.selectId);
var B=dojo.byId(this.inputId);
var C="";
var D=A.options;
for(i=0;
i<D.length;
i++){if(i!=0){C+=", "
}C+=D[i].text
}B.innerHTML=C
},changeGroup:function(A){var D=A.target.options[A.target.selectedIndex].value;
var B=this.changeGroupUrl+"&groupname="+D;
var C={url:B,key:this.memberFromOptionKey,value:this.memberFromOptionValue};
aimluck.io.createOptions(this.memberFromId,C)
},onMemberAddClick:function(A){this.addMember(dojo.byId(this.memberFromId),dojo.byId(this.memberToId));
this.addMember(dojo.byId(this.memberFromId),dojo.byId(this.selectId));
this.inputMemberSync()
},onMemberRemoveClick:function(A){this.removeMemberSync();
this.inputMemberSync()
}})
};