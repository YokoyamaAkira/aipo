dojo._xdResourceLoaded({depends:[["provide","aipo.widget.GroupNormalSelectList"],["require","dijit._Widget"],["require","dijit._Templated"]],defineResource:function(A){if(!A._hasResource["aipo.widget.GroupNormalSelectList"]){A._hasResource["aipo.widget.GroupNormalSelectList"]=true;
A.provide("aipo.widget.GroupNormalSelectList");
A.require("dijit._Widget");
A.require("dijit._Templated");
A.declare("aipo.widget.GroupNormalSelectList",[dijit._Widget,dijit._Templated],{inputWidth:"95%",memberLimit:0,changeGroupUrl:"",widgetId:"",buttonAddId:"",buttonRemoveId:"",memberFromTitle:"",memberFromId:"",memberToTitle:"",memberToId:"",memberFromUrl:"",memberFromOptionKey:"",memberFromOptionValue:"",templateString:'<div id="${widgetId}" widgetId="${widgetId}"><table class="none"><tr><td><div id="groupPopupDiv"><div class="outer"><div class="popup" style="width:335px"><div class="clearfix"><div class="memberlistToTop">${memberToTitle}</div><div class="memberlistFromTop">${memberFromTitle}</div></div><div class="clearfix"><div class="memberlistToBody"><select size="5" multiple="multiple" style="width:100%" name="${memberToId}" id="${memberToId}"></select></div><div class="memberlistFromBody"><select size="5" multiple="multiple" style="width:100%" name="${memberFromId}" id="${memberFromId}"></select></div></div><div class="clearfix"><div class="memberlistToBottom"><div class="alignright"><input id="${buttonRemoveId}" name="${buttonRemoveId}" type="button" class="button" value="\u3000\u524a\u9664\u3000" dojoAttachEvent="onclick:onMemberRemoveClick"/></div></div><div class="memberlistFromBottom"><div class="alignright"><input id="${buttonAddId}" name="${buttonAddId}" type="button" class="button" value="\u3000\uff1c \u8ffd\u52a0\u3000" dojoAttachEvent="onclick:onMemberAddClick"/></div></div></div></div></div></div></td></tr></table></div>\n',postCreate:function(){this.id=this.widgetId;
params={url:this.memberFromUrl,key:this.memberFromOptionKey,value:this.memberFromOptionValue};
aimluck.io.createOptions(this.memberFromId,params)
},addOption:function(B,C,D,E){aimluck.io.addOption(B,C,D,E)
},addOptionSync:function(D,E,F){var B=A.byId(this.memberToId);
if(this.memberLimit!=0&&B.options.length>=this.memberLimit){return 
}if(document.all){var C=document.createElement("OPTION");
C.value=D;
C.text=E;
C.selected=F;
if(B.options.length==1&&B.options[0].value==""){B.options.remove(0)
}B.add(C,B.options.length)
}else{var C=document.createElement("OPTION");
C.value=D;
C.text=E;
C.selected=F;
if(B.options.length==1&&B.options[0].value==""){B.removeChild(B.options[0])
}B.insertBefore(C,B.options[B.options.length])
}},addMember:function(F,C){if(document.all){var B=F.options;
var G=C.options;
if(B.length==1&&B[0].value==""){return 
}for(i=0;
i<B.length;
i++){if(!B[i].selected){continue
}var E=false;
for(j=0;
j<G.length;
j++){if(G[j].value==B[i].value){E=true;
break
}}if(E){continue
}var D=document.createElement("OPTION");
D.value=B[i].value;
D.text=B[i].text;
D.selected=true;
if(G.length==1&&G[0].value==""){G.remove(0)
}if(this.memberLimit!=0&&C.options.length>=this.memberLimit){return 
}G.add(D,G.length)
}}else{var B=F.options;
var G=C.options;
if(B.length==1&&B[0].value==""){return 
}for(i=0;
i<B.length;
i++){if(!B[i].selected){continue
}var E=false;
for(j=0;
j<G.length;
j++){if(G[j].value==B[i].value){E=true;
break
}}if(E){continue
}var D=document.createElement("OPTION");
D.value=B[i].value;
D.text=B[i].text;
D.selected=true;
if(C.options.length==1&&C.options[0].value==""){C.removeChild(C.options[0])
}if(this.memberLimit!=0&&C.options.length>=this.memberLimit){return 
}C.insertBefore(D,G[G.length])
}}},removeAllMember:function(B){if(document.all){var C=B.options;
for(i=0;
i<C.length;
i++){if(C[i].selected){C.remove(i);
i-=1
}}}else{var C=B.options;
for(i=0;
i<C.length;
i++){if(C[i].selected){B.removeChild(C[i]);
i-=1
}}}},removeMember:function(B){if(document.all){var C=B.options;
for(i=0;
i<C.length;
i++){if(C[i].selected){C.remove(i);
i-=1
}}}else{var C=B.options;
for(i=0;
i<C.length;
i++){if(C[i].selected){B.removeChild(C[i]);
i-=1
}}}},removeMemberSync:function(){var B=A.byId(this.memberToId);
if(document.all){var C=B.options;
for(i=0;
i<C.length;
i++){if(C[i].selected){C.remove(i);
i-=1
}}}else{var C=B.options;
for(i=0;
i<C.length;
i++){if(C[i].selected){B.removeChild(C[i]);
i-=1
}}}},changeGroup:function(B){var E=B.target.options[B.target.selectedIndex].value;
var C=this.changeGroupUrl+"&groupname="+E;
var D={url:C,key:this.memberFromOptionKey,value:this.memberFromOptionValue};
aimluck.io.createOptions(this.memberFromId,D)
},onMemberAddClick:function(B){this.addMember(A.byId(this.memberFromId),A.byId(this.memberToId))
},onMemberRemoveClick:function(B){this.removeMemberSync()
}})
}}});