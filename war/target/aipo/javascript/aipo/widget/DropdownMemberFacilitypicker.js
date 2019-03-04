if(!dojo._hasResource["aipo.widget.DropdownMemberFacilitypicker"]){dojo._hasResource["aipo.widget.DropdownMemberFacilitypicker"]=true;
dojo.provide("aipo.widget.DropdownMemberFacilitypicker");
dojo.require("aimluck.widget.Dropdown");
dojo.require("aipo.widget.MemberFacilitySelectList");
dojo.declare("aipo.widget.DropdownMemberFacilitypicker",[aimluck.widget.Dropdown],{inputWidth:"250px",hiddenId:"",hiddenValue:"",iconURL:"",iconAlt:"",selectId:"",inputId:"",inputValue:"",buttonAddId:"",buttonRemoveId:"",memberFromId:"",memberToId:"",memberFromUrl:"",memberFromOptionKey:"",memberFromOptionValue:"",groupSelectId:"",groupSelectOptionKey:"",groupSelectOptionValue:"",memberGroupUrl:"",changeGroupUrl:"",listWidgetId:"",tmpPortretId:"cinit",templateString:'<div class="dijit dijitLeft dijitInline"\n\tdojoAttachEvent="onmouseenter:_onMouse,onmouseleave:_onMouse,onmousedown:_onMouse,onclick:_onDropDownClick,onkeydown:_onDropDownKeydown,onblur:_onDropDownBlur,onkeypress:_onKey"\n\t><div class=\'dijitRight\'>\n\t<span class="" type="${type}"\n\t\tdojoAttachPoint="focusNode,titleNode" waiRole="button" waiState="haspopup-true,labelledby-${id}_label"\n\t\t><span class="" \tdojoAttachPoint="containerNode,popupStateNode"\n\t\tid="${id}_label"></span><select name="${selectId}" id="${selectId}" size="10" multiple="multiple" style="display:none" dojoAttachPoint="selectNode"></select><input type="hidden" id="${hiddenId}" name="${hiddenId}" value="${hiddenValue}" dojoAttachPoint="valueNode" /><span name="${inputId}" id="${inputId}" dojoAttachPoint="inputNode">${inputValue}</span>\n<span id="adduser-${tmpPortretId}" class="small addUser">ユーザー追加</span></div></div>\n',postCreate:function(){var A={widgetId:this.listWidgetId,selectId:this.selectId,inputId:this.inputId,buttonAddId:this.buttonAddId,buttonRemoveId:this.buttonRemoveId,memberFromId:this.memberFromId,memberToId:this.memberToId,memberFromUrl:this.memberFromUrl,memberFromOptionKey:this.memberFromOptionKey,memberFromOptionValue:this.memberFromOptionValue,groupSelectId:this.groupSelectId,groupSelectOptionKey:this.groupSelectOptionKey,groupSelectOptionValue:this.groupSelectOptionValue,memberGroupUrl:this.memberGroupUrl,changeGroupUrl:this.changeGroupUrl,tmpPortretId:this.tmpPortretId};
this.listWidgetId="memberfacilitylistwidget-"+this.tmpPortretId;
var B=dijit.byId(this.listWidgetId);
if(B){dijit.registry.remove(this.listWidgetId)
}this.dropDown=new aipo.widget.MemberFacilitySelectList(A,this.listWidgetId);
this.inherited(arguments)
},removeAllOptions:function(A){var B;
if(document.all){var C=A.options;
for(B=0;
B<C.length;
B++){C.remove(B);
B-=1
}}else{var C=A.options;
for(B=0;
B<C.length;
B++){A.removeChild(C[B]);
B-=1
}}},addOptionSync:function(E,F,G){var B=dojo.byId(this.memberToId);
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
},inputMemberSync:function(){var I=dojo.byId(this.selectId);
var H=dojo.byId(this.inputId);
var D="";
var A=I.options;
var E=A.length;
if(E<=0){return 
}for(var C=0;
C<E;
C++){if(C!=0){D+=" "
}var B=C%aipo.calendar.maximum_to;
var J=A[C].text.replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/</g,"&lt;").replace(/>/g,"&gt;");
D+='<span class="dispUser color'+B+'">'+J+"</span>"
}var G=(dojo.byId("groupselect-"+this.tmpPortretId).value==dojo.byId("groupselect-defaulturl-"+this.tmpPortretId).value);
if(G){var K=dojo.byId("picked_memberlist-"+this.tmpPortretId);
if(K){this.dropDown.removeMember(K);
var F=K.options;
for(var C=0;
C<F.length;
C++){(function(M,L){M.selected=true
})(F[C],C)
}this.dropDown.addMember(dojo.byId("member_to-"+this.tmpPortretId),dojo.byId("picked_memberlist-"+this.tmpPortretId))
}}H.innerHTML=D
},_openDropDown:function(){var G=this.dropDown;
var B=G.domNode.style.width;
var C=this;
dijit.popup.open({parent:this,popup:G,around:this.domNode,orient:this.isLeftToRight()?{BL:"TL",BR:"TR",TL:"BL",TR:"BR"}:{BR:"TR",BL:"TL",TR:"BR",TL:"BL"},onExecute:function(){C._closeDropDown(true)
},onCancel:function(){C._closeDropDown(true)
},onClose:function(){aipo.calendar.populateWeeklySchedule(C.tmpPortretId);
G.domNode.style.width=B;
C.popupStateNode.removeAttribute("popupActive");
this._opened=false
}});
if(this.domNode.offsetWidth>G.domNode.offsetWidth){var F=null;
if(!this.isLeftToRight()){F=G.domNode.parentNode;
var A=F.offsetLeft+F.offsetWidth
}dojo.marginBox(G.domNode,{w:this.domNode.offsetWidth});
if(F){F.style.left=A-this.domNode.offsetWidth+"px"
}}this.popupStateNode.setAttribute("popupActive","true");
this._opened=true;
if(G.focus){G.focus()
}var E=window.navigator.userAgent.toLowerCase();
if(E.indexOf("chrome")>-1||(dojo.isFF&&(dojo.isFF>=3.6))){var D=this.dropDown.domNode.parentNode;
var H=D.style.top.replace("px","");
top_new=parseInt(H)+window.scrollY;
D.style.top=top_new+"px"
}},_onDropDownClick:function(B){var A=dojo.byId("groupselect-"+this.tmpPortretId);
if(A&&A.value.indexOf("pickup")==-1){return false
}aimluck.widget.Dropdown.prototype._onDropDownClick.call(this,B)
}})
};