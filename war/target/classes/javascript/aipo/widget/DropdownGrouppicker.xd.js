dojo._xdResourceLoaded({depends:[["provide","aipo.widget.DropdownGrouppicker"],["require","aimluck.widget.Dropdown"],["require","aipo.widget.GroupSelectList"]],defineResource:function(A){if(!A._hasResource["aipo.widget.DropdownGrouppicker"]){A._hasResource["aipo.widget.DropdownGrouppicker"]=true;
A.provide("aipo.widget.DropdownGrouppicker");
A.require("aimluck.widget.Dropdown");
A.require("aipo.widget.GroupSelectList");
A.declare("aipo.widget.DropdownGrouppicker",[aimluck.widget.Dropdown],{inputWidth:"250px",hiddenId:"",hiddenValue:"",iconURL:"",iconAlt:"",selectId:"",inputId:"",inputValue:"",buttonAddId:"",buttonRemoveId:"",memberFromTitle:"",memberFromId:"",memberToTitle:"",memberToId:"",memberFromUrl:"",memberFromOptionKey:"",memberFromOptionValue:"",groupSelectId:"",groupSelectOptionKey:"",groupSelectOptionValue:"",memberGroupUrl:"",changeGroupUrl:"",listWidgetId:"",templateString:'<div class="dijit dijitLeft dijitInline"\n\tdojoAttachEvent="onmouseenter:_onMouse,onmouseleave:_onMouse,onmousedown:_onMouse,onclick:_onDropDownClick,onkeydown:_onDropDownKeydown,onblur:_onDropDownBlur,onkeypress:_onKey"\n\t><div class=\'dijitRight\'>\n\t<span class="" type="${type}"\n\t\tdojoAttachPoint="focusNode,titleNode" waiRole="button" waiState="haspopup-true,labelledby-${id}_label"\n\t\t><span class="" \tdojoAttachPoint="containerNode,popupStateNode"\n\t\tid="${id}_label"><img src="${iconURL}" alt="${iconAlt}" style="cursor:pointer;cursor:hand;padding-right:2px" align="top" />\n\t</span><select name="${selectId}" id="${selectId}" size="10" multiple="multiple" style="display:none" dojoAttachPoint="selectNode"></select><input type="hidden" id="${hiddenId}" name="${hiddenId}" value="${hiddenValue}" dojoAttachPoint="valueNode" /><span name="${inputId}" id="${inputId}" dojoAttachPoint="inputNode">${inputValue}</span>\n</div></div>\n',postCreate:function(){var C={widgetId:this.listWidgetId,selectId:this.selectId,inputId:this.inputId,buttonAddId:this.buttonAddId,buttonRemoveId:this.buttonRemoveId,memberFromTitle:this.memberFromTitle,memberFromId:this.memberFromId,memberToTitle:this.memberToTitle,memberToId:this.memberToId,memberFromUrl:this.memberFromUrl,memberFromOptionKey:this.memberFromOptionKey,memberFromOptionValue:this.memberFromOptionValue};
var D=dijit.byId(this.listWidgetId);
if(D){this.dropDown=D;
var B=A.byId(D.selectId);
this.removeAllOptions(B);
B=A.byId(D.memberToId);
this.removeAllOptions(B)
}else{this.dropDown=new aipo.widget.GroupSelectList(C,this.listWidgetId)
}this.inherited(arguments)
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
},inputMemberSync:function(){var C=A.byId(this.selectId);
var D=A.byId(this.inputId);
var F="";
var G=C.options;
var E=0;
var B=G.length;
if(B<=0){return 
}for(E=0;
E<B;
E++){if(E!=0){F+=", "
}F+=G[E].text
}D.innerHTML=F
}})
}}});