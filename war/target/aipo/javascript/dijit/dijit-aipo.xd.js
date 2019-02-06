dojo._xdResourceLoaded({depends:[["provide","dijit._base.focus"],["provide","dijit._base.manager"],["provide","dijit._base.place"],["provide","dijit._base.window"],["provide","dijit._base.popup"],["provide","dijit._base.scroll"],["provide","dijit._base.sniff"],["provide","dijit._base.bidi"],["provide","dijit._base.typematic"],["provide","dijit._base.wai"],["provide","dijit._base"],["provide","dojo.date.stamp"],["provide","dojo.parser"],["provide","dijit._Widget"],["provide","dojo.string"],["provide","dijit._Templated"],["provide","dijit._Container"],["provide","dijit.layout._LayoutWidget"],["provide","dijit.form._FormWidget"],["provide","dijit.dijit"],["provide","dojo.i18n"],["provide","dojo.cldr.supplemental"],["provide","dojo.date"],["provide","dojo.regexp"],["provide","dojo.date.locale"],["provide","dijit._Calendar"],["provide","dijit.layout.ContentPane"],["provide","dijit.form.Form"],["provide","dijit.Dialog"],["provide","dijit.Toolbar"],["provide","dijit.form.Button"],["provide","dijit.Menu"],["provide","dijit.Tooltip"],["provide","dijit.form.TextBox"],["provide","dijit.form.ValidationTextBox"],["requireLocalization","dijit.form","validate",null,"ko,zh-cn,zh,ja,zh-tw,ru,it,hu,ROOT,fr,pt,pl,es,de,cs","cs,de,es,fr,hu,it,ja,ko,pl,pt,ru,ROOT,zh,zh-cn,zh-tw","cs,de,es,fr,hu,it,ja,ko,pl,pt,ru,ROOT,zh,zh-cn,zh-tw"],["provide","dijit.form.ComboBox"],["requireLocalization","dijit.form","ComboBox",null,"ko,zh,ja,zh-tw,ru,it,hu,ROOT,fr,pt,pl,es,de,cs","ROOT,cs,de,es,fr,hu,it,ja,ko,pl,pt,ru,zh,zh-tw","ROOT,cs,de,es,fr,hu,it,ja,ko,pl,pt,ru,zh,zh-tw"],["i18n._preloadLocalizations","dijit.nls.dijit-all",["es-es","es","hu","it-it","de","pt-br","pl","fr-fr","zh-cn","pt","en-us","zh","ru","xx","fr","zh-tw","it","cs","en-gb","de-de","ja-jp","ko-kr","ko","en","ROOT","ja"]]],defineResource:function(dojo){if(!dojo._hasResource["dijit._base.focus"]){dojo._hasResource["dijit._base.focus"]=true;
dojo.provide("dijit._base.focus");
dojo.mixin(dijit,{_curFocus:null,_prevFocus:null,isCollapsed:function(){var _window=dojo.global;
var _document=dojo.doc;
if(_document.selection){return !_document.selection.createRange().text
}else{if(_window.getSelection){var selection=_window.getSelection();
if(dojo.isString(selection)){return !selection
}else{return selection.isCollapsed||!selection.toString()
}}}},getBookmark:function(){var bookmark,selection=dojo.doc.selection;
if(selection){var range=selection.createRange();
if(selection.type.toUpperCase()=="CONTROL"){bookmark=range.length?dojo._toArray(range):null
}else{bookmark=range.getBookmark()
}}else{if(dojo.global.getSelection){selection=dojo.global.getSelection();
if(selection){var range=selection.getRangeAt(0);
bookmark=range.cloneRange()
}}else{console.debug("No idea how to store the current selection for this browser!")
}}return bookmark
},moveToBookmark:function(bookmark){var _document=dojo.doc;
if(_document.selection){var range;
if(dojo.isArray(bookmark)){range=_document.body.createControlRange();
dojo.forEach(bookmark,range.addElement)
}else{range=_document.selection.createRange();
range.moveToBookmark(bookmark)
}range.select()
}else{var selection=dojo.global.getSelection&&dojo.global.getSelection();
if(selection&&selection.removeAllRanges){selection.removeAllRanges();
selection.addRange(bookmark)
}else{console.debug("No idea how to restore selection for this browser!")
}}},getFocus:function(menu,openedForWindow){return{node:menu&&dojo.isDescendant(dijit._curFocus,menu.domNode)?dijit._prevFocus:dijit._curFocus,bookmark:!dojo.withGlobal(openedForWindow||dojo.global,dijit.isCollapsed)?dojo.withGlobal(openedForWindow||dojo.global,dijit.getBookmark):null,openedForWindow:openedForWindow}
},focus:function(handle){if(!handle){return 
}var node="node" in handle?handle.node:handle,bookmark=handle.bookmark,openedForWindow=handle.openedForWindow;
if(node){var focusNode=(node.tagName.toLowerCase()=="iframe")?node.contentWindow:node;
if(focusNode&&focusNode.focus){try{focusNode.focus()
}catch(e){}}dijit._onFocusNode(node)
}if(bookmark&&dojo.withGlobal(openedForWindow||dojo.global,dijit.isCollapsed)){if(openedForWindow){openedForWindow.focus()
}try{dojo.withGlobal(openedForWindow||dojo.global,moveToBookmark,null,[bookmark])
}catch(e){}}},_activeStack:[],registerWin:function(targetWindow){if(!targetWindow){targetWindow=window
}dojo.connect(targetWindow.document,"onmousedown",null,function(evt){dijit._justMouseDowned=true;
setTimeout(function(){dijit._justMouseDowned=false
},0);
dijit._onTouchNode(evt.target||evt.srcElement)
});
var body=targetWindow.document.body||targetWindow.document.getElementsByTagName("body")[0];
if(body){if(dojo.isIE){body.attachEvent("onactivate",function(evt){if(evt.srcElement.tagName.toLowerCase()!="body"){dijit._onFocusNode(evt.srcElement)
}});
body.attachEvent("ondeactivate",function(evt){dijit._onBlurNode(evt.srcElement)
})
}else{body.addEventListener("focus",function(evt){dijit._onFocusNode(evt.target)
},true);
body.addEventListener("blur",function(evt){dijit._onBlurNode(evt.target)
},true)
}}body=null
},_onBlurNode:function(node){dijit._prevFocus=dijit._curFocus;
dijit._curFocus=null;
var w=dijit.getEnclosingWidget(node);
if(w&&w._setStateClass){w._focused=false;
w._setStateClass()
}if(dijit._justMouseDowned){return 
}if(dijit._clearActiveWidgetsTimer){clearTimeout(dijit._clearActiveWidgetsTimer)
}dijit._clearActiveWidgetsTimer=setTimeout(function(){delete dijit._clearActiveWidgetsTimer;
dijit._setStack([])
},100)
},_onTouchNode:function(node){if(dijit._clearActiveWidgetsTimer){clearTimeout(dijit._clearActiveWidgetsTimer);
delete dijit._clearActiveWidgetsTimer
}var newStack=[];
try{while(node){if(node.dijitPopupParent){node=dijit.byId(node.dijitPopupParent).domNode
}else{if(node.tagName&&node.tagName.toLowerCase()=="body"){if(node===dojo.body()){break
}node=dojo.query("iframe").filter(function(iframe){return iframe.contentDocument.body===node
})[0]
}else{var id=node.getAttribute&&node.getAttribute("widgetId");
if(id){newStack.unshift(id)
}node=node.parentNode
}}}}catch(e){}dijit._setStack(newStack)
},_onFocusNode:function(node){if(node&&node.tagName&&node.tagName.toLowerCase()=="body"){return 
}dijit._onTouchNode(node);
if(node==dijit._curFocus){return 
}dijit._prevFocus=dijit._curFocus;
dijit._curFocus=node;
dojo.publish("focusNode",[node]);
var w=dijit.getEnclosingWidget(node);
if(w&&w._setStateClass){w._focused=true;
w._setStateClass()
}},_setStack:function(newStack){var oldStack=dijit._activeStack;
dijit._activeStack=newStack;
for(var nCommon=0;
nCommon<Math.min(oldStack.length,newStack.length);
nCommon++){if(oldStack[nCommon]!=newStack[nCommon]){break
}}for(var i=oldStack.length-1;
i>=nCommon;
i--){var widget=dijit.byId(oldStack[i]);
if(widget){dojo.publish("widgetBlur",[widget]);
if(widget._onBlur){widget._onBlur()
}}}for(var i=nCommon;
i<newStack.length;
i++){var widget=dijit.byId(newStack[i]);
if(widget){dojo.publish("widgetFocus",[widget]);
if(widget._onFocus){widget._onFocus()
}}}}});
dojo.addOnLoad(dijit.registerWin)
}if(!dojo._hasResource["dijit._base.manager"]){dojo._hasResource["dijit._base.manager"]=true;
dojo.provide("dijit._base.manager");
dojo.declare("dijit.WidgetSet",null,{constructor:function(){this._hash={}
},add:function(widget){if(this._hash[widget.id]){throw new Error("Tried to register widget with id=="+widget.id+" but that id is already registered")
}this._hash[widget.id]=widget
},remove:function(id){delete this._hash[id]
},forEach:function(func){for(var id in this._hash){func(this._hash[id])
}},filter:function(filter){var res=new dijit.WidgetSet();
this.forEach(function(widget){if(filter(widget)){res.add(widget)
}});
return res
},byId:function(id){return this._hash[id]
},byClass:function(cls){return this.filter(function(widget){return widget.declaredClass==cls
})
}});
dijit.registry=new dijit.WidgetSet();
dijit._widgetTypeCtr={};
dijit.getUniqueId=function(widgetType){var id;
do{id=widgetType+"_"+(dijit._widgetTypeCtr[widgetType]!==undefined?++dijit._widgetTypeCtr[widgetType]:dijit._widgetTypeCtr[widgetType]=0)
}while(dijit.byId(id));
return id
};
if(dojo.isIE){dojo.addOnUnload(function(){dijit.registry.forEach(function(widget){widget.destroy()
})
})
}dijit.byId=function(id){return(dojo.isString(id))?dijit.registry.byId(id):id
};
dijit.byNode=function(node){return dijit.registry.byId(node.getAttribute("widgetId"))
};
dijit.getEnclosingWidget=function(node){while(node){if(node.getAttribute&&node.getAttribute("widgetId")){return dijit.registry.byId(node.getAttribute("widgetId"))
}node=node.parentNode
}return null
}
}if(!dojo._hasResource["dijit._base.place"]){dojo._hasResource["dijit._base.place"]=true;
dojo.provide("dijit._base.place");
dijit.getViewport=function(){var _window=dojo.global;
var _document=dojo.doc;
var w=0,h=0;
if(dojo.isMozilla){var minw,minh,maxw,maxh;
if(_document.body.clientWidth>_document.documentElement.clientWidth){minw=_document.documentElement.clientWidth;
maxw=_document.body.clientWidth
}else{maxw=_document.documentElement.clientWidth;
minw=_document.body.clientWidth
}if(_document.body.clientHeight>_document.documentElement.clientHeight){minh=_document.documentElement.clientHeight;
maxh=_document.body.clientHeight
}else{maxh=_document.documentElement.clientHeight;
minh=_document.body.clientHeight
}w=(maxw>_window.innerWidth)?minw:maxw;
h=(maxh>_window.innerHeight)?minh:maxh
}else{if(!dojo.isOpera&&_window.innerWidth){w=_window.innerWidth;
h=_window.innerHeight
}else{if(dojo.isIE&&_document.documentElement&&_document.documentElement.clientHeight){w=_document.documentElement.clientWidth;
h=_document.documentElement.clientHeight
}else{if(dojo.body().clientWidth){w=dojo.body().clientWidth;
h=dojo.body().clientHeight
}}}}var scroll=dojo._docScroll();
return{w:w,h:h,l:scroll.x,t:scroll.y}
};
dijit.placeOnScreen=function(node,pos,corners,tryOnly){var choices=dojo.map(corners,function(corner){return{corner:corner,pos:pos}
});
return dijit._place(node,choices)
};
dijit._place=function(node,choices,layoutNode){var view=dijit.getViewport();
if(!node.parentNode||String(node.parentNode.tagName).toLowerCase()!="body"){dojo.body().appendChild(node)
}var best=null;
for(var i=0;
i<choices.length;
i++){var corner=choices[i].corner;
var pos=choices[i].pos;
if(layoutNode){layoutNode(corner)
}var oldDisplay=node.style.display;
var oldVis=node.style.visibility;
node.style.visibility="hidden";
node.style.display="";
var mb=dojo.marginBox(node);
node.style.display=oldDisplay;
node.style.visibility=oldVis;
var startX=(corner.charAt(1)=="L"?pos.x:Math.max(view.l,pos.x-mb.w)),startY=(corner.charAt(0)=="T"?pos.y:Math.max(view.t,pos.y-mb.h)),endX=(corner.charAt(1)=="L"?Math.min(view.l+view.w,startX+mb.w):pos.x),endY=(corner.charAt(0)=="T"?Math.min(view.t+view.h,startY+mb.h):pos.y),width=endX-startX,height=endY-startY,overflow=(mb.w-width)+(mb.h-height);
if(best==null||overflow<best.overflow){best={corner:corner,aroundCorner:choices[i].aroundCorner,x:startX,y:startY,w:width,h:height,overflow:overflow}
}if(overflow==0){break
}}node.style.left=best.x+"px";
node.style.top=best.y+"px";
return best
};
dijit.placeOnScreenAroundElement=function(node,aroundNode,aroundCorners,layoutNode){aroundNode=dojo.byId(aroundNode);
var oldDisplay=aroundNode.style.display;
aroundNode.style.display="";
var aroundNodeW=aroundNode.offsetWidth;
var aroundNodeH=aroundNode.offsetHeight;
var aroundNodePos=dojo.coords(aroundNode,true);
aroundNode.style.display=oldDisplay;
var choices=[];
for(var nodeCorner in aroundCorners){choices.push({aroundCorner:nodeCorner,corner:aroundCorners[nodeCorner],pos:{x:aroundNodePos.x+(nodeCorner.charAt(1)=="L"?0:aroundNodeW),y:aroundNodePos.y+(nodeCorner.charAt(0)=="T"?0:aroundNodeH)}})
}return dijit._place(node,choices,layoutNode)
}
}if(!dojo._hasResource["dijit._base.window"]){dojo._hasResource["dijit._base.window"]=true;
dojo.provide("dijit._base.window");
dijit.getDocumentWindow=function(doc){if(dojo.isSafari&&!doc._parentWindow){var fix=function(win){win.document._parentWindow=win;
for(var i=0;
i<win.frames.length;
i++){fix(win.frames[i])
}};
fix(window.top)
}if(dojo.isIE&&window!==document.parentWindow&&!doc._parentWindow){doc.parentWindow.execScript("document._parentWindow = window;","Javascript");
var win=doc._parentWindow;
doc._parentWindow=null;
return win
}return doc._parentWindow||doc.parentWindow||doc.defaultView
}
}if(!dojo._hasResource["dijit._base.popup"]){dojo._hasResource["dijit._base.popup"]=true;
dojo.provide("dijit._base.popup");
dijit.popup=new function(){var stack=[],beginZIndex=1000,idGen=1;
this.open=function(args){var widget=args.popup,orient=args.orient||{BL:"TL",TL:"BL"},around=args.around,id=(args.around&&args.around.id)?(args.around.id+"_dropdown"):("popup_"+idGen++);
var wrapper=dojo.doc.createElement("div");
wrapper.id=id;
wrapper.className="dijitPopup";
wrapper.style.zIndex=beginZIndex+stack.length;
wrapper.style.visibility="hidden";
if(args.parent){wrapper.dijitPopupParent=args.parent.id
}dojo.body().appendChild(wrapper);
widget.domNode.style.display="";
wrapper.appendChild(widget.domNode);
var iframe=new dijit.BackgroundIframe(wrapper);
var best=around?dijit.placeOnScreenAroundElement(wrapper,around,orient,widget.orient?dojo.hitch(widget,"orient"):null):dijit.placeOnScreen(wrapper,args,orient=="R"?["TR","BR","TL","BL"]:["TL","BL","TR","BR"]);
wrapper.style.visibility="visible";
var handlers=[];
function getTopPopup(){for(var pi=stack.length-1;
pi>0&&stack[pi].parent===stack[pi-1].widget;
pi--){}return stack[pi]
}handlers.push(dojo.connect(wrapper,"onkeypress",this,function(evt){if(evt.keyCode==dojo.keys.ESCAPE&&args.onCancel){args.onCancel()
}else{if(evt.keyCode==dojo.keys.TAB){dojo.stopEvent(evt);
var topPopup=getTopPopup();
if(topPopup&&topPopup.onCancel){topPopup.onCancel()
}}}}));
if(widget.onCancel){handlers.push(dojo.connect(widget,"onCancel",null,args.onCancel))
}handlers.push(dojo.connect(widget,widget.onExecute?"onExecute":"onChange",null,function(){var topPopup=getTopPopup();
if(topPopup&&topPopup.onExecute){topPopup.onExecute()
}}));
stack.push({wrapper:wrapper,iframe:iframe,widget:widget,parent:args.parent,onExecute:args.onExecute,onCancel:args.onCancel,onClose:args.onClose,handlers:handlers});
if(widget.onOpen){widget.onOpen(best)
}return best
};
this.close=function(popup){while(dojo.some(stack,function(elem){return elem.widget==popup
})){var top=stack.pop(),wrapper=top.wrapper,iframe=top.iframe,widget=top.widget,onClose=top.onClose;
if(widget.onClose){widget.onClose()
}dojo.forEach(top.handlers,dojo.disconnect);
if(!widget||!widget.domNode){return 
}dojo.style(widget.domNode,"display","none");
dojo.body().appendChild(widget.domNode);
iframe.destroy();
dojo._destroyElement(wrapper);
if(onClose){onClose()
}}}
}();
dijit._frames=new function(){var queue=[];
this.pop=function(){var iframe;
if(queue.length){iframe=queue.pop();
iframe.style.display=""
}else{if(dojo.isIE){var html="<iframe src='javascript:\"\"' style='position: absolute; left: 0px; top: 0px;z-index: -1; filter:Alpha(Opacity=\"0\");'>";
iframe=dojo.doc.createElement(html)
}else{var iframe=dojo.doc.createElement("iframe");
iframe.src='javascript:""';
iframe.className="dijitBackgroundIframe"
}iframe.tabIndex=-1;
dojo.body().appendChild(iframe)
}return iframe
};
this.push=function(iframe){iframe.style.display="";
if(dojo.isIE){iframe.style.removeExpression("width");
iframe.style.removeExpression("height")
}queue.push(iframe)
}
}();
if(dojo.isIE&&dojo.isIE<7){dojo.addOnLoad(function(){var f=dijit._frames;
dojo.forEach([f.pop()],f.push)
})
}dijit.BackgroundIframe=function(node){if(!node.id){throw new Error("no id")
}if((dojo.isIE&&dojo.isIE<7)||(dojo.isFF&&dojo.isFF<3&&dojo.hasClass(dojo.body(),"dijit_a11y"))){var iframe=dijit._frames.pop();
node.appendChild(iframe);
if(dojo.isIE){iframe.style.setExpression("width","document.getElementById('"+node.id+"').offsetWidth");
iframe.style.setExpression("height","document.getElementById('"+node.id+"').offsetHeight")
}this.iframe=iframe
}};
dojo.extend(dijit.BackgroundIframe,{destroy:function(){if(this.iframe){dijit._frames.push(this.iframe);
delete this.iframe
}}})
}if(!dojo._hasResource["dijit._base.scroll"]){dojo._hasResource["dijit._base.scroll"]=true;
dojo.provide("dijit._base.scroll");
dijit.scrollIntoView=function(node){if(dojo.isIE){if(dojo.marginBox(node.parentNode).h<=node.parentNode.scrollHeight){node.scrollIntoView(false)
}}else{if(dojo.isMozilla){node.scrollIntoView(false)
}else{var parent=node.parentNode;
var parentBottom=parent.scrollTop+dojo.marginBox(parent).h;
var nodeBottom=node.offsetTop+dojo.marginBox(node).h;
if(parentBottom<nodeBottom){parent.scrollTop+=(nodeBottom-parentBottom)
}else{if(parent.scrollTop>node.offsetTop){parent.scrollTop-=(parent.scrollTop-node.offsetTop)
}}}}}
}if(!dojo._hasResource["dijit._base.sniff"]){dojo._hasResource["dijit._base.sniff"]=true;
dojo.provide("dijit._base.sniff");
(function(){var d=dojo;
var ie=d.isIE;
var opera=d.isOpera;
var maj=Math.floor;
var classes={dj_ie:ie,dj_ie6:maj(ie)==6,dj_ie7:maj(ie)==7,dj_iequirks:ie&&d.isQuirks,dj_opera:opera,dj_opera8:maj(opera)==8,dj_opera9:maj(opera)==9,dj_khtml:d.isKhtml,dj_safari:d.isSafari,dj_gecko:d.isMozilla};
for(var p in classes){if(classes[p]){var html=dojo.doc.documentElement;
if(html.className){html.className+=" "+p
}else{html.className=p
}}}})()
}if(!dojo._hasResource["dijit._base.bidi"]){dojo._hasResource["dijit._base.bidi"]=true;
dojo.provide("dijit._base.bidi");
dojo.addOnLoad(function(){if(!dojo._isBodyLtr()){dojo.addClass(dojo.body(),"dijitRtl")
}})
}if(!dojo._hasResource["dijit._base.typematic"]){dojo._hasResource["dijit._base.typematic"]=true;
dojo.provide("dijit._base.typematic");
dijit.typematic={_fireEventAndReload:function(){this._timer=null;
this._callback(++this._count,this._node,this._evt);
this._currentTimeout=(this._currentTimeout<0)?this._initialDelay:((this._subsequentDelay>1)?this._subsequentDelay:Math.round(this._currentTimeout*this._subsequentDelay));
this._timer=setTimeout(dojo.hitch(this,"_fireEventAndReload"),this._currentTimeout)
},trigger:function(evt,_this,node,callback,obj,subsequentDelay,initialDelay){if(obj!=this._obj){this.stop();
this._initialDelay=initialDelay||500;
this._subsequentDelay=subsequentDelay||0.9;
this._obj=obj;
this._evt=evt;
this._node=node;
this._currentTimeout=-1;
this._count=-1;
this._callback=dojo.hitch(_this,callback);
this._fireEventAndReload()
}},stop:function(){if(this._timer){clearTimeout(this._timer);
this._timer=null
}if(this._obj){this._callback(-1,this._node,this._evt);
this._obj=null
}},addKeyListener:function(node,keyObject,_this,callback,subsequentDelay,initialDelay){return[dojo.connect(node,"onkeypress",this,function(evt){if(evt.keyCode==keyObject.keyCode&&(!keyObject.charCode||keyObject.charCode==evt.charCode)&&(keyObject.ctrlKey===undefined||keyObject.ctrlKey==evt.ctrlKey)&&(keyObject.altKey===undefined||keyObject.altKey==evt.ctrlKey)&&(keyObject.shiftKey===undefined||keyObject.shiftKey==evt.ctrlKey)){dojo.stopEvent(evt);
dijit.typematic.trigger(keyObject,_this,node,callback,keyObject,subsequentDelay,initialDelay)
}else{if(dijit.typematic._obj==keyObject){dijit.typematic.stop()
}}}),dojo.connect(node,"onkeyup",this,function(evt){if(dijit.typematic._obj==keyObject){dijit.typematic.stop()
}})]
},addMouseListener:function(node,_this,callback,subsequentDelay,initialDelay){var dc=dojo.connect;
return[dc(node,"mousedown",this,function(evt){dojo.stopEvent(evt);
dijit.typematic.trigger(evt,_this,node,callback,node,subsequentDelay,initialDelay)
}),dc(node,"mouseup",this,function(evt){dojo.stopEvent(evt);
dijit.typematic.stop()
}),dc(node,"mouseout",this,function(evt){dojo.stopEvent(evt);
dijit.typematic.stop()
}),dc(node,"mousemove",this,function(evt){dojo.stopEvent(evt)
}),dc(node,"dblclick",this,function(evt){dojo.stopEvent(evt);
if(dojo.isIE){dijit.typematic.trigger(evt,_this,node,callback,node,subsequentDelay,initialDelay);
setTimeout(dijit.typematic.stop,50)
}})]
},addListener:function(mouseNode,keyNode,keyObject,_this,callback,subsequentDelay,initialDelay){return this.addKeyListener(keyNode,keyObject,_this,callback,subsequentDelay,initialDelay).concat(this.addMouseListener(mouseNode,_this,callback,subsequentDelay,initialDelay))
}}
}if(!dojo._hasResource["dijit._base.wai"]){dojo._hasResource["dijit._base.wai"]=true;
dojo.provide("dijit._base.wai");
dijit.wai={onload:function(){var div=document.createElement("div");
div.id="a11yTestNode";
div.style.cssText='border: 1px solid;border-color:red green;position: absolute;height: 5px;top: -999px;background-image: url("'+dojo.moduleUrl("dijit","form/templates/blank.gif")+'");';
dojo.body().appendChild(div);
function check(){var cs=dojo.getComputedStyle(div);
if(cs){var bkImg=cs.backgroundImage;
var needsA11y=(cs.borderTopColor==cs.borderRightColor)||(bkImg!=null&&(bkImg=="none"||bkImg=="url(invalid-url:)"));
dojo[needsA11y?"addClass":"removeClass"](dojo.body(),"dijit_a11y")
}}check();
if(dojo.isIE){setInterval(check,4000)
}}};
if(dojo.isIE||dojo.isMoz){dojo._loaders.unshift(dijit.wai.onload)
}dojo.mixin(dijit,{hasWaiRole:function(elem){if(elem.hasAttribute){return elem.hasAttribute("role")
}else{return elem.getAttribute("role")?true:false
}},getWaiRole:function(elem){var value=elem.getAttribute("role");
if(value){var prefixEnd=value.indexOf(":");
return prefixEnd==-1?value:value.substring(prefixEnd+1)
}else{return""
}},setWaiRole:function(elem,role){if(dojo.isFF&&dojo.isFF<3){elem.setAttribute("role","wairole:"+role)
}else{elem.setAttribute("role",role)
}},removeWaiRole:function(elem){elem.removeAttribute("role")
},hasWaiState:function(elem,state){if(dojo.isFF&&dojo.isFF<3){return elem.hasAttributeNS("http://www.w3.org/2005/07/aaa",state)
}else{if(elem.hasAttribute){return elem.hasAttribute("aria-"+state)
}else{return elem.getAttribute("aria-"+state)?true:false
}}},getWaiState:function(elem,state){if(dojo.isFF&&dojo.isFF<3){return elem.getAttributeNS("http://www.w3.org/2005/07/aaa",state)
}else{var value=elem.getAttribute("aria-"+state);
return value?value:""
}},setWaiState:function(elem,state,value){if(dojo.isFF&&dojo.isFF<3){elem.setAttributeNS("http://www.w3.org/2005/07/aaa","aaa:"+state,value)
}else{elem.setAttribute("aria-"+state,value)
}},removeWaiState:function(elem,state){if(dojo.isFF&&dojo.isFF<3){elem.removeAttributeNS("http://www.w3.org/2005/07/aaa",state)
}else{elem.removeAttribute("aria-"+state)
}}})
}if(!dojo._hasResource["dijit._base"]){dojo._hasResource["dijit._base"]=true;
dojo.provide("dijit._base")
}if(!dojo._hasResource["dojo.date.stamp"]){dojo._hasResource["dojo.date.stamp"]=true;
dojo.provide("dojo.date.stamp");
dojo.date.stamp.fromISOString=function(formattedString,defaultTime){if(!dojo.date.stamp._isoRegExp){dojo.date.stamp._isoRegExp=/^(?:(\d{4})(?:-(\d{2})(?:-(\d{2}))?)?)?(?:T(\d{2}):(\d{2})(?::(\d{2})(.\d+)?)?((?:[+-](\d{2}):(\d{2}))|Z)?)?$/
}var match=dojo.date.stamp._isoRegExp.exec(formattedString);
var result=null;
if(match){match.shift();
match[1]&&match[1]--;
match[6]&&(match[6]*=1000);
if(defaultTime){defaultTime=new Date(defaultTime);
dojo.map(["FullYear","Month","Date","Hours","Minutes","Seconds","Milliseconds"],function(prop){return defaultTime["get"+prop]()
}).forEach(function(value,index){if(match[index]===undefined){match[index]=value
}})
}result=new Date(match[0]||1970,match[1]||0,match[2]||0,match[3]||0,match[4]||0,match[5]||0,match[6]||0);
var offset=0;
var zoneSign=match[7]&&match[7].charAt(0);
if(zoneSign!="Z"){offset=((match[8]||0)*60)+(Number(match[9])||0);
if(zoneSign!="-"){offset*=-1
}}if(zoneSign){offset-=result.getTimezoneOffset()
}if(offset){result.setTime(result.getTime()+offset*60000)
}}return result
};
dojo.date.stamp.toISOString=function(dateObject,options){var _=function(n){return(n<10)?"0"+n:n
};
options=options||{};
var formattedDate=[];
var getter=options.zulu?"getUTC":"get";
var date="";
if(options.selector!="time"){date=[dateObject[getter+"FullYear"](),_(dateObject[getter+"Month"]()+1),_(dateObject[getter+"Date"]())].join("-")
}formattedDate.push(date);
if(options.selector!="date"){var time=[_(dateObject[getter+"Hours"]()),_(dateObject[getter+"Minutes"]()),_(dateObject[getter+"Seconds"]())].join(":");
var millis=dateObject[getter+"Milliseconds"]();
if(options.milliseconds){time+="."+(millis<100?"0":"")+_(millis)
}if(options.zulu){time+="Z"
}else{if(options.selector!="time"){var timezoneOffset=dateObject.getTimezoneOffset();
var absOffset=Math.abs(timezoneOffset);
time+=(timezoneOffset>0?"-":"+")+_(Math.floor(absOffset/60))+":"+_(absOffset%60)
}}formattedDate.push(time)
}return formattedDate.join("T")
}
}if(!dojo._hasResource["dojo.parser"]){dojo._hasResource["dojo.parser"]=true;
dojo.provide("dojo.parser");
dojo.parser=new function(){var d=dojo;
function val2type(value){if(d.isString(value)){return"string"
}if(typeof value=="number"){return"number"
}if(typeof value=="boolean"){return"boolean"
}if(d.isFunction(value)){return"function"
}if(d.isArray(value)){return"array"
}if(value instanceof Date){return"date"
}if(value instanceof d._Url){return"url"
}return"object"
}function str2obj(value,type){switch(type){case"string":return value;
case"number":return value.length?Number(value):NaN;
case"boolean":return typeof value=="boolean"?value:!(value.toLowerCase()=="false");
case"function":if(d.isFunction(value)){value=value.toString();
value=d.trim(value.substring(value.indexOf("{")+1,value.length-1))
}try{if(value.search(/[^\w\.]+/i)!=-1){value=d.parser._nameAnonFunc(new Function(value),this)
}return d.getObject(value,false)
}catch(e){return new Function()
}case"array":return value.split(/\s*,\s*/);
case"date":switch(value){case"":return new Date("");
case"now":return new Date();
default:return d.date.stamp.fromISOString(value)
}case"url":return d.baseUrl+value;
default:return d.fromJson(value)
}}var instanceClasses={};
function getClassInfo(className){if(!instanceClasses[className]){var cls=d.getObject(className);
if(!d.isFunction(cls)){throw new Error("Could not load class '"+className+"'. Did you spell the name correctly and use a full path, like 'dijit.form.Button'?")
}var proto=cls.prototype;
var params={};
for(var name in proto){if(name.charAt(0)=="_"){continue
}var defVal=proto[name];
params[name]=val2type(defVal)
}instanceClasses[className]={cls:cls,params:params}
}return instanceClasses[className]
}this._functionFromScript=function(script){var preamble="";
var suffix="";
var argsStr=script.getAttribute("args");
if(argsStr){d.forEach(argsStr.split(/\s*,\s*/),function(part,idx){preamble+="var "+part+" = arguments["+idx+"]; "
})
}var withStr=script.getAttribute("with");
if(withStr&&withStr.length){d.forEach(withStr.split(/\s*,\s*/),function(part){preamble+="with("+part+"){";
suffix+="}"
})
}return new Function(preamble+script.innerHTML+suffix)
};
this.instantiate=function(nodes){var thelist=[];
d.forEach(nodes,function(node){if(!node){return 
}var type=node.getAttribute("dojoType");
if((!type)||(!type.length)){return 
}var clsInfo=getClassInfo(type);
var clazz=clsInfo.cls;
var ps=clazz._noScript||clazz.prototype._noScript;
var params={};
var attributes=node.attributes;
for(var name in clsInfo.params){var item=attributes.getNamedItem(name);
if(!item||(!item.specified&&(!dojo.isIE||name.toLowerCase()!="value"))){continue
}var value=item.value;
switch(name){case"class":value=node.className;
break;
case"style":value=node.style&&node.style.cssText
}var _type=clsInfo.params[name];
params[name]=str2obj(value,_type)
}if(!ps){var connects=[],calls=[];
d.query("> script[type^='dojo/']",node).orphan().forEach(function(script){var event=script.getAttribute("event"),type=script.getAttribute("type"),nf=d.parser._functionFromScript(script);
if(event){if(type=="dojo/connect"){connects.push({event:event,func:nf})
}else{params[event]=nf
}}else{calls.push(nf)
}})
}var markupFactory=clazz.markupFactory;
if(!markupFactory&&clazz.prototype){markupFactory=clazz.prototype.markupFactory
}var instance=markupFactory?markupFactory(params,node,clazz):new clazz(params,node);
thelist.push(instance);
var jsname=node.getAttribute("jsId");
if(jsname){d.setObject(jsname,instance)
}if(!ps){dojo.forEach(connects,function(connect){dojo.connect(instance,connect.event,null,connect.func)
});
dojo.forEach(calls,function(func){func.call(instance)
})
}});
d.forEach(thelist,function(instance){if(instance&&(instance.startup)&&((!instance.getParent)||(!instance.getParent()))){instance.startup()
}});
return thelist
};
this.parse=function(rootNode){var list=d.query("[dojoType]",rootNode);
var instances=this.instantiate(list);
return instances
}
}();
(function(){var parseRunner=function(){if(djConfig.parseOnLoad==true){dojo.parser.parse()
}};
if(dojo.exists("dijit.wai.onload")&&(dijit.wai.onload===dojo._loaders[0])){dojo._loaders.splice(1,0,parseRunner)
}else{dojo._loaders.unshift(parseRunner)
}})();
dojo.parser._anonCtr=0;
dojo.parser._anon={};
dojo.parser._nameAnonFunc=function(anonFuncPtr,thisObj){var jpn="$joinpoint";
var nso=(thisObj||dojo.parser._anon);
if(dojo.isIE){var cn=anonFuncPtr.__dojoNameCache;
if(cn&&nso[cn]===anonFuncPtr){return anonFuncPtr.__dojoNameCache
}}var ret="__"+dojo.parser._anonCtr++;
while(typeof nso[ret]!="undefined"){ret="__"+dojo.parser._anonCtr++
}nso[ret]=anonFuncPtr;
return ret
}
}if(!dojo._hasResource["dijit._Widget"]){dojo._hasResource["dijit._Widget"]=true;
dojo.provide("dijit._Widget");
dojo.declare("dijit._Widget",null,{id:"",lang:"",dir:"","class":"",style:"",title:"",srcNodeRef:null,domNode:null,attributeMap:{id:"",dir:"",lang:"","class":"",style:"",title:""},postscript:function(params,srcNodeRef){this.create(params,srcNodeRef)
},create:function(params,srcNodeRef){this.srcNodeRef=dojo.byId(srcNodeRef);
this._connects=[];
this._attaches=[];
if(this.srcNodeRef&&(typeof this.srcNodeRef.id=="string")){this.id=this.srcNodeRef.id
}if(params){dojo.mixin(this,params)
}this.postMixInProperties();
if(!this.id){this.id=dijit.getUniqueId(this.declaredClass.replace(/\./g,"_"))
}dijit.registry.add(this);
this.buildRendering();
if(this.domNode){for(var attr in this.attributeMap){var mapNode=this[this.attributeMap[attr]||"domNode"];
var value=this[attr];
if(typeof value!="object"&&(value!==""||(params&&params[attr]))){switch(attr){case"class":dojo.addClass(mapNode,value);
break;
case"style":if(mapNode.style.cssText){mapNode.style.cssText+="; "+value
}else{mapNode.style.cssText=value
}break;
default:mapNode.setAttribute(attr,value)
}}}}if(this.domNode){this.domNode.setAttribute("widgetId",this.id)
}this.postCreate();
if(this.srcNodeRef&&!this.srcNodeRef.parentNode){delete this.srcNodeRef
}},postMixInProperties:function(){},buildRendering:function(){this.domNode=this.srcNodeRef||dojo.doc.createElement("div")
},postCreate:function(){},startup:function(){},destroyRecursive:function(finalize){this.destroyDescendants();
this.destroy()
},destroy:function(finalize){this.uninitialize();
dojo.forEach(this._connects,function(array){dojo.forEach(array,dojo.disconnect)
});
this.destroyRendering(finalize);
dijit.registry.remove(this.id)
},destroyRendering:function(finalize){if(this.bgIframe){this.bgIframe.destroy();
delete this.bgIframe
}if(this.domNode){dojo._destroyElement(this.domNode);
delete this.domNode
}if(this.srcNodeRef){dojo._destroyElement(this.srcNodeRef);
delete this.srcNodeRef
}},destroyDescendants:function(){dojo.forEach(this.getDescendants(),function(widget){widget.destroy()
})
},uninitialize:function(){return false
},toString:function(){return"[Widget "+this.declaredClass+", "+(this.id||"NO ID")+"]"
},getDescendants:function(){var list=dojo.query("[widgetId]",this.domNode);
return list.map(dijit.byNode)
},nodesWithKeyClick:["input","button"],connect:function(obj,event,method){var handles=[];
if(event=="ondijitclick"){var w=this;
if(!this.nodesWithKeyClick[obj.nodeName]){handles.push(dojo.connect(obj,"onkeydown",this,function(e){if(e.keyCode==dojo.keys.ENTER){return(dojo.isString(method))?w[method](e):method.call(w,e)
}else{if(e.keyCode==dojo.keys.SPACE){dojo.stopEvent(e)
}}}));
handles.push(dojo.connect(obj,"onkeyup",this,function(e){if(e.keyCode==dojo.keys.SPACE){return dojo.isString(method)?w[method](e):method.call(w,e)
}}))
}event="onclick"
}handles.push(dojo.connect(obj,event,this,method));
this._connects.push(handles);
return handles
},disconnect:function(handles){for(var i=0;
i<this._connects.length;
i++){if(this._connects[i]==handles){dojo.forEach(handles,dojo.disconnect);
this._connects.splice(i,1);
return 
}}},isLeftToRight:function(){if(typeof this._ltr=="undefined"){this._ltr=dojo.getComputedStyle(this.domNode).direction!="rtl"
}return this._ltr
},isFocusable:function(){return this.focus&&(dojo.style(this.domNode,"display")!="none")
}})
}if(!dojo._hasResource["dojo.string"]){dojo._hasResource["dojo.string"]=true;
dojo.provide("dojo.string");
dojo.string.pad=function(text,size,ch,end){var out=String(text);
if(!ch){ch="0"
}while(out.length<size){if(end){out+=ch
}else{out=ch+out
}}return out
};
dojo.string.substitute=function(template,map,transform,thisObject){return template.replace(/\$\{([^\s\:\}]+)(?:\:([^\s\:\}]+))?\}/g,function(match,key,format){var value=dojo.getObject(key,false,map);
if(format){value=dojo.getObject(format,false,thisObject)(value)
}if(transform){value=transform(value,key)
}return value.toString()
})
};
dojo.string.trim=function(str){str=str.replace(/^\s+/,"");
for(var i=str.length-1;
i>0;
i--){if(/\S/.test(str.charAt(i))){str=str.substring(0,i+1);
break
}}return str
}
}if(!dojo._hasResource["dijit._Templated"]){dojo._hasResource["dijit._Templated"]=true;
dojo.provide("dijit._Templated");
dojo.declare("dijit._Templated",null,{templateNode:null,templateString:null,templatePath:null,widgetsInTemplate:false,containerNode:null,_skipNodeCache:false,buildRendering:function(){var cached=dijit._Templated.getCachedTemplate(this.templatePath,this.templateString,this._skipNodeCache);
var node;
if(dojo.isString(cached)){var className=this.declaredClass,_this=this;
var tstr=dojo.string.substitute(cached,this,function(value,key){if(key.charAt(0)=="!"){value=_this[key.substr(1)]
}if(typeof value=="undefined"){throw new Error(className+" template:"+key)
}if(!value){return""
}return key.charAt(0)=="!"?value:value.toString().replace(/"/g,"&quot;")
},this);
node=dijit._Templated._createNodesFromText(tstr)[0]
}else{node=cached.cloneNode(true)
}this._attachTemplateNodes(node);
var source=this.srcNodeRef;
if(source&&source.parentNode){source.parentNode.replaceChild(node,source)
}this.domNode=node;
if(this.widgetsInTemplate){var childWidgets=dojo.parser.parse(node);
this._attachTemplateNodes(childWidgets,function(n,p){return n[p]
})
}this._fillContent(source)
},_fillContent:function(source){var dest=this.containerNode;
if(source&&dest){while(source.hasChildNodes()){dest.appendChild(source.firstChild)
}}},_attachTemplateNodes:function(rootNode,getAttrFunc){getAttrFunc=getAttrFunc||function(n,p){return n.getAttribute(p)
};
var nodes=dojo.isArray(rootNode)?rootNode:(rootNode.all||rootNode.getElementsByTagName("*"));
var x=dojo.isArray(rootNode)?0:-1;
for(;
x<nodes.length;
x++){var baseNode=(x==-1)?rootNode:nodes[x];
if(this.widgetsInTemplate&&getAttrFunc(baseNode,"dojoType")){continue
}var attachPoint=getAttrFunc(baseNode,"dojoAttachPoint");
if(attachPoint){var point,points=attachPoint.split(/\s*,\s*/);
while(point=points.shift()){if(dojo.isArray(this[point])){this[point].push(baseNode)
}else{this[point]=baseNode
}}}var attachEvent=getAttrFunc(baseNode,"dojoAttachEvent");
if(attachEvent){var event,events=attachEvent.split(/\s*,\s*/);
var trim=dojo.trim;
while(event=events.shift()){if(event){var thisFunc=null;
if(event.indexOf(":")!=-1){var funcNameArr=event.split(":");
event=trim(funcNameArr[0]);
thisFunc=trim(funcNameArr[1])
}else{event=trim(event)
}if(!thisFunc){thisFunc=event
}this.connect(baseNode,event,thisFunc)
}}}var role=getAttrFunc(baseNode,"waiRole");
if(role){dijit.setWaiRole(baseNode,role)
}var values=getAttrFunc(baseNode,"waiState");
if(values){dojo.forEach(values.split(/\s*,\s*/),function(stateValue){if(stateValue.indexOf("-")!=-1){var pair=stateValue.split("-");
dijit.setWaiState(baseNode,pair[0],pair[1])
}})
}}}});
dijit._Templated._templateCache={};
dijit._Templated.getCachedTemplate=function(templatePath,templateString,alwaysUseString){var tmplts=dijit._Templated._templateCache;
var key=templateString||templatePath;
var cached=tmplts[key];
if(cached){return cached
}if(!templateString){templateString=dijit._Templated._sanitizeTemplateString(dojo._getText(templatePath))
}templateString=dojo.string.trim(templateString);
if(templateString.match(/\$\{([^\}]+)\}/g)||alwaysUseString){return(tmplts[key]=templateString)
}else{return(tmplts[key]=dijit._Templated._createNodesFromText(templateString)[0])
}};
dijit._Templated._sanitizeTemplateString=function(tString){if(tString){tString=tString.replace(/^\s*<\?xml(\s)+version=[\'\"](\d)*.(\d)*[\'\"](\s)*\?>/im,"");
var matches=tString.match(/<body[^>]*>\s*([\s\S]+)\s*<\/body>/im);
if(matches){tString=matches[1]
}}else{tString=""
}return tString
};
if(dojo.isIE){dojo.addOnUnload(function(){var cache=dijit._Templated._templateCache;
for(var key in cache){var value=cache[key];
if(!isNaN(value.nodeType)){dojo._destroyElement(value)
}delete cache[key]
}})
}(function(){var tagMap={cell:{re:/^<t[dh][\s\r\n>]/i,pre:"<table><tbody><tr>",post:"</tr></tbody></table>"},row:{re:/^<tr[\s\r\n>]/i,pre:"<table><tbody>",post:"</tbody></table>"},section:{re:/^<(thead|tbody|tfoot)[\s\r\n>]/i,pre:"<table>",post:"</table>"}};
var tn;
dijit._Templated._createNodesFromText=function(text){if(!tn){tn=dojo.doc.createElement("div");
tn.style.display="none";
dojo.body().appendChild(tn)
}var tableType="none";
var rtext=text.replace(/^\s+/,"");
for(var type in tagMap){var map=tagMap[type];
if(map.re.test(rtext)){tableType=type;
text=map.pre+text+map.post;
break
}}tn.innerHTML=text;
if(tn.normalize){tn.normalize()
}var tag={cell:"tr",row:"tbody",section:"table"}[tableType];
var _parent=(typeof tag!="undefined")?tn.getElementsByTagName(tag)[0]:tn;
var nodes=[];
while(_parent.firstChild){nodes.push(_parent.removeChild(_parent.firstChild))
}tn.innerHTML="";
return nodes
}
})();
dojo.extend(dijit._Widget,{dojoAttachEvent:"",dojoAttachPoint:"",waiRole:"",waiState:""})
}if(!dojo._hasResource["dijit._Container"]){dojo._hasResource["dijit._Container"]=true;
dojo.provide("dijit._Container");
dojo.declare("dijit._Contained",null,{getParent:function(){for(var p=this.domNode.parentNode;
p;
p=p.parentNode){var id=p.getAttribute&&p.getAttribute("widgetId");
if(id){var parent=dijit.byId(id);
return parent.isContainer?parent:null
}}return null
},_getSibling:function(which){var node=this.domNode;
do{node=node[which+"Sibling"]
}while(node&&node.nodeType!=1);
if(!node){return null
}var id=node.getAttribute("widgetId");
return dijit.byId(id)
},getPreviousSibling:function(){return this._getSibling("previous")
},getNextSibling:function(){return this._getSibling("next")
}});
dojo.declare("dijit._Container",null,{isContainer:true,addChild:function(widget,insertIndex){if(insertIndex===undefined){insertIndex="last"
}var refNode=this.containerNode||this.domNode;
if(insertIndex&&typeof insertIndex=="number"){var children=dojo.query("> [widgetid]",refNode);
if(children&&children.length>=insertIndex){refNode=children[insertIndex-1];
insertIndex="after"
}}dojo.place(widget.domNode,refNode,insertIndex);
if(this._started&&!widget._started){widget.startup()
}},removeChild:function(widget){var node=widget.domNode;
node.parentNode.removeChild(node)
},_nextElement:function(node){do{node=node.nextSibling
}while(node&&node.nodeType!=1);
return node
},_firstElement:function(node){node=node.firstChild;
if(node&&node.nodeType!=1){node=this._nextElement(node)
}return node
},getChildren:function(){return dojo.query("> [widgetId]",this.containerNode||this.domNode).map(dijit.byNode)
},hasChildren:function(){var cn=this.containerNode||this.domNode;
return !!this._firstElement(cn)
},_getSiblingOfChild:function(child,dir){var node=child.domNode;
var which=(dir>0?"nextSibling":"previousSibling");
do{node=node[which]
}while(node&&(node.nodeType!=1||!dijit.byNode(node)));
return node?dijit.byNode(node):null
}});
dojo.declare("dijit._KeyNavContainer",[dijit._Container],{_keyNavCodes:{},connectKeyNavHandlers:function(prevKeyCodes,nextKeyCodes){var keyCodes=this._keyNavCodes={};
var prev=dojo.hitch(this,this.focusPrev);
var next=dojo.hitch(this,this.focusNext);
dojo.forEach(prevKeyCodes,function(code){keyCodes[code]=prev
});
dojo.forEach(nextKeyCodes,function(code){keyCodes[code]=next
});
this.connect(this.domNode,"onkeypress","_onContainerKeypress");
if(dojo.isIE){this.connect(this.domNode,"onactivate","_onContainerFocus");
this.connect(this.domNode,"ondeactivate","_onContainerBlur")
}else{this.connect(this.domNode,"onfocus","_onContainerFocus");
this.connect(this.domNode,"onblur","_onContainerBlur")
}},startupKeyNavChildren:function(){dojo.forEach(this.getChildren(),dojo.hitch(this,"_setTabIndexMinusOne"))
},addChild:function(widget,insertIndex){dijit._KeyNavContainer.superclass.addChild.apply(this,arguments);
this._setTabIndexMinusOne(widget)
},focus:function(){this.focusFirstChild()
},focusFirstChild:function(){this.focusChild(this._getFirstFocusableChild())
},focusNext:function(){if(this.focusedChild&&this.focusedChild.hasNextFocalNode&&this.focusedChild.hasNextFocalNode()){this.focusedChild.focusNext();
return 
}var child=this._getNextFocusableChild(this.focusedChild,1);
if(child.getFocalNodes){this.focusChild(child,child.getFocalNodes()[0])
}else{this.focusChild(child)
}},focusPrev:function(){if(this.focusedChild&&this.focusedChild.hasPrevFocalNode&&this.focusedChild.hasPrevFocalNode()){this.focusedChild.focusPrev();
return 
}var child=this._getNextFocusableChild(this.focusedChild,-1);
if(child.getFocalNodes){var nodes=child.getFocalNodes();
this.focusChild(child,nodes[nodes.length-1])
}else{this.focusChild(child)
}},focusChild:function(widget,node){if(widget){if(this.focusedChild&&widget!==this.focusedChild){this._onChildBlur(this.focusedChild)
}this.focusedChild=widget;
if(node&&widget.focusFocalNode){widget.focusFocalNode(node)
}else{widget.focus()
}}},_setTabIndexMinusOne:function(widget){if(widget.getFocalNodes){dojo.forEach(widget.getFocalNodes(),function(node){node.setAttribute("tabIndex",-1)
})
}else{(widget.focusNode||widget.domNode).setAttribute("tabIndex",-1)
}},_onContainerFocus:function(evt){this.domNode.setAttribute("tabIndex",-1);
if(evt.target===this.domNode){this.focusFirstChild()
}else{var widget=dijit.getEnclosingWidget(evt.target);
if(widget&&widget.isFocusable()){this.focusedChild=widget
}}},_onContainerBlur:function(evt){if(this.tabIndex){this.domNode.setAttribute("tabIndex",this.tabIndex)
}},_onContainerKeypress:function(evt){if(evt.ctrlKey||evt.altKey){return 
}var func=this._keyNavCodes[evt.keyCode];
if(func){func();
dojo.stopEvent(evt)
}},_onChildBlur:function(widget){},_getFirstFocusableChild:function(){return this._getNextFocusableChild(null,1)
},_getNextFocusableChild:function(child,dir){if(child){child=this._getSiblingOfChild(child,dir)
}var children=this.getChildren();
for(var i=0;
i<children.length;
i++){if(!child){child=children[(dir>0)?0:(children.length-1)]
}if(child.isFocusable()){return child
}child=this._getSiblingOfChild(child,dir)
}}})
}if(!dojo._hasResource["dijit.layout._LayoutWidget"]){dojo._hasResource["dijit.layout._LayoutWidget"]=true;
dojo.provide("dijit.layout._LayoutWidget");
dojo.declare("dijit.layout._LayoutWidget",[dijit._Widget,dijit._Container,dijit._Contained],{isLayoutContainer:true,postCreate:function(){dojo.addClass(this.domNode,"dijitContainer")
},startup:function(){if(this._started){return 
}this._started=true;
if(this.getChildren){dojo.forEach(this.getChildren(),function(child){child.startup()
})
}if(!this.getParent||!this.getParent()){this.resize();
this.connect(window,"onresize",function(){this.resize()
})
}},resize:function(args){var node=this.domNode;
if(args){dojo.marginBox(node,args);
if(args.t){node.style.top=args.t+"px"
}if(args.l){node.style.left=args.l+"px"
}}var mb=dojo.mixin(dojo.marginBox(node),args||{});
this._contentBox=dijit.layout.marginBox2contentBox(node,mb);
this.layout()
},layout:function(){}});
dijit.layout.marginBox2contentBox=function(node,mb){var cs=dojo.getComputedStyle(node);
var me=dojo._getMarginExtents(node,cs);
var pb=dojo._getPadBorderExtents(node,cs);
return{l:dojo._toPixelValue(node,cs.paddingLeft),t:dojo._toPixelValue(node,cs.paddingTop),w:mb.w-(me.w+pb.w),h:mb.h-(me.h+pb.h)}
};
(function(){var capitalize=function(word){return word.substring(0,1).toUpperCase()+word.substring(1)
};
var size=function(widget,dim){widget.resize?widget.resize(dim):dojo.marginBox(widget.domNode,dim);
dojo.mixin(widget,dojo.marginBox(widget.domNode));
dojo.mixin(widget,dim)
};
dijit.layout.layoutChildren=function(container,dim,children){dim=dojo.mixin({},dim);
dojo.addClass(container,"dijitLayoutContainer");
children=dojo.filter(children,function(item){return item.layoutAlign!="client"
}).concat(dojo.filter(children,function(item){return item.layoutAlign=="client"
}));
dojo.forEach(children,function(child){var elm=child.domNode,pos=child.layoutAlign;
var elmStyle=elm.style;
elmStyle.left=dim.l+"px";
elmStyle.top=dim.t+"px";
elmStyle.bottom=elmStyle.right="auto";
dojo.addClass(elm,"dijitAlign"+capitalize(pos));
if(pos=="top"||pos=="bottom"){size(child,{w:dim.w});
dim.h-=child.h;
if(pos=="top"){dim.t+=child.h
}else{elmStyle.top=dim.t+dim.h+"px"
}}else{if(pos=="left"||pos=="right"){size(child,{h:dim.h});
dim.w-=child.w;
if(pos=="left"){dim.l+=child.w
}else{elmStyle.left=dim.l+dim.w+"px"
}}else{if(pos=="client"){size(child,dim)
}}}})
}
})()
}if(!dojo._hasResource["dijit.form._FormWidget"]){dojo._hasResource["dijit.form._FormWidget"]=true;
dojo.provide("dijit.form._FormWidget");
dojo.declare("dijit.form._FormWidget",[dijit._Widget,dijit._Templated],{baseClass:"",value:"",name:"",id:"",alt:"",type:"text",tabIndex:"0",disabled:false,intermediateChanges:false,attributeMap:dojo.mixin(dojo.clone(dijit._Widget.prototype.attributeMap),{id:"focusNode",tabIndex:"focusNode",alt:"focusNode"}),setDisabled:function(disabled){this.domNode.disabled=this.disabled=disabled;
if(this.focusNode){this.focusNode.disabled=disabled
}if(disabled){this._hovering=false;
this._active=false
}dijit.setWaiState(this.focusNode||this.domNode,"disabled",disabled);
this._setStateClass()
},_onMouse:function(event){var mouseNode=event.target;
if(mouseNode&&mouseNode.getAttribute){this.stateModifier=mouseNode.getAttribute("stateModifier")||""
}if(!this.disabled){switch(event.type){case"mouseenter":case"mouseover":this._hovering=true;
break;
case"mouseout":case"mouseleave":this._hovering=false;
break;
case"mousedown":this._active=true;
var self=this;
var mouseUpConnector=this.connect(dojo.body(),"onmouseup",function(){self._active=false;
self._setStateClass();
self.disconnect(mouseUpConnector)
});
break
}this._setStateClass()
}},isFocusable:function(){return !this.disabled&&(dojo.style(this.domNode,"display")!="none")
},focus:function(){dijit.focus(this.focusNode)
},_setStateClass:function(){if(!("staticClass" in this)){this.staticClass=(this.stateNode||this.domNode).className
}var classes=[this.baseClass];
function multiply(modifier){classes=classes.concat(dojo.map(classes,function(c){return c+modifier
}))
}if(this.checked){multiply("Checked")
}if(this.state){multiply(this.state)
}if(this.selected){multiply("Selected")
}if(this.disabled){multiply("Disabled")
}else{if(this._active){multiply(this.stateModifier+"Active")
}else{if(this._focused){multiply("Focused")
}if((this.stateModifier||!this._focused)&&this._hovering){multiply(this.stateModifier+"Hover")
}}}(this.stateNode||this.domNode).className=this.staticClass+" "+classes.join(" ")
},onChange:function(newValue){},postCreate:function(){this.setValue(this.value,null);
this.setDisabled(this.disabled);
this._setStateClass()
},setValue:function(newValue,priorityChange){this._lastValue=newValue;
dijit.setWaiState(this.focusNode||this.domNode,"valuenow",this.forWaiValuenow());
if(priorityChange===undefined){priorityChange=true
}if(this._lastValueReported==undefined&&priorityChange===null){this._lastValueReported=newValue
}if((this.intermediateChanges||priorityChange)&&((newValue&&newValue.toString)?newValue.toString():newValue)!==((this._lastValueReported&&this._lastValueReported.toString)?this._lastValueReported.toString():this._lastValueReported)){this._lastValueReported=newValue;
this.onChange(newValue)
}},getValue:function(){return this._lastValue
},undo:function(){this.setValue(this._lastValueReported,false)
},_onKeyPress:function(e){if(e.keyCode==dojo.keys.ESCAPE&&!e.shiftKey&&!e.ctrlKey&&!e.altKey){var v=this.getValue();
var lv=this._lastValueReported;
if((typeof lv!="undefined")&&((v!==null&&v.toString)?v.toString():null)!==lv.toString()){this.undo();
dojo.stopEvent(e);
return false
}}return true
},forWaiValuenow:function(){return this.getValue()
}})
}if(!dojo._hasResource["dijit.dijit"]){dojo._hasResource["dijit.dijit"]=true;
dojo.provide("dijit.dijit")
}if(!dojo._hasResource["dojo.i18n"]){dojo._hasResource["dojo.i18n"]=true;
dojo.provide("dojo.i18n");
dojo.i18n.getLocalization=function(packageName,bundleName,locale){locale=dojo.i18n.normalizeLocale(locale);
var elements=locale.split("-");
var module=[packageName,"nls",bundleName].join(".");
var bundle=dojo._loadedModules[module];
if(bundle){var localization;
for(var i=elements.length;
i>0;
i--){var loc=elements.slice(0,i).join("_");
if(bundle[loc]){localization=bundle[loc];
break
}}if(!localization){localization=bundle.ROOT
}if(localization){var clazz=function(){};
clazz.prototype=localization;
return new clazz()
}}throw new Error("Bundle not found: "+bundleName+" in "+packageName+" , locale="+locale)
};
dojo.i18n.normalizeLocale=function(locale){var result=locale?locale.toLowerCase():dojo.locale;
if(result=="root"){result="ROOT"
}return result
};
dojo.i18n._requireLocalization=function(moduleName,bundleName,locale,availableFlatLocales){var targetLocale=dojo.i18n.normalizeLocale(locale);
var bundlePackage=[moduleName,"nls",bundleName].join(".");
var bestLocale="";
if(availableFlatLocales){var flatLocales=availableFlatLocales.split(",");
for(var i=0;
i<flatLocales.length;
i++){if(targetLocale.indexOf(flatLocales[i])==0){if(flatLocales[i].length>bestLocale.length){bestLocale=flatLocales[i]
}}}if(!bestLocale){bestLocale="ROOT"
}}var tempLocale=availableFlatLocales?bestLocale:targetLocale;
var bundle=dojo._loadedModules[bundlePackage];
var localizedBundle=null;
if(bundle){if(djConfig.localizationComplete&&bundle._built){return 
}var jsLoc=tempLocale.replace(/-/g,"_");
var translationPackage=bundlePackage+"."+jsLoc;
localizedBundle=dojo._loadedModules[translationPackage]
}if(!localizedBundle){bundle=dojo.provide(bundlePackage);
var syms=dojo._getModuleSymbols(moduleName);
var modpath=syms.concat("nls").join("/");
var parent;
dojo.i18n._searchLocalePath(tempLocale,availableFlatLocales,function(loc){var jsLoc=loc.replace(/-/g,"_");
var translationPackage=bundlePackage+"."+jsLoc;
var loaded=false;
if(!dojo._loadedModules[translationPackage]){dojo.provide(translationPackage);
var module=[modpath];
if(loc!="ROOT"){module.push(loc)
}module.push(bundleName);
var filespec=module.join("/")+".js";
loaded=dojo._loadPath(filespec,null,function(hash){var clazz=function(){};
clazz.prototype=parent;
bundle[jsLoc]=new clazz();
for(var j in hash){bundle[jsLoc][j]=hash[j]
}})
}else{loaded=true
}if(loaded&&bundle[jsLoc]){parent=bundle[jsLoc]
}else{bundle[jsLoc]=parent
}if(availableFlatLocales){return true
}})
}if(availableFlatLocales&&targetLocale!=bestLocale){bundle[targetLocale.replace(/-/g,"_")]=bundle[bestLocale.replace(/-/g,"_")]
}};
(function(){var extra=djConfig.extraLocale;
if(extra){if(!extra instanceof Array){extra=[extra]
}var req=dojo.i18n._requireLocalization;
dojo.i18n._requireLocalization=function(m,b,locale,availableFlatLocales){req(m,b,locale,availableFlatLocales);
if(locale){return 
}for(var i=0;
i<extra.length;
i++){req(m,b,extra[i],availableFlatLocales)
}}
}})();
dojo.i18n._searchLocalePath=function(locale,down,searchFunc){locale=dojo.i18n.normalizeLocale(locale);
var elements=locale.split("-");
var searchlist=[];
for(var i=elements.length;
i>0;
i--){searchlist.push(elements.slice(0,i).join("-"))
}searchlist.push(false);
if(down){searchlist.reverse()
}for(var j=searchlist.length-1;
j>=0;
j--){var loc=searchlist[j]||"ROOT";
var stop=searchFunc(loc);
if(stop){break
}}};
dojo.i18n._preloadLocalizations=function(bundlePrefix,localesGenerated){function preload(locale){locale=dojo.i18n.normalizeLocale(locale);
dojo.i18n._searchLocalePath(locale,true,function(loc){for(var i=0;
i<localesGenerated.length;
i++){if(localesGenerated[i]==loc){dojo.require(bundlePrefix+"_"+loc);
return true
}}return false
})
}preload();
var extra=djConfig.extraLocale||[];
for(var i=0;
i<extra.length;
i++){preload(extra[i])
}}
}if(!dojo._hasResource["dojo.cldr.supplemental"]){dojo._hasResource["dojo.cldr.supplemental"]=true;
dojo.provide("dojo.cldr.supplemental");
dojo.cldr.supplemental.getFirstDayOfWeek=function(locale){var firstDay={mv:5,ae:6,af:6,bh:6,dj:6,dz:6,eg:6,er:6,et:6,iq:6,ir:6,jo:6,ke:6,kw:6,lb:6,ly:6,ma:6,om:6,qa:6,sa:6,sd:6,so:6,tn:6,ye:6,as:0,au:0,az:0,bw:0,ca:0,cn:0,fo:0,ge:0,gl:0,gu:0,hk:0,ie:0,il:0,is:0,jm:0,jp:0,kg:0,kr:0,la:0,mh:0,mo:0,mp:0,mt:0,nz:0,ph:0,pk:0,sg:0,th:0,tt:0,tw:0,um:0,us:0,uz:0,vi:0,za:0,zw:0,et:0,mw:0,ng:0,tj:0,gb:0,sy:4};
var country=dojo.cldr.supplemental._region(locale);
var dow=firstDay[country];
return(typeof dow=="undefined")?1:dow
};
dojo.cldr.supplemental._region=function(locale){locale=dojo.i18n.normalizeLocale(locale);
var tags=locale.split("-");
var region=tags[1];
if(!region){region={de:"de",en:"us",es:"es",fi:"fi",fr:"fr",hu:"hu",it:"it",ja:"jp",ko:"kr",nl:"nl",pt:"br",sv:"se",zh:"cn"}[tags[0]]
}else{if(region.length==4){region=tags[2]
}}return region
};
dojo.cldr.supplemental.getWeekend=function(locale){var weekendStart={eg:5,il:5,sy:5,"in":0,ae:4,bh:4,dz:4,iq:4,jo:4,kw:4,lb:4,ly:4,ma:4,om:4,qa:4,sa:4,sd:4,tn:4,ye:4};
var weekendEnd={ae:5,bh:5,dz:5,iq:5,jo:5,kw:5,lb:5,ly:5,ma:5,om:5,qa:5,sa:5,sd:5,tn:5,ye:5,af:5,ir:5,eg:6,il:6,sy:6};
var country=dojo.cldr.supplemental._region(locale);
var start=weekendStart[country];
var end=weekendEnd[country];
if(typeof start=="undefined"){start=6
}if(typeof end=="undefined"){end=0
}return{start:start,end:end}
}
}if(!dojo._hasResource["dojo.date"]){dojo._hasResource["dojo.date"]=true;
dojo.provide("dojo.date");
dojo.date.getDaysInMonth=function(dateObject){var month=dateObject.getMonth();
var days=[31,28,31,30,31,30,31,31,30,31,30,31];
if(month==1&&dojo.date.isLeapYear(dateObject)){return 29
}return days[month]
};
dojo.date.isLeapYear=function(dateObject){var year=dateObject.getFullYear();
return !(year%400)||(!(year%4)&&!!(year%100))
};
dojo.date.getTimezoneName=function(dateObject){var str=dateObject.toString();
var tz="";
var match;
var pos=str.indexOf("(");
if(pos>-1){tz=str.substring(++pos,str.indexOf(")"))
}else{var pat=/([A-Z\/]+) \d{4}$/;
if((match=str.match(pat))){tz=match[1]
}else{str=dateObject.toLocaleString();
pat=/ ([A-Z\/]+)$/;
if((match=str.match(pat))){tz=match[1]
}}}return(tz=="AM"||tz=="PM")?"":tz
};
dojo.date.compare=function(date1,date2,portion){date1=new Date(Number(date1));
date2=new Date(Number(date2||new Date()));
if(typeof portion!=="undefined"){if(portion=="date"){date1.setHours(0,0,0,0);
date2.setHours(0,0,0,0)
}else{if(portion=="time"){date1.setFullYear(0,0,0);
date2.setFullYear(0,0,0)
}}}if(date1>date2){return 1
}if(date1<date2){return -1
}return 0
};
dojo.date.add=function(date,interval,amount){var sum=new Date(Number(date));
var fixOvershoot=false;
var property="Date";
switch(interval){case"day":break;
case"weekday":var days,weeks;
var adj=0;
var mod=amount%5;
if(!mod){days=(amount>0)?5:-5;
weeks=(amount>0)?((amount-5)/5):((amount+5)/5)
}else{days=mod;
weeks=parseInt(amount/5)
}var strt=date.getDay();
if(strt==6&&amount>0){adj=1
}else{if(strt==0&&amount<0){adj=-1
}}var trgt=strt+days;
if(trgt==0||trgt==6){adj=(amount>0)?2:-2
}amount=7*weeks+days+adj;
break;
case"year":property="FullYear";
fixOvershoot=true;
break;
case"week":amount*=7;
break;
case"quarter":amount*=3;
case"month":fixOvershoot=true;
property="Month";
break;
case"hour":case"minute":case"second":case"millisecond":property=interval.charAt(0).toUpperCase()+interval.substring(1)+"s"
}if(property){sum["setUTC"+property](sum["getUTC"+property]()+amount)
}if(fixOvershoot&&(sum.getDate()<date.getDate())){sum.setDate(0)
}return sum
};
dojo.date.difference=function(date1,date2,interval){date2=date2||new Date();
interval=interval||"day";
var yearDiff=date2.getFullYear()-date1.getFullYear();
var delta=1;
switch(interval){case"quarter":var m1=date1.getMonth();
var m2=date2.getMonth();
var q1=Math.floor(m1/3)+1;
var q2=Math.floor(m2/3)+1;
q2+=(yearDiff*4);
delta=q2-q1;
break;
case"weekday":var days=Math.round(dojo.date.difference(date1,date2,"day"));
var weeks=parseInt(dojo.date.difference(date1,date2,"week"));
var mod=days%7;
if(mod==0){days=weeks*5
}else{var adj=0;
var aDay=date1.getDay();
var bDay=date2.getDay();
weeks=parseInt(days/7);
mod=days%7;
var dtMark=new Date(date1);
dtMark.setDate(dtMark.getDate()+(weeks*7));
var dayMark=dtMark.getDay();
if(days>0){switch(true){case aDay==6:adj=-1;
break;
case aDay==0:adj=0;
break;
case bDay==6:adj=-1;
break;
case bDay==0:adj=-2;
break;
case (dayMark+mod)>5:adj=-2
}}else{if(days<0){switch(true){case aDay==6:adj=0;
break;
case aDay==0:adj=1;
break;
case bDay==6:adj=2;
break;
case bDay==0:adj=1;
break;
case (dayMark+mod)<0:adj=2
}}}days+=adj;
days-=(weeks*2)
}delta=days;
break;
case"year":delta=yearDiff;
break;
case"month":delta=(date2.getMonth()-date1.getMonth())+(yearDiff*12);
break;
case"week":delta=parseInt(dojo.date.difference(date1,date2,"day")/7);
break;
case"day":delta/=24;
case"hour":delta/=60;
case"minute":delta/=60;
case"second":delta/=1000;
case"millisecond":delta*=date2.getTime()-date1.getTime()
}return Math.round(delta)
}
}if(!dojo._hasResource["dojo.regexp"]){dojo._hasResource["dojo.regexp"]=true;
dojo.provide("dojo.regexp");
dojo.regexp.escapeString=function(str,except){return str.replace(/([\.$?*!=:|{}\(\)\[\]\\\/^])/g,function(ch){if(except&&except.indexOf(ch)!=-1){return ch
}return"\\"+ch
})
};
dojo.regexp.buildGroupRE=function(arr,re,nonCapture){if(!(arr instanceof Array)){return re(arr)
}var b=[];
for(var i=0;
i<arr.length;
i++){b.push(re(arr[i]))
}return dojo.regexp.group(b.join("|"),nonCapture)
};
dojo.regexp.group=function(expression,nonCapture){return"("+(nonCapture?"?:":"")+expression+")"
}
}if(!dojo._hasResource["dojo.date.locale"]){dojo._hasResource["dojo.date.locale"]=true;
dojo.provide("dojo.date.locale");
(function(){function formatPattern(dateObject,bundle,pattern){return pattern.replace(/([a-z])\1*/ig,function(match){var s;
var c=match.charAt(0);
var l=match.length;
var pad;
var widthList=["abbr","wide","narrow"];
switch(c){case"G":s=bundle[(l<4)?"eraAbbr":"eraNames"][dateObject.getFullYear()<0?0:1];
break;
case"y":s=dateObject.getFullYear();
switch(l){case 1:break;
case 2:s=String(s);
s=s.substr(s.length-2);
break;
default:pad=true
}break;
case"Q":case"q":s=Math.ceil((dateObject.getMonth()+1)/3);
pad=true;
break;
case"M":case"L":var m=dateObject.getMonth();
var width;
switch(l){case 1:case 2:s=m+1;
pad=true;
break;
case 3:case 4:case 5:width=widthList[l-3];
break
}if(width){var type=(c=="L")?"standalone":"format";
var prop=["months",type,width].join("-");
s=bundle[prop][m]
}break;
case"w":var firstDay=0;
s=dojo.date.locale._getWeekOfYear(dateObject,firstDay);
pad=true;
break;
case"d":s=dateObject.getDate();
pad=true;
break;
case"D":s=dojo.date.locale._getDayOfYear(dateObject);
pad=true;
break;
case"E":case"e":case"c":var d=dateObject.getDay();
var width;
switch(l){case 1:case 2:if(c=="e"){var first=dojo.cldr.supplemental.getFirstDayOfWeek(options.locale);
d=(d-first+7)%7
}if(c!="c"){s=d+1;
pad=true;
break
}case 3:case 4:case 5:width=widthList[l-3];
break
}if(width){var type=(c=="c")?"standalone":"format";
var prop=["days",type,width].join("-");
s=bundle[prop][d]
}break;
case"a":var timePeriod=(dateObject.getHours()<12)?"am":"pm";
s=bundle[timePeriod];
break;
case"h":case"H":case"K":case"k":var h=dateObject.getHours();
switch(c){case"h":s=(h%12)||12;
break;
case"H":s=h;
break;
case"K":s=(h%12);
break;
case"k":s=h||24;
break
}pad=true;
break;
case"m":s=dateObject.getMinutes();
pad=true;
break;
case"s":s=dateObject.getSeconds();
pad=true;
break;
case"S":s=Math.round(dateObject.getMilliseconds()*Math.pow(10,l-3));
break;
case"v":case"z":s=dojo.date.getTimezoneName(dateObject);
if(s){break
}l=4;
case"Z":var offset=dateObject.getTimezoneOffset();
var tz=[(offset<=0?"+":"-"),dojo.string.pad(Math.floor(Math.abs(offset)/60),2),dojo.string.pad(Math.abs(offset)%60,2)];
if(l==4){tz.splice(0,0,"GMT");
tz.splice(3,0,":")
}s=tz.join("");
break;
default:throw new Error("dojo.date.locale.format: invalid pattern char: "+pattern)
}if(pad){s=dojo.string.pad(s,l)
}return s
})
}dojo.date.locale.format=function(dateObject,options){options=options||{};
var locale=dojo.i18n.normalizeLocale(options.locale);
var formatLength=options.formatLength||"short";
var bundle=dojo.date.locale._getGregorianBundle(locale);
var str=[];
var sauce=dojo.hitch(this,formatPattern,dateObject,bundle);
if(options.selector=="year"){var year=dateObject.getFullYear();
if(locale.match(/^zh|^ja/)){year+="\u5E74"
}return year
}if(options.selector!="time"){var datePattern=options.datePattern||bundle["dateFormat-"+formatLength];
if(datePattern){str.push(_processPattern(datePattern,sauce))
}}if(options.selector!="date"){var timePattern=options.timePattern||bundle["timeFormat-"+formatLength];
if(timePattern){str.push(_processPattern(timePattern,sauce))
}}var result=str.join(" ");
return result
};
dojo.date.locale.regexp=function(options){return dojo.date.locale._parseInfo(options).regexp
};
dojo.date.locale._parseInfo=function(options){options=options||{};
var locale=dojo.i18n.normalizeLocale(options.locale);
var bundle=dojo.date.locale._getGregorianBundle(locale);
var formatLength=options.formatLength||"short";
var datePattern=options.datePattern||bundle["dateFormat-"+formatLength];
var timePattern=options.timePattern||bundle["timeFormat-"+formatLength];
var pattern;
if(options.selector=="date"){pattern=datePattern
}else{if(options.selector=="time"){pattern=timePattern
}else{pattern=datePattern+" "+timePattern
}}var tokens=[];
var re=_processPattern(pattern,dojo.hitch(this,_buildDateTimeRE,tokens,bundle,options));
return{regexp:re,tokens:tokens,bundle:bundle}
};
dojo.date.locale.parse=function(value,options){var info=dojo.date.locale._parseInfo(options);
var tokens=info.tokens,bundle=info.bundle;
var re=new RegExp("^"+info.regexp+"$");
var match=re.exec(value);
if(!match){return null
}var widthList=["abbr","wide","narrow"];
var result=new Date(1972,0);
var expected={};
var amPm="";
dojo.forEach(match,function(v,i){if(!i){return 
}var token=tokens[i-1];
var l=token.length;
switch(token.charAt(0)){case"y":if(l!=2){result.setFullYear(v);
expected.year=v
}else{if(v<100){v=Number(v);
var year=""+new Date().getFullYear();
var century=year.substring(0,2)*100;
var yearPart=Number(year.substring(2,4));
var cutoff=Math.min(yearPart+20,99);
var num=(v<cutoff)?century+v:century-100+v;
result.setFullYear(num);
expected.year=num
}else{if(options.strict){return null
}result.setFullYear(v);
expected.year=v
}}break;
case"M":if(l>2){var months=bundle["months-format-"+widthList[l-3]].concat();
if(!options.strict){v=v.replace(".","").toLowerCase();
months=dojo.map(months,function(s){return s.replace(".","").toLowerCase()
})
}v=dojo.indexOf(months,v);
if(v==-1){return null
}}else{v--
}result.setMonth(v);
expected.month=v;
break;
case"E":case"e":var days=bundle["days-format-"+widthList[l-3]].concat();
if(!options.strict){v=v.toLowerCase();
days=dojo.map(days,"".toLowerCase)
}v=dojo.indexOf(days,v);
if(v==-1){return null
}break;
case"d":result.setDate(v);
expected.date=v;
break;
case"D":result.setMonth(0);
result.setDate(v);
break;
case"a":var am=options.am||bundle.am;
var pm=options.pm||bundle.pm;
if(!options.strict){var period=/\./g;
v=v.replace(period,"").toLowerCase();
am=am.replace(period,"").toLowerCase();
pm=pm.replace(period,"").toLowerCase()
}if(options.strict&&v!=am&&v!=pm){return null
}amPm=(v==pm)?"p":(v==am)?"a":"";
break;
case"K":if(v==24){v=0
}case"h":case"H":case"k":if(v>23){return null
}result.setHours(v);
break;
case"m":result.setMinutes(v);
break;
case"s":result.setSeconds(v);
break;
case"S":result.setMilliseconds(v)
}});
var hours=result.getHours();
if(amPm==="p"&&hours<12){result.setHours(hours+12)
}else{if(amPm==="a"&&hours==12){result.setHours(0)
}}if(expected.year&&result.getFullYear()!=expected.year){return null
}if(expected.month&&result.getMonth()!=expected.month){return null
}if(expected.date&&result.getDate()!=expected.date){return null
}return result
};
function _processPattern(pattern,applyPattern,applyLiteral,applyAll){var identity=function(x){return x
};
applyPattern=applyPattern||identity;
applyLiteral=applyLiteral||identity;
applyAll=applyAll||identity;
var chunks=pattern.match(/(''|[^'])+/g);
var literal=false;
dojo.forEach(chunks,function(chunk,i){if(!chunk){chunks[i]=""
}else{chunks[i]=(literal?applyLiteral:applyPattern)(chunk);
literal=!literal
}});
return applyAll(chunks.join(""))
}function _buildDateTimeRE(tokens,bundle,options,pattern){pattern=dojo.regexp.escapeString(pattern);
if(!options.strict){pattern=pattern.replace(" a"," ?a")
}return pattern.replace(/([a-z])\1*/ig,function(match){var s;
var c=match.charAt(0);
var l=match.length;
var p2="",p3="";
if(options.strict){if(l>1){p2="0{"+(l-1)+"}"
}if(l>2){p3="0{"+(l-2)+"}"
}}else{p2="0?";
p3="0{0,2}"
}switch(c){case"y":s="\\d{2,4}";
break;
case"M":s=(l>2)?"\\S+":p2+"[1-9]|1[0-2]";
break;
case"D":s=p2+"[1-9]|"+p3+"[1-9][0-9]|[12][0-9][0-9]|3[0-5][0-9]|36[0-6]";
break;
case"d":s=p2+"[1-9]|[12]\\d|3[01]";
break;
case"w":s=p2+"[1-9]|[1-4][0-9]|5[0-3]";
break;
case"E":s="\\S+";
break;
case"h":s=p2+"[1-9]|1[0-2]";
break;
case"k":s=p2+"\\d|1[01]";
break;
case"H":s=p2+"\\d|1\\d|2[0-3]";
break;
case"K":s=p2+"[1-9]|1\\d|2[0-4]";
break;
case"m":case"s":s="[0-5]\\d";
break;
case"S":s="\\d{"+l+"}";
break;
case"a":var am=options.am||bundle.am||"AM";
var pm=options.pm||bundle.pm||"PM";
if(options.strict){s=am+"|"+pm
}else{s=am+"|"+pm;
if(am!=am.toLowerCase()){s+="|"+am.toLowerCase()
}if(pm!=pm.toLowerCase()){s+="|"+pm.toLowerCase()
}}break;
default:s=".*"
}if(tokens){tokens.push(match)
}return"("+s+")"
}).replace(/[\xa0 ]/g,"[\\s\\xa0]")
}})();
(function(){var _customFormats=[];
dojo.date.locale.addCustomFormats=function(packageName,bundleName){_customFormats.push({pkg:packageName,name:bundleName})
};
dojo.date.locale._getGregorianBundle=function(locale){var gregorian={};
dojo.forEach(_customFormats,function(desc){var bundle=dojo.i18n.getLocalization(desc.pkg,desc.name,locale);
gregorian=dojo.mixin(gregorian,bundle)
},this);
return gregorian
}
})();
dojo.date.locale.addCustomFormats("dojo.cldr","gregorian");
dojo.date.locale.getNames=function(item,type,use,locale){var label;
var lookup=dojo.date.locale._getGregorianBundle(locale);
var props=[item,use,type];
if(use=="standAlone"){label=lookup[props.join("-")]
}props[1]="format";
return(label||lookup[props.join("-")]).concat()
};
dojo.date.locale.isWeekend=function(dateObject,locale){var weekend=dojo.cldr.supplemental.getWeekend(locale);
var day=(dateObject||new Date()).getDay();
if(weekend.end<weekend.start){weekend.end+=7;
if(day<weekend.start){day+=7
}}return day>=weekend.start&&day<=weekend.end
};
dojo.date.locale._getDayOfYear=function(dateObject){return dojo.date.difference(new Date(dateObject.getFullYear(),0,1),dateObject)+1
};
dojo.date.locale._getWeekOfYear=function(dateObject,firstDayOfWeek){if(arguments.length==1){firstDayOfWeek=0
}var firstDayOfYear=new Date(dateObject.getFullYear(),0,1).getDay();
var adj=(firstDayOfYear-firstDayOfWeek+7)%7;
var week=Math.floor((dojo.date.locale._getDayOfYear(dateObject)+adj-1)/7);
if(firstDayOfYear==firstDayOfWeek){week++
}return week
}
}if(!dojo._hasResource["dijit._Calendar"]){dojo._hasResource["dijit._Calendar"]=true;
dojo.provide("dijit._Calendar");
dojo.declare("dijit._Calendar",[dijit._Widget,dijit._Templated],{templateString:'<table cellspacing="0" cellpadding="0" class="dijitCalendarContainer">\r\n\t<thead>\r\n\t\t<tr class="dijitReset dijitCalendarMonthContainer" valign="top">\r\n\t\t\t<th class=\'dijitReset\' dojoAttachPoint="decrementMonth">\r\n\t\t\t\t<span class="dijitInline dijitCalendarIncrementControl dijitCalendarDecrease"><span dojoAttachPoint="decreaseArrowNode" class="dijitA11ySideArrow dijitCalendarIncrementControl dijitCalendarDecreaseInner">-</span></span>\r\n\t\t\t</th>\r\n\t\t\t<th class=\'dijitReset\' colspan="5">\r\n\t\t\t\t<div dojoAttachPoint="monthLabelSpacer" class="dijitCalendarMonthLabelSpacer"></div>\r\n\t\t\t\t<div dojoAttachPoint="monthLabelNode" class="dijitCalendarMonth"></div>\r\n\t\t\t</th>\r\n\t\t\t<th class=\'dijitReset\' dojoAttachPoint="incrementMonth">\r\n\t\t\t\t<div class="dijitInline dijitCalendarIncrementControl dijitCalendarIncrease"><span dojoAttachPoint="increaseArrowNode" class="dijitA11ySideArrow dijitCalendarIncrementControl dijitCalendarIncreaseInner">+</span></div>\r\n\t\t\t</th>\r\n\t\t</tr>\r\n\t\t<tr>\r\n\t\t\t<th class="dijitReset dijitCalendarDayLabelTemplate"><span class="dijitCalendarDayLabel"></span></th>\r\n\t\t</tr>\r\n\t</thead>\r\n\t<tbody dojoAttachEvent="onclick: _onDayClick" class="dijitReset dijitCalendarBodyContainer">\r\n\t\t<tr class="dijitReset dijitCalendarWeekTemplate">\r\n\t\t\t<td class="dijitReset dijitCalendarDateTemplate"><span class="dijitCalendarDateLabel"></span></td>\r\n\t\t</tr>\r\n\t</tbody>\r\n\t<tfoot class="dijitReset dijitCalendarYearContainer">\r\n\t\t<tr>\r\n\t\t\t<td class=\'dijitReset\' valign="top" colspan="7">\r\n\t\t\t\t<h3 class="dijitCalendarYearLabel">\r\n\t\t\t\t\t<span dojoAttachPoint="previousYearLabelNode" class="dijitInline dijitCalendarPreviousYear"></span>\r\n\t\t\t\t\t<span dojoAttachPoint="currentYearLabelNode" class="dijitInline dijitCalendarSelectedYear"></span>\r\n\t\t\t\t\t<span dojoAttachPoint="nextYearLabelNode" class="dijitInline dijitCalendarNextYear"></span>\r\n\t\t\t\t</h3>\r\n\t\t\t</td>\r\n\t\t</tr>\r\n\t</tfoot>\r\n</table>\t\r\n',value:new Date(),dayWidth:"narrow",setValue:function(value){if(!this.value||dojo.date.compare(value,this.value)){value=new Date(value);
this.displayMonth=new Date(value);
if(!this.isDisabledDate(value,this.lang)){this.value=value;
this.value.setHours(0,0,0,0);
this.onChange(this.value)
}this._populateGrid()
}},_setText:function(node,text){while(node.firstChild){node.removeChild(node.firstChild)
}node.appendChild(document.createTextNode(text))
},_populateGrid:function(){var month=this.displayMonth;
month.setDate(1);
var firstDay=month.getDay();
var daysInMonth=dojo.date.getDaysInMonth(month);
var daysInPreviousMonth=dojo.date.getDaysInMonth(dojo.date.add(month,"month",-1));
var today=new Date();
var selected=this.value;
var dayOffset=dojo.cldr.supplemental.getFirstDayOfWeek(this.lang);
if(dayOffset>firstDay){dayOffset-=7
}dojo.query(".dijitCalendarDateTemplate",this.domNode).forEach(function(template,i){i+=dayOffset;
var date=new Date(month);
var number,clazz="dijitCalendar",adj=0;
if(i<firstDay){number=daysInPreviousMonth-firstDay+i+1;
adj=-1;
clazz+="Previous"
}else{if(i>=(firstDay+daysInMonth)){number=i-firstDay-daysInMonth+1;
adj=1;
clazz+="Next"
}else{number=i-firstDay+1;
clazz+="Current"
}}if(adj){date=dojo.date.add(date,"month",adj)
}date.setDate(number);
if(!dojo.date.compare(date,today,"date")){clazz="dijitCalendarCurrentDate "+clazz
}if(!dojo.date.compare(date,selected,"date")){clazz="dijitCalendarSelectedDate "+clazz
}if(this.isDisabledDate(date,this.lang)){clazz="dijitCalendarDisabledDate "+clazz
}template.className=clazz+"Month dijitCalendarDateTemplate";
template.dijitDateValue=date.valueOf();
var label=dojo.query(".dijitCalendarDateLabel",template)[0];
this._setText(label,date.getDate())
},this);
var monthNames=dojo.date.locale.getNames("months","wide","standAlone",this.lang);
this._setText(this.monthLabelNode,monthNames[month.getMonth()]);
var y=month.getFullYear()-1;
dojo.forEach(["previous","current","next"],function(name){this._setText(this[name+"YearLabelNode"],dojo.date.locale.format(new Date(y++,0),{selector:"year",locale:this.lang}))
},this);
var _this=this;
var typematic=function(nodeProp,dateProp,adj){dijit.typematic.addMouseListener(_this[nodeProp],_this,function(count){if(count>=0){_this._adjustDisplay(dateProp,adj)
}},0.8,500)
};
typematic("incrementMonth","month",1);
typematic("decrementMonth","month",-1);
typematic("nextYearLabelNode","year",1);
typematic("previousYearLabelNode","year",-1)
},postCreate:function(){dijit._Calendar.superclass.postCreate.apply(this);
var cloneClass=dojo.hitch(this,function(clazz,n){var template=dojo.query(clazz,this.domNode)[0];
for(var i=0;
i<n;
i++){template.parentNode.appendChild(template.cloneNode(true))
}});
cloneClass(".dijitCalendarDayLabelTemplate",6);
cloneClass(".dijitCalendarDateTemplate",6);
cloneClass(".dijitCalendarWeekTemplate",5);
var dayNames=dojo.date.locale.getNames("days",this.dayWidth,"standAlone",this.lang);
var dayOffset=dojo.cldr.supplemental.getFirstDayOfWeek(this.lang);
dojo.query(".dijitCalendarDayLabel",this.domNode).forEach(function(label,i){this._setText(label,dayNames[(i+dayOffset)%7])
},this);
var monthNames=dojo.date.locale.getNames("months","wide","standAlone",this.lang);
dojo.forEach(monthNames,function(name){var monthSpacer=dojo.doc.createElement("div");
this._setText(monthSpacer,name);
this.monthLabelSpacer.appendChild(monthSpacer)
},this);
this.value=null;
this.setValue(new Date())
},_adjustDisplay:function(part,amount){this.displayMonth=dojo.date.add(this.displayMonth,part,amount);
this._populateGrid()
},_onDayClick:function(evt){var node=evt.target;
dojo.stopEvent(evt);
while(!node.dijitDateValue){node=node.parentNode
}if(!dojo.hasClass(node,"dijitCalendarDisabledDate")){this.setValue(node.dijitDateValue);
this.onValueSelected(this.value)
}},onValueSelected:function(date){},onChange:function(date){},isDisabledDate:function(dateObject,locale){return false
}})
}if(!dojo._hasResource["dijit.layout.ContentPane"]){dojo._hasResource["dijit.layout.ContentPane"]=true;
dojo.provide("dijit.layout.ContentPane");
dojo.declare("dijit.layout.ContentPane",dijit._Widget,{href:"",extractContent:false,parseOnLoad:true,preventCache:false,preload:false,refreshOnShow:false,loadingMessage:"<span class='dijitContentPaneLoading'>${loadingState}</span>",errorMessage:"<span class='dijitContentPaneError'>${errorState}</span>",isLoaded:false,"class":"dijitContentPane",postCreate:function(){this.domNode.title="";
if(this.preload){this._loadCheck()
}var messages=dojo.i18n.getLocalization("dijit","loading",this.lang);
this.loadingMessage=dojo.string.substitute(this.loadingMessage,messages);
this.errorMessage=dojo.string.substitute(this.errorMessage,messages);
dojo.addClass(this.domNode,this["class"])
},startup:function(){if(this._started){return 
}this._checkIfSingleChild();
if(this._singleChild){this._singleChild.startup()
}this._loadCheck();
this._started=true
},_checkIfSingleChild:function(){var childNodes=dojo.query(">",this.containerNode||this.domNode),childWidgets=childNodes.filter("[widgetId]");
if(childNodes.length==1&&childWidgets.length==1){this.isContainer=true;
this._singleChild=dijit.byNode(childWidgets[0])
}else{delete this.isContainer;
delete this._singleChild
}},refresh:function(){return this._prepareLoad(true)
},setHref:function(href){this.href=href;
return this._prepareLoad()
},setContent:function(data){if(!this._isDownloaded){this.href="";
this._onUnloadHandler()
}this._setContent(data||"");
this._isDownloaded=false;
if(this.parseOnLoad){this._createSubWidgets()
}this._checkIfSingleChild();
if(this._singleChild&&this._singleChild.resize){this._singleChild.resize(this._contentBox)
}this._onLoadHandler()
},cancel:function(){if(this._xhrDfd&&(this._xhrDfd.fired==-1)){this._xhrDfd.cancel()
}delete this._xhrDfd
},destroy:function(){if(this._beingDestroyed){return 
}this._onUnloadHandler();
this._beingDestroyed=true;
this.inherited("destroy",arguments)
},resize:function(size){dojo.marginBox(this.domNode,size);
var node=this.containerNode||this.domNode,mb=dojo.mixin(dojo.marginBox(node),size||{});
this._contentBox=dijit.layout.marginBox2contentBox(node,mb);
if(this._singleChild&&this._singleChild.resize){this._singleChild.resize(this._contentBox)
}},_prepareLoad:function(forceLoad){this.cancel();
this.isLoaded=false;
this._loadCheck(forceLoad)
},_loadCheck:function(forceLoad){var displayState=((this.open!==false)&&(this.domNode.style.display!="none"));
if(this.href&&(forceLoad||(this.preload&&!this._xhrDfd)||(this.refreshOnShow&&displayState&&!this._xhrDfd)||(!this.isLoaded&&displayState&&!this._xhrDfd))){this._downloadExternalContent()
}},_downloadExternalContent:function(){this._onUnloadHandler();
this._setContent(this.onDownloadStart.call(this));
var self=this;
var getArgs={preventCache:(this.preventCache||this.refreshOnShow),url:this.href,handleAs:"text"};
if(dojo.isObject(this.ioArgs)){dojo.mixin(getArgs,this.ioArgs)
}var hand=this._xhrDfd=(this.ioMethod||dojo.xhrGet)(getArgs);
hand.addCallback(function(html){try{self.onDownloadEnd.call(self);
self._isDownloaded=true;
self.setContent.call(self,html)
}catch(err){self._onError.call(self,"Content",err)
}delete self._xhrDfd;
return html
});
hand.addErrback(function(err){if(!hand.cancelled){self._onError.call(self,"Download",err)
}delete self._xhrDfd;
return err
})
},_onLoadHandler:function(){this.isLoaded=true;
try{this.onLoad.call(this)
}catch(e){console.error("Error "+this.widgetId+" running custom onLoad code")
}},_onUnloadHandler:function(){this.isLoaded=false;
this.cancel();
try{this.onUnload.call(this)
}catch(e){console.error("Error "+this.widgetId+" running custom onUnload code")
}},_setContent:function(cont){this.destroyDescendants();
try{var node=this.containerNode||this.domNode;
while(node.firstChild){dojo._destroyElement(node.firstChild)
}if(typeof cont=="string"){if(this.extractContent){match=cont.match(/<body[^>]*>\s*([\s\S]+)\s*<\/body>/im);
if(match){cont=match[1]
}}node.innerHTML=cont
}else{if(cont.nodeType){node.appendChild(cont)
}else{dojo.forEach(cont,function(n){node.appendChild(n.cloneNode(true))
})
}}}catch(e){var errMess=this.onContentError(e);
try{node.innerHTML=errMess
}catch(e){console.error("Fatal "+this.id+" could not change content due to "+e.message,e)
}}},_onError:function(type,err,consoleText){var errText=this["on"+type+"Error"].call(this,err);
if(consoleText){console.error(consoleText,err)
}else{if(errText){this._setContent.call(this,errText)
}}},_createSubWidgets:function(){var rootNode=this.containerNode||this.domNode;
try{dojo.parser.parse(rootNode,true)
}catch(e){this._onError("Content",e,"Couldn't create widgets in "+this.id+(this.href?" from "+this.href:""))
}},onLoad:function(e){},onUnload:function(e){},onDownloadStart:function(){return this.loadingMessage
},onContentError:function(error){},onDownloadError:function(error){return this.errorMessage
},onDownloadEnd:function(){}})
}if(!dojo._hasResource["dijit.form.Form"]){dojo._hasResource["dijit.form.Form"]=true;
dojo.provide("dijit.form.Form");
dojo.declare("dijit.form._FormMixin",null,{action:"",method:"",enctype:"",name:"","accept-charset":"",accept:"",target:"",attributeMap:dojo.mixin(dojo.clone(dijit._Widget.prototype.attributeMap),{action:"",method:"",enctype:"","accept-charset":"",accept:"",target:""}),execute:function(formContents){},onCancel:function(){},onExecute:function(){},templateString:"<form dojoAttachPoint='containerNode' dojoAttachEvent='onsubmit:_onSubmit' name='${name}' enctype='multipart/form-data'></form>",_onSubmit:function(e){dojo.stopEvent(e);
this.onExecute();
this.execute(this.getValues())
},submit:function(){this.containerNode.submit()
},setValues:function(obj){var map={};
dojo.forEach(this.getDescendants(),function(widget){if(!widget.name){return 
}var entry=map[widget.name]||(map[widget.name]=[]);
entry.push(widget)
});
for(var name in map){var widgets=map[name],values=dojo.getObject(name,false,obj);
if(!dojo.isArray(values)){values=[values]
}if(widgets[0].setChecked){dojo.forEach(widgets,function(w,i){w.setChecked(dojo.indexOf(values,w.value)!=-1)
})
}else{dojo.forEach(widgets,function(w,i){w.setValue(values[i])
})
}}},getValues:function(){var obj={};
dojo.forEach(this.getDescendants(),function(widget){var value=widget.getValue?widget.getValue():widget.value;
var name=widget.name;
if(!name){return 
}if(widget.setChecked){if(/Radio/.test(widget.declaredClass)){if(widget.checked){dojo.setObject(name,value,obj)
}}else{var ary=dojo.getObject(name,false,obj);
if(!ary){ary=[];
dojo.setObject(name,ary,obj)
}if(widget.checked){ary.push(value)
}}}else{dojo.setObject(name,value,obj)
}});
return obj
},isValid:function(){return dojo.every(this.getDescendants(),function(widget){return !widget.isValid||widget.isValid()
})
}});
dojo.declare("dijit.form.Form",[dijit._Widget,dijit._Templated,dijit.form._FormMixin],null)
}if(!dojo._hasResource["dijit.Dialog"]){dojo._hasResource["dijit.Dialog"]=true;
dojo.provide("dijit.Dialog");
dojo.declare("dijit.DialogUnderlay",[dijit._Widget,dijit._Templated],{templateString:"<div class=dijitDialogUnderlayWrapper id='${id}_underlay'><div class=dijitDialogUnderlay dojoAttachPoint='node'></div></div>",postCreate:function(){dojo.body().appendChild(this.domNode);
this.bgIframe=new dijit.BackgroundIframe(this.domNode)
},layout:function(){var viewport=dijit.getViewport();
var is=this.node.style,os=this.domNode.style;
os.top=viewport.t+"px";
os.left=viewport.l+"px";
is.width=viewport.w+"px";
is.height=viewport.h+"px";
var viewport2=dijit.getViewport();
if(viewport.w!=viewport2.w){is.width=viewport2.w+"px"
}if(viewport.h!=viewport2.h){is.height=viewport2.h+"px"
}},show:function(){this.domNode.style.display="block";
this.layout();
if(this.bgIframe.iframe){this.bgIframe.iframe.style.display="block"
}this._resizeHandler=this.connect(window,"onresize","layout")
},hide:function(){this.domNode.style.display="none";
if(this.bgIframe.iframe){this.bgIframe.iframe.style.display="none"
}this.disconnect(this._resizeHandler)
},uninitialize:function(){if(this.bgIframe){this.bgIframe.destroy()
}}});
dojo.declare("dijit.Dialog",[dijit.layout.ContentPane,dijit._Templated,dijit.form._FormMixin],{templateString:null,templateString:'<div class="dijitDialog">\r\n\t<div dojoAttachPoint="titleBar" class="dijitDialogTitleBar" tabindex="0" waiRole="dialog">\r\n\t<span dojoAttachPoint="titleNode" class="dijitDialogTitle">${title}</span>\r\n\t<span dojoAttachPoint="closeButtonNode" class="dijitDialogCloseIcon" dojoAttachEvent="onclick: hide">\r\n\t\t<span dojoAttachPoint="closeText" class="closeText">x</span>\r\n\t</span>\r\n\t</div>\r\n\t\t<div dojoAttachPoint="containerNode" class="dijitDialogPaneContent"></div>\r\n\t<span dojoAttachPoint="tabEnd" dojoAttachEvent="onfocus:_cycleFocus" tabindex="0"></span>\r\n</div>\r\n',open:false,duration:400,_lastFocusItem:null,attributeMap:dojo.mixin(dojo.clone(dijit._Widget.prototype.attributeMap),{title:"titleBar"}),postCreate:function(){dojo.body().appendChild(this.domNode);
this.inherited("postCreate",arguments);
this.domNode.style.display="none";
this.connect(this,"onExecute","hide");
this.connect(this,"onCancel","hide")
},onLoad:function(){this._position();
this.inherited("onLoad",arguments)
},_setup:function(){this._modalconnects=[];
if(this.titleBar){this._moveable=new dojo.dnd.Moveable(this.domNode,{handle:this.titleBar})
}this._underlay=new dijit.DialogUnderlay();
var node=this.domNode;
this._fadeIn=dojo.fx.combine([dojo.fadeIn({node:node,duration:this.duration}),dojo.fadeIn({node:this._underlay.domNode,duration:this.duration,onBegin:dojo.hitch(this._underlay,"show")})]);
this._fadeOut=dojo.fx.combine([dojo.fadeOut({node:node,duration:this.duration,onEnd:function(){node.style.display="none"
}}),dojo.fadeOut({node:this._underlay.domNode,duration:this.duration,onEnd:dojo.hitch(this._underlay,"hide")})])
},uninitialize:function(){if(this._underlay){this._underlay.destroy()
}},_position:function(){if(dojo.hasClass(dojo.body(),"dojoMove")){return 
}var viewport=dijit.getViewport();
var mb=dojo.marginBox(this.domNode);
var style=this.domNode.style;
style.left=Math.floor((viewport.l+(viewport.w-mb.w)/2))+"px";
style.top=Math.floor((viewport.t+(viewport.h-mb.h)/2))+"px"
},_findLastFocus:function(evt){this._lastFocused=evt.target
},_cycleFocus:function(evt){if(!this._lastFocusItem){this._lastFocusItem=this._lastFocused
}this.titleBar.focus()
},_onKey:function(evt){if(evt.keyCode){var node=evt.target;
if(node==this.titleBar&&evt.shiftKey&&evt.keyCode==dojo.keys.TAB){if(this._lastFocusItem){this._lastFocusItem.focus()
}dojo.stopEvent(evt)
}else{while(node){if(node==this.domNode){if(evt.keyCode==dojo.keys.ESCAPE){this.hide()
}else{return 
}}node=node.parentNode
}if(evt.keyCode!=dojo.keys.TAB){dojo.stopEvent(evt)
}else{if(!dojo.isOpera){try{this.titleBar.focus()
}catch(e){}}}}}},show:function(){if(!this._alreadyInitialized){this._setup();
this._alreadyInitialized=true
}if(this._fadeOut.status()=="playing"){this._fadeOut.stop()
}this._modalconnects.push(dojo.connect(window,"onscroll",this,"layout"));
this._modalconnects.push(dojo.connect(document.documentElement,"onkeypress",this,"_onKey"));
var ev=typeof (document.ondeactivate)=="object"?"ondeactivate":"onblur";
this._modalconnects.push(dojo.connect(this.containerNode,ev,this,"_findLastFocus"));
dojo.style(this.domNode,"opacity",0);
this.domNode.style.display="block";
this.open=true;
this._loadCheck();
this._position();
this._fadeIn.play();
this._savedFocus=dijit.getFocus(this);
setTimeout(dojo.hitch(this,function(){dijit.focus(this.titleBar)
}),50)
},hide:function(){if(!this._alreadyInitialized){return 
}if(this._fadeIn.status()=="playing"){this._fadeIn.stop()
}this._fadeOut.play();
if(this._scrollConnected){this._scrollConnected=false
}dojo.forEach(this._modalconnects,dojo.disconnect);
this._modalconnects=[];
this.connect(this._fadeOut,"onEnd",dojo.hitch(this,function(){dijit.focus(this._savedFocus)
}));
this.open=false
},layout:function(){if(this.domNode.style.display=="block"){this._underlay.layout();
this._position()
}}});
dojo.declare("dijit.TooltipDialog",[dijit.layout.ContentPane,dijit._Templated,dijit.form._FormMixin],{title:"",_lastFocusItem:null,templateString:null,templateString:'<div class="dijitTooltipDialog" >\r\n\t<div class="dijitTooltipContainer">\r\n\t\t<div class ="dijitTooltipContents dijitTooltipFocusNode" dojoAttachPoint="containerNode" tabindex="0" waiRole="dialog"></div>\r\n\t</div>\r\n\t<span dojoAttachPoint="tabEnd" tabindex="0" dojoAttachEvent="focus:_cycleFocus"></span>\r\n\t<div class="dijitTooltipConnector" ></div>\r\n</div>\r\n',postCreate:function(){this.inherited("postCreate",arguments);
this.connect(this.containerNode,"onkeypress","_onKey");
var ev=typeof (document.ondeactivate)=="object"?"ondeactivate":"onblur";
this.connect(this.containerNode,ev,"_findLastFocus");
this.containerNode.title=this.title
},orient:function(corner){this.domNode.className="dijitTooltipDialog  dijitTooltipAB"+(corner.charAt(1)=="L"?"Left":"Right")+" dijitTooltip"+(corner.charAt(0)=="T"?"Below":"Above")
},onOpen:function(pos){this.orient(pos.corner);
this._loadCheck();
this.containerNode.focus()
},_onKey:function(evt){if(evt.keyCode==dojo.keys.ESCAPE){this.onCancel()
}else{if(evt.target==this.containerNode&&evt.shiftKey&&evt.keyCode==dojo.keys.TAB){if(this._lastFocusItem){this._lastFocusItem.focus()
}dojo.stopEvent(evt)
}else{if(evt.keyCode==dojo.keys.TAB){evt.stopPropagation()
}}}},_findLastFocus:function(evt){this._lastFocused=evt.target
},_cycleFocus:function(evt){if(!this._lastFocusItem){this._lastFocusItem=this._lastFocused
}this.containerNode.focus()
}})
}if(!dojo._hasResource["dijit.Toolbar"]){dojo._hasResource["dijit.Toolbar"]=true;
dojo.provide("dijit.Toolbar");
dojo.declare("dijit.Toolbar",[dijit._Widget,dijit._Templated,dijit._KeyNavContainer],{templateString:'<div class="dijit dijitToolbar" waiRole="toolbar" tabIndex="${tabIndex}" dojoAttachPoint="containerNode"></div>',tabIndex:"0",postCreate:function(){this.connectKeyNavHandlers(this.isLeftToRight()?[dojo.keys.LEFT_ARROW]:[dojo.keys.RIGHT_ARROW],this.isLeftToRight()?[dojo.keys.RIGHT_ARROW]:[dojo.keys.LEFT_ARROW])
},startup:function(){this.startupKeyNavChildren()
}});
dojo.declare("dijit.ToolbarSeparator",[dijit._Widget,dijit._Templated],{templateString:'<div class="dijitToolbarSeparator dijitInline"></div>',postCreate:function(){dojo.setSelectable(this.domNode,false)
},isFocusable:function(){return false
}})
}if(!dojo._hasResource["dijit.form.Button"]){dojo._hasResource["dijit.form.Button"]=true;
dojo.provide("dijit.form.Button");
dojo.declare("dijit.form.Button",dijit.form._FormWidget,{label:"",showLabel:true,iconClass:"",type:"button",baseClass:"dijitButton",templateString:'<div class="dijit dijitLeft dijitInline dijitButton"\n\tdojoAttachEvent="onclick:_onButtonClick,onmouseenter:_onMouse,onmouseleave:_onMouse,onmousedown:_onMouse"\n\t><div class=\'dijitRight\'\n\t\t><button class="dijitStretch dijitButtonNode dijitButtonContents" dojoAttachPoint="focusNode,titleNode"\n\t\t\ttype="${type}" waiRole="button" waiState="labelledby-${id}_label"\n\t\t\t><span class="dijitInline ${iconClass}" dojoAttachPoint="iconNode" \n \t\t\t\t><span class="dijitToggleButtonIconChar">&#10003</span \n\t\t\t></span\n\t\t\t><span class="dijitButtonText" id="${id}_label" dojoAttachPoint="containerNode">${label}</span\n\t\t></button\n\t></div\n></div>\n',_onClick:function(e){if(this.disabled){return false
}this._clicked();
return this.onClick(e)
},_onButtonClick:function(e){dojo.stopEvent(e);
var okToSubmit=this._onClick(e)!==false;
if(this.type=="submit"&&okToSubmit){for(var node=this.domNode;
node;
node=node.parentNode){var widget=dijit.byNode(node);
if(widget&&widget._onSubmit){widget._onSubmit(e);
break
}if(node.tagName.toLowerCase()=="form"){if(!node.onsubmit||node.onsubmit()){node.submit()
}break
}}}},postCreate:function(){if(this.showLabel==false){var labelText="";
this.label=this.containerNode.innerHTML;
labelText=dojo.trim(this.containerNode.innerText||this.containerNode.textContent);
this.titleNode.title=labelText;
dojo.addClass(this.containerNode,"dijitDisplayNone")
}this.inherited(arguments)
},onClick:function(e){return true
},_clicked:function(e){},setLabel:function(content){this.containerNode.innerHTML=this.label=content;
if(dojo.isMozilla){var oldDisplay=dojo.getComputedStyle(this.domNode).display;
this.domNode.style.display="none";
var _this=this;
setTimeout(function(){_this.domNode.style.display=oldDisplay
},1)
}if(this.showLabel==false){this.titleNode.title=dojo.trim(this.containerNode.innerText||this.containerNode.textContent)
}}});
dojo.declare("dijit.form.DropDownButton",[dijit.form.Button,dijit._Container],{baseClass:"dijitDropDownButton",templateString:'<div class="dijit dijitLeft dijitInline"\n\tdojoAttachEvent="onmouseenter:_onMouse,onmouseleave:_onMouse,onmousedown:_onMouse,onclick:_onDropDownClick,onkeydown:_onDropDownKeydown,onblur:_onDropDownBlur,onkeypress:_onKey"\n\t><div class=\'dijitRight\'>\n\t<button class="dijitStretch dijitButtonNode dijitButtonContents" type="${type}"\n\t\tdojoAttachPoint="focusNode,titleNode" waiRole="button" waiState="haspopup-true,labelledby-${id}_label"\n\t\t><div class="dijitInline ${iconClass}" dojoAttachPoint="iconNode"></div\n\t\t><span class="dijitButtonText" \tdojoAttachPoint="containerNode,popupStateNode"\n\t\tid="${id}_label">${label}</span\n\t\t><span class=\'dijitA11yDownArrow\'>&#9660;</span>\n\t</button>\n</div></div>\n',_fillContent:function(){if(this.srcNodeRef){var nodes=dojo.query("*",this.srcNodeRef);
dijit.form.DropDownButton.superclass._fillContent.call(this,nodes[0]);
this.dropDownContainer=this.srcNodeRef
}},startup:function(){if(!this.dropDown){var dropDownNode=dojo.query("[widgetId]",this.dropDownContainer)[0];
this.dropDown=dijit.byNode(dropDownNode);
delete this.dropDownContainer
}dojo.body().appendChild(this.dropDown.domNode);
this.dropDown.domNode.style.display="none"
},_onArrowClick:function(e){if(this.disabled){return 
}this._toggleDropDown()
},_onDropDownClick:function(e){var isMacFFlessThan3=dojo.isFF&&dojo.isFF<3&&navigator.appVersion.indexOf("Macintosh")!=-1;
if(!isMacFFlessThan3||e.detail!=0||this._seenKeydown){this._onArrowClick(e)
}this._seenKeydown=false
},_onDropDownKeydown:function(e){this._seenKeydown=true
},_onDropDownBlur:function(e){this._seenKeydown=false
},_onKey:function(e){if(this.disabled){return 
}if(e.keyCode==dojo.keys.DOWN_ARROW){if(!this.dropDown||this.dropDown.domNode.style.display=="none"){dojo.stopEvent(e);
return this._toggleDropDown()
}}},_onBlur:function(){this._closeDropDown()
},_toggleDropDown:function(){if(this.disabled){return 
}dijit.focus(this.popupStateNode);
var dropDown=this.dropDown;
if(!dropDown){return false
}if(!dropDown.isShowingNow){if(dropDown.href&&!dropDown.isLoaded){var self=this;
var handler=dojo.connect(dropDown,"onLoad",function(){dojo.disconnect(handler);
self._openDropDown()
});
dropDown._loadCheck(true);
return 
}else{this._openDropDown()
}}else{this._closeDropDown()
}},_openDropDown:function(){var dropDown=this.dropDown;
var oldWidth=dropDown.domNode.style.width;
var self=this;
dijit.popup.open({parent:this,popup:dropDown,around:this.domNode,orient:this.isLeftToRight()?{BL:"TL",BR:"TR",TL:"BL",TR:"BR"}:{BR:"TR",BL:"TL",TR:"BR",TL:"BL"},onExecute:function(){self._closeDropDown(true)
},onCancel:function(){self._closeDropDown(true)
},onClose:function(){dropDown.domNode.style.width=oldWidth;
self.popupStateNode.removeAttribute("popupActive");
this._opened=false
}});
if(this.domNode.offsetWidth>dropDown.domNode.offsetWidth){var adjustNode=null;
if(!this.isLeftToRight()){adjustNode=dropDown.domNode.parentNode;
var oldRight=adjustNode.offsetLeft+adjustNode.offsetWidth
}dojo.marginBox(dropDown.domNode,{w:this.domNode.offsetWidth});
if(adjustNode){adjustNode.style.left=oldRight-this.domNode.offsetWidth+"px"
}}this.popupStateNode.setAttribute("popupActive","true");
this._opened=true;
if(dropDown.focus){dropDown.focus()
}},_closeDropDown:function(focus){if(this._opened){dijit.popup.close(this.dropDown);
if(focus){this.focus()
}this._opened=false
}}});
dojo.declare("dijit.form.ComboButton",dijit.form.DropDownButton,{templateString:'<table class=\'dijit dijitReset dijitInline dijitLeft\'\n\tcellspacing=\'0\' cellpadding=\'0\'\n\tdojoAttachEvent="onmouseenter:_onMouse,onmouseleave:_onMouse,onmousedown:_onMouse">\n\t<tr>\n\t\t<td\tclass="dijitStretch dijitButtonContents dijitButtonNode"\n\t\t\ttabIndex="${tabIndex}"\n\t\t\tdojoAttachEvent="ondijitclick:_onButtonClick"  dojoAttachPoint="titleNode"\n\t\t\twaiRole="button" waiState="labelledby-${id}_label">\n\t\t\t<div class="dijitInline ${iconClass}" dojoAttachPoint="iconNode"></div>\n\t\t\t<span class="dijitButtonText" id="${id}_label" dojoAttachPoint="containerNode">${label}</span>\n\t\t</td>\n\t\t<td class=\'dijitReset dijitRight dijitButtonNode dijitDownArrowButton\'\n\t\t\tdojoAttachPoint="popupStateNode,focusNode"\n\t\t\tdojoAttachEvent="ondijitclick:_onArrowClick, onkeypress:_onKey"\n\t\t\tstateModifier="DownArrow"\n\t\t\ttitle="${optionsTitle}" name="${name}"\n\t\t\twaiRole="button" waiState="haspopup-true"\n\t\t><div waiRole="presentation">&#9660;</div>\n\t</td></tr>\n</table>\n',attributeMap:dojo.mixin(dojo.clone(dijit.form._FormWidget.prototype.attributeMap),{id:"",name:""}),optionsTitle:"",baseClass:"dijitComboButton",_focusedNode:null,postCreate:function(){this.inherited(arguments);
this._focalNodes=[this.titleNode,this.popupStateNode];
dojo.forEach(this._focalNodes,dojo.hitch(this,function(node){if(dojo.isIE){this.connect(node,"onactivate",this._onNodeFocus)
}else{this.connect(node,"onfocus",this._onNodeFocus)
}}))
},focusFocalNode:function(node){this._focusedNode=node;
dijit.focus(node)
},hasNextFocalNode:function(){return this._focusedNode!==this.getFocalNodes()[1]
},focusNext:function(){this._focusedNode=this.getFocalNodes()[this._focusedNode?1:0];
dijit.focus(this._focusedNode)
},hasPrevFocalNode:function(){return this._focusedNode!==this.getFocalNodes()[0]
},focusPrev:function(){this._focusedNode=this.getFocalNodes()[this._focusedNode?0:1];
dijit.focus(this._focusedNode)
},getFocalNodes:function(){return this._focalNodes
},_onNodeFocus:function(evt){this._focusedNode=evt.currentTarget
},_onBlur:function(evt){this.inherited(arguments);
this._focusedNode=null
}});
dojo.declare("dijit.form.ToggleButton",dijit.form.Button,{baseClass:"dijitToggleButton",checked:false,_clicked:function(evt){this.setChecked(!this.checked)
},setChecked:function(checked){this.checked=checked;
dijit.setWaiState(this.focusNode||this.domNode,"pressed",this.checked);
this._setStateClass();
this.onChange(checked)
}})
}if(!dojo._hasResource["dijit.Menu"]){dojo._hasResource["dijit.Menu"]=true;
dojo.provide("dijit.Menu");
dojo.declare("dijit.Menu",[dijit._Widget,dijit._Templated,dijit._KeyNavContainer],{constructor:function(){this._bindings=[]
},templateString:'<table class="dijit dijitMenu dijitReset dijitMenuTable" waiRole="menu" dojoAttachEvent="onkeypress:_onKeyPress"><tbody class="dijitReset" dojoAttachPoint="containerNode"></tbody></table>',targetNodeIds:[],contextMenuForWindow:false,parentMenu:null,popupDelay:500,_contextMenuWithMouse:false,postCreate:function(){if(this.contextMenuForWindow){this.bindDomNode(dojo.body())
}else{dojo.forEach(this.targetNodeIds,this.bindDomNode,this)
}this.connectKeyNavHandlers([dojo.keys.UP_ARROW],[dojo.keys.DOWN_ARROW])
},startup:function(){dojo.forEach(this.getChildren(),function(child){child.startup()
});
this.startupKeyNavChildren()
},onExecute:function(){},onCancel:function(closeAll){},_moveToPopup:function(evt){if(this.focusedChild&&this.focusedChild.popup&&!this.focusedChild.disabled){this.focusedChild._onClick(evt)
}},_onKeyPress:function(evt){if(evt.ctrlKey||evt.altKey){return 
}switch(evt.keyCode){case dojo.keys.RIGHT_ARROW:this._moveToPopup(evt);
dojo.stopEvent(evt);
break;
case dojo.keys.LEFT_ARROW:if(this.parentMenu){this.onCancel(false)
}else{dojo.stopEvent(evt)
}break
}},onItemHover:function(item){this.focusChild(item);
if(this.focusedChild.popup&&!this.focusedChild.disabled&&!this.hover_timer){this.hover_timer=setTimeout(dojo.hitch(this,"_openPopup"),this.popupDelay)
}},_onChildBlur:function(item){dijit.popup.close(item.popup);
item._blur();
this._stopPopupTimer()
},onItemUnhover:function(item){},_stopPopupTimer:function(){if(this.hover_timer){clearTimeout(this.hover_timer);
this.hover_timer=null
}},_getTopMenu:function(){for(var top=this;
top.parentMenu;
top=top.parentMenu){}return top
},onItemClick:function(item){if(item.disabled){return false
}if(item.popup){if(!this.is_open){this._openPopup()
}}else{this.onExecute();
item.onClick()
}},_iframeContentWindow:function(iframe_el){var win=dijit.getDocumentWindow(dijit.Menu._iframeContentDocument(iframe_el))||dijit.Menu._iframeContentDocument(iframe_el)["__parent__"]||(iframe_el.name&&document.frames[iframe_el.name])||null;
return win
},_iframeContentDocument:function(iframe_el){var doc=iframe_el.contentDocument||(iframe_el.contentWindow&&iframe_el.contentWindow.document)||(iframe_el.name&&document.frames[iframe_el.name]&&document.frames[iframe_el.name].document)||null;
return doc
},bindDomNode:function(node){node=dojo.byId(node);
var win=dijit.getDocumentWindow(node.ownerDocument);
if(node.tagName.toLowerCase()=="iframe"){win=this._iframeContentWindow(node);
node=dojo.withGlobal(win,dojo.body)
}var cn=(node==dojo.body()?dojo.doc:node);
node[this.id]=this._bindings.push([dojo.connect(cn,"oncontextmenu",this,"_openMyself"),dojo.connect(cn,"onkeydown",this,"_contextKey"),dojo.connect(cn,"onmousedown",this,"_contextMouse")])
},unBindDomNode:function(nodeName){var node=dojo.byId(nodeName);
var bid=node[this.id]-1,b=this._bindings[bid];
dojo.forEach(b,dojo.disconnect);
delete this._bindings[bid]
},_contextKey:function(e){this._contextMenuWithMouse=false;
if(e.keyCode==dojo.keys.F10){dojo.stopEvent(e);
if(e.shiftKey&&e.type=="keydown"){var _e={target:e.target,pageX:e.pageX,pageY:e.pageY};
_e.preventDefault=_e.stopPropagation=function(){};
window.setTimeout(dojo.hitch(this,function(){this._openMyself(_e)
}),1)
}}},_contextMouse:function(e){this._contextMenuWithMouse=true
},_openMyself:function(e){dojo.stopEvent(e);
var x,y;
if(dojo.isSafari||this._contextMenuWithMouse){x=e.pageX;
y=e.pageY
}else{var coords=dojo.coords(e.target,true);
x=coords.x+10;
y=coords.y+10
}var self=this;
var savedFocus=dijit.getFocus(this);
function closeAndRestoreFocus(){dijit.focus(savedFocus);
dijit.popup.close(self)
}dijit.popup.open({popup:this,x:x,y:y,onExecute:closeAndRestoreFocus,onCancel:closeAndRestoreFocus,orient:this.isLeftToRight()?"L":"R"});
this.focus();
this._onBlur=function(){dijit.popup.close(this)
}
},onOpen:function(e){this.isShowingNow=true
},onClose:function(){this._stopPopupTimer();
this.parentMenu=null;
this.isShowingNow=false;
this.currentPopup=null;
if(this.focusedChild){this._onChildBlur(this.focusedChild);
this.focusedChild=null
}},_openPopup:function(){this._stopPopupTimer();
var from_item=this.focusedChild;
var popup=from_item.popup;
if(popup.isShowingNow){return 
}popup.parentMenu=this;
var self=this;
dijit.popup.open({parent:this,popup:popup,around:from_item.arrowCell,orient:this.isLeftToRight()?{TR:"TL",TL:"TR"}:{TL:"TR",TR:"TL"},onCancel:function(){dijit.popup.close(popup);
from_item.focus();
self.currentPopup=null
}});
this.currentPopup=popup;
if(popup.focus){popup.focus()
}}});
dojo.declare("dijit.MenuItem",[dijit._Widget,dijit._Templated,dijit._Contained],{templateString:'<tr class="dijitReset dijitMenuItem"dojoAttachEvent="onmouseenter:_onHover,onmouseleave:_onUnhover,ondijitclick:_onClick"><td class="dijitReset"><div class="dijitMenuItemIcon ${iconClass}" dojoAttachPoint="iconNode" ></div></td><td tabIndex="-1" class="dijitReset dijitMenuItemLabel" dojoAttachPoint="containerNode" waiRole="menuitem"></td><td class="dijitReset" dojoAttachPoint="arrowCell"><div class="dijitMenuExpand" dojoAttachPoint="expand" style="display:none"><span class="dijitInline dijitArrowNode dijitMenuExpandInner">+</span></div></td></tr>',label:"",iconClass:"",disabled:false,postCreate:function(){dojo.setSelectable(this.domNode,false);
this.setDisabled(this.disabled);
if(this.label){this.containerNode.innerHTML=this.label
}},_onHover:function(){this.getParent().onItemHover(this)
},_onUnhover:function(){this.getParent().onItemUnhover(this)
},_onClick:function(evt){this.getParent().onItemClick(this);
dojo.stopEvent(evt)
},onClick:function(){},focus:function(){dojo.addClass(this.domNode,"dijitMenuItemHover");
try{dijit.focus(this.containerNode)
}catch(e){}},_blur:function(){dojo.removeClass(this.domNode,"dijitMenuItemHover")
},setDisabled:function(value){this.disabled=value;
dojo[value?"addClass":"removeClass"](this.domNode,"dijitMenuItemDisabled");
dijit.setWaiState(this.containerNode,"disabled",value?"true":"false")
}});
dojo.declare("dijit.PopupMenuItem",dijit.MenuItem,{_fillContent:function(){if(this.srcNodeRef){var nodes=dojo.query("*",this.srcNodeRef);
dijit.PopupMenuItem.superclass._fillContent.call(this,nodes[0]);
this.dropDownContainer=this.srcNodeRef
}},startup:function(){if(!this.popup){var node=dojo.query("[widgetId]",this.dropDownContainer)[0];
this.popup=dijit.byNode(node)
}dojo.body().appendChild(this.popup.domNode);
this.popup.domNode.style.display="none";
dojo.addClass(this.expand,"dijitMenuExpandEnabled");
dojo.style(this.expand,"display","");
dijit.setWaiState(this.containerNode,"haspopup","true")
}});
dojo.declare("dijit.MenuSeparator",[dijit._Widget,dijit._Templated,dijit._Contained],{templateString:'<tr class="dijitMenuSeparator"><td colspan=3><div class="dijitMenuSeparatorTop"></div><div class="dijitMenuSeparatorBottom"></div></td></tr>',postCreate:function(){dojo.setSelectable(this.domNode,false)
},isFocusable:function(){return false
}})
}if(!dojo._hasResource["dijit.Tooltip"]){dojo._hasResource["dijit.Tooltip"]=true;
dojo.provide("dijit.Tooltip");
dojo.declare("dijit._MasterTooltip",[dijit._Widget,dijit._Templated],{duration:200,templateString:'<div class="dijitTooltip dijitTooltipLeft" id="dojoTooltip">\n\t<div class="dijitTooltipContainer dijitTooltipContents" dojoAttachPoint="containerNode" waiRole=\'alert\'></div>\n\t<div class="dijitTooltipConnector"></div>\n</div>\n',postCreate:function(){dojo.body().appendChild(this.domNode);
this.bgIframe=new dijit.BackgroundIframe(this.domNode);
this.fadeIn=dojo.fadeIn({node:this.domNode,duration:this.duration,onEnd:dojo.hitch(this,"_onShow")});
this.fadeOut=dojo.fadeOut({node:this.domNode,duration:this.duration,onEnd:dojo.hitch(this,"_onHide")})
},show:function(innerHTML,aroundNode){if(this.aroundNode&&this.aroundNode===aroundNode){return 
}if(this.fadeOut.status()=="playing"){this._onDeck=arguments;
return 
}this.containerNode.innerHTML=innerHTML;
this.domNode.style.top=(this.domNode.offsetTop+1)+"px";
var align=this.isLeftToRight()?{BR:"BL",BL:"BR"}:{BL:"BR",BR:"BL"};
var pos=dijit.placeOnScreenAroundElement(this.domNode,aroundNode,align);
this.domNode.className="dijitTooltip dijitTooltip"+(pos.corner=="BL"?"Right":"Left");
dojo.style(this.domNode,"opacity",0);
this.fadeIn.play();
this.isShowingNow=true;
this.aroundNode=aroundNode
},_onShow:function(){if(dojo.isIE){this.domNode.style.filter=""
}},hide:function(aroundNode){if(!this.aroundNode||this.aroundNode!==aroundNode){return 
}if(this._onDeck){this._onDeck=null;
return 
}this.fadeIn.stop();
this.isShowingNow=false;
this.aroundNode=null;
this.fadeOut.play()
},_onHide:function(){this.domNode.style.cssText="";
if(this._onDeck){this.show.apply(this,this._onDeck);
this._onDeck=null
}}});
dijit.showTooltip=function(innerHTML,aroundNode){if(!dijit._masterTT){dijit._masterTT=new dijit._MasterTooltip()
}return dijit._masterTT.show(innerHTML,aroundNode)
};
dijit.hideTooltip=function(aroundNode){if(!dijit._masterTT){dijit._masterTT=new dijit._MasterTooltip()
}return dijit._masterTT.hide(aroundNode)
};
dojo.declare("dijit.Tooltip",dijit._Widget,{label:"",showDelay:400,connectId:[],postCreate:function(){if(this.srcNodeRef){this.srcNodeRef.style.display="none"
}this._connectNodes=[];
dojo.forEach(this.connectId,function(id){var node=dojo.byId(id);
if(node){this._connectNodes.push(node);
dojo.forEach(["onMouseOver","onMouseOut","onFocus","onBlur","onHover","onUnHover"],function(event){this.connect(node,event.toLowerCase(),"_"+event)
},this);
if(dojo.isIE){node.style.zoom=1
}}},this)
},_onMouseOver:function(e){this._onHover(e)
},_onMouseOut:function(e){if(dojo.isDescendant(e.relatedTarget,e.target)){return 
}this._onUnHover(e)
},_onFocus:function(e){this._focus=true;
this._onHover(e)
},_onBlur:function(e){this._focus=false;
this._onUnHover(e)
},_onHover:function(e){if(!this._showTimer){var target=e.target;
this._showTimer=setTimeout(dojo.hitch(this,function(){this.open(target)
}),this.showDelay)
}},_onUnHover:function(e){if(this._focus){return 
}if(this._showTimer){clearTimeout(this._showTimer);
delete this._showTimer
}this.close()
},open:function(target){target=target||this._connectNodes[0];
if(!target){return 
}if(this._showTimer){clearTimeout(this._showTimer);
delete this._showTimer
}dijit.showTooltip(this.label||this.domNode.innerHTML,target);
this._connectNode=target
},close:function(){dijit.hideTooltip(this._connectNode);
delete this._connectNode;
if(this._showTimer){clearTimeout(this._showTimer);
delete this._showTimer
}},uninitialize:function(){this.close()
}})
}if(!dojo._hasResource["dijit.form.TextBox"]){dojo._hasResource["dijit.form.TextBox"]=true;
dojo.provide("dijit.form.TextBox");
dojo.declare("dijit.form.TextBox",dijit.form._FormWidget,{trim:false,uppercase:false,lowercase:false,propercase:false,maxLength:"",templateString:'<input class="dojoTextBox" dojoAttachPoint=\'textbox,focusNode\' name="${name}"\n\tdojoAttachEvent=\'onmouseenter:_onMouse,onmouseleave:_onMouse,onfocus:_onMouse,onblur:_onMouse,onkeyup,onkeypress:_onKeyPress\'\n\tautocomplete="off" type="${type}"\n\t/>\n',baseClass:"dijitTextBox",attributeMap:dojo.mixin(dojo.clone(dijit.form._FormWidget.prototype.attributeMap),{maxLength:"focusNode"}),getDisplayedValue:function(){return this.filter(this.textbox.value)
},getValue:function(){return this.parse(this.getDisplayedValue(),this.constraints)
},setValue:function(value,priorityChange,formattedValue){var filteredValue=this.filter(value);
if((typeof filteredValue==typeof value)&&(formattedValue==null||formattedValue==undefined)){formattedValue=this.format(filteredValue,this.constraints)
}if(formattedValue!=null&&formattedValue!=undefined){this.textbox.value=formattedValue
}dijit.form.TextBox.superclass.setValue.call(this,filteredValue,priorityChange)
},setDisplayedValue:function(value){this.textbox.value=value;
this.setValue(this.getValue(),true)
},forWaiValuenow:function(){return this.getDisplayedValue()
},format:function(value,constraints){return((value==null||value==undefined)?"":(value.toString?value.toString():value))
},parse:function(value,constraints){return value
},postCreate:function(){this.textbox.setAttribute("value",this.getDisplayedValue());
this.inherited("postCreate",arguments);
if(this.srcNodeRef){dojo.style(this.textbox,"cssText",this.style);
this.textbox.className+=" "+this["class"]
}this._layoutHack()
},_layoutHack:function(){if(dojo.isFF==2&&this.domNode.tagName=="TABLE"){var node=this.domNode;
var old=node.style.opacity;
node.style.opacity="0.999";
setTimeout(function(){node.style.opacity=old
},0)
}},filter:function(val){if(val==undefined||val==null){return""
}else{if(typeof val!="string"){return val
}}if(this.trim){val=dojo.trim(val)
}if(this.uppercase){val=val.toUpperCase()
}if(this.lowercase){val=val.toLowerCase()
}if(this.propercase){val=val.replace(/[^\s]+/g,function(word){return word.substring(0,1).toUpperCase()+word.substring(1)
})
}return val
},_onBlur:function(){this.setValue(this.getValue(),(this.isValid?this.isValid():true))
},onkeyup:function(){}})
}if(!dojo._hasResource["dijit.form.ValidationTextBox"]){dojo._hasResource["dijit.form.ValidationTextBox"]=true;
dojo.provide("dijit.form.ValidationTextBox");
dojo.declare("dijit.form.ValidationTextBox",dijit.form.TextBox,{templateString:'<table style="display: -moz-inline-stack;" class="dijit dijitReset dijitInlineTable" cellspacing="0" cellpadding="0"\n\tid="widget_${id}" name="${name}"\n\tdojoAttachEvent="onmouseenter:_onMouse,onmouseleave:_onMouse" waiRole="presentation"\n\t><tr class="dijitReset"\n\t\t><td class="dijitReset dijitInputField" width="100%"\n\t\t\t><input dojoAttachPoint=\'textbox,focusNode\' dojoAttachEvent=\'onfocus,onblur:_onMouse,onkeyup,onkeypress:_onKeyPress\' autocomplete="off"\n\t\t\ttype=\'${type}\' name=\'${name}\'\n\t\t/></td\n\t\t><td class="dijitReset dijitValidationIconField" width="0%"\n\t\t\t><div dojoAttachPoint=\'iconNode\' class=\'dijitValidationIcon\'></div><div class=\'dijitValidationIconText\'>&Chi;</div\n\t\t></td\n\t></tr\n></table>\n',baseClass:"dijitTextBox",required:false,promptMessage:"",invalidMessage:"$_unset_$",constraints:{},regExp:".*",regExpGen:function(constraints){return this.regExp
},state:"",setValue:function(){this.inherited("setValue",arguments);
this.validate(false)
},validator:function(value,constraints){return(new RegExp("^("+this.regExpGen(constraints)+")"+(this.required?"":"?")+"$")).test(value)&&(!this.required||!this._isEmpty(value))&&(this._isEmpty(value)||this.parse(value,constraints)!==null)
},isValid:function(isFocused){return this.validator(this.textbox.value,this.constraints)
},_isEmpty:function(value){return/^\s*$/.test(value)
},getErrorMessage:function(isFocused){return this.invalidMessage
},getPromptMessage:function(isFocused){return this.promptMessage
},validate:function(isFocused){var message="";
var isValid=this.isValid(isFocused);
var isEmpty=this._isEmpty(this.textbox.value);
this.state=(isValid||(!this._hasBeenBlurred&&isEmpty))?"":"Error";
this._setStateClass();
dijit.setWaiState(this.focusNode,"invalid",(isValid?"false":"true"));
if(isFocused){if(isEmpty){message=this.getPromptMessage(true)
}if(!message&&!isValid){message=this.getErrorMessage(true)
}}this._displayMessage(message)
},_message:"",_displayMessage:function(message){if(this._message==message){return 
}this._message=message;
this.displayMessage(message)
},displayMessage:function(message){if(message){dijit.showTooltip(message,this.domNode)
}else{dijit.hideTooltip(this.domNode)
}},_hasBeenBlurred:false,_onBlur:function(evt){this._hasBeenBlurred=true;
this.validate(false);
this.inherited("_onBlur",arguments)
},onfocus:function(evt){this.validate(true);
this._onMouse(evt)
},onkeyup:function(evt){this.onfocus(evt)
},constructor:function(){this.constraints={}
},postMixInProperties:function(){this.inherited("postMixInProperties",arguments);
this.constraints.locale=this.lang;
this.messages=dojo.i18n.getLocalization("dijit.form","validate",this.lang);
if(this.invalidMessage=="$_unset_$"){this.invalidMessage=this.messages.invalidMessage
}var p=this.regExpGen(this.constraints);
this.regExp=p
}});
dojo.declare("dijit.form.MappedTextBox",dijit.form.ValidationTextBox,{serialize:function(val,options){return(val.toString?val.toString():"")
},toString:function(){var val=this.filter(this.getValue());
return(val!=null)?((typeof val=="string")?val:this.serialize(val,this.constraints)):""
},validate:function(){this.valueNode.value=this.toString();
this.inherited("validate",arguments)
},postCreate:function(){var textbox=this.textbox;
var valueNode=(this.valueNode=document.createElement("input"));
valueNode.setAttribute("type",textbox.type);
valueNode.setAttribute("value",this.toString());
dojo.style(valueNode,"display","none");
valueNode.name=this.textbox.name;
this.textbox.name="_"+this.textbox.name+"_displayed_";
this.textbox.removeAttribute("name");
dojo.place(valueNode,textbox,"after");
this.inherited("postCreate",arguments)
}});
dojo.declare("dijit.form.RangeBoundTextBox",dijit.form.MappedTextBox,{rangeMessage:"",compare:function(val1,val2){return val1-val2
},rangeCheck:function(primitive,constraints){var isMin=(typeof constraints.min!="undefined");
var isMax=(typeof constraints.max!="undefined");
if(isMin||isMax){return(!isMin||this.compare(primitive,constraints.min)>=0)&&(!isMax||this.compare(primitive,constraints.max)<=0)
}else{return true
}},isInRange:function(isFocused){return this.rangeCheck(this.getValue(),this.constraints)
},isValid:function(isFocused){return this.inherited("isValid",arguments)&&((this._isEmpty(this.textbox.value)&&!this.required)||this.isInRange(isFocused))
},getErrorMessage:function(isFocused){if(dijit.form.RangeBoundTextBox.superclass.isValid.call(this,false)&&!this.isInRange(isFocused)){return this.rangeMessage
}else{return this.inherited("getErrorMessage",arguments)
}},postMixInProperties:function(){this.inherited("postMixInProperties",arguments);
if(!this.rangeMessage){this.messages=dojo.i18n.getLocalization("dijit.form","validate",this.lang);
this.rangeMessage=this.messages.rangeMessage
}},postCreate:function(){this.inherited("postCreate",arguments);
if(typeof this.constraints.min!="undefined"){dijit.setWaiState(this.focusNode,"valuemin",this.constraints.min)
}if(typeof this.constraints.max!="undefined"){dijit.setWaiState(this.focusNode,"valuemax",this.constraints.max)
}}})
}if(!dojo._hasResource["dijit.form.ComboBox"]){dojo._hasResource["dijit.form.ComboBox"]=true;
dojo.provide("dijit.form.ComboBox");
dojo.declare("dijit.form.ComboBoxMixin",null,{item:null,pageSize:Infinity,store:null,query:{},autoComplete:true,searchDelay:100,searchAttr:"name",ignoreCase:true,hasDownArrow:true,_hasFocus:false,templateString:'<table class="dijit dijitReset dijitInlineTable dijitLeft" cellspacing="0" cellpadding="0"\n\tid="widget_${id}" name="${name}" dojoAttachEvent="onmouseenter:_onMouse,onmouseleave:_onMouse" waiRole="presentation"\n\t><tr class="dijitReset"\n\t\t><td class=\'dijitReset dijitStretch dijitInputField\' width="100%"\n\t\t\t><input type="text" autocomplete="off" name="${name}"\n\t\t\tdojoAttachEvent="onkeypress, onkeyup, onfocus, compositionend"\n\t\t\tdojoAttachPoint="textbox,focusNode" waiRole="combobox"\n\t\t/></td\n\t\t><td class="dijitReset dijitValidationIconField" width="0%"\n\t\t\t><div dojoAttachPoint=\'iconNode\' class=\'dijitValidationIcon\'></div\n\t\t\t><div class=\'dijitValidationIconText\'>&Chi;</div\n\t\t></td\n\t\t><td class=\'dijitReset dijitRight dijitButtonNode dijitDownArrowButton\' width="0%"\n\t\t\tdojoAttachPoint="downArrowNode"\n\t\t\tdojoAttachEvent="onmousedown:_onArrowMouseDown,onmouseup:_onMouse,onmouseenter:_onMouse,onmouseleave:_onMouse"\n\t\t\t><div class="dijitDownArrowButtonInner" waiRole="presentation"\n\t\t\t\t><div class="dijitDownArrowButtonChar">&#9660;</div\n\t\t\t></div\n\t\t></td\t\n\t></tr\n></table>\n',baseClass:"dijitComboBox",_lastDisplayedValue:"",getValue:function(){return dijit.form.TextBox.superclass.getValue.apply(this,arguments)
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