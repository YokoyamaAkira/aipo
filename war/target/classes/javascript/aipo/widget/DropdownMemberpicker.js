if(!dojo._hasResource["aipo.widget.DropdownMemberpicker"]){dojo._hasResource["aipo.widget.DropdownMemberpicker"]=true;
dojo.provide("aipo.widget.DropdownMemberpicker");
dojo.require("aimluck.widget.Dropdown");
dojo.require("aipo.widget.MemberSelectList");
dojo.declare("aipo.widget.DropdownMemberpicker",[aimluck.widget.Dropdown],{inputWidth:"250px",hiddenId:"",hiddenValue:"",iconURL:"",iconAlt:"",selectId:"",inputId:"",inputValue:"",buttonAddId:"",buttonRemoveId:"",memberFromId:"",memberToTitle:"",memberToId:"",memberFromUrl:"",memberFromOptionKey:"",memberFromOptionValue:"",groupSelectId:"",groupSelectPreOptionKey:"",groupSelectPreOptionValue:"",groupSelectOptionKey:"",groupSelectOptionValue:"",memberGroupUrl:"",changeGroupUrl:"",listWidgetId:"memberlistwidget",templateString:'<div class="dijit dijitLeft dijitInline"\n\tdojoAttachEvent="onmouseenter:_onMouse,onmouseleave:_onMouse,onmousedown:_onMouse,onclick:_onDropDownClick,onkeydown:_onDropDownKeydown,onblur:_onDropDownBlur,onkeypress:_onKey"\n\t><div class=\'dijitRight\'>\n\t<span class="" type="${type}"\n\t\tdojoAttachPoint="focusNode,titleNode" waiRole="button" waiState="haspopup-true,labelledby-${id}_label"\n\t\t><span class="" \tdojoAttachPoint="containerNode,popupStateNode"\n\t\tid="${id}_label"><img src="${iconURL}" alt="${iconAlt}" style="cursor:pointer;cursor:hand;padding-right:2px" align="top" />\n\t</span><select name="${selectId}" id="${selectId}" size="10" multiple="multiple" style="display:none" dojoAttachPoint="selectNode"></select><input type="hidden" id="${hiddenId}" name="${hiddenId}" value="${hiddenValue}" dojoAttachPoint="valueNode" /><span name="${inputId}" id="${inputId}" dojoAttachPoint="inputNode">${inputValue}</span>\n</div></div>\n',postCreate:function(){var A={widgetId:this.listWidgetId,selectId:this.selectId,inputId:this.inputId,buttonAddId:this.buttonAddId,buttonRemoveId:this.buttonRemoveId,memberFromId:this.memberFromId,memberToTitle:this.memberToTitle,memberToId:this.memberToId,memberFromUrl:this.memberFromUrl,memberFromOptionKey:this.memberFromOptionKey,memberFromOptionValue:this.memberFromOptionValue,groupSelectId:this.groupSelectId,groupSelectPreOptionKey:this.groupSelectPreOptionKey,groupSelectPreOptionValue:this.groupSelectPreOptionValue,groupSelectOptionKey:this.groupSelectOptionKey,groupSelectOptionValue:this.groupSelectOptionValue,memberGroupUrl:this.memberGroupUrl,changeGroupUrl:this.changeGroupUrl};
var B=dijit.byId(this.listWidgetId);
if(B){this.dropDown=B;
var C=dojo.byId(B.selectId);
this.removeAllOptions(C);
C=dojo.byId(B.memberToId);
this.removeAllOptions(C)
}else{this.dropDown=new aipo.widget.MemberSelectList(A,this.listWidgetId)
}this.inherited(arguments)
},removeAllOptions:function(C){var A;
if(document.all){var B=C.options;
for(A=0;
A<B.length;
A++){B.remove(A);
A-=1
}}else{var B=C.options;
for(A=0;
A<B.length;
A++){C.removeChild(B[A]);
A-=1
}}},addOptionSync:function(B,C,D){var F=dojo.byId(this.memberToId);
var E=dojo.byId(this.selectId);
if(this.memberLimit!=0&&F.options.length>=this.memberLimit){return 
}if(document.all){var A=document.createElement("OPTION");
A.value=B;
A.text=C;
A.selected=D;
var G=document.createElement("OPTION");
G.value=B;
G.text=C;
G.selected=D;
if(F.options.length==1&&F.options[0].value==""){F.options.remove(0);
E.options.remove(0)
}F.add(A,F.options.length);
E.add(G,E.options.length)
}else{var A=document.createElement("OPTION");
A.value=B;
A.text=C;
A.selected=D;
var G=document.createElement("OPTION");
G.value=B;
G.text=C;
G.selected=D;
if(F.options.length==1&&F.options[0].value==""){F.removeChild(F.options[0]);
E.removeChild(F.options[0])
}F.insertBefore(A,F.options[F.options.length]);
E.insertBefore(G,E.options[E.options.length])
}this.inputMemberSync()
},inputMemberSync:function(){var A=dojo.byId(this.selectId);
var B=dojo.byId(this.inputId);
var D="";
var E=A.options;
var C=0;
var F=E.length;
if(F<=0){return 
}for(C=0;
C<F;
C++){if(C!=0){D+=", "
}D+=E[C].text
}B.innerHTML=D
}})
};