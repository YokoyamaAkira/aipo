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
},moveTo:function(C){var B=C-1;
if(B<0){B=0
}if(B>this._slides.length-1){B=this._slides.length-1
}this._gotoSlide(B)
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
}}},_onEvent:function(C){var B=C.target;
var D=C.type;
if(D=="click"||D=="change"){if(B.index&&B.parentNode==this.select){this._gotoSlide(B.index)
}else{if(B==this.select){this._gotoSlide(B.selectedIndex)
}else{if(this.noClick||this.selectedChildWidget.noClick||this._isUnclickable(C)){return 
}this.selectedChildWidget._nextAction(C)
}}}else{if(D=="keydown"||D=="keypress"){var E=(C.charCode==A.keys.SPACE?A.keys.SPACE:C.keyCode);
switch(E){case A.keys.DELETE:case A.keys.BACKSPACE:case A.keys.LEFT_ARROW:case A.keys.UP_ARROW:case A.keys.PAGE_UP:case 80:this.previousSlide(C);
break;
case A.keys.ENTER:case A.keys.SPACE:case A.keys.RIGHT_ARROW:case A.keys.DOWN_ARROW:case A.keys.PAGE_DOWN:case 78:this.selectedChildWidget._nextAction(C);
break;
case A.keys.HOME:this._gotoSlide(0)
}}}this._resizeWindow();
C.stopPropagation()
},_gotoSlide:function(B){this.selectChild(this._slides[B]);
this.selectedChildWidget._reset();
this._slideIndex=B;
if(this.useNav){this.select.selectedIndex=B
}if(this.setHash){this._setHash()
}this.onMove(this._slideIndex+1)
},_isUnclickable:function(C){var B=C.target.nodeName.toLowerCase();
switch(B){case"a":case"input":case"textarea":return true;
break
}return false
},_readHash:function(){var C=window.location.hash;
if(C.length&&this.setHash){var B=(""+window.location).split(this.getHash(""));
if(B.length>1){this._gotoSlide(parseInt(B[1])-1)
}}},_setHash:function(){if(this.setHash){var B=this._slideIndex+1;
window.location.href="#"+this.getHash(B)
}},_resizeWindow:function(E){A.body().style.height="auto";
var D=dijit.getViewport();
var B=Math.max(document.documentElement.scrollHeight||A.body().scrollHeight,D.h);
var C=D.w;
this.selectedChildWidget.domNode.style.height=B+"px";
this.selectedChildWidget.domNode.style.width=C+"px"
},_transition:function(B,D){var C=[];
if(D){this._hideChild(D)
}if(B){this._showChild(B);
B._reset()
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
},_nextAction:function(C){var B=this._actions[this._actionIndex]||0;
if(B){if(B.on=="delay"){this._runningDelay=setTimeout(A.hitch(B,"_runAction"),B.delay);
console.debug("started delay action",this._runningDelay)
}else{B._runAction()
}var D=this._getNextAction();
this._actionIndex++;
if(D.on=="delay"){console.debug("started delay action",this._runningDelay);
setTimeout(A.hitch(D,"_runAction"),D.delay)
}}else{this.getParent().nextSlide(C)
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
A.declare("dojox.presentation.Action",[dijit._Widget,dijit._Contained],{on:"click",forSlide:null,toggle:"fade",delay:0,duration:1000,_attached:[],_nullAnim:false,_runAction:function(){var C=[];
A.forEach(this._attached,function(F){var D=(F._isShowing)?"Out":"In";
F._quickToggle();
var E=A.fadeIn({node:F.domNode,duration:this.duration});
C.push(E)
},this);
var B=A.fx.combine(C);
if(B){B.play()
}},_getSiblingsByType:function(C){var B=A.filter(this.getParent().getChildren(),function(D){return D.declaredClass==C
});
return B
},postCreate:function(){A.style(this.domNode,"display","none");
var B=this._getSiblingsByType("dojox.presentation.Part");
this._attached=[];
A.forEach(B,function(C){if(this.forSlide==C.as){this._attached.push(C)
}},this)
}})
}}});