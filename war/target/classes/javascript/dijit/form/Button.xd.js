dojo._xdResourceLoaded({depends:[["provide","dijit.form.Button"],["require","dijit.form._FormWidget"],["require","dijit._Container"]],defineResource:function(A){if(!A._hasResource["dijit.form.Button"]){A._hasResource["dijit.form.Button"]=true;
A.provide("dijit.form.Button");
A.require("dijit.form._FormWidget");
A.require("dijit._Container");
A.declare("dijit.form.Button",dijit.form._FormWidget,{label:"",showLabel:true,iconClass:"",type:"button",baseClass:"dijitButton",templateString:'<div class="dijit dijitLeft dijitInline dijitButton"\r\n\tdojoAttachEvent="onclick:_onButtonClick,onmouseenter:_onMouse,onmouseleave:_onMouse,onmousedown:_onMouse"\r\n\t><div class=\'dijitRight\'\r\n\t\t><button class="dijitStretch dijitButtonNode dijitButtonContents" dojoAttachPoint="focusNode,titleNode"\r\n\t\t\ttype="${type}" waiRole="button" waiState="labelledby-${id}_label"\r\n\t\t\t><span class="dijitInline ${iconClass}" dojoAttachPoint="iconNode" \r\n \t\t\t\t><span class="dijitToggleButtonIconChar">&#10003</span \r\n\t\t\t></span\r\n\t\t\t><span class="dijitButtonText" id="${id}_label" dojoAttachPoint="containerNode">${label}</span\r\n\t\t></button\r\n\t></div\r\n></div>\r\n',_onClick:function(B){if(this.disabled){return false
}this._clicked();
return this.onClick(B)
},_onButtonClick:function(B){A.stopEvent(B);
var E=this._onClick(B)!==false;
if(this.type=="submit"&&E){for(var C=this.domNode;
C;
C=C.parentNode){var D=dijit.byNode(C);
if(D&&D._onSubmit){D._onSubmit(B);
break
}if(C.tagName.toLowerCase()=="form"){if(!C.onsubmit||C.onsubmit()){C.submit()
}break
}}}},postCreate:function(){if(this.showLabel==false){var B="";
this.label=this.containerNode.innerHTML;
B=A.trim(this.containerNode.innerText||this.containerNode.textContent);
this.titleNode.title=B;
A.addClass(this.containerNode,"dijitDisplayNone")
}this.inherited(arguments)
},onClick:function(B){return true
},_clicked:function(B){},setLabel:function(C){this.containerNode.innerHTML=this.label=C;
if(A.isMozilla){var D=A.getComputedStyle(this.domNode).display;
this.domNode.style.display="none";
var B=this;
setTimeout(function(){B.domNode.style.display=D
},1)
}if(this.showLabel==false){this.titleNode.title=A.trim(this.containerNode.innerText||this.containerNode.textContent)
}}});
A.declare("dijit.form.DropDownButton",[dijit.form.Button,dijit._Container],{baseClass:"dijitDropDownButton",templateString:'<div class="dijit dijitLeft dijitInline"\r\n\tdojoAttachEvent="onmouseenter:_onMouse,onmouseleave:_onMouse,onmousedown:_onMouse,onclick:_onDropDownClick,onkeydown:_onDropDownKeydown,onblur:_onDropDownBlur,onkeypress:_onKey"\r\n\t><div class=\'dijitRight\'>\r\n\t<button class="dijitStretch dijitButtonNode dijitButtonContents" type="${type}"\r\n\t\tdojoAttachPoint="focusNode,titleNode" waiRole="button" waiState="haspopup-true,labelledby-${id}_label"\r\n\t\t><div class="dijitInline ${iconClass}" dojoAttachPoint="iconNode"></div\r\n\t\t><span class="dijitButtonText" \tdojoAttachPoint="containerNode,popupStateNode"\r\n\t\tid="${id}_label">${label}</span\r\n\t\t><span class=\'dijitA11yDownArrow\'>&#9660;</span>\r\n\t</button>\r\n</div></div>\r\n',_fillContent:function(){if(this.srcNodeRef){var B=A.query("*",this.srcNodeRef);
dijit.form.DropDownButton.superclass._fillContent.call(this,B[0]);
this.dropDownContainer=this.srcNodeRef
}},startup:function(){if(!this.dropDown){var B=A.query("[widgetId]",this.dropDownContainer)[0];
this.dropDown=dijit.byNode(B);
delete this.dropDownContainer
}A.body().appendChild(this.dropDown.domNode);
this.dropDown.domNode.style.display="none"
},_onArrowClick:function(B){if(this.disabled){return 
}this._toggleDropDown()
},_onDropDownClick:function(B){var C=A.isFF&&A.isFF<3&&navigator.appVersion.indexOf("Macintosh")!=-1;
if(!C||B.detail!=0||this._seenKeydown){this._onArrowClick(B)
}this._seenKeydown=false
},_onDropDownKeydown:function(B){this._seenKeydown=true
},_onDropDownBlur:function(B){this._seenKeydown=false
},_onKey:function(B){if(this.disabled){return 
}if(B.keyCode==A.keys.DOWN_ARROW){if(!this.dropDown||this.dropDown.domNode.style.display=="none"){A.stopEvent(B);
return this._toggleDropDown()
}}},_onBlur:function(){this._closeDropDown()
},_toggleDropDown:function(){if(this.disabled){return 
}dijit.focus(this.popupStateNode);
var B=this.dropDown;
if(!B){return false
}if(!B.isShowingNow){if(B.href&&!B.isLoaded){var C=this;
var D=A.connect(B,"onLoad",function(){A.disconnect(D);
C._openDropDown()
});
B._loadCheck(true);
return 
}else{this._openDropDown()
}}else{this._closeDropDown()
}},_openDropDown:function(){var B=this.dropDown;
var D=B.domNode.style.width;
var E=this;
dijit.popup.open({parent:this,popup:B,around:this.domNode,orient:this.isLeftToRight()?{BL:"TL",BR:"TR",TL:"BL",TR:"BR"}:{BR:"TR",BL:"TL",TR:"BR",TL:"BL"},onExecute:function(){E._closeDropDown(true)
},onCancel:function(){E._closeDropDown(true)
},onClose:function(){B.domNode.style.width=D;
E.popupStateNode.removeAttribute("popupActive");
this._opened=false
}});
if(this.domNode.offsetWidth>B.domNode.offsetWidth){var F=null;
if(!this.isLeftToRight()){F=B.domNode.parentNode;
var C=F.offsetLeft+F.offsetWidth
}A.marginBox(B.domNode,{w:this.domNode.offsetWidth});
if(F){F.style.left=C-this.domNode.offsetWidth+"px"
}}this.popupStateNode.setAttribute("popupActive","true");
this._opened=true;
if(B.focus){B.focus()
}},_closeDropDown:function(B){if(this._opened){dijit.popup.close(this.dropDown);
if(B){this.focus()
}this._opened=false
}}});
A.declare("dijit.form.ComboButton",dijit.form.DropDownButton,{templateString:'<table class=\'dijit dijitReset dijitInline dijitLeft\'\r\n\tcellspacing=\'0\' cellpadding=\'0\'\r\n\tdojoAttachEvent="onmouseenter:_onMouse,onmouseleave:_onMouse,onmousedown:_onMouse">\r\n\t<tr>\r\n\t\t<td\tclass="dijitStretch dijitButtonContents dijitButtonNode"\r\n\t\t\ttabIndex="${tabIndex}"\r\n\t\t\tdojoAttachEvent="ondijitclick:_onButtonClick"  dojoAttachPoint="titleNode"\r\n\t\t\twaiRole="button" waiState="labelledby-${id}_label">\r\n\t\t\t<div class="dijitInline ${iconClass}" dojoAttachPoint="iconNode"></div>\r\n\t\t\t<span class="dijitButtonText" id="${id}_label" dojoAttachPoint="containerNode">${label}</span>\r\n\t\t</td>\r\n\t\t<td class=\'dijitReset dijitRight dijitButtonNode dijitDownArrowButton\'\r\n\t\t\tdojoAttachPoint="popupStateNode,focusNode"\r\n\t\t\tdojoAttachEvent="ondijitclick:_onArrowClick, onkeypress:_onKey"\r\n\t\t\tstateModifier="DownArrow"\r\n\t\t\ttitle="${optionsTitle}" name="${name}"\r\n\t\t\twaiRole="button" waiState="haspopup-true"\r\n\t\t><div waiRole="presentation">&#9660;</div>\r\n\t</td></tr>\r\n</table>\r\n',attributeMap:A.mixin(A.clone(dijit.form._FormWidget.prototype.attributeMap),{id:"",name:""}),optionsTitle:"",baseClass:"dijitComboButton",_focusedNode:null,postCreate:function(){this.inherited(arguments);
this._focalNodes=[this.titleNode,this.popupStateNode];
A.forEach(this._focalNodes,A.hitch(this,function(B){if(A.isIE){this.connect(B,"onactivate",this._onNodeFocus)
}else{this.connect(B,"onfocus",this._onNodeFocus)
}}))
},focusFocalNode:function(B){this._focusedNode=B;
dijit.focus(B)
},hasNextFocalNode:function(){return this._focusedNode!==this.getFocalNodes()[1]
},focusNext:function(){this._focusedNode=this.getFocalNodes()[this._focusedNode?1:0];
dijit.focus(this._focusedNode)
},hasPrevFocalNode:function(){return this._focusedNode!==this.getFocalNodes()[0]
},focusPrev:function(){this._focusedNode=this.getFocalNodes()[this._focusedNode?0:1];
dijit.focus(this._focusedNode)
},getFocalNodes:function(){return this._focalNodes
},_onNodeFocus:function(B){this._focusedNode=B.currentTarget
},_onBlur:function(B){this.inherited(arguments);
this._focusedNode=null
}});
A.declare("dijit.form.ToggleButton",dijit.form.Button,{baseClass:"dijitToggleButton",checked:false,_clicked:function(B){this.setChecked(!this.checked)
},setChecked:function(B){this.checked=B;
dijit.setWaiState(this.focusNode||this.domNode,"pressed",this.checked);
this._setStateClass();
this.onChange(B)
}})
}}});