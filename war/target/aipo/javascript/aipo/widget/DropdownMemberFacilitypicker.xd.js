dojo._xdResourceLoaded({depends:[["provide","aipo.widget.DropdownMemberFacilitypicker"],["require","aimluck.widget.Dropdown"],["require","aipo.widget.MemberFacilitySelectList"]],defineResource:function(A){if(!A._hasResource["aipo.widget.DropdownMemberFacilitypicker"]){A._hasResource["aipo.widget.DropdownMemberFacilitypicker"]=true;
A.provide("aipo.widget.DropdownMemberFacilitypicker");
A.require("aimluck.widget.Dropdown");
A.require("aipo.widget.MemberFacilitySelectList");
A.declare("aipo.widget.DropdownMemberFacilitypicker",[aimluck.widget.Dropdown],{inputWidth:"250px",hiddenId:"",hiddenValue:"",iconURL:"",iconAlt:"",selectId:"",inputId:"",inputValue:"",buttonAddId:"",buttonRemoveId:"",memberFromId:"",memberToId:"",memberFromUrl:"",memberFromOptionKey:"",memberFromOptionValue:"",groupSelectId:"",groupSelectOptionKey:"",groupSelectOptionValue:"",memberGroupUrl:"",changeGroupUrl:"",listWidgetId:"",tmpPortretId:"cinit",templateString:'<div class="dijit dijitLeft dijitInline"\n\tdojoAttachEvent="onmouseenter:_onMouse,onmouseleave:_onMouse,onmousedown:_onMouse,onclick:_onDropDownClick,onkeydown:_onDropDownKeydown,onblur:_onDropDownBlur,onkeypress:_onKey"\n\t><div class=\'dijitRight\'>\n\t<span class="" type="${type}"\n\t\tdojoAttachPoint="focusNode,titleNode" waiRole="button" waiState="haspopup-true,labelledby-${id}_label"\n\t\t><span class="" \tdojoAttachPoint="containerNode,popupStateNode"\n\t\tid="${id}_label"></span><select name="${selectId}" id="${selectId}" size="10" multiple="multiple" style="display:none" dojoAttachPoint="selectNode"></select><input type="hidden" id="${hiddenId}" name="${hiddenId}" value="${hiddenValue}" dojoAttachPoint="valueNode" /><span name="${inputId}" id="${inputId}" dojoAttachPoint="inputNode">${inputValue}</span>\n<span id="adduser-${tmpPortretId}" class="small addUser">ユーザー追加</span></div></div>\n',postCreate:function(){var B={widgetId:this.listWidgetId,selectId:this.selectId,inputId:this.inputId,buttonAddId:this.buttonAddId,buttonRemoveId:this.buttonRemoveId,memberFromId:this.memberFromId,memberToId:this.memberToId,memberFromUrl:this.memberFromUrl,memberFromOptionKey:this.memberFromOptionKey,memberFromOptionValue:this.memberFromOptionValue,groupSelectId:this.groupSelectId,groupSelectOptionKey:this.groupSelectOptionKey,groupSelectOptionValue:this.groupSelectOptionValue,memberGroupUrl:this.memberGroupUrl,changeGroupUrl:this.changeGroupUrl,tmpPortretId:this.tmpPortretId};
this.listWidgetId="memberfacilitylistwidget-"+this.tmpPortretId;
var C=dijit.byId(this.listWidgetId);
if(C){dijit.registry.remove(this.listWidgetId)
}this.dropDown=new aipo.widget.MemberFacilitySelectList(B,this.listWidgetId);
this.inherited(arguments)
},removeAllOptions:function(B){var C;
if(document.all){var D=B.options;
for(C=0;
C<D.length;
C++){D.remove(C);
C-=1
}}else{var D=B.options;
for(C=0;
C<D.length;
C++){B.removeChild(D[C]);
C-=1
}}},addOptionSync:function(F,G,H){var C=A.byId(this.memberToId);
var B=A.byId(this.selectId);
if(this.memberLimit!=0&&C.options.length>=this.memberLimit){return 
}if(document.all){var E=document.createElement("OPTION");
E.value=F;
E.text=G;
E.selected=H;
var D=document.createElement("OPTION");
D.value=F;
D.text=G;
D.selected=H;
if(C.options.length==1&&C.options[0].value==""){C.options.remove(0);
B.options.remove(0)
}C.add(E,C.options.length);
B.add(D,B.options.length)
}else{var E=document.createElement("OPTION");
E.value=F;
E.text=G;
E.selected=H;
var D=document.createElement("OPTION");
D.value=F;
D.text=G;
D.selected=H;
if(C.options.length==1&&C.options[0].value==""){C.removeChild(C.options[0]);
B.removeChild(C.options[0])
}C.insertBefore(E,C.options[C.options.length]);
B.insertBefore(D,B.options[B.options.length])
}this.inputMemberSync()
},inputMemberSync:function(){var I=A.byId(this.selectId);
var H=A.byId(this.inputId);
var E="";
var B=I.options;
var F=B.length;
if(F<=0){return 
}for(var D=0;
D<F;
D++){if(D!=0){E+=" "
}var C=D%aipo.calendar.maximum_to;
var J=B[D].text.replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/</g,"&lt;").replace(/>/g,"&gt;");
E+='<span class="dispUser color'+C+'">'+J+"</span>"
}var K=A.byId("picked_memberlist-"+this.tmpPortretId);
if(K){this.dropDown.removeMember(K);
var G=K.options;
for(var D=0;
D<G.length;
D++){(function(M,L){M.selected=true
})(G[D],D)
}this.dropDown.addMember(A.byId("member_to-"+this.tmpPortretId),A.byId("picked_memberlist-"+this.tmpPortretId))
}H.innerHTML=E
},_openDropDown:function(){var H=this.dropDown;
var C=H.domNode.style.width;
var D=this;
dijit.popup.open({parent:this,popup:H,around:this.domNode,orient:this.isLeftToRight()?{BL:"TL",BR:"TR",TL:"BL",TR:"BR"}:{BR:"TR",BL:"TL",TR:"BR",TL:"BL"},onExecute:function(){D._closeDropDown(true)
},onCancel:function(){D._closeDropDown(true)
},onClose:function(){aipo.calendar.populateWeeklySchedule(D.tmpPortretId);
H.domNode.style.width=C;
D.popupStateNode.removeAttribute("popupActive");
this._opened=false
}});
if(this.domNode.offsetWidth>H.domNode.offsetWidth){var G=null;
if(!this.isLeftToRight()){G=H.domNode.parentNode;
var B=G.offsetLeft+G.offsetWidth
}A.marginBox(H.domNode,{w:this.domNode.offsetWidth});
if(G){G.style.left=B-this.domNode.offsetWidth+"px"
}}this.popupStateNode.setAttribute("popupActive","true");
this._opened=true;
if(H.focus){H.focus()
}var F=window.navigator.userAgent.toLowerCase();
if(F.indexOf("chrome")>-1||(A.isFF&&(A.isFF>=3.6))){var E=this.dropDown.domNode.parentNode;
var I=E.style.top.replace("px","");
top_new=parseInt(I)+window.scrollY;
E.style.top=top_new+"px"
}},_onDropDownClick:function(C){var B=A.byId("groupselect-"+this.tmpPortretId);
if(B&&B.value!="pickup"){return false
}aimluck.widget.Dropdown.prototype._onDropDownClick.call(this,C)
}})
}}});