if(!dojo._hasResource["aipo.widget.DropdownMemberFacilitypicker"]){dojo._hasResource["aipo.widget.DropdownMemberFacilitypicker"]=true;
dojo.provide("aipo.widget.DropdownMemberFacilitypicker");
dojo.require("aimluck.widget.Dropdown");
dojo.require("aipo.widget.MemberFacilitySelectList");
dojo.declare("aipo.widget.DropdownMemberFacilitypicker",[aimluck.widget.Dropdown],{inputWidth:"250px",hiddenId:"",hiddenValue:"",iconURL:"",iconAlt:"",selectId:"",inputId:"",inputValue:"",buttonAddId:"",buttonRemoveId:"",memberFromId:"",memberToId:"",memberFromUrl:"",memberFromOptionKey:"",memberFromOptionValue:"",groupSelectId:"",groupSelectOptionKey:"",groupSelectOptionValue:"",memberGroupUrl:"",changeGroupUrl:"",listWidgetId:"",tmpPortretId:"cinit",templateString:'<div class="dijit dijitLeft dijitInline"\n\tdojoAttachEvent="onmouseenter:_onMouse,onmouseleave:_onMouse,onmousedown:_onMouse,onclick:_onDropDownClick,onkeydown:_onDropDownKeydown,onblur:_onDropDownBlur,onkeypress:_onKey"\n\t><div class=\'dijitRight\'>\n\t<span class="" type="${type}"\n\t\tdojoAttachPoint="focusNode,titleNode" waiRole="button" waiState="haspopup-true,labelledby-${id}_label"\n\t\t><span class="" \tdojoAttachPoint="containerNode,popupStateNode"\n\t\tid="${id}_label"></span><select name="${selectId}" id="${selectId}" size="10" multiple="multiple" style="display:none" dojoAttachPoint="selectNode"></select><input type="hidden" id="${hiddenId}" name="${hiddenId}" value="${hiddenValue}" dojoAttachPoint="valueNode" /><span name="${inputId}" id="${inputId}" dojoAttachPoint="inputNode">${inputValue}</span>\n<span id="adduser-${tmpPortretId}" class="small addUser">ユーザー追加</span></div></div>\n',postCreate:function(){var C={widgetId:this.listWidgetId,selectId:this.selectId,inputId:this.inputId,buttonAddId:this.buttonAddId,buttonRemoveId:this.buttonRemoveId,memberFromId:this.memberFromId,memberToId:this.memberToId,memberFromUrl:this.memberFromUrl,memberFromOptionKey:this.memberFromOptionKey,memberFromOptionValue:this.memberFromOptionValue,groupSelectId:this.groupSelectId,groupSelectOptionKey:this.groupSelectOptionKey,groupSelectOptionValue:this.groupSelectOptionValue,memberGroupUrl:this.memberGroupUrl,changeGroupUrl:this.changeGroupUrl,tmpPortretId:this.tmpPortretId};
this.listWidgetId="memberfacilitylistwidget-"+this.tmpPortretId;
var D=dijit.byId(this.listWidgetId);
if(D){dijit.registry.remove(this.listWidgetId)
}this.dropDown=new aipo.widget.MemberFacilitySelectList(C,this.listWidgetId);
this.inherited(arguments)
},removeAllOptions:function(D){var F;
if(document.all){var E=D.options;
for(F=0;
F<E.length;
F++){E.remove(F);
F-=1
}}else{var E=D.options;
for(F=0;
F<E.length;
F++){D.removeChild(E[F]);
F-=1
}}},addOptionSync:function(K,J,I){var N=dojo.byId(this.memberToId);
var H=dojo.byId(this.selectId);
if(this.memberLimit!=0&&N.options.length>=this.memberLimit){return 
}if(document.all){var L=document.createElement("OPTION");
L.value=K;
L.text=J;
L.selected=I;
var M=document.createElement("OPTION");
M.value=K;
M.text=J;
M.selected=I;
if(N.options.length==1&&N.options[0].value==""){N.options.remove(0);
H.options.remove(0)
}N.add(L,N.options.length);
H.add(M,H.options.length)
}else{var L=document.createElement("OPTION");
L.value=K;
L.text=J;
L.selected=I;
var M=document.createElement("OPTION");
M.value=K;
M.text=J;
M.selected=I;
if(N.options.length==1&&N.options[0].value==""){N.removeChild(N.options[0]);
H.removeChild(N.options[0])
}N.insertBefore(L,N.options[N.options.length]);
H.insertBefore(M,H.options[H.options.length])
}this.inputMemberSync()
},inputMemberSync:function(){var R=dojo.byId(this.selectId);
var S=dojo.byId(this.inputId);
var L="";
var O=R.options;
var V=O.length;
if(V<=0){return 
}for(var M=0;
M<V;
M++){if(M!=0){L+=" "
}var N=M%aipo.calendar.maximum_to;
var Q=O[M].text.replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/</g,"&lt;").replace(/>/g,"&gt;");
L+='<span class="dispUser color'+N+'">'+Q+"</span>"
}var T=(dojo.byId("groupselect-"+this.tmpPortretId).value==dojo.byId("groupselect-defaulturl-"+this.tmpPortretId).value);
if(T){var P=dojo.byId("picked_memberlist-"+this.tmpPortretId);
if(P){this.dropDown.removeMember(P);
var U=P.options;
for(var M=0;
M<U.length;
M++){(function(B,A){B.selected=true
})(U[M],M)
}this.dropDown.addMember(dojo.byId("member_to-"+this.tmpPortretId),dojo.byId("picked_memberlist-"+this.tmpPortretId))
}}S.innerHTML=L
},_openDropDown:function(){var K=this.dropDown;
var P=K.domNode.style.width;
var O=this;
dijit.popup.open({parent:this,popup:K,around:this.domNode,orient:this.isLeftToRight()?{BL:"TL",BR:"TR",TL:"BL",TR:"BR"}:{BR:"TR",BL:"TL",TR:"BR",TL:"BL"},onExecute:function(){O._closeDropDown(true)
},onCancel:function(){O._closeDropDown(true)
},onClose:function(){aipo.calendar.populateWeeklySchedule(O.tmpPortretId);
K.domNode.style.width=P;
O.popupStateNode.removeAttribute("popupActive");
this._opened=false
}});
if(this.domNode.offsetWidth>K.domNode.offsetWidth){var L=null;
if(!this.isLeftToRight()){L=K.domNode.parentNode;
var I=L.offsetLeft+L.offsetWidth
}dojo.marginBox(K.domNode,{w:this.domNode.offsetWidth});
if(L){L.style.left=I-this.domNode.offsetWidth+"px"
}}this.popupStateNode.setAttribute("popupActive","true");
this._opened=true;
if(K.focus){K.focus()
}var M=window.navigator.userAgent.toLowerCase();
if(M.indexOf("chrome")>-1||(dojo.isFF&&(dojo.isFF>=3.6))){var N=this.dropDown.domNode.parentNode;
var J=N.style.top.replace("px","");
top_new=parseInt(J)+window.scrollY;
N.style.top=top_new+"px"
}},_onDropDownClick:function(D){var C=dojo.byId("groupselect-"+this.tmpPortretId);
if(C&&C.value.indexOf("pickup")==-1){return false
}aimluck.widget.Dropdown.prototype._onDropDownClick.call(this,D)
}})
};