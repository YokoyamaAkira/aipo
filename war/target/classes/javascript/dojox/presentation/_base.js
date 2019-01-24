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
},moveTo:function(A){var B=A-1;
if(B<0){B=0
}if(B>this._slides.length-1){B=this._slides.length-1
}this._gotoSlide(B)
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
dojo.forEach(this._slides,dojo.hitch(this,function(B){A++;
var C=this._option.cloneNode(true);
C.text=B.title+" ("+A+") ";
this._option.parentNode.insertBefore(C,this._option)
}));
if(this._option.parentNode){this._option.parentNode.removeChild(this._option)
}}},_onEvent:function(A){var D=A.target;
var B=A.type;
if(B=="click"||B=="change"){if(D.index&&D.parentNode==this.select){this._gotoSlide(D.index)
}else{if(D==this.select){this._gotoSlide(D.selectedIndex)
}else{if(this.noClick||this.selectedChildWidget.noClick||this._isUnclickable(A)){return 
}this.selectedChildWidget._nextAction(A)
}}}else{if(B=="keydown"||B=="keypress"){var C=(A.charCode==dojo.keys.SPACE?dojo.keys.SPACE:A.keyCode);
switch(C){case dojo.keys.DELETE:case dojo.keys.BACKSPACE:case dojo.keys.LEFT_ARROW:case dojo.keys.UP_ARROW:case dojo.keys.PAGE_UP:case 80:this.previousSlide(A);
break;
case dojo.keys.ENTER:case dojo.keys.SPACE:case dojo.keys.RIGHT_ARROW:case dojo.keys.DOWN_ARROW:case dojo.keys.PAGE_DOWN:case 78:this.selectedChildWidget._nextAction(A);
break;
case dojo.keys.HOME:this._gotoSlide(0)
}}}this._resizeWindow();
A.stopPropagation()
},_gotoSlide:function(A){this.selectChild(this._slides[A]);
this.selectedChildWidget._reset();
this._slideIndex=A;
if(this.useNav){this.select.selectedIndex=A
}if(this.setHash){this._setHash()
}this.onMove(this._slideIndex+1)
},_isUnclickable:function(A){var B=A.target.nodeName.toLowerCase();
switch(B){case"a":case"input":case"textarea":return true;
break
}return false
},_readHash:function(){var A=window.location.hash;
if(A.length&&this.setHash){var B=(""+window.location).split(this.getHash(""));
if(B.length>1){this._gotoSlide(parseInt(B[1])-1)
}}},_setHash:function(){if(this.setHash){var A=this._slideIndex+1;
window.location.href="#"+this.getHash(A)
}},_resizeWindow:function(C){dojo.body().style.height="auto";
var B=dijit.getViewport();
var D=Math.max(document.documentElement.scrollHeight||dojo.body().scrollHeight,B.h);
var A=B.w;
this.selectedChildWidget.domNode.style.height=D+"px";
this.selectedChildWidget.domNode.style.width=A+"px"
},_transition:function(C,B){var A=[];
if(B){this._hideChild(B)
}if(C){this._showChild(C);
C._reset()
}}});
dojo.declare("dojox.presentation.Slide",[dijit.layout.ContentPane,dijit._Contained,dijit._Container,dijit._Templated],{templateString:'<div dojoAttachPoint="showSlide" class="dojoShowPrint dojoShowSlide">\r\n\t<h1 class="showTitle" dojoAttachPoint="slideTitle"><span class="dojoShowSlideTitle" dojoAttachPoint="slideTitleText">${title}</span></h1>\r\n\t<div class="dojoShowBody" dojoAttachPoint="containerNode"></div>\r\n</div>\r\n',title:"",refreshOnShow:true,preLoad:false,doLayout:true,parseContent:true,noClick:false,_parts:[],_actions:[],_actionIndex:0,_runningDelay:false,startup:function(){this.slideTitleText.innerHTML=this.title;
var A=this.getChildren();
this._actions=[];
dojo.forEach(A,function(C){var B=C.declaredClass.toLowerCase();
switch(B){case"dojox.presentation.part":this._parts.push(C);
break;
case"dojox.presentation.action":this._actions.push(C);
break
}},this)
},_nextAction:function(A){var C=this._actions[this._actionIndex]||0;
if(C){if(C.on=="delay"){this._runningDelay=setTimeout(dojo.hitch(C,"_runAction"),C.delay);
console.debug("started delay action",this._runningDelay)
}else{C._runAction()
}var B=this._getNextAction();
this._actionIndex++;
if(B.on=="delay"){console.debug("started delay action",this._runningDelay);
setTimeout(dojo.hitch(B,"_runAction"),B.delay)
}}else{this.getParent().nextSlide(A)
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
dojo.declare("dojox.presentation.Action",[dijit._Widget,dijit._Contained],{on:"click",forSlide:null,toggle:"fade",delay:0,duration:1000,_attached:[],_nullAnim:false,_runAction:function(){var A=[];
dojo.forEach(this._attached,function(E){var C=(E._isShowing)?"Out":"In";
E._quickToggle();
var D=dojo.fadeIn({node:E.domNode,duration:this.duration});
A.push(D)
},this);
var B=dojo.fx.combine(A);
if(B){B.play()
}},_getSiblingsByType:function(A){var B=dojo.filter(this.getParent().getChildren(),function(C){return C.declaredClass==A
});
return B
},postCreate:function(){dojo.style(this.domNode,"display","none");
var A=this._getSiblingsByType("dojox.presentation.Part");
this._attached=[];
dojo.forEach(A,function(B){if(this.forSlide==B.as){this._attached.push(B)
}},this)
}})
};