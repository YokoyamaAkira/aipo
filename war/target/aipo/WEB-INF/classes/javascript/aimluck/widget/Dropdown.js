if(!dojo._hasResource["aimluck.widget.Dropdown"]){dojo._hasResource["aimluck.widget.Dropdown"]=true;
dojo.provide("aimluck.widget.Dropdown");
dojo.require("dijit.form.Button");
dojo.declare("aimluck.widget.Dropdown",[dijit.form.DropDownButton],{inputWidth:"250px",hiddenId:"",hiddenValue:"",inputId:"",inputValue:"",selectId:"",iconURL:"",iconAlt:"",templateString:'<div class="dijit dijitLeft dijitInline"\n\tdojoAttachEvent="onmouseenter:_onMouse,onmouseleave:_onMouse,onmousedown:_onMouse,onclick:_onDropDownClick,onkeydown:_onDropDownKeydown,onblur:_onDropDownBlur,onkeypress:_onKey"\n\t><div class=\'dijitRight\'>\n\t<span class="" type="${type}"\n\t\tdojoAttachPoint="focusNode,titleNode" waiRole="button" waiState="haspopup-true,labelledby-${id}_label"\n\t\t><span class="" \tdojoAttachPoint="containerNode,popupStateNode"\n\t\tid="${id}_label"><img src="${iconURL}" alt="${iconAlt}" style="cursor:pointer;cursor:hand;padding-right:2px" align="top" />\n\t</span><select name="${selectId}" id="${selectId}" size="10" multiple="multiple" style="display:none" dojoAttachPoint="selectNode"></select><input type="hidden" id="${hiddenId}" name="${hiddenId}" value="${hiddenValue}" dojoAttachPoint="valueNode" /><span name="${inputId}" id="${inputId}" dojoAttachPoint="inputNode">${inputValue}</span>\n</div></div>\n',_openDropDown:function(){this.inherited(arguments);
var A=window.navigator.userAgent.toLowerCase();
if(A.indexOf("chrome")>-1||(dojo.isFF&&(dojo.isFF>=3.6))){var C=this.dropDown.domNode.parentNode;
var B=C.style.top.replace("px","");
top_new=parseInt(B)+window.scrollY;
C.style.top=top_new+"px"
}},_toggleDropDown:function(){if(this.disabled){return 
}dijit.focus(this.popupStateNode);
var B=this.dropDown;
if(!B){return false
}if(!this._opened){if(B.href&&!B.isLoaded){var C=this;
var A=dojo.connect(B,"onLoad",function(){dojo.disconnect(A);
C._openDropDown()
});
B._loadCheck(true);
return 
}else{this._openDropDown()
}}else{this._closeDropDown()
}}})
};