dojo._xdResourceLoaded({depends:[["provide","dojox.presentation._base"],["require","dijit._Widget"],["require","dijit._Container"],["require","dijit._Templated"],["require","dijit.layout.StackContainer"],["require","dijit.layout.ContentPane"],["require","dojo.fx"]],defineResource:function(A){if(!A._hasResource["dojox.presentation._base"]){A._hasResource["dojox.presentation._base"]=true;
A.provide("dojox.presentation._base");
A.experimental("dojox.presentation");
A.require("dijit._Widget");
A.require("dijit._Container");
A.require("dijit._Templated");
A.require("dijit.layout.StackContainer");
A.require("dijit.layout.ContentPane");
A.require("dojo.fx");
A.declare("dojox.presentation.Deck",[dijit.layout.StackContainer,dijit._Templated],{fullScreen:true,useNav:true,navDuration:250,noClick:false,setHash:true,templateString:null,templateString:'<div class="dojoShow" dojoAttachPoint="showHolder">\r\n\t<div class="dojoShowNav" dojoAttachPoint="showNav" dojoAttachEvent="onmouseover: _showNav, onmouseout: _hideNav">\r\n\t<div class="dojoShowNavToggler" dojoAttachPoint="showToggler">\r\n\t\t<img dojoAttachPoint="prevNode" src="${prevIcon}" dojoAttachEvent="onclick:previousSlide">\r\n\t\t<select dojoAttachEvent="onchange:_onEvent" dojoAttachPoint="select">\r\n\t\t\t<option dojoAttachPoint="_option">Title</option>\r\n\t\t</select>\r\n\t\t<img dojoAttachPoint="nextNode" src="${nextIcon}" dojoAttachEvent="onclick:nextSlide">\r\n\t</div>\r\n\t</div>\r\n\t<div dojoAttachPoint="containerNode"></div>\r\n</div>\r\n',nextIcon:A.moduleUrl("dojox.presentation","resources/icons/next.png"),prevIcon:A.moduleUrl("dojox.presentation","resources/icons/prev.png"),_navOpacMin:0,_navOpacMax:0.85,_slideIndex:0,_slides:[],_navShowing:true,_inNav:false,startup:function(){dojox.presentation.Deck.superclass.startup.call(this);
if(this.useNav){this._hideNav()
}else{this.showNav.style.display="none"
}this.connect(document,"onclick","_onEvent");
this.connect(document,"onkeypress","_onEvent");
this.connect(window,"onresize","_resizeWindow");
this._resizeWindow();
this._updateSlides();
this._readHash();
this._setHash()
},moveTo:function(B){var C=B-1;
if(C<0){C=0
}if(C>this._slides.length-1){C=this._slides.length-1
}this._gotoSlide(C)
},onMove:function(B){},nextSlide:function(B){if(!this.selectedChildWidget.isLastChild){this._gotoSlide(this._slideIndex+1)
}if(B){B.stopPropagation()
}},previousSlide:function(B){if(!this.selectedChildWidget.isFirstChild){this._gotoSlide(this._slideIndex-1)
}else{this.selectedChildWidget._reset()
}if(B){B.stopPropagation()
}},getHash:function(B){return this.id+"_SlideNo_"+B
},_hideNav:function(B){if(this._navAnim){this._navAnim.stop()
}this._navAnim=A.animateProperty({node:this.showNav,duration:this.navDuration,properties:{opacity:{end:this._navOpacMin}}}).play()
},_showNav:function(B){if(this._navAnim){this._navAnim.stop()
}this._navAnim=A.animateProperty({node:this.showNav,duration:this.navDuration,properties:{opacity:{end:this._navOpacMax}}}).play()
},_handleNav:function(B){B.stopPropagation()
},_updateSlides:function(){this._slides=this.getChildren();
if(this.useNav){var B=0;
A.forEach(this._slides,A.hitch(this,function(C){B++;
var D=this._option.cloneNode(true);
D.text=C.title+" ("+B+") ";
this._option.parentNode.insertBefore(D,this._option)
}));
if(this._option.parentNode){this._option.parentNode.removeChild(this._option)
}}},_onEvent:function(B){var E=B.target;
var C=B.type;
if(C=="click"||C=="change"){if(E.index&&E.parentNode==this.select){this._gotoSlide(E.index)
}else{if(E==this.select){this._gotoSlide(E.selectedIndex)
}else{if(this.noClick||this.selectedChildWidget.noClick||this._isUnclickable(B)){return 
}this.selectedChildWidget._nextAction(B)
}}}else{if(C=="keydown"||C=="keypress"){var D=(B.charCode==A.keys.SPACE?A.keys.SPACE:B.keyCode);
switch(D){case A.keys.DELETE:case A.keys.BACKSPACE:case A.keys.LEFT_ARROW:case A.keys.UP_ARROW:case A.keys.PAGE_UP:case 80:this.previousSlide(B);
break;
case A.keys.ENTER:case A.keys.SPACE:case A.keys.RIGHT_ARROW:case A.keys.DOWN_ARROW:case A.keys.PAGE_DOWN:case 78:this.selectedChildWidget._nextAction(B);
break;
case A.keys.HOME:this._gotoSlide(0)
}}}this._resizeWindow();
B.stopPropagation()
},_gotoSlide:function(B){this.selectChild(this._slides[B]);
this.selectedChildWidget._reset();
this._slideIndex=B;
if(this.useNav){this.select.selectedIndex=B
}if(this.setHash){this._setHash()
}this.onMove(this._slideIndex+1)
},_isUnclickable:function(B){var C=B.target.nodeName.toLowerCase();
switch(C){case"a":case"input":case"textarea":return true;
break
}return false
},_readHash:function(){var B=window.location.hash;
if(B.length&&this.setHash){var C=(""+window.location).split(this.getHash(""));
if(C.length>1){this._gotoSlide(parseInt(C[1])-1)
}}},_setHash:function(){if(this.setHash){var B=this._slideIndex+1;
window.location.href="#"+this.getHash(B)
}},_resizeWindow:function(D){A.body().style.height="auto";
var C=dijit.getViewport();
var E=Math.max(document.documentElement.scrollHeight||A.body().scrollHeight,C.h);
var B=C.w;
this.selectedChildWidget.domNode.style.height=E+"px";
this.selectedChildWidget.domNode.style.width=B+"px"
},_transition:function(D,C){var B=[];
if(C){this._hideChild(C)
}if(D){this._showChild(D);
D._reset()
}}});
A.declare("dojox.presentation.Slide",[dijit.layout.ContentPane,dijit._Contained,dijit._Container,dijit._Templated],{templateString:'<div dojoAttachPoint="showSlide" class="dojoShowPrint dojoShowSlide">\r\n\t<h1 class="showTitle" dojoAttachPoint="slideTitle"><span class="dojoShowSlideTitle" dojoAttachPoint="slideTitleText">${title}</span></h1>\r\n\t<div class="dojoShowBody" dojoAttachPoint="containerNode"></div>\r\n</div>\r\n',title:"",refreshOnShow:true,preLoad:false,doLayout:true,parseContent:true,noClick:false,_parts:[],_actions:[],_actionIndex:0,_runningDelay:false,startup:function(){this.slideTitleText.innerHTML=this.title;
var B=this.getChildren();
this._actions=[];
A.forEach(B,function(D){var C=D.declaredClass.toLowerCase();
switch(C){case"dojox.presentation.part":this._parts.push(D);
break;
case"dojox.presentation.action":this._actions.push(D);
break
}},this)
},_nextAction:function(B){var D=this._actions[this._actionIndex]||0;
if(D){if(D.on=="delay"){this._runningDelay=setTimeout(A.hitch(D,"_runAction"),D.delay);
console.debug("started delay action",this._runningDelay)
}else{D._runAction()
}var C=this._getNextAction();
this._actionIndex++;
if(C.on=="delay"){console.debug("started delay action",this._runningDelay);
setTimeout(A.hitch(C,"_runAction"),C.delay)
}}else{this.getParent().nextSlide(B)
}},_getNextAction:function(){return this._actions[this._actionIndex+1]||0
},_reset:function(){this._actionIndex=[0];
A.forEach(this._parts,function(B){B._reset()
},this)
}});
A.declare("dojox.presentation.Part",[dijit._Widget,dijit._Contained],{as:null,startVisible:false,_isShowing:false,postCreate:function(){this._reset()
},_reset:function(){this._isShowing=!this.startVisible;
this._quickToggle()
},_quickToggle:function(){if(this._isShowing){A.style(this.domNode,"display","none");
A.style(this.domNode,"visibility","hidden");
A.style(this.domNode,"opacity",0)
}else{A.style(this.domNode,"display","");
A.style(this.domNode,"visibility","visible");
A.style(this.domNode,"opacity",1)
}this._isShowing=!this._isShowing
}});
A.declare("dojox.presentation.Action",[dijit._Widget,dijit._Contained],{on:"click",forSlide:null,toggle:"fade",delay:0,duration:1000,_attached:[],_nullAnim:false,_runAction:function(){var B=[];
A.forEach(this._attached,function(F){var D=(F._isShowing)?"Out":"In";
F._quickToggle();
var E=A.fadeIn({node:F.domNode,duration:this.duration});
B.push(E)
},this);
var C=A.fx.combine(B);
if(C){C.play()
}},_getSiblingsByType:function(B){var C=A.filter(this.getParent().getChildren(),function(D){return D.declaredClass==B
});
return C
},postCreate:function(){A.style(this.domNode,"display","none");
var B=this._getSiblingsByType("dojox.presentation.Part");
this._attached=[];
A.forEach(B,function(C){if(this.forSlide==C.as){this._attached.push(C)
}},this)
}})
}}});