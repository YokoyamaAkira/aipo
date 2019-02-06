dojo._xdResourceLoaded({depends:[["provide","aipo.widget.DropdownMemberFacilitypicker"],["require","aimluck.widget.Dropdown"],["require","aipo.widget.MemberFacilitySelectList"]],defineResource:function(B){if(!B._hasResource["aipo.widget.DropdownMemberFacilitypicker"]){B._hasResource["aipo.widget.DropdownMemberFacilitypicker"]=true;
B.provide("aipo.widget.DropdownMemberFacilitypicker");
B.require("aimluck.widget.Dropdown");
B.require("aipo.widget.MemberFacilitySelectList");
B.declare("aipo.widget.DropdownMemberFacilitypicker",[aimluck.widget.Dropdown],{inputWidth:"250px",hiddenId:"",hiddenValue:"",iconURL:"",iconAlt:"",selectId:"",inputId:"",inputValue:"",buttonAddId:"",buttonRemoveId:"",memberFromId:"",memberToId:"",memberFromUrl:"",memberFromOptionKey:"",memberFromOptionValue:"",groupSelectId:"",groupSelectOptionKey:"",groupSelectOptionValue:"",memberGroupUrl:"",changeGroupUrl:"",listWidgetId:"",tmpPortretId:"cinit",templateString:'<div class="dijit dijitLeft dijitInline"\n\tdojoAttachEvent="onmouseenter:_onMouse,onmouseleave:_onMouse,onmousedown:_onMouse,onclick:_onDropDownClick,onkeydown:_onDropDownKeydown,onblur:_onDropDownBlur,onkeypress:_onKey"\n\t><div class=\'dijitRight\'>\n\t<span class="" type="${type}"\n\t\tdojoAttachPoint="focusNode,titleNode" waiRole="button" waiState="haspopup-true,labelledby-${id}_label"\n\t\t><span class="" \tdojoAttachPoint="containerNode,popupStateNode"\n\t\tid="${id}_label"></span><select name="${selectId}" id="${selectId}" size="10" multiple="multiple" style="display:none" dojoAttachPoint="selectNode"></select><input type="hidden" id="${hiddenId}" name="${hiddenId}" value="${hiddenValue}" dojoAttachPoint="valueNode" /><span name="${inputId}" id="${inputId}" dojoAttachPoint="inputNode">${inputValue}</span>\n<span id="adduser-${tmpPortretId}" class="small addUser">ユーザー追加</span></div></div>\n',postCreate:function(){var D={widgetId:this.listWidgetId,selectId:this.selectId,inputId:this.inputId,buttonAddId:this.buttonAddId,buttonRemoveId:this.buttonRemoveId,memberFromId:this.memberFromId,memberToId:this.memberToId,memberFromUrl:this.memberFromUrl,memberFromOptionKey:this.memberFromOptionKey,memberFromOptionValue:this.memberFromOptionValue,groupSelectId:this.groupSelectId,groupSelectOptionKey:this.groupSelectOptionKey,groupSelectOptionValue:this.groupSelectOptionValue,memberGroupUrl:this.memberGroupUrl,changeGroupUrl:this.changeGroupUrl,tmpPortretId:this.tmpPortretId};
this.listWidgetId="memberfacilitylistwidget-"+this.tmpPortretId;
var A=dijit.byId(this.listWidgetId);
if(A){dijit.registry.remove(this.listWidgetId)
}this.dropDown=new aipo.widget.MemberFacilitySelectList(D,this.listWidgetId);
this.inherited(arguments)
},removeAllOptions:function(F){var E;
if(document.all){var A=F.options;
for(E=0;
E<A.length;
E++){A.remove(E);
E-=1
}}else{var A=F.options;
for(E=0;
E<A.length;
E++){F.removeChild(A[E]);
E-=1
}}},addOptionSync:function(J,I,A){var M=B.byId(this.memberToId);
var N=B.byId(this.selectId);
if(this.memberLimit!=0&&M.options.length>=this.memberLimit){return 
}if(document.all){var K=document.createElement("OPTION");
K.value=J;
K.text=I;
K.selected=A;
var L=document.createElement("OPTION");
L.value=J;
L.text=I;
L.selected=A;
if(M.options.length==1&&M.options[0].value==""){M.options.remove(0);
N.options.remove(0)
}M.add(K,M.options.length);
N.add(L,N.options.length)
}else{var K=document.createElement("OPTION");
K.value=J;
K.text=I;
K.selected=A;
var L=document.createElement("OPTION");
L.value=J;
L.text=I;
L.selected=A;
if(M.options.length==1&&M.options[0].value==""){M.removeChild(M.options[0]);
N.removeChild(M.options[0])
}M.insertBefore(K,M.options[M.options.length]);
N.insertBefore(L,N.options[N.options.length])
}this.inputMemberSync()
},inputMemberSync:function(){var P=B.byId(this.selectId);
var Q=B.byId(this.inputId);
var T="";
var M=P.options;
var S=M.length;
if(S<=0){return 
}for(var A=0;
A<S;
A++){if(A!=0){T+=" "
}var L=A%aipo.calendar.maximum_to;
var O=M[A].text.replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/</g,"&lt;").replace(/>/g,"&gt;");
T+='<span class="dispUser color'+L+'">'+O+"</span>"
}var N=B.byId("picked_memberlist-"+this.tmpPortretId);
if(N){this.dropDown.removeMember(N);
var R=N.options;
for(var A=0;
A<R.length;
A++){(function(D,C){D.selected=true
})(R[A],A)
}this.dropDown.addMember(B.byId("member_to-"+this.tmpPortretId),B.byId("picked_memberlist-"+this.tmpPortretId))
}Q.innerHTML=T
},_openDropDown:function(){var J=this.dropDown;
var O=J.domNode.style.width;
var N=this;
dijit.popup.open({parent:this,popup:J,around:this.domNode,orient:this.isLeftToRight()?{BL:"TL",BR:"TR",TL:"BL",TR:"BR"}:{BR:"TR",BL:"TL",TR:"BR",TL:"BL"},onExecute:function(){N._closeDropDown(true)
},onCancel:function(){N._closeDropDown(true)
},onClose:function(){aipo.calendar.populateWeeklySchedule(N.tmpPortretId);
J.domNode.style.width=O;
N.popupStateNode.removeAttribute("popupActive");
this._opened=false
}});
if(this.domNode.offsetWidth>J.domNode.offsetWidth){var K=null;
if(!this.isLeftToRight()){K=J.domNode.parentNode;
var P=K.offsetLeft+K.offsetWidth
}B.marginBox(J.domNode,{w:this.domNode.offsetWidth});
if(K){K.style.left=P-this.domNode.offsetWidth+"px"
}}this.popupStateNode.setAttribute("popupActive","true");
this._opened=true;
if(J.focus){J.focus()
}var L=window.navigator.userAgent.toLowerCase();
if(L.indexOf("chrome")>-1||(B.isFF&&(B.isFF>=3.6))){var M=this.dropDown.domNode.parentNode;
var A=M.style.top.replace("px","");
top_new=parseInt(A)+window.scrollY;
M.style.top=top_new+"px"
}},_onDropDownClick:function(A){var D=B.byId("groupselect-"+this.tmpPortretId);
if(D&&D.value!="pickup"){return false
}aimluck.widget.Dropdown.prototype._onDropDownClick.call(this,A)
}})
}}});