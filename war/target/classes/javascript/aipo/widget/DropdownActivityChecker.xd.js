dojo._xdResourceLoaded({depends:[["provide","aipo.widget.DropdownActivityChecker"],["require","aimluck.widget.Dropdown"],["require","aipo.widget.ActivityList"]],defineResource:function(A){if(!A._hasResource["aipo.widget.DropdownActivityChecker"]){A._hasResource["aipo.widget.DropdownActivityChecker"]=true;
A.provide("aipo.widget.DropdownActivityChecker");
A.require("aimluck.widget.Dropdown");
A.require("aipo.widget.ActivityList");
A.declare("aipo.widget.DropdownActivityChecker",[aimluck.widget.Dropdown],{initValue:"",displayCheck:"",iconURL:"",iconAlt:"",iconWidth:"",iconHeight:"",callback:function(){},templateString:'<div class="dijit dijitLeft dijitInline"\n\tdojoAttachEvent="onmouseenter:_onMouse,onmouseleave:_onMouse,onmousedown:_onMouse,onclick:_onDropDownClick,onkeydown:_onDropDownKeydown,onblur:_onDropDownBlur,onkeypress:_onKey"\n\t><div style="outline:0" class="" type="${type}"\n\t\tdojoAttachPoint="focusNode,titleNode" waiRole="button" waiState="haspopup-true,labelledby-${id}_label"\n\t\t><div class="" \tdojoAttachPoint="containerNode,popupStateNode"\n\t\tid="${id}_label"><div id="activitychecker" class="zero counter"></div>お知らせ</div></div></div>\n',postCreate:function(){this.inherited(arguments);
this.dropDown=new aipo.widget.ActivityList({},"activityLiteList")
},_openDropDown:function(){this.inherited(arguments);
this.dropDown.reload()
},onCheckActivity:function(C){var B=A.byId("activitychecker");
if(C>99){B.innerHTML="99+";
A.removeClass("activitychecker","zero")
}else{if(C==0){B.innerHTML=C;
A.addClass("activitychecker","zero")
}else{B.innerHTML=C;
A.removeClass("activitychecker","zero")
}}},onCheckBlank:function(B){}})
}}});