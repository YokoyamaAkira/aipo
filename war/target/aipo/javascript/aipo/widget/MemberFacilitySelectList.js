if(!dojo._hasResource["aipo.widget.MemberFacilitySelectList"]){dojo._hasResource["aipo.widget.MemberFacilitySelectList"]=true;
dojo.provide("aipo.widget.MemberFacilitySelectList");
dojo.require("dijit._Widget");
dojo.require("dijit._Templated");
dojo.declare("aipo.widget.MemberFacilitySelectList",[dijit._Widget,dijit._Templated],{widgetId:"",inputWidth:"95%",hiddenId:"",hiddenValue:"",inputId:"",inputValue:"",selectId:"",memberFromId:"",memberFromUrl:"",memberFromOptionKey:"",memberFromOptionValue:"",memberToId:"",buttonAddId:"",buttonRemoveId:"",memberLimit:0,groupSelectId:"",groupSelectOptionKey:"",groupSelectOptionValue:"",memberGroupUrl:"",changeGroupUrl:"",tmpPortretId:"",templateString:'<div id="${widgetId}" widgetId="${widgetId}" style="display: none"><div class="auiPopup" style="width:300px"><div class="clearfix"><div class="memberlistToTop" >閲覧ユーザー一覧</div><div class="memberlistFromTop"><select size="1" style="width:100%" name="${groupSelectId}" id="${groupSelectId}" dojoAttachEvent="onchange:changeGroup"></select></div></div><div class="clearfix"><div class="memberlistToBody"><select size="10" multiple="multiple" style="width:100%" name="${memberToId}" id="${memberToId}"></select></div><div class="memberlistFromBody"><select size="10" multiple="multiple" style="width:100%" name="${memberFromId}" id="${memberFromId}"></select></div></div><div class="clearfix"><div class="memberlistToBottom"><div class="alignright"><input id="${buttonRemoveId}" name="${buttonRemoveId}" type="button" class="button" value="　削除　"/ dojoAttachEvent="onclick:onMemberRemoveClick"></div></div><div class="memberlistFromBottom"><div class="alignright"><input id="${buttonAddId}" name="${buttonAddId}" type="button" class="button" value="　＜ 追加　"/ dojoAttachEvent="onclick:onMemberAddClick"></div></div></div> </div></div>\n',postCreate:function(){this.id=this.widgetId;
params={url:this.memberFromUrl,key:this.memberFromOptionKey,value:this.memberFromOptionValue};
aimluck.io.createOptions(this.memberFromId,params);
params={url:this.memberGroupUrl,key:this.groupSelectOptionKey,value:this.groupSelectOptionValue,preOptions:{key:"LoginUser",value:"（全体）"}};
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
}if(aipo.calendar.maximum_to>F.length){F.add(C,F.length)
}}}else{var A=E.options;
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
}if(aipo.calendar.maximum_to>F.length){B.insertBefore(C,F[F.length])
}}}},removeAllMember:function(A){if(document.all){var B=A.options;
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
}}}},inputMemberSync:function(){var G=dojo.byId(this.selectId);
var F=dojo.byId(this.inputId);
var D="";
var A=G.options;
for(C=0;
C<A.length;
C++){if(C!=0){D+=" "
}var B=C%aipo.calendar.maximum_to;
var H=A[C].text.replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/</g,"&lt;").replace(/>/g,"&gt;");
D+='<span class="small color'+B+'">'+H+"</span>"
}var I=dojo.byId("picked_memberlist-"+this.tmpPortretId);
if(I){this.removeMember(I);
var E=I.options;
for(var C=0;
C<E.length;
C++){(function(K,J){K.selected=true
})(E[C],C)
}this.addMember(dojo.byId("member_to-"+portletId),dojo.byId("picked_memberlist-"+portletId))
}F.innerHTML=D
},changeGroup:function(A){var D=A.target.options[A.target.selectedIndex].value;
var B=this.changeGroupUrl+"&groupname="+D;
var C={url:B,key:this.memberFromOptionKey,value:this.memberFromOptionValue};
aimluck.io.createOptions(this.memberFromId,C)
},onMemberAddClick:function(A){this.addMember(dojo.byId(this.memberFromId),dojo.byId(this.memberToId));
this.addMember(dojo.byId(this.memberFromId),dojo.byId(this.selectId));
this.inputMemberSync()
},onMemberRemoveClick:function(B){this.removeMemberSync();
this.inputMemberSync();
var A=dojo.byId(this.memberToId);
if(A.options.length==0){if(aipo.schedule.login_aliasname!="undefined"){var C=aipo.schedule.login_aliasname.replace(/&amp;/g,"&").replace(/&quot;/g,'"').replace(/&lt;/g,"<").replace(/&gt;/g,">");
this.addOptionSync(aipo.schedule.login_id,C,true)
}}},onCloseClick:function(){dojo.style(this.domNode,"display","none");
aipo.calendar.populateWeeklySchedule(this.tmpPortretId)
}})
};