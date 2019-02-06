if(!dojo._hasResource["aipo.widget.MemberNormalSelectList"]){dojo._hasResource["aipo.widget.MemberNormalSelectList"]=true;
dojo.provide("aipo.widget.MemberNormalSelectList");
dojo.require("dijit._Widget");
dojo.require("dijit._Templated");
dojo.declare("aipo.widget.MemberNormalSelectList",[dijit._Widget,dijit._Templated],{widgetId:"",memberFromId:"",memberFromUrl:"",memberFromOptionKey:"",memberFromOptionValue:"",memberToTitle:"",memberToId:"",buttonAddId:"",buttonRemoveId:"",memberLimit:0,groupSelectId:"",groupSelectPreOptionKey:"",groupSelectPreOptionValue:"",groupSelectOptionKey:"",groupSelectOptionValue:"",memberGroupUrl:"",changeGroupUrl:"",templateString:'<div id="${widgetId}" widgetId="${widgetId}"><table class="none"><tr><td><div id="memberPopupDiv"><div class="outer"><div class="popup"><div class="clearfix"><div class="memberlistToTop" >${memberToTitle}</div><div class="memberlistFromTop"><select size="1" style="width:100%" name="${groupSelectId}" id="${groupSelectId}" dojoAttachEvent="onchange:changeGroup"></select></div></div><div class="clearfix"><div class="memberlistToBody"><select size="5" multiple="multiple" style="width:100%" name="${memberToId}" id="${memberToId}"></select></div><div class="memberlistFromBody"><select size="5" multiple="multiple" style="width:100%" name="${memberFromId}" id="${memberFromId}"></select></div></div><div class="clearfix"><div class="memberlistToBottom"><div class="alignright"><input id="${buttonRemoveId}" name="${buttonRemoveId}" type="button" class="button" value="\u3000\u524a\u9664\u3000"/ dojoAttachEvent="onclick:onMemberRemoveClick"></div></div><div class="memberlistFromBottom"><div style="display: none;" id="${widgetId}-memberlist-indicator" class="indicator alignleft">読み込み中</div><div class="alignright"><input id="${buttonAddId}" name="${buttonAddId}" type="button" class="button" value="\u3000\uff1c\u0020\u8ffd\u52a0\u3000"/ dojoAttachEvent="onclick:onMemberAddClick"></div></div></div></div></div></div></td></tr></table></div>\n',postCreate:function(){this.id=this.widgetId;
params={url:this.memberFromUrl,key:this.memberFromOptionKey,value:this.memberFromOptionValue,indicator:this.widgetId+"-memberlist-indicator"};
aimluck.io.createOptions(this.memberFromId,params);
params={url:this.memberGroupUrl,key:this.groupSelectOptionKey,value:this.groupSelectOptionValue,preOptions:{key:this.groupSelectPreOptionKey,value:this.groupSelectPreOptionValue}};
aimluck.io.createOptions(this.groupSelectId,params)
},addOption:function(D,A,B,C){aimluck.io.addOption(D,A,B,C)
},addOptionSync:function(B,C,D){var E=dojo.byId(this.memberToId);
if(this.memberLimit!=0&&E.options.length>=this.memberLimit){return 
}if(document.all){var A=document.createElement("OPTION");
A.value=B;
A.text=C;
A.selected=D;
if(E.options.length==1&&E.options[0].value==""){E.options.remove(0)
}E.add(A,E.options.length)
}else{var A=document.createElement("OPTION");
A.value=B;
A.text=C;
A.selected=D;
if(E.options.length==1&&E.options[0].value==""){E.removeChild(E.options[0])
}E.insertBefore(A,E.options[E.options.length])
}},addMember:function(D,A){if(document.all){var F=D.options;
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
if(document.all){var A=B.options;
for(i=0;
i<A.length;
i++){if(A[i].selected){A.remove(i);
i-=1
}}}else{var A=B.options;
for(i=0;
i<A.length;
i++){if(A[i].selected){B.removeChild(A[i]);
i-=1
}}}},changeGroup:function(D){var C=D.target.options[D.target.selectedIndex].value;
var A=this.changeGroupUrl+"&groupname="+C;
var B={url:A,key:this.memberFromOptionKey,value:this.memberFromOptionValue,indicator:this.widgetId+"-memberlist-indicator"};
aimluck.io.createOptions(this.memberFromId,B)
},onMemberAddClick:function(A){this.addMember(dojo.byId(this.memberFromId),dojo.byId(this.memberToId))
},onMemberRemoveClick:function(A){this.removeMemberSync()
}})
};