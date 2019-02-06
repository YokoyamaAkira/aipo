dojo._xdResourceLoaded({depends:[["provide","aipo.widget.GroupSelectList"],["require","dijit._Widget"],["require","dijit._Templated"]],defineResource:function(A){if(!A._hasResource["aipo.widget.GroupSelectList"]){A._hasResource["aipo.widget.GroupSelectList"]=true;
A.provide("aipo.widget.GroupSelectList");
A.require("dijit._Widget");
A.require("dijit._Templated");
A.declare("aipo.widget.GroupSelectList",[dijit._Widget,dijit._Templated],{inputWidth:"95%",hiddenId:"",hiddenValue:"",inputId:"",inputValue:"",memberLimit:0,groupSelectId:"",groupSelectOptionKey:"",groupSelectOptionValue:"",memberGroupUrl:"",changeGroupUrl:"",widgetId:"",selectId:"",inputId:"",buttonAddId:"",buttonRemoveId:"",memberFromTitle:"",memberFromId:"",memberToTitle:"",memberToId:"",memberFromUrl:"",memberFromOptionKey:"",memberFromOptionValue:"",templateString:'<div id="${widgetId}" widgetId="${widgetId}"><table class="none"><tr><td><div id="groupPopupDiv"><div class="outer"><div class="popup"><div class="clearfix"><div class="memberlistToTop">${memberToTitle}</div><div class="memberlistFromTop">${memberFromTitle}</div></div><div class="clearfix"><div class="memberlistToBody"><select size="10" multiple="multiple" style="width:100%" name="${memberToId}" id="${memberToId}"></select></div><div class="memberlistFromBody"><select size="10" multiple="multiple" style="width:100%" name="${memberFromId}" id="${memberFromId}"></select></div></div><div class="clearfix"><div class="memberlistToBottom"><div class="alignright"><input id="${buttonRemoveId}" name="${buttonRemoveId}" type="button" class="button" value="\u3000\u524a\u9664\u3000" dojoAttachEvent="onclick:onMemberRemoveClick"/></div></div><div class="memberlistFromBottom"><div class="alignright"><input id="${buttonAddId}" name="${buttonAddId}" type="button" class="button" value="\u3000\uff1c\u0020\u8ffd\u52a0\u3000" dojoAttachEvent="onclick:onMemberAddClick"/></div></div></div></div></div></div></td></tr></table></div>\n',postCreate:function(){this.id=this.widgetId;
params={url:this.memberFromUrl,key:this.memberFromOptionKey,value:this.memberFromOptionValue};
aimluck.io.createOptions(this.memberFromId,params)
},addOption:function(C,D,E,B){aimluck.io.addOption(C,D,E,B)
},addOptionSync:function(E,F,C){var H=A.byId(this.memberToId);
var G=A.byId(this.selectId);
if(this.memberLimit!=0&&H.options.length>=this.memberLimit){return 
}if(document.all){var D=document.createElement("OPTION");
D.value=E;
D.text=F;
D.selected=C;
var B=document.createElement("OPTION");
B.value=E;
B.text=F;
B.selected=C;
if(H.options.length==1&&H.options[0].value==""){H.options.remove(0);
G.options.remove(0)
}H.add(D,H.options.length);
G.add(B,G.options.length)
}else{var D=document.createElement("OPTION");
D.value=E;
D.text=F;
D.selected=C;
var B=document.createElement("OPTION");
B.value=E;
B.text=F;
B.selected=C;
if(H.options.length==1&&H.options[0].value==""){H.removeChild(H.options[0]);
G.removeChild(H.options[0])
}H.insertBefore(D,H.options[H.options.length]);
G.insertBefore(B,G.options[G.options.length])
}this.inputMemberSync()
},addMember:function(G,D){if(document.all){var C=G.options;
var B=D.options;
if(C.length==1&&C[0].value==""){return 
}for(i=0;
i<C.length;
i++){if(!C[i].selected){continue
}var F=false;
for(j=0;
j<B.length;
j++){if(B[j].value==C[i].value){F=true;
break
}}if(F){continue
}var E=document.createElement("OPTION");
E.value=C[i].value;
E.text=C[i].text;
E.selected=true;
if(B.length==1&&B[0].value==""){B.remove(0)
}if(this.memberLimit!=0&&D.options.length>=this.memberLimit){return 
}B.add(E,B.length)
}}else{var C=G.options;
var B=D.options;
if(C.length==1&&C[0].value==""){return 
}for(i=0;
i<C.length;
i++){if(!C[i].selected){continue
}var F=false;
for(j=0;
j<B.length;
j++){if(B[j].value==C[i].value){F=true;
break
}}if(F){continue
}var E=document.createElement("OPTION");
E.value=C[i].value;
E.text=C[i].text;
E.selected=true;
if(D.options.length==1&&D.options[0].value==""){D.removeChild(D.options[0])
}if(this.memberLimit!=0&&D.options.length>=this.memberLimit){return 
}D.insertBefore(E,B[B.length])
}}},removeAllMember:function(C){if(document.all){var B=C.options;
for(i=0;
i<B.length;
i++){if(B[i].selected){B.remove(i);
i-=1
}}}else{var B=C.options;
for(i=0;
i<B.length;
i++){if(B[i].selected){C.removeChild(B[i]);
i-=1
}}}},removeMember:function(C){if(document.all){var B=C.options;
for(i=0;
i<B.length;
i++){if(B[i].selected){B.remove(i);
i-=1
}}}else{var B=C.options;
for(i=0;
i<B.length;
i++){if(B[i].selected){C.removeChild(B[i]);
i-=1
}}}},removeMemberSync:function(){var E=A.byId(this.memberToId);
var D=A.byId(this.selectId);
if(document.all){var B=E.options;
var C=D.options;
for(i=0;
i<B.length;
i++){if(B[i].selected){B.remove(i);
C.remove(i);
i-=1
}}}else{var B=E.options;
var C=D.options;
for(i=0;
i<B.length;
i++){if(B[i].selected){E.removeChild(B[i]);
D.removeChild(C[i]);
i-=1
}}}},inputMemberSync:function(){var C=A.byId(this.selectId);
var D=A.byId(this.inputId);
var E="";
var B=C.options;
for(i=0;
i<B.length;
i++){if(i!=0){E+=", "
}E+=B[i].text
}D.innerHTML=E
},changeGroup:function(C){var B=C.target.options[C.target.selectedIndex].value;
var D=this.changeGroupUrl+"&groupname="+B;
var E={url:D,key:this.memberFromOptionKey,value:this.memberFromOptionValue};
aimluck.io.createOptions(this.memberFromId,E)
},onMemberAddClick:function(B){this.addMember(A.byId(this.memberFromId),A.byId(this.memberToId));
this.addMember(A.byId(this.memberFromId),A.byId(this.selectId));
this.inputMemberSync()
},onMemberRemoveClick:function(B){this.removeMemberSync();
this.inputMemberSync()
}})
}}});