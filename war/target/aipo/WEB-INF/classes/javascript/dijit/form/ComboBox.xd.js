dojo._xdResourceLoaded({depends:[["provide","dijit.form.ComboBox"],["require","dojo.data.ItemFileReadStore"],["require","dijit.form.ValidationTextBox"],["requireLocalization","dijit.form","ComboBox",null,"ROOT,cs,de,es,fr,hu,it,ja,ko,pl,pt,ru,zh,zh-tw","ROOT,cs,de,es,fr,hu,it,ja,ko,pl,pt,ru,zh,zh-tw"]],defineResource:function(dojo){if(!dojo._hasResource["dijit.form.ComboBox"]){dojo._hasResource["dijit.form.ComboBox"]=true;
dojo.provide("dijit.form.ComboBox");
dojo.require("dojo.data.ItemFileReadStore");
dojo.require("dijit.form.ValidationTextBox");
dojo.declare("dijit.form.ComboBoxMixin",null,{item:null,pageSize:Infinity,store:null,query:{},autoComplete:true,searchDelay:100,searchAttr:"name",ignoreCase:true,hasDownArrow:true,_hasFocus:false,templateString:'<table class="dijit dijitReset dijitInlineTable dijitLeft" cellspacing="0" cellpadding="0"\r\n\tid="widget_${id}" name="${name}" dojoAttachEvent="onmouseenter:_onMouse,onmouseleave:_onMouse" waiRole="presentation"\r\n\t><tr class="dijitReset"\r\n\t\t><td class=\'dijitReset dijitStretch dijitInputField\' width="100%"\r\n\t\t\t><input type="text" autocomplete="off" name="${name}"\r\n\t\t\tdojoAttachEvent="onkeypress, onkeyup, onfocus, compositionend"\r\n\t\t\tdojoAttachPoint="textbox,focusNode" waiRole="combobox"\r\n\t\t/></td\r\n\t\t><td class="dijitReset dijitValidationIconField" width="0%"\r\n\t\t\t><div dojoAttachPoint=\'iconNode\' class=\'dijitValidationIcon\'></div\r\n\t\t\t><div class=\'dijitValidationIconText\'>&Chi;</div\r\n\t\t></td\r\n\t\t><td class=\'dijitReset dijitRight dijitButtonNode dijitDownArrowButton\' width="0%"\r\n\t\t\tdojoAttachPoint="downArrowNode"\r\n\t\t\tdojoAttachEvent="onmousedown:_onArrowMouseDown,onmouseup:_onMouse,onmouseenter:_onMouse,onmouseleave:_onMouse"\r\n\t\t\t><div class="dijitDownArrowButtonInner" waiRole="presentation"\r\n\t\t\t\t><div class="dijitDownArrowButtonChar">&#9660;</div\r\n\t\t\t></div\r\n\t\t></td\t\r\n\t></tr\r\n></table>\r\n',baseClass:"dijitComboBox",_lastDisplayedValue:"",getValue:function(){return dijit.form.TextBox.superclass.getValue.apply(this,arguments)
},setDisplayedValue:function(value){this._lastDisplayedValue=value;
this.setValue(value,true)
},_getCaretPos:function(element){if(typeof (element.selectionStart)=="number"){return element.selectionStart
}else{if(dojo.isIE){var tr=document.selection.createRange().duplicate();
var ntr=element.createTextRange();
tr.move("character",0);
ntr.move("character",0);
try{ntr.setEndPoint("EndToEnd",tr);
return String(ntr.text).replace(/\r/g,"").length
}catch(e){return 0
}}}},_setCaretPos:function(element,location){location=parseInt(location);
this._setSelectedRange(element,location,location)
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
}}}},onkeypress:function(evt){if(evt.altKey||(evt.ctrlKey&&evt.charCode!=118)){return 
}var doSearch=false;
this.item=null;
if(this._isShowingNow){this._popupWidget.handleKey(evt)
}switch(evt.keyCode){case dojo.keys.PAGE_DOWN:case dojo.keys.DOWN_ARROW:if(!this._isShowingNow||this._prev_key_esc){this._arrowPressed();
doSearch=true
}else{this._announceOption(this._popupWidget.getHighlightedOption())
}dojo.stopEvent(evt);
this._prev_key_backspace=false;
this._prev_key_esc=false;
break;
case dojo.keys.PAGE_UP:case dojo.keys.UP_ARROW:if(this._isShowingNow){this._announceOption(this._popupWidget.getHighlightedOption())
}dojo.stopEvent(evt);
this._prev_key_backspace=false;
this._prev_key_esc=false;
break;
case dojo.keys.ENTER:var highlighted;
if(this._isShowingNow&&(highlighted=this._popupWidget.getHighlightedOption())){if(highlighted==this._popupWidget.nextButton){this._nextSearch(1);
dojo.stopEvent(evt);
break
}else{if(highlighted==this._popupWidget.previousButton){this._nextSearch(-1);
dojo.stopEvent(evt);
break
}}}else{this.setDisplayedValue(this.getDisplayedValue())
}evt.preventDefault();
case dojo.keys.TAB:var newvalue=this.getDisplayedValue();
if(this._popupWidget&&(newvalue==this._popupWidget._messages.previousMessage||newvalue==this._popupWidget._messages.nextMessage)){break
}if(this._isShowingNow){this._prev_key_backspace=false;
this._prev_key_esc=false;
if(this._popupWidget.getHighlightedOption()){this._popupWidget.setValue({target:this._popupWidget.getHighlightedOption()},true)
}this._hideResultList()
}break;
case dojo.keys.SPACE:this._prev_key_backspace=false;
this._prev_key_esc=false;
if(this._isShowingNow&&this._popupWidget.getHighlightedOption()){dojo.stopEvent(evt);
this._selectOption();
this._hideResultList()
}else{doSearch=true
}break;
case dojo.keys.ESCAPE:this._prev_key_backspace=false;
this._prev_key_esc=true;
this._hideResultList();
if(this._lastDisplayedValue!=this.getDisplayedValue()){this.setDisplayedValue(this._lastDisplayedValue);
dojo.stopEvent(evt)
}else{this.setValue(this.getValue(),false)
}break;
case dojo.keys.DELETE:case dojo.keys.BACKSPACE:this._prev_key_esc=false;
this._prev_key_backspace=true;
doSearch=true;
break;
case dojo.keys.RIGHT_ARROW:case dojo.keys.LEFT_ARROW:this._prev_key_backspace=false;
this._prev_key_esc=false;
break;
default:this._prev_key_backspace=false;
this._prev_key_esc=false;
if(dojo.isIE||evt.charCode!=0){doSearch=true
}}if(this.searchTimer){clearTimeout(this.searchTimer)
}if(doSearch){this.searchTimer=setTimeout(dojo.hitch(this,this._startSearchFromInput),this.searchDelay)
}},_autoCompleteText:function(text){this._setSelectedRange(this.focusNode,this.focusNode.value.length,this.focusNode.value.length);
if(new RegExp("^"+escape(this.focusNode.value),this.ignoreCase?"i":"").test(escape(text))){var cpos=this._getCaretPos(this.focusNode);
if((cpos+1)>this.focusNode.value.length){this.focusNode.value=text;
this._setSelectedRange(this.focusNode,cpos,this.focusNode.value.length);
dijit.setWaiState(this.focusNode,"valuenow",text)
}}else{this.focusNode.value=text;
this._setSelectedRange(this.focusNode,0,this.focusNode.value.length);
dijit.setWaiState(this.focusNode,"valuenow",text)
}},_openResultList:function(results,dataObject){if(this.disabled||dataObject.query[this.searchAttr]!=this._lastQuery){return 
}this._popupWidget.clearResultList();
if(!results.length){this._hideResultList();
return 
}var zerothvalue=new String(this.store.getValue(results[0],this.searchAttr));
if(zerothvalue&&this.autoComplete&&!this._prev_key_backspace&&(dataObject.query[this.searchAttr]!="*")){this._autoCompleteText(zerothvalue);
dijit.setWaiState(this.focusNode||this.domNode,"valuenow",zerothvalue)
}this._popupWidget.createOptions(results,dataObject,dojo.hitch(this,this._getMenuLabelFromItem));
this._showResultList();
if(dataObject.direction){if(dataObject.direction==1){this._popupWidget.highlightFirstOption()
}else{if(dataObject.direction==-1){this._popupWidget.highlightLastOption()
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
var newvalue=this.getDisplayedValue();
if(this._popupWidget&&(newvalue==this._popupWidget._messages.previousMessage||newvalue==this._popupWidget._messages.nextMessage)){this.setValue(this._lastValueReported,true)
}else{this.setDisplayedValue(newvalue)
}},onfocus:function(evt){this._hasFocus=true;
this._onMouse(evt)
},_announceOption:function(node){if(node==null){return 
}var newValue;
if(node==this._popupWidget.nextButton||node==this._popupWidget.previousButton){newValue=node.innerHTML
}else{newValue=this.store.getValue(node.item,this.searchAttr)
}this.focusNode.value=this.focusNode.value.substring(0,this._getCaretPos(this.focusNode));
this._autoCompleteText(newValue)
},_selectOption:function(evt){var tgt=null;
if(!evt){evt={target:this._popupWidget.getHighlightedOption()}
}if(!evt.target){this.setDisplayedValue(this.getDisplayedValue());
return 
}else{tgt=evt.target
}if(!evt.noHide){this._hideResultList();
this._setCaretPos(this.focusNode,this.store.getValue(tgt.item,this.searchAttr).length)
}this._doSelect(tgt)
},_doSelect:function(tgt){this.item=tgt.item;
this.setValue(this.store.getValue(tgt.item,this.searchAttr),true)
},_onArrowMouseDown:function(evt){if(this.disabled){return 
}dojo.stopEvent(evt);
this.focus();
if(this._isShowingNow){this._hideResultList()
}else{this._startSearch("")
}},_startSearchFromInput:function(){this._startSearch(this.focusNode.value)
},_startSearch:function(key){if(!this._popupWidget){this._popupWidget=new dijit.form._ComboBoxMenu({onChange:dojo.hitch(this,this._selectOption)})
}var query=this.query;
this._lastQuery=query[this.searchAttr]=key+"*";
var dataObject=this.store.fetch({queryOptions:{ignoreCase:this.ignoreCase,deep:true},query:query,onComplete:dojo.hitch(this,"_openResultList"),start:0,count:this.pageSize});
function nextSearch(dataObject,direction){dataObject.start+=dataObject.count*direction;
dataObject.direction=direction;
dataObject.store.fetch(dataObject)
}this._nextSearch=this._popupWidget.onPage=dojo.hitch(this,nextSearch,dataObject)
},_getValueField:function(){return this.searchAttr
},_arrowPressed:function(){if(!this.disabled&&this.hasDownArrow){dojo.addClass(this.downArrowNode,"dijitArrowButtonActive")
}},_arrowIdle:function(){if(!this.disabled&&this.hasDownArrow){dojo.removeClass(this.downArrowNode,"dojoArrowButtonPushed")
}},compositionend:function(evt){this.onkeypress({charCode:-1})
},constructor:function(){this.query={}
},postMixInProperties:function(){if(!this.hasDownArrow){this.baseClass="dijitTextBox"
}if(!this.store){var items=this.srcNodeRef?dojo.query("> option",this.srcNodeRef).map(function(node){node.style.display="none";
return{value:node.getAttribute("value"),name:String(node.innerHTML)}
}):{};
this.store=new dojo.data.ItemFileReadStore({data:{identifier:this._getValueField(),items:items}});
if(items&&items.length&&!this.value){this.value=items[this.srcNodeRef.selectedIndex!=-1?this.srcNodeRef.selectedIndex:0][this._getValueField()]
}}},uninitialize:function(){if(this._popupWidget){this._hideResultList();
this._popupWidget.destroy()
}},_getMenuLabelFromItem:function(item){return{html:false,label:this.store.getValue(item,this.searchAttr)}
},open:function(){this._isShowingNow=true;
return dijit.popup.open({popup:this._popupWidget,around:this.domNode,parent:this})
}});
dojo.declare("dijit.form._ComboBoxMenu",[dijit._Widget,dijit._Templated],{templateString:"<div class='dijitMenu' dojoAttachEvent='onmousedown,onmouseup,onmouseover,onmouseout' tabIndex='-1' style='overflow:\"auto\";'><div class='dijitMenuItem dijitMenuPreviousButton' dojoAttachPoint='previousButton'></div><div class='dijitMenuItem dijitMenuNextButton' dojoAttachPoint='nextButton'></div></div>",_messages:null,postMixInProperties:function(){this._messages=dojo.i18n.getLocalization("dijit.form","ComboBox",this.lang);
this.inherited("postMixInProperties",arguments)
},setValue:function(value){this.value=value;
this.onChange(value)
},onChange:function(value){},onPage:function(direction){},postCreate:function(){this.previousButton.innerHTML=this._messages.previousMessage;
this.nextButton.innerHTML=this._messages.nextMessage;
this.inherited("postCreate",arguments)
},onClose:function(){this._blurOptionNode()
},_createOption:function(item,labelFunc){var labelObject=labelFunc(item);
var menuitem=document.createElement("div");
if(labelObject.html){menuitem.innerHTML=labelObject.label
}else{menuitem.appendChild(document.createTextNode(labelObject.label))
}if(menuitem.innerHTML==""){menuitem.innerHTML="&nbsp;"
}menuitem.item=item;
return menuitem
},createOptions:function(results,dataObject,labelFunc){this.previousButton.style.display=dataObject.start==0?"none":"";
var _this=this;
dojo.forEach(results,function(item){var menuitem=_this._createOption(item,labelFunc);
menuitem.className="dijitMenuItem";
_this.domNode.insertBefore(menuitem,_this.nextButton)
});
this.nextButton.style.display=dataObject.count==results.length?"":"none"
},clearResultList:function(){while(this.domNode.childNodes.length>2){this.domNode.removeChild(this.domNode.childNodes[this.domNode.childNodes.length-2])
}},getItems:function(){return this.domNode.childNodes
},getListLength:function(){return this.domNode.childNodes.length-2
},onmousedown:function(evt){dojo.stopEvent(evt)
},onmouseup:function(evt){if(evt.target===this.domNode){return 
}else{if(evt.target==this.previousButton){this.onPage(-1)
}else{if(evt.target==this.nextButton){this.onPage(1)
}else{var tgt=evt.target;
while(!tgt.item){tgt=tgt.parentNode
}this.setValue({target:tgt},true)
}}}},onmouseover:function(evt){if(evt.target===this.domNode){return 
}var tgt=evt.target;
if(!(tgt==this.previousButton||tgt==this.nextButton)){while(!tgt.item){tgt=tgt.parentNode
}}this._focusOptionNode(tgt)
},onmouseout:function(evt){if(evt.target===this.domNode){return 
}this._blurOptionNode()
},_focusOptionNode:function(node){if(this._highlighted_option!=node){this._blurOptionNode();
this._highlighted_option=node;
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
},_page:function(up){var scrollamount=0;
var oldscroll=this.domNode.scrollTop;
var height=parseInt(dojo.getComputedStyle(this.domNode).height);
if(!this.getHighlightedOption()){this._highlightNextOption()
}while(scrollamount<height){if(up){if(!this.getHighlightedOption().previousSibling||this._highlighted_option.previousSibling.style.display=="none"){break
}this._highlightPrevOption()
}else{if(!this.getHighlightedOption().nextSibling||this._highlighted_option.nextSibling.style.display=="none"){break
}this._highlightNextOption()
}var newscroll=this.domNode.scrollTop;
scrollamount+=(newscroll-oldscroll)*(up?-1:1);
oldscroll=newscroll
}},pageUp:function(){this._page(true)
},pageDown:function(){this._page(false)
},getHighlightedOption:function(){return this._highlighted_option&&this._highlighted_option.parentNode?this._highlighted_option:null
},handleKey:function(evt){switch(evt.keyCode){case dojo.keys.DOWN_ARROW:this._highlightNextOption();
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
}}});