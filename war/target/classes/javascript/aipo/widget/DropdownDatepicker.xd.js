dojo._xdResourceLoaded({depends:[["provide","aipo.widget.DropdownDatepicker"],["require","aimluck.widget.Dropdown"],["require","aipo.widget.DateCalendar"],["require","dojo.date.locale"]],defineResource:function(A){if(!A._hasResource["aipo.widget.DropdownDatepicker"]){A._hasResource["aipo.widget.DropdownDatepicker"]=true;
A.provide("aipo.widget.DropdownDatepicker");
A.require("aimluck.widget.Dropdown");
A.require("aipo.widget.DateCalendar");
A.require("dojo.date.locale");
A.declare("aipo.widget.DropdownDatepicker",[aimluck.widget.Dropdown],{dateId:"",dateValue:"",initValue:"",displayCheck:"",iconURL:"",iconAlt:"",callback:function(){},listWidgetId:"datewidget",templateString:'<div class="dijit dijitLeft dijitInline"><div dojoAttachEvent="onmouseenter:_onMouse,onmouseleave:_onMouse,onmousedown:_onMouse,onclick:_onDropDownClick,onkeydown:_onDropDownKeydown,onblur:_onDropDownBlur,onkeypress:_onKey"\n\t style="float:left;"><div class=\'dijitRight\'>\n\t<span class="" type="${type}"\n\t\tdojoAttachPoint="focusNode,titleNode" waiRole="button" waiState="haspopup-true,labelledby-${id}_label"\n\t\t><span class="" \tdojoAttachPoint="containerNode,popupStateNode"\n\t\tid="${id}_label"><img src="${iconURL}" alt="${iconAlt}" style="cursor:pointer;cursor:hand;padding-right:2px" align="top" />\n\t</span></div></div><div class="alignleft"><span name="${dateId}_view" id="${dateId}_view" dojoAttachPoint="inputNode" style="vertical-align:middle;background:#ffffff ;border:0px;" autocomplete="off" readonly="readonly"></span><span style="display:${displayCheck}"><input name="${dateId}_check" type="checkbox" value="TRUE" id="${dateId}_flag" dojoAttachEvent="onclick:onCheckBlank" /><label for="${dateId}_flag">\u0020\u6307\u5b9a\u3057\u306a\u3044</label></span><input type="hidden" id="${dateId}" name="${dateId}" value="${dateValue}" dojoAttachPoint="valueNode" /><input type="hidden" id="${dateId}_year" name="${dateId}_year" value="" dojoAttachPoint="valueYearNode" /><input type="hidden" id="${dateId}_month" name="${dateId}_month" value="" dojoAttachPoint="valueMonthNode" /><input type="hidden" id="${dateId}_day" name="${dateId}_day" value="" dojoAttachPoint="valueDayNode" /></div></div>\n',_openDropDown:function(){aimluck.widget.Dropdown.prototype._openDropDown.apply(this);
if(aipo.userAgent.isAndroid()){A.query("input,select,button").forEach(function(C,B){C.disabled=true
})
}},_closeDropDown:function(){aimluck.widget.Dropdown.prototype._closeDropDown.apply(this);
if(aipo.userAgent.isAndroid()){A.query("input,select,button:not(.disabled)").forEach(function(C,B){C.disabled=false
})
}},postCreate:function(){this.inherited(arguments);
var G={widgetId:this.listWidgetId,dateId:this.dateId,callback:this.callback};
this.dropDown=new aipo.widget.DateCalendar(G,this.listWidgetId);
if(this.initValue!=""){var C=this.initValue.split("/");
if(C.length==3){var E=C[0];
var B=C[1]-1;
var D=C[2];
var F=A.byId(this.dateId);
F.value=this.initValue;
this.dropDown.clearDate();
this.dropDown.setValue(new Date(E,B,D))
}}else{this.dropDown.disabledCalendar(true)
}},onCheckBlank:function(B){this.dropDown.disabledCalendar(A.byId(this.dateId+"_flag").checked)
}})
}}});