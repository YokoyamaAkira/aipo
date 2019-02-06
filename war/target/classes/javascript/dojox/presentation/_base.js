if(!dojo._hasResource["dojox.presentation._base"]){dojo._hasResource["dojox.presentation._base"]=true;
dojo.provide("dojox.presentation._base");
dojo.experimental("dojox.presentation");
dojo.require("dijit._Widget");
dojo.require("dijit._Container");
dojo.require("dijit._Templated");
dojo.require("dijit.layout.StackContainer");
dojo.require("dijit.layout.ContentPane");
dojo.require("dojo.fx");
dojo.declare("dojox.presentation.Deck",[dijit.layout.StackContainer,dijit._Templated],{fullScreen:true,useNav:true,navDuration:250,noClick:false,setHash:true,templateString:null,templateString:'<div class="dojoShow" dojoAttachPoint="showHolder">\r\n\t<div class="dojoShowNav" dojoAttachPoint="showNav" dojoAttachEvent="onmouseover: _showNav, onmouseout: _hideNav">\r\n\t<div class="dojoShowNavToggler" dojoAttachPoint="showToggler">\r\n\t\t<img dojoAttachPoint="prevNode" src="${prevIcon}" dojoAttachEvent="onclick:previousSlide">\r\n\t\t<select dojoAttachEvent="onchange:_onEvent" dojoAttachPoint="select">\r\n\t\t\t<option dojoAttachPoint="_option">Title</option>\r\n\t\t</select>\r\n\t\t<img dojoAttachPoint="nextNode" src="${nextIcon}" dojoAttachEvent="onclick:nextSlide">\r\n\t</div>\r\n\t</div>\r\n\t<div dojoAttachPoint="containerNode"></div>\r\n</div>\r\n',nextIcon:dojo.moduleUrl("dojox.presentation","resources/icons/next.png"),prevIcon:dojo.moduleUrl("dojox.presentation","resources/icons/prev.png"),_navOpacMin:0,_navOpacMax:0.85,_slideIndex:0,_slides:[],_navShowing:true,_inNav:false,startup:function(){dojox.presentation.Deck.superclass.startup.call(this);
if(this.useNav){this._hideNav()
}else{this.showNav.style.display="none"
}this.connect(document,"onclick","_onEvent");
this.connect(document,"onkeypress","_onEvent");
this.connect(window,"onresize","_resizeWindow");
this._resizeWindow();
this._updateSlides();
this._readHash();
this._setHash()
},moveTo:function(B){var A=B-1;
if(A<0){A=0
}if(A>this._slides.length-1){A=this._slides.length-1
}this._gotoSlide(A)
},onMove:function(A){},nextSlide:function(A){if(!this.selectedChildWidget.isLastChild){this._gotoSlide(this._slideIndex+1)
}if(A){A.stopPropagation()
}},previousSlide:function(A){if(!this.selectedChildWidget.isFirstChild){this._gotoSlide(this._slideIndex-1)
}else{this.selectedChildWidget._reset()
}if(A){A.stopPropagation()
}},getHash:function(A){return this.id+"_SlideNo_"+A
},_hideNav:function(A){if(this._navAnim){this._navAnim.stop()
}this._navAnim=dojo.animateProperty({node:this.showNav,duration:this.navDuration,properties:{opacity:{end:this._navOpacMin}}}).play()
},_showNav:function(A){if(this._navAnim){this._navAnim.stop()
}this._navAnim=dojo.animateProperty({node:this.showNav,duration:this.navDuration,properties:{opacity:{end:this._navOpacMax}}}).play()
},_handleNav:function(A){A.stopPropagation()
},_updateSlides:function(){this._slides=this.getChildren();
if(this.useNav){var A=0;
dojo.forEach(this._slides,dojo.hitch(this,function(C){A++;
var B=this._option.cloneNode(true);
B.text=C.title+" ("+A+") ";
this._option.parentNode.insertBefore(B,this._option)
}));
if(this._option.parentNode){this._option.parentNode.removeChild(this._option)
}}},_onEvent:function(D){var C=D.target;
var A=D.type;
if(A=="click"||A=="change"){if(C.index&&C.parentNode==this.select){this._gotoSlide(C.index)
}else{if(C==this.select){this._gotoSlide(C.selectedIndex)
}else{if(this.noClick||this.selectedChildWidget.noClick||this._isUnclickable(D)){return 
}this.selectedChildWidget._nextAction(D)
}}}else{if(A=="keydown"||A=="keypress"){var B=(D.charCode==dojo.keys.SPACE?dojo.keys.SPACE:D.keyCode);
switch(B){case dojo.keys.DELETE:case dojo.keys.BACKSPACE:case dojo.keys.LEFT_ARROW:case dojo.keys.UP_ARROW:case dojo.keys.PAGE_UP:case 80:this.previousSlide(D);
break;
case dojo.keys.ENTER:case dojo.keys.SPACE:case dojo.keys.RIGHT_ARROW:case dojo.keys.DOWN_ARROW:case dojo.keys.PAGE_DOWN:case 78:this.selectedChildWidget._nextAction(D);
break;
case dojo.keys.HOME:this._gotoSlide(0)
}}}this._resizeWindow();
D.stopPropagation()
},_gotoSlide:function(A){this.selectChild(this._slides[A]);
this.selectedChildWidget._reset();
this._slideIndex=A;
if(this.useNav){this.select.selectedIndex=A
}if(this.setHash){this._setHash()
}this.onMove(this._slideIndex+1)
},_isUnclickable:function(B){var A=B.target.nodeName.toLowerCase();
switch(A){case"a":case"input":case"textarea":return true;
break
}return false
},_readHash:function(){var B=window.location.hash;
if(B.length&&this.setHash){var A=(""+window.location).split(this.getHash(""));
if(A.length>1){this._gotoSlide(parseInt(A[1])-1)
}}},_setHash:function(){if(this.setHash){var A=this._slideIndex+1;
window.location.href="#"+this.getHash(A)
}},_resizeWindow:function(B){dojo.body().style.height="auto";
var A=dijit.getViewport();
var C=Math.max(document.documentElement.scrollHeight||dojo.body().scrollHeight,A.h);
var D=A.w;
this.selectedChildWidget.domNode.style.height=C+"px";
this.selectedChildWidget.domNode.style.width=D+"px"
},_transition:function(B,A){var C=[];
if(A){this._hideChild(A)
}if(B){this._showChild(B);
B._reset()
}}});
dojo.declare("dojox.presentation.Slide",[dijit.layout.ContentPane,dijit._Contained,dijit._Container,dijit._Templated],{templateString:'<div dojoAttachPoint="showSlide" class="dojoShowPrint dojoShowSlide">\r\n\t<h1 class="showTitle" dojoAttachPoint="slideTitle"><span class="dojoShowSlideTitle" dojoAttachPoint="slideTitleText">${title}</span></h1>\r\n\t<div class="dojoShowBody" dojoAttachPoint="containerNode"></div>\r\n</div>\r\n',title:"",refreshOnShow:true,preLoad:false,doLayout:true,parseContent:true,noClick:false,_parts:[],_actions:[],_actionIndex:0,_runningDelay:false,startup:function(){this.slideTitleText.innerHTML=this.title;
var A=this.getChildren();
this._actions=[];
dojo.forEach(A,function(B){var C=B.declaredClass.toLowerCase();
switch(C){case"dojox.presentation.part":this._parts.push(B);
break;
case"dojox.presentation.action":this._actions.push(B);
break
}},this)
},_nextAction:function(C){var B=this._actions[this._actionIndex]||0;
if(B){if(B.on=="delay"){this._runningDelay=setTimeout(dojo.hitch(B,"_runAction"),B.delay);
console.debug("started delay action",this._runningDelay)
}else{B._runAction()
}var A=this._getNextAction();
this._actionIndex++;
if(A.on=="delay"){console.debug("started delay action",this._runningDelay);
setTimeout(dojo.hitch(A,"_runAction"),A.delay)
}}else{this.getParent().nextSlide(C)
}},_getNextAction:function(){return this._actions[this._actionIndex+1]||0
},_reset:function(){this._actionIndex=[0];
dojo.forEach(this._parts,function(A){A._reset()
},this)
}});
dojo.declare("dojox.presentation.Part",[dijit._Widget,dijit._Contained],{as:null,startVisible:false,_isShowing:false,postCreate:function(){this._reset()
},_reset:function(){this._isShowing=!this.startVisible;
this._quickToggle()
},_quickToggle:function(){if(this._isShowing){dojo.style(this.domNode,"display","none");
dojo.style(this.domNode,"visibility","hidden");
dojo.style(this.domNode,"opacity",0)
}else{dojo.style(this.domNode,"display","");
dojo.style(this.domNode,"visibility","visible");
dojo.style(this.domNode,"opacity",1)
}this._isShowing=!this._isShowing
}});
dojo.declare("dojox.presentation.Action",[dijit._Widget,dijit._Contained],{on:"click",forSlide:null,toggle:"fade",delay:0,duration:1000,_attached:[],_nullAnim:false,_runAction:function(){var B=[];
dojo.forEach(this._attached,function(C){var D=(C._isShowing)?"Out":"In";
C._quickToggle();
var E=dojo.fadeIn({node:C.domNode,duration:this.duration});
B.push(E)
},this);
var A=dojo.fx.combine(B);
if(A){A.play()
}},_getSiblingsByType:function(B){var A=dojo.filter(this.getParent().getChildren(),function(C){return C.declaredClass==B
});
return A
},postCreate:function(){dojo.style(this.domNode,"display","none");
var A=this._getSiblingsByType("dojox.presentation.Part");
this._attached=[];
dojo.forEach(A,function(B){if(this.forSlide==B.as){this._attached.push(B)
}},this)
}})
};