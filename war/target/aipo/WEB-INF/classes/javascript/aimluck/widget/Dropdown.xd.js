dojo._xdResourceLoaded({depends:[["provide","aimluck.widget.Dropdown"],["require","dijit.form.Button"]],defineResource:function(A){if(!A._hasResource["aimluck.widget.Dropdown"]){A._hasResource["aimluck.widget.Dropdown"]=true;
A.provide("aimluck.widget.Dropdown");
A.require("dijit.form.Button");
A.declare("aimluck.widget.Dropdown",[dijit.form.DropDownButton],{inputWidth:"250px",hiddenId:"",hiddenValue:"",inputId:"",inputValue:"",selectId:"",iconURL:"",iconAlt:"",templateString:'<div class="dijit dijitLeft dijitInline"\n\tdojoAttachEvent="onmouseenter:_onMouse,onmouseleave:_onMouse,onmousedown:_onMouse,onclick:_onDropDownClick,onkeydown:_onDropDownKeydown,onblur:_onDropDownBlur,onkeypress:_onKey"\n\t><div class=\'dijitRight\'>\n\t<span class="" type="${type}"\n\t\tdojoAttachPoint="focusNode,titleNode" waiRole="button" waiState="haspopup-true,labelledby-${id}_label"\n\t\t><span class="" \tdojoAttachPoint="containerNode,popupStateNode"\n\t\tid="${id}_label"><img src="${iconURL}" alt="${iconAlt}" style="cursor:pointer;cursor:hand;padding-right:2px" align="top" />\n\t</span><select name="${selectId}" id="${selectId}" size="10" multiple="multiple" style="display:none" dojoAttachPoint="selectNode"></select><input type="hidden" id="${hiddenId}" name="${hiddenId}" value="${hiddenValue}" dojoAttachPoint="valueNode" /><span name="${inputId}" id="${inputId}" dojoAttachPoint="inputNode">${inputValue}</span>\n</div></div>\n',_openDropDown:function(){this.inherited(arguments);
var C=window.navigator.userAgent.toLowerCase();
if(C.indexOf("chrome")>-1||(A.isFF&&(A.isFF>=3.6))){var B=this.dropDown.domNode.parentNode;
var D=B.style.top.replace("px","");
top_new=parseInt(D)+window.scrollY;
B.style.top=top_new+"px"
}},_toggleDropDown:function(){if(this.disabled){return 
}dijit.focus(this.popupStateNode);
var D=this.dropDown;
if(!D){return false
}if(!this._opened){if(D.href&&!D.isLoaded){var B=this;
var C=A.connect(D,"onLoad",function(){A.disconnect(C);
B._openDropDown()
});
D._loadCheck(true);
return 
}else{this._openDropDown()
}}else{this._closeDropDown()
}}})
}}});