if(!dojo._hasResource["aipo.widget.DropdownActivityChecker"]){dojo._hasResource["aipo.widget.DropdownActivityChecker"]=true;
dojo.provide("aipo.widget.DropdownActivityChecker");
dojo.require("aimluck.widget.Dropdown");
dojo.require("aipo.widget.ActivityList");
dojo.declare("aipo.widget.DropdownActivityChecker",[aimluck.widget.Dropdown],{initValue:"",displayCheck:"",iconURL:"",iconAlt:"",iconWidth:"",iconHeight:"",callback:function(){},templateString:'<div class="dijit dijitLeft dijitInline"\n\tdojoAttachEvent="onmouseenter:_onMouse,onmouseleave:_onMouse,onmousedown:_onMouse,onclick:_onDropDownClick,onkeydown:_onDropDownKeydown,onblur:_onDropDownBlur,onkeypress:_onKey"\n\t><div style="outline:0" class="" type="${type}"\n\t\tdojoAttachPoint="focusNode,titleNode" waiRole="button" waiState="haspopup-true,labelledby-${id}_label"\n\t\t><div class="" \tdojoAttachPoint="containerNode,popupStateNode"\n\t\tid="${id}_label"><div id="activitychecker" class="zero counter"></div><span class="mb_hide">お知らせ</span></div></div></div>\n',postCreate:function(){this.inherited(arguments);
this.dropDown=new aipo.widget.ActivityList({},"activityLiteList")
},_openDropDown:function(){this.inherited(arguments);
this.dropDown.reload()
},onCheckActivity:function(B){var A=dojo.byId("activitychecker");
if(B>99){A.innerHTML="99+";
dojo.removeClass("activitychecker","zero")
}else{if(B==0){A.innerHTML=B;
dojo.addClass("activitychecker","zero")
}else{A.innerHTML=B;
dojo.removeClass("activitychecker","zero")
}}},onCheckBlank:function(A){}})
};