if(!dojo._hasResource["aipo.widget.DropdownMemberpicker"]){dojo._hasResource["aipo.widget.DropdownMemberpicker"]=true;
dojo.provide("aipo.widget.DropdownMemberpicker");
dojo.require("aimluck.widget.Dropdown");
dojo.require("aipo.widget.MemberSelectList");
dojo.declare("aipo.widget.DropdownMemberpicker",[aimluck.widget.Dropdown],{inputWidth:"250px",hiddenId:"",hiddenValue:"",iconURL:"",iconAlt:"",selectId:"",inputId:"",inputValue:"",buttonAddId:"",buttonRemoveId:"",memberFromId:"",memberToTitle:"",memberToId:"",memberFromUrl:"",memberFromOptionKey:"",memberFromOptionValue:"",groupSelectId:"",groupSelectPreOptionKey:"",groupSelectPreOptionValue:"",groupSelectOptionKey:"",groupSelectOptionValue:"",memberGroupUrl:"",changeGroupUrl:"",listWidgetId:"memberlistwidget",templateString:'<div class="dijit dijitLeft dijitInline"\n\tdojoAttachEvent="onmouseenter:_onMouse,onmouseleave:_onMouse,onmousedown:_onMouse,onclick:_onDropDownClick,onkeydown:_onDropDownKeydown,onblur:_onDropDownBlur,onkeypress:_onKey"\n\t><div class=\'dijitRight\'>\n\t<span class="" type="${type}"\n\t\tdojoAttachPoint="focusNode,titleNode" waiRole="button" waiState="haspopup-true,labelledby-${id}_label"\n\t\t><span class="" \tdojoAttachPoint="containerNode,popupStateNode"\n\t\tid="${id}_label"><img src="${iconURL}" alt="${iconAlt}" style="cursor:pointer;cursor:hand;padding-right:2px" align="top" />\n\t</span><select name="${selectId}" id="${selectId}" size="10" multiple="multiple" style="display:none" dojoAttachPoint="selectNode"></select><input type="hidden" id="${hiddenId}" name="${hiddenId}" value="${hiddenValue}" dojoAttachPoint="valueNode" /><span name="${inputId}" id="${inputId}" dojoAttachPoint="inputNode">${inputValue}</span>\n</div></div>\n',postCreate:function(){var B={widgetId:this.listWidgetId,selectId:this.selectId,inputId:this.inputId,buttonAddId:this.buttonAddId,buttonRemoveId:this.buttonRemoveId,memberFromId:this.memberFromId,memberToTitle:this.memberToTitle,memberToId:this.memberToId,memberFromUrl:this.memberFromUrl,memberFromOptionKey:this.memberFromOptionKey,memberFromOptionValue:this.memberFromOptionValue,groupSelectId:this.groupSelectId,groupSelectPreOptionKey:this.groupSelectPreOptionKey,groupSelectPreOptionValue:this.groupSelectPreOptionValue,groupSelectOptionKey:this.groupSelectOptionKey,groupSelectOptionValue:this.groupSelectOptionValue,memberGroupUrl:this.memberGroupUrl,changeGroupUrl:this.changeGroupUrl};
var C=dijit.byId(this.listWidgetId);
if(C){this.dropDown=C;
var A=dojo.byId(C.selectId);
this.removeAllOptions(A);
A=dojo.byId(C.memberToId);
this.removeAllOptions(A)
}else{this.dropDown=new aipo.widget.MemberSelectList(B,this.listWidgetId)
}this.inherited(arguments)
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
},inputMemberSync:function(){var B=dojo.byId(this.selectId);
var C=dojo.byId(this.inputId);
var E="";
var F=B.options;
var D=0;
var A=F.length;
if(A<=0){return 
}for(D=0;
D<A;
D++){if(D!=0){E+=", "
}E+=F[D].text
}C.innerHTML=E
}})
};