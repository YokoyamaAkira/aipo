if(!dojo._hasResource["dijit.form.ComboBox"]){dojo._hasResource["dijit.form.ComboBox"]=true;
dojo.provide("dijit.form.ComboBox");
dojo.require("dojo.data.ItemFileReadStore");
dojo.require("dijit.form.ValidationTextBox");
dojo.requireLocalization("dijit.form","ComboBox",null,"ROOT,cs,de,es,fr,hu,it,ja,ko,pl,pt,ru,zh,zh-tw");
dojo.declare("dijit.form.ComboBoxMixin",null,{item:null,pageSize:Infinity,store:null,query:{},autoComplete:true,searchDelay:100,searchAttr:"name",ignoreCase:true,hasDownArrow:true,_hasFocus:false,templateString:'<table class="dijit dijitReset dijitInlineTable dijitLeft" cellspacing="0" cellpadding="0"\r\n\tid="widget_${id}" name="${name}" dojoAttachEvent="onmouseenter:_onMouse,onmouseleave:_onMouse" waiRole="presentation"\r\n\t><tr class="dijitReset"\r\n\t\t><td class=\'dijitReset dijitStretch dijitInputField\' width="100%"\r\n\t\t\t><input type="text" autocomplete="off" name="${name}"\r\n\t\t\tdojoAttachEvent="onkeypress, onkeyup, onfocus, compositionend"\r\n\t\t\tdojoAttachPoint="textbox,focusNode" waiRole="combobox"\r\n\t\t/></td\r\n\t\t><td class="dijitReset dijitValidationIconField" width="0%"\r\n\t\t\t><div dojoAttachPoint=\'iconNode\' class=\'dijitValidationIcon\'></div\r\n\t\t\t><div class=\'dijitValidationIconText\'>&Chi;</div\r\n\t\t></td\r\n\t\t><td class=\'dijitReset dijitRight dijitButtonNode dijitDownArrowButton\' width="0%"\r\n\t\t\tdojoAttachPoint="downArrowNode"\r\n\t\t\tdojoAttachEvent="onmousedown:_onArrowMouseDown,onmouseup:_onMouse,onmouseenter:_onMouse,onmouseleave:_onMouse"\r\n\t\t\t><div class="dijitDownArrowButtonInner" waiRole="presentation"\r\n\t\t\t\t><div class="dijitDownArrowButtonChar">&#9660;</div\r\n\t\t\t></div\r\n\t\t></td\t\r\n\t></tr\r\n></table>\r\n',baseClass:"dijitComboBox",_lastDisplayedValue:"",getValue:function(){return dijit.form.TextBox.superclass.getValue.apply(this,arguments)
},setDisplayedValue:function(A){this._lastDisplayedValue=A;
this.setValue(A,true)
},_getCaretPos:function(D){if(typeof (D.selectionStart)=="number"){return D.selectionStart
}else{if(dojo.isIE){var B=document.selection.createRange().duplicate();
var A=D.createTextRange();
B.move("character",0);
A.move("character",0);
try{A.setEndPoint("EndToEnd",B);
return String(A.text).replace(/\r/g,"").length
}catch(C){return 0
}}}},_setCaretPos:function(A,B){B=parseInt(B);
this._setSelectedRange(A,B,B)
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
}}}},onkeypress:function(D){if(D.altKey||(D.ctrlKey&&D.charCode!=118)){return 
}var B=false;
this.item=null;
if(this._isShowingNow){this._popupWidget.handleKey(D)
}switch(D.keyCode){case dojo.keys.PAGE_DOWN:case dojo.keys.DOWN_ARROW:if(!this._isShowingNow||this._prev_key_esc){this._arrowPressed();
B=true
}else{this._announceOption(this._popupWidget.getHighlightedOption())
}dojo.stopEvent(D);
this._prev_key_backspace=false;
this._prev_key_esc=false;
break;
case dojo.keys.PAGE_UP:case dojo.keys.UP_ARROW:if(this._isShowingNow){this._announceOption(this._popupWidget.getHighlightedOption())
}dojo.stopEvent(D);
this._prev_key_backspace=false;
this._prev_key_esc=false;
break;
case dojo.keys.ENTER:var C;
if(this._isShowingNow&&(C=this._popupWidget.getHighlightedOption())){if(C==this._popupWidget.nextButton){this._nextSearch(1);
dojo.stopEvent(D);
break
}else{if(C==this._popupWidget.previousButton){this._nextSearch(-1);
dojo.stopEvent(D);
break
}}}else{this.setDisplayedValue(this.getDisplayedValue())
}D.preventDefault();
case dojo.keys.TAB:var A=this.getDisplayedValue();
if(this._popupWidget&&(A==this._popupWidget._messages.previousMessage||A==this._popupWidget._messages.nextMessage)){break
}if(this._isShowingNow){this._prev_key_backspace=false;
this._prev_key_esc=false;
if(this._popupWidget.getHighlightedOption()){this._popupWidget.setValue({target:this._popupWidget.getHighlightedOption()},true)
}this._hideResultList()
}break;
case dojo.keys.SPACE:this._prev_key_backspace=false;
this._prev_key_esc=false;
if(this._isShowingNow&&this._popupWidget.getHighlightedOption()){dojo.stopEvent(D);
this._selectOption();
this._hideResultList()
}else{B=true
}break;
case dojo.keys.ESCAPE:this._prev_key_backspace=false;
this._prev_key_esc=true;
this._hideResultList();
if(this._lastDisplayedValue!=this.getDisplayedValue()){this.setDisplayedValue(this._lastDisplayedValue);
dojo.stopEvent(D)
}else{this.setValue(this.getValue(),false)
}break;
case dojo.keys.DELETE:case dojo.keys.BACKSPACE:this._prev_key_esc=false;
this._prev_key_backspace=true;
B=true;
break;
case dojo.keys.RIGHT_ARROW:case dojo.keys.LEFT_ARROW:this._prev_key_backspace=false;
this._prev_key_esc=false;
break;
default:this._prev_key_backspace=false;
this._prev_key_esc=false;
if(dojo.isIE||D.charCode!=0){B=true
}}if(this.searchTimer){clearTimeout(this.searchTimer)
}if(B){this.searchTimer=setTimeout(dojo.hitch(this,this._startSearchFromInput),this.searchDelay)
}},_autoCompleteText:function(B){this._setSelectedRange(this.focusNode,this.focusNode.value.length,this.focusNode.value.length);
if(new RegExp("^"+escape(this.focusNode.value),this.ignoreCase?"i":"").test(escape(B))){var A=this._getCaretPos(this.focusNode);
if((A+1)>this.focusNode.value.length){this.focusNode.value=B;
this._setSelectedRange(this.focusNode,A,this.focusNode.value.length);
dijit.setWaiState(this.focusNode,"valuenow",B)
}}else{this.focusNode.value=B;
this._setSelectedRange(this.focusNode,0,this.focusNode.value.length);
dijit.setWaiState(this.focusNode,"valuenow",B)
}},_openResultList:function(C,A){if(this.disabled||A.query[this.searchAttr]!=this._lastQuery){return 
}this._popupWidget.clearResultList();
if(!C.length){this._hideResultList();
return 
}var B=new String(this.store.getValue(C[0],this.searchAttr));
if(B&&this.autoComplete&&!this._prev_key_backspace&&(A.query[this.searchAttr]!="*")){this._autoCompleteText(B);
dijit.setWaiState(this.focusNode||this.domNode,"valuenow",B)
}this._popupWidget.createOptions(C,A,dojo.hitch(this,this._getMenuLabelFromItem));
this._showResultList();
if(A.direction){if(A.direction==1){this._popupWidget.highlightFirstOption()
}else{if(A.direction==-1){this._popupWidget.highlightLastOption()
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
},_announceOption:function(B){if(B==null){return 
}var A;
if(B==this._popupWidget.nextButton||B==this._popupWidget.previousButton){A=B.innerHTML
}else{A=this.store.getValue(B.item,this.searchAttr)
}this.focusNode.value=this.focusNode.value.substring(0,this._getCaretPos(this.focusNode));
this._autoCompleteText(A)
},_selectOption:function(B){var A=null;
if(!B){B={target:this._popupWidget.getHighlightedOption()}
}if(!B.target){this.setDisplayedValue(this.getDisplayedValue());
return 
}else{A=B.target
}if(!B.noHide){this._hideResultList();
this._setCaretPos(this.focusNode,this.store.getValue(A.item,this.searchAttr).length)
}this._doSelect(A)
},_doSelect:function(A){this.item=A.item;
this.setValue(this.store.getValue(A.item,this.searchAttr),true)
},_onArrowMouseDown:function(A){if(this.disabled){return 
}dojo.stopEvent(A);
this.focus();
if(this._isShowingNow){this._hideResultList()
}else{this._startSearch("")
}},_startSearchFromInput:function(){this._startSearch(this.focusNode.value)
},_startSearch:function(D){if(!this._popupWidget){this._popupWidget=new dijit.form._ComboBoxMenu({onChange:dojo.hitch(this,this._selectOption)})
}var B=this.query;
this._lastQuery=B[this.searchAttr]=D+"*";
var A=this.store.fetch({queryOptions:{ignoreCase:this.ignoreCase,deep:true},query:B,onComplete:dojo.hitch(this,"_openResultList"),start:0,count:this.pageSize});
function C(F,E){F.start+=F.count*E;
F.direction=E;
F.store.fetch(F)
}this._nextSearch=this._popupWidget.onPage=dojo.hitch(this,C,A)
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
},_createOption:function(B,A){var D=A(B);
var C=document.createElement("div");
if(D.html){C.innerHTML=D.label
}else{C.appendChild(document.createTextNode(D.label))
}if(C.innerHTML==""){C.innerHTML="&nbsp;"
}C.item=B;
return C
},createOptions:function(A,B,D){this.previousButton.style.display=B.start==0?"none":"";
var C=this;
dojo.forEach(A,function(F){var E=C._createOption(F,D);
E.className="dijitMenuItem";
C.domNode.insertBefore(E,C.nextButton)
});
this.nextButton.style.display=B.count==A.length?"":"none"
},clearResultList:function(){while(this.domNode.childNodes.length>2){this.domNode.removeChild(this.domNode.childNodes[this.domNode.childNodes.length-2])
}},getItems:function(){return this.domNode.childNodes
},getListLength:function(){return this.domNode.childNodes.length-2
},onmousedown:function(A){dojo.stopEvent(A)
},onmouseup:function(B){if(B.target===this.domNode){return 
}else{if(B.target==this.previousButton){this.onPage(-1)
}else{if(B.target==this.nextButton){this.onPage(1)
}else{var A=B.target;
while(!A.item){A=A.parentNode
}this.setValue({target:A},true)
}}}},onmouseover:function(B){if(B.target===this.domNode){return 
}var A=B.target;
if(!(A==this.previousButton||A==this.nextButton)){while(!A.item){A=A.parentNode
}}this._focusOptionNode(A)
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
},_page:function(A){var D=0;
var B=this.domNode.scrollTop;
var E=parseInt(dojo.getComputedStyle(this.domNode).height);
if(!this.getHighlightedOption()){this._highlightNextOption()
}while(D<E){if(A){if(!this.getHighlightedOption().previousSibling||this._highlighted_option.previousSibling.style.display=="none"){break
}this._highlightPrevOption()
}else{if(!this.getHighlightedOption().nextSibling||this._highlighted_option.nextSibling.style.display=="none"){break
}this._highlightNextOption()
}var C=this.domNode.scrollTop;
D+=(C-B)*(A?-1:1);
B=C
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