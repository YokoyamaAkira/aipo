if(!dojo._hasResource["aipo.widget.MemberNormalSelectList"]){dojo._hasResource["aipo.widget.MemberNormalSelectList"]=true;
dojo.provide("aipo.widget.MemberNormalSelectList");
dojo.require("dijit._Widget");
dojo.require("dijit._Templated");
dojo.declare("aipo.widget.MemberNormalSelectList",[dijit._Widget,dijit._Templated],{widgetId:"",memberFromId:"",memberFromUrl:"",memberFromOptionKey:"",memberFromOptionValue:"",memberToTitle:"",memberToId:"",buttonAddId:"",buttonRemoveId:"",memberLimit:0,groupSelectId:"",groupSelectPreOptionKey:"",groupSelectPreOptionValue:"",groupSelectOptionKey:"",groupSelectOptionValue:"",memberGroupUrl:"",changeGroupUrl:"",templateString:'<div id="${widgetId}" widgetId="${widgetId}"><table class="none"><tr><td><div id="memberPopupDiv"><div class="outer"><div class="popup"><div class="clearfix"><div class="memberlistToTop" >${memberToTitle}</div><div class="memberlistFromTop"><select size="1" style="width:100%" name="${groupSelectId}" id="${groupSelectId}" dojoAttachEvent="onchange:changeGroup"></select></div></div><div class="clearfix"><div class="memberlistToBody"><select size="5" multiple="multiple" style="width:100%" name="${memberToId}" id="${memberToId}"></select></div><div class="memberlistFromBody"><select size="5" multiple="multiple" style="width:100%" name="${memberFromId}" id="${memberFromId}"></select></div></div><div class="clearfix"><div class="memberlistToBottom"><div class="alignright"><input id="${buttonRemoveId}" name="${buttonRemoveId}" type="button" class="button" value="\u3000\u524a\u9664\u3000"/ dojoAttachEvent="onclick:onMemberRemoveClick"></div></div><div class="memberlistFromBottom"><div style="display: none;" id="${widgetId}-memberlist-indicator" class="indicator alignleft">読み込み中</div><div class="alignright"><input id="${buttonAddId}" name="${buttonAddId}" type="button" class="button" value="\u3000\uff1c\u0020\u8ffd\u52a0\u3000"/ dojoAttachEvent="onclick:onMemberAddClick"></div></div></div></div></div></div></td></tr></table></div>\n',postCreate:function(){this.id=this.widgetId;
params={url:this.memberFromUrl,key:this.memberFromOptionKey,value:this.memberFromOptionValue,indicator:this.widgetId+"-memberlist-indicator"};
aimluck.io.createOptions(this.memberFromId,params);
params={url:this.memberGroupUrl,key:this.groupSelectOptionKey,value:this.groupSelectOptionValue,preOptions:{key:this.groupSelectPreOptionKey,value:this.groupSelectPreOptionValue}};
aimluck.io.createOptions(this.groupSelectId,params)
},addOption:function(A,B,C,D){aimluck.io.addOption(A,B,C,D)
},addOptionSync:function(C,D,E){var A=dojo.byId(this.memberToId);
if(this.memberLimit!=0&&A.options.length>=this.memberLimit){return 
}if(document.all){var B=document.createElement("OPTION");
B.value=C;
B.text=D;
B.selected=E;
if(A.options.length==1&&A.options[0].value==""){A.options.remove(0)
}A.add(B,A.options.length)
}else{var B=document.createElement("OPTION");
B.value=C;
B.text=D;
B.selected=E;
if(A.options.length==1&&A.options[0].value==""){A.removeChild(A.options[0])
}A.insertBefore(B,A.options[A.options.length])
}},addMember:function(E,B){if(document.all){var A=E.options;
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
}}}},removeMemberSync:function(){var A=dojo.byId(this.memberToId);
if(document.all){var B=A.options;
for(i=0;
i<B.length;
i++){if(B[i].selected){B.remove(i);
i-=1
}}}else{var B=A.options;
for(i=0;
i<B.length;
i++){if(B[i].selected){A.removeChild(B[i]);
i-=1
}}}},changeGroup:function(A){var D=A.target.options[A.target.selectedIndex].value;
var B=this.changeGroupUrl+"&groupname="+D;
var C={url:B,key:this.memberFromOptionKey,value:this.memberFromOptionValue,indicator:this.widgetId+"-memberlist-indicator"};
aimluck.io.createOptions(this.memberFromId,C)
},onMemberAddClick:function(A){this.addMember(dojo.byId(this.memberFromId),dojo.byId(this.memberToId))
},onMemberRemoveClick:function(A){this.removeMemberSync()
}})
};