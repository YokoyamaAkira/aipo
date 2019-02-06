dojo._xdResourceLoaded({depends:[["provide","aipo.widget.MemberNormalSelectList"],["require","dijit._Widget"],["require","dijit._Templated"]],defineResource:function(A){if(!A._hasResource["aipo.widget.MemberNormalSelectList"]){A._hasResource["aipo.widget.MemberNormalSelectList"]=true;
A.provide("aipo.widget.MemberNormalSelectList");
A.require("dijit._Widget");
A.require("dijit._Templated");
A.declare("aipo.widget.MemberNormalSelectList",[dijit._Widget,dijit._Templated],{widgetId:"",memberFromId:"",memberFromUrl:"",memberFromOptionKey:"",memberFromOptionValue:"",memberToTitle:"",memberToId:"",buttonAddId:"",buttonRemoveId:"",memberLimit:0,groupSelectId:"",groupSelectPreOptionKey:"",groupSelectPreOptionValue:"",groupSelectOptionKey:"",groupSelectOptionValue:"",memberGroupUrl:"",changeGroupUrl:"",templateString:'<div id="${widgetId}" widgetId="${widgetId}"><table class="none"><tr><td><div id="memberPopupDiv"><div class="outer"><div class="popup"><div class="clearfix"><div class="memberlistToTop" >${memberToTitle}</div><div class="memberlistFromTop"><select size="1" style="width:100%" name="${groupSelectId}" id="${groupSelectId}" dojoAttachEvent="onchange:changeGroup"></select></div></div><div class="clearfix"><div class="memberlistToBody"><select size="5" multiple="multiple" style="width:100%" name="${memberToId}" id="${memberToId}"></select></div><div class="memberlistFromBody"><select size="5" multiple="multiple" style="width:100%" name="${memberFromId}" id="${memberFromId}"></select></div></div><div class="clearfix"><div class="memberlistToBottom"><div class="alignright"><input id="${buttonRemoveId}" name="${buttonRemoveId}" type="button" class="button" value="\u3000\u524a\u9664\u3000"/ dojoAttachEvent="onclick:onMemberRemoveClick"></div></div><div class="memberlistFromBottom"><div style="display: none;" id="${widgetId}-memberlist-indicator" class="indicator alignleft">読み込み中</div><div class="alignright"><input id="${buttonAddId}" name="${buttonAddId}" type="button" class="button" value="\u3000\uff1c\u0020\u8ffd\u52a0\u3000"/ dojoAttachEvent="onclick:onMemberAddClick"></div></div></div></div></div></div></td></tr></table></div>\n',postCreate:function(){this.id=this.widgetId;
params={url:this.memberFromUrl,key:this.memberFromOptionKey,value:this.memberFromOptionValue,indicator:this.widgetId+"-memberlist-indicator"};
aimluck.io.createOptions(this.memberFromId,params);
params={url:this.memberGroupUrl,key:this.groupSelectOptionKey,value:this.groupSelectOptionValue,preOptions:{key:this.groupSelectPreOptionKey,value:this.groupSelectPreOptionValue}};
aimluck.io.createOptions(this.groupSelectId,params)
},addOption:function(C,D,E,B){aimluck.io.addOption(C,D,E,B)
},addOptionSync:function(E,F,B){var C=A.byId(this.memberToId);
if(this.memberLimit!=0&&C.options.length>=this.memberLimit){return 
}if(document.all){var D=document.createElement("OPTION");
D.value=E;
D.text=F;
D.selected=B;
if(C.options.length==1&&C.options[0].value==""){C.options.remove(0)
}C.add(D,C.options.length)
}else{var D=document.createElement("OPTION");
D.value=E;
D.text=F;
D.selected=B;
if(C.options.length==1&&C.options[0].value==""){C.removeChild(C.options[0])
}C.insertBefore(D,C.options[C.options.length])
}},addMember:function(G,D){if(document.all){var C=G.options;
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
}}}},removeMemberSync:function(){var C=A.byId(this.memberToId);
if(document.all){var B=C.options;
for(i=0;
i<B.length;
i++){if(B[i].selected){B.remove(i);
i-=1
}}}else{var B=C.options;
for(i=0;
i<B.length;
i++){if(B[i].selected){C.removeChild(B[i]);
i-=1
}}}},changeGroup:function(C){var B=C.target.options[C.target.selectedIndex].value;
var D=this.changeGroupUrl+"&groupname="+B;
var E={url:D,key:this.memberFromOptionKey,value:this.memberFromOptionValue,indicator:this.widgetId+"-memberlist-indicator"};
aimluck.io.createOptions(this.memberFromId,E)
},onMemberAddClick:function(B){this.addMember(A.byId(this.memberFromId),A.byId(this.memberToId))
},onMemberRemoveClick:function(B){this.removeMemberSync()
}})
}}});