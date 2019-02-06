dojo._xdResourceLoaded({depends:[["provide","aipo.widget.DropdownMemberpicker"],["require","aimluck.widget.Dropdown"],["require","aipo.widget.MemberSelectList"]],defineResource:function(A){if(!A._hasResource["aipo.widget.DropdownMemberpicker"]){A._hasResource["aipo.widget.DropdownMemberpicker"]=true;
A.provide("aipo.widget.DropdownMemberpicker");
A.require("aimluck.widget.Dropdown");
A.require("aipo.widget.MemberSelectList");
A.declare("aipo.widget.DropdownMemberpicker",[aimluck.widget.Dropdown],{inputWidth:"250px",hiddenId:"",hiddenValue:"",iconURL:"",iconAlt:"",selectId:"",inputId:"",inputValue:"",buttonAddId:"",buttonRemoveId:"",memberFromId:"",memberToTitle:"",memberToId:"",memberFromUrl:"",memberFromOptionKey:"",memberFromOptionValue:"",groupSelectId:"",groupSelectPreOptionKey:"",groupSelectPreOptionValue:"",groupSelectOptionKey:"",groupSelectOptionValue:"",memberGroupUrl:"",changeGroupUrl:"",listWidgetId:"memberlistwidget",templateString:'<div class="dijit dijitLeft dijitInline"\n\tdojoAttachEvent="onmouseenter:_onMouse,onmouseleave:_onMouse,onmousedown:_onMouse,onclick:_onDropDownClick,onkeydown:_onDropDownKeydown,onblur:_onDropDownBlur,onkeypress:_onKey"\n\t><div class=\'dijitRight\'>\n\t<span class="" type="${type}"\n\t\tdojoAttachPoint="focusNode,titleNode" waiRole="button" waiState="haspopup-true,labelledby-${id}_label"\n\t\t><span class="" \tdojoAttachPoint="containerNode,popupStateNode"\n\t\tid="${id}_label"><img src="${iconURL}" alt="${iconAlt}" style="cursor:pointer;cursor:hand;padding-right:2px" align="top" />\n\t</span><select name="${selectId}" id="${selectId}" size="10" multiple="multiple" style="display:none" dojoAttachPoint="selectNode"></select><input type="hidden" id="${hiddenId}" name="${hiddenId}" value="${hiddenValue}" dojoAttachPoint="valueNode" /><span name="${inputId}" id="${inputId}" dojoAttachPoint="inputNode">${inputValue}</span>\n</div></div>\n',postCreate:function(){var D={widgetId:this.listWidgetId,selectId:this.selectId,inputId:this.inputId,buttonAddId:this.buttonAddId,buttonRemoveId:this.buttonRemoveId,memberFromId:this.memberFromId,memberToTitle:this.memberToTitle,memberToId:this.memberToId,memberFromUrl:this.memberFromUrl,memberFromOptionKey:this.memberFromOptionKey,memberFromOptionValue:this.memberFromOptionValue,groupSelectId:this.groupSelectId,groupSelectPreOptionKey:this.groupSelectPreOptionKey,groupSelectPreOptionValue:this.groupSelectPreOptionValue,groupSelectOptionKey:this.groupSelectOptionKey,groupSelectOptionValue:this.groupSelectOptionValue,memberGroupUrl:this.memberGroupUrl,changeGroupUrl:this.changeGroupUrl};
var B=dijit.byId(this.listWidgetId);
if(B){this.dropDown=B;
var C=A.byId(B.selectId);
this.removeAllOptions(C);
C=A.byId(B.memberToId);
this.removeAllOptions(C)
}else{this.dropDown=new aipo.widget.MemberSelectList(D,this.listWidgetId)
}this.inherited(arguments)
},removeAllOptions:function(C){var D;
if(document.all){var B=C.options;
for(D=0;
D<B.length;
D++){B.remove(D);
D-=1
}}else{var B=C.options;
for(D=0;
D<B.length;
D++){C.removeChild(B[D]);
D-=1
}}},addOptionSync:function(E,F,C){var H=A.byId(this.memberToId);
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
},inputMemberSync:function(){var D=A.byId(this.selectId);
var E=A.byId(this.inputId);
var G="";
var C=D.options;
var F=0;
var B=C.length;
if(B<=0){return 
}for(F=0;
F<B;
F++){if(F!=0){G+=", "
}G+=C[F].text
}E.innerHTML=G
}})
}}});