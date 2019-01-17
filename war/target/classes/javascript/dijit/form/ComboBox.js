if(!dojo._hasResource["dijit.form.ComboBox"]){dojo._hasResource["dijit.form.ComboBox"]=true;
dojo.provide("dijit.form.ComboBox");
dojo.require("dojo.data.ItemFileReadStore");
dojo.require("dijit.form.ValidationTextBox");
dojo.requireLocalization("dijit.form","ComboBox",null,"ROOT,cs,de,es,fr,hu,it,ja,ko,pl,pt,ru,zh,zh-tw");
dojo.declare("dijit.form.ComboBoxMixin",null,{item:null,pageSize:Infinity,store:null,query:{},autoComplete:true,searchDelay:100,searchAttr:"name",ignoreCase:true,hasDownArrow:true,_hasFocus:false,templateString:'<table class="dijit dijitReset dijitInlineTable dijitLeft" cellspacing="0" cellpadding="0"\r\n\tid="widget_${id}" name="${name}" dojoAttachEvent="onmouseenter:_onMouse,onmouseleave:_onMouse" waiRole="presentation"\r\n\t><tr class="dijitReset"\r\n\t\t><td class=\'dijitReset dijitStretch dijitInputField\' width="100%"\r\n\t\t\t><input type="text" autocomplete="off" name="${name}"\r\n\t\t\tdojoAttachEvent="onkeypress, onkeyup, onfocus, compositionend"\r\n\t\t\tdojoAttachPoint="textbox,focusNode" waiRole="combobox"\r\n\t\t/></td\r\n\t\t><td class="dijitReset dijitValidationIconField" width="0%"\r\n\t\t\t><div dojoAttachPoint=\'iconNode\' class=\'dijitValidationIcon\'></div\r\n\t\t\t><div class=\'dijitValidationIconText\'>&Chi;</div\r\n\t\t></td\r\n\t\t><td class=\'dijitReset dijitRight dijitButtonNode dijitDownArrowButton\' width="0%"\r\n\t\t\tdojoAttachPoint="downArrowNode"\r\n\t\t\tdojoAttachEvent="onmousedown:_onArrowMouseDown,onmouseup:_onMouse,onmouseenter:_onMouse,onmouseleave:_onMouse"\r\n\t\t\t><div class="dijitDownArrowButtonInner" waiRole="presentation"\r\n\t\t\t\t><div class="dijitDownArrowButtonChar">&#9660;</div\r\n\t\t\t></div\r\n\t\t></td\t\r\n\t></tr\r\n></table>\r\n',baseClass:"dijitComboBox",_lastDisplayedValue:"",getValue:function(){return dijit.form.TextBox.superclass.getValue.apply(this,arguments)
},setDisplayedValue:function(A){this._lastDisplayedValue=A;
this.setValue(A,true)
},_getCaretPos:function(A){if(typeof (A.selectionStart)=="number"){return A.selectionStart
}else{if(dojo.isIE){var C=document.selection.createRange().duplicate();
var B=A.createTextRange();
C.move("character",0);
B.move("character",0);
try{B.setEndPoint("EndToEnd",C);
return String(B.text).replace(/\r/g,"").length
}catch(D){return 0
}}}},_setCaretPos:function(B,A){A=parseInt(A);
this._setSelectedRange(B,A,A)
},_setSelectedRange:function(element,start,end){if(!end){end=element.value.length
}if(element.setSelectionRange){dijit.focus(element);
element.setSelectionRange(start,end)
}else{if(element.createTextRange){var range=element.createTextRange();
with(range){collapse(true);
moveEnd("character",end);
moveStart("character",start);
select()
}}else{element.value=element.value;
element.blur();
dijit.focus(element);
var dist=parseInt(element.value.length)-end;
var tchar=String.fromCharCode(37);
var tcc=tchar.charCodeAt(0);
for(var x=0;
x<dist;
x++){var te=document.createEvent("KeyEvents");
te.initKeyEvent("keypress",true,true,null,false,false,false,false,tcc,tcc);
element.dispatchEvent(te)
}}}},onkeypress:function(A){if(A.altKey||(A.ctrlKey&&A.charCode!=118)){return 
}var C=false;
this.item=null;
if(this._isShowingNow){this._popupWidget.handleKey(A)
}switch(A.keyCode){case dojo.keys.PAGE_DOWN:case dojo.keys.DOWN_ARROW:if(!this._isShowingNow||this._prev_key_esc){this._arrowPressed();
C=true
}else{this._announceOption(this._popupWidget.getHighlightedOption())
}dojo.stopEvent(A);
this._prev_key_backspace=false;
this._prev_key_esc=false;
break;
case dojo.keys.PAGE_UP:case dojo.keys.UP_ARROW:if(this._isShowingNow){this._announceOption(this._popupWidget.getHighlightedOption())
}dojo.stopEvent(A);
this._prev_key_backspace=false;
this._prev_key_esc=false;
break;
case dojo.keys.ENTER:var D;
if(this._isShowingNow&&(D=this._popupWidget.getHighlightedOption())){if(D==this._popupWidget.nextButton){this._nextSearch(1);
dojo.stopEvent(A);
break
}else{if(D==this._popupWidget.previousButton){this._nextSearch(-1);
dojo.stopEvent(A);
break
}}}else{this.setDisplayedValue(this.getDisplayedValue())
}A.preventDefault();
case dojo.keys.TAB:var B=this.getDisplayedValue();
if(this._popupWidget&&(B==this._popupWidget._messages.previousMessage||B==this._popupWidget._messages.nextMessage)){break
}if(this._isShowingNow){this._prev_key_backspace=false;
this._prev_key_esc=false;
if(this._popupWidget.getHighlightedOption()){this._popupWidget.setValue({target:this._popupWidget.getHighlightedOption()},true)
}this._hideResultList()
}break;
case dojo.keys.SPACE:this._prev_key_backspace=false;
this._prev_key_esc=false;
if(this._isShowingNow&&this._popupWidget.getHighlightedOption()){dojo.stopEvent(A);
this._selectOption();
this._hideResultList()
}else{C=true
}break;
case dojo.keys.ESCAPE:this._prev_key_backspace=false;
this._prev_key_esc=true;
this._hideResultList();
if(this._lastDisplayedValue!=this.getDisplayedValue()){this.setDisplayedValue(this._lastDisplayedValue);
dojo.stopEvent(A)
}else{this.setValue(this.getValue(),false)
}break;
case dojo.keys.DELETE:case dojo.keys.BACKSPACE:this._prev_key_esc=false;
this._prev_key_backspace=true;
C=true;
break;
case dojo.keys.RIGHT_ARROW:case dojo.keys.LEFT_ARROW:this._prev_key_backspace=false;
this._prev_key_esc=false;
break;
default:this._prev_key_backspace=false;
this._prev_key_esc=false;
if(dojo.isIE||A.charCode!=0){C=true
}}if(this.searchTimer){clearTimeout(this.searchTimer)
}if(C){this.searchTimer=setTimeout(dojo.hitch(this,this._startSearchFromInput),this.searchDelay)
}},_autoCompleteText:function(A){this._setSelectedRange(this.focusNode,this.focusNode.value.length,this.focusNode.value.length);
if(new RegExp("^"+escape(this.focusNode.value),this.ignoreCase?"i":"").test(escape(A))){var B=this._getCaretPos(this.focusNode);
if((B+1)>this.focusNode.value.length){this.focusNode.value=A;
this._setSelectedRange(this.focusNode,B,this.focusNode.value.length);
dijit.setWaiState(this.focusNode,"valuenow",A)
}}else{this.focusNode.value=A;
this._setSelectedRange(this.focusNode,0,this.focusNode.value.length);
dijit.setWaiState(this.focusNode,"valuenow",A)
}},_openResultList:function(A,B){if(this.disabled||B.query[this.searchAttr]!=this._lastQuery){return 
}this._popupWidget.clearResultList();
if(!A.length){this._hideResultList();
return 
}var C=new String(this.store.getValue(A[0],this.searchAttr));
if(C&&this.autoComplete&&!this._prev_key_backspace&&(B.query[this.searchAttr]!="*")){this._autoCompleteText(C);
dijit.setWaiState(this.focusNode||this.domNode,"valuenow",C)
}this._popupWidget.createOptions(A,B,dojo.hitch(this,this._getMenuLabelFromItem));
this._showResultList();
if(B.direction){if(B.direction==1){this._popupWidget.highlightFirstOption()
}else{if(B.direction==-1){this._popupWidget.highlightLastOption()
}}this._announceOption(this._popupWidget.getHighlightedOption())
}},_showResultList:function(){this._hideResultList();
var items=this._popupWidget.getItems(),visibleCount=Math.min(items.length,this.maxListLength);
this._arrowPressed();
this._displayMessage("");
with(this._popupWidget.domNode.style){width="";
height=""
}var best=this.open();
var popupbox=dojo.marginBox(this._popupWidget.domNode);
this._popupWidget.domNode.style.overflow=((best.h==popupbox.h)&&(best.w==popupbox.w))?"hidden":"auto";
var newwidth=best.w;
if(best.h<this._popupWidget.domNode.scrollHeight){newwidth+=16
}dojo.marginBox(this._popupWidget.domNode,{h:best.h,w:Math.max(newwidth,this.domNode.offsetWidth)})
},_hideResultList:function(){if(this._isShowingNow){dijit.popup.close(this._popupWidget);
this._arrowIdle();
this._isShowingNow=false
}},_onBlur:function(){this._hasFocus=false;
this._hasBeenBlurred=true;
this._hideResultList();
this._arrowIdle();
var A=this.getDisplayedValue();
if(this._popupWidget&&(A==this._popupWidget._messages.previousMessage||A==this._popupWidget._messages.nextMessage)){this.setValue(this._lastValueReported,true)
}else{this.setDisplayedValue(A)
}},onfocus:function(A){this._hasFocus=true;
this._onMouse(A)
},_announceOption:function(A){if(A==null){return 
}var B;
if(A==this._popupWidget.nextButton||A==this._popupWidget.previousButton){B=A.innerHTML
}else{B=this.store.getValue(A.item,this.searchAttr)
}this.focusNode.value=this.focusNode.value.substring(0,this._getCaretPos(this.focusNode));
this._autoCompleteText(B)
},_selectOption:function(A){var B=null;
if(!A){A={target:this._popupWidget.getHighlightedOption()}
}if(!A.target){this.setDisplayedValue(this.getDisplayedValue());
return 
}else{B=A.target
}if(!A.noHide){this._hideResultList();
this._setCaretPos(this.focusNode,this.store.getValue(B.item,this.searchAttr).length)
}this._doSelect(B)
},_doSelect:function(A){this.item=A.item;
this.setValue(this.store.getValue(A.item,this.searchAttr),true)
},_onArrowMouseDown:function(A){if(this.disabled){return 
}dojo.stopEvent(A);
this.focus();
if(this._isShowingNow){this._hideResultList()
}else{this._startSearch("")
}},_startSearchFromInput:function(){this._startSearch(this.focusNode.value)
},_startSearch:function(A){if(!this._popupWidget){this._popupWidget=new dijit.form._ComboBoxMenu({onChange:dojo.hitch(this,this._selectOption)})
}var C=this.query;
this._lastQuery=C[this.searchAttr]=A+"*";
var B=this.store.fetch({queryOptions:{ignoreCase:this.ignoreCase,deep:true},query:C,onComplete:dojo.hitch(this,"_openResultList"),start:0,count:this.pageSize});
function D(E,F){E.start+=E.count*F;
E.direction=F;
E.store.fetch(E)
}this._nextSearch=this._popupWidget.onPage=dojo.hitch(this,D,B)
},_getValueField:function(){return this.searchAttr
},_arrowPressed:function(){if(!this.disabled&&this.hasDownArrow){dojo.addClass(this.downArrowNode,"dijitArrowButtonActive")
}},_arrowIdle:function(){if(!this.disabled&&this.hasDownArrow){dojo.removeClass(this.downArrowNode,"dojoArrowButtonPushed")
}},compositionend:function(A){this.onkeypress({charCode:-1})
},constructor:function(){this.query={}
},postMixInProperties:function(){if(!this.hasDownArrow){this.baseClass="dijitTextBox"
}if(!this.store){var A=this.srcNodeRef?dojo.query("> option",this.srcNodeRef).map(function(B){B.style.display="none";
return{value:B.getAttribute("value"),name:String(B.innerHTML)}
}):{};
this.store=new dojo.data.ItemFileReadStore({data:{identifier:this._getValueField(),items:A}});
if(A&&A.length&&!this.value){this.value=A[this.srcNodeRef.selectedIndex!=-1?this.srcNodeRef.selectedIndex:0][this._getValueField()]
}}},uninitialize:function(){if(this._popupWidget){this._hideResultList();
this._popupWidget.destroy()
}},_getMenuLabelFromItem:function(A){return{html:false,label:this.store.getValue(A,this.searchAttr)}
},open:function(){this._isShowingNow=true;
return dijit.popup.open({popup:this._popupWidget,around:this.domNode,parent:this})
}});
dojo.declare("dijit.form._ComboBoxMenu",[dijit._Widget,dijit._Templated],{templateString:"<div class='dijitMenu' dojoAttachEvent='onmousedown,onmouseup,onmouseover,onmouseout' tabIndex='-1' style='overflow:\"auto\";'><div class='dijitMenuItem dijitMenuPreviousButton' dojoAttachPoint='previousButton'></div><div class='dijitMenuItem dijitMenuNextButton' dojoAttachPoint='nextButton'></div></div>",_messages:null,postMixInProperties:function(){this._messages=dojo.i18n.getLocalization("dijit.form","ComboBox",this.lang);
this.inherited("postMixInProperties",arguments)
},setValue:function(A){this.value=A;
this.onChange(A)
},onChange:function(A){},onPage:function(A){},postCreate:function(){this.previousButton.innerHTML=this._messages.previousMessage;
this.nextButton.innerHTML=this._messages.nextMessage;
this.inherited("postCreate",arguments)
},onClose:function(){this._blurOptionNode()
},_createOption:function(C,B){var A=B(C);
var D=document.createElement("div");
if(A.html){D.innerHTML=A.label
}else{D.appendChild(document.createTextNode(A.label))
}if(D.innerHTML==""){D.innerHTML="&nbsp;"
}D.item=C;
return D
},createOptions:function(B,C,A){this.previousButton.style.display=C.start==0?"none":"";
var D=this;
dojo.forEach(B,function(E){var F=D._createOption(E,A);
F.className="dijitMenuItem";
D.domNode.insertBefore(F,D.nextButton)
});
this.nextButton.style.display=C.count==B.length?"":"none"
},clearResultList:function(){while(this.domNode.childNodes.length>2){this.domNode.removeChild(this.domNode.childNodes[this.domNode.childNodes.length-2])
}},getItems:function(){return this.domNode.childNodes
},getListLength:function(){return this.domNode.childNodes.length-2
},onmousedown:function(A){dojo.stopEvent(A)
},onmouseup:function(A){if(A.target===this.domNode){return 
}else{if(A.target==this.previousButton){this.onPage(-1)
}else{if(A.target==this.nextButton){this.onPage(1)
}else{var B=A.target;
while(!B.item){B=B.parentNode
}this.setValue({target:B},true)
}}}},onmouseover:function(A){if(A.target===this.domNode){return 
}var B=A.target;
if(!(B==this.previousButton||B==this.nextButton)){while(!B.item){B=B.parentNode
}}this._focusOptionNode(B)
},onmouseout:function(A){if(A.target===this.domNode){return 
}this._blurOptionNode()
},_focusOptionNode:function(A){if(this._highlighted_option!=A){this._blurOptionNode();
this._highlighted_option=A;
dojo.addClass(this._highlighted_option,"dijitMenuItemHover")
}},_blurOptionNode:function(){if(this._highlighted_option){dojo.removeClass(this._highlighted_option,"dijitMenuItemHover");
this._highlighted_option=null
}},_highlightNextOption:function(){if(!this.getHighlightedOption()){this._focusOptionNode(this.domNode.firstChild.style.display=="none"?this.domNode.firstChild.nextSibling:this.domNode.firstChild)
}else{if(this._highlighted_option.nextSibling&&this._highlighted_option.nextSibling.style.display!="none"){this._focusOptionNode(this._highlighted_option.nextSibling)
}}dijit.scrollIntoView(this._highlighted_option)
},highlightFirstOption:function(){this._focusOptionNode(this.domNode.firstChild.nextSibling);
dijit.scrollIntoView(this._highlighted_option)
},highlightLastOption:function(){this._focusOptionNode(this.domNode.lastChild.previousSibling);
dijit.scrollIntoView(this._highlighted_option)
},_highlightPrevOption:function(){if(!this.getHighlightedOption()){this._focusOptionNode(this.domNode.lastChild.style.display=="none"?this.domNode.lastChild.previousSibling:this.domNode.lastChild)
}else{if(this._highlighted_option.previousSibling&&this._highlighted_option.previousSibling.style.display!="none"){this._focusOptionNode(this._highlighted_option.previousSibling)
}}dijit.scrollIntoView(this._highlighted_option)
},_page:function(B){var E=0;
var C=this.domNode.scrollTop;
var A=parseInt(dojo.getComputedStyle(this.domNode).height);
if(!this.getHighlightedOption()){this._highlightNextOption()
}while(E<A){if(B){if(!this.getHighlightedOption().previousSibling||this._highlighted_option.previousSibling.style.display=="none"){break
}this._highlightPrevOption()
}else{if(!this.getHighlightedOption().nextSibling||this._highlighted_option.nextSibling.style.display=="none"){break
}this._highlightNextOption()
}var D=this.domNode.scrollTop;
E+=(D-C)*(B?-1:1);
C=D
}},pageUp:function(){this._page(true)
},pageDown:function(){this._page(false)
},getHighlightedOption:function(){return this._highlighted_option&&this._highlighted_option.parentNode?this._highlighted_option:null
},handleKey:function(A){switch(A.keyCode){case dojo.keys.DOWN_ARROW:this._highlightNextOption();
break;
case dojo.keys.PAGE_DOWN:this.pageDown();
break;
case dojo.keys.UP_ARROW:this._highlightPrevOption();
break;
case dojo.keys.PAGE_UP:this.pageUp();
break
}}});
dojo.declare("dijit.form.ComboBox",[dijit.form.ValidationTextBox,dijit.form.ComboBoxMixin],{postMixInProperties:function(){dijit.form.ComboBoxMixin.prototype.postMixInProperties.apply(this,arguments);
dijit.form.ValidationTextBox.prototype.postMixInProperties.apply(this,arguments)
}})
};